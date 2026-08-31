/**
 * Town Scout — could we actually live here?
 *
 * The September trip doubles as a scouting run, so every town on the route got
 * a full livability workup: 46 web-research jobs across four rounds, then a
 * dedicated verification round that re-derived every load-bearing number from
 * independent sources (55 confirmed, 26 corrected to ranges). Researched
 * 2026-08-28. Figures are shown as ranges wherever sources legitimately
 * disagree — a single crisp number for a median home price is false precision,
 * not accuracy.
 *
 * verified: "yes" = key figures independently re-confirmed; "split" = sources
 * disagree and the range shows the spread.
 *
 * comfort = pre-tax household income for a two-adult remote-working household
 * to live comfortably (own the median home, run two cars, save). The range
 * spans two methods: a lean MIT-anchored budget and a uniform fuller basket
 * priced identically for every town (median price, 2025 millage, 6.66%
 * mortgage). crime = violent / property incidents per 1,000 residents.
 */

export const SCOUT_META = {
  researched: "2026-08-28",
  corrected: "2026-08-29",
  method:
    "46 research jobs across 4 rounds plus a verification round. Housing was rebuilt on 2026-08-29 against Census ACS after the first pass was found to be blending median-sold, median-listing, average-sale and Zillow AVM figures as if interchangeable. Each town now shows median SOLD (Redfin) beside Census ACS median home VALUE, which covers the whole owner-occupied stock and excludes seasonal units. Also: MIT Living Wage, NOAA 1991-2020 normals, FCC/BroadbandNow, and the Michigan Treasury 2025 millage compilation (Form L-4029).",
  confirmed: 55,
  correctedFigures: 26,
};

export const SCOUT_TIERS = [
  {
    id: "viable",
    label: "Year-round viable",
    color: "#2f855a",
    blurb:
      "Real towns with real winters. The economy, groceries, healthcare, and internet all keep running in February.",
  },
  {
    id: "seasonal",
    label: "Seasonal risk",
    color: "#b7791f",
    blurb:
      "Lovely in September, thin in January. Resort economies that partially shut when the tourists leave — visit in winter before committing.",
  },
  {
    id: "no",
    label: "Visit, don't move",
    color: "#c53030",
    blurb:
      "Priced out, crime, or a border: Mackinac Island's median is $1M+ with no cars; the Ontario pair require Canadian immigration status before anything else matters.",
  },
];

