import { Chip } from "./bits";
import { money } from "../lib/money";

/**
 * The couple's real monthly bills, moved. Each town's estimate keeps the
 * lines that travel with you (cell plan, subscriptions), swaps housing for
 * owning the median there, and replaces utilities, internet, car insurance,
 * water and home insurance with that town's researched averages where they
 * exist. Groceries and gasoline scale by the local index against Campbell's.
 */
export const BUDGET_LINES = [
  ["housing", "Rent / mortgage", 1150, "Campbell: $1,150, renting from family"],
  ["utilities", "Electricity + gas", 200, "PG&E average is ~$329 — type yours"],
  ["internet", "Internet", 70, "AT&T Fiber 300 is $35 after promo"],
  ["cell", "Cell (Verizon)", 140, "travels with you"],
  ["carIns", "Car insurance, 2 cars", 250, "Bankrate full-coverage metro avg is $494 — type yours"],
  ["gas", "Gasoline", 150, "at $5.83/gal (AAA California)"],
  ["groceries", "Groceries", 800, "MIT food line for two in Santa Clara Co. is $769"],
  ["waterTrash", "Water / sewer / trash", 0, "inside rent now; ~$330 if you owned here"],
  ["homeIns", "Renter / home insurance", 25, "owners here pay ~$105"],
  ["other", "Subscriptions & everything else", 400, "travels with you"],
];
export const DEFAULT_BUDGET = Object.fromEntries(BUDGET_LINES.map(([k, , v]) => [k, v]));
const CAMPBELL_GAS = 5.83;
const CAMPBELL_GROCERY_INDEX = 143;

/**
 * Same-basis scaling: the local figure and Campbell's come from matched sources
 * (Bankrate for insurance, AAA for gas, MIT for food, utility rate pages), so
 * your ACTUAL bill is scaled by that ratio rather than replaced by an average
 * you never paid. A line you pay $0 for now (water inside rent) becomes the
 * local absolute, because owning means you would pay it.
 */
function moved(yours, local, campbell) {
  if (local == null) return null;
  if (yours > 0 && campbell) return Math.round((yours * local) / campbell);
  return Math.round(local);
}
// Ratio-scaled: utilities, car insurance, gas, groceries (your consumption, their prices).
// Absolute: internet, water/trash, home insurance (fixed local prices, or an owner's product).

export function estimateMonth(budget, town, r, useCounty, campbellCosts = {}) {
  const c = town.costs || {};
  const cc = campbellCosts || {};
  const own = r?.modeled ? (useCounty && r.countyMonthly ? r.countyMonthly : r.monthly) : null;
  const scale = (val, idx, base) => (idx && base ? Math.round((val * idx) / base) : val);
  const lines = BUDGET_LINES.map(([k, label]) => {
    const yours = Number(budget[k]) || 0;
    let there = yours;
    let note = "";
    switch (k) {
      case "housing":
        there = own == null ? yours : Math.round(own);
        note = own == null ? "not modeled" : useCounty && r.countyMonthly ? "owning the county median" : "owning the town median";
        break;
      case "utilities": {
        const v = moved(yours, c.utilities, cc.utilities);
        if (v != null) { there = v; note = c.utilitiesNote || `${c.utility || "local"} vs PG&E`; } else note = "no local figure yet";
        break;
      }
      case "internet":
        // a plan price, not consumption: the local best plan replaces yours outright
        if (c.internet != null) { there = Math.round(c.internet); note = c.internetNote || "best local plan"; } else note = "no local figure yet";
        break;
      case "carIns": {
        const v = moved(yours, c.carIns2, cc.carIns2);
        if (v != null) { there = v; note = `Bankrate: $${Math.round(c.carIns2)} vs $${Math.round(cc.carIns2 || 494)} here, for two cars`; } else note = "no local figure yet";
        break;
      }
      case "gas":
        if (c.gasPrice) { there = scale(yours, c.gasPrice, cc.gasPrice || CAMPBELL_GAS); note = `$${c.gasPrice.toFixed(2)}/gal vs $${(cc.gasPrice || CAMPBELL_GAS).toFixed(2)}`; }
        break;
      case "groceries":
        if (c.groceries && cc.groceries) {
          there = scale(yours, c.groceries, cc.groceries);
          note = c.groceryBasis === "MIT"
            ? `MIT food line $${Math.round(c.groceries)} vs $${Math.round(cc.groceries)} for two`
            : `${c.groceryBasis || "local"} food figure $${Math.round(c.groceries)} vs MIT's $${Math.round(cc.groceries)} here — not the same scale`;
        }
        else if (c.groceryIndex) { there = scale(yours, c.groceryIndex, cc.groceryIndex || CAMPBELL_GROCERY_INDEX); note = `index ${c.groceryIndex} vs ${cc.groceryIndex || CAMPBELL_GROCERY_INDEX}`; }
        else note = "no local figure yet";
        break;
      case "waterTrash":
        // owners pay the municipal schedule whatever they paid inside rent before
        if (c.waterTrash != null) { there = Math.round(c.waterTrash); note = "municipal rates, as an owner"; }
        break;
      case "homeIns":
        // a renter's policy and an owner's policy are different products
        if (c.homeIns != null) { there = Math.round(c.homeIns); note = "owner's policy, county average"; }
        break;
      default:
        note = "travels with you";
    }
    return { k, label, yours, there, note };
  });
  const total = lines.reduce((n, l) => n + l.yours, 0);
  const thereTotal = lines.reduce((n, l) => n + l.there, 0);
  const movers = [...lines].sort((a, b) => Math.abs(b.there - b.yours) - Math.abs(a.there - a.yours)).slice(0, 2);
  return { lines, total, thereTotal, delta: thereTotal - total, movers, hasLocal: Object.keys(c).length > 0 };
}

