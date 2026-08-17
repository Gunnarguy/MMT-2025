import L from "leaflet";
import { useEffect, useMemo, useRef, useState } from "react";
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
import { directionsHref, shortDate } from "../lib/format";

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
  return L.divIcon({
    className: "",
    html: `<div class="pin ${variant}" style="background:${color}"><span>${label}</span></div>`,
    iconSize: [26, 26],
    iconAnchor: variant.includes("home") || variant.includes("bed") ? [13, 13] : [13, 26],
    popupAnchor: [0, variant ? -14 : -26],
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

/** Which days a fresh map shows: just the focused one, or the whole trip. */
function defaultVisible(focusDayId) {
  return focusDayId ? new Set([focusDayId]) : new Set(DAYS.map((d) => d.id));
}

export default function RouteMap({ focusDayId = null, height, compact = false }) {
  const [visible, setVisible] = useState(() => defaultVisible(focusDayId));
  const [colors, setColors] = useState(() => DAYS.map((_, i) => dayColor(i)));
  const wrapRef = useRef(null);

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

  // Reset the day filter when the caller focuses a different day. Done during
  // render rather than in an effect — this is React's documented way to adjust
  // state on a prop change, and it avoids a wasted render pass.
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
  }, [shownDays, colors]);

  const beds = useMemo(
    () =>
      shownDays
        .filter((d) => d.sleep?.coords)
        .map((d) => ({
          key: `bed-${d.id}`,
          coords: d.sleep.coords,
          color: colors[d.index] || "#1f7a8c",
          name: d.sleep.name,
          city: d.sleep.city,
          address: d.sleep.address,
          date: d.date,
        })),
    [shownDays, colors],
  );

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
    ];
    return pts.length ? pts : [HOME.coords];
  }, [lines, markers, beds]);

  const toggle = (id) =>
    setVisible((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next.size ? next : new Set(DAYS.map((d) => d.id));
    });

  return (
    <div className="mapwrap" ref={wrapRef}>
      <MapContainer
        center={HOME.coords}
        zoom={6}
        scrollWheelZoom={false}
        style={height ? { height } : undefined}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          maxZoom={19}
        />

        <FitBounds bounds={bounds} deps={[shownDays.length, focusDayId]} />

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
        </div>
      )}
    </div>
  );
}
