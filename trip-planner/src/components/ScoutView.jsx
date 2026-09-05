import { useCallback, useMemo, useRef } from "react";
import {
  RELOCATION_TOWNS,
  SCOUT_DIMENSIONS,
  SCOUT_CAMPBELL,
  SCOUT_CAMPBELL_CLIMATE,
  SCOUT_META,
  SCOUT_TIERS,
  SCOUT_TRAPS,
} from "../data/relocation";
import { Chip, Flag } from "./bits";
import ClimateStrip from "./ClimateStrip";
import { useLocalState } from "../hooks/useLocalState";
import { CAMPBELL, daylightFor, fmtClock, fmtHours } from "../lib/daylight";
import { MoneyBlock, MoneyPanel, moneyFor } from "./YourMoney";
import { money } from "../lib/money";

/**
 * Town Scout — the trip as reconnaissance. Every overnight and drive-through
 * town, scored for actually living there. Data lives in data/relocation.js;
 * the same towns appear as a toggleable pin layer on the Map tab.
 *
 * The reader sets what matters (each priority: counts / counts double / off)
 * and the fifteen towns re-rank live. Scores are ours, 0–10, derived from the
 * researched figures; the raw numbers sit in each card's full workup.
 */
const WORKUP_SECTIONS = [
  ["demographics", "👥 Who lives here"],
  ["errands", "🛒 Groceries & errands"],
  ["shipping", "📦 Shipping & delivery"],
  ["healthcare", "🏥 Healthcare"],
  ["schools", "🎒 Schools"],
  ["economy", "💼 Jobs & economy"],
  ["airport", "✈️ Airports"],
  ["lifestyle", "🍺 Walkability & lifestyle"],
  ["climate", "🌦️ Climate beyond snow"],
  ["gotchas", "⚠️ Mover gotchas"],
];

const DEFAULT_WEIGHTS = Object.fromEntries(SCOUT_DIMENSIONS.map((d) => [d.key, 1]));

const SUMMARY_ROWS = [
  ["Median home", (t) => t.median],
  ["Comfortable income", (t) => t.comfort],
  ["Crime v/p per 1k", (t) => t.crime],
  ["Snow per year (1991–2020 normal)", (t) => t.snow],
  ["Internet", (t) => t.fiber],
  ["Property tax", (t) => t.tax],
  ["To Palatine", (t) => t.drive],
  ["Rain per year (NOAA)", (t) => (t.climate ? `${t.climate.annual.rain}″` : "—")],
  ["Snow on the ground", (t) => (t.climate ? `${Math.round(t.climate.annual.snowCover)} days` : "—")],
  ["Nights below 0°F", (t) => (t.climate ? `${Math.round(t.climate.annual.below0)}` : "—")],
];

function matchPercent(town, weights) {
  let num = 0;
  let den = 0;
  for (const d of SCOUT_DIMENSIONS) {
    const w = weights[d.key] ?? 1;
    if (!w) continue;
    num += (town.scores?.[d.key] ?? 0) * w;
    den += 10 * w;
  }
  if (!den) {
    for (const d of SCOUT_DIMENSIONS) {
      num += town.scores?.[d.key] ?? 0;
      den += 10;
    }
  }
  return Math.round((100 * num) / den);
}

