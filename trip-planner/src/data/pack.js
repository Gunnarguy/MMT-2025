/**
 * Weather, the pre-trip to-do list, and the bag.
 *
 * The packing list is deliberately not generic. Two days drive almost all of
 * it: the Sleeping Bear dune climb on Wednesday (loose sand, no shade, biting
 * flies) and the Mackinac Island day on Friday (open ferry deck, sustained wind
 * off the Straits, eight miles on a bike). Everything else is a road trip.
 *
 * WEATHER figures are eleven-year averages (2015–2025) for the September 14–21
 * window, not month-wide September normals — mid-September is meaningfully
 * warmer than the back half of the month, and the trip was being planned as if
 * it were October.
 */

export const WEATHER = {
  places: [
    { place: "Grand Rapids", high: 78, low: 59, note: "Warmest stop. Tue 9/15" },
    { place: "Ludington", high: 71, low: 60, note: "Lake-cooled. 7:58pm sunset" },
    { place: "Traverse City", high: 75, low: 59, note: "Wettest odds, ~25%" },
    { place: "Mackinaw City", high: 71, low: 57, note: "Wind averages 13 mph" },
    { place: "Sarnia, ON", high: 74, low: 59, note: "Sat 9/19" },
    { place: "Detroit", high: 76, low: 60, note: "Sun 9/20" },
  ],
  source: "ERA5 reanalysis via Open-Meteo, 2015–2025 averages for Sept 14–21",
  sourceUrl: "https://open-meteo.com/en/docs/historical-weather-api",
  flags: [
    {
      level: "info",
      title: "This is late summer, not fall",
      body:
        "Afternoons in the mid-70s, mornings in the upper 50s. The cold-morning version is real — the window has seen 41°F — but it's the tail, not the norm, and the same week has hit 89°F at the Straits. Pack for a thirty-degree swing inside a single day rather than for one season.",
    },
    {
      level: "warn",
      title: "Don't come for the color — it isn't there yet",
      body:
        "Northern Lower Michigan peaks in the second and third weeks of October. On September 17–19 the Tunnel of Trees and the Charlevoix–Petoskey corridor will be green, with scattered early maples and sumac at most. This is a lake-and-shoreline trip that happens to be in September, and it's worth saying so before anyone gets their hopes up.",
    },
    {
      level: "warn",
      title: "The island day is the one that punishes bad layers",
      body:
        "Friday starts around 50°F on an open ferry deck crossing the Straits, with sustained wind in the low teens and stronger gusts, then warms to the mid-60s while you're eight miles into a bike loop with no shelter. Roughly a one-in-three chance of rain on any given day of the trip. A fleece is not a windproof layer; bring an actual shell.",
    },
  ],
};

export const PREP = [
  {
    id: "passports",
    text: "Check all three passports and their expiry dates",
    note: "All three travelers need a valid passport book or card for the Ontario border crossing",
  },
  {
    id: "budget-canada",
    text: "Tell Budget at pickup you're driving into Ontario",
    note: "Monday 9/14, 7pm. They issue the Canadian Non-Resident Insurance Card free — it must stay in the car. Confirm the branch permits it first: 800-218-7992",
  },
  {
    id: "call-hotels",
    text: "Call all four booked hotels: three adults, room type, real rate",
    note: "Not one of them publishes maximum occupancy. \"One room, three adults\" is the kind of assumption that surfaces at 9pm at a front desk. Numbers are on the Stays page",
  },
  {
    id: "meyer-may",
    text: "Reserve the Meyer May House tour for Tuesday 9/15",
    note: "It's free, it's open Tuesdays 10–1, and it is not a drive-by — but September slots are already showing sold out. 616-246-4821",
  },
  {
    id: "sleeping-bear-pass",
    text: "Buy the Sleeping Bear vehicle pass online",
    note: "$25 at recreation.gov/sitepass/74294. The park has been cashless since 2023 and cell service in the dunes is unreliable — screenshot the QR code",
  },
  {
    id: "tc-dinner",
    text: "Book Wednesday dinner in Traverse City",
    note: "Trattoria Stella via Resy, or The Cooks' House by phone — 26 seats, phone only, and it will not have a walk-in table",
  },
  {
    id: "frankenmuth",
    text: "Reserve Saturday lunch at Zehnder's or the Bavarian Inn",
    note: "You arrive on the Saturday of Oktoberfest. Walking in unreserved on the peak day is a gamble. Zehnder's 989-652-0429, Bavarian Inn 989-652-9941",
  },
  {
    id: "belleville",
    text: "Settle Belleville: Julia's, or re-shop the Hampton Inn",
    note: "$267 is high for a Belleville Sunday. Either way the last night needs a decision before you're driving toward it",
  },
  {
    id: "tunnel-of-trees",
    text: "Check the M-119 Tunnel of Trees closure before Thursday",
    note: "Washed-out culverts closed several sections in 2026 with no announced reopening. If it's still shut, Thursday goes straight up US-31 and you gain an hour",
  },
  {
    id: "fx-card",
    text: "Pick one no-foreign-transaction-fee card, and tell both issuers",
    note: "Every crossing on this route is cashless. A declined tap in a toll lane with no cash option is a genuinely bad few minutes",
  },
  {
    id: "phone-plans",
    text: "Each person checks their own plan's Canada terms",
    note: "This varies by plan, not just by carrier. Phones can also start roaming on Canadian towers while still in Port Huron and Detroit — turn data roaming off until you're actually across",
  },
  {
    id: "offline-maps",
    text: "Download offline maps and the NPS app before leaving",
    note: "Sleeping Bear, the Straits, Sarnia, Windsor and Detroit. The NPS app carries the Pierce Stocking audio tour, which needs downloading in advance",
  },
  {
    id: "insurance-copies",
    text: "Print backup copies of Canada Insurance Card",
    note: "Printed backup copies of the insurance card to keep in the glovebox.",
  },
  {
    id: "ferry-tickets",
    text: "Confirm Shepler's ferry tickets in hand",
    note: "Good for any departure time on Friday. Shepler's Mackinaw City dock phone is 231-436-5023.",
  },
  {
    id: "midrive",
    text: "Check MDOT's Mi Drive for construction the week before",
    note: "US-131 through Grand Rapids has ramp closures running to mid-November, and I-75 and I-94 are perennial work zones",
  },
];

