import L from "leaflet";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Circle,
  MapContainer,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";

import MapClusters from "./MapClusters";
import { LODGING } from "../data/lodging";
import { StopDetails, StayDetails, DayPointDetails, FlightPointDetails, RentalPointDetails, ScoutPointDetails, PointActions } from "./MapPointDetails";
import { escapeMapHtml } from "../lib/mapLabels";
import { MapAccess, NamedMarker as Marker, PointFinder } from "./MapAccess";
import { DAYS, HOME } from "../data/trip";
import geometry from "../data/routeGeometry.json";
import { FUEL_STOPS, FUEL_PLAN_NOTE } from "../data/fuel";
import { LocationWeather } from "./TripForecast";
import {
  BORDER_PORTALS,
  HIGHWAY_SHIELDS,
  MICROCLIMATES,
  calculateSunPosition,
} from "../data/mapOverlays";
import { RELOCATION_TOWNS, SCOUT_TIERS, STRYKER_SITES } from "../data/relocation";
import { moneyFor } from "./YourMoney";
import { money } from "../lib/money";
import { useLocalState } from "../hooks/useLocalState";

const VERDICT_COLOR = { ok: "#2f855a", warn: "#b7791f", stop: "#c53030", ghost: "#6b7a86" };
const DREAM_INCOME = { a: 95000, b: 0 };
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
    <div class="map-pointer-pin ${variant}" style="--pin-bg: ${bg};" title="${escapeMapHtml(title || label || "")}">
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
    iconSize: [44, 48],
    iconAnchor: [22, 48], // Downward needle pointer lands directly on ground coordinate
    popupAnchor: [0, -48],
  });
}

function shieldIcon(shield) {
  return L.divIcon({
    className: "map-shield-wrapper",
    html: `<div class="shield-badge shield--${shield.type}"><span>${shield.route}</span></div>`,
    iconSize: [44, 44],
    iconAnchor: [22, 22],
    popupAnchor: [0, -12],
  });
}

