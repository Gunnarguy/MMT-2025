import { useState } from 'react'
import { MapContainer, TileLayer, Polyline, CircleMarker, Popup } from 'react-leaflet'
import { momsRoute } from '../data/momsRoute'
import './MomsRouteTab.css'

/**
 * MomsRouteTab - Comprehensive view of Mom's planned trip
 * Shows all metrics, facts, and details from MMTrip.txt
 */
export default function MomsRouteTab({ onCopyToBuilder }) {
  const [expandedStop, setExpandedStop] = useState(null)

  return (
    <div className="mom-view">
      
      {/* ═══ HERO SECTION ═══ */}
      <div className="mom-hero-comprehensive">
        <h2>{momsRoute.title}</h2>
        <p className="subtitle">{momsRoute.overview.theme}</p>
        
        {/* Trip Quick Stats */}
        <div className="trip-quick-stats">
          <div className="stat-box">
            <span className="stat-value">{momsRoute.overview.totalDrivingMiles}</span>
            <span className="stat-label">Total Miles</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">{momsRoute.overview.totalDrivingHours}</span>
            <span className="stat-label">Driving Hours</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">{momsRoute.overview.estimatedDays}</span>
            <span className="stat-label">Days</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">{momsRoute.stops.length}</span>
            <span className="stat-label">Major Stops</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">{momsRoute.overview.states.length}</span>
            <span className="stat-label">States/Provinces</span>
          </div>
        </div>
        
        {/* Traffic Warning */}
        <div className="traffic-warning">
          <span className="warning-icon">⚠️</span>
          <div className="warning-content">
            <strong>Traffic Alert: {momsRoute.overview.trafficWarning.severity}</strong>
            <p>{momsRoute.overview.trafficWarning.reason}</p>
            <p className="tip">💡 {momsRoute.overview.trafficWarning.tip}</p>
          </div>
        </div>
        
        <div className="hero-actions">
          <button className="cta-btn" onClick={onCopyToBuilder}>
            🧩 Copy to Build & Customize
          </button>
        </div>
      </div>
      
      {/* ═══ INTERACTIVE ROUTE MAP ═══ */}
      <section className="mom-map-section">
        <h3>🗺️ The Complete Route</h3>
        <p className="section-desc">
          {momsRoute.overview.flyInto} → {momsRoute.stops.map(s => s.name).join(' → ')}
        </p>
        
        <div className="trip-map">
          <MapContainer
            center={[43.5, -72.0]}
            zoom={6}
            style={{ height: '450px', width: '100%', borderRadius: '12px' }}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; OpenStreetMap'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Route line connecting all stops */}
            <Polyline
              positions={momsRoute.stops.map(s => s.coordinates)}
              pathOptions={{ color: '#D35400', weight: 4, opacity: 0.8 }}
            />
            
            {/* Stop markers */}
            {momsRoute.stops.map((stop, idx) => (
              <CircleMarker
                key={stop.id}
                center={stop.coordinates}
                radius={12}
                pathOptions={{
                  color: stop.country === 'Canada' ? '#e74c3c' : '#3498db',
                  fillColor: stop.country === 'Canada' ? '#e74c3c' : '#3498db',
                  fillOpacity: 0.9,
                  weight: 3,
                }}
              >
                <Popup>
                  <div className="map-popup">
                    <strong>{idx + 1}. {stop.name}, {stop.state}</strong>
                    <div className="popup-meta">
                      {stop.nights} night{stop.nights !== '1' ? 's' : ''} • {stop.role}
                    </div>
                    <p className="popup-quote">"{stop.momQuote}"</p>
                    {stop.driveFromPrevious && (
                      <div className="popup-drive">
                        🚗 {stop.driveFromPrevious.distance} • {stop.driveFromPrevious.duration} from {stop.driveFromPrevious.from}
                      </div>
                    )}
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
      </section>
      
      {/* ═══ STOP-BY-STOP DETAILED VIEW ═══ */}
      <section className="stops-detailed">
        <h3>📍 Stop-by-Stop Guide</h3>
        <p className="section-desc">Click any stop for full details</p>
        
        <div className="stops-timeline">
          {momsRoute.stops.map((stop, idx) => (
            <div 
              key={stop.id} 
              className={`stop-card ${stop.country === 'Canada' ? 'international' : ''} ${expandedStop === stop.id ? 'expanded' : ''}`}
            >
              
              {/* Stop Header - Always visible */}
              <div 
                className="stop-header-detailed"
                onClick={() => setExpandedStop(expandedStop === stop.id ? null : stop.id)}
              >
                <div className="stop-number">{idx + 1}</div>
                <div className="stop-title">
                  <h4>{stop.name}, {stop.state}</h4>
                  <span className="stop-role">{stop.role}</span>
                </div>
                <div className="stop-summary">
                  {stop.driveFromPrevious && (
                    <span className="drive-badge">🚗 {stop.driveFromPrevious.distance}</span>
                  )}
                  <span className="nights-badge">{stop.nights} night{stop.nights !== '1' ? 's' : ''}</span>
                </div>
                <span className={`expand-icon ${expandedStop === stop.id ? 'expanded' : ''}`}>
                  {expandedStop === stop.id ? '▼' : '▶'}
                </span>
              </div>
              
              {/* Expanded Content */}
              {expandedStop === stop.id && (
                <div className="stop-details-expanded">
                  
                  {/* Driving Info */}
                  {stop.driveFromPrevious && (
                    <div className="drive-info">
                      <span className="drive-icon">🚗</span>
                      <div className="drive-details">
                        <strong>{stop.driveFromPrevious.distance}</strong> • <strong>{stop.driveFromPrevious.duration}</strong> from {stop.driveFromPrevious.from}
                        <div className="route-name">via {stop.driveFromPrevious.route}</div>
                        {stop.driveFromPrevious.stops?.length > 0 && (
                          <div className="potential-stops">
                            Potential stops: {stop.driveFromPrevious.stops.join(', ')}
                          </div>
                        )}
                        {stop.driveFromPrevious.borderCrossing && (
                          <div className="border-notice">🛂 Border crossing required</div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Mom's Quote */}
                  <div className="mom-quote-box">
                    <span className="quote-icon">💬</span>
                    <p>"{stop.momQuote}"</p>
                    <span className="quote-source">— From MMTrip.txt</span>
                  </div>
                  
                  {/* Facts Grid */}
                  {stop.facts && (
                    <div className="facts-grid">
                      <h5>📊 Quick Facts</h5>
                      <div className="facts-list">
                        {stop.facts.population && <div className="fact"><span>Population</span><strong>{stop.facts.population}</strong></div>}
                        {stop.facts.walkScore && <div className="fact"><span>Walk Score</span><strong>{stop.facts.walkScore}/100</strong></div>}
                        {stop.facts.averageHighSept && <div className="fact"><span>Sept High</span><strong>{stop.facts.averageHighSept}</strong></div>}
                        {stop.facts.averageLowSept && <div className="fact"><span>Sept Low</span><strong>{stop.facts.averageLowSept}</strong></div>}
                        {stop.facts.foliageStatus && <div className="fact highlight"><span>🍁 Foliage</span><strong>{stop.facts.foliageStatus}</strong></div>}
                        {stop.facts.timezone && <div className="fact"><span>Timezone</span><strong>{stop.facts.timezone}</strong></div>}
                      </div>
                    </div>
                  )}
                  
                  {/* Border Info for Canada */}
                  {stop.borderInfo && (
                    <div className="border-info-box">
                      <h5>🛂 Border Crossing Info</h5>
                      <ul>
                        <li><strong>Documents:</strong> {stop.borderInfo.documents}</li>
                        <li><strong>Typical wait:</strong> {stop.borderInfo.crossingTime}</li>
                        <li><strong>Tip:</strong> {stop.borderInfo.tip}</li>
                        <li><strong>Duty-free:</strong> {stop.borderInfo.dutyFree}</li>
                      </ul>
                    </div>
                  )}
                  
                  {/* Must-Do Activities */}
                  {stop.mustDo && (
                    <div className="must-do-section">
                      <h5>✨ Must-Do Activities</h5>
                      <div className="activities-list-detailed">
                        {stop.mustDo.map((activity, actIdx) => (
                          <div key={actIdx} className={`activity-item-detailed ${activity.type}`}>
                            <div className="activity-name">{activity.name}</div>
                            <div className="activity-meta">
                              <span className="duration">⏱️ {activity.duration}</span>
                              <span className="type-badge">{activity.type}</span>
                            </div>
                            <div className="activity-desc">{activity.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Lobster Spots */}
                  {stop.lobsterSpots && (
                    <div className="lobster-section">
                      <h5>🦞 Lobster Roll Spots</h5>
                      <div className="lobster-spots">
                        {stop.lobsterSpots.map((spot, spotIdx) => (
                          <div key={spotIdx} className={`lobster-card ${spot.mustTry ? 'must-try' : ''}`}>
                            {spot.mustTry && <div className="must-try-badge">⭐ Must Try!</div>}
                            <div className="lobster-name">{spot.name}</div>
                            <div className="lobster-meta">
                              <span className="style">{spot.style}</span>
                              <span className="price">{spot.price}</span>
                              <span className="wait">⏳ {spot.wait}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Food Scene */}
                  {stop.foodScene && (
                    <div className="food-section">
                      <h5>🍽️ Local Food Scene</h5>
                      <div className="food-spots">
                        {stop.foodScene.map((spot, spotIdx) => (
                          <div key={spotIdx} className="food-card">
                            <div className="food-name">{spot.name}</div>
                            <div className="food-meta">
                              <span className="type">{spot.type}</span>
                              <span className="price">{spot.price}</span>
                            </div>
                            <div className="food-note">{spot.note}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* What to Expect (rural areas) */}
                  {stop.whatToExpect && (
                    <div className="expect-section">
                      <h5>🏕️ What to Expect</h5>
                      <ul>
                        {stop.whatToExpect.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    </div>
                  )}
                  
                  {/* End Trip Options */}
                  {stop.endTripOptions && (
                    <div className="end-trip-section">
                      <h5>✈️ Fly Home Options</h5>
                      <div className="airport-options">
                        {stop.endTripOptions.map((opt, i) => (
                          <div key={i} className="airport-card">
                            <strong>{opt.airport}</strong>
                            <span>{opt.distance} • {opt.driveTime}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Practical Info */}
                  <div className="practical-info">
                    {stop.parking && <div className="practical-item"><strong>🅿️ Parking:</strong> {stop.parking}</div>}
                    {stop.transportation && <div className="practical-item"><strong>🚇 Getting around:</strong> {stop.transportation}</div>}
                  </div>
                  
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      
      {/* ═══ FOLIAGE TRACKER ═══ */}
      <section className="foliage-section">
        <h3>🍁 Fall Foliage Tracker</h3>
        <p className="section-desc">Peak colors by region for late September</p>
        
        <div className="foliage-grid">
          {Object.entries(momsRoute.foliage.peakDates).map(([region, dates]) => (
            <div key={region} className="foliage-card">
              <div className="foliage-region">{region}</div>
              <div className="foliage-dates">{dates}</div>
            </div>
          ))}
        </div>
        
        <h4>🛣️ Best Foliage Drives</h4>
        <div className="drives-list">
          {momsRoute.foliage.bestDrives.map((drive, idx) => (
            <div key={idx} className="foliage-drive-card">
              <div className="drive-name">{drive.name}</div>
              <div className="drive-length">{drive.length}</div>
              <div className="drive-desc">{drive.description}</div>
            </div>
          ))}
        </div>
      </section>
      
      {/* ═══ BUDGET ESTIMATOR ═══ */}
      <section className="budget-section">
        <h3>💰 Budget Estimator</h3>
        <p className="section-desc">Estimated costs per person for 7 days</p>
        
        <div className="budget-tiers">
          {Object.entries(momsRoute.budget.perPerson7Days).map(([tier, data]) => (
            <div key={tier} className={`budget-tier ${tier}`}>
              <div className="tier-label">{data.label}</div>
              <div className="tier-range">${data.min} - ${data.max}</div>
            </div>
          ))}
        </div>
        
        <div className="budget-tips">
          <h4>💡 Money-Saving Tips</h4>
          <ul>
            {momsRoute.budget.tips.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </div>
      </section>
      
      {/* ═══ PACKING LIST ═══ */}
      <section className="packing-section">
        <h3>🎒 Packing Essentials</h3>
        <p className="section-desc">{momsRoute.packing.weather}</p>
        
        <div className="packing-columns">
          <div className="packing-column">
            <h4>✅ Must-Have</h4>
            <ul>
              {momsRoute.packing.essentials.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="packing-column">
            <h4>💭 Nice-to-Have</h4>
            <ul>
              {momsRoute.packing.optional.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      
      {/* ═══ ALTERNATIVE ROUTES ═══ */}
      <section className="alternatives-section">
        <h3>🔀 Alternative Ideas (from Mom)</h3>
        <p className="section-desc">Other options mentioned in the original plan</p>
        
        <div className="alt-cards">
          <div className="alt-card">
            <h4>{momsRoute.alternatives.fingerLakes.name}</h4>
            <div className="alt-meta">+{momsRoute.alternatives.fingerLakes.addedDays} days • +{momsRoute.alternatives.fingerLakes.addedMiles} miles</div>
            <ul>
              {momsRoute.alternatives.fingerLakes.highlights.map((h, i) => <li key={i}>{h}</li>)}
            </ul>
            <div className="alt-flyout">Fly out: {momsRoute.alternatives.fingerLakes.flyOut}</div>
          </div>
          
          <div className="alt-card">
            <h4>{momsRoute.alternatives.southernNewEngland.name}</h4>
            <div className="alt-meta">+{momsRoute.alternatives.southernNewEngland.addedDays} days • +{momsRoute.alternatives.southernNewEngland.addedMiles} miles</div>
            <ul>
              {momsRoute.alternatives.southernNewEngland.highlights.map((h, i) => <li key={i}>{h}</li>)}
            </ul>
            <div className="alt-flyout">Fly out: {momsRoute.alternatives.southernNewEngland.flyOut}</div>
          </div>
        </div>
        
        <div className="other-ideas">
          <h4>💭 Totally Different Trip Ideas</h4>
          <p className="mom-other-quote">"I'm open to anything." — Mom</p>
          <ul>
            {momsRoute.alternatives.totallyDifferent.map((idea, i) => <li key={i}>{idea}</li>)}
          </ul>
        </div>
      </section>
      
    </div>
  )
}
