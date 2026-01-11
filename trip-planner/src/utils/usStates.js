const STATE_NAME_BY_ABBR = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
  DC: "District of Columbia",
};

const ABBR_BY_STATE_NAME = Object.fromEntries(
  Object.entries(STATE_NAME_BY_ABBR).map(([abbr, name]) => [name.toLowerCase(), abbr])
);

const US_STATE_ABBRS = Object.keys(STATE_NAME_BY_ABBR);

const STATE_NEIGHBORS_BY_ABBR = {
  AL: ["FL", "GA", "MS", "TN"],
  AK: [],
  AZ: ["CA", "CO", "NM", "NV", "UT"],
  AR: ["LA", "MO", "MS", "OK", "TN", "TX"],
  CA: ["AZ", "NV", "OR"],
  CO: ["AZ", "KS", "NE", "NM", "OK", "UT", "WY"],
  CT: ["MA", "NY", "RI"],
  DE: ["MD", "NJ", "PA"],
  FL: ["AL", "GA"],
  GA: ["AL", "FL", "NC", "SC", "TN"],
  HI: [],
  ID: ["MT", "NV", "OR", "UT", "WA", "WY"],
  IL: ["IA", "IN", "KY", "MO", "WI"],
  IN: ["IL", "KY", "MI", "OH"],
  IA: ["IL", "MN", "MO", "NE", "SD", "WI"],
  KS: ["CO", "MO", "NE", "OK"],
  KY: ["IL", "IN", "MO", "OH", "TN", "VA", "WV"],
  LA: ["AR", "MS", "TX"],
  ME: ["NH"],
  MD: ["DC", "DE", "PA", "VA", "WV"],
  MA: ["CT", "NH", "NY", "RI", "VT"],
  MI: ["IN", "OH", "WI"],
  MN: ["IA", "ND", "SD", "WI"],
  MS: ["AL", "AR", "LA", "TN"],
  MO: ["AR", "IA", "IL", "KS", "KY", "NE", "OK", "TN"],
  MT: ["ID", "ND", "SD", "WY"],
  NE: ["CO", "IA", "KS", "MO", "SD", "WY"],
  NV: ["AZ", "CA", "ID", "OR", "UT"],
  NH: ["MA", "ME", "VT"],
  NJ: ["DE", "NY", "PA"],
  NM: ["AZ", "CO", "OK", "TX", "UT"],
  NY: ["CT", "MA", "NJ", "PA", "VT"],
  NC: ["GA", "SC", "TN", "VA"],
  ND: ["MN", "MT", "SD"],
  OH: ["IN", "KY", "MI", "PA", "WV"],
  OK: ["AR", "CO", "KS", "MO", "NM", "TX"],
  OR: ["CA", "ID", "NV", "WA"],
  PA: ["DE", "MD", "NJ", "NY", "OH", "WV"],
  RI: ["CT", "MA"],
  SC: ["GA", "NC"],
  SD: ["IA", "MN", "MT", "ND", "NE", "WY"],
  TN: ["AL", "AR", "GA", "KY", "MO", "MS", "NC", "VA"],
  TX: ["AR", "LA", "NM", "OK"],
  UT: ["AZ", "CO", "ID", "NM", "NV", "WY"],
  VT: ["MA", "NH", "NY"],
  VA: ["DC", "KY", "MD", "NC", "TN", "WV"],
  WA: ["ID", "OR"],
  WV: ["KY", "MD", "OH", "PA", "VA"],
  WI: ["IA", "IL", "MI", "MN"],
  WY: ["CO", "ID", "MT", "NE", "SD", "UT"],
  DC: ["MD", "VA"],
};

function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

export function stateNameToAbbr(stateName) {
  const name = normalizeText(stateName);
  if (!name) return null;
  return ABBR_BY_STATE_NAME[name] || null;
}

export function extractMentionedStateAbbrs(text) {
  const t = String(text || "");
  if (!t.trim()) return [];

  const found = new Set();

  // Abbreviations (strict list to avoid false positives)
  const abbrPattern = new RegExp(`\\b(${US_STATE_ABBRS.join("|")})\\b`, "g");
  const upper = t.toUpperCase();
  let m;
  while ((m = abbrPattern.exec(upper))) {
    found.add(m[1]);
  }

  // Full state names
  const lower = normalizeText(t);
  for (const [abbr, name] of Object.entries(STATE_NAME_BY_ABBR)) {
    const nameLower = name.toLowerCase();
    // Cheap boundary check: require the name to appear as a phrase.
    if (lower.includes(nameLower)) {
      found.add(abbr);
    }
  }

  return Array.from(found);
}

