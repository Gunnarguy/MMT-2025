import { useChecklist } from "../hooks/useLocalState";
import { DAYS, HOME, TRIP } from "../data/trip";
import { LODGING } from "../data/lodging";
import { FUEL_STOPS } from "../data/fuel";
import { outstandingLooseEnds } from "../data/looseEnds";
import { duration, longDate, daysUntil, parseDay } from "../lib/format";
import { Chip, Flag, ActionRow } from "./bits";
import { timeline } from "./DayPanel";
import TripForecast from "./TripForecast";
import { useTripWeather } from "../hooks/useTripWeather";
import { dateAt } from "../lib/tripWeather";

/**
 * The road view. Every other tab answers "should we?"; this one answers
 * "what now?".
 *
 * Nine tabs of planning are the wrong shape at 7 AM in a motel parking lot, so
 * this picks the current calendar day itself and shows only what a driver needs
 * before the first coffee: what happens in what order, how long each drive is,
 * where tonight's bed is with a number to dial, and when to get up tomorrow.
 * Before departure it flips to a punch list of everything still waiting on a
 * human, sorted by how soon it bites.
 *
 * `#/today/d4` forces a specific day, which is the only way to check the
 * September pages in September's absence.
 */

/** Local calendar date as YYYY-MM-DD. Never an instant: the trip crosses zones. */
const lodgingFor = (day) => (day?.sleep ? LODGING.find((l) => l.name === day.sleep.name) : null);

/**
 * Everything still waiting on a human, split by when the work has to happen
 * rather than when it bites.
 *
 * Sorting one flat list by the day a thing is needed buries the reservations,
 * which is exactly backwards: a Saturday Oktoberfest table needed on day 5 has
 * to be booked this week or it does not exist. So bookings and confirmation
 * numbers are always "before departure", and an action counts as "on the day"
 * only when its `when` names a dated moment you cannot pre-empt, like a rental
 * counter that is not open until Monday night.
 */
const DATED = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)/;

export function punchList(checked = {}) {
  const missing = LODGING.filter((l) => !l.conf).map((l) => ({
    id: `conf-${l.id}`,
    kind: "conf",
    title: `Confirmation number for ${l.name}`,
    why: `The Blue Water Bridge officer asks where you are staying. ${l.city}, ${longDate(l.checkIn)}.`,
    fix: "Read it off the reservation email, or call the property and ask.",
    phone: l.phone,
    url: l.url,
    needBy: l.checkIn,
    now: true,
  }));

  const ends = outstandingLooseEnds(checked).filter((e) => e.kind !== "border").map((e) => {
    const day = DAYS.find((d) => d.id === e.dayId);
    return {
      id: e.id,
      kind: e.kind,
      title: e.title,
      why: e.problem,
      fix: e.answer,
      deadline: e.deadline,
      phone: e.phone,
      url: e.url && !e.url.startsWith("#") ? e.url : null,
      needBy: day?.date || TRIP.start,
      now: e.kind === "book" || !DATED.test(e.when || ""),
    };
  });

  const all = [...missing, ...ends].sort((a, b) => parseDay(a.needBy) - parseDay(b.needBy));
  return { before: all.filter((i) => i.now), onDay: all.filter((i) => !i.now) };
}

function Leg({ leg }) {
  return (
    <li className="tv-leg">
      <span className="tv-leg-time">{duration(leg.minutes)}</span>
      <div>
        <b>{leg.label}</b>
        {leg.miles ? <span className="tv-leg-mi"> · {leg.miles} mi</span> : null}
        {leg.note && <div className="tv-note">{leg.note}</div>}
      </div>
    </li>
  );
}

function Stop({ stop }) {
  return (
    <li className="tv-stop">
      <span className="tv-dot" aria-hidden="true" />
      <div>
        <div className="tv-stop-head">
          <b>{stop.name}</b>
          {stop.status && <Chip tone={stop.status === "booked" || stop.status === "confirmed" ? "locked" : "ghost"}>{stop.status}</Chip>}
        </div>
        {stop.where && <div className="tv-where">{stop.where}</div>}
        {stop.hours && <div className="tv-note">Hours: {stop.hours}</div>}
        <ActionRow phone={stop.phone} mapQuery={stop.address} url={stop.url} />
      </div>
    </li>
  );
}

/** Tonight's bed, with the one field that gets asked at a border booth. */
function Tonight({ day }) {
  const stay = lodgingFor(day);
  if (!day.sleep) {
    return (
      <section className="tv-bed tv-bed--home">
        <div className="eyebrow">Tonight</div>
        <h3>Home in Palatine</h3>
        <div className="tv-where">{HOME.address}</div>
        <ActionRow mapQuery={HOME.address} />
      </section>
    );
  }
  return (
    <section className="tv-bed">
      <div className="eyebrow">Tonight</div>
      <h3>{day.sleep.name}</h3>
      <div className="tv-where">{day.sleep.address || day.sleep.city}</div>
      <div className="tv-conf">
        {stay?.conf ? (
          <Chip tone="locked">Conf #{stay.conf}</Chip>
        ) : (
          <Chip tone="stop">No confirmation number</Chip>
        )}
        {stay?.price ? <Chip tone="ghost">${stay.price}</Chip> : null}
      </div>
      <ActionRow phone={stay?.phone} mapQuery={day.sleep.address || day.sleep.city} url={stay?.url} />
    </section>
  );
}

