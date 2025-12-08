// ═══════════════════════════════════════════════════════════════════════════════
// SCHEDULE VALIDATOR
// Reality-check trip scheduling with constraints and conflicts
// ═══════════════════════════════════════════════════════════════════════════════

import { ActivityConstraints } from '../types/activity';

/**
 * Day Schedule
 */
export class DaySchedule {
  constructor(data) {
    this.dayId = data.dayId;
    this.date = data.date;
    this.label = data.label;
    this.location = data.location;
    this.activities = data.activities || [];
    
    // Time constraints
    this.startTime = data.startTime || 8; // 8am default
    this.endTime = data.endTime || 20; // 8pm default
    this.maxActivities = data.maxActivities || 6;
    
    // Driving
    this.isDriveDay = data.isDriveDay || false;
    this.plannedDriveTime = data.plannedDriveTime || 0; // hours
    
    // Meal slots
    this.breakfastIncluded = data.breakfastIncluded !== false;
    this.lunchIncluded = data.lunchIncluded !== false;
    this.dinnerIncluded = data.dinnerIncluded !== false;
  }
  
  /**
   * Get available time in minutes
   */
  getAvailableTime() {
    const totalHours = this.endTime - this.startTime;
    let availableMinutes = totalHours * 60;
    
    // Subtract drive time
    if (this.isDriveDay) {
      availableMinutes -= this.plannedDriveTime * 60;
    }
    
    // Subtract meal time
    if (this.breakfastIncluded) availableMinutes -= 45;
    if (this.lunchIncluded) availableMinutes -= 75;
    if (this.dinnerIncluded) availableMinutes -= 120;
    
    // Subtract transition time between activities (15 min each)
    availableMinutes -= (this.activities.length - 1) * 15;
    
    return Math.max(availableMinutes, 0);
  }
  
  /**
   * Get used time from scheduled activities
   */
  getUsedTime() {
    return this.activities.reduce((sum, activity) => {
      return sum + (activity.duration || 60);
    }, 0);
  }
  
  /**
   * Get remaining time
   */
  getRemainingTime() {
    return this.getAvailableTime() - this.getUsedTime();
  }
  
  /**
   * Check if activity can fit
   */
  canFitActivity(activity) {
    const remainingTime = this.getRemainingTime();
    const activityDuration = activity.durationMax || activity.duration || 60;
    
    if (activityDuration > remainingTime) {
      return { fits: false, reason: `Not enough time (need ${activityDuration}min, have ${remainingTime}min)` };
    }
    
    if (this.activities.length >= this.maxActivities) {
      return { fits: false, reason: 'Too many activities' };
    }
    
    return { fits: true };
  }
  
  /**
   * Calculate optimal order for activities
   */
  optimizeOrder() {
    if (this.activities.length === 0) return this.activities;
    
    // Sort by time of day preference
    const timeOrder = {
      'early_morning': 1,
      'morning': 2,
      'afternoon': 3,
      'evening': 4,
      'night': 5,
      'anytime': 3 // default to afternoon
    };
    
    const sorted = [...this.activities].sort((a, b) => {
      const aTime = timeOrder[a.timeOfDay] || 3;
      const bTime = timeOrder[b.timeOfDay] || 3;
      return aTime - bTime;
    });
    
    // Optimize by location (minimize backtracking)
    if (sorted.every(a => a.coordinates)) {
      return this.optimizeByProximity(sorted);
    }
    
    return sorted;
  }
  
  /**
   * Optimize activities by proximity (traveling salesman-lite)
   */
  optimizeByProximity(activities) {
    if (activities.length <= 2) return activities;
    
    const visited = new Set();
    const ordered = [];
    
    // Start with first activity
    let current = activities[0];
    ordered.push(current);
    visited.add(current.id);
    
    // Greedy nearest-neighbor
    while (visited.size < activities.length) {
      let nearest = null;
      let minDist = Infinity;
      
      for (const activity of activities) {
        if (visited.has(activity.id)) continue;
        
        const dist = this.calculateDistance(
          current.coordinates,
          activity.coordinates
        );
        
        if (dist < minDist) {
          minDist = dist;
          nearest = activity;
        }
      }
      
      if (nearest) {
        ordered.push(nearest);
        visited.add(nearest.id);
        current = nearest;
      } else {
        break;
      }
    }
    
    return ordered;
  }
  
