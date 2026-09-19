/**
 * Essential trip action items, reservations, and logistics checklist.
 */

export const KINDS = {
  action: {
    label: "Action Items",
    icon: "✋",
    tone: "stop",
    blurb: "Essential trip preparations, counter requests, and flight timing.",
  },
  book: {
    label: "Advance Bookings",
    icon: "📌",
    tone: "warn",
    blurb: "Key ticket reservations and dinner bookings to secure in advance.",
  },
  border: {
    label: "Border & Tolls",
    icon: "🇨🇦",
    tone: "info",
    blurb: "Border crossing credentials and cashless toll details.",
  },
};

export const KIND_ORDER = ["action", "book", "border"];

export const LOOSE_ENDS = [
  // ── Action Items ───────────────────────────────────────────────────
  {
    id: "passports",
    kind: "action",
    dayId: "d5",
    when: "Bring on Trip",
    title: "Physical Passports for Ontario Crossings",
    problem:
      "Valid physical US Passports or Passport Cards required for all passengers at the Blue Water Bridge (Port Huron → Sarnia) and Detroit–Windsor Tunnel.",
    answer: "Keep passports in your carry-on luggage for Saturday cross-border check at Port Huron.",
    deadline: "Pack before departure",
  },
  {
    id: "canada-card",
    kind: "action",
    dayId: "d0",
    when: "Mon 9/14, 9:00 PM",
    title: "Request Canadian Insurance Card at Budget counter",
    problem:
      "Budget provides the Canadian Non-Resident Insurance Card at pickup for cross-border driving into Ontario.",
    answer:
      "Ask the Budget counter agent at O'Hare MMF for the free Canadian Non-Resident Insurance Card to keep in the glovebox for Ontario driving.",
    deadline: "At vehicle pickup Monday 9pm",
    url: "#/ride",
    urlLabel: "Car & flight details",
  },
  {
    id: "monday-home",
    kind: "action",
    dayId: "d7",
    when: "Mon 9/21",
    title: "Return flight & vehicle drop-off timeline",
    problem:
      "AA 1253 departs O'Hare at 3:20 PM; car drop-off at Multi-Modal Facility by 1:00 PM.",
    answer:
      "Depart Belleville/Detroit area by 8:00 AM Eastern. Drop luggage in Palatine by noon Central, and return vehicle to O'Hare MMF by 1:00 PM for the 3:20 PM departure (AA 1253).",
    deadline: "Mon 9/21 morning",
    url: "#/ride",
    urlLabel: "Full timetable",
  },

  // ── Advance Bookings ───────────────────────────────────────────────
  {
    id: "meyer-may",
    kind: "book",
    dayId: "d1",
    when: "Tue 9/15",
    title: "Reserve Meyer May House guided tour (Grand Rapids)",
    problem:
      "Free 90-minute guided tour of Frank Lloyd Wright's 1909 Prairie masterpiece in Grand Rapids.",
    answer:
      "Reserve online in advance for a Tuesday morning tour (11:00 AM or 11:30 AM).",
    deadline: "Reserve online in advance",
    cost: "Free",
    url: "https://meyermayhouse.steelcase.com/tour-the-meyer-may-house/",
    urlLabel: "Book tour online",
    phone: "616-246-4821",
  },
  {
    id: "bavarian-inn",
    kind: "book",
    dayId: "d5",
    when: "Sat 9/19",
    title: "Call the Bavarian Inn if you want the schnitzel",
    problem:
      "Oktoberfest has no schnitzel on its menu, and Saturday is the busiest of its four days. The Bavarian Inn does have it, indoors, but walk-in waits that afternoon can be long.",
    answer:
      "Call 989-652-9941 or book on OpenTable from the car on the way down I-75. Open 11 AM to 9 PM.",
    deadline: "Call from the road Saturday morning",
    url: "https://www.bavarianinn.com/dine/",
    urlLabel: "Bavarian Inn reservations",
    phone: "989-652-9941",
  },

  // ── Border & Tolls ─────────────────────────────────────────────────
  {
    id: "border-tolls",
    kind: "border",
    dayId: "d5",
    when: "Sat 9/19 & Sun 9/20",
    title: "Cashless tolls for Blue Water Bridge & Detroit Tunnel",
    problem:
      "Both international crossings are fully cashless.",
    answer:
      "Blue Water Bridge is $5 USD / $7 CAD; Detroit Tunnel is CA$8.25. Credit cards and Apple Pay are accepted at toll plazas.",
    url: "#/border",
    urlLabel: "Border crossing guide",
  },
];

/** Counts by kind, plus how many are completed. */
export function outstandingLooseEnds(checked = {}) {
  return LOOSE_ENDS.filter(item => !checked[item.id]);
}

export function looseEndTotals(checked = {}) {
  const pending = outstandingLooseEnds(checked);
  const byKind = {};
  KIND_ORDER.forEach((k) => {
    byKind[k] = pending.filter((e) => e.kind === k).length;
  });
  return { byKind, open: pending.length, total: LOOSE_ENDS.length, done: LOOSE_ENDS.length - pending.length };
}
