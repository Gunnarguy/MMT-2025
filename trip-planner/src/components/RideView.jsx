import { useCallback, useState } from "react";

import { FUEL_BASIS, fuelEstimate } from "../data/budget";
import {
  AIRPORTS,
  ANCHORS,
  DEFAULT_FLIGHTS,
  FLIGHT_FIELDS,
  PASSENGER_FIELDS,
  RENTAL,
  RUN_HOME,
  VEHICLE_FIELDS,
  VEHICLE_NOTES,
} from "../data/logistics";
import { useLocalState } from "../hooks/useLocalState";
import { money, telHref } from "../lib/format";
import { Flag } from "./bits";
import FlightRunway from "./visuals/FlightRunway";
import FuelPlanner from "./visuals/FuelPlanner";

/**
 * The car and the flights.
 *
 * Both are booked now, so most of this page is fact. It still takes input,
 * because the specific car isn't assigned until the counter and seats can move
 * — and that input lives in localStorage on one device, which the page says
 * out loud rather than letting anyone assume Mom can see it.
 *
 * Two things here have teeth. The mpg field feeds the Money page's fuel line.
 * And the return flight drives `check()`, which is the only place in the app
 * that knows Monday the 21st now has a hard 3:20pm deadline on it.
 */

/** "17:30" → minutes since midnight, or null. */
function minutes(hhmm) {
  const m = /^(\d{1,2}):(\d{2})$/.exec(hhmm || "");
  return m ? Number(m[1]) * 60 + Number(m[2]) : null;
}

function pretty(hhmm) {
  const t = minutes(hhmm);
  if (t == null) return hhmm;
  const h = Math.floor(t / 60);
  const suffix = h < 12 ? "am" : "pm";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(t % 60).padStart(2, "0")}${suffix}`;
}

/**
 * Check a flight against the car. Both crossings happen at O'Hare, so the
 * question on the way in is "can you reach the counter" and on the way out
 * it's "can you get the car back and still make the gate".
 */
function check(flight) {
  const { slot, date } = flight;

  if (slot === "arrive") {
    if (!date || date !== ANCHORS.arrive.date) return null;
    const arr = minutes(flight.arrTime);
    const desk = minutes(ANCHORS.arrive.time);
    if (arr == null) return null;
    if (arr > desk) {
      return {
        tone: "warn",
        text: `Lands ${pretty(
          flight.arrTime,
        )}, after the ${pretty(ANCHORS.arrive.time)} counter slot. Not fatal — Budget's O'Hare desk runs 24 hours and this booking has no cancellation fee — but it pushes Palatine past 11pm and Tuesday starts early.`,
      };
    }
    const gap = desk - arr;
    return {
      tone: "ok",
      text: `Lands ${pretty(
        flight.arrTime,
      )}, ${gap} minutes before the ${pretty(ANCHORS.arrive.time)} counter slot — and bags plus the ATS ride out to the rental facility is about 45. The desk is open 24 hours, so arriving a little after nine is fine. Reckon on Mom's front door around 10:00pm.`,
    };
  }

  if (slot === "depart") {
    if (!date || date !== ANCHORS.depart.date) return null;
    return {
      tone: "ok",
      text: `AA 1253 departs O'Hare at 3:20 PM Central. Returning the rental car at the Multi-Modal Facility by 1:00 PM provides a relaxed 2-hour window to take the ATS train to Terminal 3, drop bags, and clear security.`,
    };
  }

  return null;
}

function Field({ def, value, onChange }) {
  return (
    <label className={`fld fld--${def.width || "md"}`}>
      <span className="fld-label">{def.label}</span>
      <input
        type={def.type || "text"}
        inputMode={def.numeric ? "decimal" : undefined}
        value={value || ""}
        placeholder={def.placeholder}
        onChange={(e) => onChange(def.key, e.target.value)}
      />
      {def.why && <small className="fld-why">{def.why}</small>}
    </label>
  );
}

