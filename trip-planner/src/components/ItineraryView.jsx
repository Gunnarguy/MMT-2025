import { DAYS } from "../data/trip";
import {
  dayNumber,
  dayOfWeekShort,
  duration,
  longDate,
  monthShort,
} from "../lib/format";
import { Chip } from "./bits";

/**
 * How many things on a day want attention. A count beats a label: every day but
 * the last has at least one, so a single word on all of them says nothing.
 *
 * Wording matters here — Mom planned this trip and will read this page. "To
 * know" is a heads-up, not a verdict on her plan.
 */
function flagCounts(day) {
  const levels = (day.flags || []).map((f) => f.level);
  return {
    stop: levels.filter((l) => l === "stop").length,
    warn: levels.filter((l) => l === "warn").length,
  };
}


export default function ItineraryView({ onGo }) {
  const totalMiles = DAYS.reduce((n, d) => n + (d.miles || 0), 0);
  const totalDrive = DAYS.reduce((n, d) => n + (d.driveMinutes || 0), 0);

  return (
    <>
      <div className="page-head">
        <div className="eyebrow">Eight days</div>
        <h1>Day by day</h1>
        <p>
          {totalMiles.toLocaleString()} miles and about {Math.round(totalDrive / 60)}{" "}
          hours behind the wheel, split across seven driving days and one island.
          Tap any day for the full run of it.
        </p>
      </div>

      <div className="stack" style={{ gap: "var(--s-4)" }}>
        {DAYS.map((day) => {
          const flags = flagCounts(day);
          return (
            <button
              key={day.id}
              type="button"
              className="card card-pad"
              style={{
                "--day": `var(--day-${day.index})`,
                textAlign: "left",
                display: "grid",
                gridTemplateColumns: "auto 1fr auto",
                gap: "var(--s-4)",
                alignItems: "start",
                borderLeft: "4px solid var(--day)",
              }}
              onClick={() => onGo("days", day.id)}
            >
              <div style={{ textAlign: "center", minWidth: "3rem" }}>
                <div className="daytab-dow">{dayOfWeekShort(day.date)}</div>
                <div className="daytab-num">{dayNumber(day.date)}</div>
                <div className="daytab-mon">{monthShort(day.date)}</div>
              </div>

              <div style={{ minWidth: 0 }}>
                <div
                  className="row"
                  style={{ gap: "var(--s-2)", marginBottom: "0.2rem" }}
                >
                  <span
                    className="eyebrow"
                    style={{ color: "var(--day)" }}
                  >
                    {day.index === 0 ? "Eve" : `Day ${day.index}`}
                  </span>
                  {flags.stop > 0 && <Chip tone="stop">{flags.stop} to know</Chip>}
                  {flags.warn > 0 && <Chip tone="warn">{flags.warn} to check</Chip>}
                </div>
                <h3
                  style={{
                    fontSize: "var(--t-lg)",
                    marginBottom: "0.2rem",
                  }}
                >
                  {day.title}
                </h3>
                <div
                  className="muted"
                  style={{ fontSize: "var(--t-sm)", lineHeight: 1.45 }}
                >
                  {day.route}
                </div>
                <div
                  className="row"
                  style={{
                    marginTop: "var(--s-3)",
                    gap: "var(--s-3)",
                    fontSize: "var(--t-xs)",
                    color: "var(--ink-3)",
                  }}
                >
                  {day.miles ? (
                    <span className="mono">{day.miles} mi</span>
                  ) : (
                    <span className="mono">no driving</span>
                  )}
                  {day.driveMinutes ? (
                    <span className="mono">{duration(day.driveMinutes)} driving</span>
                  ) : null}
                  <span>
                    {day.sleep ? `🛏 ${day.sleep.city}` : "🏠 Home"}
                  </span>
                </div>
              </div>

              <span
                aria-hidden="true"
                style={{
                  color: "var(--ink-4)",
                  fontSize: "1.2rem",
                  alignSelf: "center",
                }}
              >
                ›
              </span>
              <span className="sr-only">Open {longDate(day.date)}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