  /**
   * Calculate distance between coordinates
   */
  calculateDistance(coord1, coord2) {
    const R = 3959; // Earth radius in miles
    const dLat = (coord2[0] - coord1[0]) * Math.PI / 180;
    const dLon = (coord2[1] - coord1[1]) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(coord1[0] * Math.PI / 180) * Math.cos(coord2[0] * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }
  
  /**
   * Validate entire day schedule
   */
  validate() {
    const issues = [];
    const warnings = [];
    
    // Check time constraints
    const usedTime = this.getUsedTime();
    const availableTime = this.getAvailableTime();
    
    if (usedTime > availableTime) {
      issues.push({
        type: 'time_overflow',
        severity: 'error',
        message: `Schedule is ${Math.ceil((usedTime - availableTime) / 60)} hours too packed`,
        suggestion: 'Remove some activities or extend the day'
      });
    } else if (usedTime > availableTime * 0.9) {
      warnings.push({
        type: 'tight_schedule',
        severity: 'warning',
        message: 'Schedule is very tight',
        suggestion: 'Consider building in buffer time'
      });
    }
    
    // Check for meal activities
    const hasMeal = this.activities.some(a => 
      ['restaurant', 'cafe', 'lobster'].includes(a.type)
    );
    if (!hasMeal && this.activities.length > 2) {
      warnings.push({
        type: 'no_meals',
        severity: 'warning',
        message: 'No meals scheduled',
        suggestion: 'Add a restaurant or plan for packed lunch'
      });
    }
    
    // Check for excessive driving
    if (this.activities.length > 0 && this.activities.every(a => a.coordinates)) {
      const totalDriving = this.calculateTotalDriving();
      if (totalDriving > 50) {
        warnings.push({
          type: 'excessive_driving',
          severity: 'warning',
          message: `${totalDriving.toFixed(0)} miles of driving between activities`,
          suggestion: 'Consider clustering activities geographically'
        });
      }
    }
    
    // Check for activity conflicts
    const conflicts = this.detectConflicts();
    issues.push(...conflicts);
    
    // Check for rest/downtime
    if (this.activities.length > 4 && !this.activities.some(a => a.tags.includes('relaxation'))) {
      warnings.push({
        type: 'no_downtime',
        severity: 'info',
        message: 'Packed schedule with no downtime',
        suggestion: 'Consider adding a relaxing activity or buffer time'
      });
    }
    
    return {
      valid: issues.length === 0,
      issues,
      warnings,
      metrics: {
        usedTime,
        availableTime,
        utilizationPercent: Math.round((usedTime / availableTime) * 100),
        activityCount: this.activities.length,
        totalDriving: this.calculateTotalDriving()
      }
    };
  }
  
  /**
   * Calculate total driving distance for the day
   */
  calculateTotalDriving() {
    if (this.activities.length < 2) return 0;
    
    let total = 0;
    for (let i = 1; i < this.activities.length; i++) {
      const prev = this.activities[i - 1];
      const curr = this.activities[i];
      
      if (prev.coordinates && curr.coordinates) {
        total += this.calculateDistance(prev.coordinates, curr.coordinates);
      }
    }
    
    return total;
  }
  
  /**
   * Detect scheduling conflicts
   */
  detectConflicts() {
    const conflicts = [];
    
    for (let i = 0; i < this.activities.length; i++) {
      const activity = this.activities[i];
      
      // Check if activity requires reservation
      if (activity.reservationRequired && !activity.hasReservation) {
        conflicts.push({
          type: 'reservation_required',
          severity: 'error',
          activity: activity.name,
          message: `${activity.name} requires advance reservation`,
          suggestion: 'Book now or find alternative'
        });
      }
      
      // Check for same-location activities
      for (let j = i + 1; j < this.activities.length; j++) {
        const other = this.activities[j];
        if (activity.coordinates && other.coordinates) {
          const dist = this.calculateDistance(activity.coordinates, other.coordinates);
          if (dist < 0.1) { // Within 0.1 miles
            conflicts.push({
              type: 'duplicate_location',
              severity: 'info',
              activity: `${activity.name} and ${other.name}`,
              message: 'Two activities at same location',
              suggestion: 'Consider combining or removing one'
            });
          }
        }
      }
    }
    
    return conflicts;
  }
}

/**
 * Schedule Validator
 */
export class ScheduleValidator {
  constructor(options = {}) {
    this.constraints = new ActivityConstraints(options.constraints || {});
    this.weatherData = options.weatherData || null;
    this.traffic = options.traffic || 'normal';
  }
  
