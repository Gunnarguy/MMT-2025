import { Chip } from "./bits";
import { money, ownMonthly, takeHome, verdictFor } from "../lib/money";

/**
 * The couple's actual income, run through every town: take-home after that
 * state's (and city's) tax, the monthly cost of owning the median house there,
 * what share of take-home that is, and a plain verdict. Campbell — where they
 * live now — is the row everything is measured against.
 */
export function moneyFor(town, income) {
  const m = town.money;
  if (!m) return null;
  const th = takeHome(income.a, income.b, m.taxState, m.cityTax || 0);
  const monthly = ownMonthly(m.medianPrice, m.effTax);
  const net = th.net;
  const share = net ? monthly / (net / 12) : null;
  const countyMonthly = m.countyPrice ? ownMonthly(m.countyPrice, m.effTax) : null;
  const countyShare = countyMonthly && net ? countyMonthly / (net / 12) : null;
  return {
    net,
    stateTax: th.state,
    monthly,
    share,
    verdict: verdictFor(share),
    countyPrice: m.countyPrice || null,
    countyMonthly,
    countyShare,
    countyVerdict: verdictFor(countyShare),
    down: m.medianPrice * 0.2,
    left: net ? net / 12 - monthly : null,
    price: m.medianPrice,
    priceNote: m.priceNote,
    rent2br: m.rent2br || null,
    rentShare: m.rent2br && net ? m.rent2br / (net / 12) : null,
    rentActual: m.rentActual || null,
    rentActualShare: m.rentActual && net ? m.rentActual / (net / 12) : null,
    rentActualNote: m.rentActualNote || null,
    modeled: m.taxState === "CA" || m.taxState === "MI",
  };
}

export const SCENARIOS = [
  { id: "now", label: "Now", note: "$65k + $56k", a: 65000, b: 56000 },
  { id: "dream", label: "The dream", note: "$95k, one remote job", a: 95000, b: 0 },
];

