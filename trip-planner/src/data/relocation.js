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

/**
 * The ten things a move actually turns on, each scored 0–10 per town from the
 * researched figures (the raw numbers sit in each town's workup). Weights are
 * the reader's; the scores are ours and say so on the page.
 */
export const SCOUT_DIMENSIONS = [
  { key: "cost", label: "Cost", icon: "💸", hint: "Income needed to live comfortably — lower is better" },
  { key: "winter", label: "Mild winter", icon: "❄️", hint: "Less snow scores higher" },
  { key: "internet", label: "Internet", icon: "📶", hint: "Fiber and cable availability" },
  { key: "healthcare", label: "Healthcare", icon: "🏥", hint: "ER distance, trauma level, safety grade" },
  { key: "errands", label: "Errands", icon: "🛒", hint: "Costco, Target, Trader Joe's, Amazon speed" },
  { key: "culture", label: "Culture & food", icon: "🍺", hint: "Restaurants, breweries, walkability, venues" },
  { key: "nature", label: "Nature", icon: "🌲", hint: "Water, dunes, trails within 30 minutes" },
  { key: "safety", label: "Safety", icon: "🛡️", hint: "Violent crime per 1,000" },
  { key: "mom", label: "Near Mom", icon: "🏠", hint: "Drive time to Palatine" },
  { key: "yearRound", label: "Year-round life", icon: "📅", hint: "Does the town still run in February?" },
];

/** Campbell, CA — where they live now — through the same NOAA math (San Jose station). */
export const SCOUT_CAMPBELL_CLIMATE = {
  "station": "San Jose (USW00023293), 5.2 mi from Campbell",
  "years": "2010–2024",
  "annual": {
    "snow": 0,
    "rain": 12.0,
    "snowDays": 0,
    "snowCover": 0,
    "below0": 0,
    "frost": 2.9,
    "above90": 14.7,
    "wetDays": 54.4,
    "recordLow": 25,
    "recordHigh": 109,
    "maxSnowDay": 0,
    "snowiest": "none",
    "wettest": "Dec 2.43\"",
    "hottest": "Aug 81.7°",
    "coldest": "Dec 42.8°",
    "snowSeason": "none",
    "coverage": 99
  },
  "months": [
    {
      "m": "Jan",
      "snow": 0,
      "rain": 2.31,
      "hi": 61.1,
      "lo": 42.8
    },
    {
      "m": "Feb",
      "snow": 0,
      "rain": 1.95,
      "hi": 63.6,
      "lo": 43.5
    },
    {
      "m": "Mar",
      "snow": 0,
      "rain": 2.16,
      "hi": 66,
      "lo": 46.3
    },
    {
      "m": "Apr",
      "snow": 0,
      "rain": 0.93,
      "hi": 70.2,
      "lo": 49.1
    },
    {
      "m": "May",
      "snow": 0,
      "rain": 0.28,
      "hi": 73.6,
      "lo": 52.5
    },
    {
      "m": "Jun",
      "snow": 0,
      "rain": 0.13,
      "hi": 79.7,
      "lo": 56.6
    },
    {
      "m": "Jul",
      "snow": 0,
      "rain": 0,
      "hi": 81.4,
      "lo": 58.7
    },
    {
      "m": "Aug",
      "snow": 0,
      "rain": 0,
      "hi": 81.7,
      "lo": 59.7
    },
    {
      "m": "Sep",
      "snow": 0,
      "rain": 0.12,
      "hi": 81.6,
      "lo": 58.3
    },
    {
      "m": "Oct",
      "snow": 0,
      "rain": 0.41,
      "hi": 77.5,
      "lo": 53.9
    },
    {
      "m": "Nov",
      "snow": 0,
      "rain": 1.28,
      "hi": 67.2,
      "lo": 46
    },
    {
      "m": "Dec",
      "snow": 0,
      "rain": 2.43,
      "hi": 60.6,
      "lo": 42.8
    }
  ]
};

/** Campbell, CA — where they live now, quantified like every other town. */
export const SCOUT_CAMPBELL = { ...{
  "stryker": {"site": "San Jose, CA", "mi": 7.9, "hrs": "0:14"},
  "costs": {"utility": "PG&E", "heatFuel": "natural gas", "summerBill": 300.0, "utilities": 329.0, "utilitiesNote": "PG&E; average electric ~$329/mo, winter bill $400-$500+, summer bill $300+", "internet": 35.0, "internetNote": "AT&T Fiber 300 Mbps", "cell": "Excellent and reliable in 95008; potential localized dead zones due to infrastructure density, building materials, and terrain", "carIns2": 493.5, "carInsNote": "Bankrate's True Cost of Auto Insurance Report; SF-Oakland-Fremont metro avg $2,961/yr", "gasPrice": 5.83, "groceries": 769.33, "groceryNote": "MIT Living Wage Calculator for Santa Clara County, 2 adults (0 children) food cost", "groceryBasis": "MIT", "waterTrash": 330.15, "homeIns": 104.83, "extras": "Annual property tax includes special assessments (e.g. $691.80 sewer) and parcel taxes; no HOA fees unless in managed community", "basketTotal": 2411.61, "sources": "pge.com, att.com, rootmetrics.com, bankrate.com, aaa.com, livingwage.mit.edu, sjwater.com, wvsdca.gov, westvalleyrecycles.com, policygenius.com"},
  "id": "scout-campbell",
  "name": "Campbell, CA",
  "county": "Santa Clara County · where you live now",
  "coords": [
    37.2872,
    -121.95
  ],
  "tier": "home",
  "verified": "yes",
  "median": "$1,790,000 sold · $1,617,000 ACS value",
  "comfort": "~$478k to buy the median · renting a 2BR at $3,170",
  "crime": "4.73 / 28.3",
  "snow": "0\"",
  "fiber": "Same-day Amazon · gigabit common",
  "tax": "~1.3% on purchase (Prop 13) · 10.5% sales tax",
  "drive": "2,300 mi · SJC→ORD ~4h in the air",
  "oneLiner": "Where you live now: a walkable Silicon Valley suburb with a Trader Joe's, a Whole Foods and a Home Depot inside a mile, 77% sunshine, no snow, a Level I trauma center down the road — and a median house that sells for $1.79 million, which is the reason this page exists.",
  "scores": {
    "cost": 1,
    "winter": 10,
    "internet": 9,
    "healthcare": 7,
    "errands": 10,
    "culture": 9,
    "nature": 6,
    "safety": 5,
    "mom": 1,
    "yearRound": 10
  },
  "badges": {
    "pro": [
      "Walk Score 93",
      "TJ's · Whole Foods · Home Depot under 1 mi",
      "Same-day Amazon",
      "~3,420 sunshine hours · no snow",
      "No local income tax"
    ],
    "con": [
      "$1.79M median — needs ~$478k income",
      "2BR rent $3,170 (31% of gross)",
      "10.5% sales tax",
      "Good Samaritan: Leapfrog C",
      "Property crime 28/1k",
      "2,300 mi from Mom"
    ]
  },
  "money": {
    "medianPrice": 1790000,
    "effTax": 0.013,
    "cityTax": 0,
    "taxState": "CA",
    "rent2br": 3170,
    "rentActual": 1150,
    "rentActualNote": "renting from family — well under market",
    "rent1br": 3245,
    "acsRent": 2737,
    "priceNote": "Redfin median sold, July 2026"
  },
  "workup": {
    "demographics": [
      [
        "Source",
        "Census ACS 2016–2020 via BigQuery; Santa Clara County in each row for contrast"
      ],
      [
        "Population (2020 ACS)",
        "42,891 · Santa Clara Co 1,924,379"
      ],
      [
        "Median age",
        "38.9 · county 37.2"
      ],
      [
        "Vacant housing",
        "8% of units · county 5%"
      ],
      [
        "Bachelor's or higher, 25–64",
        "57% · county 56%"
      ],
      [
        "Unemployment (ACS)",
        "2% · county 4%"
      ],
      [
        "Median household income",
        "$122,644 · county $130,890"
      ],
      [
        "Works from home",
        "8% of workers · county 9%"
      ],
      [
        "Mix",
        "48% white · 23% Asian · 20% Hispanic · 2% Black"
      ],
      [
        "Median home built",
        "1971"
      ],
      [
        "Median rent (2020 ACS)",
        "$2,224 · 2020–24 ACS $2,737"
      ],
      [
        "Population trend",
        "39,349 (2010) → 43,797 (2020) → ~42,800 (2024–26 est.)"
      ],
      [
        "2024 presidential margin",
        "Santa Clara County: Harris +36.6 (66.8% to 30.2%)"
      ]
    ],
    "errands": [
      [
        "Grocery in town",
        "Trader Joe's (Pruneyard) & Whole Foods (1690 S Bascom), both under 1 mi"
      ],
      [
        "Costco",
        "Almaden, 5301 Almaden Expy, San Jose — ~6 mi"
      ],
      [
        "Target",
        "San Jose Westgate, ~4 mi"
      ],
      [
        "Walmart",
        "Neighborhood Market, Stevens Creek Blvd — ~5 mi"
      ],
      [
        "Home Depot",
        "480 E Hamilton Ave, Campbell — under 1 mi"
      ],
      [
        "Farmers market",
        "Downtown Campbell, Sundays year-round"
      ]
    ],
    "shipping": [
      [
        "Amazon delivery",
        "Same-day available to 95008"
      ],
      [
        "Grocery delivery",
        "Instacart, DoorDash, Amazon Fresh — full coverage"
      ]
    ],
    "healthcare": [
      [
        "Nearest ER",
        "Good Samaritan Hospital, San Jose — ~3 mi"
      ],
      [
        "Safety grade",
        "Leapfrog C (Spring 2026)"
      ],
      [
        "Trauma center",
        "Santa Clara Valley Medical Center — Level I"
      ],
      [
        "Referral center",
        "Stanford Health Care ~15 mi; UCSF ~50 mi"
      ]
    ],
    "economy": [
      [
        "Median household income",
        "$122,644 (ACS 2020) — the couple is below the local median"
      ],
      [
        "MIT living wage, 2 adults working",
        "$23.93/hr each ≈ $99,500 combined"
      ],
      [
        "Cost of living index",
        "198 — 98% above the US average (Payscale, San Jose metro)"
      ],
      [
        "Groceries / utilities / transport",
        "143 / 110–132 / 130–136 vs US 100"
      ],
      [
        "Gas today",
        "~$3.98/gal"
      ]
    ],
    "airport": [
      [
        "Nearest commercial airport",
        "SJC — ~7 mi; nonstops to ORD"
      ],
      [
        "Major hub",
        "SFO — ~40 mi"
      ]
    ],
    "lifestyle": [
      [
        "Walk Score, downtown",
        "93 — Walker's Paradise"
      ],
      [
        "Downtown",
        "100+ shops and restaurants, Pruneyard, Sunday market — year-round"
      ],
      [
        "Nature within 30 min",
        "Los Gatos Creek Trail, Santa Cruz Mountains, Pacific in ~50 min"
      ]
    ],
    "climate": [
      [
        "Annual rainfall",
        "~19″ NOAA normal; 12.0″ averaged 2010–2024 (drought decade)"
      ],
      [
        "July high / January low",
        "78–82°F / 41–44°F"
      ],
      [
        "Sunshine",
        "~77% of possible, ~3,420 hours"
      ],
      [
        "Snow",
        "none, ever"
      ],
      [
        "Climate risk",
        "wildfire-smoke days in late summer, drought cycling and water restrictions, earthquake"
      ]
    ],
    "gotchas": [
      [
        "Buying the median",
        "$358,000 down and ~$9,250/mo P&I at 6.71% — needs ~$478k household income at a 28% front-end ratio"
      ],
      [
        "Renting",
        "1BR $3,245 · 2BR $3,170 asking (Sept 2026); ACS median gross rent $2,737"
      ],
      [
        "Property tax",
        "Prop 13: ~1.25–1.35% of purchase price, then capped growth — the Michigan uncapping trap has a California cousin, just gentler"
      ],
      [
        "Sales tax",
        "10.5% in Campbell vs 6% in Michigan"
      ],
      [
        "Utilities",
        "PG&E $109–300+/mo; water + sewer + garbage $150–370/mo"
      ],
      [
        "The move itself",
        "professional movers $5,700–15,000, container $2,500–7,500, DIY truck $1,500–4,500; shipping one car $850–1,900; no California exit tax for W-2 earners — part-year residency only"
      ]
    ],
    "sources": "Sources: census.gov, redfin.com, realtor.com, zumper.com, rent.com, payscale.com, livingwage.mit.edu, ftb.ca.gov, edd.ca.gov, cdtfa.ca.gov, neighborhoodscout.com, hospitalsafetygrade.org, walkscore.com, weather.gov, move.org"
  }
}, climate: SCOUT_CAMPBELL_CLIMATE };

/** San Francisco through the same NOAA math, so every climate strip has a familiar baseline. */
export const SCOUT_SF_CLIMATE = {
  "station": "San Francisco Downtown",
  "years": "2010–2024",
  "annual": {
    "snow": 0,
    "rain": 21.2,
    "snowDays": 0,
    "snowCover": 0,
    "below0": 0,
    "frost": 0,
    "above90": 2.2,
    "wetDays": 65.7,
    "recordLow": 36,
    "recordHigh": 106,
    "maxSnowDay": 0,
    "snowiest": "none",
    "wettest": "Dec 4.98\"",
    "hottest": "Sep 70.3°",
    "coldest": "Jan 47.9°",
    "snowSeason": "none",
    "coverage": 100
  },
  "months": [
    {
      "m": "Jan",
      "snow": 0,
      "rain": 3.97,
      "hi": 58.8,
      "lo": 47.9
    },
    {
      "m": "Feb",
      "snow": 0,
      "rain": 3.05,
      "hi": 60.8,
      "lo": 48.2
    },
    {
      "m": "Mar",
      "snow": 0,
      "rain": 3.58,
      "hi": 61.5,
      "lo": 49
    },
    {
      "m": "Apr",
      "snow": 0,
      "rain": 1.48,
      "hi": 62.9,
      "lo": 50
    },
    {
      "m": "May",
      "snow": 0,
      "rain": 0.49,
      "hi": 63.6,
      "lo": 51.3
    },
    {
      "m": "Jun",
      "snow": 0,
      "rain": 0.19,
      "hi": 66.5,
      "lo": 53.5
    },
    {
      "m": "Jul",
      "snow": 0,
      "rain": 0.03,
      "hi": 66.1,
      "lo": 54.8
    },
    {
      "m": "Aug",
      "snow": 0,
      "rain": 0.02,
      "hi": 67.6,
      "lo": 56.3
    },
    {
      "m": "Sep",
      "snow": 0,
      "rain": 0.12,
      "hi": 70.3,
      "lo": 56.5
    },
    {
      "m": "Oct",
      "snow": 0,
      "rain": 1.03,
      "hi": 70.1,
      "lo": 55.3
    },
    {
      "m": "Nov",
      "snow": 0,
      "rain": 2.26,
      "hi": 63.5,
      "lo": 51.1
    },
    {
      "m": "Dec",
      "snow": 0,
      "rain": 4.98,
      "hi": 58.1,
      "lo": 47.9
    }
  ]
};

