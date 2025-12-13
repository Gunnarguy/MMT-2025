import { useMemo, useState } from 'react'
import { MapContainer, TileLayer, Polyline, CircleMarker, Popup } from 'react-leaflet'
import { momsRoute } from '../data/momsRoute'
import './MomsRouteTabRefresh.css'
import CreationLaunchpad from './CreationLaunchpad'

/**
 * Immersive Mom's Route tab with hero, ribbon, cards, and map.
 */
export default function MomsRouteTab({ onCopyToBuilder, onCopySuccess, onStartBlankCanvas }) {
                      const [expandedStop, setExpandedStop] = useState(momsRoute.stops[0]?.id ?? null)
                      const [hoveredStop, setHoveredStop] = useState(null)

                      const heroStats = useMemo(() => ([
                        { label: 'Total Miles', value: `${momsRoute.overview.totalDrivingMiles}`, badge: '📏' },
                        { label: 'Drive Hours', value: `${momsRoute.overview.totalDrivingHours}`, badge: '⏱️' },
                        { label: 'Trip Length', value: momsRoute.overview.estimatedDays, badge: '🗓️' },
                        { label: 'Major Stops', value: momsRoute.stops.length, badge: '📍' },
                        { label: 'States & Provinces', value: momsRoute.overview.states.length, badge: '🧭' },
                      ]), [])

                      const ribbonStops = useMemo(() => momsRoute.stops.map((stop, idx) => ({
                        ...stop,
                        order: idx + 1,
                        drive: stop.driveFromPrevious || null,
                      })), [])

                      const featuredMoments = useMemo(() => {
                        const picks = [0, 2, 3].map(index => momsRoute.stops[index]).filter(Boolean)
                        return picks.map((stop, idx) => ({
                          id: `feature-${stop.id}`,
                          emoji: ['🦞', '🏡', '🛂'][idx] || '✨',
                          title: idx === 0 ? 'First Lobster Night in Boston' : idx === 1 ? 'Vermont Retreat at Sally’s' : 'Passport Moment in Montreal',
                          description: stop.momQuote,
                          stat: stop.mustDo?.[0]?.name || stop.role,
                          accent: ['sunset', 'forest', 'night'][idx] || 'sunset',
                          anchorStopId: stop.id,
                        }))
                      }, [])

                      const foliagePeaks = useMemo(() => Object.entries(momsRoute.foliage.peakDates), [])

                      const handleCopyRoute = () => {
                        if (typeof onCopyToBuilder === 'function') {
                          onCopyToBuilder()
                          if (typeof onCopySuccess === 'function') {
                            onCopySuccess()
                          }
                        }
                      }

                      const renderFactChips = (stop) => {
                        const chips = [
                          stop.facts?.population && { label: 'Population', value: stop.facts.population },
                          stop.facts?.walkScore && { label: 'Walk Score', value: `${stop.facts.walkScore}/100` },
                          stop.facts?.averageHighSept && { label: 'Sept High', value: stop.facts.averageHighSept },
                          stop.facts?.foliageStatus && { label: 'Foliage', value: stop.facts.foliageStatus, icon: '🍁' },
                        ].filter(Boolean)
                        return chips.map((chip) => (
                          <span key={`${stop.id}-${chip.label}`} className="fact-chip">
                            {chip.icon && <span className="chip-icon">{chip.icon}</span>}
                            <strong>{chip.value}</strong>
                            <small>{chip.label}</small>
                          </span>
                        ))
                      }

                      const renderActivityList = (items, className) => (
                        <div className={className}>
                          {items.map((activity, idx) => (
                            <div key={`${activity.name}-${idx}`} className="activity-pill">
                              <div>
                                <strong>{activity.name}</strong>
                                <p>{activity.description}</p>
                              </div>
                              <span>{activity.duration}</span>
                            </div>
                          ))}
                        </div>
                      )

                      return (
                        <div className="mom-route-refresh">
                          <section className="hero-panel">
                            <div className="hero-copy">
                              <p className="hero-eyebrow">Girls Trip • {momsRoute.overview.bestSeason}</p>
                              <h2>{momsRoute.title}</h2>
                              <p className="hero-theme">{momsRoute.overview.theme}</p>
                              <div className="hero-actions">
                                <button className="cta-btn" onClick={handleCopyRoute}>
                                  🧩 Copy to Build & Customize
                                </button>
                                <span className="cta-note">Instantly seeds the builder with Mom’s picks</span>
                              </div>
                            </div>
                            <div className="hero-stats-grid">
                              {heroStats.map((stat) => (
                                <div key={stat.label} className="hero-stat-card">
                                  <span className="stat-badge">{stat.badge}</span>
                                  <strong>{stat.value}</strong>
                                  <small>{stat.label}</small>
                                </div>
                              ))}
                            </div>
                            <div className="hero-alert">
                              <div className="alert-badge">🚦 Leaf-Peeping Surge</div>
                              <div>
                                <strong>{momsRoute.overview.trafficWarning.severity} traffic risk</strong>
                                <p>{momsRoute.overview.trafficWarning.reason}</p>
                                <p className="alert-tip">💡 {momsRoute.overview.trafficWarning.tip}</p>
                              </div>
                            </div>
                          </section>

                          <CreationLaunchpad
                            onUseBlueprint={handleCopyRoute}
                            onStartFresh={onStartBlankCanvas}
                          />

                          <section className="journey-ribbon" aria-label="Trip timeline">
                            {ribbonStops.map((stop) => (
                              <button
                                key={stop.id}
                                className={`ribbon-stop ${hoveredStop === stop.id ? 'active' : ''}`}
                                onMouseEnter={() => setHoveredStop(stop.id)}
                                onMouseLeave={() => setHoveredStop(null)}
                                onClick={() => setExpandedStop(stop.id)}
                              >
                                <span className="stop-order">{stop.order}</span>
                                <div className="stop-meta">
                                  <strong>{stop.name}</strong>
                                  <span>{stop.nights} night(s)</span>
                                </div>
                                {stop.drive && (
                                  <span className="stop-drive">🚗 {stop.drive.distance}</span>
                                )}
                              </button>
                            ))}
                          </section>

                          <section className="featured-moments">
                            {featuredMoments.map((moment) => (
                              <article
                                key={moment.id}
                                className={`moment-card ${moment.accent}`}
                                onMouseEnter={() => setHoveredStop(moment.anchorStopId)}
                                onMouseLeave={() => setHoveredStop(null)}
                                onClick={() => setExpandedStop(moment.anchorStopId)}
                              >
                                <span className="moment-emoji">{moment.emoji}</span>
                                <h3>{moment.title}</h3>
                                <p>{moment.description}</p>
                                <span className="moment-stat">{moment.stat}</span>
                              </article>
                            ))}
                          </section>

                          <section className="map-section">
                            <div className="section-header">
                              <div>
                                <p className="section-eyebrow">🗺️ Route Preview</p>
                                <h3>{momsRoute.overview.flyInto} → {momsRoute.stops[momsRoute.stops.length - 1].name}</h3>
                              </div>
                              <span className="section-note">Tap markers for Mom’s notes + drive times</span>
                            </div>
                            <div className="trip-map">
                              <MapContainer
                                center={[43.6, -72.5]}
                                zoom={6}
                                scrollWheelZoom
                                style={{ height: '420px', width: '100%', borderRadius: '18px' }}
                              >
                                <TileLayer
                                  attribution='&copy; OpenStreetMap contributors'
                                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Polyline
                                  positions={momsRoute.stops.map((stop) => stop.coordinates)}
                                  pathOptions={{ color: '#ff8a00', weight: 5, opacity: 0.85 }}
                                />
                                {momsRoute.stops.map((stop, idx) => (
                                  <CircleMarker
                                    key={stop.id}
                                    center={stop.coordinates}
                                    radius={hoveredStop === stop.id ? 14 : 10}
                                    pathOptions={{
                                      color: hoveredStop === stop.id ? '#1abc9c' : '#ffffff',
                                      fillColor: stop.country === 'Canada' ? '#c0392b' : '#1abc9c',
                                      fillOpacity: hoveredStop === stop.id ? 1 : 0.85,
                                      weight: 3,
                                    }}
                                  >
                                    <Popup>
                                      <div className="map-popup">
                                        <strong>{idx + 1}. {stop.name}, {stop.state}</strong>
                                        <p className="popup-quote">“{stop.momQuote}”</p>
                                        {stop.driveFromPrevious && (
                                          <p className="popup-drive">🚗 {stop.driveFromPrevious.distance} • {stop.driveFromPrevious.duration}</p>
                                        )}
                                      </div>
                                    </Popup>
                                  </CircleMarker>
                                ))}
                              </MapContainer>
                            </div>
                          </section>

                          <section className="stop-cards">
                            <div className="section-header">
                              <div>
                                <p className="section-eyebrow">📍 Deep Dive</p>
                                <h3>Every stop, every fun fact</h3>
                              </div>
                              <button className="ghost-btn" onClick={handleCopyRoute}>Copy This Route</button>
                            </div>
                            {momsRoute.stops.map((stop, idx) => (
                              <article
                                key={stop.id}
                                className={`stop-card-refresh ${expandedStop === stop.id ? 'expanded' : ''} ${hoveredStop === stop.id ? 'highlight' : ''}`}
                                onMouseEnter={() => setHoveredStop(stop.id)}
                                onMouseLeave={() => setHoveredStop(null)}
                              >
                                <header className="stop-card-header" onClick={() => setExpandedStop(expandedStop === stop.id ? null : stop.id)}>
                                  <div className="stop-card-title">
                                    <span className="stop-index">{idx + 1}</span>
                                    <div>
                                      <h4>{stop.name}, {stop.state}</h4>
                                      <p>{stop.role}</p>
                                    </div>
                                  </div>
                                  <div className="stop-card-badges">
                                    {stop.driveFromPrevious && <span className="badge">🚗 {stop.driveFromPrevious.distance}</span>}
                                    <span className="badge">🌙 {stop.nights} nights</span>
                                  </div>
                                  <span className="expand-toggle">{expandedStop === stop.id ? 'Hide details' : 'See details'}</span>
                                </header>

                                {expandedStop === stop.id && (
                                  <div className="stop-card-body">
                                    <div className="stop-grid">
                                      <div>
                                        <p className="mom-quote">“{stop.momQuote}”</p>
                                        <div className="fact-chip-row">{renderFactChips(stop)}</div>
                                      </div>
                                      {stop.driveFromPrevious && (
                                        <div className="drive-callout">
                                          <strong>Drive from {stop.driveFromPrevious.from}</strong>
                                          <p>{stop.driveFromPrevious.route}</p>
                                          <span>{stop.driveFromPrevious.distance} • {stop.driveFromPrevious.duration}</span>
                                        </div>
                                      )}
                                    </div>

                                    {stop.mustDo && stop.mustDo.length > 0 && (
                                      <div>
                                        <h5>✨ Must-Do Moments</h5>
                                        {renderActivityList(stop.mustDo, 'activity-grid')}
                                      </div>
                                    )}

                                    {stop.lobsterSpots && stop.lobsterSpots.length > 0 && (
                                      <div>
                                        <h5>🦞 Lobster Stops</h5>
                                        <div className="lobster-grid">
                                          {stop.lobsterSpots.map((spot) => (
                                            <div key={`${stop.id}-${spot.name}`} className="lobster-card">
                                              {spot.mustTry && <span className="must-try">⭐ Must try</span>}
                                              <strong>{spot.name}</strong>
                                              <span>{spot.style}</span>
                                              <small>{spot.price} • ⏳ {spot.wait}</small>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {stop.foodScene && stop.foodScene.length > 0 && (
                                      <div>
                                        <h5>🍽️ Local Food Scene</h5>
                                        <div className="food-grid">
                                          {stop.foodScene.map((spot) => (
                                            <div key={`${stop.id}-${spot.name}`} className="food-card">
                                              <strong>{spot.name}</strong>
                                              <span>{spot.type}</span>
                                              <small>{spot.note}</small>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {stop.borderInfo && (
                                      <div className="border-card">
                                        <h5>🛂 Border Prep</h5>
                                        <ul>
                                          <li><strong>Documents:</strong> {stop.borderInfo.documents}</li>
                                          <li><strong>Typical wait:</strong> {stop.borderInfo.crossingTime}</li>
                                          <li><strong>Tip:</strong> {stop.borderInfo.tip}</li>
                                          {stop.borderInfo.dutyFree && (
                                            <li><strong>Duty-free:</strong> {stop.borderInfo.dutyFree}</li>
                                          )}
                                        </ul>
                                      </div>
                                    )}

                                    <div className="practical-row">
                                      {stop.parking && <span>🅿️ {stop.parking}</span>}
                                      {stop.transportation && <span>🚇 {stop.transportation}</span>}
                                    </div>
                                  </div>
                                )}
                              </article>
                            ))}
                          </section>

                          <section className="foliage-panel">
                            <div className="section-header">
                              <div>
                                <p className="section-eyebrow">🍁 Foliage Radar</p>
                                <h3>Peak windows + dream drives</h3>
                              </div>
                              <span className="section-note">Late September outlook</span>
                            </div>
                            <div className="foliage-grid">
                              {foliagePeaks.map(([region, window]) => (
                                <div key={region} className="foliage-chip">
                                  <strong>{region}</strong>
                                  <span>{window}</span>
                                </div>
                              ))}
                            </div>
                            <div className="drive-highlight">
                              {momsRoute.foliage.bestDrives.map((drive) => (
                                <div key={drive.name} className="drive-card">
                                  <strong>{drive.name}</strong>
                                  <span>{drive.length}</span>
                                  <p>{drive.description}</p>
                                </div>
                              ))}
                            </div>
                          </section>

                          <section className="budget-panel">
                            <div className="section-header">
                              <div>
                                <p className="section-eyebrow">💰 Budget Bands</p>
                                <h3>Per-person estimates for 7 days</h3>
                              </div>
                            </div>
                            <div className="budget-grid">
                              {Object.entries(momsRoute.budget.perPerson7Days).map(([tier, data]) => (
                                <div key={tier} className={`budget-card ${tier}`}>
                                  <p>{data.label}</p>
                                  <strong>${data.min} – ${data.max}</strong>
                                </div>
                              ))}
                            </div>
                            <ul className="budget-tips">
                              {momsRoute.budget.tips.map((tip, idx) => (
                                <li key={`tip-${idx}`}>{tip}</li>
                              ))}
                            </ul>
                          </section>

                          <section className="packing-panel">
                            <div className="section-header">
                              <div>
                                <p className="section-eyebrow">🎒 Packing Playbook</p>
                                <h3>{momsRoute.packing.weather}</h3>
                              </div>
                            </div>
                            <div className="packing-grid">
                              <div>
                                <h4>Must-haves</h4>
                                <ul>
                                  {momsRoute.packing.essentials.map((item) => <li key={item}>{item}</li>)}
                                </ul>
                              </div>
                              <div>
                                <h4>Nice-to-haves</h4>
                                <ul>
                                  {momsRoute.packing.optional.map((item) => <li key={item}>{item}</li>)}
                                </ul>
                              </div>
                            </div>
                          </section>

                          <section className="alternatives-panel">
                            <div className="section-header">
                              <div>
                                <p className="section-eyebrow">🔀 Alternate Routes</p>
                                <h3>Mom’s “if we feel spicy” ideas</h3>
                              </div>
                            </div>
                            <div className="alt-grid">
                              {['fingerLakes', 'southernNewEngland'].map((key) => {
                                const option = momsRoute.alternatives[key]
                                return (
                                  <div key={key} className="alt-card">
                                    <h4>{option.name}</h4>
                                    <span>+{option.addedDays} days • +{option.addedMiles} miles</span>
                                    <ul>
                                      {option.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                                    </ul>
                                    <small>Fly out: {option.flyOut}</small>
                                  </div>
                                )
                              })}
                            </div>
                            <div className="wild-ideas">
                              <h4>Wildcards she mentioned</h4>
                              <div className="wild-chips">
                                {momsRoute.alternatives.totallyDifferent.map((idea) => (
                                  <span key={idea}>{idea}</span>
                                ))}
                              </div>
                            </div>
                          </section>
                        </div>
                      )
                    }
