// ═══════════════════════════════════════════════════════════════════════════════
// USE TRIP PLANNER HOOK
// React hook for easy access to trip planning engine
// ═══════════════════════════════════════════════════════════════════════════════

import { useState, useEffect, useCallback, useMemo } from 'react';
import { createPlanningEngine } from '../services/planningEngine';
import { Activity } from '../types/activity';

/**
 * Main trip planner hook
 */
export function useTripPlanner(tripData, travelers) {
  const [engine] = useState(() => createPlanningEngine(tripData, travelers));
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState(new Set());
  const [dayPlans, setDayPlans] = useState({});
  const [validation, setValidation] = useState(null);
  
  /**
   * Search for activities
   */
  const search = useCallback(async (query, options = {}) => {
    setSearching(true);
    try {
      const results = await engine.searchActivities(query, options);
      setSearchResults(results);
      return results;
    } catch (error) {
      console.error('Search error:', error);
      return [];
    } finally {
      setSearching(false);
    }
  }, [engine]);
  
  /**
   * Add activity to trip
   */
  const addActivity = useCallback((activityId, options = {}) => {
    const result = engine.addActivity(activityId, options);
    if (result.success) {
      setSelectedActivities(new Set(engine.selectedActivities));
      
      // Re-validate if scheduled
      if (result.scheduled) {
        setValidation(engine.validateTrip());
      }
    }
    return result;
  }, [engine]);
  
  /**
   * Remove activity from trip
   */
  const removeActivity = useCallback((activityId) => {
    const success = engine.removeActivity(activityId);
    if (success) {
      setSelectedActivities(new Set(engine.selectedActivities));
      setValidation(engine.validateTrip());
    }
    return success;
  }, [engine]);
  
  /**
   * Schedule activity to a day
   */
  const scheduleActivity = useCallback((activityId, dayId, index = null) => {
    const result = engine.scheduleActivity(activityId, dayId, index);
    if (result.success) {
      setSelectedActivities(new Set(engine.selectedActivities));
      setValidation(engine.validateTrip());
    }
    return result;
  }, [engine]);
  
  /**
   * Get day plan with all intelligence
   */
  const getDayPlan = useCallback(async (dayId) => {
    const plan = await engine.getDayPlan(dayId);
    setDayPlans(prev => ({ ...prev, [dayId]: plan }));
    return plan;
  }, [engine]);
  
  /**
   * Get recommendations for a traveler
   */
  const getRecommendations = useCallback((travelerId, options = {}) => {
    return engine.getRecommendations(travelerId, options);
  }, [engine]);
  
  /**
   * Auto-generate balanced itinerary
   */
  const autoGenerate = useCallback((options = {}) => {
    const result = engine.autoGenerateItinerary(options);
    if (result.success) {
      setSelectedActivities(new Set(engine.selectedActivities));
      setValidation(result.validation);
    }
    return result;
  }, [engine]);
  
  /**
   * Validate trip
   */
  const validate = useCallback(() => {
    const result = engine.validateTrip();
    setValidation(result);
    return result;
  }, [engine]);
  
  /**
   * Get conflict resolutions
   */
  const getConflicts = useCallback(() => {
    return engine.getConflictResolutions();
  }, [engine]);
  
  /**
   * Export trip
   */
  const exportTrip = useCallback(() => {
    return engine.exportTrip();
  }, [engine]);
  
  /**
   * Get activities for a day
   */
  const getActivitiesForDay = useCallback((dayId) => {
    return engine.getActivitiesForDay(dayId);
  }, [engine]);
  
  // Compute stats
  const stats = useMemo(() => {
    return {
      totalActivities: selectedActivities.size,
      totalSearched: engine.allActivities.size,
      byType: engine.getActivityStats()
    };
  }, [selectedActivities, engine]);
  
  return {
    // State
    searchResults,
    searching,
    selectedActivities: Array.from(selectedActivities).map(id => engine.allActivities.get(id)).filter(Boolean),
    dayPlans,
    validation,
    stats,
    
    // Actions
    search,
    addActivity,
    removeActivity,
    scheduleActivity,
    getDayPlan,
    getRecommendations,
    autoGenerate,
    validate,
    getConflicts,
    exportTrip,
    getActivitiesForDay,
    
    // Engine (for advanced usage)
    engine
  };
}

/**
 * Hook for individual day planning
 */
export function useDayPlanner(dayId, engine) {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const loadPlan = useCallback(async () => {
    setLoading(true);
    try {
      const dayPlan = await engine.getDayPlan(dayId);
      setPlan(dayPlan);
    } catch (error) {
      console.error('Failed to load day plan:', error);
    } finally {
      setLoading(false);
    }
  }, [engine, dayId]);
  
  useEffect(() => {
    loadPlan();
  }, [loadPlan]);
  
  return {
    plan,
    loading,
    reload: loadPlan
  };
}

/**
 * Hook for search with debouncing
 */
export function useActivitySearch(engine, options = {}) {
  const { debounceMs = 300 } = options;
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [filters, setFilters] = useState({});
  
  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }
    
    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        const searchResults = await engine.searchActivities(query, filters);
        setResults(searchResults);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setSearching(false);
      }
    }, debounceMs);
    
    return () => clearTimeout(timer);
  }, [query, filters, engine, debounceMs]);
  
  return {
    query,
    setQuery,
    results,
    searching,
    filters,
    setFilters
  };
}

/**
 * Hook for real-time validation
 */
export function useValidation(engine, dependencies = []) {
  const [validation, setValidation] = useState(null);
  const [validating, setValidating] = useState(false);
  
  const validate = useCallback(async () => {
    setValidating(true);
    try {
      const result = engine.validateTrip();
      setValidation(result);
      return result;
    } catch (error) {
      console.error('Validation error:', error);
      return null;
    } finally {
      setValidating(false);
    }
  }, [engine]);
  
  useEffect(() => {
    validate();
  }, [validate, ...dependencies]);
  
  return {
    validation,
    validating,
    revalidate: validate,
    isValid: validation?.valid || false,
    issues: validation?.summary?.totalIssues || 0,
    warnings: validation?.summary?.totalWarnings || 0
  };
}
