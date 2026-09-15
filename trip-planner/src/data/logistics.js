/**
 * The car and the flights — now booked, and both different from what the
 * itinerary assumed.
 *
 * This file used to hold blanks. It holds facts now, taken from Gunnar's
 * confirmations on 16 August 2026. Three of them move the trip:
 *
 *   1. The car is picked up at O'Hare at 9:00pm on the 14th, not in Palatine
 *      at 7:00pm. Monday is a travel day, not an errand day.
 *   2. AA 2358 lands at 8:21pm — 39 minutes before the counter appointment,
 *      at the same airport. That works, but Tuesday morning starts late.
 *   3. AA 1253 leaves ORD at 3:20pm on the 21st, and the car is due back at
 *      2:30pm. That is the hardest deadline on the whole trip and Mom's
 *      document has no idea it exists.
 *
 * The page still takes input, because seats, gates and the actual car handed
 * over at the counter aren't known yet. Those live in localStorage.
 */

/** Where the driving starts and ends. Mom's place, in Palatine. */
export const BASE = {
  label: "Palatine, Illinois",
  address: "2020 Crestwood Lane, Palatine, IL 60074",
  fromOhare: "≈35 minutes",
};

/**
 * The two hard edges of the trip. Both are now real booked times rather than
 * preferences, and the second one is the tightest thing in the itinerary.
 */
export const ANCHORS = {
  arrive: {
    label: "Car pickup, O'Hare",
    when: "Mon 14 Sept, 9:00 PM",
    date: "2026-09-14",
    time: "21:00",
    why: "You land at 8:21pm in Terminal 3 and the Budget counter is in the Multi-Modal Facility, out at the end of the ATS train. Bags, train, counter — call it 45 minutes. The counter runs 24 hours, so arriving at 9:15pm is not a problem; the reservation is Reserve Now, Pay Later with no cancellation fee.",
  },
  depart: {
    label: "Rental car return & AA 1253",
    when: "Mon 21 Sept · Return by 1:00 PM · Wheels up 3:20 PM",
    date: "2026-09-21",
    time: "15:20",
    carDue: "13:00",
    why: "Return Budget rental SUV at the Multi-Modal Facility (MMF) by 1:00 PM, take the ATS train to Terminal 3, drop bags, and clear TSA for the 3:20 PM departure to SFO (AA 1253).",
  },
};

/** Getting between O'Hare and Palatine. */
export const AIRPORTS = [
  {
    code: "ORD",
    name: "O'Hare",
    drive: "≈35 min to Palatine",
    note: "Both flights and the car are here, which removes a whole category of problem — you never have to get from an airport to a rental counter across town.",
    best: true,
  },
];

/** The rental, as booked through Costco Travel. */
export const RENTAL = {
  company: "Budget",
  vehicle: "Toyota Sienna Hybrid (booked as CX-50 or similar; handed over 2026-09-14)",
  vehicleClass: "Hybrid minivan, 2024 or newer, ~24,000 miles, Florida plates",
  epaMpg: 35,
  cost: 332.92,
  // money() rounds, and this page is quoting a receipt. Exact string here.
  costExact: "$332.92",
  costNote:
    "Booked through Costco Travel — $10 off plus Costco member savings, already applied. Reserve Now, Pay Later, no cancellation fees. That's $35 less than the $368 the budget carried.",
  pickup: "Mon 14 Sept, 9:00 PM · O'Hare",
  dropoff: "Mon 21 Sept, 1:00 PM · O'Hare",
  location: "10255 W Zemke Blvd, Chicago, IL 60666",
  desk: "773-825-4600",
  deskNote: "Counter open 24 hours",
  phone: "800-218-7992",
  status: "Reserved through Costco Travel",
};

/**
 * The blanks left on the vehicle card. The class is known; the specific car
 * isn't, and won't be until someone hands over a key at 9pm on the 14th.
 */
