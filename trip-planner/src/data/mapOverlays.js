/**
 * Data for Advanced Map Overlays:
 * 1. Highway Shields (M-22, I-75, M-185, I-94, US-31, I-96)
 * 2. International Border Customs Portals (Blue Water Bridge, Detroit-Windsor Tunnel)
 * 3. Great Lakes Microclimate & Wind Gauges
 * 4. Topographic Elevation Profile points
 * 5. Solar & Golden Hour Astronomical calculations
 */

export const HIGHWAY_SHIELDS = [
  {
    id: "m22-leelanau",
    type: "state",
    route: "M-22",
    name: "M-22 Lake Michigan Scenic Highway",
    coords: [44.8886, -86.0347],
    desc: "Voted America's most scenic autumn drive. 116 miles wrapping the Leelanau Peninsula shoreline.",
  },
  {
    id: "m22-arcadia",
    type: "state",
    route: "M-22",
    name: "M-22 Arcadia Bluffs Corridor",
    coords: [44.3218, -86.1828],
    desc: "Rolling coastal bluffs rising 300+ feet above Lake Michigan.",
  },
  {
    id: "i75-mackinac",
    type: "interstate",
    route: "I-75",
    name: "I-75 Mackinac Bridge 5-Mile Span",
    coords: [45.816, -84.7278],
    desc: "World's 5th longest suspension bridge connecting Michigan's Lower and Upper Peninsulas.",
  },
  {
    id: "m185-mackinac",
    type: "state",
    route: "M-185",
    name: "M-185 Car-Free Island Loop",
    coords: [45.858, -84.6189],
    desc: "Only state highway in the USA with a total ban on motorized vehicles. 8.2-mile flat perimeter.",
  },
  {
    id: "i94-port-huron",
    type: "interstate",
    route: "I-94",
    name: "I-94 International Gateway",
    coords: [42.9856, -82.5921],
    desc: "Final US highway approach before the Blue Water Bridge border crossing into Canada.",
  },
  {
    id: "us31-pentwater",
    type: "us",
    route: "US-31",
    name: "US-31 Shoreline Freeway",
    coords: [43.6812, -86.3931],
    desc: "Fast corridor connecting Grand Rapids to West Michigan coastal resort towns.",
  },
  {
    id: "i96-grand-rapids",
    type: "interstate",
    route: "I-96",
    name: "I-96 West Michigan Corridor",
    coords: [42.844, -85.8839],
    desc: "Cross-state freeway linking Lake Michigan shore to Grand Rapids and Lansing.",
  },
];

export const BORDER_PORTALS = [
  {
    id: "portal-blue-water",
    dayId: "d5",
    name: "Blue Water Bridge Customs Portal",
    coords: [42.9988, -82.4225],
    direction: "Entering Canada 🇺🇸 ➔ 🇨🇦",
    crossing: "St. Clair River (Port Huron, MI ➔ Sarnia, ON)",
    toll: "$5.00 USD (Cashless: Visa, Mastercard, Apple Pay, Discover)",
    returnToll: "CA$7.00 / ~$5.11 USD upon return",
    clearance: "Twin suspension spans over deep international shipping channel",
    checklist: [
      "Passports for all 3 passengers",
      "Budget Canadian Non-Resident Insurance Card (requested at O'Hare pickup)",
      "Tap-to-pay credit card ready in driver console for $5 toll",
      "Declare purchases or gifts over exemption allowance",
    ],
  },
  {
    id: "portal-detroit-tunnel",
    dayId: "d6",
    name: "Detroit–Windsor Tunnel Customs Portal",
    coords: [42.325, -83.041],
    direction: "Re-entering USA 🇨🇦 ➔ 🇺🇸",
    crossing: "Under Detroit River (Windsor, ON ➔ Downtown Detroit, MI)",
    toll: "CA$8.25 (~$6.05 USD) via card or Tunnel Toll app",
    clearance: "12 ft 8 in vertical clearance (Mazda CX-50 is 5 ft 8 in)",
    checklist: [
      "Passports ready for CBP primary inspection booth",
      "Declare Canadian purchases (under $800 USD exemption per person)",
      "Exit merges directly onto Jefferson Ave / Renaissance Center corridor",
    ],
  },
];

export const MICROCLIMATES = [
  {
    id: "clim-straits",
    name: "Straits of Mackinac",
    coords: [45.78, -84.7278],
    icon: "💨",
    badge: "58°F · 16 mph NNE",
    title: "Straits Marine Wind & Wave Corridor",
    detail:
      "Cold water exchange between Lake Michigan and Lake Huron creates brisk, localized gusts (14–19 mph) and 2–3 ft chop. Windbreaker/fleece required on Shepler's ferry open deck.",
  },
  {
    id: "clim-dunes",
    name: "Sleeping Bear Dunes",
    coords: [44.8731, -86.0427],
    icon: "☀️",
    badge: "68°F · High Glare · UV 5.8",
    title: "Quartz Dune Thermal & Glare Zone",
    detail:
      "0% shade across open sand dunes. White quartz sand reflects 85% of solar radiation off Lake Michigan. Bring polarized sunglasses, sunscreen, and refillable water.",
  },
  {
    id: "clim-gr",
    name: "Grand Rapids & Heritage Hill",
    coords: [42.9632, -85.6678],
    icon: "🍂",
    badge: "72°F / 52°F · Mild Autumn",
    title: "Inland Valley Shielded Microclimate",
    detail:
      "Sheltered from lake breezes by inland ridge. Crisp, pleasant walking temperatures for Meyer May Wright House and ArtPrize installations.",
  },
  {
    id: "clim-sarnia",
    name: "Point Edward / Sarnia Shore",
    coords: [42.998, -82.404],
    icon: "🌊",
    badge: "62°F · Evening Chill",
    title: "Lake Huron Cold Water Down-Draft",
    detail:
      "Rapid post-sunset temperature drop along the St. Clair River outlet. Evening waterfront walk at Point Edward requires an extra layer.",
  },
];

