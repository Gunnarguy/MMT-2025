// ═══════════════════════════════════════════════════════════════════════════════
// ROUTE UTILITIES
// Driving route calculations using OSRM (free, no API key needed)
// ═══════════════════════════════════════════════════════════════════════════════

// Cache for route calculations
const routeCache = new Map();

/**
 * Calculate distance between two coordinates (Haversine formula)
 * @returns distance in miles
 */
export function calculateDistance(coord1, coord2) {
  const R = 3959; // Earth's radius in miles
  const dLat = (coord2[0] - coord1[0]) * Math.PI / 180;
  const dLon = (coord2[1] - coord1[1]) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(coord1[0] * Math.PI / 180) * Math.cos(coord2[0] * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

/**
 * Estimate drive time (rough: 40-45 mph average with scenic stops)
 */
export function estimateDriveTime(miles) {
  const hours = miles / 40;
  if (hours < 1) return `${Math.round(hours * 60)} min`;
  return `${hours.toFixed(1)} hrs`;
}

/**
 * Format seconds into human-readable duration
 */
export function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.round((seconds % 3600) / 60);
  
  if (hours === 0) return `${minutes} min`;
  if (minutes === 0) return `${hours} hr`;
  return `${hours} hr ${minutes} min`;
}

/**
 * Fetch real driving route from OSRM API
 * @returns actual road-following polyline, distance, and duration
 */
export async function fetchDrivingRoute(startCoords, endCoords) {
  const cacheKey = `${startCoords.join(',')}-${endCoords.join(',')}`;
  
  // Check cache first
  if (routeCache.has(cacheKey)) {
    return routeCache.get(cacheKey);
  }
  
  try {
    // OSRM expects [lng, lat] not [lat, lng]
    const start = `${startCoords[1]},${startCoords[0]}`;
    const end = `${endCoords[1]},${endCoords[0]}`;
    
    const response = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${start};${end}?overview=full&geometries=geojson&steps=true`
    );
    
    if (!response.ok) throw new Error('Route fetch failed');
    
    const data = await response.json();
    
    if (data.code !== 'Ok' || !data.routes.length) {
      throw new Error('No route found');
    }
    
    const route = data.routes[0];
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
    };
    
    // Cache the result
    routeCache.set(cacheKey, result);
    return result;
    
  } catch (error) {
    console.error('Route calculation error:', error);
    // Fallback to straight-line estimate
    const straightDist = calculateDistance(startCoords, endCoords);
    return {
      coordinates: [startCoords, endCoords],
      distance: straightDist * 1609.344,
      duration: (straightDist / 45) * 3600, // Assume 45mph
      distanceMiles: straightDist.toFixed(1),
      durationMinutes: Math.round((straightDist / 45) * 60),
      durationFormatted: estimateDriveTime(straightDist),
      steps: [],
      isFallback: true,
    };
  }
}

/**
 * Fetch routes for an entire day's itinerary
 * @returns array of route segments with full details
 */
export async function fetchDayRoutes(activities) {
  const coords = activities.filter(a => a.coordinates).map(a => ({
    coords: a.coordinates,
    name: a.name,
  }));
  
  if (coords.length < 2) return [];
  
  const routes = [];
  for (let i = 0; i < coords.length - 1; i++) {
    const route = await fetchDrivingRoute(coords[i].coords, coords[i + 1].coords);
    routes.push({
      from: coords[i].name,
      to: coords[i + 1].name,
      ...route,
    });
  }
  
  return routes;
}

/**
 * Activity type configuration
 */
export const activityConfig = {
  lobster: { icon: '🦞', color: '#e74c3c', label: 'Lobster Spot' },
  town: { icon: '⚓', color: '#1abc9c', label: 'Harbor Town' },
  foliage: { icon: '🍁', color: '#e67e22', label: 'Foliage Spot' },
  drive: { icon: '🚗', color: '#9b59b6', label: 'Scenic Drive' },
  landmark: { icon: '📸', color: '#3498db', label: 'Landmark' },
  lodging: { icon: '🏨', color: '#f39c12', label: 'Lodging' },
  hike: { icon: '🥾', color: '#27ae60', label: 'Hiking' },
  cafe: { icon: '☕', color: '#795548', label: 'Cafe' },
  museum: { icon: '🖼️', color: '#607d8b', label: 'Museum' },
  view: { icon: '🌄', color: '#9c27b0', label: 'Scenic View' },
  'scenic-drive': { icon: '🚗', color: '#9b59b6', label: 'Scenic Drive' }
};
