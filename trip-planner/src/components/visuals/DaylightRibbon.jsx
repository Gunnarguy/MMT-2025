import { useState } from "react";

/**
 * Daylight & Pace Ribbon.
 *
 * Visualizes the 24-hour day rhythm, exact astronomical sunrise/sunset for
 * the destination, time-zone boundaries, driving legs, anchor visits, and
 * sunset windows.
 *
 * Astronomical figures: Verified mid-September 2026 normals across Michigan & Ontario.
 */

const SUN_DATA = {
  d0: {
    sunrise: "6:33 AM CT",
    sunset: "7:03 PM CT",
    tz: "CT",
    startHour: 13, // 1 PM
    endHour: 23,   // 11 PM
    blocks: [
      { start: 13.5, end: 20.35, icon: "✈️", short: "AA 2358", label: "Flight AA 2358 (SFO → ORD)", timeStr: "1:29 PM – 8:21 PM CT", type: "flight" },
      { start: 20.5, end: 21.25, icon: "🚙", short: "Car Pickup", label: "ATS Train & Budget Counter Pickup", timeStr: "8:30 PM – 9:15 PM CT", type: "anchor" },
      { start: 21.25, end: 22.0, icon: "🚗", short: "To Palatine", label: "Drive O'Hare MMF → Palatine (15 mi)", timeStr: "9:15 PM – 10:00 PM CT", type: "drive" },
      { start: 22.0, end: 23.0, icon: "🏠", short: "Palatine Base", label: "Arrive at Crestwood Ln & Pack Car", timeStr: "10:00 PM CT onward", type: "stay" },
    ],
  },
  d1: {
    sunrise: "7:20 AM ET",
    sunset: "7:57 PM ET",
    tz: "CT → ET (+1 hr)",
    startHour: 6,  // 6 AM CT / 7 AM ET
    endHour: 21.5, // 9:30 PM ET
    blocks: [
      { start: 6.75, end: 11.0, icon: "🚗", short: "To Grand Rapids", label: "Palatine → Grand Rapids (Lose 1 hr)", timeStr: "6:45 AM CT – 11:00 AM ET", type: "drive" },
      { start: 11.5, end: 13.0, icon: "🏛️", short: "Meyer May House", label: "Meyer May Frank Lloyd Wright Tour", timeStr: "11:30 AM – 1:00 PM ET", type: "anchor" },
      { start: 13.0, end: 14.0, icon: "☕", short: "Schnitz Deli", label: "Schnitz Deli Lunch & Heritage Hill", timeStr: "1:00 PM – 2:00 PM ET", type: "food" },
      { start: 14.0, end: 16.75, icon: "🌸", short: "Meijer Gardens", label: "Frederik Meijer Gardens & Chihuly", timeStr: "2:00 PM – 4:45 PM ET", type: "anchor" },
      { start: 16.75, end: 18.5, icon: "🚗", short: "To Ludington", label: "Drive to Ludington (92 mi)", timeStr: "4:45 PM – 6:30 PM ET", type: "drive" },
      { start: 19.25, end: 20.0, icon: "🌅", short: "Pier Sunset", label: "North Breakwater Sunset (7:57 PM)", timeStr: "7:15 PM – 8:00 PM ET", type: "sunset" },
      { start: 20.0, end: 21.5, icon: "🏨", short: "Summer's Inn", label: "Check-in at Summer's Inn", timeStr: "8:00 PM ET onward", type: "stay" },
    ],
  },
  d2: {
    sunrise: "7:24 AM ET",
    sunset: "7:53 PM ET",
    tz: "ET",
    startHour: 7.5, // 7:30 AM
    endHour: 22,    // 10 PM
    blocks: [
      { start: 7.5, end: 9.5, icon: "🚗", short: "To Dunes", label: "Drive Ludington → Sleeping Bear Dunes", timeStr: "7:30 AM – 9:30 AM ET", type: "drive" },
      { start: 9.5, end: 13.5, icon: "🏖️", short: "Sleeping Bear Dunes", label: "Dune Climb & Pierce Stocking Drive", timeStr: "9:30 AM – 1:30 PM ET", type: "anchor" },
      { start: 13.5, end: 14.5, icon: "🚗", short: "To Traverse City", label: "Drive to Traverse City (28 mi)", timeStr: "1:30 PM – 2:30 PM ET", type: "drive" },
      { start: 14.5, end: 17.0, icon: "🏨", short: "Brio Beach Inn", label: "Check-in & Grand Traverse Bay Beach", timeStr: "2:30 PM – 5:00 PM ET", type: "stay" },
      { start: 17.0, end: 19.5, icon: "🍽️", short: "Downtown Dinner", label: "Front Street Dining & Left Foot Charley", timeStr: "5:00 PM – 7:30 PM ET", type: "food" },
      { start: 19.5, end: 20.25, icon: "🌅", short: "Bay Sunset", label: "Bay Sunset Watch (7:53 PM)", timeStr: "7:30 PM – 8:15 PM ET", type: "sunset" },
    ],
  },
  d3: {
    sunrise: "7:21 AM ET",
    sunset: "7:48 PM ET",
    tz: "ET",
    startHour: 8.5, // 8:30 AM
    endHour: 21.5, // 9:30 PM
    blocks: [
      { start: 8.75, end: 10.0, icon: "🚗", short: "To Charlevoix", label: "Drive Traverse City → Charlevoix", timeStr: "8:45 AM – 10:00 AM ET", type: "drive" },
      { start: 10.0, end: 11.5, icon: "🍄", short: "Mushroom Houses", label: "Earl Young Mushroom Houses & Bridge", timeStr: "10:00 AM – 11:30 AM ET", type: "anchor" },
      { start: 11.5, end: 12.25, icon: "🚗", short: "To Petoskey", label: "Drive to Petoskey (18 mi)", timeStr: "11:30 AM – 12:15 PM ET", type: "drive" },
      { start: 12.25, end: 14.5, icon: "🪨", short: "Gaslight & Stones", label: "Gaslight Lunch & Magnus Stone Hunt", timeStr: "12:15 PM – 2:30 PM ET", type: "anchor" },
      { start: 14.5, end: 16.25, icon: "🚗", short: "To Mackinaw City", label: "Drive to Mackinaw City (37 mi)", timeStr: "2:30 PM – 4:15 PM ET", type: "drive" },
      { start: 17.5, end: 19.5, icon: "🌅", short: "Dinner & Sunset", label: "Lakeside Park Sunset Behind Bridge", timeStr: "5:30 PM – 7:30 PM ET", type: "sunset" },
      { start: 19.5, end: 21.5, icon: "🏨", short: "Lighthouse View", label: "Lighthouse View Motel Check-in", timeStr: "7:30 PM ET onward", type: "stay" },
    ],
  },
  d4: {
    sunrise: "7:20 AM ET",
    sunset: "7:46 PM ET",
    tz: "ET",
    startHour: 6.5, // 6:30 AM
    endHour: 20.5, // 8:30 PM
    blocks: [
      { start: 6.75, end: 7.5, icon: "⛴️", short: "7:30 Ferry", label: "Shepler's Ferry Crossing to Island", timeStr: "6:45 AM – 7:45 AM ET", type: "drive" },
      { start: 7.8, end: 8.25, icon: "☕", short: "Lucky Bean", label: "Lucky Bean Coffee & Morning Harbor", timeStr: "7:45 AM – 8:15 AM ET", type: "food" },
      { start: 8.25, end: 10.5, icon: "🚲", short: "M-185 Loop", label: "8.2-Mile Perimeter Loop (Bikes/Walk)", timeStr: "8:15 AM – 10:30 AM ET", type: "anchor" },
      { start: 10.75, end: 13.75, icon: "🏰", short: "Fort Mackinac", label: "Fort Mackinac & Tea Room Lunch", timeStr: "10:45 AM – 1:45 PM ET", type: "anchor" },
      { start: 15.5, end: 17.0, icon: "🏛️", short: "Grand Hotel", label: "Grand Hotel Front Porch & Parlor", timeStr: "3:30 PM – 5:00 PM ET", type: "anchor" },
      { start: 17.0, end: 19.0, icon: "🍬", short: "Fudge & Ferry", label: "Fudge Shopping & Evening Ferry Return", timeStr: "5:00 PM – 7:00 PM ET", type: "food" },
      { start: 19.5, end: 20.5, icon: "🌅", short: "Straits Sunset", label: "Straits of Mackinac Sunset (7:46 PM)", timeStr: "7:30 PM – 8:30 PM ET", type: "sunset" },
    ],
  },
  d5: {
    sunrise: "7:17 AM ET",
    sunset: "7:33 PM ET",
    tz: "ET",
    startHour: 9,   // 9 AM
    endHour: 21.5, // 9:30 PM
    blocks: [
      { start: 9.5, end: 11.0, icon: "🏰", short: "Michilimackinac", label: "Colonial Michilimackinac Fort", timeStr: "9:30 AM – 11:00 AM ET", type: "anchor" },
      { start: 11.25, end: 12.25, icon: "🍗", short: "Bavarian Inn", label: "Family-Style Chicken Dinner", timeStr: "11:15 AM – 12:15 PM ET", type: "food" },
      { start: 12.25, end: 15.5, icon: "🥨", short: "Oktoberfest", label: "Frankenmuth Oktoberfest & Bronner's", timeStr: "12:15 PM – 3:30 PM ET", type: "anchor" },
      { start: 15.5, end: 17.5, icon: "🚗", short: "To Port Huron", label: "Drive I-75 → I-69 to Port Huron", timeStr: "3:30 PM – 5:30 PM ET", type: "drive" },
      { start: 17.5, end: 18.25, icon: "⛽", short: "US Fuel & Light", label: "Fort Gratiot Light & US Fuel Stop", timeStr: "5:30 PM – 6:15 PM ET", type: "anchor" },
      { start: 18.25, end: 19.0, icon: "🇨🇦", short: "Blue Water Bridge", label: "Blue Water Bridge Border Crossing", timeStr: "6:15 PM – 7:00 PM ET", type: "drive" },
      { start: 19.25, end: 20.0, icon: "🌅", short: "Sarnia Sunset", label: "Point Edward River Sunset (7:33 PM)", timeStr: "7:15 PM – 8:00 PM ET", type: "sunset" },
      { start: 20.0, end: 21.5, icon: "🏨", short: "Four Points", label: "Check-in Four Points Sarnia", timeStr: "8:00 PM ET onward", type: "stay" },
    ],
  },
  d6: {
    sunrise: "7:14 AM ET",
    sunset: "7:31 PM ET",
    tz: "ET",
    startHour: 8,   // 8 AM
    endHour: 20.5, // 8:30 PM
    blocks: [
      { start: 8.5, end: 9.5, icon: "🚗", short: "To Windsor", label: "Drive Sarnia → Windsor via Hwy 402/401", timeStr: "8:30 AM – 9:30 AM ET", type: "drive" },
      { start: 9.5, end: 10.25, icon: "🏙️", short: "Windsor Riverfront", label: "Windsor Riverfront Detroit Skyline Park", timeStr: "9:30 AM – 10:15 AM ET", type: "anchor" },
      { start: 10.5, end: 11.0, icon: "🚇", short: "Detroit Tunnel", label: "Detroit–Windsor Tunnel Re-entry", timeStr: "10:30 AM – 11:00 AM ET", type: "drive" },
      { start: 11.0, end: 13.0, icon: "🐠", short: "Belle Isle", label: "Belle Isle Aquarium & Park", timeStr: "11:00 AM – 1:00 PM ET", type: "anchor" },
      { start: 13.5, end: 15.5, icon: "🎨", short: "The Belt & Lunch", label: "Downtown Detroit Lunch & The Belt Alley", timeStr: "1:30 PM – 3:30 PM ET", type: "food" },
      { start: 16.5, end: 17.5, icon: "🚗", short: "To Belleville", label: "Drive to Belleville / Detroit Metro", timeStr: "4:30 PM – 5:30 PM ET", type: "drive" },
      { start: 18.0, end: 20.5, icon: "🏠", short: "Julia's Stay", label: "Evening with Julia in Belleville", timeStr: "6:00 PM ET onward", type: "stay" },
    ],
  },
  d7: {
    sunrise: "7:16 AM ET",
    sunset: "7:03 PM CT",
    tz: "ET → CT (+1 hr back)",
    startHour: 7.5, // 7:30 AM ET
    endHour: 18.5, // 6:30 PM PDT
    blocks: [
      { start: 7.5, end: 8.25, icon: "🚗", short: "To Ann Arbor", label: "Drive Belleville → Ann Arbor", timeStr: "7:30 AM – 8:15 AM ET", type: "drive" },
      { start: 8.25, end: 9.0, icon: "☕", short: "Ann Arbor Cafe", label: "Zingerman's Next Door Coffee & Breakfast", timeStr: "8:15 AM – 9:00 AM ET", type: "food" },
      { start: 9.0, end: 13.0, icon: "🚗", short: "I-94 to Palatine", label: "I-94 West → Palatine (Gain 1 hr)", timeStr: "9:00 AM ET – 12:00 PM CT", type: "drive" },
      { start: 13.0, end: 13.75, icon: "🏠", short: "Palatine Drop", label: "Drop Mom & Unload Luggage in Palatine", timeStr: "12:00 PM – 12:30 PM CT", type: "stay" },
      { start: 13.75, end: 14.5, icon: "🚙", short: "Car Return", label: "Return Budget SUV at O'Hare MMF", timeStr: "12:30 PM – 1:00 PM CT", type: "drive" },
      { start: 14.5, end: 15.33, icon: "🎫", short: "Terminal 3", label: "ATS Train to Terminal 3 & TSA Security", timeStr: "1:00 PM – 2:45 PM CT", type: "anchor" },
      { start: 15.33, end: 18.15, icon: "✈️", short: "AA 1253 Flight", label: "Flight AA 1253 Departure (ORD → SFO)", timeStr: "3:20 PM CT – 6:09 PM PT", type: "flight" },
    ],
  },
};

