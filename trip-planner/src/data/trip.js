/**
 * The itinerary.
 *
 * Structure mirrors how the trip is actually experienced: a day is a sequence
 * of drive legs and stops, wrapped in a header of totals and a set of flags for
 * the things that will bite you.
 *
 * Two rules hold everywhere in this file:
 *   1. `momSaid` is Mom's document, verbatim, never edited or tidied.
 *   2. Anything that contradicts her document says so explicitly, with a source.
 *
 * Distances come from the committed OSRM geometry (see routeGeometry.json), so
 * they're road miles. Drive times are the researched real-world figures, which
 * run a little under OSRM's conservative estimates.
 *
 * Verified August 2026 against the venues' own 2026 calendars.
 */

import { LODGING } from "./lodging";

const bed = (id) => {
  const stay = LODGING.find((l) => l.id === id);
  return stay
    ? { name: stay.name, city: stay.city.split(",")[0], address: stay.address, coords: stay.coords }
    : null;
};

export const TRIP = {
  name: "Michigan '26",
  subtitle:
    "Eight days up the Lake Michigan shore to the Straits, across into Ontario, and home through Detroit.",
  start: "2026-09-14",
  end: "2026-09-21",
  crew: [
    { name: "Mom", initial: "M", role: "Planned all of it" },
    { name: "Gunnar", initial: "G", role: "Driving" },
    { name: "Mikaela", initial: "M", role: "Along for the ride" },
  ],
};

export const HOME = {
  label: "Home",
  address: "2020 Crestwood Lane, Palatine, IL 60074",
  coords: [42.1103, -88.0342],
};

