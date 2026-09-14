import { useState } from "react";

/**
 * Sweaty Flight Runway: Tactical timelines for both AA 2358 (Today) and AA 1253 (Return).
 */

const RUNWAY_INBOUND = [
  {
    time: "12:45 PM PDT",
    what: "Boarding Call (SFO T1 Harvey Milk)",
    detail: "Gates B1–B27. Groups 1–4 overhead bin space defense; carry-on stowed above 18/19.",
    type: "warn",
  },
  {
    time: "1:14 PM PDT",
    what: "Door Closure (T-15m Cutoff)",
    detail: "Strict AA cutoff. Boarding passes scanned, Gunnar (18D) & Mikaela (19D) settled.",
  },
  {
    time: "1:29 PM PDT",
    what: "AA 2358 Wheels Up (SFO → ORD)",
    detail: "Boeing 737 transcon (1,846 mi, 4h 52m). Cruise FL350–370. Clocks advance +2 hrs into Central Time.",
    type: "flight",
  },
  {
    time: "8:21 PM CDT",
    what: "Wheels Down Chicago O'Hare (ORD T3)",
    detail: "Touchdown Terminal 3 Concourse H/K. Taxi to gate, mobile phones on.",
    type: "flight",
  },
  {
    time: "8:35 PM CDT",
    what: "Deplane & Sprint to ATS People-Mover",
    detail: "Rows 18/19 rapid deplane. Skip baggage claim if carry-on only; cross pedestrian bridge from T3 to ATS station.",
  },
  {
    time: "8:45 PM CDT",
    what: "ATS Train Transit to MMF (10 min)",
    detail: "Automated train departs every 3–5 min. Direct 10-min ride to Multi-Modal Facility (MMF).",
  },
  {
    time: "9:00 PM CDT",
    what: "Budget Counter & Canada Card Request",
    detail: "MMF Level 1. Request free Canadian Non-Resident Insurance Card for Ontario driving.",
    type: "warn",
  },
  {
    time: "9:25 PM CDT",
    what: "Garage Inspection & Wheels Rolling",
    detail: "Photograph 4 panels & full fuel gauge. Exit Zemke Blvd to I-90 West → IL-53 North.",
  },
  {
    time: "10:00 PM CDT",
    what: "Arrive Palatine (2020 Crestwood Ln)",
    detail: "Unpack bags, rest up for Tuesday 6:45 AM departure to Grand Rapids.",
  },
];

const RUNWAY_RETURN = [
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

export default function FlightRunway({ initialMode = "inbound" }) {
  const [mode, setMode] = useState(initialMode);
  const steps = mode === "inbound" ? RUNWAY_INBOUND : RUNWAY_RETURN;

  return (
    <div className="runway-card">
      <div className="dune-card-head">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
          <div className="eyebrow" style={{ color: "var(--locked)" }}>
            {mode === "inbound" ? "Today's Flight Sprint" : "The Hard Return Deadline"}
          </div>
          <div style={{ display: "inline-flex", background: "var(--bg-subtle)", borderRadius: "var(--r-pill)", padding: "2px" }}>
            <button
              type="button"
              className={`pill-btn${mode === "inbound" ? " is-active" : ""}`}
              onClick={() => setMode("inbound")}
              style={{
                fontSize: "11px",
                padding: "4px 10px",
                border: "none",
                background: mode === "inbound" ? "var(--brand)" : "transparent",
                color: mode === "inbound" ? "#fff" : "var(--fg-muted)",
                borderRadius: "var(--r-pill)",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              AA 2358 · Today
            </button>
            <button
              type="button"
              className={`pill-btn${mode === "return" ? " is-active" : ""}`}
              onClick={() => setMode("return")}
              style={{
                fontSize: "11px",
                padding: "4px 10px",
                border: "none",
                background: mode === "return" ? "var(--brand)" : "transparent",
                color: mode === "return" ? "#fff" : "var(--fg-muted)",
                borderRadius: "var(--r-pill)",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              AA 1253 · Mon 9/21
            </button>
          </div>
        </div>
        <h3 style={{ marginTop: "6px" }}>
          {mode === "inbound"
            ? "Inbound Flight Runway (AA 2358 · SFO → ORD)"
            : "Monday Reverse Departure Runway (AA 1253 · ORD → SFO)"}
        </h3>
        <p className="muted" style={{ fontSize: "var(--t-xs)", margin: 0 }}>
          {mode === "inbound"
            ? "Minute-by-minute tactical execution from SFO boarding to Palatine arrival."
            : "Working backward from the 3:20 PM gate departure at O’Hare Terminal 3."}
        </p>
      </div>

      <div className="runway-timeline">
        {steps.map((s, i) => (
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
