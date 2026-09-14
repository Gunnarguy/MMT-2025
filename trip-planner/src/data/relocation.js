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
 * priced identically for every town (median price, 2025 millage, 6.76%
 * mortgage). crime = violent / property incidents per 1,000 residents.
 */

export const SCOUT_META = {
  researched: "2026-08-28",
  corrected: "2026-08-29",
  method:
    "46 research jobs across 4 rounds plus a verification round. Housing was rebuilt on 2026-08-29 against Census ACS after the first pass was found to be blending median-sold, median-listing, average-sale and Zillow AVM figures as if interchangeable. Each town now shows median SOLD (Redfin) beside Census ACS median home VALUE, which covers the whole owner-occupied stock and excludes seasonal units. Also: MIT Living Wage, NOAA 1991-2020 normals, FCC/BroadbandNow, and the Michigan Treasury 2025 millage compilation (Form L-4029).",
  confirmed: 55,
  correctedFigures: 26,
  refreshed: "2026-09-14",
  refreshMethod: "Housing and bills re-sourced 2026-09-14: Redfin median sold for the latest month with a second source, Census ACS 2020-2024 values, HUD Fair Market Rents FY2027 (effective 2026-10-01), Michigan Treasury 2025 millage with the first-year uncapped tax computed on the median, MIT Living Wage 2026 food lines, 2026 insurance and utility figures; every row in \"Buying here, realistically\" carries its period and source. Comfortable income is now one formula for every modelled town: the gross household income at which a 30-year mortgage at 6.76% with 20% down, the first-year uncapped tax and the non-housing basket equal 65% of take-home (two equal earners, federal, FICA, state and city tax). Every figure was fetched with its period and URL on 2026-09-14; an independent re-sourcing pass was still running when this went live, and anything it flags will be corrected in a follow-up. Car insurance keeps the 2026-08-28 Bankrate figures because Bankrate could not be fetched this round.",
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
  "costs": {"utility": "PG&E", "heatFuel": "natural gas", "summerBill": 300.0, "utilities": 329.0, "utilitiesNote": "PG&E; average electric ~$329/mo, winter bill $400-$500+, summer bill $300+", "internet": 35.0, "internetNote": "AT&T Fiber 300 Mbps", "cell": "Excellent and reliable in 95008; potential localized dead zones due to infrastructure density, building materials, and terrain", "carIns2": 493.5, "carInsNote": "Bankrate's True Cost of Auto Insurance Report; SF-Oakland-Fremont metro avg $2,961/yr", "gasPrice": 5.83, "groceries": 769.33, "groceryNote": "MIT Living Wage Calculator for Santa Clara County, 2 adults (0 children) food cost", "groceryBasis": "MIT", "waterTrash": 330.15, "homeIns": 137.75, "extras": "Annual property tax includes special assessments (e.g. $691.80 sewer) and parcel taxes; no HOA fees unless in managed community", "basketTotal": 2444.53, "sources": "pge.com, att.com, rootmetrics.com, bankrate.com, aaa.com, livingwage.mit.edu, sjwater.com, wvsdca.gov, westvalleyrecycles.com, policygenius.com"},
  "id": "scout-campbell",
  "name": "Campbell, CA",
  "county": "Santa Clara County · where you live now",
  "coords": [
    37.2872,
    -121.95
  ],
  "tier": "home",
  "verified": "yes",
  "median": "$1,827,401 sold (Aug 2026) · $1,617,000 ACS value",
  "comfort": "$387k to buy the median · renting a 2BR at $3,272",
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
    "medianPrice": 1827401,
    "effTax": 0.013,
    "cityTax": 0,
    "taxState": "CA",
    "rent2br": 3272,
    "rentActual": 1150,
    "rentActualNote": "renting from family — well under market",
    "rent1br": 3245,
    "acsRent": 2737,
    "priceNote": "redfin.com median sold, Aug 2026",
    "rentNote": "HUD FMR FY2027 · FY2027, effective Oct 1 2026"
  },
  "workup": {
    "housing": [
      [
        "Median sold price",
        "$1,827,401 · Aug 2026 · redfin.com · City of Campbell proper (Redfin city page id 2673), all home types (single-family plus condo/townhome). Redfin median SALE price, all home types, -0.95% YoY; 79 homes sold in Aug 2026 vs 99 in Aug 2025; Compete Score 84 'very competitive' (2 offers on average). Fetched 2026-09-14 in the Browser pane."
      ],
      [
        "Second source",
        "$1,995,000 · Aug 2026 · sccaor.com. Santa Clara County Association of REALTORS monthly report (MLSListings), City of Campbell, Aug 2026: single-family 20 closed sales, avg DOM 25, average $2,260,607, MEDIAN $1,995,000, median $1,094/sq ft, 101% of list; condo/townhome 8 closed, DOM 17, median $1,106,188, $736/sq ft, 103% of list. Movoto shows a median sold of $1,488,000 with 196 sales and 111 days on market for Aug 2026 (https://www.movoto.com/campbell-ca/market-trends/), which is irreconcilable with the 28 MLS closings and is treated as a different geography; low confidence."
      ],
      [
        "Price per sq ft",
        "$948/sq ft · Aug 2026 · redfin.com. Redfin median sale price per sq ft, -7.8% YoY. SCCAOR single-family median $1,094/sq ft; condo/TH $736."
      ],
      [
        "Days on market",
        "24 days · 3 months ending Aug 2026 · redfin.com. Redfin: sell after 24 days vs 14 last year; pending in ~26 days, hot homes in ~8. SCCAOR avg DOM 25 (SFR), 17 (condo/TH)."
      ],
      [
        "Sale-to-list",
        "100.0% · Aug 2026 · redfin.com. Redfin, all home types, -1.4 pt YoY; SCCAOR 101% of list (SFR), 103% (condo/TH)."
      ],
      [
        "Active listings",
        "60 current listings (24 SFR + 36 condo/TH) · Aug 2026 · sccaor.com. SCCAOR 'Cur Inv' for Campbell; 18 new SFR + 14 new condo/TH listings in August."
      ],
      [
        "Year over year",
        "-0.95% · 3 months ending Aug 2026 vs same period 2025 · redfin.com."
      ],
      [
        "ACS median value (2020–2024)",
        "$1,617,000 · ACS 2020-2024 5-year · api.censusreporter.org. B25077, Campbell city (16000US0610345), release acs2024_5yr; unchanged from prior. B25064 median gross rent $2,737 (unchanged)."
      ],
      [
        "County median (sold)",
        "$1,534,863 · Aug 2026 · redfin.com. Santa Clara County, Redfin median sale price, all home types, -2.2% YoY; 965 homes sold in Aug 2026 (1,010 a year earlier); 19 days on market; $917/sq ft. SCCAOR county Aug 2026: single-family median $1,850,000 (624 sales, 103% of list), condo/TH median $850,000 (275 sales). County ACS 2020-2024 B25077 $1,490,600."
      ],
      [
        "Two-bedroom rent",
        "$3,272 · HUD FMR FY2027 · FY2027, effective Oct 1 2026 · huduser.gov. HUD Fair Market Rent, San Jose-Sunnyvale-Santa Clara, CA HUD Metro FMR Area (Santa Clara County), 2BR: FY2026 revised $3,483; FY2027 $3,272 (-6.1%). FY2027 0BR $2,458, 1BR $2,778, 3BR $4,396, 4BR $4,688."
      ],
      [
        "First-year property tax on the median",
        "$23,756/yr · uncapped on purchase. Arithmetic: $1,827,401 x 0.013 = $23,756 (prior rate); x 0.0125 = $22,843. Assessed value resets to the purchase price on sale (Prop 13), then grows at most 2%/yr."
      ],
      [
        "2026 inflation rate multiplier",
        "n/a - California, Prop 13 (assessed value growth capped at 2%/yr after purchase) · ."
      ],
      [
        "Home insurance",
        "$138/mo · 2026 · insurance.com. Insurance.com: California average $1,653/yr for $300,000 dwelling / $300,000 liability / $1,000 deductible; San Jose city figure $947/yr. A $300k dwelling limit is far below a Campbell rebuild, so this understates a real policy; Bankrate NOT FOUND (site redirects every fetch to its homepage). Low confidence."
      ],
      [
        "Car insurance, two cars",
        "$276/mo · updated Jun 3, 2026 · moneygeek.com. MoneyGeek: California full coverage $133/mo ($1,596/yr); San Jose $138/mo (minimum $65) for a 40-year-old with a clean record, good credit, 2012 Camry. Two cars = 2 x $138 = $276. The prior $493.50 came from Bankrate, whose driver profile prices higher; Bankrate NOT FOUND this round, so the drop is a methodology change, not a market move. Consider keeping the prior for baseline consistency."
      ],
      [
        "Power and heat",
        "$285/mo · Jan 2026 (combined); Mar 1, 2026 (electric) · yahoo.com. PG&E, quoted Dec 30, 2025: typical residential combined gas-and-electric bill about $285 in January 2026 (vs $295 in 2024 and 2025, $241 in 2023); January cut of $8/mo ($7 electric, $1 gas). PG&E Electric Rate Advisory effective Mar 1, 2026 (https://www.pge.com/assets/pge/docs/account/rate-plans/electric-rate-advisory-0326.pdf): average non-CARE residential electric bill at 500 kWh $203.54 (was $208.68 on Jan 1, 2026 and $219.72 on Sep 1, 2025); residential bundled non-CARE average rate 40.60 c/kWh. Heat: PG&E natural gas."
      ],
      [
        "Groceries (MIT food line)",
        "$769/mo · MIT 2026 (updated Feb 15, 2026) · livingwage.mit.edu. MIT Living Wage, Santa Clara County, food line for 2 adults (both working) 0 children: $9,232/yr = $769.33/mo. Unchanged from prior."
      ],
      [
        "What the median buys",
        "What ~$1.8M bought in September 2026 (Redfin 'recently sold' on the city page, fetched 2026-09-14): 2240 Wren Way, 3 bd / 2 ba, 1,538 sq ft, sold $1,575,000 on Sep 9, 2026 (at list, 5 days); 905 Sheila Ct, 3 bd / 2 ba, 1,326 sq ft, sold $1,950,000 on Sep 4, 2026 (3% over list, 34 days); 141 Orchard Oak Cir, 3 bd / 2.5 ba, 1,895 sq ft, $1,450,000 (3% under, 88 days). Condos run $555,000 for 2 bd / 1 ba, 903 sq ft (287 Watson Dr #2) to $1.4M for a new 1,678 sq ft townhome plan (279 Wagon Way). SCCAOR's single-family median for the month was $1,995,000 at $1,094/sq ft, i.e. a 1950s-60s 3/2 ranch of ~1,300-1,800 sq ft on a 5,000-7,000 sq ft lot. https://www.redfin.com/city/2673/CA/Campbell/housing-market"
      ],
      [
        "The market right now",
        "Still a seller's market, but cooler than a year ago: Redfin's Aug 2026 median of $1,827,401 is -0.95% YoY (the prior's July figure was $1,790,000, so August ticked up +2.1% month to month), price per square foot is down 7.8% to $948, days on market lengthened to 24 from 14, and sale-to-list eased 1.4 points to exactly 100%. August closings fell to 79 from 99. SCCAOR's single-family-only median for the city is much higher, $1,995,000 on 20 sales at 101% of list, because Redfin's all-types figure blends in condos ($1.1M median). County-wide the median is $1,534,863 (-2.2%) with homes gone in 19 days. Inventory is thin: 60 active listings in the whole city. Trajectory since 2020: Redfin's 5-year chart runs from roughly $1.4M to a 2022 peak above $2.0M and a plateau near $1.8M since."
      ],
      [
        "Owning it, all in",
        "This is the baseline row, so the relevant number is what staying and buying costs. At Freddie Mac's 6.76% (PMMS, Sep 10, 2026) with 20% down ($365,480, a jumbo loan of $1,461,921): P&I $9,492 + property tax $1,980 at the prior 1.3% ($1,904 at 1.25%) + insurance ~$138 = about $11,600/month before PG&E (~$285) and HOA. Prop 13 resets the assessed value to the purchase price and then caps growth at 2%/yr; there is no uncapping surprise beyond that reset. Renting the 2BR instead is $3,386-3,437 asking (Zumper/RentCafe) against a HUD FMR that falls from $3,483 to $3,272 on Oct 1, 2026, a sign asking rents in the metro have stopped rising. Campbell's sales tax is 10.5% (Measure A, unchanged from prior)."
      ],
      [
        "Not found this round",
        "Median list price (city and county); Campbell tax-rate-area total rate from the County Tax Rate Book (Cloudflare-gated); Bankrate 2026 California car and home insurance (site unfetchable; substitutes used); Apartments.com Campbell rent (403); Zillow Observed Rent Index / ZHVI (bot wall)"
      ],
      [
        "Checked",
        "2026-09-14 · https://www.redfin.com/city/2673/CA/Campbell/housing-market · https://www.sccaor.com/wp-content/uploads/2026/09/August2026.pdf · https://api.censusreporter.org/1.0/data/show/latest?table_ids=B25077,B25064&geo_ids=16000US2603000,16000US0610345,05000US26161,05000US06085 · https://www.redfin.com/county/345/CA/Santa-Clara-County/housing-market · https://www.zumper.com/rent-research/campbell-ca · https://www.insurance.com/california-homeowners-insurance · https://www.moneygeek.com/insurance/auto/average-cost-car-insurance-california/ · https://www.yahoo.com/news/articles/pg-e-rates-actually-going-223221336.html · https://livingwage.mit.edu/counties/06085"
      ]
    ],
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
    costs: {"utility": "Consumers Energy", "heatFuel": "natural gas", "winterHeat": 200.0, "summerBill": 25.0, "utilities": 263.27, "utilitiesNote": "Consumers Energy; electric $150.77, winter gas $200, summer $25", "internet": 40.0, "internetNote": "Xfinity 300 Mbps", "cell": "RootMetrics ranks Grand Rapids highly for speed and reliability, but local users report dead-zones on West Side, Ada, and Lowell", "carIns2": 238.17, "carInsNote": "MonitorBankRates avg $1,429/yr per car ($2,858/yr for 2 cars)", "gasPrice": 4.03, "groceries": 656.92, "groceryNote": "MIT Living Wage Calculator $7,883/yr for 2 adults", "groceryBasis": "MIT", "waterTrash": 110.0, "homeIns": 243.67, "extras": "City Special Assessments on summer tax bills; HOA fees $50-$150/mo in some subdivisions", "basketTotal": 1881.33, "sources": "eia.gov, bridgemi.com, xfinity.com, rootmetrics.com, monitorbankrates.com, aaa.com, mit.edu, grandrapidsmi.gov, insure.com"},
    money: {"medianPrice": 309795, "effTax": 0.0166, "cityTax": 0.015, "taxState": "MI", "countyPrice": 289900, "priceNote": "redfin.com median sold, Aug 2026", "rent2br": 1630, "rentNote": "HUD FMR FY2027 · FY2027 (effective Oct 1 2026)"},
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
    median: "$309,795 sold (Aug 2026) · $244,500 ACS value",
    comfort: "$91k in town · $87k in county",
    crime: "9.0 / 24.4–24.8",
    snow: '77.6"',
    fiber: "30% fiber · 99% cable",
    tax: "33.12 mills (1.66%) + 1.5% city income tax",
    drive: "≈208 mi · 3:31",
    workup: {
      "housing": [
        [
          "Median sold price",
          "$309,795 · Aug 2026 · redfin.com · Redfin 'Grand Rapids, MI' postal city (ZIPs 49503-49548): the city proper plus some Walker, Kentwood, Grand Rapids Twp/Cascade addresses that carry a Grand Rapids mailing address. Redfin median sale price, all home types, Aug 2026; +3.0% YoY; 688 homes sold in Aug 2026 (674 in Aug 2025); trailing 3-month median $310K"
        ],
        [
          "Second source",
          "$432,575 · Aug 2026 · grar.com. Greater Regional Alliance of REALTORS Comparative Activity Report, Kent County, Aug 2026: average home sale $432,575 (+1.5% YoY; YTD $422,764, +3.7%), 670 residential closed sales (-0.4%), avg DOM 21, 1,141 residential current listings, 1.7 months of inventory based on pending sales. GRAR publishes averages, not medians. Second alt: Redfin Kent County median sold $364,779 Aug 2026 (+2.5%, 707 sold, 8 days) https://www.redfin.com/county/1388/MI/Kent-County/housing-market"
        ],
        [
          "Median list price",
          "$399,900 · Aug 2026 · fred.stlouisfed.org. Realtor.com via FRED, Kent County, not the city: Jun $419,700 -> Jul $407,500 -> Aug $399,900. City-level list median NOT FOUND (Realtor.com blocked)."
        ],
        [
          "Price per sq ft",
          "$196/sq ft sold · 3 months to Aug 2026 · redfin.com. Redfin median sale $/sq ft, -3.7% YoY. Kent County list $/sq ft $215 Aug 2026 (FRED MEDLISPRIPERSQUFEE26081: Jun $221, Jul $218, Aug $215)"
        ],
        [
          "Days on market",
          "7 days (Redfin, to pending) · 3 months to Aug 2026 · redfin.com. Unchanged from 7 a year ago. Kent County median days on market 37 in Aug 2026 (FRED MEDDAYONMAR26081: Jun 32, Jul 36, Aug 37); GRAR Kent avg DOM 21 for Aug closed residential"
        ],
        [
          "Sale-to-list",
          "101.5% · Aug 2026 · redfin.com. -0.052 pt YoY; average home sells ~1% above list, hot homes ~5% above and pending in ~4 days; Redfin Compete Score 55 (somewhat competitive)"
        ],
        [
          "Active listings",
          "1,096 active listings (Kent County) · Aug 2026 · fred.stlouisfed.org. Realtor.com via FRED, county: Jun 889 -> Jul 954 -> Aug 1,096. GRAR Kent: 1,141 residential current listings, 1.7 months of inventory (pending basis), Aug 2026"
        ],
        [
          "Year over year",
          "+3.0% · Aug 2026 vs Aug 2025 (Redfin median sale price) · redfin.com."
        ],
        [
          "ACS median value (2020–2024)",
          "$244,500 · ACS 2020-2024 5-year (B25077), Grand Rapids city · api.censusreporter.org. Census ACS via the Census Reporter API (release acs2024_5yr). Median gross rent B25064 $1,266 ±$35."
        ],
        [
          "County median (sold)",
          "$364,779 · Aug 2026 · redfin.com. Kent County; Redfin median sale +2.5% YoY, 707 sold, 8 days, $202/sq ft. ACS 2020-2024 county value $289,900 ±$2,942 (rent $1,243 ±$18); FRED county list median $399,900 Aug 2026"
        ],
        [
          "Two-bedroom rent",
          "$1,630 · HUD FMR FY2027 · FY2027 (effective Oct 1 2026) · huduser.gov. Grand Rapids-Wyoming, MI HUD Metro FMR Area (Kent County). FY2026 was $1,531 (+6.5%). Zumper Grand Rapids Sep 2026 asking medians: 1BR $1,448 (flat YoY), 2BR $1,561 (+1%). ACS 2020-2024 median gross rent $1,266."
        ],
        [
          "Homestead millage",
          "33.1249 mills · 2025 · michigan.gov. Grand Rapids City / Grand Rapids Public Schools, principal-residence (PRE) total; non-PRE 51.1249. Confirmed on the Kent County 2025 Certified Property Tax Rates sheet (summer 31.1817 + winter 1.9432 = 33.1249) https://www.kentcountymi.gov/Archive.aspx?ADID=327. Other school districts inside the city: Kenowa Hills 33.9449, Godwin Heights 34.3949, Kentwood 34.8114, Grandville 35.6751, Caledonia 36.2749, Forest Hills 36.3132 PRE. Plus 1.5% resident city income tax (0.75% non-resident)."
        ],
        [
          "First-year property tax on the median",
          "$5,131/yr · uncapped on purchase. 309,795 x 0.5 x 33.1249 / 1000 = $5,131. First full year after uncapping; the seller's capped bill is lower. Add 1.5% city income tax on wages for residents."
        ],
        [
          "2026 inflation rate multiplier",
          "1.027 (2.7%) · michigan.gov. STC Bulletin 14 of 2025, Nov 18 2025 (fetched, ratio 1.027 on p.3); also printed on the City of Ludington 2026 millage sheet and computed as 311.547/319.9966 = 2.7% in the Glen Arbor Twp AOR Jan 2026"
        ],
        [
          "Home insurance",
          "$244/mo · 2026 (Insurance.com, updated 2026-02-24) · insurance.com. Michigan statewide. Fetched: Insurance.com $2,924/yr ($300K dwelling, $300K liability, $1K deductible; updated Feb 24 2026) = $243.67/mo; NerdWallet $2,415/yr ($400K dwelling; Mar 4 2026) = $201.25/mo. Bankrate (the brief's preferred source) shows $2,368/yr for $300K dwelling, rates refreshed Nov 2025 = $197.33/mo, but only in its search snippet: bankrate.com served its homepage to both WebFetch and the browser, so that figure is not verified on-page. City-level fetched figures: Insurance.com Grand Rapids $2,540/yr = $211.67/mo; NerdWallet Grand Rapids $2,315/yr = $192.92/mo."
        ],
        [
          "Car insurance, two cars",
          "$455/mo · 2026 (Insurify, updated 2026-09-13) · insurify.com. Michigan statewide full coverage, two cars = 2 x annual / 12. Fetched: Insurify $2,731/yr ($228/mo) -> $455.17; Experian $3,862/yr ($322/mo, Aug 2026 marketplace data, page dated Sep 9 2026) -> $643.67; MoneyGeek $1,652/yr ($138/mo, Aug 29 2026) -> $275.33. Bankrate $3,207/yr ($267/mo) -> $534.50 appears only in its search snippet (page not fetchable). Spread reflects PIP-level assumptions. Grand Rapids-specific: Insurify $208/mo per car (= $416/mo for two); MoneyGeek $123/mo per car."
        ],
        [
          "Power and heat",
          "$214/mo · electric: EIA 2024 avg consumption at Jun 2026 price; gas: EIA 2024 consumption at 2025 price · eia.gov. NOT a town-level figure. Arithmetic: EIA Table 5.A 2024 Michigan residential average 618 kWh/mo, 19.30 c/kWh, bill $119.31/mo; at the June 2026 Michigan residential price of 22.99 c/kWh (EIA EPM 5.6.A; 20.82 c in June 2025) 618 kWh = $142.08/mo. Gas: 2024 Michigan residential consumption 273,737 MMcf / 3,441,467 residential customers = 79.54 Mcf per customer per year x $10.92/Mcf (2025 annual average residential price) = $869/yr = $72.38/mo. Total $142.08 + $72.38 = $214.46 (or $191.69 using the 2024 electric bill). 2026 rate cases: Consumers Energy electric +6.1%, +$6.46/mo at 500 kWh from May 1 2026; DTE Electric +4.6%, ~$5/mo at 500 kWh from Mar 5 2026; DTE Gas +$74.52M (>4% residential) approved Sep 10 2026. Grand Rapids: Consumers Energy electric, DTE Gas natural gas heat. Prior town figure $263.27 stands if a town-level number is required; no town-level bill was found."
        ],
        [
          "Groceries (MIT food line)",
          "$657/mo · MIT 2026 (updated 2026-02-15) · livingwage.mit.edu. Kent County, 2 adults (both working), 0 children: food $7,883/yr. Unchanged from prior."
        ],
        [
          "What the median buys",
          "Redfin closings Jul-Sep 2026 near the $310K median: 1549 Griggs St SE, 2 bd/1 ba, 1,117 sq ft brick ranch, $286,200 (Aug 28); 1155 Northwood St NE, 4 bd/2 ba, 1,722 sq ft, $340,000 (Jul 24); 2840 Stonewood Ct NW, 3 bd/2 ba, 1,712 sq ft, $275,000 (Jul 16, cash sale, needs work); 3372 Evert St NW, 4 bd/1 ba, 1,358 sq ft, $280,000 (Sep 10, 2% over list, 21 days); 1749 Jefferson Ave SE, 3 bd/2 ba, 1,500 sq ft, $215,000 (Sep 11). Mostly pre-1960 stock; the east side (49506) runs $425K-$528K (1621 Woodcliff Ave SE 3/2 1,638 sq ft $425,000; 15 Auburn Ave SE 4/1.5 1,978 sq ft $528,000). Sources: https://www.redfin.com/city/8694/MI/Grand-Rapids/recently-sold and the housing-market page."
        ],
        [
          "The market right now",
          "Still the tightest of the four: 7 median days to pending, sale-to-list 101.5%, Compete Score 55, 688 August closings, and GRAR shows only 1.7 months of Kent County inventory. Growth has cooled to +3.0% YoY on the median with $/sq ft down 3.7%; the county list median has stepped down three months running ($419,700 to $399,900) and Realtor.com days on market rose from 32 to 37, so the seller's edge is thinning. Local brokerages describe August as balanced with homes selling at asking. Negligible second-home share. The postal-city median ($310K) sits well below the county ($365K) because the city proper is older and denser."
        ],
        [
          "Owning it, all in",
          "Uncapped first-year tax on the $309,795 median at 33.1249 PRE mills is about $5,131 (the seller's capped bill will be lower), plus the 1.5% resident city income tax on wages. Heat is natural gas (DTE Gas, which won a $74.52M increase on Sep 10 2026; Consumers Energy electric rose 6.1%/$6.46 a month on May 1 2026). Michigan transfer tax ($3.75 + $0.55 per $500 = 0.86%, about $2,664 here) is the seller's by default. At 6.76% (Freddie Mac PMMS, Sep 10 2026) with 20% down ($61,959), P&I on a $247,836 loan is about $1,609/mo; with ~$428/mo tax and ~$200-245/mo insurance the carry is roughly $2,240-2,280/mo before utilities."
        ],
        [
          "Not found this round",
          "city-proper (not postal) sold median; Realtor.com city list median and DOM (realtor.com refused both fetch paths); Zillow ZHVI/ZORI for Grand Rapids (press-and-hold bot check, not bypassed); Bankrate page content (homepage served to fetch and browser; snippet figures only); GRAR median sale price (report carries averages only); town-level power + heat bill"
        ],
        [
          "Checked",
          "2026-09-14 · https://www.redfin.com/city/8694/MI/Grand-Rapids/housing-market · https://www.grar.com/wp-content/uploads/2026/09/Kent-8-2026.pdf · https://fred.stlouisfed.org/series/MEDLISPRI26081 · https://api.censusreporter.org/1.0/data/show/acs2024_5yr?table_ids=B25077,B25064&geo_ids=16000US2634000,05000US26081,16000US2680340,05000US26055,16000US2649640,05000US26105,16000US2625980,16000US2632360,06000US2608932380,06000US2608926000,05000US26089 · https://www.redfin.com/county/1388/MI/Kent-County/housing-market · https://www.huduser.gov/portal/datasets/fmr/fmr2027/FY27_FMRs.xlsx · https://www.michigan.gov/taxes/-/media/Project/Websites/taxes/4029/Total-Rates-Reports/2025-Total-Rates.pdf · https://www.michigan.gov/treasury/-/media/Project/Websites/treasury/STC/Bulletins/2025/Bulletin-14-of-2025--Inflation-Rate-Multiplier-for-2026.pdf · https://www.insurance.com/michigan-homeowners-insurance · https://insurify.com/car-insurance/michigan/average-cost/ · https://www.eia.gov/electricity/sales_revenue_price/pdf/table_5A.pdf · https://livingwage.mit.edu/counties/26081"
        ]
      ],
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
    costs: {"utility": "DTE Energy", "heatFuel": "natural gas", "winterHeat": 200.0, "summerBill": 30.0, "utilities": 210.55, "utilitiesNote": "DTE Energy; electric $165/mo, winter gas $200/mo, summer gas $30/mo", "internet": 35.0, "internetNote": "AT&T Fiber 300 Mbps", "cell": "Verizon coverage is generally reliable in the area, though indoor dead zones can occur depending on building materials.", "carIns2": 616.0, "carInsNote": "Bankrate Detroit-Warren-Dearborn MSA avg $3,696/yr per car ($616/mo for 2 cars)", "gasPrice": 3.45, "groceries": 639.08, "groceryNote": "MIT Living Wage Calculator for Wayne County; $7,669/yr for 2 adults", "groceryBasis": "MIT", "waterTrash": 65.0, "homeIns": 241.33, "extras": "Residents may be subject to municipal special assessments for infrastructure (roads, drains) levied by the City of Belleville, and HOA fees depending on the specific subdivision.", "basketTotal": 2013.96, "sources": "dteenergy.com, energysage.com, att.com, verizon.com, bankrate.com, gasprices.aaa.com, livingwage.mit.edu, belleville.mi.us"},
    money: {"medianPrice": 328782, "effTax": 0.0246, "cityTax": 0, "taxState": "MI", "priceNote": "redfin.com median sold, Aug 2026", "countyPrice": 178500, "rent2br": 1459, "rentNote": "HUD FMR FY2027 · FY2027, effective Oct 1, 2026"},
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
    median: "$328,782 sold (Aug 2026) · $148,300 ACS value",
    comfort: "$100k in town · $74k in county",
    crime: "3.10 / 10.1–10.3",
    snow: '45"',
    fiber: "7% fiber · 97% cable",
    tax: "49.13 mills (2.46%) incl. an 11.25-mill special assessment; 37.88 base — Van Buren Twp 36.64",
    drive: "≈287 mi · 4:34",
    workup: {
      "housing": [
        [
          "Median sold price",
          "$328,782 · Aug 2026 · redfin.com · Redfin 'Belleville, MI' city page (all home types), 17 sales in Aug 2026: a narrow boundary approximating the 1. Redfin median sale price, all home types, +4.4% YoY; 17 homes sold in Aug 2026 (17 in Aug 2025); three-month median $329K; 39 days to pending (15 last year). Read via the browser pane 2026-09-14. n is small; use with the ZIP figure."
        ],
        [
          "Second source",
          "$329,857 · Aug 2026 · redfin.com. Redfin ZIP 48111 (Belleville city + Van Buren Twp + Sumpter Twp): -10.2% YoY, 130 homes sold in Aug 2026 (124 last year), 28 days to pending (25), sale-to-list 98.7% (-1.4 pt), $147/sq ft (-8.1%), Compete Score 54. Third source, same ZIP: Movoto 48111 median sold $310,000, 167 sales, 33 days, 212 active listings, 50 price cuts (https://www.movoto.com/mi/48111/market-trends/). Van Buren Township alone: Movoto 'Van Buren Twp' $169,900 on 7 sales in Aug 2026, 52 days (https://www.movoto.com/van-buren-twp-mi/market-trends/), too thin to use; no Redfin page exists for the township."
        ],
        [
          "Price per sq ft",
          "$163/sq ft · Aug 2026 · redfin.com. Redfin city page, +28.2% YoY (mix effect on 17 sales); ZIP 48111 $147, -8.1%."
        ],
        [
          "Days on market",
          "39 days · Aug 2026 · redfin.com. Redfin city page (15 days in Aug 2025); ZIP 48111 28 days; Movoto ZIP 33 days."
        ],
        [
          "Sale-to-list",
          "99.2% · Aug 2026 · redfin.com. Redfin city page, -2.3 pt YoY; Compete Score 76 'very competitive'. ZIP 48111: 98.7%."
        ],
        [
          "Active listings",
          "212 active listings (ZIP 48111) · as of Sept 14, 2026 · movoto.com. Movoto ZIP 48111 active listings, 12 new, 50 with price reductions."
        ],
        [
          "Year over year",
          "+4.4% (city page); -10.2% (ZIP 48111) · Aug 2026 vs Aug 2025 · redfin.com."
        ],
        [
          "ACS median value (2020–2024)",
          "$148,300 · ACS 2020-2024 5-year · data.census.gov. B25077 Belleville city (MOE +/-$30,251, a wide margin for a city of ~4,000). Van Buren charter township $269,700 (+/-$21,449): https://data.census.gov/table/ACSDT5Y2024.B25077?g=060XX00US2616381660. B25064 Belleville city median gross rent $1,079 (+/-$103): https://data.census.gov/table/ACSDT5Y2024.B25064?g=160XX00US2607020"
        ],
        [
          "County median (list)",
          "$159,900 · Aug 2026 · fred.stlouisfed.org. Wayne County median listing price (Realtor.com via FRED). ACS 2020-2024 Wayne County median value $178,500 (+/-$1,776): https://data.census.gov/table/ACSDT5Y2024.B25077?g=050XX00US26163. The prior's $194,800 county fallback is retired now that the city, ZIP and township are each sourced."
        ],
        [
          "Two-bedroom rent",
          "$1,459 · HUD FMR FY2027 · FY2027, effective Oct 1, 2026 · huduser.gov. Wayne County, Detroit-Warren-Livonia, MI HUD Metro FMR Area: 2BR $1,459 (FY2026 $1,411). Current asking: Zumper Belleville 2BR $1,229, 1BR $1,020 (Sept 14, 2026, https://www.zumper.com/rent-research/belleville-mi); ACS median gross rent $1,079."
        ],
        [
          "Homestead millage",
          "49.1341 mills · 2025 · michigan.gov. Belleville City (unit 822020) / Van Buren Public Schools, principal residence: 37.8841 mills before special assessments and 49.1341 mills in the Treasury's 'w/ Ad Valorem Special Assessment Millage' column, so 11.25 mills of ad valorem special assessment is billed on top; the prior's 37.88 omitted it. What the 11.25 mills funds is NOT FOUND on city pages (the assessor page lists no rates; the Belleville Independent's Jan 30, 2025 State of the City notes an advisory vote approving a public-safety millage increase, https://bellevilleareaindependent.com/city-of-belleville-state-of-the-city-2025/). Van Buren Township (unit 821100) / Van Buren Public Schools: 36.6391 mills, no special assessment. Non-homestead: city 67.1341, township 54.6391."
        ],
        [
          "First-year property tax on the median",
          "$8,077/yr · uncapped on purchase. City incl. assessment: $328,782 x 0.5 x 49.1341 / 1000 = $8,077 per year; city base rate only: x 37.8841 = $6,228; same house in Van Buren Township: x 36.6391 = $6,023. The city-vs-township gap is about $2,054 a year on this price."
        ],
        [
          "2026 inflation rate multiplier",
          "1.027 · detroitmi.gov. State Tax Commission Bulletin 14 of 2025 (Nov 18, 2025), read from the City of Detroit-hosted copy; the michigan.gov original returned 403 to the fetcher. 2026 capped value = (2025 taxable value - losses) x 1.027 + additions; the cap does not apply to a buyer's first year because the sale uncaps taxable value."
        ],
        [
          "Home insurance",
          "$241/mo · updated Aug 4, 2026 · insure.com. Michigan statewide average $2,896/yr for $300,000 dwelling, $100,000 liability, $1,000 deductible (Insure.com). Alternatives seen: MoneyGeek $2,195/yr = $182.92/mo for $250,000 dwelling (rates updated Sep 14, 2026, https://www.moneygeek.com/insurance/homeowners/average-cost-home-insurance-michigan/). Bankrate's $2,368/yr ($300K dwelling, refreshed Nov 2025) appeared only in a search snippet; bankrate.com returned 403 / redirected to its homepage on every fetch, so it is not used."
        ],
        [
          "Car insurance, two cars",
          "$456/mo · Aug 31, 2026 · insurify.com. Insurify Michigan average full-coverage quote $228/month per car x 2 cars = $456. Other 2026 statewide figures seen: MoneyGeek $138/mo per car, 100/300/100 with $1,000 deductible, updated Aug 29, 2026 (https://www.moneygeek.com/insurance/auto/average-cost-car-insurance-michigan/) = $276 for two; Experian marketplace $322/mo per car, Aug 2026 data (https://www.experian.com/blogs/ask-experian/average-cost-car-insurance-michigan/) = $644 for two. Bankrate ($3,207/yr full coverage) was visible only in a search snippet; the page itself was unreachable (403), so it is not used. Michigan PIP choice drives the spread."
        ],
        [
          "Power and heat",
          "$211/mo · MPSC Aug 1, 2026 rate comparison; DTE Gas order Sept 10, 2026 · michigan.gov. DTE Electric + DTE Gas, same basis as Detroit: DTE residential 24.35 c/kWh x 500 kWh = $121.75 (MPSC comparison dated Aug 1, 2026) plus DTE Gas typical 75 ccf customer, $2.87 = 3.34% increase from Oct 1, 2026 implies $88.80/month after (https://www.michigan.gov/mpsc/commission/news-releases/2026/09/10/mpsc-approves-dte-gas-co-infrastructure-investments). Benchmark usages, not a measured local average. Heat fuel: natural gas."
        ],
        [
          "Groceries (MIT food line)",
          "$639/mo · MIT 2026 (data dated Feb 15, 2026) · livingwage.mit.edu. Wayne County, 2 adults (both working), 0 children: $7,669/yr = $639.08/mo."
        ],
        [
          "What the median buys",
          "Redfin recently sold on the Belleville and 48111 pages (Sept 14, 2026): 590 Thornhill Ct, Belleville, 3 bd / 2.5 ba, 2,294 sq ft, $314,500 at list after 93 days; 28205 Elwell Rd, 4 bd / 2.5 ba, 2,037 sq ft, $380,000 at list, 42 days; 26996 Sumpter Rd, 3 bd / 2 ba, 1,820 sq ft, $250,000 (9% under list, 136 days); 6390 Briarcliff Dr, Van Buren Twp, 4 bd / 2.5 ba, 3,672 sq ft, $390,000; 10696 Van Buren Ln, 3 bd / 1 ba, 1,163 sq ft, $205,000. The median buys a 1990s-2000s 3-4 bedroom colonial or ranch of 1,800-2,300 sq ft in a subdivision; Belleville Lake frontage runs $500K+ (24294 Martinsville Rd sold 10% over list at $550,000; 47969 Merle Ct $525,000). https://www.redfin.com/city/1829/MI/Belleville/housing-market"
        ],
        [
          "The market right now",
          "The prior's 'sold data conflicts' is resolved: the Redfin city page ($328,782, 17 sales) and the Redfin 48111 ZIP page ($329,857, 130 sales) agree within $1,100 for August 2026, and Movoto's ZIP figure is $310,000; the earlier conflict came from mixing a $148K ACS value (city stock skews to older, smaller houses on the lake's south shore) with subdivision-heavy sold data. Direction is mixed: the city page is +4.4% YoY on a thin sample while the ZIP is -10.2% with price per square foot down 8.1%, and Movoto shows 50 of 212 listings cut. Homes still go pending in 28-39 days at 98.7-99.2% of list. Belleville Lake frontage carries the premium (two lake sales in September at $525K-550K); ordinary subdivision houses cluster $250K-390K. Since 2020 the ZIP median has risen from the low $200Ks."
        ],
        [
          "Owning it, all in",
          "On the $328,782 median with 20% down at 6.76%: P&I $1,708/month; first-year tax $8,077/yr ($673/mo) inside the city with the 11.25-mill assessment, or $6,023/yr ($502/mo) for the same house in Van Buren Township; insurance about $241/mo; total about $2,622/month in the city or $2,451 in the township, before utilities (~$211 DTE gas and electric) and $456 for two cars. No city income tax. Seller pays the 0.86% transfer tax. Check whether a listing is in the city or the township: the address says Belleville either way and the tax bill differs by roughly $2,054 a year."
        ],
        [
          "Not found this round",
          "listMedian; composition of the 11.25-mill Belleville special assessment; a usable Van Buren Township sold median (Movoto n=7 only); Zillow ZORI; Bankrate 2026 insurance pages; Realtor.com city page (fetcher blocked)"
        ],
        [
          "Checked",
          "2026-09-14 · https://www.redfin.com/city/1829/MI/Belleville/housing-market · https://www.redfin.com/zipcode/48111/housing-market · https://data.census.gov/table/ACSDT5Y2024.B25077?g=160XX00US2607020 · https://fred.stlouisfed.org/series/MEDLISPRI26163 · https://www.huduser.gov/portal/datasets/fmr/fmr2027/FY27_FMRs.xlsx · https://www.michigan.gov/taxes/-/media/Project/Websites/taxes/4029/Total-Rates-Reports/2025-Total-Rates.pdf · https://detroitmi.gov/sites/detroitmi.localhost/files/2026-01/Bulletin%2014%20of%202025-%20Inflation%20Rate%20Multiplier%20for%202026.pdf · https://www.insure.com/home-insurance/average-cost-of-homeowners-insurance-in-michigan/ · https://insurify.com/car-insurance/michigan/average-cost/ · https://www.michigan.gov/mpsc/-/media/Project/Websites/mpsc/consumer/electric/rates1.pdf · https://livingwage.mit.edu/counties/26163"
        ]
      ],
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
    costs: {"utility": "Consumers Energy", "heatFuel": "natural gas", "winterHeat": 140.0, "summerBill": 25.0, "utilities": 243, "utilitiesNote": "Consumers Energy; winter gas $140, summer $25", "internet": 84.99, "internetNote": "Spectrum 300 Mbps", "cell": "Verizon offers strong and reliable coverage throughout Frankenmuth with no major known dead zones.", "carIns2": 521.83, "carInsNote": "Bankrate MI avg $3,131/yr per car", "gasPrice": 3.96, "groceries": 603.33, "groceryNote": "MIT Living Wage Calculator for Saginaw County ($7,240/yr for 2 adults)", "groceryBasis": "MIT", "waterTrash": 80.0, "homeIns": 241.33, "extras": "Municipal special assessments for police and fire added to winter property tax bill; HOAs standard for condos but uncommon for single-family homes.", "basketTotal": 2012.08, "sources": "eia.gov, consumersenergy.com, spectrum.com, verizon.com, bankrate.com, gasprices.aaa.com, livingwage.mit.edu, frankenmuthcity.com, valuepenguin.com"},
    money: {"medianPrice": 339775, "effTax": 0.0201, "cityTax": 0, "taxState": "MI", "countyPrice": 152800, "priceNote": "redfin.com median sold, Aug 2026", "rent2br": 1141, "rentNote": "HUD FMR FY2027 · FY2027, effective Oct 1, 2026"},
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
    median: "$339,775 sold (Aug 2026) · $300,500 ACS value",
    comfort: "$99k in town · $68k in county",
    crime: "2.3–2.9 / 6.5–7.4",
    snow: '44"',
    fiber: "10% fiber · 76% cable",
    tax: "40.28 mills (2.01%, incl. 5-mill assessment)",
    drive: "≈330 mi · 4:55",
    workup: {
      "housing": [
        [
          "Median sold price",
          "$339,775 · Aug 2026 · redfin.com · Redfin 'Frankenmuth, MI' city page (all home types). Redfin median sale price, all home types, +3.0% YoY; 22 homes sold in Aug 2026 (19 in Aug 2025); three-month median $340K. Page read via the browser pane on 2026-09-14."
        ],
        [
          "Second source",
          "$355,000 · Aug 2026 · movoto.com. Movoto median sold price; 45 homes sold in Aug 2026 (29 a year earlier), 51 days on market (26 last year). Movoto's 'Frankenmuth, MI' count is larger than Redfin's, so its area is wider still."
        ],
        [
          "Price per sq ft",
          "$150/sq ft · Aug 2026 · redfin.com. Redfin median sale price per sq ft, down 11.2% YoY."
        ],
        [
          "Days on market",
          "12 days · Aug 2026 · redfin.com. Redfin median days on market (6 days in Aug 2025). Movoto shows 51 days for its wider area."
        ],
        [
          "Sale-to-list",
          "97.5% · Aug 2026 · redfin.com. Redfin sale-to-list, down 2.7 pt YoY; average home sells about 2% below list; Redfin Compete Score 76 'very competitive'."
        ],
        [
          "Active listings",
          "43 active listings · as of Sept 14, 2026 · movoto.com. Movoto active listings, 4 new listings."
        ],
        [
          "Year over year",
          "+3.0% · Aug 2026 vs Aug 2025 · redfin.com."
        ],
        [
          "ACS median value (2020–2024)",
          "$300,500 · ACS 2020-2024 5-year · data.census.gov. B25077 median value of owner-occupied units, Frankenmuth city (MOE +/-$20,567). B25064 median gross rent $851 (+/-$111): https://data.census.gov/table/ACSDT5Y2024.B25064?g=160XX00US2630200"
        ],
        [
          "County median (list)",
          "$159,900 · Aug 2026 · fred.stlouisfed.org. Saginaw County median listing price (Realtor.com via FRED), Jul 2026 $147,450. ACS 2020-2024 county median value $152,800 (+/-$2,921): https://data.census.gov/table/ACSDT5Y2024.B25077?g=050XX00US26145"
        ],
        [
          "Two-bedroom rent",
          "$1,141 · HUD FMR FY2027 · FY2027, effective Oct 1, 2026 · huduser.gov. Saginaw, MI MSA (Saginaw County): 0BR $795, 1BR $893, 2BR $1,141, 3BR $1,466, 4BR $1,500. FY2026 2BR was $1,117 (https://www.huduser.gov/portal/datasets/fmr/fmr2026/FY26_FMRs.xlsx). Current asking: Zumper Frankenmuth 2BR $995, 1BR $889, rolling 30-day as of Sept 14, 2026 (https://www.zumper.com/rent-research/frankenmuth-mi)."
        ],
        [
          "Homestead millage",
          "40.2846 mills · 2025 · michigan.gov. Frankenmuth City (unit 732010) / Frankenmuth School District, principal residence: 35.2846 mills before special assessments, 40.2846 mills in the 'w/ Ad Valorem Special Assessment Millage' column. The 5.0000-mill difference is the police-and-fire Special Assessment District the city adopted in 2024 while cutting general operating millage from 9.75 to 4.75 mills (https://frankenmuthcity.com/news_detail_T6_R170.php). Prior's 40.28 confirmed. Non-homestead 58.2846."
        ],
        [
          "First-year property tax on the median",
          "$6,844/yr · uncapped on purchase. $339,775 x 0.5 x 40.2846 / 1000 = $6,844 per year ($5,994 without the 5-mill SAD). First full year after purchase, taxable value uncapped to 50% of price; ignores the 1% administration fee already inside the Treasury rate."
        ],
        [
          "2026 inflation rate multiplier",
          "1.027 · detroitmi.gov. State Tax Commission Bulletin 14 of 2025 (Nov 18, 2025), read from the City of Detroit-hosted copy; the michigan.gov original returned 403 to the fetcher. 2026 capped value = (2025 taxable value - losses) x 1.027 + additions; the cap does not apply to a buyer's first year because the sale uncaps taxable value."
        ],
        [
          "Home insurance",
          "$241/mo · updated Aug 4, 2026 · insure.com. Michigan statewide average $2,896/yr for $300,000 dwelling, $100,000 liability, $1,000 deductible (Insure.com). Alternatives seen: MoneyGeek $2,195/yr = $182.92/mo for $250,000 dwelling (rates updated Sep 14, 2026, https://www.moneygeek.com/insurance/homeowners/average-cost-home-insurance-michigan/). Bankrate's $2,368/yr ($300K dwelling, refreshed Nov 2025) appeared only in a search snippet; bankrate.com returned 403 / redirected to its homepage on every fetch, so it is not used."
        ],
        [
          "Car insurance, two cars",
          "$456/mo · Aug 31, 2026 · insurify.com. Insurify Michigan average full-coverage quote $228/month per car x 2 cars = $456. Other 2026 statewide figures seen: MoneyGeek $138/mo per car, 100/300/100 with $1,000 deductible, updated Aug 29, 2026 (https://www.moneygeek.com/insurance/auto/average-cost-car-insurance-michigan/) = $276 for two; Experian marketplace $322/mo per car, Aug 2026 data (https://www.experian.com/blogs/ask-experian/average-cost-car-insurance-michigan/) = $644 for two. Bankrate ($3,207/yr full coverage) was visible only in a search snippet; the page itself was unreachable (403), so it is not used. Michigan PIP choice drives the spread."
        ],
        [
          "Power and heat",
          "$243/mo · 2026 rate-case pages, read Sept 14, 2026 · consumersenergy.com. Consumers Energy serves both electric and gas here. The utility states an average residential electric bill of $155/month (a $13, 9% increase is pending, decision by Apr 2027) and an average residential gas bill of $88/month (a $7.21, 8.2% increase is pending, decision by Oct 2026): $155 + $88 = $243. Cross-checks: MPSC comparison of average rates dated Aug 1, 2026 puts Consumers residential at 25.35 c/kWh at 500 kWh ($126.75) and 24.42 c/kWh at 1,000 kWh (https://www.michigan.gov/mpsc/-/media/Project/Websites/mpsc/consumer/electric/rates1.pdf); EIA 2024 Michigan average residential bill $119.31 at 618 kWh (https://www.eia.gov/electricity/sales_revenue_price/pdf/table_5a.pdf); EIA Michigan residential gas price $19.72/Mcf in Jun-Jul 2026 vs $10.02 in Jan 2026 (https://www.eia.gov/dnav/ng/hist/n3010mi3m.htm). Heat fuel: natural gas."
        ],
        [
          "Groceries (MIT food line)",
          "$603/mo · MIT 2026 (data dated Feb 15, 2026) · livingwage.mit.edu. Saginaw County, food line for 2 adults (both working), 0 children: $7,240/yr = $603.33/mo."
        ],
        [
          "What the median buys",
          "Redfin's recently-sold list on the Frankenmuth page (read Sept 14, 2026): 5 Mary Lane Ct, 4 bd / 1.5 ba, 2,908 sq ft, sold $339,000 on Sept 4, 2026 (listed $349,900, 122 days on market); 9112 E Curtis Rd, 3 bd / 1.5 ba, 1,632 sq ft, $315,000 (Aug 31); 11248 Roedel Rd, 4 bd / 1.5 ba, 3,400 sq ft, $359,900 at list (33 days); 399 Keinath Dr, 3 bd / 3 ba, 2,842 sq ft, $420,000 at list. The median buys a 1970s-90s 3-4 bedroom ranch or two-story of 1,600-2,900 sq ft; anything under $320K is going in about two weeks. https://www.redfin.com/city/7699/MI/Frankenmuth/housing-market"
        ],
        [
          "The market right now",
          "Small, tight market: Redfin counts 22 sales in August and rates it 'very competitive' (Compete Score 76) with a 12-day median time to pending, though sale-to-list slipped 2.7 pt to 97.5% and price per square foot fell 11.2% YoY, so buyers are paying up for larger houses rather than paying more per foot. Median sold $339,775 is up 3.0% YoY on Redfin and $355,000 on Movoto's wider area; Movoto also shows time on market doubling (26 to 51 days) and sales up from 29 to 45, i.e. more listings clearing more slowly outside the village core. Inventory is thin at 43 active listings. The county backdrop is far cheaper (Saginaw County list median $159,900), so Frankenmuth carries roughly a 2x premium over its county. No meaningful seasonal or waterfront share; it is a year-round bedroom community for Saginaw and Bay City."
        ],
        [
          "Owning it, all in",
          "On the $339,775 median with 20% down at 6.76% (PMMS Sept 10, 2026) principal and interest is $1,765/month. Add first-year uncapped tax $6,844/yr ($570/mo, the seller's advertised bill will be lower because their taxable value was capped) and home insurance about $241/mo, for roughly $2,576/month before utilities (~$243 on Consumers gas and electric) and $456 for two cars. No city income tax. Buyer closing costs are lender and title fees only; Michigan's 0.86% transfer tax (0.75% state + 0.11% county) is paid by the seller. The 5-mill public-safety assessment is billed like a tax and shows on the same bill."
        ],
        [
          "Not found this round",
          "listMedian (city level); Zillow ZORI (zillow.com not fetchable); Bankrate 2026 insurance pages (403 on every route; snippets only); city-proper sold median distinct from the postal area"
        ],
        [
          "Checked",
          "2026-09-14 · https://www.redfin.com/city/7699/MI/Frankenmuth/housing-market · https://www.movoto.com/frankenmuth-mi/market-trends/ · https://data.census.gov/table/ACSDT5Y2024.B25077?g=160XX00US2630200 · https://fred.stlouisfed.org/series/MEDLISPRI26145 · https://www.huduser.gov/portal/datasets/fmr/fmr2027/FY27_FMRs.xlsx · https://www.michigan.gov/taxes/-/media/Project/Websites/taxes/4029/Total-Rates-Reports/2025-Total-Rates.pdf · https://detroitmi.gov/sites/detroitmi.localhost/files/2026-01/Bulletin%2014%20of%202025-%20Inflation%20Rate%20Multiplier%20for%202026.pdf · https://www.insure.com/home-insurance/average-cost-of-homeowners-insurance-in-michigan/ · https://insurify.com/car-insurance/michigan/average-cost/ · https://www.consumersenergy.com/residential/account-and-billing/rates/rate-case · https://livingwage.mit.edu/counties/26145"
        ]
      ],
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
    costs: {"utility": "Traverse City Light & Power / Consumers Energy", "heatFuel": "natural gas", "winterHeat": 88.0, "summerBill": 113.0, "utilities": 157.0, "utilitiesNote": "TCLP electric $113/mo; Consumers Energy winter gas $88, summer $0 (summer bill $113, winter bill $201)", "internet": 40.0, "internetNote": "Spectrum up to 500 Mbps", "cell": "Strong 4G/5G in main areas; dead zones near East Bay, airport, and wooded/hilly terrain outside city limits", "carIns2": 521.83, "carInsNote": "Bankrate MI state avg $3,131/yr per car ($6,262/yr for 2 cars)", "gasPrice": 3.98, "groceries": 658.67, "groceryNote": "MIT Living Wage Calculator for 2 working adults in Grand Traverse County ($7,904/yr)", "groceryBasis": "MIT", "waterTrash": 93.54, "homeIns": 243.67, "extras": "$0.90/month BEACON endpoint technology fee on water bill; private seasonal snow removal services", "basketTotal": 1997.51, "sources": "utility-rates.com, consumersenergy.com, spectrum.com, verizon.com, bankrate.com, gasprices.aaa.com, livingwage.mit.edu, traversecitymi.gov"},
    money: {"medianPrice": 484679, "effTax": 0.0185, "cityTax": 0, "taxState": "MI", "countyPrice": 339400, "priceNote": "redfin.com median sold, Aug 2026", "rent2br": 1436, "rentNote": "HUD FMR FY2027 · FY2027 (effective Oct 1 2026)"},
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
    median: "$484,679 sold (Aug 2026) · $415,400 ACS value",
    comfort: "$121k in town · $98k in county",
    crime: "2.8–3.2 / 9.9–12.9",
    snow: '101"',
    fiber: "0.3% fiber · 90% cable",
    tax: "37.07 mills city proper (1.85%) — the oft-quoted 26.8 is Acme Twp",
    drive: "≈350 mi · 5:57",
    workup: {
      "housing": [
        [
          "Median sold price",
          "$484,679 · Aug 2026 · redfin.com · Redfin 'Traverse City, MI' = postal area (ZIPs 49684, 49685, 49686, 49696) spanning the city proper and Garfield, East Bay, Long Lake, Peninsula and Blair townships (Grand Traverse Co. Redfin median sale price, all home types, Aug 2026; +19.7% YoY; 122 homes sold in Aug 2026 (123 in Aug 2025); trailing 3-month median $485K"
        ],
        [
          "Second source",
          "$420,000 · H1 2026 · oltersdorf.com. Oltersdorf Realty (local brokerage, MLS data): Grand Traverse County H1 2026 median $420,000, average $485,836, 571 sales (652 in H1 2025), dollar volume $277.4M (from $335.1M). Movoto 'Traverse City' Aug 2026 median sold $485,000 on 1,205 sales (region-wide count), DOM 124, 1,077 active https://www.movoto.com/traverse-city-mi/market-trends/. Zillow ZHVI Traverse City (modeled) $446,706, +1.9% YoY, updated 8/31/2026 https://www.zillow.com/home-values/41271/traverse-city-mi/. Aspire North REALTORS monthly report pages for 2026 could not be fetched."
        ],
        [
          "Median list price",
          "$545,000 · Aug 2026 · fred.stlouisfed.org. Realtor.com via FRED, county: Jun $553,750 -> Jul $562,500 -> Aug $545,000. Traverse City CBSA (Grand Traverse, Leelanau, Benzie, Kalkaska): Jun $567,875 -> Jul $588,725 -> Aug $550,000 https://fred.stlouisfed.org/series/MEDLISPRI45900. City-level NOT FOUND."
        ],
        [
          "Price per sq ft",
          "$358/sq ft sold · 3 months to Aug 2026 · redfin.com. Redfin median sale $/sq ft, +2.7% YoY. CBSA list $/sq ft $326 Aug 2026 (FRED MEDLISPRIPERSQUFEE45900: Jun $324, Jul $332, Aug $326); county sold $260/sq ft (+4.0%)."
        ],
        [
          "Days on market",
          "49 days (Redfin) · 3 months to Aug 2026 · redfin.com. 51 a year ago. Grand Traverse County median days on market 52 in Aug 2026 (FRED MEDDAYONMAR26055: Jun 39, Jul 44, Aug 52)."
        ],
        [
          "Sale-to-list",
          "98.7% · Aug 2026 · redfin.com. +0.1 pt YoY; average home sells ~2% below list and goes pending in ~52 days; hot homes at about list in ~30 days; Compete Score 59"
        ],
        [
          "Active listings",
          "485 active listings (Grand Traverse County) · Aug 2026 · fred.stlouisfed.org. Realtor.com via FRED: Apr 298 -> May 374 -> Jul 495 -> Aug 485."
        ],
        [
          "Year over year",
          "+19.7% · Aug 2026 vs Aug 2025 (Redfin median sale price) · redfin.com."
        ],
        [
          "ACS median value (2020–2024)",
          "$415,400 · ACS 2020-2024 5-year (B25077), Traverse City city · api.censusreporter.org. Census ACS via the Census Reporter API. Median gross rent B25064 $995 ±$97."
        ],
        [
          "County median (sold)",
          "$504,063 · Aug 2026 · redfin.com. Grand Traverse County; Redfin median sale +20.6% YoY on 148 sales (203 last year), 53 days (58), $260/sq ft. ACS 2020-2024 county value $339,400 ±$8,651 (rent $1,288 ±$65)."
        ],
        [
          "Two-bedroom rent",
          "$1,436 · HUD FMR FY2027 · FY2027 (effective Oct 1 2026) · huduser.gov. Grand Traverse County, MI HUD Metro FMR Area. FY2026 was $1,357 (+5.8%). Zumper Traverse City Sep 2026 asking medians: 1BR $1,193 (-12%), 2BR $1,745 (-2%). ACS median gross rent $995."
        ],
        [
          "Homestead millage",
          "37.0733 mills · 2025 · michigan.gov. Traverse City city / Traverse City Area Public Schools, PRE total; non-PRE 55.0733. Grand Traverse County's 2025 Total Millages Report lists the city at 33.5222 summer + 4.1553 winter = 37.6775 homestead (56.6612 non-homestead) with a 1.5879 DDA assessment where applicable https://www.garfieldmi.gov/download/71337/2025-millage-rates.pdf. Townships (TCAPS, PRE): Garfield 26.6921, East Bay 26.7916, Acme 26.8157, Long Lake 25.3866, Peninsula 27.2460, Blair 26.6495."
        ],
        [
          "First-year property tax on the median",
          "$8,984/yr · uncapped on purchase. 484,679 x 0.5 x 37.0733 / 1000 = $8,984 inside the city (at the county sheet's 37.6775: $9,131). Same price in Garfield Twp (26.6921): $6,469."
        ],
        [
          "2026 inflation rate multiplier",
          "1.027 (2.7%) · michigan.gov. STC Bulletin 14 of 2025, Nov 18 2025 (fetched, ratio 1.027 on p.3); also printed on the City of Ludington 2026 millage sheet and computed as 311.547/319.9966 = 2.7% in the Glen Arbor Twp AOR Jan 2026"
        ],
        [
          "Home insurance",
          "$244/mo · 2026 (Insurance.com, updated 2026-02-24) · insurance.com. Michigan statewide. Fetched: Insurance.com $2,924/yr ($300K dwelling, $300K liability, $1K deductible; updated Feb 24 2026) = $243.67/mo; NerdWallet $2,415/yr ($400K dwelling; Mar 4 2026) = $201.25/mo. Bankrate (the brief's preferred source) shows $2,368/yr for $300K dwelling, rates refreshed Nov 2025 = $197.33/mo, but only in its search snippet: bankrate.com served its homepage to both WebFetch and the browser, so that figure is not verified on-page."
        ],
        [
          "Car insurance, two cars",
          "$455/mo · 2026 (Insurify, updated 2026-09-13) · insurify.com. Michigan statewide full coverage, two cars = 2 x annual / 12. Fetched: Insurify $2,731/yr ($228/mo) -> $455.17; Experian $3,862/yr ($322/mo, Aug 2026 marketplace data, page dated Sep 9 2026) -> $643.67; MoneyGeek $1,652/yr ($138/mo, Aug 29 2026) -> $275.33. Bankrate $3,207/yr ($267/mo) -> $534.50 appears only in its search snippet (page not fetchable). Spread reflects PIP-level assumptions."
        ],
        [
          "Power and heat",
          "$214/mo · electric: EIA 2024 avg consumption at Jun 2026 price; gas: EIA 2024 consumption at 2025 price · eia.gov. NOT a town-level figure. Arithmetic: EIA Table 5.A 2024 Michigan residential average 618 kWh/mo, 19.30 c/kWh, bill $119.31/mo; at the June 2026 Michigan residential price of 22.99 c/kWh (EIA EPM 5.6.A; 20.82 c in June 2025) 618 kWh = $142.08/mo. Gas: 2024 Michigan residential consumption 273,737 MMcf / 3,441,467 residential customers = 79.54 Mcf per customer per year x $10.92/Mcf (2025 annual average residential price) = $869/yr = $72.38/mo. Total $142.08 + $72.38 = $214.46 (or $191.69 using the 2024 electric bill). 2026 rate cases: Consumers Energy electric +6.1%, +$6.46/mo at 500 kWh from May 1 2026; DTE Electric +4.6%, ~$5/mo at 500 kWh from Mar 5 2026; DTE Gas +$74.52M (>4% residential) approved Sep 10 2026. Traverse City: natural gas heat (DTE Gas), Consumers Energy or Traverse City Light & Power electric depending on address. Prior town figure $157 stands if a town-level number is required; none found."
        ],
        [
          "Groceries (MIT food line)",
          "$659/mo · MIT 2026 (updated 2026-02-15) · livingwage.mit.edu. Grand Traverse County, 2 adults (both working), 0 children: food $7,904/yr. Unchanged from prior."
        ],
        [
          "What the median buys",
          "Redfin closings Jul-Sep 2026 near the $485K median: 2722 Ruby St (49684, in town), 3 bd/2.5 ba, 2,261 sq ft, $425,000 (Sep 10, at list, 36 days); 6109 Dover Ln (49685, Garfield/Long Lake), 3 bd/2 ba, 1,961 sq ft, $454,000 (Sep 11, 1% under, 52 days); 10062 E Claremont Dr (Elmwood Twp, on the TART trail), 3 bd/2 ba, 1,444 sq ft one-owner ranch, $427,500 (Jul 31); 7128 S Whispering Hills Dr, 3 bd/2 ba, 1,610 sq ft, $487,500; 18706 Cedar Run Rd, 3 bd/2 ba, 1,832 sq ft ranch, $528,000 (Jun 29). Entry level: 5266 Brown Bridge Rd (East Bay), 2 bd/1 ba, 864 sq ft, $299,000. West Bay and Lake Leelanau frontage $1.2M-$2.0M. Sources: https://www.redfin.com/city/20162/MI/Traverse-City/recently-sold and the housing-market page."
        ],
        [
          "The market right now",
          "Prices re-accelerated: the postal-area median is up 19.7% YoY to $484,679 and the county 20.6% to $504,063, even as the county list median slipped from $562,500 (Jul) to $545,000 (Aug) and Realtor.com days on market lengthened from 39 (Jun) to 52. Sale-to-list 98.7% with Compete Score 59: negotiable but not soft. County closings fell from 203 to 148 in August and H1 sales fell 12% (652 to 571), so part of the median gain is mix toward waterfront and new construction. County inventory (485 active) is up about 60% since April. Longer run, the five-county median went from roughly $255K (June 2019) and $309K (June 2021) to $432,500 (June 2025) and $475,000 (June 2026, Aspire North figure seen only in search summaries)."
        ],
        [
          "Owning it, all in",
          "Uncapped first-year tax on the $484,679 median at 37.0733 city mills is about $8,984/yr ($749/mo); the same house in Garfield Township would be about $6,469, which is why 'Traverse City' addresses outside the city line are cheaper to own. Natural gas heat (DTE Gas, which won a >4% residential increase on Sep 10 2026). Michigan transfer tax 0.86% (about $4,168) is the seller's. At 6.76% (Freddie Mac, Sep 10 2026) with 20% down ($96,936), P&I on $387,743 is about $2,517/mo; with ~$749/mo tax and ~$200-245/mo insurance the carry is roughly $3,470-3,510/mo before utilities. Two-bedroom asking rent (Zumper $1,745) runs well above the FY2027 FMR ($1,436)."
        ],
        [
          "Not found this round",
          "city-proper sold median (only the postal area; a Downtown Traverse City neighborhood figure of $515K, +12.2%, 3 months to Aug 2026, appeared in a Redfin search snippet at https://www.redfin.com/neighborhood/763044/MI/Traverse-City/Downtown-Traverse-City/housing-market but was not fetched); Aspire North REALTORS 2026 monthly report page (Feb and June 2026 figures surfaced only in search summaries without a fetchable URL); Realtor.com city page (blocked); Zillow rent index (bot check); Apartments.com (403); Bankrate page content; town-level power + heat bill"
        ],
        [
          "Checked",
          "2026-09-14 · https://www.redfin.com/city/20162/MI/Traverse-City/housing-market · https://www.oltersdorf.com/blog/2026/7/15/2026-home-sales-data-mid-year-review-for-leelanau-amp-grand-traverse · https://fred.stlouisfed.org/series/MEDLISPRI26055 · https://api.censusreporter.org/1.0/data/show/acs2024_5yr?table_ids=B25077,B25064&geo_ids=16000US2634000,05000US26081,16000US2680340,05000US26055,16000US2649640,05000US26105,16000US2625980,16000US2632360,06000US2608932380,06000US2608926000,05000US26089 · https://www.redfin.com/county/1375/MI/Grand-Traverse-County/housing-market · https://www.huduser.gov/portal/datasets/fmr/fmr2027/FY27_FMRs.xlsx · https://www.michigan.gov/taxes/-/media/Project/Websites/taxes/4029/Total-Rates-Reports/2025-Total-Rates.pdf · https://www.michigan.gov/treasury/-/media/Project/Websites/treasury/STC/Bulletins/2025/Bulletin-14-of-2025--Inflation-Rate-Multiplier-for-2026.pdf · https://www.insurance.com/michigan-homeowners-insurance · https://insurify.com/car-insurance/michigan/average-cost/ · https://www.eia.gov/electricity/sales_revenue_price/pdf/table_5A.pdf · https://livingwage.mit.edu/counties/26055"
        ]
      ],
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
    money: {"medianPrice": 480000, "effTax": 0.0168, "cityTax": 0, "taxState": "MI", "countyPrice": 315700, "priceNote": "redfin.com median sold, 3 months ending Aug 2026 (Redfin rolling window)", "rent2br": 1336, "rentNote": "HUD FMR FY2027 · FY2027, effective Oct 1, 2026"},
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
    median: "$480,000 sold (3 months ending Aug 2026 (Redfin rolling window)) · $364,100 ACS value",
    comfort: "$116k in town · $90k in county",
    crime: "1.2–1.5 / 5.7–6.4",
    snow: '123.6"',
    fiber: "44% fiber · 69% cable",
    tax: "33.63 mills (1.68%)",
    drive: "≈394 mi · 6:03",
    workup: {
      "housing": [
        [
          "Median sold price",
          "$480,000 · 3 months ending Aug 2026 (Redfin rolling window) · redfin.com · Redfin 'Petoskey, MI' city page, which behaves like the 49770 postal area (its sales list includes Vantage View Dr and Lakeside Dr N in Bear Creek/Resort townships). Redfin, all home types: '$480K over the last 3 months, down 35.0% since the same period last year'. August-only card: $749K (-1.4% YoY), Total Homes Sold 4, $217/sq ft (+21.9%), 4.9% under list. The -35% is against a summer-2025 window that carried Bay Harbor closings. Page read in the Browser pane 2026-09-14 (title 'as of August')."
        ],
        [
          "Second source",
          "$509,779 · Aug 2026 (Redfin chart point, 3-month rolling) · redfin.com. Redfin ZIP 49770: $509,779, -12.4% YoY, 16 homes sold in August (9 last year), 29 median days on market (37 last year), $222/sq ft (-5.9%), sale-to-list 98.3%, Compete Score 74 'very competitive'. Emmet County (Redfin): $452K 3-mo, 17 sold in August, 36 DOM. No Rocket/Realtor.com page reachable."
        ],
        [
          "Median list price",
          "$1,145,000 · Aug 2026 · econdata.s3-us-west-2.amazonaws.com. Realtor.com Research ZIP 49770: median listing price $1,145,000 (+14.6% YoY), 208 active, 65 DOM, $502/sq ft, median 2,875 sq ft, 17.2% price-reduced. Bay Harbor listings dominate the ZIP's list median; the sold medians above are a fifth to half of it."
        ],
        [
          "Price per sq ft",
          "$222/sq ft · Aug 2026 · redfin.com. Redfin ZIP 49770 sale $/sq ft (-5.9% YoY); city page $217 (+21.9%); Emmet County $262 (-22.8%)."
        ],
        [
          "Days on market",
          "29 days · Aug 2026 · redfin.com. Redfin ZIP 49770 median 29 days (37 last year); Emmet County 36 (71 last year). City card shows '1', an artifact of n=4."
        ],
        [
          "Sale-to-list",
          "98.3% · Aug 2026 · redfin.com. Redfin ZIP 49770 sale-to-list 98.3%, +0.1 pt YoY; 'hot homes can sell for about 5% above list price and go pending in around 6 days'. City card: 4.9% under list; county: 3.2% under list."
        ],
        [
          "Active listings",
          "208 active listings · Aug 2026 · econdata.s3-us-west-2.amazonaws.com. Realtor.com ZIP 49770 active count; Emmet County 383 active, 84 new listings in August (county file)."
        ],
        [
          "Year over year",
          "-35.0% (city, 3-mo) / -12.4% (ZIP 49770) / -3.0% (county) · 3 months ending Aug 2026 vs same period 2025 · redfin.com. Redfin. Realtor.com county list median flat (-0.03% YoY at $749,000). Mix shift away from Bay Harbor closings, not a price collapse: $/sq ft rose on the city page."
        ],
        [
          "ACS median value (2020–2024)",
          "$364,100 · ACS 2020-2024 5-year · data.census.gov. B25077 Petoskey city. Unchanged from prior. B25064 median gross rent $1,006 ±85 (https://data.census.gov/table/ACSDT5Y2024.B25064?g=160XX00US2663820). DP04: 3,069 units, 2,648 occupied, 421 vacant, rental vacancy 3.6%."
        ],
        [
          "County median (sold)",
          "$452,000 · 3 months ending Aug 2026 · redfin.com. Emmet County. Redfin: $452K (-3.0% YoY), August card $465K, 17 homes sold in August (10 last year), 36 days on market (71 last year), $262/sq ft. Realtor.com county median LIST price Aug 2026 $749,000 (-0.03%), 383 active, 61 DOM, $364/sq ft, 15.9% price-reduced (RDC_Inventory_Core_Metrics_County.csv). Brokerage IDX widget (jonesnorth.com, NM-MLSX feed) shows 403 sold with average sold price $682,102 and 156 DOM but no period, so not used."
        ],
        [
          "Two-bedroom rent",
          "$1,336 · HUD FMR FY2027 · FY2027, effective Oct 1, 2026 · huduser.gov. Emmet County nonmetro FMR: 0BR $1,015, 1BR $1,021, 2BR $1,336, 3BR $1,503, 4BR $1,495. FY2026 2BR was $1,235 (+8.2%) (https://www.huduser.gov/portal/datasets/fmr/fmr2026/FY2026_FMR_Schedule.pdf). HUD FY2027 Schedule of Metropolitan & Non-Metropolitan FMRs (PDF dated Aug 26, 2026; FY2027 published in the Federal Register Sept 1, 2026, effective Oct 1, 2026 per https://www.nahro.org/news/hud-publishes-fy-2027-fair-market-rents/). HUD's server refused direct fetches (Akamai 202/404), so both schedule PDFs were read through the r.jina.ai text proxy; FY2026 values match MSHDA's schedule 'Effective October 1, 2025' https://www.michigan.gov/mshda/-/media/Project/Websites/mshda/rental/assets/Shared-HCV---PBV/Fair-Market-Rent-Schedule-2025.pdf. FMR is a county 40th-percentile gross rent, not a town asking rent. Asking rents: Zumper Petoskey 2BR $1,500 (last updated Sept 14, 2026; 14 listings; all-beds average $1,405, +25% YoY) https://www.zumper.com/rent-research/petoskey-mi; Zillow Rental Manager Petoskey all beds/all types average $2,000, range $850 to $3,300, 16 rentals, last updated Sept 12, 2026 https://www.zillow.com/rental-manager/market-trends/petoskey-mi/."
        ],
        [
          "Homestead millage",
          "33.6331 mills · 2025 · michigan.gov. Petoskey City (unit 242020), Public Schools of Petoskey: principal residence 33.6331 mills; non-homestead 51.6331. Michigan Treasury 2025 Total Property Tax Rates report, page 44."
        ],
        [
          "First-year property tax on the median",
          "$8,072/yr · uncapped on purchase. $480,000 x 0.5 x 33.6331 / 1000 = $8,071.94/yr ($673/mo). On the ZIP figure $509,779: $8,572.72. On the ACS value $364,100: $6,122.91."
        ],
        [
          "2026 inflation rate multiplier",
          "1.027 · michigan.gov. STC Bulletin 14 of 2025, issued November 18, 2025: 'The inflation rate, expressed as a multiplier, to be used in the 2026 Capped Value Formula is 1.027.' Fetched as PDF and read."
        ],
        [
          "Home insurance",
          "$197/mo · 2026 · bankrate.com. Bankrate Michigan average $2,368/yr for $300K dwelling, $1,000 deductible, $100K liability (statewide). CAVEAT: on 2026-09-14 this URL returned Bankrate's homepage to WebFetch, the Browser pane, curl and a text proxy; the $2,368 figure was read from the search-engine snippet of that URL, not the rendered page. Fetched cross-check: insure.com Michigan average $2,896/yr ($241.33/mo), same $300K/$1,000/$100K profile, Quadrant data, page updated Aug 4, 2026: https://www.insure.com/home-insurance/average-cost-of-homeowners-insurance-in-michigan/ (aggregator, last resort)."
        ],
        [
          "Car insurance, two cars",
          "$535/mo · 2026 · bankrate.com. Bankrate Michigan full coverage $3,207/yr per car ($267/mo); two cars = $6,414/yr = $534.50/mo (statewide, no town rating). Same CAVEAT as homeIns: page unreachable on 2026-09-14, figure from the search snippet of that URL. Fetched cross-check: MoneyGeek Michigan full coverage $1,652/yr ($138/mo) per car for a 40-year-old with clean record, good credit, 2012 Camry, updated Aug 29, 2026 (two cars $276/mo): https://www.moneygeek.com/insurance/auto/average-cost-car-insurance-michigan/ (aggregator, last resort)."
        ],
        [
          "Power and heat",
          "$191/mo · EIA 2024 statewide averages · eia.gov. City of Petoskey municipal electric + DTE Gas (natural gas). EIA Table 5.A 2024: Michigan average residential bill $119.31/mo (618 kWh/mo at 19.30 c/kWh) https://www.eia.gov/electricity/sales_revenue_price/pdf/table_5a.pdf. Gas, EIA Michigan 2024 (all statewide, release date 8/31/2026): residential consumption 273,737 MMcf (https://www.eia.gov/dnav/ng/hist/n3010mi2a.htm) / 3,441,467 residential customers (https://www.eia.gov/dnav/ng/hist/na1501_smi_8a.htm) = 79.54 Mcf/customer/yr x $10.76/Mcf 2024 average residential price (https://www.eia.gov/dnav/ng/hist/n3010mi3a.htm) = $856/yr = $71.32/mo. Total $190.63/mo is a Michigan statewide average, not a town figure. Local tariff found: City of Petoskey Schedule RE (rate sheet dated January 2024, still the one posted on https://www.petoskey.us/services/finance_treasury/utility_documents.php): energy charge $0.08229/kWh winter, $0.11079/kWh summer, Ready to Serve $12.45/mo, plus a monthly power cost adjustment that the sheet does not quantify (https://cms3.revize.com/revize/petoskey/Departments/Finance/Utility%20Documents/Utility%20Rates%20-%20%20January%202024.pdf). At EIA's 618 kWh that is $63.31 (winter) to $80.92 (summer) before the PCA, so Petoskey electric likely runs below the $119.31 state average. DTE Gas Residential Rate A rate card, September 2026 cycle: $14.50 monthly customer charge + $2.26 IRM surcharge + $0.92153 per Ccf all-in (GCR customers) https://www.dteenergy.com/content/dam/dteenergy/deg/website/common/about-us/company-information/dte-gas-company/notices/rateCard.pdf. Prior $188.50."
        ],
        [
          "Groceries (MIT food line)",
          "$684/mo · MIT 2026 (page last updated Feb 15, 2026) · livingwage.mit.edu. Emmet County, food, 2 adults 0 children: $8,204/yr = $683.67/mo. Unchanged from prior."
        ],
        [
          "What the median buys",
          "In-town at the median: 1209 E Mitchell St, 3 bd / 1.5 ba / 1,272 sq ft, $450,000 (Aug 21, 2026). Just outside town: 161 Vantage View Dr, 3 bd / 2 ba / 2,470 sq ft, listed $389,900, sold $416,000 on Sep 4, 2026 (7% over list, 42 days) and 139 Vantage View Dr, 3 bd / 3 ba / 2,660 sq ft, $510,000 on Sep 1 (3% under list). Condos: 3440 Lakeside Dr N #59, 2 ba / 1,720 sq ft, $465,000 (Aug 26). Lots trade at $15,000 to $99,000 (Redfin city page). Realtor.com ZIP median listing is 2,875 sq ft at $502/sq ft, i.e. the listing pool is Bay Harbor-heavy."
        ],
        [
          "The market right now",
          "The most competitive of the four: Redfin scores ZIP 49770 at 74 'very competitive', with a 29-day median to pending (37 a year ago), 98.3% sale-to-list and hot homes going 5% over list in about 6 days; Emmet County sold 17 homes in August versus 10 a year earlier and days on market halved to 36. Prices are flat to down on the medians (city -35%, ZIP -12.4%, county -3.0%) because the summer-2025 comparison carried more Bay Harbor closings, while $/sq ft on the city page rose 21.9%. The listing pool is a different market from the sold pool: county median list $749,000 and ZIP list $1.145M against sold medians of $452K to $510K, with 16% to 17% of listings price-reduced. ACS puts the all-stock owner-occupied value at $364,100, so the $480K to $510K sold medians reflect what is transacting now (newer and lakeside) rather than the average house in town. Inventory is not thin: 383 active in the county, 84 new in August."
        ],
        [
          "Owning it, all in",
          "At the Redfin median ($480,000) with 20% down at 6.76% (6.76% 30-yr fixed, Freddie Mac PMMS week of Sept 10, 2026 (15-yr 6.09%)): $2,493/mo P&I on a $384,000 loan + first-year uncapped tax $673/mo (33.6331 mills, city, homestead) + Bankrate statewide home insurance $197.33/mo = about $3,363/mo before utilities. At the ZIP median ($509,779): $2,648 + $714 + $197.33 = $3,560/mo. The advertised seller tax bill will be lower than yours: taxable value uncaps to 50% of price the year after closing and then grows by the 2026 IRM 1.027. Heat is DTE natural gas; electric is the city utility at $0.082 to $0.111/kWh plus PCA. Michigan transfer tax, seller-paid: state $3.75 per $500 (0.75%) + county $0.55 per $500 (0.11%) = 0.86% (Van Buren County Register of Deeds page https://vanburencountymi.gov/departments/departments-offices/register-of-deeds/michigan-real-estate-transfer-tax/)."
        ],
        [
          "Not found this round",
          "Petoskey power cost adjustment (monthly, not on the rate sheet); local Realtor board (NM-MLSX) monthly median with a stated period; Zillow ZHVI (page blocked; snippet $461,562 -3.1%, unverified); FRED MEDLISPRI26047 page (Realtor.com county file used); Bankrate pages rendered (figures from snippets only); Rocket Homes / realtor.com second sold source (404 / blocked)"
        ],
        [
          "Checked",
          "2026-09-14 · https://www.redfin.com/city/16369/MI/Petoskey/housing-market · https://www.redfin.com/zipcode/49770/housing-market · https://econdata.s3-us-west-2.amazonaws.com/Reports/Core/RDC_Inventory_Core_Metrics_Zip.csv · https://data.census.gov/table/ACSDT5Y2024.B25077?g=160XX00US2663820 · https://www.redfin.com/county/1371/MI/Emmet-County/housing-market · https://www.huduser.gov/portal/datasets/fmr/fmr2027/FY2027_FMR_Schedule.pdf · https://www.michigan.gov/taxes/-/media/Project/Websites/taxes/4029/Total-Rates-Reports/2025-Total-Rates.pdf · https://www.michigan.gov/treasury/-/media/Project/Websites/treasury/STC/Bulletins/2025/Bulletin-14-of-2025--Inflation-Rate-Multiplier-for-2026.pdf · https://www.bankrate.com/insurance/homeowners-insurance/michigan/ · https://www.bankrate.com/insurance/car/average-cost-of-car-insurance-in-michigan/ · https://www.eia.gov/electricity/sales_revenue_price/pdf/table_5a.pdf · https://livingwage.mit.edu/counties/26047"
        ]
      ],
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
    costs: {"utility": "DTE Energy", "heatFuel": "natural gas", "winterHeat": 275.0, "summerBill": 150.0, "utilities": 212.5, "utilitiesNote": "DTE Energy; winter gas $275, summer $150", "internet": 55.0, "internetNote": "AT&T Fiber 300 Mbps", "cell": "High reliability and extensive 4G/5G based on RootMetrics and FCC data. Dead zones: Specific indoor residential areas and near Ann Arbor-Saline Road.", "carIns2": 416.67, "carInsNote": "Insurify ZIP 48104 avg $2,500/yr per car; Michigan high no-fault rates", "gasPrice": 4.12, "groceries": 708.67, "groceryNote": "MIT Living Wage Calculator, Washtenaw County, 2 adults, $8,504/yr (Feb 2026); the research pass had used Numbeo", "groceryBasis": "MIT", "waterTrash": 79.18, "homeIns": 233.92, "extras": "Michigan property tax uncapping triggers significant tax increase year after sale; condo HOAs $190-$380, single-family rare", "basketTotal": 2139.47, "sources": "dteenergy.com, att.com, broadbandmap.fcc.gov, insurify.com, gasbuddy.com, numbeo.com, a2gov.org, policygenius.com"},
    money: {"medianPrice": 474842, "effTax": 0.0263, "cityTax": 0, "taxState": "MI", "countyPrice": 374100, "priceNote": "redfin.com median sold, Aug 2026", "rent2br": 1804, "rentNote": "HUD FMR FY2027 · FY2027, effective Oct 1 2026"},
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
    median: "$474,842 sold (Aug 2026) · $453,400 ACS value",
    comfort: "$131k in town · $113k in county",
    crime: "3.0–3.4 / 17.2–21.1",
    snow: '61.4"',
    fiber: "26% fiber · 95% cable",
    tax: "52.67 mills (2.63%) — ~$12,900/yr on the median",
    drive: "≈275 mi · 4:41",
    workup: {
      "housing": [
        [
          "Median sold price",
          "$474,842 · Aug 2026 · redfin.com · City of Ann Arbor proper (Redfin city page id 782), all home types. Redfin median SALE price, all home types; 361 homes sold in Aug 2026 vs 362 in Aug 2025; Redfin Compete Score 58 'somewhat competitive'. Fetched 2026-09-14 in the Browser pane (redfin.com returns 403 to plain fetches)."
        ],
        [
          "Second source",
          "$539,950 · Aug 2026 · movoto.com. Movoto median SOLD price; 682 homes sold in Aug 2026 (541 a year earlier), 46 median days on market. Movoto's 682 sales vs Redfin's 361 means its geography is wider than the city proper (unstated). Low confidence as a city figure. Ann Arbor Area Board of REALTORS Aug 2026 report NOT FOUND (GMAR site shows March 2026 at most). Zillow ZHVI page bot-walled, NOT FOUND."
        ],
        [
          "Median list price",
          "$465,000 · Aug 2026 · fred.stlouisfed.org. COUNTY figure: Realtor.com median LISTING price for Washtenaw County via FRED (Jun 2026 $487,500, Jul $491,500, Aug $465,000). City-level median list price NOT FOUND (Realtor.com blocked, Zillow bot-walled)."
        ],
        [
          "Price per sq ft",
          "$275/sq ft · Aug 2026 · redfin.com. Redfin median sale price per sq ft, down 5.5% YoY. County median LIST $/sq ft $243 (FRED MEDLISPRIPERSQUFEE26161, Aug 2026)."
        ],
        [
          "Days on market",
          "41 days · 3 months ending Aug 2026 · redfin.com. Redfin: sell after 41 days vs 37 last year; hot homes pending in ~24 days. County median days on market 39 (FRED MEDDAYONMAR26161, Aug 2026)."
        ],
        [
          "Sale-to-list",
          "99.4% · Aug 2026 · redfin.com. Redfin sale-to-list, all home types, -0.34 pt YoY; average home sells ~1% below list, hot homes ~2% above."
        ],
        [
          "Active listings",
          "889 active listings (county) · Aug 2026 · fred.stlouisfed.org. Washtenaw County active listing count (Realtor.com via FRED): 733 Jun, 782 Jul, 889 Aug 2026. City count NOT FOUND."
        ],
        [
          "Year over year",
          "-0.03% · 3 months ending Aug 2026 vs same period 2025 · redfin.com. Redfin prints -0.033%; effectively flat."
        ],
        [
          "ACS median value (2020–2024)",
          "$453,400 · ACS 2020-2024 5-year · api.censusreporter.org. B25077 median value of owner-occupied units, Ann Arbor city (16000US2603000), release acs2024_5yr. B25064 median gross rent $1,649. api.census.gov now refuses keyless calls (X-DataWebAPI-KeyError), so Census Reporter's mirror of the same release was used. The prior's $479,800 was not reproduced by the 2020-2024 5-year table; treat the prior as a different vintage or table."
        ],
        [
          "County median (sold)",
          "$433,549 · Aug 2026 · redfin.com. Washtenaw County, Redfin median sale price, +0.8% YoY; 328 homes sold in Aug 2026 (355 a year earlier); 42 days on market; $211/sq ft. County ACS 2020-2024 B25077 = $374,100 (same Census Reporter call), unchanged from the prior's countyPrice."
        ],
        [
          "Two-bedroom rent",
          "$1,804 · HUD FMR FY2027 · FY2027, effective Oct 1 2026 · huduser.gov. HUD Fair Market Rent, Ann Arbor, MI MSA (Washtenaw County), 2BR: FY2026 revised $1,656; FY2027 $1,804 (+8.9%). FY2027 FMRs were published in the Federal Register 2026-09-01/02 (https://www.federalregister.gov/documents/2026/09/01/2026-17891/fair-market-rents-for-the-housing-choice-voucher-program-moderate-rehabilitation-single-room). FY2027 0BR $1,458, 1BR $1,503, 3BR $2,164, 4BR $2,371."
        ],
        [
          "Homestead millage",
          "52.6657 mills · 2025 · media-001-us.cdn.govstack.com. City of Ann Arbor 'Mills to be levied for 2025' sheet: 2025 REAL PROPERTY PRE 52.6657 (summer 45.2089 + winter 7.4568); NON-PRE 68.6263. Line items confirmed against https://www.a2gov.org/media/d1yjet13/2025-summary-of-millages.pdf (AAPS operating 18.0 is non-PRE only; PRE parcels pay the 2.0394 supplemental instead). Prior 52.67 CONFIRMED. 2026 summer PRE is already set at 45.4234 (https://media-001-us.cdn.govstack.com/a2gov-002-us/media/1iilotwn/2026-summer-millage.pdf); the 2026 winter levy is not yet published."
        ],
        [
          "First-year property tax on the median",
          "$12,504/yr · uncapped on purchase. Arithmetic: $474,842 sale price x 0.5 (taxable value uncaps to 50% of market on transfer) x 52.6657 / 1000 = $12,504. The city adds a 1% property tax administration fee (a2gov property-taxes page), so first full-year bill ~ $12,629, i.e. 2.66% of price."
        ],
        [
          "2026 inflation rate multiplier",
          "1.027 · detroitmi.gov. Michigan State Tax Commission Bulletin 14 of 2025 (Nov 18, 2025): 2026 inflation rate multiplier 1.027 (CPI-U FY2024-25 avg 319.997 / FY2023-24 avg 311.581). The michigan.gov original returns 403 to fetches; the City of Detroit mirror of the same bulletin was read in full."
        ],
        [
          "Home insurance",
          "$234/mo · 2026 · insurance.com. Insurance.com city table: Ann Arbor $2,807/yr; Michigan average $2,924/yr; $300,000 dwelling, $300,000 liability, $1,000 deductible; page updated Feb 24, 2026. Bankrate NOT FOUND: bankrate.com 302-redirects every fetch (WebFetch, curl, Googlebot UA, Browser pane, Wayback blocked) to its homepage."
        ],
        [
          "Car insurance, two cars",
          "$412/mo · as of Aug 31, 2026 · insurify.com. Insurify: Ann Arbor full coverage $206/mo per car (liability-only $110); Michigan full coverage $228/mo ($2,731/yr). Two cars = 2 x $206 = $412. Prior $416.67 was also Insurify-based. Bankrate NOT FOUND (see homeIns)."
        ],
        [
          "Groceries (MIT food line)",
          "$709/mo · MIT 2026 (updated Feb 15, 2026) · livingwage.mit.edu. MIT Living Wage, Washtenaw County, food line for 2 adults (both working) 0 children: $8,504/yr = $708.67/mo. Unchanged from prior."
        ],
        [
          "What the median buys",
          "What ~$475k bought in September 2026 (Redfin 'recently sold' on the city page, fetched 2026-09-14): 2880 Pebble Creek Dr, 3 bd / 2 ba, 1,664 sq ft, sold $444,000 on Sep 10, 2026 (list $449,000, 29 days); 1303 Prescott Ave (west side, 48103), 3 bd / 2 ba, 1,092 sq ft, sold $425,000 on Sep 11, 2026 (list $470,000, 10% under, 37 days); 1289 King George Blvd (48108), 4 bd / 2.5 ba, 2,859 sq ft, sold $540,000 (4% under list, 37 days). Downtown condos trade far lower (555 E William St #8K, 2 bd / 1 ba, 390 sq ft, $205,000); the $1.5M-$2.1M tier is Burns Park / Riverview Dr (432 Riverview Dr, 5 bd, 5,094 sq ft, $1,575,000). https://www.redfin.com/city/782/MI/Ann-Arbor/housing-market"
        ],
        [
          "The market right now",
          "Flat, not falling: Redfin's Aug 2026 median of $474,842 is -0.03% YoY and matches the prior ($476,000, July). It is a balanced market by Redfin's measure (Compete Score 58; 1 offer on average; sale-to-list 99.4%, -0.34 pt; 41 days on market vs 37). County inventory has been building all summer (Realtor.com/FRED active listings 733 in June to 889 in August) while the county median list price slipped from $491,500 in July to $465,000 in August, so buyers have more choice and modest leverage. Price per square foot fell 5.5% YoY to $275 while the median held, which says the mix shifted toward larger or newer homes rather than that values rose. Migration: Chicago, New York and San Francisco are the top inbound metros; Grand Rapids and Florida the top outbound."
        ],
        [
          "Owning it, all in",
          "Uncapping is the cost that surprises: the seller's advertised bill is on a capped taxable value, but a buyer's first full year is taxable value = 50% of price x 52.6657 mills = about $12,504 on the median, plus the city's 1% admin fee (~$12,629), about 2.66% of price, the highest effective rate on the list after Detroit. Michigan's transfer tax (0.75% state + 0.11% county = 0.86%, ~$4,084 on the median) is customarily paid by the seller. Heat is DTE natural gas; power is DTE Electric (24.35 c/kWh average at 500 kWh). All-in on the median at Freddie Mac's 6.76% 30-year rate (PMMS as of Sep 10, 2026, https://www.freddiemac.com/pmms) with 20% down ($94,968): loan $379,874, P&I $2,466 + taxes $1,042 + insurance $234 = about $3,742/month before utilities, and the 2026 winter levy (not yet set) may move the tax line by a few dollars."
        ],
        [
          "Not found this round",
          "City-level median LIST price (county only); City-level active inventory (county only); Bankrate 2026 Michigan car and home insurance (site unfetchable; substitutes used); Combined monthly utilities total (electric component only); Ann Arbor Area Board of REALTORS Aug 2026 report; Zillow ZHVI (bot wall)"
        ],
        [
          "Checked",
          "2026-09-14 · https://www.redfin.com/city/782/MI/Ann-Arbor/housing-market · https://www.movoto.com/ann-arbor-mi/market-trends/ · https://fred.stlouisfed.org/graph/fredgraph.csv?id=MEDLISPRI26161 · https://api.censusreporter.org/1.0/data/show/latest?table_ids=B25077,B25064&geo_ids=16000US2603000,16000US0610345,05000US26161,05000US06085 · https://www.redfin.com/county/1428/MI/Washtenaw-County/housing-market · https://www.zumper.com/rent-research/ann-arbor-mi · https://media-001-us.cdn.govstack.com/a2gov-002-us/media/vsdaodpz/principal-real-property-tax-rate-mills-levied-for-2025.pdf · https://detroitmi.gov/sites/detroitmi.localhost/files/2026-01/Bulletin%2014%20of%202025-%20Inflation%20Rate%20Multiplier%20for%202026.pdf · https://www.insurance.com/michigan-homeowners-insurance · https://insurify.com/car-insurance/michigan/average-cost/ · https://www.michigan.gov/-/media/Project/Websites/mpsc/consumer/electric/rates1.pdf?rev=ab413a7e2351452d8e59888ab149d53a · https://livingwage.mit.edu/counties/26161"
        ]
      ],
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
    costs: {"utility": "DTE Energy, SEMCO Energy Gas Company", "heatFuel": "natural gas", "winterHeat": 186.0, "utilities": 309.0, "utilitiesNote": "DTE Energy electric $123/mo; SEMCO Energy Gas Company winter gas $186/mo", "internet": 40.0, "internetNote": "Xfinity 300 Mbps", "cell": "Verizon coverage is excellent in Port Huron (~99% area coverage, no major dead zones)", "carIns2": 456.0, "carInsNote": "Insurify local avg full-coverage $2,736/yr per car ($228/mo) for two cars", "gasPrice": 3.89, "groceries": 608.67, "groceryNote": "MIT Living Wage Calculator annual food cost $8,892 for 2 adults in St. Clair County", "groceryBasis": "MIT", "waterTrash": 141.35, "homeIns": 241.33, "extras": "$23.75/mo trash/recycling assessment on property taxes; possible drain special assessments; HOAs uncommon", "basketTotal": 2029.75, "sources": "dteenergy.com, semcoenergygas.com, xfinity.com, verizon.com, insurify.com, gasbuddy.com, livingwage.mit.edu, porthuron.org, moneygeek.com, bsaonline.com"},
    money: {"medianPrice": 185327, "effTax": 0.0207, "cityTax": 0.01, "taxState": "MI", "countyPrice": 224600, "priceNote": "redfin.com median sold, Aug 2026", "rent2br": 1459, "rentNote": "HUD FMR FY2027 · FY2027, effective Oct 1, 2026"},
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
    median: "$185,327 sold (Aug 2026) · $149,300 ACS value",
    comfort: "$75k in town · $82k in county",
    crime: "6.0 / 15.0–15.1",
    snow: '35.5"',
    fiber: "27% fiber · 99% cable",
    tax: "41.31 mills (2.07%) + 1.0% city income tax",
    drive: "≈372 mi · 5:29",
    workup: {
      "housing": [
        [
          "Median sold price",
          "$185,327 · Aug 2026 · redfin.com · Redfin 'Port Huron, MI' city page (all home types); recently-sold addresses are all Port Huron 48060 city streets, consistent with the city proper. Redfin median sale price, all home types, +15.8% YoY; 117 homes sold in Aug 2026 (112 in Aug 2025); three-month median $185K. Read via the browser pane 2026-09-14."
        ],
        [
          "Second source",
          "$174,900 · Aug 2026 · movoto.com. Movoto median sold price; 176 homes sold in Aug 2026 (172 last year); 50 days on market (59 last year); 186 active listings."
        ],
        [
          "Price per sq ft",
          "$116/sq ft · Aug 2026 · redfin.com. Redfin, down 5.7% YoY."
        ],
        [
          "Days on market",
          "14 days · Aug 2026 · redfin.com. Redfin median days to pending (20 in Aug 2025). Movoto: 50 days."
        ],
        [
          "Sale-to-list",
          "99.1% · Aug 2026 · redfin.com. Redfin sale-to-list, +1.0 pt YoY; hot homes go 3% over list in 6 days; Compete Score 87 'very competitive'."
        ],
        [
          "Active listings",
          "186 active listings · as of Sept 14, 2026 · movoto.com. Movoto active listings, 14 new."
        ],
        [
          "Year over year",
          "+15.8% · Aug 2026 vs Aug 2025 · redfin.com."
        ],
        [
          "ACS median value (2020–2024)",
          "$149,300 · ACS 2020-2024 5-year · data.census.gov. B25077 Port Huron city (MOE +/-$9,147). B25064 median gross rent $982 (+/-$38): https://data.census.gov/table/ACSDT5Y2024.B25064?g=160XX00US2665820"
        ],
        [
          "County median (list)",
          "$325,000 · Aug 2026 · fred.stlouisfed.org. St. Clair County median listing price (Realtor.com via FRED), Jul 2026 $325,950; the county list median runs far above the city's sold median because lakeshore townships dominate listings. ACS 2020-2024 county median value $224,600 (+/-$3,575): https://data.census.gov/table/ACSDT5Y2024.B25077?g=050XX00US26147"
        ],
        [
          "Two-bedroom rent",
          "$1,459 · HUD FMR FY2027 · FY2027, effective Oct 1, 2026 · huduser.gov. St. Clair County is inside the Detroit-Warren-Livonia, MI HUD Metro FMR Area: 0BR $1,047, 1BR $1,167, 2BR $1,459, 3BR $1,777, 4BR $1,929 (FY2026 2BR $1,411). That metro figure overstates Port Huron asking rents: Zumper Port Huron 2BR $1,120, 1BR $927 (30-day rolling, Sept 14, 2026, https://www.zumper.com/rent-research/port-huron-mi); ACS median gross rent $982."
        ],
        [
          "Homestead millage",
          "41.3099 mills · 2025 · michigan.gov. Port Huron City (unit 742060) / Port Huron Area Schools, principal residence 41.3099 mills; no ad valorem special assessment (same figure in the 'w/ SA' column). Non-homestead 59.3099. Prior's 41.31 confirmed. Plus 1.0% resident city income tax (0.5% nonresident), City of Port Huron withholding guide: https://cms9files.revize.com/porthuronminw/Documents/Government/Departments/Finance/Income%20Tax/Employer%20Information%20and%20Income%20Tax%20Forms/Withholding%20Guide%202.pdf"
        ],
        [
          "First-year property tax on the median",
          "$3,828/yr · uncapped on purchase. $185,327 x 0.5 x 41.3099 / 1000 = $3,828 per year, first full year after purchase."
        ],
        [
          "2026 inflation rate multiplier",
          "1.027 · detroitmi.gov. State Tax Commission Bulletin 14 of 2025 (Nov 18, 2025), read from the City of Detroit-hosted copy; the michigan.gov original returned 403 to the fetcher. 2026 capped value = (2025 taxable value - losses) x 1.027 + additions; the cap does not apply to a buyer's first year because the sale uncaps taxable value."
        ],
        [
          "Home insurance",
          "$241/mo · updated Aug 4, 2026 · insure.com. Michigan statewide average $2,896/yr for $300,000 dwelling, $100,000 liability, $1,000 deductible (Insure.com). Alternatives seen: MoneyGeek $2,195/yr = $182.92/mo for $250,000 dwelling (rates updated Sep 14, 2026, https://www.moneygeek.com/insurance/homeowners/average-cost-home-insurance-michigan/). Bankrate's $2,368/yr ($300K dwelling, refreshed Nov 2025) appeared only in a search snippet; bankrate.com returned 403 / redirected to its homepage on every fetch, so it is not used."
        ],
        [
          "Car insurance, two cars",
          "$456/mo · Aug 31, 2026 · insurify.com. Insurify Michigan average full-coverage quote $228/month per car x 2 cars = $456. Other 2026 statewide figures seen: MoneyGeek $138/mo per car, 100/300/100 with $1,000 deductible, updated Aug 29, 2026 (https://www.moneygeek.com/insurance/auto/average-cost-car-insurance-michigan/) = $276 for two; Experian marketplace $322/mo per car, Aug 2026 data (https://www.experian.com/blogs/ask-experian/average-cost-car-insurance-michigan/) = $644 for two. Bankrate ($3,207/yr full coverage) was visible only in a search snippet; the page itself was unreachable (403), so it is not used. Michigan PIP choice drives the spread."
        ],
        [
          "Groceries (MIT food line)",
          "$609/mo · MIT 2026 (data dated Feb 15, 2026) · livingwage.mit.edu. St. Clair County, 2 adults (both working), 0 children: $7,304/yr = $608.67/mo."
        ],
        [
          "What the median buys",
          "Redfin recently sold (read Sept 14, 2026): 2214 White St, 3 bd / 1 ba, 1,936 sq ft, $169,900 at list, 40 days (Sept 10); 2317-2319 15th St, 4 bd / 2 ba, 1,472 sq ft, $150,000; 1424 19th St, 4 bd / 1.5 ba, 1,892 sq ft, $111,700 (4% over list); up the ladder, 2712 Military St, 5 bd / 4.5 ba, 3,198 sq ft, $353,000 in 3 days and 1628 Edison Shores Ln, 3 bd / 3 ba, 3,396 sq ft, $460,000 (8% under list, 89 days). The median buys a pre-1940 to 1960s 3-4 bedroom, 1,400-2,000 sq ft house on a city lot; river- and lake-adjacent streets run $350K-500K. https://www.redfin.com/city/16868/MI/Port-Huron/housing-market"
        ],
        [
          "The market right now",
          "The cheapest viable town on the list is also the hottest: Redfin's median sold jumped 15.8% YoY to $185,327, sale-to-list is 99.1% (up 1.0 pt), median time to pending 14 days, Compete Score 87. Movoto's broader count ($174,900, 176 sales, 50 days) agrees on price within 6%. Price per square foot fell 5.7%, so the mix is shifting toward bigger houses. Inventory is 186 active listings against ~120-175 sales a month, roughly a month of supply. The county list median ($325,000) is nearly double the city sold median because the lakeshore townships (Fort Gratiot, Port Huron Twp, St. Clair) carry the listings; the waterfront premium sits just outside city limits. Redfin's ACS value ($149,300) lags the sold median by ~$36K, consistent with a fast-appreciating stock of older housing."
        ],
        [
          "Owning it, all in",
          "On the $185,327 median with 20% down at 6.76%: principal and interest $963/month, first-year uncapped tax $3,828/yr ($319/mo), home insurance about $241/mo, total about $1,523/month before utilities and cars. The 1.0% resident city income tax applies to all earned income including remote-work wages once you are domiciled in the city. Heat is SEMCO gas (rate case pending), electric is DTE; budget the prior's $309/mo until a SEMCO typical bill is sourced. Seller pays the 0.86% transfer tax. At this price the tax bill is modest in dollars even though the 41.31-mill rate is among the higher ones on the list."
        ],
        [
          "Not found this round",
          "listMedian (city level); utilities (SEMCO typical residential gas bill); Zillow ZORI; Bankrate 2026 insurance pages"
        ],
        [
          "Checked",
          "2026-09-14 · https://www.redfin.com/city/16868/MI/Port-Huron/housing-market · https://www.movoto.com/port-huron-mi/market-trends/ · https://data.census.gov/table/ACSDT5Y2024.B25077?g=160XX00US2665820 · https://fred.stlouisfed.org/series/MEDLISPRI26147 · https://www.huduser.gov/portal/datasets/fmr/fmr2027/FY27_FMRs.xlsx · https://www.michigan.gov/taxes/-/media/Project/Websites/taxes/4029/Total-Rates-Reports/2025-Total-Rates.pdf · https://detroitmi.gov/sites/detroitmi.localhost/files/2026-01/Bulletin%2014%20of%202025-%20Inflation%20Rate%20Multiplier%20for%202026.pdf · https://www.insure.com/home-insurance/average-cost-of-homeowners-insurance-in-michigan/ · https://insurify.com/car-insurance/michigan/average-cost/ · https://www.michigan.gov/mpsc/-/media/Project/Websites/mpsc/consumer/electric/rates1.pdf · https://livingwage.mit.edu/counties/26147"
        ]
      ],
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
    costs: {"utility": "Consumers Energy", "heatFuel": "natural gas", "winterHeat": 225.0, "summerBill": 30.0, "utilities": 262.5, "utilitiesNote": "Consumers Energy; electric $135, winter gas $225, summer gas $30", "internet": 35.0, "internetNote": "Verizon 5G Home Internet (300 Mbps)", "cell": "Verizon offers reliable coverage in the city, but users report localized dead zones and signal drops in surrounding areas and indoors", "carIns2": 533.0, "carInsNote": "Experian; avg $3,198/yr per car ($6,396/yr for 2 cars)", "gasPrice": 3.27, "groceries": 614.08, "groceryNote": "MIT Living Wage Calculator; 2-adult household in Mason County", "groceryBasis": "MIT", "waterTrash": 83.0, "homeIns": 243.67, "extras": "$2 municipal trash bag stickers, special assessments for neighborhood infrastructure, seasonal snow plowing fees", "basketTotal": 2064.95, "sources": "consumersenergy.com, broadbandnow.com, coveragemap.com, experian.com, gasbuddy.com, livingwage.mit.edu, ludington.mi.us, terrysmithagency.com, bsaonline.com"},
    money: {"medianPrice": 334778, "effTax": 0.0203, "cityTax": 0, "taxState": "MI", "countyPrice": 219600, "priceNote": "redfin.com median sold, Aug 2026", "rent2br": 1085, "rentNote": "HUD FMR FY2027 · FY2027 (effective Oct 1 2026)"},
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
    median: "$334,778 sold (Aug 2026) · $201,100 ACS value",
    comfort: "$100k in town · $81k in county",
    crime: "2.1–2.6 / 9.4–10.6",
    snow: '86"',
    fiber: "55% fiber · 75% cable",
    tax: "40.67 mills (2.03%)",
    drive: "≈275 mi · 4:21",
    workup: {
      "housing": [
        [
          "Median sold price",
          "$334,778 · Aug 2026 · redfin.com · Redfin 'Ludington, MI' = postal ZIP 49431: the city of Ludington plus Hamlin and Pere Marquette townships including the Hamlin Lake and Lake Michigan shoreline. Redfin median sale price, all home types, Aug 2026; +36.6% YoY; 33 homes sold in Aug 2026 (34 in Aug 2025); trailing 3-month median $335K. n is small, so the YoY swing is a mix effect: median $/sq ft fell 27.3%."
        ],
        [
          "Second source",
          "$362,450 · Aug 2026 · movoto.com. Movoto 'Ludington' Aug 2026 median sold $362,450 on 107 sales (its area is much wider than the ZIP: Redfin counts 33), DOM 70 (88 last year), 152 active. Zillow ZHVI Ludington (modeled) $307,090, +7.0% YoY, updated 8/31/2026 https://www.zillow.com/home-values/39538/ludington-mi/"
        ],
        [
          "Median list price",
          "$355,000 · Aug 2026 · fred.stlouisfed.org. Realtor.com via FRED, Ludington MI micropolitan area: Jun $364,950 -> Jul $375,000 -> Aug $355,000. Realtor.com city page blocked."
        ],
        [
          "Price per sq ft",
          "$149/sq ft sold · 3 months to Aug 2026 · redfin.com. Redfin median sale $/sq ft, -27.3% YoY. Mason County $195/sq ft (-2.7%)."
        ],
        [
          "Days on market",
          "54 days (Redfin) · 3 months to Aug 2026 · redfin.com. 48 a year ago. FRED Ludington CBSA median days on market 65 in Aug 2026 (Jun 36, Jul 47, Aug 65) https://fred.stlouisfed.org/series/MEDDAYONMAR31220"
        ],
        [
          "Sale-to-list",
          "94.1% · Aug 2026 · redfin.com. -3.2 pt YoY; average home sells ~5% below list and goes pending in ~50 days; hot homes ~1% below list in ~25 days; Compete Score 49"
        ],
        [
          "Active listings",
          "122 active listings (Ludington CBSA) · Aug 2026 · fred.stlouisfed.org. Realtor.com via FRED: Jun 112 -> Jul 126 -> Aug 122. Movoto shows 152 active for its wider area."
        ],
        [
          "Year over year",
          "+36.6% · Aug 2026 vs Aug 2025 (Redfin median sale price; n=33, mix-driven) · redfin.com."
        ],
        [
          "ACS median value (2020–2024)",
          "$201,100 · ACS 2020-2024 5-year (B25077), Ludington city · api.censusreporter.org. Census ACS via the Census Reporter API. Median gross rent B25064 $902 ±$137."
        ],
        [
          "County median (sold)",
          "$338,866 · Aug 2026 · redfin.com. Mason County; Redfin median sale +41.2% YoY on 41 sales (31 last year), 48 days (79 last year), $195/sq ft. ACS 2020-2024 county value $219,600 ±$8,156 (rent $896 ±$62)."
        ],
        [
          "Two-bedroom rent",
          "$1,085 · HUD FMR FY2027 · FY2027 (effective Oct 1 2026) · huduser.gov. Mason County, MI (non-metro county FMR). FY2026 was $1,026 (+5.8%). Zumper Ludington Sep 2026 asking medians: 1BR $795 (+6%), 2BR $1,061 (+7%), updated 2026-09-14. ACS median gross rent $902."
        ],
        [
          "Homestead millage",
          "40.6725 mills · 2025 · michigan.gov. Ludington City / Ludington Area Schools, PRE total; non-PRE 58.6725. The city's own 2026 sheet (https://ludington.mi.us/DocumentCenter/View/1869/2026-Millage-Rates-?bidId=) lists summer PRE 36.8900 (city operating 10.9231 + refuse 2.6213 + police pension 1.7500 = 15.2944 city; SET 6.0; county 5.0396; WSCC 3.0351; ISD 3.4898; school debt/sinking 2.8480; LMTA 1.1831) + estimated winter 2.7556 = 39.6456 PRE (57.6456 non-PRE); DDA 1.5324 where applicable. Hamlin Twp 25.1769, Pere Marquette Twp 27.0809 PRE (2025)."
        ],
        [
          "First-year property tax on the median",
          "$6,808/yr · uncapped on purchase. 334,778 x 0.5 x 40.6725 / 1000 = $6,808 inside the city. At the city's 2026 sheet rate 39.6456: $6,636. Same price in Hamlin Twp (25.1769): $4,214."
        ],
        [
          "2026 inflation rate multiplier",
          "1.027 (2.7%) · michigan.gov. STC Bulletin 14 of 2025, Nov 18 2025 (fetched, ratio 1.027 on p.3); also printed on the City of Ludington 2026 millage sheet and computed as 311.547/319.9966 = 2.7% in the Glen Arbor Twp AOR Jan 2026"
        ],
        [
          "Home insurance",
          "$244/mo · 2026 (Insurance.com, updated 2026-02-24) · insurance.com. Michigan statewide. Fetched: Insurance.com $2,924/yr ($300K dwelling, $300K liability, $1K deductible; updated Feb 24 2026) = $243.67/mo; NerdWallet $2,415/yr ($400K dwelling; Mar 4 2026) = $201.25/mo. Bankrate (the brief's preferred source) shows $2,368/yr for $300K dwelling, rates refreshed Nov 2025 = $197.33/mo, but only in its search snippet: bankrate.com served its homepage to both WebFetch and the browser, so that figure is not verified on-page."
        ],
        [
          "Car insurance, two cars",
          "$455/mo · 2026 (Insurify, updated 2026-09-13) · insurify.com. Michigan statewide full coverage, two cars = 2 x annual / 12. Fetched: Insurify $2,731/yr ($228/mo) -> $455.17; Experian $3,862/yr ($322/mo, Aug 2026 marketplace data, page dated Sep 9 2026) -> $643.67; MoneyGeek $1,652/yr ($138/mo, Aug 29 2026) -> $275.33. Bankrate $3,207/yr ($267/mo) -> $534.50 appears only in its search snippet (page not fetchable). Spread reflects PIP-level assumptions."
        ],
        [
          "Power and heat",
          "$214/mo · electric: EIA 2024 avg consumption at Jun 2026 price; gas: EIA 2024 consumption at 2025 price · eia.gov. NOT a town-level figure. Arithmetic: EIA Table 5.A 2024 Michigan residential average 618 kWh/mo, 19.30 c/kWh, bill $119.31/mo; at the June 2026 Michigan residential price of 22.99 c/kWh (EIA EPM 5.6.A; 20.82 c in June 2025) 618 kWh = $142.08/mo. Gas: 2024 Michigan residential consumption 273,737 MMcf / 3,441,467 residential customers = 79.54 Mcf per customer per year x $10.92/Mcf (2025 annual average residential price) = $869/yr = $72.38/mo. Total $142.08 + $72.38 = $214.46 (or $191.69 using the 2024 electric bill). 2026 rate cases: Consumers Energy electric +6.1%, +$6.46/mo at 500 kWh from May 1 2026; DTE Electric +4.6%, ~$5/mo at 500 kWh from Mar 5 2026; DTE Gas +$74.52M (>4% residential) approved Sep 10 2026. Ludington: natural gas heat (prior file lists Consumers Energy). Prior town figure $262.50 stands if a town-level number is required; none found."
        ],
        [
          "Groceries (MIT food line)",
          "$614/mo · MIT 2026 (updated 2026-02-15) · livingwage.mit.edu. Mason County, 2 adults (both working), 0 children: food $7,369/yr. Prior $614 unchanged."
        ],
        [
          "What the median buys",
          "Redfin closings Jul-Sep 2026 near the $335K median: 819 E Loomis St, 4 bd/2 ba, 1,888 sq ft, $340,000; 1555 Marilyn Ave, 3 bd/2 ba, 1,364 sq ft, $360,000; 311 N James St, 4 bd/2 ba, 1,888 sq ft, $280,000 (Sep 4, 2% under list, 24 days); 5959 Barnhart Rd (Hamlin Twp), 4 bd/2 ba, 1,644 sq ft mobile home with Hamlin Lake access, $315,000 (Jul 31); 4599 Ariel Ave (Hamlin Twp), 3 bd/2.5 ba, 2,000 sq ft slab ranch near Hamlin Lake, $420,000 (Jul 30). Lakefront/lake-view runs $595K-$800K (1824 S Pere Marquette Hwy 4/3 2,938 sq ft $595,000; 150 Harbor Dr 3/3 1,646 sq ft $775,000, 11% over list). Sources: https://www.redfin.com/city/12731/MI/Ludington/recently-sold and the housing-market page."
        ],
        [
          "The market right now",
          "A thin market: 33 August closings in the ZIP and 41 in the county, so the +36.6% median jump is mix (price per sq ft fell 27%), not appreciation. Buyers have leverage: sale-to-list 94.1% (down 3.2 pts), Realtor.com days on market doubled from 36 in June to 65 in August, and the area list median dropped $20K month over month to $355,000. Absolute inventory is small (122 active). Seasonal and second-home demand around Hamlin Lake and the Lake Michigan shore pulls the postal-area figures well above the in-town housing stock (ACS value $201,100); Zillow's modeled index for the town is $307,090 (+7%)."
        ],
        [
          "Owning it, all in",
          "Inside the city the uncapped first-year tax on the $334,778 median at 40.6725 mills is about $6,808 (the city's 2026 sheet at 39.6456 gives $6,636); the same price in Hamlin Township is about $4,214. Natural gas heat. Michigan transfer tax 0.86% (about $2,879) is the seller's. At 6.76% (Freddie Mac, Sep 10 2026) with 20% down ($66,956), P&I on $267,822 is about $1,739/mo; with ~$567/mo tax and ~$200-245/mo insurance the carry is roughly $2,500-2,550/mo before utilities. The car ferry is seasonal, so year-round errands beyond the town mean a 1.5-2 hour drive to Muskegon or Grand Rapids."
        ],
        [
          "Not found this round",
          "city-proper (inside city limits) sold median: only the ZIP-level Redfin figure exists; Mason-Oceana-Manistee Board of REALTORS public monthly statistics; FRED Ludington CBSA $/sq ft series (not fetched); Realtor.com city page (blocked); Zillow rent index (bot check); Apartments.com (403); Bankrate page content; town-level power + heat bill"
        ],
        [
          "Checked",
          "2026-09-14 · https://www.redfin.com/city/12731/MI/Ludington/housing-market · https://www.movoto.com/ludington-mi/market-trends/ · https://fred.stlouisfed.org/series/MEDLISPRI31220 · https://api.censusreporter.org/1.0/data/show/acs2024_5yr?table_ids=B25077,B25064&geo_ids=16000US2634000,05000US26081,16000US2680340,05000US26055,16000US2649640,05000US26105,16000US2625980,16000US2632360,06000US2608932380,06000US2608926000,05000US26089 · https://www.redfin.com/county/1400/MI/Mason-County/housing-market · https://www.huduser.gov/portal/datasets/fmr/fmr2027/FY27_FMRs.xlsx · https://www.michigan.gov/taxes/-/media/Project/Websites/taxes/4029/Total-Rates-Reports/2025-Total-Rates.pdf · https://www.michigan.gov/treasury/-/media/Project/Websites/treasury/STC/Bulletins/2025/Bulletin-14-of-2025--Inflation-Rate-Multiplier-for-2026.pdf · https://www.insurance.com/michigan-homeowners-insurance · https://insurify.com/car-insurance/michigan/average-cost/ · https://www.eia.gov/electricity/sales_revenue_price/pdf/table_5A.pdf · https://livingwage.mit.edu/counties/26105"
        ]
      ],
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
    money: {"medianPrice": 531000, "effTax": 0.0167, "cityTax": 0, "taxState": "MI", "countyPrice": 276800, "priceNote": "Charlevoix County median sold, 3 months to Aug 2026; the town's August sales were three new condos", "rent2br": 1119, "rentNote": "HUD FMR FY2027 · FY2027, effective Oct 1, 2026"},
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
    median: "$531,000 sold (3 months to Aug 2026) · $331,500 ACS value",
    comfort: "$126k in town · $85k in county",
    crime: "1.7–2.1 / 14.9–15.0",
    snow: '103"',
    fiber: "43% fiber · 63% cable",
    tax: "33.48 mills (1.67%)",
    drive: "≈387 mi · 5:57",
    workup: {
      "housing": [
        [
          "Median sold price",
          "$531,000 · 3 months to Aug 2026 · redfin.com · Redfin 'Charlevoix, MI' city page, which in practice is the 49720 postal area (the recent sales it lists on Oyster Bay Dr, Stolt and Hilary Dr are in Charlevoix/Hayes/Marion townships, outside the 2. Charlevoix County median sold (11 August sales, +41.5% YoY); the town's own August closings were three new Uptown Ln condos at $736,000 and the ZIP 49720 3-month median is $732,183 on 14 sales, both condo/lakefront-driven; Realtor.com ZIP list median $523,900 on 105 listings"
        ],
        [
          "Second source",
          "$732,183 · Aug 2026 (Redfin chart point, 3-month rolling) · redfin.com. Redfin ZIP 49720: $732,183, +48.5% YoY, 14 homes sold in August (12 last year), 63 days on market (41 last year), $470/sq ft (+24.6%). Larger sample than the city page but same condo/waterfront skew. Rocket Homes trend pages now return 404 and realtor.com is blocked in the Browser pane, so no third sold source."
        ],
        [
          "Median list price",
          "$523,900 · Aug 2026 · econdata.s3-us-west-2.amazonaws.com. Realtor.com Research ZIP-level file (the series FRED mirrors), ZIP 49720: median listing price $523,900, -8.3% YoY, 105 active listings, 65 median days on market, $361/sq ft, 24.6% of listings price-reduced, 20 new listings."
        ],
        [
          "Price per sq ft",
          "$480/sq ft · Aug 2026 · redfin.com. Redfin city sale $/sq ft (+77.8% YoY); ZIP 49720 $470 (+24.6%); Charlevoix County $290 (+7.4%)."
        ],
        [
          "Days on market",
          "63 days · Aug 2026 · redfin.com. Redfin ZIP 49720 median days on market 63 (41 a year earlier); city card 81 days."
        ],
        [
          "Sale-to-list",
          "96.7% · Aug 2026 · redfin.com. Redfin ZIP 49720 sale-to-list 96.7%, -3.5 pt YoY; Compete Score 44 'somewhat competitive'; 'average homes sell for about 3% below list price and go pending in around 63 days'."
        ],
        [
          "Active listings",
          "105 active listings · Aug 2026 · econdata.s3-us-west-2.amazonaws.com. Realtor.com ZIP 49720 active listing count; Charlevoix County 239 active (county file, same source, RDC_Inventory_Core_Metrics_County.csv)."
        ],
        [
          "Year over year",
          "+83.9% (city, 3-mo) / +48.5% (ZIP 49720) / +41.5% (county) · 3 months ending Aug 2026 vs same period 2025 · redfin.com. Redfin; the county list median moved the other way, -10.1% YoY (Realtor.com Aug 2026). YoY on n=3 is noise."
        ],
        [
          "ACS median value (2020–2024)",
          "$331,500 · ACS 2020-2024 5-year · data.census.gov. B25077 median value of owner-occupied units, Charlevoix city. Unchanged from prior. B25064 median gross rent $816 ±173 (https://data.census.gov/table/ACSDT5Y2024.B25064?g=160XX00US2614780). B25004: 650 vacant units of which 622 are 'for seasonal, recreational, or occasional use'."
        ],
        [
          "County median (sold)",
          "$531,000 · 3 months ending Aug 2026 · redfin.com. Charlevoix County. Redfin: $531K, +41.5% YoY, 11 homes sold in August (11 last year), 63 days on market, $290/sq ft. Realtor.com county median LIST price Aug 2026 $499,000 (-10.1% YoY), 239 active, 63 DOM, $317/sq ft, 24.8% price-reduced (https://econdata.s3-us-west-2.amazonaws.com/Reports/Core/RDC_Inventory_Core_Metrics_County.csv). FRED series MEDLISPRI26029 not fetchable (404 to WebFetch, CSV endpoint served a bot check)."
        ],
        [
          "Two-bedroom rent",
          "$1,119 · HUD FMR FY2027 · FY2027, effective Oct 1, 2026 · huduser.gov. Charlevoix County nonmetro FMR: 0BR $798, 1BR $855, 2BR $1,119, 3BR $1,549, 4BR $1,619. FY2026 2BR was $1,039 (+7.7%) (https://www.huduser.gov/portal/datasets/fmr/fmr2026/FY2026_FMR_Schedule.pdf). HUD FY2027 Schedule of Metropolitan & Non-Metropolitan FMRs (PDF dated Aug 26, 2026; FY2027 published in the Federal Register Sept 1, 2026, effective Oct 1, 2026 per https://www.nahro.org/news/hud-publishes-fy-2027-fair-market-rents/). HUD's server refused direct fetches (Akamai 202/404), so both schedule PDFs were read through the r.jina.ai text proxy; FY2026 values match MSHDA's schedule 'Effective October 1, 2025' https://www.michigan.gov/mshda/-/media/Project/Websites/mshda/rental/assets/Shared-HCV---PBV/Fair-Market-Rent-Schedule-2025.pdf. FMR is a county 40th-percentile gross rent, not a town asking rent. Zillow rental page for Charlevoix returned a bot challenge; Zumper has no Charlevoix page; rent.com rate-limited: no current asking-rent source."
        ],
        [
          "Homestead millage",
          "33.4802 mills · 2025 · michigan.gov. Charlevoix City (unit 152020), Charlevoix Public Schools: principal residence 33.4802 mills; non-homestead 51.4802. Michigan Treasury 2025 Total Property Tax Rates report, page 28."
        ],
        [
          "First-year property tax on the median",
          "$12,321/yr · uncapped on purchase. $736,000 x 0.5 x 33.4802 / 1000 = $12,320.71/yr ($1,027/mo) after uncapping. On the ZIP figure $732,183: $12,256.82. On the ACS value $331,500: $5,549.34."
        ],
        [
          "2026 inflation rate multiplier",
          "1.027 · michigan.gov. STC Bulletin 14 of 2025, issued November 18, 2025: 'The inflation rate, expressed as a multiplier, to be used in the 2026 Capped Value Formula is 1.027.' Fetched as PDF and read."
        ],
        [
          "Home insurance",
          "$197/mo · 2026 · bankrate.com. Bankrate Michigan average $2,368/yr for $300K dwelling, $1,000 deductible, $100K liability (statewide). CAVEAT: on 2026-09-14 this URL returned Bankrate's homepage to WebFetch, the Browser pane, curl and a text proxy; the $2,368 figure was read from the search-engine snippet of that URL, not the rendered page. Fetched cross-check: insure.com Michigan average $2,896/yr ($241.33/mo), same $300K/$1,000/$100K profile, Quadrant data, page updated Aug 4, 2026: https://www.insure.com/home-insurance/average-cost-of-homeowners-insurance-in-michigan/ (aggregator, last resort)."
        ],
        [
          "Car insurance, two cars",
          "$535/mo · 2026 · bankrate.com. Bankrate Michigan full coverage $3,207/yr per car ($267/mo); two cars = $6,414/yr = $534.50/mo (statewide, no town rating). Same CAVEAT as homeIns: page unreachable on 2026-09-14, figure from the search snippet of that URL. Fetched cross-check: MoneyGeek Michigan full coverage $1,652/yr ($138/mo) per car for a 40-year-old with clean record, good credit, 2012 Camry, updated Aug 29, 2026 (two cars $276/mo): https://www.moneygeek.com/insurance/auto/average-cost-car-insurance-michigan/ (aggregator, last resort)."
        ],
        [
          "Power and heat",
          "$191/mo · EIA 2024 statewide averages · eia.gov. City of Charlevoix municipal electric + DTE Gas (natural gas). EIA Table 5.A 2024: Michigan average residential bill $119.31/mo (618 kWh/mo at 19.30 c/kWh) https://www.eia.gov/electricity/sales_revenue_price/pdf/table_5a.pdf. Gas, EIA Michigan 2024 (all statewide, release date 8/31/2026): residential consumption 273,737 MMcf (https://www.eia.gov/dnav/ng/hist/n3010mi2a.htm) / 3,441,467 residential customers (https://www.eia.gov/dnav/ng/hist/na1501_smi_8a.htm) = 79.54 Mcf/customer/yr x $10.76/Mcf 2024 average residential price (https://www.eia.gov/dnav/ng/hist/n3010mi3a.htm) = $856/yr = $71.32/mo. Total $190.63/mo is a Michigan statewide average, not a town figure. The City's posted electric rate sheet (https://www.charlevoixmi.gov/DocumentCenter/View/1593/Electric-Rates-PDF) is a scanned image with no extractable text, so the local tariff is NOT FOUND. DTE Gas Residential Rate A rate card, September 2026 cycle: $14.50 monthly customer charge + $2.26 IRM surcharge + $0.92153 per Ccf all-in (GCR customers) https://www.dteenergy.com/content/dam/dteenergy/deg/website/common/about-us/company-information/dte-gas-company/notices/rateCard.pdf. Prior $211.50 was town-specific by method unknown; this refresh could only source statewide averages, so keep the prior if a town figure is preferred."
        ],
        [
          "Groceries (MIT food line)",
          "$743/mo · MIT 2026 (page last updated Feb 15, 2026) · livingwage.mit.edu. Charlevoix County, food, 2 adults 0 children: $8,911/yr = $742.58/mo. Unchanged from prior."
        ],
        [
          "What the median buys",
          "The August 'median' is literally 11/12/13 Uptown Ln: new-construction 3 bd / 3.5 ba / 1,532 sq ft condos at $736,000 to $737,000, sold at list after 55 to 94 days (Redfin city page). The nearest single-family closing near that price is 7310 Stolt, 4 bd / 3.5 ba / 2,640 sq ft, $810,000 (Jul 24, 2026, 3% under list). What ~$440K buys: 1205 State St in town, 3 bd / 2.5 ba / 1,127 sq ft, $440,000 on Jul 22, 2026 after 300 days and a 10% cut from $489,000. Top of the window: 7545 Oyster Bay Dr #4, 5 bd / 6,513 sq ft waterfront, $4,575,000 (8% under list). Realtor.com ZIP 49720 median listing is 1,544 sq ft at $361/sq ft."
        ],
        [
          "The market right now",
          "Thin and lumpy: 3 closings in August on the Redfin city page and 14 in ZIP 49720, so one condo release or one Lake Michigan estate moves the median by hundreds of thousands (city 3-month median $736K vs the ACS value of $331,500 for all owner-occupied city homes). Redfin ZIP 49720 is 'somewhat competitive' (Compete Score 44): homes go pending in about 63 days, sell about 3% under list, and sale-to-list fell 3.5 points YoY to 96.7%. Sellers are cutting: 24.6% of ZIP listings and 24.8% of county listings had price reductions in August, and the county median list price is down 10.1% YoY to $499,000 while Redfin's county sold median is up 41.5% to $531K, which is a mix shift toward waterfront, not appreciation. 622 of the city's 650 vacant units are seasonal (ACS), so the second-home share of the stock is high and winter inventory is what remains unsold. The waterfront premium is visible in the sales list (Oyster Bay $4.575M vs in-town State St $440K) but no source quantified it as a share of the median."
        ],
        [
          "Owning it, all in",
          "Buying at the Redfin median ($736,000) with 20% down at 6.76% (6.76% 30-yr fixed, Freddie Mac PMMS week of Sept 10, 2026 (15-yr 6.09%)) is $3,823/mo P&I on a $588,800 loan; add first-year uncapped tax $1,027/mo (33.4802 mills, city, homestead) and Bankrate's statewide home insurance $197.33/mo for about $5,047/mo before utilities. At the ACS value ($331,500) the same math is $1,722 + $462 + $197.33 = $2,382/mo. Heat is DTE natural gas (Rate A: $14.50 + $2.26 fixed, $0.92153/Ccf in Sept 2026); electric is the city's own utility. Taxable value uncaps to 50% of the sale price the year after purchase, and the 2026 cap is 1.027 thereafter. Michigan transfer tax, seller-paid: state $3.75 per $500 (0.75%) + county $0.55 per $500 (0.11%) = 0.86% (Van Buren County Register of Deeds page https://vanburencountymi.gov/departments/departments-offices/register-of-deeds/michigan-real-estate-transfer-tax/). Buyer closing costs are title, recording and lender fees only."
        ],
        [
          "Not found this round",
          "Charlevoix city electric tariff (scanned PDF); current asking 2BR rent for Charlevoix (Zillow blocked, Zumper/rent.com no data); local Realtor board (NM-MLSX / Northern Great Lakes REALTORS) monthly median; Zillow ZHVI (page blocked; search snippet showed $450,970 +4.2%, unverified); FRED MEDLISPRI26029 page (used Realtor.com's own county file instead); Bankrate pages rendered (figures from snippets only); share of the median attributable to waterfront (no source quantifies it)"
        ],
        [
          "Checked",
          "2026-09-14 · https://www.redfin.com/city/3829/MI/Charlevoix/housing-market · https://www.redfin.com/zipcode/49720/housing-market · https://econdata.s3-us-west-2.amazonaws.com/Reports/Core/RDC_Inventory_Core_Metrics_Zip.csv · https://data.census.gov/table/ACSDT5Y2024.B25077?g=160XX00US2614780 · https://www.redfin.com/county/1362/MI/Charlevoix-County/housing-market · https://www.huduser.gov/portal/datasets/fmr/fmr2027/FY2027_FMR_Schedule.pdf · https://www.michigan.gov/taxes/-/media/Project/Websites/taxes/4029/Total-Rates-Reports/2025-Total-Rates.pdf · https://www.michigan.gov/treasury/-/media/Project/Websites/treasury/STC/Bulletins/2025/Bulletin-14-of-2025--Inflation-Rate-Multiplier-for-2026.pdf · https://www.bankrate.com/insurance/homeowners-insurance/michigan/ · https://www.bankrate.com/insurance/car/average-cost-of-car-insurance-in-michigan/ · https://www.eia.gov/electricity/sales_revenue_price/pdf/table_5a.pdf · https://livingwage.mit.edu/counties/26029"
        ]
      ],
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
    costs: {"utility": "Cherryland Electric Cooperative", "heatFuel": "propane", "winterHeat": 316.0, "summerBill": 30.0, "utilities": 277.0, "utilitiesNote": "Cherryland Electric Cooperative; electric $119/mo, winter propane $316, summer $30, annualized heating $158/mo", "internet": 40.0, "internetNote": "Spectrum Internet Premier (up to 500 Mbps)", "cell": "4G/5G in village centers, but dead zones in low-lying areas, valleys, and dense forests within Sleeping Bear Dunes", "carIns2": 521.83, "carInsNote": "Bankrate 2025 estimate $3,131/yr per car ($521.83/mo for 2 cars)", "gasPrice": 3.98, "groceries": 980, "groceryNote": "MIT Living Wage Calculator annual food cost for 2 adults $11,760 ($980/mo)", "groceryBasis": "MIT", "waterTrash": 35.0, "homeIns": 243.67, "extras": "$30 annual county solid waste fee; $200-$500 annual private road maintenance agreements", "basketTotal": 2336.3, "sources": "cherrylandelectric.coop, eia.gov, michigan.gov, spectrum.com, verizon.com, bankrate.com, aaa.com, mit.edu, gflenv.com, policygenius.com"},
    money: {"medianPrice": 562257, "effTax": 0.0095, "cityTax": 0, "taxState": "MI", "priceNote": "Empire ZIP 49630, Redfin median sold, 3 months to Aug 2026 (14 sales); Glen Arbor ZIP 49636 is a lakefront market, $2.77M on 6 sales", "countyPrice": 458400, "rent2br": 1500, "rentNote": "HUD FMR FY2027 · FY2027 (effective Oct 1 2026)"},
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
    median: "$562,257 sold (3 months to Aug 2026) · $456,300 ACS value",
    comfort: "$133k in town · $117k in county",
    crime: "1.4–2.9 / 1.8–14.7",
    snow: '117–120"',
    fiber: "9% fiber · 84% cable",
    tax: "17.7–26.5 mills (~1%) — the lowest rates on the list",
    drive: "≈348–370 mi · 5:44–6:24",
    workup: {
      "housing": [
        [
          "Median sold price",
          "$562,257 · 3 months to Aug 2026 · redfin.com · Sources split the two villages, so they are reported separately and NOT re-blended. Redfin median sale price, all home types, ZIP 49630: -3.0% YoY; 14 homes sold in Aug 2026 (19 in Aug 2025); $370/sq ft (+22.3%); 47 days; sale-to-list 99.1%; Compete Score 46. Redfin 'Empire' village page: $625K on 3 sales (+7.8%), 108 days, 2% over list https://www.redfin.com/city/6667/MI/Empire/housing-market"
        ],
        [
          "Second source",
          "$822,000 · Aug 2026 · movoto.com. Movoto 'Glen Arbor' Aug 2026 median sold $822,000 on 32 sales (its area is wider than the ZIP), 70 days (43 last year), 45 active listings."
        ],
        [
          "Price per sq ft",
          "$370/sq ft (Empire ZIP); $853/sq ft (Glen Arbor ZIP) · 3 months to Aug 2026 · redfin.com. Leelanau County $376/sq ft (+7.4%) https://www.redfin.com/county/1392/MI/Leelanau-County/housing-market"
        ],
        [
          "Days on market",
          "47 days (Empire ZIP); 21 sold / 35 pending (Glen Arbor ZIP); 43 county · 3 months to Aug 2026 · redfin.com. Empire ZIP unchanged from 47; county 43 vs 52 a year ago"
        ],
        [
          "Sale-to-list",
          "99.1% (Empire ZIP); 101.2% (Glen Arbor ZIP) · Aug 2026 · redfin.com. Empire -3.6 pt YoY, Glen Arbor +1.9 pt YoY"
        ],
        [
          "Active listings",
          "394 Leelanau County listings on Redfin (all types incl. land) · 2026-09-14 · redfin.com. Movoto Glen Arbor area: 45 active (Aug 2026). No FRED active-listing series for Leelanau."
        ],
        [
          "Year over year",
          "-3.0% (Empire ZIP); +132.2% (Glen Arbor ZIP, n=6); +21.9% (Leelanau County) · 3 months to Aug 2026 vs same period 2025 · redfin.com."
        ],
        [
          "ACS median value (2020–2024)",
          "$456,300 · ACS 2020-2024 5-year (B25077) · api.censusreporter.org. Census ACS via the Census Reporter API. Median gross rent (B25064): Empire twp $1,034 ±$507, Glen Arbor twp $1,073 ±$130; villages not published."
        ],
        [
          "County median (sold)",
          "$682,715 · Aug 2026 · redfin.com. Leelanau County; Redfin median sale +21.9% YoY on 55 sales (64 last year), 43 days, $376/sq ft. Oltersdorf H1 2026: county median $640,000 (vs $662,500 H1 2025), average $937,506, 151 sales (130), volume $141.6M https://www.oltersdorf.com/blog/2026/7/15/2026-home-sales-data-mid-year-review-for-leelanau-amp-grand-traverse. ACS 2020-2024 county value $458,400 ±$13,150 (rent $1,228 ±$90)."
        ],
        [
          "Two-bedroom rent",
          "$1,500 · HUD FMR FY2027 · FY2027 (effective Oct 1 2026) · huduser.gov. Leelanau County, MI HUD Metro FMR Area. FY2026 was $1,497 (+0.2%). No village-level asking-rent source found (no Zumper/Apartments.com market for Glen Arbor or Empire); nearest market Traverse City Zumper 2BR $1,745 (Sep 2026)."
        ],
        [
          "Homestead millage",
          "17.6516 mills · 2025 · michigan.gov. Glen Arbor Twp / Glen Lake Community Schools PRE 17.6516 (20.3516 in the 'with ad valorem special assessment' column); non-PRE 32.7212 / 35.4212. Empire Twp / Glen Lake PRE 19.8715; Village of Empire PRE 26.5378 (non-PRE 41.6074). Glen Arbor Township AOR Oct 2025: summer 2025 levy 12.5844 PRE / 27.6540 non-PRE including a new voter-approved 0.47 mill; winter 2025 township levy rolled back by 0.9851 under Headlee https://glenarbortownship.com/wp-content/uploads/2025/10/2025-AOR-October.pdf"
        ],
        [
          "First-year property tax on the median",
          "$7,461/yr · uncapped on purchase. Empire: 562,257 x 0.5 x 26.5378 / 1000 = $7,461 (village) or x 19.8715 = $5,586 (township). Glen Arbor: 2,774,799 x 0.5 x 17.6516 / 1000 = $24,490 (x 20.3516 with the special assessment = $28,236)."
        ],
        [
          "2026 inflation rate multiplier",
          "1.027 (2.7%) · michigan.gov. STC Bulletin 14 of 2025 (Nov 18 2025). Glen Arbor Twp AOR Jan 2026 computes 311.547/319.9966 = 2.7% and reports a 2026 sales-study ratio of 46.56%, a mark-to-market increase of about $86 million in residential assessed value (2025 ratio 45.74%) https://glenarbortownship.com/wp-content/uploads/2026/02/2026-AOR-January_r1.pdf"
        ],
        [
          "Home insurance",
          "$244/mo · 2026 (Insurance.com, updated 2026-02-24) · insurance.com. Michigan statewide. Fetched: Insurance.com $2,924/yr ($300K dwelling, $300K liability, $1K deductible; updated Feb 24 2026) = $243.67/mo; NerdWallet $2,415/yr ($400K dwelling; Mar 4 2026) = $201.25/mo. Bankrate (the brief's preferred source) shows $2,368/yr for $300K dwelling, rates refreshed Nov 2025 = $197.33/mo, but only in its search snippet: bankrate.com served its homepage to both WebFetch and the browser, so that figure is not verified on-page."
        ],
        [
          "Car insurance, two cars",
          "$455/mo · 2026 (Insurify, updated 2026-09-13) · insurify.com. Michigan statewide full coverage, two cars = 2 x annual / 12. Fetched: Insurify $2,731/yr ($228/mo) -> $455.17; Experian $3,862/yr ($322/mo, Aug 2026 marketplace data, page dated Sep 9 2026) -> $643.67; MoneyGeek $1,652/yr ($138/mo, Aug 29 2026) -> $275.33. Bankrate $3,207/yr ($267/mo) -> $534.50 appears only in its search snippet (page not fetchable). Spread reflects PIP-level assumptions."
        ],
        [
          "Power and heat",
          "$277/mo · electric: Cherryland 2026 rate at EIA Michigan average use; propane: NOT FOUND · michigan.gov. No natural gas. Cherryland Electric Cooperative Schedule A (Residential), bills after Feb 1 2026: availability $36.50/mo + $0.1310/kWh (was $34.50 + $0.1260 from May 1 2025); at the EIA 2024 Michigan average 618 kWh/mo = $36.50 + $80.96 = $117.46 before PSCR/EWR surcharges and sales tax. Propane: EIA Michigan residential $2.370/gal on Mar 30 2026 (last weekly reading of the heating season; Feb 23 $2.360). No sourced annual gallons figure, so the combined prior $277 stands."
        ],
        [
          "Groceries (MIT food line)",
          "$980/mo · MIT 2026 (updated 2026-02-15) · livingwage.mit.edu. Leelanau County, 2 adults (both working), 0 children: food $11,760/yr, the highest of the four. Unchanged from prior."
        ],
        [
          "What the median buys",
          "Empire (Redfin, Jul-Sep 2026): 11566 S Sunset Dr, 3 bd/2.5 ba, 1,260 sq ft, $515,000 (Aug 27, 2% under list, 120 days); 10176 Niagara St, 3 bd/1 ba, 2,724 sq ft, $550,000 (Aug 21, 10% over list, 28 days); 11530 S Benzonia Trl, 3 bd/2 ba, 1,200 sq ft, $400,000 (Aug 13, at list, 31 days); 11256 S Lacore Rd, 3 bd/3 ba, 1,353 sq ft, $880,000 (Jul 20); 7345 W Glenmere Rd $1,675,000 (Sep 8). Glen Arbor: The Homestead resort condos $300K-$490K (1A/1H Fish House 3 bd/2.5 ba 1,808 sq ft $300,000-$350,000; 13 Hawks Nest 1 bd 600 sq ft $380,000; 4 Tall Timber 400 sq ft $450,000); 23 South Beach, 4 bd/3 ba, 2,160 sq ft, $1,400,000 (Sep 3, 7% under, 53 days); lakefront 4515 W Glen Eden Dr 2 bd/2 ba 1,692 sq ft $2,102,000 (20% over list), 4868 W Whispering Pines Ln 4 bd/5 ba 4,041 sq ft $3,450,000, 7566 W Harbor Hwy 4 bd/2.5 ba 1,717 sq ft $3,795,000. Sources: https://www.redfin.com/zipcode/49630/housing-market and https://www.redfin.com/zipcode/49636/housing-market"
        ],
        [
          "The market right now",
          "Two different markets. Empire (ZIP 49630) behaves like a village: 14 August closings, median $562K, down 3% YoY, sale-to-list 99.1%, 47 days, with ordinary 3-bed houses at $400K-$550K. Glen Arbor (ZIP 49636) is a resort and lakefront market: 6 August closings, a 3-month median of $2.77M that swings with every waterfront sale (+132% YoY is noise), Homestead condos at $300K-$490K, and Glen Lake or Lake Michigan frontage at $2M-$4M; hot homes go pending in 12 days at about list. The county median is $682,715 (+21.9%) on 55 August sales after a first half in which the median dipped to $640,000 while the average rose above $937K. Second homes dominate both villages and the year-round stock is thin; Glen Arbor Township is mid-way through a mark-to-market reassessment."
        ],
        [
          "Owning it, all in",
          "Millage is the lowest on the list but the base is high: an Empire village purchase at $562,257 uncaps to about $7,461/yr (26.5378 mills; $5,586 in Empire Twp), and a Glen Arbor ZIP-median lakefront at $2.77M to about $24,490 (17.6516 mills; $28,236 with the township special assessment). No natural gas: Cherryland Electric (2026: $36.50 + 13.1 cents/kWh) plus propane at about $2.37/gal (EIA, Mar 2026). Michigan transfer tax 0.86% ($4,835 on the Empire median) is the seller's. At 6.76% (Freddie Mac, Sep 10 2026) with 20% down ($112,451), P&I on $449,806 is about $2,920/mo; with ~$622/mo tax and ~$200-245/mo insurance the carry is roughly $3,740-3,790/mo before utilities. Leelanau's MIT food line ($980/mo) is the highest of the four."
        ],
        [
          "Not found this round",
          "village-level list median (Realtor.com blocked; no FRED Leelanau series); village-level asking rents (no Zumper/Apartments.com market); Zillow ZHVI for Glen Arbor and Empire (bot check, not bypassed); annual propane consumption for a heat cost; Cherryland PSCR surcharge value; Aspire North Leelanau monthly report page; Bankrate page content; a single defensible blended Glen Arbor/Empire sold median (the two villages are different markets)"
        ],
        [
          "Checked",
          "2026-09-14 · https://www.redfin.com/zipcode/49630/housing-market · https://www.movoto.com/glen-arbor-mi/market-trends/ · https://api.censusreporter.org/1.0/data/show/acs2024_5yr?table_ids=B25077,B25064&geo_ids=16000US2634000,05000US26081,16000US2680340,05000US26055,16000US2649640,05000US26105,16000US2625980,16000US2632360,06000US2608932380,06000US2608926000,05000US26089 · https://www.redfin.com/county/1392/MI/Leelanau-County/housing-market · https://www.huduser.gov/portal/datasets/fmr/fmr2027/FY27_FMRs.xlsx · https://www.michigan.gov/taxes/-/media/Project/Websites/taxes/4029/Total-Rates-Reports/2025-Total-Rates.pdf · https://www.michigan.gov/treasury/-/media/Project/Websites/treasury/STC/Bulletins/2025/Bulletin-14-of-2025--Inflation-Rate-Multiplier-for-2026.pdf · https://www.insurance.com/michigan-homeowners-insurance · https://insurify.com/car-insurance/michigan/average-cost/ · https://www.michigan.gov/mpsc/-/media/Project/Websites/mpsc/consumer/rate-books/electric/cherryland/cherrylandmemberregcur.pdf · https://livingwage.mit.edu/counties/26089"
        ]
      ],
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
    money: {"medianPrice": 293019, "effTax": 0.0186, "cityTax": 0, "taxState": "MI", "countyPrice": 192500, "priceNote": "Cheboygan County median sold, Aug 2026; the village's own sales are too thin (1 in August)", "rent2br": 1104, "rentNote": "HUD FMR FY2027 · FY2027, effective Oct 1, 2026"},
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
    median: "$293,019 sold (Aug 2026 (3-month rolling)) · $224,300 ACS value",
    comfort: "$84k in town · $68k in county",
    crime: "5.9 / 35.4",
    snow: '93"',
    fiber: "6% fiber · 59% cable",
    tax: "36.7–37.5 mills (1.84–1.88%)",
    drive: "≈447 mi · 6:34",
    workup: {
      "housing": [
        [
          "Median sold price",
          "$293,019 · Aug 2026 (3-month rolling) · redfin.com · Redfin 'Mackinaw City, MI' city page and Redfin ZIP 49701 (identical statistics; the ZIP is the village plus Mackinaw and Wawatam townships). Cheboygan County median sold on 35 sales; the village itself closed 1 sale in August (Redfin village 3-month $359,000 on 3-4 sales)"
        ],
        [
          "Second source",
          "$293,019 · Aug 2026 (Redfin chart point, 3-month rolling) · redfin.com. Cheboygan County (the larger of the two counties by sales): $293,019, -19.7% YoY, 35 homes sold in August (37 last year), 47 days on market (49), $172/sq ft (-8.8%). Emmet County side: $452K 3-mo, 17 sold in August (https://www.redfin.com/county/1371/MI/Emmet-County/housing-market). ZIP 49701 page repeats the village figures ($359K, n=1, 72 DOM) https://www.redfin.com/zipcode/49701/housing-market."
        ],
        [
          "Median list price",
          "$456,725 · Aug 2026 · econdata.s3-us-west-2.amazonaws.com. Realtor.com Research ZIP 49701: median listing price $456,725 (+38.8% YoY), 16 active listings, 78 median DOM, $249/sq ft, median 1,689 sq ft, 4 new listings, 0% price-reduced. Cheboygan County: $399,000 (+5.0%), 133 active, 55 DOM, $245/sq ft, 19.7% reduced (county file)."
        ],
        [
          "Price per sq ft",
          "$213/sq ft · Aug 2026 · redfin.com. Redfin village sale $/sq ft (-27.3% YoY, n=1); Cheboygan County $172; Realtor.com ZIP list $249/sq ft."
        ],
        [
          "Days on market",
          "66 days · Aug 2026 · redfin.com. Redfin village card 66 days (ZIP page 72); Cheboygan County 47; Realtor.com ZIP listings 78 median DOM."
        ],
        [
          "Sale-to-list",
          "105.3% (n=1) · Aug 2026 · redfin.com. Redfin card '5.3% over list' is the single August sale (list $349,900, sold $368,500). The other two summer closings went 0% and 5% under list."
        ],
        [
          "Active listings",
          "16 active listings · Aug 2026 · econdata.s3-us-west-2.amazonaws.com. Realtor.com ZIP 49701 active count (19 total incl. pending); Redfin notes '2 condos' for sale last month."
        ],
        [
          "Year over year",
          "-4.3% (village, 3-mo) / -19.7% (Cheboygan County) / +38.8% (ZIP list price) · 3 months ending Aug 2026 vs same period 2025 · redfin.com. Redfin and Realtor.com. On n=1 to 4 the YoY is not meaningful."
        ],
        [
          "ACS median value (2020–2024)",
          "$224,300 · ACS 2020-2024 5-year · data.census.gov. B25077 Mackinaw City village. Unchanged from prior. B25064 median gross rent $865 ±263 (https://data.census.gov/table/ACSDT5Y2024.B25064?g=160XX00US2650320). B25004: 304 vacant units, 271 of them seasonal/recreational/occasional (https://data.census.gov/table/ACSDT5Y2024.B25004?g=160XX00US2650320)."
        ],
        [
          "County median (sold)",
          "$293,019 · Aug 2026 (3-month rolling) · redfin.com. Cheboygan County (Redfin, 35 August sales). Emmet County $452K (17 sales). Realtor.com county LIST medians Aug 2026: Cheboygan $399,000 (+5.0%), Emmet $749,000 (RDC_Inventory_Core_Metrics_County.csv)."
        ],
        [
          "Two-bedroom rent",
          "$1,104 · HUD FMR FY2027 · FY2027, effective Oct 1, 2026 · huduser.gov. Cheboygan County nonmetro FMR: 0BR $788, 1BR $844, 2BR $1,104, 3BR $1,351, 4BR $1,592 (FY2026 2BR $1,054). Units on the Emmet County side of the village fall under Emmet's FMR: 2BR $1,336 FY2027 ($1,235 FY2026). HUD FY2027 Schedule of Metropolitan & Non-Metropolitan FMRs (PDF dated Aug 26, 2026; FY2027 published in the Federal Register Sept 1, 2026, effective Oct 1, 2026 per https://www.nahro.org/news/hud-publishes-fy-2027-fair-market-rents/). HUD's server refused direct fetches (Akamai 202/404), so both schedule PDFs were read through the r.jina.ai text proxy; FY2026 values match MSHDA's schedule 'Effective October 1, 2025' https://www.michigan.gov/mshda/-/media/Project/Websites/mshda/rental/assets/Shared-HCV---PBV/Fair-Market-Rent-Schedule-2025.pdf. FMR is a county 40th-percentile gross rent, not a town asking rent. No asking-rent source exists for the village."
        ],
        [
          "Homestead millage",
          "36.7369 mills · 2025 · michigan.gov. Village of Mackinaw City, Mackinaw City Public Schools: principal residence 36.7369 mills in Mackinaw Twp, Cheboygan County (unit 161110; non-homestead 54.5003) and 37.5470 mills in Wawatam Twp, Emmet County (unit 241150; non-homestead 55.3104). Michigan Treasury 2025 Total Property Tax Rates report, pages 29 and 44."
        ],
        [
          "First-year property tax on the median",
          "$6,594/yr · uncapped on purchase. Cheboygan side: $359,000 x 0.5 x 36.7369 / 1000 = $6,594.27/yr ($550/mo). Emmet side: $359,000 x 0.5 x 37.5470 / 1000 = $6,739.69/yr. On the ACS value $224,300: $4,120.04 to $4,210.90."
        ],
        [
          "2026 inflation rate multiplier",
          "1.027 · michigan.gov. STC Bulletin 14 of 2025, issued November 18, 2025: 'The inflation rate, expressed as a multiplier, to be used in the 2026 Capped Value Formula is 1.027.' Fetched as PDF and read."
        ],
        [
          "Home insurance",
          "$197/mo · 2026 · bankrate.com. Bankrate Michigan average $2,368/yr for $300K dwelling, $1,000 deductible, $100K liability (statewide). CAVEAT: on 2026-09-14 this URL returned Bankrate's homepage to WebFetch, the Browser pane, curl and a text proxy; the $2,368 figure was read from the search-engine snippet of that URL, not the rendered page. Fetched cross-check: insure.com Michigan average $2,896/yr ($241.33/mo), same $300K/$1,000/$100K profile, Quadrant data, page updated Aug 4, 2026: https://www.insure.com/home-insurance/average-cost-of-homeowners-insurance-in-michigan/ (aggregator, last resort)."
        ],
        [
          "Car insurance, two cars",
          "$535/mo · 2026 · bankrate.com. Bankrate Michigan full coverage $3,207/yr per car ($267/mo); two cars = $6,414/yr = $534.50/mo (statewide, no town rating). Same CAVEAT as homeIns: page unreachable on 2026-09-14, figure from the search snippet of that URL. Fetched cross-check: MoneyGeek Michigan full coverage $1,652/yr ($138/mo) per car for a 40-year-old with clean record, good credit, 2012 Camry, updated Aug 29, 2026 (two cars $276/mo): https://www.moneygeek.com/insurance/auto/average-cost-car-insurance-michigan/ (aggregator, last resort)."
        ],
        [
          "Power and heat",
          "$119/mo · EIA 2024 statewide average, electric only · eia.gov. Electric: Consumers Energy (its residential tariff was not fetched); EIA Michigan average bill $119.31/mo (618 kWh at 19.30 c/kWh, 2024). Heat: the prior recorded propane; two supplier-marketing sites (justenergy.com, energyplansnearme.com) claim Consumers Energy natural-gas delivery in Mackinaw City, but no utility page confirmed a gas main in the village, so heat fuel stays 'propane, unverified' and the heat cost is NOT FOUND. If natural gas is present, the EIA statewide gas average adds $71.32/mo for $190.63 total. Prior $119.31 stands (it was the same EIA electric-only figure)."
        ],
        [
          "Groceries (MIT food line)",
          "$625/mo · MIT 2026 (page last updated Feb 15, 2026) · livingwage.mit.edu. Cheboygan County, food, 2 adults 0 children: $7,497/yr = $624.75/mo. Unchanged. Emmet County would be $683.67."
        ],
        [
          "What the median buys",
          "The August sale: 1481 Wenniway Rd in the Wawatam Beach Association, 4 bd / 2 ba / 1,728 sq ft on a corner lot with lake access across the road, listed $349,900, sold $368,500 (Aug 4, 2026, 40 days). Nearby: 20641 Northern Lights Ln Unit 60, 3 bd / 2 ba / 1,600 sq ft condo, $350,000 at list (Jul 20, 45 days); 416 Lakeside Dr, an original-era 3 bd / 1 ba / 894 sq ft cottage with bridge view 'needing TLC', $469,000 after 253 days and a cut from $495,000 (Jul 31); 208 E Jamet St in the village, 3 bd / 1 ba / 1,164 sq ft, $289,000 at list (Jun 1, 27 days). Realtor.com ZIP median listing is 1,689 sq ft at $249/sq ft (Redfin city and recently-sold pages)."
        ],
        [
          "The market right now",
          "There is no market to speak of in winter and barely one in summer: 3 to 4 home closings between June and early September 2026 in the whole ZIP, 16 active listings, 4 new in August. Redfin's -4.3% YoY and 105% sale-to-list rest on one August sale. The tell is the gap between what sells ($289K to $469K) and the ACS value of $224,300 for the village's owner-occupied stock: 271 of 304 vacant units are seasonal, and what trades is lakeside cottages and beach-association houses, not the year-round houses behind the motels. List prices jumped (ZIP median list +38.8% to $456,725) while the county sold median fell 19.7% to $293K on 35 sales, so sellers are asking more and buyers are paying county-level prices for non-view property. Days on market run 47 (county) to 78 (ZIP listings), with the cottage on Lakeside Dr taking 253 days and a 5% cut."
        ],
        [
          "Owning it, all in",
          "At the Redfin median ($359,000) with 20% down at 6.76% (6.76% 30-yr fixed, Freddie Mac PMMS week of Sept 10, 2026 (15-yr 6.09%)): $1,865/mo P&I on a $287,200 loan + first-year uncapped tax $550/mo (36.7369 mills, Cheboygan side; $562/mo at 37.5470 on the Emmet side) + Bankrate statewide home insurance $197.33/mo = about $2,612/mo before utilities. The village has the highest homestead millage of the four (36.7 to 37.5 vs 25.4 to 33.6) because village services stack on township and county levies. Heat: budget for propane unless a gas main is confirmed at the address (two supplier sites claim Consumers gas service; unverified). Electric is Consumers Energy. Which county the parcel sits in also decides the HUD rent area and the treasurer you pay. Michigan transfer tax, seller-paid: state $3.75 per $500 (0.75%) + county $0.55 per $500 (0.11%) = 0.86% (Van Buren County Register of Deeds page https://vanburencountymi.gov/departments/departments-offices/register-of-deeds/michigan-real-estate-transfer-tax/)."
        ],
        [
          "Not found this round",
          "heat cost and confirmation of natural-gas service in the village; Consumers Energy residential tariff; any asking-rent source for the village; local Realtor board monthly median; Zillow ZHVI (blocked; snippet $274,349 +4.4%, unverified); FRED MEDLISPRI26031 page; Bankrate pages rendered; Rocket Homes / realtor.com second sold source"
        ],
        [
          "Checked",
          "2026-09-14 · https://www.redfin.com/city/12940/MI/Mackinaw-City/housing-market · https://www.redfin.com/county/1363/MI/Cheboygan-County/housing-market · https://econdata.s3-us-west-2.amazonaws.com/Reports/Core/RDC_Inventory_Core_Metrics_Zip.csv · https://data.census.gov/table/ACSDT5Y2024.B25077?g=160XX00US2650320 · https://www.huduser.gov/portal/datasets/fmr/fmr2027/FY2027_FMR_Schedule.pdf · https://www.michigan.gov/taxes/-/media/Project/Websites/taxes/4029/Total-Rates-Reports/2025-Total-Rates.pdf · https://www.michigan.gov/treasury/-/media/Project/Websites/treasury/STC/Bulletins/2025/Bulletin-14-of-2025--Inflation-Rate-Multiplier-for-2026.pdf · https://www.bankrate.com/insurance/homeowners-insurance/michigan/ · https://www.bankrate.com/insurance/car/average-cost-of-car-insurance-in-michigan/ · https://www.eia.gov/electricity/sales_revenue_price/pdf/table_5a.pdf · https://livingwage.mit.edu/counties/26031"
        ]
      ],
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
    money: {"medianPrice": 733300, "effTax": 0.0127, "cityTax": 0, "taxState": "MI", "rent2br": 1057, "rentNote": "HUD FMR FY2027 · FY2027, effective Oct 1, 2026", "priceNote": "ACS 2020-2024 median value of owner-occupied homes; no 2026 sold median exists (one closing, price withheld); list median $1.45M on 8 active"},
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
    comfort: "$150k in town",
    crime: "1.7–3.2 / 74–86",
    snow: '87–94"',
    fiber: "0% fiber · 34% cable",
    tax: "25.39 mills (1.27%)",
    drive: "≈447 mi · 6:34 + ferry",
    workup: {
      "housing": [
        [
          "Median home value used",
          "$733,300 · ACS 2020-2024 median value of owner-occupied homes; no 2026 sold median exists (one closing, price withheld); list median $1.45M on 8 active"
        ],
        [
          "Second source",
          "$1,300,000 · 3 months ending Jan 2026 · redfin.com. Same stale Redfin window on the ZIP page. Mackinac County (mainland St. Ignace, Les Cheneaux, Naubinway): Redfin $346,291 Aug 2026, +53.9% YoY, 34 homes sold in August (13 last year), 70 DOM, $245/sq ft https://www.redfin.com/county/1396/MI/Mackinac-County/housing-market. The county number does not describe the island."
        ],
        [
          "Median list price",
          "$1,450,000 · Aug 2026 · econdata.s3-us-west-2.amazonaws.com. Realtor.com Research ZIP 49757: median listing price $1,450,000 (-1.7% YoY), 8 active listings, 61 median DOM, $449/sq ft, median 3,549 sq ft, 4 new listings, none price-reduced. Redfin's recently-sold page also states 'median listing price of $1.45M'. Live listings on the island brokerage (https://mackinacislandrealty.com/homes): 2722 Cadotte Ave, 2 bd, $475,000 ('year-round island residence or seasonal retreat'); 4177 Pine Cove Ln, 5 bd / 3.5 ba / ~3,500 sq ft waterfront, $2,399,000; 8401 & 8373 Beechwood Ct, 6 bd + den Victorian, $1,695,000."
        ],
        [
          "Price per sq ft",
          "$449/sq ft (list) · Aug 2026 · econdata.s3-us-west-2.amazonaws.com. Realtor.com ZIP 49757 list price per sq ft. Redfin's stale Jan 2026 sale card: $302/sq ft (n=1)."
        ],
        [
          "Days on market",
          "61 days (listings) · Aug 2026 · econdata.s3-us-west-2.amazonaws.com. Realtor.com ZIP 49757 median days on market for active listings; the one 2026 closing took 301 days (Redfin)."
        ],
        [
          "Active listings",
          "8 active listings · Aug 2026 · econdata.s3-us-west-2.amazonaws.com. Realtor.com ZIP 49757 active count (10 incl. pending)."
        ],
        [
          "ACS median value (2020–2024)",
          "$733,300 · ACS 2020-2024 5-year · data.census.gov. B25077 Mackinac Island city. The prior said 'ACS value NOT IN DATA'; the 2020-2024 release carries it, with a 30% margin of error. B25064 median gross rent $1,197 ±206 (https://data.census.gov/table/ACSDT5Y2024.B25064?g=160XX00US2650280). Housing stock (DP04 and B25004, same release): 827 housing units, 176 occupied, 651 vacant (79%); of the vacant, 339 seasonal/recreational/occasional, 234 'other vacant' (consistent with employer-owned worker housing), 48 for rent, 8 for sale (https://data.census.gov/table/ACSDT5Y2024.B25004?g=160XX00US2650280)."
        ],
        [
          "County median (sold)",
          "$346,291 · Aug 2026 (3-month rolling) · redfin.com. Mackinac County (Redfin, 34 August sales, mainland). Realtor.com county LIST median Aug 2026 $379,000 (+18.8%), 108 active, 57 DOM, $234/sq ft (RDC_Inventory_Core_Metrics_County.csv)."
        ],
        [
          "Two-bedroom rent",
          "$1,057 · HUD FMR FY2027 · FY2027, effective Oct 1, 2026 · huduser.gov. Mackinac County nonmetro FMR: 0BR $803, 1BR $808, 2BR $1,057, 3BR $1,287, 4BR $1,486 (FY2026 2BR $1,023, +3.3%). County figure; the island's year-round rental stock is 48 vacant-for-rent units (ACS) and most seasonal workers live in employer housing. HUD FY2027 Schedule of Metropolitan & Non-Metropolitan FMRs (PDF dated Aug 26, 2026; FY2027 published in the Federal Register Sept 1, 2026, effective Oct 1, 2026 per https://www.nahro.org/news/hud-publishes-fy-2027-fair-market-rents/). HUD's server refused direct fetches (Akamai 202/404), so both schedule PDFs were read through the r.jina.ai text proxy; FY2026 values match MSHDA's schedule 'Effective October 1, 2025' https://www.michigan.gov/mshda/-/media/Project/Websites/mshda/rental/assets/Shared-HCV---PBV/Fair-Market-Rent-Schedule-2025.pdf. FMR is a county 40th-percentile gross rent, not a town asking rent."
        ],
        [
          "Homestead millage",
          "25.3948 mills · 2025 · michigan.gov. Mackinac Island City (unit 492010), Mackinac Island Public Schools: principal residence 25.3948 mills; non-homestead 33.1948 (the district levies only 7.8 non-homestead mills above homestead, so a second home is taxed at 33.19, not 43.39). Michigan Treasury 2025 Total Property Tax Rates report, page 100."
        ],
        [
          "First-year property tax on the median",
          "$9,311/yr · uncapped on purchase. No 2026 sold median, so computed on the ACS value: $733,300 x 0.5 x 25.3948 / 1000 = $9,311.00/yr. On the Realtor.com list median $1,450,000: $18,411.23/yr (homestead) or $24,066.23 non-homestead. On Redfin's stale $1.3M: $16,506.62."
        ],
        [
          "2026 inflation rate multiplier",
          "1.027 · michigan.gov. STC Bulletin 14 of 2025, issued November 18, 2025: 'The inflation rate, expressed as a multiplier, to be used in the 2026 Capped Value Formula is 1.027.' Fetched as PDF and read."
        ],
        [
          "Home insurance",
          "$197/mo · 2026 · bankrate.com. Bankrate Michigan average $2,368/yr for $300K dwelling, $1,000 deductible, $100K liability (statewide). CAVEAT: on 2026-09-14 this URL returned Bankrate's homepage to WebFetch, the Browser pane, curl and a text proxy; the $2,368 figure was read from the search-engine snippet of that URL, not the rendered page. Fetched cross-check: insure.com Michigan average $2,896/yr ($241.33/mo), same $300K/$1,000/$100K profile, Quadrant data, page updated Aug 4, 2026: https://www.insure.com/home-insurance/average-cost-of-homeowners-insurance-in-michigan/ (aggregator, last resort)."
        ],
        [
          "Car insurance, two cars",
          "$535/mo · 2026 · bankrate.com. Statewide Bankrate figure carried for comparability only: private cars are banned on the island, so a resident's real cost is a mainland-parked car (St. Ignace or Mackinaw City) plus ferry passes. Bankrate Michigan full coverage $3,207/yr per car ($267/mo); two cars = $6,414/yr = $534.50/mo (statewide, no town rating). Same CAVEAT as homeIns: page unreachable on 2026-09-14, figure from the search snippet of that URL. Fetched cross-check: MoneyGeek Michigan full coverage $1,652/yr ($138/mo) per car for a 40-year-old with clean record, good credit, 2012 Camry, updated Aug 29, 2026 (two cars $276/mo): https://www.moneygeek.com/insurance/auto/average-cost-car-insurance-michigan/ (aggregator, last resort)."
        ],
        [
          "Power and heat",
          "$68/mo · Cloverland 2026 tariff x EIA 2024 average use, electric only · cloverland.com. Cloverland Electric Cooperative residential rate effective April 15, 2026: $25.00/mo service charge + $0.04530/kWh energy + PSCR $0.0250/kWh (August 2026) = $0.0703/kWh. At EIA's Michigan average 618 kWh/mo: $25.00 + 618 x 0.0703 = $68.45/mo. Heat is propane, fuel oil, wood or electric (no gas main on the island); heat cost NOT FOUND. Prior $105.71 (method unknown) may be kept if a heat allowance is wanted."
        ],
        [
          "Groceries (MIT food line)",
          "$625/mo · MIT 2026 (page last updated Feb 15, 2026) · livingwage.mit.edu. Mackinac County, food, 2 adults 0 children: $7,497/yr = $624.75/mo. Unchanged. Island grocery prices (one Doud's Market, everything barged and drayed) are above the county line; no source quantifies the premium."
        ],
        [
          "What the median buys",
          "There is no 'median house'. The assessor's 2025 ECF study (https://www.cityofmi.org/media/1421) had to reach back to 2013 to assemble 72 sale rows because there are 'few sales', and it names the tiers: Harrisonville, the inland village where the 492 year-round residents live, traded at $265,000 (2537 Cadotte Ave, Feb 2023), $325,000 (7534 6th St, May 2023) and $393,000 (2788 Cadotte Ave, May 2023), with Mackinac Island Housing Corporation leasehold homes at $117,500 to $122,500 (1213 Franks St, 2022 and 2023); condos on Eckel Dr and Main St at $290,000 to $305,000 (2023); Trillium Heights houses at $665,000 to $735,000 (2023; 2731 Park Dr, the one 2026 closing, last sold $599,000 in 2021); East Bluff/West Bluff historic cottages on state-park leasehold land and Mission District homes at $1.0M to $4.0M (8095 Algonquin $2.6M Jan 2024, 7889 Algonquin $4.0M Jul 2024). Construction costs run 2 to 3 times the state Assessor's Manual because materials are barged and drayed by horse. Current listings: $475,000 (2 bd Cadotte Ave) to $2.4M (5 bd Pine Cove waterfront)."
        ],
        [
          "The market right now",
          "A handful of closings a year and 8 listings: Redfin recorded one 2026 sale with an undisclosed price, the ZIP list median is $1.45M and the ACS owner-occupied value is $733,300 ±$218,799. The stock is 79% vacant in the ACS sense: 339 seasonal cottages and 234 'other vacant' units (worker dormitories) against 176 occupied households, and the assessor counts 1,536 parcels including 27 condominium developments and state-park leasehold cottages. Year-round living means Harrisonville or Trillium Heights at roughly $265K to $735K on 2023 evidence, while anything on the bluffs or the water is a $1M to $4M seasonal cottage. Trajectory since 2020: the ECF study adjusted older sales upward by factors of 1.09 to 1.42 to match 2023-2024 SEV growth, and the 2024 Algonquin St sales set new highs; the county sold median (+53.9% YoY on 34 mainland sales) says nothing about the island. Winter access is by ferry when the straits allow and by small plane when they do not, which is why the school built its own teacher duplex in January 2026."
        ],
        [
          "Owning it, all in",
          "No 2026 sold median, so use the ACS value as the floor and the list median as the ceiling: at $733,300 with 20% down at 6.76% (6.76% 30-yr fixed, Freddie Mac PMMS week of Sept 10, 2026 (15-yr 6.09%)) that is $3,809/mo P&I + $776/mo first-year uncapped tax (25.3948 mills, the lowest of the four) + $197.33/mo statewide insurance = about $4,782/mo; at the $1.45M list median $7,531 + $1,534 + $197.33 = $9,263/mo. Leasehold cottages on state-park land carry a lease, not a deed, and the 234 'other vacant' units are employer housing not on the market. Electric is Cloverland at about $0.07/kWh plus $25; heat is propane or fuel oil delivered by barge and dray, unpriced here. No cars: a mainland car costs Michigan's statewide premium plus winter storage and ferry passes. Insurance on 1880s wood cottages served by a small volunteer department is not covered by the statewide average. Michigan transfer tax, seller-paid: state $3.75 per $500 (0.75%) + county $0.55 per $500 (0.11%) = 0.86% (Van Buren County Register of Deeds page https://vanburencountymi.gov/departments/departments-offices/register-of-deeds/michigan-real-estate-transfer-tax/)."
        ],
        [
          "Not found this round",
          "2026 median sold price (no source; one closing, price withheld); verification of the 3667 Ridge Rd $3.2M Jun 2026 sale (page 403); sale-to-list and sold YoY for 2026; heat cost (propane/fuel oil); island-specific rent; island-specific insurance; Zillow ZHVI (blocked; snippet $497,884 +13.6% as of May 31, 2026, unverified); FRED MEDLISPRI26097 page; Bankrate pages rendered"
        ],
        [
          "Checked",
          "2026-09-14 · https://www.redfin.com/city/12922/MI/Mackinac-Island/housing-market · https://www.redfin.com/zipcode/49757/housing-market · https://econdata.s3-us-west-2.amazonaws.com/Reports/Core/RDC_Inventory_Core_Metrics_Zip.csv · https://data.census.gov/table/ACSDT5Y2024.B25077?g=160XX00US2650280 · https://www.redfin.com/county/1396/MI/Mackinac-County/housing-market · https://www.huduser.gov/portal/datasets/fmr/fmr2027/FY2027_FMR_Schedule.pdf · https://www.michigan.gov/taxes/-/media/Project/Websites/taxes/4029/Total-Rates-Reports/2025-Total-Rates.pdf · https://www.michigan.gov/treasury/-/media/Project/Websites/treasury/STC/Bulletins/2025/Bulletin-14-of-2025--Inflation-Rate-Multiplier-for-2026.pdf · https://www.bankrate.com/insurance/homeowners-insurance/michigan/ · https://www.bankrate.com/insurance/car/average-cost-of-car-insurance-in-michigan/ · https://cloverland.com/rates/ · https://livingwage.mit.edu/counties/26097"
        ]
      ],
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
    costs: {"utility": "DTE Energy", "heatFuel": "natural gas", "utilities": 210.55, "utilitiesNote": "DTE Energy; electric $142, winter gas $200-$400, annualized gas $95", "internet": 75.0, "internetNote": "Xfinity 300 Mbps", "cell": "Verizon coverage is strong in 48226 with 4G LTE and 5G Ultra Wideband; highly rated by RootMetrics with no major dead-zones", "carIns2": 616.0, "carInsNote": "Bankrate Detroit area avg $3,696/yr per car, $7,392/yr for 2 cars ($616/mo)", "gasPrice": 4.17, "groceries": 639.08, "groceryNote": "MIT Living Wage Calculator, Wayne County, 2 adults, $7,669/yr (Feb 2026); the research pass had used Numbeo's higher minimum-food figure", "groceryBasis": "MIT", "waterTrash": 85.0, "homeIns": 303.58, "extras": "Annual Solid Waste Fee of $260-$270 (~$22.50/mo) on summer property tax bill for trash, recycling, and yard waste collection", "basketTotal": 2375.95, "sources": "dteenergy.com, utilitycheck.co, xfinity.com, verizon.com, rootmetrics.com, bankrate.com, gasprices.aaa.com, numbeo.com, detroitmi.gov, policygenius.com"},
    money: {"medianPrice": 104931, "effTax": 0.0321, "cityTax": 0.024, "taxState": "MI", "countyPrice": 178500, "priceNote": "redfin.com median sold, Aug 2026", "rent2br": 1459, "rentNote": "HUD FMR FY2027 · FY2027, effective Oct 1, 2026"},
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
    median: "$104,931 sold (Aug 2026) · $83,900 ACS value",
    comfort: "$74k in town · $88k in county",
    crime: "17.8–18.1 / 43.1–43.6",
    snow: '45"',
    fiber: "18% fiber · 99% cable",
    tax: "64.18 mills (3.21%) + 2.4% city income tax",
    drive: "≈317 mi · 4:44–5:15",
    workup: {
      "housing": [
        [
          "Median sold price",
          "$104,931 · Aug 2026 · redfin.com · Redfin 'Detroit, MI' city page = city proper (all home types). Redfin median sale price, all home types, -2.8% YoY; 1,449 homes sold in Aug 2026 (1,587 in Aug 2025); three-month median $105K. Read via the browser pane 2026-09-14."
        ],
        [
          "Second source",
          "$100,000 · Aug 2026 · movoto.com. Movoto median sold price; 3,404 homes sold in Aug 2026 (3,318 last year); 67 days on market (61); 5,049 active listings, 762 with price reductions (Sept 14, 2026)."
        ],
        [
          "Price per sq ft",
          "$67/sq ft · Aug 2026 · redfin.com. Redfin, down 17.3% YoY."
        ],
        [
          "Days on market",
          "49 days · Aug 2026 · redfin.com. Redfin median days to pending (42 in Aug 2025). Movoto: 67 days."
        ],
        [
          "Sale-to-list",
          "94.8% · Aug 2026 · redfin.com. Redfin sale-to-list, -1.5 pt YoY; average home sells 5% below list; Compete Score 45 'somewhat competitive'."
        ],
        [
          "Active listings",
          "5,049 active listings · as of Sept 14, 2026 · movoto.com. Movoto; 263 new listings, 762 price reductions."
        ],
        [
          "Year over year",
          "-2.8% · Aug 2026 vs Aug 2025 · redfin.com."
        ],
        [
          "ACS median value (2020–2024)",
          "$83,900 · ACS 2020-2024 5-year · data.census.gov. B25077 Detroit city (MOE +/-$1,317). B25064 median gross rent $1,074 (+/-$13): https://data.census.gov/table/ACSDT5Y2024.B25064?g=160XX00US2622000"
        ],
        [
          "County median (list)",
          "$159,900 · Aug 2026 · fred.stlouisfed.org. Wayne County median listing price (Realtor.com via FRED), Jul 2026 $154,750. ACS 2020-2024 county median value $178,500 (+/-$1,776): https://data.census.gov/table/ACSDT5Y2024.B25077?g=050XX00US26163"
        ],
        [
          "Two-bedroom rent",
          "$1,459 · HUD FMR FY2027 · FY2027, effective Oct 1, 2026 · huduser.gov. Detroit-Warren-Livonia, MI HUD Metro FMR Area (Wayne, Oakland, Macomb, St. Clair, Lapeer): 2BR $1,459 (FY2026 $1,411); 1BR $1,167. Current asking inside the city is lower: Zumper Detroit 2BR $1,150, 1BR $945 (Sept 14, 2026, https://www.zumper.com/rent-research/detroit-mi); ACS median gross rent $1,074."
        ],
        [
          "Homestead millage",
          "64.1844 mills · 2025 · michigan.gov. Detroit City (unit 822050) / Detroit City School District, principal residence 64.1844 mills, no ad valorem special assessment; non-homestead 82.1844. Prior's 64.18 confirmed. Plus 2.4% resident city income tax (1.2% nonresident, 2013 and later), https://detroitmi.gov/departments/office-chief-financial-officer/ocfo-divisions/office-treasury/income-tax/income-tax-information"
        ],
        [
          "First-year property tax on the median",
          "$3,367/yr · uncapped on purchase. Citywide: $104,931 x 0.5 x 64.1844 / 1000 = $3,367 per year. University District: $461,277 -> $14,803; Indian Village: $484,991 -> $15,564; Rosedale Park: $266,122 -> $8,540. Detroit's NEZ-Homestead and other abatements can cut this in eligible areas; not applied here."
        ],
        [
          "2026 inflation rate multiplier",
          "1.027 · detroitmi.gov. State Tax Commission Bulletin 14 of 2025 (Nov 18, 2025), read from the City of Detroit-hosted copy; the michigan.gov original returned 403 to the fetcher. 2026 capped value = (2025 taxable value - losses) x 1.027 + additions; the cap does not apply to a buyer's first year because the sale uncaps taxable value."
        ],
        [
          "Home insurance",
          "$304/mo · rates updated Sep 14, 2026 · moneygeek.com. MoneyGeek Detroit average $3,643/yr = $303.58/mo for $250,000 dwelling, $125,000 personal property, $200,000 liability, $1,000 deductible; the same page's Michigan average is $2,195/yr. Insure.com statewide $2,896/yr for $300,000 dwelling (Aug 4, 2026). Bankrate's Detroit $5,003/yr appeared only in a search snippet (page unreachable)."
        ],
        [
          "Car insurance, two cars",
          "$836/mo · Aug 31, 2026 · insurify.com. Insurify Detroit average full-coverage quote $418/month per car x 2 = $836 (statewide $228). MoneyGeek Detroit full coverage $289/mo per car = $578 for two (Aug 29, 2026, https://www.moneygeek.com/insurance/auto/average-cost-car-insurance-michigan/). Detroit ZIP codes are the most expensive in the country for auto insurance; the quote-vs-filing gap is the reason for the spread."
        ],
        [
          "Power and heat",
          "$211/mo · MPSC Aug 1, 2026 rate comparison; DTE Gas order Sept 10, 2026 · michigan.gov. DTE Electric + DTE Gas. Electric: MPSC 'Comparison of Average Rates' dated Aug 1, 2026 lists DTE residential at 24.35 c/kWh for 500 kWh = $121.75/month (23.38 c at 1,000 kWh = $233.80). Gas: the MPSC's Sept 10, 2026 order says 'A typical residential customer using 75 ccf of natural gas per month will see an increase of $2.87, or 3.34%, in their monthly bill' from Oct 1, 2026 (https://www.michigan.gov/mpsc/commission/news-releases/2026/09/10/mpsc-approves-dte-gas-co-infrastructure-investments); $2.87 / 0.0334 = $85.93 implied typical bill before, $88.80 after. $121.75 + $88.80 = $210.55. 500 kWh and 75 ccf are the MPSC's benchmark usages, not a measured Detroit average; EIA's 2024 Michigan average electric bill is $119.31 at 618 kWh. Heat fuel: natural gas."
        ],
        [
          "Groceries (MIT food line)",
          "$639/mo · MIT 2026 (data dated Feb 15, 2026) · livingwage.mit.edu. Wayne County, 2 adults (both working), 0 children: $7,669/yr = $639.08/mo."
        ],
        [
          "Neighbourhood: University District",
          "$461,277 · Aug 2026 · redfin.com. Redfin neighbourhood page; 12 homes sold in Aug 2026 (6 last year); 52 days to pending; sale-to-list 104.2% (+5.0 pt); $118/sq ft (-37.2%); Compete Score 47. Geography: Redfin's University District polygon (Livernois to Wyoming, McNichols to 7 Mile). First-year tax $461,277 x 0.5 x 64.1844 / 1000 = $14,803/yr"
        ],
        [
          "Neighbourhood: Indian Village",
          "$484,991 · Aug 2026 · redfin.com. Redfin neighbourhood page; 9 homes sold in Aug 2026 (9 last year); 33 days (31); $149/sq ft (-3.2%); 'not very competitive'. Historic district east of downtown. First-year tax $484,991 x 0.5 x 64.1844 / 1000 = $15,564/yr"
        ],
        [
          "Neighbourhood: Rosedale Park",
          "$266,122 · Aug 2026 · redfin.com. Redfin neighbourhood page; 14 homes sold in Aug 2026 (11 last year); 39 days (26); $114/sq ft (-0.9%); 'very competitive'. Northwest Detroit brick colonials; North Rosedale Park is a separate Redfin page. First-year tax $266,122 x 0.5 x 64.1844 / 1000 = $8,540/yr"
        ],
        [
          "Neighbourhood: Palmer Woods",
          "$917K (3-month median) · three months ending Aug 2026 · redfin.com. Only 1 sale in Aug 2026 ($1,455,000, 5 bd / 4.5 ba, 4,392 sq ft, 1414 Wellesley Dr); the six sales shown since March range $540,000 to $1,455,000. Thin sample; read as $550K-1.5M, not a median."
        ],
        [
          "Neighbourhood: Corktown",
          "$695K (3-month median) · three months ending Aug 2026 · redfin.com. Only 1 sale in the window (2037 11th St #7, 2 bd / 2.5 ba condo, 2,054 sq ft, $600,000 at list after 155 days); $344/sq ft; Compete Score 16 'not very competitive'. Mostly new-build condos and townhomes; thin sample."
        ],
        [
          "What the median buys",
          "Citywide median buys a 1920s-50s brick bungalow or colonial: Redfin recently sold (Sept 14, 2026) 6789 Asbury Park, 3 bd / 1.5 ba, 2,095 sq ft, $165,000 (3% over list, 2 days); 8247 Ellsworth St, 3 bd / 1.5 ba, 2,136 sq ft, $135,000; 19946 Robson St, 3 bd / 1.5 ba, 2,636 sq ft, $144,000; 6120 Ironwood St, 3 bd / 1 ba, 1,782 sq ft, $87,000; 11327 Whitcomb St, 3 bd / 1 ba, 2,194 sq ft, $45,000 (36% under list). In the neighbourhoods a remote couple would look at, $460K-485K buys a 1920s-30s 3,000+ sq ft Tudor or colonial (University District, Indian Village) and $266K a 1,500-2,000 sq ft brick colonial in Rosedale Park. https://www.redfin.com/city/5665/MI/Detroit/housing-market"
        ],
        [
          "The market right now",
          "Citywide the market is soft: median sold $104,931 (-2.8% YoY), price per square foot down 17.3%, sale-to-list 94.8% and falling, 49 days to pending (up from 42), sales down 9% YoY to 1,449, and Movoto counts 762 of 5,049 active listings with price cuts. The citywide number is a blend of $45,000 rehab shells and $1.4M Palmer Woods estates, so it says little about any street. The neighbourhoods a remote-working couple would consider are a different market: University District $461K (+0.8%, homes going 4% over list), Indian Village $485K (+6.0%), Rosedale Park $266K (+36.5%, 'very competitive'); Palmer Woods and Corktown show 1 sale each in August, so their 3-month medians ($917K, $695K) are anecdotes. Trajectory since 2020: the citywide median has roughly doubled from the $50-60K range but has been flat to down for the last 12 months while the stable neighbourhoods keep appreciating."
        ],
        [
          "Owning it, all in",
          "Citywide median $104,931 with 20% down at 6.76%: P&I $545/month, tax $3,367/yr ($281/mo), insurance about $304/mo, total about $1,129/month. A University District house at $461,277: P&I $2,396, tax $14,803/yr ($1,234/mo), insurance $304, about $3,933/month before utilities. The 64.18-mill rate is the highest on the list and uncaps on sale; the 2.4% resident income tax applies to remote-work wages; auto insurance in Detroit ZIPs is roughly double the state average. Heat is DTE gas (rate up 3.34% Oct 1, 2026). Seller pays the 0.86% transfer tax."
        ],
        [
          "Not found this round",
          "listMedian (city level); Zillow ZORI; Bankrate 2026 insurance pages; reliable Palmer Woods and Corktown medians (1 sale each)"
        ],
        [
          "Checked",
          "2026-09-14 · https://www.redfin.com/city/5665/MI/Detroit/housing-market · https://www.movoto.com/detroit-mi/market-trends/ · https://data.census.gov/table/ACSDT5Y2024.B25077?g=160XX00US2622000 · https://fred.stlouisfed.org/series/MEDLISPRI26163 · https://www.huduser.gov/portal/datasets/fmr/fmr2027/FY27_FMRs.xlsx · https://www.michigan.gov/taxes/-/media/Project/Websites/taxes/4029/Total-Rates-Reports/2025-Total-Rates.pdf · https://detroitmi.gov/sites/detroitmi.localhost/files/2026-01/Bulletin%2014%20of%202025-%20Inflation%20Rate%20Multiplier%20for%202026.pdf · https://www.moneygeek.com/insurance/homeowners/average-cost-home-insurance-michigan/ · https://insurify.com/car-insurance/michigan/average-cost/ · https://www.michigan.gov/mpsc/-/media/Project/Websites/mpsc/consumer/electric/rates1.pdf · https://livingwage.mit.edu/counties/26163"
        ]
      ],
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
    costs: {"utility": "Bluewater Power / Enbridge Gas", "heatFuel": "natural gas", "winterHeat": 106.5, "summerBill": 28.4, "utilities": 159.75, "utilitiesNote": "Bluewater Power electric $130 CAD ($92.30 USD), Enbridge Gas winter $150 CAD ($106.50 USD), summer $40 CAD ($28.40 USD); converted at 0.71 CAD to USD", "internet": 46.15, "internetNote": "Oxio 300 Mbps (Cogeco lines)", "cell": "Roams on Bell/Rogers/Telus with solid coverage; variable signal near St. Clair River waterfront due to cross-border interference.", "carIns2": 206.61, "carInsNote": "Rates.ca avg $2,055 CAD/yr per car, $3,493 CAD/yr ($291 CAD/mo) for 2 cars with 15% discount; converted at 0.71 CAD to USD", "gasPrice": 3.84, "groceries": 651.78, "groceryNote": "Numbeo min food expense $459 CAD/person ($918 CAD/mo for 2 adults); converted at 0.71 CAD to USD", "groceryBasis": "Numbeo", "waterTrash": 60.35, "homeIns": 157.16, "extras": "None; trash and recycling covered by 1.73% property tax rate; HOA fees apply only to condos/townhouses.", "basketTotal": 1550.89, "sources": "oeb.ca, enbridgegas.com, cogeco.ca, verizon.com, rates.ca, gasbuddy.com, numbeo.com, sarnia.ca"},
    money: {"medianPrice": 356988, "effTax": 0.0125, "cityTax": 0, "taxState": null, "priceNote": "CREA Q2 2026 median single-detached CA$495,000 at BoC 1.3866 (2026-09-11)", "rent2br": 1118, "rentNote": "Zumper · Sep 14, 2026"},
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
    median: "$356,988 sold (Q2 2026)",
    comfort: "≈US$83k",
    crime: "11.9 / 34.5",
    snow: '44.1"',
    fiber: "Canadian providers",
    tax: "Ontario property tax ~2.1%",
    drive: "≈377 mi · 5:35",
    workup: {
      "housing": [
        [
          "Median sold price",
          "$356,988 · Q2 2026 · creastats.crea.ca · Sarnia-Lambton Association of REALTORS MLS area = all of Lambton County (Sarnia, Point Edward and the county), all residential types. CREA/SLAR median SALE price, single-detached homes, second quarter 2026, down 2.9% YoY. Unchanged from the prior's CA$495k; the USD figure moved only because the exchange rate did (0.71 -> 0.7212)."
        ],
        [
          "Second source",
          "$386,427 · Aug 2026 · creastats.crea.ca. Sarnia-Lambton Association of REALTORS via CREA: AVERAGE price of homes sold Aug 2026 CA$535,819, +2.4% YoY; 136 sales (-4.2%); year-to-date average CA$528,783 (-1.9%). MLS HPI composite/single-family benchmark CA$489,900 (-2.6% YoY, ~US$353,310)."
        ],
        [
          "Active listings",
          "692 active listings; 5.1 months of inventory · end of Aug 2026 · creastats.crea.ca. Active listings +6.8% YoY; 317 new listings in Aug 2026, 'the largest number of new listings added in the month of August in more than 35 years'; months of inventory 5.1 vs 4.6 a year earlier."
        ],
        [
          "Year over year",
          "+2.4% (average); -2.9% (Q2 median); -2.6% (HPI benchmark) · Aug 2026 vs Aug 2025 (average, HPI); Q2 2026 vs Q2 2025 (median) · creastats.crea.ca. Year-to-date average -1.9%."
        ],
        [
          "County median (sold)",
          "$356,988 · Q2 2026 · creastats.crea.ca. Lambton County: the board area IS the county, so the headline figures above are county-wide."
        ],
        [
          "Two-bedroom rent",
          "$1,118 · Zumper · Sep 14, 2026 · zumper.com. Zumper median asking rent, Sarnia, 2-bedroom CA$1,550 (-3% YoY); 1BR CA$1,429; 3BR CA$1,875; all-units average CA$1,485. CMHC Oct 2025 survey figure for Sarnia NOT FOUND (CMHC HMIP portal returned a server error for the Sarnia table; Rentals.ca returns 403)."
        ],
        [
          "First-year property tax on the median",
          "$2,825/yr · uncapped on purchase. Rate x sale price does not apply in Ontario. The City of Sarnia's 2026 budget (p.17) estimates the 2026 total tax bill for a single-family detached home assessed at CA$219,737 at CA$3,917 (+CA$107 over 2025); a residence assessed at CA$100,000 = CA$1,782; condominium (assessed CA$148,778) CA$2,652. 2024 BMA study average taxes paid in Sarnia CA$3,723 (p.16). For scale only: 1.797234% x the CA$495,000 Q2 median = CA$8,896, which is what a home ASSESSED at today's price would pay; nobody is, because assessments are frozen at 2016 values."
        ],
        [
          "2026 inflation rate multiplier",
          "n/a - Ontario · . No Michigan-style cap; assessments frozen at Jan 1, 2016 values pending a provincial reassessment."
        ],
        [
          "Home insurance",
          "$157/mo · Q2 2026 · rates.ca. Rates.ca Home Insuramap estimated average premium, Sarnia, Q2 2026 (Ontario average CA$2,235). Lowest FSA N7W CA$2,313, highest N7T CA$2,738. Fetched in the Browser pane 2026-09-14."
        ],
        [
          "Car insurance, two cars",
          "$247/mo · 2026 (as of March 2026; page updated Jun 9, 2026) · rates.ca. Rates.ca average car insurance premium in Sarnia CA$2,055/yr per car (22.56% below the Ontario average CA$2,653). Two cars = CA$4,110/yr. Note Ontario made several accident benefits optional on Jul 1, 2026."
        ],
        [
          "What the median buys",
          "NOT FOUND from a fetched listing source (realtor.ca not fetchable; Zolo's Sarnia trends page is stale, last updated 2016-2017). What the figures say: the Q2 2026 single-detached median is CA$495,000 and the HPI single-family benchmark CA$489,900, so a typical detached house in the SLAR area trades just under CA$500k (~US$355k)."
        ],
        [
          "The market right now",
          "A buyer's market by the board's own measure: 5.1 months of inventory at the end of August 2026 (4.6 a year earlier), 692 active listings (+6.8%) and a record August for new listings (317). Prices are flat-to-soft: the Aug 2026 average rose 2.4% YoY to CA$535,819 but the year-to-date average is down 1.9%, the Q2 median single-detached is down 2.9% to CA$495,000, and the HPI benchmark is down 2.6% to CA$489,900. Sales volume slipped 4.2% YoY (136). In US dollars the market looks ~1.5% cheaper than in August only because the loonie weakened (BoC 1.3866 vs the prior's 0.71 conversion)."
        ],
        [
          "Owning it, all in",
          "Keep the existing note: a US citizen needs a work permit or permanent residence to live there. On the purchase itself two extra costs apply to a non-citizen/non-PR buyer: Canada's Prohibition on the Purchase of Residential Property by Non-Canadians Act runs to January 1, 2027 (https://www.canada.ca/en/department-finance/news/2024/02/government-announces-two-year-extension-to-ban-on-foreign-ownership-of-canadian-housing.html), and Ontario's Non-Resident Speculation Tax is 25% of the price province-wide (CA$133,955 on the Aug average), rebatable only if the buyer becomes a permanent resident within four years (https://www.ontario.ca/document/non-resident-speculation-tax). Ontario land transfer tax on CA$535,819 is CA$7,191 (buyer pays). Property tax is on the 2016-base MPAC assessment, so a typical detached bill is ~CA$3,900, not 1.8% of price. Financing: Ratehub's lowest 5-year fixed is 4.09% (insured, as of Sep 14, 2026, BoC overnight 2.25%, https://www.ratehub.ca/best-mortgage-rates/5-year/fixed); 80% of the Aug average = CA$428,655, P&I CA$2,284/mo on a 25-year amortization (~US$1,647), or CA$2,783 at the brief's 6.76% US rate for comparison. Heat is Enbridge natural gas; power is Bluewater Power at OEB regulated prices."
        ],
        [
          "Not found this round",
          "Median list price; Price per sq ft; Days on market; Sale-to-list; CMHC 2025 Sarnia 2BR average rent; Rentals.ca report (403); Typical-home listing example; Combined utilities total; Two-adult food line; Sarnia average MPAC assessed value (city gives a CA$219,737 detached example instead)"
        ],
        [
          "Checked",
          "2026-09-14 · https://creastats.crea.ca/mls/sarn-median-price/ · https://creastats.crea.ca/board/sarn/ · https://www.zumper.com/rent-research/sarnia-on · https://www.sarnia.ca/living-here/my-taxes/tax-rates/ · https://rates.ca/insurance-quotes/home/sarnia · https://rates.ca/insurance-quotes/auto/sarnia · https://www.oeb.ca/consumer-information-and-protection/electricity-rates · https://lambtonpublichealth.ca/wp-content/uploads/2026/03/Monitoring-Food-Affordability-Lambton-2025-Report.pdf"
        ]
      ],
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
    costs: {"utility": "Enwin Utilities / Enbridge Gas", "heatFuel": "natural gas", "winterHeat": 85.2, "summerBill": 28.4, "utilities": 163.3, "utilitiesNote": "CAD converted to USD at 0.71. Enwin Utilities electricity ~$106.50/mo ($150 CAD); Enbridge Gas (natural gas) winter ~$85.20 ($120 CAD), summer ~$28.40 ($40 CAD)", "internet": 41.17, "internetNote": "Cogeco 1 Gbps", "cell": "Verizon roams on Bell/Rogers/Telus in Canada with good coverage in urban areas; no native towers", "carIns2": 304.82, "carInsNote": "CAD converted to USD at 0.71. Rates.ca avg $2,576 CAD/yr per car, monthly for 2 cars is $304.82 USD ($429.33 CAD)", "gasPrice": 4.57, "groceries": 655.83, "groceryNote": "CAD converted to USD at 0.71. Numbeo estimated monthly food costs for 2 adults ($923.70 CAD)", "groceryBasis": "Numbeo", "waterTrash": 37.57, "homeIns": 149.83, "extras": "None; no HOA fees, trash/recycling included in property taxes, Land Transfer Tax is one-time closing cost", "basketTotal": 1626.65, "sources": "enwin.com, enbridgegas.com, cogeco.ca, verizon.com, rates.ca, gasbuddy.com, numbeo.com, citywindsor.ca"},
    money: {"medianPrice": 382230, "effTax": 0.021, "cityTax": 0, "taxState": null, "priceNote": "CREA Q2 2026 median single-detached CA$530,000 at BoC 1.3866 (2026-09-11)", "rent2br": 1248, "rentNote": "Zumper · Sep 2026"},
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
    median: "$382,230 sold (Q2 2026)",
    comfort: "≈US$136k net",
    crime: "9.5–13.5 / 27–39",
    snow: '47"',
    fiber: "Canadian providers",
    tax: "2.10% property (2026 rate)",
    drive: "≈321 mi · 5:35",
    workup: {
      "housing": [
        [
          "Median sold price",
          "$382,230 · Q2 2026 · stats.crea.ca · Windsor-Essex County Association of REALTORS (WECAR) area = Essex County including the City of Windsor; WECAR reports AVERAGE price monthly, CREA a MEDIAN quarterly (single-detached). CREA/WECAR median SALE price, single-detached, Q2 2026, down 2.8% YoY; apartment units CA$348,500 (-8.3%)."
        ],
        [
          "Second source",
          "$406,729 · Aug 2026 · jpcorrent.com. WECAR Residential Stats President's Report for Aug 2026 as republished by a Windsor real estate lawyer: average selling price CA$563,971 (-0.08% vs CA$564,428 in Aug 2025; +3.15% vs July's CA$546,739); 428 sales (-8.55%); 1,127 listings (-3.34%). WECAR's own monthly-stats page renders only navigation (JS) and its PDF link was not exposed. CREA board page (https://creastats.crea.ca/board/wind/) still shows July 2026: 522 sales, average CA$541,019 (-7% YoY), YTD average CA$543,624 (-3.9%), HPI composite benchmark CA$579,100 (+0.9%), 2,307 active listings, 4.4 months of inventory. City-area: Windsor + LaSalle + Tecumseh Aug 2026 average CA$522,962 (~US$377,154), 282 sales (https://www.mattbiggley.ca/market-data, CREA residential market activity table)."
        ],
        [
          "Days on market",
          "19 days (median) · Aug 2026 · mattbiggley.ca. Windsor + LaSalle + Tecumseh reporting area, CREA residential activity table for Aug 2026; months of inventory 4.9."
        ],
        [
          "Sale-to-list",
          "100.2% · Aug 2026 · mattbiggley.ca. Windsor + LaSalle + Tecumseh sub-area."
        ],
        [
          "Active listings",
          "1,127 listings (WECAR area, Aug 2026); 1,390 active in Windsor/LaSalle/Tecumseh · Aug 2026 · jpcorrent.com. WECAR Aug 2026 listings 1,127 (-3.34% YoY). Sub-area: 825 new, 1,390 active, 4.9 months of inventory (mattbiggley.ca). CREA July: 2,307 active, 4.4 months."
        ],
        [
          "Year over year",
          "-0.08% (WECAR average); -2.8% (Q2 median single-detached); +0.9% (HPI, July) · Aug 2026 vs Aug 2025; Q2 2026 vs Q2 2025; Jul 2026 vs Jul 2025 · jpcorrent.com."
        ],
        [
          "County median (sold)",
          "$382,230 · Q2 2026 · stats.crea.ca. Essex County: the WECAR area is the county; headline figures are county-wide, the Windsor/LaSalle/Tecumseh average is the nearest city-area figure."
        ],
        [
          "Two-bedroom rent",
          "$1,248 · Zumper · Sep 2026 · zumper.com. Zumper median asking rent, Windsor, 2-bedroom CA$1,730 (+1% YoY); 1BR CA$1,380; 3BR CA$1,925; all-units median CA$1,502 (-6%). CMHC (Oct 2025 survey, 2025 Rental Market Report): purpose-built 2-bedroom average CA$1,454 (+3.6%), vacancy 3.7%, per https://www.am800cklw.com/news/average-two-bedroom-rent-in-windsor-climbs-despite-soft-market.html (Dec 15, 2025)."
        ],
        [
          "2026 inflation rate multiplier",
          "n/a - Ontario · ."
        ],
        [
          "Home insurance",
          "$150/mo · Q2 2026 · rates.ca. Rates.ca Home Insuramap estimated average premium, Windsor, Q2 2026 (Ontario average CA$2,235); lowest FSA N8N CA$2,225, highest N9H CA$2,728. Fetched in the Browser pane 2026-09-14."
        ],
        [
          "Car insurance, two cars",
          "$310/mo · 2026 (as of March 2026; page updated May 21, 2026) · rates.ca. Rates.ca average car insurance premium in Windsor CA$2,576/yr per car (2.89% below Ontario's CA$2,653); lowest FSA N8V CA$2,285, highest N9C CA$2,779. Two cars = CA$5,152/yr."
        ],
        [
          "What the median buys",
          "NOT FOUND from a fetched listing source (realtor.ca not fetchable; Zolo's Windsor page is stale, 2017 data). What the figures say: the Q2 2026 single-detached median is CA$530,000, the HPI composite benchmark CA$579,100 (July), apartments CA$348,500 median, and the Windsor/LaSalle/Tecumseh August average CA$522,962, so a typical detached house in the city area trades in the low CA$500,000s (~US$375-385k)."
        ],
        [
          "The market right now",
          "Flat and loosening. WECAR's Aug 2026 average of CA$563,971 is essentially unchanged from Aug 2025 (-0.08%) after a 3.15% bounce from July; sales fell 8.55% YoY to 428 and months of inventory sit at 4.4-4.9 depending on the area, up from 3.9 a year earlier, which CREA classes as balanced-to-buyer-favoured. The median single-detached slipped 2.8% YoY to CA$530,000 in Q2 and apartments fell 8.3%, while the HPI benchmark is +0.9%, so headline averages are being held up by mix. Homes in the city area still go quickly (median 19 days) at list (100.2%). Windsor's October 2025 unemployment rate of 10.1% was the highest of any Canadian metro (CMHC/StatCan via am800), which is the demand-side reason rents and prices are soft. In USD the market is ~1.6% cheaper than the prior's conversion only because of the exchange rate."
        ],
        [
          "Owning it, all in",
          "Keep the existing note: a US citizen needs a work permit or permanent residence to live there. Purchase costs for a non-citizen/non-PR: the federal foreign-buyer prohibition runs to January 1, 2027 (canada.ca release of Feb 4, 2024) and Ontario's 25% Non-Resident Speculation Tax applies province-wide (CA$140,993 on the Aug average; rebatable if permanent residence is obtained within four years, ontario.ca). Ontario land transfer tax on CA$563,971 is CA$7,754 (buyer pays). Property tax is on the 2016-base assessment: 2.096514% total rate, and the city says the average household's total residential charges including water are CA$5,402/yr. Financing at Ratehub's 4.09% 5-year fixed (insured, Sep 14, 2026): 80% of the Aug average = CA$451,177, P&I CA$2,404/mo on 25 years (~US$1,734), or CA$2,929 at the brief's 6.76%. Heat is Enbridge natural gas; power is ENWIN at OEB regulated prices; rates.ca puts Windsor home insurance above every other large Ontario city because of flood exposure."
        ],
        [
          "Not found this round",
          "Median list price; Price per sq ft; WECAR's own Aug 2026 PDF (JS page; figures taken from a republication); Windsor average MPAC assessed value; Typical-home listing example; Combined utilities total; Two-adult food line; Rentals.ca report (403)"
        ],
        [
          "Checked",
          "2026-09-14 · https://stats.crea.ca/mls/wind-median-price/ · https://www.jpcorrent.com/windsor-essex-county-residential-stats-report-for-august-2026/ · https://www.zumper.com/rent-research/windsor-on · https://citywindsor.ca/Documents/city-hall/taxes-and-assessment/Tax-Documents/Residential%20Tax%20Rates.pdf · https://rates.ca/insurance-quotes/home/windsor · https://rates.ca/insurance-quotes/auto/windsor · https://www.oeb.ca/consumer-information-and-protection/electricity-rates · https://www.wechu.org/healthy-eating/nutritious-food-basket"
        ]
      ],
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
      "Proposal A caps taxable value while one owner holds a house; on sale it resets to ~50% of market value. The seller's advertised tax bill is not yours — a long-held home's bill can double, and a first-year Detroit buyer recently got a $19,686 bill the listing never hinted at. After that first year the cap grows by the inflation rate multiplier, 1.027 for 2026 (State Tax Commission Bulletin 14 of 2025). Each town's 'Buying here, realistically' rows show the first-year bill on the current median. File the Principal Residence Exemption (Form 2368, by June 1 or Nov 1) for up to 18 mills off.",
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
