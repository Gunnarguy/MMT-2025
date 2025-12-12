// ═══════════════════════════════════════════════════════════════════════════════
// TRIP PLANNING ENGINE
// Master orchestrator for all planning services
// ═══════════════════════════════════════════════════════════════════════════════

import { Activity, ActivityConstraints } from '../types/activity';
import { searchService } from './searchService';
import { TravelerProfile, PreferenceMatcher, createTravelerProfiles } from './preferenceEngine';
import { ScheduleValidator, DaySchedule, realityCheckTrip } from './scheduleValidator';
import { realTimeData } from './realTimeData';

/**
 * Trip Planning Engine
 * Coordinates all services for intelligent trip planning
 */
export class TripPlanningEngine {
  constructor(tripData, travelers) {
    // Initialize traveler profiles
    this.travelerProfiles = createTravelerProfiles(travelers);
    this.preferenceMatcher = new PreferenceMatcher(
      Object.fromEntries(this.travelerProfiles.map(p => [p.id, p]))
    );
    
    // Initialize validators
    this.scheduleValidator = new ScheduleValidator();
    
    // Trip data
    this.tripData = tripData;
    this.days = tripData.days || [];
    
    // Activity pool
    this.allActivities = new Map(); // id -> Activity
    this.selectedActivities = new Set();
  }
  
  /**
   * Search for activities with full intelligence
   */
  async searchActivities(query, options = {}) {
    const {
      location = null,
      types = [],
      travelerId = null,
      minScore = 0.5,
      limit = 20,
      constraints = {}
    } = options;
    
    // Do the search
    const results = await searchService.searchActivities(query, {
      location,
      types,
      limit: limit * 2 // Get more for filtering
    });
    
    // Enrich with real-time data
    const enriched = await Promise.all(
      results.map(activity => 
        realTimeData.enrichActivity(activity, this.tripData.startDate)
      )
    );
    
    // Apply constraints
    const activityConstraints = new ActivityConstraints(constraints);
    const filtered = enriched.filter(activity => {
      const check = activityConstraints.isSatisfiedBy(
        activity,
        new Date(this.tripData.startDate)
      );
      return check.valid;
    });
    
    // Score by traveler preferences
    let scored;
    if (travelerId) {
      const traveler = this.travelerProfiles.find(t => t.id === travelerId);
      if (traveler) {
        scored = traveler.filterRecommendations(filtered, minScore);
      } else {
        scored = filtered.map(a => ({ activity: a, score: 0.5 }));
      }
    } else {
      // Score for all travelers
      scored = this.preferenceMatcher.scoreForAll(filtered);
    }
    
    // Store in activity pool
    for (const item of scored) {
      const activity = item.activity;
      this.allActivities.set(activity.id, activity);
    }
    
    return scored.slice(0, limit);
  }
  
  /**
   * Get personalized recommendations for a traveler
   */
  getRecommendations(travelerId, options = {}) {
    const {
      dayId = null,
      limit = 10,
      excludeSelected = true
    } = options;
    
    let activities = Array.from(this.allActivities.values());
    
    if (excludeSelected) {
      activities = activities.filter(a => !this.selectedActivities.has(a.id));
    }
    
    if (dayId) {
      const day = this.days.find(d => d.id === dayId);
      if (day) {
        // Filter by location relevance
        activities = activities.filter(a => 
          this.isRelevantToDay(a, day)
        );
      }
    }
    
    return this.preferenceMatcher.getPersonalizedRecs(
      travelerId,
      activities,
      limit
    );
  }
  
  /**
   * Check if activity is relevant to a specific day
   */
  isRelevantToDay(activity, day) {
    // Check location proximity
    if (activity.coordinates && day.coordinates) {
      const dist = this.calculateDistance(activity.coordinates, day.coordinates);
      if (dist > 50) return false; // More than 50 miles away
    }
    
    // Check if it's a drive day and this is a quick stop
    if (day.isDriveDay && activity.duration > 120) {
      return false; // Too long for drive day
    }
    
    return true;
  }
  