export const DAYS = [
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: "d0",
    index: 0,
    date: "2026-09-14",
    title: "Fly in, collect the car",
    route: "San Francisco → O'Hare → Palatine",
    mapped: true,
    miles: 15,
    driveMinutes: 25,
    sleep: null,
    lede:
      "Arrival night into Chicago O'Hare on AA 2358 from San Francisco. Collect the rental SUV at the Multi-Modal Facility, head to Palatine to pack the car, and rest up for Tuesday's departure.",
    flags: [
      {
        level: "info",
        title: "Canadian Insurance Card at pickup",
        body: "Request the free Canadian Non-Resident Insurance Card from the Budget counter when picking up keys at O'Hare MMF.",
      },
      {
        level: "info",
        title: "Tuesday 6:45 AM departure",
        body: "Leaving Palatine at 6:45 AM Central provides a full night's rest after Monday night's flight and puts you in Grand Rapids for the 11:30 AM Meyer May tour.",
      },
    ],
    legs: [
      {
        label: "Flight AA 2358: SFO → ORD",
        at: 0,
        minutes: 292,
        miles: 1846,
        note: "1:29 PM PDT → 8:21 PM CDT. Domestic arrival at Terminal 3; take the ATS people-mover out to the rental car facility",
      },
      {
        label: "Drive: O'Hare MMF → Palatine",
        at: 1,
        minutes: 25,
        miles: 15,
        note: "I-90 W to IL-53 N to Crestwood Ln. Drop bags and get a good night's sleep before Grand Rapids",
      },
    ],
    stops: [
      {
        id: "d0-flight",
        kind: "admin",
        name: "AA 2358 — San Francisco to Chicago",
        where: "SFO 1:29 PM → ORD 8:21 PM",
        address: "Chicago O'Hare International Airport, Terminal 3, Chicago, IL 60666",
        coords: [41.9742, -87.9073],
        status: "booked",
        blurb:
          "Gunnar in 18D on record QPJBXO, Mikaela in 19D on YBEEOU — same flight, separate bookings.",
        tips: [
          "American lands domestic at Terminal 3; the rental facility is at the end of the ATS people-mover.",
        ],
      },
      {
        id: "d0-rental",
        kind: "admin",
        name: "Budget rental pickup",
        where: "9:00 PM · O'Hare, 10255 W Zemke Blvd",
        address: "10255 W Zemke Blvd, Chicago, IL 60666",
        coords: [41.9786, -87.8892],
        status: "booked",
        cost: "$332.92 total",
        phone: "773-825-4600",
        blurb:
          "Mazda CX-50 reserved through Costco Travel. Counter is open 24 hours at the O'Hare Multi-Modal Facility.",
        tips: [
          "Ask for the Canadian Non-Resident Insurance Card for Saturday's Ontario leg.",
          "Costco rentals include one additional authorized driver.",
        ],
        source: "Budget — cross-border travel policy",
        sourceUrl: "https://www.budget.com/en/customer-care/policies",
      },
    ],
    momSaid: "Monday 9/14—Pick up Budget rental car 7PM",
  },

  // ═══════════════════════════════════════════════════════════════════════
  {
    id: "d1",
    index: 1,
    date: "2026-09-15",
    title: "Frank Lloyd Wright, then the lake",
    route: "Palatine, IL → Grand Rapids → Ludington, MI",
    miles: 307,
    driveMinutes: 315,
    sunset: "7:57 PM",
    sleep: bed("ludington"),
    legFrom: "Palatine, IL",
    lede:
      "Cross into Eastern time, tour Frank Lloyd Wright's Meyer May House in Grand Rapids Heritage Hill, and drive up to Lake Michigan for sunset at Ludington.",
    flags: [
      {
        level: "info",
        title: "Meyer May House tour (11:30 AM)",
        body: "Free 90-minute guided interior tour in Heritage Hill. Reserve free tickets at meyermayhouse.steelcase.com.",
      },
      {
        level: "info",
        title: "Ludington Breakwater sunset walk",
        body: "The north breakwall pier is free, public, and open for walking out to the light for sunset over Lake Michigan.",
      },
      {
        level: "info",
        title: "ArtPrize Preview Week",
        body: "ArtPrize outdoor sculptures and installations are on display across downtown Grand Rapids and Heritage Hill.",
      },
    ],
    legs: [
      {
        label: "Palatine → Grand Rapids",
        at: 0,
        minutes: 200,
        miles: 210,
        note: "I-90 to I-94 around the bottom of the lake, then I-196. You lose an hour to Eastern time — leave 6:45am CT after a 10pm Monday arrival, in Grand Rapids just after 11:00am ET",
      },
      {
        label: "Grand Rapids → Ludington",
        at: 4,
        minutes: 105,
        miles: 96,
        note: "US-131 north then M-20 west to the lake",
      },
    ],
    stops: [
      {
        id: "d1-meyer-may",
        kind: "anchor",
        name: "Meyer May House",
        where: "450 Madison Ave SE, Grand Rapids · Heritage Hill",
        address: "450 Madison Ave SE, Grand Rapids, MI 49503",
        coords: [42.9542, -85.6559],
        status: "free",
        cost: "Free",
        hours: "Tue & Thu 10 AM–1 PM · Sun 1–4 PM — reserve ahead",
        duration: "90 minutes",
        phone: "616-246-4821",
        url: "https://meyermayhouse.steelcase.com/",
        blurb:
          "A 1909 Prairie house that Steelcase restored down to the original Wright-designed furniture, textiles and art glass — widely considered one of the most complete Wright restorations anywhere. Mom's document has it as a drive-by, which is the single biggest missed opportunity in the whole plan.",
        tips: [
          "Free street parking on Logan St and Madison Ave.",
          "Arrive no more than ten minutes early — they specifically ask you not to come sooner.",
          "It sits inside Heritage Hill, so it doubles as the neighbourhood stop Mom wanted.",
        ],
        source: "Meyer May House (Steelcase)",
        sourceUrl: "https://meyermayhouse.steelcase.com/",
      },
      {
        id: "d1-heritage-hill",
        kind: "sight",
        name: "Heritage Hill on foot",
        where: "Around Madison, College and Cherry",
        address: "Heritage Hill Historic District, Grand Rapids, MI",
        coords: [42.9598, -85.6528],
        status: "free",
        cost: "Free",
        duration: "25 minutes",
        blurb:
          "One of the largest urban historic districts in the country — roughly 1,300 houses across sixty-odd architectural styles, all within a few blocks of where you've already parked. Mom's document lists a “neighborhood drive thru,” but this is much better walked than driven.",
        tips: [
          "Loop north on Madison, east on Cherry, back down College — about 25 minutes.",
          "The map in Mom's document shows the whole neighbourhood grid; Heritage Hill is the one immediately east of downtown.",
        ],
      },
      {
        id: "d1-lunch",
        kind: "food",
        name: "Lunch — Schnitz Deli",
        where: "Grand Rapids",
        address: "Schnitz Deli, Grand Rapids, MI",
        coords: [42.9612, -85.6681],
        status: "check",
        hours: "Closes 3:00 PM",
        phone: "616-451-4444",
        blurb:
          "Note the name: Schnitz Deli, not Schnitzelbank — those are two different Grand Rapids restaurants and searching the wrong one will send you across town. Its 3pm close is the tightest window of Mom's four options, so eat between 12:30 and 2:00, before Meijer Gardens rather than after.",
        tips: [
          "Blue Dog Tavern opens at 11am and serves no brunch, despite being on the brunch list.",
          "Tupelo Honey and Social Misfits both open at 8am — but you won't be in town that early.",
          "Hours aren't published on their own site; call to confirm.",
        ],
      },
      {
        id: "d1-meijer",
        kind: "stop",
        name: "Chihuly: Radiant Forms at Meijer Gardens",
        where: "1000 E Beltline Ave NE, Grand Rapids",
        address: "1000 E Beltline Ave NE, Grand Rapids, MI 49525",
        coords: [42.9878, -85.5906],
        status: "check",
        cost: "$25 adult · $20 senior 65+ · $19 student, plus the gallery ticket",
        hours: "Tuesdays 9 AM–9 PM — the only late night of the week",
        duration: "2–3 hours",
        url: "https://www.meijergardens.org/",
        blurb:
          "Two different things share the Chihuly name here: large glass installations sited outdoors through the 158-acre sculpture park, and Radiant Forms, the indoor gallery show, which needs its own timed ticket and can sell out. The banner in Mom's document is the real exhibition and it is running.",
        tips: [
          "Buy general admission and the Radiant Forms timed slot online, 15–20 minutes after your planned arrival.",
          "Tuesday's 9pm close is genuine luck — no other day runs late.",
          "Check whether Mom qualifies for the 65+ rate — it's $5 off.",
        ],
        source: "Frederik Meijer Gardens & Sculpture Park",
        sourceUrl: "https://www.meijergardens.org/",
      },
      {
        id: "d1-breakwater",
        kind: "anchor",
        name: "Ludington North Breakwater walk",
        where: "From Stearns Park, west end of W Ludington Ave",
        address: "Stearns Park Beach, Ludington, MI 49431",
        coords: [43.9576, -86.4682],
        status: "closed",
        cost: "Free",
        hours: "Tower closed Tuesdays — the pier is always open",
        duration: "45 minutes round trip",
        blurb:
          "Half a mile straight out into Lake Michigan on a concrete breakwall to a squat white 1924 tower. You can't climb it on a Tuesday, but climbing it was never the point — the point is standing at the end of it as the sun goes into the lake at 7:57.",
        tips: [
          "Mom's document says North Breakwater but the embedded map is labelled the SOUTH light. You want the NORTH one, reached from Stearns Park.",
          "It's exposed and it will be windy. Take a real jacket.",
          "An American flag flying on the tower means it's open — it won't be flying Tuesday.",
        ],
        source: "Lakeshore Keepers — 2026 lighthouse season",
        sourceUrl: "https://www.lakeshorekeepers.org/",
      },
      {
        id: "d1-white-pine",
        kind: "optional",
        name: "Historic White Pine Village",
        where: "1687 S Lakeshore Dr, Ludington · 3 miles south",
        address: "1687 S Lakeshore Dr, Ludington, MI 49431",
        coords: [43.9226, -86.4477],
        status: "check",
        hours: "Open Tue · last tickets 3:30 PM · closes 5 PM",
        duration: "2 hours",
        url: "https://historicwhitepinevillage.org/",
        blurb:
          "Not closed for the season, as Mom feared — open Tuesdays through October 17. But a 3:30pm ticket cutoff against a two-hour visit makes it an either/or with Grand Rapids, not a bonus.",
        source: "Historic White Pine Village",
        sourceUrl: "https://historicwhitepinevillage.org/",
      },
      {
        id: "d1-maritime",
        kind: "optional",
        name: "Port of Ludington Maritime Museum",
        where: "217 S Lakeshore Dr, Ludington",
        address: "217 S Lakeshore Dr, Ludington, MI 49431",
        coords: [43.9518, -86.4586],
        status: "confirmed",
        hours: "Tue–Sat 10 AM–5 PM · last admission 4:30",
        blurb:
          "The conflict is settled. The operator is right and the secondary listing claiming 12–7 is wrong: Tuesday 10 to 5, last admission 4:30, April through November. That makes it the one indoor thing that genuinely works on a Tuesday — but only on the Short Day plan, where you reach Ludington by 4:00. Arrive at 6:30 and it's shut.",
        tips: [
          "A five-minute walk from Stearns Park, so it pairs with the breakwall rather than competing with it.",
        ],
        source: "Port of Ludington Maritime Museum",
        sourceUrl: "https://ludingtonmaritimemuseum.org/",
      },
    ],
    images: [
      {
        src: "img/doc-chihuly-banner.png",
        alt: "Photo of the CHIHULY: Radiant Forms banner at Meijer Gardens",
        caption:
          "The banner Mom pasted in. May 2 – Nov 1 is the outdoor show; the indoor Radiant Forms gallery now runs to January 2027 and needs its own $9 timed ticket.",
      },
      {
        src: "img/doc-grand-rapids-neighborhoods.png",
        alt: "Map of Grand Rapids neighbourhoods from Mom's document",
        caption: "Mom's neighbourhood map. Heritage Hill is the one just east of downtown.",
      },
      {
        src: "img/doc-ludington-breakwater-walk.png",
        alt: "Satellite map of the walk out the Ludington breakwater",
        caption:
          "Mom's map of the breakwater walk — note it's labelled the SOUTH light; you want the north one.",
      },
    ],
    momSaid: `Tuesday  9/15—leave early AM
Stop 1- Grand Rapids (3 hrs 18)
    Brunch/Lunch possibilities: Tupelo Honey, Schnitz's deli, Blue Dog Tavern (burgers), Social Misfits (waffles)
    Meyer May House (Frank Lloyd Wright)--a drive-by
    Chihuly at Meijer Gardens
    Neighborhood Drive thru:
Stop 2—Ludington (1 hr 45)
SLEEP HERE: Summer's Inn, 717 Ludington Ave, Ludington MI 494431   Ph. 231/843.3448  $155
    North Breakwater Lighthouse (#1 lighthouse in MI-- closed M-W) 22 min walk
Big Sable Point Lighthouse (if we have time for this…sadly closed M-W, 1.5 mi hike from parking lot)
TRY:  White Pine Village, Port Museum, Check out dock`,
  },

  // ═══════════════════════════════════════════════════════════════════════
  {
    id: "d2",
    index: 2,
    date: "2026-09-16",
    title: "Sand, then wine",
    route: "Ludington → Sleeping Bear Dunes → Traverse City",
    miles: 107,
    driveMinutes: 155,
    sunset: "7:53 PM",
    sleep: bed("traverse-city"),
    legFrom: "Ludington, MI",
    lede:
      "A scenic driving day along the Lake Michigan coast with Sleeping Bear Dunes National Lakeshore, coastal overlooks, and a relaxed evening in Traverse City.",
    flags: [
      {
        level: "info",
        title: "Sleeping Bear Dunes pass ($25)",
        body: "Park entry requires a $25 7-day vehicle pass, available at the visitor center or online at recreation.gov.",
      },
      {
        level: "info",
        title: "Dune Climb & Pierce Stocking Drive",
        body: "Climb the first dune hill for sweeping views of Little Glen Lake, then drive the scenic loop to Overlook #9 above Lake Michigan.",
      },
    ],
    legs: [
      {
        label: "Ludington → Sleeping Bear Dunes",
        at: 1,
        minutes: 110,
        miles: 80,
        note: "US-31 north then M-22 along the Lake Michigan shoreline",
      },
      {
        label: "Sleeping Bear → Traverse City",
        at: 5,
        minutes: 45,
        miles: 27,
        note: "M-72 east into Traverse City",
      },
    ],
    stops: [
      {
        id: "d2-pass",
        kind: "admin",
        name: "Park entrance pass",
        where: "Buy online or at park gate",
        status: "confirmed",
        cost: "$25 / vehicle, 7 days",
        url: "https://www.recreation.gov/sitepass/74294",
        blurb: "Covers all parking and trailheads throughout Sleeping Bear Dunes National Lakeshore.",
        tips: ["Keep the pass visible on your dashboard."],
      },
      {
        id: "d2-climb",
        kind: "nature",
        name: "Dune Climb",
        where: "Glen Arbor, MI",
        address: "6900 S Dune Hwy, Glen Arbor, MI 49636",
        coords: [44.8833, -86.0408],
        status: "open",
        cost: "Included in park pass",
        time: "1–1.5 hours",
        phone: "231-326-4700",
        blurb: "Massive sand dune rising above Little Glen Lake. Great for walking up the first crest.",
        tips: [
          "Wear closed shoes or socks (sand can get warm and scrubby).",
          "Bring water bottles from the car.",
        ],
      },
      {
        id: "d2-scenic",
        kind: "scenic",
        name: "Pierce Stocking Scenic Drive",
        where: "Empire, MI",
        address: "Pierce Stocking Scenic Dr, Empire, MI 49630",
        coords: [44.8731, -86.0427],
        status: "open",
        cost: "Included in park pass",
        time: "1.5–2 hours",
        blurb: "7.4-mile scenic loop through beech-maple forest to Overlook #9 (450 ft bluff above Lake Michigan).",
        tips: [
          "Overlook #9 is the iconic panoramic photo spot.",
          "Restrooms available at picnic areas along the loop.",
        ],
      },
      {
        id: "d2-glenhaven",
        kind: "walk",
        name: "Glen Haven Historic Village & Beach",
        where: "Glen Haven, MI",
        address: "Glen Haven Beach, Glen Arbor, MI 49636",
        coords: [44.9042, -85.9908],
        status: "open",
        time: "30–45 mins",
        blurb: "Historic logging village and easy beach access to dip your toes in Lake Michigan.",
        tips: ["Gentle flat beach walk right next to parking."],
      },
      {
        id: "d2-tc-hotel",
        kind: "sleep",
        name: "Bayshore Resort Check-in",
        where: "833 E Front St, Traverse City",
        address: "833 E Front St, Traverse City, MI 49686",
        coords: [44.7612, -85.6052],
        status: "booked",
        phone: "231-935-4400",
        blurb: "Victorian-style beach resort right on Grand Traverse Bay. Short walk to downtown restaurants.",
        tips: ["Private sandy beach with sunset views over the bay."],
      },
    ],
    momSaid:
      "Wednesday 9/16—Ludington to Sleeping Bear Dunes, then Traverse City. Wineries, distilleries, tour town.",
  },

  // ═══════════════════════════════════════════════════════════════════════
  {
    id: "d3",
    index: 3,
    date: "2026-09-17",
    title: "Mushroom houses and stone hunting",
    route: "Traverse City → Charlevoix → Petoskey → Mackinaw City",
    miles: 103,
    driveMinutes: 155,
    sunset: "7:48 PM",
    sleep: bed("mackinaw-city"),
    lede:
      "Drive north along US-31 through Charlevoix to see Earl Young's stone Mushroom Houses, search for Petoskey stones at Magnus Park, and arrive at the Straits of Mackinac.",
    flags: [
      {
        level: "info",
        title: "Charlevoix & Petoskey stone route",
        body: "US-31 connects Earl Young's Mushroom Houses in Charlevoix directly to lunch in Petoskey's Gaslight District and Magnus Park beach.",
      },
      {
        level: "info",
        title: "Petoskey stone beach",
        body: "Magnus Park offers free city beach access on Little Traverse Bay with great shoreline stone hunting.",
      },
    ],
    legs: [
      {
        label: "Traverse City → Charlevoix",
        at: 0,
        minutes: 75,
        miles: 50,
        note: "US-31 north along the bay. Mom's “1 hr” is optimistic",
      },
      {
        label: "Charlevoix → Petoskey",
        at: 3,
        minutes: 27,
        miles: 17,
        note: "Still US-31, around the bottom of Little Traverse Bay",
      },
      {
        label: "Petoskey → Mackinaw City",
        at: 5,
        minutes: 53,
        miles: 36,
        note: "US-31 to I-75 north. The M-119 Tunnel of Trees alternative is closed",
      },
    ],
    stops: [
      {
        id: "d3-mushroom",
        kind: "anchor",
        name: "Earl Young's Mushroom Houses",
        where: "Boulder Park & Park Ave, Charlevoix",
        address: "Boulder Park, Charlevoix, MI 49720",
        coords: [45.3122, -85.2647],
        status: "free",
        cost: "Free to drive or walk",
        duration: "45 minutes",
        blurb:
          "Thirty-odd houses built between 1918 and 1970 out of local boulders and glacial stone, with swooping cedar-shake roofs that sag to the ground. They look like something out of a storybook and there is nothing else like them anywhere. Mom's earlier draft had Charlevoix; this is the thing in Charlevoix, and the current document drops it.",
        tips: [
          "Pick up a self-guided map at the Charlevoix Historical Society or the visitor centre on Bridge St.",
          "The densest cluster is Boulder Park, off Park Ave on the west side of Round Lake.",
          "If it's a choice between this and Castle Farms, take this.",
        ],
      },
      {
        id: "d3-bridge-st",
        kind: "stop",
        name: "Bridge Street + the Pine River Channel",
        where: "Downtown Charlevoix",
        address: "Bridge St, Charlevoix, MI 49720",
        coords: [45.3178, -85.2584],
        status: "confirmed",
        duration: "1 hour",
        blurb:
          "The drawbridge over the channel lifts on the hour and half-hour, stopping US-31 dead. Rather than fight it, stand there at :30 and watch a freighter or a sailboat go through. The South Pier Light is a short walk out from there.",
        tips: [
          "Don't book a tight Petoskey lunch for exactly on the hour — the bridge will decide otherwise.",
        ],
      },
      {
        id: "d3-castle-farms",
        kind: "optional",
        name: "Castle Farms",
        where: "5052 M-66, Charlevoix",
        address: "5052 M-66 N, Charlevoix, MI 49720",
        coords: [45.2938, -85.2416],
        status: "confirmed",
        cost: "$8 adult · $7 senior 65+ · $5 child",
        hours: "September: 10 AM–5 PM",
        duration: "90 minutes minimum",
        phone: "231-237-0884",
        blurb:
          "A 1918 stone dairy-barn complex turned garden and event venue, with a large model railroad. An earlier draft of this app said its official pages disagreed on closing time and told you to be through the gate by 2:30. They don't disagree — September is 10 to 5, so 3:30 is the real cutoff and the day has an hour more slack than assumed.",
        source: "Visit Charlevoix",
        sourceUrl: "https://www.visitcharlevoix.com/CastleFarms/",
      },
      {
        id: "d3-petoskey-lunch",
        kind: "food",
        name: "Lunch in the Gaslight District",
        where: "Downtown Petoskey",
        address: "Gaslight District, Petoskey, MI 49770",
        coords: [45.3733, -84.9553],
        status: "confirmed",
        duration: "1 hour",
        blurb:
          "A compact, walkable Victorian downtown on the bluff above Little Traverse Bay, five minutes from the stone beach. Shops here sell polished and unpolished Petoskey stones, which is a guaranteed fallback if the beach doesn't produce.",
      },
      {
        id: "d3-magnus",
        kind: "anchor",
        name: "Magnus Park — Petoskey stone hunting",
        where: "901 W Lake St, Petoskey",
        address: "901 W Lake St, Petoskey, MI 49770",
        coords: [45.3739, -84.9724],
        status: "free",
        cost: "Free",
        duration: "30–45 minutes",
        blurb:
          "Petoskey stones are fossilised Devonian coral, and the hexagonal pattern only shows when they're wet. Mid-September is the weak season — the good hauls come after autumn storms churn the shoreline — so treat this as a nice beach walk with a bonus, not a guaranteed find.",
        tips: [
          "Pack a spray bottle. Wetting a candidate stone is the whole trick.",
          "Michigan lets you take up to 25 lbs a year from public land — but NOT from Sleeping Bear Dunes, which is federal. On Wednesday: look and put it back.",
        ],
      },
      {
        id: "d3-mackinaw-evening",
        kind: "food",
        name: "Mackinaw City, Thursday evening",
        where: "Arrive ~4:15 PM",
        address: "Mackinaw City, MI 49701",
        coords: [45.7775, -84.7278],
        status: "check",
        blurb:
          "A heavily seasonal town — a meaningful share of it shuts right after Labor Day. Anchor dinner on the year-round operators and call the day of, because post-Labor-Day hours aren't reliably updated online.",
        tips: [
          "Audie's, 314 N Nicolet St — seven days, 8am–10pm.",
          "Dixie Saloon, 401 E Central Ave — daily, late.",
          "Bière de Mac Brew Works, 14277 N Mackinaw Hwy — Wednesday to Sunday only.",
          "Eat at 5:45 and walk to Lakeside Park for the 7:48 sunset behind the bridge.",
        ],
      },
    ],
    images: [
      {
        src: "img/doc-petoskey-stones.png",
        alt: "Petoskey stones on sand, from Mom's document",
        caption: "From Mom's document — the hexagonal coral pattern only shows when they're wet.",
      },
    ],
    momSaid: `Thursday 9/17
Stop 1—Charlevoix (1 hr)
-Take a drive around the lake…Tour Town of Alden?
-Clear-bottom kayaks or do a boat ride down the lake
-Petosky stone search , choose one:
Bryant Park Beach--1097 Peninsula Dr, Traverse City, MI 49686
Van's Beach--205 Cedar St, Leland, MI 49654
Peterson Park--10001 E Peterson Park Rd, Northport, MI 49701
Magnus Park--901 West Lake St, Petoskey, MI 49770
Cross Village Beach--100 Park Ln, Harbor Springs, MI 49740
Stop 2—Mackinaw City (1 hr 10) This is just a place to base ourselves to go to Mackinac Island
SLEEP HERE 2 nights: Lighthouse View Hotel, 699 N Huron Ave, Mackinaw City, MI 49701  Ph 231/436.5304 $298`,
  },

  // ═══════════════════════════════════════════════════════════════════════
  {
    id: "d4",
    index: 4,
    date: "2026-09-18",
    title: "Mackinac Island",
    route: "Ferry out at 7:30 AM, back by evening — no cars on the island",
    miles: 0,
    driveMinutes: 0,
    sunset: "7:46 PM",
    sleep: bed("mackinaw-city"),
    flags: [
      {
        level: "info",
        title: "Shepler's Ferry & shuttle",
        body: "7:30 AM ferry from Mackinaw City dock gives you a full day on the island. Motel front desk can arrange the free shuttle.",
      },
      {
        level: "info",
        title: "Fort Mackinac & island loop",
        body: "Fort Mackinac is open until 5:00 PM (cannon firings at 11:00 AM and 1:00 PM). M-185 loop is an 8.2-mile flat perimeter bike ride.",
      },
    ],
    legs: [
      {
        label: "Motel → Shepler's dock",
        at: 0,
        minutes: 10,
        note: "0.4 miles — inside the free shuttle radius. Be at the dock by 7:00 AM for the 7:30 AM boat",
      },
      {
        label: "Ferry crossing",
        at: 1,
        minutes: 16,
        note: "Shepler's direct crossing to Mackinac Island harbour",
      },
    ],
    stops: [
      {
        id: "d4-ferry",
        kind: "admin",
        name: "Shepler's Ferry — Mackinaw City to Island",
        where: "7:30 AM departure · 556 E Central Ave",
        address: "556 E Central Ave, Mackinaw City, MI 49701",
        coords: [45.7778, -84.7231],
        status: "booked",
        cost: "Tickets purchased ($39 ea)",
        phone: "231-436-5023",
        blurb: "16-minute crossing across the Straits of Mackinac. Luggage can be stored at the mainland dock.",
        tips: ["Arrive 30 minutes prior to departure."],
        source: "Shepler's Mackinac Island Ferry",
        sourceUrl: "https://www.sheplersferry.com/",
      },
      {
        id: "d4-coffee",
        kind: "food",
        name: "Lucky Bean Coffeehouse",
        where: "7383 Market St · one block off Main",
        address: "7383 Market St, Mackinac Island, MI 49757",
        coords: [45.8506, -84.6178],
        status: "check",
        blurb: "Local specialty coffee on the island before picking up bikes.",
        tips: ["Opens early near the ferry docks."],
      },
      {
        id: "d4-bikes",
        kind: "anchor",
        name: "Mackinac Island Bike Shop",
        where: "7421 Main St · opens 8 AM",
        address: "7421 Main St, Mackinac Island, MI 49757",
        coords: [45.8497, -84.6165],
        status: "confirmed",
        cost: "Hourly rental",
        phone: "906-847-6337",
        blurb: "Comfort cruisers and multi-speed bikes for the perimeter loop around the island.",
        tips: ["Perimeter loop takes roughly 1.5–2 hours with scenic stops."],
      },
      {
        id: "d4-loop",
        kind: "anchor",
        name: "M-185 — the perimeter loop",
        where: "8.2 miles, flat, no cars",
        address: "M-185, Mackinac Island, MI 49757",
        coords: [45.8607, -84.6285],
        status: "free",
        cost: "Free",
        duration: "1.5–2 hours",
        blurb: "Only state highway in America with zero motor vehicles. Paved, flat, hugging the Lake Huron shoreline.",
        tips: [
          "British Landing at mile 4.1 has restrooms and snacks.",
          "Arch Rock at mile 7.0 has scenic stairway overlook.",
        ],
      },
      {
        id: "d4-fort",
        kind: "anchor",
        name: "Fort Mackinac",
        where: "On the bluff above town",
        address: "7127 Huron Rd, Mackinac Island, MI 49757",
        coords: [45.8514, -84.6157],
        status: "confirmed",
        hours: "9:00 AM–5:00 PM (last entry 4:00 PM)",
        duration: "2 hours",
        blurb: "1780s historic fort on the bluff with live rifle and cannon demonstrations and the Tea Room restaurant.",
        tips: ["Tea Room terrace has panoramic views overlooking the harbour."],
      },
      {
        id: "d4-grand",
        kind: "stop",
        name: "The Grand Hotel porch",
        where: "286 Grand Ave",
        address: "286 Grand Ave, Mackinac Island, MI 49757",
        coords: [45.8478, -84.6238],
        status: "check",
        hours: "Admissions open until 6:00 PM",
        blurb: "World's longest front porch with sweeping views across the Straits of Mackinac.",
        tips: ["Afternoon tea served 3:30–5:00 PM."],
      },
      {
        id: "d4-fudge",
        kind: "food",
        name: "Main Street Fudge Shops",
        where: "Main Street",
        address: "Main St, Mackinac Island, MI 49757",
        coords: [45.8494, -84.6172],
        status: "confirmed",
        blurb: "Famous marble-slab fudge makers along Main Street including Murdick's, Ryba's, and Joann's.",
      },
    ],
    momSaid:
      "Friday 9/18—All Day Mackinac Island: 7:30 AM ferry, bikes on M-185, Fort Mackinac, Grand Hotel.",
  },

  // ═══════════════════════════════════════════════════════════════════════
  {
    id: "d5",
    index: 5,
    date: "2026-09-19",
    title: "Oktoberfest, then Ontario",
    route: "Mackinaw City → Frankenmuth → Port Huron → Point Edward, ON",
    miles: 298,
    driveMinutes: 330,
    sunset: "7:45 PM",
    sleep: bed("sarnia"),
    lede:
      "Drive south through Frankenmuth for Oktoberfest and world-famous family-style chicken dinners, then cross the Blue Water Bridge into Ontario.",
    flags: [
      {
        level: "info",
        title: "Frankenmuth Oktoberfest & dining",
        body: "Heritage Park hosts Oktoberfest; reserve an 11:30 AM family-style chicken dinner at the Bavarian Inn before exploring Bronner's.",
      },
      {
        level: "info",
        title: "Blue Water Bridge cashless toll ($5 USD)",
        body: "The bridge into Sarnia is completely cashless; tap credit card or Apple Pay at the US toll plaza.",
      },
    ],
    legs: [
      {
        label: "Mackinaw City → Frankenmuth",
        at: 1,
        minutes: 200,
        miles: 203,
        note: "I-75 south the whole way. Leave by 7:30am if you want Colonial Michilimackinac first at 9:30",
      },
      {
        label: "Frankenmuth → Port Huron",
        at: 4,
        minutes: 100,
        miles: 89,
        note: "I-69 east. Fort Gratiot Lighthouse sits at the foot of the bridge for zero detour",
      },
      {
        label: "Port Huron → Point Edward, ON",
        at: 5,
        minutes: 30,
        miles: 6,
        note: "Blue Water Bridge. Fill the tank on the US side first — Ontario fuel is much dearer",
      },
    ],
    stops: [
      {
        id: "d5-michilimackinac",
        kind: "optional",
        name: "Colonial Michilimackinac",
        where: "Mackinaw City · opens 9:30 AM",
        address: "102 W Straits Ave, Mackinaw City, MI 49701",
        coords: [45.7859, -84.7326],
        status: "confirmed",
        duration: "90 minutes",
        blurb:
          "A reconstructed 1715 French fur-trading village and British fort under the south end of the Mackinac Bridge, with an active archaeological dig that's been running since 1959. If you bought the combo ticket for Fort Mackinac on Friday, this is already covered.",
        tips: [
          "Open at 9:30, out by 11:15, on the road — you still reach Frankenmuth about 2:15.",
          "Historic Mill Creek — rebranded Dousman's Mill — doesn't open at all in 2026; construction on the new visitor centre pushed it to May 2027. Don't buy a ticket from a reseller.",
        ],
      },
      {
        id: "d5-bavarian-inn",
        kind: "food",
        name: "Bavarian Inn — the chicken dinner",
        where: "713 S Main St, Frankenmuth",
        address: "713 S Main St, Frankenmuth, MI 48734",
        coords: [43.3295, -83.7386],
        status: "check",
        cost: "$31.99 each",
        hours: "Opens 11:00 AM",
        blurb:
          "Family-style fried chicken with the full run of sides, served in a building that commits entirely to the bit. The Main Street end of the Holz Brücke covered bridge is right outside, which puts the festival grounds a walk away.",
        tips: [
          "Reserve an 11:15–11:45 seating on an Oktoberfest Saturday.",
          "Zehnder's across the street is $29.95; its Feast Dinner ($38.95, Fri–Sun) adds prime rib and shrimp.",
        ],
      },
      {
        id: "d5-oktoberfest",
        kind: "anchor",
        name: "Frankenmuth Oktoberfest",
        where: "Heritage Park · gates at noon",
        address: "Heritage Park, Frankenmuth, MI 48734",
        coords: [43.3336, -83.7379],
        status: "confirmed",
        cost: "$10 per person at the gate · 15 and under free",
        hours: "Sat 9/19: noon to midnight — the busiest day",
        blurb:
          "One of the few Oktoberfests outside Bavaria sanctioned by the city of Munich. Gates at noon, and the crowd builds all afternoon, which is exactly why a 3:30 departure is not negotiable if you also want to be in Ontario at a civilised hour. Note the $30 gate cost for the three of you — Mom's document doesn't mention the festival at all, so it doesn't budget for it either.",
        source: "Frankenmuth CVB",
        sourceUrl: "https://www.frankenmuth.org/events/frankenmuth-oktoberfest1/",
      },
      {
        id: "d5-bronners",
        kind: "stop",
        name: "Bronner's CHRISTmas Wonderland",
        where: "25 Christmas Ln, Frankenmuth",
        address: "25 Christmas Ln, Frankenmuth, MI 48734",
        coords: [43.3179, -83.7381],
        status: "free",
        cost: "Free to enter",
        duration: "45 minutes",
        blurb:
          "The world's largest Christmas store, the size of several football fields, open year-round and free to walk through. It is genuinely absurd and worth seeing once.",
      },
      {
        id: "d5-fort-gratiot",
        kind: "optional",
        name: "Fort Gratiot Lighthouse",
        where: "Port Huron, at the foot of the bridge",
        address: "2802 Omar St, Port Huron, MI 48060",
        coords: [43.0058, -82.4225],
        status: "check",
        blurb:
          "Michigan's oldest lighthouse, 1829, sitting right where Lake Huron pours into the St. Clair River — and directly at the approach to the Blue Water Bridge, so it costs no detour. A better way to scratch the Lake Huron itch than the M-25 shore drive, which doesn't fit this day.",
      },
      {
        id: "d5-waterfront",
        kind: "stop",
        name: "Point Edward waterfront",
        where: "From the hotel door",
        address: "Point Edward, ON, Canada",
        coords: [42.9989, -82.42],
        status: "free",
        cost: "Free",
        blurb:
          "The waterfront trail genuinely does start at the hotel, with the Blue Water Bridge lit up overhead. Mom's note that Centennial Park is “just north of hotel” overstates the walk — that one's a drive. This one isn't.",
        tips: ["Sunset around 7:45 — the walk only works if you clear the bridge by about 7."],
      },
    ],
    momSaid: `Saturday 9/19
Stop 1—Frankenmuth (2 hrs 50)
-Little Bavaria, cute, quaint, good food?
Stop 2—Optional:  Midland, Saginaw, Flint (1 hr-1 hr 30)
Small livable towns (Howell, "best overall downtown"!)
Stop 3—Sarnia CANADA (2 hrs to border)
Waterfront Trail (just north of hotel)
SLEEP HERE: Sheraton Four Points 1498 Venetian Boulevard Pt Edward, Ph 519.336.4130  $169 Canadian`,
  },

  // ═══════════════════════════════════════════════════════════════════════
  {
    id: "d6",
    index: 6,
    date: "2026-09-20",
    title: "You have to pick one",
    route: "Point Edward → Windsor → Detroit → Belleville",
    miles: 102,
    driveMinutes: 145,
    sunset: "7:31 PM",
    sleep: bed("belleville"),
    legFrom: "Point Edward, ON",
    lede:
      "Drive Highway 401 into Windsor for riverfront skyline views, cross via the Detroit Tunnel directly into downtown, and explore Belle Isle and The Belt art alley.",
    flags: [
      {
        level: "info",
        title: "Detroit & Windsor highlights",
        body: "Explore the Windsor riverfront skyline park, cross via the Detroit Tunnel, and visit Belle Isle Aquarium and The Belt art alley.",
      },
      {
        level: "info",
        title: "Detroit Tunnel cashless toll",
        body: "Toll is CA$8.25 by card at the Windsor kiosk. The tunnel surfaces directly at Jefferson & Randolph in downtown Detroit.",
      },
    ],
    legs: [
      {
        label: "Point Edward → Windsor",
        at: 0,
        minutes: 85,
        miles: 67,
        note: "Highway 402 to Highway 401 west into Windsor",
      },
      {
        label: "Windsor → Downtown Detroit",
        at: 1,
        minutes: 30,
        miles: 2,
        note: "Detroit–Windsor Tunnel under the Detroit River",
      },
      {
        label: "Detroit → Belleville",
        at: 4,
        minutes: 40,
        miles: 28,
        note: "I-94 west to Belleville hotel area",
      },
    ],
    stops: [
      {
        id: "d6-windsor",
        kind: "stop",
        name: "Windsor Riverfront & Sculpture Park",
        where: "Riverside Dr W, Windsor, ON",
        address: "Riverside Dr W, Windsor, ON, Canada",
        coords: [42.3186, -83.0397],
        status: "free",
        cost: "Free",
        duration: "45–60 mins",
        blurb: "Panoramic view of the Detroit skyline looking north across the Detroit River.",
        tips: ["Paved walking path with contemporary outdoor sculptures."],
      },
      {
        id: "d6-belle-isle",
        kind: "anchor",
        name: "Belle Isle Aquarium & Conservatory",
        where: "Belle Isle Park, Detroit",
        address: "900 Inselruhe Ave, Detroit, MI 48207",
        coords: [42.3387, -82.9686],
        status: "open",
        cost: "Free admission ($12 non-resident vehicle pass at gate)",
        hours: "Thu–Sun 10:00 AM–4:00 PM",
        blurb: "America's oldest aquarium (1904) with historic green glass-tiled vaulted ceiling and adjacent botanical conservatory.",
        tips: ["Scott Memorial Fountain on the western tip has great river views."],
      },
      {
        id: "d6-belt",
        kind: "stop",
        name: "The Belt Art Alley",
        where: "Downtown Detroit (Library St)",
        address: "The Belt, Detroit, MI 48226",
        coords: [42.3339, -83.0466],
        status: "free",
        cost: "Free",
        duration: "30 mins",
        blurb: "Vibrant pedestrian alleyway filled with public art murals and installations in downtown Detroit.",
      },
      {
        id: "d6-hotel",
        kind: "sleep",
        name: "Belleville Stay Check-in",
        where: "Belleville, MI",
        address: "46280 N I-94 Service Dr, Belleville, MI 48111",
        coords: [42.2338, -83.4844],
        status: "booked",
        blurb: "Convenient stay along the I-94 corridor, 20 minutes east of Ann Arbor and positioned for Monday's drive home.",
      },
    ],
    momSaid:
      "Sunday 9/20—Windsor riverfront, Detroit Tunnel, Belle Isle Aquarium, The Belt, sleep Belleville.",
  },

  // ═══════════════════════════════════════════════════════════════════════
  {
    id: "d7",
    index: 7,
    date: "2026-09-21",
    title: "Home, and an hour back",
    route: "Belleville → Ann Arbor → Palatine → O'Hare",
    miles: 297,
    driveMinutes: 285,
    sleep: null,
    legFrom: "Belleville, MI",
    lede:
      "Drive west along I-94, stop in Ann Arbor for breakfast, gain an hour crossing into Central Time, drop bags in Palatine, and return the rental car at O'Hare for AA 1253.",
    flags: [
      {
        level: "info",
        title: "Flight AA 1253 runway timeline",
        body: "Depart Belleville by 8:00 AM Eastern. Gaining 1 hour crossing into Central Time allows time for Ann Arbor breakfast and returning the car at O'Hare by 1:00 PM for the 3:20 PM flight.",
      },
      {
        level: "info",
        title: "Gain 1 hour entering Illinois",
        body: "Crossing from Michigan (Eastern) to Illinois (Central) moves clocks back 1 hour, providing extra buffer for the drive.",
      },
    ],
    legs: [
      {
        label: "Belleville → Ann Arbor",
        at: 0,
        minutes: 25,
        miles: 19,
        note: "I-94 west. Barely a detour",
      },
      {
        label: "Ann Arbor → Kalamazoo",
        at: 1,
        minutes: 100,
        miles: 99,
        note: "I-94 the whole way",
      },
      {
        label: "Kalamazoo → Palatine",
        at: 2,
        minutes: 160,
        miles: 180,
        note: "I-94 around the lake. You gain an hour crossing into Central time",
      },
    ],
    stops: [
      {
        id: "d7-ann-arbor",
        kind: "stop",
        name: "Ann Arbor",
        where: "Kerrytown and the Diag",
        address: "Ann Arbor, MI 48104",
        coords: [42.2808, -83.743],
        status: "check",
        duration: "45 minutes, and only if you left on time",
        blurb:
          "Mom's document has this as “Ann Arbor?” — worth removing the question mark, but it's now conditional. It's 25 minutes off the line, so a 45-minute stop is affordable if you cleared Belleville by 7:30am Eastern. If you're running later than that, drive past it: the flight doesn't move.",
        tips: [
          "Zingerman's Delicatessen in Kerrytown is the anchor — check the opening hour before counting on breakfast there.",
          "Free two-hour parking in the Kerrytown structure.",
          "This is a coffee-and-a-sandwich stop now, not the campus walk it used to be.",
        ],
      },
      {
        id: "d7-kalamazoo",
        kind: "optional",
        name: "Kalamazoo — the driving break",
        where: "Halfway, roughly",
        address: "Kalamazoo, MI 49007",
        coords: [42.2917, -85.5872],
        status: "closed",
        duration: "Cut — the flight took it",
        blurb:
          "Mom's framing — “to take a driving break?” — was exactly right, and Kalamazoo sits right on I-94 at about the halfway point. It doesn't survive a 3:20pm departure from O'Hare. Keeping it means arriving at the rental return with no margin on the last day of the trip, which is the wrong place to spend your luck.",
        tips: [
          "Break at a service plaza instead — you need fuel on this leg anyway.",
          "If it helps: nothing here is seasonal or closing. Kalamazoo will still be there.",
        ],
      },
      {
        id: "d7-home",
        kind: "anchor",
        name: "Home",
        where: "Palatine, Illinois",
        address: "2020 Crestwood Lane, Palatine, IL 60074",
        coords: [42.1103, -88.0342],
        status: "confirmed",
        blurb:
          "1,214 road miles, two countries, five beds, one island, and an hour handed back at the state line.",
      },
    ],
    momSaid: `9/21
Stop 1—Ann Arbor?
Stop 2—Kalamazoo (1 hr 46)
To take a driving break?
Stop 3—Home (3 hrs)`,
  },
];