export const VEHICLE_FIELDS = [
  { key: "year", label: "Year", placeholder: "2024 or newer", width: "sm" },
  { key: "make", label: "Make", placeholder: "Toyota" },
  { key: "model", label: "Model", placeholder: "Sienna Hybrid" },
  {
    key: "colour",
    label: "Colour",
    placeholder: "Silver",
    why: "You will be looking for this car in a Shepler's lot at 6:40am and in Frankenmuth on the busiest Saturday of the year.",
  },
  {
    key: "plate",
    label: "Plate",
    placeholder: "FL · ABC 1234",
    why: "Florida plates: Belle Isle charges the $12 non-Michigan rate either way, and Ontario's border booth will read the plate, so have the rental agreement handy.",
  },
  {
    key: "mpg",
    label: "Combined MPG",
    placeholder: "35",
    width: "sm",
    numeric: true,
    why: "A Sienna Hybrid is EPA-rated 35 combined with AWD, 36 with front drive (EPA, 2025 model year). The Money page uses this figure; change it if the window sticker says otherwise.",
  },
  {
    key: "confirmation",
    label: "Confirmation #",
    placeholder: "From the Costco Travel email",
    width: "lg",
  },
  {
    key: "drivers",
    label: "Named drivers on the agreement",
    placeholder: "Gunnar, Mikaela",
    width: "lg",
    why: "Gunnar is driving most of it, not all of it. Whoever takes the other stretches has to be named here — an unlisted driver is a breach of the agreement, and it can void the damage waiver and the Canadian coverage with it. Costco rentals normally include one additional driver at no charge; ask at the counter.",
  },
];

export const VEHICLE_NOTES = [
  {
    title: "A Sienna Hybrid is more car than you booked, and it helps",
    body:
      "Hybrid minivan, 35 mpg combined, 18-gallon tank: about 630 miles a fill, so no 300-mile day needs a fuel stop at all and the whole trip is roughly 41 gallons. Three adults and seven nights of luggage vanish behind the third row. It is 68.5 inches tall and 17 feet long: fine for every garage and the tunnel, mind the Mackinaw City motel lot.",
  },
  {
    title: "Nine at night, at an airport counter, after six hours in the air",
    body:
      "That's the worst possible moment to remember paperwork, and it's the only moment you get — the Canadian insurance card cannot be sorted out later. Read the loose end before you get to the desk.",
  },
  {
    title: "The tunnel is not a constraint",
    body:
      "An earlier version of this app told you to check the car's height against the Detroit–Windsor Tunnel. Clearance there is 12 feet 8 inches. A Sienna is 5 feet 9.",
  },
  {
    title: "Photograph it in the garage before you drive off",
    body:
      "Every panel, both bumpers, the wheels, the fuel gauge. The Multi-Modal Facility is well lit at 9pm, which is more than you can say for most 7am returns.",
  },
];

export const FLIGHT_FIELDS = [
  { key: "airline", label: "Airline", placeholder: "American" },
  { key: "number", label: "Flight", placeholder: "AA 2358", width: "sm" },
  { key: "date", label: "Date", type: "date" },
  { key: "from", label: "From", placeholder: "SFO", width: "sm" },
  { key: "depTime", label: "Departs", type: "time" },
  { key: "to", label: "To", placeholder: "ORD", width: "sm" },
  { key: "arrTime", label: "Arrives", type: "time" },
];

/** Per-passenger detail, since Gunnar and Mikaela booked separately. */
export const PASSENGER_FIELDS = [
  { key: "name", label: "Passenger" },
  { key: "record", label: "Confirmation", width: "sm" },
  { key: "seat", label: "Seat", width: "sm" },
];

/**
 * The real bookings. Same two flights for both of them, but separate records —
 * so a schedule change can hit one and not the other, which is worth knowing.
 */
