import L from "leaflet";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Circle,
  CircleMarker,
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";

import { DAYS, HOME } from "../data/trip";
import geometry from "../data/routeGeometry.json";
import { FUEL_STOPS } from "../data/fuel";
import {
  BORDER_PORTALS,
  HIGHWAY_SHIELDS,
  MICROCLIMATES,
  calculateSunPosition,
} from "../data/mapOverlays";
import { RELOCATION_TOWNS, SCOUT_TIERS } from "../data/relocation";
import { directionsHref, duration, shortDate } from "../lib/format";
import ElevationRibbon from "./visuals/ElevationRibbon";
import SunTracker from "./visuals/SunTracker";
import DaylightRibbon from "./visuals/DaylightRibbon";
import DuneCrossSection from "./visuals/DuneCrossSection";
import MackinacTrack from "./visuals/MackinacTrack";
import { BlueWaterBridgeSteps, DetroitTunnelSteps } from "./visuals/BorderCrossingSteps";
import FlightRunway from "./visuals/FlightRunway";
import SundayComparator from "./visuals/SundayComparator";
import FuelPlanner from "./visuals/FuelPlanner";

const SFO_COORDS = [37.6213, -122.379];
const ORD_COORDS = [41.9742, -87.9073];
const ORD_MMF_COORDS = [41.9786, -87.8892];

function greatCircleArc([lat1, lon1], [lat2, lon2], numPoints = 30) {
  const toRad = (d) => (d * Math.PI) / 180;
  const toDeg = (r) => (r * 180) / Math.PI;
  const φ1 = toRad(lat1),
    λ1 = toRad(lon1),
    φ2 = toRad(lat2),
    λ2 = toRad(lon2);
  const d =
    2 *
    Math.asin(
      Math.sqrt(
        Math.sin((φ2 - φ1) / 2) ** 2 +
          Math.cos(φ1) * Math.cos(φ2) * Math.sin((λ2 - λ1) / 2) ** 2,
      ),
    );
  const points = [];
  for (let i = 0; i <= numPoints; i++) {
    const f = i / numPoints;
    const A = Math.sin((1 - f) * d) / Math.sin(d);
    const B = Math.sin(f * d) / Math.sin(d);
    const x = A * Math.cos(φ1) * Math.cos(λ1) + B * Math.cos(φ2) * Math.cos(λ2);
    const y = A * Math.cos(φ1) * Math.sin(λ1) + B * Math.cos(φ2) * Math.sin(λ2);
    const z = A * Math.sin(φ1) + B * Math.sin(φ2);
    const φ = Math.atan2(z, Math.sqrt(x ** 2 + y ** 2));
    const λ = Math.atan2(y, x);
    points.push([+toDeg(φ).toFixed(4), +toDeg(λ).toFixed(4)]);
  }
  return points;
}

const SFO_TO_ORD_ARC = greatCircleArc(SFO_COORDS, ORD_COORDS, 35);

/** Read a `--day-N` token off the document so map colours track the theme. */
function dayColor(index) {
  if (typeof window === "undefined") return "#1f7a8c";
  return (
    getComputedStyle(document.documentElement)
      .getPropertyValue(`--day-${index}`)
      .trim() || "#1f7a8c"
  );
}

function pinIcon({ label, color, variant = "", title = "" }) {
  const isBed = variant.includes("bed");
  const isFuel = variant.includes("fuel");
  const isFlight = variant.includes("flight");
  const isCar = variant.includes("car");
  const isBorder = variant.includes("border");
  const isClimate = variant.includes("climate");
  const isHome = variant.includes("home");
  const isVehicle = variant.includes("vehicle");

  let glyph = label;
  let bg = color || "#2563eb";

  if (isBed) {
    glyph = "🛏️";
    bg = "#0f172a";
  } else if (isFuel) {
    glyph = "⛽";
    bg = "#b45309";
  } else if (isFlight) {
    glyph = label || "✈";
    bg = "#7c3aed";
  } else if (isCar) {
    glyph = "🚗";
    bg = "#2563eb";
  } else if (isBorder) {
    glyph = label || "🇨🇦";
    bg = "#dc2626";
  } else if (isClimate) {
    glyph = label || "💨";
    bg = "#0284c7";
  } else if (isHome) {
    glyph = "🏠";
    bg = "#1e293b";
  } else if (isVehicle) {
    glyph = label || "🚗";
    bg = "#2563eb";
  }

  const html = `
    <div class="map-pointer-pin ${variant}" style="--pin-bg: ${bg};" title="${title || label || ""}">
      <div class="pin-bubble">
        <span class="pin-symbol">${glyph}</span>
      </div>
      <div class="pin-arrow"></div>
      <div class="pin-ground-dot"></div>
    </div>
  `;

  return L.divIcon({
    className: "map-pointer-wrapper",
    html: html,
    iconSize: [32, 42],
    iconAnchor: [16, 42], // Downward needle pointer lands directly on ground coordinate
    popupAnchor: [0, -42],
  });
}

/**
 * Declutter proximate markers:
 * When markers share close coordinates (< 2.5 miles), disperse them into a radial arc
 * with needle stems so each point is visible and never stacked on top of each other.
 */
