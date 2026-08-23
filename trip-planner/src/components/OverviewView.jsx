import { budgetTotals } from "../data/budget";
import { KINDS, KIND_ORDER, LOOSE_ENDS, looseEndTotals } from "../data/looseEnds";
import { DAYS, HIGHLIGHTS, TRIP } from "../data/trip";
import { daysUntil, money } from "../lib/format";
import { downloadIcsFile } from "../lib/calendarExport";
import RouteMap from "./RouteMap";
import { Chip } from "./bits";

export default function OverviewView({ onGo }) {
  const out = daysUntil(TRIP.start);
  const totalMiles = DAYS.reduce((n, d) => n + (d.miles || 0), 0);
  const totalDrive = DAYS.reduce((n, d) => n + (d.driveMinutes || 0), 0);
  const drivingDays = DAYS.filter((d) => (d.driveMinutes || 0) > 0).length;
  const { perPerson } = budgetTotals();
  const totals = looseEndTotals();
  const keyActionItems = LOOSE_ENDS.slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="hero-eyebrow">Palatine → the Straits → Ontario → home</div>
        <h1>
          Michigan,
          <br />
          <em>top to bottom</em>
        </h1>
        <p className="hero-sub">{TRIP.subtitle}</p>

        <div className="hero-dates">
          <span>Mon Sep 14</span>
          <i className="dot" />
          <span>Mon Sep 21, 2026</span>
          <i className="dot" />
          <span>8 days</span>
        </div>

        {out > 0 && (
          <div className="countdown-big">
            <b>{out}</b>
            <span>days until the car is loaded</span>
          </div>
        )}

        <div style={{ marginTop: "var(--s-4)", display: "flex", gap: "var(--s-3)", flexWrap: "wrap" }}>
          <button
            type="button"
            className="dispatch-copy-btn"
            style={{ padding: "8px 16px", fontSize: "12px" }}
            onClick={() => downloadIcsFile("Michigan-2026-Full-Itinerary.ics")}
          >
            📅 Export All Trip Events to Apple / Google Calendar (.ics)
          </button>
        </div>

        <div className="hero-crew">
          {TRIP.crew.map((c) => (
            <div className="crew" key={c.name}>
              <div className="crew-avatar">{c.initial}</div>
              <div>
                <div className="crew-name">{c.name}</div>
                <div className="crew-role">{c.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" style={{ marginTop: "var(--s-6)" }}>
        <div className="stat-grid">
          <div className="stat">
            <div className="stat-value">
              {totalMiles.toLocaleString()}
              <small>mi</small>
            </div>
            <div className="stat-label">On the road</div>
            <div className="stat-note">Measured on the actual route, not as the crow flies</div>
          </div>
          <div className="stat">
            <div className="stat-value">
              {Math.round(totalDrive / 60)}
              <small>hrs</small>
            </div>
            <div className="stat-label">Driving</div>
            <div className="stat-note">Across {drivingDays} driving days</div>
          </div>
          <div className="stat">
            <div className="stat-value">
              5<small>beds</small>
            </div>
            <div className="stat-label">All booked</div>
            <div className="stat-note">7 nights away</div>
          </div>
          <div className="stat">
            <div className="stat-value">
              2<small>countries</small>
            </div>
            <div className="stat-label">USA + Canada</div>
            <div className="stat-note">One night in Ontario</div>
          </div>
          <div className="stat">
            <div className="stat-value">{money(perPerson)}</div>
            <div className="stat-label">Each, roughly</div>
            <div className="stat-note">Shared costs split three ways</div>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Key Action Items & Reservations</h2>
        <p className="section-lede">
          The essential reservations, rental counter requests, and border requirements for the trip.
        </p>

        <div className="le-filters" style={{ marginBottom: "var(--s-4)" }}>
          {KIND_ORDER.map((k) => (
            <button
              key={k}
              type="button"
              className={`le-filter le-filter--${KINDS[k].tone}`}
              onClick={() => onGo("loose")}
            >
              <span aria-hidden="true">{KINDS[k].icon}</span>
              {KINDS[k].label}
              <b>{totals.byKind[k]}</b>
            </button>
          ))}
        </div>

        <div className="le-stack">
          {keyActionItems.map((d) => (
            <button
              key={d.id}
              type="button"
              className={`le-card le-card--${KINDS[d.kind]?.tone || "info"}`}
              style={{ textAlign: "left", width: "100%" }}
              onClick={() => onGo("loose")}
            >
              <div className="le-card-meta">
                <span className={`le-badge le-badge--${KINDS[d.kind]?.tone || "info"}`}>
                  <span aria-hidden="true">{KINDS[d.kind]?.icon}</span>
                  {KINDS[d.kind]?.label}
                </span>
                <span className="le-when">{d.when}</span>
              </div>
              <h3
                style={{
                  fontSize: "var(--t-lg)",
                  lineHeight: 1.3,
                  margin: "0.35rem 0 0.25rem",
                }}
              >
                {d.title}
              </h3>
              <p style={{ fontSize: "var(--t-sm)", color: "var(--ink-3)", margin: 0 }}>
                {d.summary || d.problem}
              </p>
            </button>
          ))}
        </div>

        <button
          type="button"
          className="le-disclose"
          style={{ marginTop: "var(--s-3)" }}
          onClick={() => onGo("loose")}
        >
          View all {totals.total} key action items & reservations
          <span aria-hidden="true">&rarr;</span>
        </button>
      </section>

      <section className="section">
        <h2>The line</h2>
        <p className="section-lede">
          Up the Lake Michigan shore, across the Straits, down through Little Bavaria
          into Ontario, and home along I-94.
        </p>
        <RouteMap />
      </section>

      <section className="section">
        <h2>The parts you&rsquo;ll remember</h2>
        <div
          style={{
            display: "grid",
            gap: "var(--s-4)",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          }}
        >
          {HIGHLIGHTS.map((h) => (
            <button
              key={h.title}
              type="button"
              className="card card-pad"
              style={{
                textAlign: "left",
                "--day": `var(--day-${h.dayIndex})`,
                borderTop: "3px solid var(--day)",
              }}
              onClick={() => onGo("days", h.dayId)}
            >
              <div className="eyebrow" style={{ color: "var(--day)" }}>
                {h.when}
              </div>
              <h3
                style={{
                  fontSize: "var(--t-lg)",
                  margin: "0.3rem 0 0.4rem",
                }}
              >
                {h.title}
              </h3>
              <p style={{ fontSize: "var(--t-sm)", color: "var(--ink-2)" }}>
                {h.body}
              </p>
              {h.tag && (
                <div style={{ marginTop: "var(--s-3)" }}>
                  <Chip tone={h.tagTone || "ghost"}>{h.tag}</Chip>
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Field visuals &amp; infographics</h2>
        <p className="section-lede">
          Topography, daylight curves, border procedures, flight runways, and island tracks.
        </p>
        <div
          style={{
            display: "grid",
            gap: "var(--s-4)",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          }}
        >
          <button
            type="button"
            className="card card-pad"
            style={{ textAlign: "left", cursor: "pointer" }}
            onClick={() => onGo("days", "d2")}
          >
            <div className="eyebrow" style={{ color: "var(--day-2)" }}>
              Day 2 · Wed Sep 16
            </div>
            <h3 style={{ fontSize: "var(--t-md)", margin: "0.2rem 0" }}>
              🏔️ Sleeping Bear Dunes Cross-Section
            </h3>
            <p style={{ fontSize: "var(--t-xs)", color: "var(--ink-2)" }}>
              Topographic profile from Lake Michigan beach level (0 ft) to the 450 ft Overlook #9 summit with 33° warning slope.
            </p>
          </button>

          <button
            type="button"
            className="card card-pad"
            style={{ textAlign: "left", cursor: "pointer" }}
            onClick={() => onGo("days", "d4")}
          >
            <div className="eyebrow" style={{ color: "var(--day-4)" }}>
              Day 4 · Fri Sep 18
            </div>
            <h3 style={{ fontSize: "var(--t-md)", margin: "0.2rem 0" }}>
              🚲 Mackinac Island M-185 Track
            </h3>
            <p style={{ fontSize: "var(--t-xs)", color: "var(--ink-2)" }}>
              Official 8.2-mile flat perimeter highway mile markers: Arch Rock, British Landing cannon, and West Bluff.
            </p>
          </button>

          <button
            type="button"
            className="card card-pad"
            style={{ textAlign: "left", cursor: "pointer" }}
            onClick={() => onGo("border")}
          >
            <div className="eyebrow" style={{ color: "var(--day-5)" }}>
              Day 5 &amp; 6 · Sat–Sun
            </div>
            <h3 style={{ fontSize: "var(--t-md)", margin: "0.2rem 0" }}>
              🇨🇦 Border Crossing 4-Step Guides
            </h3>
            <p style={{ fontSize: "var(--t-xs)", color: "var(--ink-2)" }}>
              Blue Water Bridge ($5 USD cashless toll) and Detroit–Windsor Tunnel (CA$8.25) lane flow, tolls, and CBP/CBSA checklists.
            </p>
          </button>

          <button
            type="button"
            className="card card-pad"
            style={{ textAlign: "left", cursor: "pointer" }}
            onClick={() => onGo("days", "d6")}
          >
            <div className="eyebrow" style={{ color: "var(--day-6)" }}>
              Day 6 · Sun Sep 20
            </div>
            <h3 style={{ fontSize: "var(--t-md)", margin: "0.2rem 0" }}>
              ⚖️ Sunday Decision: Plan A vs Plan B
            </h3>
            <p style={{ fontSize: "var(--t-xs)", color: "var(--ink-2)" }}>
              Side-by-side trade-off comparison: Windsor + Belle Isle + Detroit vs Dearborn (The Henry Ford).
            </p>
          </button>

          <button
            type="button"
            className="card card-pad"
            style={{ textAlign: "left", cursor: "pointer" }}
            onClick={() => onGo("ride")}
          >
            <div className="eyebrow" style={{ color: "var(--day-7)" }}>
              Day 7 · Mon Sep 21
            </div>
            <h3 style={{ fontSize: "var(--t-md)", margin: "0.2rem 0" }}>
              ✈️ Flight Departure Runway Countdown
            </h3>
            <p style={{ fontSize: "var(--t-xs)", color: "var(--ink-2)" }}>
              Reverse timeline counting backwards from AA 1253&rsquo;s 3:20 PM departure at O&rsquo;Hare Terminal 3.
            </p>
          </button>

          <button
            type="button"
            className="card card-pad"
            style={{ textAlign: "left", cursor: "pointer" }}
            onClick={() => onGo("money")}
          >
            <div className="eyebrow" style={{ color: "var(--day-3)" }}>
              Whole Trip Logistics
            </div>
            <h3 style={{ fontSize: "var(--t-md)", margin: "0.2rem 0" }}>
              ⛽ Fuel &amp; Cruising Range Planner
            </h3>
            <p style={{ fontSize: "var(--t-xs)", color: "var(--ink-2)" }}>
              Mazda CX-50 15.9-gallon fuel tank, 26 MPG combined, and the 4 strategic refueling stops across the 1,430 miles.
            </p>
          </button>
        </div>
      </section>
    </>
  );
}
