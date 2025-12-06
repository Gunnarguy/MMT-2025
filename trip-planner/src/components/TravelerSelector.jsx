/* ═══════════════════════════════════════════════════════════════════════════════
   TravelerSelector Component
   Switch between trip perspectives: Mom (Tere), Wife (Mikaela), or Both
   Inspired by DDG-PCT's multi-hiker selection system
   ═══════════════════════════════════════════════════════════════════════════════ */

import { useState } from 'react';
import PropTypes from 'prop-types';
import { mmtTeam } from '../data/planContent';
import './TravelerSelector.css';

/**
 * TravelerSelector - Choose whose trip view to display
 * Supports individual traveler views or shared "Both" view
 * 
 * @param {string} currentTravelerId - Active traveler ID ('tere', 'mikaela', 'both')
 * @param {function} onTravelerChange - Callback when traveler selection changes
 * @param {boolean} compact - If true, render in compact chip mode
 */
export default function TravelerSelector({ 
  currentTravelerId = 'both', 
  onTravelerChange,
  compact = false 
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Build traveler options: individual travelers + "Both" option
  const travelerOptions = [
    ...mmtTeam,
    {
      id: 'both',
      name: 'Both',
      nickname: 'Shared View',
      role: 'Planning together',
      emoji: '👯‍♀️',
      isShared: true
    }
  ];

  // Find the currently selected traveler
  const currentTraveler = travelerOptions.find(t => t.id === currentTravelerId) || travelerOptions[2];

  /**
   * Handle traveler selection
   */
  const handleSelect = (travelerId) => {
    onTravelerChange?.(travelerId);
    setIsExpanded(false);
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // COMPACT MODE - Just shows chips for quick switching
  // ─────────────────────────────────────────────────────────────────────────────
  if (compact) {
    return (
      <div className="traveler-chips">
        {travelerOptions.map(traveler => (
          <button
            key={traveler.id}
            className={`traveler-chip ${currentTravelerId === traveler.id ? 'is-active' : ''} ${traveler.isShared ? 'traveler-chip--shared' : ''}`}
            onClick={() => handleSelect(traveler.id)}
            title={traveler.name}
          >
            <span className="chip-emoji">{traveler.emoji}</span>
            <span className="chip-name">{traveler.nickname || traveler.name}</span>
          </button>
        ))}
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // FULL MODE - Expandable card selector
  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="traveler-selector">
      {/* Current selection header */}
      <button 
        className="traveler-current"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <span className="current-emoji">{currentTraveler.emoji}</span>
        <div className="current-info">
          <span className="current-name">{currentTraveler.name}</span>
          <span className="current-role">{currentTraveler.role}</span>
        </div>
        <span className={`expand-icon ${isExpanded ? 'is-expanded' : ''}`}>
          ▼
        </span>
      </button>

      {/* Expandable options */}
      {isExpanded && (
        <div className="traveler-options">
          {travelerOptions.map(traveler => (
            <button
              key={traveler.id}
              className={`traveler-option ${currentTravelerId === traveler.id ? 'is-active' : ''} ${traveler.isShared ? 'traveler-option--shared' : ''}`}
              onClick={() => handleSelect(traveler.id)}
            >
              <span className="option-emoji">{traveler.emoji}</span>
              <div className="option-info">
                <span className="option-name">{traveler.name}</span>
                <span className="option-role">{traveler.role}</span>
                {traveler.tripFocus && (
                  <span className="option-focus">Focus: {traveler.tripFocus}</span>
                )}
              </div>
              {traveler.priorities && (
                <div className="option-priorities">
                  {traveler.priorities.slice(0, 3).map((priority, idx) => (
                    <span key={idx} className="priority-tag">{priority}</span>
                  ))}
                </div>
              )}
              {currentTravelerId === traveler.id && (
                <span className="check-mark">✓</span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Mini profile for current traveler */}
      {!isExpanded && currentTraveler.priorities && (
        <div className="traveler-profile">
          <div className="profile-section">
            <span className="profile-label">Top Priorities</span>
            <div className="profile-tags">
              {currentTraveler.priorities.slice(0, 3).map((priority, idx) => (
                <span key={idx} className="profile-tag">{priority}</span>
              ))}
            </div>
          </div>
          {currentTraveler.tripFocus && (
            <div className="profile-focus">
              <span className="focus-label">Focus:</span>
              <span className="focus-value">{currentTraveler.tripFocus}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

TravelerSelector.propTypes = {
  currentTravelerId: PropTypes.string,
  onTravelerChange: PropTypes.func,
  compact: PropTypes.bool
};
