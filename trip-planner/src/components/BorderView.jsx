import { BORDER } from "../data/border";
import { useChecklist } from "../hooks/useLocalState";
import { Chip, Flag, Source } from "./bits";
import Checklist from "./Checklist";
import { BlueWaterBridgeSteps, DetroitTunnelSteps } from "./visuals/BorderCrossingSteps";

export default function BorderView() {
  const docs = useChecklist("mi26.border-docs");

  return (
    <>
      <div className="page-head">
        <div className="eyebrow">Ontario, one night</div>
        <h1>Crossing the border</h1>
        <p>
          You leave the country Saturday evening and come back Sunday afternoon. It is
          a short hop, which is exactly why it is easy to under-prepare for. This page
          is the whole brief.
        </p>
      </div>

      {BORDER.critical.map((f) => (
        <div key={f.title} style={{ marginBottom: "var(--s-4)" }}>
          <Flag level={f.level} title={f.title} fix={f.fix}>
            {f.body}
          </Flag>
        </div>
      ))}

      <section className="section">
        <h2>Both crossings</h2>
        <p className="section-lede">
          Two different bridges, two different tunnels of bureaucracy. Here is what
          each one actually involves.
        </p>
        <div className="stack" style={{ gap: "var(--s-4)" }}>
          {BORDER.crossings.map((c) => (
            <div key={c.id} className="crossing">
              <span className="crossing-dir">{c.when}</span>
              <div style={{ minWidth: 0 }}>
                <h3 style={{ fontSize: "var(--t-lg)", marginBottom: "0.15rem" }}>
                  {c.name}
                </h3>
                <div
                  className="muted"
                  style={{ fontSize: "var(--t-sm)", marginBottom: "var(--s-2)" }}
                >
                  {c.from} → {c.to}
                </div>
                <div className="row" style={{ marginBottom: "var(--s-3)" }}>
                  <Chip tone="ghost">Toll {c.toll}</Chip>
                  <Chip tone="ghost">Typical wait {c.wait}</Chip>
                  {c.tags?.map((t) => (
                    <Chip key={t} tone="info">
                      {t}
                    </Chip>
                  ))}
                </div>
                <p style={{ fontSize: "var(--t-sm)", color: "var(--ink-2)" }}>
                  {c.notes}
                </p>
                <Source name={c.source} url={c.sourceUrl} />
              </div>
            </div>
          ))}
        </div>

        <BlueWaterBridgeSteps />
        <DetroitTunnelSteps />
      </section>

      <section className="section">
        <h2>Documents, before you leave the driveway</h2>
        <p className="section-lede">
          Tick these off now, not on September 19th. Progress is saved on this device.
        </p>
        <Checklist items={BORDER.documents} state={docs} />
      </section>

      <section className="section">
        <h2>The rental car</h2>
        <div className="stack" style={{ gap: "var(--s-4)" }}>
          {BORDER.rental.map((r) => (
            <div key={r.title} className="card card-pad">
              <div className="card-head">
                <h3>{r.title}</h3>
                {r.status && <Chip tone={r.statusTone || "warn"}>{r.status}</Chip>}
              </div>
              <p style={{ fontSize: "var(--t-sm)", color: "var(--ink-2)" }}>
                {r.body}
              </p>
              <Source name={r.source} url={r.sourceUrl} />
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Money, phones, and driving on the other side</h2>
        <div className="stat-grid">
          {BORDER.practical.map((p) => (
            <div key={p.label} className="stat">
              <div className="stat-value" style={{ fontSize: "var(--t-lg)" }}>
                {p.value}
              </div>
              <div className="stat-label">{p.label}</div>
              {p.note && <div className="stat-note">{p.note}</div>}
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>What you cannot bring back</h2>
        <div className="stack" style={{ gap: "var(--s-3)" }}>
          {BORDER.contraband.map((c) => (
            <Flag key={c.title} level={c.level} title={c.title}>
              {c.body}
            </Flag>
          ))}
        </div>
      </section>
    </>
  );
}