function declutterMarkers(items, zoomScale = 1) {
  if (!items || items.length <= 1) {
    return (items || []).map((item) => ({
      ...item,
      displayCoords: item.coords,
      rawCoords: item.coords,
      isDispersed: false,
    }));
  }

  const clusters = [];
  items.forEach((item) => {
    if (!item.coords) return;
    let placed = false;
    for (const cl of clusters) {
      const [cLat, cLon] = cl.center;
      const dLat = Math.abs(item.coords[0] - cLat);
      const dLon = Math.abs(item.coords[1] - cLon);
      if (dLat < 0.035 * zoomScale && dLon < 0.045 * zoomScale) {
        cl.items.push(item);
        placed = true;
        break;
      }
    }
    if (!placed) {
      clusters.push({ center: [...item.coords], items: [item] });
    }
  });

  const result = [];
  clusters.forEach((cl) => {
    const count = cl.items.length;
    if (count === 1) {
      result.push({
        ...cl.items[0],
        displayCoords: cl.items[0].coords,
        rawCoords: cl.items[0].coords,
        isDispersed: false,
      });
    } else {
      const [cLat, cLon] = cl.center;
      // Pixel-targeted ring: two pins sit ±12px, bigger clusters grow just
      // enough that adjacent fan slots clear a compact pin (arc ≥ ~22px).
      // zoomScale/1351 converts a pixel target to degrees at the current zoom.
      const ringPx = Math.max(12, 3.5 * count);
      cl.items.forEach((item, i) => {
        const angle = (2 * Math.PI * i) / count - Math.PI / 2;
        const radiusLat = (ringPx * zoomScale) / 1351;
        const radiusLon = radiusLat * 1.41;
        const dispLat = cLat + Math.sin(angle) * radiusLat;
        const dispLon = cLon + Math.cos(angle) * radiusLon;
        result.push({
          ...item,
          displayCoords: [dispLat, dispLon],
          rawCoords: item.coords,
          isDispersed: true,
        });
      });
    }
  });
  return result;
}

/**
 * Place Town Scout pins away from every already-placed pin.
 * Scout towns sit at town centres — exactly where day stops, hotels, and fuel
 * pins cluster — so instead of dispersing only against each other, each scout
 * pin is repelled from ALL visible markers: it tries eight bearings (starting
 * away from the local crowd) at a wider radius than the trip pins use, and the
 * standard needle stem ties it back to the true coordinate.
 */
function placeScoutPins(items, obstacles, zoomScale = 1) {
  // Pixel-targeted: a ~26px stand-off from the town centre and a ~20px
  // personal-space box, at whatever the current zoom is.
  const rLat = (26 * zoomScale) / 1351;
  const rLon = rLat * 1.41;
  const NEAR_LAT = (20 * zoomScale) / 1351;
  const NEAR_LON = NEAR_LAT * 1.41;
  const all = obstacles.filter(Boolean).map((c) => [...c]);
  return items.map((item) => {
    const near = all.filter(
      (o) =>
        Math.abs(o[0] - item.coords[0]) < NEAR_LAT * 2 &&
        Math.abs(o[1] - item.coords[1]) < NEAR_LON * 2,
    );
    if (!near.length) {
      all.push([...item.coords]);
      return { ...item, displayCoords: item.coords, rawCoords: item.coords, isDispersed: false };
    }
    const cy = near.reduce((n, o) => n + o[0], 0) / near.length;
    const cx = near.reduce((n, o) => n + o[1], 0) / near.length;
    let away = Math.atan2(item.coords[0] - cy, item.coords[1] - cx);
    if (!Number.isFinite(away) || (cy === item.coords[0] && cx === item.coords[1])) {
      away = (3 * Math.PI) / 4; // default: stand off to the northwest
    }
    for (let k = 0; k < 8; k += 1) {
      const a = away + k * (Math.PI / 4);
      const lat = item.coords[0] + Math.sin(a) * rLat;
      const lon = item.coords[1] + Math.cos(a) * rLon;
      const clash = all.some(
        (o) => Math.abs(o[0] - lat) < NEAR_LAT * 1.2 && Math.abs(o[1] - lon) < NEAR_LON * 1.2,
      );
      if (!clash) {
        all.push([lat, lon]);
        return { ...item, displayCoords: [lat, lon], rawCoords: item.coords, isDispersed: true };
      }
    }
    const fallback = [item.coords[0] + rLat, item.coords[1] - rLon];
    all.push(fallback);
    return { ...item, displayCoords: fallback, rawCoords: item.coords, isDispersed: true };
  });
}

function shieldIcon(shield) {
  return L.divIcon({
    className: "",
    html: `<div class="shield-badge shield--${shield.type}"><span>${shield.route}</span></div>`,
    iconSize: [40, 22],
    iconAnchor: [20, 11],
    popupAnchor: [0, -12],
  });
}

