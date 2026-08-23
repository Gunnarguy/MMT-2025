import L from "leaflet";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
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
import { directionsHref, duration, shortDate } from "../lib/format";

const SFO_COORDS = [37.6213, -122.379];
const ORD_COORDS = [41.9742, -87.9073];
const ORD_MMF_COORDS = [41.9786, -87.8892];

function greatCircleArc([lat1, lon1], [lat2, lon2], numPoints = 25) {
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

const SFO_TO_ORD_ARC = greatCircleArc(SFO_COORDS, ORD_COORDS, 30);

/** Read a `--day-N` token off the document so map colours track the theme. */
function dayColor(index) {
  if (typeof window === "undefined") return "#1f7a8c";
  return (
    getComputedStyle(document.documentElement)
      .getPropertyValue(`--day-${index}`)
      .trim() || "#1f7a8c"
  );
}

function pinIcon({ label, color, variant = "" }) {
  const isCircle =
    variant.includes("home") ||
    variant.includes("bed") ||
    variant.includes("flight") ||
    variant.includes("car") ||
    variant.includes("fuel");
  return L.divIcon({
    className: "",
    html: `<div class="pin ${variant}" style="background:${color}"><span>${label}</span></div>`,
    iconSize: [26, 26],
    iconAnchor: isCircle ? [13, 13] : [13, 26],
    popupAnchor: [0, isCircle ? -14 : -26],
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

/** Which days a fresh map shows: just the focused one, or the whole trip. */
function defaultVisible(focusDayId) {
  return focusDayId ? new Set([focusDayId]) : new Set(DAYS.map((d) => d.id));
}

export default function RouteMap({ focusDayId = null, height, compact = false }) {
  const [visible, setVisible] = useState(() => defaultVisible(focusDayId));
  const [showFlight, setShowFlight] = useState(focusDayId === "d0");
  const [isExpanded, setIsExpanded] = useState(false);
  const [mapStyle, setMapStyle] = useState("streets");
  const [layerFilter, setLayerFilter] = useState({
    stops: true,
    gas: true,
    hotels: true,
    flight: true,
  });

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

  // Day colours are CSS variables, so re-read them when the theme flips.
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

  // Reset the day filter when the caller focuses a different day.
  const [lastFocus, setLastFocus] = useState(focusDayId);
  if (lastFocus !== focusDayId) {
    setLastFocus(focusDayId);
    setVisible(defaultVisible(focusDayId));
  }

  const shownDays = useMemo(
    () => DAYS.filter((d) => visible.has(d.id)),
    [visible],
  );

  /** Every mappable stop on the visible days, numbered within its day. */
  const markers = useMemo(() => {
    if (!layerFilter.stops) return [];
    const out = [];
    shownDays.forEach((day) => {
      let n = 0;
      (day.stops || []).forEach((stop) => {
        if (!stop.coords) return;
        n += 1;
        out.push({
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
    return out;
  }, [shownDays, colors, layerFilter.stops]);

  const beds = useMemo(() => {
    if (!layerFilter.hotels) return [];
    return shownDays
      .filter((d) => d.sleep?.coords)
      .map((d) => ({
        key: `bed-${d.id}`,
        coords: d.sleep.coords,
        color: colors[d.index] || "#1f7a8c",
        name: d.sleep.name,
        city: d.sleep.city,
        address: d.sleep.address,
        date: d.date,
      }));
  }, [shownDays, colors, layerFilter.hotels]);

  const fuelPins = useMemo(() => {
    if (!layerFilter.gas) return [];
    return FUEL_STOPS.filter((f) => visible.has(f.dayId)).map((f) => ({
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
    }));
  }, [visible, layerFilter.gas]);

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

  return (
    <div className={`mapwrap${isExpanded ? " is-expanded" : ""}`} ref={wrapRef}>
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
        style={height && !isExpanded ? { height } : undefined}
      >
        {mapStyle === "streets" ? (
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
            maxZoom={19}
          />
        ) : (
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution='&copy; <a href="https://www.esri.com/">Esri</a>, USGS, Maxar'
            maxZoom={19}
          />
        )}

        <FitBounds bounds={bounds} deps={[shownDays.length, focusDayId, showFlight, isExpanded]} />
        <InvalidateMapSize isExpanded={isExpanded} />

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
          <Marker
            key={b.key}
            position={b.coords}
            icon={pinIcon({ label: "🛏", color: b.color, variant: "pin--bed" })}
          >
            <Popup>
              <b>{b.name}</b>
              <br />
              {b.city}
              <br />
              <span className="muted">Night of {shortDate(b.date)}</span>
            </Popup>
          </Marker>
        ))}

        {fuelPins.map((f) => (
          <Marker
            key={f.key}
            position={f.coords}
            icon={pinIcon({ label: "⛽", color: "#d97706", variant: "pin--fuel" })}
          >
            <Popup>
              <b>{f.stopName}</b>
              <br />
              <span className="muted">{f.brand}</span>
              <br />
              <b>Trip Milepost:</b> Mile {f.mileMarker} · {f.action}
              <br />
              <span className="muted" style={{ fontSize: "11px" }}>{f.why}</span>
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
        ))}

        {markers.map((m) => (
          <Marker key={m.key} position={m.coords} icon={pinIcon(m)}>
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
        ))}

        {/* Ferry hop — a dashed hint, since there is no road to the island. */}
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
      </MapContainer>

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
            className={`layer-filter-btn${layerFilter.flight ? " is-active" : ""}`}
            onClick={() => toggleLayer("flight")}
          >
            ✈️ Flight Trajectory
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
  );
}
