import { useMemo, useState } from "react";

import { KINDS, KIND_ORDER, LOOSE_ENDS, looseEndTotals } from "../data/looseEnds";
import { useChecklist } from "../hooks/useLocalState";
import { telHref } from "../lib/format";

function ItemCard({ item, done, onToggle }) {
  const kind = KINDS[item.kind] || { tone: "info", icon: "📌", label: "Note" };
  const tel = telHref(item.phone);

  return (
    <article className={`le-card le-card--${kind.tone}${done ? " is-done" : ""}`}>
      <div className="le-card-head">
        <button
          type="button"
          className="le-tick"
          aria-pressed={done}
          aria-label={done ? "Mark as not done" : "Mark as done"}
          onClick={onToggle}
        >
          <span aria-hidden="true">✓</span>
        </button>

        <div className="le-card-heading">
          <div className="le-card-meta">
            <span className={`le-badge le-badge--${kind.tone}`}>
              <span aria-hidden="true">{kind.icon}</span>
              {kind.label}
            </span>
            {item.dayId && (
              <a className="le-daylink" href={`#/day/${item.dayId}`}>
                {item.when}
              </a>
            )}
            {!item.dayId && item.when && <span className="le-when">{item.when}</span>}
          </div>
          <h3>{item.title}</h3>
        </div>
      </div>

      <div className="le-card-body">
        {(item.summary || item.problem) && (
          <p style={{ margin: "0 0 var(--s-3)", color: "var(--fg)", lineHeight: 1.5 }}>
            {item.summary || item.problem}
          </p>
        )}

        {(item.deadline || item.cost) && (
          <div className="le-facts" style={{ marginBottom: "var(--s-3)" }}>
            {item.deadline && (
              <span>
                <b>When:</b> {item.deadline}
              </span>
            )}
            {item.cost && (
              <span>
                <b>Cost:</b> {item.cost}
              </span>
            )}
          </div>
        )}

        {(tel || item.url) && (
          <div className="actions le-actions">
            {tel && (
              <a className="action" href={tel}>
                <span aria-hidden="true">📞</span>
                {item.phone}
              </a>
            )}
            {item.url &&
              (item.url.startsWith("#") ? (
                <a className="action" href={item.url}>
                  <span aria-hidden="true">→</span>
                  {item.urlLabel || "Open"}
                </a>
              ) : (
                <a className="action" href={item.url} target="_blank" rel="noreferrer">
                  <span aria-hidden="true">🔗</span>
                  {item.urlLabel || "Open"}
                </a>
              ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default function LooseEndsView() {
  const { checked, toggle, reset } = useChecklist("mi26.looseends");
  const [filter, setFilter] = useState(null);

  const totals = useMemo(() => looseEndTotals(), []);
  const openItems = LOOSE_ENDS;
  const ticked = openItems.filter((e) => checked[e.id]).length;
  const pct = openItems.length ? Math.round((ticked / openItems.length) * 100) : 0;

  const visibleItems = filter ? openItems.filter((e) => e.kind === filter) : openItems;

  return (
    <>
      <div className="page-head">
        <div className="eyebrow">Essential Pre-Trip Checklist</div>
        <h1>Key Action Items & Reservations</h1>
        <p>
          The few essential bookings, counter requests, and border requirements for the road trip.
        </p>
      </div>

      <section className="section le-progress-wrap">
        <div className="le-progress-head">
          <span className="mono">
            {ticked} / {openItems.length} completed
          </span>
          {ticked > 0 && (
            <button type="button" className="le-reset" onClick={reset}>
              Reset Checklist
            </button>
          )}
        </div>
        <div className="meter">
          <div className="meter-fill" style={{ width: `${pct}%` }} />
        </div>
      </section>

      <section className="section">
        <div className="le-filters" role="group" aria-label="Filter action items">
          <button
            type="button"
            className={`le-filter${filter === null ? " is-on" : ""}`}
            onClick={() => setFilter(null)}
          >
            All Action Items
            <b>{totals.total}</b>
          </button>
          {KIND_ORDER.map((k) => (
            <button
              key={k}
              type="button"
              className={`le-filter le-filter--${KINDS[k].tone}${filter === k ? " is-on" : ""}`}
              onClick={() => setFilter(filter === k ? null : k)}
            >
              <span aria-hidden="true">{KINDS[k].icon}</span>
              {KINDS[k].label}
              <b>{totals.byKind[k]}</b>
            </button>
          ))}
        </div>
      </section>

      {KIND_ORDER.filter((k) => !filter || filter === k).map((k) => {
        const items = visibleItems.filter((e) => e.kind === k);
        if (!items.length) return null;
        return (
          <section className="section le-group" key={k}>
            <div className={`le-group-head le-group-head--${KINDS[k].tone}`}>
              <h2>
                <span aria-hidden="true">{KINDS[k].icon}</span> {KINDS[k].label}
                <span className="le-group-count">{items.length}</span>
              </h2>
              <p>{KINDS[k].blurb}</p>
            </div>
            <div className="le-stack">
              {items.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  done={Boolean(checked[item.id])}
                  onToggle={() => toggle(item.id)}
                />
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