export default function RideView() {
  const [vehicle, setVehicle] = useLocalState("mi26.vehicle", {});
  // Key is versioned: the defaults changed from blanks to the real bookings,
  // and a stored v1 would otherwise shadow them forever.
  const [flights, setFlights] = useLocalState("mi26.flights.v2", DEFAULT_FLIGHTS);
  const [copied, setCopied] = useState(false);

  const setV = useCallback(
    (key, value) => setVehicle((p) => ({ ...p, [key]: value })),
    [setVehicle],
  );

  const setF = useCallback(
    (id, key, value) =>
      setFlights((p) => p.map((f) => (f.id === id ? { ...f, [key]: value } : f))),
    [setFlights],
  );

  const setP = useCallback(
    (id, index, key, value) =>
      setFlights((p) =>
        p.map((f) =>
          f.id === id
            ? {
                ...f,
                passengers: (f.passengers || []).map((pax, i) =>
                  i === index ? { ...pax, [key]: value } : pax,
                ),
              }
            : f,
        ),
      ),
    [setFlights],
  );

  const named = [vehicle.year, vehicle.make, vehicle.model].filter(Boolean).join(" ");
  const mpg = Number(vehicle.mpg) > 0 ? Number(vehicle.mpg) : null;
  const fuel = fuelEstimate(mpg);
  const baseline = fuelEstimate(null);
  const delta = fuel - baseline;

  const copy = useCallback(() => {
    const lines = [
      "MICHIGAN '26 — CAR & FLIGHTS",
      "",
      `Car: ${RENTAL.vehicle}${named ? ` (booked as ${named})` : ""}`,
      `Pick up: ${RENTAL.pickup}`,
      `Drop off: ${RENTAL.dropoff}`,
      `${RENTAL.location} · ${RENTAL.desk}`,
      vehicle.plate ? `Plate: ${vehicle.plate}` : null,
      vehicle.drivers ? `Named drivers: ${vehicle.drivers}` : null,
      "",
      ...flights.flatMap((f) => [
        f.label,
        [
          [f.airline, f.number].filter(Boolean).join(" "),
          f.date,
          f.from && f.to ? `${f.from} → ${f.to}` : "",
          f.depTime && f.arrTime ? `${pretty(f.depTime)} – ${pretty(f.arrTime)}` : "",
        ]
          .filter(Boolean)
          .join(" · "),
        ...(f.passengers || []).map(
          (p) => `  ${p.name} · ${p.record || "—"} · seat ${p.seat || "—"}`,
        ),
        "",
      ]),
    ].filter((l) => l !== null);

    navigator.clipboard?.writeText(lines.join("\n")).then(
      () => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      },
      () => setCopied(false),
    );
  }, [named, vehicle, flights]);

  return (
    <>
      <div className="page-head">
        <div className="eyebrow">Confirmed Logistics</div>
        <h1>
          The car &amp; <em>flights</em>
        </h1>
        <p>
          Confirmed flight reservations (AA 2358 &amp; AA 1253) and Costco Travel Budget rental SUV details.
        </p>
      </div>

      <section className="section">
        <Flag
          level="info"
          title="Monday Return Schedule (AA 1253 at 3:20 PM)"
          fix="Depart Belleville by 8:00 AM Eastern to return the rental car at O'Hare MMF by 1:00 PM."
        >
          Departing the Detroit area by 8:00 AM Eastern gives you an easy morning with time for Ann Arbor coffee/breakfast, dropping bags in Palatine by noon Central, and returning the car at the Multi-Modal Facility by 1:00 PM for the 3:20 PM departure to SFO.
        </Flag>
      </section>

      {/* ── The car ─────────────────────────────────────────────────────── */}
      <section className="section">
        <h2>The car</h2>
        <p className="section-lede">
          {RENTAL.vehicle} &mdash; {RENTAL.costExact} all in. {RENTAL.costNote}
        </p>

        <div className="ride-known">
          <div>
            <b>Pick up</b>
            {RENTAL.pickup}
          </div>
          <div>
            <b>Drop off</b>
            {RENTAL.dropoff}
          </div>
          <div>
            <b>Where</b>
            {RENTAL.location}
          </div>
          <div>
            <b>Counter</b>
            <a href={telHref(RENTAL.desk)}>{RENTAL.desk}</a>
            <small className="muted">{RENTAL.deskNote}</small>
          </div>
        </div>

        <div className="ride-card">
          <div className="ride-card-head">
            <h3>{named || `${RENTAL.vehicle} — actual car assigned at the counter`}</h3>
            {vehicle.colour && <span className="ride-colour">{vehicle.colour}</span>}
          </div>

          <div className="fld-grid">
            {VEHICLE_FIELDS.map((def) => (
              <Field key={def.key} def={def} value={vehicle[def.key]} onChange={setV} />
            ))}
          </div>
        </div>

        <div className={`ride-fuel${mpg ? " is-known" : ""}`}>
          <div className="ride-fuel-figure">
            <b>{money(fuel)}</b>
            <span>estimated fuel, whole trip</span>
          </div>
          <p>
            {mpg ? (
              <>
                At the {mpg} mpg you entered, across {FUEL_BASIS.miles.toLocaleString()}{" "}
                miles at ${FUEL_BASIS.pricePerGallon.toFixed(2)} a gallon &mdash;{" "}
                {delta === 0 ? (
                  "exactly what the CX-50's EPA figure predicted"
                ) : (
                  <>
                    <b>
                      {delta > 0 ? "+" : "−"}
                      {money(Math.abs(delta))}
                    </b>{" "}
                    against the CX-50&rsquo;s {FUEL_BASIS.assumedMpg} mpg
                  </>
                )}
                . The Money page is using this number.
              </>
            ) : (
              <>
                Using the CX-50&rsquo;s EPA-combined {FUEL_BASIS.assumedMpg} mpg across{" "}
                {FUEL_BASIS.miles.toLocaleString()} miles at $
                {FUEL_BASIS.pricePerGallon.toFixed(2)} a gallon. If they hand you
                something else at the counter, put its mpg above and both this and the
                Money page follow.
              </>
            )}
          </p>
        </div>

        <div className="stack" style={{ gap: "var(--s-3)", marginTop: "var(--s-4)" }}>
          {VEHICLE_NOTES.map((n) => (
            <div className="note-strip" key={n.title}>
              <b>{n.title}.</b> {n.body}
            </div>
          ))}
        </div>

        <FuelPlanner />
      </section>

      {/* ── The flights ─────────────────────────────────────────────────── */}
      <section className="section">
        <h2>The flights</h2>
        <p className="section-lede">
          Both of you on the same two American flights, booked on separate records.
          Everything happens at O&rsquo;Hare, which removes a whole category of problem
          &mdash; you never have to cross town between an airport and a rental counter.
        </p>

        <div className="ride-anchors">
          <div className="ride-anchor">
            <span className="eyebrow">{ANCHORS.arrive.label}</span>
            <b>{ANCHORS.arrive.when}</b>
            <p>{ANCHORS.arrive.why}</p>
          </div>
          <div className="ride-anchor">
            <span className="eyebrow">{ANCHORS.depart.label}</span>
            <b>{ANCHORS.depart.when}</b>
            <p>{ANCHORS.depart.why}</p>
          </div>
        </div>

        <div className="ride-airports">
          {AIRPORTS.map((a) => (
            <div className={`ride-airport${a.best ? " is-best" : ""}`} key={a.code}>
              <div className="ride-airport-head">
                <b>{a.code}</b>
                <span>{a.name}</span>
                <i>{a.drive}</i>
              </div>
              <p>{a.note}</p>
            </div>
          ))}
        </div>

        {flights.map((f) => {
          const verdict = check(f);
          return (
            <div className="ride-card" key={f.id}>
              <div className="ride-card-head">
                <h3>{f.label}</h3>
              </div>

              <div className="fld-grid">
                {FLIGHT_FIELDS.map((def) => (
                  <Field
                    key={def.key}
                    def={def}
                    value={f[def.key]}
                    onChange={(k, v) => setF(f.id, k, v)}
                  />
                ))}
              </div>

              {(f.passengers || []).map((pax, i) => (
                <div className={`ride-pax${i === 0 ? " is-first" : ""}`} key={pax.name || i}>
                  {PASSENGER_FIELDS.map((def) => (
                    <Field
                      key={def.key}
                      def={def}
                      value={pax[def.key]}
                      onChange={(k, v) => setP(f.id, i, k, v)}
                    />
                  ))}
                </div>
              ))}

              <div className="flight-tracker-actions" style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "var(--s-3)" }}>
                {f.flight && (
                  <>
                    <a
                      href={`https://www.flightaware.com/live/flight/AAL${f.flight.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="action action--nav"
                      title="Live radar & inbound aircraft tracking on FlightAware"
                    >
                      <span aria-hidden="true">✈️</span>
                      Track Flight #{f.flight} on FlightAware
                    </a>
                    <a
                      href={`https://www.aa.com/travelInformation/flights/status/detail?flightNumber=${f.flight.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="action action--web"
                      title="Official American Airlines gate, baggage & status"
                    >
                      <span aria-hidden="true">📋</span>
                      AA.com Flight Status
                    </a>
                  </>
                )}
              </div>

              {verdict && (
                <div className={`ride-verdict ride-verdict--${verdict.tone}`}>
                  {verdict.text}
                </div>
              )}
            </div>
          );
        })}

        <button type="button" className="le-disclose" onClick={copy}>
          {copied ? "Copied to the clipboard" : "Copy the car and flights as text"}
          <span aria-hidden="true">{copied ? "✓" : "⧉"}</span>
        </button>
      </section>

      {/* ── Monday, backwards from the gate ─────────────────────────────── */}
      <section className="section">
        <h2>Monday, backwards from the gate</h2>
        <p className="section-lede">
          The schedule the return flight actually imposes. It is not the one on the
          day page, and Ann Arbor is the only stop that survives it.
        </p>
        <ol className="ride-run">
          {RUN_HOME.map((r) => (
            <li key={r.at}>
              <b>{r.at}</b>
              <span>{r.what}</span>
            </li>
          ))}
        </ol>

        <FlightRunway />
      </section>
    </>
  );
}
