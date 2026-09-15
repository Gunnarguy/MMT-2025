/**
 * mmt-flight-relay: the one endpoint the Michigan '26 field guide calls for
 * live flight data. It exists because every open ADS-B feed and FlightAware's
 * AeroAPI refuse cross-origin browser requests, and because the AeroAPI key
 * cannot live in a public static site.
 *
 *   GET /flight/AAL2358?date=2026-09-14
 *     -> { ident, status, progress, gates, times, aircraft, position, source, fetchedAt }
 *
 * FlightAware AeroAPI is the source of truth for status, gates and estimated
 * times; adsb.lol supplies a free position when AeroAPI has none. Responses
 * are cached at the edge for 45 seconds so a screen refreshing every minute
 * costs one AeroAPI call a minute at most. Only the two flights on the trip
 * are allowed through, which is the whole spend cap.
 */
const ALLOWED_ORIGINS = ["https://gunnarguy.github.io", "http://localhost:5174", "http://127.0.0.1:5174"];
const ALLOWED_IDENTS = new Set(["AAL2358", "AAL1253"]);
const AERO = "https://aeroapi.flightaware.com/aeroapi";
const CACHE_SECONDS = 45;

const cors = (origin) => ({
  "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Vary": "Origin",
});

const json = (body, origin, status = 200, extra = {}) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": `public, max-age=${CACHE_SECONDS}`, ...cors(origin), ...extra } });

async function aero(path, key) {
  const r = await fetch(`${AERO}${path}`, { headers: { "x-apikey": key, "Accept": "application/json" } });
  if (!r.ok) throw new Error(`AeroAPI ${r.status} on ${path}`);
  return r.json();
}

async function adsb(callsign) {
  try {
    const r = await fetch(`https://api.adsb.lol/v2/callsign/${callsign}`, { headers: { "Accept": "application/json" } });
    if (!r.ok) return null;
    const j = await r.json();
    const ac = (j.ac || [])[0];
    if (!ac || ac.lat == null) return null;
    return {
      lat: ac.lat, lon: ac.lon,
      altitudeFt: ac.alt_baro === "ground" ? 0 : ac.alt_baro ?? null,
      groundspeedKts: ac.gs ?? null, heading: ac.track ?? ac.true_heading ?? null,
      onGround: ac.alt_baro === "ground", tail: ac.r || null, type: ac.t || null,
      ageSeconds: ac.seen_pos ?? null, source: "adsb.lol",
    };
  } catch { return null; }
}

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get("Origin") || "";
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(origin) });
    const url = new URL(request.url);
    const m = url.pathname.match(/^\/flight\/([A-Z]{3}\d{1,4})$/);
    if (!m) return json({ error: "use /flight/AAL2358?date=YYYY-MM-DD" }, origin, 404);
    const ident = m[1];
    if (!ALLOWED_IDENTS.has(ident)) return json({ error: "not a flight on this trip" }, origin, 403);
    const date = url.searchParams.get("date") || new Date().toISOString().slice(0, 10);

    const cache = caches.default;
    const cacheKey = new Request(`https://relay.cache/flight/${ident}/${date}`);
    const hit = await cache.match(cacheKey);
    if (hit) {
      const body = await hit.text();
      return new Response(body, { status: 200, headers: { "Content-Type": "application/json", "X-Relay-Cache": "hit", ...cors(origin) } });
    }

    let flight = null, position = null, error = null;
    if (env.AEROAPI_KEY) {
      try {
        const data = await aero(`/flights/${ident}?ident_type=designator&start=${date}&end=${date}T23:59:59Z`, env.AEROAPI_KEY);
        const list = data.flights || [];
        flight = list.find((f) => (f.scheduled_out || "").startsWith(date)) || list[0] || null;
        if (flight && flight.fa_flight_id && /en route|taxiing|departed/i.test(flight.status || "")) {
          try {
            const p = await aero(`/flights/${flight.fa_flight_id}/position`, env.AEROAPI_KEY);
            const lp = p.last_position;
            if (lp) position = { lat: lp.latitude, lon: lp.longitude, altitudeFt: lp.altitude != null ? lp.altitude * 100 : null, groundspeedKts: lp.groundspeed ?? null, heading: lp.heading ?? null, onGround: false, ageSeconds: lp.timestamp ? Math.max(0, (Date.now() - Date.parse(lp.timestamp)) / 1000) : null, source: "FlightAware" };
          } catch (e) { error = String(e.message); }
        }
      } catch (e) { error = String(e.message); }
    } else error = "AEROAPI_KEY secret is not set";
    if (!position) position = await adsb(ident);

    const body = {
      ident, date, fetchedAt: Date.now(), error,
      status: flight?.status || null,
      progress: flight?.progress_percent ?? null,
      cancelled: flight?.cancelled ?? null, diverted: flight?.diverted ?? null,
      times: flight ? { scheduledOut: flight.scheduled_out, estimatedOut: flight.estimated_out, actualOut: flight.actual_out, scheduledOff: flight.scheduled_off, actualOff: flight.actual_off, scheduledOn: flight.scheduled_on, estimatedOn: flight.estimated_on, actualOn: flight.actual_on, scheduledIn: flight.scheduled_in, estimatedIn: flight.estimated_in, actualIn: flight.actual_in, departureDelaySec: flight.departure_delay, arrivalDelaySec: flight.arrival_delay } : null,
      gates: flight ? { origin: flight.origin?.code_iata || flight.origin?.code, originTerminal: flight.terminal_origin, originGate: flight.gate_origin, destination: flight.destination?.code_iata || flight.destination?.code, destinationTerminal: flight.terminal_destination, destinationGate: flight.gate_destination, baggage: flight.baggage_claim } : null,
      aircraft: flight ? { type: flight.aircraft_type, tail: flight.registration, routeDistanceMi: flight.route_distance ? Math.round(flight.route_distance * 1.15078) : null } : position ? { type: position.type, tail: position.tail } : null,
      position,
      source: flight ? "FlightAware AeroAPI" : position ? position.source : "none",
    };
    const res = json(body, origin, 200, { "X-Relay-Cache": "miss" });
    ctx.waitUntil(cache.put(cacheKey, new Response(JSON.stringify(body), { headers: { "Content-Type": "application/json", "Cache-Control": `public, max-age=${CACHE_SECONDS}` } })));
    return res;
  },
};