/** Stryker — Gunnar's employer. HQ is in Michigan; coordinates refined by geocoding once the research pass lands. */
export const STRYKER_SITES = [
  // Geocoded by CARTO/TomTom from the street addresses (match confidence 0.86–1.0).
  { id: "stryker-hq", name: "Stryker Corporate HQ", what: "Global headquarters", address: "2825 Airview Blvd, Portage, MI 49002", coords: [42.2428, -85.5552], state: "MI" },
  { id: "stryker-instruments", name: "Stryker Instruments", what: "Instruments division campus", address: "4100 E Milham Ave, Portage, MI 49001", coords: [42.2279, -85.5384], state: "MI" },
  { id: "stryker-medical", name: "Stryker Medical", what: "Medical division (beds, stretchers)", address: "3800 E Centre Ave, Portage, MI 49002", coords: [42.1973, -85.5431], state: "MI" },
  { id: "stryker-cary", name: "Stryker Sage", what: "Sage Products, Cary IL", address: "3909 Three Oaks Rd, Cary, IL 60013", coords: [42.2174, -88.2744], state: "IL" },
  { id: "stryker-fremont", name: "Stryker Endoscopy, Fremont", what: "Bay Area site", address: "47900 Bayside Pkwy, Fremont, CA 94538", coords: [37.4732, -121.9331], state: "CA" },
  { id: "stryker-san-jose", name: "Stryker Endoscopy, San Jose", what: "Bay Area site, 8 mi from home", address: "5900 Optical Ct, San Jose, CA 95138", coords: [37.2551, -121.7835], state: "CA" },
];

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
    stryker: {"site": "Portage, MI (HQ)", "mi": 50.5, "hrs": "0:57"},
    costs: {"utility": "Consumers Energy", "heatFuel": "natural gas", "winterHeat": 200.0, "summerBill": 25.0, "utilities": 263.27, "utilitiesNote": "Consumers Energy; electric $150.77, winter gas $200, summer $25", "internet": 40.0, "internetNote": "Xfinity 300 Mbps", "cell": "RootMetrics ranks Grand Rapids highly for speed and reliability, but local users report dead-zones on West Side, Ada, and Lowell", "carIns2": 238.17, "carInsNote": "MonitorBankRates avg $1,429/yr per car ($2,858/yr for 2 cars)", "gasPrice": 4.03, "groceries": 656.92, "groceryNote": "MIT Living Wage Calculator $7,883/yr for 2 adults", "groceryBasis": "MIT", "waterTrash": 110.0, "homeIns": 209.92, "extras": "City Special Assessments on summer tax bills; HOA fees $50-$150/mo in some subdivisions", "basketTotal": 1847.58, "sources": "eia.gov, bridgemi.com, xfinity.com, rootmetrics.com, monitorbankrates.com, aaa.com, mit.edu, grandrapidsmi.gov, insure.com"},
    money: {"medianPrice": 310000, "effTax": 0.0166, "cityTax": 0.015, "taxState": "MI", "countyPrice": 289900},
    oneLiner:
      "A real mid-size city — 80 breweries, a Level I trauma center downtown, same-day Amazon — that happens to be three and a half hours from your mom. Buy the neighborhood, not the city.",
    scores: {
      "cost": 8,
      "winter": 6,
      "internet": 8,
      "healthcare": 10,
      "errands": 10,
      "culture": 10,
      "nature": 6,
      "safety": 3,
      "mom": 10,
      "yearRound": 10
    },
    badges: {
      "pro": [
        "Level I trauma downtown",
        "Same-day Amazon",
        "80 breweries · Walk Score 92",
        "3:31 to Palatine"
      ],
      "con": [
        "~9 violent/1k citywide",
        "23,000 lead service lines",
        "1.5% city income tax"
      ]
    },
    median: "$310,000 sold · $244,500 ACS value",
    comfort: "$106k in town · $102k in county",
    crime: "9.0 / 24.4–24.8",
    snow: '77.6"',
    fiber: "30% fiber · 99% cable",
    tax: "33.12 mills (1.66%) + 1.5% city income tax",
    drive: "≈208 mi · 3:31",
    workup: {
      "errands": [
        [
          "Grocery in town",
          "Bridge Street Market, 405 Seward Ave NW (1 mi); Gordon Food (1 mi); Meijer, 1540 28th St SE (4 mi)"
        ],
        [
          "Costco",
          "Costco, 5100 28th St SE, 6 miles"
        ],
        [
          "Target",
          "Target, 5120 28th St SE, 7 miles"
        ],
        [
          "Walmart",
          "Walmart, 5859 28th St SE, 8 miles"
        ],
        [
          "Aldi",
          "Aldi, 2120 28th St SE, 6 miles"
        ],
        [
          "Trader Joe's / Whole Foods",
          "Trader Joe's (3684 28th St SE, 6 mi), Whole Foods (2897 Radcliff Ave SE, 7 mi)"
        ],
        [
          "Pharmacy",
          "Walgreens at 555 Michigan St NE, 1 mile"
        ],
        [
          "Home Depot/Lowe's/Menards",
          "Home Depot (4646 28th St SE, 6 mi), Lowe's (4297 Plainfield Ave NE, 5 mi), Menards (4151 Alpine Ave NW, 5 mi)"
        ],
        [
          "Farmers market",
          "Fulton Street Farmers Market, 1145 Fulton St E, 1 mile (Season: Main May-Oct, Second Nov-Apr)"
        ]
      ],
      "shipping": [
        [
          "Amazon delivery",
          "Same-day available (free for Prime over $25), next-day available to 49503"
        ],
        [
          "Nearest Amazon station",
          "DGR6 at 3951 Trade Dr SE, 6 miles"
        ],
        [
          "Amazon fulfillment center",
          "GRR1/VEA8 at 4500 68th St SE, 17 miles"
        ],
        [
          "UPS / FedEx",
          "FedEx Office at 233 Fulton St W (0 mi); nearest UPS Store is 5557 28th St SE (none in 49503)"
        ],
        [
          "Grocery delivery",
          "Instacart / DoorDash: Full coverage in 49503"
        ]
      ],
      "healthcare": [
        [
          "Nearest ER",
          "Corewell Health Butterworth, 100 Michigan St NE, 0 miles"
        ],
        [
          "Safety grade",
          "Leapfrog safety grade: A"
        ],
        [
          "CMS star rating",
          "NOT FOUND"
        ],
        [
          "Trauma center",
          "Corewell Health Butterworth (Level I), 0 miles"
        ],
        [
          "Urgent care",
          "4 clinics (Corewell, Trinity, RightCare, WellCare have locations)"
        ],
        [
          "New-patient access",
          "Yes, Trinity Health and others accepting (wait time: 3 to 4 weeks)"
        ],
        [
          "Referral center",
          "Corewell Health Butterworth, 0 miles"
        ]
      ],
      "schools": [
        [
          "Public school district",
          "Grand Rapids Public Schools"
        ],
        [
          "GreatSchools rating",
          "NOT FOUND"
        ],
        [
          "GreatSchools rating scope",
          "Rated per school, not district level"
        ],
        [
          "Graduation rate",
          "83.22% (Class of 2025)"
        ]
      ],
      "economy": [
        [
          "5 largest employers",
          "Corewell Health, Meijer, Gordon Food Service, Steelcase, Pine Rest Christian"
        ],
        [
          "Employer headcounts",
          "NOT FOUND"
        ],
        [
          "County unemployment rate",
          "4.3% (July 2026)"
        ],
        [
          "Coworking space",
          "Yes, The Factory, Worklab, Regus"
        ],
        [
          "Seasonal economy",
          "No (stable year-round economy)"
        ]
      ],
      "airport": [
        [
          "Nearest commercial airport",
          "Gerald R. Ford International Airport (GRR), 13 miles, 20 minutes drive time"
        ],
        [
          "Nonstop destinations",
          "30"
        ],
        [
          "Airlines",
          "Allegiant, American, Delta, Frontier, Southwest, United"
        ],
        [
          "Nearest major hub airport",
          "Detroit (DTW), 150 minutes drive time"
        ]
      ],
      "lifestyle": [
        [
          "Walk Score downtown",
          "92"
        ],
        [
          "Bike Score downtown",
          "45.63"
        ],
        [
          "Sit-down restaurants",
          "1,200"
        ],
        [
          "Count of breweries",
          "80"
        ],
        [
          "Real downtown year-round",
          "Yes"
        ],
        [
          "Outdoor recreation (30 min)",
          "Millennium Park, Fred Meijer White Pine Trail, Action Wake Park, Cannonsburg Ski Area"
        ],
        [
          "Arts/music venues",
          "Acrisure Amphitheater, Van Andel Arena, DeVos Performance Hall, The Intersection"
        ],
        [
          "Dog-friendliness",
          "Highly friendly; Dog parks: Hillcrest, Wahlfield; Beaches: Kirk Park, Norman F. Kruse Park"
        ]
      ],
      "climate": [
        [
          "July average high",
          "82"
        ],
        [
          "January average low",
          "19"
        ],
        [
          "Annual hours of sunshine",
          "2,335 hours"
        ],
        [
          "Annual rainfall",
          "39 inches"
        ],
        [
          "First frost",
          "September 19"
        ],
        [
          "Last frost",
          "May 4"
        ],
        [
          "Lake-effect snowfall/fog",
          "Heavy lake-effect snowfall, 72 to 78 inches annually"
        ]
      ],
      "demographics": [
        [
          "Source",
          "Census ACS 2016–2020 via BigQuery; county in each row for contrast"
        ],
        [
          "Population (2020 ACS)",
          "199,417 · Kent Co 652,617"
        ],
        [
          "Median age",
          "31.2 · county 35.4"
        ],
        [
          "Vacant / seasonal housing",
          "6% of units · county 5%"
        ],
        [
          "Bachelor's or higher, 25–64",
          "39% · county 39%"
        ],
        [
          "Unemployment (ACS)",
          "6% · county 5%"
        ],
        [
          "Median household income",
          "$51,333 · county $65,722"
        ],
        [
          "Works from home",
          "6% of workers · county 6%"
        ],
        [
          "Mix",
          "58% white · 18% Black · 16% Hispanic · 3% Asian"
        ],
        [
          "Median home built",
          "1953"
        ],
        [
          "Median rent (2020)",
          "$813"
        ],
        [
          "Population trend",
          "Growing (188,000 to 201,000)"
        ],
        [
          "2024 presidential margin",
          "5.35% margin (Harris)"
        ]
      ],
      "gotchas": [
        [
          "Water vs well/septic",
          "Downtown/suburbs use municipal; rural use well/septic (30% in MI)"
        ],
        [
          "Short-term rental rules",
          "Strict, primary residence only, 1 room max, 200 license cap"
        ],
        [
          "HOA prevalence",
          "High"
        ],
        [
          "Flood zone/erosion",
          "Flood risk near Grand River; soil erosion regulated within 500 feet of water"
        ],
        [
          "Surprises",
          "Title companies handle closings (no attorneys); commute math (45 mins crosses counties); Dutch/Reformed influence"
        ]
      ],
      "sources": "Sources: en.wikipedia.org, google.com, experiencegr.com, waze.com, maptons.com, corewellhealth.org, healthline.com, weatherspark.com"
    },
    climate: {
      "station": "Grand Rapids Airport",
      "stationMi": 7.9,
      "years": "2010–2024",
      "snowStation": "Grand Rapids",
      "snowStationMi": 7.9,
      "annual": {
        "snow": 70.9,
        "rain": 40.2,
        "snowDays": 19.8,
        "snowCover": 60.6,
        "below0": 2.8,
        "frost": 126.1,
        "above90": 7.9,
        "wetDays": 150.8,
        "recordLow": -13,
        "recordHigh": 104,
        "maxSnowDay": 11.1,
        "snowiest": "Jan 20.7\"",
        "wettest": "Oct 4.94\"",
        "hottest": "Jul 83.9°",
        "coldest": "Feb 19.4°",
        "snowSeason": "Jan–Dec",
        "coverage": 100
      },
      "months": [
        {
          "m": "Jan",
          "snow": 20.7,
          "rain": 2.6,
          "hi": 31.5,
          "lo": 19.8
        },
        {
          "m": "Feb",
          "snow": 19.8,
          "rain": 2.58,
          "hi": 34.1,
          "lo": 19.4
        },
        {
          "m": "Mar",
          "snow": 6,
          "rain": 2.73,
          "hi": 45.8,
          "lo": 27.8
        },
        {
          "m": "Apr",
          "snow": 1.9,
          "rain": 4.4,
          "hi": 57.5,
          "lo": 37.2
        },
        {
          "m": "May",
          "snow": 0,
          "rain": 3.45,
          "hi": 71,
          "lo": 49.6
        },
        {
          "m": "Jun",
          "snow": 0,
          "rain": 3.96,
          "hi": 79.9,
          "lo": 58.7
        },
        {
          "m": "Jul",
          "snow": 0,
          "rain": 4.03,
          "hi": 83.9,
          "lo": 63.4
        },
        {
          "m": "Aug",
          "snow": 0,
          "rain": 3.58,
          "hi": 81.6,
          "lo": 61.5
        },
        {
          "m": "Sep",
          "snow": 0,
          "rain": 2.68,
          "hi": 74.8,
          "lo": 54.3
        },
        {
          "m": "Oct",
          "snow": 0.1,
          "rain": 4.94,
          "hi": 61.8,
          "lo": 43
        },
        {
          "m": "Nov",
          "snow": 7.4,
          "rain": 2.65,
          "hi": 47.9,
          "lo": 32.7
        },
        {
          "m": "Dec",
          "snow": 15,
          "rain": 2.57,
          "hi": 37.6,
          "lo": 26.4
        }
      ]
    },
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
    stryker: {"site": "Portage, MI (HQ)", "mi": 116.6, "hrs": "2:11"},
    costs: {"utility": "DTE Energy", "heatFuel": "natural gas", "winterHeat": 200.0, "summerBill": 30.0, "utilities": 265.0, "utilitiesNote": "DTE Energy; electric $165/mo, winter gas $200/mo, summer gas $30/mo", "internet": 35.0, "internetNote": "AT&T Fiber 300 Mbps", "cell": "Verizon coverage is generally reliable in the area, though indoor dead zones can occur depending on building materials.", "carIns2": 616.0, "carInsNote": "Bankrate Detroit-Warren-Dearborn MSA avg $3,696/yr per car ($616/mo for 2 cars)", "gasPrice": 3.45, "groceries": 639.0, "groceryNote": "MIT Living Wage Calculator for Wayne County; $7,669/yr for 2 adults", "groceryBasis": "MIT", "waterTrash": 65.0, "homeIns": 192.0, "extras": "Residents may be subject to municipal special assessments for infrastructure (roads, drains) levied by the City of Belleville, and HOA fees depending on the specific subdivision.", "basketTotal": 2019.0, "sources": "dteenergy.com, energysage.com, att.com, verizon.com, bankrate.com, gasprices.aaa.com, livingwage.mit.edu, belleville.mi.us"},
    money: {"medianPrice": 194800, "effTax": 0.0189, "cityTax": 0, "taxState": "MI", "priceNote": "county median — the city figures conflict", "countyPrice": 194800},
    oneLiner:
      "A small lake town twenty minutes from DTW and Ann Arbor's hospitals, cheap by any coastal standard — with numbers too thin to trust until you have stood in it.",
    scores: {
      "cost": 8,
      "winter": 8,
      "internet": 6,
      "healthcare": 8,
      "errands": 8,
      "culture": 4,
      "nature": 5,
      "safety": 8,
      "mom": 8,
      "yearRound": 8
    },
    badges: {
      "pro": [
        "DTW 20 min",
        "Costco 15 mi (Ann Arbor)",
        "45″ snow",
        "4:34 to Palatine"
      ],
      "con": [
        "Data conflicts — verify in person",
        "Few amenities in town"
      ]
    },
    median: "$148,300 ACS value · sold data conflicts",
    comfort: "data conflict — see note",
    crime: "3.10 / 10.1–10.3",
    snow: '45"',
    fiber: "7% fiber · 97% cable",
    tax: "37.88 mills (1.89%)",
    drive: "≈287 mi · 4:34",
    workup: {
      "errands": [
        [
          "Grocery in town",
          "Meijer (9701 Belleville Rd, ~2 mi), Walmart (~3 mi), The Butcher Shop (510 Main St, 0 mi)"
        ],
        [
          "Costco / Sam's Club",
          "Costco: Ann Arbor (~15-18 mi, Depot not retail); Sam's Club: Canton (~9 mi)"
        ],
        [
          "Target",
          "47330 Michigan Ave, Canton, MI, ~8 miles"
        ],
        [
          "Walmart",
          "Walmart Supercenter, 10562 Belleville Rd, ~3 miles"
        ],
        [
          "Aldi",
          "10017 Belleville Rd, Belleville, ~2.5 miles"
        ],
        [
          "Trader Joe's / Whole Foods",
          "Whole Foods (Ann Arbor, ~15 mi); Trader Joe's (Ann Arbor, ~18 mi)"
        ],
        [
          "Pharmacy",
          "CVS (10915 Belleville Rd), Walgreens (10276 Belleville Rd), Meijer Pharmacy"
        ],
        [
          "Home improvement",
          "Menards (Belleville, ~2.5 mi), Home Depot (Canton, ~7 mi), Lowe's (Canton, ~9 mi)"
        ],
        [
          "Farmers market",
          "Belleville Farmers Market (4th St Place & Sq); Jun-Oct, Mon 4-7:30 PM"
        ]
      ],
      "shipping": [
        [
          "Amazon delivery",
          "Same-day or next-day delivery on eligible items for Prime members"
        ],
        [
          "Nearest Amazon station",
          "Romulus DTW1 (32801 Ecorse Rd, ~7-9 mi); Canton Delivery Station (49000 Michigan Ave, ~8 mi)"
        ],
        [
          "UPS / FedEx",
          "The UPS Store (11740 Belleville Rd); FedEx Authorized ShipCenter (847 Sumpter Rd)"
        ],
        [
          "Grocery delivery",
          "Instacart and DoorDash both cover Belleville 48111"
        ]
      ],
      "healthcare": [
        [
          "Nearest ER",
          "Corewell Health Wayne Hospital (Wayne, MI, ~7.8 miles); CMS star rating: 1/5 stars"
        ],
        [
          "Safety grade",
          "NOT FOUND"
        ],
        [
          "Trauma center",
          "Trinity Health Ann Arbor Hospital (Level I, Ypsilanti, ~13-15 miles)"
        ],
        [
          "Urgent care",
          "4 clinics in town"
        ],
        [
          "New-patient access",
          "Corewell Health Family Medicine (same/next-day appts); WellHealth Medical Belleville"
        ],
        [
          "Referral center",
          "Trinity Health Ann Arbor (~13-15 miles) or Corewell Health Dearborn (~15-20 miles)"
        ]
      ],
      "schools": [
        [
          "District name",
          "Van Buren Public Schools"
        ],
        [
          "Niche district rating",
          "B"
        ],
        [
          "GreatSchools rating",
          "Belleville High School: 5/10; District rating: NOT FOUND"
        ],
        [
          "High school graduation rate",
          "82.6% for Belleville High School"
        ]
      ],
      "economy": [
        [
          "Largest employers",
          "NOT FOUND"
        ],
        [
          "County unemployment rate",
          "7.30% (Wayne County, July 2026)"
        ],
        [
          "Coworking space in town",
          "NOT FOUND in 48111; nearest in Ypsilanti and Ann Arbor"
        ],
        [
          "Seasonality",
          "Year-round; driven by manufacturing and retail, not seasonal tourism"
        ]
      ],
      "airport": [
        [
          "Nearest commercial airport",
          "Detroit Metropolitan Wayne County Airport (DTW), ~12 miles / 10-15 min drive"
        ],
        [
          "Major hub status",
          "DTW is a major hub (Delta), 10-15 min drive"
        ],
        [
          "Nonstop destinations",
          "120-140 nonstop destinations"
        ],
        [
          "Airlines serving DTW",
          "17 airlines"
        ]
      ],
      "lifestyle": [
        [
          "Walk Score / Bike Score",
          "Walk Score 40/100, Bike Score 29/100 for downtown"
        ],
        [
          "Restaurants & breweries",
          "~4 sit-down restaurants and 1 brewery downtown"
        ],
        [
          "Downtown character",
          "Year-round downtown"
        ],
        [
          "Outdoor recreation",
          "Belleville Lake (water sports), Lower Huron Metropark, Mt. Brighton (skiing, within 30 min)"
        ],
        [
          "Arts & music venues",
          "Diamondback Music Hall, Horizon Park summer events"
        ],
        [
          "Dog friendliness",
          "Leashed dogs at Lower Huron Metropark; off-leash parks/beaches NOT FOUND in city limits"
        ]
      ],
      "climate": [
        [
          "July average high",
          "84°F (1991-2020 normal)"
        ],
        [
          "January average low",
          "18°F (1991-2020 normal)"
        ],
        [
          "Annual sunshine",
          "NOAA/NWS days NOT FOUND; ~2,389 hours annually via secondary source"
        ],
        [
          "Annual rainfall",
          "32.7 inches (1991-2020 normal)"
        ],
        [
          "Frost dates",
          "Average last spring frost ~April 24; average first fall frost ~October 20"
        ],
        [
          "Lake-effect snow",
          "Generally less susceptible to heavy localized lake-effect snow bands hitting western MI"
        ]
      ],
      "demographics": [
        [
          "Source",
          "Census ACS 2016–2020 via BigQuery; county in each row for contrast"
        ],
        [
          "Population (2020 ACS)",
          "3,879 · Wayne Co 1,753,059"
        ],
        [
          "Median age",
          "41.7 · county 37.9"
        ],
        [
          "Vacant / seasonal housing",
          "11% of units · county 15%"
        ],
        [
          "Bachelor's or higher, 25–64",
          "36% · county 26%"
        ],
        [
          "Unemployment (ACS)",
          "8% · county 9%"
        ],
        [
          "Median household income",
          "$52,810 · county $49,359"
        ],
        [
          "Works from home",
          "10% of workers · county 5%"
        ],
        [
          "Mix",
          "76% white · 13% Black · 6% Hispanic"
        ],
        [
          "Median home built",
          "1978"
        ],
        [
          "Median rent (2020)",
          "$765"
        ],
        [
          "Population trend",
          "Growing slightly (~0.8% increase for city 2010-2020)"
        ],
        [
          "2024 presidential margin",
          "Exact final margin NOT FOUND; Donald Trump margin improved by 9.2 percentage points vs 2020"
        ]
      ],
      "gotchas": [
        [
          "Water & sewer",
          "City/subdivisions have municipal water/sewer; private wells and septic prevalent in rural areas"
        ],
        [
          "Short-term rentals",
          "Regulated heavily at the local level by zoning ordinances"
        ],
        [
          "HOA prevalence",
          "Very common; township officially operates an HOA Committee"
        ],
        [
          "Flood zones & erosion",
          "Parts in FEMA flood zones near Belleville Lake; heavy rain prompts localized flooding"
        ],
        [
          "Newcomer surprises",
          "Train noise (nighttime horns) and landfill odors (rotten egg smells from Wayne Disposal Inc.)"
        ]
      ],
      "sources": "Sources: weather.gov, vbtmi.gov, metroairport.com, metroparks.com, waynecounty.com, meijer.com, walmart.com, cms.gov"
    },
    climate: {
      "station": "Detroit Metro Airport",
      "stationMi": 8.1,
      "years": "2010–2024",
      "snowStation": "Detroit Metro Ap",
      "snowStationMi": 8.1,
      "annual": {
        "snow": 45.9,
        "rain": 35.9,
        "snowDays": 12.6,
        "snowCover": 45.8,
        "below0": 3.0,
        "frost": 114.8,
        "above90": 10.2,
        "wetDays": 137.8,
        "recordLow": -14,
        "recordHigh": 102,
        "maxSnowDay": 13.7,
        "snowiest": "Feb 16.4\"",
        "wettest": "Aug 3.92\"",
        "hottest": "Jul 84.9°",
        "coldest": "Jan 20°",
        "snowSeason": "Jan–Dec",
        "coverage": 100
      },
      "months": [
        {
          "m": "Jan",
          "snow": 13.1,
          "rain": 2.3,
          "hi": 32.9,
          "lo": 20
        },
        {
          "m": "Feb",
          "snow": 16.4,
          "rain": 2.22,
          "hi": 36.1,
          "lo": 20.8
        },
        {
          "m": "Mar",
          "snow": 4.8,
          "rain": 2.62,
          "hi": 47.6,
          "lo": 29.8
        },
        {
          "m": "Apr",
          "snow": 1.4,
          "rain": 3.32,
          "hi": 59,
          "lo": 39.1
        },
        {
          "m": "May",
          "snow": 0,
          "rain": 3.67,
          "hi": 72.2,
          "lo": 51.7
        },
        {
          "m": "Jun",
          "snow": 0,
          "rain": 3.32,
          "hi": 80.6,
          "lo": 60.7
        },
        {
          "m": "Jul",
          "snow": 0,
          "rain": 3.72,
          "hi": 84.9,
          "lo": 65.7
        },
        {
          "m": "Aug",
          "snow": 0,
          "rain": 3.92,
          "hi": 82.8,
          "lo": 63.9
        },
        {
          "m": "Sep",
          "snow": 0,
          "rain": 3.35,
          "hi": 75.6,
          "lo": 57
        },
        {
          "m": "Oct",
          "snow": 0,
          "rain": 2.63,
          "hi": 63.4,
          "lo": 45.5
        },
        {
          "m": "Nov",
          "snow": 3.1,
          "rain": 2.46,
          "hi": 49.6,
          "lo": 33.7
        },
        {
          "m": "Dec",
          "snow": 7.1,
          "rain": 2.33,
          "hi": 39.3,
          "lo": 27.5
        }
      ]
    },
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
    stryker: {"site": "Portage, MI (HQ)", "mi": 153.3, "hrs": "2:53"},
    costs: {"utility": "Consumers Energy", "heatFuel": "natural gas", "winterHeat": 140.0, "summerBill": 25.0, "utilities": 201.81, "utilitiesNote": "Consumers Energy; winter gas $140, summer $25", "internet": 84.99, "internetNote": "Spectrum 300 Mbps", "cell": "Verizon offers strong and reliable coverage throughout Frankenmuth with no major known dead zones.", "carIns2": 521.83, "carInsNote": "Bankrate MI avg $3,131/yr per car", "gasPrice": 3.96, "groceries": 603.33, "groceryNote": "MIT Living Wage Calculator for Saginaw County ($7,240/yr for 2 adults)", "groceryBasis": "MIT", "waterTrash": 80.0, "homeIns": 187.17, "extras": "Municipal special assessments for police and fire added to winter property tax bill; HOAs standard for condos but uncommon for single-family homes.", "basketTotal": 1916.73, "sources": "eia.gov, consumersenergy.com, spectrum.com, verizon.com, bankrate.com, gasprices.aaa.com, livingwage.mit.edu, frankenmuthcity.com, valuepenguin.com"},
    money: {"medianPrice": 323000, "effTax": 0.0201, "cityTax": 0, "taxState": "MI", "countyPrice": 152800},
    oneLiner:
      "A prosperous, tidy, tight-knit Bavarian town — top-decile schools, 44 inches of snow, Costco half an hour away — that fills with tourists on weekends and empties politely on Sunday night.",
    scores: {
      "cost": 8,
      "winter": 9,
      "internet": 5,
      "healthcare": 6,
      "errands": 5,
      "culture": 5,
      "nature": 3,
      "safety": 8,
      "mom": 7,
      "yearRound": 7
    },
    badges: {
      "pro": [
        "Schools: Niche A · 95% grad",
        "44″ snow",
        "No local income tax",
        "$82k comfortable in county"
      ],
      "con": [
        "Nearest ER 12 mi (Saginaw)",
        "Trader Joe's 85 mi",
        "Tourist weekends"
      ]
    },
    median: "$323,000 sold · $300,500 ACS value",
    comfort: "$110k in town · $82k in county",
    crime: "2.3–2.9 / 6.5–7.4",
    snow: '44"',
    fiber: "10% fiber · 76% cable",
    tax: "40.28 mills (2.01%, incl. 5-mill assessment)",
    drive: "≈330 mi · 4:55",
    workup: {
      "errands": [
        [
          "Grocery in town",
          "Kroger, 435 N Main St (0-2 miles)"
        ],
        [
          "Costco",
          "6200 LaFontaine Way, Flint, MI (approx 25-30 miles)"
        ],
        [
          "Target",
          "2772 Tittabawassee Rd, Saginaw, MI (15-20 miles)"
        ],
        [
          "Walmart",
          "Walmart Supercenter, 11493 N Linden Rd, Clio, MI (11 miles)"
        ],
        [
          "Aldi",
          "5275 Bay Rd, Saginaw, MI (15-20 miles)"
        ],
        [
          "Trader Joe's / Whole Foods",
          "Trader Joe's & Whole Foods, 2918/3044 Walton Blvd, Rochester Hills, MI (approx 85 miles)"
        ],
        [
          "Pharmacy",
          "CVS (111 N Main), Kroger (435 N Main), Frankenmuth Family Pharmacy (154 S Main) in town"
        ],
        [
          "Home Depot",
          "3132 Bueker Dr N, Saginaw, MI (14-15 miles)"
        ],
        [
          "Farmers market",
          "Frankenmuth Farmers Market, 534 N Main St (Saturdays Jun-mid Oct)"
        ]
      ],
      "shipping": [
        [
          "Amazon delivery",
          "Standard 1-2 day Prime delivery; same-day/next-day highly restricted"
        ],
        [
          "Nearest Amazon station",
          "3280 Commerce Centre Dr, Saginaw, MI (14-15 miles)"
        ],
        [
          "UPS Store",
          "481 N Main St, in town"
        ],
        [
          "FedEx",
          "Authorized ShipCenter at Computer Country (146 S Main St, Ste 5); full-service Flint/Saginaw"
        ],
        [
          "Grocery delivery",
          "Instacart, DoorDash, and UberEats available for grocery and restaurant delivery"
        ]
      ],
      "healthcare": [
        [
          "Nearest ER",
          "MyMichigan Medical Center Saginaw (Ascension St. Mary's), 800 S Washington Ave, Saginaw (12-13 mi)"
        ],
        [
          "Safety grade",
          "MyMichigan Medical Center: Grade A (Leapfrog Fall 2025); Covenant Medical Center: 2-star CMS (2024/2026)"
        ],
        [
          "Trauma center",
          "Covenant HealthCare Level II (15-20 mi); Hurley Medical Center Flint Level I (25-30 mi)"
        ],
        [
          "Urgent care",
          "Covenant MedExpress, 600 N Main St, in town"
        ],
        [
          "New-patient access",
          "Yes; Frankenmuth Medical Associates and Covenant Medical Group (Ste 220-B) list open panels"
        ],
        [
          "Referral center",
          "University of Michigan Hospital, Ann Arbor (78 miles, ~1h 20m drive)"
        ]
      ],
      "schools": [
        [
          "Public school district",
          "Frankenmuth School District"
        ],
        [
          "District rating",
          "Overall A grade on Niche (2024-2026 data)"
        ],
        [
          "High school rating",
          "Frankenmuth High School: 8/10 on GreatSchools (2024-2026 data)"
        ],
        [
          "Graduation rate",
          "Consistently 95% or greater (top 10% in Michigan)"
        ]
      ],
      "economy": [
        [
          "Largest employers",
          "Bavarian Inn (~1,000), Frankenmuth Insurance (750-889), Bronner's (150-750), Zehnder's, Star of the West"
        ],
        [
          "Unemployment rate",
          "5.9% (Saginaw County preliminary, July 2026 BLS)"
        ],
        [
          "Coworking",
          "None dedicated in town (library rooms/R1SE limited space); nearest full coworking CMURC in Saginaw"
        ],
        [
          "Seasonal economy",
          "Highly seasonal around Christmas, Oktoberfest, and summer festivals; waterparks add stability"
        ]
      ],
      "airport": [
        [
          "Nearest commercial airport",
          "MBS International Airport (MBS), Freeland, MI (30 miles, 25-30 min drive)"
        ],
        [
          "Non-stop destinations",
          "2 non-stop destinations via Delta (to DTW) and United (to ORD)"
        ],
        [
          "Nearest major hub",
          "Detroit Metropolitan Wayne County Airport (DTW) (90-100 miles, 1h 45m to 2h drive)"
        ],
        [
          "Airlines",
          "Delta and United at MBS"
        ]
      ],
      "lifestyle": [
        [
          "Walk score",
          "Downtown scores around 67 (somewhat walkable); no universal score"
        ],
        [
          "Dining and beverage count",
          "~26 restaurants, 1 brewery (Frankenmuth Brewery), winery tasting rooms, 1 distillery"
        ],
        [
          "Downtown vibe",
          "Year-round Bavarian-themed downtown catering to tourists, fully open through winter"
        ],
        [
          "Outdoor recreation",
          "Memorial Park (sledding/skiing); Saginaw Valley Rail Trail within 30 min; downhill ski further north/west"
        ],
        [
          "Arts and music",
          "Bronner Performing Arts Center, Fischer Hall, Harvey Kern Pavilion, Fischer Platz / Lorelei Lounge"
        ],
        [
          "Dog friendliness",
          "Pet-friendly downtown; Hund Platz off-leash park in Memorial Park; no off-leash beaches nearby"
        ]
      ],
      "climate": [
        [
          "July average high",
          "81°F to 83°F"
        ],
        [
          "January average low",
          "15°F to 18°F"
        ],
        [
          "Sunshine",
          "Approx 2,361 hours of sunshine per year"
        ],
        [
          "Annual rainfall",
          "Approx 34 inches"
        ],
        [
          "Frost dates",
          "Average last spring frost: May 6; average first fall frost: October 11"
        ],
        [
          "Lake effect and fog",
          "Shielded from primary lake-effect snow belts; standard humidity fog, no lake fog banks"
        ]
      ],
      "demographics": [
        [
          "Source",
          "Census ACS 2016–2020 via BigQuery; county in each row for contrast"
        ],
        [
          "Population (2020 ACS)",
          "5,396 · Saginaw Co 191,166"
        ],
        [
          "Median age",
          "46.0 · county 41.0"
        ],
        [
          "Vacant / seasonal housing",
          "6% of units · county 10%"
        ],
        [
          "Bachelor's or higher, 25–64",
          "59% · county 24%"
        ],
        [
          "Unemployment (ACS)",
          "3% · county 7%"
        ],
        [
          "Median household income",
          "$76,115 · county $49,565"
        ],
        [
          "Works from home",
          "7% of workers · county 4%"
        ],
        [
          "Mix",
          "89% white · 7% Hispanic · 4% Black"
        ],
        [
          "Median home built",
          "1975"
        ],
        [
          "Median rent (2020)",
          "$611"
        ],
        [
          "Population trend",
          "Modest growth of ~5% since 2010 (4,976 in 2010 to estimated 5,232 in 2026)"
        ],
        [
          "Political lean",
          "2024 Election: Saginaw County voted Donald J. Trump by margin of 3.26% (3,397 votes)"
        ]
      ],
      "gotchas": [
        [
          "Water vs septic",
          "Municipal water/sewer (Water Resource Recovery Facility); private wells/septic extremely rare in city"
        ],
        [
          "Short-term rentals",
          "Strict Planning Commission permit, strict zoning limits, and 300-foot distance rule"
        ],
        [
          "HOAs",
          "Exist especially for condos; private contracts unenforced by city, verify via title search"
        ],
        [
          "Flood and erosion",
          "Cass River historic flood risk; downtown protected by levee system; stone vanes control bank erosion"
        ],
        [
          "Newcomer surprises",
          "Quiet small town with large tourist influxes; safe and clean, but traditional and tight-knit"
        ]
      ],
      "sources": "Sources: leapfroggroup.org, cms.gov, niche.com, greatschools.org, bls.gov, census.gov, walkscore.com, frankenmuth.org"
    },
    climate: {
      "station": "Frankenmuth 1SE",
      "stationMi": 1.4,
      "years": "2010–2024",
      "snowStation": "Saginaw #3",
      "snowStationMi": 12.3,
      "annual": {
        "snow": 31.7,
        "rain": 27.9,
        "snowDays": 8.8,
        "snowCover": 38.4,
        "below0": 7.1,
        "frost": 104.1,
        "above90": 1.9,
        "wetDays": 91.0,
        "recordLow": -23,
        "recordHigh": 97,
        "maxSnowDay": 10.2,
        "snowiest": "Feb 11.5\"",
        "wettest": "Aug 3.34\"",
        "hottest": "Jul 82°",
        "coldest": "Feb 15.7°",
        "snowSeason": "Jan–Dec",
        "coverage": 65
      },
      "months": [
        {
          "m": "Jan",
          "snow": 8.5,
          "rain": 1.77,
          "hi": 29.1,
          "lo": 16
        },
        {
          "m": "Feb",
          "snow": 11.5,
          "rain": 1.59,
          "hi": 32.1,
          "lo": 15.7
        },
        {
          "m": "Mar",
          "snow": 4.5,
          "rain": 1.65,
          "hi": 43.8,
          "lo": 24.5
        },
        {
          "m": "Apr",
          "snow": 0.3,
          "rain": 3.19,
          "hi": 57.1,
          "lo": 35.1
        },
        {
          "m": "May",
          "snow": 0,
          "rain": 2.7,
          "hi": 68.9,
          "lo": 46.8
        },
        {
          "m": "Jun",
          "snow": 0,
          "rain": 2.77,
          "hi": 77.7,
          "lo": 55.7
        },
        {
          "m": "Jul",
          "snow": 0,
          "rain": 2.69,
          "hi": 82,
          "lo": 60
        },
        {
          "m": "Aug",
          "snow": 0,
          "rain": 3.34,
          "hi": 79.8,
          "lo": 58.8
        },
        {
          "m": "Sep",
          "snow": 0,
          "rain": 2.15,
          "hi": 73.4,
          "lo": 51.2
        },
        {
          "m": "Oct",
          "snow": 0,
          "rain": 2.77,
          "hi": 60.2,
          "lo": 40.8
        },
        {
          "m": "Nov",
          "snow": 1.8,
          "rain": 1.81,
          "hi": 47.3,
          "lo": 30.8
        },
        {
          "m": "Dec",
          "snow": 5.1,
          "rain": 1.47,
          "hi": 36.4,
          "lo": 24
        }
      ]
    },
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
    stryker: {"site": "Portage, MI (HQ)", "mi": 191.8, "hrs": "3:34"},
    costs: {"utility": "Traverse City Light & Power / Consumers Energy", "heatFuel": "natural gas", "winterHeat": 88.0, "summerBill": 113.0, "utilities": 157.0, "utilitiesNote": "TCLP electric $113/mo; Consumers Energy winter gas $88, summer $0 (summer bill $113, winter bill $201)", "internet": 40.0, "internetNote": "Spectrum up to 500 Mbps", "cell": "Strong 4G/5G in main areas; dead zones near East Bay, airport, and wooded/hilly terrain outside city limits", "carIns2": 521.83, "carInsNote": "Bankrate MI state avg $3,131/yr per car ($6,262/yr for 2 cars)", "gasPrice": 3.98, "groceries": 658.67, "groceryNote": "MIT Living Wage Calculator for 2 working adults in Grand Traverse County ($7,904/yr)", "groceryBasis": "MIT", "waterTrash": 93.54, "homeIns": 190.0, "extras": "$0.90/month BEACON endpoint technology fee on water bill; private seasonal snow removal services", "basketTotal": 1943.84, "sources": "utility-rates.com, consumersenergy.com, spectrum.com, verizon.com, bankrate.com, gasprices.aaa.com, livingwage.mit.edu, traversecitymi.gov"},
    money: {"medianPrice": 445000, "effTax": 0.0185, "cityTax": 0, "taxState": "MI", "countyPrice": 339400},
    oneLiner:
      "The northern Michigan town that actually works year-round: a 5-star hospital nine minutes from downtown, Costco and Target in town, 150 restaurants — priced accordingly, and 140 miles from a Trader Joe's.",
    scores: {
      "cost": 6,
      "winter": 3,
      "internet": 6,
      "healthcare": 10,
      "errands": 9,
      "culture": 8,
      "nature": 9,
      "safety": 8,
      "mom": 5,
      "yearRound": 6
    },
    badges: {
      "pro": [
        "Munson: Level II · Leapfrog A · CMS 5★ · 0.9 mi",
        "Costco & Target in town",
        "Walk Score 84",
        "14 nonstops from TVC"
      ],
      "con": [
        "101″ snow",
        "Trader Joe's 140 mi",
        "0.3% fiber (cable 90%)",
        "2% rental vacancy"
      ]
    },
    median: "$445,000 sold · $415,400 ACS value",
    comfort: "$128k in town · $111k in county",
    crime: "2.8–3.2 / 9.9–12.9",
    snow: '101"',
    fiber: "0.3% fiber · 90% cable",
    tax: "37.07 mills city proper (1.85%) — the oft-quoted 26.8 is Acme Twp",
    drive: "≈350 mi · 5:57",
    workup: {
      "errands": [
        [
          "Grocery in town",
          "Meijer (3955 US 31 S, 3-4 miles)"
        ],
        [
          "Costco",
          "125 S Airport Rd E, Traverse City, 3-4 miles"
        ],
        [
          "Target",
          "3130 S Airport Rd W, Traverse City, 3-4 miles"
        ],
        [
          "Walmart",
          "2640 Crossing Cir, Traverse City, 3-4 miles"
        ],
        [
          "Aldi",
          "3123 W South Airport Rd, Traverse City, 4-5 miles"
        ],
        [
          "Trader Joe's / Whole Foods",
          "Trader Joe's (Grand Rapids, ~140 mi); Whole Foods (Grand Rapids, ~140 mi)"
        ],
        [
          "Pharmacy",
          "Walgreens, 526 W 14th St, Traverse City, 1 mile"
        ],
        [
          "Home Depot/Lowe's/Menards",
          "Home Depot (4-5 mi), Lowe's (4-5 mi), Menards (4-5 mi)"
        ],
        [
          "Farmers market",
          "Sara Hardy Downtown Farmers Market (0 miles, downtown), May through October"
        ]
      ],
      "shipping": [
        [
          "Amazon delivery",
          "2-day standard; same-day/next-day occasionally available depending on item"
        ],
        [
          "Nearest Amazon station",
          "4471 US 31 South, Traverse City, 4-5 miles"
        ],
        [
          "UPS / FedEx",
          "The UPS Store (526 W 14th St, 1 mi); FedEx authorized: Kwik Print (1-2 mi)"
        ],
        [
          "Grocery delivery",
          "DoorDash and Shipt highly active; Instacart present but less reliable"
        ]
      ],
      "healthcare": [
        [
          "Nearest ER",
          "Munson Medical Center, 0.9 miles"
        ],
        [
          "Safety grade",
          "Leapfrog Grade: A (Spring 2026), CMS Star Rating: 5 stars"
        ],
        [
          "Trauma center",
          "Munson Medical Center (Level II), 0.9 miles"
        ],
        [
          "Urgent care",
          "4 major clinics in town"
        ],
        [
          "New-patient access",
          "Accepting new patients; wait times up to 31 days for initial intake"
        ],
        [
          "Referral center",
          "Corewell Health in Grand Rapids, 130-140 miles"
        ]
      ],
      "schools": [
        [
          "Public school district",
          "Traverse City Area Public Schools (TCAPS)"
        ],
        [
          "District Niche grade",
          "A-"
        ],
        [
          "High school ratings",
          "TC West High: 8/10, TC Central High: 7/10 (GreatSchools)"
        ],
        [
          "Graduation rate",
          "84%"
        ]
      ],
      "economy": [
        [
          "Top employers",
          "Munson Healthcare (3,700), Hagerty (900), NMC (700), NW Ed Services (176)"
        ],
        [
          "Hospitality West LLC",
          "NOT FOUND"
        ],
        [
          "Unemployment rate",
          "3.6% as of June 2026"
        ],
        [
          "Coworking spaces",
          "20Fathoms, Commonplace, SPACE Coworking"
        ],
        [
          "Seasonal economy",
          "29% tourism-tied jobs; population spikes 47% February to July"
        ]
      ],
      "airport": [
        [
          "Nearest airport",
          "Cherry Capital Airport (TVC), 4-5 miles, 10-15 min drive"
        ],
        [
          "Nonstop destinations",
          "14 nonstop destinations"
        ],
        [
          "Airlines",
          "American, Delta, United, Allegiant, JetBlue, Sun Country"
        ],
        [
          "Nearest major hub",
          "Gerald R. Ford International (GRR) in Grand Rapids, 2-2.5 hr drive"
        ]
      ],
      "lifestyle": [
        [
          "Walk / Bike score",
          "Walk Score 84, Bike Score 65"
        ],
        [
          "Dining & drinks",
          "150+ restaurants, 30+ breweries, 40+ wineries, 5 distilleries"
        ],
        [
          "Downtown seasonality",
          "Open year-round with winter festivals; summer peak"
        ],
        [
          "Outdoor recreation",
          "Boardman Lake Loop Trail, Grand Traverse Bay, Sleeping Bear Dunes (<30 min)"
        ],
        [
          "Arts / Music venues",
          "City Opera House, The Alluvion, Interlochen Center for the Arts"
        ],
        [
          "Dog-friendliness",
          "3 off-leash dog parks; on-leash at Mission Point & West End beaches"
        ]
      ],
      "climate": [
        [
          "July avg high",
          "80 to 81°F"
        ],
        [
          "January avg low",
          "17 to 18°F"
        ],
        [
          "Sunshine",
          "2,214 hours annually"
        ],
        [
          "Annual rainfall",
          "33 to 34 inches"
        ],
        [
          "Frost dates",
          "Last spring frost mid-late May; first fall frost late Sep-early Oct"
        ],
        [
          "Lake-effect",
          "Significant lake-effect moderation and heavy lake-effect snow"
        ]
      ],
      "demographics": [
        [
          "Source",
          "Census ACS 2016–2020 via BigQuery; county in each row for contrast"
        ],
        [
          "Population (2020 ACS)",
          "15,525 · Grand Traverse Co 92,640"
        ],
        [
          "Median age",
          "40.1 · county 43.0"
        ],
        [
          "Vacant / seasonal housing",
          "10% of units · county 15%"
        ],
        [
          "Bachelor's or higher, 25–64",
          "47% · county 38%"
        ],
        [
          "Unemployment (ACS)",
          "5% · county 4%"
        ],
        [
          "Median household income",
          "$61,056 · county $66,457"
        ],
        [
          "Works from home",
          "8% of workers · county 8%"
        ],
        [
          "Mix",
          "90% white · 3% Hispanic · 1% Asian · 1% Black"
        ],
        [
          "Median home built",
          "1957"
        ],
        [
          "Median rent (2020)",
          "$838"
        ],
        [
          "Population trend",
          "Growing, up 7.78% from 2010 to 2026"
        ],
        [
          "2024 presidential margin",
          "Trump won county by 1,084 votes (1.8% margin)"
        ]
      ],
      "gotchas": [
        [
          "Water & septic",
          "Municipal in city; ~15,000 county homes on well/septic; transfer inspections"
        ],
        [
          "Short-term rentals",
          "Requires VHR license; strict zoning limits and unhosted caps"
        ],
        [
          "HOA prevalence",
          "Highly prevalent in newer developments, condos, and subdivisions"
        ],
        [
          "Flood & erosion",
          "Shoreline erosion on bay; FEMA Flood Zone AE along Boardman/Ottaway River"
        ],
        [
          "Housing crunch",
          "2% rental vacancy and high housing costs relative to local wages"
        ],
        [
          "Seasonal traffic",
          "Intense summer tourist traffic makes local errands difficult"
        ]
      ],
      "sources": "Sources: traversecity.com, munsonhealthcare.org, traversecitymi.gov, tvcairport.com, weatherspark.com, downtowntc.com, greatschools.org, census.gov"
    },
    climate: {
      "station": "Cherry Capital Airport",
      "stationMi": 3.1,
      "years": "2010–2024",
      "snowStation": "Nw Michigan Rsch Farm",
      "snowStationMi": 8.7,
      "annual": {
        "snow": 104.6,
        "rain": 29.2,
        "snowDays": 29.0,
        "snowCover": 88.9,
        "below0": 3.9,
        "frost": 141.8,
        "above90": 8.7,
        "wetDays": 140.1,
        "recordLow": -22,
        "recordHigh": 98,
        "maxSnowDay": 18,
        "snowiest": "Jan 29.5\"",
        "wettest": "Oct 3.93\"",
        "hottest": "Jul 82.3°",
        "coldest": "Feb 17.3°",
        "snowSeason": "Jan–Dec",
        "coverage": 100
      },
      "months": [
        {
          "m": "Jan",
          "snow": 29.5,
          "rain": 1,
          "hi": 30,
          "lo": 19
        },
        {
          "m": "Feb",
          "snow": 20.7,
          "rain": 0.87,
          "hi": 31.9,
          "lo": 17.3
        },
        {
          "m": "Mar",
          "snow": 11.6,
          "rain": 1.74,
          "hi": 42.1,
          "lo": 24.5
        },
        {
          "m": "Apr",
          "snow": 6.5,
          "rain": 2.96,
          "hi": 53.5,
          "lo": 33.5
        },
        {
          "m": "May",
          "snow": 0.1,
          "rain": 2.86,
          "hi": 68.4,
          "lo": 44.5
        },
        {
          "m": "Jun",
          "snow": 0,
          "rain": 3,
          "hi": 77.1,
          "lo": 54.6
        },
        {
          "m": "Jul",
          "snow": 0,
          "rain": 2.66,
          "hi": 82.3,
          "lo": 61
        },
        {
          "m": "Aug",
          "snow": 0,
          "rain": 2.96,
          "hi": 80.4,
          "lo": 60.1
        },
        {
          "m": "Sep",
          "snow": 0,
          "rain": 3.63,
          "hi": 73.2,
          "lo": 53.1
        },
        {
          "m": "Oct",
          "snow": 0.1,
          "rain": 3.93,
          "hi": 59.9,
          "lo": 42.7
        },
        {
          "m": "Nov",
          "snow": 12.6,
          "rain": 2.03,
          "hi": 46.5,
          "lo": 32.8
        },
        {
          "m": "Dec",
          "snow": 23.5,
          "rain": 1.54,
          "hi": 35.8,
          "lo": 25.7
        }
      ]
    },
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
    stryker: {"site": "Portage, MI (HQ)", "mi": 235.2, "hrs": "4:33"},
    costs: {"utility": "City of Petoskey Electric Department / DTE Energy", "heatFuel": "natural gas", "winterHeat": 225.0, "summerBill": 30.0, "utilities": 188.5, "utilitiesNote": "City of Petoskey Electric $61/mo; DTE Energy winter gas $225, summer $30", "internet": 35.0, "internetNote": "AT&T Internet 300 / Verizon 5G Home Internet (300 Mbps)", "cell": "Strong inside city limits, spotty/dead zones in wooded/hilly rural areas outside town", "carIns2": 440.0, "carInsNote": "The Zebra avg $2,640/yr per car due to MI no-fault PIP", "gasPrice": 4.17, "groceries": 683.67, "groceryNote": "MIT Living Wage Calculator for Emmet County (2 adults)", "groceryBasis": "MIT", "waterTrash": 80.0, "homeIns": 118.5, "extras": "Private road snow removal in rural areas, condo HOAs ($100-$1,000/mo), property tax uncapping upon purchase", "basketTotal": 1893.37, "sources": "petoskey.us, att.com, verizon.com, thezebra.com, gasprices.aaa.com, livingwage.mit.edu, policygenius.com, emmetcounty.org"},
    money: {"medianPrice": 472000, "effTax": 0.0168, "cityTax": 0, "taxState": "MI", "countyPrice": 315700},
    oneLiner:
      "Hemingway's summer country with the lowest violent crime on the list, the best fiber, and a hospital a mile away; the bill is 124 inches of snow and a 65-mile Costco run.",
    scores: {
      "cost": 5,
      "winter": 1,
      "internet": 8,
      "healthcare": 9,
      "errands": 4,
      "culture": 6,
      "nature": 9,
      "safety": 10,
      "mom": 4,
      "yearRound": 5
    },
    badges: {
      "pro": [
        "Lowest violent crime (1.2–1.5/1k)",
        "44% fiber",
        "McLaren hospital 1 mi",
        "No local income tax"
      ],
      "con": [
        "123.6″ snow — most on the list",
        "Costco 65 mi",
        "Amazon 2–5 days",
        "6:03 to Palatine"
      ]
    },
    median: "$472,000 sold · $364,100 ACS value",
    comfort: "$131k in town · $107k in county",
    crime: "1.2–1.5 / 5.7–6.4",
    snow: '123.6"',
    fiber: "44% fiber · 69% cable",
    tax: "33.63 mills (1.68%)",
    drive: "≈394 mi · 6:03",
    workup: {
      "errands": [
        [
          "Grocery in town",
          "Meijer, 1201 Lears Rd (5 miles)"
        ],
        [
          "Costco",
          "Costco Wholesale, 2730 N US 31 S, Traverse City (65 miles)"
        ],
        [
          "Target",
          "Traverse City (66 miles)"
        ],
        [
          "Walmart",
          "Walmart Supercenter, 1850 Anderson Rd, Petoskey (3 miles)"
        ],
        [
          "Aldi",
          "2130 Anderson Rd, Petoskey (3 miles)"
        ],
        [
          "Trader Joe's / Whole Foods",
          "Trader Joe's: Kentwood (185 miles); Whole Foods: NOT FOUND (190+ miles)"
        ],
        [
          "Pharmacy",
          "Walgreens, 1301 N US Hwy 31, Petoskey (2 miles)"
        ],
        [
          "Home Depot / Lowe's",
          "Home Depot (3 mi), Lowe's (3 mi), Menards: Gaylord (37 mi)"
        ],
        [
          "Farmers market",
          "Downtown Petoskey Farmers Market (May 29 to October 2)"
        ]
      ],
      "shipping": [
        [
          "Amazon delivery",
          "Standard 2 to 5 days to 49770; no same-day or next-day options available"
        ],
        [
          "Nearest Amazon station",
          "Gaylord area (35 miles)"
        ],
        [
          "UPS / FedEx",
          "The UPS Store: 201 W Mitchell St; FedEx drop-off: Walgreens (1301 N US Hwy 31)"
        ],
        [
          "Grocery delivery",
          "Instacart and DoorDash have full active coverage"
        ]
      ],
      "healthcare": [
        [
          "Nearest ER",
          "McLaren Northern Michigan, Petoskey (1 mile)"
        ],
        [
          "Safety grade",
          "Leapfrog safety grade: A; CMS star rating: 4 stars"
        ],
        [
          "Trauma center",
          "McLaren Northern MI (Level II); nearest Level I: Corewell Health Butterworth, Grand Rapids (180 miles)"
        ],
        [
          "Urgent care",
          "3 urgent-care clinics in town"
        ],
        [
          "New-patient access",
          "Primary-care accepting new patients with brief wait for intake packet review"
        ],
        [
          "Referral center",
          "Munson Medical Center in Traverse City (65 miles)"
        ]
      ],
      "schools": [
        [
          "District name",
          "Public Schools of Petoskey"
        ],
        [
          "Niche grade",
          "B+"
        ],
        [
          "GreatSchools rating",
          "7/10"
        ],
        [
          "Graduation rate",
          "89%"
        ]
      ],
      "economy": [
        [
          "Largest employer",
          "McLaren Northern Michigan (1,300-1,400 employees)"
        ],
        [
          "Major employers",
          "Petoskey Plastics (450-600), Kilwins (340-370), NCMC (300+), Great Lakes Energy (290-300)"
        ],
        [
          "County unemployment rate",
          "4.20% (June 2026)"
        ],
        [
          "Coworking space",
          "NorthCoast.Work located at 417 Howard St"
        ],
        [
          "Seasonal economy",
          "Highly seasonal tourist influx driving summer (lake) and winter (ski) economy"
        ]
      ],
      "airport": [
        [
          "Nearest commercial airport",
          "Pellston Regional Airport (PLN) (25 miles, 30-40 mins drive)"
        ],
        [
          "Nonstop destinations",
          "2 destinations (Detroit, Chicago)"
        ],
        [
          "Airlines serving PLN",
          "Delta and United Airlines"
        ],
        [
          "Nearest major hub airport",
          "Detroit Metropolitan Wayne County Airport (DTW) (260 miles, 4-5 hours)"
        ]
      ],
      "lifestyle": [
        [
          "Walk & Bike Score",
          "Walk Score: 85 downtown, 10 city-wide; Bike Score: 13-18"
        ],
        [
          "Restaurants & breweries",
          "Dozens downtown; popular breweries include Beards Brewery and The Back Lot"
        ],
        [
          "Downtown",
          "Historic Gaslight District, very active year-round, busier in summer"
        ],
        [
          "Outdoor recreation",
          "26-mile Little Traverse Wheelway, Bear River Valley, Petoskey State Park, skiing within 30 mins"
        ],
        [
          "Arts & culture",
          "Crooked Tree Arts Center, Great Lakes Center for the Arts"
        ],
        [
          "Dog-friendliness",
          "Extremely pet-friendly; dogs allowed at breweries, trails, state park beach areas"
        ]
      ],
      "climate": [
        [
          "July average high",
          "75°F to 80°F"
        ],
        [
          "January average low",
          "14°F to 15°F"
        ],
        [
          "Sunshine & daylight",
          "Up to 15 hours daylight in summer; winters heavily overcast"
        ],
        [
          "Annual precipitation",
          "31 to 35 inches of precipitation"
        ],
        [
          "Frost dates",
          "Last frost mid-May, first frost mid-September"
        ],
        [
          "Lake-effect note",
          "Lake-effect fog (steam fog/sea smoke) off Little Traverse Bay in spring/fall"
        ]
      ],
      "demographics": [
        [
          "Source",
          "Census ACS 2016–2020 via BigQuery; county in each row for contrast"
        ],
        [
          "Population (2020 ACS)",
          "5,701 · Emmet Co 33,175"
        ],
        [
          "Median age",
          "42.3 · county 45.7"
        ],
        [
          "Vacant / seasonal housing",
          "24% of units · county 35%"
        ],
        [
          "Bachelor's or higher, 25–64",
          "48% · county 35%"
        ],
        [
          "Unemployment (ACS)",
          "2% · county 4%"
        ],
        [
          "Median household income",
          "$58,197 · county $55,947"
        ],
        [
          "Works from home",
          "6% of workers · county 5%"
        ],
        [
          "Mix",
          "89% white · 3% Hispanic"
        ],
        [
          "Median home built",
          "1974"
        ],
        [
          "Median rent (2020)",
          "$681"
        ],
        [
          "Population trend",
          "5,670 (2010) to 5,877 (2020) to est 5,759 (2026); slight shrinkage/stagnation"
        ],
        [
          "2024 vote margin",
          "Emmet County voted Donald Trump +18.95% (58.46% to 39.51%)"
        ]
      ],
      "gotchas": [
        [
          "Water and sewer",
          "City has municipal water/sewer; township outskirts rely on private well/septic"
        ],
        [
          "Short-term rentals",
          "Banned in residential zones; allowed only in designated business districts with city license"
        ],
        [
          "HOA prevalence",
          "Highly prevalent in developments; frequently ban STRs entirely"
        ],
        [
          "Flood zone & erosion",
          "Waterfront erosion along Lake Michigan; properties near Bear River may be in flood zones"
        ],
        [
          "Housing availability",
          "Severe lack of affordable year-round housing (99% occupancy)"
        ],
        [
          "Local quirks & tourism",
          "Zero-visibility lake-effect fog walls; large summer tourist influx changing pace"
        ]
      ],
      "sources": "Sources: greatschools.org, niche.com, leapfroggroup.org, cms.gov, census.gov, walkscore.com"
    },
    climate: {
      "station": "Petoskey (in town)",
      "stationMi": 1.0,
      "years": "2010–2024",
      "snowStation": "Petoskey Ncmc",
      "snowStationMi": 0.8,
      "annual": {
        "snow": 113.3,
        "rain": 37.1,
        "snowDays": 35.0,
        "snowCover": 83.3,
        "below0": 7.0,
        "frost": 144.3,
        "above90": 1.1,
        "wetDays": 158.7,
        "recordLow": -21,
        "recordHigh": 95,
        "maxSnowDay": 13.8,
        "snowiest": "Jan 31.7\"",
        "wettest": "Oct 5.24\"",
        "hottest": "Jul 75.5°",
        "coldest": "Feb 14.3°",
        "snowSeason": "Jan–Dec",
        "coverage": 99
      },
      "months": [
        {
          "m": "Jan",
          "snow": 31.7,
          "rain": 2.39,
          "hi": 28,
          "lo": 17
        },
        {
          "m": "Feb",
          "snow": 20.8,
          "rain": 1.68,
          "hi": 28.3,
          "lo": 14.3
        },
        {
          "m": "Mar",
          "snow": 12,
          "rain": 2.22,
          "hi": 37.6,
          "lo": 21.6
        },
        {
          "m": "Apr",
          "snow": 6.1,
          "rain": 3.38,
          "hi": 47.2,
          "lo": 31.9
        },
        {
          "m": "May",
          "snow": 0.2,
          "rain": 3.1,
          "hi": 61.3,
          "lo": 43.4
        },
        {
          "m": "Jun",
          "snow": 0,
          "rain": 3.52,
          "hi": 70.3,
          "lo": 53.4
        },
        {
          "m": "Jul",
          "snow": 0,
          "rain": 2.57,
          "hi": 75.5,
          "lo": 60.3
        },
        {
          "m": "Aug",
          "snow": 0,
          "rain": 3.19,
          "hi": 75.1,
          "lo": 60
        },
        {
          "m": "Sep",
          "snow": 0,
          "rain": 3.51,
          "hi": 69.6,
          "lo": 52.5
        },
        {
          "m": "Oct",
          "snow": 0.5,
          "rain": 5.24,
          "hi": 57.1,
          "lo": 42.6
        },
        {
          "m": "Nov",
          "snow": 12.6,
          "rain": 3.58,
          "hi": 44.2,
          "lo": 32.2
        },
        {
          "m": "Dec",
          "snow": 29.4,
          "rain": 2.69,
          "hi": 34.6,
          "lo": 24.8
        }
      ]
    },
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
    stryker: {"site": "Portage, MI (HQ)", "mi": 98.8, "hrs": "1:52"},
    costs: {"utility": "DTE Energy", "heatFuel": "natural gas", "winterHeat": 275.0, "summerBill": 150.0, "utilities": 212.5, "utilitiesNote": "DTE Energy; winter gas $275, summer $150", "internet": 55.0, "internetNote": "AT&T Fiber 300 Mbps", "cell": "High reliability and extensive 4G/5G based on RootMetrics and FCC data. Dead zones: Specific indoor residential areas and near Ann Arbor-Saline Road.", "carIns2": 416.67, "carInsNote": "Insurify ZIP 48104 avg $2,500/yr per car; Michigan high no-fault rates", "gasPrice": 4.12, "groceries": 708.67, "groceryNote": "MIT Living Wage Calculator, Washtenaw County, 2 adults, $8,504/yr (Feb 2026); the research pass had used Numbeo", "groceryBasis": "MIT", "waterTrash": 79.18, "homeIns": 150.0, "extras": "Michigan property tax uncapping triggers significant tax increase year after sale; condo HOAs $190-$380, single-family rare", "basketTotal": 2055.55, "sources": "dteenergy.com, att.com, broadbandmap.fcc.gov, insurify.com, gasbuddy.com, numbeo.com, a2gov.org, policygenius.com"},
    money: {"medianPrice": 476000, "effTax": 0.0263, "cityTax": 0, "taxState": "MI", "countyPrice": 374100},
    oneLiner:
      "A college town with university-hospital healthcare, everything within four miles, and the highest property tax on the list — young, educated, expensive, and 4:41 from Palatine.",
    scores: {
      "cost": 5,
      "winter": 7,
      "internet": 8,
      "healthcare": 10,
      "errands": 10,
      "culture": 9,
      "nature": 5,
      "safety": 7,
      "mom": 8,
      "yearRound": 10
    },
    badges: {
      "pro": [
        "U-M hospital in town",
        "Trader Joe's & Whole Foods 3.5 mi",
        "Same-day Amazon",
        "Walkable, year-round"
      ],
      "con": [
        "$12.9k/yr property tax on the median",
        "Median age 27 — a student town",
        "Property crime 17–21/1k"
      ]
    },
    median: "$476,000 sold · $479,800 ACS value",
    comfort: "$140k in town · $123k in county",
    crime: "3.0–3.4 / 17.2–21.1",
    snow: '61.4"',
    fiber: "26% fiber · 95% cable",
    tax: "52.67 mills (2.63%) — ~$12,900/yr on the median",
    drive: "≈275 mi · 4:41",
    workup: {
      "errands": [
        [
          "Grocery in town",
          "Kroger (2641 Plymouth Rd, 3.5 mi), Busch's (2020 Green Rd, 3.5 mi)"
        ],
        [
          "Costco",
          "771 Airport Blvd, Ann Arbor - 5 mi"
        ],
        [
          "Target",
          "231 S State St, Ann Arbor - 0 mi (downtown)"
        ],
        [
          "Walmart",
          "2515 Ellsworth Rd, Ypsilanti - 7 mi"
        ],
        [
          "Aldi",
          "2340 Dexter Ave, Ann Arbor - 2.5 mi"
        ],
        [
          "Trader Joe's / Whole Foods",
          "Trader Joe's (2398 E Stadium Blvd, 3.5 mi); Whole Foods (3135 Washtenaw Ave, 3.5 mi)"
        ],
        [
          "Pharmacy",
          "CVS (209 S State St, Ann Arbor) - 0 mi (downtown)"
        ],
        [
          "Home Depot",
          "3300 Carpenter Rd, Ypsilanti - 6 mi"
        ],
        [
          "Farmers market",
          "Ann Arbor Farmers Market (315 Detroit St) - 0.2 mi (Kerrytown, year-round)"
        ]
      ],
      "shipping": [
        [
          "Amazon delivery",
          "Same-day and next-day delivery widely available in 48104 for Prime members"
        ],
        [
          "Nearest Amazon station",
          "4700 Carpenter Rd, Ypsilanti, MI - 7 mi"
        ],
        [
          "UPS / FedEx",
          "The UPS Store (2531 Jackson Ave); FedEx Office Print & Ship Center (2800 S State St)"
        ],
        [
          "Grocery / food delivery",
          "Instacart and DoorDash offer comprehensive coverage across Ann Arbor"
        ]
      ],
      "healthcare": [
        [
          "Nearest ER",
          "University of Michigan Health (Michigan Medicine) Adult ER (1500 E Medical Center Dr) - 1.7 mi"
        ],
        [
          "Safety grade / CMS",
          "Leapfrog Grade A (Spring 2026); CMS 5 stars (2026)"
        ],
        [
          "Trauma center",
          "University of Michigan Health, verified Level I Trauma Center - 1.7 mi"
        ],
        [
          "Urgent care",
          "At least 7 clinics (Trinity Health IHA, Ann Arbor Urgent Care, Advance, Concentra, etc.)"
        ],
        [
          "New-patient access",
          "Accepting new patients; >50% wait >=1 week, major systems wait up to several months"
        ],
        [
          "Referral center",
          "University of Michigan Health (Michigan Medicine) - 1.7 mi"
        ]
      ],
      "schools": [
        [
          "District name",
          "Ann Arbor Public Schools (AAPS)"
        ],
        [
          "Niche rating",
          "A+ district rating (2026)"
        ],
        [
          "GreatSchools rating",
          "High school ratings typically range from 8/10 to 10/10 (2026)"
        ],
        [
          "Graduation rate",
          "91.0% (Class of 2025)"
        ]
      ],
      "economy": [
        [
          "Top employers",
          "U-M (~37,400), Trinity Health (~5,500), AAPS (~2,700), VA Healthcare (~2,700), IHA Health (~1,600)"
        ],
        [
          "County unemployment rate",
          "4.2% (July 2026)"
        ],
        [
          "Coworking spaces",
          "Cahoots (tech/startups), Venue by 4M, Workantile, BrightWorks Coworking, Bamboo Ann Arbor"
        ],
        [
          "Seasonal economy",
          "100% core economy active year-round; hospitality spikes during U-M football (~$226M) & August move-in"
        ]
      ],
      "airport": [
        [
          "Nearest commercial airport",
          "Detroit Metropolitan Wayne County Airport (DTW) - 25 mi, 35 min drive"
        ],
        [
          "Hub status",
          "Delta Air Lines hub; served by all major domestic and many international airlines"
        ],
        [
          "Nonstop destinations",
          "125+ destinations globally"
        ],
        [
          "Nearest major hub",
          "Detroit Metropolitan Wayne County Airport (DTW) - 35 min drive"
        ]
      ],
      "lifestyle": [
        [
          "Walk Score / Bike Score",
          "Walk Score 96 (Walker's Paradise); Bike Score 98 (downtown, 2026)"
        ],
        [
          "Restaurants & breweries",
          "400+ restaurants citywide; downtown breweries include Grizzly Peak, Jolly Pumpkin"
        ],
        [
          "Downtown activity",
          "Open year-round; patio seating in warm months, indoor operations through winter"
        ],
        [
          "Outdoor recreation <=30 min",
          "Border-to-Border Trail, Waterloo Rec Area (DTE trail), Huron River (kayak/tube), Whitmore/Belleville lakes"
        ],
        [
          "Arts & music venues",
          "The Ark, The Blind Pig, Hill Auditorium, Michigan Theater, Blue Llama Jazz Club, Kerrytown Concert House"
        ],
        [
          "Dog-friendliness",
          "Dog-friendly patios; 3 off-leash dog parks (Swift Run, Olson, Broadway; permit req); no dog beaches"
        ]
      ],
      "climate": [
        [
          "July average high",
          "84°F (Historical avg)"
        ],
        [
          "January average low",
          "18°F (Historical avg)"
        ],
        [
          "Annual sunshine",
          "2,451 hours of sunshine annually (Historical avg)"
        ],
        [
          "Annual rainfall",
          "37 inches (Historical avg)"
        ],
        [
          "Frost dates",
          "Last spring frost early May (approx May 3); first autumn frost late Sept to early Oct"
        ],
        [
          "Lake-effect & fog",
          "Outside main snow belt; light lake-effect dusting late fall/early winter; periodic fog in humid transitions"
        ]
      ],
      "demographics": [
        [
          "Source",
          "Census ACS 2016–2020 via BigQuery; county in each row for contrast"
        ],
        [
          "Population (2020 ACS)",
          "121,093 · Washtenaw Co 368,385"
        ],
        [
          "Median age",
          "27.5 · county 33.9"
        ],
        [
          "Vacant / seasonal housing",
          "6% of units · county 6%"
        ],
        [
          "Bachelor's or higher, 25–64",
          "80% · county 59%"
        ],
        [
          "Unemployment (ACS)",
          "4% · county 5%"
        ],
        [
          "Median household income",
          "$69,456 · county $75,730"
        ],
        [
          "Works from home",
          "12% of workers · county 8%"
        ],
        [
          "Mix",
          "67% white · 17% Asian · 7% Black · 5% Hispanic"
        ],
        [
          "Median home built",
          "1970"
        ],
        [
          "Median rent (2020)",
          "$1,217"
        ],
        [
          "Population trend",
          "Down 1.71% since 2020 (-0.48% annual decline) (2020-2024)"
        ],
        [
          "Presidential vote margin",
          "+44.4% Democratic (71.0% D vs 26.6% R) in Washtenaw County (2024)"
        ]
      ],
      "gotchas": [
        [
          "Water & septic prevalence",
          "City on municipal water (Huron River); county has ~20% on private wells & ~48k active septics (2026)"
        ],
        [
          "Short-term rental rules",
          "Strictly regulated: $500 annual fee, ADUs banned as STRs, non-principal STRs restricted, moratorium explored (2026)"
        ],
        [
          "HOA prevalence",
          "Over 100 registered residential associations, from informal groups to formal HOAs with mandatory CC&Rs"
        ],
        [
          "Flood & erosion issues",
          "Basement flooding common (high water table, clay soil, aging pipes); creek lots face storm erosion"
        ],
        [
          "Newcomer surprises",
          "High home prices & property taxes, game day/move-in traffic, townie/student dynamic, basement water management"
        ]
      ],
      "sources": "Sources: google.com, amazon.com, leapfroggroup.org, cms.gov, walkscore.com, niche.com, greatschools.org"
    },
    climate: {
      "station": "Ann Arbor U of M",
      "stationMi": 4.2,
      "years": "2010–2024",
      "snowStation": "Ann Arbor Se",
      "snowStationMi": 3.7,
      "annual": {
        "snow": 55.0,
        "rain": 39.8,
        "snowDays": 15.8,
        "snowCover": 43.3,
        "below0": 5.2,
        "frost": 131.7,
        "above90": 9.6,
        "wetDays": 169.0,
        "recordLow": -18,
        "recordHigh": 100,
        "maxSnowDay": 11.9,
        "snowiest": "Feb 17.5\"",
        "wettest": "Jun 4.48\"",
        "hottest": "Jul 84.7°",
        "coldest": "Jan 18.8°",
        "snowSeason": "Jan–Dec",
        "coverage": 100
      },
      "months": [
        {
          "m": "Jan",
          "snow": 15,
          "rain": 2.79,
          "hi": 32.3,
          "lo": 18.8
        },
        {
          "m": "Feb",
          "snow": 17.5,
          "rain": 2.59,
          "hi": 36.2,
          "lo": 19.2
        },
        {
          "m": "Mar",
          "snow": 6.3,
          "rain": 3,
          "hi": 48,
          "lo": 27.9
        },
        {
          "m": "Apr",
          "snow": 2.2,
          "rain": 3.68,
          "hi": 59.9,
          "lo": 36.9
        },
        {
          "m": "May",
          "snow": 0,
          "rain": 4.04,
          "hi": 72.8,
          "lo": 48.9
        },
        {
          "m": "Jun",
          "snow": 0,
          "rain": 4.48,
          "hi": 80.8,
          "lo": 57.5
        },
        {
          "m": "Jul",
          "snow": 0,
          "rain": 3.72,
          "hi": 84.7,
          "lo": 62
        },
        {
          "m": "Aug",
          "snow": 0,
          "rain": 4.1,
          "hi": 82.2,
          "lo": 60.2
        },
        {
          "m": "Sep",
          "snow": 0,
          "rain": 3.11,
          "hi": 75.9,
          "lo": 53.8
        },
        {
          "m": "Oct",
          "snow": 0.1,
          "rain": 3.1,
          "hi": 63.6,
          "lo": 43
        },
        {
          "m": "Nov",
          "snow": 5,
          "rain": 2.64,
          "hi": 48.9,
          "lo": 31.7
        },
        {
          "m": "Dec",
          "snow": 8.9,
          "rain": 2.59,
          "hi": 38.4,
          "lo": 25.8
        }
      ]
    },
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
    stryker: {"site": "Portage, MI (HQ)", "mi": 196.5, "hrs": "3:30"},
    costs: {"utility": "DTE Energy, SEMCO Energy Gas Company", "heatFuel": "natural gas", "winterHeat": 186.0, "utilities": 309.0, "utilitiesNote": "DTE Energy electric $123/mo; SEMCO Energy Gas Company winter gas $186/mo", "internet": 40.0, "internetNote": "Xfinity 300 Mbps", "cell": "Verizon coverage is excellent in Port Huron (~99% area coverage, no major dead zones)", "carIns2": 456.0, "carInsNote": "Insurify local avg full-coverage $2,736/yr per car ($228/mo) for two cars", "gasPrice": 3.89, "groceries": 741.0, "groceryNote": "MIT Living Wage Calculator annual food cost $8,892 for 2 adults in St. Clair County", "groceryBasis": "MIT", "waterTrash": 141.35, "homeIns": 192.0, "extras": "$23.75/mo trash/recycling assessment on property taxes; possible drain special assessments; HOAs uncommon", "basketTotal": 2112.75, "sources": "dteenergy.com, semcoenergygas.com, xfinity.com, verizon.com, insurify.com, gasbuddy.com, livingwage.mit.edu, porthuron.org, moneygeek.com, bsaonline.com"},
    money: {"medianPrice": 195000, "effTax": 0.0207, "cityTax": 0.01, "taxState": "MI", "countyPrice": 242500},
    oneLiner:
      "The cheapest viable town — $89k comfortable — on the St. Clair River across from Canada, with a hospital in town and a 1% city income tax; the trade is a working-class lake town, not a resort.",
    scores: {
      "cost": 9,
      "winter": 9,
      "internet": 8,
      "healthcare": 8,
      "errands": 6,
      "culture": 4,
      "nature": 7,
      "safety": 5,
      "mom": 6,
      "yearRound": 8
    },
    badges: {
      "pro": [
        "$89k comfortable",
        "35.5″ snow — least in Michigan here",
        "McLaren hospital in town",
        "Fiber 27% · cable 99%"
      ],
      "con": [
        "~6 violent/1k",
        "1.0% city income tax",
        "Trader Joe's 50 mi"
      ]
    },
    median: "$195,000 sold · $156,700 ACS value",
    comfort: "$89k in town · $97k in county",
    crime: "6.0 / 15.0–15.1",
    snow: '35.5"',
    fiber: "27% fiber · 99% cable",
    tax: "41.31 mills (2.07%) + 1.0% city income tax",
    drive: "≈372 mi · 5:29",
    workup: {
      "errands": [
        [
          "Grocery in town",
          "Kroger (2907 Krafft Rd, 3.5 mi; 1215 24th St, 1.5 mi); Meijer (4775 24th Ave, Fort Gratiot, 4.5 mi)"
        ],
        [
          "Costco / Sam's Club",
          "Costco (45460 Market St, Shelby Township, MI, 48 miles)"
        ],
        [
          "Target",
          "Target (4300 24th Ave, Fort Gratiot, MI, 4.0 miles)"
        ],
        [
          "Walmart",
          "Walmart (4845 24th Ave, Fort Gratiot, MI, 4.5 miles)"
        ],
        [
          "Aldi",
          "Aldi (4189 24th Ave, Fort Gratiot, MI, 4.0 miles)"
        ],
        [
          "Trader Joe's / Whole Foods",
          "Trader Joe's (3044 Walton Blvd), Whole Foods (2918 Walton Blvd), Rochester Hills, MI, 50 miles"
        ],
        [
          "Pharmacy",
          "CVS (940 Lapeer Ave, 1.0 mile); Walgreens (3990 24th Ave, 3.8 miles)"
        ],
        [
          "Hardware",
          "Home Depot (4195 24th Ave, 4.0 mi); Lowe's (4200 24th Ave, 4.0 mi); Menards (2800 Indian Dr, 4.0 mi)"
        ],
        [
          "Farmers market",
          "Port Huron Farmers Market (100 Merchant St); Season: May through October"
        ]
      ],
      "shipping": [
        [
          "Amazon delivery",
          "Standard 2-day delivery typical; same-day or next-day generally not available"
        ],
        [
          "Nearest Amazon station",
          "Sterling Heights, MI (33600 Mound Road), approx. 65 miles"
        ],
        [
          "UPS / FedEx",
          "UPS Store (2014 Holland Ave, 2 mi); FedEx Office closed Sep 2024 (retail drop-offs only)"
        ],
        [
          "Grocery delivery",
          "Both Instacart and DoorDash have coverage"
        ]
      ],
      "healthcare": [
        [
          "Nearest ER",
          "McLaren Port Huron (1221 Pine Grove Ave, 1.2 mi); Lake Huron Medical Center (2601 Electric Ave, 2.5 mi)"
        ],
        [
          "Safety grade",
          "McLaren Port Huron: Leapfrog B, CMS 2-star; Lake Huron Medical Center: Leapfrog A, CMS 5-star"
        ],
        [
          "Trauma center",
          "Local are Level III; Level II: Henry Ford Macomb (42 mi); Level I: Ascension St. John (55 mi)"
        ],
        [
          "Urgent care",
          "3 clinics (Blue Water Urgent Care, WellNow Urgent Care, MedExpress)"
        ],
        [
          "New-patient access",
          "Yes (Health Management Care PC, Port Huron Family Care); wait times 1 to 11 days"
        ],
        [
          "Referral center",
          "Henry Ford (Detroit, 60 miles); U-M Health (Ann Arbor, 85 miles)"
        ]
      ],
      "schools": [
        [
          "School district",
          "Port Huron Area School District"
        ],
        [
          "High school ratings",
          "Port Huron Northern High School: Niche B+, GreatSchools 6/10"
        ],
        [
          "District graduation rate",
          "76% district average"
        ],
        [
          "High school graduation rate",
          "Port Huron Northern High School: 91%"
        ]
      ],
      "economy": [
        [
          "Top employers",
          "McLaren (1,300), Motherson/SMR (949), School District (949), St. Clair County (923), US Farathane (650)"
        ],
        [
          "Unemployment rate",
          "5.3% (St. Clair County, May 2026, BLS)"
        ],
        [
          "Coworking spaces",
          "Propeller, Blue Water Business Center, The Roost"
        ],
        [
          "Seasonality",
          "Moderately seasonal; grounded by healthcare/manufacturing with summer tourism spikes from lake/river"
        ]
      ],
      "airport": [
        [
          "Nearest commercial airport",
          "Bishop International Airport (FNT), 55 miles, 1 hour 5 mins drive"
        ],
        [
          "Bishop nonstop destinations",
          "~10 (including Orlando, Tampa, Chicago, Las Vegas)"
        ],
        [
          "Bishop airlines",
          "Allegiant, American, United"
        ],
        [
          "Nearest major hub airport",
          "Detroit Metropolitan Wayne County Airport (DTW), 75 miles, 1 hour 25 mins drive"
        ]
      ],
      "lifestyle": [
        [
          "Walk / Bike Score",
          "Walk Score 50, Bike Score 40 (Downtown)"
        ],
        [
          "Restaurants & breweries",
          "~15-20 sit-down restaurants and breweries downtown (e.g., Vintage Tavern, Quay Street Brewing)"
        ],
        [
          "Downtown vibe",
          "Real downtown open year-round; features a Social District for open containers"
        ],
        [
          "Outdoor recreation",
          "Blue Water River Walk, Lakeport State Park (10 mi), Thomas Edison Parkway, boating/beaches"
        ],
        [
          "Arts & music venues",
          "McMorran Place (theater/arena), The Foundry, The Citadel Stage"
        ],
        [
          "Dog-friendliness",
          "Fort Gratiot Canine Commons (dog park); leashed dogs allowed on trails and Lakeport State Park"
        ]
      ],
      "climate": [
        [
          "Avg temperatures",
          "July average high: 80°F; January average low: 17°F"
        ],
        [
          "Annual sunshine",
          "2,331 hours annually"
        ],
        [
          "Annual precipitation",
          "33 inches of rainfall"
        ],
        [
          "Frost dates",
          "Last spring frost mid-May; first fall frost mid-October"
        ],
        [
          "Lake-effect & fog",
          "Susceptible to fog from Lake Huron; sheltered from major lake-effect snow unless northeasterly winds"
        ]
      ],
      "demographics": [
        [
          "Source",
          "Census ACS 2016–2020 via BigQuery; county in each row for contrast"
        ],
        [
          "Population (2020 ACS)",
          "28,918 · St. Clair Co 159,285"
        ],
        [
          "Median age",
          "38.3 · county 44.0"
        ],
        [
          "Vacant / seasonal housing",
          "10% of units · county 9%"
        ],
        [
          "Bachelor's or higher, 25–64",
          "14% · county 19%"
        ],
        [
          "Unemployment (ACS)",
          "10% · county 7%"
        ],
        [
          "Median household income",
          "$41,165 · county $58,722"
        ],
        [
          "Works from home",
          "2% of workers · county 3%"
        ],
        [
          "Mix",
          "78% white · 8% Black · 6% Hispanic · 1% Asian"
        ],
        [
          "Median home built",
          "1955"
        ],
        [
          "Median rent (2020)",
          "$622"
        ],
        [
          "Population trend",
          "Shrinking (30,110 in 2010 to 28,125 in 2026, ~6.5% decline)"
        ],
        [
          "2024 presidential vote",
          "St. Clair County: Donald Trump +34.59 percentage points (66.50% to 31.91%)"
        ]
      ],
      "gotchas": [
        [
          "Water / sewer",
          "City strictly municipal water/sewer; surrounding townships heavily rely on private wells/septic"
        ],
        [
          "Short-term rentals",
          "Governed by local zoning; requires Rental Certification from Planning Dept; 6% state use tax applies"
        ],
        [
          "HOA prevalence",
          "Rare in older city neighborhoods; common in newer condos/subdivisions; voluntary associations exist"
        ],
        [
          "Flood zone / erosion",
          "Shoreline erosion; designated High-Risk Erosion Areas (HREAs) with strict building setbacks"
        ],
        [
          "Newcomer surprises",
          "Sharp divide in municipal services outside city; strict state rules on coastline erosion modifications"
        ]
      ],
      "sources": "Sources: michigan.gov, porthuron.org, downtownph.com, census.gov, bls.gov, weather.gov, walkscore.com, amazon.com"
    },
    climate: {
      "station": "Port Huron (in town)",
      "stationMi": 0.4,
      "years": "2010–2024",
      "snowStation": "Richmond 4 Nnw",
      "snowStationMi": 19.8,
      "annual": {
        "snow": 41.8,
        "rain": 34.6,
        "snowDays": 13.0,
        "snowCover": 38.7,
        "below0": 2.7,
        "frost": 108.5,
        "above90": 6.3,
        "wetDays": 129.3,
        "recordLow": -14,
        "recordHigh": 100,
        "maxSnowDay": 11.4,
        "snowiest": "Feb 13.5\"",
        "wettest": "Aug 3.54\"",
        "hottest": "Jul 82.6°",
        "coldest": "Jan 20.3°",
        "snowSeason": "Jan–Dec",
        "coverage": 100
      },
      "months": [
        {
          "m": "Jan",
          "snow": 10.3,
          "rain": 2.27,
          "hi": 32.2,
          "lo": 20.3
        },
        {
          "m": "Feb",
          "snow": 13.5,
          "rain": 2.18,
          "hi": 34.5,
          "lo": 20.9
        },
        {
          "m": "Mar",
          "snow": 5.5,
          "rain": 2.47,
          "hi": 43.7,
          "lo": 28.9
        },
        {
          "m": "Apr",
          "snow": 1.4,
          "rain": 3.24,
          "hi": 55.1,
          "lo": 38.2
        },
        {
          "m": "May",
          "snow": 0,
          "rain": 3.3,
          "hi": 68.4,
          "lo": 49.7
        },
        {
          "m": "Jun",
          "snow": 0,
          "rain": 3.46,
          "hi": 77,
          "lo": 59.4
        },
        {
          "m": "Jul",
          "snow": 0,
          "rain": 3.23,
          "hi": 82.6,
          "lo": 65.9
        },
        {
          "m": "Aug",
          "snow": 0,
          "rain": 3.54,
          "hi": 80.4,
          "lo": 64.6
        },
        {
          "m": "Sep",
          "snow": 0,
          "rain": 3.15,
          "hi": 73.9,
          "lo": 58
        },
        {
          "m": "Oct",
          "snow": 0,
          "rain": 3.48,
          "hi": 61.9,
          "lo": 47.5
        },
        {
          "m": "Nov",
          "snow": 3.9,
          "rain": 2.25,
          "hi": 47.8,
          "lo": 35.1
        },
        {
          "m": "Dec",
          "snow": 7.2,
          "rain": 2,
          "hi": 38.3,
          "lo": 28.1
        }
      ]
    },
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
    stryker: {"site": "Portage, MI (HQ)", "mi": 146.6, "hrs": "2:41"},
    costs: {"utility": "Consumers Energy", "heatFuel": "natural gas", "winterHeat": 225.0, "summerBill": 30.0, "utilities": 262.5, "utilitiesNote": "Consumers Energy; electric $135, winter gas $225, summer gas $30", "internet": 35.0, "internetNote": "Verizon 5G Home Internet (300 Mbps)", "cell": "Verizon offers reliable coverage in the city, but users report localized dead zones and signal drops in surrounding areas and indoors", "carIns2": 533.0, "carInsNote": "Experian; avg $3,198/yr per car ($6,396/yr for 2 cars)", "gasPrice": 3.27, "groceries": 614.0, "groceryNote": "MIT Living Wage Calculator; 2-adult household in Mason County", "groceryBasis": "MIT", "waterTrash": 83.0, "homeIns": 191.0, "extras": "$2 municipal trash bag stickers, special assessments for neighborhood infrastructure, seasonal snow plowing fees", "basketTotal": 2012.2, "sources": "consumersenergy.com, broadbandnow.com, coveragemap.com, experian.com, gasbuddy.com, livingwage.mit.edu, ludington.mi.us, terrysmithagency.com, bsaonline.com"},
    money: {"medianPrice": 311000, "effTax": 0.0203, "cityTax": 0, "taxState": "MI", "countyPrice": 219600},
    oneLiner:
      "A car-ferry town on Lake Michigan with surprising fiber (55%), Meijer, Walmart and Aldi in town, a small hospital — and the nearest Costco 95 miles away.",
    scores: {
      "cost": 7,
      "winter": 4,
      "internet": 9,
      "healthcare": 7,
      "errands": 5,
      "culture": 4,
      "nature": 8,
      "safety": 9,
      "mom": 8,
      "yearRound": 5
    },
    badges: {
      "pro": [
        "55% fiber — best on the list",
        "Meijer · Walmart · Aldi in town",
        "4:21 to Palatine",
        "2.1–2.6 violent/1k"
      ],
      "con": [
        "Costco 95 mi",
        "86″ snow",
        "21% vacant housing",
        "1,265 lead lines"
      ]
    },
    median: "$311,000 sold · $201,100 ACS value",
    comfort: "$108k in town · $93k in county",
    crime: "2.1–2.6 / 9.4–10.6",
    snow: '86"',
    fiber: "55% fiber · 75% cable",
    tax: "40.67 mills (2.03%)",
    drive: "≈275 mi · 4:21",
    workup: {
      "errands": [
        [
          "Grocery in town",
          "Meijer (3 mi, 3900 W US Hwy 10), Family Fare (3 mi, 5539 W US Hwy 10)"
        ],
        [
          "Costco / Sam's Club",
          "Costco (95 mi, Wyoming, MI), Sam's Club (90 mi, Comstock Park, MI)"
        ],
        [
          "Target",
          "Norton Shores, MI (57 mi, 5057 S Harvey St)"
        ],
        [
          "Walmart",
          "4854 W US Hwy 10 (3 mi)"
        ],
        [
          "Aldi",
          "4833 W US Hwy 10 (3 mi)"
        ],
        [
          "Trader Joe's / Whole Foods",
          "Trader Joe's (100 mi, Kentwood), Whole Foods (100 mi, Kentwood)"
        ],
        [
          "Pharmacy",
          "Walgreens (3 mi, 33 S Pere Marquette Hwy), Meijer Pharmacy (3 mi)"
        ],
        [
          "Home Depot / Lowe's",
          "Home Depot (3 mi, 3865 W US Hwy 10), Lowe's (3 mi, 4460 W US Hwy 10)"
        ],
        [
          "Farmers market",
          "Ludington Farmers Market, 112 N James St (0 mi); late May-late Sept (Fri 2-7 PM)"
        ]
      ],
      "shipping": [
        [
          "Amazon delivery",
          "Standard 2-day delivery or slower; same-day/next-day generally unavailable"
        ],
        [
          "Nearest Amazon station",
          "GRR1 Fulfillment Center, Caledonia, MI (105 mi, 4300 68th St SE)"
        ],
        [
          "UPS / FedEx",
          "NOT FOUND for standalone retail stores (drop-offs only)"
        ],
        [
          "Grocery delivery",
          "DoorDash (restaurants/retail), Instacart & Shipt (Meijer, Family Fare)"
        ]
      ],
      "healthcare": [
        [
          "Nearest ER",
          "Corewell Health Ludington Hospital (1.5 mi)"
        ],
        [
          "Safety grade",
          "Leapfrog C grade (Spring 2026), CMS 4 stars (August 2026)"
        ],
        [
          "Trauma center",
          "Trinity Health Muskegon Hospital, Level II (59 mi)"
        ],
        [
          "Urgent care",
          "2 clinics (Trinity Health Urgent Care, Corewell Health Walk-In)"
        ],
        [
          "New-patient access",
          "Yes (Trinity Health, Corewell); wait times NOT FOUND"
        ],
        [
          "Referral center",
          "Munson Medical Center in Traverse City (94 mi)"
        ]
      ],
      "schools": [
        [
          "School district",
          "Ludington Area School District"
        ],
        [
          "District rating",
          "Niche B (2026)"
        ],
        [
          "High school rating",
          "Ludington High School: Niche B, GreatSchools 8/10 (2026)"
        ],
        [
          "Graduation rate",
          "82% at Ludington High School (2026)"
        ]
      ],
      "economy": [
        [
          "Top employers",
          "Corewell Health (~1,300), UACJ Whitehall (~800), FloraCraft (200-300), Schools (~229)"
        ],
        [
          "Unemployment rate",
          "5.3% in Mason County (June 2026)"
        ],
        [
          "Coworking space",
          "\"the Outbox\" at 509 S James St (2026)"
        ],
        [
          "Seasonal economy",
          "Tourism: $117.4M visitor spending, 2,600 jobs; peaks in summer, drops sharply off-season"
        ]
      ],
      "airport": [
        [
          "Nearest commercial airport",
          "Manistee County Blacker Airport (MBL) (33 mi, 35-45 min)"
        ],
        [
          "Commercial flights",
          "1 nonstop destination (Chicago ORD) via Contour Airlines"
        ],
        [
          "Nearest major hub",
          "Gerald R. Ford International Airport (GRR), Grand Rapids"
        ],
        [
          "Major hub distance",
          "110 miles (1 hr 40 min drive)"
        ]
      ],
      "lifestyle": [
        [
          "Walk & Bike Score",
          "Walk Score: low 20s (Car-Dependent); Bike Score: 32-34 (Somewhat Bikeable)"
        ],
        [
          "Dining & drinks",
          "20-35 sit-down restaurants, 3 downtown breweries, 2 wineries, 0 distilleries"
        ],
        [
          "Downtown vitality",
          "Yes, year-round downtown operations with reduced winter hours"
        ],
        [
          "Outdoor recreation",
          "Hamlin Lake (boating), Lake Michigan (beaches), Ludington State Park (hiking/skiing)"
        ],
        [
          "Arts & culture",
          "Ludington Area Center for the Arts (250-seat hall), Rotary Band Shell, Legacy Plaza"
        ],
        [
          "Dog-friendliness",
          "Central Bark Dog Park (off-leash), Loomis Street Dog Beach, Buttersville Beach"
        ]
      ],
      "climate": [
        [
          "Seasonal temperatures",
          "July high 77-82°F, January low 16-21°F"
        ],
        [
          "Annual sunshine",
          "~2,254 hours annually; heavy winter cloud cover"
        ],
        [
          "Annual precipitation",
          "31-37 inches of rain annually"
        ],
        [
          "Frost dates",
          "Last spring frost May 11-23, first fall frost Oct 1-10"
        ],
        [
          "Lake-effect & fog",
          "Primary lake-effect snow belt (intense squalls); frequent overnight/morning fog"
        ]
      ],
      "demographics": [
        [
          "Source",
          "Census ACS 2016–2020 via BigQuery; county in each row for contrast"
        ],
        [
          "Population (2020 ACS)",
          "8,081 · Mason Co 29,062"
        ],
        [
          "Median age",
          "43.0 · county 46.3"
        ],
        [
          "Vacant / seasonal housing",
          "21% of units · county 30%"
        ],
        [
          "Bachelor's or higher, 25–64",
          "19% · county 22%"
        ],
        [
          "Unemployment (ACS)",
          "4% · county 5%"
        ],
        [
          "Median household income",
          "$39,248 · county $51,568"
        ],
        [
          "Works from home",
          "1% of workers · county 4%"
        ],
        [
          "Mix",
          "90% white · 6% Hispanic · 2% Black"
        ],
        [
          "Median home built",
          "1957"
        ],
        [
          "Median rent (2020)",
          "$610"
        ],
        [
          "Population trend",
          "Shrinking by 5.2% from 8,076 to 7,655 (2010-2020)"
        ],
        [
          "2024 presidential vote",
          "Donald Trump +3,861 votes in Mason County (2024)"
        ]
      ],
      "gotchas": [
        [
          "Water & sewer",
          "Municipal water (Lake Michigan) & sewer in city; private wells/septic outside"
        ],
        [
          "Short-term rentals",
          "Strict 50-license cap (waitlisted), no transfer upon sale, max 2 per block"
        ],
        [
          "HOA prevalence",
          "NOT FOUND (rare outside waterfront/condo tracts)"
        ],
        [
          "Coastal flood & erosion",
          "Severe shoreline erosion (30-60 yr setbacks in High-Risk areas), FEMA zones AE/VE"
        ],
        [
          "Winter weather hazard",
          "Intense lake-effect snow with blinding whiteouts and inches per hour accumulation"
        ]
      ],
      "sources": "Sources: google.com, corewellhealth.org, downtownludington.org, ludington.mi.us, census.gov, weather.gov, trinityhealthmichigan.org, niche.com"
    },
    climate: {
      "station": "Manistee 3SE (nearest lakeshore station)",
      "stationMi": 19.4,
      "years": "2010–2024",
      "snowStation": "Hart 3 Wsw",
      "snowStationMi": 19.4,
      "annual": {
        "snow": 78.3,
        "rain": 37.2,
        "snowDays": 24.0,
        "snowCover": 66.5,
        "below0": 2.0,
        "frost": 136.1,
        "above90": 1.7,
        "wetDays": 143.3,
        "recordLow": -16,
        "recordHigh": 95,
        "maxSnowDay": 14,
        "snowiest": "Jan 26.1\"",
        "wettest": "Oct 4.7\"",
        "hottest": "Jul 79.8°",
        "coldest": "Feb 19°",
        "snowSeason": "Jan–Dec",
        "coverage": 96
      },
      "months": [
        {
          "m": "Jan",
          "snow": 26.1,
          "rain": 2.25,
          "hi": 30.4,
          "lo": 19.6
        },
        {
          "m": "Feb",
          "snow": 20.7,
          "rain": 1.65,
          "hi": 32.2,
          "lo": 19
        },
        {
          "m": "Mar",
          "snow": 7.3,
          "rain": 2.23,
          "hi": 42.6,
          "lo": 25.9
        },
        {
          "m": "Apr",
          "snow": 2.1,
          "rain": 3.64,
          "hi": 53.8,
          "lo": 34.9
        },
        {
          "m": "May",
          "snow": 0,
          "rain": 3.43,
          "hi": 67.8,
          "lo": 45.9
        },
        {
          "m": "Jun",
          "snow": 0,
          "rain": 3.94,
          "hi": 75.5,
          "lo": 54.4
        },
        {
          "m": "Jul",
          "snow": 0,
          "rain": 3.52,
          "hi": 79.8,
          "lo": 60.3
        },
        {
          "m": "Aug",
          "snow": 0,
          "rain": 3.31,
          "hi": 78.3,
          "lo": 59.6
        },
        {
          "m": "Sep",
          "snow": 0,
          "rain": 3.04,
          "hi": 72.3,
          "lo": 53.3
        },
        {
          "m": "Oct",
          "snow": 0,
          "rain": 4.7,
          "hi": 59.2,
          "lo": 42.8
        },
        {
          "m": "Nov",
          "snow": 6.5,
          "rain": 3.04,
          "hi": 45.9,
          "lo": 32.8
        },
        {
          "m": "Dec",
          "snow": 15.6,
          "rain": 2.5,
          "hi": 35.9,
          "lo": 25.8
        }
      ]
    },
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
    stryker: {"site": "Portage, MI (HQ)", "mi": 226.6, "hrs": "4:29"},
    costs: {"utility": "City of Charlevoix Electric Department / DTE Energy", "heatFuel": "natural gas", "winterHeat": 225.0, "summerBill": 30.0, "utilities": 211.5, "utilitiesNote": "City of Charlevoix Electric ~$84/mo; DTE Energy winter gas avg ~$225/mo, summer gas ~$30/mo", "internet": 40.0, "internetNote": "Spectrum Internet Premier up to 500 Mbps", "cell": "Verizon provides reliable 4G LTE/5G in town, but coverage can be spotty with dead zones in rural wooded areas outside town.", "carIns2": 455.16, "carInsNote": "Insurify full-coverage avg $2,731/yr per vehicle in MI ($455.16/mo for 2 cars)", "gasPrice": 4.17, "groceries": 742.58, "groceryNote": "MIT Living Wage Calculator for 2 adults in Charlevoix County ($8,911/yr)", "groceryBasis": "MIT", "waterTrash": 100.84, "homeIns": 183.33, "extras": "Property tax uncapping to SEV upon sale, rural road maintenance/snow plowing agreements, and special village infrastructure assessments.", "basketTotal": 1956.11, "sources": "charlevoixmi.gov, dteenergy.com, spectrum.com, broadbandmap.fcc.gov, insurify.com, gasprices.aaa.com, livingwage.mit.edu, terrysmithagency.com, michigan.gov"},
    money: {"medianPrice": 378000, "effTax": 0.0167, "cityTax": 0, "taxState": "MI", "countyPrice": 276800},
    oneLiner:
      "The picture-book harbor between two lakes, quiet and safe, 39% of its houses empty in winter, and a PFAS site at the municipal well field to ask about first.",
    scores: {
      "cost": 6,
      "winter": 3,
      "internet": 8,
      "healthcare": 7,
      "errands": 4,
      "culture": 4,
      "nature": 9,
      "safety": 9,
      "mom": 5,
      "yearRound": 3
    },
    badges: {
      "pro": [
        "1.7–2.1 violent/1k",
        "43% fiber",
        "Munson hospital in town",
        "$100k comfortable in county"
      ],
      "con": [
        "PFAS: the municipal well field",
        "39% vacant in winter",
        "103″ snow",
        "Costco 50 mi"
      ]
    },
    median: "$378,000 sold · $331,500 ACS value",
    comfort: "$116k in town · $100k in county",
    crime: "1.7–2.1 / 14.9–15.0",
    snow: '103"',
    fiber: "43% fiber · 63% cable",
    tax: "33.48 mills (1.67%)",
    drive: "≈387 mi · 5:57",
    workup: {
      "errands": [
        [
          "Grocery in town",
          "Family Fare Supermarket (111 M-66 N, Charlevoix), 0.9 miles"
        ],
        [
          "Costco",
          "Traverse City, 50.1 miles"
        ],
        [
          "Target",
          "Traverse City, 49.8 miles"
        ],
        [
          "Walmart",
          "Petoskey, 16.5 miles"
        ],
        [
          "Aldi",
          "Traverse City, 49.9 miles"
        ],
        [
          "Trader Joe's / Whole Foods",
          "NOT FOUND"
        ],
        [
          "Pharmacy",
          "Walgreens (1500 Bridge St, Charlevoix), 1.1 miles"
        ],
        [
          "Home Depot/Lowe's/Menards",
          "Home Depot (Petoskey) 16.4 mi; Lowe's (Petoskey) 16.8 mi; Menards (Gaylord) 44.5 mi"
        ],
        [
          "Farmers market",
          "Charlevoix Farmers Market (Bridge Street/East Park), May through October"
        ]
      ],
      "shipping": [
        [
          "Amazon delivery",
          "Standard 2-day; next/same-day NOT FOUND"
        ],
        [
          "Nearest Amazon station",
          "WMI2 (Traverse City), 53.2 miles"
        ],
        [
          "UPS / FedEx",
          "UPS Store Petoskey 16.8 mi; UPS drop-off Andy's Party Store, FedEx drop-off Walgreens"
        ],
        [
          "Grocery delivery",
          "Instacart (via Family Fare) and DoorDash operate; seasonal driver availability"
        ]
      ],
      "healthcare": [
        [
          "Nearest ER",
          "Munson Healthcare Charlevoix Hospital (14700 Lake Shore Dr), 1.4 miles"
        ],
        [
          "Safety grade",
          "NOT FOUND"
        ],
        [
          "CMS star rating",
          "NOT FOUND (Excluded as a Critical Access Hospital)"
        ],
        [
          "Urgent care",
          "1 in town (at the hospital)"
        ],
        [
          "Trauma center",
          "Level II: Munson Medical Center (Traverse City) 49.3 mi; Level I: Corewell (Grand Rapids) 184.0 mi"
        ],
        [
          "New-patient access",
          "Clinics accepting patients; wait times for a new patient appointment can be 6 months"
        ],
        [
          "Referral center",
          "Munson Medical Center (Traverse City), 49.3 miles"
        ]
      ],
      "schools": [
        [
          "District",
          "Charlevoix Public Schools"
        ],
        [
          "Niche rating",
          "District is B+"
        ],
        [
          "GreatSchools rating",
          "Charlevoix High School is 9 out of 10"
        ],
        [
          "Graduation rate",
          "82.8%"
        ]
      ],
      "economy": [
        [
          "Largest employers",
          "Boyne USA (565), EJ (500), Munson Healthcare (400), LexaMar Corp (345), Grandvue Medical (240)"
        ],
        [
          "Unemployment",
          "3.8% (June 2026)"
        ],
        [
          "Coworking",
          "The Vault (102 E Bridge St)"
        ],
        [
          "Seasonality",
          "Hyper-seasonal; many businesses rely entirely on summer tourism to survive the winter"
        ]
      ],
      "airport": [
        [
          "Commercial airport",
          "Pellston Regional Airport (PLN), 29.5 miles"
        ],
        [
          "Drive time",
          "39 mins to Pellston Regional Airport (PLN)"
        ],
        [
          "Destinations & airlines",
          "1 destination (Detroit) on Delta"
        ],
        [
          "Hub airport",
          "Detroit Metropolitan Airport (DTW), 235 mins drive"
        ]
      ],
      "lifestyle": [
        [
          "Walk score",
          "68 (Downtown)"
        ],
        [
          "Bike score",
          "39"
        ],
        [
          "Dining & drinks",
          "Around 18 sit-down restaurants and 3 breweries/wineries/distilleries"
        ],
        [
          "Downtown",
          "Vibrant year-round downtown; some tourist shops close in winter"
        ],
        [
          "Outdoor rec",
          "Lake Charlevoix/Lake Michigan boating; Little Traverse Wheelway biking; Boyne Mountain skiing (27 mins)"
        ],
        [
          "Arts",
          "Charlevoix Circle of Arts, Odmark Pavilion (outdoor concerts), Castle Farms"
        ],
        [
          "Dogs",
          "Charlevoix Dog Park (fenced); Fisherman's Island State Park (6ft leash on beach); City beaches prohibit dogs"
        ]
      ],
      "climate": [
        [
          "July avg high",
          "77.2°F"
        ],
        [
          "January avg low",
          "16.5°F"
        ],
        [
          "Sunshine",
          "159 sunny days/year"
        ],
        [
          "Rainfall",
          "32.2 inches"
        ],
        [
          "Frost dates",
          "Last frost May 19; First frost Oct 8"
        ],
        [
          "Fog & lake effect",
          "Heavy lake-effect snow in winter; steam fog in early winter over warm lake"
        ]
      ],
      "demographics": [
        [
          "Source",
          "Census ACS 2016–2020 via BigQuery; county in each row for contrast"
        ],
        [
          "Population (2020 ACS)",
          "2,467 · Charlevoix Co 26,197"
        ],
        [
          "Median age",
          "40.2 · county 49.1"
        ],
        [
          "Vacant / seasonal housing",
          "39% of units · county 34%"
        ],
        [
          "Bachelor's or higher, 25–64",
          "21% · county 29%"
        ],
        [
          "Unemployment (ACS)",
          "8% · county 5%"
        ],
        [
          "Median household income",
          "$36,341 · county $60,433"
        ],
        [
          "Works from home",
          "1% of workers · county 5%"
        ],
        [
          "Mix",
          "86% white · 8% Hispanic · 3% Black"
        ],
        [
          "Median home built",
          "1962"
        ],
        [
          "Median rent (2020)",
          "$614"
        ],
        [
          "Population trend",
          "-7.3% since 2010"
        ],
        [
          "2024 vote margin",
          "Republican +16.9 points"
        ]
      ],
      "gotchas": [
        [
          "Utilities",
          "City limits have municipal water/sewer; townships heavily rely on private wells and septic"
        ],
        [
          "Short-term rentals",
          "City cap of 80 licenses in residential zones (waitlisted, $50 deposit); Township has no strict cap"
        ],
        [
          "HOAs",
          "Rare for standard homes, but common in luxury lakefront/resort communities (e.g. Charlevoix Country Club)"
        ],
        [
          "Hazards",
          "Lake Michigan shoreline is prone to High-Risk Erosion Areas requiring building setbacks"
        ],
        [
          "Drawbridge & taxes",
          "US-31 Drawbridge opens every 30 mins in summer (traffic jams); higher non-homestead property taxes"
        ]
      ],
      "sources": "Sources: google.com, charlevoixmi.gov, munsonhealthcare.org, usclimatedata.com, walkscore.com, tripadvisor.com, almanac.com, data.census.gov"
    },
    climate: {
      "station": "Charlevoix (in town)",
      "stationMi": 0.4,
      "years": "2010–2024",
      "snowStation": "Charlevoix",
      "snowStationMi": 0.4,
      "annual": {
        "snow": 75.6,
        "rain": 35.2,
        "snowDays": 20.5,
        "snowCover": 83.9,
        "below0": 4.9,
        "frost": 136.5,
        "above90": 2.0,
        "wetDays": 149.8,
        "recordLow": -18,
        "recordHigh": 96,
        "maxSnowDay": 12,
        "snowiest": "Jan 24.2\"",
        "wettest": "Oct 4.83\"",
        "hottest": "Jul 76.8°",
        "coldest": "Feb 16.3°",
        "snowSeason": "Jan–Dec",
        "coverage": 100
      },
      "months": [
        {
          "m": "Jan",
          "snow": 24.2,
          "rain": 2.3,
          "hi": 29.4,
          "lo": 19
        },
        {
          "m": "Feb",
          "snow": 16.9,
          "rain": 1.64,
          "hi": 29.3,
          "lo": 16.3
        },
        {
          "m": "Mar",
          "snow": 7.9,
          "rain": 2.1,
          "hi": 38,
          "lo": 22.5
        },
        {
          "m": "Apr",
          "snow": 4.2,
          "rain": 3.21,
          "hi": 47.7,
          "lo": 32.8
        },
        {
          "m": "May",
          "snow": 0,
          "rain": 2.99,
          "hi": 61.7,
          "lo": 43.4
        },
        {
          "m": "Jun",
          "snow": 0,
          "rain": 3.38,
          "hi": 71.5,
          "lo": 54.2
        },
        {
          "m": "Jul",
          "snow": 0,
          "rain": 2.53,
          "hi": 76.8,
          "lo": 61.9
        },
        {
          "m": "Aug",
          "snow": 0,
          "rain": 2.77,
          "hi": 76.1,
          "lo": 61.7
        },
        {
          "m": "Sep",
          "snow": 0,
          "rain": 3.52,
          "hi": 70.6,
          "lo": 54.2
        },
        {
          "m": "Oct",
          "snow": 0,
          "rain": 4.83,
          "hi": 57.9,
          "lo": 43.9
        },
        {
          "m": "Nov",
          "snow": 5.4,
          "rain": 3.35,
          "hi": 45.3,
          "lo": 33.8
        },
        {
          "m": "Dec",
          "snow": 17,
          "rain": 2.61,
          "hi": 35.5,
          "lo": 26.2
        }
      ]
    },
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
    stryker: {"site": "Portage, MI (HQ)", "mi": 210.2, "hrs": "4:05"},
    costs: {"utility": "Cherryland Electric Cooperative", "heatFuel": "propane", "winterHeat": 316.0, "summerBill": 30.0, "utilities": 277.0, "utilitiesNote": "Cherryland Electric Cooperative; electric $119/mo, winter propane $316, summer $30, annualized heating $158/mo", "internet": 40.0, "internetNote": "Spectrum Internet Premier (up to 500 Mbps)", "cell": "4G/5G in village centers, but dead zones in low-lying areas, valleys, and dense forests within Sleeping Bear Dunes", "carIns2": 521.83, "carInsNote": "Bankrate 2025 estimate $3,131/yr per car ($521.83/mo for 2 cars)", "gasPrice": 3.98, "groceries": 980.0, "groceryNote": "MIT Living Wage Calculator annual food cost for 2 adults $11,760 ($980/mo)", "groceryBasis": "MIT", "waterTrash": 35.0, "homeIns": 191.41, "extras": "$30 annual county solid waste fee; $200-$500 annual private road maintenance agreements", "basketTotal": 2284.04, "sources": "cherrylandelectric.coop, eia.gov, michigan.gov, spectrum.com, verizon.com, bankrate.com, aaa.com, mit.edu, gflenv.com, policygenius.com"},
    money: {"medianPrice": 830000, "effTax": 0.0095, "cityTax": 0, "taxState": "MI", "priceNote": "blend of the two villages", "countyPrice": 458400},
    oneLiner:
      "Sleeping Bear's doorstep: the best nature on the list, 140 year-round residents, median age 71, a million-dollar median — a place to visit, or to retire to with money already made.",
    scores: {
      "cost": 2,
      "winter": 2,
      "internet": 4,
      "healthcare": 4,
      "errands": 3,
      "culture": 2,
      "nature": 10,
      "safety": 9,
      "mom": 5,
      "yearRound": 1
    },
    badges: {
      "pro": [
        "Sleeping Bear Dunes at the door",
        "Lowest millage (17.7)",
        "Cable 84%"
      ],
      "con": [
        "$625k–$1M median",
        "68% vacant · 140 residents",
        "Nearest ER 25+ mi",
        "Trader Joe's 150 mi"
      ]
    },
    median: "$625k–$1.04M sold · $456–700k ACS value",
    comfort: "$174k in town · $122k in county",
    crime: "1.4–2.9 / 1.8–14.7",
    snow: '117–120"',
    fiber: "9% fiber · 84% cable",
    tax: "17.7–26.5 mills (~1%) — the lowest rates on the list",
    drive: "≈348–370 mi · 5:44–6:24",
    workup: {
      "errands": [
        [
          "Grocery in town",
          "Anderson's Market (6545 Western Ave: 0 mi), Lively NeighborFood (10016 W Front St: 8 mi)"
        ],
        [
          "Costco",
          "2730 N Garfield Rd, Traverse City (30 miles)"
        ],
        [
          "Target",
          "3100 N US 31 S, Traverse City (26 miles)"
        ],
        [
          "Walmart",
          "2640 Crossing Cir, Traverse City (26 miles)"
        ],
        [
          "Aldi",
          "1522 S Division St, Traverse City (28 miles)"
        ],
        [
          "Trader Joe's / Whole Foods",
          "Trader Joe's (Grand Rapids: 150 mi), Whole Foods (2897 Radcliff Ave SE, Grand Rapids: 150 mi)"
        ],
        [
          "Pharmacy",
          "Meijer Pharmacy (3955 US 31 S, Traverse City: 26 miles)"
        ],
        [
          "Home Depot",
          "2522 Crossing Cir, Traverse City (26 miles)"
        ],
        [
          "Farmers market",
          "Glen Arbor Farmers Market (Jun-Sep: 0 mi), Empire Farmers Market (Jun-Aug: 8 mi)"
        ]
      ],
      "shipping": [
        [
          "Amazon delivery",
          "Standard 2-5 days (same-day or next-day: NOT FOUND)"
        ],
        [
          "Nearest Amazon station",
          "GRR1 (4500 68th St SE, Caledonia, MI: 130 miles)"
        ],
        [
          "UPS / FedEx",
          "Traverse City (20 mi); local drop-off at Northwoods Hardware in Glen Arbor"
        ],
        [
          "Grocery delivery",
          "Handled directly by Anderson's Market (Instacart/DoorDash standard coverage: NOT FOUND)"
        ]
      ],
      "healthcare": [
        [
          "Nearest ER",
          "Munson Medical Center in Traverse City (19 miles)"
        ],
        [
          "Safety grade",
          "Leapfrog: A; CMS: 5 stars"
        ],
        [
          "Trauma center",
          "Munson Medical Center (Level II: 19 miles)"
        ],
        [
          "Urgent care",
          "0 in town (nearest are in Traverse City)"
        ],
        [
          "New-patient access",
          "Yes (e.g. West Front Primary Care in Traverse City; system-wide wait time: NOT FOUND)"
        ],
        [
          "Referral center",
          "Munson Medical Center (19 miles)"
        ]
      ],
      "schools": [
        [
          "District",
          "Glen Lake Community Schools"
        ],
        [
          "Niche rating",
          "B+"
        ],
        [
          "GreatSchools rating",
          "8/10"
        ],
        [
          "Graduation rate",
          "90%"
        ]
      ],
      "economy": [
        [
          "Largest employers",
          "Munson Healthcare, The Homestead Resort, Cherry Republic, Sleeping Bear Dunes (headcounts: NOT FOUND)"
        ],
        [
          "Small business share",
          "99.5% of businesses have fewer than 100 employees"
        ],
        [
          "County unemployment",
          "3.8% (BLS)"
        ],
        [
          "Coworking space",
          "The Mill in Glen Arbor"
        ],
        [
          "Seasonal economy",
          "Highly seasonal; Sleeping Bear Dunes draws 1.6M annual visitors; accommodation sector dominates"
        ]
      ],
      "airport": [
        [
          "Nearest airport",
          "Cherry Capital Airport (TVC: 23 miles, 40 minutes)"
        ],
        [
          "Nonstop destinations",
          "15"
        ],
        [
          "Airlines",
          "6 (American, Delta, United, Allegiant, Sun Country, JetBlue)"
        ],
        [
          "Nearest major hub",
          "DTW (4.5 hours drive), ORD (5 hours drive)"
        ]
      ],
      "lifestyle": [
        [
          "Walk Score",
          "50 (downtown)"
        ],
        [
          "Bike Score",
          "52 (downtown)"
        ],
        [
          "Restaurants & breweries",
          "4 notable (Art's Tavern, Cherry Public House, Boonedocks, Western Avenue Grill)"
        ],
        [
          "Downtown vibe",
          "Cozy, rustic; year-round but heavily seasonal with reduced winter shop hours"
        ],
        [
          "Outdoor recreation",
          "Sleeping Bear Dunes, Sleeping Bear Heritage Trail, Alligator Hill Trail, Crystal River (<30 min)"
        ],
        [
          "Arts & music venues",
          "The River Club (outdoor live music)"
        ],
        [
          "Dog-friendliness",
          "Very pet-friendly; Empire Bluff Trail allows dogs; downtown shops welcome leashed pets"
        ]
      ],
      "climate": [
        [
          "July average high",
          "77°F"
        ],
        [
          "January average low",
          "15°F"
        ],
        [
          "Sunshine days / percent",
          "NOT FOUND"
        ],
        [
          "Annual rainfall",
          "33 inches"
        ],
        [
          "First & last frost",
          "Last spring frost May 11-20; first fall frost Oct 11-20"
        ],
        [
          "Lake-effect & fog",
          "Significant lake-effect snow, winter steam fog, and dense marine fog banks from Lake Michigan"
        ]
      ],
      "demographics": [
        [
          "Source",
          "Census ACS 2016–2020 via BigQuery; county in each row for contrast"
        ],
        [
          "Population (2020 ACS)",
          "Glen Arbor 140 · Empire 324 · Leelanau Co 21,649"
        ],
        [
          "Median age",
          "Glen Arbor 71.2 · Empire 59.3 · county 54.6"
        ],
        [
          "Vacant / seasonal housing",
          "Glen Arbor 68% · Empire 54% · county 42%"
        ],
        [
          "Bachelor's or higher, 25–64",
          "county 41% (villages too small to be stable)"
        ],
        [
          "Unemployment (ACS)",
          "county 4%"
        ],
        [
          "Median household income",
          "Glen Arbor $250k+ (topcoded) · Empire $51,786 · county $67,330"
        ],
        [
          "Works from home",
          "Glen Arbor 31% · county 10%"
        ],
        [
          "Mix",
          "90% white county-wide"
        ],
        [
          "Median home built",
          "Glen Arbor 1997 · Empire 1977"
        ],
        [
          "Population trend",
          "Growing (+6% in county since 2010)"
        ],
        [
          "2024 presidential margin",
          "Democrat (Kamala Harris) by 7.74%"
        ]
      ],
      "gotchas": [
        [
          "Water and septic",
          "Heavily relies on private wells/septic; Glen Arbor Township requires septic inspection upon title transfer"
        ],
        [
          "Short-term rentals",
          "Strict, parcel-by-parcel zoning rules; no universal right to rent"
        ],
        [
          "HOA rules",
          "Present; private HOA bylaws/deed restrictions supersede municipal rental zoning rules"
        ],
        [
          "Flood zone & erosion",
          "Properties near Lake Michigan/Glen Lake may be FEMA Zone A/V; shoreline erosion risk"
        ],
        [
          "Newcomer surprises",
          "Mandatory point-of-sale septic inspections and strict parcel-by-parcel STR zoning catch buyers off guard"
        ]
      ],
      "sources": "Sources: rome2rio.com, munsonhealthcare.org, visitglenarbor.com, plantmaps.com, myperfectweather.com, healthgrades.com, homes.com, unitedstateszipcodes.org, thelivelyfarm.com, google.com"
    },
    climate: {
      "station": "Maple City 1E",
      "stationMi": 7.8,
      "years": "2010–2024",
      "snowStation": "Nw Michigan Rsch Farm",
      "snowStationMi": 15,
      "annual": {
        "snow": 104.6,
        "rain": 35.0,
        "snowDays": 29.0,
        "snowCover": 88.9,
        "below0": 4.1,
        "frost": 148.3,
        "above90": 1.5,
        "wetDays": 148.3,
        "recordLow": -20,
        "recordHigh": 94,
        "maxSnowDay": 18,
        "snowiest": "Jan 29.5\"",
        "wettest": "Oct 4.93\"",
        "hottest": "Jul 79.8°",
        "coldest": "Feb 16.4°",
        "snowSeason": "Jan–Dec",
        "coverage": 92
      },
      "months": [
        {
          "m": "Jan",
          "snow": 29.5,
          "rain": 2.68,
          "hi": 29.2,
          "lo": 17.6
        },
        {
          "m": "Feb",
          "snow": 20.7,
          "rain": 1.89,
          "hi": 31.2,
          "lo": 16.4
        },
        {
          "m": "Mar",
          "snow": 11.6,
          "rain": 2.45,
          "hi": 41.6,
          "lo": 23.5
        },
        {
          "m": "Apr",
          "snow": 6.5,
          "rain": 3.4,
          "hi": 53.2,
          "lo": 32.2
        },
        {
          "m": "May",
          "snow": 0.1,
          "rain": 2.93,
          "hi": 67.6,
          "lo": 43.3
        },
        {
          "m": "Jun",
          "snow": 0,
          "rain": 2.29,
          "hi": 74.2,
          "lo": 52.1
        },
        {
          "m": "Jul",
          "snow": 0,
          "rain": 1.79,
          "hi": 79.8,
          "lo": 59.3
        },
        {
          "m": "Aug",
          "snow": 0,
          "rain": 2.34,
          "hi": 78,
          "lo": 59.4
        },
        {
          "m": "Sep",
          "snow": 0,
          "rain": 4.12,
          "hi": 71.1,
          "lo": 52
        },
        {
          "m": "Oct",
          "snow": 0.1,
          "rain": 4.93,
          "hi": 58.7,
          "lo": 42
        },
        {
          "m": "Nov",
          "snow": 12.6,
          "rain": 3.29,
          "hi": 45.5,
          "lo": 30.8
        },
        {
          "m": "Dec",
          "snow": 23.5,
          "rain": 2.91,
          "hi": 34.9,
          "lo": 24
        }
      ]
    },
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
    stryker: {"site": "Portage, MI (HQ)", "mi": 287.6, "hrs": "5:10"},
    costs: {"heatFuel": "propane", "utilities": 119.31, "utilitiesNote": "EIA MI average electric $119.31; propane $2.37/gal; heating bills NOT FOUND", "internet": 40.0, "internetNote": "Spectrum 500 Mbps", "cell": "100% area coverage on map, but users report spotty service due to terrain and distance from towers", "carIns2": 616.0, "carInsNote": "Bankrate Detroit-Warren-Dearborn avg $3,696/yr per car ($616/mo for 2 cars)", "gasPrice": 4.03, "groceries": 624.75, "groceryNote": "MIT Living Wage Calculator Cheboygan County ($7,497/yr for 2 adults)", "groceryBasis": "MIT", "homeIns": 119.0, "extras": "No village-wide HOA fees (depends on subdivision); seasonal/household fees NOT FOUND", "basketTotal": 1760.86, "sources": "eia.gov, spectrum.com, verizon.com, bankrate.com, gasprices.aaa.com, livingwage.mit.edu, policygenius.com, mackinawcity.org"},
    money: {"medianPrice": 289000, "effTax": 0.0186, "cityTax": 0, "taxState": "MI", "countyPrice": 192500},
    oneLiner:
      "A bridgehead village of 704 people that runs on summer — 24% winter unemployment, Amazon in three to five days, the ER across the bridge in St. Ignace.",
    scores: {
      "cost": 7,
      "winter": 3,
      "internet": 4,
      "healthcare": 4,
      "errands": 2,
      "culture": 2,
      "nature": 8,
      "safety": 6,
      "mom": 3,
      "yearRound": 1
    },
    badges: {
      "pro": [
        "$88k comfortable in county",
        "Straits & bridge views"
      ],
      "con": [
        "24% winter unemployment",
        "51% vacant housing",
        "ER across the bridge",
        "Costco 110 mi · Amazon 3–5 days"
      ]
    },
    median: "$289,000 sold · $224,300 ACS value",
    comfort: "$103k in town · $88k in county",
    crime: "5.9 / 35.4",
    snow: '93"',
    fiber: "6% fiber · 59% cable",
    tax: "36.7–37.5 mills (1.84–1.88%)",
    drive: "≈447 mi · 6:34",
    workup: {
      "errands": [
        [
          "Grocery in town",
          "Mackinaw Family Market, 101 E Central Ave: 0 miles (0 min)"
        ],
        [
          "Costco",
          "Costco Wholesale, 125 S Airport Rd E, Traverse City: 105 miles (120 min)"
        ],
        [
          "Target",
          "Target, 3130 S Airport Rd W, Traverse City: 105 miles (120 min)"
        ],
        [
          "Walmart",
          "Walmart Supercenter, 1150 S Main St, Cheboygan: 16 miles (22 min)"
        ],
        [
          "Aldi",
          "Aldi, 2130 Anderson Rd, Petoskey: 36 miles (45 min)"
        ],
        [
          "Trader Joe's / Whole Foods",
          "Trader Joe's, 3684 28th St SE, Kentwood: 230 miles (225 min)"
        ],
        [
          "Pharmacy",
          "Walgreens, 991 S Main St, Cheboygan: 16 miles (20 min)"
        ],
        [
          "Home Depot / Lowe's",
          "The Home Depot, 1700 Anderson Rd, Petoskey: 36 miles (45 min)"
        ],
        [
          "Farmers market",
          "Mackinaw City Farmers Market, Conkling Heritage Park: 0 miles (0 min), July-Sept"
        ]
      ],
      "shipping": [
        [
          "Amazon delivery",
          "Standard 3 to 5 days; same-day and next-day NOT FOUND"
        ],
        [
          "Nearest Amazon station",
          "1751 Badger Pkwy, Gaylord: 60 miles (60 min)"
        ],
        [
          "UPS",
          "NOT FOUND in town; nearest UPS Outlet at 303 Ferry Ln, St. Ignace: 18.5 miles"
        ],
        [
          "FedEx",
          "NOT FOUND in town; nearest FedEx Ship Center at 1285 Mackinaw Hwy, Pellston: 18 miles"
        ],
        [
          "Grocery delivery",
          "DoorDash covered; Instacart NOT FOUND"
        ]
      ],
      "healthcare": [
        [
          "Nearest ER",
          "Mackinac Straits Hospital in St. Ignace: 7 miles"
        ],
        [
          "Safety grade",
          "Leapfrog: NOT FOUND; CMS star rating: NOT FOUND"
        ],
        [
          "Trauma center",
          "McLaren Northern Michigan in Petoskey (Level II): 36 miles"
        ],
        [
          "Urgent care",
          "0 in town"
        ],
        [
          "New-patient access",
          "Mackinaw City Medical Clinic accepting new patients; wait time NOT FOUND"
        ],
        [
          "Referral center",
          "Munson Medical Center in Traverse City: 80 miles"
        ]
      ],
      "schools": [
        [
          "Public school district",
          "Mackinaw City Public Schools"
        ],
        [
          "Niche rating",
          "B+"
        ],
        [
          "GreatSchools rating",
          "NOT FOUND"
        ],
        [
          "Graduation rate",
          "NOT FOUND"
        ]
      ],
      "economy": [
        [
          "Top employers",
          "NOT FOUND"
        ],
        [
          "Emmet Co. unemployment",
          "4.2% (June 2026)"
        ],
        [
          "Cheboygan Co. unemployment",
          "6.0% (May 2026)"
        ],
        [
          "Coworking spaces",
          "0 in town"
        ],
        [
          "Peak tourism revenue",
          "85% of local revenue generated Memorial Day to Labor Day"
        ],
        [
          "Hospitality employment",
          "Accommodation & Food Services accounts for 32.2% of total employment"
        ]
      ],
      "airport": [
        [
          "Nearest commercial airport",
          "Pellston Regional Airport (PLN): 16.5 miles (20-30 min)"
        ],
        [
          "Nonstop destinations",
          "2 destinations (Detroit DTW, Chicago ORD)"
        ],
        [
          "Airlines serving PLN",
          "2 airlines (Delta Air Lines, United Airlines)"
        ],
        [
          "Nearest major hub",
          "Detroit Metro Airport (DTW): 290 miles (4.5 to 5.5 hours)"
        ]
      ],
      "lifestyle": [
        [
          "Walk / Bike Score",
          "NOT FOUND"
        ],
        [
          "Sit-down restaurants",
          "NOT FOUND"
        ],
        [
          "Breweries / wineries",
          "8"
        ],
        [
          "Downtown seasonality",
          "Seasonal; peak tourism May-Oct, majority of shops, restaurants, ferries close in winter"
        ],
        [
          "Notable outdoor recreation",
          "Headlands Dark Sky (2 mi), Mill Creek (4 mi), Wilderness State Park (11 mi); downhill ski 35 mi"
        ],
        [
          "Arts and music venues",
          "1 main outdoor venue (Conkling Heritage Park, summer concerts)"
        ],
        [
          "Dog friendliness",
          "Dog parks NOT FOUND; off-leash beaches NOT FOUND (state parks require 6-ft leash)"
        ]
      ],
      "climate": [
        [
          "July average high",
          "76°F"
        ],
        [
          "January average low",
          "11°F"
        ],
        [
          "Annual sunshine",
          "NOT FOUND"
        ],
        [
          "Annual rainfall",
          "33 inches"
        ],
        [
          "First fall frost",
          "October 16"
        ],
        [
          "Last spring frost",
          "May 13"
        ],
        [
          "Lake-effect / fog note",
          "Straits of Mackinac prone to patchy fog, marine Dense Fog Advisories, and lake-effect snow"
        ]
      ],
      "demographics": [
        [
          "Source",
          "Census ACS 2016–2020 via BigQuery; county in each row for contrast"
        ],
        [
          "Population (2020 ACS)",
          "704 · Cheboygan Co 25,435"
        ],
        [
          "Median age",
          "56.8 · county 51.6"
        ],
        [
          "Vacant / seasonal housing",
          "51% of units · county 40%"
        ],
        [
          "Bachelor's or higher, 25–64",
          "29% · county 20%"
        ],
        [
          "Unemployment (ACS)",
          "24% · county 7%"
        ],
        [
          "Median household income",
          "$36,406 · county $49,624"
        ],
        [
          "Works from home",
          "8% of workers · county 5%"
        ],
        [
          "Mix",
          "78% white · 6% Black · 4% Asian · 1% Hispanic"
        ],
        [
          "Median home built",
          "1969"
        ],
        [
          "Median rent (2020)",
          "$505"
        ],
        [
          "Population trend (2010-20)",
          "+5.0% (806 to 846 residents)"
        ],
        [
          "2024 vote Cheboygan Co.",
          "Republican +31 (64.9% to 33.8%)"
        ],
        [
          "2024 vote Emmet Co.",
          "Republican +11 (54.6% to 43.8%)"
        ]
      ],
      "gotchas": [
        [
          "Water and sewer",
          "Municipal mandatory within 200 ft of main (Ord. 127); remote use private well/septic (50-ft setback)"
        ],
        [
          "Short-term rentals",
          "Prohibited in residential zones (R1-R3); annual registration by Jan 1 in permitted zones"
        ],
        [
          "HOA prevalence",
          "Not prevalent; predominantly non-HOA homes governed by Village zoning"
        ],
        [
          "Flood and erosion risks",
          "Shoreline in FEMA Zone VE (coastal flood/waves); periodic severe shoreline erosion"
        ],
        [
          "Bugs / insect swarms",
          "Massive midges/mayflies swarms in May/June; repellent ineffective"
        ],
        [
          "Winter shutdown",
          "Tourist season ends Oct; most shops and restaurants close until May"
        ],
        [
          "Mackinac Bridge traffic",
          "Summer weekends, events, and high-wind closures cause severe local traffic jams"
        ]
      ],
      "sources": "Sources: mackinawcity.org, mackinawchamber.com, mackinacstraitshealth.org, rome2rio.com, myperfectweather.com, fred.stlouisfed.org, census.gov, politico.com"
    },
    climate: {
      "station": "Cheboygan",
      "stationMi": 15.0,
      "years": "2010–2024",
      "snowStation": "Cheboygan",
      "snowStationMi": 15,
      "annual": {
        "snow": 72.3,
        "rain": 33.4,
        "snowDays": 19.2,
        "snowCover": 89.5,
        "below0": 13.2,
        "frost": 160.1,
        "above90": 1.5,
        "wetDays": 163.1,
        "recordLow": -32,
        "recordHigh": 94,
        "maxSnowDay": 14,
        "snowiest": "Jan 19.9\"",
        "wettest": "Oct 4.72\"",
        "hottest": "Jul 78.1°",
        "coldest": "Feb 11°",
        "snowSeason": "Jan–Dec",
        "coverage": 100
      },
      "months": [
        {
          "m": "Jan",
          "snow": 19.9,
          "rain": 1.5,
          "hi": 28,
          "lo": 13.9
        },
        {
          "m": "Feb",
          "snow": 15.1,
          "rain": 1.19,
          "hi": 29.6,
          "lo": 11
        },
        {
          "m": "Mar",
          "snow": 9.4,
          "rain": 1.86,
          "hi": 38.6,
          "lo": 19.7
        },
        {
          "m": "Apr",
          "snow": 3.9,
          "rain": 3.59,
          "hi": 48.1,
          "lo": 29.9
        },
        {
          "m": "May",
          "snow": 0,
          "rain": 2.87,
          "hi": 62.1,
          "lo": 41.4
        },
        {
          "m": "Jun",
          "snow": 0,
          "rain": 3.53,
          "hi": 71.7,
          "lo": 51.3
        },
        {
          "m": "Jul",
          "snow": 0,
          "rain": 2.82,
          "hi": 78.1,
          "lo": 58.1
        },
        {
          "m": "Aug",
          "snow": 0,
          "rain": 2.97,
          "hi": 77.2,
          "lo": 57.6
        },
        {
          "m": "Sep",
          "snow": 0,
          "rain": 3.3,
          "hi": 70.3,
          "lo": 50.2
        },
        {
          "m": "Oct",
          "snow": 0,
          "rain": 4.72,
          "hi": 57.6,
          "lo": 40.2
        },
        {
          "m": "Nov",
          "snow": 6.7,
          "rain": 2.95,
          "hi": 44.6,
          "lo": 30.4
        },
        {
          "m": "Dec",
          "snow": 17.3,
          "rain": 2.13,
          "hi": 34.3,
          "lo": 22.4
        }
      ]
    },
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
    stryker: {"site": "Portage, MI (HQ)", "mi": 287.6, "hrs": "5:10 + ferry", "note": "Mackinaw City's drive, then the Star Line / Shepler's ferry"},
    costs: {"utility": "Cloverland Electric Cooperative", "heatFuel": "mixed", "winterHeat": 213.33, "summerBill": 105.71, "utilities": 105.71, "utilitiesNote": "Cloverland Electric Cooperative; avg bill $105.71/mo, winter electric heat $213.33/mo, summer $105.71/mo", "internet": 40.0, "internetNote": "Spectrum Internet Premier (500 Mbps)", "cell": "Verizon: Excellent in downtown and populated areas, minor dead zones in remote wooded interior trails", "carIns2": 521.83, "carInsNote": "Bankrate Michigan avg $3,131/yr per car ($521.83/mo for 2 cars)", "gasPrice": 4.38, "groceries": 624.75, "groceryNote": "MIT Living Wage estimate for 2 adults in Mackinac County ($7,497/yr); excludes local island premium", "groceryBasis": "MIT", "homeIns": 191.67, "extras": "Mainland winter parking (Arnold Transit commuter lot $40/mo) and local freight/drayage fees", "basketTotal": 1746.76, "sources": "cloverland.com, eia.gov, spectrum.com, reddit.com, bankrate.com, gasbuddy.com, livingwage.mit.edu, cityofmi.org, moneygeek.com, arnoldtransitcompany.com"},
    money: {"medianPrice": 1300000, "effTax": 0.0127, "cityTax": 0, "taxState": "MI"},
    oneLiner:
      "No cars, 992 year-round residents, a medical center but no hospital, and a $1.3M median. Go for the fudge; do not move there.",
    scores: {
      "cost": 1,
      "winter": 3,
      "internet": 1,
      "healthcare": 2,
      "errands": 1,
      "culture": 3,
      "nature": 9,
      "safety": 8,
      "mom": 2,
      "yearRound": 1
    },
    badges: {
      "pro": [
        "No cars, no noise",
        "Genuinely beautiful"
      ],
      "con": [
        "$1.3M median",
        "No hospital — ferry to the mainland",
        "0% fiber · cable 34%",
        "57% vacant"
      ]
    },
    median: "$1.07–1.3M sold · ACS value NOT IN DATA",
    comfort: "$232k in town",
    crime: "1.7–3.2 / 74–86",
    snow: '87–94"',
    fiber: "0% fiber · 34% cable",
    tax: "25.39 mills (1.27%)",
    drive: "≈447 mi · 6:34 + ferry",
    workup: {
      "errands": [
        [
          "Grocery in town",
          "Doud's Market, 7200 Main St (0 mi)"
        ],
        [
          "Costco",
          "2700 Airport Access Rd, Traverse City (approx 103 mi drive from Mackinaw City ferry dock)"
        ],
        [
          "Target",
          "3130 S Airport Rd W, Traverse City (approx 103 mi drive from Mackinaw City)"
        ],
        [
          "Walmart",
          "Walmart Supercenter, 1150 S Main St, Cheboygan (approx 15 mi drive from Mackinaw City)"
        ],
        [
          "Aldi",
          "2130 Anderson Rd, Petoskey (approx 35-40 mi drive from Mackinaw City)"
        ],
        [
          "Trader Joe's / Whole Foods",
          "None in N. MI; nearest Trader Joe's in Kentwood (approx 220 mi); Whole Foods in Kentwood/Ann Arbor (220+ mi)"
        ],
        [
          "Pharmacy",
          "Straits Area Pharmacy (St. Ignace dock delivery); Walgreens in Cheboygan (approx 15 mi from Mackinaw City)"
        ],
        [
          "Home Depot / Lowe's",
          "Home Depot, 1700 Anderson Rd, Petoskey (approx 35 mi drive from Mackinaw City)"
        ],
        [
          "Farmers market",
          "Bayside Farmers Market in St. Ignace (mainland dock 0 mi; Thu, Jul–early Sep)"
        ]
      ],
      "shipping": [
        [
          "Amazon delivery",
          "Standard or slower; ferry and horse-drawn drays via Mackinac Island Service Co; next-day virtually impossible"
        ],
        [
          "Nearest Amazon station",
          "NOT FOUND"
        ],
        [
          "UPS / FedEx",
          "None on island; nearest drop-off points in St. Ignace on mainland"
        ],
        [
          "Grocery delivery",
          "Instacart and DoorDash not available on island due to vehicle ban"
        ]
      ],
      "healthcare": [
        [
          "Nearest ER",
          "Mackinac Island Medical Ctr (24/7 on-call); Mackinac Straits Hospital, 1140 N State St, St. Ignace (ferry required)"
        ],
        [
          "Safety grade",
          "Not available (Mackinac Straits Hospital is Critical Access Hospital; lacks volume threshold for Leapfrog/CMS)"
        ],
        [
          "Trauma center",
          "McLaren Northern MI (Level II) in Petoskey (~40 mi south of St. Ignace); UP Health System–Marquette (~150 mi)"
        ],
        [
          "Urgent care",
          "1 (Mackinac Island Medical Center handles walk-ins for non-life-threatening issues)"
        ],
        [
          "New-patient access",
          "St. Ignace Medical Clinic (Mackinac Straits Health System) is accepting new patients"
        ]
      ],
      "schools": [
        [
          "Public school district",
          "Mackinac Island Public School District"
        ],
        [
          "School rating",
          "Niche rates Mackinac Island Public School with an overall B+ grade"
        ],
        [
          "Graduation rate",
          "No data available across public metrics"
        ],
        [
          "Data reporting note",
          "Metrics unavailable due to exceptionally small cohort sizes protecting student privacy"
        ]
      ],
      "economy": [
        [
          "Top employers",
          "Grand Hotel (~650), Mackinac Straits Hosp (~280), Mackinac Bridge Auth (~100), Sault Tribe (~75-95), County Govt (~75)"
        ],
        [
          "County unemployment rate",
          "3.8% (BLS, June 2026)"
        ],
        [
          "Coworking space",
          "No dedicated space; Pontiac Lodge offers rentable conference rooms with high-speed internet"
        ],
        [
          "Seasonal economy",
          "Drops from 20,000+ daily in summer to ~500 in winter; vast majority of local commerce shuts down"
        ]
      ],
      "airport": [
        [
          "Nearest commercial airport",
          "Pellston Regional (PLN), approx 15 mi (30 min drive) from Mackinaw City ferry docks"
        ],
        [
          "Nonstop destinations",
          "1 (Detroit via Delta from PLN)"
        ],
        [
          "Nearest regional hub",
          "Cherry Capital Airport (TVC) in Traverse City (2-hour drive from Mackinaw City)"
        ],
        [
          "Major hub airport",
          "Gerald R. Ford Int'l Airport (GRR) in Grand Rapids (3.5+ hour drive from Mackinaw City)"
        ]
      ],
      "lifestyle": [
        [
          "Walkability & bikeability",
          "Entire island is car-free, highly walkable/bikeable; standard Walk Score unavailable/inapplicable"
        ],
        [
          "Food and drink counts",
          "Dozens of restaurants; 1 brewery/distillery (Great Turtle, off-island prod); 1 rum tasting room; 0 vineyards"
        ],
        [
          "Downtown character",
          "Almost exclusively seasonal; practically shuts down in the winter"
        ],
        [
          "Outdoor recreation",
          "Mackinac Island State Park covers 80% of island; 70+ mi hiking/biking trails; M-185 perimeter loop"
        ],
        [
          "Arts and music venues",
          "Marquette Park summer music series, Pink Pony, Gate House, Horn's Bar, Richard & Jane Manoogian Art Museum"
        ],
        [
          "Dog-friendliness",
          "Pet-friendly for leashed dogs on ferries/carriages; strict leash laws; 0 off-leash dog parks or beaches"
        ]
      ],
      "climate": [
        [
          "July average high",
          "74°F - 76°F"
        ],
        [
          "January average low",
          "11°F - 13°F"
        ],
        [
          "Sunshine",
          "Approx 2,257 hours annually"
        ],
        [
          "Annual rainfall",
          "32 - 33 inches"
        ],
        [
          "First and last frost",
          "Average last spring frost May 11–22; average first fall frost Oct 1–10"
        ],
        [
          "Lake effect & moderation",
          "Lakes moderate summers (rarely >80°F); trigger lake-effect snow averaging 87 inches annually"
        ]
      ],
      "demographics": [
        [
          "Source",
          "Census ACS 2016–2020 via BigQuery; county in each row for contrast"
        ],
        [
          "Population (2020 ACS)",
          "992 · Mackinac Co 10,781"
        ],
        [
          "Median age",
          "43.1 · county 53.1"
        ],
        [
          "Vacant / seasonal housing",
          "57% of units · county 53%"
        ],
        [
          "Bachelor's or higher, 25–64",
          "24% · county 20%"
        ],
        [
          "Unemployment (ACS)",
          "6% · county 9%"
        ],
        [
          "Median household income",
          "$43,125 · county $50,058"
        ],
        [
          "Works from home",
          "4% of workers · county 7%"
        ],
        [
          "Mix",
          "55% white · 23% Black · 4% Hispanic · 2% Asian"
        ],
        [
          "Median home built",
          "1962"
        ],
        [
          "Median rent (2020)",
          "$714"
        ],
        [
          "Population trend (2010-2020)",
          "Stable; permanent year-round population was 583 in 2020 Census"
        ],
        [
          "2024 presidential vote",
          "Mackinac County: Donald Trump won by margin of 1,803 votes over Kamala Harris"
        ]
      ],
      "gotchas": [
        [
          "Water and sewer",
          "Modernized $78M municipal wastewater/sewer system; practically all properties on grid rather than septic"
        ],
        [
          "Short-term rental rules",
          "STRs not banned; require strict city lodging license; minimum stays (1 week to 30 days) enforced by zoning"
        ],
        [
          "HOA prevalence",
          "Very low; regulated by city zoning & State Park Commission; few associations (e.g. Sunset Forest) plow roads"
        ],
        [
          "Flood and erosion risks",
          "Coastal areas in state High-Risk Erosion Areas (HREA) with strict grading/clearing/shoreline restrictions"
        ],
        [
          "Routine surprises",
          "Car ban requires ferry & horse dray logistics for all goods; extreme isolation during winter months"
        ]
      ],
      "sources": "Sources: mackinacisland.org, mackinacstraitshealth.org, michigan.gov, census.gov, niche.com, weather.gov, datausa.io, mackinaccounty.net"
    },
    climate: {
      "station": "Cheboygan (nearest mainland station)",
      "stationMi": 15.3,
      "years": "2010–2024",
      "snowStation": "Cheboygan",
      "snowStationMi": 15,
      "annual": {
        "snow": 72.3,
        "rain": 33.4,
        "snowDays": 19.2,
        "snowCover": 89.5,
        "below0": 13.2,
        "frost": 160.1,
        "above90": 1.5,
        "wetDays": 163.1,
        "recordLow": -32,
        "recordHigh": 94,
        "maxSnowDay": 14,
        "snowiest": "Jan 19.9\"",
        "wettest": "Oct 4.72\"",
        "hottest": "Jul 78.1°",
        "coldest": "Feb 11°",
        "snowSeason": "Jan–Dec",
        "coverage": 100
      },
      "months": [
        {
          "m": "Jan",
          "snow": 19.9,
          "rain": 1.5,
          "hi": 28,
          "lo": 13.9
        },
        {
          "m": "Feb",
          "snow": 15.1,
          "rain": 1.19,
          "hi": 29.6,
          "lo": 11
        },
        {
          "m": "Mar",
          "snow": 9.4,
          "rain": 1.86,
          "hi": 38.6,
          "lo": 19.7
        },
        {
          "m": "Apr",
          "snow": 3.9,
          "rain": 3.59,
          "hi": 48.1,
          "lo": 29.9
        },
        {
          "m": "May",
          "snow": 0,
          "rain": 2.87,
          "hi": 62.1,
          "lo": 41.4
        },
        {
          "m": "Jun",
          "snow": 0,
          "rain": 3.53,
          "hi": 71.7,
          "lo": 51.3
        },
        {
          "m": "Jul",
          "snow": 0,
          "rain": 2.82,
          "hi": 78.1,
          "lo": 58.1
        },
        {
          "m": "Aug",
          "snow": 0,
          "rain": 2.97,
          "hi": 77.2,
          "lo": 57.6
        },
        {
          "m": "Sep",
          "snow": 0,
          "rain": 3.3,
          "hi": 70.3,
          "lo": 50.2
        },
        {
          "m": "Oct",
          "snow": 0,
          "rain": 4.72,
          "hi": 57.6,
          "lo": 40.2
        },
        {
          "m": "Nov",
          "snow": 6.7,
          "rain": 2.95,
          "hi": 44.6,
          "lo": 30.4
        },
        {
          "m": "Dec",
          "snow": 17.3,
          "rain": 2.13,
          "hi": 34.3,
          "lo": 22.4
        }
      ]
    },
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
    stryker: {"site": "Portage, MI (HQ)", "mi": 140.5, "hrs": "2:37"},
    costs: {"utility": "DTE Energy", "heatFuel": "natural gas", "utilities": 237.0, "utilitiesNote": "DTE Energy; electric $142, winter gas $200-$400, annualized gas $95", "internet": 75.0, "internetNote": "Xfinity 300 Mbps", "cell": "Verizon coverage is strong in 48226 with 4G LTE and 5G Ultra Wideband; highly rated by RootMetrics with no major dead-zones", "carIns2": 616.0, "carInsNote": "Bankrate Detroit area avg $3,696/yr per car, $7,392/yr for 2 cars ($616/mo)", "gasPrice": 4.17, "groceries": 639.08, "groceryNote": "MIT Living Wage Calculator, Wayne County, 2 adults, $7,669/yr (Feb 2026); the research pass had used Numbeo's higher minimum-food figure", "groceryBasis": "MIT", "waterTrash": 85.0, "homeIns": 193.91, "extras": "Annual Solid Waste Fee of $260-$270 (~$22.50/mo) on summer property tax bill for trash, recycling, and yard waste collection", "basketTotal": 2292.73, "sources": "dteenergy.com, utilitycheck.co, xfinity.com, verizon.com, rootmetrics.com, bankrate.com, gasprices.aaa.com, numbeo.com, detroitmi.gov, policygenius.com"},
    money: {"medianPrice": 110000, "effTax": 0.0321, "cityTax": 0.024, "taxState": "MI", "countyPrice": 194800},
    oneLiner:
      "The cheapest housing of any big American city, a Level I trauma center, Whole Foods a mile and a half away — and 18 violent crimes per 1,000 citywide with a 2.4% city income tax. Neighborhood is everything.",
    scores: {
      "cost": 10,
      "winter": 8,
      "internet": 7,
      "healthcare": 9,
      "errands": 9,
      "culture": 8,
      "nature": 4,
      "safety": 1,
      "mom": 7,
      "yearRound": 6
    },
    badges: {
      "pro": [
        "$78k comfortable — lowest",
        "Level I trauma (Detroit Receiving)",
        "Whole Foods 1.5 mi · same-day Amazon",
        "DTW hub"
      ],
      "con": [
        "18 violent/1k citywide",
        "2.4% city income tax",
        "24% vacant housing"
      ]
    },
    median: "$110,000 sold · $95,900 ACS value",
    comfort: "$78k in town · $94k in county",
    crime: "17.8–18.1 / 43.1–43.6",
    snow: '45"',
    fiber: "18% fiber · 99% cable",
    tax: "64.18 mills (3.21%) + 2.4% city income tax",
    drive: "≈317 mi · 4:44–5:15",
    workup: {
      "errands": [
        [
          "Grocery in town",
          "Meijer Rivertown Market (1475 E Jefferson Ave), 1.1 mi"
        ],
        [
          "Costco",
          "Costco Wholesale (30550 Stephenson Hwy, Madison Heights), 12.5 mi"
        ],
        [
          "Target",
          "Target (15600 Southfield Rd, Allen Park), 12.6 mi"
        ],
        [
          "Walmart",
          "Walmart Supercenter (5851 Mercury Dr, Dearborn), 9.2 mi"
        ],
        [
          "Aldi",
          "ALDI (15415 Gratiot Ave, Detroit), 10.5 mi"
        ],
        [
          "Trader Joe's / Whole Foods",
          "Whole Foods Market (115 Mack Ave, 1.5 mi); Trader Joe's (16919 Kercheval Ave, 8.4 mi)"
        ],
        [
          "Pharmacy",
          "CVS (1000 Woodward Ave), 0.4 mi"
        ],
        [
          "Home Depot",
          "The Home Depot (18700 Meyers Rd, Detroit), 11.4 mi"
        ],
        [
          "Farmers market",
          "Eastern Market (2934 Russell St), 1.4 mi, year-round on Saturdays"
        ]
      ],
      "shipping": [
        [
          "Amazon delivery",
          "Same-day and next-day delivery widely available in 48226"
        ],
        [
          "Nearest Amazon station",
          "Amazon DET6 (1200 E State Fair Ave, Detroit), 8.8 mi"
        ],
        [
          "UPS / FedEx",
          "UPS Store (333 W Fort St), FedEx Office (1001 Woodward Ave) downtown"
        ],
        [
          "Grocery delivery",
          "Full coverage via Instacart, DoorDash, Amazon Fresh, and Whole Foods"
        ]
      ],
      "healthcare": [
        [
          "Nearest ER",
          "Detroit Receiving Hospital (4201 St Antoine), 1.5 mi"
        ],
        [
          "Safety grade",
          "Leapfrog grade F; CMS 1 star (Detroit Receiving Hospital)"
        ],
        [
          "Trauma center",
          "Detroit Receiving Hospital (Level I Trauma Center), 1.5 mi"
        ],
        [
          "Urgent care",
          "5-10 urgent care options in urban core (DMC, Henry Ford, independent)"
        ],
        [
          "New-patient access",
          "Henry Ford and DMC clinics accepting new patients; 1-3 week wait"
        ],
        [
          "Referral center",
          "Corewell Health William Beaumont University Hospital (Royal Oak), 17.7 mi"
        ]
      ],
      "schools": [
        [
          "Public school district",
          "Detroit Public Schools Community District (DPSCD)"
        ],
        [
          "Niche rating",
          "Overall grade C-"
        ],
        [
          "GreatSchools rating",
          "District average 1-3/10 for neighborhood schools; selective schools higher"
        ],
        [
          "Graduation rate",
          "83.2% for 2025 cohort (historic high)"
        ]
      ],
      "economy": [
        [
          "Top employers",
          "Rocket Companies (13k+), Stellantis (10k+), City of Detroit (8k+), Henry Ford (8k+), US Govt (6k+)"
        ],
        [
          "County unemployment",
          "7.3% (Wayne County, BLS, July 2026)"
        ],
        [
          "Coworking spaces",
          "WeWork (1001 Woodward Ave), Bamboo Detroit (1420 Washington Blvd)"
        ],
        [
          "Seasonal economy",
          "Not seasonal; year-round corporate, automotive, government, healthcare"
        ]
      ],
      "airport": [
        [
          "Nearest commercial airport",
          "Detroit Metropolitan Wayne County Airport (DTW), 22.6 mi, 25-35 min"
        ],
        [
          "Hub status",
          "DTW is a major hub (Delta hub), 22.6 mi"
        ],
        [
          "Nonstop destinations",
          "125+ nonstop global destinations"
        ],
        [
          "Airlines serving",
          "Delta (hub), American, United, Spirit, Southwest, Frontier, and international carriers"
        ]
      ],
      "lifestyle": [
        [
          "Walk and Bike Score",
          "Walk Score 82 (Very Walkable), Bike Score 70 (Very Bikeable) for 48226"
        ],
        [
          "Dining and breweries",
          "50+ sit-down restaurants; Detroit Beer Co., The Brakeman"
        ],
        [
          "Downtown vitality",
          "Year-round vitality; 4 major pro sports teams playing downtown within blocks"
        ],
        [
          "Outdoor recreation",
          "Detroit Riverwalk, Belle Isle Park (982 acres), Lake St. Clair boating"
        ],
        [
          "Arts and music venues",
          "Fox Theatre, Detroit Opera House, Little Caesars Arena, Saint Andrew's Hall, Fillmore"
        ],
        [
          "Dog-friendliness",
          "Very dog-friendly; Capitol Park dog area, Grand Circus Park Dog Park"
        ]
      ],
      "climate": [
        [
          "July average high",
          "83.8°F"
        ],
        [
          "January average low",
          "19.2°F"
        ],
        [
          "Annual sunshine",
          "Approx. 135 clear days (53% possible annual sunshine)"
        ],
        [
          "Annual rainfall",
          "~33.5 inches"
        ],
        [
          "Frost dates",
          "Last spring frost late April; first fall frost mid-to-late October"
        ],
        [
          "Lake effect and fog",
          "Misses West MI heavy lake-effect snow; occasional localized fog/squalls from Lake Erie/St. Clair"
        ]
      ],
      "demographics": [
        [
          "Source",
          "Census ACS 2016–2020 via BigQuery; county in each row for contrast"
        ],
        [
          "Population (2020 ACS)",
          "672,351 · Wayne Co 1,753,059"
        ],
        [
          "Median age",
          "34.6 · county 37.9"
        ],
        [
          "Vacant / seasonal housing",
          "24% of units · county 15%"
        ],
        [
          "Bachelor's or higher, 25–64",
          "16% · county 26%"
        ],
        [
          "Unemployment (ACS)",
          "15% · county 9%"
        ],
        [
          "Median household income",
          "$32,498 · county $49,359"
        ],
        [
          "Works from home",
          "5% of workers · county 5%"
        ],
        [
          "Mix",
          "77% Black · 11% white · 8% Hispanic · 2% Asian"
        ],
        [
          "Median home built",
          "1947"
        ],
        [
          "Median rent (2020)",
          "$636"
        ],
        [
          "Population trend",
          "Shrunk 2010-2020; growing steadily since 2023, stabilizing around 650,000 as of 2025/2026"
        ],
        [
          "2024 presidential vote",
          "Wayne County: Democratic margin +29 points (9-point shift to Trump vs 2020)"
        ]
      ],
      "gotchas": [
        [
          "Water and sewer",
          "100% municipal water/sewer (DWSD / GLWA); no private wells/septic"
        ],
        [
          "Short-term rentals",
          "No nightly cap; registration, 15-pt inspection, lead clearance, BSEED cert required"
        ],
        [
          "HOA prevalence",
          "Common for downtown/Midtown condos/lofts; rare in historic single-family areas"
        ],
        [
          "Flood zones",
          "Jefferson-Chalmers in FEMA floodplain; severe canal/basement flooding from lake levels/seawall"
        ],
        [
          "Auto insurance",
          "Michigan no-fault auto insurance causes some of the highest car insurance premiums in US"
        ]
      ],
      "sources": "Sources: census.gov, weather.gov, detroitmi.gov, detroitk12.org, metroairport.com, leapfroggroup.org, crainsdetroit.com, walkscore.com"
    },
    climate: {
      "station": "Dearborn #2",
      "stationMi": 6.6,
      "years": "2010–2024",
      "snowStation": "Windsor Riverside",
      "snowStationMi": 5.7,
      "annual": {
        "snow": 36.7,
        "rain": 34.0,
        "snowDays": 11.4,
        "snowCover": 36.3,
        "below0": 2.8,
        "frost": 111.9,
        "above90": 10.6,
        "wetDays": 123.4,
        "recordLow": -14,
        "recordHigh": 100,
        "maxSnowDay": 11.3,
        "snowiest": "Feb 11.7\"",
        "wettest": "Aug 3.94\"",
        "hottest": "Jul 84.9°",
        "coldest": "Jan 19.9°",
        "snowSeason": "Jan–Dec",
        "coverage": 95
      },
      "months": [
        {
          "m": "Jan",
          "snow": 10.5,
          "rain": 1.97,
          "hi": 33.5,
          "lo": 19.9
        },
        {
          "m": "Feb",
          "snow": 11.7,
          "rain": 1.95,
          "hi": 36.8,
          "lo": 20.3
        },
        {
          "m": "Mar",
          "snow": 4.2,
          "rain": 2.45,
          "hi": 47.1,
          "lo": 28.5
        },
        {
          "m": "Apr",
          "snow": 1,
          "rain": 3.17,
          "hi": 58.7,
          "lo": 37.6
        },
        {
          "m": "May",
          "snow": 0.1,
          "rain": 3.55,
          "hi": 71.7,
          "lo": 50.6
        },
        {
          "m": "Jun",
          "snow": 0,
          "rain": 3.28,
          "hi": 80.3,
          "lo": 60.5
        },
        {
          "m": "Jul",
          "snow": 0,
          "rain": 3.67,
          "hi": 84.9,
          "lo": 65.5
        },
        {
          "m": "Aug",
          "snow": 0,
          "rain": 3.94,
          "hi": 82.8,
          "lo": 63.7
        },
        {
          "m": "Sep",
          "snow": 0,
          "rain": 3.14,
          "hi": 76.4,
          "lo": 56.8
        },
        {
          "m": "Oct",
          "snow": 0,
          "rain": 2.45,
          "hi": 64.2,
          "lo": 45.2
        },
        {
          "m": "Nov",
          "snow": 2.8,
          "rain": 2.35,
          "hi": 49.8,
          "lo": 33.5
        },
        {
          "m": "Dec",
          "snow": 6.4,
          "rain": 2.03,
          "hi": 39.8,
          "lo": 27.5
        }
      ]
    },
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
    stryker: {"site": "Portage, MI (HQ)", "mi": 199.4, "hrs": "3:36"},
    costs: {"utility": "Bluewater Power / Enbridge Gas", "heatFuel": "natural gas", "winterHeat": 106.5, "summerBill": 28.4, "utilities": 159.75, "utilitiesNote": "Bluewater Power electric $130 CAD ($92.30 USD), Enbridge Gas winter $150 CAD ($106.50 USD), summer $40 CAD ($28.40 USD); converted at 0.71 CAD to USD", "internet": 46.15, "internetNote": "Oxio 300 Mbps (Cogeco lines)", "cell": "Roams on Bell/Rogers/Telus with solid coverage; variable signal near St. Clair River waterfront due to cross-border interference.", "carIns2": 206.61, "carInsNote": "Rates.ca avg $2,055 CAD/yr per car, $3,493 CAD/yr ($291 CAD/mo) for 2 cars with 15% discount; converted at 0.71 CAD to USD", "gasPrice": 3.84, "groceries": 651.78, "groceryNote": "Numbeo min food expense $459 CAD/person ($918 CAD/mo for 2 adults); converted at 0.71 CAD to USD", "groceryBasis": "Numbeo", "waterTrash": 60.35, "homeIns": 154.78, "extras": "None; trash and recycling covered by 1.73% property tax rate; HOA fees apply only to condos/townhouses.", "basketTotal": 1548.51, "sources": "oeb.ca, enbridgegas.com, cogeco.ca, verizon.com, rates.ca, gasbuddy.com, numbeo.com, sarnia.ca"},
    money: {"medianPrice": 352000, "effTax": 0.0125, "cityTax": 0, "taxState": null, "priceNote": "CA$495k at 0.71"},
    oneLiner:
      "A chemical-industry city across the bridge from Port Huron: cheap, flat, Costco 85 km away, and — first — a different country's immigration system.",
    scores: {
      "cost": 8,
      "winter": 9,
      "internet": 6,
      "healthcare": 7,
      "errands": 5,
      "culture": 4,
      "nature": 7,
      "safety": 3,
      "mom": 5,
      "yearRound": 7
    },
    badges: {
      "pro": [
        "US$83k comfortable",
        "44″ snow",
        "Bluewater Health 2 km"
      ],
      "con": [
        "Immigration status first",
        "~12 violent/1k",
        "Costco 85 km",
        "Amazon.ca 3–5 days"
      ]
    },
    median: "CA$495k (≈US$352k)",
    comfort: "≈US$83k",
    crime: "11.9 / 34.5",
    snow: '44.1"',
    fiber: "Canadian providers",
    tax: "Ontario property tax ~2.1%",
    drive: "≈377 mi · 5:35",
    workup: {
      "errands": [
        [
          "Grocery in town",
          "Real Canadian Superstore (600 Murphy Rd, 5 km / 8 min); Metro (1375 London Rd, 5 km / 8 min)"
        ],
        [
          "Costco",
          "NOT FOUND in Sarnia. Nearest: 45460 Market St, Shelby Township, MI (approx 85 km / 55 min)"
        ],
        [
          "Target",
          "4300 24th Ave, Fort Gratiot, MI (approx 12 km / 20 min)"
        ],
        [
          "Walmart",
          "Walmart Supercentre, 1444 Quinn Dr, Sarnia (approx 6 km / 10 min)"
        ],
        [
          "Aldi",
          "4189 24th Ave, Fort Gratiot, MI (approx 12 km / 20 min)"
        ],
        [
          "Trader Joe's / Whole Foods",
          "Trader Joe's: Grosse Pointe, MI (105 km / 70 min); Whole Foods: Rochester Hills, MI (100 km / 70 min)"
        ],
        [
          "Pharmacy",
          "Shoppers Drug Mart, 510 Exmouth St, Sarnia (approx 2 km / 5 min)"
        ],
        [
          "Home Depot / Rona+ / Menards",
          "Home Depot: 1350 Quinn Dr (6 km / 10 min); Rona+: 1390 Quinn Dr (6 km); Menards: Fort Gratiot, MI (13 km / 20 min)"
        ],
        [
          "Farmers market",
          "Sarnia Farmers' Market, 110 Proctor St (approx 1 km / 3 min), year-round Wed and Sat"
        ]
      ],
      "shipping": [
        [
          "Amazon delivery",
          "Standard shipping is 3-5 business days; Prime is 1-2 days to N7T postal code"
        ],
        [
          "Nearest Amazon station",
          "NOT FOUND in Sarnia. Nearest major facility is YXU1 in Talbotville/St. Thomas, ON (approx 115 km / 1 hr 15 min)"
        ],
        [
          "UPS / FedEx",
          "UPS Access Point: 168 Russell St N (1 km / 3 min); FedEx ShipCentre: 1030 Confederation St (3 km / 7 min)"
        ],
        [
          "Grocery delivery",
          "Full coverage via Instacart, DoorDash, SkipTheDishes, and UberEats"
        ],
        [
          "Cross-border package pickup",
          "Amazon.com incurs duties/delays; locals often use US PO box in Port Huron, MI and drive across border"
        ]
      ],
      "healthcare": [
        [
          "Nearest ER",
          "Bluewater Health, 89 Norman St, Sarnia (approx 2 km / 5 min)"
        ],
        [
          "Safety grade",
          "Bluewater: N/A (Canadian). Nearest US: Lake Huron Medical Ctr, Port Huron, MI (10 km) Leapfrog A, 4-star CMS"
        ],
        [
          "Trauma center",
          "London Health Sciences Centre (Victoria Hospital), London, ON (approx 110 km / 1 hr 10 min)"
        ],
        [
          "Urgent care",
          "3 clinics: Rapids Family Health Team, Sarnia Medical Group after-hours clinic, Wiltshire Pharmacy walk-in"
        ],
        [
          "New-patient access",
          "Severe shortage of family doctors accepting new patients, with long waitlists reported"
        ],
        [
          "Referral center",
          "London Health Sciences Centre, London, ON (approx 110 km / 1 hr 10 min)"
        ]
      ],
      "schools": [
        [
          "Public school district",
          "Lambton Kent District School Board (LKDSB)"
        ],
        [
          "Northern Collegiate rating",
          "Fraser Institute rating: 7.3/10 (Northern Collegiate Institute & Vocational School)"
        ],
        [
          "Great Lakes Secondary rating",
          "Fraser Institute rating: 5.5/10 (Great Lakes Secondary School)"
        ],
        [
          "Graduation rate",
          "NOT FOUND. LKDSB suppresses exact system-wide graduation rates in public summaries"
        ],
        [
          "US rating platforms",
          "Niche and GreatSchools do not rate Ontario public schools"
        ]
      ],
      "economy": [
        [
          "Top employers",
          "Bluewater Health (1,700), NOVA Chemicals (1,000), Lambton College (800), Imperial Oil (700), Suncor Energy (500)"
        ],
        [
          "Unemployment rate",
          "8.0% for the Sarnia-Lambton area (as of June 2026)"
        ],
        [
          "Coworking space",
          "Alt Space at 136-140 Christina St N, downtown Sarnia"
        ],
        [
          "Economic anchors",
          "Year-round petrochemical refining, manufacturing, healthcare; minor summer bump for waterfront tourism"
        ]
      ],
      "airport": [
        [
          "Local airport",
          "Sarnia Chris Hadfield Airport (YZR) - commercial flights suspended in 2020"
        ],
        [
          "Nearest commercial airport",
          "London International Airport (YXU), approx 123 km / 1 hr 15 min drive"
        ],
        [
          "YXU airlines & destinations",
          "Approx 5-10 nonstop destinations (varies by season) via Air Canada, WestJet, and Flair"
        ],
        [
          "Nearest major hub airport",
          "Detroit Metropolitan Wayne County Airport (DTW), approx 130 km / 1 hr 30 min drive"
        ]
      ],
      "lifestyle": [
        [
          "Walk Score / Bike Score",
          "Downtown up to 89 (Very Walkable), city average 32; city-wide Bike Score 43 (Somewhat Bikeable)"
        ],
        [
          "Dining & breweries",
          "20+ downtown sit-down restaurants; 4 craft breweries: Refined Fool, Imperial City, Point Brewing, Big Family"
        ],
        [
          "Downtown seasonality",
          "Real year-round active center, with waterfront park areas peaking in summer"
        ],
        [
          "Outdoor recreation",
          "Howard Watson Nature Trail, Canatara Park (Blue Flag beach); Pinery Provincial Park (45 min) for hiking/skiing"
        ],
        [
          "Arts & culture venues",
          "Imperial Theatre, Judith & Norman Alix Art Gallery, The Lawrence House Centre for the Arts"
        ],
        [
          "Dog-friendliness",
          "Excellent; dedicated off-leash dog parks include Germain Dog Park and Blackwell Dog Park"
        ]
      ],
      "climate": [
        [
          "Summer high / Winter low",
          "July average high: 27°C (80°F); January average low: -8°C (17°F)"
        ],
        [
          "Annual sunshine",
          "2,060 - 2,200 hours (approx 200 - 288 sunny days)"
        ],
        [
          "Annual precipitation",
          "878 mm total precipitation annually (rain and snow combined)"
        ],
        [
          "Frost dates",
          "Last spring frost approx May 1; first fall frost approx October 25"
        ],
        [
          "Lake effect",
          "Lake Huron moderates fall frost, but triggers intense localized lake-effect snow squalls in winter"
        ]
      ],
      "demographics": [
        [
          "Population trend",
          "72,366 in 2011 to 72,047 in 2021 (-0.4% decline; stagnant/shrinking slightly)"
        ],
        [
          "Median age",
          "46.0 years (older than Canadian national median of 41.6)"
        ],
        [
          "Seasonal housing",
          "8.5% of Lambton County private dwellings classified as not occupied by usual residents"
        ],
        [
          "Political leaning",
          "Conservative +25.1% in 2021 federal riding; neighbouring St. Clair County, MI Trump +34.59% in 2024"
        ]
      ],
      "gotchas": [
        [
          "Water and sewer",
          "City is fully serviced by municipal water/sewer; rural/lakefront Lambton County relies on private wells/septic"
        ],
        [
          "Short-term rentals",
          "Annual STA Business Licence required for rentals under 30 days plus Municipal Accommodation Tax collection"
        ],
        [
          "HOA prevalence",
          "Very rare for detached single-family homes; standard in newer condo and townhome developments"
        ],
        [
          "Flood & erosion risks",
          "Lake Huron & St. Clair River shoreline properties regulated by St. Clair Region Conservation Authority (SCRCA)"
        ],
        [
          "Cross-border quirks",
          "Blue Water Bridge wait times fluctuate; OHIP does not cover routine US care (requires out-of-pocket or US insurance)"
        ]
      ],
      "sources": "Sources: amazon.ca, amazon.com"
    },
    climate: {
      "station": "Port Huron (across the river)",
      "stationMi": 0.6,
      "years": "2010–2024",
      "snowStation": "Richmond 4 Nnw",
      "snowStationMi": 19.8,
      "annual": {
        "snow": 41.8,
        "rain": 34.6,
        "snowDays": 13.0,
        "snowCover": 38.7,
        "below0": 2.7,
        "frost": 108.5,
        "above90": 6.3,
        "wetDays": 129.3,
        "recordLow": -14,
        "recordHigh": 100,
        "maxSnowDay": 11.4,
        "snowiest": "Feb 13.5\"",
        "wettest": "Aug 3.54\"",
        "hottest": "Jul 82.6°",
        "coldest": "Jan 20.3°",
        "snowSeason": "Jan–Dec",
        "coverage": 100
      },
      "months": [
        {
          "m": "Jan",
          "snow": 10.3,
          "rain": 2.27,
          "hi": 32.2,
          "lo": 20.3
        },
        {
          "m": "Feb",
          "snow": 13.5,
          "rain": 2.18,
          "hi": 34.5,
          "lo": 20.9
        },
        {
          "m": "Mar",
          "snow": 5.5,
          "rain": 2.47,
          "hi": 43.7,
          "lo": 28.9
        },
        {
          "m": "Apr",
          "snow": 1.4,
          "rain": 3.24,
          "hi": 55.1,
          "lo": 38.2
        },
        {
          "m": "May",
          "snow": 0,
          "rain": 3.3,
          "hi": 68.4,
          "lo": 49.7
        },
        {
          "m": "Jun",
          "snow": 0,
          "rain": 3.46,
          "hi": 77,
          "lo": 59.4
        },
        {
          "m": "Jul",
          "snow": 0,
          "rain": 3.23,
          "hi": 82.6,
          "lo": 65.9
        },
        {
          "m": "Aug",
          "snow": 0,
          "rain": 3.54,
          "hi": 80.4,
          "lo": 64.6
        },
        {
          "m": "Sep",
          "snow": 0,
          "rain": 3.15,
          "hi": 73.9,
          "lo": 58
        },
        {
          "m": "Oct",
          "snow": 0,
          "rain": 3.48,
          "hi": 61.9,
          "lo": 47.5
        },
        {
          "m": "Nov",
          "snow": 3.9,
          "rain": 2.25,
          "hi": 47.8,
          "lo": 35.1
        },
        {
          "m": "Dec",
          "snow": 7.2,
          "rain": 2,
          "hi": 38.3,
          "lo": 28.1
        }
      ]
    },
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
    stryker: {"site": "Portage, MI (HQ)", "mi": 141.9, "hrs": "2:41"},
    costs: {"utility": "Enwin Utilities / Enbridge Gas", "heatFuel": "natural gas", "winterHeat": 85.2, "summerBill": 28.4, "utilities": 163.3, "utilitiesNote": "CAD converted to USD at 0.71. Enwin Utilities electricity ~$106.50/mo ($150 CAD); Enbridge Gas (natural gas) winter ~$85.20 ($120 CAD), summer ~$28.40 ($40 CAD)", "internet": 41.17, "internetNote": "Cogeco 1 Gbps", "cell": "Verizon roams on Bell/Rogers/Telus in Canada with good coverage in urban areas; no native towers", "carIns2": 304.82, "carInsNote": "CAD converted to USD at 0.71. Rates.ca avg $2,576 CAD/yr per car, monthly for 2 cars is $304.82 USD ($429.33 CAD)", "gasPrice": 4.57, "groceries": 655.83, "groceryNote": "CAD converted to USD at 0.71. Numbeo estimated monthly food costs for 2 adults ($923.70 CAD)", "groceryBasis": "Numbeo", "waterTrash": 37.57, "homeIns": 147.5, "extras": "None; no HOA fees, trash/recycling included in property taxes, Land Transfer Tax is one-time closing cost", "basketTotal": 1624.32, "sources": "enwin.com, enbridgegas.com, cogeco.ca, verizon.com, rates.ca, gasbuddy.com, numbeo.com, citywindsor.ca"},
    money: {"medianPrice": 388000, "effTax": 0.021, "cityTax": 0, "taxState": null, "priceNote": "CA$510–579k at 0.71"},
    oneLiner:
      "Detroit's Canadian mirror with a Costco 4.5 miles away, a real hospital, and next-day Amazon.ca; a US citizen needs status before anything else counts.",
    scores: {
      "cost": 6,
      "winter": 9,
      "internet": 7,
      "healthcare": 8,
      "errands": 9,
      "culture": 6,
      "nature": 4,
      "safety": 3,
      "mom": 6,
      "yearRound": 7
    },
    badges: {
      "pro": [
        "Costco 4.5 mi",
        "Windsor Regional Hospital",
        "Next-day Amazon.ca",
        "47″ snow"
      ],
      "con": [
        "Immigration status first",
        "9.5–13.5 violent/1k"
      ]
    },
    median: "CA$510–579k (≈US$363–412k)",
    comfort: "≈US$136k net",
    crime: "9.5–13.5 / 27–39",
    snow: '47"',
    fiber: "Canadian providers",
    tax: "2.10% property (2026 rate)",
    drive: "≈321 mi · 5:35",
    workup: {
      "errands": [
        [
          "Grocery in town",
          "Metro (Downtown, Wyandotte St): 0.6 miles"
        ],
        [
          "Costco",
          "Costco (4411 Walker Rd): 4.5 miles"
        ],
        [
          "Target",
          "None in Canada. Nearest is Dearborn, MI (15901 Ford Rd): 13.9 miles"
        ],
        [
          "Walmart",
          "Walmart Supercentre (3120 Dougall Ave): 3.9 miles"
        ],
        [
          "Aldi",
          "None in Canada. Nearest is Detroit, MI (Highland Park area): 8.8 miles"
        ],
        [
          "Trader Joe's / Whole Foods",
          "None in Windsor. Nearest TJ's is Grosse Pointe, MI (17028 Kercheval Ave): 9.8 miles"
        ],
        [
          "Pharmacy",
          "Shoppers Drug Mart (Ouellette Ave): 0.3 miles"
        ],
        [
          "Home Depot / Lowe's",
          "Home Depot (1925 Division Rd): 4.7 miles"
        ],
        [
          "Farmers market",
          "Downtown Windsor Farmers Market (Pelissier St, May-Oct): 0.4 miles"
        ]
      ],
      "shipping": [
        [
          "Amazon delivery",
          "Next-day/Overnight delivery is available via Amazon.ca Prime"
        ],
        [
          "Nearest Amazon station",
          "Amazon Delivery Station (YQG1): 10.6 miles"
        ],
        [
          "UPS / FedEx",
          "UPS Store (300 Ouellette Ave): 0.2 miles"
        ],
        [
          "Grocery delivery",
          "Instacart / DoorDash: Full coverage is available in Windsor"
        ],
        [
          "Cross-border delivery",
          "US retailers often do not ship to Canada; residents use Detroit parcel lockers (Detroit Mailbox) + CBSA duties"
        ]
      ],
      "healthcare": [
        [
          "Nearest ER",
          "Windsor Regional Hospital (Ouellette Campus): 0.9 miles"
        ],
        [
          "Safety grade",
          "NOT FOUND"
        ],
        [
          "Trauma center",
          "Detroit Receiving Hospital, Detroit MI: 2.9 miles"
        ],
        [
          "Urgent care",
          "5 clinics in Windsor"
        ],
        [
          "New-patient access",
          "Ontario has a severe shortage; patients wait months/years on Health Care Connect waitlist"
        ],
        [
          "Referral center",
          "London Health Sciences Centre, London ON: 118.5 miles"
        ]
      ],
      "schools": [
        [
          "Public school district",
          "Greater Essex County District School Board (GECDSB)"
        ],
        [
          "District acronym",
          "GECDSB"
        ],
        [
          "Niche / GreatSchools",
          "NOT FOUND"
        ],
        [
          "Graduation rate",
          "78.5%"
        ]
      ],
      "economy": [
        [
          "Largest employers",
          "Stellantis (4,000+), Caesars Windsor (2,100), Ford (1,900), Windsor Regional (4,000+), Univ of Windsor (2,000+)"
        ],
        [
          "County unemployment rate",
          "7.5%"
        ],
        [
          "Coworking space",
          "Downtown Windsor Business Accelerator"
        ],
        [
          "Seasonal economy",
          "Highly seasonal agribusiness/greenhouse sector in county; manufacturing subject to cyclical layoffs"
        ]
      ],
      "airport": [
        [
          "Nearest commercial airport",
          "Windsor International Airport (YQG): 7.7 miles (20.5 mins drive time)"
        ],
        [
          "Nonstop destinations",
          "3 scheduled domestic destinations (Air Canada, Porter, WestJet)"
        ],
        [
          "Commercial airlines",
          "Air Canada, Porter, WestJet"
        ],
        [
          "Nearest major hub",
          "Detroit Metro Airport (DTW): 24.0 miles (35.0 mins drive time, highly dependent on border wait)"
        ]
      ],
      "lifestyle": [
        [
          "Walk Score",
          "81"
        ],
        [
          "Bike Score",
          "63"
        ],
        [
          "Restaurants and breweries",
          "Over 50 downtown"
        ],
        [
          "Real downtown",
          "Yes, Downtown Windsor is a year-round urban centre"
        ],
        [
          "Notable outdoor recreation",
          "Point Pelee National Park: 40.5 miles"
        ],
        [
          "Dog-friendliness",
          "Several dog parks, including Ford Test Track dog park"
        ]
      ],
      "climate": [
        [
          "July average high",
          "28.1°C"
        ],
        [
          "January average low",
          "-7.3°C"
        ],
        [
          "Days of sunshine",
          "2,282 hours annually"
        ],
        [
          "Annual rainfall",
          "840 mm"
        ],
        [
          "Frost dates",
          "Last spring frost usually late April; first autumn frost late October"
        ],
        [
          "Lake-effect",
          "Surrounding lakes moderate winter lows but cause occasional localized fog and mild lake-effect snow"
        ]
      ],
      "demographics": [
        [
          "Population trend",
          "8.9% growth since 2010 (reaching ~229,660)"
        ],
        [
          "Median age",
          "41.4"
        ],
        [
          "Vacation housing share",
          "NOT FOUND"
        ],
        [
          "2021 election margin",
          "10.9% (Windsor West)"
        ]
      ],
      "gotchas": [
        [
          "Water source",
          "Urban Windsor is entirely municipal water; wells/septic are only in rural Essex County"
        ],
        [
          "Short-term-rental rules",
          "Heavily restricted; must be owner's principal residence and licensed"
        ],
        [
          "HOA prevalence",
          "Traditional American HOAs are non-existent; townhouses/condos have condominium fees"
        ],
        [
          "Flood zone",
          "High risk of basement flooding due to low elevation; sump pumps and backwater valves are standard"
        ],
        [
          "Newcomer surprises",
          "Cross-border commuting requires a NEXUS card; expensive auto insurance; healthcare differs from US"
        ]
      ],
      "sources": "Sources: router.project-osrm.org, en.wikipedia.org, climate.weather.gc.ca, statcan.gc.ca, citywindsor.ca, publicboard.ca, walkscore.com, amazon.ca"
    },
    climate: {
      "station": "Windsor Riverside",
      "stationMi": 5.4,
      "years": "2010–2024",
      "snowStation": "Windsor Riverside",
      "snowStationMi": 5.4,
      "annual": {
        "snow": 36.7,
        "rain": 39.4,
        "snowDays": 11.4,
        "snowCover": 36.3,
        "below0": 1.8,
        "frost": 106.5,
        "above90": 14.5,
        "wetDays": 140.2,
        "recordLow": -13,
        "recordHigh": 101,
        "maxSnowDay": 11.3,
        "snowiest": "Feb 11.7\"",
        "wettest": "Aug 4.59\"",
        "hottest": "Jul 85.2°",
        "coldest": "Jan 21.8°",
        "snowSeason": "Jan–Dec",
        "coverage": 100
      },
      "months": [
        {
          "m": "Jan",
          "snow": 10.5,
          "rain": 2.57,
          "hi": 33.3,
          "lo": 21.8
        },
        {
          "m": "Feb",
          "snow": 11.7,
          "rain": 2.34,
          "hi": 36.5,
          "lo": 22.4
        },
        {
          "m": "Mar",
          "snow": 4.2,
          "rain": 2.74,
          "hi": 47.1,
          "lo": 30.5
        },
        {
          "m": "Apr",
          "snow": 1,
          "rain": 3.28,
          "hi": 58.5,
          "lo": 39.5
        },
        {
          "m": "May",
          "snow": 0.1,
          "rain": 3.63,
          "hi": 72,
          "lo": 51.3
        },
        {
          "m": "Jun",
          "snow": 0,
          "rain": 3.65,
          "hi": 81,
          "lo": 61.6
        },
        {
          "m": "Jul",
          "snow": 0,
          "rain": 4.09,
          "hi": 85.2,
          "lo": 66.5
        },
        {
          "m": "Aug",
          "snow": 0,
          "rain": 4.59,
          "hi": 83,
          "lo": 64.9
        },
        {
          "m": "Sep",
          "snow": 0,
          "rain": 4.31,
          "hi": 75.9,
          "lo": 58.3
        },
        {
          "m": "Oct",
          "snow": 0,
          "rain": 3,
          "hi": 63.3,
          "lo": 47.3
        },
        {
          "m": "Nov",
          "snow": 2.8,
          "rain": 2.71,
          "hi": 49.2,
          "lo": 34.9
        },
        {
          "m": "Dec",
          "snow": 6.4,
          "rain": 2.48,
          "hi": 39.7,
          "lo": 29
        }
      ]
    },
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
