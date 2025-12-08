// ═══════════════════════════════════════════════════════════════════════════════
// REAL-TIME DATA SERVICE
// Weather, hours, traffic, foliage reports
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Weather Service - Open-Meteo (free, no API key)
 */
class WeatherService {
  constructor() {
    this.endpoint = 'https://api.open-meteo.com/v1/forecast';
    this.cache = new Map();
    this.cacheDuration = 1800000; // 30 minutes
  }
  
  /**
   * Get weather forecast for location
   */
  async getForecast(lat, lon, days = 7) {
    const cacheKey = `${lat},${lon},${days}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheDuration) {
      return cached.data;
    }
    
    try {
      const params = new URLSearchParams({
        latitude: lat.toFixed(4),
        longitude: lon.toFixed(4),
        daily: 'temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode',
        temperature_unit: 'fahrenheit',
        timezone: 'America/New_York',
        forecast_days: days.toString()
      });
      
      const response = await fetch(`${this.endpoint}?${params}`);
      if (!response.ok) throw new Error('Weather API error');
      
      const data = await response.json();
      const forecast = this.parseForecast(data);
      
      this.cache.set(cacheKey, {
        data: forecast,
        timestamp: Date.now()
      });
      
      return forecast;
      
    } catch (error) {
      console.error('Weather fetch error:', error);
      return null;
    }
  }
  
  /**
   * Parse weather API response
   */
  parseForecast(data) {
    const daily = data.daily;
    const days = [];
    
    for (let i = 0; i < daily.time.length; i++) {
      days.push({
        date: daily.time[i],
        tempHigh: Math.round(daily.temperature_2m_max[i]),
        tempLow: Math.round(daily.temperature_2m_min[i]),
        precipProb: daily.precipitation_probability_max[i],
        condition: this.getCondition(daily.weathercode[i]),
        weatherCode: daily.weathercode[i],
        goodForOutdoor: daily.precipitation_probability_max[i] < 30 && daily.temperature_2m_max[i] > 50
      });
    }
    
    return days;
  }
  
  /**
   * Convert weather code to condition
   */
  getCondition(code) {
    const conditions = {
      0: 'Clear',
      1: 'Mostly Clear',
      2: 'Partly Cloudy',
      3: 'Cloudy',
      45: 'Foggy',
      48: 'Foggy',
      51: 'Light Drizzle',
      53: 'Drizzle',
      55: 'Heavy Drizzle',
      61: 'Light Rain',
      63: 'Rain',
      65: 'Heavy Rain',
      71: 'Light Snow',
      73: 'Snow',
      75: 'Heavy Snow',
      77: 'Snow Showers',
      80: 'Rain Showers',
      81: 'Rain Showers',
      82: 'Heavy Rain Showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm',
      99: 'Thunderstorm'
    };
    return conditions[code] || 'Unknown';
  }
  
  /**
   * Check if weather is suitable for activity
   */
  isGoodFor(weatherData, activityType) {
    if (!weatherData) return null;
    
    if (activityType === 'hike' || activityType === 'viewpoint') {
      return weatherData.precipProb < 30 && weatherData.tempHigh > 45;
    }
    
    if (activityType === 'beach') {
      return weatherData.precipProb < 20 && weatherData.tempHigh > 65;
    }
    
    if (activityType === 'drive') {
      return weatherData.condition !== 'Heavy Rain' && weatherData.condition !== 'Heavy Snow';
    }
    
    return true;
  }
}

/**
 * Hours Service - Check if places are open
 */
class HoursService {
  constructor() {
    this.overpassEndpoint = 'https://overpass-api.de/api/interpreter';
  }
  
  /**
   * Get real hours for a place from OSM
   */
  async getHours(osmId) {
    try {
      const query = `
        [out:json];
        (
          node(${osmId});
          way(${osmId});
        );
        out tags;
      `;
      
      const response = await fetch(this.overpassEndpoint, {
        method: 'POST',
        body: query
      });
      
      if (!response.ok) throw new Error('Hours fetch failed');
      
      const data = await response.json();
      if (data.elements.length === 0) return null;
      
      const element = data.elements[0];
      return this.parseOpeningHours(element.tags?.opening_hours);
      
    } catch (error) {
      console.error('Hours fetch error:', error);
      return null;
    }
  }
  
  /**
   * Parse opening_hours tag (simplified)
   */
  parseOpeningHours(hoursString) {
    if (!hoursString) return null;
    
    // This is simplified - real implementation would use opening_hours.js
    // For now, return raw string
    return {
      raw: hoursString,
      // TODO: Parse into structured format
    };
  }
  
  /**
   * Check if open at specific time
   */
  isOpenAt(hours, datetime) {
    if (!hours || !hours.raw) return null;
    
    // Simplified check
    if (hours.raw === '24/7') return true;
    if (hours.raw.includes('closed')) return false;
    
    // Default to "probably open" during normal hours
    const hour = datetime.getHours();
    return hour >= 8 && hour <= 20;
  }
}

/**
 * Foliage Report Service
 */
class FoliageService {
  constructor() {
    this.baseData = this.initFoliageData();
  }
  
  /**
   * Initialize foliage progression data
   */
  initFoliageData() {
    return {
      // Peak dates by region and elevation
      regions: {
        'northern_maine': { peak: '2025-09-25', duration: 14 },
        'white_mountains': { peak: '2025-09-28', duration: 14 },
        'southern_vermont': { peak: '2025-10-05', duration: 14 },
        'montreal': { peak: '2025-09-30', duration: 10 },
        'adirondacks': { peak: '2025-10-01', duration: 14 },
        'boston': { peak: '2025-10-15', duration: 10 }
      },
      elevationBonus: 7 // Days earlier per 1000ft elevation
    };
  }
  
  /**
   * Get foliage status for location and date
   */
  getFoliageStatus(location, date, elevation = 0) {
    const region = this.inferRegion(location);
    const regionData = this.baseData.regions[region];
    
    if (!regionData) return { status: 'unknown', percentage: null };
    
    // Adjust peak date for elevation
    const elevationDays = Math.floor(elevation / 1000) * this.baseData.elevationBonus;
    const peakDate = new Date(regionData.peak);
    peakDate.setDate(peakDate.getDate() - elevationDays);
    
    const checkDate = new Date(date);
    const daysDiff = Math.floor((checkDate - peakDate) / (1000 * 60 * 60 * 24));
    
    let status, percentage;
    
    if (daysDiff < -14) {
      status = 'minimal';
      percentage = 10 + Math.max(0, 14 + daysDiff) * 3;
    } else if (daysDiff < -7) {
      status = 'early';
      percentage = 20 + Math.abs(daysDiff + 7) * 5;
    } else if (daysDiff >= -7 && daysDiff <= 7) {
      status = 'peak';
      percentage = 70 + (7 - Math.abs(daysDiff)) * 3;
    } else if (daysDiff <= 14) {
      status = 'late';
      percentage = 70 - (daysDiff - 7) * 5;
    } else {
      status = 'past_peak';
      percentage = Math.max(10, 70 - (daysDiff - 14) * 3);
    }
    
    return {
      status,
      percentage: Math.round(Math.min(Math.max(percentage, 0), 100)),
      peakDate: peakDate.toISOString().split('T')[0],
      daysToPeak: -daysDiff,
      region
    };
  }
  
  /**
   * Infer region from location string
   */
  inferRegion(location) {
    const loc = location.toLowerCase();
    if (loc.includes('boston') || loc.includes('ma')) return 'boston';
    if (loc.includes('portland') || loc.includes('maine') || loc.includes('me')) return 'northern_maine';
    if (loc.includes('vermont') || loc.includes('vt')) return 'southern_vermont';
    if (loc.includes('white') || loc.includes('nh')) return 'white_mountains';
    if (loc.includes('montreal') || loc.includes('qc')) return 'montreal';
    if (loc.includes('adirondack') || loc.includes('placid')) return 'adirondacks';
    return 'southern_vermont';
  }
  
  /**
   * Get foliage recommendations
   */
  getRecommendations(date) {
    const recommendations = [];
    
    for (const [region, data] of Object.entries(this.baseData.regions)) {
      const status = this.getFoliageStatus(region, date);
      
      if (status.percentage >= 70) {
        recommendations.push({
          region: region.replace(/_/g, ' '),
          status: status.status,
          percentage: status.percentage,
          priority: status.percentage
        });
      }
    }
    
    return recommendations.sort((a, b) => b.priority - a.priority);
  }
}

/**
 * Traffic Service (simplified)
 */
class TrafficService {
  /**
   * Estimate traffic delay
   */
  estimateDelay(from, to, datetime) {
    const dayOfWeek = datetime.getDay();
    const hour = datetime.getHours();
    
    // Weekend vs weekday
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    // Peak hours
    const isMorningRush = hour >= 7 && hour <= 9;
    const isEveningRush = hour >= 16 && hour <= 18;
    const isPeak = (isMorningRush || isEveningRush) && !isWeekend;
    
    // Fall foliage season multiplier (late September - mid October)
    const month = datetime.getMonth();
    const isFoliageSeason = month === 8 || month === 9; // Sept-Oct
    
    let delayFactor = 1.0;
    
    if (isPeak) delayFactor *= 1.3;
    if (isFoliageSeason && isWeekend) delayFactor *= 1.4;
    if (isFoliageSeason && !isWeekend) delayFactor *= 1.15;
    
    // Popular routes have more delay
    const route = `${from}-${to}`.toLowerCase();
    if (route.includes('kancamagus') && isFoliageSeason) delayFactor *= 1.5;
    if (route.includes('route 1') && isWeekend) delayFactor *= 1.2;
    
    return {
      factor: delayFactor,
      description: this.getTrafficDescription(delayFactor),
      recommendation: this.getTrafficRecommendation(delayFactor)
    };
  }
  
  getTrafficDescription(factor) {
    if (factor >= 1.4) return 'Heavy traffic expected';
    if (factor >= 1.2) return 'Moderate traffic';
    return 'Light traffic';
  }
  
  getTrafficRecommendation(factor) {
    if (factor >= 1.4) return 'Consider leaving earlier or later to avoid peak';
    if (factor >= 1.2) return 'Build in extra time';
    return null;
  }
}

/**
 * Unified Real-Time Data Service
 */
export class RealTimeDataService {
  constructor() {
    this.weather = new WeatherService();
    this.hours = new HoursService();
    this.foliage = new FoliageService();
    this.traffic = new TrafficService();
  }
  
  /**
   * Get comprehensive data for an activity
   */
  async enrichActivity(activity, date) {
    const enriched = { ...activity };
    
    // Get weather if coordinates available
    if (activity.coordinates) {
      const forecast = await this.weather.getForecast(
        activity.coordinates[0],
        activity.coordinates[1]
      );
      
      if (forecast) {
        const dayForecast = forecast.find(f => f.date === date) || forecast[0];
        enriched.weather = dayForecast;
        enriched.weatherSuitable = this.weather.isGoodFor(dayForecast, activity.type);
      }
    }
    
    // Get foliage status
    if (activity.tags?.includes('foliage') || activity.type === 'viewpoint') {
      enriched.foliage = this.foliage.getFoliageStatus(
        activity.location,
        date,
        activity.elevation
      );
    }
    
    // Get hours if OSM ID available
    if (activity.sourceId && activity.source === 'openstreetmap') {
      const hours = await this.hours.getHours(activity.sourceId);
      if (hours) {
        enriched.hours = hours;
      }
    }
    
    return enriched;
  }
  
  /**
   * Get day summary with all real-time data
   */
  async getDaySummary(day, activities) {
    const summary = {
      date: day.date,
      location: day.location,
      activities: []
    };
    
    // Enrich all activities
    for (const activity of activities) {
      const enriched = await this.enrichActivity(activity, day.date);
      summary.activities.push(enriched);
    }
    
    // Get weather for day location
    if (day.coordinates) {
      const forecast = await this.weather.getForecast(
        day.coordinates[0],
        day.coordinates[1]
      );
      summary.weather = forecast?.find(f => f.date === day.date) || forecast?.[0];
    }
    
    // Get foliage recommendation
    const foliageRecs = this.foliage.getRecommendations(day.date);
    summary.foliageRecommendations = foliageRecs;
    
    // Analyze best conditions
    summary.outdoorReady = summary.weather?.goodForOutdoor || null;
    summary.foliagePrime = foliageRecs.some(r => r.percentage >= 75);
    
    return summary;
  }
  
  /**
   * Get alerts for a day
   */
  async getAlerts(day, activities) {
    const alerts = [];
    
    // Weather alerts
    const summary = await this.getDaySummary(day, activities);
    
    if (summary.weather) {
      if (summary.weather.precipProb > 70) {
        alerts.push({
          type: 'weather',
          severity: 'warning',
          message: `High chance of rain (${summary.weather.precipProb}%)`,
          affectsActivities: activities.filter(a => 
            a.weatherSensitivity === 'outdoor'
          ).map(a => a.name)
        });
      }
      
      if (summary.weather.tempHigh < 40) {
        alerts.push({
          type: 'weather',
          severity: 'info',
          message: `Cold day (high of ${summary.weather.tempHigh}°F)`,
          recommendation: 'Pack warm layers'
        });
      }
    }
    
    // Foliage alerts
    if (summary.foliagePrime) {
      alerts.push({
        type: 'foliage',
        severity: 'info',
        message: 'Peak foliage conditions!',
        recommendation: 'Expect crowds at popular viewpoints'
      });
    }
    
    // Traffic alerts
    if (day.isDriveDay) {
      const datetime = new Date(day.date);
      datetime.setHours(10); // Assume 10am departure
      
      const trafficInfo = this.traffic.estimateDelay(
        day.from,
        day.to,
        datetime
      );
      
      if (trafficInfo.factor >= 1.3) {
        alerts.push({
          type: 'traffic',
          severity: 'warning',
          message: trafficInfo.description,
          recommendation: trafficInfo.recommendation
        });
      }
    }
    
    return alerts;
  }
}

// Singleton
export const realTimeData = new RealTimeDataService();
