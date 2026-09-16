import { useState, useRef } from "react";

/**
 * Daylight & Pace Ribbon — 10x Web Level UI/UX
 *
 * Features:
 * - In-section centered icons with adaptive text on wide segments.
 * - Floating glassmorphic inspection tooltip with zero layout shift.
 * - Synchronized bi-directional hover and tap interactions.
 * - 100% unclipped responsive milestone cards.
 */

const SUN_DATA = {
  d0: {
    sunrise: "6:33 AM CT",
    sunset: "7:03 PM CT",
    tz: "CT",
    startHour: 13.5, // 1:30 PM
    endHour: 22.5,   // 10:30 PM
    blocks: [
      { start: 13.5, end: 20.35, icon: "✈️", short: "AA 2358 Flight", title: "Flight AA 2358 (SFO → ORD)", detail: "Nonstop from SFO Terminal 2 to Chicago O'Hare Terminal 3", timeStr: "1:29 PM – 8:21 PM CT", duration: "4h 52m", type: "flight" },
      { start: 20.35, end: 21.25, icon: "🚙", short: "Car Pickup", title: "Budget Rental Pickup", detail: "ATS train out to Multi-Modal Facility; collect the rental (a Toyota Sienna Hybrid)", timeStr: "8:21 PM – 9:15 PM CT", duration: "54m", type: "anchor" },
      { start: 21.25, end: 22.0, icon: "🚗", short: "To Palatine", title: "Drive O'Hare → Palatine", detail: "IL-53 North to Crestwood Lane (15 miles)", timeStr: "9:15 PM – 10:00 PM CT", duration: "45m", type: "drive" },
      { start: 22.0, end: 22.5, icon: "🏠", short: "Palatine Base", title: "Palatine Base", detail: "Drop bags, unpack, and rest up for Tuesday morning", timeStr: "10:00 PM CT onward", duration: "Overnight", type: "stay" },
    ],
  },
  d1: {
    sunrise: "7:20 AM ET",
    sunset: "7:57 PM ET",
    tz: "CT → ET (+1 hr)",
    startHour: 6.0, // 6:00 AM CT
    endHour: 21.5,  // 9:30 PM ET
    blocks: [
      { start: 6.0, end: 10.35, icon: "🚗", short: "To Grand Rapids", title: "Drive to Grand Rapids", detail: "Palatine → I-90 / I-94 / I-196 (lose an hour at the Michigan line)", timeStr: "6:00 AM CT – 10:20 AM ET", duration: "3h 20m", type: "drive" },
      { start: 10.35, end: 11.0, icon: "☕", short: "Buffer", title: "Coffee and a breather in Heritage Hill", detail: "The hour the 6:00 start buys before the 11:00 tour", timeStr: "10:20 – 11:00 AM ET", duration: "40m", type: "food" },
      { start: 11.0, end: 12.5, icon: "🏛️", short: "Meyer May House", title: "Meyer May House Tour", detail: "Free 90-minute Frank Lloyd Wright guided tour in Heritage Hill", timeStr: "11:00 AM – 12:30 PM ET", duration: "1h 30m", type: "anchor" },
      { start: 12.5, end: 13.5, icon: "☕", short: "Schnitz Deli", title: "Schnitz Deli & Heritage Hill", detail: "Classic deli lunch in Eastown & historic architecture walk", timeStr: "12:30 PM – 1:30 PM ET", duration: "1h", type: "food" },
      { start: 13.5, end: 16.5, icon: "🌸", short: "Meijer Gardens", title: "Meijer Gardens & Chihuly", detail: "158-acre sculpture park and indoor tropical conservatories", timeStr: "1:30 PM – 4:30 PM ET", duration: "3h", type: "anchor" },
      { start: 16.5, end: 18.75, icon: "🚗", short: "To Ludington", title: "Drive to Ludington", detail: "US-31 North along Lake Michigan shoreline (92 miles)", timeStr: "4:30 PM – 6:45 PM ET", duration: "2h 15m", type: "drive" },
      { start: 18.75, end: 20.0, icon: "🌅", short: "Breakwater Sunset", title: "North Breakwater Pier Sunset", detail: "Walk out to the lighthouse at Stearns Park for 7:57 PM sunset", timeStr: "6:45 PM – 8:00 PM ET", duration: "1h 15m", type: "sunset" },
      { start: 20.0, end: 21.5, icon: "🏨", short: "Summer's Inn", title: "Summer's Inn Check-in", detail: "Check into restored mid-century motor court on Ludington Ave", timeStr: "8:00 PM ET onward", duration: "Overnight", type: "stay" },
    ],
  },
  d2: {
    sunrise: "7:24 AM ET",
    sunset: "7:53 PM ET",
    tz: "ET",
    startHour: 8.0,
    endHour: 21.0,
    blocks: [
      { start: 8.0, end: 9.75, icon: "🚗", short: "To the dunes", title: "Ludington to Sleeping Bear", detail: "US-31 and M-22 up the shore, 80 miles", timeStr: "8:00 – 9:45 AM", duration: "1h 45m", type: "drive" },
      { start: 9.75, end: 9.95, icon: "🅿️", short: "Arrive", title: "Into the park", detail: "M-109 north of Empire to the scenic drive entrance", timeStr: "9:45 – 10:00 AM", duration: "15m", type: "drive" },
      { start: 9.95, end: 10.9, icon: "🌲", short: "Scenic Drive", title: "Pierce Stocking Scenic Drive", detail: "The 7.4-mile loop to Overlook 9, 450 feet over the lake", timeStr: "10:00 – 10:55 AM", duration: "55m", type: "anchor" },
      { start: 10.9, end: 11.35, icon: "🏔️", short: "The dune", title: "The big dune, from the bottom", detail: "Benches at the foot of the sand, photo, drive on", timeStr: "11:00 – 11:20 AM", duration: "20m", type: "anchor" },
      { start: 11.35, end: 12.35, icon: "🌊", short: "Glen Haven", title: "Glen Haven village and beach", detail: "Toes in Lake Michigan; Maritime Museum 1.5 mi west", timeStr: "11:25 AM – 12:20 PM", duration: "55m", type: "anchor" },
      { start: 12.35, end: 13.0, icon: "🚗", short: "To Leland", title: "M-22 through Glen Arbor to Leland", detail: "21 miles", timeStr: "12:20 – 1:00 PM", duration: "35m", type: "drive" },
      { start: 13.0, end: 14.5, icon: "🐟", short: "Fishtown", title: "Fishtown lunch", detail: "Cheese Shanty, Carlson's, the docks", timeStr: "1:00 – 2:30 PM", duration: "1h 30m", type: "food" },
      { start: 14.5, end: 14.85, icon: "🪨", short: "Van's Beach", title: "Van's Beach, Petoskey stones", detail: "Two minutes' walk south of the harbor", timeStr: "2:30 – 2:50 PM", duration: "20m", type: "anchor" },
      { start: 14.85, end: 15.6, icon: "🚗", short: "To Traverse City", title: "Leland to Brio Beach Inn", detail: "M-204, M-72, US-31 along East Bay, 30 miles", timeStr: "2:50 – 3:35 PM", duration: "45m", type: "drive" },
      { start: 15.6, end: 18.4, icon: "🏨", short: "Brio Beach Inn", title: "Check in, beach, nothing", detail: "150 feet of private sand on the bay", timeStr: "3:35 – 6:25 PM", duration: "2h 50m", type: "stay" },
      { start: 18.4, end: 19.5, icon: "🍽️", short: "Front Street", title: "Dinner on Front Street", detail: "Downtown, ten minutes from the inn", timeStr: "6:30 – 7:30 PM", duration: "1h", type: "food" },
      { start: 19.5, end: 21.0, icon: "🌅", short: "Bay sunset", title: "Sunset from the inn's beach", detail: "7:53 PM, straight across the bay", timeStr: "7:30 – 9:00 PM", duration: "1h 30m", type: "sunset" },
    ],
  },
  d3: {
    sunrise: "7:21 AM ET",
    sunset: "7:48 PM ET",
    tz: "ET",
    startHour: 8.5,
    endHour: 21.0,
    blocks: [
      { start: 8.5, end: 9.5, icon: "🚗", short: "To Charlevoix", title: "Traverse City to Charlevoix", detail: "US-31 north along the bay, 50 miles", timeStr: "8:30 – 9:30 AM", duration: "1h", type: "drive" },
      { start: 9.5, end: 10.75, icon: "🍄", short: "Charlevoix", title: "Mushroom Houses, Bridge Street, the 10:30 lift", detail: "Boulder Park, then the drawbridge and the pier", timeStr: "9:30 – 10:45 AM", duration: "1h 15m", type: "anchor" },
      { start: 10.75, end: 11.35, icon: "🚗", short: "To SkyBridge", title: "Charlevoix to Boyne Mountain", detail: "M-66 and US-131 inland, 24 miles", timeStr: "10:45 – 11:20 AM", duration: "35m", type: "drive" },
      { start: 11.35, end: 13.0, icon: "🌉", short: "SkyBridge", title: "SkyBridge Michigan", detail: "Chairlift up, 1,200 feet of bridge, glass floor in the middle", timeStr: "11:20 AM – 1:00 PM", duration: "1h 40m", type: "anchor" },
      { start: 13.0, end: 13.45, icon: "🚗", short: "To Petoskey", title: "Boyne Falls to Petoskey", detail: "US-131 north, 15 miles", timeStr: "1:00 – 1:25 PM", duration: "25m", type: "drive" },
      { start: 13.45, end: 14.75, icon: "🍽️", short: "Gaslight lunch", title: "Late lunch in the Gaslight District", detail: "Victorian downtown on the bluff", timeStr: "1:30 – 2:45 PM", duration: "1h 15m", type: "food" },
      { start: 14.75, end: 15.4, icon: "🪨", short: "Magnus Park", title: "Petoskey stones at Magnus Park", detail: "Wet stones show the pattern", timeStr: "2:45 – 3:25 PM", duration: "40m", type: "anchor" },
      { start: 15.4, end: 16.25, icon: "🚗", short: "To Mackinaw City", title: "Petoskey to Mackinaw City", detail: "US-31 to I-75 north, 36 miles", timeStr: "3:25 – 4:15 PM", duration: "50m", type: "drive" },
      { start: 16.25, end: 17.75, icon: "🏨", short: "Lighthouse View", title: "Check in, the bridge, the water", detail: "Two nights", timeStr: "4:15 – 5:45 PM", duration: "1h 30m", type: "stay" },
      { start: 17.75, end: 19.25, icon: "🍽️", short: "Dinner", title: "Dinner in town", detail: "Audie's or the Dixie Saloon; call the day of", timeStr: "5:45 – 7:15 PM", duration: "1h 30m", type: "food" },
      { start: 19.25, end: 20.25, icon: "🌅", short: "Bridge sunset", title: "Sunset behind the bridge", detail: "Lakeside Park, 7:48 PM", timeStr: "7:15 – 8:15 PM", duration: "1h", type: "sunset" },
      { start: 20.25, end: 21.0, icon: "🛏️", short: "Motel", title: "Early night", detail: "Ferry tomorrow morning", timeStr: "8:15 PM onward", duration: "Overnight", type: "stay" },
    ],
  },
  d4: {
    sunrise: "7:20 AM ET",
    sunset: "7:46 PM ET",
    tz: "ET",
    startHour: 6.75, // 6:45 AM ET
    endHour: 20.5,  // 8:30 PM ET
    blocks: [
      { start: 6.75, end: 7.75, icon: "⛴️", short: "Shepler's Ferry", title: "Shepler's Ferry to Island", detail: "16-minute morning ferry ride across Straits of Mackinac", timeStr: "6:45 AM – 7:45 AM ET", duration: "1h", type: "drive" },
      { start: 7.75, end: 8.25, icon: "☕", short: "Lucky Bean", title: "Lucky Bean Coffee", detail: "Fresh morning coffee on the harbor before biking", timeStr: "7:45 AM – 8:15 AM ET", duration: "30m", type: "food" },
      { start: 8.25, end: 10.5, icon: "🚲", short: "M-185 Loop", title: "M-185 Perimeter Island Loop", detail: "8.2-mile paved car-free loop around Mackinac Island", timeStr: "8:15 AM – 10:30 AM ET", duration: "2h 15m", type: "anchor" },
      { start: 10.5, end: 13.5, icon: "🏰", short: "Fort Mackinac", title: "Fort Mackinac & Tea Room Lunch", detail: "1780 stone fort exploration and cliffside lunch terrace", timeStr: "10:30 AM – 1:30 PM ET", duration: "3h", type: "anchor" },
      { start: 13.5, end: 16.5, icon: "🏛️", short: "Grand Hotel", title: "Grand Hotel Porch", detail: "World's longest front porch & afternoon tea relaxation", timeStr: "1:30 PM – 4:30 PM ET", duration: "3h", type: "anchor" },
      { start: 16.5, end: 18.75, icon: "🍬", short: "Fudge Shops", title: "Fudge Shops & Evening Ferry", detail: "Main Street fudge shopping and return ferry to Mackinaw City", timeStr: "4:30 PM – 6:45 PM ET", duration: "2h 15m", type: "food" },
      { start: 18.75, end: 20.5, icon: "🌅", short: "Straits Sunset", title: "Straits Sunset", detail: "Sunset over Lake Huron & Straits of Mackinac (7:46 PM)", timeStr: "6:45 PM – 8:30 PM ET", duration: "1h 45m", type: "sunset" },
    ],
  },
  d5: {
    sunrise: "7:17 AM ET",
    sunset: "7:33 PM ET",
    tz: "ET",
    startHour: 9.0, // 9:00 AM ET
    endHour: 21.5, // 9:30 PM ET
    blocks: [
      { start: 9.0, end: 10.75, icon: "🏰", short: "Michilimackinac", title: "Colonial Michilimackinac", detail: "18th-century French fur-trade fort on the Straits", timeStr: "9:00 AM – 10:45 AM ET", duration: "1h 45m", type: "anchor" },
      { start: 10.75, end: 12.25, icon: "🍗", short: "Bavarian Inn", title: "Bavarian Inn Chicken Dinner", detail: "World-famous family-style chicken dinner in Frankenmuth", timeStr: "10:45 AM – 12:15 PM ET", duration: "1h 30m", type: "food" },
      { start: 12.25, end: 15.5, icon: "🥨", short: "Oktoberfest", title: "Oktoberfest & Bronner's", detail: "Heritage Park Bavarian festival and world's largest Christmas store", timeStr: "12:15 PM – 3:30 PM ET", duration: "3h 15m", type: "anchor" },
      { start: 15.5, end: 17.5, icon: "🚗", short: "To Port Huron", title: "Drive to Port Huron", detail: "I-75 South to I-69 East to the Canadian border (118 miles)", timeStr: "3:30 PM – 5:30 PM ET", duration: "2h", type: "drive" },
      { start: 17.5, end: 18.25, icon: "⛽", short: "US Fuel & Light", title: "Fort Gratiot Light & US Fuel", detail: "Michigan's oldest lighthouse & top off tank before bridge", timeStr: "5:30 PM – 6:15 PM ET", duration: "45m", type: "anchor" },
      { start: 18.25, end: 19.25, icon: "🇨🇦", short: "Blue Water Bridge", title: "Blue Water Bridge Crossing", detail: "Cashless $5 USD toll into Sarnia, Ontario & CBSA inspection", timeStr: "6:15 PM – 7:15 PM ET", duration: "1h", type: "drive" },
      { start: 19.25, end: 20.0, icon: "🌅", short: "Point Edward Sunset", title: "Point Edward Sunset", detail: "Sunset along the St. Clair River waterfront (7:33 PM)", timeStr: "7:15 PM – 8:00 PM ET", duration: "45m", type: "sunset" },
      { start: 20.0, end: 21.5, icon: "🏨", short: "Four Points", title: "Four Points Sarnia Check-in", detail: "Check into Point Edward / Sarnia hotel in Ontario", timeStr: "8:00 PM ET onward", duration: "Overnight", type: "stay" },
    ],
  },
  d6: {
    sunrise: "7:14 AM ET",
    sunset: "7:31 PM ET",
    tz: "ET",
    startHour: 8.5, // 8:30 AM ET
    endHour: 20.5, // 8:30 PM ET
    blocks: [
      { start: 8.5, end: 9.75, icon: "🚗", short: "To Windsor", title: "Drive Sarnia → Windsor", detail: "Highway 402 to 401 West across Ontario (62 miles)", timeStr: "8:30 AM – 9:45 AM ET", duration: "1h 15m", type: "drive" },
      { start: 9.75, end: 10.5, icon: "🏙️", short: "Windsor Skyline", title: "Windsor Riverfront Park", detail: "Panoramic park view of downtown Detroit skyline", timeStr: "9:45 AM – 10:30 AM ET", duration: "45m", type: "anchor" },
      { start: 10.5, end: 11.25, icon: "🚇", short: "Detroit Tunnel", title: "Detroit–Windsor Tunnel", detail: "Sub-river tunnel crossing back into downtown USA (CA$8.25)", timeStr: "10:30 AM – 11:15 AM ET", duration: "45m", type: "drive" },
      { start: 11.25, end: 13.5, icon: "🐠", short: "Belle Isle", title: "Belle Isle Aquarium & Park", detail: "America's oldest aquarium and conservatory grounds", timeStr: "11:15 AM – 1:30 PM ET", duration: "2h 15m", type: "anchor" },
      { start: 13.5, end: 16.25, icon: "🎨", short: "The Belt & Lunch", title: "The Belt & Downtown Lunch", detail: "Public art alleyway and walkable downtown cafes", timeStr: "1:30 PM – 4:15 PM ET", duration: "2h 45m", type: "food" },
      { start: 16.25, end: 17.5, icon: "🚗", short: "To Belleville", title: "Drive to Belleville", detail: "I-94 West to Detroit Metro area (28 miles)", timeStr: "4:15 PM – 5:30 PM ET", duration: "1h 15m", type: "drive" },
      { start: 17.5, end: 20.5, icon: "🏠", short: "Belleville Stay", title: "Belleville Stay", detail: "Evening with Julia in Belleville / Hampton Inn", timeStr: "5:30 PM ET onward", duration: "Overnight", type: "stay" },
    ],
  },
  d7: {
    sunrise: "7:16 AM ET",
    sunset: "7:03 PM CT",
    tz: "ET → CT (+1 hr back)",
    startHour: 7.5, // 7:30 AM ET
    endHour: 18.25, // 6:15 PM PT
    blocks: [
      { start: 7.5, end: 8.25, icon: "🚗", short: "To Ann Arbor", title: "Drive to Ann Arbor", detail: "I-94 West directly into Kerrytown (19 miles)", timeStr: "7:30 AM – 8:15 AM ET", duration: "45m", type: "drive" },
      { start: 8.25, end: 9.0, icon: "☕", short: "Zingerman's", title: "Zingerman's Next Door", detail: "Morning coffee, pastries, and breakfast in Kerrytown", timeStr: "8:15 AM – 9:00 AM ET", duration: "45m", type: "food" },
      { start: 9.0, end: 13.0, icon: "🚗", short: "I-94 to Palatine", title: "I-94 West to Palatine", detail: "Gain 1 hour entering Illinois (Central Time) (263 miles)", timeStr: "9:00 AM ET – 12:00 PM CT", duration: "4h", type: "drive" },
      { start: 13.0, end: 13.5, icon: "🏠", short: "Palatine Drop", title: "Palatine Drop-off", detail: "Drop Mom and unpack luggage at Crestwood Lane", timeStr: "12:00 PM – 12:30 PM CT", duration: "30m", type: "stay" },
      { start: 13.5, end: 14.0, icon: "🚙", short: "Car Return", title: "Return Car at O'Hare MMF", detail: "Return Budget rental SUV at Multi-Modal Facility (15 miles)", timeStr: "12:30 PM – 1:00 PM CT", duration: "30m", type: "drive" },
      { start: 14.0, end: 15.33, icon: "🎫", short: "Terminal 3", title: "Terminal 3 Security & Gate", detail: "ATS train to Terminal 3, drop bags, and clear TSA security", timeStr: "1:00 PM – 2:45 PM CT", duration: "1h 45m", type: "anchor" },
      { start: 15.33, end: 18.25, icon: "✈️", short: "AA 1253 Flight", title: "Flight AA 1253 to SFO", detail: "Nonstop flight ORD → SFO (Wheels down 6:09 PM PT)", timeStr: "3:20 PM CT – 6:09 PM PT", duration: "4h 49m", type: "flight" },
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
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const ribbonRef = useRef(null);

  const data = SUN_DATA[dayId];
  if (!data) return null;

  const activeIdx = hoveredIdx !== null ? hoveredIdx : selectedIdx;
  const activeBlock = activeIdx !== null ? data.blocks[activeIdx] : null;

  const span = data.endHour - data.startHour;
  const leftPct = (h) => Math.max(0, Math.min(100, ((h - data.startHour) / span) * 100));
  const widthPct = (start, end) => Math.max(1, ((end - start) / span) * 100);

  const ticks = [];
  const firstTick = Math.ceil(data.startHour);
  const lastTick = Math.floor(data.endHour);
  const step = span > 10 ? 2 : 1;
  for (let h = firstTick; h <= lastTick; h += step) {
    ticks.push({ hour: h, pct: leftPct(h), label: formatHour(h) });
  }

  // Calculate position for the floating tooltip (centered on the active segment)
  let activeCenterPct = 50;
  if (activeBlock) {
    const l = leftPct(activeBlock.start);
    const w = widthPct(activeBlock.start, activeBlock.end);
    activeCenterPct = l + w / 2;
    // Bound tooltip center so it does not overflow edges
    activeCenterPct = Math.max(16, Math.min(84, activeCenterPct));
  }

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

      {/* Visual Gantt Bar Container with Floating Glass Tooltip */}
      <div className="ribbon-track-wrapper" ref={ribbonRef}>
        {/* Floating Tooltip — Positioned Absolutely: Zero Layout Shift */}
        <div
          className={`ribbon-glass-popover${activeBlock ? " is-visible" : ""}`}
          style={{ left: `${activeCenterPct}%` }}
          aria-hidden={!activeBlock}
        >
          {activeBlock && (
            <>
              <div className="ribbon-popover-header">
                <span className="ribbon-popover-icon">{activeBlock.icon}</span>
                <span className="ribbon-popover-title">{activeBlock.title}</span>
                <span className="ribbon-popover-badge">{activeBlock.duration}</span>
              </div>
              <div className="ribbon-popover-body">
                <span className="ribbon-popover-time">{activeBlock.timeStr}</span>
                <span className="ribbon-popover-detail">{activeBlock.detail}</span>
              </div>
              <div className="ribbon-popover-arrow" />
            </>
          )}
        </div>

        <div className="ribbon-track" role="region" aria-label="Visual timeline bar">
          {data.blocks.map((b, i) => {
            const l = leftPct(b.start);
            const w = widthPct(b.start, b.end);
            const isSelected = activeIdx === i;
            const hasEnoughWidth = w >= 9;

            return (
              <button
                type="button"
                key={i}
                className={`ribbon-block ribbon-block--${b.type}${isSelected ? " is-active" : ""}${activeIdx !== null && !isSelected ? " is-dimmed" : ""}`}
                style={{ left: `${l}%`, width: `${w}%` }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => setSelectedIdx((prev) => (prev === i ? null : i))}
                aria-label={`${b.timeStr}: ${b.title}`}
              >
                <span className="ribbon-block-content">
                  <span className="ribbon-block-icon">{b.icon}</span>
                  {hasEnoughWidth && <span className="ribbon-block-short">{b.short}</span>}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Scale Ticks */}
      <div className="ribbon-ticks" aria-hidden="true">
        {ticks.map((t) => (
          <span key={t.hour} className="ribbon-tick" style={{ left: `${t.pct}%` }}>
            {t.label}
          </span>
        ))}
      </div>

      {/* 100% Unclipped Chronological Milestone Grid */}
      <div className="ribbon-milestones-grid">
        {data.blocks.map((b, i) => {
          const isSelected = activeIdx === i;
          return (
            <div
              key={i}
              className={`ribbon-milestone-card ribbon-milestone-card--${b.type}${isSelected ? " is-active" : ""}`}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => setSelectedIdx((prev) => (prev === i ? null : i))}
              role="button"
              aria-pressed={isSelected}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedIdx((prev) => prev === i ? null : i); } }}
              tabIndex={0}
            >
              <div className="ribbon-milestone-top">
                <span className="ribbon-milestone-icon">{b.icon}</span>
                <span className="ribbon-milestone-time">{b.timeStr.split(" – ")[0]}</span>
                <span className="ribbon-milestone-duration">{b.duration}</span>
              </div>
              <div className="ribbon-milestone-title">{b.title}</div>
              <div className="ribbon-milestone-detail">{b.detail}</div>
            </div>
          );
        })}
      </div>

      {/* Category Legend */}
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
