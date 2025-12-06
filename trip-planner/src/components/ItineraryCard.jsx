/* ═══════════════════════════════════════════════════════════════════════════════
   ItineraryCard Component
   Reusable day card for the trip itinerary with expandable details
   Supports activity selection, driving info, and mom's notes
   ═══════════════════════════════════════════════════════════════════════════════ */

import { useState } from 'react';
import PropTypes from 'prop-types';
import './ItineraryCard.css';

/**
 * ItineraryCard - Displays a single day of the trip itinerary
 * 
 * @param {object} day - Day data from dayItinerary
 * @param {boolean} isSelected - Whether this day is currently selected
 * @param {function} onSelect - Callback when day is selected
 * @param {function} onActivityToggle - Callback when an activity is toggled
 * @param {Set} selectedActivities - Set of selected activity IDs
 * @param {string} travelerId - Current traveler view ('tere', 'mikaela', 'both')
 */
export default function ItineraryCard({
  day,
  isSelected = false,
  onSelect,
  onActivityToggle,
  selectedActivities = new Set(),
  travelerId = 'both'
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Determine card style based on day type
  const getDayTypeClass = () => {
    const type = day.type?.toLowerCase() || 'explore';
    if (type.includes('drive') || type.includes('travel')) return 'drive';
    if (type.includes('explore') || type.includes('relax')) return 'explore';
    return 'travel';
  };

  // Format driving time display
  const formatDriveTime = (hours) => {
    if (!hours) return null;
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  };

  // Get foliage status badge class
  const getFoliageClass = (status) => {
    if (!status) return null;
    const s = status.toLowerCase();
    if (s.includes('peak')) return 'foliage-peak';
    if (s.includes('approach')) return 'foliage-approaching';
    return 'foliage-early';
  };

  /**
   * Handle card click - select day
   */
  const handleClick = () => {
    onSelect?.(day.dayNumber);
  };

  /**
   * Handle expand/collapse
   */
  const handleExpand = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  /**
   * Handle activity checkbox toggle
   */
  const handleActivityToggle = (activityId, e) => {
    e.stopPropagation();
    onActivityToggle?.(activityId, travelerId);
  };

  // Safely access arrays
  const activities = day.activities || [];
  const dining = day.dining || [];
  const highlights = day.highlights || [];

  return (
    <div 
      className={`itinerary-card ${getDayTypeClass()} ${isSelected ? 'is-selected' : ''}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      {/* Card Header */}
      <div className="card-header">
        <div className="day-badge">
          <span className="badge-emoji">{day.emoji || '📍'}</span>
          <span className="badge-text">Day {day.dayNumber}</span>
        </div>
        <span className="day-date">{day.date}</span>
        <button 
          className={`expand-btn ${isExpanded ? 'is-expanded' : ''}`}
          onClick={handleExpand}
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
        >
          {isExpanded ? '−' : '+'}
        </button>
      </div>

      {/* Route Display */}
      <div className="card-route">
        <span className="route-from">{day.from}</span>
        <span className="route-arrow">→</span>
        <span className="route-to">{day.to}</span>
      </div>

      {/* Day Label */}
      <h3 className="card-title">{day.label}</h3>

      {/* Driving Info */}
      {day.driveTime && (
        <div className="drive-info">
          <span className="drive-icon">🚗</span>
          <span className="drive-time">{formatDriveTime(day.driveTime)}</span>
          {day.driveNotes && <span className="drive-notes">• {day.driveNotes}</span>}
        </div>
      )}

      {/* Description */}
      {day.description && (
        <p className="card-description">{day.description}</p>
      )}

      {/* Foliage Badge */}
      {day.foliage && (
        <span className={`foliage-badge ${getFoliageClass(day.foliage)}`}>
          🍂 {day.foliage}
        </span>
      )}

      {/* Mom's Note */}
      {day.momNote && (
        <div className="mom-note">
          <span className="note-icon">💡</span>
          <span className="note-text">{day.momNote}</span>
        </div>
      )}

      {/* Expanded Content */}
      {isExpanded && (
        <div className="card-expanded">
          {/* Highlights */}
          {highlights.length > 0 && (
            <div className="expanded-section">
              <h4 className="section-title">✨ Highlights</h4>
              <ul className="highlight-list">
                {highlights.map((highlight, idx) => (
                  <li key={idx}>{highlight}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Activities with checkboxes */}
          {activities.length > 0 && (
            <div className="expanded-section">
              <h4 className="section-title">🎯 Activities</h4>
              <div className="activity-list">
                {activities.map((activity) => {
                  const activityId = `day${day.dayNumber}-${activity.id || activity.name?.replace(/\s+/g, '-').toLowerCase()}`;
                  const isChecked = selectedActivities.has(activityId);
                  
                  return (
                    <label 
                      key={activityId} 
                      className={`activity-item ${isChecked ? 'is-selected' : ''}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => handleActivityToggle(activityId, e)}
                        className="activity-checkbox"
                      />
                      <span className="activity-emoji">{activity.emoji || '📌'}</span>
                      <div className="activity-info">
                        <span className="activity-name">{activity.name}</span>
                        {activity.duration && (
                          <span className="activity-duration">{activity.duration}</span>
                        )}
                        {activity.note && (
                          <span className="activity-note">{activity.note}</span>
                        )}
                      </div>
                      {activity.priority && (
                        <span className={`priority-badge priority-${activity.priority}`}>
                          {activity.priority === 'must' ? '⭐' : activity.priority === 'high' ? '!' : '?'}
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Dining Options */}
          {dining.length > 0 && (
            <div className="expanded-section">
              <h4 className="section-title">🍽️ Dining</h4>
              <div className="dining-list">
                {dining.map((spot, idx) => (
                  <div key={idx} className="dining-item">
                    <span className="dining-emoji">{spot.emoji || '🍴'}</span>
                    <div className="dining-info">
                      <span className="dining-name">{spot.name}</span>
                      {spot.type && <span className="dining-type">{spot.type}</span>}
                      {spot.note && <span className="dining-note">{spot.note}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lodging */}
          {day.lodging && (
            <div className="expanded-section">
              <h4 className="section-title">🏨 Lodging</h4>
              <div className="lodging-info">
                <span className="lodging-name">{day.lodging.name}</span>
                {day.lodging.confirmed && (
                  <span className="confirmed-badge">✓ Confirmed</span>
                )}
                {day.lodging.note && (
                  <span className="lodging-note">{day.lodging.note}</span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

ItineraryCard.propTypes = {
  day: PropTypes.shape({
    dayNumber: PropTypes.number.isRequired,
    date: PropTypes.string,
    from: PropTypes.string,
    to: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    emoji: PropTypes.string,
    description: PropTypes.string,
    driveTime: PropTypes.number,
    driveNotes: PropTypes.string,
    foliage: PropTypes.string,
    momNote: PropTypes.string,
    highlights: PropTypes.arrayOf(PropTypes.string),
    activities: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      emoji: PropTypes.string,
      duration: PropTypes.string,
      note: PropTypes.string,
      priority: PropTypes.oneOf(['must', 'high', 'medium', 'low'])
    })),
    dining: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
      emoji: PropTypes.string,
      note: PropTypes.string
    })),
    lodging: PropTypes.shape({
      name: PropTypes.string,
      confirmed: PropTypes.bool,
      note: PropTypes.string
    })
  }).isRequired,
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func,
  onActivityToggle: PropTypes.func,
  selectedActivities: PropTypes.instanceOf(Set),
  travelerId: PropTypes.string
};
