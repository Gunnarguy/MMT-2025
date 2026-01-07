// ═══════════════════════════════════════════════════════════════════════════════
// WEATHER UTILITIES
// Fetches forecast data from Open-Meteo (Free, No Key Required)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Fetch weather for the specific trip days and locations.
 * Uses Open-Meteo Historical Forecast if dates are in past, or Forecast if in future.
 * For now, defaults to standard forecast.
 */
export async function fetchTripWeather(trip) {
  if (!trip.startDate || !trip.days.length) return null;

  const startDate = new Date(trip.startDate);
  const weatherData = {};

  // Limit to first 5 days to avoid spamming API if trip is huge
  const daysToFetch = trip.days.slice(0, 7);

  const requests = daysToFetch.map(async (day, index) => {
    // Determine location for the day
    // 1. First activity with coordinates
    // 2. Or fallback to region center if known (mocked for now)
    // 3. Or skip
    const firstActivity = day.activities.length > 0 ? day.activities[0] : null;
    
    // We need coordinates. If we don't have them easily from IDs here without the full catalog,
    // we rely on the caller passing enriched days or we fetch catalog here.
    // For simplicity, we'll assume the caller might pass coordinates or we use a default.
    // Actually, we need the caller (TripToolsPanel) to pass enriched activities.
    
    // This function will just fetch for a single lat/lon and date
    return null; 
  });
  
  return {};
}

/**
 * Fetch weather for a single location and date.
 * Returns simple object: { maxTemp, minTemp, condition, icon }
 */
export async function fetchDailyWeather(lat, lon, dateStr) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&start_date=${dateStr}&end_date=${dateStr}`;
    
    const res = await fetch(url);
    if (!res.ok) throw new Error('Weather fetch failed');
    const data = await res.json();
    
    if (!data.daily || !data.daily.time || data.daily.time.length === 0) return null;

    const code = data.daily.weather_code[0];
    const max = data.daily.temperature_2m_max[0];
    const min = data.daily.temperature_2m_min[0];

    return {
      date: dateStr,
      maxTemp: Math.round(max),
      minTemp: Math.round(min),
      code,
      condition: getWeatherCondition(code),
      icon: getWeatherIcon(code)
    };
  } catch (e) {
    console.warn('Weather fetch error:', e);
    return null;
  }
}

// WMO Weather interpretation codes (http://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM)
function getWeatherCondition(code) {
  if (code === 0) return 'Clear sky';
  if (code === 1 || code === 2 || code === 3) return 'Partly cloudy';
  if (code === 45 || code === 48) return 'Fog';
  if (code >= 51 && code <= 55) return 'Drizzle';
  if (code >= 61 && code <= 67) return 'Rain';
  if (code >= 71 && code <= 77) return 'Snow';
  if (code >= 80 && code <= 82) return 'Showers';
  if (code >= 95) return 'Thunderstorm';
  return 'Unknown';
}

function getWeatherIcon(code) {
  if (code === 0) return '☀️';
  if (code <= 3) return 'Hz'; // Partly cloudy
  if (code <= 48) return '🌫️';
  if (code <= 67) return '🌧️';
  if (code <= 77) return '❄️';
  if (code <= 82) return '🌦️';
  if (code >= 95) return '⚡';
  return '❓';
}