export const DEFAULT_FLIGHTS = [
  {
    id: "out",
    slot: "arrive",
    label: "Out — San Francisco to Chicago",
    airline: "American",
    number: "AA 2358",
    date: "2026-09-14",
    from: "SFO",
    depTime: "13:29",
    to: "ORD",
    arrTime: "20:21",
    aircraft: "Boeing 737-800 / 737 MAX 8",
    specs: "172 seats · 3-3 layout · 110V AC + 5V USB-A · Viasat Wi-Fi",
    depTerminal: "SFO Terminal 1 (Harvey Milk)",
    depGate: "Gates B1–B27",
    arrTerminal: "ORD Terminal 3",
    arrGate: "Concourse H / K",
    boardingCutoff: "1:14 PM PDT (T-15m strict door closure)",
    flightTime: "4h 52m flight time · 1,846 miles",
    seatTactics: "Tandem Aisle Strategy: Gunnar (18D) & Mikaela (19D). Starboard aisle, overhead bin claim, no middle seat, fast deplane queue.",
    baggageClaim: "ORD Terminal 3 Lower Level, Carousels 1–6",
    passengers: [
      { name: "Gunnar Hostetler", record: "QPJBXO", seat: "18D" },
      { name: "Mikaela Hostetler", record: "YBEEOU", seat: "19D" },
    ],
  },
  {
    id: "back",
    slot: "depart",
    label: "Back — Chicago to San Francisco",
    airline: "American",
    number: "AA 1253",
    date: "2026-09-21",
    from: "ORD",
    depTime: "15:20",
    to: "SFO",
    arrTime: "18:09",
    aircraft: "Boeing 737 / Airbus A321",
    specs: "Transcon layout · 110V AC + 5V USB-A · High-Speed Wi-Fi",
    depTerminal: "ORD Terminal 3",
    depGate: "Concourse H / K",
    arrTerminal: "SFO Terminal 1 (Harvey Milk)",
    arrGate: "Gates B1–B27",
    boardingCutoff: "3:05 PM CDT (T-15m strict door closure)",
    flightTime: "4h 49m flight time · 1,846 miles",
    seatTactics: "Side-by-side pair: Gunnar (22E, middle) & Mikaela (22D, aisle). Starboard side behind overwing exit.",
    baggageClaim: "SFO Terminal 1 Lower Level, Carousels 1–4",
    passengers: [
      { name: "Gunnar Hostetler", record: "QPJBXO", seat: "22E" },
      { name: "Mikaela Hostetler", record: "YBEEOU", seat: "22D" },
    ],
  },
];

/**
 * Monday the 14th: Inbound tactical flight runway working forward from SFO
 * to Palatine arrival.
 */
export const RUN_INBOUND = [
  { at: "12:45 PM PDT", what: "Boarding Commences (SFO T1 Harvey Milk)", detail: "Groups 1–4 overhead bin space defense; carry-on bags stowed above rows 18/19." },
  { at: "1:14 PM PDT", what: "Gate Door Closes (T-15 min)", detail: "Strict AA cutoff. Mobile boarding passes scanned, seats 18D & 19D settled." },
  { at: "1:29 PM PDT", what: "AA 2358 Pushback & Wheels Up", detail: "Depart SFO runway 01L/28R. En route FL350–FL370 (~520 mph). Clock jumps +2 hrs into Central Time." },
  { at: "8:21 PM CDT", what: "Wheels Down Chicago O'Hare (ORD T3)", detail: "Touchdown runway 10C/27L or 09L/27R. Taxi to Terminal 3 Concourse H/K." },
  { at: "8:35 PM CDT", what: "Deplane & Transit to ATS People-Mover", detail: "Exit rows 18/19. Skip baggage claim if carry-on only; take pedestrian bridge to ATS Station." },
  { at: "8:45 PM CDT", what: "Board Automated ATS Train to MMF", detail: "Free 24/7 automated train. 9–11 minute direct ride to the Multi-Modal Facility (MMF)." },
  { at: "9:00 PM CDT", what: "Budget Rental Counter (Level 1 MMF)", detail: "Fastbreak desk. Key request: 'Please issue the free Canadian Non-Resident Insurance Card for Ontario.'" },
  { at: "9:25 PM CDT", what: "Vehicle Inspection & Departure", detail: "Photograph all panels, odometer, and full tank in garage. Exit Zemke Blvd to I-90 West." },
  { at: "10:00 PM CDT", what: "Arrive Palatine (2020 Crestwood Ln)", detail: "Drop bags, decompress, and rest for Tuesday morning's 6:00 AM departure to Grand Rapids." },
];

