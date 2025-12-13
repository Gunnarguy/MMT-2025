import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

// ═══════════════════════════════════════════════════════════════════════════════
// TRIP CONTEXT - Centralized state management for the entire app
// ═══════════════════════════════════════════════════════════════════════════════

const TripContext = createContext(null);

const defaultScenarioSettings = {
  pace: 'balanced',
  budget: 'flex',
  drive: 'classic'
};

const buildBlankCanvas = () =>
  Array.from({ length: 7 }).map((_, idx) => ({
    id: `canvas-day-${idx + 1}`,
    label: `Day ${idx + 1}`,
    location: 'Add a destination',
    notes: '',
  }));

export function TripProvider({ children }) {
  // ═══════════════════════════════════════════════════════════════════════════
  // CORE STATE
  // ═══════════════════════════════════════════════════════════════════════════
  
  // Current traveler view (tere, mikaela, or both)
  const [currentTravelerId, setCurrentTravelerId] = useState(() => {
    const saved = localStorage.getItem('mmtrip-current-traveler');
    return saved || 'both';
  });

  // Selected schedule option
  const [selectedScheduleOption, setSelectedScheduleOption] = useState(() => {
    const saved = localStorage.getItem('mmtrip-schedule-option');
    return saved || 'classic';
  });

  // Per-traveler activity selections
  const [travelerSelections, setTravelerSelections] = useState(() => {
    const saved = localStorage.getItem('mmtrip-traveler-selections');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        tere: new Set(parsed.tere || []),
        mikaela: new Set(parsed.mikaela || []),
        both: new Set(parsed.both || [])
      };
    }
    return {
      tere: new Set(),
      mikaela: new Set(),
      both: new Set()
    };
  });

  // Selected activities with full details
  const [selectedActivities, setSelectedActivities] = useState(() => {
    const saved = localStorage.getItem('mmtrip-activities');
    return saved ? JSON.parse(saved) : [];
  });

  const [experienceMode, setExperienceMode] = useState(() => {
    if (typeof window === 'undefined') return 'mom-blueprint';
    return localStorage.getItem('mmtrip-experience-mode') || 'mom-blueprint';
  });

  const [scenarioSettings, setScenarioSettings] = useState(() => {
    if (typeof window === 'undefined') return defaultScenarioSettings;
    try {
      const saved = localStorage.getItem('mmtrip-scenario-settings');
      return saved ? { ...defaultScenarioSettings, ...JSON.parse(saved) } : defaultScenarioSettings;
    } catch (err) {
      console.warn('Failed to parse scenario settings', err);
      return defaultScenarioSettings;
    }
  });

  const [ideaPins, setIdeaPins] = useState(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('mmtrip-idea-pins');
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.warn('Failed to parse idea pins', err);
      return [];
    }
  });

  const [creationNotes, setCreationNotes] = useState(() => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem('mmtrip-creation-notes') || '';
  });

  const [canvasBlueprint, setCanvasBlueprint] = useState(() => {
    if (typeof window === 'undefined') return buildBlankCanvas();
    try {
      const saved = localStorage.getItem('mmtrip-canvas-blueprint');
      return saved ? JSON.parse(saved) : buildBlankCanvas();
    } catch (err) {
      console.warn('Failed to parse canvas blueprint', err);
      return buildBlankCanvas();
    }
  });

  // UI state
  const [activeTab, setActiveTab] = useState('overview');
  const [showSidebar, setShowSidebar] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth > 900;
    }
    return false;
  });
  const [selectedDay, setSelectedDay] = useState(null);

  // ═══════════════════════════════════════════════════════════════════════════
  // PERSISTENCE
  // ═══════════════════════════════════════════════════════════════════════════

  useEffect(() => {
    localStorage.setItem('mmtrip-current-traveler', currentTravelerId);
  }, [currentTravelerId]);

  useEffect(() => {
    localStorage.setItem('mmtrip-schedule-option', selectedScheduleOption);
  }, [selectedScheduleOption]);

  useEffect(() => {
    const selectionsToSave = {
      tere: Array.from(travelerSelections.tere || []),
      mikaela: Array.from(travelerSelections.mikaela || []),
      both: Array.from(travelerSelections.both || [])
    };
    localStorage.setItem('mmtrip-traveler-selections', JSON.stringify(selectionsToSave));
  }, [travelerSelections]);

  useEffect(() => {
    localStorage.setItem('mmtrip-activities', JSON.stringify(selectedActivities));
  }, [selectedActivities]);

  useEffect(() => {
    localStorage.setItem('mmtrip-experience-mode', experienceMode);
  }, [experienceMode]);

  useEffect(() => {
    localStorage.setItem('mmtrip-scenario-settings', JSON.stringify(scenarioSettings));
  }, [scenarioSettings]);

  useEffect(() => {
    localStorage.setItem('mmtrip-idea-pins', JSON.stringify(ideaPins));
  }, [ideaPins]);

  useEffect(() => {
    localStorage.setItem('mmtrip-creation-notes', creationNotes);
  }, [creationNotes]);

  useEffect(() => {
    localStorage.setItem('mmtrip-canvas-blueprint', JSON.stringify(canvasBlueprint));
  }, [canvasBlueprint]);

  // ═══════════════════════════════════════════════════════════════════════════
  // COMPUTED STATE
  // ═══════════════════════════════════════════════════════════════════════════

  const currentSelections = useMemo(() => {
    return new Set(travelerSelections[currentTravelerId] || []);
  }, [travelerSelections, currentTravelerId]);

  // ═══════════════════════════════════════════════════════════════════════════
  // ACTIONS
  // ═══════════════════════════════════════════════════════════════════════════

  const toggleActivityForTraveler = useCallback((activityId, travelerId = currentTravelerId) => {
    setTravelerSelections(prev => {
      const travelerSet = new Set(prev[travelerId] || []);
      if (travelerSet.has(activityId)) {
        travelerSet.delete(activityId);
      } else {
        travelerSet.add(activityId);
      }
      return {
        ...prev,
        [travelerId]: travelerSet
      };
    });
  }, [currentTravelerId]);

  const addActivity = useCallback((activity) => {
    setSelectedActivities(prev => {
      // Avoid duplicates
      if (prev.some(a => a.id === activity.id)) return prev;
      return [...prev, activity];
    });
    toggleActivityForTraveler(activity.id);
  }, [toggleActivityForTraveler]);

  const removeActivity = useCallback((activityId) => {
    setSelectedActivities(prev => prev.filter(a => a.id !== activityId));
    // Remove from all traveler selections
    setTravelerSelections(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(travelerId => {
        const set = new Set(updated[travelerId]);
        set.delete(activityId);
        updated[travelerId] = set;
      });
      return updated;
    });
  }, []);

  const assignToDay = useCallback((activityId, dayId) => {
    setSelectedActivities(prev => 
      prev.map(activity => 
        activity.id === activityId 
          ? { ...activity, dayId } 
          : activity
      )
    );
  }, []);

  const getActivitiesForDay = useCallback((dayId) => {
    return selectedActivities.filter(a => a.dayId === dayId);
  }, [selectedActivities]);

  const clearAllSelections = useCallback(() => {
    setSelectedActivities([]);
    setTravelerSelections({
      tere: new Set(),
      mikaela: new Set(),
      both: new Set()
    });
  }, []);

  const isActivitySelected = useCallback((activityId) => {
    return currentSelections.has(activityId);
  }, [currentSelections]);

  const updateScenarioSetting = useCallback((key, value) => {
    setScenarioSettings(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const pinIdea = useCallback((idea) => {
    if (!idea || !idea.id) return;
    setIdeaPins(prev => {
      if (prev.some(item => item.id === idea.id)) return prev;
      return [...prev, idea];
    });
  }, []);

  const unpinIdea = useCallback((ideaId) => {
    setIdeaPins(prev => prev.filter(item => item.id !== ideaId));
  }, []);

  const resetIdeaPins = useCallback(() => {
    setIdeaPins([]);
  }, []);

  const resetCanvasBlueprint = useCallback(() => {
    setCanvasBlueprint(buildBlankCanvas());
  }, []);

  const updateCanvasDay = useCallback((dayId, updates) => {
    setCanvasBlueprint(prev => prev.map(day => (
      day.id === dayId ? { ...day, ...updates } : day
    )));
  }, []);

  const hydrateCanvasFromStops = useCallback((stops = []) => {
    if (!Array.isArray(stops) || stops.length === 0) {
      resetCanvasBlueprint();
      return;
    }
    const normalized = stops.map((stop, idx) => ({
      id: `canvas-stop-${stop.id ?? idx}`,
      label: `${idx + 1}. ${stop.name || 'Stop'}`,
      location: stop.state ? `${stop.name}, ${stop.state}` : stop.name || 'Add a location',
      notes: stop.momQuote || stop.role || '',
    }));
    setCanvasBlueprint(normalized);
  }, [resetCanvasBlueprint]);

  // ═══════════════════════════════════════════════════════════════════════════
  // CONTEXT VALUE
  // ═══════════════════════════════════════════════════════════════════════════

  const value = {
    // State
    currentTravelerId,
    selectedScheduleOption,
    travelerSelections,
    selectedActivities,
    activeTab,
    showSidebar,
    selectedDay,
    currentSelections,
    experienceMode,
    scenarioSettings,
    ideaPins,
    creationNotes,
    canvasBlueprint,
    
    // Actions
    setCurrentTravelerId,
    setSelectedScheduleOption,
    toggleActivityForTraveler,
    addActivity,
    removeActivity,
    assignToDay,
    getActivitiesForDay,
    clearAllSelections,
    isActivitySelected,
    setActiveTab,
    setShowSidebar,
    setSelectedDay,
    setExperienceMode,
    updateScenarioSetting,
    pinIdea,
    unpinIdea,
    resetIdeaPins,
    setCreationNotes,
    resetCanvasBlueprint,
    updateCanvasDay,
    hydrateCanvasFromStops
  };

  return (
    <TripContext.Provider value={value}>
      {children}
    </TripContext.Provider>
  );
}

TripProvider.propTypes = {
  children: PropTypes.node.isRequired
};

// Custom hook for using the trip context
export function useTripContext() {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTripContext must be used within a TripProvider');
  }
  return context;
}
