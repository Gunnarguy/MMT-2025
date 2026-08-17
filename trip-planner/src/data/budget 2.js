/**
 * What the trip actually costs.
 *
 * Mom's document has a KNOWN EXPENSES block (car, hotels, park pass, ferry,
 * bikes) and then an OTHER EXPENSES block reading "Food / Gas—MINE! / ???".
 * The ??? is the biggest number in the whole trip. This file fills it in.
 *
 * Two rules held throughout:
 *   - `estimate: true` means nobody quoted this — it's a defensible guess and
 *     the table labels it as one. Everything else traces to a real quote.
 *   - `payer: "mom"` marks the lines Mom wrote "MINE!" beside. Those are
 *     excluded from the three-way split rather than quietly folded in.
 *
 * Lodging figures match `lodging.js`. The Belleville night is `provisional`
 * because it only happens if they don't stay at Julia's.
 */

export const BUDGET = {
  items: [
    // ── Lodging ────────────────────────────────────────────────────────────
    {
      label: "Summer's Inn, Ludington",
      note: "1 night, 9/15. Mom's recorded rate; not published anywhere public",
      category: "Lodging",
      total: 155,
      estimate: true,
    },
    {
      label: "Brio Beach Inn, Traverse City",
      note: "1 night, 9/16. Quoted only through their own booking engine",
      category: "Lodging",
      total: 245,
      estimate: true,
    },
    {
      label: "Lighthouse View Motel, Mackinaw City",
      note: "2 nights, 9/17–9/18. Confirm whether $298 is the total or the nightly rate",
      category: "Lodging",
      total: 298,
      estimate: true,
    },
    {
      label: "Four Points Sarnia, Point Edward ON",
      note: "1 night, 9/19. CA$169 + 4% accommodation tax + 13% HST ≈ CA$199 ≈ US$142, call it $148 after a card's foreign-transaction fee",
      category: "Lodging",
      total: 148,
      estimate: true,
    },
    {
      label: "Hampton Inn Detroit / Belleville",
      note: "1 night, 9/20 — only if you don't stay at Julia's. High for a Belleville Sunday; worth re-shopping",
      category: "Lodging",
      total: 267,
      estimate: true,
      provisional: true,
    },

    // ── Transport ──────────────────────────────────────────────────────────
    {
      label: "Budget rental car, 8 days",
      note: "Booked. Pick-up Monday 9/14, 7pm",
      category: "Transport",
      total: 368,
      payer: "mom",
    },
    {
      label: "Fuel",
      note: "≈1,430 miles at ~28 mpg and a blended $4.10/gal. An SUV at 24 mpg pushes this to ~$245",
      category: "Transport",
      total: 210,
      estimate: true,
      payer: "mom",
    },
    {
      label: "Shepler's ferry to Mackinac Island",
      note: "Already purchased. $39 each plus Shepler's $2-per-ticket booking fee",
      category: "Transport",
      total: 123,
    },
    {
      label: "Ferry day parking",
      note: "$15, not the $10 in the document — but likely $0, since the motel is inside Shepler's free 1.5-mile shuttle radius",
      category: "Transport",
      total: 15,
      estimate: true,
    },
    {
      label: "Tolls and bridges",
      note: "Blue Water Bridge ~CA$7, Detroit–Windsor Tunnel $8.25, Illinois and Indiana tollways ~$20 on the run home. All cashless — bring a card",
      category: "Transport",
      total: 35,
      estimate: true,
    },

    // ── Tickets & entry ────────────────────────────────────────────────────
    {
      label: "Sleeping Bear Dunes vehicle pass",
      note: "7-day pass, $25. Buy it on recreation.gov beforehand — the park is cashless and cell service is unreliable",
      category: "Tickets & entry",
      total: 25,
      payer: "mom",
    },
    {
      label: "Meijer Gardens + Chihuly",
      note: "3 adults general admission ~$66, plus 3 × $9 for the separately ticketed indoor Radiant Forms gallery",
      category: "Tickets & entry",
      total: 93,
      estimate: true,
    },
    {
      label: "Fort Mackinac",
      note: "3 × $17.50. Also covers Biddle House, the Manoogian Art Museum, the blacksmith shop and the Beaumont Museum downtown",
      category: "Tickets & entry",
      total: 53,
    },
    {
      label: "Mackinac Island bike rental",
      note: "3 bikes, ~2.5 hours at $18/hr. Mom's '$18 ea' buys one hour each, not the day — the perimeter loop needs about two",
      category: "Tickets & entry",
      total: 135,
      estimate: true,
    },
    {
      label: "Grand Hotel admission",
      note: "3 × ~$14, only if you go up. Add $9 each cash for the horse taxi if nobody wants the uphill walk",
      category: "Tickets & entry",
      total: 42,
      estimate: true,
    },
    {
      label: "Michigan Recreation Passport, non-resident",
      note: "$12 per day pass on an out-of-state plate. Needed for Belle Isle on 9/20, and again for any state park along the way",
      category: "Tickets & entry",
      total: 24,
      estimate: true,
    },
    {
      label: "The Henry Ford Museum",
      note: "3 × ~$36 plus service and parking fees — only if Sunday goes to Dearborn. Seniors get 10% off. Skip it and this line is $0",
      category: "Tickets & entry",
      total: 120,
      estimate: true,
    },
    {
      label: "Smaller admissions",
      note: "Stones 'N Bones in Sarnia (CA$7 each), Old Mackinac Point Lighthouse, Colonial Michilimackinac, Castle Farms — pick two or three, not all",
      category: "Tickets & entry",
      total: 60,
      estimate: true,
    },

    // ── Food ───────────────────────────────────────────────────────────────
    {
      label: "Food, all eight days",
      note: "$65 per person per day. Covers hotel-adjacent breakfasts, casual lunches, one Frankenmuth chicken dinner and a couple of real sit-downs. This is the line Mom's document left as '???'",
      category: "Food",
      total: 1560,
      estimate: true,
    },

    // ── Contingency ────────────────────────────────────────────────────────
    {
      label: "Contingency",
      note: "Weather reroutes, a kayak rental, fudge, a bottle of Traverse City wine, the thing nobody planned for",
      category: "Contingency",
      total: 200,
      estimate: true,
    },
  ],

  flags: [
    {
      level: "warn",
      title: "Food was the whole missing number",
      body:
        "Mom's document totals about $1,660 of known expenses and then lists food with no figure at all. At a realistic $65 per person per day, food is roughly $1,560 — bigger than every hotel on the trip combined and nearly as large as everything else she did budget. Nothing is wrong with her arithmetic; the line was simply never filled in.",
      fix: "Agree up front how food gets settled — one card that everyone squares up at the end is far less friction over eight days than splitting each check.",
    },
    {
      level: "warn",
      title: "Three of the five hotel rates are unverified",
      body:
        "Summer's Inn, Brio Beach Inn and the Lighthouse View Motel all quote only through their own booking engines, and none publishes a rate for mid-September 2026. The figures here are Mom's, carried forward. The Mackinaw number is the ambiguous one: $298 reads like a two-night total, but nothing confirms that, and if it's nightly the trip is $298 more expensive than this page says.",
      fix: "One phone call per property settles the rate, the room type and whether three adults are actually on the reservation. The Stays page has the numbers.",
    },
    {
      level: "info",
      title: "Mom is carrying about $600 beyond her share",
      body:
        "The car, the gas and the Sleeping Bear pass are marked \"MINE!\" in her document — roughly $603 on top of an even split. That's worth saying out loud rather than letting it sit unremarked in a spreadsheet, particularly since the gas figure never appeared in her budget at all.",
    },
    {
      level: "info",
      title: "The optional lines are genuinely optional",
      body:
        "The Henry Ford, the Grand Hotel and the smaller admissions add about $220 and none of them is load-bearing. Sunday works without Dearborn; Friday works without going up to the Grand. If money gets tight, that's where the slack is — not in the hotels, which are already booked.",
    },
  ],
};