export const PACK = [
  {
    group: "Documents & money",
    why: "The Canada leg makes this the one group where forgetting something can't be fixed on the road.",
    items: [
      { id: "p-passport", text: "Passport book or card — all three" },
      { id: "p-license", text: "Driver's licenses for every named driver" },
      { id: "p-insurance", text: "Canada Non-Resident Insurance Card, printed" },
      { id: "p-fxcard", text: "No-foreign-transaction-fee card, plus a backup" },
      { id: "p-cash", text: "US cash", note: "$54 in singles and fives covers the Grand Hotel horse taxi, which is cash only" },
      { id: "p-confirmations", text: "Hotel and ferry confirmations, saved offline" },
    ],
  },
  {
    group: "Layers",
    why: "Upper 50s at dawn to mid-70s by mid-afternoon, every day. The Straits run ten degrees colder than everywhere else and windy on top of it.",
    items: [
      { id: "p-shell", text: "Windproof shell", note: "Genuinely windproof. Friday's ferry deck and the M-185 loop are both fully exposed" },
      { id: "p-fleece", text: "Fleece or warm mid-layer" },
      { id: "p-tshirts", text: "Short sleeves for the afternoons" },
      { id: "p-longpants", text: "Long pants", note: "Also your defence against stable flies on the Sleeping Bear beaches — they bite below the knee and bug spray barely works" },
      { id: "p-hat", text: "A hat that won't blow off" },
      { id: "p-gloves", text: "Thin gloves", note: "For the open ferry deck at 7:30am" },
      { id: "p-swim", text: "Swimsuit", note: "Two indoor pools, and North Bar Lake is warmer than Lake Michigan" },
      { id: "p-nice", text: "One outfit that isn't jeans", note: "Grand Hotel's parlor-level dress code kicks in at 6:30pm and includes the front porch" },
    ],
  },
  {
    group: "Feet",
    why: "The dune climb is 284 feet of loose sand, and Friday is eight miles of bike plus a fort on a hill.",
    items: [
      { id: "p-shoes", text: "Broken-in walking shoes", note: "Not new ones. Friday is a long day on them" },
      { id: "p-sandals", text: "Sandals or water shoes", note: "For the breakwater, the beaches and the toe-dip" },
      { id: "p-socks", text: "More socks than days", note: "Sand and lake water both find their way in" },
    ],
  },
  {
    group: "Car & tech",
    why: "Eight days, roughly 1,430 miles, and long stretches with unreliable service.",
    items: [
      { id: "p-charger", text: "Multi-port car charger and long cables", note: "Three phones, one cigarette lighter" },
      { id: "p-mount", text: "Phone mount for navigation" },
      { id: "p-battery", text: "Power bank", note: "Friday you're off the car all day" },
      { id: "p-drybag", text: "Dry bag or a zip-lock for phones", note: "The upper ferry deck gets spray" },
      { id: "p-cooler", text: "Small cooler", note: "Empty it of fruit before both border crossings — fresh produce is prohibited entering the US" },
      { id: "p-binoculars", text: "Binoculars", note: "Freighters through the Straits, and the Manitou Islands from Empire Bluff" },
    ],
  },
  {
    group: "Beach & dunes",
    why: "Two stone hunts, one dune climb, and a lot of shoreline.",
    items: [
      { id: "p-spray", text: "Spray bottle for the Petoskey stone hunt", note: "Dry they look like grey gravel; wet, the honeycomb pattern appears" },
      { id: "p-bag", text: "A bag for stones", note: "Michigan allows 25 lbs per person per year from state land — but nothing at all may leave Sleeping Bear. That's federal" },
      { id: "p-towel", text: "Quick-dry towel" },
      { id: "p-sunscreen", text: "Sunscreen", note: "There is no shade anywhere on the dunes or on M-185" },
      { id: "p-sunglasses", text: "Sunglasses", note: "Glare off the water is the whole trip" },
    ],
  },
  {
    group: "Health & sleep",
    why: "Four different hotels across the week — staying rested and comfortable keeps the trip enjoyable.",
    items: [
      {
        id: "p-sleep",
        text: "Sleep aids & Melatonin",
        note: "Earplugs, eye masks, and personal sleep aids in labelled containers",
      },
      { id: "p-earplugs", text: "Earplugs", note: "Recommended for light sleepers across hotel stays" },
      { id: "p-meds", text: "Prescriptions & daily medications" },
      { id: "p-motion", text: "Motion sickness remedies", note: "For Shepler's ferry crossing to Mackinac Island if choppy" },
      { id: "p-firstaid", text: "Small first-aid kit & blister bandages", note: "Helpful for dune climbs and island walking" },
      { id: "p-water", text: "Refillable water bottles", note: "Three bottles for daily car rides and trails" },
    ],
  },
];
