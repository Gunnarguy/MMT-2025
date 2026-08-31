import {
  RELOCATION_TOWNS,
  SCOUT_META,
  SCOUT_TIERS,
  SCOUT_TRAPS,
} from "../data/relocation";
import { Chip, Flag } from "./bits";

/**
 * Town Scout — the trip as reconnaissance. Every overnight and drive-through
 * town, scored for actually living there. Data lives in data/relocation.js;
 * the same towns appear as a toggleable pin layer on the Map tab.
 */
export default function ScoutView() {
  return (
    <>
      <div className="page-head">
        <div className="eyebrow">Could we live here?</div>
        <h1>Fifteen towns, scouted</h1>
        <p>
          This trip drives through every one of them, so each got a full
          livability workup — home prices, what a comfortable year costs, crime,
          snow, internet, and the property-tax bill nobody advertises. Numbers
          are ranges wherever sources disagree, because a single crisp number
          would be false precision. The same towns are a pin layer on the Map
          tab.
        </p>
      </div>

      <div className="stat-grid" style={{ marginBottom: "var(--s-5)" }}>
        <ScoutStat value="15" label="Towns scouted" note="Every stop on the route" />
        <ScoutStat
          value={`${SCOUT_META.confirmed}✓ / ${SCOUT_META.correctedFigures}≈`}
          label="Figures verified"
          note="Confirmed / corrected to ranges"
        />
        <ScoutStat value="3:31–6:34" label="To Palatine" note="Grand Rapids closest, the Straits farthest" />
      </div>

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
                <article
                  key={t.id}
                  className="card card-pad"
                  style={{ borderTop: `3px solid ${tier.color}` }}
                >
                  <div className="card-head" style={{ marginBottom: 0 }}>
                    <div style={{ minWidth: 0 }}>
                      <h3 style={{ fontSize: "var(--t-lg)" }}>{t.name}</h3>
                      <div className="muted" style={{ fontSize: "var(--t-sm)" }}>
                        {t.county} · {t.drive}
                      </div>
                    </div>
                    <Chip tone={t.verified === "yes" ? "locked" : "warn"}>
                      {t.verified === "yes" ? "✓ verified" : "≈ sources split"}
                    </Chip>
                  </div>

                  <dl className="scout-facts">
                    <FactRow k="Median home" v={t.median} />
                    <FactRow k="Comfortable income" v={t.comfort} />
                    <FactRow k="Crime v/p per 1k" v={t.crime} />
                    <FactRow k="Snow per year" v={t.snow} />
                    <FactRow k="Internet" v={t.fiber} />
                    <FactRow k="Property tax" v={t.tax} />
                  </dl>

                  <p style={{ fontSize: "var(--t-sm)", color: "var(--ink-2)" }}>
                    {t.verdict}
                  </p>
                </article>
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
        {SCOUT_META.method} What no dataset
        holds — how February feels, whether downtown is alive at 7pm — is what
        the drive itself is for.
      </p>
    </>
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
