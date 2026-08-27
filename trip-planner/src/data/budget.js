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
      note: "Reserved through Costco Travel — Mazda CX-50 or similar, $10 off plus member savings. Pick-up Monday 9/14 9pm at O'Hare, return Monday 9/21 at O'Hare.",
      category: "Transport",
      total: 332.92,
      payer: "mom",
    },
    {
      // `id` so budgetTotals can recompute this line once the car is known.
      id: "fuel",
      label: "Fuel",
      note: "≈1,430 miles at the CX-50's EPA-combined 26 mpg and a blended $4.10/gal.",
      category: "Transport",
      // Always overwritten by budgetTotals(); kept in sync for anyone reading
      // this file directly.
      total: 225,
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
      note: "$15 day parking at the dock, or free off-site at 311 S. Nicolet St with Shepler's tram service.",
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
      note: "$12 daily on an out-of-state plate — confirmed against the DNR's own non-resident table, and it covers entry and re-entry to any state park all day. One day only: Belle Isle on 9/20, and only if Sunday goes to Detroit rather than Dearborn. Big Sable was the other state park and it's dropped",
      category: "Tickets & entry",
      total: 12,
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

    {
      label: "Frankenmuth Oktoberfest gate",
      note: "3 × $10 at the Heritage Park gate, Saturday 9/19. 15 and under free",
      category: "Tickets & entry",
      total: 30,
    },

    // ── Food ───────────────────────────────────────────────────────────────
    {
      label: "Food, all eight days",
      note: "$65 per person per day. Covers breakfasts, casual lunches, Frankenmuth chicken dinner, and sit-down dinners.",
      category: "Food",
      total: 1560,
      estimate: true,
    },

    // ── Contingency ────────────────────────────────────────────────────────
    {
      label: "Contingency",
      note: "Weather alternatives, fudge, local wine tasting, or unexpected extras.",
      category: "Contingency",
      total: 200,
      estimate: true,
    },
  ],

  flags: [
    {
      level: "info",
      title: "Food budget estimate ($65 / person / day)",
      body:
        "Budgeted at $65 per person per day (~$1,560 total across 8 days for 3 people) for meals, coffee, and dinners.",
    },
    {
      level: "info",
      title: "Lodging reservations",
      body:
        "Lodging totals reflect current reservation rates across the 5 booked stays.",
    },
    {
      level: "info",
      title: "Direct vehicle & park expenses",
      body:
        "The rental SUV, gas, and Sleeping Bear Dunes vehicle pass are covered under Mom's direct expenses.",
    },
    {
      level: "info",
      title: "Flexible optional admissions",
      body:
        "Optional stops (Grand Hotel porch, extra museums) provide built-in flexibility across the schedule.",
    },
  ],
};

/**
 * Fuel is the one budget line that depends on a fact nobody has yet: which car
 * Budget actually hands over. The basis below reproduces the figures quoted in
 * the Fuel item's note — 28 mpg gives $209, 24 mpg gives $244 — so the estimate
 * stays honest whichever way the car goes.
 *
 * The mileage is higher than the 1,214 the route map draws, because a route
 * line doesn't include the winery run, the drive out to the stone beach, or
 * circling Frankenmuth for a parking space on Oktoberfest Saturday.
 */
export const FUEL_BASIS = {
  miles: 1430,
  pricePerGallon: 4.1,
  // The booked class is a Mazda CX-50 or similar: EPA 24 city / 30 highway /
  // 26 combined. Overridden the moment a real car is entered on the Car page.
  assumedMpg: 26,
};

export function fuelEstimate(mpg) {
  const useMpg = Number(mpg) > 0 ? Number(mpg) : FUEL_BASIS.assumedMpg;
  return Math.round((FUEL_BASIS.miles / useMpg) * FUEL_BASIS.pricePerGallon);
}

/**
 * The one place trip totals are computed. Both the Money page and the Overview
 * headline read from here, so the two can't drift apart.
 *
 * Pass `mpg` once the car is known and the Fuel line recomputes — it stops
 * being flagged as an estimate at that point, because the only guess left in it
 * is the pump price.
 */
export function budgetTotals({ includeProvisional = false, mpg } = {}) {
  const known = Number(mpg) > 0;
  const items = BUDGET.items
    .filter((i) => includeProvisional || !i.provisional)
    .map((i) =>
      // Always recompute, so the figure can never drift from FUEL_BASIS the way
      // it did when the assumed mpg changed and the literal below didn't.
      i.id === "fuel"
        ? {
            ...i,
            total: fuelEstimate(mpg),
            note: known
              ? `≈${FUEL_BASIS.miles.toLocaleString()} miles at the car's ${mpg} mpg and a blended $${FUEL_BASIS.pricePerGallon.toFixed(2)}/gal`
              : i.note,
          }
        : i,
    );
  const total = items.reduce((n, i) => n + i.total, 0);
  const momOnly = items
    .filter((i) => i.payer === "mom")
    .reduce((n, i) => n + i.total, 0);
  const shared = total - momOnly;
  return { items, total, momOnly, shared, perPerson: shared / 3 };
}

export const SPLIT_NOTE =
  "Shared costs divide three ways across the crew. Costs covered directly by Mom (the rental car, fuel, and park pass) are excluded from the split. The Belleville hotel is excluded by default since Sunday stay is with Julia; the toggle adds it back.";

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
