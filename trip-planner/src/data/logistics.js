/**
 * The two things that bookend the trip and aren't settled yet: which car, and
 * which flights.
 *
 * Everything else in this app is fixed data I researched and committed. These
 * two aren't knowable yet, so this file carries the *shape* of the answer, the
 * anchors the answer has to satisfy, and the reason each blank matters — and
 * the page lets Gunnar fill in the values, which live in localStorage.
 *
 * That storage choice has a real consequence and the page says so out loud:
 * what you type here is on this device only. It does not reach Mom's phone.
 * There's a copy-to-clipboard button for exactly that reason, and if the
 * details should be permanent and shared they belong in a commit, not here.
 */

/** Where the driving starts and ends. Mom's place, in Palatine. */
export const BASE = {
  label: "Palatine, Illinois",
  address: "2020 Crestwood Lane, Palatine, IL 60074",
};

/**
 * Hard anchors the flights have to clear. Both come from the itinerary, not
 * from preference — the car is booked for 7pm Monday, and Monday the 21st is
 * a 297-mile day that ends mid-afternoon Central.
 */
export const ANCHORS = {
  arrive: {
    label: "Rental pickup",
    when: "Mon 14 Sept, 7:00 PM",
    date: "2026-09-14",
    time: "19:00",
    // Land by this and the 7pm counter is comfortable rather than a sprint.
    comfortableBy: "16:30",
    why: "Budget has the car from 7pm Monday, and that counter appointment is where the Canadian insurance card gets handed over. Miss it and the Ontario leg has a problem you can't fix on the road.",
  },
  depart: {
    label: "Home from the road trip",
    when: "Mon 21 Sept, mid-afternoon Central",
    date: "2026-09-21",
    // Don't book a departure before this on the 21st.
    notBefore: "19:00",
    why: "Monday is 297 miles with stops in Ann Arbor and Kalamazoo. Leaving Belleville at 9am Eastern puts you back in Palatine around 3pm Central — and that assumes the Borman behaves.",
  },
};

/** Getting between a Chicago airport and Palatine. */
export const AIRPORTS = [
  {
    code: "ORD",
    name: "O'Hare",
    drive: "≈35 min to Palatine",
    note: "The obvious one. Northwest side, straight up I-290 to I-53. Closest major airport to Palatine by a wide margin.",
    best: true,
  },
  {
    code: "MDW",
    name: "Midway",
    drive: "≈55–70 min to Palatine",
    note: "South side, so you cross the whole metro. Only worth it if the fare difference is large or it's the only Southwest option.",
  },
];

/** What's known about the rental, and what isn't. */
export const RENTAL = {
  company: "Budget",
  cost: 368,
  costNote: "Mom is covering the rental outright — it's one of the lines she marked MINE!",
  pickup: "Mon 14 Sept, 7:00 PM · Palatine area",
  dropoff: "Mon 21 Sept · same location",
  phone: "800-218-7992",
  status: "Booked — but the car itself isn't assigned yet",
};

/**
 * The blanks on the vehicle card. Each one is here because something on this
 * trip actually depends on it — none of them is record-keeping for its own
 * sake.
 */
export const VEHICLE_FIELDS = [
  {
    key: "year",
    label: "Year",
    placeholder: "2026",
    width: "sm",
  },
  {
    key: "make",
    label: "Make",
    placeholder: "Toyota",
  },
  {
    key: "model",
    label: "Model",
    placeholder: "RAV4",
  },
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
    placeholder: "28",
    width: "sm",
    numeric: true,
    why: "This is the only figure here that moves money. The fuel line on the Money page recalculates from it.",
  },
  {
    key: "confirmation",
    label: "Confirmation #",
    placeholder: "From the Budget email",
    width: "lg",
  },
  {
    key: "drivers",
    label: "Named drivers on the agreement",
    placeholder: "Gunnar",
    width: "lg",
    why: "Gunnar is driving most of it, not all of it. Whoever takes the other stretches has to be named here — an unlisted driver is a breach of the agreement, and it can void the damage waiver and the Canadian coverage with it.",
  },
];

/** Things worth knowing before accepting whatever they roll out. */
export const VEHICLE_NOTES = [
  {
    title: "Three adults, seven nights, one boot",
    body:
      "A compact will physically hold three people and their bags, but not comfortably for 1,200 miles. If Budget offers a free upgrade to a mid-size SUV, take it — and note it costs you roughly $35 in extra fuel across the trip, which the estimate below will show you.",
  },
  {
    title: "The tunnel is not a constraint",
    body:
      "An earlier version of this app told you to check the car's height against the Detroit–Windsor Tunnel. Clearance there is 12 feet 8 inches. Take whatever they give you.",
  },
  {
    title: "Photograph it before you leave the lot",
    body:
      "Every panel, both bumpers, the wheels, and the fuel gauge. Two minutes at 7pm on the 14th, in the light of the lot, is worth a great deal on the 21st.",
  },
];

/** A blank flight, and the two the trip needs by default. */
export const FLIGHT_FIELDS = [
  { key: "airline", label: "Airline", placeholder: "United" },
  { key: "number", label: "Flight", placeholder: "UA 1234", width: "sm" },
  { key: "date", label: "Date", type: "date" },
  { key: "from", label: "From", placeholder: "SFO", width: "sm" },
  { key: "depTime", label: "Departs", type: "time" },
  { key: "to", label: "To", placeholder: "ORD", width: "sm" },
  { key: "arrTime", label: "Arrives", type: "time" },
  { key: "confirmation", label: "Confirmation", placeholder: "ABC123", width: "sm" },
  { key: "seats", label: "Seats", placeholder: "12A, 12B", width: "sm" },
];

export const DEFAULT_FLIGHTS = [
  {
    id: "out",
    slot: "arrive",
    label: "Out — flying in",
    who: "Gunnar + Mikaela",
    date: "2026-09-14",
    to: "ORD",
  },
  {
    id: "back",
    slot: "depart",
    label: "Back — flying home",
    who: "Gunnar + Mikaela",
    date: "2026-09-21",
    from: "ORD",
  },
];
