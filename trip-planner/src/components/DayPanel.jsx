import { LOOSE_ENDS } from "../data/looseEnds";
import { DAYS } from "../data/trip";
import { duration, longDate } from "../lib/format";
import RouteMap from "./RouteMap";
import StopCard from "./StopCard";
import { Flag, MomSaid } from "./bits";
import DaylightRibbon from "./visuals/DaylightRibbon";
import DuneCrossSection from "./visuals/DuneCrossSection";
import MackinacTrack from "./visuals/MackinacTrack";
import { BlueWaterBridgeSteps, DetroitTunnelSteps } from "./visuals/BorderCrossingSteps";
import FlightRunway from "./visuals/FlightRunway";
import SundayComparator from "./visuals/SundayComparator";
import FuelPlanner from "./visuals/FuelPlanner";

/**
 * Interleave drive legs and stops into one chronological rail.
 *
 * A leg's `at` is the index of the first stop that happens *after* that drive —
 * so three stops in Frankenmuth sit between the drive in and the drive out.
 * Legs are emitted in order, and any left over (the last run into the hotel
 * town) land at the end.
 */
function timeline(day) {
  const stops = day.stops || [];
  const legs = day.legs || [];
  const items = [];
  let l = 0;

  const anchorOf = (i) => (legs[i].at != null ? legs[i].at : i);
  const pushLeg = () => {
    items.push({ type: "leg", key: `leg-${l}`, leg: legs[l] });
    l += 1;
  };

  stops.forEach((stop, i) => {
    while (l < legs.length && anchorOf(l) <= i) pushLeg();
    items.push({ type: "stop", key: stop.id, stop });
  });
  while (l < legs.length) pushLeg();

  return items;
}

export default function DayPanel({ day }) {
  const style = { "--day": `var(--day-${day.index})` };
  const prev = DAYS[DAYS.indexOf(day) - 1];
  const next = DAYS[DAYS.indexOf(day) + 1];
  // Anything on this day still waiting on a human, so the day page can point at
  // it without repeating the whole card.
  const open = LOOSE_ENDS.filter((e) => e.dayId === day.id && e.kind !== "done");

  return (
    <div style={style}>
      <header className="dayhead">
        <div className="dayhead-eyebrow">
          <span className="dayhead-daynum">
            {day.index === 0 ? "Eve" : `Day ${day.index}`}
          </span>
          <span className="eyebrow">{longDate(day.date)}</span>
        </div>
        <h2>{day.title}</h2>
        {day.route && <div className="dayhead-route">{day.route}</div>}
        {day.lede && <p className="dayhead-lede">{day.lede}</p>}

        <div className="dayhead-meta">
          <div className="dayhead-metric">
            <b>{day.miles ? `${day.miles}` : "—"}</b>
            <span>Miles</span>
          </div>
          <div className="dayhead-metric">
            <b>{day.driveMinutes ? duration(day.driveMinutes) : "—"}</b>
            <span>Behind the wheel</span>
          </div>
          <div className="dayhead-metric">
            <b>{day.sleep ? day.sleep.city : "Home"}</b>
            <span>Sleep</span>
          </div>
          {day.sunset && (
            <div className="dayhead-metric">
              <b>{day.sunset}</b>
              <span>Sunset</span>
            </div>
          )}
        </div>
      </header>

      <DaylightRibbon dayId={day.id} />

      {open.length > 0 && (
        <a className="daylooseends" href="#/loose">
          {/* The badge carries the number, so the sentence doesn't repeat it —
              and stays grammatical whether there's one or five. */}
          <span className="dle-count">{open.length}</span>
          <span className="dle-text">
            <b>{open.length === 1 ? "Loose end on this day" : "Loose ends on this day"}</b>
            <small>{open.map((e) => e.title).join(" · ")}</small>
          </span>
          <span className="dle-go" aria-hidden="true">
            &rarr;
          </span>
        </a>
      )}

      {day.flags?.length > 0 && (
        <div style={{ marginTop: "var(--s-5)" }}>
          {day.flags.map((f) => (
            <Flag key={f.title} level={f.level} title={f.title} fix={f.fix}>
              {f.body}
            </Flag>
          ))}
        </div>
      )}

      <section className="timeline">
        {timeline(day).map((item) =>
          item.type === "leg" ? (
            <div className="tl-item tl-item--leg" key={item.key}>
              <div className="leg">
                <span className="leg-dur">
                  {duration(item.leg.minutes)}
                  {item.leg.miles ? ` · ${item.leg.miles} mi` : ""}
                </span>
                <span className="leg-desc">
                  <b>{item.leg.label}</b>
                  {item.leg.note ? ` — ${item.leg.note}` : ""}
                </span>
              </div>
            </div>
          ) : (
            <div className="tl-item" key={item.key}>
              <StopCard stop={item.stop} from={day.legFrom} />
            </div>
          ),
        )}
      </section>

      {day.id === "d2" && <DuneCrossSection />}
      {day.id === "d4" && <MackinacTrack />}
      {day.id === "d5" && <BlueWaterBridgeSteps />}
      {day.id === "d6" && (
        <>
          <DetroitTunnelSteps />
          <SundayComparator />
        </>
      )}
      {day.id === "d7" && <FlightRunway />}

      {["d2", "d5", "d7"].includes(day.id) && <FuelPlanner dayId={day.id} />}

      {day.momSaid && (
        <div style={{ marginTop: "var(--s-5)" }}>
          <MomSaid>{day.momSaid}</MomSaid>
        </div>
      )}

      {day.images?.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: "var(--s-4)",
            flexWrap: "wrap",
            marginTop: "var(--s-4)",
          }}
        >
          {day.images.map((img) => (
            <figure className="docimg" key={img.src}>
              <img src={`${import.meta.env.BASE_URL}${img.src}`} alt={img.alt} loading="lazy" />
              <figcaption>{img.caption}</figcaption>
            </figure>
          ))}
        </div>
      )}

      {day.mapped !== false && (
        <div style={{ marginTop: "var(--s-6)" }}>
          <h3 style={{ fontSize: "var(--t-lg)", marginBottom: "var(--s-3)" }}>
            Today&rsquo;s line
          </h3>
          <RouteMap focusDayId={day.id} height="clamp(280px, 42vh, 420px)" compact />
        </div>
      )}

      <nav className="daynav">
        {prev ? (
          <button type="button" onClick={() => (window.location.hash = `#/day/${prev.id}`)}>
            <span className="dn-label">← Previous</span>
            <span className="dn-title">{prev.title}</span>
          </button>
        ) : (
          <span />
        )}
        {next && (
          <button
            type="button"
            className="dn-next"
            onClick={() => (window.location.hash = `#/day/${next.id}`)}
          >
            <span className="dn-label">Next →</span>
            <span className="dn-title">{next.title}</span>
          </button>
        )}
      </nav>
    </div>
  );
}
