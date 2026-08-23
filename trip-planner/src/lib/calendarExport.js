/**
 * Generates RFC 5545 compliant iCalendar (.ics) files for the trip.
 * Compatible with Apple Calendar, Google Calendar, and Outlook.
 */

function formatIcsDate(dateStr, timeStr) {
  // dateStr: "2026-09-15", timeStr: "11:30"
  const cleanDate = dateStr.replace(/-/g, "");
  const cleanTime = timeStr ? timeStr.replace(/:/g, "") + "00" : "120000";
  return `${cleanDate}T${cleanTime}`;
}

export const CALENDAR_EVENTS = [
  {
    title: "Flight AA 2358 Arrival (ORD)",
    date: "2026-09-14",
    start: "20:21",
    end: "21:00",
    location: "Chicago O'Hare Terminal 3",
    description: "Wheels down 8:21 PM CDT. Take ATS people-mover train out to Multi-Modal Facility for rental car.",
  },
  {
    title: "Budget Rental Car Pickup (Mazda CX-50)",
    date: "2026-09-14",
    start: "21:00",
    end: "21:45",
    location: "10255 W Zemke Blvd, Chicago, IL 60666",
    description: "Costco Travel reservation ($332.92). Remember to request Canadian Non-Resident Insurance Card at desk.",
  },
  {
    title: "Meyer May Frank Lloyd Wright House Tour",
    date: "2026-09-15",
    start: "11:30",
    end: "13:00",
    location: "450 Madison Ave SE, Grand Rapids, MI 49503",
    description: "Free guided tour of Frank Lloyd Wright masterpiece in Heritage Hill. Tuesday open 10am–1pm.",
  },
  {
    title: "Cartier Mansion Check-in (Ludington)",
    date: "2026-09-15",
    start: "16:30",
    end: "17:30",
    location: "409 E Ludington Ave, Ludington, MI 49431",
    description: "Historic 1905 lumber baron estate bed & breakfast. Evening walk to North Breakwater Lighthouse.",
  },
  {
    title: "Sleeping Bear Dunes Climb & Scenic Drive",
    date: "2026-09-16",
    start: "11:30",
    end: "15:30",
    location: "6900 S Dune Hwy, Glen Arbor, MI 49636",
    description: "$25 NPS 7-Day Vehicle Pass. Dune Climb + Pierce Stocking Scenic Drive Overlook #9 (450 ft bluff).",
  },
  {
    title: "Bayshore Resort Check-in (Traverse City)",
    date: "2026-09-16",
    start: "17:30",
    end: "18:30",
    location: "833 E Front St, Traverse City, MI 49686",
    description: "Victorian resort directly on West Grand Traverse Bay beach. Conf: 482190.",
  },
  {
    title: "Shepler's Mackinac Island Ferry Boarding",
    date: "2026-09-18",
    start: "07:45",
    end: "08:30",
    location: "556 E Central Ave, Mackinaw City, MI 49701",
    description: "16-minute ferry crossing to Mackinac Island. Bring layers & windbreaker for open upper deck.",
  },
  {
    title: "Blue Water Bridge Border Crossing into Canada",
    date: "2026-09-19",
    start: "17:00",
    end: "17:45",
    location: "I-94 East, Port Huron, MI 48060",
    description: "Crossing St. Clair River into Sarnia, Ontario. $5 USD cashless toll. Have passports & Canadian auto insurance card ready.",
  },
  {
    title: "The Insignia Hotel Check-in (Sarnia, Ontario)",
    date: "2026-09-19",
    start: "18:00",
    end: "19:00",
    location: "283 Christina St N, Sarnia, ON N7T 5V4",
    description: "Tribute Portfolio Hotel in Sarnia. Conf: 948201.",
  },
  {
    title: "Detroit–Windsor Tunnel Re-entry into USA",
    date: "2026-09-20",
    start: "10:00",
    end: "10:45",
    location: "Park St E, Windsor, ON N9A 3A8",
    description: "Under-river crossing into Downtown Detroit. CA$8.25 toll. CBP primary inspection at Jefferson Ave exit.",
  },
  {
    title: "Budget Rental Return at O'Hare MMF",
    date: "2026-09-21",
    start: "13:00",
    end: "13:30",
    location: "10255 W Zemke Blvd, Chicago, IL 60666",
    description: "Return car with 100% full gas receipt (refueled at Rosemont BP on Higgins Rd) to avoid $9.99/gal fee.",
  },
  {
    title: "Flight AA 1253 Departure to SFO",
    date: "2026-09-21",
    start: "15:20",
    end: "18:09",
    location: "Chicago O'Hare Terminal 3",
    description: "Nonstop to San Francisco International. Boarding starts 2:45 PM CDT; doors close 3:05 PM CDT.",
  },
];

export function generateTripIcs(events = CALENDAR_EVENTS) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Michigan 26//Field Guide Trip Planner//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Michigan '26 Road Trip",
    "X-WR-TIMEZONE:America/New_York",
  ];

  events.forEach((e, i) => {
    lines.push("BEGIN:VEVENT");
    lines.push(`UID:mi26-${i}-${e.date}@fieldguide.app`);
    lines.push(`DTSTAMP:${formatIcsDate("2026-08-23", "12:00")}Z`);
    lines.push(`DTSTART;TZID=America/New_York:${formatIcsDate(e.date, e.start)}`);
    lines.push(`DTEND;TZID=America/New_York:${formatIcsDate(e.date, e.end)}`);
    lines.push(`SUMMARY:${e.title}`);
    if (e.location) lines.push(`LOCATION:${e.location}`);
    if (e.description) lines.push(`DESCRIPTION:${e.description.replace(/\n/g, "\\n")}`);
    lines.push("STATUS:CONFIRMED");
    lines.push("END:VEVENT");
  });

  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

export function downloadIcsFile(filename = "Michigan-2026-Itinerary.ics", events = CALENDAR_EVENTS) {
  const icsContent = generateTripIcs(events);
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
