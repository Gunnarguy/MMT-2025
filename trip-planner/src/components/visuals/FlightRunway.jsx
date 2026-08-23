/**
 * Flight Runway Countdown: Monday 9/21.
 *
 * 100% Factual reverse timeline calculated directly from AA 1253's
 * 3:20 PM CDT wheels-up departure from Chicago O'Hare (ORD) Terminal 3.
 */

const RUNWAY_STEPS = [
  {
    time: "3:20 PM CDT",
    what: "AA 1253 Wheels Up (ORD → SFO)",
    detail: "Terminal 3, Gate closes at 3:05 PM CDT. Wheels down SFO at 6:09 PM PDT.",
    type: "flight",
  },
  {
    time: "1:45 PM CDT",
    what: "Terminal 3 Bag Drop & TSA Security",
    detail: "Drop checked bags, clear TSA Pre/General screening, walk to departure gate.",
  },
  {
    time: "1:15 PM CDT",
    what: "ATS People-Mover from Rental Facility",
    detail: "Board the automated train at Multi-Modal Facility Station to Terminal 3 (10–12 min ride).",
  },
  {
    time: "1:00 PM CDT",
    what: "Budget Rental Car Return (O'Hare MMF)",
    detail: "10255 W Zemke Blvd. Return vehicle with full tank at the Multi-Modal Facility.",
    type: "warn",
  },
  {
    time: "12:00 PM CDT",
    what: "Palatine Drop-off (Mom & Luggage)",
    detail: "2020 Crestwood Ln. Drop off Mom and luggage, then head south on IL-53 to O'Hare.",
  },
  {
    time: "11:00 AM CDT",
    what: "Gain 1 Hour at Illinois State Line",
    detail: "Clock rolls back 1 hour from Eastern to Central Time as you enter Illinois.",
  },
  {
    time: "8:00 AM EDT",
    what: "Depart Belleville, MI (I-94 West)",
    detail: "Depart for Ann Arbor morning coffee and breakfast at Zingerman's / Kerrytown.",
  },
];

export default function FlightRunway() {
  return (
    <div className="runway-card">
      <div className="dune-card-head">
        <div className="eyebrow" style={{ color: "#7c3aed" }}>The Hard Deadline</div>
        <h3>Monday Reverse Departure Runway (Flight AA 1253)</h3>
        <p className="muted" style={{ fontSize: "var(--t-xs)", margin: 0 }}>
          Working backward from the 3:20 PM gate departure at O’Hare.
        </p>
      </div>

      <div className="runway-timeline">
        {RUNWAY_STEPS.map((s, i) => (
          <div className="runway-node" key={i}>
            <div
              className={`runway-node-dot${
                s.type === "flight"
                  ? " runway-node-dot--flight"
                  : s.type === "warn"
                  ? " runway-node-dot--warn"
                  : ""
              }`}
            />
            <div className="runway-time">{s.time}</div>
            <div className="runway-what">{s.what}</div>
            <div className="runway-detail">{s.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
