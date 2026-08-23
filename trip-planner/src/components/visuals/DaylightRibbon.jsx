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
      { start: 13.5, end: 20.35, label: "AA 2358 Flight (SFO → ORD)", type: "flight" },
      { start: 20.5, end: 21.25, label: "ATS & Budget Car Pickup", type: "anchor" },
      { start: 21.25, end: 22.0, label: "Drive to Palatine", type: "drive" },
      { start: 22.0, end: 23.0, label: "Palatine Base", type: "stay" },
    ],
  },
  d1: {
    sunrise: "7:20 AM ET",
    sunset: "7:57 PM ET",
    tz: "CT → ET (+1 hr)",
    startHour: 6,  // 6 AM CT / 7 AM ET
    endHour: 21.5, // 9:30 PM ET
    blocks: [
      { start: 6.75, end: 11.0, label: "Palatine → Grand Rapids (Lose 1 hr)", type: "drive" },
      { start: 11.5, end: 13.0, label: "Meyer May House Tour", type: "anchor" },
      { start: 13.0, end: 14.0, label: "Schnitz Deli & Heritage Hill", type: "food" },
      { start: 14.0, end: 16.75, label: "Meijer Gardens (Chihuly)", type: "anchor" },
      { start: 16.75, end: 18.5, label: "Drive to Ludington", type: "drive" },
      { start: 19.25, end: 20.0, label: "Breakwater Pier Sunset (7:57 PM)", type: "sunset" },
      { start: 20.0, end: 21.5, label: "Summer's Inn Check-in", type: "stay" },
    ],
  },
  d2: {
    sunrise: "7:24 AM ET",
    sunset: "7:53 PM ET",
    tz: "ET",
    startHour: 7.5, // 7:30 AM
    endHour: 22,    // 10 PM
    blocks: [
      { start: 7.5, end: 9.5, label: "Ludington → Sleeping Bear Dunes", type: "drive" },
      { start: 9.5, end: 13.5, label: "Pierce Stocking · Dune Climb · North Bar", type: "anchor" },
      { start: 13.5, end: 14.5, label: "Drive to Traverse City", type: "drive" },
      { start: 14.5, end: 17.0, label: "Brio Beach Inn · Bay Beach", type: "stay" },
      { start: 17.0, end: 19.5, label: "Left Foot Charley · Stella Dinner", type: "food" },
      { start: 19.5, end: 20.25, label: "Bay Sunset (7:53 PM)", type: "sunset" },
    ],
  },
  d3: {
    sunrise: "7:21 AM ET",
    sunset: "7:48 PM ET",
    tz: "ET",
    startHour: 8.5, // 8:30 AM
    endHour: 21.5, // 9:30 PM
    blocks: [
      { start: 8.75, end: 10.0, label: "Traverse City → Charlevoix", type: "drive" },
      { start: 10.0, end: 11.5, label: "Mushroom Houses & Drawbridge", type: "anchor" },
      { start: 11.5, end: 12.25, label: "Drive to Petoskey", type: "drive" },
      { start: 12.25, end: 14.5, label: "Gaslight Lunch & Magnus Stone Hunt", type: "anchor" },
      { start: 14.5, end: 16.25, label: "Drive to Mackinaw City", type: "drive" },
      { start: 17.5, end: 19.5, label: "Dinner · Lakeside Park Sunset (7:48 PM)", type: "sunset" },
      { start: 19.5, end: 21.5, label: "Lighthouse View Motel", type: "stay" },
    ],
  },
  d4: {
    sunrise: "7:20 AM ET",
    sunset: "7:46 PM ET",
    tz: "ET",
    startHour: 6.5, // 6:30 AM
    endHour: 20.5, // 8:30 PM
    blocks: [
      { start: 6.75, end: 7.5, label: "Dock Shuttle · 7:30 Ferry", type: "drive" },
      { start: 7.8, end: 8.25, label: "Lucky Bean Coffee", type: "food" },
      { start: 8.25, end: 10.5, label: "8.2-Mi M-185 Perimeter Loop (Bikes/Carriage)", type: "anchor" },
      { start: 10.75, end: 13.75, label: "Fort Mackinac & Tea Room Lunch", type: "anchor" },
      { start: 15.5, end: 17.0, label: "Grand Hotel Porch & Tea", type: "anchor" },
      { start: 17.0, end: 19.0, label: "Fudge Shops · Ferry Return", type: "food" },
      { start: 19.5, end: 20.5, label: "Straits Sunset (7:46 PM)", type: "sunset" },
    ],
  },
  d5: {
    sunrise: "7:17 AM ET",
    sunset: "7:33 PM ET",
    tz: "ET",
    startHour: 9,   // 9 AM
    endHour: 21.5, // 9:30 PM
    blocks: [
      { start: 9.5, end: 11.0, label: "Colonial Michilimackinac", type: "anchor" },
      { start: 11.25, end: 12.25, label: "Bavarian Inn Chicken Dinner", type: "food" },
      { start: 12.25, end: 15.5, label: "Oktoberfest & Bronner's", type: "anchor" },
      { start: 15.5, end: 17.5, label: "Drive to Port Huron", type: "drive" },
      { start: 17.5, end: 18.25, label: "Fort Gratiot Light · Fuel US Side", type: "anchor" },
      { start: 18.25, end: 19.0, label: "Blue Water Bridge Crossing", type: "drive" },
      { start: 19.25, end: 20.0, label: "Point Edward Sunset (7:33 PM)", type: "sunset" },
      { start: 20.0, end: 21.5, label: "Four Points Sarnia", type: "stay" },
    ],
  },
  d6: {
    sunrise: "7:14 AM ET",
    sunset: "7:31 PM ET",
    tz: "ET",
    startHour: 8,   // 8 AM
    endHour: 20.5, // 8:30 PM
    blocks: [
      { start: 8.5, end: 9.5, label: "Drive Sarnia → Windsor", type: "drive" },
      { start: 9.5, end: 10.25, label: "Windsor Riverfront (Detroit Skyline)", type: "anchor" },
      { start: 10.5, end: 11.0, label: "Detroit–Windsor Tunnel", type: "drive" },
      { start: 11.0, end: 13.0, label: "Belle Isle Aquarium & Park", type: "anchor" },
      { start: 13.5, end: 15.5, label: "Downtown Detroit · The Belt", type: "food" },
      { start: 16.5, end: 17.5, label: "Drive to Belleville", type: "drive" },
      { start: 18.0, end: 20.5, label: "Belleville Stay (Julia's / Hampton)", type: "stay" },
    ],
  },
  d7: {
    sunrise: "7:16 AM ET",
    sunset: "7:03 PM CT",
    tz: "ET → CT (+1 hr back)",
    startHour: 7.5, // 7:30 AM ET
    endHour: 18.5, // 6:30 PM PDT
    blocks: [
      { start: 7.5, end: 8.25, label: "Belleville → Ann Arbor", type: "drive" },
      { start: 8.25, end: 9.0, label: "Zingerman's Next Door Café", type: "food" },
      { start: 9.0, end: 13.0, label: "I-94 West → Palatine (Gain 1 hr)", type: "drive" },
      { start: 13.0, end: 13.75, label: "Drop Mom in Palatine", type: "stay" },
      { start: 13.75, end: 14.5, label: "Return Car at O'Hare MMF", type: "drive" },
      { start: 14.5, end: 15.33, label: "Terminal 3 Security & Gate", type: "anchor" },
      { start: 15.33, end: 18.15, label: "AA 1253 Flight (ORD → SFO)", type: "flight" },
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

  return (
    <div className="daylight-ribbon">
      <div className="daylight-head">
        <div className="daylight-title">
          <span>☼</span>
          <span>Day Rhythm & Daylight</span>
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

      <div className="ribbon-track">
        {data.blocks.map((b, i) => {
          const l = leftPct(b.start);
          const w = widthPct(b.start, b.end);
          return (
            <div
              key={i}
              className={`ribbon-block ribbon-block--${b.type}`}
              style={{ left: `${l}%`, width: `${w}%` }}
              title={`${b.label}`}
            >
              {b.label}
            </div>
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
