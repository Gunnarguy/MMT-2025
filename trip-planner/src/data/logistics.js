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
    label: "Car back at O'Hare, then AA 1253",
    when: "Mon 21 Sept — car 2:30 PM, wheels up 3:20 PM",
    date: "2026-09-21",
    time: "15:20",
    carDue: "14:30",
    why: "This is the one to plan around. Fifty minutes between the contracted car return and a 3:20pm departure is not enough at O'Hare — you have to return the car, ride the ATS back to Terminal 3, and clear security. Be at the return by 1:00pm and the day is calm. Leave Belleville by 8:00am Eastern to make that true.",
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
  vehicle: "Mazda CX-50 or similar",
  vehicleClass: "Compact SUV",
  epaMpg: 26,
  cost: 332.92,
  // money() rounds, and this page is quoting a receipt. Exact string here.
  costExact: "$332.92",
  costNote:
    "Booked through Costco Travel — $10 off plus Costco member savings, already applied. Reserve Now, Pay Later, no cancellation fees. That's $35 less than the $368 the budget carried.",
  pickup: "Mon 14 Sept, 9:00 PM · O'Hare",
  dropoff: "Mon 21 Sept, 2:30 PM · O'Hare",
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
  { key: "year", label: "Year", placeholder: "2026", width: "sm" },
  { key: "make", label: "Make", placeholder: "Mazda" },
  { key: "model", label: "Model", placeholder: "CX-50" },
  {
    key: "colour",
    label: "Colour",
    placeholder: "Silver",
    why: "You will be looking for this car in a Shepler's lot at 6:40am and in Frankenmuth on the busiest Saturday of the year.",
  },
  {
    key: "plate",
    label: "Plate",
    placeholder: "IL · ABC 1234",
    why: "Illinois plates are also what makes Belle Isle the $12 non-resident rate rather than free.",
  },
  {
    key: "mpg",
    label: "Combined MPG",
    placeholder: "26",
    width: "sm",
    numeric: true,
    why: "The CX-50 2.5 S is EPA-rated 26 combined, which is what the Money page is already using. Change it if they hand you something else.",
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
    title: "A CX-50 is the right size for this",
    body:
      "Compact SUV, 26 mpg combined, 15.9-gallon tank — about 410 miles a fill, so the two 300-mile days need one fuel stop each and neither is awkward. Three adults and seven nights of luggage fit without anyone negotiating.",
  },
  {
    title: "Nine at night, at an airport counter, after six hours in the air",
    body:
      "That's the worst possible moment to remember paperwork, and it's the only moment you get — the Canadian insurance card cannot be sorted out later. Read the loose end before you get to the desk.",
  },
  {
    title: "The tunnel is not a constraint",
    body:
      "An earlier version of this app told you to check the car's height against the Detroit–Windsor Tunnel. Clearance there is 12 feet 8 inches. A CX-50 is under six.",
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
    passengers: [
      { name: "Gunnar Hostetler", record: "QPJBXO", seat: "22E" },
      { name: "Mikaela Hostetler", record: "YBEEOU", seat: "22D" },
    ],
  },
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
