/**
 * Every open question on this trip, in one place, sorted by what it asks of you.
 *
 * The day pages tell you what happens. This file tells you what's still
 * unresolved — and, for the things that ARE resolved, says so out loud so they
 * stop looking like problems.
 *
 * The old model gave everything the same three severities (stop / warn / info),
 * which meant a fact already checked and closed looked exactly as alarming as a
 * genuine fork in the road. Everything read red. So the axis here is not "how
 * bad is this" but "what do you have to do about it":
 *
 *   decide  — a fork only Gunnar and Mom can pick. Should be rare.
 *   book    — a reservation. Link, price, deadline.
 *   call    — a phone call closes it. The exact question is written out.
 *   do      — a physical action. No booking, no call.
 *   watch   — re-check close to departure, because the answer can change.
 *   done    — verified against the source. Nothing for you to do.
 *
 * Everything in `done` was checked in August 2026 against the operator's own
 * page, not a listing site. Where a third-party listing disagreed with the
 * operator, the operator wins and the disagreement is written into the entry.
 */

export const KINDS = {
  decide: {
    label: "Decide",
    icon: "🔀",
    tone: "stop",
    blurb: "A fork only you and Mom can pick. Nobody can research these for you.",
  },
  book: {
    label: "Book",
    icon: "📌",
    tone: "warn",
    blurb: "A reservation. Link, price and deadline are on the card.",
  },
  call: {
    label: "One call",
    icon: "☎️",
    tone: "warn",
    blurb: "A phone call closes it. The question to ask is written out — just read it.",
  },
  do: {
    label: "Do",
    icon: "✋",
    tone: "info",
    blurb: "A physical action. Nothing to book, nobody to ring.",
  },
  watch: {
    label: "Watch",
    icon: "👁",
    tone: "info",
    blurb: "Re-check in the week before you leave. The answer can still change.",
  },
  done: {
    label: "Handled",
    icon: "✅",
    tone: "ok",
    blurb: "Checked against the operator's own page. Nothing for you to do.",
  },
};

/** Display order. `done` last, collapsed by default. */
export const KIND_ORDER = ["decide", "book", "call", "do", "watch", "done"];

const CHECKED = "Aug 2026";