/**
 * Monday the 21st, backwards from the gate. This is the schedule the return
 * flight actually imposes, and it is not the one on the day page.
 */
export const RUN_HOME = [
  { at: "7:30 AM ET", what: "Leave Belleville. Earlier is better than later." },
  {
    at: "8:00–8:45 AM ET",
    what: "Ann Arbor, if you're moving on time. It's 25 minutes off the line and the only stop that survives.",
  },
  { at: "≈12:00 PM CT", what: "Palatine. Drop Mom and the luggage — allow fifteen minutes." },
  { at: "12:45 PM CT", what: "O'Hare, Multi-Modal Facility. Return the car." },
  { at: "1:30 PM CT", what: "Terminal 3, bags checked, through security." },
  { at: "3:20 PM CT", what: "AA 1253 pushes back." },
];

/**
 * The aircraft actually flying AA 2358 today, read off ADS-B (adsb.lol) at
 * 12:52 PM PDT on 2026-09-14 while it sat at the SFO gate. The return
 * aircraft is not assigned until the day; FlightAware's tail link fills it in.
 */
export const AIRCRAFT_SEEN = {
  out: {
    tail: "N164NN",
    hex: "a101c3",
    type: "Airbus A321 (2016)",
    seen: "2026-09-14 12:52 PM PDT, on the ground at SFO gate area",
    source: "https://api.adsb.lol/v2/callsign/AAL2358",
    note: "The booking said 737; the metal is an A321-200, 3-3 layout, so 18D and 19D are still the starboard aisle.",
  },
  back: null,
};

/**
 * Structured runways for the flight deck: every milestone carries a date, a
 * local time and its zone, so the deck can place "now" on the line and count
 * down to the next one. `key` marks the milestones the phase logic keys on.
 */