export function expandWithNeighborStates(stateAbbrs) {
  const input = Array.isArray(stateAbbrs) ? stateAbbrs : [];
  const expanded = new Set();

  input
    .map((s) => String(s || "").toUpperCase().trim())
    .filter(Boolean)
    .forEach((abbr) => {
      expanded.add(abbr);
      (STATE_NEIGHBORS_BY_ABBR[abbr] || []).forEach((n) => expanded.add(n));
    });

  return Array.from(expanded);
}

export function isValidStateAbbr(abbr) {
  const a = String(abbr || "").toUpperCase().trim();
  return Boolean(STATE_NAME_BY_ABBR[a]);
}

// Approximate bounding boxes for US states/territories and Canadian provinces
// Format: { minLat, maxLat, minLon, maxLon }
const STATE_BOUNDS = {
  // US States
  AL: { minLat: 30.2, maxLat: 35.0, minLon: -88.5, maxLon: -84.9 },
  AK: { minLat: 51.2, maxLat: 71.4, minLon: -179.1, maxLon: -129.9 },
  AZ: { minLat: 31.3, maxLat: 37.0, minLon: -114.8, maxLon: -109.0 },
  AR: { minLat: 33.0, maxLat: 36.5, minLon: -94.6, maxLon: -89.6 },
  CA: { minLat: 32.5, maxLat: 42.0, minLon: -124.4, maxLon: -114.1 },
  CO: { minLat: 37.0, maxLat: 41.0, minLon: -109.0, maxLon: -102.0 },
  CT: { minLat: 40.9, maxLat: 42.1, minLon: -73.7, maxLon: -71.8 },
  DE: { minLat: 38.5, maxLat: 39.8, minLon: -75.8, maxLon: -75.0 },
  FL: { minLat: 24.5, maxLat: 31.0, minLon: -87.6, maxLon: -80.0 },
  GA: { minLat: 30.4, maxLat: 35.0, minLon: -85.6, maxLon: -80.8 },
  HI: { minLat: 18.9, maxLat: 22.2, minLon: -160.2, maxLon: -154.8 },
  ID: { minLat: 42.0, maxLat: 49.0, minLon: -117.2, maxLon: -111.0 },
  IL: { minLat: 36.9, maxLat: 42.5, minLon: -91.5, maxLon: -87.5 },
  IN: { minLat: 37.8, maxLat: 41.8, minLon: -88.1, maxLon: -84.8 },
  IA: { minLat: 40.4, maxLat: 43.5, minLon: -96.6, maxLon: -90.1 },
  KS: { minLat: 37.0, maxLat: 40.0, minLon: -102.0, maxLon: -94.6 },
  KY: { minLat: 36.5, maxLat: 39.1, minLon: -89.6, maxLon: -81.9 },
  LA: { minLat: 28.9, maxLat: 33.0, minLon: -94.0, maxLon: -89.0 },
  ME: { minLat: 43.1, maxLat: 47.5, minLon: -71.1, maxLon: -66.9 },
  MD: { minLat: 37.9, maxLat: 39.7, minLon: -79.5, maxLon: -75.0 },
  MA: { minLat: 41.2, maxLat: 42.9, minLon: -73.5, maxLon: -69.9 },
  MI: { minLat: 41.7, maxLat: 48.2, minLon: -90.4, maxLon: -82.4 },
  MN: { minLat: 43.5, maxLat: 49.4, minLon: -97.2, maxLon: -89.5 },
  MS: { minLat: 30.2, maxLat: 35.0, minLon: -91.7, maxLon: -88.1 },
  MO: { minLat: 36.0, maxLat: 40.6, minLon: -95.8, maxLon: -89.1 },
  MT: { minLat: 44.4, maxLat: 49.0, minLon: -116.0, maxLon: -104.0 },
  NE: { minLat: 40.0, maxLat: 43.0, minLon: -104.0, maxLon: -95.3 },
  NV: { minLat: 35.0, maxLat: 42.0, minLon: -120.0, maxLon: -114.0 },
  NH: { minLat: 42.7, maxLat: 45.3, minLon: -72.6, maxLon: -70.7 },
  NJ: { minLat: 38.9, maxLat: 41.4, minLon: -75.6, maxLon: -73.9 },
  NM: { minLat: 31.3, maxLat: 37.0, minLon: -109.0, maxLon: -103.0 },
  NY: { minLat: 40.5, maxLat: 45.0, minLon: -79.8, maxLon: -71.9 },
  NC: { minLat: 33.8, maxLat: 36.6, minLon: -84.3, maxLon: -75.5 },
  ND: { minLat: 45.9, maxLat: 49.0, minLon: -104.0, maxLon: -96.6 },
  OH: { minLat: 38.4, maxLat: 42.0, minLon: -84.8, maxLon: -80.5 },
  OK: { minLat: 33.6, maxLat: 37.0, minLon: -103.0, maxLon: -94.4 },
  OR: { minLat: 41.9, maxLat: 46.3, minLon: -124.6, maxLon: -116.5 },
  PA: { minLat: 39.7, maxLat: 42.3, minLon: -80.5, maxLon: -74.7 },
  RI: { minLat: 41.1, maxLat: 42.0, minLon: -71.9, maxLon: -71.1 },
  SC: { minLat: 32.0, maxLat: 35.2, minLon: -83.4, maxLon: -78.5 },
  SD: { minLat: 42.5, maxLat: 46.0, minLon: -104.0, maxLon: -96.4 },
  TN: { minLat: 35.0, maxLat: 36.7, minLon: -90.3, maxLon: -81.6 },
  TX: { minLat: 25.8, maxLat: 36.5, minLon: -106.6, maxLon: -93.5 },
  UT: { minLat: 37.0, maxLat: 42.0, minLon: -114.0, maxLon: -109.0 },
  VT: { minLat: 42.7, maxLat: 45.0, minLon: -73.4, maxLon: -71.5 },
  VA: { minLat: 36.5, maxLat: 39.5, minLon: -83.7, maxLon: -75.2 },
  WA: { minLat: 45.5, maxLat: 49.0, minLon: -124.8, maxLon: -116.9 },
  WV: { minLat: 37.2, maxLat: 40.6, minLon: -82.6, maxLon: -77.7 },
  WI: { minLat: 42.5, maxLat: 47.1, minLon: -92.9, maxLon: -86.8 },
  WY: { minLat: 41.0, maxLat: 45.0, minLon: -111.0, maxLon: -104.0 },
  DC: { minLat: 38.8, maxLat: 39.0, minLon: -77.1, maxLon: -76.9 },
  // Canadian Provinces (commonly visited from US)
  ON: { minLat: 41.7, maxLat: 56.9, minLon: -95.2, maxLon: -74.3 },
  QC: { minLat: 45.0, maxLat: 62.6, minLon: -79.8, maxLon: -57.1 },
  BC: { minLat: 48.3, maxLat: 60.0, minLon: -139.1, maxLon: -114.0 },
  AB: { minLat: 49.0, maxLat: 60.0, minLon: -120.0, maxLon: -110.0 },
  MB: { minLat: 49.0, maxLat: 60.0, minLon: -102.0, maxLon: -89.0 },
  SK: { minLat: 49.0, maxLat: 60.0, minLon: -110.0, maxLon: -101.4 },
  NS: { minLat: 43.4, maxLat: 47.0, minLon: -66.4, maxLon: -59.7 },
  NB: { minLat: 44.6, maxLat: 48.1, minLon: -69.1, maxLon: -63.8 },
  PE: { minLat: 45.9, maxLat: 47.1, minLon: -64.4, maxLon: -62.0 },
  NL: { minLat: 46.6, maxLat: 60.4, minLon: -67.8, maxLon: -52.6 },
};

