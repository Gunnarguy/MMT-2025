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
    url: "https://www.summersinnludington.com/",
    checkIn: "2026-09-15",
    checkOut: "2026-09-16",
    nights: 1,
    price: 155,
    usd: 155,
    currency: "USD",
    tags: ["Restored 1950s motor court", "Rate unverified"],
    note:
      "A restored mid-century motor court on the main drag, about a mile from Stearns Park and the breakwater. Check-in runs until 9:00 PM.",
    flag: {
      level: "info",
      title: "Room occupancy & breakfast note",
      body:
        "Confirm the reservation is set for 3 adults in a 2 Double Beds room. Note that post-Labor Day breakfast is served on weekends only.",
    },
    source: "Summer's Inn of Ludington (official site)",
    sourceUrl: "https://www.summersinnludington.com/",
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
      "A 22-room waterfront inn on East Grand Traverse Bay with 150 feet of private sandy beach, about ten minutes from downtown.",
    flag: {
      level: "info",
      title: "2-Queen Suite confirmation",
      body:
        "Confirm booking is the 2 Queen Suite layout with beach access and check cancellation terms.",
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
    url: "https://lighthouseviewmotel.com/",
    checkIn: "2026-09-17",
    checkOut: "2026-09-19",
    nights: 2,
    price: 298,
    usd: 298,
    currency: "USD",
    tags: ["On Lake Huron", "0.4 mi to Shepler's"],
    note:
      "On the Lake Huron shore with views of the Mackinac Bridge, a two-minute walk to Lakeside Park and Old Mackinac Point Lighthouse for sunset. Shepler's ferry dock is 0.4 miles away.",
    flag: {
      level: "info",
      title: "Ferry shuttle & 2-queen room",
      body:
        "Confirm 2-queen room for 3 adults and take advantage of the free dock shuttle for Friday's 7:30 AM ferry.",
    },
    source: "Lighthouse View Motel (official site)",
    sourceUrl: "https://lighthouseviewmotel.com/",
  },
  {
    id: "sarnia",
    dayIndex: 5,
    name: "Four Points by Sheraton Sarnia",
    city: "Point Edward, Ontario",
    address: "1498 Venetian Blvd, Point Edward, ON N7T 7W6, Canada",
    coords: [42.9976, -82.4139],
    phone: "519-336-4130",
    url: "https://www.marriott.com/en-us/hotels/yqgfs-four-points-point-edward-sarnia/overview/",
    checkIn: "2026-09-19",
    checkOut: "2026-09-20",
    nights: 1,
    price: 169,
    usd: 148,
    currency: "CAD",
    tags: ["Canada", "Next to the casino"],
    note:
      "At the foot of the Blue Water Bridge in Point Edward, adjoining Sarnia. The waterfront trail connects right outside the hotel.",
    flag: {
      level: "info",
      title: "Ontario lodging taxes",
      body:
        "Total is approximately USD $145–$150 all-in including Ontario 13% HST and Point Edward accommodation tax.",
    },
    source: "Marriott — Four Points by Sheraton Point Edward / Sarnia",
    sourceUrl: "https://www.marriott.com/en-us/hotels/yqgfs-four-points-point-edward-sarnia/overview/",
  },
  {
    id: "belleville",
    dayIndex: 6,
    name: "Hampton Inn Detroit / Belleville",
    city: "Belleville, Michigan",
    address: "46280 N I-94 Service Dr, Belleville, MI 48111",
    coords: [42.2338, -83.4844],
    phone: "734-699-2424",
    url: "https://www.hilton.com/en/hotels/dtwbehx-hampton-detroit-belleville-airport-area/",
    checkIn: "2026-09-20",
    checkOut: "2026-09-21",
    nights: 1,
    price: 267,
    usd: 267,
    currency: "USD",
    provisional: true,
    tags: ["Backup for Julia's", "Near DTW"],
    note:
      "Convenient stay option on the I-94 service drive, well positioned for Monday's drive home to Palatine and O'Hare.",
    flag: {
      level: "info",
      title: "Provisional stay option",
      body:
        "Excluded from budget totals by default since staying with Julia is the primary plan; can be toggled on the Money page.",
    },
    source: "Hilton — Hampton Inn Detroit/Belleville-Airport Area",
    sourceUrl: "https://www.hilton.com/en/hotels/dtwbehx-hampton-detroit-belleville-airport-area/",
  },
];