/** Refit the map whenever the visible day set changes. */
function FitBounds({ bounds, deps }) {
  const map = useMap();
  useEffect(() => {
    if (!bounds?.length) return;
    map.fitBounds(bounds, { padding: [42, 42], maxZoom: 11 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return null;
}

/** Report the live zoom level so marker dispersal can scale with it. */
function ZoomTracker({ onZoom }) {
  const map = useMap();
  useEffect(() => {
    const report = () => onZoom(map.getZoom());
    report();
    map.on("zoomend", report);
    return () => map.off("zoomend", report);
  }, [map, onZoom]);
  return null;
}

/** Trigger map size recalculation when expanded mode flips. */
function InvalidateMapSize({ isExpanded }) {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 280);
    return () => clearTimeout(timer);
  }, [map, isExpanded]);
  return null;
}

/** Track vehicle position during playback and smoothly pan map */
function VehicleTracker({ currentCoord, isPlaying }) {
  const map = useMap();
  useEffect(() => {
    if (isPlaying && currentCoord) {
      map.panTo(currentCoord, { animate: true, duration: 0.2 });
    }
  }, [currentCoord, isPlaying, map]);
  return null;
}

/** Which days a fresh map shows: just the focused one, or the whole trip. */
function defaultVisible(focusDayId) {
  return focusDayId ? new Set([focusDayId]) : new Set(DAYS.map((d) => d.id));
}

export default function RouteMap({ focusDayId = null, height, compact = false }) {
  const [visible, setVisible] = useState(() => defaultVisible(focusDayId));
  const [showFlight, setShowFlight] = useState(focusDayId === "d0");
  const [isExpanded, setIsExpanded] = useState(false);
  const [mapStyle, setMapStyle] = useState("streets");

  // Feature Toggles
  const [showElevation, setShowElevation] = useState(false);
  const [showSunTracker, setShowSunTracker] = useState(false);
  const [simHour, setSimHour] = useState(19.25); // 7:15 PM Golden hour default
  const [hoverElevationPoint, setHoverElevationPoint] = useState(null);

  // Layer filters
  const [layerFilter, setLayerFilter] = useState({
    stops: true,
    gas: true,
    hotels: true,
    flight: true,
    shields: true,
    borders: true,
    climate: true,
    scout: false,
  });

  // Dispersal offsets are geographic degrees derived from a pixel target, so
  // this factor MUST keep shrinking as you zoom in — one zoom level in halves
  // the degrees a pixel is worth. Flooring it at 1 (as an earlier version did)
  // froze the conversion past z10.4, so by z14 offsets were ~12x too wide and
  // clusters were flung miles from the coordinates their stems pointed at.
  // Ceiling 22 stops whole-continent zoom from fanning absurdly; the small
  // floor just avoids degenerate values at extreme street zoom.
  const [zoomLevel, setZoomLevel] = useState(6);
  const dispersalScale = Math.min(22, Math.max(0.02, 2 ** (10.4 - zoomLevel)));

  // Playback Simulator State
  const [isPlaying, setIsPlaying] = useState(false);
  const [playProgress, setPlayProgress] = useState(0); // 0 to 100
  const [playSpeed, setPlaySpeed] = useState(1); // 1x, 2x, 4x

  const [colors, setColors] = useState(() => DAYS.map((_, i) => dayColor(i)));
  const wrapRef = useRef(null);

  // Close expanded map on Escape key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && isExpanded) {
        setIsExpanded(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isExpanded]);

  // Day colours track active theme
  useEffect(() => {
    const read = () => setColors(DAYS.map((_, i) => dayColor(i)));
    read();
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", read);
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => {
      mq.removeEventListener("change", read);
      observer.disconnect();
    };
  }, []);

  // Reset day filter on focus change
  const [lastFocus, setLastFocus] = useState(focusDayId);
  if (lastFocus !== focusDayId) {
    setLastFocus(focusDayId);
    setVisible(defaultVisible(focusDayId));
  }

  const shownDays = useMemo(
    () => DAYS.filter((d) => visible.has(d.id)),
    [visible],
  );

  /** All coordinates in order for playback simulation */
  const allPathPoints = useMemo(() => {
    const pts = [];
    if (visible.has("d0")) {
      pts.push(...SFO_TO_ORD_ARC);
      if (geometry.d0?.line) pts.push(...geometry.d0.line);
    }
    shownDays.forEach((d) => {
      if (d.id !== "d0" && geometry[d.id]?.line) {
        pts.push(...geometry[d.id].line);
      }
    });
    return pts.length ? pts : [HOME.coords];
  }, [shownDays, visible]);

  // Playback timer tick
  useEffect(() => {
    if (!isPlaying) return;
    const intervalTime = Math.max(30, Math.floor(120 / playSpeed));
    const timer = setInterval(() => {
      setPlayProgress((prev) => {
        if (prev >= 100) {
          setIsPlaying(false);
          return 0;
        }
        return Math.min(100, prev + 0.35 * playSpeed);
      });
    }, intervalTime);
    return () => clearInterval(timer);
  }, [isPlaying, playSpeed]);

  const currentVehicleCoord = useMemo(() => {
    if (!allPathPoints.length) return HOME.coords;
    const idx = Math.min(
      allPathPoints.length - 1,
      Math.floor((playProgress / 100) * allPathPoints.length),
    );
    return allPathPoints[idx] || HOME.coords;
  }, [allPathPoints, playProgress]);

  const isVehicleFlying = useMemo(() => {
    return (
      visible.has("d0") &&
      playProgress < (SFO_TO_ORD_ARC.length / allPathPoints.length) * 100
    );
  }, [visible, playProgress, allPathPoints]);

  /** Mappable stops on visible days */
  // One dispersal pass across ALL pin groups. The old per-group passes left
  // cross-group stacks — a bed pin and the day's final stop share exact
  // coordinates every night — so stops, hotels, and fuel now declutter
  // together and split back out for rendering.
  const { markers, beds, fuelPins } = useMemo(() => {
    const raw = [];
    if (layerFilter.stops) {
      shownDays.forEach((day) => {
        let n = 0;
        (day.stops || []).forEach((stop) => {
          if (!stop.coords) return;
          n += 1;
          raw.push({
            kind: "stop",
            key: `${day.id}-${stop.id}`,
            coords: stop.coords,
            label: String(n),
            color: colors[day.index] || "#1f7a8c",
            title: stop.name,
            where: stop.where,
            dayTitle: `${shortDate(day.date)} · ${day.title}`,
            address: stop.address,
          });
        });
      });
    }
    if (layerFilter.hotels) {
      shownDays
        .filter((d) => d.sleep?.coords)
        .forEach((d) => {
          raw.push({
            kind: "bed",
            key: `bed-${d.id}`,
            coords: d.sleep.coords,
            color: colors[d.index] || "#1f7a8c",
            name: d.sleep.name,
            city: d.sleep.city,
            address: d.sleep.address,
            date: d.date,
          });
        });
    }
    if (layerFilter.gas) {
      FUEL_STOPS.filter((f) => visible.has(f.dayId)).forEach((f) => {
        raw.push({
          kind: "fuel",
          key: `fuel-${f.id}`,
          coords: f.coords,
          color: "#d97706",
          stopName: f.stopName,
          brand: f.brand,
          address: f.address,
          action: f.action,
          why: f.why,
          date: f.date,
          mileMarker: f.mileMarker,
        });
      });
    }
    const placed = declutterMarkers(raw, dispersalScale);
    return {
      markers: placed.filter((x) => x.kind === "stop"),
      beds: placed.filter((x) => x.kind === "bed"),
      fuelPins: placed.filter((x) => x.kind === "fuel"),
    };
  }, [
    shownDays,
    colors,
    visible,
    layerFilter.stops,
    layerFilter.hotels,
    layerFilter.gas,
    dispersalScale,
  ]);

  const scoutPins = useMemo(() => {
    if (!layerFilter.scout) return [];
    const obstacles = [
      ...markers.map((m) => m.displayCoords || m.coords),
      ...beds.map((b) => b.displayCoords || b.coords),
      ...fuelPins.map((f) => f.displayCoords || f.coords),
      ...BORDER_PORTALS.map((b) => b.coords),
      ...MICROCLIMATES.map((c) => c.coords),
      HOME.coords,
    ];
    return placeScoutPins(RELOCATION_TOWNS, obstacles, dispersalScale);
  }, [layerFilter.scout, markers, beds, fuelPins, dispersalScale]);

  const lines = useMemo(
    () =>
      shownDays
        .filter((d) => geometry[d.id])
        .map((d) => ({
          id: d.id,
          line: geometry[d.id].line,
          color: colors[d.index] || "#1f7a8c",
        })),
    [shownDays, colors],
  );

  const bounds = useMemo(() => {
    const pts = [
      ...lines.flatMap((l) => l.line),
      ...markers.map((m) => m.coords),
      ...beds.map((b) => b.coords),
      ...fuelPins.map((f) => f.coords),
    ];
    if (visible.has("d0") && (visible.size === 1 || showFlight)) {
      pts.push(SFO_COORDS, ...SFO_TO_ORD_ARC, ORD_COORDS, ORD_MMF_COORDS, HOME.coords);
    }
    return pts.length ? pts : [HOME.coords];
  }, [lines, markers, beds, fuelPins, visible, showFlight]);

  const toggle = useCallback((id) => {
    setVisible((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next.size ? next : new Set(DAYS.map((d) => d.id));
    });
  }, []);

  const toggleLayer = useCallback((layer) => {
    setLayerFilter((prev) => ({ ...prev, [layer]: !prev[layer] }));
  }, []);

  const hudStats = useMemo(() => {
    if (visible.size === 1) {
      const dayId = [...visible][0];
      const d = DAYS.find((day) => day.id === dayId);
      if (!d) return null;
      return {
        title: `${shortDate(d.date)} · ${d.title}`,
        miles: d.miles ? `${d.miles} mi` : "—",
        drive: d.driveMinutes ? duration(d.driveMinutes) : "—",
        sleep: d.sleep ? d.sleep.city : "Home in Palatine",
      };
    }
    const totalM = shownDays.reduce((acc, d) => acc + (d.miles || 0), 0);
    const totalD = shownDays.reduce((acc, d) => acc + (d.driveMinutes || 0), 0);
    return {
      title: `${shownDays.length} Days Active`,
      miles: `${totalM.toLocaleString()} mi`,
      drive: duration(totalD),
      sleep: "5 Stays · 4 Gas Stops",
    };
  }, [visible, shownDays]);

  const solarData = useMemo(() => calculateSunPosition(simHour), [simHour]);

  return (
    <>
      <div className={`mapwrap${isExpanded ? " is-expanded" : ""}`} ref={wrapRef}>
        <div className={`map-canvas-frame${zoomLevel <= 8.5 ? " pins-compact" : ""}`}>
          {/* Floating HUD & Map Controls Overlay */}
          <div className="map-hud-bar">
        {hudStats && (
          <div className="map-hud-card">
            <span className="map-hud-title">{hudStats.title}</span>
            <span className="map-hud-stat">
              <b>{hudStats.miles}</b>
            </span>
            <span className="map-hud-stat">
              Drive: <b>{hudStats.drive}</b>
            </span>
          </div>
        )}

        <div className="map-top-actions">
          <button
            type="button"
            className={`map-action-pill${showSunTracker ? " is-active" : ""}`}
            onClick={() => setShowSunTracker((s) => !s)}
            title="Toggle Solar Position & Golden Hour Simulator"
          >
            🌅 {showSunTracker ? "Hide Sun" : "Golden Hour"}
          </button>
          <button
            type="button"
            className={`map-action-pill${showElevation ? " is-active" : ""}`}
            onClick={() => setShowElevation((e) => !e)}
            title="Toggle Topographic Elevation Profile"
          >
            📈 {showElevation ? "Hide Elevation" : "Elevation"}
          </button>
          <button
            type="button"
            className="map-action-pill"
            onClick={() => setMapStyle((s) => (s === "streets" ? "satellite" : "streets"))}
            title="Toggle between Road Map and Satellite Topography"
          >
            {mapStyle === "streets" ? "🛰️ Satellite" : "🗺️ Streets"}
          </button>
          {!compact && (
            <button
              type="button"
              className="map-action-pill"
              onClick={() => setIsExpanded((e) => !e)}
              title={isExpanded ? "Exit Expanded View (Esc)" : "Expand Map Full View"}
            >
              {isExpanded ? "✕ Minimize" : "⛶ Expand"}
            </button>
          )}
        </div>
      </div>

      <MapContainer
        center={HOME.coords}
        zoom={6}
        scrollWheelZoom={false}
        tap={false}
        touchZoom={true}
        style={height && !isExpanded ? { height } : undefined}
      >
        <ZoomTracker onZoom={setZoomLevel} />
        {mapStyle === "streets" ? (
          <TileLayer
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            maxZoom={19}
          />
        ) : (
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution='&copy; <a href="https://www.esri.com/">Esri</a>, USGS, Maxar'
            maxZoom={19}
          />
        )}

        <FitBounds
          bounds={bounds}
          deps={[shownDays.length, focusDayId, showFlight, isExpanded]}
        />
        <InvalidateMapSize isExpanded={isExpanded} />
        <VehicleTracker currentCoord={currentVehicleCoord} isPlaying={isPlaying} />

        {/* Golden Hour Ambient Overlay along Shorelines */}
        {showSunTracker && solarData.isGoldenHour && (
          <Circle
            center={[44.5, -86.2]}
            radius={280000}
            pathOptions={{
              fillColor: "#f59e0b",
              fillOpacity: 0.12,
              stroke: false,
            }}
          />
        )}

        {/* Day 0 Inbound Flight Arc (SFO → ORD) & Rental Car Hand-off */}
        {visible.has("d0") && layerFilter.flight && (
          <>
            <Polyline
              positions={SFO_TO_ORD_ARC}
              pathOptions={{
                color: "#7c3aed",
                weight: 4,
                opacity: 0.95,
                dashArray: "8 8",
              }}
            />
            <Marker
              position={SFO_COORDS}
              icon={pinIcon({ label: "🛫", color: "#7c3aed", variant: "pin--flight" })}
            >
              <Popup>
                <b>SFO — San Francisco International</b>
                <br />
                <span className="muted">Flight AA 2358 Departure (1:29 PM PDT)</span>
                <br />
                Nonstop to Chicago O&rsquo;Hare · 1,846 miles
              </Popup>
            </Marker>
            <Marker
              position={[40.5962, -109.1675]}
              icon={pinIcon({ label: "✈", color: "#7c3aed", variant: "pin--flight" })}
            >
              <Popup>
                <b>Flight AA 2358 in Flight</b>
                <br />
                <span className="muted">SFO → ORD · 4h 52m flight time</span>
              </Popup>
            </Marker>
            <Marker
              position={ORD_COORDS}
              icon={pinIcon({ label: "🛬", color: "#7c3aed", variant: "pin--flight" })}
            >
              <Popup>
                <b>ORD — Chicago O&rsquo;Hare International</b>
                <br />
                <span className="muted">Flight AA 2358 Arrival (8:21 PM CDT)</span>
                <br />
                Terminal 3 · Take ATS people-mover to Rental Car Facility
              </Popup>
            </Marker>
            <Marker
              position={ORD_MMF_COORDS}
              icon={pinIcon({ label: "🚗", color: "#2563eb", variant: "pin--car" })}
            >
              <Popup>
                <b>Budget Rental Pickup</b>
                <br />
                <span className="muted">9:00 PM CDT · 10255 W Zemke Blvd</span>
                <br />
                Mazda CX-50 · Remember Canadian Insurance Card
              </Popup>
            </Marker>
          </>
        )}

        {/* Day 7 Outbound Flight Arc (ORD → SFO) */}
        {visible.has("d7") && layerFilter.flight && (
          <>
            <Polyline
              positions={SFO_TO_ORD_ARC}
              pathOptions={{
                color: "#7c3aed",
                weight: 3,
                opacity: 0.65,
                dashArray: "6 6",
              }}
            />
            <Marker
              position={ORD_COORDS}
              icon={pinIcon({ label: "✈", color: "#7c3aed", variant: "pin--flight" })}
            >
              <Popup>
                <b>Flight AA 1253 Departure</b>
                <br />
                <span className="muted">ORD 3:20 PM CDT → SFO 6:09 PM PDT</span>
                <br />
                Terminal 3 · Gate closes 3:05 PM CDT
              </Popup>
            </Marker>
          </>
        )}

        {lines.map((l) => (
          <Polyline
            key={l.id}
            positions={l.line}
            pathOptions={{
              color: l.color,
              weight: 4,
              opacity: 0.85,
              lineCap: "round",
              lineJoin: "round",
            }}
          />
        ))}

        {/* Home: start and finish, same pin. */}
        <Marker
          position={HOME.coords}
          icon={pinIcon({ label: "⌂", color: "#16242c", variant: "pin--home" })}
        >
          <Popup>
            <b>Home</b>
            <br />
            {HOME.address}
            <br />
            <span className="muted">Start 9/15 · Finish 9/21</span>
          </Popup>
        </Marker>

        {beds.map((b) => (
          <div key={b.key}>
            {b.isDispersed && (
              <Polyline
                positions={[b.rawCoords, b.displayCoords]}
                pathOptions={{
                  color: "#38bdf8",
                  weight: 1.5,
                  dashArray: "2 4",
                  opacity: 0.45,
                }}
              />
            )}
            <Marker
              position={b.displayCoords || b.coords}
              icon={pinIcon({ label: "🛏", color: b.color, variant: "pin--bed", title: b.name })}
            >
              <Popup>
                <b>{b.name}</b>
                <br />
                {b.city}
                <br />
                <span className="muted">Night of {shortDate(b.date)}</span>
              </Popup>
            </Marker>
          </div>
        ))}

        {fuelPins.map((f) => (
          <div key={f.key}>
            {f.isDispersed && (
              <Polyline
                positions={[f.rawCoords, f.displayCoords]}
                pathOptions={{
                  color: "#f59e0b",
                  weight: 1.5,
                  dashArray: "2 4",
                  opacity: 0.45,
                }}
              />
            )}
            <Marker
              position={f.displayCoords || f.coords}
              icon={pinIcon({ label: "⛽", color: "#d97706", variant: "pin--fuel", title: f.stopName })}
            >
              <Popup>
                <b>{f.stopName}</b>
                <br />
                <span className="muted">{f.brand}</span>
                <br />
                <b>Trip Milepost:</b> Mile {f.mileMarker} · {f.action}
                <br />
                <span className="muted" style={{ fontSize: "11px" }}>
                  {f.why}
                </span>
                {f.address && (
                  <>
                    <br />
                    <a
                      href={directionsHref(null, f.address)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Directions to Gas Station
                    </a>
                  </>
                )}
              </Popup>
            </Marker>
          </div>
        ))}

        {/* Highway Shields Layer */}
        {layerFilter.shields &&
          HIGHWAY_SHIELDS.map((s) => (
            <Marker key={s.id} position={s.coords} icon={shieldIcon(s)}>
              <Popup>
                <b>{s.name}</b>
                <br />
                <span className="muted">{s.desc}</span>
              </Popup>
            </Marker>
          ))}

        {/* International Border Portals Layer */}
        {layerFilter.borders &&
          BORDER_PORTALS.map((b) => (
            <Marker
              key={b.id}
              position={b.coords}
              icon={pinIcon({ label: "🇨🇦", color: "#dc2626", variant: "pin--border-portal" })}
            >
              <Popup>
                <b>{b.name}</b>
                <br />
                <span style={{ color: "#dc2626", fontWeight: 700 }}>{b.direction}</span>
                <br />
                <span className="muted">{b.crossing}</span>
                <br />
                <b>Toll:</b> {b.toll}
                <br />
                <b>Clearance:</b> {b.clearance}
                <div style={{ marginTop: "6px", fontSize: "11px" }}>
                  <b>Required:</b>
                  <ul style={{ paddingLeft: "14px", margin: "2px 0" }}>
                    {b.checklist.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              </Popup>
            </Marker>
          ))}

        {/* Town Scout Layer — relocation reconnaissance pins */}
        {layerFilter.scout &&
          scoutPins.map((t) => {
            const tier = SCOUT_TIERS.find((x) => x.id === t.tier);
            return (
              <div key={t.id}>
                {t.isDispersed && (
                  <Polyline
                    positions={[t.rawCoords, t.displayCoords]}
                    pathOptions={{
                      color: tier.color,
                      weight: 1.5,
                      dashArray: "2 4",
                      opacity: 0.45,
                    }}
                  />
                )}
                <Marker
                  position={t.displayCoords || t.coords}
                  icon={pinIcon({ label: "⌂", color: tier.color, variant: "pin--scout", title: t.name })}
                >
                  <Popup>
                    <b>{t.name}</b>
                    <br />
                    <span style={{ color: tier.color, fontWeight: 700 }}>{tier.label}</span>
                    {" · "}
                    <span className="muted">{t.verified === "yes" ? "✓ verified" : "≈ sources split"}</span>
                    <div style={{ marginTop: "4px", fontSize: "11px", lineHeight: 1.5 }}>
                      <b>Median:</b> {t.median}
                      <br />
                      <b>Comfortable:</b> {t.comfort}
                      <br />
                      <b>Crime v/p:</b> {t.crime} · <b>Snow:</b> {t.snow}
                      <br />
                      <b>Tax:</b> {t.tax}
                      <br />
                      <b>To Palatine:</b> {t.drive}
                    </div>
                    <div className="muted" style={{ marginTop: "4px", fontSize: "11px" }}>
                      Full workup on the Scout tab.
                    </div>
                  </Popup>
                </Marker>
              </div>
            );
          })}

        {/* Microclimates Layer */}
        {layerFilter.climate &&
          MICROCLIMATES.map((c) => (
            <Marker
              key={c.id}
              position={c.coords}
              icon={pinIcon({ label: c.icon, color: "#0284c7", variant: "pin--climate" })}
            >
              <Popup>
                <b>{c.title}</b>
                <br />
                <span style={{ color: "#0284c7", fontWeight: 700 }}>{c.badge}</span>
                <br />
                <span className="muted" style={{ fontSize: "11px" }}>
                  {c.detail}
                </span>
              </Popup>
            </Marker>
          ))}

        {/* Animated Moving Vehicle during Playback */}
        {isPlaying && (
          <Marker
            position={currentVehicleCoord}
            icon={pinIcon({
              label: isVehicleFlying ? "✈" : "🚗",
              color: "#2563eb",
              variant: "pin--vehicle-moving",
            })}
          >
            <Popup>
              <b>{isVehicleFlying ? "AA 2358 in Flight" : "Mazda CX-50 Cruising"}</b>
              <br />
              Trip Progress: {Math.round(playProgress)}%
            </Popup>
          </Marker>
        )}

        {markers.map((m) => (
          <div key={m.key}>
            {m.isDispersed && (
              <Polyline
                positions={[m.rawCoords, m.displayCoords]}
                pathOptions={{
                  color: m.color,
                  weight: 1.5,
                  dashArray: "2 4",
                  opacity: 0.45,
                }}
              />
            )}
            <Marker position={m.displayCoords || m.coords} icon={pinIcon(m)}>
              <Popup>
                <b>{m.title}</b>
                <br />
                {m.where && (
                  <>
                    <span className="muted">{m.where}</span>
                    <br />
                  </>
                )}
                <span className="muted">{m.dayTitle}</span>
                {m.address && (
                  <>
                    <br />
                    <a
                      href={directionsHref(null, m.address)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Directions
                    </a>
                  </>
                )}
              </Popup>
            </Marker>
          </div>
        ))}

        {/* Ferry hop */}
        {visible.has("d4") && (
          <>
            <Polyline
              positions={[
                [45.7775, -84.7278],
                [45.8492, -84.6189],
              ]}
              pathOptions={{
                color: colors[4],
                weight: 3,
                opacity: 0.9,
                dashArray: "3 7",
              }}
            />
            <CircleMarker
              center={[45.8492, -84.6189]}
              radius={7}
              pathOptions={{
                color: "#fff",
                weight: 2,
                fillColor: colors[4],
                fillOpacity: 1,
              }}
            >
              <Popup>
                <b>Mackinac Island</b>
                <br />
                <span className="muted">Friday 9/18 · Shepler&rsquo;s ferry</span>
              </Popup>
            </CircleMarker>
          </>
        )}

        {/* Hover Elevation Milestone Marker */}
        {hoverElevationPoint && hoverElevationPoint.coords && (
          <Marker
            position={hoverElevationPoint.coords}
            icon={L.divIcon({
              className: "elevation-hover-marker",
              html: `<div class="elev-pulse-circle"></div><div class="elev-tooltip-pill">📈 <b>${hoverElevationPoint.label}</b> · ${hoverElevationPoint.elev} ft ASL</div>`,
              iconSize: [160, 44],
              iconAnchor: [80, 22],
            })}
          />
        )}
      </MapContainer>

      {/* Floating Interactive Drawer for Elevation & Sun Tracker Over Map */}
      {!compact && (showElevation || showSunTracker) && (
        <div className="map-floating-drawer">
          {showElevation && (
            <ElevationRibbon
              activeDayId={visible.size === 1 ? [...visible][0] : null}
              onHoverPoint={setHoverElevationPoint}
              onClose={() => {
                setShowElevation(false);
                setHoverElevationPoint(null);
              }}
            />
          )}
          {showSunTracker && (
            <SunTracker
              hour={simHour}
              onHourChange={setSimHour}
              onClose={() => setShowSunTracker(false)}
            />
          )}
        </div>
      )}
      </div>

      {/* Dedicated Interactive Route Playback Deck */}
      <div className="playback-deck">
        <div className="playback-deck-controls">
          <button
            type="button"
            className="playback-btn"
            onClick={() => setIsPlaying((p) => !p)}
          >
            {isPlaying ? "⏸ Pause" : "▶ Play Trip"}
          </button>
          <div className="playback-speed-group">
            <button
              type="button"
              className={`playback-speed-pill${playSpeed === 1 ? " is-active" : ""}`}
              onClick={() => setPlaySpeed(1)}
            >
              1x
            </button>
            <button
              type="button"
              className={`playback-speed-pill${playSpeed === 2 ? " is-active" : ""}`}
              onClick={() => setPlaySpeed(2)}
            >
              2x
            </button>
            <button
              type="button"
              className={`playback-speed-pill${playSpeed === 4 ? " is-active" : ""}`}
              onClick={() => setPlaySpeed(4)}
            >
              4x
            </button>
          </div>
        </div>

        <div className="playback-deck-scrubber">
          <input
            type="range"
            min="0"
            max="100"
            step="0.5"
            value={playProgress}
            onChange={(e) => setPlayProgress(parseFloat(e.target.value))}
            className="playback-scrubber"
            aria-label="Route playback progress slider"
          />
        </div>

        <div className="playback-deck-status">
          <span className="playback-live-tag">
            {Math.round(playProgress)}% · {Math.round((playProgress / 100) * 1430)} mi
          </span>
        </div>
      </div>

      {/* Layer Filter Pills */}
      {!compact && (
        <div className="map-layer-pills">
          <span style={{ color: "var(--fg-muted)", fontWeight: 600, marginRight: "4px" }}>
            Layers:
          </span>
          <button
            type="button"
            className={`layer-filter-btn${layerFilter.stops ? " is-active" : ""}`}
            onClick={() => toggleLayer("stops")}
          >
            🏷️ Stops
          </button>
          <button
            type="button"
            className={`layer-filter-btn${layerFilter.gas ? " is-active" : ""}`}
            onClick={() => toggleLayer("gas")}
          >
            ⛽ Gas Stations
          </button>
          <button
            type="button"
            className={`layer-filter-btn${layerFilter.hotels ? " is-active" : ""}`}
            onClick={() => toggleLayer("hotels")}
          >
            🛏️ Hotels
          </button>
          <button
            type="button"
            className={`layer-filter-btn${layerFilter.shields ? " is-active" : ""}`}
            onClick={() => toggleLayer("shields")}
          >
            🛣️ Highway Shields
          </button>
          <button
            type="button"
            className={`layer-filter-btn${layerFilter.borders ? " is-active" : ""}`}
            onClick={() => toggleLayer("borders")}
          >
            🇨🇦 Border Portals
          </button>
          <button
            type="button"
            className={`layer-filter-btn${layerFilter.climate ? " is-active" : ""}`}
            onClick={() => toggleLayer("climate")}
          >
            💨 Microclimates
          </button>
          <button
            type="button"
            className={`layer-filter-btn${layerFilter.scout ? " is-active" : ""}`}
            onClick={() => toggleLayer("scout")}
          >
            ⌂ Town Scout
          </button>
          <button
            type="button"
            className={`layer-filter-btn${layerFilter.flight ? " is-active" : ""}`}
            onClick={() => toggleLayer("flight")}
          >
            ✈️ SFO Flight Arc
          </button>
        </div>
      )}

      {/* Day Selector Legend */}
      {!compact && (
        <div className="map-legend">
          {DAYS.filter((d) => geometry[d.id] || d.id === "d4").map((d) => (
            <button
              key={d.id}
              type="button"
              aria-pressed={visible.has(d.id)}
              onClick={() => toggle(d.id)}
              title={`${d.title} — click to show only this day`}
            >
              <i
                className="swatch"
                style={{
                  background: colors[d.index],
                  opacity: visible.has(d.id) ? 1 : 0.25,
                }}
              />
              {shortDate(d.date)}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setVisible(new Set(DAYS.map((d) => d.id)))}
            title="Show every day"
          >
            Show all
          </button>
          <button
            type="button"
            aria-pressed={showFlight}
            onClick={() => {
              if (!visible.has("d0")) {
                setVisible(new Set(["d0"]));
              }
              setShowFlight((p) => !p);
            }}
            title="Zoom between Midwest road trip view and full SFO flight path"
          >
            ✈ {showFlight ? "Midwest focus" : "SFO flight zoom"}
          </button>
        </div>
      )}
    </div>

    {/* When a day is isolated on the map, show that day's featured infographics below the map */}
    {!compact && visible.size === 1 && (
      <div style={{ marginTop: "var(--s-5)" }}>
        <DaylightRibbon dayId={[...visible][0]} />
        {visible.has("d2") && (
          <>
            <DuneCrossSection />
            <FuelPlanner dayId="d2" />
          </>
        )}
        {visible.has("d4") && <MackinacTrack />}
        {visible.has("d5") && (
          <>
            <BlueWaterBridgeSteps />
            <FuelPlanner dayId="d5" />
          </>
        )}
        {visible.has("d6") && (
          <>
            <DetroitTunnelSteps />
            <SundayComparator />
          </>
        )}
        {visible.has("d7") && (
          <>
            <FlightRunway />
            <FuelPlanner dayId="d7" />
          </>
        )}
      </div>
    )}
  </>
  );
}
