import { useState } from 'react';
import PropTypes from 'prop-types';
import './DrivingDirections.css';

/**
 * DrivingDirections Component
 * Shows turn-by-turn directions between activities with expandable route segments
 */
export default function DrivingDirections({ routes, loading, error }) {
  const [expandedRoute, setExpandedRoute] = useState(null);

  /**
   * Format seconds into human-readable duration
   */
  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.round((seconds % 3600) / 60);
    
    if (hours === 0) return `${minutes} min`;
    if (minutes === 0) return `${hours} hr`;
    return `${hours} hr ${minutes} min`;
  };

  /**
   * Get turn direction emoji for navigation
   */
  const getTurnEmoji = (maneuver, modifier) => {
    if (maneuver === 'depart') return '🚗';
    if (maneuver === 'arrive') return '🏁';
    if (maneuver === 'turn') {
      if (modifier?.includes('left')) return '⬅️';
      if (modifier?.includes('right')) return '➡️';
      if (modifier?.includes('uturn')) return '↩️';
    }
    if (maneuver === 'merge') return '🔀';
    if (maneuver === 'fork') return '🔱';
    if (maneuver === 'roundabout') return '🔄';
    if (maneuver === 'continue') return '⬆️';
    return '📍';
  };
  
  if (loading) {
    return (
      <div className="directions-loading">
        <div className="loading-spinner">🚗</div>
        <p>Calculating best routes...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="directions-error">
        <p>⚠️ Couldn't load routes: {error}</p>
      </div>
    );
  }
  
  if (!routes || routes.length === 0) {
    return null;
  }
  
  // Calculate total trip stats
  const totalMiles = routes.reduce((sum, r) => sum + parseFloat(r.distanceMiles), 0);
  const totalMinutes = routes.reduce((sum, r) => sum + r.durationMinutes, 0);
  
  return (
    <div className="driving-directions">
      <div className="directions-header">
        <h4>🧭 Turn-by-Turn Directions</h4>
        <div className="trip-totals">
          <span className="total-distance">📏 {totalMiles.toFixed(1)} mi total</span>
          <span className="total-time">⏱️ {formatDuration(totalMinutes * 60)} driving</span>
        </div>
      </div>
      
      <div className="route-segments">
        {routes.map((route, idx) => (
          <div key={idx} className="route-segment">
            <div 
              className="segment-header"
              onClick={() => setExpandedRoute(expandedRoute === idx ? null : idx)}
            >
              <div className="segment-info">
                <span className="segment-number">{idx + 1}</span>
                <div className="segment-endpoints">
                  <strong>{route.from}</strong>
                  <span className="arrow">→</span>
                  <strong>{route.to}</strong>
                </div>
              </div>
              <div className="segment-stats">
                <span className="distance">{route.distanceMiles} mi</span>
                <span className="duration">{route.durationFormatted}</span>
                <span className={`expand-icon ${expandedRoute === idx ? 'expanded' : ''}`}>
                  {expandedRoute === idx ? '▼' : '▶'}
                </span>
              </div>
            </div>
            
            {expandedRoute === idx && route.steps && route.steps.length > 0 && (
              <div className="segment-steps">
                {route.steps.map((step, stepIdx) => (
                  <div key={stepIdx} className="direction-step">
                    <span className="step-icon">{getTurnEmoji(step.maneuver, step.modifier)}</span>
                    <div className="step-details">
                      <span className="step-instruction">
                        {step.instruction.charAt(0).toUpperCase() + step.instruction.slice(1)}
                        {step.name !== 'unnamed road' && ` onto ${step.name}`}
                      </span>
                      <span className="step-meta">
                        {step.distance} mi • {step.duration} min
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {route.isFallback && (
              <div className="fallback-notice">
                ℹ️ Estimated (straight-line) - actual roads may vary
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

DrivingDirections.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.shape({
    from: PropTypes.string,
    to: PropTypes.string,
    distanceMiles: PropTypes.string,
    durationFormatted: PropTypes.string,
    durationMinutes: PropTypes.number,
    steps: PropTypes.array,
    isFallback: PropTypes.bool
  })),
  loading: PropTypes.bool,
  error: PropTypes.string
};
