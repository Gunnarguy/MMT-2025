/** Exploratory alternatives only. DAYS and Mom's original wording stay authoritative. */
export const THURSDAY_PLACES = {
  traverse: { name: "Traverse City", coords: [44.7631, -85.6206] },
  charlevoix: { name: "Charlevoix", coords: [45.3178, -85.2584] },
  petoskey: { name: "Petoskey", coords: [45.3733, -84.9553] },
  // Boyne's own parking/directions link, checked September 13, 2026.
  skybridge: { name: "SkyBridge · Boyne Mountain", coords: [45.161591, -84.9292451] },
  mackinaw: { name: "Mackinaw City", coords: [45.7775, -84.7278] },
};

export const SKYBRIDGE = {
  checked: "September 13, 2026",
  url: "https://www.boynemountain.com/skybridge-michigan",
  tickets: "https://shop.boynemountain.com/l/skybridge-michigan/p/skybridge-ticket",
  phone: "855-688-7024",
  hours: "11 AM–6:30 PM · Thursday, September 17",
};

export const THURSDAY_OPTIONS = [
  {
    id: "coast", name: "Original · coastal towns", color: "#267044",
    places: ["traverse", "charlevoix", "petoskey", "mackinaw"],
    roads: "US-31 through Charlevoix and Petoskey, then I-75 into Mackinaw City.",
    keeps: "Mushroom Houses, Charlevoix waterfront, Petoskey lunch and stone hunting.",
    tradeoff: "No SkyBridge. More town and shoreline stops; the road is not continuously on the water.",
    cost: "Main walks and stone hunt are free; Castle Farms is optional and extra.",
    schedule: [
      ["9:00 AM", "Leave Traverse City"],
      ["10:15 AM–12:00 PM", "Charlevoix: Mushroom Houses and waterfront"],
      ["12:30–2:30 PM", "Petoskey: lunch and Magnus Park"],
      ["About 3:30 PM", "Reach Mackinaw City; allow more time if adding Castle Farms"],
    ],
  },
  {
    id: "skybridge", name: "SkyBridge → straight north", color: "#b34b22",
    places: ["traverse", "skybridge", "mackinaw"],
    roads: "M-72 east → US-131 north to Boyne Mountain; Thumb Lake Road toward I-75 north afterward.",
    keeps: "Chairlift, suspension bridge and Boyne Valley views; an earlier afternoon in Mackinaw City.",
    tradeoff: "Skip Charlevoix, the Mushroom Houses, Petoskey lunch and Magnus Park stone hunting.",
    cost: "Add 3 SkyBridge admissions. Date-specific checkout price still needs checking; not in the trip budget.",
    schedule: [
      ["9:15 AM", "Leave Traverse City after breakfast"],
      ["About 10:45 AM", "Park at Boyne Mountain and walk to the lift"],
      ["11:00 AM–1:00 PM", "Chairlift and SkyBridge; two hours is a planning allowance"],
      ["1:00–2:00 PM", "Lunch at the resort or nearby"],
      ["About 3:30 PM", "Reach Mackinaw City via I-75"],
    ],
  },
  {
    id: "skybridge-petoskey", name: "SkyBridge + Petoskey", color: "#6350a2",
    places: ["traverse", "skybridge", "petoskey", "mackinaw"],
    roads: "M-72 east → US-131 north to Boyne Mountain; continue US-131 to Petoskey, then US-31 and I-75 north.",
    keeps: "SkyBridge plus the Gaslight District, Little Traverse Bay and a Petoskey stone hunt.",
    tradeoff: "Skip Charlevoix and the Mushroom Houses. Lunch and beach time make the day longer than driving straight north.",
    cost: "Add 3 SkyBridge admissions; Magnus Park remains free. Ticket price is not yet verified or budgeted.",
    schedule: [
      ["9:15 AM", "Leave Traverse City after breakfast"],
      ["About 10:45 AM", "Park at Boyne Mountain and walk to the lift"],
      ["11:00 AM–1:00 PM", "Chairlift and SkyBridge"],
      ["1:30–2:30 PM", "Lunch in Petoskey's Gaslight District"],
      ["2:30–3:15 PM", "Magnus Park: shoreline walk and stone hunting"],
      ["About 4:15–4:30 PM", "Reach Mackinaw City, with time before dinner"],
    ],
  },
];

export function thursdayDirections(option) {
  const points = option.places.map((id) => THURSDAY_PLACES[id].coords.join(","));
  const params = new URLSearchParams({ api: "1", origin: points[0], destination: points.at(-1), travelmode: "driving", waypoints: points.slice(1, -1).join("|") });
  return `https://www.google.com/maps/dir/?${params}`;
}