export const LOOSE_ENDS = [
  // ───────────────────────────── DECIDE ─────────────────────────────
  {
    id: "sunday-shape",
    kind: "decide",
    dayId: "d6",
    when: "Sun 9/20",
    title: "Windsor, or the Henry Ford. Not both.",
    problem:
      "The Henry Ford is in Dearborn, not Detroit, and wants four hours minimum. Belle Isle Aquarium shuts at 4:00. Stones 'N Bones can't be entered before 11:00. Stack all three behind a Sarnia departure and the day collapses.",
    answer:
      "There is no clever ordering that fits all of it. Pick one of these three before you leave Ontario, and the day is comfortable rather than frantic.",
    deadline: "Settle it Saturday night in Point Edward",
    options: [
      {
        label: "A · Canada day",
        detail:
          "Drop Stones 'N Bones. Leave Sarnia 7:30, Windsor riverfront 9:15–10:15, tunnel by 10:45, Belle Isle 11:00–1:00, late lunch downtown, The Belt at 2:30, Belleville by 6:00. The Henry Ford is cut.",
      },
      {
        label: "B · Henry Ford day",
        detail:
          "Cut Windsor. Cross at the Blue Water Bridge around 8:00, I-94 down the US side in about 1h20m, Dearborn by 10:30, five real hours in the museum, The Belt and dinner after, Belleville by 7:00. Belle Isle is cut.",
      },
      {
        label: "C · Push the museum to Monday",
        detail:
          "Take plan A on Sunday, then open Monday at the Henry Ford — it's 9:30–5 daily and only 20 minutes back east of Belleville. Costs you Ann Arbor and Kalamazoo, and you'd leave Dearborn about 1:30 for a 5:30 Central arrival home. Longest day, but you get both cities.",
      },
    ],
    verified:
      "Henry Ford 9:30–5 daily; Belle Isle Aquarium Thu–Sun 10–4; Stones 'N Bones Fri–Sun 11–5. All three confirmed for September 2026.",
    source: { name: "The Henry Ford", url: "https://www.thehenryford.org/visit/henry-ford-museum/" },
  },
  {
    id: "tuesday-shape",
    kind: "decide",
    dayId: "d1",
    when: "Tue 9/15",
    title: "How much of Grand Rapids do you actually want?",
    problem:
      "Meijer Gardens plus the Meyer May House plus a sit-down lunch plus a neighbourhood walk is a full day, not an afternoon — and you arrive around 11:00 Eastern needing to reach Ludington by evening.",
    answer:
      "Both versions work. The difference is whether you'd rather have four hours of Chihuly or a relaxed evening on the lake.",
    deadline: "Decide before you book the Meyer May slot — it sets the whole day",
    options: [
      {
        label: "Full day",
        detail:
          "Meyer May at 11:00 → Heritage Hill on foot from the same parking spot → quick lunch → Meijer Gardens 2:00–4:45 → leave 4:45, Ludington about 6:30, ahead of the 7:57 sunset. No White Pine Village, no maritime museum.",
      },
      {
        label: "Short day",
        detail:
          "Skip Meijer Gardens. Ludington by 4:00, which buys you the Port of Ludington Maritime Museum (last admission 4:30) and an unhurried breakwall walk. Chihuly survives to a future trip — outdoor runs to Nov 1 2026, the indoor gallery to Jan 10 2027. The free Meyer May tour only happens Tue, Thu and Sun.",
      },
    ],
    verified:
      "Meijer Gardens open Tuesdays 9–9, the only late night of the week. Radiant Forms extended to 10 Jan 2027; outdoor Chihuly to 1 Nov 2026.",
    source: {
      name: "Frederik Meijer Gardens",
      url: "https://www.meijergardens.org/events/chihuly-at-meijer-gardens/",
    },
  },
  {
    id: "oktoberfest",
    kind: "decide",
    dayId: "d5",
    when: "Sat 9/19",
    title: "Oktoberfest: commit or route around it",
    problem:
      "Frankenmuth's Oktoberfest runs Sept 17–20 and Saturday the 19th is its peak — noon to midnight. Mom's document doesn't mention it at all. The one thing that doesn't work is arriving mid-afternoon with no plan.",
    answer:
      "Either is fine. Drifting into it at 3pm on the busiest afternoon of the year, with a border crossing still ahead of you, is not.",
    deadline: "Decide now — the IN version needs a table booked",
    options: [
      {
        label: "In",
        detail:
          "Book an 11:15–11:45 chicken dinner, walk the covered bridge to Heritage Park when the gates open at noon, give the festival 2–2.5 hours, leave by 3:30. Add $10 a head at the gate.",
      },
      {
        label: "Out",
        detail:
          "Arrive 10:30, do Bronner's and Main Street before the noon gates, eat early, gone by 1:30. You see the town without the crowd and reach the bridge with daylight to spare.",
      },
    ],
    verified:
      "Sept 17–20 2026. Thu 3–10pm, Fri & Sat noon–midnight, Sun noon–4pm. Gate admission $10 per person per day; 15 and under free — a cost Mom's document doesn't carry.",
    source: {
      name: "Frankenmuth CVB",
      url: "https://www.frankenmuth.org/events/frankenmuth-oktoberfest1/",
    },
  },
  {
    id: "island-mobility",
    kind: "decide",
    dayId: "d4",
    when: "Fri 9/18",
    title: "Does Mom ride the 8.2 miles, or take the carriage?",
    problem:
      "The perimeter loop is flat and car-free, which makes it sound easier than it is at 8.2 miles. The carriage fallback has a hard 3:00pm cutoff after Labor Day, so it is not something you can fall back on at four in the afternoon.",
    answer:
      "Ask her on the mainland, Thursday night. If there's any hesitation, split up for two hours — it costs nothing and everyone gets the day they wanted.",
    deadline: "Thursday evening in Mackinaw City",
    options: [
      {
        label: "Split up",
        detail:
          "Mom takes a carriage tour (about $41, roughly 1h45m) boarding mid-morning while Gunnar and Mikaela ride the loop. All three meet at Fort Mackinac by 11:00 for the cannon.",
      },
      {
        label: "All three ride",
        detail:
          "Hourly bike rental, counter-clockwise out of town, British Landing at halfway for a break. About two hours with stops. Return the bikes before walking up to the fort.",
      },
    ],
    verified:
      "Carriage tours run 9am–3pm from Labor Day to late September, no fixed departure times — you board the next available carriage. Bike shop opens at 8.",
    source: { name: "Mackinac Island Carriage Tours", url: "https://www.mict.com/carriage-tours/" },
  },
  {
    id: "traverse-evening",
    kind: "decide",
    dayId: "d2",
    when: "Wed 9/16",
    title: "Traverse City tasting rooms & dinner",
    problem:
      "Old Mission Peninsula wineries and local distilleries offer great tastings, but have varying evening hours and require planning designated driver arrangements.",
    answer:
      "Choose between staying downtown in walking distance to Left Foot Charley and Mammoth Distilling, or driving the scenic peninsula.",
    deadline: "Wednesday afternoon",
    options: [
      {
        label: "Downtown / Village",
        detail:
          "Left Foot Charley in the Village (wine & cider, open to 7) and Mammoth Distilling downtown (open to 10). Short cab/walk from hotel; dinner at Trattoria Stella.",
      },
      {
        label: "Old Mission Peninsula",
        detail:
          "Drive M-37 north to Chateau Chantal and 2 Lads for bay views before dinner in town.",
      },
    ],
  },
  {
    id: "torch-lake",
    kind: "decide",
    dayId: "d3",
    when: "Thu 9/17",
    title: "Route directly via Charlevoix to Mackinaw City",
    problem:
      "Driving US-31 north directly connects Traverse City, Charlevoix, Petoskey, and Mackinaw City.",
    answer:
      "Heading straight up US-31 gives ample time for Earl Young's Mushroom Houses, Petoskey stone hunting at Magnus Park, and sunset in Mackinaw City.",
    deadline: "Before Thursday departure",
    options: [
      {
        label: "Direct US-31 via Charlevoix",
        detail:
          "Comfortable pacing with 45 minutes for the Mushroom Houses and a relaxed lunch in Petoskey.",
      },
      {
        label: "Detour via Torch Lake",
        detail:
          "Scenic loop along the southern shore through Alden before reconnecting north to Charlevoix.",
      },
    ],
  },

  // ────────────────────────────── BOOK ──────────────────────────────
  {
    id: "meyer-may",
    kind: "book",
    dayId: "d1",
    when: "Tue 9/15",
    title: "Meyer May House guided tour",
    problem:
      "Free 90-minute guided tour of Frank Lloyd Wright's 1909 Prairie masterpiece in Grand Rapids.",
    answer:
      "Reserve online in advance for a Tuesday morning tour (11:00 AM or 11:30 AM).",
    deadline: "Reserve online in advance",
    cost: "Free",
    url: "https://meyermayhouse.steelcase.com/tour-the-meyer-may-house/",
    urlLabel: "Book the tour",
    phone: "616-246-4821",
    verified:
      "Tuesdays & Thursdays 10am–1pm, Sundays 1–4pm. Free online booking for up to 8 guests.",
    source: {
      name: "Meyer May House (Steelcase)",
      url: "https://meyermayhouse.steelcase.com/tour-the-meyer-may-house/",
    },
  },
  {
    id: "meijer-tickets",
    kind: "book",
    dayId: "d1",
    when: "Tue 9/15",
    title: "Meijer Gardens admission & exhibits",
    problem:
      "Frederik Meijer Gardens & Sculpture Park in Grand Rapids.",
    answer:
      "Open until 9:00 PM on Tuesdays; general admission covers the outdoor sculpture park and botanical conservatory.",
    deadline: "Purchase online or at the gate",
    cost: "$25 adult · $20 senior 65+ · $19 student",
    url: "https://www.meijergardens.org/events/chihuly-at-meijer-gardens/",
    urlLabel: "Meijer Gardens tickets",
    verified:
      "Open Tuesdays 9am–9pm. $20 senior admission for 65+.",
    source: { name: "Frederik Meijer Gardens", url: "https://www.meijergardens.org/" },
  },
  {
    id: "bavarian-inn",
    kind: "book",
    dayId: "d5",
    when: "Sat 9/19",
    title: "Frankenmuth Bavarian Inn chicken dinner",
    problem:
      "Famous family-style chicken dinner in Frankenmuth during Oktoberfest Saturday.",
    answer:
      "Reserve a lunch or dinner seating in advance at the Bavarian Inn or Zehnder's.",
    deadline: "Reserve in advance",
    url: "https://www.bavarianinn.com/dine/",
    urlLabel: "Bavarian Inn dining",
    phone: "989-652-9941",
    verified:
      "Reservations available online and by phone for family-style dining.",
    source: { name: "Bavarian Inn Restaurant", url: "https://www.bavarianinn.com/dine/" },
  },
  {
    id: "sleeping-bear-pass",
    kind: "book",
    dayId: "d2",
    when: "Wed 9/16",
    title: "Sleeping Bear Dunes vehicle pass ($25)",
    problem: "National Park Service 7-day vehicle pass for Sleeping Bear Dunes.",
    answer:
      "Purchase pass in advance on recreation.gov for quick park entry at Pierce Stocking drive.",
    deadline: "Any time before Wednesday",
    cost: "$25 per vehicle, 7 days",
    url: "https://www.recreation.gov/sitepass/74294",
    urlLabel: "Buy the pass",
    verified: "Confirmed against NPS fee schedule for Sleeping Bear Dunes.",
    source: { name: "NPS — fees & passes", url: "https://www.nps.gov/slbe/planyourvisit/fees.htm" },
  },
  {
    id: "mackinac-tickets",
    kind: "book",
    dayId: "d4",
    when: "Fri 9/18",
    title: "Fort Mackinac historic park tickets",
    problem:
      "Historic fort perched above Mackinac Island harbor.",
    answer:
      "Buy a multi-site historic parks ticket covering both Fort Mackinac and Colonial Michilimackinac.",
    deadline: "Buy online or at ticket window",
    cost: "Fort Mackinac adult $17.50; multi-site options available",
    url: "https://www.mackinacparks.com/attraction/fort-mackinac/",
    urlLabel: "Mackinac State Historic Parks",
    verified:
      "Open 9:30am–5:00pm daily, last admission 4:00pm.",
    source: {
      name: "Mackinac State Historic Parks",
      url: "https://www.mackinacparks.com/attraction/fort-mackinac/",
    },
  },

  // ────────────────────────────── CALL ──────────────────────────────
  {
    id: "second-driver",
    kind: "call",
    dayId: "d0",
    when: "Before 9/14",
    title: "Add additional driver at rental pickup",
    problem:
      "Costco Travel bookings include an additional driver at no extra charge.",
    answer:
      "Add Mikaela to the rental agreement at the O'Hare Budget counter at pickup for shared driving.",
    ask: "“I'd like to add an additional driver to this reservation booked through Costco Travel.”",
    phone: "800-218-7992",
    deadline: "At the O'Hare counter on pickup",
  },
  {
    id: "monday-home",
    kind: "decide",
    dayId: "d7",
    when: "Mon 9/21",
    title: "Return flight & vehicle drop-off timeline",
    problem:
      "AA 1253 departs O'Hare at 3:20 PM; car drop-off at Multi-Modal Facility by 1:00 PM.",
    answer:
      "Depart Belleville / Detroit area by 8:00 AM Eastern, drop luggage in Palatine by noon Central, and return vehicle at O'Hare MMF by 1:00 PM.",
    deadline: "Before Monday morning departure",
    url: "#/ride",
    urlLabel: "Full timetable",
  },
  {
    id: "flights",
    kind: "done",
    dayId: null,
    when: "Confirmed",
    title: "Flights booked (AA 2358 & AA 1253)",
    problem:
      "Round-trip flights between SFO and Chicago O'Hare.",
    answer:
      "Outbound: AA 2358 (SFO 1:29 PM → ORD 8:21 PM on 9/14). Return: AA 1253 (ORD 3:20 PM → SFO 6:09 PM on 9/21).",
    url: "#/ride",
    urlLabel: "Car & flights",
  },
  {
    id: "schnitz",
    kind: "call",
    dayId: "d1",
    when: "Tue 9/15",
    title: "Grand Rapids lunch stop",
    problem:
      "Schnitz Deli and nearby downtown eateries for lunch.",
    answer:
      "Enjoy classic deli sandwiches or downtown cafes in Grand Rapids before heading west to Ludington.",
    ask: "“What time do you close on Tuesday, and are you seating at 12:30?”",
    phone: "616-451-4444",
    deadline: "Trip week",
  },
  {
    id: "kayaks",
    kind: "call",
    dayId: "d3",
    when: "Thu 9/17",
    title: "Clear-bottom kayak tours",
    problem:
      "Seasonal paddle outfitters on Grand Traverse Bay.",
    answer:
      "Check late-season tour availability if interested in a water paddle on Wednesday or Thursday.",
    ask: "“Are you running tours the week of September 14th?”",
    phone: "231-632-6583",
    deadline: "Early September",
  },
  {
    id: "mackinaw-dinner",
    kind: "call",
    dayId: "d3",
    when: "Thu 9/17",
    title: "Mackinaw City dining & sunset",
    problem:
      "Arrive in Mackinaw City around 4:15 PM on Thursday.",
    answer:
      "Year-round dining options include Audie's Restaurant (8am–10pm) and Dixie Saloon. Walk to Lakeside Park for 7:48 PM sunset behind the Mackinac Bridge.",
    ask: "“Are you serving dinner tonight?”",
    phone: "231-436-5744",
    deadline: "Thursday afternoon",
  },
  {
    id: "belleville-bed",
    kind: "call",
    dayId: "d6",
    when: "Sun 9/20",
    title: "Sunday night lodging in Detroit / Belleville",
    problem:
      "Final night stay near Detroit Metro Airport or staying with Julia.",
    answer:
      "Confirm plans in advance; Hampton Inn Belleville provides a comfortable backup along I-94.",
    ask: "Ask Julia first. Then, if needed: “Do you have a room for three on Sunday September 20th?”",
    phone: "734-699-2424",
    deadline: "Two weeks out",
  },

  // ─────────────────────────────── DO ───────────────────────────────
  {
    id: "canada-card",
    kind: "do",
    dayId: "d0",
    when: "Mon 9/14, 9:00 PM",
    title: "Request Canadian Insurance Card at rental pickup",
    problem:
      "Budget provides the Canadian Non-Resident Insurance Card at pickup for cross-border driving into Ontario.",
    answer:
      "Ask the Budget counter agent at O'Hare MMF for the card when picking up keys. It is free and covers the car in Canada.",
    deadline: "At the O'Hare counter, Monday 9pm",
    url: "#/ride",
    urlLabel: "Car & flights",
  },
  {
    id: "passports-check",
    kind: "do",
    dayId: "d0",
    when: "Before loading the car",
    title: "Confirm all 3 passports are packed",
    problem:
      "All three passengers need a valid US passport book or passport card for the Saturday/Sunday Ontario leg.",
    answer:
      "Ensure all 3 passports are in carry-on bags before leaving Palatine Tuesday morning, with offline photo copies saved to phone camera rolls as backup.",
    deadline: "Before departure from Palatine",
    url: "#/border",
    urlLabel: "Border",
  },
  {
    id: "tell-the-bank",
    kind: "do",
    dayId: "d5",
    when: "Before 9/19",
    title: "Travel notice for credit card",
    problem:
      "Both border crossings (Blue Water Bridge and Detroit Tunnel) are card-only with cashless toll systems.",
    answer:
      "Ensure credit card or Apple Pay is set up for international Canadian transactions and carry a backup card.",
    deadline: "The week before",
  },
  {
    id: "early-start",
    kind: "do",
    dayId: "d1",
    when: "Tue 9/15, 6:45 AM",
    title: "Depart Palatine at 6:45 AM Tuesday",
    problem:
      "Tuesday is the longest driving day and crosses into Eastern time before Grand Rapids.",
    answer:
      "Departing Palatine at 6:45 AM Central provides a solid 7+ hours of sleep after Monday night's flight and puts you in Grand Rapids for the 11:30 AM Meyer May tour.",
    deadline: "Tuesday morning",
  },

  // ────────────────────────────── WATCH ─────────────────────────────
  {
    id: "i94-marshall",
    kind: "watch",
    dayId: "d7",
    when: "Mon 9/21",
    title: "I-94 at Marshall is a work zone on the day with the flight",
    problem:
      "The Marshall Modernization project has I-94, I-69 and the interchange between them under reconstruction in Calhoun County through 2026 — barrier walls moved, markings shifted, lanes in temporary configurations. It sits between Ann Arbor and Kalamazoo, in the middle of the run home. Any other day it's an annoyance; this day has AA 1253 at 3:20pm behind it.",
    answer:
      "It's the reason to leave Belleville at 8:00am rather than 9:00, independent of everything else. Check MiDrive from the hotel before you pull out. If it's backed up, I-96 to I-69 south is the long way round but it exists. Don't plan to make up time here — you can't.",
    deadline: "Check MiDrive that morning",
    url: "https://mdotnetpublic.state.mi.us/drive/",
    urlLabel: "MDOT MiDrive",
    verified:
      "Confirmed August 2026: I-94/I-69 interchange ramps rebuilt through mid-September, with major traffic shifts on I-94 continuing. MDOT advising alternate routes.",
    source: { name: "MDOT — Marshall Modernization", url: "https://www.michigan.gov/mdot/projects-studies/marshall-modernization" },
  },
  {
    id: "i75-gaylord",
    kind: "watch",
    dayId: "d5",
    when: "Sat 9/19",
    title: "I-75 at Gaylord starts rebuilding the week before you drive it",
    problem:
      "MDOT replaces both I-75 bridges over M-32 in Gaylord starting immediately after Labor Day 2026 — a $54 million, three-year job, and Gaylord is directly on the run south from Mackinaw City. Traffic is kept moving on temporary widening and crossovers, which means narrow lanes and a speed drop, with staged ramp closures.",
    answer:
      "Add 20 minutes to the Mackinaw–Frankenmuth leg rather than hoping. Saturday is already the longest driving day, with a festival window and a border crossing stacked behind it, so it has the least room to absorb a surprise. If the crossover looks bad, the I-75 Business Loop through Gaylord is the signed alternative.",
    deadline: "Check MiDrive Friday night",
    url: "https://mdotnetpublic.state.mi.us/drive/",
    urlLabel: "MDOT MiDrive",
    verified:
      "Confirmed August 2026: work scheduled to begin after Labor Day 2026, running to fall 2029. I-75 through traffic maintained via temporary pavement widening and crossovers.",
    source: { name: "MDOT — I-75/M-32 interchange", url: "https://www.michigan.gov/mdot/projects-studies/i75-m32-interchange-otsego-county" },
  },
  {
    id: "tunnel-of-trees",
    kind: "watch",
    dayId: "d3",
    when: "Thu 9/17",
    title: "The Tunnel of Trees is still closed",
    problem:
      "M-119 between Harbor Springs and Cross Village — one of the best fall drives in the country, and the road that would have connected Mom's Cross Village Beach to Mackinaw City — is shut in two places after April's flooding. No reopening date has been announced.",
    answer:
      "The map in this app already routes you up US-31 and I-75, because that's the road that exists. Re-check at the start of September: if it has reopened end to end it is the single best addition available to this trip and worth the extra hour. If not, drop Cross Village and don't think about it again.",
    deadline: "Re-check the first week of September",
    url: "https://petoskeyarea.com/tunnel-of-trees-closure-information/",
    urlLabel: "Closure status",
    verified:
      "As of 28 July 2026: closed Terpening Rd to Robinson Rd (Good Hart), and again between Island View Rd and Cross Village. Slope failure at one, a washed-out culvert at the other. Recovery planning underway, no timeline.",
    source: { name: "Petoskey Area CVB", url: "https://petoskeyarea.com/tunnel-of-trees-closure-information/" },
  },
  {
    id: "straits-wind",
    kind: "watch",
    dayId: "d4",
    when: "Fri 9/18",
    title: "Wind, not rain, is what cancels the island",
    problem:
      "The ferry tickets are non-refundable with no usable rain-check on this schedule. Rain is genuinely fine — the fort's fourteen buildings, two films, the Tea Room, four downtown museums on the same ticket and the Grand Hotel make a complete indoor day. Wind on the Straits is the real variable.",
    answer:
      "Check the marine forecast Thursday night and again at 6am Friday. Ring Shepler's for day-of status. If it's blowing, take a direct crossing rather than the scenic run under the bridge.",
    deadline: "Thursday night and 6am Friday",
    phone: "231-436-5023",
  },
  {
    id: "border-wait",
    kind: "watch",
    dayId: "d5",
    when: "Sat 9/19",
    title: "Saturday-evening border waits are unpredictable",
    problem:
      "The itinerary implies about 15 minutes at the Blue Water Bridge. On a Saturday evening at the end of a festival weekend that is a guess, not a plan.",
    answer:
      "Check live wait times from the car about 45 minutes out, and build 45 minutes of buffer rather than 15. Don't book a Sarnia dinner before 7:30pm. Fill the tank on the US side first — Ontario fuel is much dearer.",
    deadline: "From the car, 45 minutes out",
    url: "https://bwt.cbp.gov/",
    urlLabel: "CBP live border wait times",
  },

  // ────────────────────────────── DONE ──────────────────────────────
  {
    id: "artprize",
    kind: "done",
    dayId: "d1",
    when: "Tue 9/15",
    title: "You've landed in ArtPrize Preview Week",
    problem:
      "Nobody planned this and Mom's document doesn't mention it. ArtPrize 2026 runs September 18 to October 3, with Preview Week on the 12th to the 17th — so your Tuesday in Grand Rapids sits inside it.",
    answer:
      "Between 70 and 80 per cent of the thousand-plus entries are already installed across downtown venues, and the crowds that come with the voting don't arrive until Friday. It's free, it's in the same blocks you're parking in for Meyer May and Heritage Hill, and it costs nothing to walk through between them. It also strengthens the case for the short day: skip Meijer Gardens, spend the afternoon downtown on foot, be in Ludington by four.",
    url: "https://www.artprize.org/",
    urlLabel: "ArtPrize",
    source: { name: "ArtPrize", url: "https://www.artprize.org/" },
  },
  {
    id: "detroit-clear",
    kind: "done",
    dayId: "d6",
    when: "Sun 9/20",
    title: "No stadium traffic in Detroit that Sunday — checked",
    problem:
      "A home game would have changed Plan A entirely: the tunnel exit, Hart Plaza and every downtown structure sit inside the Ford Field and Comerica Park footprint, and a Sunday afternoon kickoff would have made parking downtown a different proposition.",
    answer:
      "Both venues are dark. The Lions are away at Buffalo on the 17th and don't play at Ford Field again until the 27th. The Tigers are in Chicago that afternoon, at the White Sox at 2:10. Park downtown without the usual Sunday anxiety — though note it cuts both ways, since Standby in The Belt doesn't open until 5:00pm on Sundays.",
    source: { name: "Baseball-Reference / NFL 2026 schedules", url: "https://www.nfl.com/schedules/2026/by-team/detroit-lions" },
  },
  {
    id: "ludington-lights",
    kind: "done",
    dayId: "d1",
    when: "Tue 9/15",
    title: "Ludington Breakwater open; tower climbing seasonal",
    problem:
      "Lighthouse towers operate Thursday–Sunday during fall schedule.",
    answer:
      "The public north breakwall pier is open for walking out to the light for sunset over Lake Michigan.",
    verified:
      "North Breakwater fall hours Sept 10–27: Thu–Sun 10–5 for tower climbs; pier is public and open daily.",
    source: { name: "Lakeshore Keepers", url: "https://lakeshorekeepers.org/ludington-north-breakwater/" },
  },
  {
    id: "port-museum",
    kind: "done",
    dayId: "d1",
    when: "Tue 9/15",
    title: "Port of Ludington Maritime Museum",
    problem:
      "Museum operates Tuesday–Saturday 10:00 AM–5:00 PM.",
    answer:
      "Last admission is 4:30 PM; located near downtown Ludington.",
    verified: "Tue–Sat 10am–5pm, last admission 4:30pm, April–November season.",
    source: { name: "Port of Ludington Maritime Museum", url: "https://ludingtonmaritimemuseum.org/" },
  },
  {
    id: "white-pine",
    kind: "done",
    dayId: "d1",
    when: "Tue 9/15",
    title: "Historic White Pine Village hours",
    problem: "Open Tuesdays through October 17.",
    answer:
      "Last ticket sales at 3:30 PM; plan for a 2-hour visit if stopping.",
    verified: "May 3 – Oct 17 2026, Tue–Sat 10am–5pm, last ticket sales 3:30pm.",
    source: { name: "Historic White Pine Village", url: "http://historicwhitepinevillage.org/" },
  },
  {
    id: "sleeping-bear-hours",
    kind: "done",
    dayId: "d2",
    when: "Wed 9/16",
    title: "Sleeping Bear Dunes timing",
    problem:
      "Scenic drive and dune trails benefit from relaxed pacing.",
    answer:
      "Budget 3 to 3.5 hours on the ground for Dune Climb, Pierce Stocking Overlook #9, and Glen Haven beach.",
    verified: "Pierce Stocking scenic loop is 7.4 miles with 12 scenic overlooks.",
    source: { name: "NPS — Pierce Stocking Scenic Drive", url: "https://www.nps.gov/slbe/planyourvisit/pssd.htm" },
  },
  {
    id: "dune-climb",
    kind: "done",
    dayId: "d2",
    when: "Wed 9/16",
    title: "Dune Climb first ridge",
    problem:
      "The full Dunes Trail to Lake Michigan is 3.5 miles round trip across 9 sand dunes.",
    answer:
      "Climbing to the first dune ridge takes 15–25 minutes and provides sweeping views over Little Glen Lake.",
  },
  {
    id: "glen-haven",
    kind: "done",
    dayId: "d2",
    when: "Wed 9/16",
    title: "Glen Haven Village & beach walk",
    problem:
      "Historic logging village exteriors and beach boardwalk are accessible year-round.",
    answer:
      "Enjoy a flat 20–30 minute walk along the shore to dip your toes in Lake Michigan.",
    source: { name: "NPS — Glen Haven", url: "https://www.nps.gov/slbe/planyourvisit/glenhaven.htm" },
  },
  {
    id: "mission-point",
    kind: "done",
    dayId: "d2",
    when: "Wed 9/16",
    title: "Mission Point Lighthouse",
    problem:
      "Located at the northern tip of Old Mission Peninsula.",
    answer:
      "Open 10:00 AM–5:00 PM Wednesday–Monday ($8 admission to climb tower); surrounding shoreline park is open and free.",
    verified: "$8 for ages 13+, $2 for ages 6–12, free under 5. Open May–October, 10am–5pm, closed Tuesdays.",
    source: { name: "Mission Point Lighthouse", url: "https://www.missionpointlighthouse.com/" },
  },
  {
    id: "castle-farms",
    kind: "done",
    dayId: "d3",
    when: "Thu 9/17",
    title: "Castle Farms in Charlevoix",
    problem:
      "September hours are 10:00 AM–5:00 PM.",
    answer:
      "Self-guided grounds admission is $8 adult; great paired with Earl Young's stone Mushroom Houses.",
    verified: "September 10am–5pm; self-guided $8 / $7 / $5.",
    source: { name: "Visit Charlevoix", url: "https://www.visitcharlevoix.com/CastleFarms/" },
  },
  {
    id: "stone-beaches",
    kind: "done",
    dayId: "d3",
    when: "Thu 9/17",
    title: "Magnus Park Petoskey stone beach",
    problem:
      "Public beach on Little Traverse Bay located directly along the route.",
    answer:
      "Free city beach access at 901 W Lake St with rocky shoreline for stone hunting, 5 minutes from downtown Petoskey.",
  },
  {
    id: "michilimackinac",
    kind: "done",
    dayId: "d3",
    when: "Thu 9/17 → Sat 9/19",
    title: "Colonial Michilimackinac scheduling",
    problem:
      "Historic fort under the Mackinac Bridge opens at 9:30 AM.",
    answer:
      "Visiting Saturday morning at 9:30 AM pairs well with Fort Mackinac multi-site tickets before heading south to Frankenmuth.",
    verified:
      "Mackinac State Historic Parks multi-site admission valid across both locations.",
    source: {
      name: "Mackinac State Historic Parks",
      url: "https://www.mackinacparks.com/",
    },
  },
  {
    id: "ferry-facts",
    kind: "done",
    dayId: "d4",
    when: "Fri 9/18",
    title: "Shepler's Ferry departure & shuttle",
    problem:
      "Shepler's Mackinaw City dock phone is 231-436-5023.",
    answer:
      "Arrive 30–45 minutes prior to the 7:30 AM boat; free shuttle available from local motels.",
    verified:
      "September 8 – October 4 departures from Mackinaw City: half-hourly morning departures starting at 7:00 AM.",
    phone: "231-436-5023",
    source: { name: "Shepler's 2026 schedule", url: "https://www.sheplersferry.com/mackinaw-city-schedule/" },
  },
  {
    id: "ferry-parking",
    kind: "done",
    dayId: "d4",
    when: "Fri 9/18",
    title: "Shepler's ferry parking",
    problem:
      "Dockside and off-site parking options available.",
    answer:
      "Day parking is $15 at the dock, or free at 311 S. Nicolet St with complimentary tram to the dock.",
    verified: "Day parking $15 at dock; free day lot at 311 S. Nicolet St with tram service.",
    source: { name: "Shepler's — directions & parking", url: "https://www.sheplersferry.com/mackinaw-city-directions/" },
  },
  {
    id: "fort-timing",
    kind: "done",
    dayId: "d4",
    when: "Fri 9/18",
    title: "Fort Mackinac & Grand Hotel timing",
    problem:
      "Fort Mackinac admissions close at 4:00 PM (open until 5:00 PM).",
    answer:
      "Explore the fort late morning (11:00 AM cannon firing and Tea Room lunch), then visit the Grand Hotel in the afternoon.",
    verified: "Sept 7 – Oct 4 2026: 9:30am–5:00pm, last admission 4:00pm.",
    source: { name: "Mackinac State Historic Parks", url: "https://www.mackinacparks.com/attraction/fort-mackinac/" },
  },
  {
    id: "oktoberfest-gate",
    kind: "done",
    dayId: "d5",
    when: "Sat 9/19",
    title: "Frankenmuth Oktoberfest admission",
    problem: "Heritage Park gate admission is $10 per adult (15 and under free).",
    answer:
      "Festival gates open at noon on Saturday with live Bavarian music and food tents.",
    verified: "Sept 17–20 2026; Sat 9/19 noon–midnight; $10 per person per day at the gate.",
    source: { name: "Frankenmuth CVB", url: "https://www.frankenmuth.org/events/frankenmuth-oktoberfest1/" },
  },
  {
    id: "cut-stop-two",
    kind: "done",
    dayId: "d5",
    when: "Sat 9/19",
    title: "Direct route to Frankenmuth",
    problem:
      "I-75 south connects directly from Mackinaw City to Frankenmuth.",
    answer:
      "Driving straight to Frankenmuth provides a full 4-hour window for Oktoberfest, Bronner's, and family-style dinner.",
  },
  {
    id: "belle-isle",
    kind: "done",
    dayId: "d6",
    when: "Sun 9/20",
    title: "Belle Isle state park pass ($12)",
    problem:
      "Vehicle entry requires a Michigan non-resident state park pass.",
    answer:
      "$12 vehicle pass available at the park bridge booth. Aquarium and botanical conservatory admission is free.",
    verified:
      "Michigan DNR: non-resident daily Recreation Passport $12. Aquarium open Thu–Sun 10am–4pm.",
    source: { name: "Michigan DNR", url: "https://www.michigan.gov/dnr/buy-and-apply/rec-pp" },
  },
  {
    id: "m1-wrong",
    kind: "done",
    dayId: "d6",
    when: "Sun 9/20",
    title: "Detroit Tunnel route",
    problem:
      "Follow signs for Detroit–Windsor Tunnel in downtown Windsor.",
    answer:
      "Follow Highway 401 into Windsor and take Goyeau/Park St to the tunnel entrance, surfacing at Jefferson & Randolph in downtown Detroit.",
  },
  {
    id: "tunnel-payment",
    kind: "done",
    dayId: "d6",
    when: "Sun 9/20",
    title: "Detroit Tunnel cashless toll",
    problem:
      "The under-river tunnel is card-only with contactless payment.",
    answer:
      "Toll is CA$8.25 by credit card or Apple Pay at the Windsor kiosk.",
    verified: "Detroit–Windsor Tunnel: card or mobile pay. Clearance 12'8\".",
    source: { name: "Detroit Windsor Tunnel", url: "https://www.dwtunnel.com/toll-rates/" },
  },
  {
    id: "blue-water-cashless",
    kind: "done",
    dayId: "d5",
    when: "Sat 9/19",
    title: "Blue Water Bridge cashless toll",
    problem: "No cash accepted at toll booths; card or Apple Pay only.",
    answer:
      "Toll is $5 USD / $7 CAD by credit card or Apple Pay at the toll plaza.",
    verified: "Cashless toll plaza operated by MDOT / Federal Bridge Corporation.",
    source: {
      name: "Blue Water Bridge tolls",
      url: "https://www.michigan.gov/mdot/programs/bridges-and-structures/blue-water-bridge/toll-rates",
    },
  },
  {
    id: "stones-n-bones",
    kind: "done",
    dayId: "d6",
    when: "Sun 9/20",
    title: "Stones 'N Bones Museum (Sarnia)",
    problem:
      "Local rock and fossil museum hours are 11:00 AM–5:00 PM Friday–Sunday.",
    answer:
      "Admission is CA$7 adult. Option to visit before departing for Windsor or Detroit.",
    verified: "Operator site: Fri–Sun 11am–5pm. Adults $7 CAD, children under 12 $3.",
    phone: "519-336-2100",
    source: { name: "Stones 'N Bones Museum", url: "https://www.stonesnbones.ca/visit-us.html" },
  },
  {
    id: "the-belt",
    kind: "done",
    dayId: "d6",
    when: "Sun 9/20",
    title: "The Belt art alley",
    problem:
      "Pedestrian alleyway in downtown Detroit filled with public art.",
    answer:
      "Located between Broadway and Library St; great 20–30 minute stroll near downtown cafes.",
  },
  {
    id: "borman-home",
    kind: "done",
    dayId: "d7",
    when: "Mon 9/21",
    title: "Westbound I-94 return drive",
    problem:
      "Crossing into Central Time gains 1 hour on the drive home.",
    answer:
      "Departing Belleville by 8:00 AM Eastern provides smooth timing through northwest Indiana and puts you in Palatine by noon.",
  },
];

/** Counts by kind, plus how many still need a human. */
export function looseEndTotals() {
  const byKind = {};
  KIND_ORDER.forEach((k) => {
    byKind[k] = LOOSE_ENDS.filter((e) => e.kind === k).length;
  });
  const open = LOOSE_ENDS.length - byKind.done;
  return { byKind, open, total: LOOSE_ENDS.length, done: byKind.done };
}
