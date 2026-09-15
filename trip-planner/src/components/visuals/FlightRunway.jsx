import L from "leaflet";
import { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, Polyline, TileLayer, useMap } from "react-leaflet";

import { AIRCRAFT_SEEN, DEFAULT_FLIGHTS, FLIGHT_RUNWAYS } from "../../data/logistics";
import { FLIGHT_RELAY } from "../../data/relay";
import { useLocalState } from "../../hooks/useLocalState";

/**
 * The flight deck: one screen per flight that answers "what is happening with
 * the plane right now".
 *
 * It is honest about its sources. The countdowns and the plane on the map are
 * driven by the schedule (or by the times you edit on Car & flights once AA
 * announces a delay), because every open ADS-B feed refuses browser requests
 * from a static site. Radar is one tap away; the deck tells you which tap.
 */

const AIRPORTS = {
  SFO: { name: "San Francisco", tz: "America/Los_Angeles", coords: [37.6213, -122.379] },
  ORD: { name: "Chicago O'Hare", tz: "America/Chicago", coords: [41.9742, -87.9073] },
};

/** Epoch ms for a wall-clock time in a zone. Two passes absorb the DST offset. */
export function zonedEpoch(date, hhmm, tz) {
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = hhmm.split(":").map(Number);
  const target = Date.UTC(y, m - 1, d, hh, mm);
  let guess = target;
  const fmt = new Intl.DateTimeFormat("en-US", { timeZone: tz, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
  for (let i = 0; i < 2; i++) {
    const parts = fmt.formatToParts(new Date(guess));
    const get = (t) => Number(parts.find((p) => p.type === t).value);
    const seen = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"));
    guess += target - seen;
  }
  return guess;
}

const clock = (ms, tz) => new Date(ms).toLocaleTimeString("en-US", { timeZone: tz, hour: "numeric", minute: "2-digit" });
const short = (ms, tz) => new Date(ms).toLocaleTimeString("en-US", { timeZone: tz, hour: "numeric", minute: "2-digit", timeZoneName: "short" });

function countdown(ms) {
  const s = Math.max(0, Math.round(ms / 1000));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${h}h ${String(m).padStart(2, "0")}m`;
  return `${m}:${String(sec).padStart(2, "0")}`;
}

/** 30-point great-circle arc between two [lat, lon] points. */
function arc([lat1, lon1], [lat2, lon2], n = 40) {
  const rad = (x) => (x * Math.PI) / 180;
  const deg = (x) => (x * 180) / Math.PI;
  const φ1 = rad(lat1), λ1 = rad(lon1), φ2 = rad(lat2), λ2 = rad(lon2);
  const d = 2 * Math.asin(Math.sqrt(Math.sin((φ2 - φ1) / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin((λ2 - λ1) / 2) ** 2));
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const f = i / n;
    const A = Math.sin((1 - f) * d) / Math.sin(d);
    const B = Math.sin(f * d) / Math.sin(d);
    const x = A * Math.cos(φ1) * Math.cos(λ1) + B * Math.cos(φ2) * Math.cos(λ2);
    const y = A * Math.cos(φ1) * Math.sin(λ1) + B * Math.cos(φ2) * Math.sin(λ2);
    const z = A * Math.sin(φ1) + B * Math.sin(φ2);
    pts.push([deg(Math.atan2(z, Math.sqrt(x * x + y * y))), deg(Math.atan2(y, x))]);
  }
  return pts;
}

function bearing([lat1, lon1], [lat2, lon2]) {
  const rad = (x) => (x * Math.PI) / 180;
  const y = Math.sin(rad(lon2 - lon1)) * Math.cos(rad(lat2));
  const x = Math.cos(rad(lat1)) * Math.sin(rad(lat2)) - Math.sin(rad(lat1)) * Math.cos(rad(lat2)) * Math.cos(rad(lon2 - lon1));
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

function FitArc({ line }) {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(L.latLngBounds(line), { padding: [18, 18], animate: false });
  }, [map, line]);
  return null;
}

/**
 * Live status from the relay (FlightAware AeroAPI behind a Cloudflare Worker),
 * polled once a minute while the flight is within its day. Null when the
 * relay is not configured, unreachable, or the day is not today.
 */
function useLiveFlight(ident, date, active) {
  const [live, setLive] = useState(null);
  useEffect(() => {
    if (!FLIGHT_RELAY || !active) return undefined;
    let stop = false;
    const load = async () => {
      try {
        const r = await fetch(`${FLIGHT_RELAY}/flight/${ident}?date=${date}`, { cache: "no-store" });
        if (!r.ok) throw new Error(String(r.status));
        const j = await r.json();
        if (!stop) setLive({ ...j, receivedAt: Date.now() });
      } catch {
        if (!stop) setLive((prev) => (prev ? { ...prev, stale: true } : null));
      }
    };
    load();
    const t = window.setInterval(load, 60000);
    const onVis = () => { if (document.visibilityState === "visible") load(); };
    document.addEventListener("visibilitychange", onVis);
    return () => { stop = true; window.clearInterval(t); document.removeEventListener("visibilitychange", onVis); };
  }, [ident, date, active]);
  return live;
}

function useNow() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, []);
  return now;
}

/** Where the flight is in its day, from the schedule and the clock. */
function phaseOf(now, f, steps) {
  const at = (key) => steps.find((s) => s.key === key);
  const dep = zonedEpoch(f.date, f.depTime, AIRPORTS[f.from].tz);
  const arr = zonedEpoch(f.date, f.arrTime, AIRPORTS[f.to].tz);
  const board = at("board") ? zonedEpoch(at("board").date, at("board").time, at("board").tz) : dep - 44 * 60000;
  const door = at("door") ? zonedEpoch(at("door").date, at("door").time, at("door").tz) : dep - 15 * 60000;
  const counter = at("counter") ? zonedEpoch(at("counter").date, at("counter").time, at("counter").tz) : null;
  const first = zonedEpoch(steps[0].date, steps[0].time, steps[0].tz);
  const last = zonedEpoch(steps[steps.length - 1].date, steps[steps.length - 1].time, steps[steps.length - 1].tz);
  const progress = Math.min(1, Math.max(0, (now - dep) / (arr - dep)));
  let phase;
  if (now < first - 6 * 3600000) phase = { id: "ahead", label: `Departs ${clock(dep, AIRPORTS[f.from].tz)} ${f.from}`, next: first, nextLabel: steps[0].what, tone: "ghost" };
  else if (now < board) phase = { id: "pre", label: "Before boarding", next: board, nextLabel: "Boarding", tone: "info" };
  else if (now < door) phase = { id: "boarding", label: "Boarding now", next: door, nextLabel: "Door closes", tone: "warn" };
  else if (now < dep) phase = { id: "door", label: "Door closed, pushing back", next: dep, nextLabel: "Wheels up", tone: "warn" };
  else if (now < arr) phase = { id: "air", label: "In the air", next: arr, nextLabel: `Wheels down ${f.to}`, tone: "locked" };
  else if (counter && now < counter) phase = { id: "landed", label: "On the ground", next: counter, nextLabel: steps.find((s) => s.key === "counter").what, tone: "ok" };
  else if (now < last) phase = { id: "ground", label: "On the ground", next: last, nextLabel: steps[steps.length - 1].what, tone: "ok" };
  else phase = { id: "done", label: "Done", next: null, nextLabel: null, tone: "ok" };
  return { ...phase, dep, arr, board, door, progress };
}

export default function FlightDeck({ flightId, initialMode, flight: given }) {
  const id = flightId || (initialMode === "return" ? "back" : "out");
  const [stored] = useLocalState("mi26.flights.v2", DEFAULT_FLIGHTS);
  const f = given || stored.find((x) => x.id === id) || DEFAULT_FLIGHTS.find((x) => x.id === id);
  const steps = FLIGHT_RUNWAYS[id];
  const now = useNow();
  const scheduled = phaseOf(now, f, steps);
  const from = AIRPORTS[f.from], to = AIRPORTS[f.to];
  const ident = `AAL${(f.number || "").replace(/\D/g, "")}`;
  const activeDay = Math.abs(now - scheduled.dep) < 14 * 3600000;
  const live = useLiveFlight(ident, f.date, activeDay);
  // Live data overrides the schedule where it has something to say.
  const ph = useMemo(() => {
    if (!live || live.stale || !live.times) return scheduled;
    const t = live.times;
    const parse = (x) => (x ? Date.parse(x) : null);
    const dep = parse(t.actualOff) || parse(t.actualOut) || parse(t.estimatedOut) || scheduled.dep;
    const arr = parse(t.actualIn) || parse(t.actualOn) || parse(t.estimatedIn) || scheduled.arr;
    const landed = !!(t.actualOn || t.actualIn);
    const airborne = !!t.actualOff && !landed;
    const progress = airborne ? (Number.isFinite(live.progress) ? live.progress / 100 : Math.min(1, Math.max(0, (now - dep) / (arr - dep)))) : landed ? 1 : 0;
    const delay = t.departureDelaySec ? Math.round(t.departureDelaySec / 60) : 0;
    let out = { ...scheduled, dep, arr, progress };
    if (live.cancelled) out = { ...out, id: "cancelled", label: "Cancelled", tone: "stop", next: null };
    else if (landed && now < scheduled.next) out = { ...out, id: "landed", label: `Landed${t.actualIn ? ", at the gate" : ""}`, tone: "ok" };
    else if (airborne) out = { ...out, id: "air", label: live.status?.replace(/^en route/i, "In the air") || "In the air", tone: "locked", next: arr, nextLabel: `Wheels down ${f.to}` };
    else if (now < dep && delay > 10) out = { ...out, label: `Delayed ${delay} min`, tone: "warn", next: dep, nextLabel: "New departure" };
    return out;
  }, [live, scheduled, now, f.to]);
  const line = useMemo(() => arc(from.coords, to.coords), [from, to]);
  const livePos = live && !live.stale && live.position && ph.id === "air" ? [live.position.lat, live.position.lon] : null;
  const plane = livePos || line[Math.round(ph.progress * (line.length - 1))];
  const ahead = line[Math.min(line.length - 1, Math.round(ph.progress * (line.length - 1)) + 1)];
  const heading = livePos && Number.isFinite(live.position.heading) ? live.position.heading : bearing(plane, ahead);
  const gates = live && !live.stale ? live.gates : null;
  const liveAge = live?.position?.ageSeconds != null ? Math.round(live.position.ageSeconds + (now - live.receivedAt) / 1000) : null;
  const icon = useMemo(() => L.divIcon({ className: "fd-plane-wrap", html: `<span class="fd-plane" style="transform:rotate(${Math.round(heading - 45)}deg)">✈</span>`, iconSize: [30, 30], iconAnchor: [15, 15] }), [heading]);
  const num = (f.number || "").replace(/\D/g, "");
  const craft = AIRCRAFT_SEEN[id] || (live?.aircraft?.tail ? { tail: live.aircraft.tail, type: live.aircraft.type, seen: `live from ${live.source}`, note: "" } : null);
  const stepEpochs = steps.map((s) => zonedEpoch(s.date, s.time, s.tz));
  const currentIdx = stepEpochs.findLastIndex((t) => t <= now);
  const edited = f.depTime !== DEFAULT_FLIGHTS.find((x) => x.id === id).depTime || f.arrTime !== DEFAULT_FLIGHTS.find((x) => x.id === id).arrTime;
  const [copied, setCopied] = useState(null);
  const copy = (text) => navigator.clipboard?.writeText(text).then(() => { setCopied(text); window.setTimeout(() => setCopied(null), 1800); });

  return (
    <section className={`fd fd--${ph.tone}`} aria-label={`Flight deck for ${f.number}`}>
      <header className="fd-head">
        <div>
          <div className="eyebrow">Flight deck · {new Date(ph.dep).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: from.tz })}{live && !live.stale ? ` · live via ${live.source}` : edited ? " · using your edited times" : ""}</div>
          <h3 className="fd-title">{f.number} <span>{from.name} to {to.name}</span></h3>
        </div>
        <div className={`fd-phase fd-phase--${ph.tone}`}>
          <span className="fd-phase-dot" aria-hidden="true" />
          <b>{ph.label}</b>
          {ph.next && <small>{ph.nextLabel} in <strong>{countdown(ph.next - now)}</strong></small>}
        </div>
      </header>

      <div className="fd-route">
        <div className="fd-end">
          <b>{f.from}</b>
          <span className="fd-time">{clock(ph.dep, from.tz)}</span>
          <small>{gates?.originTerminal ? `Terminal ${gates.originTerminal}` : f.depTerminal || from.name} · {gates?.originGate ? `Gate ${gates.originGate}` : f.depGate || ""}</small>
        </div>
        <div className="fd-track" aria-hidden="true">
          <div className="fd-track-line"><i style={{ width: `${Math.round(ph.progress * 100)}%` }} /></div>
          <span className="fd-track-plane" style={{ left: `${Math.round(ph.progress * 100)}%` }}>✈</span>
          <span className="fd-track-label">{ph.id === "air" ? `${Math.round(ph.progress * 100)}% of the way · about ${countdown(ph.arr - now)} to go` : f.flightTime || ""}</span>
        </div>
        <div className="fd-end fd-end--to">
          <b>{f.to}</b>
          <span className="fd-time">{clock(ph.arr, to.tz)}</span>
          <small>{gates?.destinationTerminal ? `Terminal ${gates.destinationTerminal}` : f.arrTerminal || to.name} · {gates?.destinationGate ? `Gate ${gates.destinationGate}` : f.arrGate || ""}{gates?.baggage ? ` · bags ${gates.baggage}` : ""}</small>
        </div>
      </div>

      <div className="fd-clocks">
        <div><small>{f.from} now</small><b>{short(now, from.tz)}</b></div>
        <div><small>{f.to} now</small><b>{short(now, to.tz)}</b></div>
        <div><small>Boarding</small><b>{short(ph.board, from.tz)}</b></div>
        <div><small>Door closes</small><b>{short(ph.door, from.tz)}</b></div>
      </div>

      <div className="fd-grid">
        <div className="fd-map">
          <MapContainer center={plane} zoom={4} scrollWheelZoom={false} dragging={false} zoomControl={false} attributionControl={false} zoomAnimation={false} style={{ height: "100%", width: "100%" }}>
            <FitArc line={line} />
            <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Polyline positions={line} pathOptions={{ color: "var(--brand)", weight: 2, dashArray: "6 6", opacity: 0.7 }} />
            <Polyline positions={line.slice(0, Math.round(ph.progress * (line.length - 1)) + 1)} pathOptions={{ color: "var(--accent)", weight: 3, opacity: 0.95 }} />
            <Marker position={plane} icon={icon} interactive={false} />
          </MapContainer>
          <span className="fd-map-note">{livePos ? `Live · ${live.position.source} · ${liveAge != null ? `${liveAge}s ago` : ""}${live.position.altitudeFt != null ? ` · ${Math.round(live.position.altitudeFt).toLocaleString()} ft` : ""}${live.position.groundspeedKts != null ? ` · ${Math.round(live.position.groundspeedKts * 1.15078)} mph` : ""}` : ph.id === "air" ? "Scheduled position, not radar" : ph.id === "done" || ph.id === "landed" || ph.id === "ground" ? "Landed" : "Waiting at the gate"}</span>
        </div>

        <div className="fd-side">
          <div className="fd-craft">
            <div className="eyebrow">The aircraft</div>
            {craft ? (
              <>
                <b>{craft.type} · {craft.tail}</b>
                <small>Seen on ADS-B {craft.seen}. {craft.note}</small>
                <a className="action action--nav" href={`https://www.flightaware.com/live/flight/${craft.tail}`} target="_blank" rel="noreferrer">Track {craft.tail} on radar</a>
              </>
            ) : (
              <>
                <b>{f.aircraft || "Assigned on the day"}</b>
                <small>The tail number is not known until the morning; the radar links below show the aircraft once it is.</small>
              </>
            )}
          </div>
          <div className="fd-pax">
            {(f.passengers || []).map((p) => (
              <button type="button" key={p.name} className="fd-pax-card" onClick={() => copy(p.record)} title="Copy the record locator">
                <span>{p.name.split(" ")[0]}</span>
                <b>{p.seat}</b>
                <small>{copied === p.record ? "Copied" : `PNR ${p.record}`}</small>
              </button>
            ))}
          </div>
          <div className="fd-links">
            <a className="action action--nav" href={`https://www.flightaware.com/live/flight/AAL${num}`} target="_blank" rel="noreferrer">FlightAware</a>
            <a className="action action--nav" href={`https://www.flightradar24.com/data/flights/aa${num}`} target="_blank" rel="noreferrer">Flightradar24</a>
            <a className="action action--web" href={`https://www.aa.com/travelInformation/flights/status/detail?flightNumber=${num}`} target="_blank" rel="noreferrer">AA gate & status</a>
            <a className="action action--web" href={f.from === "ORD" ? "https://www.flychicago.com/ohare/myflight/security/pages/default.aspx" : "https://www.flysfo.com/flight-info/security-wait-times"} target="_blank" rel="noreferrer">TSA waits, {f.from}</a>
          </div>
        </div>
      </div>

      <ol className="fd-runway">
        {steps.map((s, i) => {
          const t = stepEpochs[i];
          const state = i < currentIdx ? "past" : i === currentIdx ? "now" : "next";
          return (
            <li key={`${s.date}-${s.time}-${s.what}`} className={`fd-step fd-step--${state}${s.type ? ` fd-step--${s.type}` : ""}`}>
              <span className="fd-step-time">{clock(t, s.tz)} <em>{s.zone}</em></span>
              <span className="fd-step-body">
                <b>{s.what}</b>
                <small>{s.detail}</small>
                {state === "now" && steps[i + 1] && <span className="fd-step-next">next: {steps[i + 1].what} in {countdown(stepEpochs[i + 1] - now)}</span>}
              </span>
            </li>
          );
        })}
      </ol>
      <p className="fd-foot">
        {FLIGHT_RELAY
          ? "Status, gates, estimated times and position come from FlightAware through the trip's relay, refreshed every minute while the flight is within its day; the booking times are the fallback when the relay is unreachable."
          : "Times are the booking, or the times you edit on Car & flights once American announces a change. The plane on the map is scheduled progress along the great circle until the relay is deployed; the radar links are the live view."}
      </p>
    </section>
  );
}
