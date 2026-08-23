import { PACK, PREP, WEATHER } from "../data/pack";
import { useChecklist } from "../hooks/useLocalState";
import { Flag, Source } from "./bits";
import Checklist from "./Checklist";

export default function PackView() {
  const prep = useChecklist("mi26.prep");
  const bag = useChecklist("mi26.pack");

  return (
    <>
      <div className="page-head">
        <div className="eyebrow">Before you go</div>
        <h1>Weather &amp; what to bring</h1>
        <p>
          Northern Michigan in mid-September runs about thirty degrees between dawn and
          mid-afternoon, and the Straits are colder and windier than anywhere else on
          this route. Layers are not optional.
        </p>
      </div>

      <section>
        <h2 style={{ fontSize: "var(--t-lg)", marginBottom: "var(--s-3)" }}>
          Mid-September normals along the route
        </h2>
        <div className="weather-strip">
          {WEATHER.places.map((w) => (
            <div className="wcell" key={w.place}>
              <div className="wcell-place">{w.place}</div>
              <div className="wcell-temp">
                {w.high}°<small>/{w.low}°</small>
              </div>
              <div className="wcell-note">{w.note}</div>
            </div>
          ))}
        </div>
        <Source name={WEATHER.source} url={WEATHER.sourceUrl} />
        {WEATHER.flags?.map((f) => (
          <div key={f.title} style={{ marginTop: "var(--s-4)" }}>
            <Flag level={f.level} title={f.title}>
              {f.body}
            </Flag>
          </div>
        ))}
      </section>

      <section className="section">
        <h2>Do these before September 14</h2>
        <p className="section-lede">
          Ordered by how badly it hurts to forget. Everything ticked here is saved on
          this device.
        </p>
        <Checklist items={PREP} state={prep} />
      </section>

      <section className="section">
        <div className="trunk-fit-card">
          <div className="trunk-fit-head">
            <b>🚙 Mazda CX-50 Trunk Cargo &amp; Fit Guide</b>
            <span className="trunk-stat">31.4 cu ft flat load space</span>
          </div>
          <p style={{ fontSize: "var(--t-xs)", color: "var(--ink-2)", margin: 0 }}>
            Optimized for 3 passengers: The wide cargo floor accommodates <b>3 standard 22&Prime; carry-on rollaboards</b> side-by-side on their sides, plus <b>3 daypacks and a warm fleece tote</b> on top. All gear stays below the rear seatback line, keeping luggage out of view at public trailhead parking lots.
          </p>
        </div>

        <h2>The bag</h2>
        <p className="section-lede">
          Tailored to this route — not a generic list. The island day and the Sleeping
          Bear dune climb drive most of it.
        </p>
        <div className="pack-grid">
          {PACK.map((group) => (
            <div key={group.group} className="card card-pad">
              <div className="card-head">
                <h3>{group.group}</h3>
              </div>
              {group.why && (
                <p
                  className="muted"
                  style={{ fontSize: "var(--t-sm)", marginBottom: "var(--s-3)" }}
                >
                  {group.why}
                </p>
              )}
              <Checklist items={group.items} state={bag} showProgress={false} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
