import { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet';
import { momsRoute } from '../data/momsRoute';
import { getActivityById, categories } from '../data/catalog';
import { geocodePlace } from '../utils/geocode';
import { formatHours } from '../utils/formatters';

function FitBounds({ bounds }) {
  const map = useMap();
  useEffect(() => {
    if (!bounds || bounds.length < 1) return;
    map.fitBounds(bounds, { padding: [24, 24] });
  }, [map, bounds]);
  return null;
}

function StopCard({ stop, activities, lodging, isActive, onHover, onLeave }) {
  return (
    <article
      className={`stop-card ${isActive ? 'active' : ''}`}
      onMouseEnter={() => onHover(stop.id)}
      onMouseLeave={() => onLeave()}
    >
      <header className="stop-card-header">
        <div>
          <p className="stop-day">{stop.dayRange}</p>
          <h3>{stop.title}</h3>
        </div>
        <div className="stop-meta">
          <span>{stop.nights}</span>
          <span>{stop.driveTime}</span>
        </div>
      </header>

      <p className="stop-note">{stop.notes}</p>
      <blockquote className="stop-quote">"{stop.momQuote}"</blockquote>

      {stop.highlights?.length > 0 && (
        <div className="stop-highlights">
          {stop.highlights.map((item) => (
            <span key={item} className="pill">
              {item}
            </span>
          ))}
        </div>
      )}

      {lodging && (
        <div className="stop-lodging">
          <h4>Stay</h4>
          <div className="lodging-card">
            <strong>{lodging.name}</strong>
            <span>{lodging.location}</span>
            {lodging.tip && <small>Tip: {lodging.tip}</small>}
          </div>
        </div>
      )}

      <div className="stop-activities">
        <h4>Must-do ideas</h4>
        <div className="stop-activity-grid">
          {activities.map((activity) => (
            <div key={activity.id} className="stop-activity">
              <div className="stop-activity-title">
                <span className="activity-icon">{categories[activity.category]?.icon ?? '*'}</span>
                <div>
                  <strong>{activity.name}</strong>
                  <span>{activity.location}</span>
                </div>
              </div>
              <div className="stop-activity-meta">
                {activity.duration && <span>{formatHours(activity.duration)}</span>}
                {activity.price && <span>{activity.price}</span>}
                {activity.waitTime && <span>{activity.waitTime}</span>}
              </div>
              {activity.mustTry && <p className="activity-callout">Must try: {activity.mustTry}</p>}
              {activity.tip && <p className="activity-tip">Tip: {activity.tip}</p>}
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function MomsRouteView({ onCopyToBuilder }) {
  const [hoveredStop, setHoveredStop] = useState(null);
  const [stopCoords, setStopCoords] = useState({});

  const activityLookup = useMemo(() => {
    const result = {};
    momsRoute.stops.forEach((stop) => {
      result[stop.id] = (stop.activities || [])
        .map((id) => getActivityById(id))
        .filter(Boolean);
    });
    return result;
  }, []);

  const lodgingLookup = useMemo(() => {
    const result = {};
    momsRoute.stops.forEach((stop) => {
      result[stop.id] = stop.lodging ? getActivityById(stop.lodging) : null;
    });
    return result;
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    async function loadStopCoords() {
      const updates = {};
      for (const stop of momsRoute.stops) {
        if (stopCoords[stop.id]) continue;
        try {
          const coords = await geocodePlace(stop.location, { signal: controller.signal });
          if (coords) updates[stop.id] = coords;
        } catch (e) {
          if (e?.name === 'AbortError') return;
        }
      }
      if (cancelled) return;
      if (Object.keys(updates).length) {
        setStopCoords((prev) => ({ ...prev, ...updates }));
      }
    }

    loadStopCoords();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [stopCoords]);

  const routeLine = momsRoute.stops
    .map((stop) => stopCoords[stop.id])
    .filter(Boolean);

  const mapBounds = routeLine.length ? routeLine : null;

  return (
    <section className="moms-route">
      <div className="route-hero">
        <div className="hero-content">
          <p className="hero-eyebrow">Suggested route built from Mom&#39;s original notes</p>
          <h2>{momsRoute.title}</h2>
          <p className="hero-subtitle">{momsRoute.subtitle}</p>
          <div className="hero-theme">{momsRoute.themeLine}</div>
          <div className="hero-actions">
            <button type="button" className="btn-primary" onClick={onCopyToBuilder}>
              Copy to Builder
            </button>
            <span className="hero-window">{momsRoute.travelWindow}</span>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat-card">
            <span>Duration</span>
            <strong>{momsRoute.overview.duration}</strong>
          </div>
          <div className="stat-card">
            <span>Total miles</span>
            <strong>{momsRoute.overview.totalMiles}</strong>
          </div>
          <div className="stat-card">
            <span>Drive time</span>
            <strong>{momsRoute.overview.driveTime}</strong>
          </div>
          <div className="stat-card">
            <span>Fly in/out</span>
            <strong>{momsRoute.overview.flyIn}</strong>
            <small>{momsRoute.overview.flyOut}</small>
          </div>
        </div>
      </div>

      <div className="route-warnings">
        {momsRoute.warnings.map((warning) => (
          <div key={warning.title} className="warning-card">
            <strong>{warning.title}</strong>
            <p>{warning.detail}</p>
          </div>
        ))}
      </div>

      <div className="route-ribbon">
        {momsRoute.ribbonStops.map((stop) => (
          <div
            key={stop.id}
            className={`ribbon-stop ${hoveredStop === stop.id ? 'active' : ''}`}
            onMouseEnter={() => setHoveredStop(stop.id)}
            onMouseLeave={() => setHoveredStop(null)}
          >
            <span className="ribbon-emoji">{stop.emoji}</span>
            <div>
              <strong>{stop.name}</strong>
              <span>{stop.nights}</span>
              <small>{stop.drive}</small>
            </div>
          </div>
        ))}
      </div>

      <div className="featured-moments">
        {momsRoute.featuredMoments.map((moment) => (
          <div key={moment.title} className="featured-card">
            <h3>{moment.title}</h3>
            <p>{moment.detail}</p>
            <span className="featured-stop">{momsRoute.ribbonStops.find((stop) => stop.id === moment.stopId)?.name}</span>
          </div>
        ))}
      </div>

      <div className="stop-cards">
        {momsRoute.stops.map((stop) => (
          <StopCard
            key={stop.id}
            stop={stop}
            activities={activityLookup[stop.id] || []}
            lodging={lodgingLookup[stop.id]}
            isActive={hoveredStop === stop.id}
            onHover={setHoveredStop}
            onLeave={() => setHoveredStop(null)}
          />
        ))}
      </div>

      <div className="route-map-section">
        <div className="map-copy">
          <h3>Route overview</h3>
          <p>Pin the key bases, then zoom in as you decide on day-by-day stops.</p>
        </div>
        <div className="route-map">
          <MapContainer center={[43.5, -71.5]} zoom={6} style={{ height: '100%', width: '100%' }}>
            {mapBounds && <FitBounds bounds={mapBounds} />}
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap'
            />
            {routeLine.length > 1 && (
              <Polyline positions={routeLine} pathOptions={{ color: '#e86f3a', weight: 4, opacity: 0.7 }} />
            )}
            {momsRoute.stops.map((stop) =>
              stopCoords[stop.id] ? (
                <Marker key={stop.id} position={stopCoords[stop.id]}>
                  <Popup>
                    <strong>{stop.title}</strong>
                    <br />{stop.dayRange}
                  </Popup>
                </Marker>
              ) : null
            )}
          </MapContainer>
        </div>
      </div>

      <div className="route-grid">
        <section className="route-panel">
          <h3>Foliage radar</h3>
          <div className="chip-grid">
            {momsRoute.foliage.peakWindows.map((item) => (
              <span key={item} className="pill">{item}</span>
            ))}
          </div>
          <h4>Best drives</h4>
          <div className="chip-grid">
            {momsRoute.foliage.bestDrives.map((item) => (
              <span key={item} className="pill muted">{item}</span>
            ))}
          </div>
        </section>

        <section className="route-panel">
          <h3>Budget bands</h3>
          <div className="budget-grid">
            {momsRoute.budget.tiers.map((tier) => (
              <div key={tier.name} className="budget-card">
                <strong>{tier.name}</strong>
                <span>{tier.range}</span>
                <p>{tier.detail}</p>
              </div>
            ))}
          </div>
          <ul className="tip-list">
            {momsRoute.budget.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </section>

        <section className="route-panel">
          <h3>Packing playbook</h3>
          <p className="panel-note">{momsRoute.packing.weatherNote}</p>
          <div className="packing-grid">
            <div>
              <h4>Essentials</h4>
              <ul>
                {momsRoute.packing.essentials.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Fun extras</h4>
              <ul>
                {momsRoute.packing.extras.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

      <section className="route-panel alt-panel">
        <h3>Alternative endings</h3>
        <div className="alt-grid">
          {momsRoute.alternatives.map((alt) => (
            <div key={alt.title} className="alt-card">
              <strong>{alt.title}</strong>
              <p>{alt.detail}</p>
              <div className="alt-meta">
                {alt.addsDays ? <span>+{alt.addsDays} day(s)</span> : null}
                {alt.flyOut ? <span>{alt.flyOut}</span> : null}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="route-panel wildcard-panel">
        <h3>Wildcards Mom mentioned</h3>
        <ul>
          {momsRoute.wildcards.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <div className="route-cta">
        <button type="button" className="btn-primary" onClick={onCopyToBuilder}>
          Copy Mom&#39;s Route to Builder
        </button>
        <p>Make edits, swap stops, or build a brand-new plan from scratch.</p>
      </div>
    </section>
  );
}
