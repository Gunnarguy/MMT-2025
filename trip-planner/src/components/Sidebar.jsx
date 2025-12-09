/* ═══════════════════════════════════════════════════════════════════════════════
   MMT Trip Companion Sidebar
   Contextual companion panel - shows trip summary and selected activities
   NOT a parallel navigation system - complements the main view
   ═══════════════════════════════════════════════════════════════════════════════ */

import { useMemo } from 'react';
import PropTypes from 'prop-types';
import './Sidebar.css';
import { travelers as mmtTeam, dayItinerary, scheduleOptions as defaultScheduleOptions } from '../data/tripData';

/**
 * MMT Trip Companion Sidebar
 * Shows trip overview and selected activities - always in sync with main content
 */
export default function Sidebar({
  currentTravelerId = 'both',
  onTravelerChange,
  tripDays = dayItinerary,
  selectedActivities = new Set(),
  scheduleOptions = defaultScheduleOptions,
  selectedScheduleOption = 'classic',
  onScheduleOptionChange,
  onActivityToggle,
  activeMainTab = 'overview'
}) {
  // Get current traveler info
  const currentTraveler = useMemo(() => {
    if (currentTravelerId === 'both') return null;
    return mmtTeam.find(t => t.id === currentTravelerId);
  }, [currentTravelerId]);

  // Calculate trip stats from data
  const tripStats = useMemo(() => {
    const selectedRoute = scheduleOptions.find(s => s.id === selectedScheduleOption);
    return {
      totalDays: tripDays.length,
      totalMiles: selectedRoute?.totalMiles || '~600 mi',
      countries: 2,
      states: 4,
      activitiesSelected: selectedActivities.size
    };
  }, [tripDays, selectedScheduleOption, scheduleOptions, selectedActivities]);

  // Group selected activities by type
  const groupedActivities = useMemo(() => {
    const groups = {
      lobster: [],
      town: [],
      foliage: [],
      food: [],
      other: []
    };
    
    Array.from(selectedActivities).forEach(actId => {
      if (actId.includes('lobster')) groups.lobster.push(actId);
      else if (actId.includes('town')) groups.town.push(actId);
      else if (actId.includes('foliage') || actId.includes('drive')) groups.foliage.push(actId);
      else if (actId.includes('food') || actId.includes('restaurant')) groups.food.push(actId);
      else groups.other.push(actId);
    });
    
    return groups;
  }, [selectedActivities]);

  // Clean up activity name for display
  const formatActivityName = (actId) => {
    return actId
      .replace(/^(lobster|town|foliage|drive|food)-\d+-?/, '')
      .replace(/-/g, ' ')
      .trim() || actId;
  };

  return (
    <aside className="sidebar">
      {/* Trip Header - Always visible */}
      <div className="sidebar-header">
        <h2 className="sidebar-title">🍁 MMT 2025</h2>
        <p className="sidebar-subtitle">Your Trip Companion</p>
      </div>

      {/* Quick Stats Bar */}
      <div className="sidebar-stats">
        <div className="mini-stat">
          <span className="mini-stat-value">{tripStats.totalDays}</span>
          <span className="mini-stat-label">Days</span>
        </div>
        <div className="mini-stat">
          <span className="mini-stat-value">{tripStats.totalMiles}</span>
          <span className="mini-stat-label">Miles</span>
        </div>
        <div className="mini-stat">
          <span className="mini-stat-value">{tripStats.countries}</span>
          <span className="mini-stat-label">Countries</span>
        </div>
        <div className="mini-stat highlight">
          <span className="mini-stat-value">{tripStats.activitiesSelected}</span>
          <span className="mini-stat-label">Selected</span>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="sidebar-scroll">
        
        {/* Traveler Quick Switch */}
        <div className="sidebar-section">
          <h3 className="section-label">👥 Planning as</h3>
          <div className="traveler-switch">
            {mmtTeam.map(t => (
              <button
                key={t.id}
                className={`traveler-btn ${currentTravelerId === t.id ? 'is-active' : ''}`}
                onClick={() => onTravelerChange?.(t.id)}
                title={t.tripFocus}
              >
                <span className="traveler-emoji">{t.emoji}</span>
                <span className="traveler-name">{t.name}</span>
              </button>
            ))}
            <button
              className={`traveler-btn ${currentTravelerId === 'both' ? 'is-active' : ''}`}
              onClick={() => onTravelerChange?.('both')}
            >
              <span className="traveler-emoji">👫</span>
              <span className="traveler-name">Both</span>
            </button>
          </div>
          {currentTraveler && (
            <p className="traveler-focus">{currentTraveler.tripFocus}</p>
          )}
        </div>

        {/* Route Selection */}
        <div className="sidebar-section">
          <h3 className="section-label">🗺️ Route Style</h3>
          <div className="route-options">
            {scheduleOptions.map(option => (
              <button
                key={option.id}
                className={`route-option ${selectedScheduleOption === option.id ? 'is-selected' : ''}`}
                onClick={() => onScheduleOptionChange?.(option.id)}
              >
                <span className="route-emoji">{option.emoji}</span>
                <div className="route-info">
                  <span className="route-title">{option.title}</span>
                  <span className="route-duration">{option.duration}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Activities - The "My Trip" essence */}
        <div className="sidebar-section">
          <h3 className="section-label">
            ✨ My Selections
            {selectedActivities.size > 0 && (
              <span className="count-badge">{selectedActivities.size}</span>
            )}
          </h3>
          
          {selectedActivities.size === 0 ? (
            <div className="empty-selections">
              <p>No activities selected yet!</p>
              <p className="hint">Browse the tabs above and click "Add" on anything that catches your eye.</p>
            </div>
          ) : (
            <div className="selections-list">
              {/* Lobster Spots */}
              {groupedActivities.lobster.length > 0 && (
                <div className="selection-group">
                  <h4 className="group-label">🦞 Lobster ({groupedActivities.lobster.length})</h4>
                  {groupedActivities.lobster.map(actId => (
                    <div key={actId} className="selection-item">
                      <span className="selection-name">{formatActivityName(actId)}</span>
                      <button 
                        className="remove-btn"
                        onClick={() => onActivityToggle?.(actId)}
                        title="Remove"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Harbor Towns */}
              {groupedActivities.town.length > 0 && (
                <div className="selection-group">
                  <h4 className="group-label">⚓ Towns ({groupedActivities.town.length})</h4>
                  {groupedActivities.town.map(actId => (
                    <div key={actId} className="selection-item">
                      <span className="selection-name">{formatActivityName(actId)}</span>
                      <button 
                        className="remove-btn"
                        onClick={() => onActivityToggle?.(actId)}
                        title="Remove"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Foliage/Drives */}
              {groupedActivities.foliage.length > 0 && (
                <div className="selection-group">
                  <h4 className="group-label">🍁 Foliage ({groupedActivities.foliage.length})</h4>
                  {groupedActivities.foliage.map(actId => (
                    <div key={actId} className="selection-item">
                      <span className="selection-name">{formatActivityName(actId)}</span>
                      <button 
                        className="remove-btn"
                        onClick={() => onActivityToggle?.(actId)}
                        title="Remove"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Food */}
              {groupedActivities.food.length > 0 && (
                <div className="selection-group">
                  <h4 className="group-label">🍽️ Food ({groupedActivities.food.length})</h4>
                  {groupedActivities.food.map(actId => (
                    <div key={actId} className="selection-item">
                      <span className="selection-name">{formatActivityName(actId)}</span>
                      <button 
                        className="remove-btn"
                        onClick={() => onActivityToggle?.(actId)}
                        title="Remove"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Other */}
              {groupedActivities.other.length > 0 && (
                <div className="selection-group">
                  <h4 className="group-label">📍 Other ({groupedActivities.other.length})</h4>
                  {groupedActivities.other.map(actId => (
                    <div key={actId} className="selection-item">
                      <span className="selection-name">{formatActivityName(actId)}</span>
                      <button 
                        className="remove-btn"
                        onClick={() => onActivityToggle?.(actId)}
                        title="Remove"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Reminders - Condensed from old Planning tab */}
        <div className="sidebar-section">
          <h3 className="section-label">📋 Don't Forget</h3>
          <ul className="reminder-list">
            <li>🛂 Passport + ArriveCAN for Canada</li>
            <li>⛽ Fill up in NH (no gas tax!)</li>
            <li>🧥 Layers - 20° temp swings</li>
            <li>💵 Cash for small vendors</li>
          </ul>
        </div>

        {/* Contextual Tip based on active main tab */}
        {activeMainTab && (
          <div className="sidebar-section contextual-tip">
            <h3 className="section-label">💡 Tip</h3>
            {activeMainTab === 'lobster' && (
              <p>Pro tip: Red's Eats in Wiscasset is famous but has long lines. Try Five Islands for less crowds!</p>
            )}
            {activeMainTab === 'foliage' && (
              <p>Peak foliage moves south ~100 miles/week. Check foliage reports the week before!</p>
            )}
            {activeMainTab === 'towns' && (
              <p>Harbor towns are best in early morning before cruise ship crowds arrive.</p>
            )}
            {activeMainTab === 'food' && (
              <p>Make reservations for Montreal restaurants - especially for weekend brunch!</p>
            )}
            {activeMainTab === 'overview' && (
              <p>Click any card to add it to your selections. Your trip builds as you explore!</p>
            )}
            {activeMainTab === 'explore' && (
              <p>Use filters to narrow down by type. Everything you add appears in the sidebar!</p>
            )}
            {!['lobster', 'foliage', 'towns', 'food', 'overview', 'explore'].includes(activeMainTab) && (
              <p>Browse the tabs to discover activities. Add your favorites to build your perfect trip!</p>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}

Sidebar.propTypes = {
  currentTravelerId: PropTypes.string,
  onTravelerChange: PropTypes.func,
  tripDays: PropTypes.array,
  selectedActivities: PropTypes.instanceOf(Set),
  scheduleOptions: PropTypes.array,
  selectedScheduleOption: PropTypes.string,
  onScheduleOptionChange: PropTypes.func,
  onActivityToggle: PropTypes.func,
  activeMainTab: PropTypes.string
};