/**
 * Approximate elevation model (in feet) along the road trip milestones.
 */
export const ELEVATION_PROFILE = [
  { mile: 0, label: "O'Hare / Chicago", elev: 668, day: "d0", coords: [41.9742, -87.9073] },
  { mile: 15, label: "Palatine Home", elev: 740, day: "d0", coords: [42.1103, -88.0342] },
  { mile: 70, label: "Indiana Dunes", elev: 590, day: "d1", coords: [41.6253, -87.0544] },
  { mile: 175, label: "Grand Rapids Valley", elev: 640, day: "d1", coords: [42.9634, -85.6681] },
  { mile: 270, label: "Ludington Harbor", elev: 585, day: "d1", coords: [43.9553, -86.4526] },
  { mile: 335, label: "Traverse City Shore", elev: 600, day: "d2", coords: [44.7631, -85.6206] },
  { mile: 380, label: "Sleeping Bear Dunes Bluff", elev: 1030, day: "d2", coords: [44.8833, -86.0408] },
  { mile: 450, label: "Leelanau Moraines", elev: 860, day: "d2", coords: [45.0211, -85.7592] },
  { mile: 520, label: "Charlevoix & Petoskey", elev: 610, day: "d3", coords: [45.3181, -85.2584] },
  { mile: 580, label: "Mackinaw City Harbor", elev: 590, day: "d3", coords: [45.7778, -84.7231] },
  { mile: 590, label: "Mackinac Island Bluff", elev: 720, day: "d4", coords: [45.8514, -84.6157] },
  { mile: 660, label: "Gaylord Plateau (I-75 Highpoint)", elev: 1348, day: "d5", coords: [45.0275, -84.6747] },
  { mile: 790, label: "Frankenmuth Valley", elev: 630, day: "d5", coords: [43.3317, -83.7378] },
  { mile: 880, label: "Port Huron / St. Clair River", elev: 595, day: "d5", coords: [42.9989, -82.4239] },
  { mile: 945, label: "Sarnia, Ontario", elev: 600, day: "d6", coords: [42.9989, -82.42] },
  { mile: 1020, label: "Detroit River Waterfront", elev: 575, day: "d6", coords: [42.3186, -83.0397] },
  { mile: 1060, label: "Ann Arbor / Huron Hills", elev: 840, day: "d7", coords: [42.2808, -83.743] },
  { mile: 1180, label: "Kalamazoo Moraines", elev: 780, day: "d7", coords: [42.2917, -85.5872] },
  { mile: 1330, label: "SW Michigan / New Buffalo", elev: 620, day: "d7", coords: [41.7939, -86.7447] },
  { mile: 1430, label: "O'Hare Return", elev: 668, day: "d7", coords: [41.9742, -87.9073] },
];

/**
 * Solar position calculations for mid-September Michigan (~44.5° N).
 * Returns { altitudeDeg, azimuthDeg, isGoldenHour, isDaylight, label }
 */
export function calculateSunPosition(hourDecimal) {
  const sunrise = 7.33; // ~7:20 AM EDT
  const sunset = 19.93; // ~7:56 PM EDT

  if (hourDecimal < sunrise - 0.5 || hourDecimal > sunset + 0.6) {
    return {
      altitudeDeg: -15,
      azimuthDeg: hourDecimal < 12 ? 60 : 300,
      isGoldenHour: false,
      isDaylight: false,
      label: "Nightfall / Twilight",
      glowColor: "rgba(15, 23, 42, 0.4)",
    };
  }

  const daylightFraction = (hourDecimal - sunrise) / (sunset - sunrise);
  const altitudeDeg = Math.sin(daylightFraction * Math.PI) * 47;
  const azimuthDeg = 88 + daylightFraction * (274 - 88);

  const isGoldenHour =
    (hourDecimal >= sunrise && hourDecimal <= sunrise + 0.75) ||
    (hourDecimal >= sunset - 0.75 && hourDecimal <= sunset);

  let label = "Full Daylight";
  let glowColor = "rgba(255, 255, 255, 0)";
  if (isGoldenHour) {
    label = hourDecimal < 12 ? "Morning Golden Hour" : "Evening Golden Hour (Sunset)";
    glowColor = "rgba(245, 158, 11, 0.35)";
  } else if (altitudeDeg > 40) {
    label = "Midday Solar Peak";
  }

  return {
    altitudeDeg: Math.round(altitudeDeg),
    azimuthDeg: Math.round(azimuthDeg),
    isGoldenHour,
    isDaylight: altitudeDeg > 0,
    label,
    glowColor,
  };
}