export function MoneyPanel({ income, setIncome, rows, campbell }) {
  const gross = income.a + income.b;
  const activeScenario = SCENARIOS.find((s) => s.a === income.a && s.b === income.b)?.id || "custom";
  const ca = takeHome(income.a, income.b, "CA");
  const mi = takeHome(income.a, income.b, "MI");
  const gr = takeHome(income.a, income.b, "MI", 0.015);
  const det = takeHome(income.a, income.b, "MI", 0.024);
  const diff = Math.round(mi.net - ca.net);
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
  const rentShare = campbell?.rent2br && ca.net ? campbell.rent2br / (ca.net / 12) : null;
  const actual = campbell?.rentActual || null;
  const actualShare = actual && ca.net ? actual / (ca.net / 12) : null;
  const discount = actual && campbell?.rent2br ? (campbell.rent2br - actual) * 12 : null;
  const buyCampbell = campbell?.medianPrice ? ownMonthly(campbell.medianPrice, campbell.effTax || 0.012) : null;
  const buyShare = buyCampbell && ca.net ? buyCampbell / (ca.net / 12) : null;
  return (
    <section className="card card-pad money-panel">
      <div className="card-head">
        <div style={{ minWidth: 0 }}>
          <div className="eyebrow">Your money</div>
          <h2 style={{ fontSize: "var(--t-xl)", marginTop: "0.15rem" }}>
            {money(gross)} a year, run through every town
          </h2>
        </div>
      </div>
      <div className="prio-chips" style={{ margin: "var(--s-2) 0" }}>
        {SCENARIOS.map((sc) => (
          <button
            key={sc.id}
            type="button"
            className={`prio-chip ${activeScenario === sc.id ? "prio-chip--2" : "prio-chip--1"}`}
            aria-pressed={activeScenario === sc.id}
            onClick={() => setIncome({ a: sc.a, b: sc.b })}
          >
            {sc.label} <span className="prio-w">{sc.note}</span>
          </button>
        ))}
        {activeScenario === "custom" && (
          <span className="prio-chip prio-chip--2" aria-pressed="true">Custom <span className="prio-w">{money(gross)}</span></span>
        )}
      </div>
      <div className="money-fields">
        {field("a", "Gunnar")}
        {field("b", "Mikaela")}
      </div>
      <p style={{ fontSize: "var(--t-sm)", color: "var(--ink-2)" }}>
        Take-home in Campbell ≈ <b>{money(ca.net)}</b>; in Michigan ≈ <b>{money(mi.net)}</b> (Grand Rapids {money(gr.net)},
        Detroit {money(det.net)} after city tax). Federal and FICA are identical everywhere; California's
        income tax plus SDI versus Michigan's flat 4.25% comes to{" "}
        <b>{Math.abs(diff) < 1000 ? `a ${money(Math.abs(diff))}-a-year wash` : `${money(Math.abs(diff))} a year ${diff > 0 ? "in Michigan's favour" : "in California's favour"}`}</b>{" "}
        at this income. The move is about housing.
        {campbell?.rent2br && (
          <>
            {" "}
            {actual ? (
              <>
                You pay <b>{money(actual)}</b> a month in Campbell ({campbell.rentActualNote}) — <b>{Math.round(actualShare * 100)}%</b> of take-home.
                A median two-bedroom there rents for {money(campbell.rent2br)} ({Math.round(rentShare * 100)}%), so the family discount is worth about{" "}
                <b>{money(discount)} a year</b> — the price of admission for any move. Buying the {money(campbell.medianPrice)} median would run{" "}
                {money(buyCampbell)} a month ({Math.round(buyShare * 100)}%).
              </>
            ) : (
              <>
                In Campbell a median two-bedroom rents for <b>{money(campbell.rent2br)}</b> a month — <b>{Math.round(rentShare * 100)}%</b> of take-home —
                and buying the {money(campbell.medianPrice)} median would run <b>{money(buyCampbell)}</b> a month ({Math.round(buyShare * 100)}%).
              </>
            )}
          </>
        )}
      </p>
      <div className="compare-scroll">
        <table className="money-table">
          <thead>
            <tr><th>Town</th><th>Town median</th><th>Per month</th><th>Of take-home</th><th></th><th>County median</th><th>Of take-home</th><th></th><th>Left (town)</th></tr>
          </thead>
          <tbody>
            {campbell?.rent2br && (
              <tr className="is-home">
                <td>Campbell, CA — {actual ? "your actual rent" : "renting now"}</td>
                <td>{money(campbell.medianPrice)} to buy</td>
                <td>{money(actual || campbell.rent2br)} rent</td>
                <td>{Math.round((actual ? actualShare : rentShare) * 100)}%</td>
                <td><Chip tone={verdictFor(actual ? actualShare : rentShare).tone}>{verdictFor(actual ? actualShare : rentShare).label}</Chip></td>
                <td colSpan={3} className="muted">{actual ? `market 2BR ${money(campbell.rent2br)} (${Math.round(rentShare * 100)}%) · county median $1,490,600 to buy` : "county median $1,490,600 — no cheaper ring to buy in"}</td>
                <td>{money(ca.net / 12 - (actual || campbell.rent2br))}</td>
              </tr>
            )}
            {rows.map(({ town, r }) => (
              <tr key={town.id}>
                <td>{town.name}</td>
                <td>{money(r.price)}{r.priceNote ? " *" : ""}</td>
                <td>{money(r.monthly)}</td>
                <td>{r.modeled ? `${Math.round(r.share * 100)}%` : "—"}</td>
                <td>{r.modeled ? <Chip tone={r.verdict.tone}>{r.verdict.label}</Chip> : <Chip tone="ghost">not modeled</Chip>}</td>
                <td>{r.countyPrice ? money(r.countyPrice) : "—"}</td>
                <td>{r.modeled && r.countyShare ? `${Math.round(r.countyShare * 100)}%` : "—"}</td>
                <td>{r.modeled && r.countyShare ? <Chip tone={r.countyVerdict.tone}>{r.countyVerdict.label}</Chip> : "—"}</td>
                <td>{r.modeled ? money(r.left) : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="muted" style={{ fontSize: "var(--t-xs)" }}>
        "The dream" is one remote, asynchronous job at ~$95k with Mikaela not working: married filing jointly
        still, one FICA earner, and every verdict recomputed. Owning = 30-year mortgage at 6.66% with 20% down on the median sold price, plus that municipality's
        year-one uncapped property tax and $187/mo insurance. Comfortable ≤30% of take-home, a stretch ≤40%,
        out of reach above. 2025 married-filing-jointly rules, standard deduction, no other credits — built to
        compare places, not to file taxes. * county or blended figure. Ontario towns are not modeled: different
        tax system, and a US citizen needs status first.
      </p>
    </section>
  );
}

export function MoneyBlock({ r, gross }) {
  if (!r) return null;
  return (
    <div className="money-block">
      <div className="money-head">
        <span>💵 Your {money(gross)} here</span>
        {r.modeled ? <Chip tone={r.verdict.tone}>{r.verdict.label}</Chip> : <Chip tone="ghost">not modeled</Chip>}
      </div>
      {r.modeled ? (
        <dl className="money-grid">
          <div><dt>Take-home</dt><dd>{money(r.net)}/yr</dd></div>
          <div><dt>Median home, per month</dt><dd>{money(r.monthly)} · {Math.round(r.share * 100)}%</dd></div>
          <div><dt>20% down</dt><dd>{money(r.down)}</dd></div>
          <div><dt>Left after housing</dt><dd>{money(r.left)}/mo</dd></div>
          {r.countyPrice && (
            <div style={{ gridColumn: "1 / -1" }}>
              <dt>Buying in the county instead ({money(r.countyPrice)} median)</dt>
              <dd>
                {money(r.countyMonthly)}/mo · {Math.round(r.countyShare * 100)}%{" "}
                <Chip tone={r.countyVerdict.tone}>{r.countyVerdict.label}</Chip>
              </dd>
            </div>
          )}
          {r.rentActual && (
            <div style={{ gridColumn: "1 / -1" }}>
              <dt>What you actually pay ({r.rentActualNote})</dt>
              <dd>
                {money(r.rentActual)}/mo · {Math.round(r.rentActualShare * 100)}% of take-home{" "}
                <Chip tone={verdictFor(r.rentActualShare).tone}>{verdictFor(r.rentActualShare).label}</Chip>
              </dd>
            </div>
          )}
          {r.rent2br && (
            <div style={{ gridColumn: "1 / -1" }}>
              <dt>{r.rentActual ? "Market rent for a 2BR" : "Renting a 2BR instead"}</dt>
              <dd>
                {money(r.rent2br)}/mo · {Math.round(r.rentShare * 100)}% of take-home{" "}
                <Chip tone={verdictFor(r.rentShare).tone}>{verdictFor(r.rentShare).label}</Chip>
              </dd>
            </div>
          )}
        </dl>
      ) : (
        <p className="muted" style={{ fontSize: "var(--t-xs)" }}>Canadian taxes and mortgages are a different system; the median here is {money(r.price)}.</p>
      )}
      {r.priceNote && <p className="muted" style={{ fontSize: "var(--t-xs)" }}>Price: {r.priceNote}.</p>}
    </div>
  );
}
