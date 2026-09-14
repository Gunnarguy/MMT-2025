import { FUEL_SPECS, FUEL_STOPS, FUEL_PLAN_NOTE } from "../../data/fuel";
import { directionsHref } from "../../lib/format";

/**
 * Fuel & Mileage Planner Component.
 *
 * Planning example using a Mazda CX-50's 15.9-gallon tank and 26 MPG fuel economy,
 * detailing the strategic gas stations across the road trip.
 */
export default function FuelPlanner({ dayId = null }) {
  const stopsToShow = dayId
    ? FUEL_STOPS.filter((s) => s.dayId === dayId)
    : FUEL_STOPS;

  if (stopsToShow.length === 0) return null;

  return (
    <div className="fuel-planner-card">
      <div className="dune-card-head">
        <div className="eyebrow" style={{ color: "#2563eb" }}>Fuel & Range Strategy</div>
        <h3>
          {dayId
            ? `Gas & Refueling Plan — ${stopsToShow.length === 1 ? "Suggested Stop" : "Suggested Stops"}`
            : `Trip Fuel & Mileage Plan (${FUEL_SPECS.totalTripMiles.toLocaleString()} Miles · ${stopsToShow.length} Fuel Stops)`}
        </h3>
        <p className="muted" style={{ fontSize: "var(--t-xs)", margin: 0 }}>
          Planning assumption: <b>{FUEL_SPECS.vehicle}</b> (<b>{FUEL_SPECS.tankCapacityGallons} gal</b> tank · <b>{FUEL_SPECS.epaCombinedMpg} MPG</b> combined · <b>{FUEL_SPECS.maxRangeMiles} mi</b> range).
        </p>
        <p className="muted">{FUEL_PLAN_NOTE} <a href="https://www.budget.com/en/offers/us-offers/fuel-plans" target="_blank" rel="noreferrer">Budget fuel options ↗</a></p>
      </div>

      <div className="fuel-metrics-grid">
        <div className="fuel-metric-box">
          <span className="fuel-metric-label">Tank Capacity</span>
          <b className="fuel-metric-val">{FUEL_SPECS.tankCapacityGallons} Gallons</b>
          <span className="fuel-metric-sub">60.2 Liters</span>
        </div>
        <div className="fuel-metric-box">
          <span className="fuel-metric-label">Theoretical Range</span>
          <b className="fuel-metric-val">{FUEL_SPECS.maxRangeMiles} Miles</b>
          <span className="fuel-metric-sub">Planning target: ~{FUEL_SPECS.safeRefuelRangeMiles} mi</span>
        </div>
        <div className="fuel-metric-box">
          <span className="fuel-metric-label">Total Gas Needed</span>
          <b className="fuel-metric-val">≈{FUEL_SPECS.estimatedGallonsTotal} Gallons</b>
          <span className="fuel-metric-sub">Across 1,430 total miles</span>
        </div>
        <div className="fuel-metric-box">
          <span className="fuel-metric-label">Border Gas Strategy</span>
          <b className="fuel-metric-val" style={{ color: "#0d9488" }}>Compare pump prices</b>
          <span className="fuel-metric-sub">No live price or guaranteed saving</span>
        </div>
      </div>

      <div className="fuel-stops-list">
        {stopsToShow.map((stop) => (
          <div className="fuel-stop-card" key={stop.id}>
            <div className="fuel-stop-head">
              <div className="fuel-stop-title">
                <span className="fuel-pump-icon" aria-hidden="true">⛽</span>
                <b>{stop.stopName}</b>
              </div>
              <span className="fuel-stop-badge">{stop.action}</span>
            </div>

            <div className="fuel-stop-meta">
              <span><b>Station:</b> {stop.brand}</span>
              <span><b>Address:</b> {stop.address}</span>
              <span><b>When:</b> {stop.date} · {stop.routeContext}</span>
            </div>

            <p className="fuel-stop-why">{stop.why}</p>
            <a href={stop.sourceUrl} target="_blank" rel="noreferrer">Location source · checked {stop.checkedOn}</a>

            {stop.address && (
              <a
                href={directionsHref(null, stop.address)}
                target="_blank"
                rel="noreferrer"
                className="fuel-directions-link"
              >
                Get Directions to Station ↗
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
