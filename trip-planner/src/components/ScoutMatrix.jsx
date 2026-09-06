import { useMemo } from "react";
import { SCOUT_DIMENSIONS, SCOUT_TIERS } from "../data/relocation";
import { useLocalState } from "../hooks/useLocalState";
import { CAMPBELL, daylightFor, fmtHours } from "../lib/daylight";
import { money, takeHome } from "../lib/money";
import { SCENARIOS } from "./YourMoney";
import { BUDGET_LINES, DEFAULT_BUDGET } from "./YourMonth";

/**
 * The decision matrix: every town as a row, Campbell pinned on top as the
 * baseline, every researched figure as a sortable column. Cells are heat-tinted
 * by rank within their column (green = better end, red = worse), and "vs
 * Campbell" turns each cell into a signed difference from home. The cards
 * further down hold the prose and sources; this is where the comparison lives.
 */

/* ---------- parsing the researched strings ---------- */
const KM = 0.621371;
const num = (s, re) => {
  const m = String(s ?? "").match(re);
  return m ? Number(String(m[1]).replace(/,/g, "")) : null;
};
function milesOf(s) {
  const str = String(s ?? "");
  const mi = str.match(/(\d+(?:\.\d+)?)(?:\s*[-–]\s*\d+(?:\.\d+)?)?\s*(?:mi|miles?)\b/i);
  if (mi) return Number(mi[1]);
  const km = str.match(/(\d+(?:\.\d+)?)(?:\s*[-–]\s*\d+(?:\.\d+)?)?\s*km\b/i);
  if (km) return Math.round(Number(km[1]) * KM * 10) / 10;
  return null;
}
function hoursOf(s) {
  const str = String(s ?? "");
  const hm = str.match(/(\d+):(\d\d)/);
  if (hm) return Number(hm[1]) + Number(hm[2]) / 60;
  const h = str.match(/(\d+(?:\.\d+)?)\s*(?:hrs?|hours?|h)\b/i);
  const mn = str.match(/(\d+)\s*min/i);
  if (h) return Number(h[1]) + (mn ? Number(mn[1]) / 60 : 0);
  if (mn) return Number(mn[1]) / 60;
  return null;
}
const AMZ = { 1: "Same-day", 2: "Next-day", 3: "2-day", 4: "3–5 days" };
function amazonRank(s) {
  if (!s) return null;
  const ranks = String(s)
    .toLowerCase()
    .split(/;|\. /)
    .filter((c) => !/occasionally|virtually|impossible|not available|suspended|\bno\b/.test(c))
    .map((c) => (/same[- ]day/.test(c) ? 1 : /next[- ]day|1[-–]2 days?|prime is 1/.test(c) ? 2 : /2[- ]day|two[- ]day/.test(c) ? 3 : 4));
  return ranks.length ? Math.min(...ranks) : 4;
}
const findRow = (wk, section, re) => (wk?.[section] || []).find(([k]) => re.test(k))?.[1] ?? null;
const findRowWith = (wk, section, re, pred) => ((wk?.[section] || []).find(([k, v]) => re.test(k) && pred(v)) || [])[1] ?? null;
const mid = (a, b) => (b ? (Number(a) + Number(b)) / 2 : Number(a));