/**
 * Build a viewbox from an array of state/province abbreviations.
 * Returns { left, top, right, bottom } for Nominatim viewbox parameter,
 * or null if no valid states are provided.
 */
export function buildViewboxFromStates(stateAbbrs) {
  const abbrs = Array.isArray(stateAbbrs)
    ? stateAbbrs.map((s) => String(s || "").toUpperCase().trim()).filter(Boolean)
    : [];

  if (abbrs.length === 0) return null;

  let minLat = Infinity;
  let maxLat = -Infinity;
  let minLon = Infinity;
  let maxLon = -Infinity;
  let found = false;

  for (const abbr of abbrs) {
    const bounds = STATE_BOUNDS[abbr];
    if (!bounds) continue;
    found = true;
    minLat = Math.min(minLat, bounds.minLat);
    maxLat = Math.max(maxLat, bounds.maxLat);
    minLon = Math.min(minLon, bounds.minLon);
    maxLon = Math.max(maxLon, bounds.maxLon);
  }

  if (!found) return null;

  // Add a small buffer for edge cases
  const latBuffer = (maxLat - minLat) * 0.1;
  const lonBuffer = (maxLon - minLon) * 0.1;

  return {
    left: minLon - lonBuffer,
    top: maxLat + latBuffer,
    right: maxLon + lonBuffer,
    bottom: minLat - latBuffer,
  };
}
