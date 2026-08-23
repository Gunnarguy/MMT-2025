import { useMemo, useState } from "react";
import { ELEVATION_PROFILE } from "../../data/mapOverlays";

export default function ElevationRibbon({ onHoverPoint, activeDayId = null }) {
  const [hoverIdx, setHoverIdx] = useState(null);

  const filtered = useMemo(() => {
    if (!activeDayId) return ELEVATION_PROFILE;
    const match = ELEVATION_PROFILE.filter((p) => p.day === activeDayId);
    return match.length >= 2 ? match : ELEVATION_PROFILE;
  }, [activeDayId]);

  const maxElev = 1400;
  const minElev = 500;
  const height = 90;
  const width = 640;

  const pointsSvg = useMemo(() => {
    return filtered
      .map((p, i) => {
        const x = (i / (filtered.length - 1)) * (width - 40) + 20;
        const y = height - ((p.elev - minElev) / (maxElev - minElev)) * (height - 20) - 10;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  }, [filtered, width, height]);

  const activePoint = hoverIdx != null ? filtered[hoverIdx] : null;

  return (
    <div className="elevation-ribbon-card">
      <div className="elevation-ribbon-head">
        <div className="elevation-title">
          <span>📈 Topographic Elevation Profile</span>
          <small className="muted">575 ft (Lake Michigan shore) → 1,348 ft (I-75 Gaylord Moraine)</small>
        </div>
        {activePoint && (
          <div className="elevation-live-badge">
            <b>{activePoint.label}</b> · {activePoint.elev} ft ASL · Mile {activePoint.mile}
          </div>
        )}
      </div>

      <div className="elevation-svg-wrap">
        <svg viewBox={`0 0 ${width} ${height}`} className="elevation-svg" preserveAspectRatio="none">
          {/* Subtle grid lines */}
          <line x1="20" y1="20" x2={width - 20} y2="20" stroke="var(--line)" strokeDasharray="3 3" />
          <line x1="20" y1="50" x2={width - 20} y2="50" stroke="var(--line)" strokeDasharray="3 3" />
          <line x1="20" y1="80" x2={width - 20} y2="80" stroke="var(--line)" />

          {/* Area fill */}
          <polygon
            points={`20,${height} ${pointsSvg} ${width - 20},${height}`}
            fill="url(#elevGrad)"
            opacity="0.25"
          />

          {/* Gradient definition */}
          <defs>
            <linearGradient id="elevGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Line stroke */}
          <polyline
            points={pointsSvg}
            fill="none"
            stroke="#0284c7"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Interactive milestone dots */}
          {filtered.map((p, i) => {
            const x = (i / (filtered.length - 1)) * (width - 40) + 20;
            const y = height - ((p.elev - minElev) / (maxElev - minElev)) * (height - 20) - 10;
            const isHover = hoverIdx === i;
            return (
              <g key={p.mile} onMouseEnter={() => {
                setHoverIdx(i);
                if (onHoverPoint) onHoverPoint(p);
              }} onMouseLeave={() => {
                setHoverIdx(null);
                if (onHoverPoint) onHoverPoint(null);
              }}>
                <circle
                  cx={x}
                  cy={y}
                  r={isHover ? 6 : 3.5}
                  fill={isHover ? "#f59e0b" : "#0284c7"}
                  stroke="#fff"
                  strokeWidth="1.5"
                  style={{ cursor: "pointer", transition: "r 0.15s ease" }}
                />
              </g>
            );
          })}
        </svg>
      </div>

      <div className="elevation-axis-labels">
        <span>Mile 0 (ORD)</span>
        <span>Mile 380 (Sleeping Bear: 1,030')</span>
        <span>Mile 660 (Gaylord: 1,348')</span>
        <span>Mile 1,020 (Detroit River: 575')</span>
        <span>Mile 1,430 (ORD)</span>
      </div>
    </div>
  );
}
