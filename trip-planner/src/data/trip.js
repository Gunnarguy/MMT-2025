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
    "Eight days up the Lake Michigan shore to the Straits, across into Ontario, and home through Detroit. Mom planned it. This is the checked version.",
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
    mapped: false,
    miles: 0,
    driveMinutes: 0,
    sleep: null,
    lede:
      "Not the empty errand day Mom's document imagined. Gunnar and Mikaela are on AA 2358 out of San Francisco, wheels down at 8:21pm, and the car is collected at O'Hare at nine — so the trip really starts at ten at night, and Tuesday morning has to be gentler than originally planned.",
    flags: [
      {
        level: "stop",
        title: "Say the words “we are driving this into Ontario”",
        body:
          "Budget has to be told at pickup, five days before you actually cross. They'll hand over the Canadian Non-Resident Insurance Card, which is free. Without that conversation you may have an insurance gap at the Blue Water Bridge on the 19th, and there's no fixing it from the road.",
        fix:
          "This now happens at nine at night, at an airport counter, after six hours in the air — the worst possible moment to remember paperwork, and the only one you get. Say it before they start typing, and confirm the card is physically in your hand before you leave the garage. Print backup copies from the avis.ca link in Mom's document beforehand; it's live and it does cover Budget vehicles.",
      },
      {
        level: "warn",
        title: "A 10pm arrival makes the old dawn start unrealistic",
        body:
          "The plan was a 6:00am Central departure on Tuesday, with 5:30 as the stretch goal. Landing at 8:21pm, clearing bags and the ATS ride out to the rental facility, then driving 35 minutes to Palatine, puts you at Mom's front door around ten. A 5:30am start off the back of that is how the longest driving day of the trip goes wrong.",
        fix:
          "Book the 11:30am Meyer May tour rather than the 11:00, and leave Palatine at 6:45am Central. Seven hours of sleep instead of five, and Grand Rapids still works in full.",
      },
    ],
    stops: [
      {
        id: "d0-flight",
        kind: "admin",
        name: "AA 2358 — San Francisco to Chicago",
        where: "SFO 1:29 PM → ORD 8:21 PM",
        status: "booked",
        blurb:
          "Gunnar in 18D on record QPJBXO, Mikaela in 19D on YBEEOU — same flight, separate bookings, which matters only if there's a schedule change, because it can hit one record and not the other.",
        tips: [
          "American lands domestic at Terminal 3; the rental facility is the far end of the ATS people-mover.",
          "Set both records to alert on schedule changes, since they won't move together.",
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
          "Mazda CX-50 or similar, reserved through Costco Travel with $10 off and member savings already applied — $35 less than the figure Mom's document carried. Reserve Now, Pay Later, no cancellation fees. The counter runs 24 hours, so the 39 minutes between wheels-down and the booking time is not the problem it looks like.",
        tips: [
          "Ask for the Canadian Non-Resident Insurance Card by name, before anything else.",
          "Costco rentals normally include one additional driver free — get Mikaela named while you're standing there.",
          "Photograph every panel and the fuel gauge in the garage. It's well lit at 9pm.",
          "Write the car's plate and mpg onto the Car & flights page; the fuel budget reads it.",
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
      "The longest driving day, and the one where the clock does the most damage — you lose an hour crossing into Eastern time before you've even had lunch. The good news is that Tuesday happens to be the single best day of the week for Grand Rapids.",
    flags: [
      {
        level: "stop",
        title: "The Grand Rapids stop does not fit as written",
        body:
          "Meijer Gardens plus the Meyer May House plus a sit-down lunch plus a neighbourhood drive is a full day, not an afternoon — and after a 10pm Monday arrival you're leaving Palatine at 6:45 and reaching Grand Rapids just after 11:00am Eastern, with Ludington still to come. Something has to go.",
        fix:
          "Two clean versions. THE FULL DAY: Meyer May tour at 11:30 → Heritage Hill walk from the same parking spot → fast lunch at Schnitz Deli (closes 3pm) → Meijer Gardens 2:00–4:45pm → leave 4:45, in Ludington ~6:30pm, ahead of the 7:57 sunset. THE SHORT DAY: skip Meijer Gardens entirely and be in Ludington by 4pm. The outdoor Chihuly runs to Nov 1 and the indoor gallery to Jan 2027, so it survives a future trip — the free Meyer May tour only happens Tuesday, Thursday and Sunday.",
      },
      {
        level: "warn",
        title: "Book the Meyer May House today",
        body:
          "Mom's document calls it “a drive-by.” It's a free 90-minute interior tour of a fully restored 1909 Frank Lloyd Wright Prairie house — and it runs only three days a week, one of which is your Tuesday. Several September 2026 slots already show zero tickets.",
        fix:
          "Reserve at meyermayhouse.steelcase.com for Tuesday 9/15. Tuesday tours run 10:00am to 1:00pm and take 90 minutes, so 11:30 is the latest start that fits — and with the flight landing at 8:21pm on Monday, that extra half hour is the difference between a seven-hour night and a five-hour one. There is no noon slot, whatever an earlier draft of this page said. If Tuesday's gone, call the visitor centre at 616-246-4821 and ask about cancellations; they answer 10am–2pm on Tuesdays and Thursdays.",
      },
      {
        level: "ok",
        title: "Both Ludington lighthouses are closed on a Tuesday",
        body:
          "Mom flagged “closed M-W” herself and then the itinerary still arrives on a Tuesday. Fall 2026 hours for the North Breakwater Light (Sept 10–27) and Big Sable Point (Sept 10–Oct 25) are Thursday–Sunday only. Neither tower can be climbed.",
        fix:
          "Accept it — you can't open a lighthouse on a Tuesday. Walk the north breakwall anyway: it's free, public, open with the tower closed, and it is the view. Drop Big Sable from this trip entirely; it's closed, it's 3.6 miles round trip rather than the 1.5 in the document, and it needs a state park pass.",
      },
      {
        level: "ok",
        title: "White Pine Village stops selling tickets at 3:30pm",
        body:
          "Mom guessed it might be seasonally closed. It isn't — it's open Tuesdays through October 17. The problem is the clock: last admission 3:30pm, closes at 5, and they recommend two hours. It's also three miles south of the inn, so it's a drive.",
        fix:
          "This is a yes/no you have to make in Grand Rapids that morning, not “see if we have time.” If you want it, drive straight there by 2:30pm and check in at the inn afterwards — check-in runs to 9pm.",
      },
      {
        level: "ok",
        title: "You've landed in ArtPrize Preview Week, by accident",
        body:
          "ArtPrize 2026 runs September 18 to October 3, and Preview Week is September 12–17 — so your Tuesday sits inside it. Somewhere between 70 and 80 per cent of the thousand-plus entries are already installed across downtown venues, and the crowds that arrive with the voting don't turn up until the Friday. Nobody planned this and nothing in Mom's document mentions it.",
        fix:
          "It's free and it's outdoors and indoors both, concentrated in the same downtown blocks you're already parking in for Meyer May and Heritage Hill. It costs nothing to walk through on the way between them. It also quietly strengthens the case for THE SHORT DAY: skip Meijer Gardens, spend the afternoon on foot downtown, and be in Ludington by four.",
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
      "The shortest driving day and the best-value one — barely two and a half hours in the car, with the most spectacular stretch of Lake Michigan shoreline in the middle of it. The catch is that Mom budgeted two hours for a park that needs closer to four.",
    flags: [
      {
        level: "ok",
        title: "Two hours at Sleeping Bear isn't survivable",
        body:
          "The Pierce Stocking Scenic Drive alone takes about two hours with all twelve stops; the park's own FAQ puts it at a 1.5–2 hour minimum. Add the Dune Climb, Glen Haven and Loon Lake and the real number is over four. Mom's document contradicts itself here — the header says 2 hours, the subhead says “for less than 3 hour visit.”",
        fix:
          "Budget 3.5 hours on the ground. It absorbs easily: Traverse City is only 36 minutes away, so arriving 9:30am and leaving 1:30pm still gets you checked in mid-afternoon. Cut Loon Lake, skip Pierce Stocking stops 4–8 and 12.",
      },
      {
        level: "warn",
        title: "Agree the Dune Climb turnaround before anyone starts walking",
        body:
          "The full Dunes Trail to Lake Michigan is 3.5 miles round trip, rated strenuous, 3–4 hours, over nine unshaded sand hills. The Park Service says outright that it “has worn out the most experienced hikers” and runs searches every summer for people who underestimated it. From the top of the first hill you see Little Glen Lake, not Lake Michigan — which is exactly what pulls people into one more dune.",
        fix:
          "First hill only, then turn around. It's 15–25 minutes up and gravity handles the descent. Mom can stay at the picnic tables at the base with a full view of the climb. Two litres of water each even for the short version, and closed shoes — buried dune-grass shoots will stab bare feet.",
      },
      {
        level: "ok",
        title: "Glen Haven's museums closed for the season on Labor Day",
        body:
          "The Sleeping Bear Point Coast Guard Station Maritime Museum and all the Glen Haven interiors — general store, cannery, blacksmith — run Memorial Day to Labor Day only. You're nine days past. The 3pm breeches-buoy rescue re-enactment, which is the best thing there, is summer-only too.",
        fix:
          "Don't budget museum time. Make it a 20–30 minute exterior walk instead: the building facades, the outdoor wayside exhibits, and the boardwalk down to Glen Haven Beach — which is the flattest, easiest Lake Michigan toe-dip in the park and is steps from the car. Give the recovered hour to the Empire Bluff Trail.",
      },
      {
        level: "warn",
        title: "Gunnar is the only driver and the whole evening is alcohol",
        body:
          "Wineries and distilleries, one designated driver, who has also driven all day, on unlit peninsula roads with heavy September deer traffic. Center Rd and Peninsula Dr have no streetlights.",
        fix:
          "Decide before you're standing at a tasting bar. Best option: stay in town — Left Foot Charley in the Village and Mammoth Distilling downtown are both a short cab from Brio, so nobody drives. Or book Designated Driver TC, who drive your car rather than shuttling you, which matters with a rental. Or Gunnar taste-and-dumps the flight and has one full glass with dinner; every tasting room has dump buckets and nobody blinks.",
      },
    ],
    legs: [
      {
        label: "Ludington → Sleeping Bear Dunes",
        at: 1,
        minutes: 110,
        miles: 80,
        note: "US-31 north then M-22. Loon Lake sits on M-22 south of Empire — you drive right past it on the way in",
      },
      {
        label: "Sleeping Bear → Traverse City",
        at: 5,
        minutes: 45,
        miles: 27,
        note: "M-72 east",
      },
    ],
    stops: [
      {
        id: "d2-pass",
        kind: "admin",
        name: "Park entrance pass",
        where: "Buy online before you arrive",
        status: "confirmed",
        cost: "$25 / vehicle, 7 days",
        url: "https://www.recreation.gov/sitepass/74294",
        blurb:
          "Mom's $25 figure and her recreation.gov link are both correct. Since this is the only National Park Service site on the trip, the $80 America the Beautiful annual pass isn't worth it.",
        source: "NPS — Sleeping Bear Dunes fees & passes",
        sourceUrl: "https://www.nps.gov/slbe/planyourvisit/fees.htm",
      },
      {
        id: "d2-pierce-stocking",
        kind: "anchor",
        name: "Pierce Stocking Scenic Drive",
        where: "Off M-109 near Empire",
        address: "Pierce Stocking Scenic Drive, Empire, MI 49630",
        coords: [44.8836, -86.0513],
        status: "confirmed",
        cost: "Included with the pass",
        duration: "75 minutes if you're selective",
        blurb:
          "Seven miles of one-way road through beech-maple forest that opens, at stop 9, onto the Lake Michigan Overlook — a 450-foot dune face dropping straight into the water. It is the picture everyone has seen of this park.",
        tips: [
          "Stop 9 (Lake Michigan Overlook) is the one. Stop 10 is the covered overlook. Stop 11 is North Bar Lake.",
          "Skip stops 4–8 and 12 to fit the day.",
          "Don't run down the dune face at stop 9 — the climb back up is brutal and there's a rescue fee.",
        ],
        source: "NPS — Pierce Stocking Scenic Drive",
        sourceUrl: "https://www.nps.gov/slbe/planyourvisit/pssd.htm",
      },
      {
        id: "d2-dune-climb",
        kind: "anchor",
        name: "The Dune Climb",
        where: "M-109 between Empire and Glen Arbor",
        address: "Dune Climb, M-109, Glen Arbor, MI 49636",
        coords: [44.8858, -86.0271],
        status: "confirmed",
        duration: "35 minutes, first hill only",
        blurb:
          "A 130-foot wall of sand you walk straight up. Everyone does it, most people love it, and a meaningful number of them keep going and regret it deeply.",
        tips: [
          "Picnic tables at the base have a clear view of the whole climb — a good place to opt out.",
          "Two litres of water per person. Closed shoes.",
        ],
      },
      {
        id: "d2-glen-haven",
        kind: "sight",
        name: "Glen Haven village + beach",
        where: "Glen Haven, north end of the park",
        address: "Glen Haven, MI 49636",
        coords: [44.9048, -86.0207],
        status: "seasonal",
        duration: "25 minutes",
        blurb:
          "A restored 1920s company town on the water. The buildings are locked after Labor Day, but the exteriors and the outdoor exhibits are open year-round and the boardwalk to the beach is the easiest Lake Michigan access in the park.",
        source: "NPS — Glen Haven Historic Village",
        sourceUrl: "https://www.nps.gov/slbe/planyourvisit/glenhaven.htm",
      },
      {
        id: "d2-north-bar",
        kind: "sight",
        name: "North Bar Lake — instead of Loon Lake",
        where: "Stop 11 on the Pierce Stocking drive",
        address: "North Bar Lake, Empire, MI 49630",
        coords: [44.8264, -86.0596],
        status: "confirmed",
        blurb:
          "Mom's fourth bullet is “dip your toes in the tranquil Loon Lake.” Loon Lake is a boat ramp with no beach, 20 minutes back the way you came — the Park Service's own description says “there is no beach but you can wade out near the boat ramp.” North Bar is shallow, clear, sandy-bottomed, warmer than Lake Michigan, and it's already on the scenic drive.",
      },
      {
        id: "d2-lighthouse",
        kind: "optional",
        name: "Mission Point Lighthouse",
        where: "Tip of Old Mission Peninsula · 18 mi / 35 min north of town",
        address: "20500 Center Rd, Traverse City, MI 49686",
        coords: [44.9926, -85.4795],
        status: "check",
        cost: "$8 each to climb",
        hours: "10 AM–5 PM Wed–Mon · park open 9 AM–10 PM year-round",
        blurb:
          "On the 45th parallel, exactly halfway between the equator and the North Pole, at the end of a dead-end road. Third-party sites still quote the old $5 fee; it's $8 now — budget $24 for the three of you.",
        tips: [
          "Make it the turnaround point of the winery run, not a separate trip — drive to the tip first, then work back south.",
          "Don't save it for Thursday morning: a 10am opening plus a 70-minute round trip costs you a morning you need for Mackinaw City.",
          "If you're too late for the tower, the park itself is open until 10pm and free.",
        ],
        source: "Mission Point Lighthouse",
        sourceUrl: "https://missionpointlighthouse.com/",
      },
      {
        id: "d2-evening",
        kind: "food",
        name: "Traverse City evening",
        where: "Downtown and the Village at Grand Traverse Commons",
        address: "Traverse City, MI 49684",
        coords: [44.7631, -85.6206],
        status: "check",
        blurb:
          "Mom's list — wineries, distilleries, city trail, tour town, lighthouse, eat well — is a two-day itinerary compressed into one evening. Every Old Mission tasting room closes at 5 or 6 on a Wednesday, so the peninsula version is genuinely tight. The town version delivers all of her bullets with none of the driving.",
        tips: [
          "In town: Left Foot Charley in the Village (open to 7 — an hour later than anything on the peninsula) does wine and cider in one stop.",
          "Dinner: Trattoria Stella is 200 feet away, books on Resy. The Cooks' House is the splurge — 26 seats, phone only, 231-946-8700.",
          "Nightcap: Mammoth Distilling downtown, open to 10.",
          "Walk-in backups: The Little Fleet (3–11, food trucks, no reservations). Amical closes at 8 on Wednesdays, so it's not a late option.",
          "On the peninsula instead: 2 Lads then Chateau Chantal, both 11–6, in that order coming back south.",
        ],
      },
    ],
    momSaid: `Wednesday 9/16
Stop 1—Sleeping Bear Dunes (2 hrs) NEED PASS per car $25 https://www.recreation.gov/sitepass/74294
For less than 3 hour visit:
-Take a drive on the 7-mile Pierce Stocking Scenic Drive
-Trek up the Dune Climb - or sit back and watch the rest of your party climb
-Explore Glen Haven and the Maritime Museum
-Dip your toes in the tranquil Loon Lake
Stop 2—Traverse City (38 mins)
SLEEP HERE:  Brio Beach Inn, 1465 US 31 N, Traverse City, MI 49686  Ph 231/946.6930,  $245 approx
-Wineries, distilleries, city trail, tour town, lighthouse, eat well`,
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
    legFrom: "Traverse City, MI",
    lede:
      "The messiest day in Mom's document, and the one that gets much better once you untangle it. She merged two separate places into one stop and listed five beaches, three of which are behind you. Straightened out, this is a genuinely lovely drive up the shore.",
    flags: [
      {
        level: "warn",
        title: "Torch Lake and Charlevoix are not the same stop",
        body:
          "Mom's earlier draft had them separate — Torch Lake with Alden and the clear-bottom kayaks, then Charlevoix with the lock, Castle Farms and the lighthouse. The current version merges them under “Charlevoix,” but they're 30–40 minutes apart in different directions. Doing both costs you Mackinaw City.",
        fix:
          "Cut Torch Lake and Alden from Thursday. Drive Traverse City to Charlevoix straight up US-31. The corridor is already full without them: Charlevoix town, the Mushroom Houses and the pier light, then Petoskey for lunch and stones. If Mom really wants Torch Lake, the honest slot is a short detour on Wednesday between Sleeping Bear and Traverse City.",
      },
      {
        level: "ok",
        title: "Three of the five stone beaches are the wrong direction",
        body:
          "Bryant Park (Traverse City), Van's Beach (Leland) and Peterson Park (Northport) are all on the Leelanau Peninsula — west and south of where you start, which is backwards on a day heading north. Only Magnus Park and Cross Village are on the route.",
        fix:
          "Magnus Park, 901 W Lake St, Petoskey. Free, city-run so no state park pass needed, a thousand feet of rocky Little Traverse Bay shoreline, and a five-minute drive from where you'll eat lunch. One stop, zero detour.",
      },
      {
        level: "warn",
        title: "The Tunnel of Trees is closed",
        body:
          "M-119 between Harbor Springs and Cross Village — one of the best fall drives in the country, and the road that would have connected Mom's Cross Village Beach to Mackinaw City — is closed in two segments with no announced reopening date. The map on this page routes you up US-31 and I-75 instead, because that's the road that exists.",
        fix:
          "Re-check MDOT MiDrive and petoskeyarea.com/tunnel-of-trees-closure-information around the start of September. If it has reopened end to end it's worth the extra hour and is the single best addition available to this trip. If not, US-31 to I-75 and drop Cross Village.",
      },
      {
        level: "warn",
        title: "Clear-bottom kayaks probably aren't running",
        body:
          "Northern Michigan paddle outfitters mostly close in early September, and no operator has confirmed a 9/17 season. It's also a cold-water activity on a day you need for driving.",
        fix:
          "Drop them from Thursday. If Mom is set on it, call Clear Water Kayaks at 231-632-6583 and move it to Wednesday afternoon out of Traverse City, where the day has slack.",
      },
      {
        level: "ok",
        title: "Thursday evening in Mackinaw City can't include the fort",
        body:
          "Colonial Michilimackinac and the Old Mackinac Point Lighthouse both stop admitting in the late afternoon. Arriving around 4:15pm means you're not getting into either properly.",
        fix:
          "Do Colonial Michilimackinac on Saturday morning at the 9:30 opening instead, then start the Frankenmuth drive around 11:15 — it still works. That also uses the combo ticket you'll have bought for Fort Mackinac on Friday. Thursday evening is dinner at 5:45 and then the 7:48 sunset from Lakeside Park, two minutes from the motel door.",
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
Peterson Park--10001 E Peterson Park Rd, Northport, MI 49670
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
    lede:
      "The centrepiece, and the only day with tickets already bought. An island with no cars, one 8.2-mile road around the edge of it, a fort on the bluff, and more fudge shops per capita than anywhere on earth.",
    flags: [
      {
        level: "ok",
        title: "The ferry phone number in Mom's document is the competitor",
        body:
          "800-638-9892 belongs to Arnold Transit / Mackinac Island Ferry Company — Shepler's direct rival. Calling it to ask about your Shepler's booking or the Shepler's shuttle will get you nowhere.",
        fix:
          "Shepler's Mackinaw City is 231-436-5023. Easier still: ask the motel front desk to call the shuttle the night before and book a pickup around 6:20am — they do it routinely. Dock parking is $15, not $10, and can't be prepaid — but there's a free day lot at 311 S. Nicolet St with a tram, which is $15 back in your pocket.",
      },
      {
        level: "ok",
        title: "Fort Mackinac's last admission is 4:00 PM, not evening",
        body:
          "Three hours earlier than the summer schedule most people remember. Putting the fort late in the day, as the shape of Mom's plan implies, means missing it.",
        fix:
          "Do the fort late morning. In by 10:45, the 11:00 cannon, Tea Room lunch at 11:20 with the view over the harbour, the 1:00 cannon, out around 1:45. The Grand Hotel closes admissions at 6:00, which is a much softer deadline, so it belongs in the afternoon.",
      },
      {
        level: "warn",
        title: "Decide the bike-versus-carriage question on the mainland",
        body:
          "The loop is 8.2 flat miles, which is a pleasant hour and a half on a bike for most people and a lot for some. The carriage-tour fallback has a hard 3:00 PM last-departure on 9/18, so it isn't something you can fall back on at 4pm.",
        fix:
          "Cleanest version: Mom takes the Sightseeing Tour ($46) boarding around 9:00 while Gunnar and Mikaela ride the loop, and all three meet at Fort Mackinac by 11:00 for the cannon. If she wants the fort and butterfly conservatory bundled in, the Mackinac Package is $76 and is available that day.",
      },
      {
        level: "info",
        title: "Wind, not rain, is what cancels this day",
        body:
          "The tickets are non-refundable with no usable rain-check on this schedule. Rain is fine — the fort's fourteen buildings, two films, the Tea Room, four downtown museums on the same ticket and the Grand Hotel make a complete indoor day. Wind on the Straits is the real variable.",
        fix:
          "Check the marine forecast Thursday night and again at 6am Friday. Call Shepler's at 231-436-5023 for day-of status. If it's blowing, take a direct crossing rather than the under-the-bridge scenic run.",
      },
    ],
    legs: [
      {
        label: "Motel → Shepler's dock",
        at: 0,
        minutes: 10,
        note: "0.4 miles — inside the free shuttle's 1.5-mile radius. Be at the dock 6:40–6:45 for the 7:30 boat",
      },
      {
        label: "Ferry crossing",
        at: 1,
        minutes: 18,
        note: "Mackinaw City to Main Street. Sit on the upper deck if it's calm",
      },
    ],
    stops: [
      {
        id: "d4-ferry",
        kind: "admin",
        name: "Shepler's Ferry",
        where: "556 E Central Ave, Mackinaw City",
        address: "556 E Central Ave, Mackinaw City, MI 49701",
        coords: [45.7826, -84.7213],
        status: "purchased",
        cost: "≈$108–123 for three, depending on where you park",
        phone: "231-436-5023",
        url: "https://www.sheplersferry.com/mackinaw-city-schedule/",
        blurb:
          "Tickets already bought. September 8 to October 4 the boats leave Mackinaw City at 7:00, 7:30, 8:00, 8:30, 9:00 and 9:30, then half-hourly — so Mom's 7:30 exists. Last return from the island is 7:00pm.",
        tips: [
          "Shepler's recommends 45 minutes before departure, not the 30 in the document.",
          "Free day lot at 311 S. Nicolet St (across from I-75 Exit 338) with a tram to the dock — or $15 at the dock itself.",
          "If you use the dock lot you pay on exit, by QR code on the gate ticket or at the office. Keep the ticket.",
          "Arnold Transit is the alternative, docking at 801 S Huron Ave, about 1.1 miles from the motel.",
        ],
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
        blurb:
          "Mom's note says 7 AM, but you won't be on the island until about 7:50 — so this is a landing coffee, not a pre-ferry one, and it fills the gap neatly before the bike shop opens at 8.",
        tips: [
          "Backups: coffee at the Mackinaw City dock before the 7:30 boat, or Sadie's on Main from 9:00.",
        ],
      },
      {
        id: "d4-bikes",
        kind: "anchor",
        name: "Mackinac Island Bike Shop",
        where: "7421 Main St · opens 8 AM",
        address: "7421 Main St, Mackinac Island, MI 49757",
        coords: [45.8497, -84.6165],
        status: "confirmed",
        cost: "Hourly — don't buy the day rate",
        phone: "906-847-6337",
        blurb:
          "Rent hourly and return the bikes before walking up to the fort. The perimeter loop takes about two hours at a casual pace with stops; the half-day and full-day rates cost roughly 50% more and buy you nothing.",
        tips: [
          "Tell them you're doing the perimeter loop and coming back — they'll quote the hourly rate on return.",
          "Ryba's, Orr Kids' and Mackinac Wheels are the other main shops if there's a queue.",
        ],
      },
      {
        id: "d4-loop",
        kind: "anchor",
        name: "M-185 — the perimeter loop",
        where: "8.2 miles, flat, no cars",
        address: "M-185, Mackinac Island, MI 49757",
        coords: [45.8607, -84.6285],
        status: "free",
        cost: "Free (the road, not the bike)",
        duration: "2 hours with stops",
        blurb:
          "The only state highway in America with no motor vehicles on it. Flat the whole way, hugging the water, with mile markers counting you round. Arch Rock at mile 7-ish and British Landing at the halfway point, where there's a snack bar and restrooms.",
        tips: [
          "Go counter-clockwise (turn left out of town) to hit British Landing at the halfway mark.",
          "Arch Rock is worth the stop; the stairs up to it from the shore road are steep.",
          "The interior climb to Fort Holmes is a real climb — skip it unless you want it.",
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
        hours: "Last admission 4:00 PM · closes 5:00 PM",
        duration: "2.5 hours with lunch",
        blurb:
          "A 1780s British fort with fourteen restored buildings, cannon and rifle firings through the day, and the Tea Room — which serves lunch on a terrace looking straight down over the harbour and the Straits. The ticket also covers four downtown museums.",
        tips: [
          "In by 10:45 for the 11:00 cannon. Tea Room at 11:20. The 1:00 cannon on the way out.",
          "The same ticket gets you the downtown museums — use them if the weather turns.",
        ],
      },
      {
        id: "d4-grand",
        kind: "stop",
        name: "The Grand Hotel porch",
        where: "Mid-afternoon, 3:00–4:45 PM",
        address: "286 Grand Ave, Mackinac Island, MI 49757",
        coords: [45.8478, -84.6238],
        status: "check",
        hours: "Admissions close 6:00 PM",
        blurb:
          "The longest front porch in the world, and non-guests pay to walk it. Afternoon Tea runs in the Parlor 3:30–5:00, which is the reason to time it this way.",
        tips: [
          "Dress code: the evening rules apply to the porch itself after 6:30. Even in daylight, no sleeveless shirts, cut-offs or sweatpants.",
          "It's a 15–20 minute uphill walk from town, or $9 a head for the horse-drawn taxi — bring cash.",
        ],
      },
      {
        id: "d4-fudge",
        kind: "food",
        name: "Fudge, obviously",
        where: "Main Street",
        address: "Main St, Mackinac Island, MI 49757",
        coords: [45.8494, -84.6172],
        status: "confirmed",
        blurb:
          "Murdick's is the original, from 1887. May's, Ryba's and Joann's are the other real ones. They all make it on marble slabs in the window, they are all good, and the difference between them is smaller than the arguments about it.",
      },
    ],
    momSaid: `Friday 9/18
All Day--Mackinac Island—7:00 AM Park at the Ferry dock -OR call shuttle and it will pick us up if we are staying within a 1.5 mile radius of the ferry dock. If driving to ferry, arrive ½ hr prior to departure (7:30 AM).
    Shepler's Ferry info 800.638.9892, $10 parking, $39 ea. Tickets purchased
    Lucky Bean Coffee House 7383 Market St, Mackinac Island, MI 49757  7AM
    Mackinac Island Bike Shop 7421 Main St,  $18/hr  (906) 847-6337 8 AM to 7 PM`,
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
    legFrom: "Mackinaw City, MI",
    lede:
      "The longest day, and it just got more interesting: Frankenmuth's Oktoberfest runs September 17–20, and Saturday the 19th is its single busiest day. Mom's document doesn't mention it at all.",
    flags: [
      {
        level: "stop",
        title: "Frankenmuth Oktoberfest 2026 is happening on your Saturday",
        body:
          "It runs September 17–20, and the 19th — noon to midnight — is the peak. That's either the best thing that happens on this trip or a parking nightmare you drove into unaware. The one thing you can't do is arrive mid-afternoon without a plan.",
        fix:
          "Commit either way, now. IN: reserve an 11:15–11:45am chicken dinner, walk the covered bridge to Heritage Park when the gates open at noon, give the festival 2–2.5 hours, leave by 3:30pm. OUT: arrive 10:30am, do Bronner's and Main Street before the noon gates, early lunch, gone by 1:30pm.",
      },
      {
        level: "ok",
        title: "Cut the Midland / Saginaw / Flint / Howell stop",
        body:
          "This is what actually breaks the day, not the base route. And Howell isn't on the way in any sense — it's down near Brighton, a long way south of the line to Sarnia.",
        fix:
          "Delete Stop 2 and give the time to Frankenmuth, which is the real destination. If someone insists on one extra, make it Flint: the Flint Institute of Arts is on the I-69 corridor you're driving anyway and is free on Saturdays, 10–5. And tell Mom that Monday already routes through Ann Arbor and Kalamazoo, which scratch the charming-downtown itch better and for free.",
      },
      {
        level: "warn",
        title: "Book the chicken dinner",
        body:
          "Mom's document has Frankenmuth food as an open question — “good food?” On an Oktoberfest Saturday, a walk-in three-top at either of the two famous family-style places is optimistic.",
        fix:
          "Bavarian Inn at $31.99 a head. It's two dollars more than Zehnder's but visibly more Bavarian inside, which is what Mom is after, and it sits at the Main Street end of the covered bridge so the walk to the festival grounds is a natural continuation. Their “Chicken Plus One Meat” at $34.99 lets one person try the Sauerbraten without ordering a second entrée.",
      },
      {
        level: "warn",
        title: "Saturday-evening border arrival needs a real buffer",
        body:
          "The Blue Water Bridge has been fully cashless since April 2025 — no attendant takes cash — and Saturday evening waits are unpredictable.",
        fix:
          "Credit card in the driver's door pocket on approach, and make sure the bank won't decline it. Check live waits from the car about 45 minutes out. Build 45 minutes of buffer, not the 15 the itinerary implies, and don't book a Sarnia dinner before 7:30pm.",
      },
      {
        level: "info",
        title: "Frankenmuth is free, geographically",
        body:
          "Mom's document frames the whole stop as if it might be a detour worth questioning. It isn't — the scarce resource on Saturday is hours in Frankenmuth, not miles. Budget four hours there, roughly 11:00 to 3:30, and protect the window by cutting Stop 2.",
      },
      {
        level: "warn",
        title: "I-75 at Gaylord is a building site from the week you arrive",
        body:
          "MDOT starts replacing both I-75 bridges over M-32 in Gaylord immediately after Labor Day 2026 — a $54 million, three-year job. Gaylord sits directly on today's run south from Mackinaw City. Through traffic is being kept moving on temporary pavement widening and crossovers, but crossovers mean narrow lanes and a speed drop, and ramp closures are staged through the build.",
        fix:
          "Add 20 minutes to the Mackinaw–Frankenmuth leg rather than hoping. It's already the longest driving day of the trip with a festival window and a border crossing stacked behind it, so this is the leg with the least room to absorb a surprise. Check MDOT's MiDrive map the night before — if the crossover is bad, the I-75 Business Loop through Gaylord is the signed alternative.",
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
      "The only day in the document that is arithmetically impossible. Belle Isle Aquarium and the Henry Ford Museum cannot both happen — and with an 11am museum start in Sarnia, neither one happens in usable form. The fix is a single decision made before you leave Ontario.",
    flags: [
      {
        level: "stop",
        title: "Windsor or the Henry Ford Museum. Not both.",
        body:
          "That is the single most important sentence on this page. The Henry Ford is in Dearborn, not Detroit, and needs four hours minimum. Belle Isle Aquarium closes at 4. Stones 'N Bones can't be entered before 11am. Stack all of that behind a Sarnia departure and the day collapses.",
        fix:
          "PLAN A — CANADA DAY: drop Stones 'N Bones, leave Sarnia 7:30am, Windsor riverfront 9:15–10:15, tunnel by 10:45, Belle Isle 11:00–1:00, late lunch downtown, The Belt at 2:30, one afternoon anchor, Belleville by 6. Henry Ford is cut. PLAN B — HENRY FORD DAY: cut Windsor, cross at the Blue Water Bridge around 8:00am, I-94 down the US side in 1h21m, Dearborn by 10:30, five real hours at the museum, The Belt and dinner after, Belleville by 7. Belle Isle is cut.",
      },
      {
        level: "ok",
        title: "Stones 'N Bones is what breaks the day",
        body:
          "It's a $7 CAD local rock-and-fossil museum that can't be entered before 11:00am, and its website looks like it hasn't been updated in years. Skipping it buys back about three and a half hours — enough to turn Sunday from impossible into comfortable.",
        fix:
          "If Mom wants it, that's a real reason to keep it — but she should make the trade knowingly, because it costs Windsor or Detroit. Call (519) 336-2100 a few days out either way.",
      },
      {
        level: "ok",
        title: "Belle Isle needs a Recreation Passport the rental won't have",
        body:
          "Belle Isle is a Michigan state park. Vehicle entry requires the Recreation Passport, and on Illinois plates that's the non-resident day rate — about $12. Mom's document never mentions it.",
        fix:
          "Budget $12 and have a card ready at the entrance booth. The aquarium itself is free, and the Conservatory next door and the Scott Fountain are worth the same trip.",
      },
      {
        level: "ok",
        title: "“Follow M1 to take the Tunnel” is wrong",
        body:
          "M-1 is Woodward Avenue, in Detroit — it's not how you get to the tunnel from the Ontario side, and following it could put you at the wrong crossing entirely.",
        fix:
          "For the TUNNEL: stay on Highway 401 into Windsor, then E.C. Row or down to Riverside Drive, and follow downtown tunnel signage toward Goyeau/Park St E. It surfaces at Jefferson and Randolph, one block from Hart Plaza and four from The Belt. For the BRIDGE: Highway 3 / Huron Church Road. Set the GPS to the crossing itself, not to “Detroit.”",
      },
      {
        level: "info",
        title: "The tunnel takes no cash, in either currency",
        body:
          "Card only. Make sure at least two of you have a chip credit card that works internationally and hasn't been flagged after two days of Canadian charges. If you specifically want to dump leftover Canadian cash, the Ambassador Bridge takes CAD at $14 — but it's dearer and drops you on I-75 instead of downtown.",
      },
      {
        level: "ok",
        title: "Downtown Detroit is empty that afternoon — checked",
        body:
          "Worth knowing before you commit to Plan A, because a home game would have made the tunnel exit, Hart Plaza and every downtown parking structure a different proposition entirely. The Lions are away at Buffalo on the 17th and don't play at Ford Field again until the 27th. The Tigers are in Chicago that afternoon, playing the White Sox at 2:10. Comerica Park and Ford Field are both dark.",
        fix:
          "Nothing to do. Park downtown without the usual Sunday anxiety, and The Belt will be quiet — bear in mind that cuts both ways, since Standby doesn't open until 5:00pm on a Sunday.",
      },
    ],
    legs: [
      {
        label: "Point Edward → Windsor",
        at: 0,
        minutes: 85,
        miles: 67,
        note: "Highway 402 to the 401. Or skip Windsor and cross at Sarnia for the faster US-side I-94 run",
      },
      {
        label: "Windsor → downtown Detroit",
        at: 1,
        minutes: 30,
        miles: 2,
        note: "Detroit–Windsor Tunnel. Most of that time is the border, not the distance",
      },
      {
        label: "Detroit → Dearborn → Belleville",
        at: 4,
        minutes: 50,
        miles: 33,
        note: "I-94 west. Belleville sits on the airport corridor, already pointed home",
      },
    ],
    stops: [
      {
        id: "d6-windsor",
        kind: "stop",
        name: "Windsor riverfront",
        where: "Odette Sculpture Park, Riverside Drive",
        address: "Riverside Dr W, Windsor, ON, Canada",
        coords: [42.3186, -83.0397],
        status: "free",
        cost: "Free",
        duration: "1 hour",
        blurb:
          "The best view of the Detroit skyline anywhere is from the Canadian side, looking north across the river — Detroit is the only major US city you look at from due south out of Canada. A sculpture park runs along the water. Worth a real hour if you take Plan A; a pointless 45-minute penalty if you don't.",
      },
      {
        id: "d6-belle-isle",
        kind: "anchor",
        name: "Belle Isle Aquarium + Conservatory",
        where: "Belle Isle Park, Detroit",
        address: "900 Inselruhe Ave, Detroit, MI 48207",
        coords: [42.3387, -82.9686],
        status: "check",
        cost: "Free entry · $12 vehicle passport",
        hours: "Thu–Sun 10 AM–4 PM · conservatory next door until 5",
        blurb:
          "The oldest aquarium in America, from 1904, a single green-tiled vaulted gallery that looks like a cathedral for fish. The Anna Scripps Whitcomb Conservatory next door is the same trip and the same era. Note the Friday-to-Sunday-only schedule — your Sunday works, which is lucky.",
        tips: [
          "The James Scott Memorial Fountain is a five-minute drive across the island and worth it.",
          "The vehicle passport is not required if you arrive on foot or by bike — impractical with three people and a car.",
        ],
      },
      {
        id: "d6-henry-ford",
        kind: "optional",
        name: "Henry Ford Museum of American Innovation",
        where: "Dearborn — 20 min from downtown, not in Detroit",
        address: "20900 Oakwood Blvd, Dearborn, MI 48124",
        coords: [42.3033, -83.2341],
        status: "check",
        duration: "4–5 hours, minimum",
        url: "https://www.thehenryford.org/",
        blurb:
          "Enormous, and the reason this day doesn't fit. The Rosa Parks bus, the Kennedy limousine, the Wright brothers' cycle shop, a Dymaxion house. Treating it as a stop between an aquarium and a bar doesn't work.",
        tips: [
          "If you want it, it's the day's single anchor — Plan B.",
          "Genuinely better idea: do it Monday morning instead. Ann Arbor and Kalamazoo are both on I-94 west of Dearborn, so it fits the drive home far better than it fits Sunday.",
          "Buy online; parking is charged per order and costs more on site.",
        ],
      },
      {
        id: "d6-belt",
        kind: "stop",
        name: "The Belt",
        where: "Alley between Broadway and Library St",
        address: "The Belt, Detroit, MI 48226",
        coords: [42.3339, -83.0466],
        status: "free",
        cost: "Free",
        duration: "20 minutes",
        blurb:
          "A former garment-district alley turned into a permanent outdoor gallery, with Library Street Collective at one end. It's a twenty-minute stop, not an afternoon — worth knowing before building a day around it.",
        tips: [
          "Standby, the bar in the alley, doesn't open until 5:00 PM on Sundays.",
          "If meeting Emma matters, pin the time first and build the day around it. Dime Store at 719 Griswold is three blocks away and serves until 3.",
        ],
      },
      {
        id: "d6-julias",
        kind: "lodging",
        name: "Julia's, or the Hampton Inn",
        where: "Belleville, MI",
        address: "46280 N I-94 Service Dr, Belleville, MI 48111",
        coords: [42.2338, -83.4844],
        status: "check",
        cost: "$267 if the hotel",
        phone: "734-699-2424",
        blurb:
          "Settle this in advance rather than en route. If Julia's is on, that's $267 saved and one less thing to arrange at the end of a long day. If not, re-shop the hotel — Belleville is an airport-corridor market with plenty of supply and Sunday is usually its cheapest night.",
      },
    ],
    images: [
      {
        src: "img/doc-sarnia-detroit-routes.png",
        alt: "Google Maps comparison of the two Sarnia-to-Detroit routes",
        caption:
          "Mom's map: 1h21m down the US side on I-94, or 1h52m through Ontario via Windsor. The Windsor route is the one that costs you the Henry Ford.",
      },
    ],
    momSaid: `Sunday 9/20
Stop 1— Stones and Bones Museum 223 Christina St N,         11AM-5PM (last entry 4PM)
Stop 2--Windsor CANADA (2 hrs to border) Follow M1 to take the Tunnel
Stop 3—Detroit
Bell Isle Aquarium
Henry Ford Museum
The Belt (meet Emma there?)
Stop 4—Belleville, MI
SLEEP JULIA'S
OR
SLEEP at Hampton Inn Detroit/Belleville, 46280 N I-94 Service Dr, Bellville, MI 48111 Ph 734/699.2424, $267`,
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
      "This day changed completely when the flights were booked. It is no longer a leisurely drive home that happens to end in Palatine — it ends at an airport gate at 3:20pm, and everything before that is working backwards from it.",
    flags: [
      {
        level: "stop",
        title: "AA 1253 leaves at 3:20pm, and the car is due back at 2:30",
        body:
          "Fifty minutes between a contracted car return and a departure is not enough at O'Hare. You have to drop the car at the Multi-Modal Facility, ride the ATS back to Terminal 3, check bags and clear security — and before any of that you have to deliver Mom and her luggage to Palatine, which is 35 minutes the wrong way. Mom's document plans Ann Arbor and Kalamazoo on this day and has no idea a flight exists.",
        fix:
          "Leave Belleville by 8:00am Eastern — 7:30 if you want Ann Arbor — and have the car back at O'Hare by 1:00pm rather than the 2:30 on the paperwork. Kalamazoo is cut. Full timetable is on the Car & flights page.",
      },
      {
        level: "warn",
        title: "I-94 through Marshall is torn up, on the day you can least afford it",
        body:
          "The Marshall Modernization project has I-94, I-69 and the interchange between them under reconstruction in Calhoun County through 2026 — barrier walls moved, pavement markings shifted, lanes running in temporary configurations. It sits between Ann Arbor and Kalamazoo, right in the middle of today's drive. On any other day it's an annoyance; today there's a 3:20pm flight behind it.",
        fix:
          "This is the reason to leave Belleville at 8:00am rather than 9:00, independent of everything else. Check MiDrive before you pull out of the hotel, and if the work zone is backed up, I-96 to I-69 south is the long way round but it exists. Do not plan to make up time on this stretch — you can't.",
      },
      {
        level: "warn",
        title: "Kalamazoo is the stop that doesn't survive",
        body:
          "Ann Arbor is 25 minutes off the line and can be done in 45 without hurting anything. Kalamazoo sits 99 miles further west, and by then you're spending time you need at the other end of the day.",
        fix:
          "Take the break at a service plaza instead. If someone badly wants a real stop on the west half, New Buffalo is right off I-94 near the state line and costs ten minutes rather than an hour.",
      },
      {
        level: "info",
        title: "You gain the hour back today",
        body:
          "Michigan is Eastern, Illinois is Central. The hour you lost driving east on the 15th comes back driving west on the 21st — which is the only reason a 3:20pm flight is achievable at all.",
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
