/**
 * Topographic Elevation Cross-Section: Sleeping Bear Dunes (Day 2).
 *
 * 100% Factual National Park Service topographic elevations:
 * - Base Picnic Area (0 ft relative / 600 ft ASL)
 * - First Dune Ridge (+130 ft vertical climb, ~20 min, recommended turnaround)
 * - False Lake Basin (Little Glen Lake view)
 * - 3.5-mile Dunes Trail (9 unshaded sand ridges)
 * - Lake Michigan Overlook at Stop 9 (+450 ft bluff dropping into Lake Michigan at 33°)
 */

export default function DuneCrossSection() {
  return (
    <div className="dune-card">
      <div className="dune-card-head">
        <div className="eyebrow" style={{ color: "#0d9488" }}>Topographic Reality Check</div>
        <h3>Sleeping Bear Dunes — Elevation & Trail Profile</h3>
        <p className="muted" style={{ fontSize: "var(--t-xs)", margin: 0 }}>
          Why the “Dune Climb” is a 20-minute turnaround and the Stop 9 Overlook is viewed from the top.
        </p>
      </div>

      <div className="dune-svg-wrap">
        <svg viewBox="0 0 740 220" className="dune-svg" aria-label="Sleeping Bear Dunes Elevation Profile">
          <defs>
            <linearGradient id="duneGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0.08" />
            </linearGradient>
            <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Lake Michigan Water Level */}
          <rect x="0" y="175" width="130" height="45" fill="url(#waterGrad)" />
          <text x="65" y="198" textAnchor="middle" fill="#0284c7" fontSize="11" fontWeight="700">
            Lake Michigan (0 ft)
          </text>

          {/* Topographic Dune Ridge Line */}
          {/* Stop 9 Overlook (450 ft) -> Valley -> 9 Ridges -> 1st Dune Ridge (130 ft) -> Base */}
          <path
            d="M 130 175 L 180 35 L 260 95 L 340 70 L 420 100 L 500 80 L 580 115 L 630 115 L 720 175 Z"
            fill="url(#duneGrad)"
            stroke="#d97706"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Stop 9 Overlook (450 ft) */}
          <circle cx="180" cy="35" r="5" fill="#e11d48" />
          <line x1="180" y1="35" x2="180" y2="175" stroke="#e11d48" strokeWidth="1" strokeDasharray="3,3" />
          <text x="180" y="22" textAnchor="middle" fill="#e11d48" fontSize="12" fontWeight="700">
            Stop 9 Overlook (+450 ft)
          </text>
          <text x="130" y="90" textAnchor="end" fill="#e11d48" fontSize="10" fontWeight="600">
            33° Sheer Drop
          </text>

          {/* 1st Dune Climb Peak (130 ft) */}
          <circle cx="580" cy="115" r="5" fill="#0d9488" />
          <line x1="580" y1="115" x2="580" y2="175" stroke="#0d9488" strokeWidth="1" strokeDasharray="3,3" />
          <text x="580" y="100" textAnchor="middle" fill="#0d9488" fontSize="11" fontWeight="700">
            1st Ridge (+130 ft)
          </text>
          <text x="580" y="70" textAnchor="middle" fill="#0d9488" fontSize="10">
            ✓ Turnaround Point
          </text>

          {/* Base / Parking Area */}
          <circle cx="715" cy="175" r="4" fill="#3b82f6" />
          <text x="715" y="198" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="700">
            Base / Tables
          </text>

          {/* Distance / Warning Markers */}
          <text x="380" y="130" textAnchor="middle" fill="#78716c" fontSize="11" fontWeight="600">
            ← 3.5-Mile Dunes Trail (9 unshaded sand hills) →
          </text>
          <text x="380" y="148" textAnchor="middle" fill="#a8a29e" fontSize="10">
            Trap: Valley views Little Glen Lake, not Lake Michigan
          </text>
        </svg>
      </div>

      <div className="dune-legend-grid">
        <div className="dune-legend-box dune-legend-box--ok">
          <b>The 15–20 Min Climb</b>
          Walk straight up the first 130-ft ridge for panoramic views of Glen Lake, then descend. Mom can watch comfortably from base picnic tables.
        </div>
        <div className="dune-legend-box dune-legend-box--warn">
          <b>The 3.5-Mile Trail Trap</b>
          9 unshaded sand ridges. The Park Service performs dozens of rescues each summer for hikers who mistake the interior lake for the big lake.
        </div>
        <div className="dune-legend-box dune-legend-box--warn">
          <b>Stop 9 Sheer Drop (450 ft)</b>
          On the Pierce Stocking Drive. Do NOT run down to the water—climbing back up in loose sand takes 2+ hours and NPS rescue carries a fee.
        </div>
      </div>
    </div>
  );
}
