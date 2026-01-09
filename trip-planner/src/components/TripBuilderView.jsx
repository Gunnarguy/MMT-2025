import { arrayMove } from "@dnd-kit/sortable";
import { useCallback, useEffect, useMemo, useState } from "react";
import { activityCatalog, getActivityById } from "../data/catalog";
import { useRoutes } from "../hooks/useRoutes";
import { formatHours } from "../utils/formatters";
import { geocodePlace } from "../utils/geocode";
import { buildAutoSchedule } from "../utils/timeUtils";
import { buildTripSkeleton, normalizeTripDays } from "../utils/tripUtils";
import {
  expandWithNeighborStates,
  extractMentionedStateAbbrs,
} from "../utils/usStates";
import ActivityDetailModal from "./ActivityDetailModal";
import CatalogPanel from "./CatalogPanel";
import DayBoard from "./DayBoard";
import DayPlanner from "./DayPlanner";
import MapPanel from "./MapPanel";

const COST_PER_MILE_KEY = "mmt-cost-per-mile";

export default function TripBuilderView({
  trip,
  setTrip,
  customActivities,
  setCustomActivities,
}) {
  const [selectedDayId, setSelectedDayId] = useState(
    trip.days[0]?.id || "day-1"
  );
  const [searchMode, setSearchMode] = useState("catalog");
  const [catalogFilter, setCatalogFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMomOnly, setShowMomOnly] = useState(false);
  const [detailActivity, setDetailActivity] = useState(null);
  const [plannerView, setPlannerView] = useState("day");

  const [costPerMile, setCostPerMile] = useState(() => {
    try {
      return localStorage.getItem(COST_PER_MILE_KEY) || "";
    } catch {
      return "";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(COST_PER_MILE_KEY, costPerMile);
    } catch {
      // ignore
    }
  }, [costPerMile]);

  useEffect(() => {
    if (!trip.days.length) return;
    if (!trip.days.find((day) => day.id === selectedDayId)) {
      setSelectedDayId(trip.days[0].id);
    }
  }, [trip.days, selectedDayId]);

  const selectedDay = useMemo(
    () => trip.days.find((day) => day.id === selectedDayId) || trip.days[0],
    [trip.days, selectedDayId]
  );

  const getAnyActivity = useCallback(
    (id) => getActivityById(id) || customActivities[id] || null,
    [customActivities]
  );

  const selectedDayActivities = useMemo(() => {
    if (!selectedDay) return [];
    return selectedDay.activities
      .map((id) => getAnyActivity(id))
      .filter(Boolean);
  }, [selectedDay, getAnyActivity]);

  const allowedPlaceStateAbbrs = useMemo(() => {
    const texts = [];
    if (trip?.startLocation) texts.push(trip.startLocation);
    if (trip?.endLocation) texts.push(trip.endLocation);
    (trip?.days || []).forEach((day) => {
      if (day?.location) texts.push(day.location);
      if (day?.label) texts.push(day.label);
    });

    // Also consider any existing custom place locations (keeps search “in-region”)
    Object.values(customActivities || {}).forEach((place) => {
      if (place?.location) texts.push(place.location);
    });

    const mentioned = new Set();
    texts.forEach((t) => {
      extractMentionedStateAbbrs(t).forEach((abbr) => mentioned.add(abbr));
    });

    // If we can’t infer states, just fall back to “US only”.
    if (mentioned.size === 0) return [];
    return expandWithNeighborStates(Array.from(mentioned));
  }, [trip?.startLocation, trip?.endLocation, trip?.days, customActivities]);

  const allowCanadaPlaces = useMemo(() => {
    const texts = [];
    if (trip?.startLocation) texts.push(trip.startLocation);
    if (trip?.endLocation) texts.push(trip.endLocation);
    (trip?.days || []).forEach((day) => {
      if (day?.location) texts.push(day.location);
      if (day?.label) texts.push(day.label);
      if (day?.notes) texts.push(day.notes);
    });
    const haystack = texts.join(" ").toLowerCase();
    return (
      haystack.includes("canada") ||
      haystack.includes("montreal") ||
      haystack.includes("québec") ||
      haystack.includes("quebec") ||
      haystack.includes(" qc") ||
      haystack.includes(",qc")
    );
  }, [trip?.startLocation, trip?.endLocation, trip?.days]);

  const selectedDayActivityIds = useMemo(
    () => selectedDay?.activities || [],
    [selectedDay]
  );

  const filteredCatalog = useMemo(() => {
    let results = activityCatalog.filter(
      (activity) => activity.category !== "city"
    );

    if (catalogFilter !== "all") {
      results = results.filter(
        (activity) => activity.category === catalogFilter
      );
    }
    if (regionFilter !== "all") {
      results = results.filter((activity) => activity.region === regionFilter);
    }
    if (showMomOnly) {
      results = results.filter((activity) => activity.momMentioned);
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (activity) =>
          activity.name.toLowerCase().includes(query) ||
          activity.location?.toLowerCase().includes(query) ||
          activity.description?.toLowerCase().includes(query) ||
          activity.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }
    return results;
  }, [catalogFilter, regionFilter, showMomOnly, searchQuery]);

  const addActivityToDay = useCallback(
    (dayId, activityId) => {
      if (!dayId) return;
      setTrip((prev) => ({
        ...prev,
        days: prev.days.map((day) => {
          if (day.id !== dayId) return day;
          if (day.activities.includes(activityId)) return day;
          return { ...day, activities: [...day.activities, activityId] };
        }),
      }));
    },
    [setTrip]
  );

  const removeActivityFromDay = useCallback(
    (dayId, activityId) => {
      setTrip((prev) => ({
        ...prev,
        days: prev.days.map((day) => {
          if (day.id !== dayId) return day;
          const schedule = { ...(day.schedule || {}) };
          delete schedule[activityId];
          return {
            ...day,
            activities: day.activities.filter((id) => id !== activityId),
            schedule,
          };
        }),
      }));
    },
    [setTrip]
  );

  const reorderDayActivities = useCallback(
    (dayId, oldIndex, newIndex) => {
      if (oldIndex === newIndex) return;
      setTrip((prev) => ({
        ...prev,
        days: prev.days.map((day) => {
          if (day.id !== dayId) return day;
          return {
            ...day,
            activities: arrayMove(day.activities, oldIndex, newIndex),
          };
        }),
      }));
    },
    [setTrip]
  );

  const updateDay = useCallback(
    (dayId, updates) => {
      setTrip((prev) => ({
        ...prev,
        days: prev.days.map((day) =>
          day.id === dayId ? { ...day, ...updates } : day
        ),
      }));
    },
    [setTrip]
  );

  const updateSchedule = useCallback(
    (dayId, activityId, updates) => {
      setTrip((prev) => ({
        ...prev,
        days: prev.days.map((day) => {
          if (day.id !== dayId) return day;
          const schedule = { ...(day.schedule || {}) };
          const existing = schedule[activityId] || {};
          const normalized = { ...updates };
          if (normalized.duration !== undefined) {
            const parsed = Number(normalized.duration);
            normalized.duration = Number.isFinite(parsed) ? parsed : 0;
          }
          if (normalized.bufferMinutes !== undefined) {
            const parsed = Number(normalized.bufferMinutes);
            normalized.bufferMinutes = Number.isFinite(parsed) ? parsed : 0;
          }
          schedule[activityId] = { ...existing, ...normalized };
          return { ...day, schedule };
        }),
      }));
    },
    [setTrip]
  );

  const autoScheduleDay = useCallback(
    (dayId) => {
      setTrip((prev) => ({
        ...prev,
        days: prev.days.map((day) => {
          if (day.id !== dayId) return day;
          const activities = day.activities
            .map((id) => getAnyActivity(id))
            .filter(Boolean);
          const startTime = day.startTime || "09:00";
          const schedule = buildAutoSchedule({
            activities,
            startTime,
            bufferMinutes: 20,
          });
          return { ...day, schedule, startTime };
        }),
      }));
    },
    [getAnyActivity, setTrip]
  );

  const addDay = useCallback(() => {
    setTrip((prev) => {
      const n = prev.days.length + 1;
      return {
        ...prev,
        days: [
          ...prev.days,
          {
            id: `day-${n}`,
            dayNumber: n,
            label: `Day ${n}`,
            location: "",
            activities: [],
            notes: "",
            type: "explore",
            lodging: null,
            startTime: "09:00",
            schedule: {},
          },
        ],
      };
    });
  }, [setTrip]);

  const removeDay = useCallback(
    (dayId) => {
      if (trip.days.length <= 1) return;
      setTrip((prev) => ({
        ...prev,
        days: normalizeTripDays(prev.days.filter((day) => day.id !== dayId)),
      }));
    },
    [trip.days.length, setTrip]
  );

  const duplicateDay = useCallback(
    (dayId) => {
      setTrip((prev) => {
        const idx = prev.days.findIndex((day) => day.id === dayId);
        if (idx < 0) return prev;
        const clone = {
          ...prev.days[idx],
          activities: [...prev.days[idx].activities],
          schedule: prev.days[idx].schedule
            ? { ...prev.days[idx].schedule }
            : {},
        };
        const days = [...prev.days];
        days.splice(idx + 1, 0, clone);
        return {
          ...prev,
          days: normalizeTripDays(days),
        };
      });
    },
    [setTrip]
  );

  const clearTrip = useCallback(() => {
    if (!window.confirm("Clear the entire trip builder?")) return;
    setTrip(
      buildTripSkeleton({
        name: "My Custom Trip",
        startLocation: "",
        endLocation: "",
        dayCount: 5,
        style: "balanced",
      })
    );
    setSelectedDayId("day-1");
  }, [setTrip]);

  const handleQuickAddCustomPlace = useCallback(
    async ({ dayId, name, location, coordinates }) => {
      const placeName = String(name || "").trim();
      if (!placeName) return;

      const placeLocation = String(location || "").trim();
      const customId = `custom-${Date.now()}`;
      const query = `${placeName} ${placeLocation || "New England"}`.trim();

      let resolvedCoordinates = Array.isArray(coordinates) ? coordinates : null;
      if (!resolvedCoordinates) {
        try {
          resolvedCoordinates = await geocodePlace(query);
        } catch {
          // ignore
        }
      }

      const place = {
        id: customId,
        name: placeName,
        location: placeLocation,
        category: "custom",
        description: "",
        duration: null,
        price: "",
        rating: null,
        notes: "",
        tags: [],
        website: "",
        momMentioned: false,
        isCustom: true,
        source: "custom",
        coordinates: resolvedCoordinates,
        googleMapsUrl: `https://www.google.com/maps/search/${encodeURIComponent(
          query
        )}`,
      };

      setCustomActivities((prev) => ({ ...prev, [customId]: place }));
      if (dayId) addActivityToDay(dayId, customId);
    },
    [addActivityToDay, setCustomActivities]
  );

  const handleDeleteCustom = useCallback(
    (activity) => {
      if (!window.confirm("Delete this custom place everywhere?")) return;
      setCustomActivities((prev) => {
        const next = { ...prev };
        delete next[activity.id];
        return next;
      });
      setTrip((prev) => ({
        ...prev,
        days: prev.days.map((day) => ({
          ...day,
          activities: day.activities.filter((id) => id !== activity.id),
        })),
      }));
      if (detailActivity?.id === activity.id) {
        setDetailActivity(null);
      }
    },
    [detailActivity, setCustomActivities, setTrip]
  );

  const getActivityWaypoints = useCallback(
    (day) => {
      return (day?.activities || [])
        .map((id) => getAnyActivity(id))
        .filter((activity) => activity?.category !== "city")
        .filter(
          (activity) =>
            activity?.coordinates && Array.isArray(activity.coordinates)
        )
        .map((activity) => ({
          id: activity.id,
          name: activity.name,
          coordinates: activity.coordinates,
        }));
    },
    [getAnyActivity]
  );

  const { dayRoutes, routesLoading, routesError, baseCoordsByLabel } =
    useRoutes({
      trip,
      getActivityWaypoints,
    });

  const selectedDayRoute = dayRoutes[selectedDayId] || null;
  const tripRouteTotals = useMemo(() => {
    let distance_m = 0;
    let duration_s = 0;
    Object.values(dayRoutes).forEach((route) => {
      distance_m += route?.distance_m || 0;
      duration_s += route?.duration_s || 0;
    });
    return { distance_m, duration_s };
  }, [dayRoutes]);

  const parsedCostPerMile = useMemo(() => {
    const n = Number(String(costPerMile).trim());
    return Number.isFinite(n) && n > 0 ? n : null;
  }, [costPerMile]);

  const tripMiles = tripRouteTotals.distance_m / 1609.344;
  const estimatedTripCost = parsedCostPerMile
    ? tripMiles * parsedCostPerMile
    : null;

  const mapActivities = useMemo(() => {
    const activities = [];
    trip.days.forEach((day) => {
      day.activities.forEach((id) => {
        const activity = getAnyActivity(id);
        if (activity?.coordinates && activity?.category !== "city") {
          activities.push({ ...activity, dayNumber: day.dayNumber });
        }
      });
    });
    return activities;
  }, [trip.days, getAnyActivity]);

  const selectedDayIndex = useMemo(
    () => trip.days.findIndex((day) => day.id === selectedDayId),
    [trip.days, selectedDayId]
  );

  const selectedDayBounds = useMemo(() => {
    if (!selectedDay) return null;
    const isDriveDay = selectedDay?.type === "drive";
    const endBaseLabel = (selectedDay?.location || "").trim() || null;
    const prevBaseLabel =
      selectedDayIndex > 0
        ? (trip.days[selectedDayIndex - 1]?.location || "").trim()
        : null;
    const startBaseLabel = isDriveDay ? prevBaseLabel : endBaseLabel;

    const coords = [];
    if (startBaseLabel && baseCoordsByLabel[startBaseLabel])
      coords.push(baseCoordsByLabel[startBaseLabel]);
    coords.push(
      ...getActivityWaypoints(selectedDay).map((point) => point.coordinates)
    );
    if (
      isDriveDay &&
      endBaseLabel &&
      baseCoordsByLabel[endBaseLabel] &&
      endBaseLabel !== startBaseLabel
    ) {
      coords.push(baseCoordsByLabel[endBaseLabel]);
    }

    return coords.length ? coords : null;
  }, [
    selectedDay,
    selectedDayIndex,
    trip.days,
    baseCoordsByLabel,
    getActivityWaypoints,
  ]);

  const customPlaceSearchCenter = useMemo(() => {
    if (!selectedDayBounds || selectedDayBounds.length === 0) return null;
    let latSum = 0;
    let lonSum = 0;
    let count = 0;
    selectedDayBounds.forEach((pt) => {
      if (!Array.isArray(pt) || pt.length < 2) return;
      const lat = Number(pt[0]);
      const lon = Number(pt[1]);
      if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;
      latSum += lat;
      lonSum += lon;
      count += 1;
    });
    if (count === 0) return null;
    return [latSum / count, lonSum / count];
  }, [selectedDayBounds]);

  const googleMapsUrl = useMemo(() => {
    if (!selectedDay) return null;

    // Helper to format point as "lat,lng" or "Name, Location"
    const toParam = (activity) => {
      if (activity.coordinates && Array.isArray(activity.coordinates)) {
        return `${activity.coordinates[0]},${activity.coordinates[1]}`;
      }
      return `${activity.name} ${activity.location || ""}`.trim();
    };

    const activities = selectedDayActivities;
    if (activities.length === 0 && !selectedDay.location) return null;

    // Determine Origin
    let originParam = selectedDay.location || "";
    if (activities.length > 0) {
      // If we have activities, default start to first activity
      // Unless the day explicitly has a different "Location" set (acting as a base)
      originParam = toParam(activities[0]);
    }
    // TODO: Ideally uses Previous Day's Lodging or End Location as true origin

    // Determine Destination
    let destParam = selectedDay.location || "";
    if (activities.length > 0) {
      destParam = toParam(activities[activities.length - 1]);
    }

    // Determine Waypoints (everything between first and last)
    const waypoints =
      activities.length > 2 ? activities.slice(1, -1).map(toParam) : [];

    const params = new URLSearchParams({
      api: "1",
      origin: originParam,
      destination: destParam,
      travelmode: "driving",
    });

    if (waypoints.length) params.set("waypoints", waypoints.join("|"));

    return `https://www.google.com/maps/dir/?${params.toString()}`;
  }, [selectedDay, selectedDayActivities]);

  const weatherUrl = useMemo(() => {
    if (!selectedDay?.location) return null;
    return `https://www.google.com/search?q=${encodeURIComponent(
      `weather ${selectedDay.location}`
    )}`;
  }, [selectedDay]);

  const schedule = selectedDay?.schedule || {};
  const dayActivityHours = selectedDayActivities.reduce((sum, activity) => {
    const duration = schedule[activity.id]?.duration ?? activity.duration ?? 0;
    return sum + (Number(duration) || 0);
  }, 0);
  const dayDriveHours = selectedDayRoute
    ? selectedDayRoute.duration_s / 3600
    : 0;
  const dayLoadHours = dayActivityHours + dayDriveHours;

  let dayLoadLabel = "Easy day";
  if (dayLoadHours >= 9) dayLoadLabel = "Ambitious day";
  else if (dayLoadHours >= 7) dayLoadLabel = "Full day";
  else if (dayLoadHours >= 5) dayLoadLabel = "Balanced day";

  const dayLoad =
    dayLoadHours > 0 ? `Est. ${formatHours(dayLoadHours)}` : "No timing yet";

  return (
    <div className="builder-layout">
      <CatalogPanel
        searchMode={searchMode}
        onModeChange={setSearchMode}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        catalogFilter={catalogFilter}
        onFilterChange={setCatalogFilter}
        regionFilter={regionFilter}
        onRegionFilterChange={setRegionFilter}
        showMomOnly={showMomOnly}
        onToggleMomOnly={setShowMomOnly}
        filteredCatalog={filteredCatalog}
        selectedDay={selectedDay}
        onAddActivity={addActivityToDay}
        onOpenDetails={setDetailActivity}
        customActivities={customActivities}
        onQuickAddCustomPlace={handleQuickAddCustomPlace}
        allowedStateAbbrs={allowedPlaceStateAbbrs}
        allowCanadaPlaces={allowCanadaPlaces}
        placeSearchCenter={customPlaceSearchCenter}
        onDeleteCustom={handleDeleteCustom}
      />

      <div className="planner-column">
        <div className="planner-view-toggle">
          <button
            type="button"
            className={`mode-btn ${plannerView === "day" ? "active" : ""}`}
            onClick={() => setPlannerView("day")}
          >
            Focused Day
          </button>
          <button
            type="button"
            className={`mode-btn ${plannerView === "board" ? "active" : ""}`}
            onClick={() => setPlannerView("board")}
          >
            All Days Board
          </button>
        </div>
        {plannerView === "day" ? (
          <DayPlanner
            trip={trip}
            selectedDay={selectedDay}
            selectedDayId={selectedDayId}
            selectedDayActivities={selectedDayActivities}
            selectedDayActivityIds={selectedDayActivityIds}
            dayRoute={selectedDayRoute}
            dayLoad={dayLoad}
            dayLoadLabel={dayLoadLabel}
            onSelectDay={setSelectedDayId}
            onAddDay={addDay}
            onRemoveDay={removeDay}
            onDuplicateDay={duplicateDay}
            onUpdateDay={updateDay}
            onUpdateSchedule={updateSchedule}
            onAutoSchedule={autoScheduleDay}
            onReorderActivities={reorderDayActivities}
            onRemoveActivity={removeActivityFromDay}
            onOpenDetails={setDetailActivity}
          />
        ) : (
          <DayBoard
            trip={trip}
            selectedDayId={selectedDayId}
            onSelectDay={setSelectedDayId}
            getActivity={getAnyActivity}
            onUpdateTripDays={setTrip}
            onOpenDetails={setDetailActivity}
          />
        )}
      </div>

      <MapPanel
        mapActivities={mapActivities}
        dayRoutes={dayRoutes}
        selectedDayId={selectedDayId}
        selectedDayBounds={selectedDayBounds}
        tripRouteTotals={tripRouteTotals}
        routesLoading={routesLoading}
        routesError={routesError}
        costPerMile={costPerMile}
        onCostChange={setCostPerMile}
        estimatedTripCost={estimatedTripCost}
        onResetTrip={clearTrip}
        googleMapsUrl={googleMapsUrl}
        weatherUrl={weatherUrl}
      />

      {detailActivity && (
        <ActivityDetailModal
          activity={detailActivity}
          days={trip.days}
          selectedDayId={selectedDayId}
          onClose={() => setDetailActivity(null)}
          onAddToDay={addActivityToDay}
          onRemoveFromDay={removeActivityFromDay}
          onEditCustom={() => {}}
          onDeleteCustom={handleDeleteCustom}
        />
      )}
    </div>
  );
}
