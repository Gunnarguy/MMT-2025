import { useMemo } from "react";
import { calculateSunPosition } from "../../data/mapOverlays";

function formatTime(decimalHour) {
  const h = Math.floor(decimalHour);
  const m = Math.round((decimalHour - h) * 60);
  const displayH = h % 12 === 0 ? 12 : h % 12;
  const ampm = h >= 12 ? "PM" : "AM";
  const displayM = m < 10 ? `0${m}` : m;
  return `${displayH}:${displayM} ${ampm} EDT`;
}

export default function SunTracker({ hour, onHourChange }) {
  const solar = useMemo(() => calculateSunPosition(hour), [hour]);

  return (
    <div className={`sun-tracker-card${solar.isGoldenHour ? " is-golden-hour" : ""}`}>
      <div className="sun-tracker-head">
        <div className="sun-tracker-title">
          <span>🌅 Sun Tracker & Golden Hour Simulator</span>
          <span className="sun-live-time">
            <b>{formatTime(hour)}</b>
          </span>
        </div>
        <div className="sun-status-badge">
          {solar.isGoldenHour ? "✨ " : "☀️ "}
          <b>{solar.label}</b> · Altitude: {solar.altitudeDeg}° · Azimuth: {solar.azimuthDeg}°
        </div>
      </div>

      <div className="sun-slider-wrap">
        <input
          type="range"
          min="6.0"
          max="21.5"
          step="0.25"
          value={hour}
          onChange={(e) => onHourChange(parseFloat(e.target.value))}
          className="sun-range-slider"
          aria-label="Adjust time of day to simulate sunlight and golden hour"
        />
        <div className="sun-slider-ticks">
          <span>6 AM (Dawn)</span>
          <span>7:20 AM (Sunrise)</span>
          <span>1:38 PM (Solar Noon)</span>
          <span className="tick-golden">7:15–7:55 PM (Golden Hour)</span>
          <span>9 PM (Dusk)</span>
        </div>
      </div>

      {solar.isGoldenHour && (
        <div className="golden-hour-alert">
          <b>Golden Hour Active!</b> Low-angle sunlight creates long shadows and warm amber light across Lake Michigan, Pierce Stocking Overlook #9, and the Ludington Breakwater.
        </div>
      )}
    </div>
  );
}
