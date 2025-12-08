// ═══════════════════════════════════════════════════════════════════════════════
// RICH ACTIVITY SCHEMA
// Complete metadata for granular trip planning
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Activity Type Definitions
 */
export const ActivityType = {
  RESTAURANT: 'restaurant',
  LOBSTER: 'lobster',
  CAFE: 'cafe',
  BAR: 'bar',
  ATTRACTION: 'attraction',
  MUSEUM: 'museum',
  HIKE: 'hike',
  VIEWPOINT: 'viewpoint',
  BEACH: 'beach',
  TOWN: 'town',
  PARK: 'park',
  SHOPPING: 'shopping',
  DRIVE: 'scenic-drive',
  LODGING: 'lodging',
  ACTIVITY: 'activity',
  ENTERTAINMENT: 'entertainment',
};

/**
 * Price Range
 */
export const PriceRange = {
  FREE: 0,
  BUDGET: 1,      // $
  MODERATE: 2,    // $$
  UPSCALE: 3,     // $$$
  LUXURY: 4,      // $$$$
};

/**
 * Time of Day Preferences
 */
export const TimeOfDay = {
  EARLY_MORNING: 'early_morning',  // 6am-9am
  MORNING: 'morning',               // 9am-12pm
  AFTERNOON: 'afternoon',           // 12pm-5pm
  EVENING: 'evening',               // 5pm-8pm
  NIGHT: 'night',                   // 8pm-late
  ANYTIME: 'anytime',
};

/**
 * Weather Sensitivity
 */
export const WeatherSensitivity = {
  INDOOR: 'indoor',           // Not affected
  COVERED: 'covered',         // Mostly protected
  FLEXIBLE: 'flexible',       // Can adapt
  OUTDOOR_REQUIRED: 'outdoor', // Needs good weather
};

/**
 * Crowd Level Expectations
 */
export const CrowdLevel = {
  QUIET: 'quiet',
  MODERATE: 'moderate',
  BUSY: 'busy',
  VERY_BUSY: 'very_busy',
};

/**
 * Physical Difficulty
 */
export const Difficulty = {
  EASY: 'easy',
  MODERATE: 'moderate',
  CHALLENGING: 'challenging',
  STRENUOUS: 'strenuous',
};

/**
 * Complete Activity Schema
 */