  /**
   * Validate entire trip schedule
   */
  validateTrip(days) {
    const results = {
      valid: true,
      days: [],
      summary: {
        totalIssues: 0,
        totalWarnings: 0,
        overpackedDays: 0,
        underutilizedDays: 0,
        totalDriving: 0,
        totalActivities: 0,
      }
    };
    
    for (const day of days) {
      const daySchedule = new DaySchedule(day);
      const validation = daySchedule.validate();
      
      results.days.push({
        dayId: day.dayId,
        label: day.label,
        ...validation
      });
      
      if (!validation.valid) {
        results.valid = false;
      }
      
      results.summary.totalIssues += validation.issues.length;
      results.summary.totalWarnings += validation.warnings.length;
      results.summary.totalDriving += validation.metrics.totalDriving;
      results.summary.totalActivities += validation.metrics.activityCount;
      
      if (validation.metrics.utilizationPercent > 95) {
        results.summary.overpackedDays++;
      } else if (validation.metrics.utilizationPercent < 40) {
        results.summary.underutilizedDays++;
      }
    }
    
    // Add trip-level validations
    results.tripLevel = this.validateTripLevel(days);
    
    return results;
  }
  
  /**
   * Trip-level validations
   */
  validateTripLevel(days) {
    const issues = [];
    const warnings = [];
    
    // Check for consecutive driving days
    let driveDayStreak = 0;
    for (const day of days) {
      if (day.isDriveDay) {
        driveDayStreak++;
        if (driveDayStreak > 2) {
          warnings.push({
            type: 'driving_fatigue',
            message: 'Multiple consecutive driving days',
            suggestion: 'Consider adding a rest day or reducing driving'
          });
          break;
        }
      } else {
        driveDayStreak = 0;
      }
    }
    
    // Check for activity type diversity
    const allActivities = days.flatMap(d => d.activities || []);
    const types = new Set(allActivities.map(a => a.type));
    if (types.size < 4) {
      warnings.push({
        type: 'low_diversity',
        message: 'Limited activity variety',
        suggestion: 'Mix in different types of experiences'
      });
    }
    
    // Check for proper rest days
    const packedDays = days.filter(d => (d.activities?.length || 0) > 4);
    if (packedDays.length > days.length * 0.7) {
      warnings.push({
        type: 'no_rest',
        message: 'Very few relaxed days',
        suggestion: 'Build in some downtime or buffer days'
      });
    }
    
    return { issues, warnings };
  }
  
  /**
   * Suggest improvements for a day
   */
  suggestImprovements(daySchedule) {
    const suggestions = [];
    const validation = daySchedule.validate();
    
    if (validation.metrics.utilizationPercent > 95) {
      // Overpacked - suggest what to remove
      const lessEssential = daySchedule.activities
        .filter(a => !a.mustDo && !a.requiresReservation)
        .sort((a, b) => (a.duration || 60) - (b.duration || 60));
      
      if (lessEssential.length > 0) {
        suggestions.push({
          type: 'remove_activity',
          activity: lessEssential[0],
          reason: 'Schedule is too tight',
          impact: `Frees up ${lessEssential[0].duration || 60} minutes`
        });
      }
    }
    
    if (validation.metrics.utilizationPercent < 50) {
      // Underutilized - suggest additions
      suggestions.push({
        type: 'add_activity',
        reason: 'Day has available time',
        availableTime: daySchedule.getRemainingTime(),
        suggestion: 'Consider adding another activity or extending existing ones'
      });
    }
    
    // Suggest reordering if driving is excessive
    if (validation.metrics.totalDriving > 30) {
      const optimized = daySchedule.optimizeOrder();
      const optimizedSchedule = new DaySchedule({
        ...daySchedule,
        activities: optimized
      });
      const optimizedDriving = optimizedSchedule.calculateTotalDriving();
      
      if (optimizedDriving < validation.metrics.totalDriving - 5) {
        suggestions.push({
          type: 'reorder',
          reason: 'Reduce driving distance',
          impact: `Save ${(validation.metrics.totalDriving - optimizedDriving).toFixed(1)} miles`,
          newOrder: optimized.map(a => a.id)
        });
      }
    }
    
    return suggestions;
  }
  