/**
 * The one place trip totals are computed. Both the Money page and the Overview
 * headline read from here, so the two can't drift apart.
 */
export function budgetTotals({ includeProvisional = false } = {}) {
  const items = BUDGET.items.filter((i) => includeProvisional || !i.provisional);
  const total = items.reduce((n, i) => n + i.total, 0);
  const momOnly = items
    .filter((i) => i.payer === "mom")
    .reduce((n, i) => n + i.total, 0);
  const shared = total - momOnly;
  return { items, total, momOnly, shared, perPerson: shared / 3 };
}

export const SPLIT_NOTE =
  "Shared costs divide three ways. The lines marked \"Mom's\" are the ones she wrote MINE! beside in her document — the car, the gas and the park pass — and they sit outside the split entirely. The Belleville hotel is off by default, since the plan is Julia's; the checkbox above adds it back.";

export const FX = {
  usdPerCad: 0.72,
  checked: "August 8, 2026",
  sampleCad: 199,
  sampleUsd: 143,
  sampleNote: "CA$169 room + 4% Point Edward accommodation tax + 13% HST",
  note:
    "One night in Ontario, so this barely matters — but it matters twice at the terminal. When a Canadian card machine offers to charge you in US dollars, always decline and pay in Canadian dollars: that offer is dynamic currency conversion and it costs 3–10% versus the card network's own rate. And re-check this rate before you go, because the Canadian dollar has moved about 1.7% in the last month alone.",
  source: "Bank of Canada — daily exchange rates",
  sourceUrl: "https://www.bankofcanada.ca/rates/exchange/daily-exchange-rates/",
};