/*
 * `HEADLINES` used to live here — a duplicate list of the scariest findings,
 * rendered as a wall of red on the Overview. It has been replaced by
 * `src/data/looseEnds.js`, which carries the same findings plus every other
 * open question, sorted by what each one asks of you rather than by how
 * alarming it is. One list, one source of truth.
 */

/** Overview cards — the emotional pitch, linked to the day pages. */
export const HIGHLIGHTS = [
  {
    dayId: "d4",
    dayIndex: 4,
    when: "Friday",
    title: "An island with no cars",
    body:
      "8.2 flat miles of state highway around the shoreline, ridden on rented bikes, with a fort on the bluff and cannon fire at eleven.",
    tag: "Tickets already bought",
    tagTone: "locked",
  },
  {
    dayId: "d2",
    dayIndex: 2,
    when: "Wednesday",
    title: "A 450-foot wall of sand",
    body:
      "The Lake Michigan Overlook at Sleeping Bear drops straight into the water. Climb the first dune, then have the sense to turn around.",
    tag: "$25 per car",
  },
  {
    dayId: "d1",
    dayIndex: 1,
    when: "Tuesday",
    title: "Ninety minutes inside a Frank Lloyd Wright house",
    body:
      "The Meyer May House, restored to the last art-glass panel and original textile. Free, and only open three days a week.",
    tag: "Reserve ahead",
    tagTone: "warn",
  },
  {
    dayId: "d3",
    dayIndex: 3,
    when: "Thursday",
    title: "Houses that look like mushrooms",
    body:
      "Earl Young spent fifty years building boulder cottages in Charlevoix with roofs that sag to the ground. Mom's earlier draft had them; this one lost them.",
    tag: "Free",
  },
  {
    dayId: "d5",
    dayIndex: 5,
    when: "Saturday",
    title: "Oktoberfest, by accident",
    body:
      "Frankenmuth runs one of the few Munich-sanctioned Oktoberfests outside Bavaria, and it happens to peak the day you arrive.",
    tag: "Book the chicken",
    tagTone: "warn",
  },
  {
    dayId: "d6",
    dayIndex: 6,
    when: "Sunday",
    title: "A cathedral for fish",
    body:
      "Belle Isle Aquarium, 1904, one green-tiled vaulted gallery. Open Thursday to Sunday only — and your Sunday works.",
    tag: "Free entry",
  },
];