function DayBody({ day }) {
  const items = timeline(day);
  const fuel = FUEL_STOPS.filter((f) => f.dayId === day.id);
  const next = DAYS[DAYS.indexOf(day) + 1];
  const nextLeg = next?.legs?.[0];

  return (
    <>
      <div className="tv-metrics">
        <div><b>{day.miles || 0}</b><span>miles</span></div>
        <div><b>{duration(day.driveMinutes) || "—"}</b><span>driving</span></div>
        {day.sunset && <div><b>{day.sunset}</b><span>sunset</span></div>}
      </div>

      <TripForecast dayId={day.id} compact />
      {day.id === "d3" && <a className="trip-option-link" href="#/day/d3">Explore Thursday: SkyBridge instead of Charlevoix, with an option to keep Petoskey →</a>}

      {(day.flags || []).map((f) => (
        <Flag key={f.title} level={f.level} title={f.title}>{f.body}</Flag>
      ))}

      <ol className="tv-rail">
        {items.map((it) =>
          it.type === "leg" ? <Leg key={it.key} leg={it.leg} /> : <Stop key={it.key} stop={it.stop} />,
        )}
      </ol>

      {fuel.map((f) => (
        <div key={f.id} className="tv-fuel">
          <b>⛽ {f.stopName}</b>
          <div className="tv-note">{f.action} — {f.why}</div>
        </div>
      ))}

      <Tonight day={day} />

      {next && (
        <section className="tv-next">
          <div className="eyebrow">Tomorrow</div>
          <b>{next.title}</b>
          <div className="tv-note">
            {next.route}
            {nextLeg ? ` · first drive ${duration(nextLeg.minutes)}` : ""}
          </div>
          <a className="action action--web" href={`#/day/${next.id}`}>Full page for tomorrow</a>
        </section>
      )}
    </>
  );
}

function PunchItem({ item, showCountdown }) {
  const days = daysUntil(item.needBy);
  return (
    <li className={item.kind === "conf" ? "is-conf" : ""}>
      <div className="tv-punch-head">
        <b>{item.title}</b>
        {showCountdown && <Chip tone={days <= 5 ? "stop" : "warn"}>used in {days}d</Chip>}
      </div>
      <div className="tv-note">{item.why}</div>
      <div className="tv-fix">{item.fix}</div>
      {item.deadline && <div className="tv-note">Deadline: {item.deadline}</div>}
      <ActionRow phone={item.phone} url={item.url} urlLabel="Book / open" />
    </li>
  );
}

/** Before departure: the only screen that matters is what is not done yet. */
function Countdown({ out }) {
  const { checked } = useChecklist("mi26.looseends");
  const { before, onDay } = punchList(checked);
  const first = DAYS[0];
  return (
    <>
      <header className="tv-head">
        <div className="eyebrow">Not yet on the road</div>
        <h1>
          {out} {out === 1 ? "day" : "days"} until wheels up
        </h1>
        <p className="tv-lede">
          {longDate(TRIP.start)}: {first.route}. Nothing below can be finished by reading. Each one
          needs a call, a booking, or a number copied off an email.
        </p>
      </header>

      <TripForecast compact />
      <a className="trip-option-link" href="#/day/d3">Explore Thursday: Traverse City → SkyBridge → Mackinaw City →</a>

      <section>
        <h2 className="tv-h2">
          Do before you fly <Chip tone="stop">{before.length}</Chip>
        </h2>
        <p className="tv-note">
          Reservations and confirmation numbers. A table booked the day before is not a table, and a
          border officer asking where you are staying does not accept &ldquo;it is booked somewhere&rdquo;.
        </p>
        <ol className="tv-punch">
          {before.map((item) => <PunchItem key={item.id} item={item} showCountdown />)}
        </ol>
      </section>

      <section>
        <h2 className="tv-h2">
          Do on the day <Chip tone="warn">{onDay.length}</Chip>
        </h2>
        <p className="tv-note">Nothing to do now; these happen at a counter or a clock you cannot pre-empt.</p>
        <ol className="tv-punch">
          {onDay.map((item) => <PunchItem key={item.id} item={item} />)}
        </ol>
      </section>

      <section className="tv-next">
        <div className="eyebrow">Day 1 · {longDate(first.date)}</div>
        <b>{first.title}</b>
        <div className="tv-note">{first.route}</div>
        <a className="action action--web" href={`#/day/${first.id}`}>Open Day 1</a>
      </section>
    </>
  );
}

export default function TodayView({ forcedDayId }) {
  const { now } = useTripWeather();
  const iso = dateAt(now, "America/Detroit");
  const live = DAYS.find((d) => d.date === iso);
  const day = forcedDayId ? DAYS.find((d) => d.id === forcedDayId) : live;
  const out = daysUntil(TRIP.start);

  if (!day) {
    if (out > 0) return <div className="tv">{<Countdown out={out} />}</div>;
    return (
      <div className="tv">
        <header className="tv-head">
          <div className="eyebrow">The trip</div>
          <h1>Home again</h1>
          <p className="tv-lede">
            {TRIP.name} ran {longDate(TRIP.start)} to {longDate(TRIP.end)}. Every day is still on the
            Day by day tab, and the Scout tab holds the fifteen towns.
          </p>
        </header>
      </div>
    );
  }

  const style = { "--day": `var(--day-${day.index})` };
  return (
    <div className="tv" style={style}>
      <header className="tv-head">
        <div className="eyebrow">
          {forcedDayId && !live ? "Preview · not today" : "Today"} · {day.index === 0 ? "Arrival night" : `Day ${day.index} of 7`}
        </div>
        <h1>{day.title}</h1>
        <div className="tv-date">{longDate(day.date)}</div>
        <p className="tv-lede">{day.route}</p>
      </header>
      <DayBody day={day} />
      <p className="tv-foot">
        Everything here is also on the Day by day tab, with sources. Tap a phone number to dial, an
        address to navigate. The page works with no signal once it has loaded once.
      </p>
    </div>
  );
}
