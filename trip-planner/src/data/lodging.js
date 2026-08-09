/**
 * The five properties. All already reserved by Mom.
 *
 * `price` is what her document recorded; `usd` is the same figure normalised to
 * dollars for the budget page. Where research found the document's name, zip or
 * rate to be off, the correction is here and the discrepancy is called out in
 * `flag` rather than silently swallowed.
 */

export const LODGING = [
  {
    id: "ludington",
    dayIndex: 1,
    name: "Summer's Inn",
    city: "Ludington, Michigan",
    address: "717 E Ludington Ave, Ludington, MI 49431",
    coords: [43.954, -86.4419],
    phone: "231-843-3448",
    url: "https://summersinnofludington.com/",
    checkIn: "2026-09-15",
    checkOut: "2026-09-16",
    nights: 1,
    price: 155,
    usd: 155,
    currency: "USD",
    tags: ["Restored 1950s motor court", "Rate unverified"],
    note:
      "A restored mid-century motor court on the main drag, about a mile from Stearns Park and the breakwater. Check-in runs to 9pm, so there's no need to stop here before doing anything else in town.",
    flag: {
      level: "warn",
      title: "Two things to settle by phone",
      body:
        "The zip in Mom's document is written “494431” — six digits — and will fail in a GPS or booking form; it's 49431. More importantly, the inn publishes five room types but no maximum occupancy, and some channels list it as adults-only. The “2 Double Beds” room is the only realistic candidate for three adults. Call and confirm the reservation is under three people, which room type it is, any extra-person fee, and the actual 2026 rate. Also ask about breakfast: the included table breakfast runs daily only through Labor Day weekend — after that it's weekends only, so there will be none on your Wednesday departure.",
    },
    source: "Summer's Inn of Ludington (official site)",
    sourceUrl: "https://summersinnofludington.com/",
  },
  {
    id: "traverse-city",
    dayIndex: 2,
    name: "Brio Beach Inn",
    city: "Traverse City, Michigan",
    address: "1465 US-31 N, Traverse City, MI 49686",
    coords: [44.7772, -85.5713],
    phone: "231-946-6930",
    url: "https://briobeachinn.com/",
    checkIn: "2026-09-16",
    checkOut: "2026-09-17",
    nights: 1,
    price: 245,
    usd: 245,
    currency: "USD",
    tags: ["Private beach", "On the bay"],
    note:
      "A 22-room waterfront inn on East Grand Traverse Bay with 150 feet of private sandy beach, about ten minutes from downtown. Address and phone in Mom's document are both correct.",
    flag: {
      level: "warn",
      title: "Confirm it's the two-queen suite",
      body:
        "The inn publishes four room types and two of them have a single bed. Occupancy limits aren't published anywhere, and the “$245 approx” doesn't appear in any public source — they quote only through their own booking engine. Call and confirm on the record: three guests, the 2 Queen Suite rather than a studio, the total including Michigan lodging tax, and the cancellation deadline. Small seasonal inns often want 7–14 days.",
    },
    source: "Brio Beach Inn (official site)",
    sourceUrl: "https://briobeachinn.com/",
  },
  {
    id: "mackinaw-city",
    dayIndex: 3,
    name: "Lighthouse View Motel",
    city: "Mackinaw City, Michigan",
    address: "699 N Huron Ave, Mackinaw City, MI 49701",
    coords: [45.7857, -84.7228],
    phone: "231-436-5304",
    url: "https://mackinawcity.com/places/lodging/lighthouse-view-motel/",
    checkIn: "2026-09-17",
    checkOut: "2026-09-19",
    nights: 2,
    price: 298,
    usd: 298,
    currency: "USD",
    tags: ["On Lake Huron", "0.4 mi to Shepler's"],
    note:
      "On the Lake Huron shore looking at the Mackinac Bridge, with Lakeside Park and the Old Mackinac Point Lighthouse a two-minute walk from the door — which is where you want to be for Thursday's 7:48pm sunset. Shepler's ferry dock is 0.4 miles away, comfortably inside the free shuttle's 1.5-mile radius.",
    flag: {
      level: "info",
      title: "It's the Lighthouse View Motel, not Hotel",
      body:
        "Address and phone in Mom's document are both correct; only the name is slightly off, which matters if you're searching for it. Worth one call to pin down whether $298 is the two-night total or the nightly rate, that the room has two queens and is rated for three adults, whether you're lakeside or roadside, and that the free ferry shuttle is still running this late in September.",
    },
    source: "Mackinaw Area Visitors Bureau — official listing",
    sourceUrl: "https://mackinawcity.com/places/lodging/lighthouse-view-motel/",
  },
  {
    id: "sarnia",
    dayIndex: 5,
    name: "Four Points by Sheraton Sarnia",
    city: "Point Edward, Ontario",
    address: "1498 Venetian Blvd, Point Edward, ON N7T 7W6, Canada",
    coords: [42.9976, -82.4139],
    phone: "519-336-4130",
    url: "https://www.marriott.com/",
    checkIn: "2026-09-19",
    checkOut: "2026-09-20",
    nights: 1,
    price: 169,
    usd: 148,
    currency: "CAD",
    tags: ["Canada", "Next to the casino"],
    note:
      "At the foot of the Blue Water Bridge in Point Edward, the village adjoining Sarnia, next door to Point Edward Casino. The Point Edward waterfront trail genuinely does start right there — that's the walk worth doing, not Centennial Park, which is further than Mom's note suggests.",
    flag: {
      level: "warn",
      title: "The USD figure in the budget is light",
      body:
        "Mom converted CAD $169 to “$125 US,” but that's the room rate before Point Edward's 4% accommodation tax and Ontario's 13% HST. All-in it lands closer to USD $145–150. Also confirm by phone that the booking is a two-queen room with max occupancy 3 — the property's room configurations aren't published anywhere primary, and “one room, three adults” is the sort of assumption that surfaces at 9pm on a Saturday at the front desk.",
    },
    source: "Marriott — Four Points by Sheraton Sarnia",
    sourceUrl: "https://www.marriott.com/",
  },
  {
    id: "belleville",
    dayIndex: 6,
    name: "Hampton Inn Detroit / Belleville",
    city: "Belleville, Michigan",
    address: "46280 N I-94 Service Dr, Belleville, MI 48111",
    coords: [42.2338, -83.4844],
    phone: "734-699-2424",
    url: "https://www.hilton.com/en/hotels/dtwblhx-hampton-detroit-belleville/",
    checkIn: "2026-09-20",
    checkOut: "2026-09-21",
    nights: 1,
    price: 267,
    usd: 267,
    currency: "USD",
    provisional: true,
    tags: ["Backup for Julia's", "Near DTW"],
    note:
      "The fallback if you don't stay at Julia's. It sits on the I-94 service drive near Detroit Metro, which is unromantic but is genuinely the right position for Monday's westbound run home — you're already pointed the right way.",
    flag: {
      level: "info",
      title: "Mom spelled it “Bellville” — it's Belleville",
      body:
        "One L too few will send a GPS somewhere else. Since this night may not happen, it's excluded from the budget totals by default; there's a toggle on the Money page to add it back.",
    },
    source: "Hilton — Hampton Inn Detroit/Belleville",
    sourceUrl: "https://www.hilton.com/en/hotels/dtwblhx-hampton-detroit-belleville/",
  },
];