function rowFor(t, { r, est, match, isHome, budgetTotal }) {
  const wk = t.workup || {};
  const c = t.costs || {};
  const a = t.climate?.annual || {};
  const day = isHome ? CAMPBELL : daylightFor(t.coords[0], t.coords[1]);
  const crime = String(t.crime || "").match(/([\d.]+)(?:[–-]([\d.]+))?\s*\/\s*([\d.]+)(?:[–-]([\d.]+))?/);
  const pop = findRow(wk, "demographics", /population/i);
  const popNums = (pop || "").match(/\d{1,3}(?:,\d{3})+|\d{4,}/g) || [];
  const airport = findRowWith(wk, "airport", /airport/i, (v) => milesOf(v) != null) || findRow(wk, "airport", /airport/i);
  const amazon = findRow(wk, "shipping", /amazon delivery|amazon/i);
  const er = findRow(wk, "healthcare", /nearest er|^er\b|emergency/i);
  const costco = findRow(wk, "errands", /costco/i);
  const comfortK = num(t.comfort, /\$(\d+)k/);
  const walkText = ((wk.lifestyle || []).find(([k, v]) => /walk/i.test(k) || /walk/i.test(v)) || [])[1] ?? null;
  const walk = (() => {
    if (!walkText || /not found/i.test(walkText)) return null;
    const m = walkText.match(/walk\s*score:?\s*(\d+)/i) || walkText.match(/\b(\d+)s\b/) || walkText.match(/\b(\d{1,3})\b/);
    const n = m ? Number(m[1]) : null;
    return n != null && n <= 100 ? n : null;
  })();
  return {
    t,
    isHome,
    r,
    est,
    match,
    tier: SCOUT_TIERS.find((x) => x.id === t.tier) || { id: "home", color: "var(--accent)", label: "Home" },
    price: t.money?.medianPrice ?? null,
    own: r?.modeled ? r.monthly : null,
    share: r?.modeled ? r.share : null,
    countyPrice: t.money?.countyPrice ?? null,
    countyOwn: r?.countyMonthly ?? null,
    countyShare: r?.countyShare ?? null,
    net: r?.net ?? null,
    effTax: t.money?.effTax ?? null,
    comfort: comfortK ? comfortK * 1000 : null,
    monthTotal: isHome ? budgetTotal : (est?.thereTotal ?? null),
    monthDelta: isHome ? 0 : (est?.delta ?? null),
    utilities: c.utilities ?? null,
    internet: c.internet ?? null,
    carIns: c.carIns2 ?? null,
    gas: c.gasPrice ?? null,
    groceries: c.groceries ?? null,
    groceryBasis: c.groceryBasis || null,
    water: c.waterTrash ?? null,
    homeIns: c.homeIns ?? null,
    basket: c.basketTotal ?? null,
    snow: a.snow ?? null,
    rain: a.rain ?? null,
    snowCover: a.snowCover ?? null,
    below0: a.below0 ?? null,
    above90: a.above90 ?? null,
    frost: a.frost ?? null,
    janHi: t.climate?.months?.[0]?.hi ?? null,
    julHi: t.climate?.months?.[6]?.hi ?? null,
    months: t.climate?.months || null,
    dayWinter: day.winter.hours,
    daySummer: day.summer.hours,
    crimeV: crime ? mid(crime[1], crime[2]) : null,
    crimeP: crime ? mid(crime[3], crime[4]) : null,
    fiber: num(t.fiber, /([\d.]+)%\s*fiber/i),
    fiberText: t.fiber || null,
    palatine: isHome ? null : hoursOf(t.drive),
    palatineText: t.drive || null,
    stryker: t.stryker?.mi ?? null,
    strykerText: t.stryker ? `${String(t.stryker.site).replace(/,.*$/, "")} · ${t.stryker.hrs}` : null,
    er: milesOf(er),
    erText: er,
    costco: milesOf(costco),
    costcoText: costco,
    amazon: amazonRank(amazon),
    amazonText: amazon,
    airport: milesOf(airport),
    airportCode: (airport || "").match(/\(([A-Z]{3})\)/)?.[1] || null,
    airportText: airport,
    nonstop: num(findRow(wk, "airport", /nonstop|non-stop|destinations/i), /(\d+)/),
    walk,
    walkText,
    pop: popNums.length ? Number((/trend/i.test(pop) ? popNums[popNums.length - 1] : popNums[0]).replace(/,/g, "")) : null,
    age: num(findRow(wk, "demographics", /median age/i), /([\d.]+)/),
    scores: t.scores || {},
  };
}

/* ---------- formatting ---------- */
const usd = (n) => `$${Math.round(n).toLocaleString()}`;
const usdK = (n) => (n >= 1e6 ? `$${(n / 1e6).toFixed(2)}M` : `$${Math.round(n / 1000)}k`);
const pct = (n) => `${Math.round(n * 100)}%`;
const inch = (n) => `${Math.round(n)}″`;
const int = (n) => `${Math.round(n).toLocaleString()}`;
const mi = (n) => `${n < 10 ? Number(n).toFixed(1) : Math.round(n)} mi`;
const hrs = (h) => {
  const m = Math.round(h * 60);
  return `${Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")}`;
};
const deg = (n) => `${Math.round(n)}°`;

/* ---------- columns ---------- */
export const GROUPS = [
  ["money", "💵 Money"],
  ["bills", "🧾 Bills"],
  ["climate", "🌨️ Climate"],
  ["life", "🛒 Daily life"],
  ["scores", "🎯 Scores"],
];

