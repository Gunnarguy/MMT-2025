import { useCallback, useState } from "react";

import { FUEL_BASIS, fuelEstimate } from "../data/budget";
import {
  AIRPORTS,
  ANCHORS,
  DEFAULT_FLIGHTS,
  FLIGHT_FIELDS,
  RENTAL,
  VEHICLE_FIELDS,
  VEHICLE_NOTES,
} from "../data/logistics";
import { useLocalState } from "../hooks/useLocalState";
import { money, telHref } from "../lib/format";
import { Flag } from "./bits";

/**
 * The two unsettled things: which car, and which flights.
 *
 * This is the only page in the app that takes input. Everything else is
 * researched, committed and read-only — but the car isn't assigned yet and the
 * flights aren't booked, so there is nothing to commit. What gets typed here
 * lives in localStorage on this device, which the page says plainly rather than
 * letting anyone assume Mom can see it.
 *
 * The mpg field is the one with teeth: the Money page's fuel line reads it.
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
 * Check a flight against the itinerary's hard anchors — the 7pm Monday rental
 * counter on the way in, and a mid-afternoon Monday arrival home on the way
 * out. Returns null when there's nothing to say, which is most of the time.
 */
function check(flight) {
  const { slot, date } = flight;

  if (slot === "arrive") {
    if (!date) return null;
    if (date > ANCHORS.arrive.date) {
      return {
        tone: "stop",
        text: `This lands after the ${ANCHORS.arrive.when} rental pickup. The car — and the Canadian insurance card that comes with it — is collected that evening.`,
      };
    }
    if (date < ANCHORS.arrive.date) {
      return {
        tone: "ok",
        text: "In a day early, so the Monday pickup has all the slack it needs.",
      };
    }
    const arr = minutes(flight.arrTime);
    if (arr == null) return null;
    if (arr > minutes(ANCHORS.arrive.comfortableBy)) {
      const gap = minutes(ANCHORS.arrive.time) - arr;
      return {
        tone: gap < 60 ? "stop" : "warn",
        text: `Landing at ${pretty(flight.arrTime)} leaves ${gap} minutes before the 7:00pm counter appointment — and the drive from the airport to Palatine is 35 of them, before bags. ${
          gap < 60
            ? "That doesn't work. Take an earlier flight, or ring Budget and move the pickup."
            : "Tight but doable. Ring Budget if you slip."
        }`,
      };
    }
    return {
      tone: "ok",
      text: `Lands ${pretty(flight.arrTime)}, which clears the 7:00pm pickup comfortably.`,
    };
  }

  if (slot === "depart") {
    if (!date) return null;
    if (date < ANCHORS.depart.date) {
      return {
        tone: "stop",
        text: "This leaves before the road trip ends. The last day is Monday the 21st.",
      };
    }
    if (date > ANCHORS.depart.date) {
      return {
        tone: "ok",
        text: "Flying out the day after you get back — the relaxed version, and the one worth paying for.",
      };
    }
    const dep = minutes(flight.depTime);
    if (dep == null) return null;
    if (dep < minutes(ANCHORS.depart.notBefore)) {
      return {
        tone: "stop",
        text: `A ${pretty(
          flight.depTime,
        )} departure on the 21st doesn't work. You reach Palatine around 3pm Central after 297 miles, and that's before bag drop and security.`,
      };
    }
    return {
      tone: "warn",
      text: `Same-day departures work only if Monday runs clean. Leave Belleville by 9:00am Eastern, and treat Ann Arbor and Kalamazoo as droppable.`,
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
  const [flights, setFlights] = useLocalState("mi26.flights", DEFAULT_FLIGHTS);
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

  const addLeg = useCallback(
    (slot) =>
      setFlights((p) => {
        // Derive the id from the highest suffix in use, not the array length —
        // add two legs, remove the first, add another, and a length-based id
        // would collide with the leg that's still there.
        let n = 2;
        while (p.some((f) => f.id === `${slot}-${n}`)) n += 1;
        return [
          ...p,
          {
            id: `${slot}-${n}`,
            slot,
            label: slot === "arrive" ? "Out — connecting leg" : "Back — connecting leg",
            who: "Gunnar + Mikaela",
          },
        ];
      }),
    [setFlights],
  );

  const removeLeg = useCallback(
    (id) => setFlights((p) => p.filter((f) => f.id !== id)),
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
      `Car: ${named || "not yet assigned"}${vehicle.colour ? `, ${vehicle.colour}` : ""}`,
      vehicle.plate ? `Plate: ${vehicle.plate}` : null,
      vehicle.confirmation ? `Budget confirmation: ${vehicle.confirmation}` : null,
      vehicle.drivers ? `Named drivers: ${vehicle.drivers}` : null,
      `Pickup: ${RENTAL.pickup}`,
      "",
      ...flights.flatMap((f) => [
        `${f.label} — ${f.who || ""}`.trim(),
        [
          [f.airline, f.number].filter(Boolean).join(" "),
          f.date,
          f.from && f.to ? `${f.from} → ${f.to}` : f.from || f.to,
          f.depTime && f.arrTime ? `${pretty(f.depTime)}–${pretty(f.arrTime)}` : "",
          f.confirmation ? `conf ${f.confirmation}` : "",
          f.seats ? `seats ${f.seats}` : "",
        ]
          .filter(Boolean)
          .join(" · ") || "  (not booked yet)",
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

  const group = (slot) => flights.filter((f) => f.slot === slot);

  return (
    <>
      <div className="page-head">
        <div className="eyebrow">The two unsettled things</div>
        <h1>
          The car and <em>the flights</em>
        </h1>
        <p>
          Everything else in this guide is researched and fixed. These two
          aren&rsquo;t knowable yet &mdash; so this page holds the blanks, the deadlines
          they have to clear, and the reason each one matters. Fill them in as they
          land.
        </p>
      </div>

      <section className="section">
        <Flag level="info" title="This page is stored on your device only">
          Everything you type here goes into this browser&rsquo;s local storage. It
          does not sync, and it will not appear on Mom&rsquo;s phone or on any other
          device you open this site with. Use <b>Copy as text</b> below to send the
          details on &mdash; or once they&rsquo;re final, hand them over and they can be
          baked into the site properly.
        </Flag>
      </section>

      {/* ── The car ─────────────────────────────────────────────────────── */}
      <section className="section">
        <h2>The car</h2>
        <p className="section-lede">
          Booked and paid, {money(RENTAL.cost)} for eight days &mdash; but Budget
          hasn&rsquo;t said what you&rsquo;re actually getting. {RENTAL.costNote}
        </p>

        <div className="ride-known">
          <div>
            <b>Company</b>
            {RENTAL.company}
          </div>
          <div>
            <b>Pick up</b>
            {RENTAL.pickup}
          </div>
          <div>
            <b>Drop off</b>
            {RENTAL.dropoff}
          </div>
          <div>
            <b>Reservations</b>
            <a href={telHref(RENTAL.phone)}>{RENTAL.phone}</a>
          </div>
        </div>

        <div className="ride-card">
          <div className="ride-card-head">
            <h3>{named || "Make, model and year — to be assigned"}</h3>
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
                miles at ${FUEL_BASIS.pricePerGallon.toFixed(2)} a gallon. That&rsquo;s{" "}
                {delta === 0 ? (
                  "exactly the placeholder this trip was budgeted at"
                ) : (
                  <>
                    <b>
                      {delta > 0 ? "+" : "−"}
                      {money(Math.abs(delta))}
                    </b>{" "}
                    against the {FUEL_BASIS.assumedMpg} mpg placeholder
                  </>
                )}
                . The Money page is already using this number.
              </>
            ) : (
              <>
                A placeholder, assuming {FUEL_BASIS.assumedMpg} mpg across{" "}
                {FUEL_BASIS.miles.toLocaleString()} miles at $
                {FUEL_BASIS.pricePerGallon.toFixed(2)} a gallon. Enter the car&rsquo;s
                combined mpg above and both this and the Money page recalculate. A
                mid-size SUV at 24 mpg costs about {money(fuelEstimate(24) - baseline)}{" "}
                more than the placeholder.
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
      </section>

      {/* ── The flights ─────────────────────────────────────────────────── */}
      <section className="section">
        <h2>The flights</h2>
        <p className="section-lede">
          You and Mikaela fly into Chicago and the driving starts from Palatine. Two
          fixed times bracket the booking, and they&rsquo;re both tighter than they
          look.
        </p>

        <div className="ride-anchors">
          <div className="ride-anchor">
            <span className="eyebrow">Land before</span>
            <b>{ANCHORS.arrive.when}</b>
            <p>{ANCHORS.arrive.why}</p>
          </div>
          <div className="ride-anchor">
            <span className="eyebrow">Don&rsquo;t leave before</span>
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

        {["arrive", "depart"].map((slot) => (
          <div key={slot} className="ride-slot">
            {group(slot).map((f) => {
              const verdict = check(f);
              return (
                <div className="ride-card" key={f.id}>
                  <div className="ride-card-head">
                    <h3>{f.label}</h3>
                    <input
                      className="ride-who"
                      value={f.who || ""}
                      placeholder="Who's on it"
                      onChange={(e) => setF(f.id, "who", e.target.value)}
                    />
                    {!DEFAULT_FLIGHTS.some((d) => d.id === f.id) && (
                      <button
                        type="button"
                        className="ride-remove"
                        onClick={() => removeLeg(f.id)}
                      >
                        Remove
                      </button>
                    )}
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

                  {verdict && (
                    <div className={`ride-verdict ride-verdict--${verdict.tone}`}>
                      {verdict.text}
                    </div>
                  )}
                </div>
              );
            })}

            <button type="button" className="ride-add" onClick={() => addLeg(slot)}>
              + Add a connecting leg {slot === "arrive" ? "on the way in" : "on the way home"}
            </button>
          </div>
        ))}

        <button type="button" className="le-disclose" onClick={copy}>
          {copied ? "Copied to the clipboard" : "Copy the car and flights as text"}
          <span aria-hidden="true">{copied ? "✓" : "⧉"}</span>
        </button>
      </section>
    </>
  );
}
