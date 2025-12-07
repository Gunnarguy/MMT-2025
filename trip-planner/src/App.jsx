import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import './App.css'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Polyline, CircleMarker, Popup } from 'react-leaflet'
import { tripData } from './data'

// New modular components (DDG-style architecture)
import Sidebar from './components/Sidebar'
import TravelerSelector from './components/TravelerSelector'
import ItineraryCard from './components/ItineraryCard'
import { dayItinerary, mmtTeam, scheduleOptions, exploreCatalog, dataSources } from './data/planContent'

// ============================================
// 🚗 DRIVING DIRECTIONS SERVICE
// Uses OSRM (OpenStreetMap Routing Machine) - FREE, no API key needed
// ============================================

// Cache for route calculations to avoid repeated API calls
const routeCache = new Map()

/**
 * Fetches real driving route from OSRM API
 * Returns actual road-following polyline, distance, and duration
 */
async function fetchDrivingRoute(startCoords, endCoords) {
  const cacheKey = `${startCoords.join(',')}-${endCoords.join(',')}`
  
  // Check cache first
  if (routeCache.has(cacheKey)) {
    return routeCache.get(cacheKey)
  }
  
  try {
    // OSRM expects [lng, lat] not [lat, lng]
    const start = `${startCoords[1]},${startCoords[0]}`
    const end = `${endCoords[1]},${endCoords[0]}`
    
    const response = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${start};${end}?overview=full&geometries=geojson&steps=true`
    )
    
    if (!response.ok) throw new Error('Route fetch failed')
    
    const data = await response.json()
    
    if (data.code !== 'Ok' || !data.routes.length) {
      throw new Error('No route found')
    }
    
    const route = data.routes[0]
    const result = {
      // Convert GeoJSON coordinates back to [lat, lng] for Leaflet
      coordinates: route.geometry.coordinates.map(c => [c[1], c[0]]),
      distance: route.distance, // in meters
      duration: route.duration, // in seconds
      distanceMiles: (route.distance / 1609.344).toFixed(1),
      durationMinutes: Math.round(route.duration / 60),
      durationFormatted: formatDuration(route.duration),
      // Extract turn-by-turn directions
      steps: route.legs[0].steps.map(step => ({
        instruction: step.maneuver.type === 'depart' ? 'Start' :
                     step.maneuver.type === 'arrive' ? 'Arrive at destination' :
                     `${step.maneuver.modifier || ''} ${step.maneuver.type}`.trim(),
        name: step.name || 'unnamed road',
        distance: (step.distance / 1609.344).toFixed(1),
        duration: Math.round(step.duration / 60),
        maneuver: step.maneuver.type,
        modifier: step.maneuver.modifier,
      })),
    }
    
    // Cache the result
    routeCache.set(cacheKey, result)
    return result
    
  } catch (error) {
    console.error('Route calculation error:', error)
    // Fallback to straight-line estimate
    const straightDist = calculateDistance(startCoords, endCoords)
    return {
      coordinates: [startCoords, endCoords],
      distance: straightDist * 1609.344,
      duration: (straightDist / 45) * 3600, // Assume 45mph
      distanceMiles: straightDist.toFixed(1),
      durationMinutes: Math.round((straightDist / 45) * 60),
      durationFormatted: estimateDriveTime(straightDist),
      steps: [],
      isFallback: true,
    }
  }
}

/**
 * Fetches routes for an entire day's itinerary
 * Returns array of route segments with full details
 */
async function fetchDayRoutes(activities) {
  const coords = activities.filter(a => a.coordinates).map(a => ({
    coords: a.coordinates,
    name: a.name,
  }))
  
  if (coords.length < 2) return []
  
  const routes = []
  for (let i = 0; i < coords.length - 1; i++) {
    const route = await fetchDrivingRoute(coords[i].coords, coords[i + 1].coords)
    routes.push({
      from: coords[i].name,
      to: coords[i + 1].name,
      ...route,
    })
  }
  
  return routes
}

/**
 * Format seconds into human-readable duration
 */
function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.round((seconds % 3600) / 60)
  
  if (hours === 0) return `${minutes} min`
  if (minutes === 0) return `${hours} hr`
  return `${hours} hr ${minutes} min`
}

/**
 * Get turn direction emoji for navigation
 */
function getTurnEmoji(maneuver, modifier) {
  if (maneuver === 'depart') return '🚗'
  if (maneuver === 'arrive') return '🏁'
  if (maneuver === 'turn') {
    if (modifier?.includes('left')) return '⬅️'
    if (modifier?.includes('right')) return '➡️'
    if (modifier?.includes('uturn')) return '↩️'
  }
  if (maneuver === 'merge') return '🔀'
  if (maneuver === 'fork') return '🔱'
  if (maneuver === 'roundabout') return '🔄'
  if (maneuver === 'continue') return '⬆️'
  return '📍'
}

/**
 * Custom hook for fetching and managing routes
 */
function useRoutes(activities, dayId) {
  const [routes, setRoutes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [totalStats, setTotalStats] = useState({ miles: 0, time: 0, formatted: '' })
  
  useEffect(() => {
    if (!activities || activities.length < 2) {
      setRoutes([])
      setTotalStats({ miles: 0, time: 0, formatted: '' })
      return
    }
    
    const fetchRoutes = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const routeData = await fetchDayRoutes(activities)
        setRoutes(routeData)
        
        // Calculate totals
        const totalMiles = routeData.reduce((sum, r) => sum + parseFloat(r.distanceMiles), 0)
        const totalSeconds = routeData.reduce((sum, r) => sum + r.duration, 0)
        
        setTotalStats({
          miles: totalMiles.toFixed(1),
          time: Math.round(totalSeconds / 60),
          formatted: formatDuration(totalSeconds),
        })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchRoutes()
  }, [activities, dayId])
  
  return { routes, loading, error, totalStats }
}

// Route styling
const coreLineOptions = { color: '#d35400', weight: 4, opacity: 0.9 }
const altLineOptions = { color: '#1abc9c', weight: 3, dashArray: '8 6', opacity: 0.7 }

// Marker styling based on category
const getMarkerOptions = (category) => {
  switch (category) {
    case 'core':
      return { color: '#d35400', fillColor: '#d35400' }
    case 'alt':
      return { color: '#1abc9c', fillColor: '#1abc9c' }
    default:
      return { color: '#2c3e50', fillColor: '#2c3e50' }
  }
}

// Helper: Calculate distance between two coordinates (Haversine formula)
function calculateDistance(coord1, coord2) {
  const R = 3959 // Earth's radius in miles
  const dLat = (coord2[0] - coord1[0]) * Math.PI / 180
  const dLon = (coord2[1] - coord1[1]) * Math.PI / 180
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(coord1[0] * Math.PI / 180) * Math.cos(coord2[0] * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

// Helper: Estimate drive time (rough: 45 mph average with stops)
function estimateDriveTime(miles) {
  const hours = miles / 40 // Conservative estimate with scenic stops
  if (hours < 1) return `${Math.round(hours * 60)} min`
  return `${hours.toFixed(1)} hrs`
}

// Activity type icons and colors
const activityConfig = {
  lobster: { icon: '🦞', color: '#e74c3c', label: 'Lobster Spot' },
  town: { icon: '⚓', color: '#1abc9c', label: 'Harbor Town' },
  foliage: { icon: '🍁', color: '#e67e22', label: 'Foliage Spot' },
  drive: { icon: '🚗', color: '#9b59b6', label: 'Scenic Drive' },
  landmark: { icon: '📸', color: '#3498db', label: 'Landmark' },
}

// ============================================
// 🗺️ DRIVING DIRECTIONS COMPONENT
// Shows turn-by-turn directions between activities
// ============================================
function DrivingDirections({ routes, loading, error }) {
  const [expandedRoute, setExpandedRoute] = useState(null)
  
  if (loading) {
    return (
      <div className="directions-loading">
        <div className="loading-spinner">🚗</div>
        <p>Calculating best routes...</p>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="directions-error">
        <p>⚠️ Couldn't load routes: {error}</p>
      </div>
    )
  }
  
  if (!routes || routes.length === 0) {
    return null
  }
  
  // Calculate total trip stats
  const totalMiles = routes.reduce((sum, r) => sum + parseFloat(r.distanceMiles), 0)
  const totalMinutes = routes.reduce((sum, r) => sum + r.durationMinutes, 0)
  
  return (
    <div className="driving-directions">
      <div className="directions-header">
        <h4>🧭 Turn-by-Turn Directions</h4>
        <div className="trip-totals">
          <span className="total-distance">📏 {totalMiles.toFixed(1)} mi total</span>
          <span className="total-time">⏱️ {formatDuration(totalMinutes * 60)} driving</span>
        </div>
      </div>
      
      <div className="route-segments">
        {routes.map((route, idx) => (
          <div key={idx} className="route-segment">
            <div 
              className="segment-header"
              onClick={() => setExpandedRoute(expandedRoute === idx ? null : idx)}
            >
              <div className="segment-info">
                <span className="segment-number">{idx + 1}</span>
                <div className="segment-endpoints">
                  <strong>{route.from}</strong>
                  <span className="arrow">→</span>
                  <strong>{route.to}</strong>
                </div>
              </div>
              <div className="segment-stats">
                <span className="distance">{route.distanceMiles} mi</span>
                <span className="duration">{route.durationFormatted}</span>
                <span className={`expand-icon ${expandedRoute === idx ? 'expanded' : ''}`}>
                  {expandedRoute === idx ? '▼' : '▶'}
                </span>
              </div>
            </div>
            
            {expandedRoute === idx && route.steps && route.steps.length > 0 && (
              <div className="segment-steps">
                {route.steps.map((step, stepIdx) => (
                  <div key={stepIdx} className="direction-step">
                    <span className="step-icon">{getTurnEmoji(step.maneuver, step.modifier)}</span>
                    <div className="step-details">
                      <span className="step-instruction">
                        {step.instruction.charAt(0).toUpperCase() + step.instruction.slice(1)}
                        {step.name !== 'unnamed road' && ` onto ${step.name}`}
                      </span>
                      <span className="step-meta">
                        {step.distance} mi • {step.duration} min
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {route.isFallback && (
              <div className="fallback-notice">
                ℹ️ Estimated (straight-line) - actual roads may vary
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================
// 🗺️ INTERACTIVE ROUTE MAP COMPONENT  
// Shows real driving routes on map with popups
// ============================================
function RouteMapLayer({ routes, activities }) {
  // Generate distinct colors for each route segment
  const routeColors = ['#e74c3c', '#3498db', '#2ecc71', '#9b59b6', '#f39c12', '#1abc9c', '#e67e22', '#34495e']
  
  return (
    <>
      {/* Draw actual route polylines */}
      {routes.map((route, idx) => (
        route.coordinates && route.coordinates.length > 1 && (
          <Polyline
            key={`route-${idx}`}
            positions={route.coordinates}
            pathOptions={{
              color: routeColors[idx % routeColors.length],
              weight: 4,
              opacity: 0.8,
            }}
          />
        )
      ))}
      
      {/* Activity markers */}
      {activities.filter(a => a.coordinates).map((activity, idx) => (
        <CircleMarker
          key={activity.id}
          center={activity.coordinates}
          radius={12}
          pathOptions={{
            color: '#fff',
            fillColor: activityConfig[activity.type]?.color || '#666',
            fillOpacity: 1,
            weight: 3,
          }}
        >
          <Popup>
            <div className="route-popup">
              <h4>{activityConfig[activity.type]?.icon} {activity.name}</h4>
              <p><strong>Stop #{idx + 1}</strong></p>
              <p>{activity.location}</p>
              {activity.duration && <p>⏱️ Plan for ~{activity.duration}h here</p>}
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </>
  )
}

// ============================================
// 📊 TRIP SUMMARY DASHBOARD COMPONENT
// Shows total trip stats, costs, and route overview
// ============================================
function TripSummaryDashboard({ tripDays, getActivitiesForDay, selectedActivities }) {
  const [allRoutes, setAllRoutes] = useState([])
  const [loading, setLoading] = useState(false)
  const [totals, setTotals] = useState({
    totalMiles: 0,
    totalDriveTime: 0,
    gasGallons: 0,
    gasCost: 0,
  })
  
  // Current avg gas prices for New England (updated for 2025)
  const GAS_PRICE_PER_GALLON = 3.65
  const AVG_MPG = 28 // Average car MPG
  
  // Calculate all routes when activities change
  useEffect(() => {
    const calculateAllRoutes = async () => {
      if (selectedActivities.length < 2) {
        setTotals({ totalMiles: 0, totalDriveTime: 0, gasGallons: 0, gasCost: 0 })
        setAllRoutes([])
        return
      }
      
      setLoading(true)
      
      try {
        const routePromises = tripDays.map(async (day) => {
          const dayActivities = getActivitiesForDay(day.id)
          if (dayActivities.length < 2) return { day, routes: [], stats: { miles: 0, time: 0 } }
          
          const routes = await fetchDayRoutes(dayActivities)
          const totalMiles = routes.reduce((sum, r) => sum + parseFloat(r.distanceMiles), 0)
          const totalTime = routes.reduce((sum, r) => sum + r.durationMinutes, 0)
          
          return { day, routes, stats: { miles: totalMiles, time: totalTime } }
        })
        
        const results = await Promise.all(routePromises)
        setAllRoutes(results)
        
        // Calculate totals
        const totalMiles = results.reduce((sum, r) => sum + r.stats.miles, 0)
        const totalTime = results.reduce((sum, r) => sum + r.stats.time, 0)
        const gasGallons = totalMiles / AVG_MPG
        const gasCost = gasGallons * GAS_PRICE_PER_GALLON
        
        setTotals({
          totalMiles: totalMiles.toFixed(1),
          totalDriveTime: totalTime,
          gasGallons: gasGallons.toFixed(1),
          gasCost: gasCost.toFixed(2),
        })
        
      } catch (err) {
        console.error('Failed to calculate routes:', err)
      } finally {
        setLoading(false)
      }
    }
    
    calculateAllRoutes()
  }, [tripDays, selectedActivities, getActivitiesForDay])
  
  const assignedActivities = selectedActivities.filter(a => a.dayId)
  // Ensure duration values are numeric (parseFloat) to avoid string concatenation bugs
  const totalActivityTime = selectedActivities.reduce((sum, a) => sum + (parseFloat(a.duration) || 0), 0)
  
  return (
    <div className="trip-summary-dashboard">
      <h3>🚗 Trip Summary & Route Stats</h3>
      
      {loading ? (
        <div className="summary-loading">
          <div className="loading-car">🚗</div>
          <p>Calculating all routes from real road data...</p>
        </div>
      ) : (
        <>
          {/* Main Stats Grid */}
          <div className="summary-stats-grid">
            <div className="summary-stat primary">
              <span className="stat-icon">📏</span>
              <div className="stat-content">
                <span className="stat-value">{totals.totalMiles}</span>
                <span className="stat-label">Total Miles</span>
              </div>
            </div>
            
            <div className="summary-stat primary">
              <span className="stat-icon">🚗</span>
              <div className="stat-content">
                <span className="stat-value">{formatDuration(totals.totalDriveTime * 60)}</span>
                <span className="stat-label">Drive Time</span>
              </div>
            </div>
            
            <div className="summary-stat">
              <span className="stat-icon">⛽</span>
              <div className="stat-content">
                <span className="stat-value">{totals.gasGallons} gal</span>
                <span className="stat-label">Est. Gas ({AVG_MPG} mpg)</span>
              </div>
            </div>
            
            <div className="summary-stat highlight">
              <span className="stat-icon">💵</span>
              <div className="stat-content">
                <span className="stat-value">${totals.gasCost}</span>
                <span className="stat-label">Gas Cost @ ${GAS_PRICE_PER_GALLON}/gal</span>
              </div>
            </div>
            
            <div className="summary-stat">
              <span className="stat-icon">⏱️</span>
              <div className="stat-content">
                <span className="stat-value">{totalActivityTime.toFixed(1)} hrs</span>
                <span className="stat-label">Activity Time</span>
              </div>
            </div>
            
            <div className="summary-stat">
              <span className="stat-icon">📍</span>
              <div className="stat-content">
                <span className="stat-value">{assignedActivities.length}</span>
                <span className="stat-label">Stops Scheduled</span>
              </div>
            </div>
          </div>
          
          {/* Per-Day Breakdown */}
          {allRoutes.length > 0 && (
            <div className="per-day-breakdown">
              <h4>Daily Driving Breakdown</h4>
              <div className="day-breakdown-grid">
                {allRoutes.filter(r => r.stats.miles > 0).map(({ day, stats }) => (
                  <div key={day.id} className="day-breakdown-item">
                    <span className="day-name">{day.label}</span>
                    <div className="day-stats-mini">
                      <span>📏 {stats.miles.toFixed(1)} mi</span>
                      <span>🚗 {formatDuration(stats.time * 60)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Tips */}
          <div className="driving-tips">
            <h4>💡 Pro Tips</h4>
            <ul>
              <li>🅿️ <strong>Portland parking:</strong> Use the Casco Bay Garage ($5/day max on weekends)</li>
              <li>⛽ <strong>Cheapest gas:</strong> Fill up in New Hampshire (no gas tax!)</li>
              <li>🍁 <strong>Scenic route:</strong> Take Route 1 along the coast for the best views</li>
              <li>📱 <strong>Download offline maps:</strong> Cell service is spotty in rural Maine</li>
            </ul>
          </div>
        </>
      )}
    </div>
  )
}

// ============================================
// 📅 DAY ROUTE CARD COMPONENT
// Full day itinerary with routes and directions
// ============================================
function DayRouteCard({ day, activities, tripDays, onAssign, onRemove, onMove }) {
  const { routes, loading, error, totalStats } = useRoutes(activities, day.id)
  const [showDirections, setShowDirections] = useState(false)
  const [showMap, setShowMap] = useState(false)
  
  return (
    <div className="day-route-card">
      <div className="day-route-header">
        <div className="day-info">
          <h4>{day.label}</h4>
          <span className="day-location">{day.location}</span>
        </div>
        <div className="day-route-stats">
          {activities.length > 0 && (
            <>
              <span className="stat">
                📍 {activities.length} stop{activities.length !== 1 ? 's' : ''}
              </span>
              {loading ? (
                <span className="stat loading">🔄 Calculating...</span>
              ) : (
                <>
                  <span className="stat">📏 {totalStats.miles} mi</span>
                  <span className="stat">🚗 {totalStats.formatted}</span>
                </>
              )}
            </>
          )}
        </div>
      </div>
      
      {activities.length === 0 ? (
        <div className="day-empty">
          <p>No activities yet - add from pool or browse tabs</p>
        </div>
      ) : (
        <>
          {/* Activity timeline with route info */}
          <div className="day-timeline">
            {activities.map((activity, idx) => (
              <div key={activity.id} className="timeline-item">
                {/* Activity Card */}
                <div className={`timeline-activity ${activity.type}`}>
                  <div className="activity-order">
                    {idx > 0 && (
                      <button className="reorder-btn" onClick={() => onMove(day.id, idx, idx - 1)}>↑</button>
                    )}
                    <span className="order-badge">{idx + 1}</span>
                    {idx < activities.length - 1 && (
                      <button className="reorder-btn" onClick={() => onMove(day.id, idx, idx + 1)}>↓</button>
                    )}
                  </div>
                  
                  <span className="activity-type-icon">{activityConfig[activity.type]?.icon}</span>
                  
                  <div className="activity-content">
                    <strong>{activity.name}</strong>
                    <span className="activity-loc">{activity.location}</span>
                    {activity.duration && (
                      <span className="activity-time">⏱️ ~{activity.duration}h</span>
                    )}
                  </div>
                  
                  <div className="activity-controls">
                    <select
                      value={day.id}
                      onChange={(e) => onAssign(activity.id, parseInt(e.target.value) || null)}
                    >
                      <option value="">Unassign</option>
                      {tripDays.map(d => (
                        <option key={d.id} value={d.id}>{d.label}</option>
                      ))}
                    </select>
                    <button className="remove-btn" onClick={() => onRemove(activity.id)}>✕</button>
                  </div>
                </div>
                
                {/* Route connector to next activity */}
                {idx < activities.length - 1 && routes[idx] && (
                  <div className="route-connector">
                    <div className="route-line"></div>
                    <div className="route-info">
                      <span className="route-icon">🚗</span>
                      <span className="route-distance">{routes[idx].distanceMiles} mi</span>
                      <span className="route-time">{routes[idx].durationFormatted}</span>
                      {routes[idx].steps && routes[idx].steps.length > 0 && (
                        <button 
                          className="view-directions-btn"
                          onClick={() => setShowDirections(!showDirections)}
                        >
                          {showDirections ? 'Hide' : 'View'} Directions
                        </button>
                      )}
                    </div>
                    <div className="route-line"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Toggle buttons */}
          <div className="day-actions">
            {activities.length >= 2 && (
              <>
                <button 
                  className={`toggle-btn ${showDirections ? 'active' : ''}`}
                  onClick={() => setShowDirections(!showDirections)}
                >
                  🧭 {showDirections ? 'Hide' : 'Show'} Directions
                </button>
                <button 
                  className={`toggle-btn ${showMap ? 'active' : ''}`}
                  onClick={() => setShowMap(!showMap)}
                >
                  🗺️ {showMap ? 'Hide' : 'Show'} Route Map
                </button>
              </>
            )}
          </div>
          
          {/* Expandable directions section */}
          {showDirections && (
            <DrivingDirections routes={routes} loading={loading} error={error} />
          )}
          
          {/* Expandable map section */}
          {showMap && activities.length >= 2 && (
            <div className="day-route-map">
              <MapContainer
                center={activities[0]?.coordinates || [43.5, -71.5]}
                zoom={9}
                style={{ height: '300px', width: '100%', borderRadius: '12px' }}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <RouteMapLayer routes={routes} activities={activities} />
              </MapContainer>
            </div>
          )}
        </>
      )}
    </div>
  )
}

// Countdown timer component
function CountdownTimer({ targetDate }) {
  const calculateTimeLeft = useCallback(() => {
    const difference = new Date(targetDate) - new Date()
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, passed: true }
    
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      passed: false
    }
  }, [targetDate])

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [calculateTimeLeft])

  if (timeLeft.passed) {
    return <div className="countdown-passed">🎉 Adventure time! Have an amazing trip! 🎉</div>
  }

  return (
    <div className="countdown">
      <div className="countdown-item">
        <span className="countdown-number">{timeLeft.days}</span>
        <span className="countdown-label">days</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-number">{timeLeft.hours}</span>
        <span className="countdown-label">hours</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-number">{timeLeft.minutes}</span>
        <span className="countdown-label">mins</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-number">{timeLeft.seconds}</span>
        <span className="countdown-label">secs</span>
      </div>
    </div>
  )
}

// Packing checklist component with localStorage persistence
function PackingChecklist({ checklist }) {
  const [checked, setChecked] = useState(() => {
    const saved = localStorage.getItem('mmt-packing-checked')
    return saved ? JSON.parse(saved) : {}
  })

  useEffect(() => {
    localStorage.setItem('mmt-packing-checked', JSON.stringify(checked))
  }, [checked])

  const toggleItem = (category, item) => {
    const key = `${category}-${item}`
    setChecked(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const getProgress = () => {
    const allItems = Object.entries(checklist).flatMap(([cat, items]) => 
      items.map(i => `${cat}-${i.item}`)
    )
    const checkedCount = allItems.filter(key => checked[key]).length
    return Math.round((checkedCount / allItems.length) * 100)
  }

  return (
    <div className="packing-section">
      <div className="packing-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${getProgress()}%` }}></div>
        </div>
        <span className="progress-text">{getProgress()}% packed!</span>
      </div>
      <div className="packing-grid">
        {Object.entries(checklist).map(([category, items]) => (
          <div key={category} className="packing-category">
            <h4>{category.charAt(0).toUpperCase() + category.slice(1)} {getCategoryEmoji(category)}</h4>
            <ul>
              {items.map((item) => {
                const key = `${category}-${item.item}`
                return (
                  <li key={item.item} className={checked[key] ? 'checked' : ''}>
                    <label>
                      <input
                        type="checkbox"
                        checked={checked[key] || false}
                        onChange={() => toggleItem(category, item.item)}
                      />
                      <span className={item.essential ? 'essential' : ''}>
                        {item.item}
                        {item.essential && <span className="essential-badge">!</span>}
                      </span>
                    </label>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

// Helper for category emojis
function getCategoryEmoji(category) {
  const emojis = { clothing: '👗', documents: '📄', gear: '🎒', picnic: '🧺' }
  return emojis[category] || '📦'
}

// Budget calculator component
function BudgetCalculator({ estimates }) {
  const [travelers, setTravelers] = useState(2)
  
  const calculateTotal = (type) => {
    return Object.values(estimates).reduce((sum, cat) => sum + cat[type], 0)
  }

  const perPerson = (amount) => Math.round(amount / travelers)

  return (
    <div className="budget-section">
      <div className="budget-header">
        <h3>💰 Trip Budget Estimator</h3>
        <div className="traveler-selector">
          <label>Travelers: </label>
          <button onClick={() => setTravelers(Math.max(1, travelers - 1))}>−</button>
          <span>{travelers}</span>
          <button onClick={() => setTravelers(travelers + 1)}>+</button>
        </div>
      </div>
      <div className="budget-table">
        <div className="budget-row header">
          <span>Category</span>
          <span>Low Est.</span>
          <span>High Est.</span>
          <span>Notes</span>
        </div>
        {Object.entries(estimates).map(([category, data]) => (
          <div key={category} className="budget-row">
            <span className="category-name">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
            <span className="amount">${data.min}</span>
            <span className="amount">${data.max}</span>
            <span className="note">{data.note}</span>
          </div>
        ))}
        <div className="budget-row total">
          <span>TOTAL (all travelers)</span>
          <span className="amount">${calculateTotal('min')}</span>
          <span className="amount">${calculateTotal('max')}</span>
          <span></span>
        </div>
        <div className="budget-row per-person">
          <span>Per Person</span>
          <span className="amount">${perPerson(calculateTotal('min'))}</span>
          <span className="amount">${perPerson(calculateTotal('max'))}</span>
          <span></span>
        </div>
      </div>
    </div>
  )
}

// Weather widget component
function WeatherWidget({ forecast }) {
  return (
    <div className="weather-grid">
      {forecast.map((loc) => (
        <div key={loc.location} className="weather-card">
          <span className="weather-icon">{loc.icon}</span>
          <h4>{loc.location}</h4>
          <div className="temps">
            <span className="high">{loc.high}°F</span>
            <span className="low">{loc.low}°F</span>
          </div>
          <p className="weather-note">{loc.note}</p>
        </div>
      ))}
    </div>
  )
}

// Reservation tracker component
function ReservationTracker({ reservations }) {
  const [booked, setBooked] = useState(() => {
    const saved = localStorage.getItem('mmt-reservations')
    return saved ? JSON.parse(saved) : {}
  })

  useEffect(() => {
    localStorage.setItem('mmt-reservations', JSON.stringify(booked))
  }, [booked])

  const toggleBooked = (restaurant) => {
    setBooked(prev => ({ ...prev, [restaurant]: !prev[restaurant] }))
  }

  return (
    <div className="reservations-section">
      <h3>🍽️ Restaurant Reservations</h3>
      <div className="reservations-grid">
        {reservations.map((res) => (
          <div key={res.restaurant} className={`reservation-card ${booked[res.restaurant] ? 'booked' : ''}`}>
            <div className="res-header">
              <span className="day-badge">Day {res.day}</span>
              {res.reservationNeeded && <span className="res-needed">Reservation Needed</span>}
            </div>
            <h4>{res.restaurant}</h4>
            <p className="res-location">📍 {res.location}</p>
            <p className="res-cuisine">{res.cuisine}</p>
            <p className="must-try">🌟 Must try: {res.mustTry}</p>
            {res.website && (
              <a href={res.website} target="_blank" rel="noopener noreferrer" className="res-link">
                Book Now →
              </a>
            )}
            <label className="booked-toggle">
              <input
                type="checkbox"
                checked={booked[res.restaurant] || false}
                onChange={() => toggleBooked(res.restaurant)}
              />
              {booked[res.restaurant] ? '✅ Booked!' : 'Mark as booked'}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

// Photo spots gallery component
function PhotoSpots({ spots }) {
  return (
    <div className="photo-spots">
      <h3>📸 Instagram-Worthy Spots</h3>
      <div className="spots-grid">
        {spots.map((spot) => (
          <div key={spot.name} className="spot-card">
            <h4>{spot.name}</h4>
            <p className="spot-location">📍 {spot.location}</p>
            <p className="spot-tip">💡 {spot.tip}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// Fun facts carousel component
function FunFacts({ facts }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % facts.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [facts.length])

  return (
    <div className="fun-facts">
      <div className="fact-content">
        <span className="fact-location">{facts[currentIndex].location}</span>
        <p className="fact-text">💡 {facts[currentIndex].fact}</p>
      </div>
      <div className="fact-dots">
        {facts.map((_, idx) => (
          <button
            key={idx}
            className={`dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  )
}

// Quick add popup was removed — adding to trip now goes directly to the unscheduled pool

// Main App component
function App() {
  const { 
    map, logistics, itinerary, alternatives, keyInsights, fieldNotes,
    travelers, tripDates, weatherForecast, budgetEstimate, packingChecklist,
    reservations, photoSpots, funFacts, drivingStats, playlist, emergencyContacts,
    lobsterGuide, harborTowns, foliageTracker, liveStats, lodging
  } = tripData

  const [activeTab, setActiveTab] = useState('overview')
  const [exploreQuery, setExploreQuery] = useState('')
  const [exploreType, setExploreType] = useState('all')
  const [customQuery, setCustomQuery] = useState('')
  const [customResults, setCustomResults] = useState([])
  const [customLoading, setCustomLoading] = useState(false)
  const [customError, setCustomError] = useState('')
  const [customSelectedDay, setCustomSelectedDay] = useState('')
  const exploreTypeOptions = useMemo(() => ([
    { id: 'all', label: 'All' },
    { id: 'lobster', label: '🦞 Lobster' },
    { id: 'town', label: '⚓ Towns' },
    { id: 'scenic-drive', label: '🚗 Scenic Drives' },
    { id: 'hike', label: '🥾 Hikes' },
    { id: 'cafe', label: '☕ Cafes' },
    { id: 'museum', label: '🖼️ Museums' },
    { id: 'view', label: '🌄 Views' },
    { id: 'lodging', label: '🏨 Stays' },
  ]), [])
  
  // ════════════════════════════════════════════════════════════════════════════
  // MULTI-TRAVELER SYSTEM (DDG-style per-user customization)
  // ════════════════════════════════════════════════════════════════════════════
  const [currentTravelerId, setCurrentTravelerId] = useState(() => {
    const saved = localStorage.getItem('mmtrip-current-traveler')
    return saved || 'both'
  })
  
  const [selectedScheduleOption, setSelectedScheduleOption] = useState(() => {
    const saved = localStorage.getItem('mmtrip-schedule-option')
    return saved || 'classic'
  })
  
  // Per-traveler activity selections (stored separately for each traveler)
  const [travelerSelections, setTravelerSelections] = useState(() => {
    const saved = localStorage.getItem('mmtrip-traveler-selections')
    return saved ? JSON.parse(saved) : {
      tere: new Set(),
      mikaela: new Set(),
      both: new Set()
    }
  })
  
  // Sidebar state - default OFF on mobile (< 900px)
  const [showSidebar, setShowSidebar] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth > 900
    }
    return false
  })
  const [selectedDay, setSelectedDay] = useState(null)

  // Auto-close sidebar when moving to narrow / portrait viewports
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setShowSidebar(false)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [])
  
  // Persist traveler selection
  useEffect(() => {
    localStorage.setItem('mmtrip-current-traveler', currentTravelerId)
  }, [currentTravelerId])
  
  useEffect(() => {
    localStorage.setItem('mmtrip-schedule-option', selectedScheduleOption)
  }, [selectedScheduleOption])
  
  useEffect(() => {
    // Convert Sets to arrays for storage
    const selectionsToSave = {
      tere: Array.from(travelerSelections.tere || []),
      mikaela: Array.from(travelerSelections.mikaela || []),
      both: Array.from(travelerSelections.both || [])
    }
    localStorage.setItem('mmtrip-traveler-selections', JSON.stringify(selectionsToSave))
  }, [travelerSelections])
  
  // Get current traveler's selections
  const currentSelections = useMemo(() => {
    return new Set(travelerSelections[currentTravelerId] || [])
  }, [travelerSelections, currentTravelerId])
  
  // Toggle activity for current traveler
  const toggleActivityForTraveler = useCallback((activityId, travelerId = currentTravelerId) => {
    setTravelerSelections(prev => {
      const travelerSet = new Set(prev[travelerId] || [])
      if (travelerSet.has(activityId)) {
        travelerSet.delete(activityId)
      } else {
        travelerSet.add(activityId)
      }
      return {
        ...prev,
        [travelerId]: travelerSet
      }
    })
  }, [currentTravelerId])

  // Data source lookup for lightweight citations
  const sourceLookup = useMemo(() => {
    const lookup = {}
    dataSources.forEach(src => { lookup[src.id] = src })
    return lookup
  }, [])

  // Filtered discovery catalog for the Explore tab
  const filteredExplore = useMemo(() => {
    const q = exploreQuery.toLowerCase()
    return exploreCatalog.filter(item => {
      const matchesType = exploreType === 'all' || item.type === exploreType
      const haystack = `${item.name} ${item.location} ${item.vibe} ${(item.tags || []).join(' ')}`.toLowerCase()
      const matchesQuery = !q || haystack.includes(q)
      return matchesType && matchesQuery
    })
  }, [exploreQuery, exploreType])

  const exploreCenter = useMemo(() => filteredExplore[0]?.coords || [43.5, -71.5], [filteredExplore])

  const exploreStats = useMemo(() => {
    const counts = filteredExplore.reduce((acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1
      return acc
    }, {})
    return counts
  }, [filteredExplore])

  // ----------------------------------------------
  // Nominatim custom place search (add anything)
  // ----------------------------------------------
  const debouncedSearchRef = useRef(null)

  const searchCustomPlaces = useCallback((query) => {
    const q = query.trim()
    if (debouncedSearchRef.current) clearTimeout(debouncedSearchRef.current)

    if (!q || q.length < 3) {
      setCustomResults([])
      setCustomError(q ? 'Keep typing (min 3 chars)' : '')
      return
    }

    debouncedSearchRef.current = setTimeout(async () => {
      setCustomLoading(true)
      setCustomError('')
      try {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=8&addressdetails=1`
        const res = await fetch(url, {
          headers: {
            'Accept-Language': 'en',
            'User-Agent': 'MMT-2025-trip-planner'
          }
        })
        if (!res.ok) throw new Error('Search failed')
        const data = await res.json()
        setCustomResults(data || [])
        if ((data || []).length === 0) {
          setCustomError('No results—try a nearby city or landmark name')
        }
      } catch (err) {
        setCustomError('Unable to search right now. Try again or refine your query.')
        setCustomResults([])
      } finally {
        setCustomLoading(false)
      }
    }, 400)
  }, [])
  
  // Build all available activities from data sources (for potential future use in smart suggestions)
  const _allActivities = useMemo(() => {
    const activities = []
    
    // Add lobster spots
    lobsterGuide.topSpots.forEach((spot, idx) => {
      activities.push({
        id: `lobster-${idx}`,
        type: 'lobster',
        name: spot.name,
        location: spot.location,
        coordinates: spot.coordinates,
        rating: spot.rating,
        price: spot.price,
        description: spot.whySpecial,
        details: spot.mustOrder,
        tip: spot.proTip,
        waitTime: spot.waitTime,
        duration: 1.5, // Estimated hours
        tags: spot.tags || [],
      })
    })
    
    // Add harbor towns
    harborTowns.forEach((town, idx) => {
      activities.push({
        id: `town-${idx}`,
        type: 'town',
        name: town.name,
        location: town.state,
        coordinates: town.coordinates,
        rating: town.rating,
        description: town.vibe,
        details: town.mustDo.join(', '),
        tip: town.parking,
        photoSpot: town.bestPhotoSpot,
        walkability: town.walkability,
        duration: 2.5, // Estimated hours
      })
    })
    
    // Add foliage drives
    foliageTracker.bestDrives.forEach((drive, idx) => {
      activities.push({
        id: `drive-${idx}`,
        type: 'drive',
        name: drive.name,
        location: drive.state,
        coordinates: drive.coordinates,
        rating: drive.rating,
        description: drive.note,
        details: drive.peakView,
        distance: drive.distance,
        duration: parseFloat(drive.time) || 2, // Estimated hours
      })
    })
    
    // Add foliage viewing locations (peak ones)
    foliageTracker.predictions.filter(p => p.status === 'peak' || p.status === 'approaching').forEach((pred, idx) => {
      activities.push({
        id: `foliage-${idx}`,
        type: 'foliage',
        name: pred.location,
        location: pred.elevation,
        coordinates: pred.coordinates,
        description: pred.notes,
        details: pred.bestTreesNow,
        status: pred.status,
        peakTime: pred.expectedPeak,
        duration: 2,
      })
    })
    
    return activities
  }, [lobsterGuide, harborTowns, foliageTracker])

  // Selected activities for custom itinerary (persisted to localStorage)
  const [selectedActivities, setSelectedActivities] = useState(() => {
    const saved = localStorage.getItem('mmtrip-selected-activities')
    return saved ? JSON.parse(saved) : []
  })

  // Trip days configuration
  const [tripDays, setTripDays] = useState(() => {
    const saved = localStorage.getItem('mmtrip-days')
    return saved ? JSON.parse(saved) : [
      { id: 1, date: '2025-09-20', label: 'Day 1 - Sat', location: 'Boston Arrival', activities: [] },
      { id: 2, date: '2025-09-21', label: 'Day 2 - Sun', location: 'Maine Coast', activities: [] },
      { id: 3, date: '2025-09-22', label: 'Day 3 - Mon', location: 'Mid-Coast Maine', activities: [] },
      { id: 4, date: '2025-09-23', label: 'Day 4 - Tue', location: 'Acadia / Bar Harbor', activities: [] },
      { id: 5, date: '2025-09-24', label: 'Day 5 - Wed', location: 'White Mountains', activities: [] },
      { id: 6, date: '2025-09-25', label: 'Day 6 - Thu', location: 'Vermont', activities: [] },
      { id: 7, date: '2025-09-26', label: 'Day 7 - Fri', location: 'Montreal or Adirondacks', activities: [] },
      { id: 8, date: '2025-09-27', label: 'Day 8 - Sat', location: 'Departure', activities: [] },
    ]
  })

  // Save to localStorage when selections change
  useEffect(() => {
    localStorage.setItem('mmtrip-selected-activities', JSON.stringify(selectedActivities))
  }, [selectedActivities])

  useEffect(() => {
    localStorage.setItem('mmtrip-days', JSON.stringify(tripDays))
  }, [tripDays])

  // Normalize explore catalog types into existing activity categories
  const catalogTypeMap = {
    'scenic-drive': 'drive',
    view: 'landmark'
  }

  const getTypeLabel = (type) => {
    const found = exploreTypeOptions.find(t => t.id === type)
    return found?.label || type
  }

  const buildActivityFromCatalog = (item) => ({
    id: item.id,
    type: catalogTypeMap[item.type] || item.type,
    name: item.name,
    location: item.location,
    coordinates: item.coords,
    description: item.vibe,
    details: item.mustDo || item.mustTry || '',
    tags: item.tags || [],
    sourceId: item.sourceId,
    duration: item.type === 'scenic-drive' ? 2.5 : item.type === 'hike' ? 2 : 1.5,
  })

  const buildActivityFromNominatim = (place) => {
    const name = place?.display_name?.split(',')[0]?.trim() || 'Custom place'
    const id = `custom-${place.place_id}`
    return {
      id,
      type: 'custom',
      name,
      location: place.display_name,
      coordinates: [parseFloat(place.lat), parseFloat(place.lon)],
      description: place.type || place.category || 'Custom location',
      details: place.address?.city || place.address?.town || place.address?.state || '',
      tags: ['custom'],
      sourceId: 'openstreetmap',
      duration: 1.5,
    }
  }

  // Add activity to selected list (goes to unscheduled pool)
  const addActivity = (activity) => {
    if (!selectedActivities.find(a => a.id === activity.id)) {
      setSelectedActivities([...selectedActivities, { ...activity, dayId: null }])
    }
  }

  const handleAddExploreItem = (item) => {
    const activity = buildActivityFromCatalog(item)
    addActivity(activity)
  }

  const handleAddCustomPlace = (place) => {
    const activity = buildActivityFromNominatim(place)
    addActivity(activity)
    if (customSelectedDay) {
      assignToDay(activity.id, parseInt(customSelectedDay))
    }
  }

  // Remove activity from selected list
  const removeActivity = (activityId) => {
    setSelectedActivities(selectedActivities.filter(a => a.id !== activityId))
    // Also remove from any day
    setTripDays(tripDays.map(day => ({
      ...day,
      activities: day.activities.filter(id => id !== activityId)
    })))
  }

  // Check if activity is selected
  const isSelected = (activityId) => {
    return selectedActivities.some(a => a.id === activityId)
  }

  // Assign activity to a day (append to end)
  const assignToDay = (activityId, dayId) => assignToDayAt(activityId, dayId, null)

  // Assign activity to a day at a specific index (insert into position)
  const assignToDayAt = (activityId, dayId, atIndex = null) => {
    // Remove from previous day if any
    const newDays = tripDays.map(day => ({
      ...day,
      activities: day.activities.filter(id => id !== activityId)
    }))

    // Add to new day at position (or push to end)
    if (dayId) {
      const dayIndex = newDays.findIndex(d => d.id === dayId)
      if (dayIndex !== -1) {
        const activities = newDays[dayIndex].activities
        if (atIndex === null || atIndex >= activities.length) {
          activities.push(activityId)
        } else {
          activities.splice(atIndex, 0, activityId)
        }
        newDays[dayIndex].activities = activities
      }
    }

    setTripDays(newDays)

    // Update the activity's dayId (null for unscheduled)
    setSelectedActivities(selectedActivities.map(a =>
      a.id === activityId ? { ...a, dayId } : a
    ))
  }

  // Move activity within a day (reorder)
  const moveActivityInDay = (dayId, fromIndex, toIndex) => {
    const newDays = [...tripDays]
    const dayIndex = newDays.findIndex(d => d.id === dayId)
    if (dayIndex !== -1) {
      const activities = [...newDays[dayIndex].activities]
      const [moved] = activities.splice(fromIndex, 1)
      activities.splice(toIndex, 0, moved)
      newDays[dayIndex].activities = activities
      setTripDays(newDays)
    }
  }

  // Calculate stats for selected activities
  const tripStats = useMemo(() => {
    const selected = selectedActivities
    const lobsterCount = selected.filter(a => a.type === 'lobster').length
    const townCount = selected.filter(a => a.type === 'town').length
    const driveCount = selected.filter(a => a.type === 'drive').length
    const foliageCount = selected.filter(a => a.type === 'foliage').length
    const totalDuration = selected.reduce((sum, a) => sum + (a.duration || 0), 0)
    const assigned = selected.filter(a => a.dayId).length
    
    // Calculate total distance if we have coordinates
    let totalMiles = 0
    const coordsList = selected.filter(a => a.coordinates).map(a => a.coordinates)
    for (let i = 1; i < coordsList.length; i++) {
      totalMiles += calculateDistance(coordsList[i-1], coordsList[i])
    }
    
    return {
      total: selected.length,
      lobsterCount,
      townCount,
      driveCount,
      foliageCount,
      totalDuration,
      totalMiles: Math.round(totalMiles),
      assigned,
      unassigned: selected.length - assigned,
    }
  }, [selectedActivities])

  // Get activities for a specific day
  const getActivitiesForDay = (dayId) => {
    const day = tripDays.find(d => d.id === dayId)
    if (!day) return []
    return day.activities.map(actId => selectedActivities.find(a => a.id === actId)).filter(Boolean)
  }

  // Clear all selections
  const clearAllSelections = () => {
    if (window.confirm('Clear all selections? This cannot be undone.')) {
      setSelectedActivities([])
      setTripDays(tripDays.map(day => ({ ...day, activities: [] })))
    }
  }

  return (
    <div className={`app-container ${showSidebar ? 'with-sidebar' : ''}`}>
      
      {/* Backdrop overlay - click to close sidebar on mobile */}
      {showSidebar && (
        <div 
          className="sidebar-backdrop"
          onClick={() => setShowSidebar(false)}
          aria-hidden="true"
        />
      )}
      
      {/* ════════════════════════════════════════════════════════════════════════
          DDG-STYLE SIDEBAR - Mission Control Panel
          ════════════════════════════════════════════════════════════════════════ */}
      {showSidebar && (
        <Sidebar
          currentTravelerId={currentTravelerId}
          onTravelerChange={setCurrentTravelerId}
          tripDays={dayItinerary}
          selectedActivities={currentSelections}
          onSelectDay={setSelectedDay}
          scheduleOptions={scheduleOptions}
          selectedScheduleOption={selectedScheduleOption}
          onScheduleOptionChange={setSelectedScheduleOption}
          onActivityToggle={toggleActivityForTraveler}
        />
      )}
      
      {/* Sidebar Toggle Button */}
      <button 
        className="sidebar-toggle-btn"
        onClick={() => setShowSidebar(!showSidebar)}
        title={showSidebar ? 'Hide Sidebar' : 'Show Sidebar'}
        aria-label={showSidebar ? 'Close menu' : 'Open menu'}
      >
        {showSidebar ? '✕' : '☰'}
      </button>
      
      {/* Main Content Area */}
      <div className="main-content">


      {/* Floating Trip Summary (shows when not on My Trip tab and has items) */}
      {activeTab !== 'mytrip' && selectedActivities.length > 0 && (
        <div className="floating-trip-summary">
          <button className="floating-summary-toggle" onClick={() => setActiveTab('mytrip')}>
            <span className="summary-badge">{selectedActivities.length}</span>
            <span className="summary-label">My Trip</span>
            <span className="summary-expand">→</span>
          </button>
          <div className="floating-summary-preview">
            {selectedActivities.slice(0, 3).map(a => (
              <span key={a.id} className="preview-dot" title={a.name}>
                {a.type === 'lobster' ? '🦞' : a.type === 'town' ? '⚓' : a.type === 'lodging' ? '🏨' : '🍁'}
              </span>
            ))}
            {selectedActivities.length > 3 && (
              <span className="more-count">+{selectedActivities.length - 3}</span>
            )}
          </div>
        </div>
      )}

      {/* Hero Section with Countdown */}
      <header className="hero">
        <p className="eyebrow">A journey crafted with love</p>
        <h1>{tripData.title}</h1>
        <h2>{tripData.subtitle}</h2>
        <p className="tagline">{tripData.tagline}</p>
        
        {/* Travelers showcase */}
        <div className="travelers">
          {travelers.map((t) => (
            <div key={t.name} className="traveler">
              <span className="traveler-emoji">{t.emoji}</span>
              <span className="traveler-name">{t.name}</span>
              <span className="traveler-role">{t.role}</span>
            </div>
          ))}
        </div>

        {/* Countdown Timer */}
        <div className="countdown-wrapper">
          <p className="countdown-label">Adventure begins in...</p>
          <CountdownTimer targetDate={tripDates.start} />
        </div>

        <p className="intro-text">{tripData.summary}</p>
      </header>

      {/* Navigation Tabs */}
      <nav className="tab-nav">
        {['overview', 'explore', 'mytrip', 'lodging', 'foliage', 'lobster', 'towns', 'planning', 'packing'].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''} ${tab === 'overview' ? 'primary-tab' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'overview' && '🗺️ '}
            {tab === 'explore' && '🔎 '}
            {tab === 'mytrip' && '✨ '}
            {tab === 'lodging' && '🏨 '}
            {tab === 'foliage' && '🍁 '}
            {tab === 'lobster' && '🦞 '}
            {tab === 'towns' && '⛵ '}
            {tab === 'planning' && '📋 '}
            {tab === 'packing' && '🧳 '}
            {tab === 'overview' ? 'Overview' : tab === 'mytrip' ? 'My Trip' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            {tab === 'mytrip' && selectedActivities.length > 0 && (
              <span className="tab-badge">{selectedActivities.length}</span>
            )}
          </button>
        ))}
      </nav>

      {/* Fun Facts Banner */}
      <FunFacts facts={funFacts} />

      {/* 🔎 EXPLORE TAB - Discovery search with citations */}
      {activeTab === 'explore' && (
        <section className="explore-section">
          <div className="section-heading">
            <p className="eyebrow">🔎 Explore & Discover</p>
            <h2>Hidden gems, lobster shrines, and foliage routes</h2>
            <p>Search by vibe, type, or location. Add to My Trip to curate your own board.</p>
          </div>

          <div className="explore-controls">
            <input
              type="text"
              value={exploreQuery}
              onChange={(e) => setExploreQuery(e.target.value)}
              placeholder="Search lobster, harbor towns, Montreal cafes, drives..."
              className="explore-search"
            />
            <div className="explore-filters">
              {exploreTypeOptions.map((opt) => (
                <button
                  key={opt.id}
                  className={`filter-chip ${exploreType === opt.id ? 'is-active' : ''}`}
                  onClick={() => setExploreType(opt.id)}
                >
                  {opt.label}
                </button>
              ))}
              {(exploreQuery || exploreType !== 'all') && (
                <button
                  className="filter-chip reset-chip"
                  onClick={() => { setExploreQuery(''); setExploreType('all'); }}
                >
                  Reset
                </button>
              )}
            </div>
            <div className="explore-meta">
              <span className="meta-pill">{filteredExplore.length} results</span>
              <div className="meta-breakdown">
                {Object.entries(exploreStats).slice(0,4).map(([type,count]) => (
                  <span key={type} className="meta-chip" onClick={() => setExploreType(type)}>
                    {getTypeLabel(type)}: {count}
                  </span>
                ))}
              </div>
            </div>

            {/* Add-anything search (Nominatim) */}
            <div className="custom-search">
              <div className="custom-header">
                <div>
                  <p className="eyebrow">Add anything</p>
                  <h4>Search the map and drop it into your trip</h4>
                </div>
                <label className="assign-select">
                  <span>Default day</span>
                  <select value={customSelectedDay} onChange={(e) => setCustomSelectedDay(e.target.value)}>
                    <option value="">Unscheduled</option>
                    {tripDays.map(d => (
                      <option key={d.id} value={d.id}>Day {d.id}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="custom-input-row">
                <input
                  type="text"
                  value={customQuery}
                  onChange={(e) => { setCustomQuery(e.target.value); searchCustomPlaces(e.target.value) }}
                  placeholder="Try: Acadia National Park, Portsmouth coffee, Burlington hotel, address, etc."
                  className="explore-search"
                />
                {customLoading && <span className="loading-dot">⏳</span>}
              </div>
              {customError && <p className="custom-error">{customError}</p>}
              <div className="custom-results">
                {customResults.map((place) => (
                  <div key={place.place_id} className="custom-card">
                    <div>
                      <p className="eyebrow">{place.type || place.category}</p>
                      <h5>{place.display_name.split(',')[0]}</h5>
                      <p className="custom-location">{place.display_name}</p>
                    </div>
                    <div className="custom-actions">
                      <button className="add-btn" onClick={() => handleAddCustomPlace(place)}>Add to My Trip</button>
                    </div>
                  </div>
                ))}
                {!customLoading && customResults.length === 0 && customQuery.length >= 3 && !customError && (
                  <div className="empty-state">No matches yet—try adding a city/state or landmark name.</div>
                )}
              </div>
            </div>
          </div>

          <div className="explore-grid">
            {filteredExplore.map((item) => {
              const source = sourceLookup[item.sourceId]
              const added = isSelected(item.id)
              const scheduledDay = selectedActivities.find(a => a.id === item.id)?.dayId || null
              return (
                <div key={item.id} className="explore-card">
                  <div className="explore-card-header">
                    <div>
                      <p className="eyebrow">{item.location}</p>
                      <h3>{item.name}</h3>
                      <p className="explore-vibe">{item.vibe}</p>
                    </div>
                    <span className="type-pill">{getTypeLabel(item.type)}</span>
                  </div>
                  {(item.mustDo || item.mustTry) && (
                    <p className="explore-must">⭐ {item.mustDo || item.mustTry}</p>
                  )}
                  <div className="tag-row">
                    {(item.tags || []).map((tag) => (
                      <span key={tag} className="tag-chip">{tag}</span>
                    ))}
                  </div>
                  <div className="explore-card-footer">
                    <div className="footer-left">
                      {source && (
                        <a className="source-badge" href={source.url} target="_blank" rel="noreferrer">
                          🔗 {source.name}
                        </a>
                      )}
                      {added && (
                        <label className="assign-select">
                          <span>Day</span>
                          <select
                            value={scheduledDay || ''}
                            onChange={(e) => assignToDay(item.id, e.target.value ? parseInt(e.target.value) : null)}
                          >
                            <option value="">Unscheduled</option>
                            {tripDays.map(d => (
                              <option key={d.id} value={d.id}>Day {d.id}</option>
                            ))}
                          </select>
                        </label>
                      )}
                    </div>
                    <div className="footer-actions">
                      {added ? (
                        <button className="add-btn is-added" onClick={() => setActiveTab('mytrip')}>
                          View My Trip
                        </button>
                      ) : (
                        <button
                          className="add-btn"
                          onClick={() => handleAddExploreItem(item)}
                        >
                          Add to My Trip
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
            {filteredExplore.length === 0 && (
              <div className="empty-state">No matches yet. Try a broader vibe, switch type, or reset filters.</div>
            )}
          </div>

          {/* Map preview for discovery results */}
          <div className="explore-map">
            <MapContainer
              center={exploreCenter}
              zoom={6}
              scrollWheelZoom={false}
              className="leaflet-map explore-leaflet"
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {filteredExplore.map(item => (
                item.coords ? (
                  <CircleMarker
                    key={item.id}
                    center={item.coords}
                    radius={10}
                    pathOptions={{
                      color: '#d35400',
                      fillColor: '#d35400',
                      fillOpacity: 0.85
                    }}
                  >
                    <Popup>
                      <div className="map-popup">
                        <h4>{item.name}</h4>
                        <p>{item.location}</p>
                        <p>{item.vibe}</p>
                      </div>
                    </Popup>
                  </CircleMarker>
                ) : null
              ))}
            </MapContainer>
            <div className="map-note">Pan/zoom to preview filtered picks; add any to My Trip above.</div>
          </div>

          <div className="sources-panel">
            <h4>Sources & Inspirations</h4>
            <p className="section-subtitle">Quick cites so you know where each idea came from.</p>
            <div className="sources-list">
              {dataSources.map((src) => (
                <a key={src.id} className="source-chip" href={src.url} target="_blank" rel="noreferrer">
                  {src.name}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 🏨 LODGING TAB - Where to Sleep */}
      {activeTab === 'lodging' && (
        <section className="lodging-section">
          <div className="section-heading">
            <p className="eyebrow">🏨 Where to Stay</p>
            <h2>Lodging Options by Night</h2>
            <p>Curated hotels, B&Bs, and Airbnbs for each stop on your journey</p>
          </div>

          <div className="lodging-grid">
            {[1, 2, 3, 4, 5, 6].map(night => {
              const nightLodgings = tripData.lodging.filter(l => l.night === night)
              const nightInfo = {
                1: { label: 'Night 1', location: 'Boston, MA', date: 'Sept 20' },
                2: { label: 'Night 2', location: 'Portland, ME', date: 'Sept 21' },
                3: { label: 'Night 3', location: 'Vermont (Chelsea or Burlington)', date: 'Sept 22' },
                4: { label: 'Night 4', location: 'Montreal, QC', date: 'Sept 23' },
                5: { label: 'Night 5', location: 'Montreal, QC', date: 'Sept 24' },
                6: { label: 'Night 6', location: 'Saratoga Springs or Lake Placid', date: 'Sept 25' },
              }[night]

              return (
                <div key={night} className="lodging-night-group">
                  <div className="night-header">
                    <h3>{nightInfo.label}</h3>
                    <span className="night-location">{nightInfo.location}</span>
                    <span className="night-date">{nightInfo.date}</span>
                  </div>
                  <div className="lodging-options">
                    {nightLodgings.map(lodge => {
                      const selected = isSelected(lodge.id)
                      return (
                        <div key={lodge.id} className={`lodging-card ${lodge.type === 'Private Home' ? 'special' : ''} ${selected ? 'selected' : ''}`}>
                          {selected && <div className="selected-badge">✓ Booked!</div>}
                          <div className="lodging-header">
                            <div className="lodging-name-price">
                              <h4>{lodge.name}</h4>
                              <span className={`price-badge ${lodge.price}`}>{lodge.price}</span>
                            </div>
                            <span className="lodging-type">{lodge.type}</span>
                          </div>
                          <p className="lodging-neighborhood">📍 {lodge.neighborhood}</p>
                          <p className="lodging-why">{lodge.whyStay}</p>
                          <div className="lodging-amenities">
                            {lodge.amenities.slice(0, 4).map((amenity, i) => (
                              <span key={i} className="amenity-chip">{amenity}</span>
                            ))}
                          </div>
                          <div className="lodging-meta">
                            <span className="walkability">🚶 {lodge.walkability}</span>
                            <span className="price-range">{lodge.priceRange}</span>
                          </div>
                          {lodge.proTip && (
                            <p className="lodging-tip">💡 <strong>Pro tip:</strong> {lodge.proTip}</p>
                          )}
                          {lodge.bookingTip && (
                            <p className="lodging-booking">📝 <em>{lodge.bookingTip}</em></p>
                          )}
                          <div className="card-actions">
                            <a 
                              href={`https://www.google.com/maps?q=${lodge.coordinates[0]},${lodge.coordinates[1]}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="directions-btn"
                            >
                              📍 View on Map
                            </a>
                            <button 
                              className={`add-to-trip-btn ${selected ? 'added' : ''}`}
                              onClick={() => selected ? removeActivity(lodge.id) : addActivity({
                                id: lodge.id,
                                type: 'lodging',
                                name: lodge.name,
                                location: `${lodge.region} - ${lodge.neighborhood}`,
                                coordinates: lodge.coordinates,
                                price: lodge.price,
                                priceRange: lodge.priceRange,
                                description: lodge.whyStay,
                                details: lodge.amenities.join(', '),
                                night: lodge.night,
                                lodgingType: lodge.type,
                                duration: 'overnight',
                              })}
                            >
                              {selected ? '✓ Added' : '+ Add'}
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="lodging-summary-card">
            <h3>🗓️ Quick Summary: Where to Book</h3>
            <div className="booking-checklist">
              <div className="booking-item">
                <span className="night-badge">N1</span>
                <strong>Boston:</strong> The Godfrey (luxury) or Revolution Hotel (budget-chic)
              </div>
              <div className="booking-item">
                <span className="night-badge">N2</span>
                <strong>Portland:</strong> Press Hotel (top pick) or Harbor Hotel (waterfront)
              </div>
              <div className="booking-item">
                <span className="night-badge">N3</span>
                <strong>Vermont:</strong> Sally's (if available!) or Hotel Vermont in Burlington
              </div>
              <div className="booking-item">
                <span className="night-badge">N4-5</span>
                <strong>Montreal (2 nights):</strong> Le Petit Hotel (romantic) or Plateau Airbnb (local)
              </div>
              <div className="booking-item">
                <span className="night-badge">N6</span>
                <strong>Final Night:</strong> The Adelphi in Saratoga or Mirror Lake Inn in Lake Placid
              </div>
            </div>
            <p className="booking-note">💡 Book Portland and Montreal ASAP—fall foliage season = high demand!</p>
          </div>
        </section>
      )}

      {/* ✨ MY TRIP TAB - Custom Itinerary Builder */}
      {activeTab === 'mytrip' && (
        <>
          <section className="my-trip-builder">
            <div className="section-heading">
              <p className="eyebrow">✨ Your Custom Adventure</p>
              <h2>Build Your Perfect Trip</h2>
              <p>Add activities from the tabs, then drag them into your day-by-day schedule</p>
            </div>

            {/* Trip Stats Summary */}
            <div className="trip-stats-bar">
              <div className="stat-chip">
                <span className="stat-icon">📍</span>
                <span>{tripStats.total} activities selected</span>
              </div>
              <div className="stat-chip">
                <span className="stat-icon">🦞</span>
                <span>{tripStats.lobsterCount} lobster spots</span>
              </div>
              <div className="stat-chip">
                <span className="stat-icon">⚓</span>
                <span>{tripStats.townCount} harbor towns</span>
              </div>
              <div className="stat-chip">
                <span className="stat-icon">🍁</span>
                <span>{tripStats.foliageCount + tripStats.driveCount} foliage/drives</span>
              </div>
              <div className="stat-chip">
                <span className="stat-icon">⏱️</span>
                <span>~{Math.round(tripStats.totalDuration)} hrs of activities</span>
              </div>
              {tripStats.unassigned > 0 && (
                <div className="stat-chip warning">
                  <span className="stat-icon">⚠️</span>
                  <span>{tripStats.unassigned} unscheduled</span>
                </div>
              )}
              {selectedActivities.length > 0 && (
                <button className="clear-btn" onClick={clearAllSelections}>
                  🗑️ Clear All
                </button>
              )}
            </div>

            {selectedActivities.length === 0 ? (
              <div className="empty-trip-state">
                <div className="empty-icon">🗺️</div>
                <h3>Start Building Your Adventure!</h3>
                <p>Browse the tabs above and click "+ Add" on activities that interest you.</p>
                <div className="quick-start-tips">
                  <div className="tip">🦞 <strong>Lobster:</strong> Pick your must-try seafood spots</div>
                  <div className="tip">⚓ <strong>Towns:</strong> Choose charming harbor villages</div>
                  <div className="tip">🍁 <strong>Foliage:</strong> Find peak fall colors</div>
                  <div className="tip">🏨 <strong>Lodging:</strong> Book your stays</div>
                </div>
              </div>
            ) : (
              <div className="trip-builder-layout">
                {/* Unassigned Activities Pool */}
                <div className="unassigned-pool">
                  <h3>📦 Unscheduled ({selectedActivities.filter(a => !a.dayId).length})</h3>
                  <p className="pool-hint">Drag to a day below, or use the dropdown</p>
                  <div className="activity-pool">
                    {selectedActivities.filter(a => !a.dayId).map(activity => (
                      <div 
                        key={activity.id} 
                        className={`pool-activity ${activity.type}`}
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData('activityId', activity.id)
                          e.dataTransfer.setData('fromDay', '')
                          e.dataTransfer.setData('fromIndex', '-1')
                          e.target.classList.add('dragging')
                        }}
                        onDragEnd={(e) => e.target.classList.remove('dragging')}
                      >
                        <span className="activity-icon">{activityConfig[activity.type]?.icon}</span>
                        <div className="activity-info">
                          <strong>{activity.name}</strong>
                          <span className="activity-location">{activity.location}</span>
                        </div>
                        <div className="activity-actions">
                          <select 
                            onChange={(e) => assignToDay(activity.id, parseInt(e.target.value) || null)}
                            value=""
                            className="day-select"
                          >
                            <option value="">→ Day...</option>
                            {tripDays.map(day => (
                              <option key={day.id} value={day.id}>Day {day.id}</option>
                            ))}
                          </select>
                          <button 
                            className="remove-btn" 
                            onClick={() => removeActivity(activity.id)}
                            title="Remove from trip"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                    {selectedActivities.filter(a => !a.dayId).length === 0 && (
                      <p className="all-assigned">✅ All activities are scheduled!</p>
                    )}
                  </div>
                </div>

                {/* Day-by-Day Schedule */}
                <div className="day-schedule">
                  <h3>📅 Day-by-Day Schedule</h3>
                  <p className="schedule-subtitle">Drag activities between days to organize</p>
                  <div className="days-grid">
                    {tripDays.map(day => {
                      const dayActivities = getActivitiesForDay(day.id)
                      return (
                        <div 
                          key={day.id} 
                          className="day-drop-zone"
                          onDragOver={(e) => {
                            e.preventDefault()
                            e.currentTarget.classList.add('drag-over')
                          }}
                          onDragLeave={(e) => e.currentTarget.classList.remove('drag-over')}
                          onDrop={(e) => {
                            e.preventDefault()
                            e.currentTarget.classList.remove('drag-over')
                            const activityId = e.dataTransfer.getData('activityId')
                            if (activityId) {
                              assignToDay(activityId, day.id)
                            }
                          }}
                        >
                          <div className="day-header">
                            <div className="day-title">
                              <span className="day-num">Day {day.id}</span>
                              <span className="day-date">{day.date}</span>
                            </div>
                            <span className="day-location">{day.location}</span>
                          </div>
                          
                          <div className="day-activities">
                            {dayActivities.length === 0 ? (
                              <div className="empty-day">
                                <span>Drop activities here</span>
                              </div>
                            ) : (
                              dayActivities.map((activity, idx) => (
                                <div 
                                  key={activity.id} 
                                  className={`day-activity ${activity.type}`}
                                  draggable
                                  onDragStart={(e) => {
                                    e.dataTransfer.setData('activityId', activity.id)
                                    e.dataTransfer.setData('fromDay', String(day.id))
                                    e.dataTransfer.setData('fromIndex', String(idx))
                                    e.target.classList.add('dragging')
                                  }}
                                  onDragEnd={(e) => e.target.classList.remove('dragging')}
                                  onDragOver={(e) => e.preventDefault()}
                                  onDrop={(e) => {
                                    e.preventDefault()
                                    const activityId = e.dataTransfer.getData('activityId')
                                    const fromDay = parseInt(e.dataTransfer.getData('fromDay')) || null
                                    const fromIndex = parseInt(e.dataTransfer.getData('fromIndex'))
                                    // If moving within same day, reorder
                                    if (fromDay === day.id) {
                                      moveActivityInDay(day.id, fromIndex, idx)
                                    } else {
                                      // Insert into this index
                                      assignToDayAt(activityId, day.id, idx)
                                    }
                                  }}
                                >
                                  <span className="activity-icon">{activityConfig[activity.type]?.icon}</span>
                                  <div className="activity-details">
                                    <strong>{activity.name}</strong>
                                    <span>{activity.location}</span>
                                  </div>
                                  <div className="activity-controls">
                                    <select 
                                      onChange={(e) => {
                                        const newDay = parseInt(e.target.value)
                                        if (newDay === 0) {
                                          assignToDay(activity.id, null)
                                        } else {
                                          assignToDay(activity.id, newDay)
                                        }
                                      }}
                                      value={day.id}
                                      className="move-select"
                                    >
                                      <option value="0">Unschedule</option>
                                      {tripDays.map(d => (
                                        <option key={d.id} value={d.id}>Day {d.id}</option>
                                      ))}
                                    </select>
                                    <button 
                                      className="remove-btn"
                                      onClick={() => removeActivity(activity.id)}
                                    >
                                      ✕
                                    </button>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Trip Summary Dashboard with Real Route Calculations */}
            {selectedActivities.length >= 2 && (
              <TripSummaryDashboard 
                tripDays={tripDays}
                getActivitiesForDay={getActivitiesForDay}
                selectedActivities={selectedActivities}
              />
            )}

            {/* Custom Trip Map */}
            {selectedActivities.length > 0 && (
              <div className="tab-map-container">
                <h3>🗺️ Your Custom Route</h3>
                <div className="tab-map">
                  <MapContainer
                    center={[43.5, -71.5]}
                    zoom={7}
                    style={{ height: '400px', width: '100%', borderRadius: '12px' }}
                    scrollWheelZoom={true}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {/* Draw lines between scheduled activities */}
                    {tripDays.map(day => {
                      const dayActivities = getActivitiesForDay(day.id)
                      const coords = dayActivities.filter(a => a.coordinates).map(a => a.coordinates)
                      if (coords.length > 1) {
                        return (
                          <Polyline
                            key={day.id}
                            positions={coords}
                            pathOptions={{ color: '#3498db', weight: 3, opacity: 0.7, dashArray: '5 5' }}
                          />
                        )
                      }
                      return null
                    })}
                    {/* Plot all selected activities */}
                    {selectedActivities.filter(a => a.coordinates).map((activity) => (
                      <CircleMarker
                        key={activity.id}
                        center={activity.coordinates}
                        radius={10}
                        pathOptions={{
                          color: activityConfig[activity.type]?.color || '#666',
                          fillColor: activityConfig[activity.type]?.color || '#666',
                          fillOpacity: activity.dayId ? 0.9 : 0.5,
                          weight: activity.dayId ? 3 : 1,
                        }}
                      >
                        <Popup>
                          <div className="map-popup">
                            <h4>{activityConfig[activity.type]?.icon} {activity.name}</h4>
                            <p><strong>Type:</strong> {activityConfig[activity.type]?.label}</p>
                            {activity.dayId && (
                              <p><strong>Scheduled:</strong> {tripDays.find(d => d.id === activity.dayId)?.label}</p>
                            )}
                            <p>{activity.description}</p>
                          </div>
                        </Popup>
                      </CircleMarker>
                    ))}
                  </MapContainer>
                </div>
                <div className="map-legend">
                  <span><span className="legend-dot" style={{background: '#e74c3c'}}></span> Lobster</span>
                  <span><span className="legend-dot" style={{background: '#1abc9c'}}></span> Towns</span>
                  <span><span className="legend-dot" style={{background: '#e67e22'}}></span> Foliage</span>
                  <span><span className="legend-dot" style={{background: '#9b59b6'}}></span> Drives</span>
                  <span style={{marginLeft: 'auto', color: '#666'}}>
                    Solid = scheduled, Faded = unscheduled
                  </span>
                </div>
              </div>
            )}
          </section>
        </>
      )}

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <>
          <section className="dual-grid">
            <div className="card">
              <h3>✨ The Dream</h3>
              <ul>
                {tripData.mmHighlights.map((item) => (
                  <li key={item.title}>
                    <strong>{item.title}:</strong> {item.content}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card">
              <h3>🔬 The Research</h3>
              <ul>
                {tripData.researchHighlights.map((item) => (
                  <li key={item.title}>
                    <strong>{item.title}:</strong> {item.detail}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Driving Stats Banner */}
          <section className="driving-stats">
            <div className="stat">
              <span className="stat-number">{drivingStats.totalMiles}</span>
              <span className="stat-label">Total Miles</span>
            </div>
            <div className="stat">
              <span className="stat-number">{drivingStats.totalDriveTime}</span>
              <span className="stat-label">Drive Time</span>
            </div>
            <div className="stat">
              <span className="stat-number">{drivingStats.scenicMiles}</span>
              <span className="stat-label">Scenic Miles</span>
            </div>
            <div className="stat">
              <span className="stat-number">7</span>
              <span className="stat-label">Days</span>
            </div>
          </section>

          {/* Weather Widget */}
          <section className="weather-section">
            <div className="section-heading">
              <p className="eyebrow">What to Expect</p>
              <h2>🌡️ Weather Along the Route</h2>
              <p>Late September brings "Indian Summer" warmth to the coast but sweater weather in the mountains!</p>
            </div>
            <WeatherWidget forecast={weatherForecast} />
          </section>

          <section className="map-section">
            <div className="section-heading">
              <p className="eyebrow">Route Intelligence</p>
              <h2>🗺️ Your Adventure Map</h2>
              <p>
                Core route: Boston ➜ Portland ➜ Chelsea ➜ Montreal ➜ Saratoga ➜ Albany. 
                Alternate loop drops into the Berkshires before returning to Boston.
              </p>
            </div>

            <div className="map-panel">
              <div className="map-wrapper">
                <MapContainer center={map.center} zoom={map.zoom} scrollWheelZoom={false} className="leaflet-map">
                  <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Polyline positions={map.routeCoordinates} pathOptions={coreLineOptions} />
                  <Polyline positions={map.alternativeCoordinates} pathOptions={altLineOptions} />

                  {map.stops.map((stop) => {
                    const options = getMarkerOptions(stop.category)
                    return (
                      <CircleMarker
                        key={stop.id}
                        center={stop.coords}
                        radius={stop.category === 'core' ? 10 : 8}
                        pathOptions={{
                          color: options.color,
                          fillColor: options.fillColor,
                          fillOpacity: 0.85,
                          weight: 2,
                        }}
                      >
                        <Popup>
                          <h3>{stop.name}</h3>
                          <p><strong>MMTrip:</strong> {stop.mmNote}</p>
                          <p><strong>Research:</strong> {stop.researchNote}</p>
                        </Popup>
                      </CircleMarker>
                    )
                  })}

                  {map.alternativeStops.map((stop) => (
                    <CircleMarker
                      key={stop.id}
                      center={stop.coords}
                      radius={8}
                      pathOptions={{
                        color: '#1abc9c',
                        fillColor: '#1abc9c',
                        fillOpacity: 0.7,
                        weight: 2,
                      }}
                    >
                      <Popup>
                        <h3>{stop.name}</h3>
                        <p><strong>MMTrip:</strong> {stop.mmNote}</p>
                        <p><strong>Research:</strong> {stop.researchNote}</p>
                      </Popup>
                    </CircleMarker>
                  ))}
                </MapContainer>
              </div>

              <div className="map-sidebar">
                <div className="legend">
                  <div><span className="legend-dot core" /> Core route</div>
                  <div><span className="legend-dot alt" /> Alternate loop</div>
                  <div><span className="legend-dot departure" /> Departure hub</div>
                </div>
                <ul className="map-notes">
                  {map.stops.slice(0, 4).map((stop) => (
                    <li key={stop.id}>
                      <strong>{stop.name}:</strong> {stop.mmNote}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="logistics-grid">
            {logistics.map((item) => (
              <div key={item.title} className="logistics-card">
                <div className="icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.content}</p>
              </div>
            ))}
          </section>

          {/* Photo Spots */}
          <section className="photo-section">
            <PhotoSpots spots={photoSpots} />
          </section>
        </>
      )}

      {/* 🦞 LOBSTER TAB - The Ultimate Lobster Guide */}
      {activeTab === 'lobster' && (
        <>
          {/* Live Stats Banner */}
          <section className="live-stats-banner">
            <div className="stat-item">
              <span className="stat-icon">🦞</span>
              <div className="stat-details">
                <span className="stat-value">${liveStats.lobsterPrices.dockPrice}/lb</span>
                <span className="stat-label">Dock Price (Best Deal!)</span>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">🍽️</span>
              <div className="stat-details">
                <span className="stat-value">${liveStats.lobsterPrices.restaurantAvg}</span>
                <span className="stat-label">Restaurant Avg</span>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">📈</span>
              <div className="stat-details">
                <span className="stat-value">{liveStats.lobsterPrices.seasonalNote}</span>
                <span className="stat-label">Market Trend</span>
              </div>
            </div>
          </section>

          <section className="lobster-guide">
            <div className="section-heading">
              <p className="eyebrow">🦞 Mikaela's Mission</p>
              <h2>The Ultimate Lobster Guide</h2>
              <p>Ranked by locals, tested by generations. Here's where to find the REALLY good lobster.</p>
            </div>

            {/* Lobster Spots Map */}
            <div className="tab-map-container">
              <h3>🗺️ Lobster Spots Map</h3>
              <div className="tab-map">
                <MapContainer
                  center={[43.5, -70.5]}
                  zoom={8}
                  style={{ height: '400px', width: '100%', borderRadius: '12px' }}
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {lobsterGuide.topSpots.map((spot, idx) => (
                    <CircleMarker
                      key={spot.name}
                      center={spot.coordinates}
                      radius={idx === 0 ? 12 : 10}
                      pathOptions={{
                        color: idx === 0 ? '#FFD700' : '#e74c3c',
                        fillColor: idx === 0 ? '#FFD700' : '#e74c3c',
                        fillOpacity: 0.8,
                        weight: idx === 0 ? 3 : 2,
                      }}
                    >
                      <Popup>
                        <div className="map-popup">
                          <h4>🦞 {spot.name}</h4>
                          <p><strong>📍</strong> {spot.location}</p>
                          <p><strong>⭐</strong> {spot.rating}/5 • {spot.price}</p>
                          <p><strong>Must Order:</strong> {spot.mustOrder}</p>
                          <a 
                            href={`https://www.google.com/maps/dir/?api=1&destination=${spot.coordinates[0]},${spot.coordinates[1]}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Get Directions →
                          </a>
                        </div>
                      </Popup>
                    </CircleMarker>
                  ))}
                </MapContainer>
              </div>
              <div className="map-legend">
                <span><span className="legend-dot" style={{background: '#FFD700'}}></span> #1 Pick</span>
                <span><span className="legend-dot" style={{background: '#e74c3c'}}></span> Top Lobster Spots</span>
              </div>
            </div>

            <div className="lobster-grid">
              {lobsterGuide.topSpots.map((spot, idx) => {
                const activityId = `lobster-${idx}`
                const selected = isSelected(activityId)
                return (
                <div key={spot.name} className={`lobster-card ${idx === 0 ? 'top-pick' : ''} ${selected ? 'selected' : ''}`}>
                  {idx === 0 && <div className="top-pick-badge">👑 #1 Pick</div>}
                  {selected && <div className="selected-badge">✓ Added</div>}
                  <div className="lobster-header">
                    <h3>{spot.name}</h3>
                    <div className="lobster-meta">
                      <span className="location">📍 {spot.location}</span>
                      <span className="price-level">{spot.price}</span>
                    </div>
                  </div>
                  
                  <div className="rating-section">
                    <div className="stars">
                      {'⭐'.repeat(Math.floor(spot.rating))}
                      {spot.rating % 1 >= 0.5 && '✨'}
                    </div>
                    <span className="rating-number">{spot.rating}/5</span>
                  </div>

                  <p className="spot-vibe">{spot.whySpecial}</p>

                  <div className="must-try">
                    <h4>🍽️ Must Try</h4>
                    <p className="must-order">{spot.mustOrder}</p>
                  </div>

                  <div className="pro-tip">
                    <strong>💡 Pro Tip:</strong> {spot.proTip}
                  </div>

                  <div className="wait-time">
                    <strong>⏱️ Wait:</strong> {spot.waitTime}
                  </div>

                  <div className="card-actions">
                    <a 
                      href={`https://www.google.com/maps?q=${spot.coordinates[0]},${spot.coordinates[1]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="directions-btn"
                    >
                      📍 Directions
                    </a>
                    <button 
                      className={`add-to-trip-btn ${selected ? 'added' : ''}`}
                      onClick={() => selected ? removeActivity(activityId) : addActivity({
                        id: activityId,
                        type: 'lobster',
                        name: spot.name,
                        location: spot.location,
                        coordinates: spot.coordinates,
                        rating: spot.rating,
                        price: spot.price,
                        description: spot.whySpecial,
                        details: spot.mustOrder,
                        tip: spot.proTip,
                        duration: 1.5,
                      })}
                    >
                      {selected ? '✓ Added' : '+ Add'}
                    </button>
                  </div>
                </div>
              )})}
            </div>

            <div className="lobster-tips-card">
              <h3>🎓 Lobster 101 - Ordering Like a Local</h3>
              <div className="tips-grid">
                <div className="tip-item">
                  <h4>🦞 Soft vs Hard Shell</h4>
                  <p><strong>Soft shell (shedders):</strong> Sweeter, more tender, easier to crack. Best in late summer!</p>
                  <p><strong>Hard shell:</strong> More meat, better for shipping, meatier texture.</p>
                </div>
                <div className="tip-item">
                  <h4>📏 Size Matters</h4>
                  <p><strong>Chickens (1-1.25 lb):</strong> Sweetest, most tender</p>
                  <p><strong>Quarters (1.25-1.5 lb):</strong> Perfect balance</p>
                  <p><strong>Deuces (2+ lb):</strong> Impressive but can be tougher</p>
                </div>
                <div className="tip-item">
                  <h4>🕐 Timing</h4>
                  <p>Hit lobster shacks at 11:30am or after 2pm to avoid the lunch rush. Weekdays are always better!</p>
                </div>
                <div className="tip-item">
                  <h4>💰 Best Value</h4>
                  <p>Look for "lobster roll" specials vs. "lazy lobster" (picked meat). Roll = more experience, lazy = more meat per dollar.</p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* 🍂 FOLIAGE TAB - Fall Colors Tracker */}
      {activeTab === 'foliage' && (
        <>
          <section className="foliage-tracker">
            <div className="section-heading">
              <p className="eyebrow">🍂 Autumn Magic</p>
              <h2>Live Fall Foliage Tracker</h2>
              <p>Peak predictions along your route - chase those colors!</p>
            </div>

            {/* Foliage Map */}
            <div className="tab-map-container">
              <h3>🗺️ Foliage Hotspots & Drives</h3>
              <div className="tab-map">
                <MapContainer
                  center={[44.0, -72.0]}
                  zoom={7}
                  style={{ height: '400px', width: '100%', borderRadius: '12px' }}
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {/* Foliage Prediction Locations */}
                  {foliageTracker.predictions.map((pred) => (
                    <CircleMarker
                      key={pred.location}
                      center={pred.coordinates}
                      radius={10}
                      pathOptions={{
                        color: pred.status === 'peak' ? '#e74c3c' : pred.status === 'approaching' ? '#f39c12' : '#27ae60',
                        fillColor: pred.status === 'peak' ? '#e74c3c' : pred.status === 'approaching' ? '#f39c12' : '#27ae60',
                        fillOpacity: 0.8,
                        weight: 2,
                      }}
                    >
                      <Popup>
                        <div className="map-popup">
                          <h4>🍁 {pred.location}</h4>
                          <p><strong>Status:</strong> {pred.lateSeptStatus || pred.lateSepting}</p>
                          <p><strong>Peak:</strong> {pred.expectedPeak}</p>
                          <p>{pred.notes}</p>
                        </div>
                      </Popup>
                    </CircleMarker>
                  ))}
                  {/* Best Drives */}
                  {foliageTracker.bestDrives.map((drive) => (
                    <CircleMarker
                      key={drive.name}
                      center={drive.coordinates}
                      radius={8}
                      pathOptions={{
                        color: '#9b59b6',
                        fillColor: '#9b59b6',
                        fillOpacity: 0.9,
                        weight: 2,
                      }}
                    >
                      <Popup>
                        <div className="map-popup">
                          <h4>🚗 {drive.name}</h4>
                          <p><strong>📍</strong> {drive.state} • {drive.distance}</p>
                          <p><strong>Best View:</strong> {drive.peakView}</p>
                          <p><em>{drive.note}</em></p>
                        </div>
                      </Popup>
                    </CircleMarker>
                  ))}
                </MapContainer>
              </div>
              <div className="map-legend">
                <span><span className="legend-dot" style={{background: '#e74c3c'}}></span> Peak Foliage</span>
                <span><span className="legend-dot" style={{background: '#f39c12'}}></span> Approaching Peak</span>
                <span><span className="legend-dot" style={{background: '#27ae60'}}></span> Early Color</span>
                <span><span className="legend-dot" style={{background: '#9b59b6'}}></span> Scenic Drives</span>
              </div>
            </div>

            {/* Current Conditions */}
            <div className="foliage-current">
              <h3>📊 Current Conditions (Live)</h3>
              <div className="foliage-stats-grid">
                {Object.entries(liveStats.foliageStatus).map(([region, percent]) => (
                  <div key={region} className="foliage-stat-card">
                    <div className="region-name">{region.replace(/([A-Z])/g, ' $1').trim()}</div>
                    <div className="foliage-bar">
                      <div 
                        className="foliage-fill" 
                        style={{ 
                          width: `${percent}%`,
                          backgroundColor: percent > 70 ? '#e74c3c' : percent > 40 ? '#f39c12' : '#27ae60'
                        }}
                      />
                    </div>
                    <div className="percent-label">{percent}% turned</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Predictions */}
            <div className="foliage-predictions">
              <h3>📅 Foliage Status by Location</h3>
              <div className="predictions-list">
                {foliageTracker.predictions.map((pred, idx) => {
                  const colorClass = pred.status === 'peak' ? 'peak' : 
                                    pred.status === 'approaching' ? 'near-peak' : 'early';
                  const activityId = `foliage-${idx}`
                  const selected = isSelected(activityId)
                  return (
                    <div key={pred.location} className={`prediction-card status-${colorClass} ${selected ? 'selected' : ''}`}>
                      {selected && <div className="selected-badge">✓ Added</div>}
                      <div className="pred-header">
                        <h4>{pred.location}</h4>
                        <span className="elevation">📍 {pred.elevation}</span>
                      </div>
                      <div className="pred-status">
                        {pred.status === 'peak' && '🍁🔥'}
                        {pred.status === 'approaching' && '🧡'}
                        {pred.status === 'early' && '💚'}
                        <span className="status-text">{pred.lateSeptStatus || pred.lateSepting}</span>
                      </div>
                      <p className="pred-notes">{pred.notes}</p>
                      <div className="pred-meta">
                        <span><strong>Peak:</strong> {pred.expectedPeak}</span>
                        <span><strong>Best Trees:</strong> {pred.bestTreesNow}</span>
                      </div>
                      <button 
                        className={`add-to-trip-btn ${selected ? 'added' : ''}`}
                        onClick={() => selected ? removeActivity(activityId) : addActivity({
                          id: activityId,
                          type: 'foliage',
                          name: pred.location,
                          location: pred.elevation,
                          coordinates: pred.coordinates,
                          description: pred.notes,
                          details: `Peak: ${pred.expectedPeak}`,
                          duration: 2
                        })}
                      >
                        {selected ? '✓ Added' : '+ Add'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Best Foliage Drives */}
            <div className="foliage-hotspots">
              <h3>🚗 Top Foliage Drives</h3>
              <div className="hotspots-grid">
                {foliageTracker.bestDrives.map((drive, idx) => {
                  const activityId = `drive-${idx}`
                  const selected = isSelected(activityId)
                  return (
                  <div key={drive.name} className={`hotspot-card ${selected ? 'selected' : ''}`}>
                    {selected && <div className="selected-badge">✓ Added</div>}
                    <h4>{drive.name}</h4>
                    <p className="spot-location">📍 {drive.state} • {drive.distance}</p>
                    <p className="peak-time">⏱️ Time: {drive.time}</p>
                    <p className="photo-tip">✨ {drive.peakView}</p>
                    <p className="drive-note"><em>{drive.note}</em></p>
                    <button 
                      className={`add-to-trip-btn ${selected ? 'added' : ''}`}
                      onClick={() => selected ? removeActivity(activityId) : addActivity({
                        id: activityId,
                        type: 'drive',
                        name: drive.name,
                        location: drive.state,
                        coordinates: drive.coordinates,
                        rating: drive.rating,
                        description: drive.note,
                        details: drive.peakView,
                        distance: drive.distance,
                        duration: parseFloat(drive.time) || 2,
                      })}
                    >
                      {selected ? '✓ Added' : '+ Add'}
                    </button>
                  </div>
                )})}
              </div>
            </div>

            <div className="foliage-tips-card">
              <h3>🎯 Leaf Peeping Pro Tips</h3>
              <ul>
                <li><strong>Golden Hour:</strong> Best photos 6-8am and 5-7pm when light is warm</li>
                <li><strong>After Rain:</strong> Colors pop MORE after a light rain - leaves are saturated</li>
                <li><strong>Elevation Rule:</strong> Higher = earlier. Mountains peak 1-2 weeks before valleys</li>
                <li><strong>Best Days:</strong> Overcast skies actually make colors more vibrant (no harsh shadows)</li>
                <li><strong>Weekday Wins:</strong> Popular spots like Kancamagus are PACKED on weekends</li>
              </ul>
            </div>
          </section>
        </>
      )}

      {/* ⚓ HARBOR TOWNS TAB */}
      {activeTab === 'towns' && (
        <>
          <section className="harbor-towns">
            <div className="section-heading">
              <p className="eyebrow">⚓ Coastal Charm</p>
              <h2>Quintessential Harbor Towns</h2>
              <p>The cutest, most walkable coastal villages along your route</p>
            </div>

            {/* Harbor Towns Map */}
            <div className="tab-map-container">
              <h3>🗺️ Harbor Towns Map</h3>
              <div className="tab-map">
                <MapContainer
                  center={[43.5, -70.3]}
                  zoom={8}
                  style={{ height: '400px', width: '100%', borderRadius: '12px' }}
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {harborTowns.map((town, idx) => (
                    <CircleMarker
                      key={town.name}
                      center={town.coordinates}
                      radius={idx === 0 ? 12 : 10}
                      pathOptions={{
                        color: idx === 0 ? '#3498db' : '#1abc9c',
                        fillColor: idx === 0 ? '#3498db' : '#1abc9c',
                        fillOpacity: 0.8,
                        weight: idx === 0 ? 3 : 2,
                      }}
                    >
                      <Popup>
                        <div className="map-popup">
                          <h4>⚓ {town.name}</h4>
                          <p><strong>Vibe:</strong> {town.vibe}</p>
                          <p><strong>Walkability:</strong> {town.walkability}</p>
                          <p><strong>📸 Photo Spot:</strong> {town.bestPhotoSpot}</p>
                          <p><strong>🅿️</strong> {town.parking}</p>
                          <a 
                            href={`https://www.google.com/maps/dir/?api=1&destination=${town.coordinates[0]},${town.coordinates[1]}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Get Directions →
                          </a>
                        </div>
                      </Popup>
                    </CircleMarker>
                  ))}
                </MapContainer>
              </div>
              <div className="map-legend">
                <span><span className="legend-dot" style={{background: '#3498db'}}></span> Must Visit</span>
                <span><span className="legend-dot" style={{background: '#1abc9c'}}></span> Harbor Towns</span>
              </div>
            </div>

            <div className="towns-grid">
              {harborTowns.map((town, idx) => {
                const activityId = `town-${idx}`
                const selected = isSelected(activityId)
                return (
                <div key={town.name} className={`town-card ${idx === 0 ? 'featured' : ''} ${selected ? 'selected' : ''}`}>
                  {idx === 0 && <div className="featured-badge">⭐ Must Visit</div>}
                  {selected && <div className="selected-badge">✓ Added</div>}
                  <div className="town-header">
                    <h3>{town.name}</h3>
                    <span className="state-badge">{town.state}</span>
                  </div>
                  
                  <p className="town-vibe">{town.vibe} • Pop. {town.population}</p>

                  <div className="town-activities">
                    <h4>Must Do</h4>
                    <ul>
                      {town.mustDo.slice(0, 3).map((activity, i) => (
                        <li key={i}>{activity}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="town-meta">
                    <div className="walkability">
                      <strong>🚶 Walkability:</strong> {town.walkability}
                    </div>
                    <div className="parking-tip">
                      <strong>🅿️ Parking:</strong> {town.parking}
                    </div>
                  </div>

                  <p className="town-mood"><em>"{town.mood}"</em></p>

                  <div className="card-actions">
                    <button 
                      className={`add-to-trip-btn ${selected ? 'added' : ''}`}
                      onClick={() => selected ? removeActivity(activityId) : addActivity({
                        id: activityId,
                        type: 'town',
                        name: town.name,
                        location: town.state,
                        coordinates: town.coordinates,
                        rating: town.rating,
                        description: town.vibe,
                        details: town.mustDo.join(', '),
                        photoSpot: town.bestPhotoSpot,
                        duration: 2.5,
                      })}
                    >
                      {selected ? '✓ Added' : '+ Add'}
                    </button>
                  </div>
                </div>
              )})}
            </div>

            <div className="harbor-tips-card">
              <h3>🚗 Small Town Navigation Tips</h3>
              <div className="tips-grid">
                <div className="tip-item">
                  <h4>🅿️ Parking Strategy</h4>
                  <p>Arrive before 10am or after 3pm. Many towns have free parking on side streets 2-3 blocks from Main St.</p>
                </div>
                <div className="tip-item">
                  <h4>🚶 Walking &gt; Driving</h4>
                  <p>Park once and walk. Most harbor villages are under 1 mile end-to-end. You'll find more hidden gems on foot!</p>
                </div>
                <div className="tip-item">
                  <h4>💵 Cash is King</h4>
                  <p>Many small shops, ice cream stands, and lobster shacks are cash-only. Hit an ATM before exploring.</p>
                </div>
                <div className="tip-item">
                  <h4>🌅 Magic Hours</h4>
                  <p>Harbor towns are most photogenic at sunrise (empty!) and sunset (golden light on boats).</p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Itinerary Tab */}
      {activeTab === 'itinerary' && (
        <section className="timeline">
          <h2>📅 Day-by-Day Plan</h2>
          <div className="timeline-container">
            {itinerary.map((day) => (
              <div key={day.day} className="timeline-item">
                <div className="timeline-marker">{day.day}</div>
                <div className="timeline-content">
                  <div className="day-header">
                    <h3>{day.title}</h3>
                    <span className="location-tag">📍 {day.location}</span>
                  </div>
                  <div className="day-details">
                    {day.driveTime && (
                      <p className="drive-time">🚗 <strong>Drive:</strong> {day.driveTime}</p>
                    )}
                    <p className="description">{day.details}</p>
                    {day.stops && (
                      <div className="stops-list">
                        <h4>Key Stops</h4>
                        <ul>
                          {day.stops.map((stop, idx) => (
                            <li key={idx}><strong>{stop.name}:</strong> {stop.highlight}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {day.activities && (
                      <div className="activities-list">
                        <h4>Activities</h4>
                        <ul>
                          {day.activities.map((activity, idx) => (
                            <li key={idx}>{activity}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {day.dining && (
                      <div className="dining-info"><strong>🍽️ Dining:</strong> {day.dining}</div>
                    )}
                    {day.stay && (
                      <div className="stay-info"><strong>🛏️ Stay:</strong> {day.stay}</div>
                    )}
                    {day.note && (
                      <p className="note"><em>💡 {day.note}</em></p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Planning Tab */}
      {activeTab === 'planning' && (
        <>
          {/* Budget Calculator */}
          <section className="budget-wrapper">
            <BudgetCalculator estimates={budgetEstimate} />
          </section>

          {/* Emergency Contacts */}
          <section className="emergency-section">
            <h3>🆘 Emergency Contacts</h3>
            <div className="emergency-grid">
              {emergencyContacts.map((contact) => (
                <div key={contact.name} className="emergency-card">
                  <h4>{contact.name}</h4>
                  <a href={`tel:${contact.phone}`} className="phone">{contact.phone}</a>
                  <p className="contact-note">{contact.note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Border Checklist */}
          <section className="border-section">
            <div className="card border-card">
              <h3>🛂 Canada Border Checklist</h3>
              <p className="warning">⚠️ Missing documents = denied entry!</p>
              <ul className="border-list">
                {fieldNotes.borderChecklist.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="insights">
            <h2>🧠 Key Operational Insights</h2>
            <div className="insights-grid">
              {keyInsights.map((insight) => (
                <div key={insight.title} className="card">
                  <h3>{insight.title}</h3>
                  <p>{insight.detail}</p>
                  {insight.actions && (
                    <ul>
                      {insight.actions.map((action, idx) => (
                        <li key={idx}>{action}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="alternatives">
            <h2>🔀 Strategic Alternatives</h2>
            <div className="cards-grid">
              {alternatives.map((alt) => (
                <div key={alt.title || alt.content} className="card">
                  <h3>{alt.title}</h3>
                  {alt.route && <p className="route-path"><strong>Route:</strong> {alt.route}</p>}
                  {alt.pros && <p><strong>Pros:</strong> {alt.pros}</p>}
                  {alt.cons && <p><strong>Cons:</strong> {alt.cons}</p>}
                  {alt.content && <p>{alt.content}</p>}
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Food Tab */}
      {activeTab === 'food' && (
        <>
          <ReservationTracker reservations={reservations} />

          <section className="field-notes">
            <div className="card">
              <h3>🦞 Lobster Shack Intel</h3>
              <ul>
                {fieldNotes.lobsterShacks.map((shack) => (
                  <li key={shack.name}>
                    <strong>{shack.name} ({shack.location}):</strong> {shack.intel}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card">
              <h3>⛵ Harbor Town Vibes</h3>
              <ul>
                {fieldNotes.harborTowns.map((town) => (
                  <li key={town.name}>
                    <strong>{town.name}:</strong> {town.highlight}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Playlist Section */}
          <section className="playlist-section">
            <div className="card playlist-card">
              <h3>🎵 Road Trip Playlist</h3>
              <p>{playlist.description}</p>
              <iframe
                style={{ borderRadius: '12px' }}
                src={playlist.embedUrl}
                width="100%"
                height="152"
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            </div>
          </section>
        </>
      )}

      {/* Packing Tab */}
      {activeTab === 'packing' && (
        <>
          <section className="packing-wrapper">
            <div className="section-heading">
              <p className="eyebrow">Don't forget anything!</p>
              <h2>🧳 Interactive Packing List</h2>
              <p>Check items as you pack. Progress saves automatically!</p>
            </div>
            <PackingChecklist checklist={packingChecklist} />
          </section>

          <section className="field-notes packing-tips">
            <div className="card">
              <h3>👗 Pack Like a Pro</h3>
              <ul>
                {fieldNotes.packingList.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </section>
        </>
      )}

      <footer>
        <div className="footer-content">
          <p className="footer-love">Made with 💕 for Tere & Mikaela</p>
          <p>MMTrip.txt + DeepResearch.txt • Updated {new Date().getFullYear()}</p>
          <button className="print-btn" onClick={() => window.print()}>
            🖨️ Print Itinerary
          </button>
        </div>
      </footer>
      </div> {/* End main-content */}
    </div>
  )
}

export default App
