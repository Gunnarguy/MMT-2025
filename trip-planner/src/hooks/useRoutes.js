import { useEffect, useState } from 'react';
import { geocodePlace } from '../utils/geocode';

export function useRoutes({ trip, getActivityWaypoints }) {
  const [dayRoutes, setDayRoutes] = useState({});
  const [routesLoading, setRoutesLoading] = useState(false);
  const [routesError, setRoutesError] = useState(null);
  const [baseCoordsByLabel, setBaseCoordsByLabel] = useState({});

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    async function geocodeBases() {
      // Collect all location labels AND overnight stays to geocode
      const labels = new Set();

      // Include home address if set (for trip start/end)
      const homeAddr = (trip.homeAddress || "").trim();
      if (homeAddr) labels.add(homeAddr);

      (trip.days || []).forEach((d) => {
        const loc = (d.location || "").trim();
        const overnight = (d.overnightStay || "").trim();
        if (loc) labels.add(loc);
        if (overnight) labels.add(overnight);
      });

      const updates = {};
      for (const label of labels) {
        if (baseCoordsByLabel[label]) continue;
        try {
          const coords = await geocodePlace(label, {
            signal: controller.signal,
          });
          if (coords) updates[label] = coords;
        } catch (e) {
          if (e?.name === "AbortError") return;
        }
      }

      if (cancelled) return;
      if (Object.keys(updates).length) {
        setBaseCoordsByLabel((prev) => ({ ...prev, ...updates }));
      }
    }

    geocodeBases();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [trip.days, baseCoordsByLabel]);

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    async function fetchRoutes() {
      setRoutesLoading(true);
      setRoutesError(null);

      const next = {};
      const homeAddress = (trip.homeAddress || '').trim() || null;
      const totalDays = trip.days.length;

      for (let i = 0; i < totalDays; i++) {
        const day = trip.days[i];
        const isDriveDay = day?.type === "drive";
        const isFirstDay = i === 0;
        const isLastDay = i === totalDays - 1;

        // Day's main location
        const dayLocation = (day?.location || "").trim() || null;

        // Previous day's overnight stay or location (where we're starting from)
        const prevDay = i > 0 ? trip.days[i - 1] : null;
        const prevOvernightStay = (prevDay?.overnightStay || "").trim() || null;
        const prevLocation = (prevDay?.location || "").trim() || null;

        // Day 1 starts from home, otherwise from previous night's stay
        const startBaseLabel =
          isFirstDay && homeAddress
            ? homeAddress
            : prevOvernightStay || prevLocation || dayLocation;

        // This day's overnight stay (where we're ending/sleeping)
        const overnightStay = (day?.overnightStay || "").trim() || null;

        // Last day ends at home, otherwise at tonight's overnight stay
        const endBaseLabel =
          isLastDay && homeAddress ? homeAddress : overnightStay || dayLocation;

        const points = [];

        // Start point: home (Day 1) or where we woke up (previous night's stay)
        const startCoord = startBaseLabel
          ? baseCoordsByLabel[startBaseLabel]
          : null;
        if (startBaseLabel && startCoord) {
          const startIcon = isFirstDay && homeAddress ? "🏠" : "🏨";
          points.push({
            id: `base-start-${day.id}`,
            name: `${startIcon} ${startBaseLabel}`,
            coordinates: startCoord,
          });
        }

        // All activities for the day
        points.push(...getActivityWaypoints(day));

        // End point: home (last day) or where we're sleeping tonight
        const endCoord = endBaseLabel ? baseCoordsByLabel[endBaseLabel] : null;
        if (endBaseLabel && endCoord) {
          // Only add if it's different from start (otherwise we just return to same place)
          const isClosedLoop = startBaseLabel === endBaseLabel;
          if (!isClosedLoop || points.length > 1) {
            const endIcon = isLastDay && homeAddress ? "🏠" : "🏨";
            points.push({
              id: `base-end-${day.id}`,
              name: `${endIcon} ${endBaseLabel}`,
              coordinates: endCoord,
            });
          }
        }

        if (points.length < 2) continue;

        const coordStr = points
          .map((p) => `${p.coordinates[1]},${p.coordinates[0]}`)
          .join(";");
        const url = `https://router.project-osrm.org/route/v1/driving/${coordStr}?overview=full&geometries=geojson&steps=false`;
        try {
          const res = await fetch(url, { signal: controller.signal });
          if (!res.ok) continue;
          const data = await res.json();
          const route = data?.routes?.[0];
          if (!route?.geometry?.coordinates?.length) continue;

          const line = route.geometry.coordinates.map(([lon, lat]) => [
            lat,
            lon,
          ]);
          const legs = (route.legs || []).map((leg, idx) => ({
            from: points[idx]?.name ?? `Stop ${idx + 1}`,
            to: points[idx + 1]?.name ?? `Stop ${idx + 2}`,
            distance_m: leg.distance,
            duration_s: leg.duration,
          }));

          next[day.id] = {
            dayId: day.id,
            dayNumber: day.dayNumber,
            distance_m: route.distance,
            duration_s: route.duration,
            line,
            legs,
          };
        } catch (e) {
          if (e?.name === "AbortError") return;
        }
      }

      if (cancelled) return;
      setDayRoutes(next);
      setRoutesLoading(false);
    }

    fetchRoutes().catch((e) => {
      if (cancelled || e?.name === 'AbortError') return;
      setRoutesError('Could not load driving routes.');
      setRoutesLoading(false);
    });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [trip.days, getActivityWaypoints, baseCoordsByLabel]);

  return { dayRoutes, routesLoading, routesError, baseCoordsByLabel };
}