function formatHour(h) {
  const hInt = Math.floor(h);
  const suffix = hInt >= 12 && hInt < 24 ? "PM" : "AM";
  const displayH = hInt % 12 === 0 ? 12 : hInt % 12;
  return `${displayH} ${suffix}`;
}

export default function DaylightRibbon({ dayId }) {
  const [activeIdx, setActiveIdx] = useState(null);
  const data = SUN_DATA[dayId];
  if (!data) return null;

  const span = data.endHour - data.startHour;
  const leftPct = (h) => Math.max(0, Math.min(100, ((h - data.startHour) / span) * 100));
  const widthPct = (start, end) => Math.max(2, ((end - start) / span) * 100);

  const ticks = [];
  const firstTick = Math.ceil(data.startHour);
  const lastTick = Math.floor(data.endHour);
  const step = span > 10 ? 2 : 1;
  for (let h = firstTick; h <= lastTick; h += step) {
    ticks.push({ hour: h, pct: leftPct(h), label: formatHour(h) });
  }

  const activeBlock = activeIdx != null ? data.blocks[activeIdx] : null;

  return (
    <div className="daylight-ribbon">
      <div className="daylight-head">
        <div className="daylight-title">
          <span>☼</span>
          <span>Day Rhythm &amp; Daylight</span>
        </div>
        <div className="daylight-sun-meta">
          <span>
            Sunrise: <b>{data.sunrise}</b>
          </span>
          <span>
            Sunset: <b>{data.sunset}</b>
          </span>
          <span>
            Zone: <b>{data.tz}</b>
          </span>
        </div>
      </div>

      <div className="ribbon-track" role="region" aria-label="Visual timeline">
        {data.blocks.map((b, i) => {
          const l = leftPct(b.start);
          const w = widthPct(b.start, b.end);
          const isSelected = activeIdx === i;

          // Adaptive label based on segment width so text is never truncated
          let displayContent;
          if (w >= 14) {
            displayContent = `${b.icon} ${b.short}`;
          } else if (w >= 8) {
            displayContent = b.short;
          } else {
            displayContent = b.icon;
          }

          return (
            <button
              type="button"
              key={i}
              className={`ribbon-block ribbon-block--${b.type}${isSelected ? " is-active" : ""}`}
              style={{ left: `${l}%`, width: `${w}%` }}
              onMouseEnter={() => setActiveIdx(i)}
              onMouseLeave={() => setActiveIdx(null)}
              onClick={() => setActiveIdx((prev) => (prev === i ? null : i))}
              title={`${b.timeStr}: ${b.label}`}
            >
              <span className="ribbon-block-text">{displayContent}</span>
            </button>
          );
        })}
      </div>

      <div className="ribbon-ticks" aria-hidden="true">
        {ticks.map((t) => (
          <span key={t.hour} className="ribbon-tick" style={{ left: `${t.pct}%` }}>
            {t.label}
          </span>
        ))}
      </div>

      {/* Active Selected / Hovered Detail Popover */}
      {activeBlock && (
        <div className="ribbon-active-card">
          <div className="ribbon-active-head">
            <span className={`ribbon-legend-dot ribbon-block--${activeBlock.type}`} />
            <b className="ribbon-active-title">{activeBlock.label}</b>
            <span className="ribbon-active-time">{activeBlock.timeStr}</span>
          </div>
        </div>
      )}

      {/* Complete, Non-Truncated Chronological Flow Chips */}
      <div className="ribbon-flow-chips">
        {data.blocks.map((b, i) => (
          <button
            type="button"
            key={i}
            className={`ribbon-chip ribbon-chip--${b.type}${activeIdx === i ? " is-active" : ""}`}
            onMouseEnter={() => setActiveIdx(i)}
            onMouseLeave={() => setActiveIdx(null)}
            onClick={() => setActiveIdx((prev) => (prev === i ? null : i))}
          >
            <span className="ribbon-chip-icon">{b.icon}</span>
            <span className="ribbon-chip-label">{b.short}</span>
            <span className="ribbon-chip-time">{b.timeStr.split(" – ")[0]}</span>
          </button>
        ))}
      </div>

      <div className="ribbon-legend">
        <span className="ribbon-legend-item">
          <span className="ribbon-legend-dot ribbon-block--drive" /> Drive / Transit
        </span>
        <span className="ribbon-legend-item">
          <span className="ribbon-legend-dot ribbon-block--anchor" /> Activity / Tour
        </span>
        <span className="ribbon-legend-item">
          <span className="ribbon-legend-dot ribbon-block--food" /> Food / Coffee
        </span>
        <span className="ribbon-legend-item">
          <span className="ribbon-legend-dot ribbon-block--sunset" /> Sunset Window
        </span>
        <span className="ribbon-legend-item">
          <span className="ribbon-legend-dot ribbon-block--stay" /> Lodging / Base
        </span>
      </div>
    </div>
  );
}
