import { useState } from "react";
import { appleMapsHref, directionsHref, telHref } from "../../lib/format";

/**
 * Passenger Co-Pilot HUD.
 *
 * Dedicated in-car shotgun console providing instant 1-tap navigation,
 * direct phone dialing, parking/gate pro-tips, and daylight/timezone awareness.
 */

export default function CoPilotHUD({ day, stops = [] }) {
  const [activeStopIdx, setActiveStopIdx] = useState(0);
  const [isOpen, setIsOpen] = useState(true);

  if (!stops || stops.length === 0) return null;

  const currentIdx = Math.min(Math.max(0, activeStopIdx), stops.length - 1);
  const currentStop = stops[currentIdx];
  const previousStop = currentIdx > 0 ? stops[currentIdx - 1] : null;

  const appleMap = appleMapsHref(
    currentStop.address || currentStop.name,
    previousStop?.address || previousStop?.name
  );
  const googleMap = directionsHref(
    previousStop?.address || previousStop?.name,
    currentStop.address || currentStop.name
  );
  const tel = telHref(currentStop.phone);

  // Key parking / gate tip
  const topTip = currentStop.tips?.[0] || currentStop.blurb;

  return (
    <div className="copilot-hud">
      <div className="copilot-head" onClick={() => setIsOpen((p) => !p)}>
        <div className="copilot-badge">
          <span className="copilot-radar" aria-hidden="true" />
          <span className="copilot-title">🚗 In-Car Co-Pilot</span>
        </div>
        <div className="copilot-summary">
          <b>{day?.title ? `${day.title} · ` : ""}Stop {currentIdx + 1} of {stops.length}:</b> {currentStop.name}
        </div>
        <button
          type="button"
          className="copilot-toggle"
          aria-label={isOpen ? "Collapse Co-Pilot" : "Expand Co-Pilot"}
        >
          {isOpen ? "Hide ▲" : "Launch Console ▼"}
        </button>
      </div>

      {isOpen && (
        <div className="copilot-body">
          {/* Stop Stepper Bar */}
          <div className="copilot-stepper">
            <button
              type="button"
              className="copilot-step-btn"
              disabled={currentIdx === 0}
              onClick={() => setActiveStopIdx((p) => Math.max(0, p - 1))}
            >
              ◀ Prev Leg
            </button>
            <div className="copilot-step-select-wrap">
              <select
                className="copilot-select"
                value={currentIdx}
                onChange={(e) => setActiveStopIdx(Number(e.target.value))}
              >
                {stops.map((s, idx) => (
                  <option key={s.id || idx} value={idx}>
                    {idx + 1}. {s.name} ({s.duration || s.where || "Stop"})
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              className="copilot-step-btn"
              disabled={currentIdx === stops.length - 1}
              onClick={() => setActiveStopIdx((p) => Math.min(stops.length - 1, p + 1))}
            >
              Next Leg ▶
            </button>
          </div>

          {/* Active Target Banner */}
          <div className="copilot-target-card">
            <div className="copilot-target-top">
              <div className="copilot-target-kind">{currentStop.kind?.toUpperCase() || "DESTINATION"}</div>
              <h4 className="copilot-target-name">{currentStop.name}</h4>
              {currentStop.address && (
                <div className="copilot-target-address">📍 {currentStop.address}</div>
              )}
            </div>

            {/* Quick 1-Tap Action Touch Targets */}
            <div className="copilot-actions">
              {appleMap && (
                <a
                  href={appleMap}
                  target="_blank"
                  rel="noreferrer"
                  className="copilot-btn copilot-btn--apple"
                >
                  <span className="copilot-btn-icon">🍏</span>
                  <span>Apple Maps</span>
                </a>
              )}
              {googleMap && (
                <a
                  href={googleMap}
                  target="_blank"
                  rel="noreferrer"
                  className="copilot-btn copilot-btn--google"
                >
                  <span className="copilot-btn-icon">🧭</span>
                  <span>Google Maps</span>
                </a>
              )}
              {tel && (
                <a href={tel} className="copilot-btn copilot-btn--call">
                  <span className="copilot-btn-icon">📞</span>
                  <span>Call {currentStop.phone}</span>
                </a>
              )}
            </div>

            {/* Tactical Passenger Note */}
            {topTip && (
              <div className="copilot-tip-box">
                <span className="copilot-tip-tag">💡 Shotgun Pro-Tip:</span>
                <span className="copilot-tip-text">{topTip}</span>
              </div>
            )}

            {/* Key Logistics Footnote */}
            <div className="copilot-meta-row">
              {currentStop.hours && <span>🕒 Hours: <b>{currentStop.hours}</b></span>}
              {currentStop.cost && <span>🎟️ Cost: <b>{currentStop.cost}</b></span>}
              {currentStop.duration && <span>⏱️ Duration: <b>{currentStop.duration}</b></span>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