export const RELOCATION_TOWNS = [
  {
    id: "scout-grand-rapids",
    name: "Grand Rapids",
    county: "Kent County",
    coords: [42.9634, -85.6681],
    tier: "viable",
    verified: "yes",
    median: "$310,000 sold · $244,500 ACS value",
    comfort: "$106k in town · $102k in county",
    crime: "9.0 / 24.4–24.8",
    snow: '77.6"',
    fiber: "30% fiber · 99% cable",
    tax: "33.12 mills (1.66%) + 1.5% city income tax",
    drive: "≈208 mi · 3:31",
    verdict:
      "Cheapest viable median, closest to Palatine, best overall connectivity — and the discount is explained: ~9 violent crimes per 1,000 (citywide; varies sharply by neighborhood) and 23,000 lead service lines. First on value. Buy it street by street, and ask what the service line is made of.",
  },
  {
    id: "scout-belleville",
    name: "Belleville",
    county: "Wayne County",
    coords: [42.2048, -83.4852],
    tier: "viable",
    verified: "split",
    median: "$148,300 ACS value · sold data conflicts",
    comfort: "data conflict — see note",
    crime: "3.10 / 10.1–10.3",
    snow: '45"',
    fiber: "7% fiber · 97% cable",
    tax: "37.88 mills (1.89%)",
    drive: "≈287 mi · 4:34",
    verdict:
      "Flagged unreliable rather than guessed. Its Census home value ($148,300), median sold ($334,000) and median listing ($119,949) cannot all be true for a city of ~4,000 - small-sample noise, not a market. Wayne County's $194,800 value is the trustworthy anchor, and DTW is twenty minutes away. Worth seeing on the ground; do not trust these numbers until you have stood in it.",
  },
  {
    id: "scout-frankenmuth",
    name: "Frankenmuth",
    county: "Saginaw County",
    coords: [43.3317, -83.7383],
    tier: "viable",
    verified: "yes",
    median: "$323,000 sold · $300,500 ACS value",
    comfort: "$110k in town · $82k in county",
    crime: "2.3–2.9 / 6.5–7.4",
    snow: '44"',
    fiber: "10% fiber · 76% cable",
    tax: "40.28 mills (2.01%, incl. 5-mill assessment)",
    drive: "≈330 mi · 4:55",
    verdict:
      "The other quiet winner: low crime, the least snow of any northern option, under five hours to Palatine. The Bavarian theme is a tourist economy that stays open all year. Its 2% property tax quietly claws back some of the price advantage.",
  },
  {
    id: "scout-traverse-city",
    name: "Traverse City",
    county: "Grand Traverse County",
    coords: [44.7631, -85.6206],
    tier: "viable",
    verified: "yes",
    median: "$445,000 sold · $415,400 ACS value",
    comfort: "$128k in town · $111k in county",
    crime: "2.8–3.2 / 9.9–12.9",
    snow: '101"',
    fiber: "0.3% fiber · 90% cable",
    tax: "37.07 mills city proper (1.85%) — the oft-quoted 26.8 is Acme Twp",
    drive: "≈350 mi · 5:57",
    verdict:
      "The life most people picture when they say northern Michigan, at a price you can actually name. Two verified surprises: the city's real millage is 37, not the widely-quoted 27 — about $8,700/yr on the median — and it is the region's fiber desert at 0.3%. Cable carries remote work fine; check the address anyway.",
  },
  {
    id: "scout-petoskey",
    name: "Petoskey",
    county: "Emmet County",
    coords: [45.3733, -84.9553],
    tier: "viable",
    verified: "yes",
    median: "$472,000 sold · $364,100 ACS value",
    comfort: "$131k in town · $107k in county",
    crime: "1.2–1.5 / 5.7–6.4",
    snow: '123.6"',
    fiber: "44% fiber · 69% cable",
    tax: "33.63 mills (1.68%)",
    drive: "≈394 mi · 6:03",
    verdict:
      "The verification round's climber: lowest violent crime on the board, the best fiber in the north, a real hospital (McLaren), no PFAS site found. The price is the most snow of anywhere on this list — 123 inches — and six hours to Palatine.",
  },
  {
    id: "scout-ann-arbor",
    name: "Ann Arbor",
    county: "Washtenaw County",
    coords: [42.2808, -83.743],
    tier: "viable",
    verified: "yes",
    median: "$476,000 sold · $479,800 ACS value",
    comfort: "$140k in town · $123k in county",
    crime: "3.0–3.4 / 17.2–21.1",
    snow: '61.4"',
    fiber: "26% fiber · 95% cable",
    tax: "52.67 mills (2.63%) — ~$12,900/yr on the median",
    drive: "≈275 mi · 4:41",
    verdict:
      "The most culturally SF-like option — college town, food, walkability — and taxed like it: the highest viable-tier millage means a $12,900 first-year bill on the median house. Property crime runs college-town high. Zero lead lines.",
  },
  {
    id: "scout-port-huron",
    name: "Port Huron",
    county: "St. Clair County",
    coords: [42.9709, -82.4249],
    tier: "viable",
    verified: "yes",
    median: "$195,000 sold · $156,700 ACS value",
    comfort: "$89k in town · $97k in county",
    crime: "6.0 / 15.0–15.1",
    snow: '35.5"',
    fiber: "27% fiber · 99% cable",
    tax: "41.31 mills (2.07%) + 1.0% city income tax",
    drive: "≈372 mi · 5:29",
    verdict:
      "The cheapest way into Michigan homeownership, with the least snow on the list and Canada across the bridge. Median sources disagree by 30% — the market is small enough that a few sales move it. Mid-pack crime, three PFAS sites on the state list.",
  },
  {
    id: "scout-ludington",
    name: "Ludington",
    county: "Mason County",
    coords: [43.9553, -86.4526],
    tier: "seasonal",
    verified: "yes",
    median: "$311,000 sold · $201,100 ACS value",
    comfort: "$108k in town · $93k in county",
    crime: "2.1–2.6 / 9.4–10.6",
    snow: '86"',
    fiber: "55% fiber · 75% cable",
    tax: "40.67 mills (2.03%)",
    drive: "≈275 mi · 4:21",
    verdict:
      "Verification's biggest single flip: round one called it a 0.2%-fiber cable town, the re-check found 54.9% fiber (Truestream's build). Closest northern shore town to Palatine at 4:21. Night one of the trip — pay attention to what's open at 8pm, because that's the seasonal question in miniature.",
  },
  {
    id: "scout-charlevoix",
    name: "Charlevoix",
    county: "Charlevoix County",
    coords: [45.318, -85.2584],
    tier: "seasonal",
    verified: "split",
    median: "$378,000 sold · $331,500 ACS value",
    comfort: "$116k in town · $100k in county",
    crime: "1.7–2.1 / 14.9–15.0",
    snow: '103"',
    fiber: "43% fiber · 63% cable",
    tax: "33.48 mills (1.67%)",
    drive: "≈387 mi · 5:57",
    verdict:
      "Earlier research put this at $525-729k; that blended median LISTING with average sale. It actually sells at $378,000 - a 56% overstatement, now corrected. Second-lowest violent crime, 42.7% fiber, and Charlevoix County is cheaper still at $276,800. The catch is its PFAS site: the municipal well field. Ask about water before anything else.",
  },
  {
    id: "scout-glen-arbor",
    name: "Glen Arbor / Empire",
    county: "Leelanau County",
    coords: [44.8995, -85.9812],
    tier: "seasonal",
    verified: "yes",
    median: "$625k–$1.04M sold · $456–700k ACS value",
    comfort: "$174k in town · $122k in county",
    crime: "1.4–2.9 / 1.8–14.7",
    snow: '117–120"',
    fiber: "9% fiber · 84% cable",
    tax: "17.7–26.5 mills (~1%) — the lowest rates on the list",
    drive: "≈348–370 mi · 5:44–6:24",
    verdict:
      "Sleeping Bear's front porch, priced like it: the highest comfortable-income requirement of any real option, ~$300k. The consolation is the sleeper tax rate — the priciest houses here carry the lowest millage in this entire comparison. Deep snow country, tiny year-round population.",
  },
  {
    id: "scout-mackinaw-city",
    name: "Mackinaw City",
    county: "Cheboygan / Emmet County",
    coords: [45.7775, -84.7271],
    tier: "seasonal",
    verified: "split",
    median: "$289,000 sold · $224,300 ACS value",
    comfort: "$103k in town · $88k in county",
    crime: "5.9 / 35.4",
    snow: '93"',
    fiber: "6% fiber · 59% cable",
    tax: "36.7–37.5 mills (1.84–1.88%)",
    drive: "≈447 mi · 6:34",
    verdict:
      "The most seasonal town on the mainland — the property-crime rate is a tourist-town artifact (a few hundred year-round residents under a summer-sized incident count), and much of the town simply closes after October. You'll sleep here two nights; imagine it in February before going further.",
  },
  {
    id: "scout-mackinac-island",
    name: "Mackinac Island",
    county: "Mackinac County",
    coords: [45.8492, -84.6189],
    tier: "no",
    verified: "yes",
    median: "$1.07–1.3M sold · ACS value NOT IN DATA",
    comfort: "$232k in town",
    crime: "1.7–3.2 / 74–86",
    snow: '87–94"',
    fiber: "0% fiber · 34% cable",
    tax: "25.39 mills (1.27%)",
    drive: "≈447 mi · 6:34 + ferry",
    verdict:
      "No cars, a few hundred winter residents, seven-figure medians, and the ferry is the commute. The property-crime figure is the same tourist artifact as Mackinaw City's. A place to love for a day — which is exactly what day five is for.",
  },
  {
    id: "scout-detroit",
    name: "Detroit",
    county: "Wayne County",
    coords: [42.3314, -83.0458],
    tier: "no",
    verified: "yes",
    median: "$110,000 sold · $95,900 ACS value",
    comfort: "$78k in town · $94k in county",
    crime: "17.8–18.1 / 43.1–43.6",
    snow: '45"',
    fiber: "18% fiber · 99% cable",
    tax: "64.18 mills (3.21%) + 2.4% city income tax",
    drive: "≈317 mi · 4:44–5:15",
    verdict:
      "A house for the price of an SF parking spot, then the catch: the state's heaviest tax stack — 3.2% effective property plus 2.4% city income tax — and the highest crime on this list. Individual neighborhoods break the citywide averages in both directions; as a blanket answer, it's a no.",
  },
  {
    id: "scout-sarnia",
    name: "Sarnia / Point Edward",
    county: "Lambton County, Ontario",
    coords: [42.9745, -82.4066],
    tier: "no",
    verified: "yes",
    median: "CA$495k (≈US$352k)",
    comfort: "≈US$83k",
    crime: "11.9 / 34.5",
    snow: '44.1"',
    fiber: "Canadian providers",
    tax: "Ontario property tax ~2.1%",
    drive: "≈377 mi · 5:35",
    verdict:
      "The cheapest comfortable life on the entire list — Canadian healthcare removes the biggest US line item — behind a wall the spreadsheet can't cross: US citizens need immigration status to live here. Without a path to residency, this row is trivia.",
  },
  {
    id: "scout-windsor",
    name: "Windsor",
    county: "Essex County, Ontario",
    coords: [42.3149, -83.0364],
    tier: "no",
    verified: "split",
    median: "CA$510–579k (≈US$363–412k)",
    comfort: "≈US$136k net",
    crime: "9.5–13.5 / 27–39",
    snow: '47"',
    fiber: "Canadian providers",
    tax: "2.10% property (2026 rate)",
    drive: "≈321 mi · 5:35",
    verdict:
      "Same border wall as Sarnia, with higher prices and higher crime (sources disagree on how much). The tunnel to Detroit makes it a fascinating day on the trip and an immigration project as a home.",
  },
];