const COLUMNS = [
  // Money
  { key: "price", group: "money", label: "Median home", unit: "sold / ACS", good: "low", get: (r) => r.price, fmt: usdK, title: "Median sold price, or ACS home value where sales are thin" },
  { key: "own", group: "money", label: "Own it", unit: "per month", good: "low", get: (r) => r.own, fmt: usd, sub: (r) => (r.isHome && r.r?.rentActual ? `you rent for ${usd(r.r.rentActual)}` : r.own == null ? "Canada · not modeled" : null), title: "30-yr at 6.66%, 20% down, plus property tax and insurance", win: "🏠 Cheapest to own" },
  { key: "share", group: "money", label: "Of take-home", unit: "in town", good: "low", get: (r) => r.share, fmt: pct, verdict: "verdict", title: "Owning the town median as a share of your monthly take-home. ≤30% comfortable, ≤40% a stretch" },
  { key: "countyPrice", group: "money", label: "County median", unit: "ACS value", good: "low", get: (r) => r.countyPrice, fmt: usdK, title: "The county's median home value — the 15-minutes-out lever" },
  { key: "countyShare", group: "money", label: "Of take-home", unit: "in county", good: "low", get: (r) => r.countyShare, fmt: pct, verdict: "countyVerdict", title: "Owning the county median as a share of take-home" },
  { key: "net", group: "money", label: "Take-home", unit: "per year", good: "high", get: (r) => r.net, fmt: usd, title: "After federal, FICA, state and any city income tax" },
  { key: "effTax", group: "money", label: "Property tax", unit: "effective", good: "low", get: (r) => r.effTax, fmt: (n) => `${(n * 100).toFixed(2)}%`, title: "Effective rate on a new purchase" },
  { key: "comfort", group: "money", label: "Comfortable", unit: "income, in town", good: "low", get: (r) => r.comfort, fmt: usdK, sub: (r) => (r.comfort == null && /conflict/i.test(r.t.comfort || "") ? "sources split" : null), title: "Gross income at which needs are 65% of take-home, owning the median" },
  // Bills
  { key: "monthTotal", group: "bills", label: "Your month", unit: "all-in", good: "low", get: (r) => r.monthTotal, fmt: usd, title: "Your bills moved: own the median (town or county, per the toggle), local prices for the rest", win: "🧾 Cheapest month" },
  { key: "monthDelta", group: "bills", label: "vs Campbell", unit: "per month", good: "low", get: (r) => r.monthDelta, fmt: (n) => `${n < 0 ? "−" : n > 0 ? "+" : ""}${usd(Math.abs(n))}`, title: "Your month there minus your month now", noDelta: true },
  { key: "utilities", group: "bills", label: "Power + heat", unit: "avg / mo", good: "low", get: (r) => r.utilities, fmt: usd, title: "Electricity plus heating fuel, annualized, from the utility's own rate pages", sub: (r) => r.t.costs?.utility },
  { key: "internet", group: "bills", label: "Internet", unit: "best plan", good: "low", get: (r) => r.internet, fmt: usd, sub: (r) => r.t.costs?.internetNote, title: "Cheapest solid plan actually offered at that address" },
  { key: "carIns", group: "bills", label: "Car ins. ×2", unit: "Bankrate / mo", good: "low", get: (r) => r.carIns, fmt: usd, title: "Bankrate full-coverage average, two cars" },
  { key: "gas", group: "bills", label: "Gas", unit: "AAA $/gal", good: "low", get: (r) => r.gas, fmt: (n) => `$${Number(n).toFixed(2)}`, title: "AAA regular unleaded" },
  { key: "groceries", group: "bills", label: "Groceries", unit: "MIT, 2 adults", good: "low", get: (r) => r.groceries, fmt: usd, sub: (r) => (r.groceryBasis && r.groceryBasis !== "MIT" ? `${r.groceryBasis} basis` : null), title: "MIT Living Wage food line for two adults (Feb 2026). Sarnia and Windsor are Numbeo, a different scale" },
  { key: "water", group: "bills", label: "Water / trash", unit: "owner / mo", good: "low", get: (r) => r.water, fmt: usd, title: "Municipal water, sewer and trash schedule" },
  { key: "homeIns", group: "bills", label: "Home ins.", unit: "owner / mo", good: "low", get: (r) => r.homeIns, fmt: usd, title: "Owner's policy, county average" },
  { key: "basket", group: "bills", label: "Basket", unit: "non-housing", good: "low", get: (r) => r.basket, fmt: usd, title: "Everything above added up, before rent or mortgage" },
  // Climate
  { key: "snow", group: "climate", label: "Snow", unit: "per year", good: "low", get: (r) => r.snow, fmt: inch, title: "NOAA station normals 2010–2024", win: "❄️ Least snow" },
  { key: "spark", group: "climate", label: "By month", unit: "Jan → Dec", kind: "spark", get: (r) => (r.months ? 1 : null), title: "Snowfall by month, same scale for every town" },
  { key: "snowCover", group: "climate", label: "Snow on ground", unit: "days", good: "low", get: (r) => r.snowCover, fmt: int, title: "Days with snow cover" },
  { key: "below0", group: "climate", label: "Below 0°F", unit: "nights", good: "low", get: (r) => r.below0, fmt: int, title: "Nights at or below 0°F per year" },
  { key: "frost", group: "climate", label: "Frost", unit: "nights", good: "low", get: (r) => r.frost, fmt: int, title: "Nights at or below 32°F" },
  { key: "janHi", group: "climate", label: "Jan high", unit: "avg", good: "high", get: (r) => r.janHi, fmt: deg, title: "Average January daytime high" },
  { key: "julHi", group: "climate", label: "Jul high", unit: "avg", good: null, get: (r) => r.julHi, fmt: deg, title: "Average July daytime high" },
  { key: "above90", group: "climate", label: "90°F+", unit: "days", good: "low", get: (r) => r.above90, fmt: int, title: "Days at or above 90°F" },
  { key: "rain", group: "climate", label: "Rain", unit: "per year", good: null, get: (r) => r.rain, fmt: inch, title: "Liquid precipitation per year" },
  { key: "dayWinter", group: "climate", label: "Shortest day", unit: "Dec 21", good: "high", get: (r) => r.dayWinter, fmt: fmtHours, title: "Daylight on the winter solstice, from coordinates", win: "☀️ Longest December day" },
  // Daily life
  { key: "crimeV", group: "life", label: "Violent crime", unit: "per 1k", good: "low", get: (r) => r.crimeV, fmt: (n) => Number(n).toFixed(1), title: "Violent crimes per 1,000 residents (range midpoint)", win: "🛡️ Safest" },
  { key: "crimeP", group: "life", label: "Property crime", unit: "per 1k", good: "low", get: (r) => r.crimeP, fmt: (n) => Number(n).toFixed(1), title: "Property crimes per 1,000 residents" },
  { key: "fiber", group: "life", label: "Fiber", unit: "% of addresses", good: "high", get: (r) => r.fiber, fmt: (n) => `${n}%`, sub: (r) => (r.fiber == null ? r.fiberText : null), title: "Share of addresses with fiber available" },
  { key: "palatine", group: "life", label: "To Mom", unit: "Palatine, drive", good: "low", get: (r) => r.palatine, fmt: hrs, sub: (r) => (r.isHome ? "flight, ~4h in the air" : /ferry/i.test(r.palatineText || "") ? "+ ferry" : null), title: "Drive time to Palatine, IL", win: "🏠 Closest to Mom" },
  { key: "stryker", group: "life", label: "To Stryker", unit: "nearest site", good: "low", get: (r) => r.stryker, fmt: mi, sub: (r) => r.strykerText, title: "Road miles to the nearest Stryker site", win: "🏢 Closest to Stryker" },
  { key: "er", group: "life", label: "Nearest ER", unit: "miles", good: "low", get: (r) => r.er, fmt: mi, sub: (r) => (r.er == null ? r.erText : null), title: "Distance to the nearest emergency room" },
  { key: "costco", group: "life", label: "Costco", unit: "miles", good: "low", get: (r) => r.costco, fmt: mi, title: "Distance to the nearest Costco" },
  { key: "amazon", group: "life", label: "Amazon", unit: "typical", good: "low", kind: "rank", get: (r) => r.amazon, fmt: (n) => AMZ[n] || "—", title: "Fastest delivery speed that is actually routine there" },
  { key: "airport", group: "life", label: "Airport", unit: "miles", good: "low", get: (r) => r.airport, fmt: mi, sub: (r) => r.airportCode, title: "Nearest commercial airport" },
  { key: "nonstop", group: "life", label: "Nonstops", unit: "from it", good: "high", get: (r) => r.nonstop, fmt: int, title: "Nonstop destinations from that airport" },
  { key: "walk", group: "life", label: "Walk Score", unit: "downtown", good: "high", get: (r) => r.walk, fmt: int, sub: (r) => (r.walk == null && /car-free/i.test(r.walkText || "") ? "car-free island" : null), title: "Walk Score for the town centre, where one exists", win: "🚶 Most walkable" },
  { key: "pop", group: "life", label: "Population", unit: "ACS 2020", good: null, get: (r) => r.pop, fmt: int, title: "Town population" },
  { key: "age", group: "life", label: "Median age", unit: "years", good: null, get: (r) => r.age, fmt: (n) => Number(n).toFixed(1), title: "Median age of residents" },
  // Scores
  { key: "match", group: "scores", label: "Match", unit: "your weights", good: "high", get: (r) => r.match, fmt: (n) => `${n}%`, title: "Weighted average of the ten scores, by your priorities", win: "🎯 Best match" },
  ...SCOUT_DIMENSIONS.map((d) => ({ key: `s-${d.key}`, group: "scores", label: `${d.icon} ${d.label}`, unit: "0–10", good: "high", kind: "score", get: (r) => r.scores?.[d.key] ?? null, fmt: (n) => `${n}`, title: d.hint })),
];

