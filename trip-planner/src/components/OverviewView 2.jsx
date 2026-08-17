import { budgetTotals } from "../data/budget";
import { DAYS, HEADLINES, HIGHLIGHTS, TRIP } from "../data/trip";
import { daysUntil, money } from "../lib/format";
import RouteMap from "./RouteMap";
import { Chip, Flag } from "./bits";

export default function OverviewView({ onGo }) {
  const out = daysUntil(TRIP.start);
  const totalMiles = DAYS.reduce((n, d) => n + (d.miles || 0), 0);
  const totalDrive = DAYS.reduce((n, d) => n + (d.driveMinutes || 0), 0);
  const drivingDays = DAYS.filter((d) => (d.driveMinutes || 0) > 0).length;
  const { perPerson } = budgetTotals();

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

      {HEADLINES.length > 0 && (
        <section className="section">
          <h2>Read these first</h2>
          <p className="section-lede">
            Everything below came out of fact-checking Mom&rsquo;s document against the
            venues&rsquo; own 2026 calendars. These are the things that change what you
            actually do.
          </p>
          <div className="stack" style={{ gap: "var(--s-3)" }}>
            {HEADLINES.map((h) => (
              <Flag key={h.title} level={h.level} title={h.title} fix={h.fix}>
                {h.body}
              </Flag>
            ))}
          </div>
        </section>
      )}

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
    </>
  );
}
