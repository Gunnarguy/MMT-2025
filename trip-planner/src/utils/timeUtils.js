// ═══════════════════════════════════════════════════════════════════════════════
// TIME & SCHEDULING UTILITIES
// Handles time formatting, addition, and auto-scheduling logic
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Parses "HH:MM" string to total minutes from midnight
 */
export function parseTimeToMinutes(timeString) {
  if (!timeString) return null;
  const [h, m] = timeString.split(':').map((v) => Number(v));
  if (!Number.isFinite(h) || !Number.isFinite(m)) return null;
  return h * 60 + m;
}

/**
 * Formats total minutes to "HH:MM" string
 */
export function formatMinutesToTime(minutes) {
  if (!Number.isFinite(minutes)) return '';
  const safe = ((minutes % (24 * 60)) + (24 * 60)) % (24 * 60);
  const h = Math.floor(safe / 60);
  const m = Math.round(safe % 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/**
 * Adds minutes to a "HH:MM" time string
 */
export function addMinutesToTime(timeString, minutesToAdd) {
  const base = parseTimeToMinutes(timeString);
  if (!Number.isFinite(base)) return '';
  return formatMinutesToTime(base + minutesToAdd);
}

/**
 * Calculates end time based on start time and duration (hours)
 */
export function computeEndTime(startTime, durationHours) {
  const minutes = Number(durationHours) * 60;
  if (!Number.isFinite(minutes)) return '';
  return addMinutesToTime(startTime, minutes);
}

// ═══════════════════════════════════════════════════════════════════════════════
// TRAVEL TIME ESTIMATION (Haversine)
// ═══════════════════════════════════════════════════════════════════════════════

function toRad(value) {
  return (value * Math.PI) / 180;
}

/**
 * Calculate straight-line distance in miles between two coordinates
 * [lat, lon]
 */
function calculateDistanceMiles(coord1, coord2) {
  if (!coord1 || !coord2) return 0;
  const [lat1, lon1] = coord1;
  const [lat2, lon2] = coord2;

  const R = 3958.8; // Earth radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Estimate travel time in minutes based on distance and assumed average speed
 */
function estimateTravelMinutes(miles) {
  if (!miles) return 0;
  // Assume average speed of 40mph for scenic/mixed driving + 10 mins overhead
  const speedMph = 40;
  const driveTime = (miles / speedMph) * 60;
  return Math.round(driveTime + 10); // Add 10 min base overhead
}

// ═══════════════════════════════════════════════════════════════════════════════
// AUTO-SCHEDULER
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Builds a schedule considering travel time between activities.
 * If coordinates are available, uses distance-based travel time.
 * Otherwise falls back to fixed buffer.
 */
export function buildAutoSchedule({ activities, startTime = '09:00', bufferMinutes = 20 }) {
  const schedule = {};
  let cursor = parseTimeToMinutes(startTime) ?? 9 * 60;
  let prevCoords = null;

  activities.forEach((activity, index) => {
    // 1. Calculate Travel Time from previous stop
    let travelBuffer = bufferMinutes;

    if (prevCoords && activity.coordinates) {
      const miles = calculateDistanceMiles(prevCoords, activity.coordinates);
      // Only use calculated travel time if it's significant, otherwise min buffer
      const estimatedTravel = estimateTravelMinutes(miles);
      travelBuffer = Math.max(estimatedTravel, 15); // Minimum 15 mins to park/walk
    } else if (index === 0) {
      travelBuffer = 0; // No buffer for first item
    }

    // Apply buffer/travel from previous item
    if (index > 0) {
      cursor += travelBuffer;
    }

    // 2. Schedule Activity
    const durationHours = Number(activity.duration) || 1.5;
    const activityStart = formatMinutesToTime(cursor);
    
    schedule[activity.id] = {
      startTime: activityStart,
      duration: durationHours,
      bufferMinutes: travelBuffer,
      travelMiles: prevCoords && activity.coordinates ? calculateDistanceMiles(prevCoords, activity.coordinates).toFixed(1) : null
    };

    // 3. Advance Cursor
    const durationMinutes = durationHours * 60;
    cursor += durationMinutes;

    // 4. Update Previous Coords
    if (activity.coordinates) {
      prevCoords = activity.coordinates;
    }
  });

  return schedule;
}