export function MonthPanel({ budget, setBudget, rows, useCounty, setUseCounty }) {
  const total = BUDGET_LINES.reduce((n, [k]) => n + (Number(budget[k]) || 0), 0);
  return (
    <section className="card card-pad money-panel">
      <div className="card-head">
        <div style={{ minWidth: 0 }}>
          <div className="eyebrow">Your month, moved</div>
          <h2 style={{ fontSize: "var(--t-xl)", marginTop: "0.15rem" }}>
            {money(total)} a month in Campbell — what it becomes in each town
          </h2>
        </div>
        <button type="button" className="scout-btn" onClick={() => setBudget(DEFAULT_BUDGET)}>
          Reset
        </button>
      </div>
      <p className="muted" style={{ fontSize: "var(--t-sm)", marginBottom: "var(--s-2)" }}>
        Type your real bills. Housing becomes the cost of owning the median house in each town. Every other
        consumption-driven bill — power, car insurance, gas, groceries — is scaled by that town's researched
        figure against Campbell's on the same source (the utilities' rate pages, Bankrate, AAA, MIT's food
        line), so your habits travel and only the local price changes. Fixed prices are swapped outright: the
        best local internet plan, the municipal water/trash schedule, an owner's insurance policy. Cell and
        everything else travel with you.
      </p>
      <div className="budget-grid">
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
            {hint && <small className="muted">{hint}</small>}
          </label>
        ))}
      </div>
      <div className="prio-chips" style={{ margin: "var(--s-2) 0" }}>
        <button type="button" className={`prio-chip ${useCounty ? "prio-chip--1" : "prio-chip--2"}`} aria-pressed={!useCounty} onClick={() => setUseCounty(false)}>
          Own in town
        </button>
        <button type="button" className={`prio-chip ${useCounty ? "prio-chip--2" : "prio-chip--1"}`} aria-pressed={useCounty} onClick={() => setUseCounty(true)}>
          Own in the county ring <span className="prio-w">~15 min out</span>
        </button>
      </div>
      <div className="compare-scroll">
        <table className="money-table">
          <thead>
            <tr><th>Town</th><th>Your month there</th><th>vs Campbell</th><th>Biggest movers</th><th></th></tr>
          </thead>
          <tbody>
            {rows.map(({ town, est }) => (
              <tr key={town.id}>
                <td>{town.name}</td>
                <td>{money(est.thereTotal)}</td>
                <td style={{ color: est.delta > 0 ? "var(--accent)" : "var(--ink)" }}>
                  {est.delta >= 0 ? "+" : "−"}{money(Math.abs(est.delta))}
                </td>
                <td className="muted" style={{ whiteSpace: "normal" }}>
                  {est.movers.map((l) => `${l.label} ${l.there >= l.yours ? "+" : "−"}${money(Math.abs(l.there - l.yours))}`).join(" · ")}
                </td>
                <td>{est.hasLocal ? <Chip tone="ok">local averages</Chip> : <Chip tone="ghost">housing only</Chip>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="muted" style={{ fontSize: "var(--t-xs)" }}>
        "Housing only" means the cost basket for that town has not landed yet — the estimate swaps housing and keeps your other bills as they are.
      </p>
    </section>
  );
}

export function MonthBlock({ est, useCounty }) {
  if (!est) return null;
  return (
    <div className="month-block">
      <span>
        📆 Your month here ≈ <b>{money(est.thereTotal)}</b> ({est.delta >= 0 ? "+" : "−"}{money(Math.abs(est.delta))} vs Campbell{useCounty ? ", owning in the county" : ""})
      </span>
      <span className="muted">
        {" "}· {est.movers.map((l) => `${l.label} ${l.there >= l.yours ? "+" : "−"}${money(Math.abs(l.there - l.yours))}`).join(", ")}
      </span>
    </div>
  );
}