/** Statewide traps — the things a Michigan listing never tells a California buyer. */
export const SCOUT_TRAPS = [
  {
    level: "warn",
    title: "Property tax uncaps the year after you buy",
    body:
      "Proposal A caps taxable value while one owner holds a house; on sale it resets to ~50% of market value. The seller's advertised tax bill is not yours — a long-held home's bill can double, and a first-year Detroit buyer recently got a $19,686 bill the listing never hinted at. File the Principal Residence Exemption (Form 2368, by June 1 or Nov 1) for up to 18 mills off.",
  },
  {
    level: "warn",
    title: "Four of these towns levy a local income tax",
    body:
      "Michigan is a 4.25% flat state — then Detroit adds 2.4%, Grand Rapids and Saginaw 1.5%, Port Huron 1.0% for residents. At $150k household income, Detroit costs about $3,500 more per year than San Francisco; at $250k, Port Huron comes out cheaper than SF. The crossover is real — model your own number.",
  },
  {
    level: "info",
    title: "Propane roughly doubles the heating bill",
    body:
      "Much of the rural north has no gas main. EIA's 2025–26 Midwest winter outlook: $1,267 on propane vs $637 on natural gas for the season. Ask which fuel a house burns before falling for it.",
  },
  {
    level: "info",
    title: "Water due-diligence is town-specific",
    body:
      "Grand Rapids has ~23,000 lead service lines; Ludington ~1,265 plus 1,556 unknown; Traverse City, Ann Arbor and Belleville are essentially clear. PFAS sites sit at Charlevoix's municipal well field, Traverse City's airport and Coast Guard station, and three Port Huron locations. Radon exceeds the action level in all 83 counties. Ask for the service-line material and a well test on any rural property.",
  },
];
