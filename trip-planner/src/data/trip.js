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
        title: "Tuesday 6:00 AM departure",
        body: "Leaving Palatine by 6:00 AM Central (Gunnar's call, 2026-09-14) puts you in Grand Rapids around 10:20 Eastern, an hour ahead of the 11:30 AM Meyer May tour.",
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
        where: "SFO T1 1:29 PM PDT → ORD T3 8:21 PM CDT",
        address: "Chicago O'Hare International Airport, Terminal 3, Chicago, IL 60666",
        coords: [41.9742, -87.9073],
        status: "booked",
        blurb:
          "Boeing 737 transcon (1,846 mi, 4h 52m). Tandem aisle seating: Gunnar in 18D (QPJBXO), Mikaela in 19D (YBEEOU). Departs SFO Harvey Milk Terminal 1; door close cutoff 1:14 PM PDT.",
        tips: [
          "Tandem Aisle Strategy (18D/19D): Starboard aisle, overhead bin space claim, no middle seat pinch, rapid deplaning.",
          "In-flight power: 110V AC under seat + 5V USB-A in seatback. Free streaming/messaging on Viasat Wi-Fi.",
          "ORD arrival: Lands Terminal 3 Concourse H/K. Take pedestrian bridge to automated ATS train directly to MMF (10 min ride).",
        ],
      },
      {
        id: "d0-rental",
        kind: "admin",
        name: "Budget rental pickup (O'Hare MMF)",
        where: "9:00 PM · O'Hare Multi-Modal Facility, 10255 W Zemke Blvd",
        address: "10255 W Zemke Blvd, Chicago, IL 60666",
        coords: [41.9786, -87.8892],
        status: "booked",
        cost: "$332.92 total",
        phone: "773-825-4600",
        blurb:
          "Booked as a Mazda CX-50 or similar; handed over as a Toyota Sienna Hybrid (2024 or newer, ~24k miles, Florida plates). Multi-Modal Facility Level 1 counter is open 24 hours.",
        tips: [
          "ATS Transit: Board ATS people-mover at Terminal 3; ride 9–11 mins to MMF station. Free 24/7.",
          "Verbatim Canada request: 'Please issue the free Canadian Non-Resident Insurance Card for Ontario driving.'",
          "Costco rental benefit: Primary renter (Gunnar) + one free additional driver (Mikaela) included.",
          "Inspection: Photograph all 4 body panels, wheels, and full fuel gauge in the MMF garage before driving off.",
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
    miles: 306,
    driveMinutes: 305,
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
        note: "I-90 to I-94 around the bottom of the lake, then I-196. You lose an hour to Eastern time — leave by 6:00am CT after a late Monday arrival, in Grand Rapids just after 11:00am ET",
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
          "A 1909 Prairie house that Steelcase restored down to the original Wright-designed furniture, textiles, and art glass — widely considered one of the most complete Wright restorations anywhere. Free 90-minute guided tour.",
        tips: [
          "Free street parking on Logan St and Madison Ave.",
          "Arrive no more than ten minutes early — they specifically ask you not to come sooner.",
          "Located inside Heritage Hill, making it easy to combine with a historic neighborhood stroll.",
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
          "One of the largest urban historic districts in the country — roughly 1,300 houses across sixty-odd architectural styles, located right in the neighborhood.",
        tips: [
          "Loop north on Madison, east on Cherry, back down College — about 25 minutes.",
          "Heritage Hill is situated immediately east of downtown Grand Rapids.",
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
          "Schnitz Deli offers classic sandwiches, deli sides, and drinks in Grand Rapids. Open until 3:00 PM; great lunch spot before heading to Meijer Gardens.",
        tips: [
          "Located in Eastown Grand Rapids with street parking nearby.",
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
          "Frederik Meijer Gardens features outdoor glass sculptures across the 158-acre park and the indoor Radiant Forms exhibition. Open until 9:00 PM on Tuesdays.",
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
          "Head to the North Breakwater light, accessible directly from Stearns Park Beach.",
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
          "Historic outdoor village open Tuesdays through October 17 (last ticket sales 3:30 PM).",
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
          "Maritime museum located near Stearns Park, open Tuesday–Saturday 10:00 AM–5:00 PM (last admission 4:30 PM).",
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
        caption: "Map of Grand Rapids historic districts, with Heritage Hill east of downtown.",
      },
      {
        src: "img/doc-ludington-breakwater-walk.png",
        alt: "Satellite map of the walk out the Ludington breakwater",
        caption: "Map of the breakwater walk out to the North Breakwater light at Stearns Park.",
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
    title: "Dunes first, then Fishtown",
    route: "Ludington → Sleeping Bear Dunes → Glen Haven → Fishtown → Traverse City",
    miles: 132,
    driveMinutes: 190,
    sunset: "7:53 PM",
    sleep: bed("traverse-city"),
    legFrom: "Summer's Inn, 717 E Ludington Ave, Ludington, MI 49431",
    lede:
      "Out of Ludington at 8:00, straight to the dunes. The scenic drive to the 450-foot overlook, then a look at the big dune from the bottom, then Glen Haven on the water. Lunch on the docks at Fishtown, Petoskey stones on Van's Beach, and Traverse City by mid-afternoon with the evening open.",
    flags: [
      {
        level: "ok",
        title: "Park pass: bought",
        body: "Mom bought the $25 seven-day vehicle pass (her list: 'Entry fee to Sleeping Bear $25—MINE!'). It covers the scenic drive, the Dune Climb, Glen Haven, Loon Lake and every trailhead, in and out all week. Nobody stops at a gate to pay.",
      },
      {
        level: "info",
        title: "The Cannery boat museum at Glen Haven is closed",
        body: "The park's conditions page (checked 2026-09-15, dated Sept 10) lists the Glen Haven Cannery Boat Museum closed and the Maritime Museum, General Store, Blacksmith Shop, Dune Climb and Scenic Drive open. Post–Labor Day staffing at the Maritime Museum is not published, so it is a 'walk up and see' stop.",
        fix: "Park HQ 231-326-4700 answers hours questions. Glen Haven beach and the village street are open regardless.",
      },
      {
        level: "info",
        title: "Fishtown is a 5 PM town on a Wednesday",
        body: "Village Cheese Shanty closes at 5 and Carlson's Fishery is 9–5 on Wednesdays. The plan lands you there around 1:00, which is two hours of slack, but the dunes are the thing that eats time.",
        fix: "If it is past noon and you are still at the dunes, shorten Glen Haven, not Fishtown.",
      },
    ],
    legs: [
      {
        label: "Ludington → Sleeping Bear Dunes",
        at: 1,
        minutes: 105,
        miles: 80,
        note: "US-31 to Manistee, M-22 up the shore through Frankfort (Perks, 429 Main St, for coffee) and Empire. Loon Lake's lot is on the right just after the Platte River bridge if anyone wants Mom's ten-minute toe-dip on the way; otherwise straight on. Scenic drive entrance is on M-109 just north of Empire.",
      },
      {
        label: "Glen Haven → Leland",
        at: 4,
        minutes: 35,
        miles: 21,
        note: "M-109 to M-22 north through Glen Arbor (Cherry Republic on the main street if a snack is needed) and on to Leland.",
      },
      {
        label: "Leland → Traverse City",
        at: 6,
        minutes: 45,
        miles: 30,
        note: "M-22 south, M-204 across the peninsula, M-72 into town, US-31 north along East Bay to the inn.",
      },
    ],
    stops: [
      {
        id: "d2-pass",
        kind: "admin",
        name: "Sleeping Bear vehicle pass",
        where: "Already bought. Keep it on the dash or on Mom's phone.",
        status: "purchased",
        cost: "$25 for 7 days · paid",
        url: "https://www.recreation.gov/sitepass/74294",
        blurb: "One pass covers every entrance, trailhead, the scenic drive and the Dune Climb lot, in and out all week.",
        source: "NPS fees page and Mom's list",
        sourceUrl: "https://www.nps.gov/slbe/planyourvisit/fees.htm",
      },
      {
        id: "d2-scenic",
        fromMom: true,
        kind: "anchor",
        name: "Pierce Stocking Scenic Drive",
        where: "10:00 · about 55 minutes · one-way 7.4-mile loop",
        address: "Pierce Stocking Scenic Dr, Empire, MI 49630",
        coords: [44.8731, -86.0427],
        status: "confirmed",
        cost: "Included in the pass",
        hours: "9 AM to 30 minutes after sunset, weather permitting",
        duration: "45–60 min",
        blurb: "Mom's 'take a drive on the 7-mile Pierce Stocking Scenic Drive'. Twelve numbered stops: the covered bridge (2), the Glen Lake overlook (3), the dune overlook (4) and then the Lake Michigan Overlook (9), a 450-foot bluff straight down into the water. The photo of the trip.",
        tips: [
          "Entrance on M-109 just north of Empire, well signed; the loop is one-way, so drive it once.",
          "Stops 3, 4, 9 and 10 are the ones. Overlook 9 is a short boardwalk from the lot; benches at the top.",
          "Do not walk down the bluff at Overlook 9: the climb back is 450 feet of loose sand and the park bills for rescues.",
          "Exit puts you back on M-109; the Dune Climb lot is 3 miles north, 6 minutes.",
        ],
        source: "NPS, Pierce Stocking Scenic Drive",
        sourceUrl: "https://www.nps.gov/slbe/planyourvisit/pierce-stocking-scenic-drive.htm",
      },
      {
        id: "d2-dune-climb",
        fromMom: true,
        kind: "sight",
        name: "The big dune, from the bottom",
        where: "11:00 · 20 minutes · the lot sits right at its foot",
        address: "6900 S Dune Hwy (M-109), Glen Arbor, MI 49636",
        coords: [44.8833, -86.0408],
        status: "confirmed",
        cost: "Included in the pass",
        duration: "15–20 min",
        blurb: "Three miles up the road from the scenic drive exit. A 110-foot wall of sand rising straight off the parking lot, benches at the bottom, people going up it like ants. Look at it, take the photo, drive on. Mom's list allowed for 'sit back and watch', which is the plan.",
        tips: [
          "Best restrooms in the park are here; use them before Glen Haven.",
          "Anyone who changes their mind can go up to the first crest in about 15 minutes. Nobody has to.",
        ],
        source: "NPS, Dune Climb; status open per park conditions page 2026-09-10",
        sourceUrl: "https://www.nps.gov/slbe/planyourvisit/conditions.htm",
      },
      {
        id: "d2-glenhaven",
        fromMom: true,
        kind: "stop",
        name: "Glen Haven village and beach",
        where: "11:25 · 30 minutes · the old logging village on the lake",
        address: "Glen Haven, M-209, Glen Arbor, MI 49636",
        coords: [44.9042, -85.9908],
        status: "confirmed",
        cost: "Included in the pass",
        duration: "20–30 min",
        blurb: "Mom's 'explore Glen Haven'. The 1860s company town at the end of M-209: General Store, blacksmith shop, and a flat pebble beach on Sleeping Bear Bay, with the Manitou islands offshore. The Cannery boathouse with the old boats is closed this month; the rest is open.",
        tips: [
          "Park at the beach lot; everything is within a hundred yards.",
          "Toes in Lake Michigan here. It will be cold.",
          "Mom's Maritime Museum is 1.5 miles west at Sleeping Bear Point: the 1901 Life-Saving Station, surfboat and rescue gear. Listed open on the park's conditions page, September hours unpublished; walk up and see, or ask HQ at 231-326-4700.",
        ],
        source: "NPS, Glen Haven; conditions page 2026-09-10 (Cannery closed, store and blacksmith open)",
        sourceUrl: "https://www.nps.gov/slbe/planyourvisit/glen-haven.htm",
      },
      {
        id: "d2-fishtown",
        kind: "food",
        name: "Fishtown, Leland",
        where: "1:00 · lunch on the dock · 1.5 hours",
        address: "Fishtown, 199 W River St, Leland, MI 49654",
        coords: [45.0212, -85.7583],
        status: "confirmed",
        hours: "Village Cheese Shanty 9–5 daily · Carlson's Fishery Wed 9–5",
        duration: "1–1.5 hours",
        url: "https://www.fishtownmi.org/visit/shops-and-charters/",
        urlLabel: "Fishtown shops",
        blurb: "One of the last working fishing villages on the lake: grey shanties on the Leland River, charter boats, and lunch eaten on the dock. Village Cheese Shanty makes the sandwich people drive here for; Carlson's smokes whitefish on site.",
        tips: [
          "Order at the Cheese Shanty first (the line is the queue for the whole village), then wander the shanties while it's made.",
          "Carlson's smoked whitefish and dip travel well: dinner-in-the-room insurance for Traverse City.",
          "Parking is free: the public lot on River Street, or along Main Street. Everything is a two-minute walk.",
          "The dam and the falls are behind the shanties; the harbor breakwall is the walk after lunch.",
        ],
        source: "Fishtown Preservation Society; shop hours checked 2026-09-15",
        sourceUrl: "https://www.fishtownmi.org/",
      },
      {
        id: "d2-vans",
        kind: "sight",
        name: "Van's Beach, Petoskey stones",
        where: "2:30 · 20 minutes · two minutes' walk south of the harbor",
        address: "Van's Beach, Leland, MI 49654",
        coords: [45.0230, -85.7630],
        status: "free",
        duration: "20 min",
        blurb: "Mom's Petoskey-stone beach. Also the home of Leland Blue, the slag glass from the old iron furnace that washes up as smooth blue stones. Wet stones at the waterline are the ones that show the coral pattern.",
        tips: [
          "Walk from Fishtown; the beach lot is tiny and tucked behind an auto shop.",
          "Petoskey stones are legal to take from a public beach in small amounts (under 25 lb a year per person). Leave the big ones.",
        ],
        source: "Travel the Mitten, Petoskey stone beaches",
        sourceUrl: "http://travelthemitten.com/family-trips/petoskey-stone-hunting-10-beaches-where-you-can-find-michigans-state-stone/",
      },
      {
        id: "d2-tc-hotel",
        fromMom: true,
        kind: "lodging",
        name: "Brio Beach Inn check-in",
        where: "3:30 · 1465 US-31 N, on East Grand Traverse Bay",
        address: "1465 US-31 N, Traverse City, MI 49686",
        coords: [44.7772, -85.5713],
        status: "booked",
        phone: "231-946-6930",
        url: "https://briobeachinn.com/",
        blurb: "Twenty-two rooms with 150 feet of private sand on the bay, ten minutes from downtown. Mom's document and the booking both say Brio; an earlier version of this page said Bayshore, which is a different hotel.",
        tips: [
          "Drop the bags, rinse the sand off, and the beach is out the back door. Nothing is scheduled until dinner.",
          "Sunset is 7:53, straight across the bay from the inn's sand. Back from dinner by 7:30 and it is free.",
          "Mom's 'wineries, distilleries': Left Foot Charley (806 Red Dr, Wed until 7) is the one open tonight, ten minutes away. The peninsula wineries close by five or six.",
        ],
        source: "Brio Beach Inn",
        sourceUrl: "https://briobeachinn.com/",
      },
      {
        id: "d2-front-street",
        fromMom: true,
        kind: "food",
        name: "Dinner on Front Street",
        where: "6:30 · downtown, ten minutes from the inn",
        address: "E Front St, Traverse City, MI 49684",
        coords: [44.7631, -85.6206],
        status: "free",
        duration: "1.5 hours",
        blurb: "Mom's 'tour town, eat well'. Six walkable blocks of restaurants: Amical (French-ish, bay view, 229 E Front), Sorellina (Italian), 7 Monks (beer, open late). Nothing is booked; a Wednesday in September does not need it.",
        tips: [
          "Free street parking after 6 downtown; the Larry C. Hardy deck on State Street otherwise.",
          "Clinch Park and the marina are one block north of Front Street: the bay walk after dinner.",
          "Or skip the drive: Carlson's whitefish from Fishtown on the inn's beach.",
        ],
        source: "Traverse City tourism, Front Street",
        sourceUrl: "https://www.traversecity.com/food-and-drink/",
      },
    ],
    momSaid:
      "Wednesday 9/16\nStop 1—Sleeping Bear Dunes (2 hrs) NEED PASS per car $25 https://www.recreation.gov/sitepass/74294\nFor less than 3 hour visit:\n-Take a drive on the 7-mile Pierce Stocking Scenic Drive\n-Trek up the Dune Climb - or sit back and watch the rest of your party climb\n-Explore Glen Haven and the Maritime Museum\n-Dip your toes in the tranquil Loon Lake\n\nStop 2—Traverse City (38 mins)\nSLEEP HERE:  Brio Beach Inn, 1465 US 31 N, Traverse City, MI 49686  Ph 231/946.6930,  $245 approx\n-Wineries, distilleries, city trail, tour town, lighthouse, eat well",
  },

  // ═══════════════════════════════════════════════════════════════════════
  {
    id: "d3",
    index: 3,
    date: "2026-09-17",
    title: "Charlevoix, the SkyBridge, Petoskey",
    route: "Traverse City → Charlevoix → SkyBridge (Boyne Mountain) → Petoskey → Mackinaw City",
    miles: 125,
    driveMinutes: 165,
    sunset: "7:48 PM",
    sleep: bed("mackinaw-city"),
    legFrom: "Brio Beach Inn, 1465 US-31 N, Traverse City, MI 49686",
    lede:
      "Out of Traverse City at 8:30. Charlevoix for the stone Mushroom Houses and the drawbridge, inland to Boyne Mountain for the SkyBridge when it opens at 11, late lunch in Petoskey, the stone beach at Magnus Park, then up to the Straits by about 4:15. Two nights in Mackinaw City; the island is tomorrow.",
    flags: [
      {
        level: "ok",
        title: "SkyBridge tickets: bought",
        body: "Three admissions for Thursday, September 17 are in Gunnar's Apple Wallet. Chairlift included. Show the QR codes at the lift; nobody queues at the window.",
      },
      {
        level: "info",
        title: "Lunch is late on purpose",
        body: "SkyBridge opens at 11 and takes an hour and a half, so Petoskey lunch lands around 1:30. Eat something in Charlevoix if that is too long.",
      },
    ],
    legs: [
      {
        label: "Traverse City → Charlevoix",
        at: 0,
        minutes: 60,
        miles: 50,
        note: "US-31 north along East Bay, then the straight run up the shore. Apple Maps says 58 minutes.",
      },
      {
        label: "Charlevoix → SkyBridge",
        at: 2,
        minutes: 35,
        miles: 24,
        note: "M-66 south out of town to Boyne City, then Boyne City Road and US-131 to Boyne Mountain. Inland and wooded; the resort entrance is at Boyne Falls.",
      },
      {
        label: "SkyBridge → Petoskey",
        at: 3,
        minutes: 23,
        miles: 15,
        note: "US-131 north straight into Petoskey.",
      },
      {
        label: "Petoskey → Mackinaw City",
        at: 5,
        minutes: 47,
        miles: 36,
        note: "US-31 to I-75 north. The Tunnel of Trees (M-119) is the scenic alternative and adds an hour; save it unless the afternoon is empty.",
      },
    ],
    stops: [
      {
        id: "d3-mushroom",
        fromMom: true,
        kind: "anchor",
        name: "Earl Young's Mushroom Houses",
        where: "9:30 · 40 minutes · Boulder Park and Park Ave, west side of Round Lake",
        address: "Boulder Park, Charlevoix, MI 49720",
        coords: [45.3122, -85.2647],
        status: "free",
        cost: "Free to drive or walk",
        duration: "45 minutes",
        blurb:
          "Thirty-odd whimsical stone houses built between 1918 and 1970 out of local boulders and glacial stone, with swooping cedar-shake roofs.",
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
        where: "10:10 · 35 minutes · Bridge Street, the channel and the 10:30 bridge lift",
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
        id: "d3-skybridge",
        kind: "anchor",
        name: "SkyBridge Michigan",
        where: "11:20 · about 1.5 hours · Boyne Mountain, chairlift up and the bridge",
        address: "1 Boyne Mountain Rd, Boyne Falls, MI 49713",
        coords: [45.1616, -84.9292],
        status: "purchased",
        cost: "3 tickets · paid · Apple Wallet",
        hours: "Daily 11 AM – 6:30 PM through October 2",
        duration: "1.5–2 hours",
        phone: "855-688-7024",
        url: "https://www.boynemountain.com/skybridge-michigan",
        urlLabel: "SkyBridge page",
        blurb: "The longest timber-towered suspension bridge in the world: 1,200 feet across the valley, 118 feet up, glass panels in the middle. The chairlift to the top is included. Opens at 11, and you arrive at 11:20, so the first lift of the day is yours.",
        tips: [
          "Tickets are in Apple Wallet on Gunnar's phone; scan at the chairlift.",
          "Wind closes the bridge; the site posts it. If it is shut, Petoskey is 23 minutes north and the day loses nothing else.",
          "Park at the main lodge lot and follow the SkyBridge signs to the chairlift.",
        ],
        source: "Boyne Mountain, SkyBridge Michigan (hours checked 2026-09-16)",
        sourceUrl: "https://www.boynemountain.com/skybridge-michigan",
      },
      {
        id: "d3-petoskey-lunch",
        kind: "food",
        name: "Lunch in the Gaslight District",
        where: "1:30 · late lunch · Gaslight District, on the bluff above the bay",
        address: "Gaslight District, Petoskey, MI 49770",
        coords: [45.3733, -84.9553],
        status: "confirmed",
        duration: "1 hour",
        blurb:
          "A compact, walkable Victorian downtown on the bluff above Little Traverse Bay, five minutes from the stone beach. Shops here sell polished and unpolished Petoskey stones, which is a guaranteed fallback if the beach doesn't produce.",
      },
      {
        id: "d3-magnus",
        fromMom: true,
        kind: "anchor",
        name: "Magnus Park — Petoskey stone hunting",
        where: "2:45 · 40 minutes · 901 W Lake St, five minutes from lunch",
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
        id: "d3-lhv",
        kind: "lodging",
        fromMom: true,
        name: "Lighthouse View Motel check-in",
        where: "4:15 · 699 N Huron Ave · two nights",
        address: "699 N Huron Ave, Mackinaw City, MI 49701",
        coords: [45.7842, -84.7259],
        status: "booked",
        phone: "231-436-5304",
        blurb: "Mom's pick, on the water at the north end of town with the bridge in the window. Two nights, so unpack properly; tomorrow is the island and the car stays here.",
        tips: [
          "Shepler's ferry dock is a five-minute drive south; tickets are already bought for tomorrow.",
          "Bridge view from the motel lawn. Sunset is 7:48 tonight, 7:46 tomorrow.",
        ],
        source: "Mom's list; Lighthouse View Motel",
        sourceUrl: "https://www.lighthouseviewmotel.com/",
      },
      {
        id: "d3-mackinaw-evening",
        kind: "food",
        name: "Mackinaw City, Thursday evening",
        where: "Evening · dinner at 5:45, sunset 7:48 at Lakeside Park",
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
        caption: "Petoskey stones — the hexagonal coral pattern appears clearly when wet.",
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
    route: "7:30 boat over, breakfast, the town, a walk up to the Grand, boat back when you feel like it",
    miles: 0,
    driveMinutes: 0,
    sunset: "7:46 PM",
    sleep: bed("mackinaw-city"),
    lede:
      "Walk to the dock at 6:55 for the 7:30 boat. Breakfast on Main Street, then the town: shops, fudge, the harbor. Late morning, walk up Cadotte to look at the Grand from the road, which costs nothing. Bikes if the mood strikes, the fort if it doesn't. Boats back run hourly all afternoon, so nothing is on a clock except the one that gets you there.",
    flags: [
      {
        level: "ok",
        title: "Ferry tickets: bought",
        body: "Round trip, three people, $39 each. The return is open, so any boat back works.",
      },
      {
        level: "warn",
        title: "7:30 is the first boat on a Friday",
        body: "Shepler's 2026 schedule prints a 7:00 and an 8:00 AM out of Mackinaw City in red, meaning September 12 only. On September 18 they do not run. The 7:30 is black, meaning daily.",
        fix: "Miss the 7:30 and the next is 8:30, then 9:00. Dock by 7:10.",
      },
      {
        level: "info",
        title: "Boats back, and the late one",
        body: "The island runs 1:00, 2:00, 3:00, 4:00, 5:00, 6:00 and 7:00 PM daily. There is also an 8:00 PM printed for Fridays and Saturdays only, and your day is a Friday, so sunset at 7:46 from the island is on the table.",
      },
    ],
    legs: [
      {
        label: "Motel → Shepler's dock",
        at: 0,
        minutes: 12,
        note: "Half a mile down Huron Ave. Walk it, or the front desk shuttle. The car stays at the motel all day; there are none on the island.",
      },
      {
        label: "The crossing",
        at: 1,
        minutes: 16,
        note: "Sixteen minutes past the bridge and the lighthouse. Sit up top if it is not raining.",
      },
    ],
    stops: [
      {
        id: "d4-ferry-out",
        kind: "anchor",
        fromMom: true,
        name: "Shepler's 7:30 boat",
        where: "6:55 · leave the motel · boat at 7:30",
        address: "556 E Central Ave, Mackinaw City, MI 49701",
        coords: [45.7778, -84.7231],
        status: "purchased",
        cost: "Round trip · paid · $39 each",
        hours: "7:30 AM daily, then 8:30, 9:00, 9:30",
        phone: "231-436-5023",
        duration: "16 min crossing",
        blurb: "The first daily boat of the day. Shepler's asks for 30 minutes before departure, so 7:00 at the dock is right and 7:10 is the real edge.",
        tips: [
          "Leave the car at the motel. No cars on the island, and the dock is a half-mile walk.",
          "Luggage and coolers can stay in the room; you are back tonight.",
        ],
        source: "Shepler's 2026 ferry schedule, September 8 through October 4 (read 2026-09-17)",
        sourceUrl: "https://www.sheplersferry.com/mackinaw-city-schedule/",
      },
      {
        id: "d4-breakfast",
        kind: "food",
        name: "Breakfast on Main Street",
        where: "7:50 · first thing off the boat",
        address: "7400 Main St, Mackinac Island, MI 49757",
        coords: [45.8497, -84.6155],
        status: "confirmed",
        hours: "Chuckwagon 7 AM · Good Day Cafe and Seabiscuit 8 AM",
        duration: "45 min",
        blurb: "The Chuckwagon is a nine-stool diner directly across from the Shepler's dock and the only place open when you land. French toast, biscuits and gravy, huevos rancheros.",
        tips: [
          "If there is a line, Good Day Cafe (7216 Main) and Seabiscuit (7337 Main) both open at 8.",
          "Doud's Market is the island grocery and the grab-and-go option.",
        ],
        source: "Chuckwagon; Mackinac Island tourism bureau breakfast guide",
        sourceUrl: "https://www.chuckwagononmackinac.com/",
      },
      {
        id: "d4-town",
        kind: "anchor",
        fromMom: true,
        name: "The town: shops, fudge, the harbor",
        where: "9:00 · the main event · all morning",
        address: "Main St, Mackinac Island, MI 49757",
        coords: [45.8494, -84.6172],
        status: "free",
        duration: "Most of the day",
        blurb: "Eight blocks of shops between the dock and the fort hill, with the harbor on one side and the bluff on the other. Most shops open between 9 and 10 in September and a good number close by 5 or 6.",
        tips: [
          "Fudge: Murdick's (the original, 1887), Ryba's and Joann's all cut on marble slabs in the window, and all hand out samples.",
          "Doud's Market is the oldest grocery store in America still running. Worth the walk in.",
          "Market Street, one block up behind Main, is where the crowds are not: the old courthouse, Biddle House, the blacksmith.",
          "Buy the fudge last so it is not riding around in a bag all day.",
        ],
        source: "Mackinac Island tourism bureau, store hours",
        sourceUrl: "https://www.mackinacisland.org/blog/post/what-time-do-shops-close-for-the-day-on-mackinac-island/",
      },
      {
        id: "d4-grand",
        fromMom: true,
        kind: "stop",
        name: "The Grand Hotel, from the road",
        where: "11:30 · the walk up Cadotte · free",
        address: "Cadotte Ave, Mackinac Island, MI 49757",
        coords: [45.8478, -84.6238],
        status: "free",
        cost: "Free from the street",
        duration: "45 min",
        blurb: "Cadotte Avenue is a public road and it runs right under the hotel. The whole white front, the 660-foot porch and the lawn are yours from outside the gate for nothing. Sitting on that porch is what costs $14 a head, and that is the only part you are skipping.",
        tips: [
          "Up Cadotte from Main Street: a third of a mile, uphill, 10 to 15 minutes. The facade opens up about halfway.",
          "Keep walking past the hotel onto West Bluff Road. Victorian cottages, same view over the Straits, nobody charges for it.",
          "The Gate House and the Grand's outlet store sit on Cadotte below the hotel, both outside the paywall.",
          "If anyone changes their mind at the gate it is $14 an adult, $7 ages 6 to 12, desk open 9 to 6.",
        ],
        source: "Grand Hotel admissions page for the fee (checked 2026-09-17)",
        sourceUrl: "https://www.grandhotel.com/purchase-admissions/",
      },
      {
        id: "d4-bikes",
        kind: "optional",
        fromMom: true,
        name: "Bikes, if we want them",
        where: "Maybe · $17 to $18 an hour · three shops on Main",
        address: "7245 Main St, Mackinac Island, MI 49757",
        coords: [45.8496, -84.6168],
        status: "confirmed",
        hours: "Ryba's 9–6 · Mackinac Island Bike Shop 8–7 · Mackinac Cycle 8–7",
        duration: "1.5–2 hours for the loop",
        blurb: "M-185 is the only state highway in the country with no cars: 8.2 flat miles right on the water, all the way around. Nobody reserves; you walk up and take one.",
        tips: [
          "Ryba's, 7245 Main: $17 an hour for a 7-speed, $90 all day. Open 9 to 6 after Labor Day.",
          "Mackinac Island Bike Shop, 7421 Main, right by the Shepler's dock: $18 an hour, $68 for four hours, $98 all day, open 8 to 7 in September.",
          "Mackinac Cycle, 7271 Main: same $18 an hour, helmet, basket, lock and a map included.",
          "Two hours covers the loop with stops at Arch Rock and British Landing. One hour does not.",
        ],
        source: "Ryba's, Mackinac Island Bike Shop and Mackinac Cycle rate pages (checked 2026-09-17)",
        sourceUrl: "https://mackinacislandbikeshop.com/",
      },
      {
        id: "d4-fort",
        kind: "optional",
        fromMom: true,
        name: "Fort Mackinac",
        where: "Optional · $17.50 · up the ramp behind town",
        address: "7127 Huron Rd, Mackinac Island, MI 49757",
        coords: [45.8514, -84.6157],
        status: "confirmed",
        cost: "$17.50 adult · $10.50 ages 5–12",
        hours: "9:30 AM – 5:00 PM, last admission 4:00",
        duration: "1.5–2 hours",
        blurb: "Fourteen original buildings on the bluff, the oldest from 1780, with the whole harbor underneath you. The cannon on the south rampart is the loud one.",
        tips: [
          "Cannon fires at 11:00, 1:00, 3:00 and 4:00. Rifles at 10:00, 12:00, 2:00, 3:30 and 4:30.",
          "The Tea Room inside is run by the Grand Hotel: open 10 to 5, lunch 11 to 3, and the terrace is the best view on the island.",
        ],
        source: "Mackinac State Historic Parks, Fort Mackinac (September 7 – October 4 hours)",
        sourceUrl: "https://www.mackinacparks.com/attraction/fort-mackinac/",
      },
      {
        id: "d4-ferry-back",
        kind: "stop",
        name: "Boat back, whenever",
        where: "Pick one · hourly from 1:00 · last daily boat 7:00",
        address: "Shepler's dock, Main St, Mackinac Island, MI 49757",
        coords: [45.8506, -84.6141],
        status: "confirmed",
        hours: "1:00, 2:00, 3:00, 4:00, 5:00, 6:00, 7:00 PM daily · 8:00 PM Fridays and Saturdays",
        duration: "16 min",
        blurb: "Return is open on the ticket you already have, so the only decision is when you are done. Fifteen minutes early at the dock is plenty in September.",
        tips: [
          "The 8:00 PM runs Fridays and Saturdays only, and this is a Friday. Sunset is 7:46, so that boat means watching it from the island.",
          "Dinner in Mackinaw City wants the 6:00 or the 7:00 instead.",
        ],
        source: "Shepler's 2026 ferry schedule, September 8 through October 4 (read 2026-09-17)",
        sourceUrl: "https://www.sheplersferry.com/mackinaw-city-schedule/",
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
          "One of the premier Bavarian celebrations in the Midwest. Heritage Park gates open at noon on Saturday with live music, dancing, and Bavarian food tents.",
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
    miles: 97,
    driveMinutes: 155,
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
    driveMinutes: 290,
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
        note: "I-94 west to Kerrytown for morning coffee & breakfast",
      },
      {
        label: "Ann Arbor → Palatine",
        at: 1,
        minutes: 240,
        miles: 263,
        note: "I-94 west around the lake. Gain 1 hour crossing from Eastern into Central Time",
      },
      {
        label: "Palatine → O'Hare MMF",
        at: 2,
        minutes: 25,
        miles: 15,
        note: "IL-53 S to I-90 E to return rental car at the Multi-Modal Facility",
      },
    ],
    stops: [
      {
        id: "d7-ann-arbor",
        kind: "stop",
        name: "Ann Arbor — Breakfast & Coffee",
        where: "Kerrytown / Main St",
        address: "Ann Arbor, MI 48104",
        coords: [42.2808, -83.743],
        status: "confirmed",
        duration: "45 minutes",
        blurb:
          "Quick morning stop directly along I-94. Grab breakfast and coffee at Zingerman's Delicatessen or a Kerrytown cafe before heading west.",
        tips: [
          "Zingerman's Delicatessen in Kerrytown opens at 7:00 AM daily.",
          "Easy structure parking available in Kerrytown.",
        ],
      },
      {
        id: "d7-home",
        kind: "anchor",
        name: "Palatine (Drop Bags & Mom)",
        where: "Palatine, Illinois",
        address: "2020 Crestwood Lane, Palatine, IL 60074",
        coords: [42.1103, -88.0342],
        status: "confirmed",
        duration: "30 minutes (arrive ~12:00 PM Central)",
        blurb:
          "Arrive in Palatine around noon Central time (having gained 1 hour crossing into Illinois). Drop off Mom and luggage.",
      },
      {
        id: "d7-flight",
        kind: "admin",
        name: "O'Hare Car Return & Flight AA 1253",
        where: "ORD Terminal 3 · 3:20 PM Departure (Boarding 2:45 PM)",
        address: "Chicago O'Hare International Airport, Terminal 3, Chicago, IL 60666",
        coords: [41.9742, -87.9073],
        status: "booked",
        duration: "Return car by 1:00 PM Central",
        blurb:
          "Return the Budget Sienna at O'Hare MMF by 1:00 PM, take ATS train to Terminal 3, check bags, and clear TSA for the 3:20 PM flight to SFO (AA 1253). Gunnar in 22E (QPJBXO) & Mikaela in 22D (YBEEOU).",
        tips: [
          "1:00 PM Car Return: Budget MMF return at 10255 W. Zemke Blvd. Top off at Shell Touhy Ave prior.",
          "ATS People-Mover: MMF station to Terminal 3 runs every 3–5 min, 10 min transit time directly to T3.",
          "Terminal 3 TSA: Boarding begins 2:45 PM CDT; strict gate door closure at 3:05 PM CDT.",
        ],
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
      "Straight to the dunes: the scenic drive to the Lake Michigan Overlook, the big dune seen from the bottom, Glen Haven on the water, then lunch on the docks at Fishtown.",
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
