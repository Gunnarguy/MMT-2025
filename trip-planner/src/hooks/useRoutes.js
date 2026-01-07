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
      const labels = Array.from(
        new Set(
          (trip.days || [])
            .map((d) => (d.location || '').trim())
            .filter(Boolean)
        )
      );

      const updates = {};
      for (const label of labels) {
        if (baseCoordsByLabel[label]) continue;
        try {
          const coords = await geocodePlace(label, { signal: controller.signal });
          if (coords) updates[label] = coords;
        } catch (e) {
          if (e?.name === 'AbortError') return;
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
      for (let i = 0; i < trip.days.length; i++) {
        const day = trip.days[i];
        const isDriveDay = day?.type === 'drive';
        const endBaseLabel = (day?.location || '').trim() || null;
        const prevBaseLabel = i > 0 ? (trip.days[i - 1]?.location || '').trim() : null;

        const startBaseLabel = isDriveDay ? prevBaseLabel : endBaseLabel;

        const points = [];
        const startCoord = startBaseLabel ? baseCoordsByLabel[startBaseLabel] : null;
        if (startBaseLabel && startCoord) {
          points.push({ id: `base-start-${day.id}`, name: startBaseLabel, coordinates: startCoord });
        }

        points.push(...getActivityWaypoints(day));

        const endCoord = endBaseLabel ? baseCoordsByLabel[endBaseLabel] : null;
        if (isDriveDay && endBaseLabel && endCoord && endBaseLabel !== startBaseLabel) {
          points.push({ id: `base-end-${day.id}`, name: endBaseLabel, coordinates: endCoord });
        }

        if (points.length < 2) continue;

        const coordStr = points.map((p) => `${p.coordinates[1]},${p.coordinates[0]}`).join(';');
        const url = `https://router.project-osrm.org/route/v1/driving/${coordStr}?overview=full&geometries=geojson&steps=false`;
        try {
          const res = await fetch(url, { signal: controller.signal });
          if (!res.ok) continue;
          const data = await res.json();
          const route = data?.routes?.[0];
          if (!route?.geometry?.coordinates?.length) continue;

          const line = route.geometry.coordinates.map(([lon, lat]) => [lat, lon]);
          const legs = (route.legs || []).map((leg, idx) => ({
            from: points[idx]?.name ?? `Stop ${idx + 1}`,
            to: points[idx + 1]?.name ?? `Stop ${idx + 2}`,
            distance_m: leg.distance,
            duration_s: leg.duration
          }));

          next[day.id] = {
            dayId: day.id,
            dayNumber: day.dayNumber,
            distance_m: route.distance,
            duration_s: route.duration,
            line,
            legs
          };
        } catch (e) {
          if (e?.name === 'AbortError') return;
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