  /**
   * Add activity to trip
   */
  addActivity(activityId, options = {}) {
    const {
      dayId = null,
      travelerId: _travelerId = null,
      autoSchedule = true
    } = options;
    
    const activity = this.allActivities.get(activityId);
    if (!activity) {
      throw new Error('Activity not found');
    }
    
    // Mark as selected
    this.selectedActivities.add(activityId);
    
    // Auto-assign to best day if requested
    if (autoSchedule && !dayId) {
      const bestDay = this.findBestDay(activity);
      if (bestDay) {
        return this.scheduleActivity(activityId, bestDay.dayId);
      }
    } else if (dayId) {
      return this.scheduleActivity(activityId, dayId);
    }
    
    return {
      success: true,
      activity,
      scheduled: false
    };
  }
  
  /**
   * Find best day for an activity
   */
  findBestDay(activity) {
    const candidates = this.days.map(day => {
      const schedule = new DaySchedule({
        ...day,
        activities: this.getActivitiesForDay(day.id)
      });
      
      const fit = schedule.canFitActivity(activity);
      const relevance = this.isRelevantToDay(activity, day) ? 1 : 0;
      const utilization = schedule.getUsedTime() / schedule.getAvailableTime();
      
      // Prefer days with some room but not empty
      const utilizationScore = utilization > 0.2 && utilization < 0.7 ? 1 : 0.5;
      
      return {
        dayId: day.id,
        day,
        fits: fit.fits,
        score: (fit.fits ? 1 : 0) + relevance + utilizationScore
      };
    })
    .filter(c => c.fits)
    .sort((a, b) => b.score - a.score);
    
    return candidates[0] || null;
  }
  
  /**
   * Schedule activity to a specific day
   */
  scheduleActivity(activityId, dayId, index = null) {
    const activity = this.allActivities.get(activityId);
    const day = this.days.find(d => d.id === dayId);
    
    if (!activity || !day) {
      throw new Error('Invalid activity or day');
    }
    
    // Check if it fits
    const schedule = new DaySchedule({
      ...day,
      activities: this.getActivitiesForDay(dayId)
    });
    
    const fit = schedule.canFitActivity(activity);
    
    if (!fit.fits) {
      return {
        success: false,
        reason: fit.reason,
        suggestions: this.scheduleValidator.suggestImprovements(schedule)
      };
    }
    
    // Add to day
    activity.dayId = dayId;
    if (index !== null) {
      activity.dayIndex = index;
    } else {
      // Append to end
      const dayActivities = this.getActivitiesForDay(dayId);
      activity.dayIndex = dayActivities.length;
    }
    
    // Re-optimize order
    schedule.activities.push(activity);
    const optimized = schedule.optimizeOrder();
    optimized.forEach((a, idx) => {
      a.dayIndex = idx;
    });
    
    return {
      success: true,
      activity,
      day,
      validation: schedule.validate()
    };
  }
  
  /**
   * Remove activity from trip
   */
  removeActivity(activityId) {
    const activity = this.allActivities.get(activityId);
    if (!activity) return false;
    
    this.selectedActivities.delete(activityId);
    activity.dayId = null;
    activity.dayIndex = null;
    
    return true;
  }
  
  /**
   * Get all activities for a day
   */
  getActivitiesForDay(dayId) {
    return Array.from(this.allActivities.values())
      .filter(a => a.dayId === dayId)
      .sort((a, b) => (a.dayIndex || 0) - (b.dayIndex || 0));
  }
  
  /**
   * Validate entire trip
   */
  validateTrip() {
    // Build day schedules
    const daySchedules = this.days.map(day => ({
      ...day,
      activities: this.getActivitiesForDay(day.id)
    }));
    
    // Run validation
    const validation = this.scheduleValidator.validateTrip(daySchedules);
    
    // Add reality check
    const realityCheck = realityCheckTrip({
      days: daySchedules
    });
    
    return {
      ...validation,
      realityCheck
    };
  }
  