  /**
   * Auto-fix common issues
   */
  autoFix(daySchedule, options = {}) {
    const { allowRemove = true, allowReorder = true } = options;
    const fixed = new DaySchedule({ ...daySchedule });
    const changes = [];
    
    // Reorder for efficiency
    if (allowReorder) {
      const optimized = fixed.optimizeOrder();
      if (JSON.stringify(optimized) !== JSON.stringify(fixed.activities)) {
        fixed.activities = optimized;
        changes.push({ type: 'reordered', count: optimized.length });
      }
    }
    
    // Remove activities if overpacked
    if (allowRemove) {
      while (!fixed.validate().valid && fixed.activities.length > 0) {
        // Remove least essential activity
        const toRemove = fixed.activities
          .map((a, idx) => ({ activity: a, idx }))
          .filter(({ activity }) => !activity.mustDo && !activity.requiresReservation)
          .sort((a, b) => (a.activity.duration || 60) - (b.activity.duration || 60))[0];
        
        if (toRemove) {
          fixed.activities.splice(toRemove.idx, 1);
          changes.push({ type: 'removed', activity: toRemove.activity.name });
        } else {
          break;
        }
      }
    }
    
    return { fixed, changes, valid: fixed.validate().valid };
  }
}

/**
 * Reality check for trip feasibility
 */
export function realityCheckTrip(tripData) {
  const checks = [];
  
  // Total duration check
  const totalDays = tripData.days?.length || 0;
  const totalActivities = tripData.days?.reduce((sum, d) => sum + (d.activities?.length || 0), 0) || 0;
  
  if (totalActivities / totalDays > 5) {
    checks.push({
      level: 'warning',
      category: 'pace',
      message: 'Very ambitious pace',
      detail: `Averaging ${(totalActivities / totalDays).toFixed(1)} activities per day`,
      recommendation: 'Consider reducing activities or extending trip'
    });
  }
  
  // Budget check
  const activities = tripData.days?.flatMap(d => d.activities || []) || [];
  const estimatedCost = activities.reduce((sum, a) => sum + (a.getEstimatedCost?.() || 0), 0);
  
  if (estimatedCost > 2000) {
    checks.push({
      level: 'info',
      category: 'budget',
      message: 'High activity costs',
      detail: `Estimated $${estimatedCost.toFixed(0)} for activities alone`,
      recommendation: 'This excludes lodging, gas, and incidentals'
    });
  }
  
  // Physical demands
  const challenging = activities.filter(a => 
    a.difficulty === 'challenging' || a.difficulty === 'strenuous'
  );
  
  if (challenging.length > totalDays * 0.5) {
    checks.push({
      level: 'warning',
      category: 'physical',
      message: 'Physically demanding schedule',
      detail: `${challenging.length} challenging activities`,
      recommendation: 'Build in rest days and easier activities'
    });
  }
  
  return {
    feasible: checks.filter(c => c.level === 'error').length === 0,
    checks,
    score: calculateFeasibilityScore(checks)
  };
}

function calculateFeasibilityScore(checks) {
  let score = 100;
  for (const check of checks) {
    if (check.level === 'error') score -= 30;
    if (check.level === 'warning') score -= 15;
    if (check.level === 'info') score -= 5;
  }
  return Math.max(score, 0);
}