/** Refit the map whenever the visible day set changes. */
function FitBounds({ bounds, deps }) {
  const map = useMap();
  useEffect(() => {
    if (!bounds?.length) return;
    map.fitBounds(bounds, { padding: [42, 42], maxZoom: 11, animate: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return null;
}

/** At closer zoom levels, labels switch from area names to full place names. */
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
    flight: focusDayId === "d0" || focusDayId === "d7",
    shields: false,
    borders: true,
    climate: false,
    scout: false,
  });

  const [zoomLevel, setZoomLevel] = useState(6);
  const [everySpot, setEverySpot] = useState(false);

  // Playback Simulator State
  const [isPlaying, setIsPlaying] = useState(false);
  const [playProgress, setPlayProgress] = useState(0); // 0 to 100
  const [playSpeed, setPlaySpeed] = useState(1); // 1x, 2x, 4x

  const [colors, setColors] = useState(() => DAYS.map((_, i) => dayColor(i)));
  const wrapRef = useRef(null);
  const mapRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [pointQuery, setPointQuery] = useState("");
  const [fitVersion, setFitVersion] = useState(0);
  const expandButtonRef = useRef(null);
  const selectionRef = useRef(0);

  useEffect(() => {
    if (!isExpanded) return;
    const scrollY = window.scrollY;
    const expandButton = expandButtonRef.current;
    const previous = { position: document.body.style.position, top: document.body.style.top, width: document.body.style.width };
    Object.assign(document.body.style, { position: "fixed", top: `-${scrollY}px`, width: "100%" });
    return () => {
      Object.assign(document.body.style, previous);
      window.scrollTo(0, scrollY);
      expandButton?.focus({ preventScroll: true });
    };
  }, [isExpanded]);

  const selectPoint = useCallback((point) => {
    const map = mapRef.current;
    if (!map) return;
    setIsPlaying(false);
    setShowElevation(false);
    setShowSunTracker(false);
    const selection = ++selectionRef.current;
    map.closePopup();
    map.stop();
    if (everySpot) {
      map.setView(point.layer.getLatLng(), Math.max(map.getZoom(), 13), { animate: false });
      point.layer.openPopup();
    } else point.group.zoomToShowLayer(point.layer, () => {
      // Non-animated zooms finish by collapsing spiderfied clusters. Reveal a
      // shared-location pin after that zoom event has completely finished.
      requestAnimationFrame(() => {
        if (selectionRef.current !== selection || mapRef.current !== map || !point.group.hasLayer(point.layer)) return;
        const parent = point.group.getVisibleParent(point.layer);
        if (parent instanceof L.MarkerCluster) parent.spiderfy();
        point.layer.openPopup();
      });
    });
    wrapRef.current?.querySelector(".map-canvas-frame")?.scrollIntoView({ block: "start", behavior: "instant" });
  }, [everySpot]);

  // Close expanded map on Escape key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Tab" && isExpanded) {
        const controls = [...wrapRef.current.querySelectorAll('button, a[href], input, select, summary, [tabindex="0"]')].filter((el) => el.getClientRects().length && !el.disabled);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
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
  // Preserve exact coordinates; the cluster layer groups crowded markers.
  const { markers, beds, fuelPins } = useMemo(() => {
    const raw = [];
    if (layerFilter.stops) {
      shownDays.forEach((day) => {
        (day.stops || []).forEach((stop) => {
          if (!stop.coords) return;
          raw.push({
            kind: "stop",
            key: `${day.id}-${stop.id}`,
            coords: stop.coords,
            label: stop.kind === "food" ? "🍴" : stop.kind === "sleep" ? "🛏" : stop.kind === "admin" ? "🚗" : "●",
            color: colors[day.index] || "#1f7a8c",
            title: stop.name,
            stop, day,
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
            stay: LODGING.find(s => s.name === d.sleep.name),
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
          routeContext: f.routeContext,
          sourceUrl: f.sourceUrl,
          checkedOn: f.checkedOn,
        });
      });
    }
    return {
      markers: raw.filter((x) => x.kind === "stop"),
      beds: raw.filter((x) => x.kind === "bed"),
      fuelPins: raw.filter((x) => x.kind === "fuel"),
    };
  }, [
    shownDays,
    colors,
    visible,
    layerFilter.stops,
    layerFilter.hotels,
    layerFilter.gas,
  ]);

  // Town Scout pin colouring: by tier, or by what the median house does to the
  // couple's budget on their current income or the one-job dream.
  const [scoutMode, setScoutMode] = useLocalState("map-scout-mode", "now");
  const [scoutIncome] = useLocalState("scout-income", { a: 65000, b: 56000 });
  const scoutMoney = useMemo(
    () => Object.fromEntries(RELOCATION_TOWNS.map((t) => [t.id, moneyFor(t, scoutIncome)])),
    [scoutIncome],
  );
  const scoutDream = useMemo(() => Object.fromEntries(RELOCATION_TOWNS.map((t) => [t.id, moneyFor(t, DREAM_INCOME)])), []);

  const scoutPins = layerFilter.scout ? RELOCATION_TOWNS : [];

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
    if (visible.has("d0") && layerFilter.flight && (visible.size === 1 || showFlight)) {
      pts.push(SFO_COORDS, ...SFO_TO_ORD_ARC, ORD_COORDS, ORD_MMF_COORDS, HOME.coords);
    }
    return pts.length ? pts : [HOME.coords];
  }, [lines, markers, beds, fuelPins, visible, showFlight, layerFilter.flight]);

  const toggle = useCallback((id) => {
    setVisible(new Set([id]));
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
      <div className={`mapwrap${everySpot ? " every-spot" : ""}${zoomLevel < 10 ? " map-overview" : ""}${isExpanded ? " is-expanded" : ""}`} ref={wrapRef} role={isExpanded ? "dialog" : undefined} aria-modal={isExpanded || undefined} aria-label="Trip route map">
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
          <button type="button" className="map-action-pill" onClick={() => setFitVersion((n) => n + 1)}>◎ Fit route</button>
          <button
            type="button"
            className={`map-action-pill${showSunTracker ? " is-active" : ""}`}
            aria-pressed={showSunTracker}
            onClick={() => setShowSunTracker((s) => !s)}
            title="Toggle Solar Position & Golden Hour Simulator"
          >
            🌅 {showSunTracker ? "Hide Sun" : "Golden Hour"}
          </button>
          <button
            type="button"
            className={`map-action-pill${showElevation ? " is-active" : ""}`}
            aria-pressed={showElevation}
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
          {(
            <button
              type="button"
              className="map-action-pill"
              onClick={() => setIsExpanded((e) => !e)}
              ref={expandButtonRef}
              aria-expanded={isExpanded}
              title={isExpanded ? "Exit Expanded View (Esc)" : "Expand Map Full View"}
            >
              {isExpanded ? "✕ Minimize" : "⛶ Expand"}
            </button>
          )}
        </div>
      </div>

      {!compact && <label className="map-day-picker">Show on map
        <select aria-label="Map day" value={visible.size === 1 ? [...visible][0] : "all"} onChange={(e) => setVisible(new Set(e.target.value === "all" ? DAYS.map((d) => d.id) : [e.target.value]))}>
          <option value="all">Whole trip</option>
          {DAYS.map((d) => <option key={d.id} value={d.id}>{shortDate(d.date)} · {d.title}</option>)}
        </select>
      </label>}
      <div className="map-view-picker" role="group" aria-label="Map display">
        <button type="button" aria-pressed={!everySpot} onClick={() => setEverySpot(false)}>Nearby groups</button>
        <button type="button" aria-pressed={everySpot} onClick={() => setEverySpot(true)}>Every spot</button>
        <button type="button" onClick={() => {
          const map = mapRef.current;
          if (map && points.length) map.fitBounds(points.map(p => p.layer.getLatLng()), { padding: [65, 75], maxZoom: 14, animate: false });
        }}>Fit all spots</button>
      </div>
      <div className="map-reading-key"><span>● Stop</span><span>🍴 Food</span><span>🛏 Hotel</span><span>⛽ Fuel</span><span>{everySpot ? "Every point is shown. Zoom for names; search for overlapping spots." : "Tap a group to see its spots →"}</span></div>
      <div className="map-canvas-frame">
      <MapContainer
        center={HOME.coords}
        zoom={6}
        scrollWheelZoom={false}
        touchZoom={true}
        zoomAnimation={false}
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
          deps={[shownDays.map((d) => d.id).join(","), focusDayId, showFlight, fitVersion, layerFilter.flight]}
        />
        <InvalidateMapSize isExpanded={isExpanded} />
        <VehicleTracker currentCoord={currentVehicleCoord} isPlaying={isPlaying} />

        <MapClusters zoom={zoomLevel} everySpot={everySpot}>
        <MapAccess onPoints={setPoints} mapRef={mapRef} />
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
              <Popup maxWidth={320} maxHeight={360} autoPanPadding={[24, 24]}>
                <b>SFO — San Francisco International</b>
                <FlightPointDetails slot="arrive" />
              </Popup>
            </Marker>
            <Marker
              position={[40.5962, -109.1675]}
              icon={pinIcon({ label: "✈", color: "#7c3aed", variant: "pin--flight" })}
            >
              <Popup maxWidth={320} maxHeight={360} autoPanPadding={[24, 24]}>
                <b>Flight AA 2358 in Flight</b>
                <FlightPointDetails slot="arrive" />
              </Popup>
            </Marker>
            <Marker
              position={ORD_COORDS}
              icon={pinIcon({ label: "🛬", color: "#7c3aed", variant: "pin--flight" })}
            >
              <Popup maxWidth={320} maxHeight={360} autoPanPadding={[24, 24]}>
                <b>ORD — Chicago O&rsquo;Hare International</b>
                <FlightPointDetails slot="arrive" airport />
              </Popup>
            </Marker>
            <Marker
              position={ORD_MMF_COORDS}
              icon={pinIcon({ label: "🚗", color: "#2563eb", variant: "pin--car" })}
            >
              <Popup maxWidth={320} maxHeight={360} autoPanPadding={[24, 24]}>
                <b>Budget Rental Pickup</b>
                <RentalPointDetails />
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
              <Popup maxWidth={320} maxHeight={360} autoPanPadding={[24, 24]}>
                <b>Flight AA 1253 Departure</b>
                <FlightPointDetails slot="depart" airport />
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
          <Popup maxWidth={320} maxHeight={360} autoPanPadding={[24, 24]}>
            <b>Home</b>
            <br />
            {HOME.address}
            <br />
            <span className="muted">Start 9/15 · Finish 9/21</span>
            <p>Home base in Palatine. Arrive here after the airport pickup on Monday evening; return to drop Mom off before O’Hare on the last day.</p>
            <PointActions address={HOME.address} />
            <a href="#/day/d7">Return-day schedule →</a>
          </Popup>
        </Marker>

        {beds.map((b) => (
          <div key={b.key}>
            <Marker
              position={b.coords}
              icon={pinIcon({ label: "🛏", color: b.color, variant: "pin--bed", title: b.name })}
            >
              <Popup maxWidth={320} maxHeight={360} autoPanPadding={[24, 24]}>
                <b>{b.name}</b>

                <StayDetails stay={b.stay} />
              </Popup>
            </Marker>
          </div>
        ))}

        {fuelPins.map((f) => (
          <div key={f.key}>
            <Marker
              position={f.coords}
              mapLabel={`${f.brand} ⛽`}
              icon={pinIcon({ label: "⛽", color: "#d97706", variant: "pin--fuel", title: f.stopName })}
            >
              <Popup maxWidth={320} maxHeight={360} autoPanPadding={[24, 24]}>
                <b>{f.stopName}</b>
                <br />
                <span className="muted">{f.brand}</span>
                <br />
                <p>{f.address}</p><b>{f.action}</b><br />{f.routeContext}
                <br />
                <span className="muted" style={{ fontSize: "11px" }}>
                  {f.why}
                </span><p>{FUEL_PLAN_NOTE}</p>
                <a href={f.sourceUrl} target="_blank" rel="noreferrer">Location source · checked {f.checkedOn}</a>
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
              <Popup maxWidth={320} maxHeight={360} autoPanPadding={[24, 24]}>
                <b>{s.name}</b>
                <br />
                <span className="muted">{s.desc}</span>
                <p>Route reference marker · {s.route}. This pin identifies the road, not a recommended parking or stopping location.</p>
                <a href="#/days">Browse the route by day →</a>
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
              <Popup maxWidth={320} maxHeight={360} autoPanPadding={[24, 24]}>
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
                <a href="#/border">Full border guide & documents →</a>
                <DayPointDetails dayId={b.dayId} />
              </Popup>
            </Marker>
          ))}

        {/* Town Scout Layer — relocation pins, county rings, Stryker sites */}
        {layerFilter.scout &&
          scoutPins.map((t) => {
            const tier = SCOUT_TIERS.find((x) => x.id === t.tier);
            const rNow = scoutMoney[t.id];
            const rDream = scoutDream[t.id];
            const active = scoutMode === "dream" ? rDream : rNow;
            const color = scoutMode === "tier" || !active?.modeled ? tier.color : VERDICT_COLOR[active.verdict.tone];
            const ringTone = scoutMode !== "tier" && active?.modeled && active.countyShare ? active.countyVerdict.tone : null;
            return (
              <div key={t.id}>
                {ringTone && (
                  <Circle
                    center={t.coords}
                    radius={19000}
                    pathOptions={{ color: VERDICT_COLOR[ringTone], weight: 1.2, dashArray: "5 5", opacity: 0.7, fillColor: VERDICT_COLOR[ringTone], fillOpacity: 0.07 }}
                  />
                )}
                <Marker
                  position={t.coords}
                  icon={pinIcon({ label: "⌂", color, variant: "pin--scout", title: t.name })}
                >
                  <Popup maxWidth={320} maxHeight={360} autoPanPadding={[24, 24]}>
                    <b>{t.name}</b> <span className="muted">{t.county}</span>
                    <br />
                    <span style={{ color: tier.color, fontWeight: 700 }}>{tier.label}</span>
                    {" · "}
                    <span className="muted">{t.verified === "yes" ? "✓ verified" : "≈ sources split"}</span>
                    {t.oneLiner && <div style={{ marginTop: "4px", fontSize: "11px", lineHeight: 1.45 }}>{t.oneLiner}</div>}
                    <div style={{ marginTop: "5px", fontSize: "11px", lineHeight: 1.55 }}>
                      {rNow?.modeled && (
                        <>
                          <b>Now ({money(scoutIncome.a + scoutIncome.b)}):</b> {money(rNow.monthly)}/mo · {Math.round(rNow.share * 100)}% ·{" "}
                          <span style={{ color: VERDICT_COLOR[rNow.verdict.tone], fontWeight: 700 }}>{rNow.verdict.label}</span>
                          {rNow.countyShare ? ` · county ring ${Math.round(rNow.countyShare * 100)}% ${rNow.countyVerdict.label}` : ""}
                          <br />
                        </>
                      )}
                      {rDream?.modeled && (
                        <>
                          <b>Dream ($95k solo):</b> {Math.round(rDream.share * 100)}% ·{" "}
                          <span style={{ color: VERDICT_COLOR[rDream.verdict.tone], fontWeight: 700 }}>{rDream.verdict.label}</span>
                          {rDream.countyShare ? ` · county ring ${Math.round(rDream.countyShare * 100)}% ${rDream.countyVerdict.label}` : ""}
                          <br />
                        </>
                      )}
                      <b>Median:</b> {t.median}
                      <br />
                      {t.climate && (
                        <>
                          <b>Snow / rain:</b> {t.climate.annual.snow}″ / {t.climate.annual.rain}″ · {Math.round(t.climate.annual.snowCover)} days with snow on the ground
                          <br />
                        </>
                      )}
                      {t.stryker && (
                        <>
                          <b>Stryker:</b> {t.stryker.site} · {t.stryker.mi} mi{t.stryker.hrs ? ` · ${t.stryker.hrs}` : ""}
                          <br />
                        </>
                      )}
                      <b>To Palatine:</b> {t.drive}
                    </div>
                    <div className="muted" style={{ marginTop: "4px", fontSize: "11px" }}>
                      Dashed ring ≈ 15 minutes out, coloured by what the county median does to your budget. Full workup on the Scout tab.
                    </div>
                    <ScoutPointDetails town={t} />
                  </Popup>
                </Marker>
              </div>
            );
          })}
        {layerFilter.scout &&
          STRYKER_SITES.map((site) => (
            <Marker
              key={site.id}
              position={site.coords}
              icon={pinIcon({ label: "S", color: "#f2a900", variant: "pin--stryker", title: site.name })}
            >
              <Popup maxWidth={320} maxHeight={360} autoPanPadding={[24, 24]}>
                <b>{site.name}</b>
                <br />
                <span className="muted">{site.what}</span>
                <br />
                <span className="muted">{site.address}</span>
                <p>Employer location reference for comparing nearby towns and commute options; no visit or appointment is scheduled here.</p>
                <PointActions address={site.address} />
                <a href="#/scout">Nearby towns, housing & commute research →</a>
              </Popup>
            </Marker>
          ))}

        {/* Microclimates Layer */}
        {layerFilter.climate &&
          MICROCLIMATES.map((c) => (
            <Marker
              key={c.id}
              position={c.coords}
              icon={pinIcon({ label: c.icon, color: "#0284c7", variant: "pin--climate" })}
            >
              <Popup maxWidth={320} maxHeight={360} autoPanPadding={[24, 24]}>
                <b>{c.title}</b>
                <br />
                <LocationWeather locationId={c.locationId} />
                <br />
                <span className="muted" style={{ fontSize: "11px" }}>
                  General location note: {c.detail}
                </span>
              </Popup>
            </Marker>
          ))}

        {/* Animated Moving Vehicle during Playback */}
        {isPlaying && (
          <Marker
            clustered={false}
            position={currentVehicleCoord}
            icon={pinIcon({
              label: isVehicleFlying ? "✈" : "🚗",
              color: "#2563eb",
              variant: "pin--vehicle-moving",
            })}
          >
            <Popup maxWidth={320} maxHeight={360} autoPanPadding={[24, 24]}>
              <b>{isVehicleFlying ? "AA 2358 in Flight" : "Mazda CX-50 Cruising"}</b>
              <br />
              Trip Progress: {Math.round(playProgress)}%
              <p>Route playback preview · not your GPS location or live vehicle tracking.</p>
            </Popup>
          </Marker>
        )}

        {markers.map((m) => (
          <div key={m.key}>
            <Marker position={m.coords} icon={pinIcon(m)}>
              <Popup maxWidth={320} maxHeight={360} autoPanPadding={[24, 24]}>
                <b>{m.title}</b>

                <StopDetails stop={m.stop} day={m.day} />
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
            <Marker position={[45.8492, -84.6189]} icon={pinIcon({ label: "⛴", color: colors[4], title: "Mackinac Island ferry landing" })}>
              <Popup maxWidth={320} maxHeight={360} autoPanPadding={[24, 24]}>
                <b>Mackinac Island</b>
                <br />
                <span className="muted">Friday 9/18 · Shepler&rsquo;s ferry</span>
                <DayPointDetails dayId="d4" />
              </Popup>
            </Marker>
          </>
        )}

        {/* Hover Elevation Milestone Marker */}
        {hoverElevationPoint && hoverElevationPoint.coords && (
          <Marker
            clustered={false}
            position={hoverElevationPoint.coords}
            icon={L.divIcon({
              className: "elevation-hover-marker",
              html: `<div class="elev-pulse-circle"></div><div class="elev-tooltip-pill">📈 <b>${hoverElevationPoint.label}</b> · ${hoverElevationPoint.elev} ft ASL</div>`,
              iconSize: [160, 44],
              iconAnchor: [80, 22],
            })}
          />
        )}
        </MapClusters>
      </MapContainer>

      {/* Floating Interactive Drawer for Elevation & Sun Tracker Over Map */}
      {(showElevation || showSunTracker) && (
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

      <details className="map-playback"><summary>Route playback</summary>
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
      </div></details>

      {/* Layer Filter Pills */}
      {!compact && (
        <details className="map-layer-control"><summary>Map layers</summary><div className="map-layer-pills">
          <span style={{ color: "var(--fg-muted)", fontWeight: 600, marginRight: "4px" }}>
            Layers:
          </span>
          <button
            type="button"
            className={`layer-filter-btn${layerFilter.stops ? " is-active" : ""}`}
            aria-pressed={layerFilter.stops}
            onClick={() => toggleLayer("stops")}
          >
            🏷️ Stops
          </button>
          <button
            type="button"
            className={`layer-filter-btn${layerFilter.gas ? " is-active" : ""}`}
            aria-pressed={layerFilter.gas}
            onClick={() => toggleLayer("gas")}
          >
            ⛽ Gas Stations
          </button>
          <button
            type="button"
            className={`layer-filter-btn${layerFilter.hotels ? " is-active" : ""}`}
            aria-pressed={layerFilter.hotels}
            onClick={() => toggleLayer("hotels")}
          >
            🛏️ Hotels
          </button>
          <button
            type="button"
            className={`layer-filter-btn${layerFilter.shields ? " is-active" : ""}`}
            aria-pressed={layerFilter.shields}
            onClick={() => toggleLayer("shields")}
          >
            🛣️ Highway Shields
          </button>
          <button
            type="button"
            className={`layer-filter-btn${layerFilter.borders ? " is-active" : ""}`}
            aria-pressed={layerFilter.borders}
            onClick={() => toggleLayer("borders")}
          >
            🇨🇦 Border Portals
          </button>
          <button
            type="button"
            className={`layer-filter-btn${layerFilter.climate ? " is-active" : ""}`}
            aria-pressed={layerFilter.climate}
            onClick={() => toggleLayer("climate")}
          >
            💨 Weather
          </button>
          <button
            type="button"
            className={`layer-filter-btn${layerFilter.scout ? " is-active" : ""}`}
            aria-pressed={layerFilter.scout}
            onClick={() => toggleLayer("scout")}
          >
            ⌂ Town Scout
          </button>
          {layerFilter.scout &&
            [
              ["now", "colour: now"],
              ["dream", "colour: dream"],
              ["tier", "colour: tier"],
            ].map(([id, label]) => (
              <button
                key={id}
                type="button"
                className={`layer-filter-btn layer-sub${scoutMode === id ? " is-active" : ""}`}
                onClick={() => setScoutMode(id)}
                title="How Town Scout pins and county rings are coloured"
              >
                {label}
              </button>
            ))}
          <button
            type="button"
            className={`layer-filter-btn${layerFilter.flight ? " is-active" : ""}`}
            aria-pressed={layerFilter.flight}
            onClick={() => toggleLayer("flight")}
          >
            ✈️ SFO Flight Arc
          </button>
        </div></details>
      )}

      {/* Day Selector Legend */}
      {!compact && (
        <div className="map-legend">
          {layerFilter.scout && (
            <div className="legend-scout">
              {scoutMode === "tier"
                ? SCOUT_TIERS.map((x) => (
                    <span key={x.id}><i style={{ background: x.color }} />{x.label}</span>
                  ))
                : [["ok", "Comfortable"], ["warn", "A stretch"], ["stop", "Out of reach"]].map(([k, l]) => (
                    <span key={k}><i style={{ background: VERDICT_COLOR[k] }} />{l}</span>
                  ))}
              <span><i style={{ background: "#f2a900" }} />Stryker</span>
              <span className="muted">ring = county median, ~15 min out</span>
            </div>
          )}
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
              setLayerFilter((layers) => ({ ...layers, flight: true }));
              setShowFlight((p) => !p);
            }}
            title="Zoom between Midwest road trip view and full SFO flight path"
          >
            ✈ {showFlight ? "Midwest focus" : "SFO flight zoom"}
          </button>
        </div>
      )}
      <PointFinder points={points} query={pointQuery} onQuery={setPointQuery} onSelect={selectPoint} />
      <p className="map-access-note">Switch to Every spot to remove groups. Fit all spots brings every active point into view. Tap a pin for full details. Nearby pins may overlap at a wide zoom; Find a map point reaches each one. Routes and points work offline once the guide is saved; street and satellite detail needs a connection or previously viewed tiles.</p>
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