export class Activity {
  constructor(data) {
    // Core identification
    this.id = data.id || `activity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    this.name = data.name;
    this.type = data.type;
    this.category = data.category || this.type;
    
    // Location
    this.location = data.location;
    this.address = data.address || null;
    this.coordinates = data.coordinates || null; // [lat, lng]
    this.region = data.region || null;
    this.neighborhood = data.neighborhood || null;
    
    // Timing & Duration
    this.duration = data.duration || null; // minutes
    this.durationMin = data.durationMin || data.duration;
    this.durationMax = data.durationMax || data.duration;
    this.timeOfDay = data.timeOfDay || TimeOfDay.ANYTIME;
    this.bestTime = data.bestTime || null;
    
    // Operating hours (day of week: [open, close] in 24hr)
    this.hours = data.hours || null;
    this.hoursNote = data.hoursNote || null;
    this.seasonal = data.seasonal || false;
    this.seasonalDates = data.seasonalDates || null;
    
    // Cost
    this.priceRange = data.priceRange || null;
    this.cost = data.cost || null;
    this.costNote = data.costNote || null;
    this.freeParking = data.freeParking || false;
    
    // Booking & Reservations
    this.requiresReservation = data.requiresReservation || false;
    this.reservationRequired = data.reservationRequired || false;
    this.reservationRecommended = data.reservationRecommended || false;
    this.bookingUrl = data.bookingUrl || null;
    this.advanceBooking = data.advanceBooking || null; // days needed
    
    // Physical requirements
    this.difficulty = data.difficulty || Difficulty.EASY;
    this.accessible = data.accessible !== false;
    this.walkingDistance = data.walkingDistance || null; // miles
    this.elevation = data.elevation || null; // feet
    
    // Weather & Conditions
    this.weatherSensitivity = data.weatherSensitivity || WeatherSensitivity.FLEXIBLE;
    this.indoorOption = data.indoorOption || false;
    this.rainBackup = data.rainBackup || null;
    
    // Crowds & Popularity
    this.crowdLevel = data.crowdLevel || CrowdLevel.MODERATE;
    this.peakTimes = data.peakTimes || null;
    this.avoidTimes = data.avoidTimes || null;
    
    // Experience
    this.description = data.description || '';
    this.vibe = data.vibe || '';
    this.highlights = data.highlights || [];
    this.mustTry = data.mustTry || null;
    this.mustDo = data.mustDo || null;
    this.proTip = data.proTip || null;
    this.warning = data.warning || null;
    
    // Tags & Search
    this.tags = data.tags || [];
    this.keywords = data.keywords || [];
    
    // Traveler Preferences
    this.travelerScores = data.travelerScores || {}; // { tere: 0.8, mikaela: 0.9 }
    this.matchesPreferences = data.matchesPreferences || [];
    
    // Connections
    this.nearbyActivities = data.nearbyActivities || [];
    this.pairedWith = data.pairedWith || []; // "works well with..."
    this.alternatives = data.alternatives || []; // "too crowded? try..."
    
    // Media
    this.images = data.images || [];
    this.website = data.website || null;
    this.phone = data.phone || null;
    
    // Source & Attribution
    this.source = data.source || 'user-added';
    this.sourceId = data.sourceId || null;
    this.addedBy = data.addedBy || null;
    this.addedAt = data.addedAt || new Date().toISOString();
    
    // Trip Integration
    this.dayId = data.dayId || null;
    this.dayIndex = data.dayIndex || null; // order within day
    this.selected = data.selected || false;
    this.notes = data.notes || '';
    
    // Computed
    this.distanceFromPrevious = data.distanceFromPrevious || null;
    this.travelTimeFromPrevious = data.travelTimeFromPrevious || null;
  }
  
  /**
   * Check if activity is open at a given time
   */
  isOpenAt(datetime) {
    if (!this.hours) return null; // Unknown
    const day = datetime.toLocaleDateString('en-US', { weekday: 'lowercase' });
    const hour = datetime.getHours() + datetime.getMinutes() / 60;
    const dayHours = this.hours[day];
    if (!dayHours) return false;
    if (dayHours === 'closed') return false;
    const [open, close] = dayHours;
    return hour >= open && hour <= close;
  }
  
  /**
   * Calculate match score for a traveler
   */
  getMatchScore(travelerPreferences) {
    let score = 0;
    let matches = 0;
    
    // Type matching
    if (travelerPreferences.favoriteTypes?.includes(this.type)) {
      score += 0.3;
      matches++;
    }
    
    // Tag matching
    const matchingTags = this.tags.filter(tag => 
      travelerPreferences.interests?.includes(tag)
    );
    score += Math.min(matchingTags.length * 0.1, 0.3);
    if (matchingTags.length > 0) matches++;
    
    // Price matching
    if (travelerPreferences.priceRange && this.priceRange) {
      if (Math.abs(travelerPreferences.priceRange - this.priceRange) <= 1) {
        score += 0.2;
        matches++;
      }
    }
    
    // Difficulty matching
    if (travelerPreferences.maxDifficulty) {
      const difficultyMap = { easy: 1, moderate: 2, challenging: 3, strenuous: 4 };
      if (difficultyMap[this.difficulty] <= difficultyMap[travelerPreferences.maxDifficulty]) {
        score += 0.1;
      }
    }
    
    // Crowd preference
    if (travelerPreferences.crowdPreference) {
      const crowdMap = { quiet: 1, moderate: 2, busy: 3, very_busy: 4 };
      if (Math.abs(crowdMap[this.crowdLevel] - crowdMap[travelerPreferences.crowdPreference]) <= 1) {
        score += 0.1;
        matches++;
      }
    }
    
    return { score: Math.min(score, 1), matches };
  }
  
  /**
   * Check if activity fits in available time
   */
  fitsInTimeSlot(availableMinutes) {
    if (!this.duration) return null;
    return this.durationMax <= availableMinutes;
  }
  
  /**
   * Get estimated cost per person
   */
  getEstimatedCost() {
    if (this.cost) return this.cost;
    const ranges = {
      0: 0,
      1: 15,
      2: 40,
      3: 75,
      4: 150,
    };
    return ranges[this.priceRange] || null;
  }
  
  /**
   * Convert to plain object for storage
   */
  toJSON() {
    return { ...this };
  }
}

/**
 * Activity Constraints
 */
export class ActivityConstraints {
  constructor(data = {}) {
    this.maxDuration = data.maxDuration || null;
    this.maxCost = data.maxCost || null;
    this.maxDistance = data.maxDistance || null;
    this.requiresOpen = data.requiresOpen !== false;
    this.weatherDependent = data.weatherDependent || false;
    this.currentWeather = data.currentWeather || null;
    this.maxDifficulty = data.maxDifficulty || 'strenuous';
    this.accessibleOnly = data.accessibleOnly || false;
    this.indoorOnly = data.indoorOnly || false;
    this.quietOnly = data.quietOnly || false;
  }
  
  /**
   * Check if activity meets all constraints
   */
  isSatisfiedBy(activity, currentTime) {
    // Duration check
    if (this.maxDuration && activity.duration > this.maxDuration) {
      return { valid: false, reason: 'Too long' };
    }
    
    // Cost check
    if (this.maxCost) {
      const cost = activity.getEstimatedCost();
      if (cost && cost > this.maxCost) {
        return { valid: false, reason: 'Too expensive' };
      }
    }
    
    // Open hours check
    if (this.requiresOpen && currentTime) {
      const isOpen = activity.isOpenAt(currentTime);
      if (isOpen === false) {
        return { valid: false, reason: 'Closed at this time' };
      }
    }
    
    // Weather check
    if (this.weatherDependent && this.currentWeather) {
      if (this.currentWeather.precipitation > 0.3 && 
          activity.weatherSensitivity === WeatherSensitivity.OUTDOOR_REQUIRED) {
        return { valid: false, reason: 'Poor weather' };
      }
    }
    
    // Difficulty check
    const diffMap = { easy: 1, moderate: 2, challenging: 3, strenuous: 4 };
    if (diffMap[activity.difficulty] > diffMap[this.maxDifficulty]) {
      return { valid: false, reason: 'Too difficult' };
    }
    
    // Accessibility
    if (this.accessibleOnly && !activity.accessible) {
      return { valid: false, reason: 'Not accessible' };
    }
    
    // Indoor requirement
    if (this.indoorOnly && activity.weatherSensitivity === WeatherSensitivity.OUTDOOR_REQUIRED) {
      return { valid: false, reason: 'Must be indoor' };
    }
    
    // Quiet requirement
    if (this.quietOnly && [CrowdLevel.BUSY, CrowdLevel.VERY_BUSY].includes(activity.crowdLevel)) {
      return { valid: false, reason: 'Too crowded' };
    }
    
    return { valid: true };
  }
}