const WINNERS = COLUMNS.filter((c) => c.win);

/* rank-based heat: 1 = best end of the column, 0 = worst, 0.5 = median */
function heatFor(rows) {
  const out = {};
  for (const col of COLUMNS) {
    if (!col.good || col.kind === "spark") continue;
    const vals = rows.map((r) => [r.t.id, col.get(r)]).filter(([, v]) => typeof v === "number");
    if (vals.length < 3) continue;
    vals.sort((a, b) => a[1] - b[1]);
    const n = vals.length - 1;
    out[col.key] = {};
    vals.forEach(([id, v]) => {
      // ties share a rank
      const first = vals.findIndex(([, x]) => x === v);
      const p = first / n;
      out[col.key][id] = col.good === "low" ? 1 - p : p;
    });
  }
  return out;
}

function Spark({ months, max }) {
  return (
    <span className="mx-spark" title={months.map((m) => `${m.m} ${m.snow}″`).join(" · ")}>
      {months.map((m) => (
        <i key={m.m} style={{ height: `${Math.max(1, Math.round(((m.snow || 0) / max) * 18))}px` }} />
      ))}
    </span>
  );
}

function Cell({ col, row, home, mode, heat, sparkMax }) {
  const v = col.get(row);
  if (col.kind === "spark") {
    return <td className="is-spark">{row.months ? <Spark months={row.months} max={sparkMax} /> : <span className="is-null">—</span>}</td>;
  }
  if (v == null) {
    const sub = col.sub?.(row);
    return (
      <td className="is-null is-text" title={sub || undefined}>
        {sub ? <span className="mx-sub mx-sub--only">{sub}</span> : "—"}
      </td>
    );
  }
  const base = home && !row.isHome ? col.get(home) : null;
  const showDelta = mode === "delta" && !row.isHome && typeof v === "number" && typeof base === "number" && !col.noDelta && col.kind !== "rank";
  let text = col.fmt(v);
  let cls = "";
  if (showDelta) {
    const d = v - base;
    const sign = d > 0 ? "+" : d < 0 ? "−" : "±";
    text = sign + col.fmt(Math.abs(d));
    const better = col.good === "low" ? d < 0 : col.good === "high" ? d > 0 : null;
    cls = d === 0 ? "d-zero" : better == null ? "" : better ? "d-good" : "d-bad";
  }
  const h = !row.isHome && !showDelta ? heat[col.key]?.[row.t.id] : null;
  const bg =
    h == null
      ? undefined
      : h >= 0.5
        ? `rgba(47,125,84,${(0.05 + (h - 0.5) * 0.44).toFixed(2)})`
        : `rgba(176,48,36,${(0.05 + (0.5 - h) * 0.44).toFixed(2)})`;
  const verdict = col.verdict && !showDelta ? row.r?.[col.verdict] : null;
  const sub = !showDelta && col.sub ? col.sub(row) : null;
  return (
    <td className={cls} style={bg ? { background: bg } : undefined} title={sub || col.title}>
      {col.kind === "score" && (
        <span className="mx-bar" style={{ "--tc": row.tier.color }}>
          <i style={{ width: `${v * 10}%` }} />
        </span>
      )}
      {verdict && <i className={`mx-dot mx-dot--${verdict.tone}`} title={verdict.label} />}
      {text}
      {sub && <span className="mx-sub">{sub}</span>}
    </td>
  );
}