  /**
   * Get comprehensive day plan with all intelligence
   */
  async getDayPlan(dayId) {
    const day = this.days.find(d => d.id === dayId);
    if (!day) throw new Error('Day not found');
    
    const activities = this.getActivitiesForDay(dayId);
    
    // Build schedule
    const schedule = new DaySchedule({
      ...day,
      activities
    });
    
    // Get validation
    const validation = schedule.validate();
    
    // Get real-time data
    const realTime = await realTimeData.getDaySummary(day, activities);
    
    // Get alerts
    const alerts = await realTimeData.getAlerts(day, activities);
    
    // Get improvement suggestions
    const improvements = this.scheduleValidator.suggestImprovements(schedule);
    
    // Calculate routes
    const routes = await this.calculateRoutes(activities);
    
    return {
      day,
      schedule,
      activities,
      validation,
      realTime,
      alerts,
      improvements,
      routes,
      summary: {
        utilizationPercent: validation.metrics.utilizationPercent,
        totalTime: validation.metrics.usedTime,
        totalDriving: validation.metrics.totalDriving,
        activityCount: activities.length,
        weatherSuitable: realTime.outdoorReady,
        foliagePrime: realTime.foliagePrime
      }
    };
  }
  
  /**
   * Calculate routes between activities
   */
  async calculateRoutes(activities) {
    if (activities.length < 2) return [];
    
    const routes = [];
    for (let i = 1; i < activities.length; i++) {
      const from = activities[i - 1];
      const to = activities[i];
      
      if (from.coordinates && to.coordinates) {
        // Use OSRM for actual routes
        // This would call the route utility service
        routes.push({
          from: from.name,
          to: to.name,
          distance: this.calculateDistance(from.coordinates, to.coordinates),
          // Real route would be fetched here
        });
      }
    }
    
    return routes;
  }
  
  /**
   * Get conflict resolutions
   */
  getConflictResolutions() {
    const activities = Array.from(this.allActivities.values())
      .filter(a => this.selectedActivities.has(a.id));
    
    return this.preferenceMatcher.resolveConflicts(activities);
  }
  
  /**
   * Build balanced itinerary automatically
   */
  autoGenerateItinerary(options = {}) {
    const {
      prioritizeConsensus = true,
      maxActivitiesPerDay: _maxActivitiesPerDay = 5
    } = options;
    
    const activities = Array.from(this.allActivities.values())
      .filter(a => this.selectedActivities.has(a.id));
    
    if (prioritizeConsensus) {
      // Get consensus activities
      const consensus = this.preferenceMatcher.getConsensusActivities(activities);
      const balanced = this.preferenceMatcher.buildBalancedItinerary(
        consensus.map(c => c.activity),
        this.days.length
      );
      
      // Assign to days
      balanced.days.forEach((dayActivities, idx) => {
        const dayId = this.days[idx].id;
        dayActivities.forEach((activity, actIdx) => {
          activity.dayId = dayId;
          activity.dayIndex = actIdx;
        });
      });
      
      return {
        success: true,
        balanced,
        validation: this.validateTrip()
      };
    }
    
    // Fallback: distribute evenly
    activities.forEach((activity, idx) => {
      const dayIdx = idx % this.days.length;
      activity.dayId = this.days[dayIdx].id;
      activity.dayIndex = Math.floor(idx / this.days.length);
    });
    
    return {
      success: true,
      validation: this.validateTrip()
    };
  }
  
  /**
   * Calculate distance between coordinates
   */
  calculateDistance(coord1, coord2) {
    const R = 3959;
    const dLat = (coord2[0] - coord1[0]) * Math.PI / 180;
    const dLon = (coord2[1] - coord1[1]) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(coord1[0] * Math.PI / 180) * Math.cos(coord2[0] * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }
  
  /**
   * Export trip data
   */
  exportTrip() {
    const days = this.days.map(day => ({
      ...day,
      activities: this.getActivitiesForDay(day.id)
    }));
    
    return {
      tripData: this.tripData,
      days,
      travelers: this.travelerProfiles.map(p => ({
        id: p.id,
        name: p.name,
        emoji: p.emoji
      })),
      validation: this.validateTrip(),
      stats: {
        totalActivities: this.selectedActivities.size,
        totalInPool: this.allActivities.size,
        byType: this.getActivityStats()
      }
    };
  }
  
  /**
   * Get activity statistics
   */
  getActivityStats() {
    const selected = Array.from(this.allActivities.values())
      .filter(a => this.selectedActivities.has(a.id));
    
    const stats = {};
    for (const activity of selected) {
      stats[activity.type] = (stats[activity.type] || 0) + 1;
    }
    
    return stats;
  }
}

/**
 * Create engine from trip data
 */
export function createPlanningEngine(tripData, travelers) {
  return new TripPlanningEngine(tripData, travelers);
}
