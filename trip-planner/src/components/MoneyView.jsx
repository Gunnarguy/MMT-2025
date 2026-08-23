import { useMemo, useState } from "react";

import { BUDGET, budgetTotals, FX, SPLIT_NOTE } from "../data/budget";
import { useLocalState } from "../hooks/useLocalState";
import { money } from "../lib/format";
import { Chip, Flag, Source } from "./bits";
import FuelPlanner from "./visuals/FuelPlanner";

const CATEGORY_COLOR = {
  Lodging: "var(--day-1)",
  Transport: "var(--day-3)",
  "Tickets & entry": "var(--day-4)",
  Food: "var(--day-5)",
  Contingency: "var(--day-7)",
};

export default function MoneyView() {
  const [includeProvisional, setIncludeProvisional] = useState(false);
  // The car isn't assigned yet. If its mpg has been entered on the Car &
  // flights page, the Fuel line below is computed from it rather than guessed.
  const [vehicle] = useLocalState("mi26.vehicle", {});
  const mpg = vehicle?.mpg;

  const {
    items: rows,
    total,
    momOnly,
    perPerson: perPersonShared,
  } = useMemo(
    () => budgetTotals({ includeProvisional, mpg }),
    [includeProvisional, mpg],
  );

  const byCategory = useMemo(() => {
    const map = new Map();
    rows.forEach((i) => map.set(i.category, (map.get(i.category) || 0) + i.total));
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, [rows]);

  return (
    <>
      <div className="page-head">
        <div className="eyebrow">What it costs</div>
        <h1>Trip Budget &amp; Expenses</h1>
        <p>
          Complete breakdown of confirmed lodging, transport, activities, and food estimates for all three travelers.
        </p>
      </div>

      <div className="money-hero">
        <div className="stat">
          <div className="stat-value">{money(total)}</div>
          <div className="stat-label">Whole trip</div>
          <div className="stat-note">All three people, all categories</div>
        </div>
        <div className="stat">
          <div className="stat-value">{money(perPersonShared)}</div>
          <div className="stat-label">Each, shared costs</div>
          <div className="stat-note">Split three ways</div>
        </div>
        <div className="stat">
          <div className="stat-value">{money(momOnly)}</div>
          <div className="stat-label">Marked &ldquo;MINE&rdquo;</div>
          <div className="stat-note">Mom is covering these outright</div>
        </div>
      </div>

      <div className="split-bar">
        {byCategory.map(([cat, amount]) => (
          <div
            key={cat}
            className="split-seg"
            style={{
              flexGrow: amount,
              background: CATEGORY_COLOR[cat] || "var(--ink-3)",
            }}
            title={`${cat}: ${money(amount)}`}
          >
            {amount / total > 0.13 ? `${Math.round((amount / total) * 100)}%` : ""}
          </div>
        ))}
      </div>
      <div className="split-key" style={{ marginBottom: "var(--s-5)" }}>
        {byCategory.map(([cat, amount]) => (
          <span key={cat}>
            <i style={{ background: CATEGORY_COLOR[cat] || "var(--ink-3)" }} />
            {cat} — {money(amount)}
          </span>
        ))}
      </div>

      <label
        className="row"
        style={{
          marginBottom: "var(--s-4)",
          fontSize: "var(--t-sm)",
          cursor: "pointer",
        }}
      >
        <input
          type="checkbox"
          checked={includeProvisional}
          onChange={(e) => setIncludeProvisional(e.target.checked)}
        />
        Include the provisional Belleville hotel (if you don&rsquo;t stay at
        Julia&rsquo;s)
      </label>

      <div className="table-wrap">
        <table className="data">
          <thead>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th className="num">Total</th>
              <th className="num">Each</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((i) => (
              <tr key={i.label}>
                <td>
                  {i.label}
                  {i.note && (
                    <>
                      <br />
                      <small className="muted">{i.note}</small>
                    </>
                  )}
                </td>
                <td className="muted">{i.category}</td>
                <td className="num">{money(i.total)}</td>
                <td className="num">
                  {i.payer === "mom" ? "—" : money(i.total / 3)}
                </td>
                <td>
                  {i.payer === "mom" ? (
                    <Chip tone="info">Mom&rsquo;s</Chip>
                  ) : i.estimate ? (
                    <Chip tone="ghost">Estimate</Chip>
                  ) : (
                    <Chip tone="ok">Quoted</Chip>
                  )}
                </td>
              </tr>
            ))}
            <tr className="total">
              <td>Total</td>
              <td />
              <td className="num">{money(total)}</td>
              <td className="num">{money(perPersonShared)}</td>
              <td />
            </tr>
          </tbody>
        </table>
      </div>

      <p
        className="note-strip"
        style={{ marginTop: "var(--s-4)" }}
      >
        {SPLIT_NOTE}
      </p>

      {BUDGET.flags?.map((f) => (
        <div key={f.title} style={{ marginTop: "var(--s-4)" }}>
          <Flag level={f.level} title={f.title} fix={f.fix}>
            {f.body}
          </Flag>
        </div>
      ))}

      <FuelPlanner />

      <section className="section">
        <h2>Exchange rate</h2>
        <p className="section-lede">{FX.note}</p>
        <div className="stat-grid">
          <div className="stat">
            <div className="stat-value">
              {FX.usdPerCad}
              <small>USD / CAD</small>
            </div>
            <div className="stat-label">Rate used here</div>
            <div className="stat-note">Checked {FX.checked}</div>
          </div>
          <div className="stat">
            <div className="stat-value">
              {money(FX.sampleCad, "CAD")}
              <small>→ {money(FX.sampleUsd)}</small>
            </div>
            <div className="stat-label">Sarnia hotel</div>
            <div className="stat-note">{FX.sampleNote}</div>
          </div>
        </div>
        <Source name={FX.source} url={FX.sourceUrl} />
      </section>
    </>
  );
}
