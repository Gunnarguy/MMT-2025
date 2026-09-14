import { DAYS } from "../data/trip";
import { LODGING } from "../data/lodging";
import { ANCHORS, DEFAULT_FLIGHTS, RENTAL, RUN_HOME, VEHICLE_NOTES } from "../data/logistics";
import { useLocalState } from "../hooks/useLocalState";
import { directionsHref, shortDate, telHref } from "../lib/format";

const STATUS = { booked: "Booked", purchased: "Already paid", confirmed: "Confirmed in guide", check: "Call ahead", closed: "Closed that day", seasonal: "Seasonal — check hours", free: "Free" };

export function PointFacts({ rows }) {
  return <dl className="point-facts">{rows.filter(([, value]) => value != null && value !== "").map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>;
}

export function PointActions({ address, phone, url, urlLabel = "Website" }) {
  return <div className="point-actions">
    {address && <a href={directionsHref(null, address)} target="_blank" rel="noreferrer">Directions ↗</a>}
    {phone && <a href={telHref(phone)}>Call {phone}</a>}
    {url && <a href={url} target="_blank" rel="noreferrer">{urlLabel} ↗</a>}
  </div>;
}

export function StayDetails({ stay }) {
  if (!stay) return null;
  return <div className="point-details">
    <p className="point-context">{stay.city}{stay.provisional ? " · Provisional backup" : " · Overnight stay"}</p>
    <PointActions address={stay.address} phone={stay.phone} url={stay.url} />
    <PointFacts rows={[
      ["Address", stay.address], ["Check-in", shortDate(stay.checkIn)], ["Check-out", shortDate(stay.checkOut)],
      ["Stay", `${stay.nights} night${stay.nights === 1 ? "" : "s"}`],
      ["Recorded total", `${stay.currency} $${stay.price} · guide rate, confirm with reservation`],
      ["Confirmation", stay.conf || "Not recorded in the guide"],
    ]} />
    <p>{stay.note}</p>
    {stay.tags?.length > 0 && <p className="point-context">{stay.tags.join(" · ")}</p>}
    {stay.flag && <section className="point-caution"><h4>{stay.flag.title}</h4><p>{stay.flag.body}</p></section>}
    {stay.sourceUrl && <a href={stay.sourceUrl} target="_blank" rel="noreferrer">{stay.source || "Property source"} ↗</a>}
    <p className="point-context">Property notes are saved guide research; call to confirm current policies and your booking.</p>
    <a href="#/stays">All stays & booking checklist →</a>
  </div>;
}

export function StopDetails({ stop, day, includeStay = true }) {
  const stay = includeStay && stop.kind === "sleep" && LODGING.find(s => s.name === day?.sleep?.name);
  return <div className="point-details">
    <p className="point-context">{[stop.where, day && `${shortDate(day.date)} · ${day.title}`].filter(Boolean).join(" · ")}</p>
    {stay && <section className="point-caution"><h4>Check the lodging record</h4><p>{stay.provisional ? `${stay.name} is a provisional backup, despite the older stop being marked booked.` : `The lodging list names ${stay.name}. Use that property’s details below for your overnight; this itinerary marker retains the original stop information.`}</p></section>}
    <PointActions address={stop.address || stop.coords?.join(",")} phone={stop.phone} url={stop.url} urlLabel={stop.urlLabel} />
    <PointFacts rows={[["Plan status", STATUS[stop.status] || stop.status], ["Cost", stop.cost], ["Hours", stop.hours], ["Time needed", stop.duration || stop.time], ["Address", stop.address]]} />
    {stop.blurb && <p>{stop.blurb}</p>}
    {stop.tips?.length > 0 && <section><h4>Good to know</h4><ul>{stop.tips.map(tip => <li key={tip}>{tip}</li>)}</ul></section>}
    {stop.docQuote && <blockquote>{stop.docQuote}</blockquote>}
    {stop.source && <p className="point-context">Guide source: {stop.sourceUrl ? <a href={stop.sourceUrl} target="_blank" rel="noreferrer">{stop.source} ↗</a> : stop.source}</p>}
    {stay && <details><summary>Full hotel details · {stay.name}</summary><StayDetails stay={stay} /></details>}
    {stop.id === "d0-rental" && <details><summary>Complete rental & counter information</summary><RentalPointDetails /></details>}
    {(stop.id === "d0-flight" || stop.id === "d7-flight") && <details><summary>Saved flight & airport details</summary><FlightPointDetails slot={stop.id === "d0-flight" ? "arrive" : "depart"} airport /></details>}
    {day && <a href={`#/day/${day.id}`}>Open this day’s full plan →</a>}
  </div>;
}

export function DayPointDetails({ dayId }) {
  const day = DAYS.find(d => d.id === dayId);
  return day && <div className="point-details">
    <p>{shortDate(day.date)} · {day.title}</p>
    {day.flags?.map(flag => <section className="point-caution" key={flag.title}><h4>{flag.title}</h4><p>{flag.body}</p></section>)}
    {day.stops.map(stop => <details key={stop.id}><summary>{stop.name}</summary><StopDetails stop={stop} day={day} /></details>)}
    <a href={`#/day/${day.id}`}>Full day plan →</a>
  </div>;
}

export function FlightPointDetails({ slot, airport = false }) {
  const [flights] = useLocalState("mi26.flights.v2", DEFAULT_FLIGHTS);
  const flight = flights.find(f => f.slot === slot);
  if (!flight) return <p>No flight saved for this leg. <a href="#/ride">Open Car & flights</a></p>;
  const flightNum = (flight.number || "").replace(/\D/g, "");
  return <div className="point-details">
    <PointFacts rows={[
      ["Flight", `${flight.airline} · ${flight.number}`],
      ["Aircraft", flight.aircraft],
      ["Cabin & Power", flight.specs],
      ["Date", flight.date],
      ["Departure", `${flight.from} ${flight.depTime} · ${flight.depTerminal || ""}`],
      ["Arrival", `${flight.to} ${flight.arrTime} · ${flight.arrTerminal || ""}`],
      ["Boarding Cutoff", flight.boardingCutoff],
      ["Seating Strategy", flight.seatTactics],
      ["Baggage Claim", flight.baggageClaim],
    ]} />
    {flight.passengers && (
      <p className="point-context" style={{ margin: "6px 0" }}>
        <strong>Passengers:</strong> {flight.passengers.map(p => `${p.name} (Seat ${p.seat}, PNR ${p.record})`).join(" · ")}
      </p>
    )}
    <div className="point-actions" style={{ marginTop: "6px" }}>
      {flightNum && (
        <>
          <a href={`https://www.flightaware.com/live/flight/AAL${flightNum}`} target="_blank" rel="noreferrer">FlightAware Radar ↗</a>
          <a href={`https://www.flightradar24.com/data/flights/aa${flightNum}`} target="_blank" rel="noreferrer">Flightradar24 ↗</a>
          <a href={`https://www.aa.com/travelInformation/flights/status/detail?flightNumber=${flightNum}`} target="_blank" rel="noreferrer">AA Status ↗</a>
        </>
      )}
    </div>
    {airport && <p>{slot === "arrive" ? ANCHORS.arrive.why : ANCHORS.depart.why}</p>}
    {slot === "depart" && <details><summary>Return-day timing</summary><PointFacts rows={RUN_HOME.map(r => [r.at, r.what])} /></details>}
    <a href="#/ride">Car & flights · full ops deck & runways →</a>
  </div>;
}

export function RentalPointDetails() {
  return <div className="point-details">
    <PointActions address={RENTAL.location} phone={RENTAL.desk} />
    <PointFacts rows={[["Address", RENTAL.location], ["Pickup", RENTAL.pickup], ["Return", RENTAL.dropoff], ["Vehicle booked", RENTAL.vehicle], ["Class", RENTAL.vehicleClass], ["Recorded cost", RENTAL.costExact], ["Booking", RENTAL.status], ["Desk", RENTAL.deskNote]]} />
    <p>{RENTAL.costNote}</p><p>{ANCHORS.arrive.why}</p>
    <h4>At the counter</h4><ul>{VEHICLE_NOTES.map((note, i) => <li key={i}><strong>{note.title}:</strong> {note.body}</li>)}</ul>
    <a href="#/ride">Car details & return plan →</a>
  </div>;
}

export function ScoutPointDetails({ town }) {
  return <div className="point-details">
    <PointFacts rows={[["Comfortable income", town.comfort], ["Crime per 1k", town.crime], ["Internet", town.fiber], ["Property tax", town.tax]]} />
    {town.badges && <p>{[...town.badges.pro, ...town.badges.con].join(" · ")}</p>}
    <p>{town.verdict}</p>
    {Object.entries(town.workup || {}).map(([key, value]) => Array.isArray(value) ? <details key={key}><summary>{key.replace(/^./, c => c.toUpperCase())}</summary><PointFacts rows={value} /></details> : <p key={key} className="point-context">{value}</p>)}
    <PointActions address={town.coords.join(",")} />
    <a href="#/scout">Town Scout · compare towns & costs →</a>
  </div>;
}