export const FLIGHT_RUNWAYS = {
  out: [
    { key: "board", date: "2026-09-14", time: "12:45", tz: "America/Los_Angeles", zone: "PDT", what: "Boarding, SFO Terminal 1 (Harvey Milk)", detail: "B gates. Groups 1–4; claim the bins above rows 18 and 19.", type: "warn" },
    { key: "door", date: "2026-09-14", time: "13:14", tz: "America/Los_Angeles", zone: "PDT", what: "Door closes", detail: "Strict T-15 cutoff. Passes scanned, 18D and 19D settled." },
    { key: "dep", date: "2026-09-14", time: "13:29", tz: "America/Los_Angeles", zone: "PDT", what: "AA 2358 pushes back, wheels up", detail: "1,846 miles, about 4h 52m. Clocks jump two hours into Central.", type: "flight" },
    { key: "arr", date: "2026-09-14", time: "20:21", tz: "America/Chicago", zone: "CDT", what: "Wheels down, Chicago O'Hare Terminal 3", detail: "Concourse H/K. Phones on, bags on the lower level, carousels 1–6.", type: "flight" },
    { date: "2026-09-14", time: "20:35", tz: "America/Chicago", zone: "CDT", what: "Deplane, bridge to the ATS station", detail: "Skip baggage claim if it is carry-on only; follow the ATS signs from T3 arrivals." },
    { date: "2026-09-14", time: "20:45", tz: "America/Chicago", zone: "CDT", what: "ATS train to the Multi-Modal Facility", detail: "Automated, free, every 3–5 minutes; 9–11 minutes to the MMF." },
    { key: "counter", date: "2026-09-14", time: "21:00", tz: "America/Chicago", zone: "CDT", what: "Budget counter, MMF level 1", detail: "Say it verbatim: 'Please issue the free Canadian Non-Resident Insurance Card for Ontario driving.'", type: "warn" },
    { date: "2026-09-14", time: "21:25", tz: "America/Chicago", zone: "CDT", what: "Garage inspection, then roll", detail: "Photograph every panel, the wheels, the odometer and the fuel gauge. Zemke Blvd to I-90 West, IL-53 North." },
    { date: "2026-09-14", time: "22:00", tz: "America/Chicago", zone: "CDT", what: "Palatine, 2020 Crestwood Lane", detail: "Drop bags and sleep: Tuesday leaves by 6:00 AM for Grand Rapids." },
  ],
  back: [
    { date: "2026-09-21", time: "07:30", tz: "America/Detroit", zone: "EDT", what: "Leave Belleville on I-94 West", detail: "Earlier is better than later; this is the hardest deadline of the trip." },
    { date: "2026-09-21", time: "08:00", tz: "America/Detroit", zone: "EDT", what: "Ann Arbor coffee, only if you are on time", detail: "25 minutes off the line and the one stop that survives the day." },
    { date: "2026-09-21", time: "11:00", tz: "America/Chicago", zone: "CDT", what: "Illinois line: clocks go back an hour", detail: "Noon Eastern becomes 11:00 Central." },
    { date: "2026-09-21", time: "12:00", tz: "America/Chicago", zone: "CDT", what: "Palatine: drop Mom and the luggage", detail: "Allow fifteen minutes, then IL-53 south to O'Hare." },
    { key: "counter", date: "2026-09-21", time: "12:45", tz: "America/Chicago", zone: "CDT", what: "Return the car, O'Hare MMF", detail: "10255 W Zemke Blvd, due by 1:00 PM. Top off at Shell, 600 E Touhy Ave first.", type: "warn" },
    { date: "2026-09-21", time: "13:15", tz: "America/Chicago", zone: "CDT", what: "ATS train, MMF to Terminal 3", detail: "Every 3–5 minutes, 10–12 minutes to T3." },
    { date: "2026-09-21", time: "13:45", tz: "America/Chicago", zone: "CDT", what: "Bags checked, through TSA", detail: "Terminal 3. Then walk to the H/K gate." },
    { key: "board", date: "2026-09-21", time: "14:45", tz: "America/Chicago", zone: "CDT", what: "Boarding, AA 1253", detail: "Seats 22D and 22E, starboard side behind the overwing exit.", type: "warn" },
    { key: "door", date: "2026-09-21", time: "15:05", tz: "America/Chicago", zone: "CDT", what: "Door closes", detail: "Strict T-15 cutoff." },
    { key: "dep", date: "2026-09-21", time: "15:20", tz: "America/Chicago", zone: "CDT", what: "AA 1253 pushes back, wheels up", detail: "1,846 miles, about 4h 49m. Clocks go back two hours.", type: "flight" },
    { key: "arr", date: "2026-09-21", time: "18:09", tz: "America/Los_Angeles", zone: "PDT", what: "Wheels down, SFO Terminal 1", detail: "Bags on the lower level, carousels 1–4. Home.", type: "flight" },
  ],
};

export const SWEATY_FLIGHT_TIPS = [
  {
    title: "Dual-Aisle Tandem Seating (18D & 19D)",
    body: "By booking tandem aisle seats (Gunnar in 18D, Mikaela in 19D) on the starboard aisle, you avoid the middle-seat shoulder pinch, secure overhead bin space directly above your row upon boarding, and can pass items through the seat gap while deplaning in seconds.",
  },
  {
    title: "ORD ATS People-Mover Transfer Protocol",
    body: "Don't take ground shuttles or walk outside. Follow overhead signs from T3 arrivals to the ATS (Airport Transit System). Trains depart every 3–5 minutes from the station between T2 and T3. The direct ride to the Multi-Modal Facility (MMF) takes 10 minutes flat.",
  },
  {
    title: "Verbatim Budget Desk Script for Canada",
    body: "At the MMF Level 1 Budget counter, say: 'We are driving into Ontario this Saturday through Port Huron and returning through Detroit. Please print and sign the Canadian Non-Resident Insurance Card to keep in our glovebox.' It is 100% free under Budget's US/Canada cross-border policy.",
  },
  {
    title: "In-Flight Power & Telemetry",
    body: "AA's 737-800 transcon fleet features 110V AC power under the center of each seat group and 5V USB-A in the seatback. Free live satellite flight tracking, Apple Music streaming, and messaging over Viasat Wi-Fi without buying full internet.",
  },
];
