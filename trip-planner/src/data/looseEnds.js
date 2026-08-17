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
    title: "One driver, and an evening built entirely on alcohol",
    problem:
      "Wineries and distilleries, a single designated driver who has already driven all day, on unlit peninsula roads in heavy September deer season. Center Rd and Peninsula Dr have no streetlights.",
    answer:
      "Pick the shape before anyone is standing at a tasting bar, because that is a bad moment to start negotiating.",
    deadline: "Wednesday afternoon, before you leave Sleeping Bear",
    options: [
      {
        label: "Stay in town",
        detail:
          "Left Foot Charley in the Village (wine and cider in one stop, open to 7) then Mammoth Distilling downtown (to 10). Both a short cab from Brio, so nobody drives at all. Dinner at Trattoria Stella, 200 feet away.",
      },
      {
        label: "Hire the driver",
        detail:
          "Designated Driver TC drive your car rather than shuttling you — which matters with a rental. Books the peninsula version back open.",
      },
      {
        label: "Taste and dump",
        detail:
          "Gunnar spits the flight and has one full glass with dinner. Every tasting room has dump buckets and nobody blinks. Cheapest option, needs the least planning.",
      },
    ],
  },
  {
    id: "torch-lake",
    kind: "decide",
    dayId: "d3",
    when: "Thu 9/17",
    title: "Torch Lake and Charlevoix aren't the same stop",
    problem:
      "Mom's earlier draft had them separate; the current version merges them under “Charlevoix.” They're 30–40 minutes apart in different directions, and doing both costs you Mackinaw City.",
    answer:
      "Cut Torch Lake from Thursday and drive Traverse City to Charlevoix straight up US-31. The corridor is already full: Charlevoix town, the Mushroom Houses, the pier light, then Petoskey for lunch and stones.",
    deadline: "Only matters if Mom wants Torch Lake kept",
    options: [
      {
        label: "Cut it",
        detail:
          "Recommended. Thursday becomes a comfortable day instead of a forced march, and the Mushroom Houses — which the current document drops entirely — get the 45 minutes they deserve.",
      },
      {
        label: "Move it to Wednesday",
        detail:
          "The honest slot is a short detour between Sleeping Bear and Traverse City, where the day has genuine slack. Alden is the village she means.",
      },
    ],
  },

  // ────────────────────────────── BOOK ──────────────────────────────
  {
    id: "meyer-may",
    kind: "book",
    dayId: "d1",
    when: "Tue 9/15",
    title: "Meyer May House — free, 90 minutes, and it sells out",
    problem:
      "Mom's document calls it “a drive-by.” It is a free guided tour of one of the most complete Frank Lloyd Wright restorations anywhere, and it runs three days a week — one of which is your Tuesday.",
    answer:
      "Book online now. Tuesday tours run 10:00am–1:00pm, so aim for the latest start that still finishes inside the window — around 11:00. Note that a noon start probably doesn't exist, despite what an earlier draft of this app said.",
    deadline: "Today. September slots go.",
    cost: "Free",
    url: "https://meyermayhouse.steelcase.com/tour-the-meyer-may-house/",
    urlLabel: "Book the tour",
    phone: "616-246-4821",
    verified:
      "Tuesdays & Thursdays 10am–1pm, Sundays 1–4pm. Free. Online booking for up to 8; groups of 9+ by phone. Visitor Centre answers 10am–2pm Tue and Thu.",
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
    title: "Meijer Gardens — two tickets, not one",
    problem:
      "The outdoor Chihuly installations come with general admission. Radiant Forms, the indoor gallery show, needs its own timed ticket and can sell out.",
    answer:
      "Buy general admission plus a Radiant Forms slot timed 15–20 minutes after your planned arrival. Only relevant if you take the Full Day option on Tuesday.",
    deadline: "A few days ahead is enough",
    cost: "$25 adult · $20 senior 65+ · $19 student · $14 child, plus the timed gallery ticket",
    url: "https://www.meijergardens.org/events/chihuly-at-meijer-gardens/",
    urlLabel: "Meijer Gardens tickets",
    verified:
      "Open Tuesdays 9am–9pm — the only late night of the week. Check whether Mom takes the 65+ rate; it's $5 off.",
    source: { name: "Frederik Meijer Gardens", url: "https://www.meijergardens.org/" },
  },
  {
    id: "bavarian-inn",
    kind: "book",
    dayId: "d5",
    when: "Sat 9/19",
    title: "The chicken dinner, on an Oktoberfest Saturday",
    problem:
      "Mom's document has Frankenmuth food as an open question — “good food?”. A walk-in three-top at either of the two famous family-style places, at noon, on the peak day of Oktoberfest, is optimistic.",
    answer:
      "Reserve an 11:15–11:45 seating at the Bavarian Inn. It sits at the Main Street end of the covered bridge, so the walk to the festival grounds is a natural continuation. Confirm the current per-head price when you book — published figures are a couple of years stale.",
    deadline: "Now, if you're taking the IN option",
    url: "https://www.bavarianinn.com/dine/",
    urlLabel: "Bavarian Inn dining",
    phone: "989-652-9941",
    verified:
      "Reservations taken online and by phone; the restaurant says space is very limited and to call well in advance. Zehnder's across the street is the alternative.",
    source: { name: "Bavarian Inn Restaurant", url: "https://www.bavarianinn.com/dine/" },
  },
  {
    id: "sleeping-bear-pass",
    kind: "book",
    dayId: "d2",
    when: "Wed 9/16",
    title: "Sleeping Bear vehicle pass",
    problem: "Nothing wrong here — it just needs buying, and it's easier online than at the gate.",
    answer:
      "Mom's $25 figure and her recreation.gov link are both correct. Buy it before you arrive. This is the only National Park Service site on the trip, so the $80 annual pass isn't worth it.",
    deadline: "Any time before Wednesday",
    cost: "$25 per vehicle, 7 days",
    url: "https://www.recreation.gov/sitepass/74294",
    urlLabel: "Buy the pass",
    verified: "Confirmed against the NPS fee page for Sleeping Bear Dunes.",
    source: { name: "NPS — fees & passes", url: "https://www.nps.gov/slbe/planyourvisit/fees.htm" },
  },
  {
    id: "mackinac-tickets",
    kind: "book",
    dayId: "d4",
    when: "Fri 9/18",
    title: "Fort Mackinac — and the ticket that also covers Saturday",
    problem:
      "Fort Mackinac's last admission in September is 4:00pm, three hours earlier than the summer schedule most people remember. And Colonial Michilimackinac on Saturday morning is a separate site.",
    answer:
      "Buy a multi-site ticket rather than a single Fort Mackinac admission — the same purchase covers Colonial Michilimackinac on Saturday morning and the downtown museums if it rains. Do the fort late morning: in by 10:45, the 11:00 cannon, Tea Room at 11:20, the 1:00 cannon on the way out.",
    deadline: "Buy at the window or online before you sail",
    cost: "Fort Mackinac adult $17.50; confirm the multi-site price at purchase",
    url: "https://www.mackinacparks.com/attraction/fort-mackinac/",
    urlLabel: "Mackinac State Historic Parks",
    verified:
      "Sept 7 – Oct 4 2026: open 9:30am–5:00pm, last admission 4:00pm. Ticket includes Historic Downtown Mackinac sites.",
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
    title: "Name everyone who might take the wheel",
    problem:
      "Gunnar is driving most of this trip — but not all of it, and there are two 300-mile days in it. Whoever takes the other stretches has to be on the agreement. An unlisted driver is a breach of the rental contract, and it can take the damage waiver down with it — including the Canadian coverage you collect at the same counter.",
    answer:
      "The booking came through Costco Travel, and Costco rentals normally include one additional driver at no charge — so this is likely free, but it still has to be done, and a name that isn't on the agreement isn't covered no matter who paid. Easiest is to add Mikaela at the counter on the 14th while you're already doing the Canada paperwork. If you'd rather not gamble on a 9pm desk being helpful, ring ahead.",
    ask: "“I'd like to add an additional driver to this reservation. It was booked through Costco Travel — is the additional driver included?”",
    phone: "800-218-7992",
    deadline: "At the counter on the 14th, or ring before",
  },
  {
    id: "monday-home",
    kind: "decide",
    dayId: "d7",
    when: "Mon 9/21",
    title: "Monday now ends at a gate, not a driveway",
    problem:
      "AA 1253 leaves O'Hare at 3:20pm and the car is contracted back at 2:30pm. Fifty minutes is not enough to return a car at the Multi-Modal Facility, ride the ATS to Terminal 3, drop bags and clear security — and Mom and her luggage have to reach Palatine first, which is 35 minutes the wrong way. Her document has Ann Arbor and Kalamazoo on this day and no idea a flight exists.",
    answer:
      "Leave Belleville by 8:00am Eastern and have the car back by 1:00pm, not 2:30. Kalamazoo is cut. Ann Arbor survives only if you cleared Belleville by 7:30 — it's 25 minutes off the line and worth 45 minutes, but the flight doesn't move for a sandwich. Decide which of those two you're doing before Sunday night, because it changes what time you set the alarm.",
    deadline: "Settle it Sunday night in Belleville",
    url: "#/ride",
    urlLabel: "Full timetable",
  },
  {
    id: "flights",
    kind: "done",
    dayId: null,
    when: "Booked 16 Aug",
    title: "Flights are booked — both of you, both directions",
    problem:
      "This used to be an open item with two anchors to satisfy. It's closed, and the answers landed differently from the guesses: the car moved to O'Hare, and the trip home got a hard deadline.",
    answer:
      "Out: AA 2358, SFO 1:29pm → ORD 8:21pm on Monday 9/14. Gunnar 18D on QPJBXO, Mikaela 19D on YBEEOU. Back: AA 1253, ORD 3:20pm → SFO 6:09pm on Monday 9/21, seats 22E and 22D. Same flights, separate records — set both to alert on schedule changes, because a change can hit one and not the other.",
    url: "#/ride",
    urlLabel: "Car & flights",
  },
  {
    id: "schnitz",
    kind: "call",
    dayId: "d1",
    when: "Tue 9/15",
    title: "Schnitz Deli doesn't publish its hours",
    problem:
      "Its 3pm close is the tightest window of Mom's four lunch options, and the hours aren't on its own site. Also note the name — Schnitz Deli, not Schnitzelbank. Two different Grand Rapids restaurants.",
    answer:
      "One call settles it. If it's a no, Blue Dog Tavern opens at 11 (no brunch, despite being on the brunch list) and both Tupelo Honey and Social Misfits open at 8 — too early to help you.",
    ask: "“What time do you close on Tuesday, and are you seating at 12:30?”",
    phone: "616-451-4444",
    deadline: "The week before",
  },
  {
    id: "kayaks",
    kind: "call",
    dayId: "d3",
    when: "Thu 9/17",
    title: "Clear-bottom kayaks — is the season even open?",
    problem:
      "Northern Michigan paddle outfitters mostly wind down in early September, and it's a cold-water activity on a day you need for driving.",
    answer:
      "One call gives you a yes or a no. If it's a yes and Mom wants it, move it to Wednesday afternoon out of Traverse City, where the day has slack — not Thursday, which doesn't.",
    ask: "“Are you still running clear-bottom trips the week of September 14th, and what's your last launch of the day?”",
    phone: "231-632-6583",
    deadline: "Early September",
  },
  {
    id: "mackinaw-dinner",
    kind: "call",
    dayId: "d3",
    when: "Thu 9/17",
    title: "Mackinaw City empties out after Labor Day",
    problem:
      "A meaningful share of the town shuts right after Labor Day, and post-season hours are not reliably updated online. You arrive around 4:15pm on a Thursday.",
    answer:
      "Anchor dinner on a year-round operator and ring it that morning. Audie's (314 N Nicolet) runs seven days, 8am–10pm. Dixie Saloon is daily and late. Bière de Mac is Wednesday to Sunday only. Eat at 5:45 and walk to Lakeside Park for the 7:48 sunset behind the bridge.",
    ask: "“Are you serving dinner tonight, and how late is the kitchen open?”",
    phone: "231-436-5744",
    deadline: "The morning of",
  },
  {
    id: "belleville-bed",
    kind: "call",
    dayId: "d6",
    when: "Sun 9/20",
    title: "Julia's, or the Hampton Inn",
    problem:
      "The last night is unresolved in Mom's document — it says “SLEEP JULIA'S / OR” and then lists a $267 hotel. That's a $267 question hanging over the end of a long day.",
    answer:
      "Settle it in advance, not en route. If Julia's is on, that's $267 saved and one less thing to arrange at 7pm. If not, re-shop the hotel — Belleville is an airport-corridor market with plenty of supply and Sunday is usually its cheapest night.",
    ask: "Ask Julia first. Then, if needed: “Do you have a room for three on Sunday September 20th, and what's your best rate?”",
    phone: "734-699-2424",
    deadline: "Two weeks out, so you can still re-shop",
  },

  // ─────────────────────────────── DO ───────────────────────────────
  {
    id: "canada-card",
    kind: "do",
    dayId: "d0",
    when: "Mon 9/14, 9:00 PM",
    title: "Say the words “we are driving this into Ontario”",
    problem:
      "Budget has to be told at pickup — five days before you actually cross. Without that conversation you may have an insurance gap at the Blue Water Bridge on the 19th, and there's no fixing it from the road. Worse now that the flights are booked: this happens at nine at night, at an airport counter, after six hours in the air.",
    answer:
      "Say it before they start typing. Ask for the Canadian Non-Resident Insurance Card by name and confirm it's physically in your hand before you leave the garage. It's free. Print backup copies from the avis.ca link in Mom's document beforehand — it's live and it does cover Budget vehicles. Two more minutes while you're standing there: photograph every panel and the fuel gauge, and write the car's plate and combined mpg onto the Car & flights page. The mpg isn't trivia — the fuel line on the Money page is computed from it.",
    deadline: "At the O'Hare counter, Monday 9pm",
    url: "#/ride",
    urlLabel: "Car & flights",
  },
  {
    id: "gummies",
    kind: "do",
    dayId: "d0",
    when: "Before you load the car",
    title: "Settle what “gummies” means",
    problem:
      "Mom's packing note lists “sleep aids (earplugs, gummies…)”. If those are THC, carrying them across either border is a federal offence in both directions regardless of what's legal on either side. It is the one thing on this trip that ends badly rather than merely inconveniently.",
    answer:
      "Melatonin only, in the labelled bottle. Then physically search the bags and the car before the bridge on the 19th — not because anyone is lying, but because a forgotten tin in a door pocket is exactly how this goes wrong.",
    deadline: "Before departure, and again before the bridge",
  },
  {
    id: "tell-the-bank",
    kind: "do",
    dayId: "d5",
    when: "Before 9/19",
    title: "Warn the bank, and carry two cards",
    problem:
      "Both crossings you might use are card-only. The Blue Water Bridge has taken no cash since April 2025, and the Detroit–Windsor Tunnel takes no cash in either currency. A card declined at a toll booth on a Saturday evening is a genuinely bad twenty minutes.",
    answer:
      "Tell the card issuer you'll be in Ontario Sept 19–20. Make sure at least two of you carry a chip credit card that works internationally and won't get flagged after two days of Canadian charges. Keep one in the driver's door pocket on approach.",
    deadline: "The week before",
  },
  {
    id: "early-start",
    kind: "do",
    dayId: "d1",
    when: "Tue 9/15, dawn",
    title: "Leave Palatine at 6:45 Tuesday — not 5:30",
    problem:
      "Tuesday is the longest driving day, it opens with the Borman Expressway through Hammond and Gary, and you lose an hour to Eastern time before lunch. The old advice was a 6:00am start with 5:30 as the stretch goal — written before the flights were booked. AA 2358 doesn't land until 8:21pm Monday, and Palatine is a 9pm rental counter plus 35 minutes away.",
    answer:
      "6:45am Central, against an 11:30 Meyer May tour. That's roughly seven hours in bed instead of five, still clears the Borman ahead of the worst of the eastbound peak, and puts you in Grand Rapids just after 11:00 Eastern. Pack the car when you get in Monday night, so the morning is coffee and go.",
    deadline: "Monday night",
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
    title: "Both Ludington lighthouses really are shut on your Tuesday",
    problem:
      "Mom flagged “closed M-W” herself, and the itinerary still arrives on a Tuesday. This one is real and there's no way around it.",
    answer:
      "Accept it — you can't open a lighthouse on a Tuesday. Walk the north breakwall anyway: free, public, open when the tower isn't, and it is the view. Half a mile out into Lake Michigan with the sun going down at 7:57. Drop Big Sable from this trip entirely — it's closed, it's 3.6 miles round trip rather than the 1.5 in the document, and it needs a state park pass on top.",
    verified:
      "North Breakwater, fall hours Sept 10–27 2026: Thu–Sun 10–5. Big Sable Point, Sept 10 – Oct 25: Thu–Sun 10–5. Both switch to Thursday–Sunday from Sept 10. An American flag on the tower means it's open; it won't be flying.",
    source: { name: "Lakeshore Keepers", url: "https://lakeshorekeepers.org/ludington-north-breakwater/" },
  },
  {
    id: "port-museum",
    kind: "done",
    dayId: "d1",
    when: "Tue 9/15",
    title: "The maritime museum conflict is resolved — it's open Tuesday",
    problem:
      "This app previously said two sources disagreed: the operator claiming Tue 10–5, a secondary listing claiming 12–7. That was left as “call before you count on it.”",
    answer:
      "The operator is right. Port of Ludington Maritime Museum is Tuesday–Saturday 10:00–5:00, last admission 4:30, April through November. So it works on your Tuesday — but only if you take the Short Day option and reach Ludington by about 4:00. On the Full Day you'll arrive at 6:30 and it'll be shut. No phone call needed.",
    verified: "Tue–Sat 10am–5pm, last admission 4:30pm, April–November season.",
    source: { name: "Port of Ludington Maritime Museum", url: "https://ludingtonmaritimemuseum.org/" },
  },
  {
    id: "white-pine",
    kind: "done",
    dayId: "d1",
    when: "Tue 9/15",
    title: "White Pine Village isn't closed for the season — the clock is the problem",
    problem: "Mom guessed it might be seasonally shut. It isn't.",
    answer:
      "Open Tuesdays through October 17, but last tickets are 3:30pm against a two-hour visit, and it's three miles south of the inn. That makes it a straight either/or with Grand Rapids rather than a bonus — a decision you make that morning, not a “see if we have time.”",
    verified: "May 3 – Oct 17 2026, Tue–Sat 10am–5pm, last ticket sales 3:30pm, allow two hours.",
    source: { name: "Historic White Pine Village", url: "http://historicwhitepinevillage.org/" },
  },
  {
    id: "sleeping-bear-hours",
    kind: "done",
    dayId: "d2",
    when: "Wed 9/16",
    title: "Two hours at Sleeping Bear isn't survivable — budget 3.5",
    problem:
      "Mom's document contradicts itself: the header says 2 hours, the subhead says “for less than 3 hour visit.” The Pierce Stocking drive alone is about two hours with all twelve stops.",
    answer:
      "Budget 3.5 hours on the ground. It absorbs easily — Traverse City is only 36 minutes away, so arriving 9:30 and leaving 1:30 still gets you checked in mid-afternoon. Cut Loon Lake, skip Pierce Stocking stops 4–8 and 12. Stop 9 is the Lake Michigan Overlook and the one everybody has seen.",
    verified: "The park's own FAQ puts the scenic drive at a 1.5–2 hour minimum on its own.",
    source: { name: "NPS — Pierce Stocking Scenic Drive", url: "https://www.nps.gov/slbe/planyourvisit/pssd.htm" },
  },
  {
    id: "dune-climb",
    kind: "done",
    dayId: "d2",
    when: "Wed 9/16",
    title: "Agree the Dune Climb turnaround before anyone starts walking",
    problem:
      "The full Dunes Trail to Lake Michigan is 3.5 miles round trip, rated strenuous, 3–4 hours, over nine unshaded sand hills. The Park Service says it has worn out experienced hikers and runs searches every summer for people who underestimated it. From the top of the first hill you see Little Glen Lake, not Lake Michigan — which is exactly what pulls people into one more dune.",
    answer:
      "First hill only, then turn around. Fifteen to twenty-five minutes up, and gravity handles the descent. Mom can stay at the picnic tables at the base with a full view of the climb. Two litres of water each even for the short version, and closed shoes — buried dune-grass shoots will stab bare feet.",
  },
  {
    id: "glen-haven",
    kind: "done",
    dayId: "d2",
    when: "Wed 9/16",
    title: "Glen Haven's museums closed on Labor Day — the walk didn't",
    problem:
      "The Coast Guard Station Maritime Museum and all the Glen Haven interiors — general store, cannery, blacksmith — run Memorial Day to Labor Day only. You're nine days past. The 3pm breeches-buoy rescue re-enactment is summer-only too.",
    answer:
      "Don't budget museum time; make it a 20–30 minute exterior walk. The building facades, the outdoor wayside exhibits, and the boardwalk down to Glen Haven Beach — the flattest, easiest Lake Michigan toe-dip in the park, steps from the car. Give the recovered hour to the Empire Bluff Trail.",
    source: { name: "NPS — Glen Haven", url: "https://www.nps.gov/slbe/planyourvisit/glenhaven.htm" },
  },
  {
    id: "mission-point",
    kind: "done",
    dayId: "d2",
    when: "Wed 9/16",
    title: "Mission Point Lighthouse — open Wednesday, $8 to climb",
    problem:
      "Third-party sites still quote an old $5 fee, and it's easy to assume a lighthouse at the end of a dead-end road keeps loose hours.",
    answer:
      "Open 10–5 daily except Tuesdays, so your Wednesday works — but it's 18 miles and 35 minutes north of town, so make it the turnaround point of the winery run rather than a separate trip. Drive to the tip first, then work back south. If you're too late for the tower, the park itself is free and open until 10pm.",
    verified: "$8 for ages 13+, $2 for ages 6–12, free under 5. Open May–October, 10am–5pm, closed Tuesdays.",
    source: { name: "Mission Point Lighthouse", url: "https://www.missionpointlighthouse.com/" },
  },
  {
    id: "castle-farms",
    kind: "done",
    dayId: "d3",
    when: "Thu 9/17",
    title: "Castle Farms closes at 5 in September, not 4",
    problem:
      "This app previously said its two official pages disagreed and told you to be through the gate by 2:30 at the latest.",
    answer:
      "September hours are 10:00–5:00, which is an hour more slack than assumed. Self-guided admission is $8 adult, $7 senior 65+, $5 child. Still allow 90 minutes. And if it's a choice between this and the Mushroom Houses, take the Mushroom Houses — they're free and there is nothing else like them anywhere.",
    verified: "September 10am–5pm; self-guided $8 / $7 / $5.",
    source: { name: "Visit Charlevoix", url: "https://www.visitcharlevoix.com/CastleFarms/" },
  },
  {
    id: "stone-beaches",
    kind: "done",
    dayId: "d3",
    when: "Thu 9/17",
    title: "Three of the five stone beaches are the wrong direction",
    problem:
      "Bryant Park (Traverse City), Van's Beach (Leland) and Peterson Park (Northport) are all on the Leelanau Peninsula — west and south of where you start, which is backwards on a day heading north.",
    answer:
      "Magnus Park, 901 W Lake St, Petoskey. Free, city-run so no state park pass, a thousand feet of rocky Little Traverse Bay shoreline, five minutes from where you'll eat lunch. One stop, zero detour. Pack a spray bottle — the hexagonal coral pattern only shows when the stone is wet. Mid-September is the weak season, so treat it as a beach walk with a bonus; the Gaslight District shops sell polished ones as a fallback.",
  },
  {
    id: "michilimackinac",
    kind: "done",
    dayId: "d3",
    when: "Thu 9/17 → Sat 9/19",
    title: "The fort doesn't fit Thursday evening — move it to Saturday morning",
    problem:
      "Colonial Michilimackinac and the Old Mackinac Point Lighthouse both stop admitting in the late afternoon. Arriving around 4:15pm means you're not getting into either properly.",
    answer:
      "Do Colonial Michilimackinac on Saturday at the 9:30 opening instead, out by 11:15, and you still reach Frankenmuth about 2:15. It uses the multi-site ticket you'll already have bought for Fort Mackinac. Thursday evening becomes dinner at 5:45 and the 7:48 sunset from Lakeside Park, two minutes from the motel door.",
    verified:
      "Also confirmed: Historic Mill Creek — now rebranded Dousman's Mill — will not open at all in 2026 because of construction delays on the new visitor centre. It reopens May 2027. Don't buy a ticket for it from a reseller.",
    source: {
      name: "Mackinac State Historic Parks",
      url: "https://www.mackinacparks.com/historic-mill-creek-discovery-park-hours-admission/",
    },
  },
  {
    id: "ferry-facts",
    kind: "done",
    dayId: "d4",
    when: "Fri 9/18",
    title: "The ferry number in the document belongs to the competitor",
    problem:
      "800-638-9892 is Arnold Transit / Mackinac Island Ferry Company — Shepler's direct rival. Ringing it about your Shepler's booking or the Shepler's shuttle gets you nowhere.",
    answer:
      "Shepler's Mackinaw City is 231-436-5023. Easier still: ask the motel front desk to book the shuttle the night before for about 6:20am — they do it routinely, and the motel is 0.4 miles from the dock, well inside the 1.5-mile shuttle radius. Shepler's asks for 45 minutes before departure, not the 30 in the document.",
    verified:
      "September 8 – October 4 departures from Mackinaw City: 7:00, 7:30, 8:00, 8:30, 9:00, 9:30, then half-hourly. Mom's 7:30 boat exists. Last return from the island is 7:00pm.",
    phone: "231-436-5023",
    source: { name: "Shepler's 2026 schedule", url: "https://www.sheplersferry.com/mackinaw-city-schedule/" },
  },
  {
    id: "ferry-parking",
    kind: "done",
    dayId: "d4",
    when: "Fri 9/18",
    title: "Ferry parking: $15 at the dock, or free half a mile away",
    problem:
      "Mom's document budgets $10. The dock lot is $15 a day and can't be prepaid, which is a small annoyance at 6:40am.",
    answer:
      "There is a free day lot at 311 S. Nicolet Street, across from I-75 Exit 338, with a tram to the dock — for a day trip that's $15 back in your pocket for about ten minutes of faff. If you use the dock lot instead, you pay on exit by QR code on the gate ticket, so keep the ticket. Either way, don't leave the car overnight: overnight rates run $50–75 a night.",
    verified: "Day parking $15 at the dock; free day lot at 311 S. Nicolet St with tram service. Passes valid Apr 21 – Oct 31 2026.",
    source: { name: "Shepler's — directions & parking", url: "https://www.sheplersferry.com/mackinaw-city-directions/" },
  },
  {
    id: "fort-timing",
    kind: "done",
    dayId: "d4",
    when: "Fri 9/18",
    title: "Fort Mackinac's last admission is 4:00pm, not evening",
    problem:
      "Three hours earlier than the summer schedule most people remember. Putting the fort late in the day, as the shape of Mom's plan implies, means missing it.",
    answer:
      "Fort in the late morning, Grand Hotel in the afternoon — the Grand closes admissions at 6:00, which is a much softer deadline. Afternoon Tea in the Parlor runs 3:30–5:00. Dress code applies even in daylight: no sleeveless shirts, cut-offs or sweatpants. It's a 15–20 minute uphill walk from town, or $9 a head for the horse-drawn taxi, cash.",
    verified: "Sept 7 – Oct 4 2026: 9:30am–5:00pm, last admission 4:00pm.",
    source: { name: "Mackinac State Historic Parks", url: "https://www.mackinacparks.com/attraction/fort-mackinac/" },
  },
  {
    id: "oktoberfest-gate",
    kind: "done",
    dayId: "d5",
    when: "Sat 9/19",
    title: "Oktoberfest has a gate fee Mom's budget doesn't carry",
    problem: "The document doesn't mention the festival at all, so it doesn't cost it either.",
    answer:
      "$10 per person per day at the gate, 15 and under free — so $30 for the three of you if you go in. Small, but it's real money that isn't in the budget page. Frankenmuth itself costs you nothing geographically: it's on the I-75 line you're already driving, so the scarce resource on Saturday is hours there, not miles.",
    verified: "Sept 17–20 2026; Sat 9/19 noon–midnight; $10 per person per day at the gate.",
    source: { name: "Frankenmuth CVB", url: "https://www.frankenmuth.org/events/frankenmuth-oktoberfest1/" },
  },
  {
    id: "cut-stop-two",
    kind: "done",
    dayId: "d5",
    when: "Sat 9/19",
    title: "Cut the Midland / Saginaw / Flint / Howell stop",
    problem:
      "This is what actually breaks Saturday, not the base route. And Howell isn't on the way in any sense — it's down near Brighton, a long way south of the line to Sarnia.",
    answer:
      "Delete Stop 2 and give the time to Frankenmuth, which is the real destination. If someone insists on one extra, make it Flint: the Flint Institute of Arts sits on the I-69 corridor you're driving anyway and is free on Saturdays, 10–5. And Monday already routes through Ann Arbor and Kalamazoo, which scratch the charming-downtown itch better and for nothing.",
  },
  {
    id: "belle-isle",
    kind: "done",
    dayId: "d6",
    when: "Sun 9/20",
    title: "Belle Isle needs a $12 pass the rental won't have",
    problem:
      "Belle Isle is a Michigan state park. Vehicle entry needs a Recreation Passport, and on Illinois plates that's the non-resident rate. Mom's document never mentions it.",
    answer:
      "$12 for the day, card accepted at the booth — and unusually, Belle Isle is exempt from the $5 convenience fee that applies everywhere else. The aquarium itself is free (a $5 donation is suggested), and the Conservatory next door and the Scott Fountain are the same trip. Thursday–Sunday 10–4, so your Sunday works — but only under Plan A.",
    verified:
      "Michigan DNR: non-resident daily Recreation Passport $12, annual $42. The $5 convenience fee explicitly does not apply at Belle Isle Park. Aquarium Thu–Sun 10am–4pm.",
    source: { name: "Michigan DNR", url: "https://www.michigan.gov/dnr/buy-and-apply/rec-pp" },
  },
  {
    id: "m1-wrong",
    kind: "done",
    dayId: "d6",
    when: "Sun 9/20",
    title: "“Follow M1 to take the Tunnel” is wrong",
    problem:
      "M-1 is Woodward Avenue, in Detroit. It is not how you get to the tunnel from the Ontario side, and following it could put you at the wrong crossing entirely.",
    answer:
      "For the TUNNEL: stay on Highway 401 into Windsor, then E.C. Row or down to Riverside Drive, and follow downtown tunnel signage toward Goyeau/Park St E. It surfaces at Jefferson and Randolph, one block from Hart Plaza and four from The Belt. For the BRIDGE: Highway 3 / Huron Church Road. Set the GPS to the crossing itself, never to “Detroit.”",
  },
  {
    id: "tunnel-payment",
    kind: "done",
    dayId: "d6",
    when: "Sun 9/20",
    title: "The tunnel takes no cash — and your car will fit",
    problem:
      "An earlier draft of this app told you to check the rental's height against a tunnel restriction. That was over-cautious.",
    answer:
      "Clearance is 12 feet 8 inches. No passenger car, SUV or minivan comes close, so forget it. What does matter: cash is not accepted in either currency — card, or the tunnel's own app. If you specifically want to dump leftover Canadian cash, the Ambassador Bridge takes CAD, but it's dearer and drops you on I-75 instead of downtown.",
    verified: "Detroit–Windsor Tunnel: cash not accepted; card, NEXPRESS or app. Clearance 12'8\". Passenger toll rose to $9 USD in January 2026.",
    source: { name: "Detroit Windsor Tunnel", url: "https://www.dwtunnel.com/toll-rates/" },
  },
  {
    id: "blue-water-cashless",
    kind: "done",
    dayId: "d5",
    when: "Sat 9/19",
    title: "The Blue Water Bridge has been cashless since April 2025",
    problem: "No attendant takes cash, in either direction. Turning up with bills doesn't work.",
    answer:
      "Visa, Mastercard, Amex, Discover, Apple Pay and Google Pay all work. US-bound is $7 CAD for a passenger car; the Federal Bridge Corporation held rates flat for the year beginning April 2026, so that figure should still be good in September. Pair this with the card warning above.",
    verified: "Cashless since 1 April 2025. 2026 toll rates confirmed unchanged following the annual review in March 2026.",
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
    title: "Stones 'N Bones really can't be entered before 11:00",
    problem:
      "One listing site claims Wednesday–Sunday from 10am, which would have loosened Sunday considerably. It's wrong.",
    answer:
      "The museum's own page says Friday to Sunday, 11:00–5:00. So Mom's document is right and the 11am start is real — which is precisely why it's the thing that breaks Sunday. Skipping it buys back about three and a half hours. It's $7 CAD for adults, $3 under 12. If Mom wants it, that's a legitimate reason to keep it, but she should make the trade knowingly, because it costs Windsor or Detroit.",
    verified: "Operator's own site: Fri–Sun 11am–5pm. Adults $7 CAD, children under 12 $3.",
    phone: "519-336-2100",
    source: { name: "Stones 'N Bones Museum", url: "https://www.stonesnbones.ca/visit-us.html" },
  },
  {
    id: "the-belt",
    kind: "done",
    dayId: "d6",
    when: "Sun 9/20",
    title: "The Belt is twenty minutes, not an afternoon",
    problem:
      "It reads on the document like a destination. It's a former garment-district alley turned outdoor gallery — genuinely good, and small.",
    answer:
      "Budget twenty minutes and don't build the day around it. Standby, the bar in the alley, doesn't open until 5:00pm on Sundays. If meeting Emma matters, pin that time first and build backwards from it — Dime Store at 719 Griswold is three blocks away and serves until 3.",
  },
  {
    id: "borman-home",
    kind: "done",
    dayId: "d7",
    when: "Mon 9/21",
    title: "Time the Borman, or it costs you an hour",
    problem:
      "The I-94/I-80/I-294 corridor through Gary and Hammond is the worst stretch of the whole trip and it's the last one.",
    answer:
      "Leave Belleville by 9:00am Eastern. That puts you through north-west Indiana early-to-mid afternoon Central, ahead of the worst of it. The Indiana Toll Road is the alternative if live traffic looks bad — worth the toll on a bad day. And you gain the hour back today: Michigan is Eastern, Illinois is Central, so a nine-hour clock day is really eight.",
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
