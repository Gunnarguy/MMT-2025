import { useEffect, useState } from "react";
import { CircleMarker, MapContainer, Polyline, TileLayer, Tooltip, useMap } from "react-leaflet";
import { SKYBRIDGE, THURSDAY_OPTIONS, THURSDAY_PLACES, thursdayDirections } from "../data/thursdayOptions";
import geometry from "../data/thursdayGeometry.json";
import { duration } from "../lib/format";
import "../styles/trip-options.css";

const bounds = [[44.69, -85.87], [45.86, -84.52]];
const minutes = (route) => Math.round(route.seconds / 300) * 5;

function FitComparison() {
  const map = useMap();
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      map.invalidateSize();
      map.fitBounds(bounds, { padding: [30, 30], animate: false });
    });
    observer.observe(map.getContainer());
    return () => observer.disconnect();
  }, [map]);
  return null;
}

export default function ThursdayOptions() {
  const [selected, setSelected] = useState("skybridge");
  const option = THURSDAY_OPTIONS.find((o) => o.id === selected);
  const route = geometry.routes[selected];
  const coast = geometry.routes.coast;

  return (
    <section className="trip-options" aria-labelledby="thursday-options-title">
      <div className="eyebrow">Thursday, September 17 · Explore a different route</div>
      <h2 id="thursday-options-title">What if we went to SkyBridge?</h2>
      <p>Turn inland from Traverse City for Boyne Mountain, then head up to Mackinaw City.
        You can also keep Petoskey on the way north.</p>
      <p className="trip-options-note"><b>Comparison only.</b> Choosing a row previews its map and sample day.
        The itinerary, calendar, budget and hotel bookings still show the original plan.</p>

      <div className="trip-table-scroll" role="region" aria-label="Compare Thursday routes" tabIndex={0}>
        <table className="trip-comparison">
          <caption>Same town-to-town endpoints · driving excludes visits, parking and traffic</caption>
          <thead><tr><th scope="col">Route to preview</th><th scope="col">Road miles</th><th scope="col">Driving estimate</th><th scope="col">What the day includes</th></tr></thead>
          <tbody>{THURSDAY_OPTIONS.map((o) => {
            const r = geometry.routes[o.id];
            return <tr key={o.id} className={selected === o.id ? "is-selected" : ""}>
              <th scope="row"><button type="button" aria-pressed={selected === o.id} onClick={() => setSelected(o.id)}>
                <span className="trip-route-dot" style={{ background: o.color }} aria-hidden="true" />{o.name}
              </button></th>
              <td>≈{Math.round(r.meters / 1609.344)} mi</td>
              <td>≈{duration(minutes(r))}{o.id !== "coast" && <small>about {minutes(r) - minutes(coast)}m more</small>}</td>
              <td>{o.keeps}</td>
            </tr>;
          })}</tbody>
        </table>
      </div>

      <div className="trip-option-map" aria-label="Road map comparing the original coastal route and the selected alternative">
        <MapContainer bounds={bounds} boundsOptions={{ padding: [30, 30] }} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
          <FitComparison />
          <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
          <Polyline positions={coast.line} pathOptions={{ color: "#267044", weight: 4, dashArray: "7 8", opacity: 0.8 }} />
          {selected !== "coast" && <Polyline key={selected} positions={route.line} pathOptions={{ color: option.color, weight: 5 }} />}
          {Object.entries(THURSDAY_PLACES).map(([id, p]) => <CircleMarker key={id} center={p.coords} radius={6} pathOptions={{ color: option.places.includes(id) ? option.color : "#68787c", fillColor: "white", fillOpacity: 1, weight: 3 }}>
            <Tooltip permanent direction={id === "charlevoix" || id === "traverse" ? "left" : "right"} className="trip-map-label">{id === "skybridge" ? "SkyBridge" : p.name}</Tooltip>
          </CircleMarker>)}
        </MapContainer>
      </div>
      <p className="trip-options-note">Dashed green: original coastal towns route. Solid line: selected alternative.
        Road geometry and estimates: <a href={route.sourceUrl} target="_blank" rel="noreferrer">OSRM / OpenStreetMap</a>, checked {SKYBRIDGE.checked}. Use navigation for current traffic and closures.</p>

      <div className="trip-option-detail" aria-live="polite">
        <h3>{option.name}</h3>
        <p><b>The drive:</b> {option.roads}</p>
        <p><b>The tradeoff:</b> {option.tradeoff}</p>
        <p><b>Admission:</b> {option.cost}</p>
        <h4>A possible Thursday</h4>
        <p className="trip-options-note">Eastern time throughout. Suggested timing with parking buffers, not reservations.</p>
        <ol className="trip-option-schedule">{option.schedule.map(([time, text]) => <li key={time}><b>{time}</b><span>{text}</span></li>)}</ol>
        <a className="action action--web" href={thursdayDirections(option)} target="_blank" rel="noreferrer">Open this route in Google Maps ↗</a>
      </div>

      <div className="trip-option-advice">
        <h3>My pick: SkyBridge + Petoskey, if the views are clear</h3>
        <p>It adds very little driving compared with SkyBridge → I-75, while preserving lunch by the bay
          and Mom&rsquo;s stone hunt. Charlevoix and the Mushroom Houses are the real sacrifice.
          Both versions keep the two Mackinaw City nights and Friday&rsquo;s island day.</p>
        <p><b>SkyBridge hours:</b> {SKYBRIDGE.hours}. The chairlift is included with bridge admission.
          Allow 1½–2 hours for the visit. Check the price for all three travelers in the ticket checkout.</p>
        <p><b>If it rains:</b> the bridge can operate in precipitation when visibility is adequate,
          but high winds or nearby thunder/lightning can close it. Boyne lists a 35 mph operating wind limit
          and a 15-mile thunder/lightning radius. Check with the resort before driving inland;
          if closed or fogged in, keep the coastal towns route and use indoor lunch and shops between showers.</p>
        <p className="trip-options-note">Source: <a href={SKYBRIDGE.url} target="_blank" rel="noreferrer">Boyne Mountain hours, access and weather policy</a> · checked {SKYBRIDGE.checked} · <a href={`tel:${SKYBRIDGE.phone}`}>{SKYBRIDGE.phone}</a> · <a href={SKYBRIDGE.tickets} target="_blank" rel="noreferrer">Check tickets</a></p>
      </div>
    </section>
  );
}
