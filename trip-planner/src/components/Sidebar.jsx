/* ═══════════════════════════════════════════════════════════════════════════════
   MMT Mission Control Sidebar
   Tabbed interface for navigating trip planning sections
   Modeled after DDG-PCT sidebar structure
   ═══════════════════════════════════════════════════════════════════════════════ */

import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import './Sidebar.css';
import TravelerSelector from './TravelerSelector';
import { travelers as mmtTeam, dayItinerary, scheduleOptions as defaultScheduleOptions } from '../data/tripData';

/**
 * MMT Mission Control Sidebar
 */
export default function Sidebar({
  currentTravelerId = 'both',
  onTravelerChange,
  tripDays = dayItinerary,
  selectedActivities = new Set(),
  onSelectDay,
  scheduleOptions = defaultScheduleOptions,
  selectedScheduleOption = 'classic',
  onScheduleOptionChange,
  onActivityToggle
}) {
  const [activeTab, setActiveTab] = useState('mission');

  // Tab configuration
  const tabs = [
    { id: 'mission', label: 'Mission', icon: '🎯' },
    { id: 'itinerary', label: 'Itinerary', icon: '📅' },
    { id: 'activities', label: 'Activities', icon: '🦞' },
    { id: 'lodging', label: 'Lodging', icon: '🏨' },
    { id: 'planning', label: 'Planning', icon: '📋' },
    { id: 'map', label: 'Map', icon: '🗺️' }
  ];

  // Calculate trip stats from data
  const tripStats = useMemo(() => {
    const totalMiles = scheduleOptions.find(s => s.id === selectedScheduleOption)?.totalMiles || '~600 mi';
    return {
      totalDays: tripDays.length,
      totalMiles,
      countries: 2,
      states: 4,
      lobsterSpots: 8,
      harborTowns: 6,
      activitiesSelected: selectedActivities.size
    };
  }, [tripDays, selectedScheduleOption, scheduleOptions, selectedActivities]);

  // ═══════════════════════════════════════════════════════════════════════════════
  // TAB CONTENT RENDERERS
  // ═══════════════════════════════════════════════════════════════════════════════

  /**
   * Mission/Overview Tab - Who's planning, route options, quick stats
   */
  const renderMission = () => (
    <div className="sidebar-section">
      {/* Traveler Selector */}
      <div className="sidebar-card traveler-card">
        <h3 className="card-title">👥 Who's Planning?</h3>
        <p className="card-subtitle">Switch between planners to see different perspectives</p>
        <TravelerSelector
          currentTravelerId={currentTravelerId}
          onTravelerChange={onTravelerChange}
        />
      </div>

      {/* Route Options */}
      <div className="sidebar-card">
        <h3 className="card-title">🗺️ Route Options</h3>
        <p className="card-subtitle">Choose your adventure style</p>
        <div className="schedule-options">
          {scheduleOptions.map(option => (
            <button
              key={option.id}
              className={`schedule-option ${selectedScheduleOption === option.id ? 'is-selected' : ''}`}
              onClick={() => onScheduleOptionChange?.(option.id)}
            >
              <div className="schedule-header">
                <span className="schedule-emoji">{option.emoji}</span>
                <span className="schedule-title">{option.title}</span>
                <span className="schedule-duration">{option.duration}</span>
              </div>
              <p className="schedule-vibe">{option.vibe}</p>
              {selectedScheduleOption === option.id && (
                <div className="schedule-details">
                  <ul className="schedule-highlights">
                    {option.highlights?.slice(0, 3).map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                  <div className="schedule-miles">📏 {option.totalMiles}</div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="sidebar-card stats-card">
        <h3 className="card-title">📊 Trip at a Glance</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-value">{tripStats.totalDays}</span>
            <span className="stat-label">Days</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{tripStats.totalMiles}</span>
            <span className="stat-label">Miles</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{tripStats.countries}</span>
            <span className="stat-label">Countries</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{tripStats.states}</span>
            <span className="stat-label">States</span>
          </div>
          <div className="stat-item highlight">
            <span className="stat-value">{tripStats.lobsterSpots}</span>
            <span className="stat-label">🦞 Spots</span>
          </div>
          <div className="stat-item highlight">
            <span className="stat-value">{tripStats.harborTowns}</span>
            <span className="stat-label">⚓ Towns</span>
          </div>
        </div>
      </div>

      {/* Current Traveler Focus */}
      {currentTravelerId !== 'both' && (
        <div className="sidebar-card">
          <h3 className="card-title">🎯 {mmtTeam.find(t => t.id === currentTravelerId)?.name}'s Focus</h3>
          <p className="card-subtitle">
            {mmtTeam.find(t => t.id === currentTravelerId)?.tripFocus}
          </p>
          <div className="profile-tags">
            {mmtTeam.find(t => t.id === currentTravelerId)?.priorities?.map((p, i) => (
              <span key={i} className="profile-tag">{p}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  /**
   * Itinerary Tab - Day-by-day overview with expandable cards
   */
  const renderItinerary = () => (
    <div className="sidebar-section">
      <div className="section-header">
        <h2>📅 Day-by-Day</h2>
        <p className="section-subtitle">Mom's original plan + your additions</p>
      </div>
      
      <div className="itinerary-list">
        {tripDays.map(day => (
          <button
            key={day.dayNumber}
            className={`day-card ${day.type?.toLowerCase() || 'explore'}`}
            onClick={() => onSelectDay?.(day.dayNumber)}
          >
            <div className="day-card-header">
              <div className="day-badge">
                <span>{day.emoji || '📍'}</span>
                <span>Day {day.dayNumber}</span>
              </div>
              <span className="day-label">{day.date}</span>
            </div>
            
            <div className="day-route">
              <span className="route-from">{day.from}</span>
              <span className="route-arrow">→</span>
              <span className="route-to">{day.to}</span>
            </div>
            
            {day.driveTime && (
              <div className="day-drive-time">
                <span>🚗</span>
                <span>{day.driveTime}h drive</span>
              </div>
            )}
            
            <p className="day-description">{day.description}</p>
            
            {day.foliage && (
              <span className={`foliage-badge ${day.foliage?.includes('peak') ? 'foliage-peak' : 'foliage-approaching'}`}>
                🍂 {day.foliage}
              </span>
            )}
            
            {day.momNote && (
              <div className="mom-note">
                <span className="note-icon">💡</span>
                <span>{day.momNote}</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );

  /**
   * Activities Tab - Selected activities overview
   */
  const renderActivities = () => (
    <div className="sidebar-section">
      <div className="section-header">
        <h2>🦞 Activities</h2>
        <p className="section-subtitle">{selectedActivities.size} selected</p>
      </div>
      
      <div className="sidebar-card">
        <h3 className="card-title">Selected Activities</h3>
        {selectedActivities.size === 0 ? (
          <p className="empty-state">
            No activities selected yet. Browse the main tabs to add lobster spots, 
            harbor towns, and scenic drives!
          </p>
        ) : (
          <div className="activity-list-mini">
            {Array.from(selectedActivities).slice(0, 10).map(actId => (
              <div key={actId} className="activity-chip">
                {actId.includes('lobster') && '🦞'}
                {actId.includes('town') && '⚓'}
                {actId.includes('drive') && '🚗'}
                {actId.includes('foliage') && '🍁'}
                <span>{actId.replace(/^(lobster|town|drive|foliage)-\d+-?/, '')}</span>
              </div>
            ))}
            {selectedActivities.size > 10 && (
              <span className="more-count">+{selectedActivities.size - 10} more</span>
            )}
          </div>
        )}
      </div>
      
      <div className="sidebar-card">
        <h3 className="card-title">Quick Add</h3>
        <p className="card-subtitle">Jump to explore:</p>
        <div className="quick-nav">
          <a href="#lobster" className="quick-nav-btn">🦞 Lobster</a>
          <a href="#towns" className="quick-nav-btn">⚓ Towns</a>
          <a href="#foliage" className="quick-nav-btn">🍁 Foliage</a>
          <a href="#lodging" className="quick-nav-btn">🏨 Lodging</a>
        </div>
      </div>
    </div>
  );

  /**
   * Lodging Tab - Accommodation overview
   */
  const renderLodging = () => (
    <div className="sidebar-section">
      <div className="section-header">
        <h2>🏨 Lodging</h2>
        <p className="section-subtitle">Where you'll stay each night</p>
      </div>
      
      {tripDays.filter(d => d.lodging).map(day => (
        <div key={day.dayNumber} className="sidebar-card">
          <div className="lodging-header">
            <span className="night-badge">Night {day.dayNumber}</span>
            <span className="lodging-location">{day.to}</span>
          </div>
          <h4 className="lodging-name">{day.lodging?.name || 'TBD'}</h4>
          {day.lodging?.confirmed && (
            <span className="confirmed-badge">✓ Confirmed</span>
          )}
          {day.lodging?.note && (
            <p className="lodging-note">{day.lodging.note}</p>
          )}
        </div>
      ))}
    </div>
  );

  /**
   * Planning Tab - Logistics, border info, packing
   */
  const renderPlanning = () => (
    <div className="sidebar-section">
      <div className="section-header">
        <h2>📋 Planning</h2>
        <p className="section-subtitle">Logistics & preparation</p>
      </div>
      
      {/* Border Crossing Alert */}
      <div className="sidebar-card risk-card likelihood-medium">
        <h3 className="card-title">🛂 Canada Border</h3>
        <div className="checklist-mini">
          <ul>
            <li>Valid passport (not expiring within 6 months)</li>
            <li>ArriveCAN app downloaded</li>
            <li>Car registration & insurance</li>
            <li>Rental car letter of authorization</li>
          </ul>
        </div>
        <p className="detail-note">⚠️ Missing docs = denied entry!</p>
      </div>
      
      {/* Gas Tips */}
      <div className="sidebar-card">
        <h3 className="card-title">⛽ Fuel Strategy</h3>
        <div className="detail-row">
          <span className="detail-label">Best gas prices</span>
          <span className="detail-value">New Hampshire (no tax!)</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Estimated fuel cost</span>
          <span className="detail-value">~$120-150</span>
        </div>
        <p className="detail-note">Fill up before Maine & Vermont</p>
      </div>
      
      {/* Packing Reminder */}
      <div className="sidebar-card">
        <h3 className="card-title">🧳 Don't Forget</h3>
        <div className="checklist-mini">
          <ul>
            <li>Layers! Coast → mountains = 20° swing</li>
            <li>Rain jacket (foggy mornings)</li>
            <li>Bibs or bibs for lobster eating</li>
            <li>Camera/phone charged</li>
            <li>Cash for small vendors</li>
          </ul>
        </div>
      </div>
    </div>
  );

  /**
   * Map Tab - Quick map overview
   */
  const renderMap = () => (
    <div className="sidebar-section">
      <div className="section-header">
        <h2>🗺️ Route Overview</h2>
        <p className="section-subtitle">Your journey at a glance</p>
      </div>
      
      <div className="sidebar-card">
        <div className="route-summary">
          <div className="route-leg">
            <span className="leg-badge">Leg 1</span>
            <span>Boston → Portland, ME</span>
            <span className="leg-distance">~2h</span>
          </div>
          <div className="route-leg">
            <span className="leg-badge">Leg 2</span>
            <span>Portland → Chelsea, VT</span>
            <span className="leg-distance">~3h</span>
          </div>
          <div className="route-leg">
            <span className="leg-badge">Leg 3</span>
            <span>Chelsea → Montreal, QC</span>
            <span className="leg-distance">~2.5h</span>
          </div>
          <div className="route-leg">
            <span className="leg-badge">Leg 4</span>
            <span>Montreal → Saratoga/Placid</span>
            <span className="leg-distance">~3h</span>
          </div>
          <div className="route-leg">
            <span className="leg-badge">Leg 5</span>
            <span>Final → Albany Airport</span>
            <span className="leg-distance">~1h</span>
          </div>
        </div>
      </div>
      
      <p className="map-note">
        🗺️ Full interactive map available in the main view. 
        Click Overview tab to see the complete route!
      </p>
    </div>
  );

  // Tab content router
  const renderTabContent = () => {
    switch (activeTab) {
      case 'mission': return renderMission();
      case 'itinerary': return renderItinerary();
      case 'activities': return renderActivities();
      case 'lodging': return renderLodging();
      case 'planning': return renderPlanning();
      case 'map': return renderMap();
      default: return renderMission();
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════════
  return (
    <aside className="sidebar">
      {/* Tab Navigation */}
      <nav className="sidebar-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`sidebar-tab ${activeTab === tab.id ? 'is-active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Tab Content */}
      <div className="sidebar-content">
        {renderTabContent()}
      </div>
    </aside>
  );
}

Sidebar.propTypes = {
  currentTravelerId: PropTypes.string,
  onTravelerChange: PropTypes.func,
  tripDays: PropTypes.array,
  selectedActivities: PropTypes.instanceOf(Set),
  onSelectDay: PropTypes.func,
  scheduleOptions: PropTypes.array,
  selectedScheduleOption: PropTypes.string,
  onScheduleOptionChange: PropTypes.func,
  onActivityToggle: PropTypes.func
};
