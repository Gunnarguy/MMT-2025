// ═══════════════════════════════════════════════════════════════════════════════
// MMT-2025 TRIP PLANNER - SINGLE PAGE EXPERIENCE
// Everything on one page - no tab switching needed
// ═══════════════════════════════════════════════════════════════════════════════

import { useState, useEffect, useMemo, useCallback } from 'react'
import './App.css'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'

import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, useSortable, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import {
  supabaseEnabled,
  fetchSharedTripState,
  upsertSharedTripState,
  subscribeToSharedTrip
} from './lib/supabase'

// Data
import { activityCatalog, categories, regions, getActivityById } from './data/catalog'
import { routeTemplates, getRouteTemplate } from './data/templates'

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// ═══════════════════════════════════════════════════════════════════════════════
// STORAGE
// ═══════════════════════════════════════════════════════════════════════════════

const STORAGE_KEY = 'mmt-2025-trip';
const SHARED_TRIP_ID = 'mmt-2025-maine';
const CLIENT_ID_KEY = 'mmt-2025-client-id';

function isValidTripState(state) {
  if (!state || typeof state !== 'object') return false;
  if (!Array.isArray(state.days)) return false;
  return state.days.every(day => day && typeof day.id === 'string' && Array.isArray(day.activities));
}

function getClientId() {
  try {
    const existing = localStorage.getItem(CLIENT_ID_KEY);
    if (existing) return existing;

    const newId = (globalThis.crypto?.randomUUID?.() || `client-${Date.now()}-${Math.random().toString(16).slice(2)}`);
    localStorage.setItem(CLIENT_ID_KEY, newId);
    return newId;
  } catch {
    return `client-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }
}

function loadSavedTrip() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;

    const parsed = JSON.parse(saved);
    if (isValidTripState(parsed)) return parsed;

    // If old/corrupted data exists, clear it so the app can boot
    localStorage.removeItem(STORAGE_KEY);
    console.warn('Ignoring invalid saved trip; reset storage');
  } catch (e) {
    console.error('Failed to load saved trip:', e);
  }
  return null;
}

function saveTrip(tripState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tripState));
  } catch (e) {
    console.error('Failed to save trip:', e);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════════

export default function App() {
  // Trip State
  const [trip, setTrip] = useState(() => {
    const saved = loadSavedTrip();
    if (saved) return saved;

    // Load Mom's route by default
    const momsRoute = getRouteTemplate('moms-original');
    if (momsRoute) {
      return {
        name: momsRoute.name,
        days: momsRoute.days.map((tDay, i) => ({
          id: `day-${i + 1}`,
          dayNumber: tDay.dayNumber,
          label: tDay.label,
          location: tDay.location,
          activities: tDay.suggestedActivities || [],
          notes: tDay.notes || '',
          type: tDay.type
        })),
        createdAt: new Date().toISOString(),
        templateId: 'moms-original'
      };
    }

    return {
      name: "My New England Trip",
      days: Array.from({ length: 7 }, (_, i) => ({
        id: `day-${i + 1}`,
        dayNumber: i + 1,
        label: `Day ${i + 1}`,
        location: '',
        activities: [],
        notes: ''
      })),
      createdAt: new Date().toISOString(),
      templateId: null
    };
  });

  const clientId = useMemo(() => getClientId(), []);
  const [remoteReady, setRemoteReady] = useState(false);

  // UI State
  const [selectedDayId, setSelectedDayId] = useState('day-1');
  const [catalogFilter, setCatalogFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMomOnly, setShowMomOnly] = useState(false);

  // Routing (real driving lines + distance/time)
  const [dayRoutes, setDayRoutes] = useState({});
  const [routesLoading, setRoutesLoading] = useState(false);
  const [routesError, setRoutesError] = useState(null);
  const [baseCoordsByLabel, setBaseCoordsByLabel] = useState({});

  // Optional live cost estimate (user-provided $/mile)
  const [costPerMile, setCostPerMile] = useState(() => {
    try {
      return localStorage.getItem('mmt-cost-per-mile') || '';
    } catch {
      return '';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('mmt-cost-per-mile', costPerMile);
    } catch {
      // ignore
    }
  }, [costPerMile]);

  // Supabase: initial load + realtime subscription
  useEffect(() => {
    if (!supabaseEnabled) return;

    let cancelled = false;
    let subscription = null;

    async function bootstrapFromSupabase() {
      const { data, error } = await fetchSharedTripState(SHARED_TRIP_ID);
      if (cancelled) return;

      if (error) {
        console.warn('Supabase fetch shared trip failed:', error);
        setRemoteReady(true);
        return;
      }

      const remoteState = data?.state;
      const remoteTrip = remoteState?.trip;

      if (isValidTripState(remoteTrip) && remoteTrip.days.length) {
        setTrip(remoteTrip);
      } else {
        // Seed the shared trip if empty
        await upsertSharedTripState(
          { initialized: true, trip, updatedBy: clientId, updatedAt: Date.now() },
          SHARED_TRIP_ID
        );
      }

      subscription = subscribeToSharedTrip(SHARED_TRIP_ID, (payload) => {
        const next = payload?.new?.state;
        const nextTrip = next?.trip;
        if (!isValidTripState(nextTrip) || !nextTrip.days.length) return;
        if (next?.updatedBy && next.updatedBy === clientId) return;

        setTrip(nextTrip);
        saveTrip(nextTrip);
      });

      setRemoteReady(true);
    }

    bootstrapFromSupabase();

    return () => {
      cancelled = true;
      subscription?.unsubscribe?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId]);

  // Supabase: push trip updates (debounced)
  useEffect(() => {
    saveTrip(trip);

    if (!supabaseEnabled || !remoteReady) return;

    const t = setTimeout(() => {
      upsertSharedTripState(
        { initialized: true, trip, updatedBy: clientId, updatedAt: Date.now() },
        SHARED_TRIP_ID
      ).catch((e) => {
        console.warn('Supabase upsert shared trip failed:', e);
      });
    }, 600);

    return () => clearTimeout(t);
  }, [trip, remoteReady, clientId]);

  // Custom Place Mode
  const [searchMode, setSearchMode] = useState('catalog'); // 'catalog' | 'custom'
  const [customActivities, setCustomActivities] = useState(() => {
    try {
      const saved = localStorage.getItem('mmt-custom-activities');
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });

  // Save custom activities
  useEffect(() => {
    localStorage.setItem('mmt-custom-activities', JSON.stringify(customActivities));
  }, [customActivities]);

  // Persist
  useEffect(() => {
    saveTrip(trip);
  }, [trip]);

  // ═══════════════════════════════════════════════════════════════════════════
  // TRIP ACTIONS
  // ═══════════════════════════════════════════════════════════════════════════

  const addActivityToDay = useCallback((dayId, activityId) => {
    setTrip(prev => ({
      ...prev,
      days: prev.days.map(day => {
        if (day.id !== dayId) return day;
        if (day.activities.includes(activityId)) return day;
        return { ...day, activities: [...day.activities, activityId] };
      })
    }));
  }, []);

  const removeActivityFromDay = useCallback((dayId, activityId) => {
    setTrip(prev => ({
      ...prev,
      days: prev.days.map(day => {
        if (day.id !== dayId) return day;
        return { ...day, activities: day.activities.filter(id => id !== activityId) };
      })
    }));
  }, []);

  const reorderDayActivities = useCallback((dayId, oldIndex, newIndex) => {
    if (oldIndex === newIndex) return;
    setTrip(prev => ({
      ...prev,
      days: prev.days.map(day => {
        if (day.id !== dayId) return day;
        return { ...day, activities: arrayMove(day.activities, oldIndex, newIndex) };
      })
    }));
  }, []);

  const updateDay = useCallback((dayId, updates) => {
    setTrip(prev => ({
      ...prev,
      days: prev.days.map(day => day.id === dayId ? { ...day, ...updates } : day)
    }));
  }, []);

  const addDay = useCallback(() => {
    setTrip(prev => {
      const n = prev.days.length + 1;
      return {
        ...prev,
        days: [...prev.days, { id: `day-${n}`, dayNumber: n, label: `Day ${n}`, location: '', activities: [], notes: '' }]
      };
    });
  }, []);

  const removeDay = useCallback((dayId) => {
    if (trip.days.length <= 1) return;
    setTrip(prev => ({
      ...prev,
      days: prev.days.filter(d => d.id !== dayId).map((d, i) => ({ ...d, dayNumber: i + 1, id: `day-${i + 1}` }))
    }));
    setSelectedDayId('day-1');
  }, [trip.days.length]);

  const loadTemplate = useCallback((templateId) => {
    const template = getRouteTemplate(templateId);
    if (!template) return;
    setTrip({
      name: template.name,
      days: template.days.map((tDay, i) => ({
        id: `day-${i + 1}`,
        dayNumber: tDay.dayNumber,
        label: tDay.label,
        location: tDay.location,
        activities: tDay.suggestedActivities || [],
        notes: tDay.notes || '',
        type: tDay.type
      })),
      createdAt: new Date().toISOString(),
      templateId
    });
    setSelectedDayId('day-1');
  }, []);

  const clearTrip = useCallback(() => {
    if (!window.confirm('Clear entire trip?')) return;
    setTrip({
      name: "My New England Trip",
      days: Array.from({ length: 5 }, (_, i) => ({
        id: `day-${i + 1}`,
        dayNumber: i + 1,
        label: `Day ${i + 1}`,
        location: '',
        activities: [],
        notes: ''
      })),
      createdAt: new Date().toISOString(),
      templateId: null
    });
    setSelectedDayId('day-1');
  }, []);

  // ═══════════════════════════════════════════════════════════════════════════
  // CUSTOM PLACE - Simple approach, just add by name
  // ═══════════════════════════════════════════════════════════════════════════

  const [customPlaceName, setCustomPlaceName] = useState('');
  const [customPlaceLocation, setCustomPlaceLocation] = useState('');

  const addCustomPlace = useCallback(async () => {
    if (!customPlaceName.trim()) return;

    const customId = `custom-${Date.now()}`;
    // Best-effort geocode so custom places can appear on the map + be routable.
    // Uses OpenStreetMap Nominatim (no key). If it fails, we still add the place (just without coordinates).
    let coordinates = null;
    try {
      const q = `${customPlaceName.trim()} ${customPlaceLocation.trim() || 'New England'}`.trim();
      const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(q)}&email=${encodeURIComponent('mmt-trip-planner@example.com')}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        const hit = data?.[0];
        if (hit?.lat && hit?.lon) coordinates = [Number(hit.lat), Number(hit.lon)];
      }
    } catch {
      // ignore
    }

    const place = {
      id: customId,
      name: customPlaceName.trim(),
      location: customPlaceLocation.trim() || 'New England',
      category: 'custom',
      description: `Custom place: ${customPlaceName}`,
      momMentioned: false,
      isCustom: true,
      coordinates,
      googleMapsUrl: `https://www.google.com/maps/search/${encodeURIComponent(customPlaceName + ' ' + (customPlaceLocation || 'New England'))}`
    };

    // Store the custom activity
    setCustomActivities(prev => ({ ...prev, [customId]: place }));

    // Add to the selected day
    setTrip(prev => ({
      ...prev,
      days: prev.days.map(day => {
        if (day.id !== selectedDayId) return day;
        return { ...day, activities: [...day.activities, customId] };
      })
    }));

    // Clear inputs
    setCustomPlaceName('');
    setCustomPlaceLocation('');
  }, [customPlaceName, customPlaceLocation, selectedDayId]);

  // Combined activity lookup (catalog + custom)
  const getAnyActivity = useCallback((id) => {
    return getActivityById(id) || customActivities[id] || null;
  }, [customActivities]);

  // ═══════════════════════════════════════════════════════════════════════════
  // COMPUTED
  // ═══════════════════════════════════════════════════════════════════════════

  const selectedDay = useMemo(() => trip.days.find(d => d.id === selectedDayId) || trip.days[0], [trip.days, selectedDayId]);

  const selectedDayActivities = useMemo(() => {
    if (!selectedDay) return [];
    return selectedDay.activities.map(id => getAnyActivity(id)).filter(Boolean);
  }, [selectedDay, getAnyActivity]);

  const selectedDayActivityIds = useMemo(() => {
    return selectedDay?.activities || [];
  }, [selectedDay]);

  const filteredCatalog = useMemo(() => {
    // Cities like "Boston" are day bases, not addable stops.
    let results = activityCatalog.filter(a => a.category !== 'city');

    if (catalogFilter !== 'all') {
      results = results.filter(a => a.category === catalogFilter);
    }
    if (showMomOnly) {
      results = results.filter(a => a.momMentioned);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(a =>
        a.name.toLowerCase().includes(q) ||
        a.location?.toLowerCase().includes(q) ||
        a.description?.toLowerCase().includes(q)
      );
    }
    return results;
  }, [catalogFilter, showMomOnly, searchQuery]);

  const tripStats = useMemo(() => {
    let total = 0;
    trip.days.forEach(d => total += d.activities.length);
    return { days: trip.days.length, activities: total };
  }, [trip.days]);

  // Map data
  const mapActivities = useMemo(() => {
    const acts = [];
    trip.days.forEach(day => {
      day.activities.forEach(id => {
        const a = getAnyActivity(id);
        if (a?.coordinates && a?.category !== 'city') acts.push({ ...a, dayNumber: day.dayNumber });
      });
    });
    return acts;
  }, [trip.days, getAnyActivity]);

  const getDayColor = useCallback((dayNumber) => {
    const hue = ((dayNumber - 1) * 45) % 360;
    return `hsl(${hue} 70% 45%)`;
  }, []);

  const formatMiles = useCallback((meters) => {
    if (!Number.isFinite(meters)) return '—';
    const miles = meters / 1609.344;
    return miles < 10 ? `${miles.toFixed(1)} mi` : `${Math.round(miles)} mi`;
  }, []);

  const formatDuration = useCallback((seconds) => {
    if (!Number.isFinite(seconds)) return '—';
    const mins = Math.round(seconds / 60);
    if (mins < 60) return `${mins} min`;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return m ? `${h}h ${m}m` : `${h}h`;
  }, []);

  const getActivityWaypoints = useCallback((day) => {
    return (day?.activities || [])
      .map(id => getAnyActivity(id))
      .filter(a => a?.category !== 'city')
      .filter(a => a?.coordinates && Array.isArray(a.coordinates) && a.coordinates.length === 2)
      .map(a => ({ id: a.id, name: a.name, coordinates: a.coordinates }));
  }, [getAnyActivity]);

  // Geocode day bases so routes can start/end at the real "where you're staying".
  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    async function geocodeBases() {
      const labels = Array.from(
        new Set(
          (trip.days || [])
            .map(d => (d.location || '').trim())
            .filter(Boolean)
        )
      );

      const updates = {};
      for (const label of labels) {
        if (baseCoordsByLabel[label]) continue;
        try {
          const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(label)}&email=${encodeURIComponent('mmt-trip-planner@example.com')}`;
          const res = await fetch(url, { signal: controller.signal });
          if (!res.ok) continue;
          const data = await res.json();
          const hit = data?.[0];
          if (hit?.lat && hit?.lon) {
            updates[label] = [Number(hit.lat), Number(hit.lon)];
          }
        } catch (e) {
          if (e?.name === 'AbortError') return;
        }
      }

      if (cancelled) return;
      if (Object.keys(updates).length) {
        setBaseCoordsByLabel(prev => ({ ...prev, ...updates }));
      }
    }

    geocodeBases();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [trip.days, baseCoordsByLabel]);

  // Fetch real driving routes for each day (OSRM)
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

        // Start at today's base for explore days; on drive days start from yesterday's base.
        const startBaseLabel = isDriveDay ? prevBaseLabel : endBaseLabel;

        const points = [];
        const startCoord = startBaseLabel ? baseCoordsByLabel[startBaseLabel] : null;
        if (startBaseLabel && startCoord) {
          points.push({ id: `base-start-${day.id}`, name: startBaseLabel, coordinates: startCoord });
        }

        points.push(...getActivityWaypoints(day));

        // On drive days, end at the destination base.
        const endCoord = endBaseLabel ? baseCoordsByLabel[endBaseLabel] : null;
        if (isDriveDay && endBaseLabel && endCoord && endBaseLabel !== startBaseLabel) {
          points.push({ id: `base-end-${day.id}`, name: endBaseLabel, coordinates: endCoord });
        }

        if (points.length < 2) continue;

        const coordStr = points
          .map(p => `${p.coordinates[1]},${p.coordinates[0]}`)
          .join(';');

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

  const selectedDayRoute = dayRoutes[selectedDayId] || null;
  const tripRouteTotals = useMemo(() => {
    let distance_m = 0;
    let duration_s = 0;
    Object.values(dayRoutes).forEach(r => {
      distance_m += r?.distance_m || 0;
      duration_s += r?.duration_s || 0;
    });
    return { distance_m, duration_s };
  }, [dayRoutes]);

  const tripMiles = useMemo(() => tripRouteTotals.distance_m / 1609.344, [tripRouteTotals.distance_m]);
  const parsedCostPerMile = useMemo(() => {
    const n = Number(String(costPerMile).trim());
    return Number.isFinite(n) && n > 0 ? n : null;
  }, [costPerMile]);
  const estimatedTripCost = useMemo(() => {
    if (!parsedCostPerMile) return null;
    return tripMiles * parsedCostPerMile;
  }, [tripMiles, parsedCostPerMile]);
  const selectedDayIndex = useMemo(
    () => trip.days.findIndex(d => d.id === selectedDayId),
    [trip.days, selectedDayId]
  );

  const selectedDayBounds = useMemo(() => {
    if (!selectedDay) return null;
    const isDriveDay = selectedDay?.type === 'drive';
    const endBaseLabel = (selectedDay?.location || '').trim() || null;
    const prevBaseLabel = selectedDayIndex > 0 ? (trip.days[selectedDayIndex - 1]?.location || '').trim() : null;
    const startBaseLabel = isDriveDay ? prevBaseLabel : endBaseLabel;

    const coords = [];
    if (startBaseLabel && baseCoordsByLabel[startBaseLabel]) coords.push(baseCoordsByLabel[startBaseLabel]);
    coords.push(...getActivityWaypoints(selectedDay).map(p => p.coordinates));
    if (isDriveDay && endBaseLabel && baseCoordsByLabel[endBaseLabel] && endBaseLabel !== startBaseLabel) coords.push(baseCoordsByLabel[endBaseLabel]);

    return coords.length ? coords : null;
  }, [selectedDay, selectedDayIndex, trip.days, baseCoordsByLabel, getActivityWaypoints]);

  function FitBounds({ bounds }) {
    const map = useMap();
    useEffect(() => {
      if (!bounds || bounds.length < 1) return;
      map.fitBounds(bounds, { padding: [24, 24] });
    }, [map, bounds]);
    return null;
  }

  function SortableActivityCard({ activityId, index, dayId }) {
    const activity = getAnyActivity(activityId);
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging
    } = useSortable({ id: activityId });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.6 : 1
    };

    if (!activity) return null;

    return (
      <div ref={setNodeRef} style={style} className={`activity-card ${isDragging ? 'dragging' : ''}`}>
        <span className="activity-order">{index + 1}</span>
        <button
          className="drag-handle"
          type="button"
          aria-label="Drag to reorder"
          {...attributes}
          {...listeners}
        >
          ⠿
        </button>
        <span className="activity-icon">{categories[activity.category]?.icon ?? '📍'}</span>
        <div className="activity-info">
          <strong>{activity.name}</strong>
          {activity.momMentioned && <span className="mom-badge">💕</span>}
          <small>{activity.location}</small>
        </div>
        <button
          className="remove-btn"
          onClick={() => removeActivityFromDay(dayId, activityId)}
          type="button"
        >
          ✕
        </button>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════

  return (
    <div className="app">
      {/* ═══════ HEADER ═══════ */}
      <header className="header">
        <div className="header-brand">
          <h1>🍁 MMT 2025</h1>
          <span className="tagline">Girls Trip to New England</span>
        </div>
        <div className="header-stats">
          <span className="stat">{tripStats.days} days</span>
          <span className="stat">{tripStats.activities} activities</span>
        </div>
        <div className="header-actions">
          <select className="template-select" value={trip.templateId || ''} onChange={e => e.target.value && loadTemplate(e.target.value)}>
            <option value="">Load Template...</option>
            {routeTemplates.map(t => (
              <option key={t.id} value={t.id}>{t.emoji} {t.name}</option>
            ))}
          </select>
        </div>
      </header>

      {/* ═══════ MAIN CONTENT ═══════ */}
      <main className="main">
        <div className="itinerary-layout">
            {/* LEFT: Activity Catalog */}
            <aside className="catalog">
              <div className="catalog-header">
                <h2>{searchMode === 'catalog' ? '📚 Activities' : '➕ Add Your Own'}</h2>
                <div className="search-mode-toggle">
                  <button
                    className={`mode-btn ${searchMode === 'catalog' ? 'active' : ''}`}
                    onClick={() => setSearchMode('catalog')}
                  >
                    📚 Catalog
                  </button>
                  <button
                    className={`mode-btn ${searchMode === 'custom' ? 'active' : ''}`}
                    onClick={() => setSearchMode('custom')}
                  >
                    ➕ Add Custom
                  </button>
                </div>
              </div>

              {searchMode === 'catalog' ? (
                <>
                  <div className="catalog-search">
                    <input
                      type="text"
                      placeholder="Search catalog..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="search-input"
                    />
                  </div>

                  <div className="catalog-filters">
                    <button
                      className={`filter-btn ${catalogFilter === 'all' ? 'active' : ''}`}
                      onClick={() => setCatalogFilter('all')}
                    >
                      All
                    </button>
                    {Object.values(categories).filter(cat => cat.id !== 'city').map(cat => (
                      <button
                        key={cat.id}
                        className={`filter-btn ${catalogFilter === cat.id ? 'active' : ''}`}
                        onClick={() => setCatalogFilter(cat.id)}
                      >
                        {cat.icon}
                      </button>
                    ))}
                    <label className="mom-filter">
                      <input type="checkbox" checked={showMomOnly} onChange={e => setShowMomOnly(e.target.checked)} />
                      💕 Mom's Picks
                    </label>
                  </div>

                  <div className="catalog-list">
                    {filteredCatalog.map(activity => (
                      <div key={activity.id} className="catalog-item">
                        <div className="item-main">
                          <span className="item-icon">{categories[activity.category]?.icon}</span>
                          <div className="item-info">
                            <strong>{activity.name}</strong>
                            {activity.momMentioned && <span className="mom-badge">💕</span>}
                            <small>{activity.location}</small>
                          </div>
                        </div>
                        <button
                          className="add-btn"
                          onClick={() => addActivityToDay(selectedDayId, activity.id)}
                          title={`Add to Day ${selectedDay?.dayNumber}`}
                        >
                          + Day {selectedDay?.dayNumber}
                        </button>
                      </div>
                    ))}
                    {filteredCatalog.length === 0 && (
                      <p className="no-results">No activities match your filters</p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="custom-place-form">
                    <h4>➕ Add Any Place</h4>
                    <input
                      type="text"
                      placeholder="Place name (e.g., Mike's Pastry)"
                      value={customPlaceName}
                      onChange={e => setCustomPlaceName(e.target.value)}
                      className="search-input"
                    />
                    <input
                      type="text"
                      placeholder="Location (e.g., Boston, MA)"
                      value={customPlaceLocation}
                      onChange={e => setCustomPlaceLocation(e.target.value)}
                      className="search-input"
                    />
                    <button
                      onClick={addCustomPlace}
                      className="add-custom-btn"
                      disabled={!customPlaceName.trim()}
                    >
                      ➕ Add to Day {selectedDay?.dayNumber}
                    </button>
                  </div>

                  <p className="custom-hint">
                    Type any place name and it'll be added with a Google Maps link!
                  </p>

                  {Object.keys(customActivities).length > 0 && (
                    <div className="custom-activities-list">
                      <h5>Your Custom Places:</h5>
                      {Object.values(customActivities).map(place => (
                        <div key={place.id} className="catalog-item custom-item">
                          <div className="item-main">
                            <span className="item-icon">⭐</span>
                            <div className="item-info">
                              <strong>{place.name}</strong>
                              <small>{place.location}</small>
                            </div>
                          </div>
                          <a
                            href={place.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="maps-link"
                          >
                            🗺️
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </aside>

            {/* CENTER: Trip Builder */}
            <section className="trip-builder">
              {/* Day Tabs */}
              <div className="day-tabs">
                {trip.days.map(day => (
                  <button
                    key={day.id}
                    className={`day-tab ${day.id === selectedDayId ? 'active' : ''}`}
                    onClick={() => setSelectedDayId(day.id)}
                  >
                    <span className="day-num">D{day.dayNumber}</span>
                    <span className="day-loc">{day.location || '...'}</span>
                    <span className="day-count">{day.activities.length}</span>
                  </button>
                ))}
                <button className="add-day-btn" onClick={addDay}>+</button>
              </div>

              {/* Selected Day Content */}
              {selectedDay && (
                <div className="day-content">
                  <div className="day-header">
                    <h2>Day {selectedDay.dayNumber}</h2>
                    <input
                      type="text"
                      value={selectedDay.location}
                      onChange={e => updateDay(selectedDay.id, { location: e.target.value })}
                      placeholder="📍 Where are you staying?"
                      className="location-input"
                    />
                    {trip.days.length > 1 && (
                      <button className="remove-day" onClick={() => removeDay(selectedDay.id)}>🗑️</button>
                    )}
                  </div>

                  <textarea
                    value={selectedDay.notes}
                    onChange={e => updateDay(selectedDay.id, { notes: e.target.value })}
                    placeholder="Notes for this day... driving tips, reservations, ideas"
                    className="day-notes"
                  />

                  <div className="activities-list">
                    <div className="drive-summary">
                      <div className="drive-header">
                        <h3>🚗 Driving</h3>
                        {routesLoading && <span className="drive-meta">Calculating…</span>}
                        {routesError && <span className="drive-meta error">{routesError}</span>}
                      </div>
                      {selectedDayRoute ? (
                        <>
                          <div className="drive-totals">
                            Total: <strong>{formatMiles(selectedDayRoute.distance_m)}</strong> • <strong>{formatDuration(selectedDayRoute.duration_s)}</strong>
                          </div>
                          {selectedDayRoute.legs?.length > 0 && (
                            <div className="drive-legs">
                              {selectedDayRoute.legs.map((leg, i) => (
                                <div key={i} className="drive-leg">
                                  <span className="drive-leg-title">{leg.from} → {leg.to}</span>
                                  <span className="drive-leg-meta">{formatMiles(leg.distance_m)} • {formatDuration(leg.duration_s)}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="drive-empty">
                          Add 2+ places with map pins to see distance/time + the real driving line.
                        </div>
                      )}
                    </div>

                    <h3>📋 Activities ({selectedDayActivities.length})</h3>
                    {selectedDayActivities.length === 0 ? (
                      <p className="empty-msg">← Add activities from the catalog</p>
                    ) : (
                      <DndContext
                        collisionDetection={closestCenter}
                        onDragEnd={({ active, over }) => {
                          if (!over || active.id === over.id) return;
                          const oldIndex = selectedDayActivityIds.indexOf(active.id);
                          const newIndex = selectedDayActivityIds.indexOf(over.id);
                          if (oldIndex < 0 || newIndex < 0) return;
                          reorderDayActivities(selectedDay.id, oldIndex, newIndex);
                        }}
                      >
                        <SortableContext items={selectedDayActivityIds} strategy={verticalListSortingStrategy}>
                          {selectedDayActivityIds.map((activityId, idx) => (
                            <SortableActivityCard
                              key={activityId}
                              activityId={activityId}
                              index={idx}
                              dayId={selectedDay.id}
                            />
                          ))}
                        </SortableContext>
                      </DndContext>
                    )}
                  </div>
                </div>
              )}
            </section>

            {/* RIGHT: Map + Overview */}
            <aside className="map-panel">
              <div className="map-header">
                <div className="map-title">
                  <h3>🗺️ Trip Map</h3>
                  <div className="map-metrics">
                    <span className="map-stat">{mapActivities.length} pins</span>
                    <span className="map-stat">Trip: {formatMiles(tripRouteTotals.distance_m)} • {formatDuration(tripRouteTotals.duration_s)}</span>
                    {estimatedTripCost != null && (
                      <span className="map-stat">Est: ${Math.round(estimatedTripCost).toLocaleString()}</span>
                    )}
                  </div>
                </div>

                <div className="map-controls">
                  <label className="cost-input">
                    $/mi
                    <input
                      value={costPerMile}
                      onChange={(e) => setCostPerMile(e.target.value)}
                      inputMode="decimal"
                      placeholder="0.00"
                    />
                  </label>
                  <button className="action-btn small" onClick={clearTrip}>🔄 Reset</button>
                </div>
              </div>
              <div className="map-container">
                <MapContainer
                  center={[43.5, -71.5]}
                  zoom={7}
                  style={{ height: '100%', width: '100%' }}
                >
                  {selectedDayBounds && <FitBounds bounds={selectedDayBounds} />}
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap'
                  />

                  {Object.values(dayRoutes).map((r) => (
                    <Polyline
                      key={`route-${r.dayId}`}
                      positions={r.line}
                      pathOptions={{
                        color: getDayColor(r.dayNumber),
                        weight: r.dayId === selectedDayId ? 5 : 3,
                        opacity: r.dayId === selectedDayId ? 0.9 : 0.35
                      }}
                    />
                  ))}

                  {mapActivities.map((a, i) => (
                    <Marker key={`${a.id}-${i}`} position={a.coordinates}>
                      <Popup>
                        <strong>Day {a.dayNumber}: {a.name}</strong>
                        <br />{a.location}
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </aside>
          </div>
      </main>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="footer">
        <p>🦞 Lobsters • 🍁 Leaves • 💕 Love — Tere & Mikaela's Epic Adventure</p>
      </footer>
    </div>
  );
}