function Seg({ label, value, options, onChange }) {
  return (
    <span className="mx-segwrap">
      {label && <span className="mx-seg-lab">{label}</span>}
      <span className="mx-seg" role="group" aria-label={label}>
        {options.map(([v, text, note]) => (
          <button key={v} type="button" aria-pressed={value === v} onClick={() => onChange(v)} title={note ? `${text} · ${note}` : undefined}>
            {text}
            {note && <span className="mx-seg-note"> · {note}</span>}
          </button>
        ))}
      </span>
    </span>
  );
}

function NumbersDrawer({ income, setIncome, budget, setBudget, weights, setWeights, defaultWeights }) {
  const ca = takeHome(income.a, income.b, "CA");
  const mi = takeHome(income.a, income.b, "MI");
  const total = BUDGET_LINES.reduce((n, [k]) => n + (Number(budget[k]) || 0), 0);
  const field = (key, label) => (
    <label className="money-field">
      <span>{label}</span>
      <span className="money-input-wrap">
        <span aria-hidden="true">$</span>
        <input
          type="number"
          inputMode="numeric"
          min="0"
          step="1000"
          value={income[key]}
          onChange={(e) => setIncome({ ...income, [key]: Math.max(0, Number(e.target.value) || 0) })}
          className="money-input"
        />
      </span>
    </label>
  );
  return (
    <div className="mx-drawer">
      <div>
        <h3>Income, gross</h3>
        <div className="money-fields" style={{ margin: "0 0 var(--s-2)" }}>
          {field("a", "Gunnar")}
          {field("b", "Mikaela")}
        </div>
        <p className="muted" style={{ fontSize: "var(--t-xs)" }}>
          Take-home ≈ <b>{money(ca.net)}</b> in Campbell, <b>{money(mi.net)}</b> in Michigan (before any city tax). The
          state-tax difference is a wash at this income; housing is the whole decision.
        </p>
      </div>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "0.5rem" }}>
          <h3>Your bills now · {money(total)}/mo</h3>
          <button type="button" className="scout-btn" onClick={() => setBudget(DEFAULT_BUDGET)}>Reset</button>
        </div>
        <div className="budget-grid" style={{ margin: 0 }}>
          {BUDGET_LINES.map(([k, label, , hint]) => (
            <label key={k} className="money-field">
              <span>{label}</span>
              <span className="money-input-wrap">
                <span aria-hidden="true">$</span>
                <input
                  type="number"
                  inputMode="numeric"
                  min="0"
                  step="10"
                  className="money-input"
                  value={budget[k]}
                  onChange={(e) => setBudget({ ...budget, [k]: Math.max(0, Number(e.target.value) || 0) })}
                />
              </span>
              {hint && <small>{hint}</small>}
            </label>
          ))}
        </div>
      </div>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "0.5rem" }}>
          <h3>Priorities · drives Match</h3>
          <button type="button" className="scout-btn" onClick={() => setWeights(defaultWeights)}>Reset</button>
        </div>
        <p className="muted" style={{ fontSize: "var(--t-xs)", marginBottom: "0.4rem" }}>
          Tap once to count double, again to switch off.
        </p>
        <div className="prio-chips" style={{ margin: 0 }}>
          {SCOUT_DIMENSIONS.map((d) => {
            const w = weights[d.key] ?? 1;
            return (
              <button
                key={d.key}
                type="button"
                className={`prio-chip prio-chip--${w}`}
                aria-pressed={w > 0}
                title={d.hint}
                onClick={() => setWeights((cur) => ({ ...cur, [d.key]: ((cur[d.key] ?? 1) + 1) % 3 }))}
              >
                <span aria-hidden="true">{d.icon}</span>
                {d.label}
                <span className="prio-w">{w === 2 ? "×2" : w === 0 ? "off" : ""}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function ScoutMatrix({
  towns,
  home,
  moneyOf,
  monthOf,
  matchOf,
  income,
  setIncome,
  budget,
  setBudget,
  weights,
  setWeights,
  defaultWeights,
  useCounty,
  setUseCounty,
  compare,
  toggleCompare,
  jump,
}) {
  const [group, setGroup] = useLocalState("scout-mx-group", "money");
  const [mode, setMode] = useLocalState("scout-mx-mode", "value");
  const [sort, setSort] = useLocalState("scout-mx-sort", { key: "match", dir: "desc" });
  const [open, setOpen] = useLocalState("scout-mx-open", false);

  const budgetTotal = BUDGET_LINES.reduce((n, [k]) => n + (Number(budget[k]) || 0), 0);
  const homeRow = useMemo(
    () => (home ? rowFor(home, { r: moneyOf[home.id], est: null, match: matchOf[home.id], isHome: true, budgetTotal }) : null),
    [home, moneyOf, matchOf, budgetTotal],
  );
  const rows = useMemo(
    () => towns.map((t) => rowFor(t, { r: moneyOf[t.id], est: monthOf[t.id], match: matchOf[t.id], isHome: false, budgetTotal })),
    [towns, moneyOf, monthOf, matchOf, budgetTotal],
  );
  const heat = useMemo(() => heatFor(rows), [rows]);
  const sparkMax = useMemo(
    () => Math.max(1, ...rows.flatMap((r) => (r.months || []).map((m) => m.snow || 0))),
    [rows],
  );

  const sortCol = COLUMNS.find((c) => c.key === sort.key) || COLUMNS[0];
  const sorted = useMemo(() => {
    const dir = sort.dir === "asc" ? 1 : -1;
    return [...rows].sort((a, b) => {
      const va = sortCol.get(a);
      const vb = sortCol.get(b);
      if (va == null && vb == null) return 0;
      if (va == null) return 1;
      if (vb == null) return -1;
      return typeof va === "string" ? dir * va.localeCompare(vb) : dir * (va - vb);
    });
  }, [rows, sortCol, sort.dir]);
  const rankOf = Object.fromEntries(sorted.map((r, i) => [r.t.id, i + 1]));
  const pinned = compare.map((id) => sorted.find((r) => r.t.id === id)).filter(Boolean);
  const ordered = [...pinned, ...sorted.filter((r) => !compare.includes(r.t.id))];

  const cols = COLUMNS.filter((c) => group === "all" || c.group === group);
  const clickSort = (col) => {
    if (col.kind === "spark") return;
    setSort((s) => (s.key === col.key ? { key: col.key, dir: s.dir === "asc" ? "desc" : "asc" } : { key: col.key, dir: col.good === "low" ? "asc" : "desc" }));
  };
  const showWinner = (col) => {
    setGroup(col.group);
    setSort({ key: col.key, dir: col.good === "low" ? "asc" : "desc" });
  };
  const winners = WINNERS.map((col) => {
    const cands = rows.filter((r) => typeof col.get(r) === "number");
    if (!cands.length) return null;
    const best = cands.reduce((b, r) => (col.good === "low" ? col.get(r) < col.get(b) : col.get(r) > col.get(b)) ? r : b);
    return { col, best, value: col.fmt(col.get(best)) };
  }).filter(Boolean);

  const scenario = SCENARIOS.find((s) => s.a === income.a && s.b === income.b)?.id || "custom";
  const gross = income.a + income.b;
  const groupSpans = group === "all" ? GROUPS.map(([g, label]) => [label, COLUMNS.filter((c) => c.group === g).length]) : null;

  return (
    <section className="card card-pad matrix">
      <div className="card-head" style={{ marginBottom: "var(--s-2)" }}>
        <div style={{ minWidth: 0 }}>
          <div className="eyebrow">The decision matrix</div>
          <h2 style={{ fontSize: "var(--t-xl)", marginTop: "0.15rem" }}>
            {towns.length} towns against Campbell, on {money(gross)} a year
          </h2>
        </div>
        <button type="button" className={`scout-btn${open ? " is-on" : ""}`} onClick={() => setOpen(!open)}>
          {open ? "Hide your numbers ▴" : "Edit your numbers ▾"}
        </button>
      </div>
      <p className="muted" style={{ fontSize: "var(--t-sm)", marginBottom: "var(--s-2)" }}>
        One row per town, every researched figure as a column. Click a header to sort, ★ pins a row to the top
        (and into a side-by-side), a town's name jumps to its full workup. Green is the better end of each column,
        red the worse; <b>vs Campbell</b> turns every cell into the difference from where you live now.
      </p>

      <div className="mx-toolbar">
        <Seg
          label="Income"
          value={scenario}
          options={[...SCENARIOS.map((s) => [s.id, s.label, s.note]), ...(scenario === "custom" ? [["custom", "Custom", money(gross)]] : [])]}
          onChange={(v) => {
            const s = SCENARIOS.find((x) => x.id === v);
            if (s) setIncome({ a: s.a, b: s.b });
          }}
        />
        <Seg
          label="Own"
          value={useCounty ? "county" : "town"}
          options={[["town", "In town"], ["county", "County", "15 min out, the county median"]]}
          onChange={(v) => setUseCounty(v === "county")}
        />
        <Seg label="Show" value={mode} options={[["value", "Values"], ["delta", "vs Campbell"]]} onChange={setMode} />
      </div>

      {open && (
        <NumbersDrawer
          income={income}
          setIncome={setIncome}
          budget={budget}
          setBudget={setBudget}
          weights={weights}
          setWeights={setWeights}
          defaultWeights={defaultWeights}
        />
      )}

      <div className="mx-winners" aria-label="Best in class">
        {winners.map(({ col, best, value }) => (
          <button key={col.key} type="button" className="mx-win" onClick={() => showWinner(col)} title={`Sort by ${col.label}`}>
            <small>{col.win}</small>
            <b>{best.t.name}</b>
            <span>{value}</span>
          </button>
        ))}
      </div>

      <div className="mx-tabs" role="tablist">
        {[["all", "Everything"], ...GROUPS].map(([g, label]) => (
          <button key={g} type="button" role="tab" className="mx-tab" aria-pressed={group === g} onClick={() => setGroup(g)}>
            {label}
          </button>
        ))}
      </div>

      <div className="mx-scroll">
        <table className="mx">
          <thead>
            {groupSpans && (
              <tr className="mx-groups">
                <th className="mx-town" />
                {groupSpans.map(([label, span]) => (
                  <th key={label} colSpan={span}>{label}</th>
                ))}
              </tr>
            )}
            <tr className={groupSpans ? "mx-cols mx-cols--under" : "mx-cols"}>
              <th className="mx-town" scope="col">
                Town <span className="mx-unit">★ pin · name opens the workup</span>
              </th>
              {cols.map((col) => {
                const sortedHere = sort.key === col.key;
                return (
                  <th
                    key={col.key}
                    scope="col"
                    className={sortedHere ? "is-sorted" : ""}
                    title={col.title}
                    onClick={() => clickSort(col)}
                    aria-sort={sortedHere ? (sort.dir === "asc" ? "ascending" : "descending") : "none"}
                  >
                    {col.label}
                    {sortedHere && <span aria-hidden="true"> {sort.dir === "asc" ? "▲" : "▼"}</span>}
                    {col.unit && <span className="mx-unit">{col.unit}</span>}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {homeRow && (
              <tr className="is-home">
                <th scope="row" className="mx-town" style={{ "--tc": "var(--accent)" }}>
                  <span className="mx-townrow">
                    <span className="mx-pin" aria-hidden="true">⌂</span>
                    <span className="mx-rank">—</span>
                    <span>
                      <button type="button" className="mx-name" onClick={() => jump(home.id)}>{home.name}</button>
                      <small>where you live now · the baseline</small>
                    </span>
                  </span>
                </th>
                {cols.map((col) => (
                  <Cell key={col.key} col={col} row={homeRow} home={null} mode="value" heat={heat} sparkMax={sparkMax} />
                ))}
              </tr>
            )}
            {ordered.map((row) => {
              const isPinned = compare.includes(row.t.id);
              return (
                <tr key={row.t.id} className={isPinned ? "is-pinned" : ""}>
                  <th scope="row" className="mx-town" style={{ "--tc": row.tier.color }}>
                    <span className="mx-townrow">
                      <button
                        type="button"
                        className="mx-pin"
                        aria-pressed={isPinned}
                        onClick={() => toggleCompare(row.t.id)}
                        title={isPinned ? "Unpin" : compare.length >= 3 ? "Three pinned already" : "Pin to the top and compare"}
                      >
                        ★
                      </button>
                      <span className="mx-rank">{rankOf[row.t.id]}</span>
                      <span>
                        <button type="button" className="mx-name" onClick={() => jump(row.t.id)}>{row.t.name}</button>
                        <small>{String(row.t.county).replace(/ County.*$/, "")} · {row.tier.label}</small>
                      </span>
                    </span>
                  </th>
                  {cols.map((col) => (
                    <Cell key={col.key} col={col} row={row} home={homeRow} mode={mode} heat={heat} sparkMax={sparkMax} />
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mx-foot">
        Housing: median sold or ACS value, county ACS value; owning = 30-yr at 6.66% with 20% down plus tax and insurance.
        Bills: utility rate pages, Bankrate, AAA, MIT's Feb-2026 food lines, municipal schedules — matched to the same
        sources for Campbell. Climate: NOAA station data 2010–2024. Crime, fiber, distances and airports from each
        town's workup, parsed from the researched text; a dash means the figure did not survive research. Sorted by{" "}
        <b>{sortCol.label}</b>, {sort.dir === "asc" ? "low to high" : "high to low"}.
      </p>
    </section>
  );
}