export default function ScoutView() {
  const [weights, setWeights] = useLocalState("scout-weights", DEFAULT_WEIGHTS);
  const [compare, setCompare] = useLocalState("scout-compare", []);
  const [showCompare, setShowCompare] = useLocalState("scout-compare-open", false);
  const [income, setIncome] = useLocalState("scout-income", { a: 65000, b: 56000 });
  const moneyOf = useMemo(
    () =>
      Object.fromEntries(
        (SCOUT_CAMPBELL ? [SCOUT_CAMPBELL, ...RELOCATION_TOWNS] : RELOCATION_TOWNS).map((t) => [t.id, moneyFor(t, income)]),
      ),
    [income],
  );
  const moneyRows = useMemo(
    () =>
      RELOCATION_TOWNS.map((town) => ({ town, r: moneyOf[town.id] }))
        .filter((x) => x.r)
        .sort((a, b) => (a.r.modeled ? a.r.share : 9) - (b.r.modeled ? b.r.share : 9)),
    [moneyOf],
  );
  const cardRefs = useRef({});
  const compareRef = useRef(null);
  // The parent owns the ref map; cards receive a registrar instead of the map itself.
  const registerRef = useCallback(
    (id) => (el) => {
      cardRefs.current[id] = el;
    },
    [],
  );

  const ranked = useMemo(
    () =>
      RELOCATION_TOWNS.map((t) => ({ t, match: matchPercent(t, weights) })).sort(
        (a, b) => b.match - a.match,
      ),
    [weights],
  );
  const matchOf = Object.fromEntries(ranked.map((r) => [r.t.id, r.match]));
  if (SCOUT_CAMPBELL) matchOf[SCOUT_CAMPBELL.id] = matchPercent(SCOUT_CAMPBELL, weights);
  const ALL_TOWNS = SCOUT_CAMPBELL ? [SCOUT_CAMPBELL, ...RELOCATION_TOWNS] : RELOCATION_TOWNS;
  const activeCount = SCOUT_DIMENSIONS.filter((d) => (weights[d.key] ?? 1) > 0).length;

  const cycle = (key) => setWeights((w) => ({ ...w, [key]: ((w[key] ?? 1) + 1) % 3 }));
  const toggleCompare = (id) =>
    setCompare((c) => (c.includes(id) ? c.filter((x) => x !== id) : c.length >= 3 ? c : [...c, id]));
  const compareTowns = compare.map((id) => ALL_TOWNS.find((t) => t.id === id)).filter(Boolean);
  const jump = (id) => cardRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  const openCompare = () => {
    setShowCompare(true);
    setTimeout(() => compareRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  return (
    <>
      <div className="page-head">
        <div className="eyebrow">Could we live here?</div>
        <h1>Fifteen towns, scouted</h1>
        <p>
          This trip drives through every one of them, so each got a full livability
          workup — and a scorecard. Tell it what matters to you and the list re-ranks.
          Under each card: home prices, what a comfortable year costs, crime, snow,
          internet, the property-tax bill nobody advertises, how short the December
          days really get, and the full picture — groceries and Costco distance,
          Amazon speed, the nearest ER, schools, employers, airports, walkability,
          climate, and who actually lives there. The same towns are a pin layer on
          the Map tab.
        </p>
      </div>

      <div className="stat-grid" style={{ marginBottom: "var(--s-5)" }}>
        <ScoutStat value="15" label="Towns scouted" note="Every stop on the route" />
        <ScoutStat
          value={`${SCOUT_META.confirmed}✓ / ${SCOUT_META.correctedFigures}≈`}
          label="Figures verified"
          note="Confirmed / corrected to ranges"
        />
        <ScoutStat value="3 hrs" label="Ahead of Campbell" note="Eastern time; Palatine is 1 hour behind" />
      </div>

      <MoneyPanel income={income} setIncome={setIncome} rows={moneyRows} campbell={SCOUT_CAMPBELL?.money} />

      <section className="scout-prio">
        <div className="card card-pad">
          <div className="card-head">
            <div style={{ minWidth: 0 }}>
              <div className="eyebrow">What matters to you</div>
              <h2 style={{ fontSize: "var(--t-xl)", marginTop: "0.15rem" }}>Weight it, and the list re-ranks</h2>
            </div>
            <button type="button" className="scout-btn" onClick={() => setWeights(DEFAULT_WEIGHTS)}>
              Reset
            </button>
          </div>
          <p className="muted" style={{ fontSize: "var(--t-sm)", marginBottom: "var(--s-2)" }}>
            Tap a priority once to make it count double, again to switch it off. Each town is scored
            0–10 per priority from the researched figures — the raw numbers are in every card's workup.
            {activeCount === 0 && " (Everything is off, so this is an unweighted average.)"}
          </p>
          <div className="prio-chips">
            {SCOUT_DIMENSIONS.map((d) => {
              const w = weights[d.key] ?? 1;
              return (
                <button
                  key={d.key}
                  type="button"
                  className={`prio-chip prio-chip--${w}`}
                  aria-pressed={w > 0}
                  title={d.hint}
                  onClick={() => cycle(d.key)}
                >
                  <span aria-hidden="true">{d.icon}</span>
                  {d.label}
                  <span className="prio-w">{w === 2 ? "×2" : w === 0 ? "off" : ""}</span>
                </button>
              );
            })}
          </div>
          <div className="eyebrow" style={{ marginBottom: "0.35rem" }}>Your ranking</div>
          <div className="scout-rank" role="list">
            {ranked.map(({ t, match }, i) => {
              const tier = SCOUT_TIERS.find((x) => x.id === t.tier);
              return (
                <button
                  key={t.id}
                  type="button"
                  role="listitem"
                  className="rank-item"
                  style={{ "--tc": tier.color }}
                  onClick={() => jump(t.id)}
                  title={`Jump to ${t.name}`}
                >
                  <span className="rank-n">{i + 1}</span>
                  <span className="rank-name">{t.name}</span>
                  <span className="rank-bar"><i style={{ width: `${match}%` }} /></span>
                  <span className="rank-pct">{match}% match</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {showCompare && compareTowns.length >= 2 && (
        <section ref={compareRef} className="card card-pad compare">
          <div className="card-head">
            <div>
              <div className="eyebrow">Side by side</div>
              <h2 style={{ fontSize: "var(--t-xl)", marginTop: "0.15rem" }}>
                {compareTowns.map((t) => t.name).join(" · ")}
              </h2>
            </div>
            <button type="button" className="scout-btn" onClick={() => setShowCompare(false)}>
              Close
            </button>
          </div>
          <div className="compare-scroll">
            <table>
              <thead>
                <tr>
                  <th />
                  {compareTowns.map((t) => (
                    <th key={t.id}>
                      {t.name} <span className="match-pill">{matchOf[t.id]}%</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SUMMARY_ROWS.map(([label, get]) => (
                  <tr key={label}>
                    <td className="lab">{label}</td>
                    {compareTowns.map((t) => (
                      <td key={t.id}>{get(t)}</td>
                    ))}
                  </tr>
                ))}
                {SCOUT_DIMENSIONS.map((d) => (
                  <tr key={d.key}>
                    <td className="lab">{d.icon} {d.label}</td>
                    {compareTowns.map((t) => {
                      const tier = SCOUT_TIERS.find((x) => x.id === t.tier);
                      const v = t.scores?.[d.key] ?? 0;
                      return (
                        <td key={t.id}>
                          <span className="score-bar cmp" style={{ "--tc": tier.color }}>
                            <i style={{ width: `${v * 10}%` }} />
                          </span>{" "}
                          <span className="score-v">{v}</span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
                <tr>
                  <td className="lab">💵 Median home on your income</td>
                  {compareTowns.map((t) => {
                    const r = moneyOf[t.id];
                    return (
                      <td key={t.id}>
                        {r?.modeled ? (
                          <>
                            {money(r.monthly)}/mo · {Math.round(r.share * 100)}% <Chip tone={r.verdict.tone}>{r.verdict.label}</Chip>
                          </>
                        ) : "—"}
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  <td className="lab">For</td>
                  {compareTowns.map((t) => (
                    <td key={t.id}>
                      <div className="badge-row">
                        {(t.badges?.pro || []).map((b) => <Chip key={b} tone="ok">{b}</Chip>)}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="lab">Against</td>
                  {compareTowns.map((t) => (
                    <td key={t.id}>
                      <div className="badge-row">
                        {(t.badges?.con || []).map((b) => <Chip key={b} tone="stop">{b}</Chip>)}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      {SCOUT_CAMPBELL && (
        <section style={{ marginBottom: "var(--s-6)" }}>
          <div className="eyebrow" style={{ color: "var(--accent)", marginBottom: "0.35rem" }}>
            Where you live now · the baseline
          </div>
          <p className="muted" style={{ fontSize: "var(--t-sm)", marginBottom: "var(--s-3)" }}>
            Campbell, quantified the same way as the fifteen towns below, so every comparison has a
            floor you already know. Add it to a side-by-side.
          </p>
          <div className="stay-grid">
            <TownCard
              t={SCOUT_CAMPBELL}
              tier={{ id: "home", color: "var(--accent)" }}
              weights={weights}
              matchOf={matchOf}
              moneyOf={moneyOf}
              income={income}
              compare={compare}
              toggleCompare={toggleCompare}
              registerRef={registerRef}
              isHome
            />
          </div>
        </section>
      )}

      {SCOUT_TIERS.map((tier) => {
        const towns = RELOCATION_TOWNS.filter((t) => t.tier === tier.id);
        return (
          <section key={tier.id} style={{ marginBottom: "var(--s-6)" }}>
            <div className="eyebrow" style={{ color: tier.color, marginBottom: "0.35rem" }}>
              {tier.label} · {towns.length}
            </div>
            <p className="muted" style={{ fontSize: "var(--t-sm)", marginBottom: "var(--s-3)" }}>
              {tier.blurb}
            </p>
            <div className="stay-grid">
              {towns.map((t) => (
                <TownCard
                  key={t.id}
                  t={t}
                  tier={tier}
                  weights={weights}
                  matchOf={matchOf}
                  moneyOf={moneyOf}
                  income={income}
                  compare={compare}
                  toggleCompare={toggleCompare}
                  registerRef={registerRef}
                />
              ))}
            </div>
          </section>
        );
      })}

      <section style={{ marginBottom: "var(--s-6)" }}>
        <div className="eyebrow" style={{ marginBottom: "var(--s-3)" }}>
          What a listing never tells a California buyer
        </div>
        {SCOUT_TRAPS.map((trap) => (
          <Flag key={trap.title} level={trap.level} title={trap.title}>
            {trap.body}
          </Flag>
        ))}
      </section>

      <p className="muted" style={{ fontSize: "var(--t-xs)" }}>
        Researched {SCOUT_META.researched}, housing rebuilt {SCOUT_META.corrected}.{" "}
        {SCOUT_META.method} Scores are ours: 0–10 per priority, derived from the researched
        figures and stated in each card. Daylight is computed from coordinates. What no dataset
        holds — how February feels, whether downtown is alive at 7pm — is what the drive itself
        is for.
      </p>

      {compare.length > 0 && (
        <div className="compare-bar" role="region" aria-label="Compare towns">
          <span className="muted" style={{ fontSize: "var(--t-sm)" }}>Comparing</span>
          {compareTowns.map((t) => (
            <button key={t.id} type="button" className="compare-tag" onClick={() => toggleCompare(t.id)} title="Remove">
              {t.name} ×
            </button>
          ))}
          <button type="button" className="scout-btn is-on" disabled={compare.length < 2} onClick={openCompare}>
            {compare.length < 2 ? "Pick one more" : `Compare ${compare.length}`}
          </button>
          <button
            type="button"
            className="scout-btn"
            onClick={() => {
              setCompare([]);
              setShowCompare(false);
            }}
          >
            Clear
          </button>
        </div>
      )}
    </>
  );
}

function TownCard({ t, tier, weights, matchOf, moneyOf, income, compare, toggleCompare, registerRef, isHome = false }) {
  const compared = compare.includes(t.id);
  return (
        <article
          key={t.id}
          ref={registerRef(t.id)}
          className={`card card-pad scout-card${compared ? " is-compared" : ""}${isHome ? " is-home" : ""}`}
          style={{ borderTop: `3px solid ${tier.color}`, "--tc": tier.color }}
        >
          <div className="card-head" style={{ marginBottom: 0 }}>
            <div style={{ minWidth: 0 }}>
              <h3 style={{ fontSize: "var(--t-lg)" }}>{t.name}</h3>
              <div className="muted" style={{ fontSize: "var(--t-sm)" }}>
                {t.county} · {t.drive}
              </div>
            </div>
            <div className="scout-head-right">
              <span className="match-pill" title="Match to your priorities">{matchOf[t.id]}%</span>
              <Chip tone={t.verified === "yes" ? "locked" : "warn"}>
                {t.verified === "yes" ? "✓ verified" : "≈ sources split"}
              </Chip>
            </div>
          </div>

          {t.oneLiner && <p className="scout-oneliner">{t.oneLiner}</p>}

          {t.scores && (
            <div className="scorecard" aria-label="Scorecard, 0 to 10">
              {SCOUT_DIMENSIONS.map((d) => {
                const v = t.scores[d.key] ?? 0;
                const w = weights[d.key] ?? 1;
                return (
                  <div
                    key={d.key}
                    className={`score-row${w === 0 ? " is-off" : ""}${w === 2 ? " is-double" : ""}`}
                    title={`${d.label}: ${v}/10 — ${d.hint}`}
                  >
                    <span className="score-lab">
                      <span aria-hidden="true">{d.icon}</span> {d.label}
                    </span>
                    <span className="score-bar"><i style={{ width: `${v * 10}%` }} /></span>
                    <span className="score-v">{v}</span>
                  </div>
                );
              })}
            </div>
          )}

          {t.badges && (
            <div className="badge-row">
              {t.badges.pro.map((b) => <Chip key={b} tone="ok">{b}</Chip>)}
              {t.badges.con.map((b) => <Chip key={b} tone="stop">{b}</Chip>)}
            </div>
          )}

          <dl className="scout-facts">
            {SUMMARY_ROWS.slice(0, 6).map(([k, get]) => (
              <FactRow key={k} k={k} v={get(t)} />
            ))}
          </dl>

          <Daylight coords={t.coords} isHome={isHome} />
          <MoneyBlock r={moneyOf[t.id]} gross={income.a + income.b} />
          <ClimateStrip climate={t.climate} sf={isHome ? null : SCOUT_CAMPBELL_CLIMATE} baselineName="Campbell" color={tier.color} />

          <p style={{ fontSize: "var(--t-sm)", color: "var(--ink-2)" }}>{t.verdict}</p>

          <div className="scout-actions">
            <button
              type="button"
              className={`scout-btn${compared ? " is-on" : ""}`}
              aria-pressed={compared}
              disabled={!compared && compare.length >= 3}
              onClick={() => toggleCompare(t.id)}
              title={!compared && compare.length >= 3 ? "Three at a time" : "Add to side-by-side"}
            >
              {compared ? "✓ Comparing" : "+ Compare"}
            </button>
          </div>

          {t.workup && (
            <details className="scout-workup">
              <summary>Full workup — errands, shipping, healthcare, schools, jobs, airports, lifestyle, climate, demographics</summary>
              {WORKUP_SECTIONS.map(([key, label]) =>
                t.workup[key]?.length ? (
                  <div key={key} className="scout-workup-section">
                    <div className="eyebrow">{label}</div>
                    <dl className="scout-facts">
                      {t.workup[key].map(([k, v]) => (
                        <FactRow key={k} k={k} v={v} />
                      ))}
                    </dl>
                  </div>
                ) : null,
              )}
              {t.workup.sources && (
                <p className="muted" style={{ fontSize: "var(--t-xs)", marginTop: "var(--s-2)" }}>
                  {t.workup.sources}
                </p>
              )}
            </details>
          )}
        </article>

  );
}

function Daylight({ coords, isHome = false }) {
  if (!coords) return null;
  const d = daylightFor(coords[0], coords[1]);
  const base = CAMPBELL;
  const dW = Math.round((d.winter.hours - base.winter.hours) * 60);
  const dS = Math.round((d.summer.hours - base.summer.hours) * 60);
  const rel = (m) => (m < 0 ? `${-m} min less than Campbell` : `${m} min more than Campbell`);
  return (
    <div className="daylight">
      <span className="daylight-k" aria-hidden="true">☀️</span>
      <span>
        Shortest day <b>{fmtHours(d.winter.hours)}</b>, sunset {fmtClock(d.winter.sunset)}
        {isHome ? "" : ` (${rel(dW)})`} · longest <b>{fmtHours(d.summer.hours)}</b>, sunset {fmtClock(d.summer.sunset)}
        {isHome ? " — the baseline the other cards compare to" : ` (${rel(dS)})`}
      </span>
    </div>
  );
}

function FactRow({ k, v }) {
  return (
    <div className="scout-fact">
      <dt>{k}</dt>
      <dd>{v}</dd>
    </div>
  );
}

function ScoutStat({ value, label, note }) {
  return (
    <div className="stat">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      {note && <div className="stat-note">{note}</div>}
    </div>
  );
}
