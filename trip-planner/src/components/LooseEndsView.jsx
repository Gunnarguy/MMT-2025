import { useMemo, useState } from "react";

import { KINDS, KIND_ORDER, LOOSE_ENDS, looseEndTotals } from "../data/looseEnds";
import { useChecklist } from "../hooks/useLocalState";
import { telHref } from "../lib/format";

/**
 * Every open question on the trip, on one screen, sorted by what it asks of you.
 *
 * The organising idea: the day pages answer "what happens", this answers "what's
 * left". Sorting by demanded action rather than by severity is the whole point —
 * thirty red boxes that mostly say "I already checked this" train you to ignore
 * red, which is exactly the wrong reflex on the one day it matters.
 *
 * Ticked items are remembered in localStorage and dim out. Nothing is deleted,
 * because on a trip you want to be able to see the thing you decided against.
 */

function ItemCard({ item, done, onToggle }) {
  const kind = KINDS[item.kind];
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
        {item.problem && <p className="le-problem">{item.problem}</p>}

        {item.answer && (
          <div className="le-answer">
            <span className="le-answer-label">
              {item.kind === "done" ? "Where it landed" : "The way round it"}
            </span>
            <p>{item.answer}</p>
          </div>
        )}

        {item.options?.length > 0 && (
          <ul className="le-options">
            {item.options.map((o) => (
              <li key={o.label}>
                <b>{o.label}</b>
                <span>{o.detail}</span>
              </li>
            ))}
          </ul>
        )}

        {item.ask && (
          <div className="le-ask">
            <span className="le-ask-label">Say this</span>
            <p>{item.ask}</p>
          </div>
        )}

        {(item.deadline || item.cost) && (
          <div className="le-facts">
            {item.deadline && (
              <span>
                <b>When</b> {item.deadline}
              </span>
            )}
            {item.cost && (
              <span>
                <b>Cost</b> {item.cost}
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
              // In-app hash links must not open a new tab.
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

        {item.verified && (
          <p className="le-verified">
            <b>Checked:</b> {item.verified}
          </p>
        )}

        {item.source && (
          <div className="stop-source">
            Source ·{" "}
            <a href={item.source.url} target="_blank" rel="noreferrer">
              {item.source.name}
            </a>
          </div>
        )}
      </div>
    </article>
  );
}

export default function LooseEndsView() {
  const { checked, toggle, reset } = useChecklist("mi26.looseends");
  const [filter, setFilter] = useState(null);
  const [showDone, setShowDone] = useState(false);

  const totals = useMemo(() => looseEndTotals(), []);
  const openKinds = KIND_ORDER.filter((k) => k !== "done");

  const openItems = LOOSE_ENDS.filter((e) => e.kind !== "done");
  const doneItems = LOOSE_ENDS.filter((e) => e.kind === "done");
  const ticked = openItems.filter((e) => checked[e.id]).length;
  const pct = openItems.length ? Math.round((ticked / openItems.length) * 100) : 0;

  const visibleOpen = filter ? openItems.filter((e) => e.kind === filter) : openItems;
  const showDoneSection = !filter || filter === "done";

  return (
    <>
      <div className="page-head">
        <div className="eyebrow">Everything unresolved, in one place</div>
        <h1>
          {totals.open} things need you.
          <br />
          <em>{totals.done} are already handled.</em>
        </h1>
        <p>
          The day pages tell you what happens. This one tells you what&rsquo;s left. Sorted
          by what each thing asks of you &mdash; not by how alarming it looks &mdash; because
          a fact I already checked and closed shouldn&rsquo;t wear the same red as a
          decision only you and Mom can make.
        </p>
      </div>

      <section className="section le-progress-wrap">
        <div className="le-progress-head">
          <span className="mono">
            {ticked} / {openItems.length} cleared
          </span>
          {ticked > 0 && (
            <button type="button" className="le-reset" onClick={reset}>
              Reset
            </button>
          )}
        </div>
        <div className="meter">
          <div className="meter-fill" style={{ width: `${pct}%` }} />
        </div>
      </section>

      <section className="section">
        <div className="le-filters" role="group" aria-label="Filter by what it asks of you">
          <button
            type="button"
            className={`le-filter${filter === null ? " is-on" : ""}`}
            onClick={() => setFilter(null)}
          >
            Everything
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

      {filter !== "done" &&
        openKinds
          .filter((k) => !filter || filter === k)
          .map((k) => {
            const items = visibleOpen.filter((e) => e.kind === k);
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

      {showDoneSection && (
        <section className="section le-group">
          <div className="le-group-head le-group-head--ok">
            <h2>
              <span aria-hidden="true">{KINDS.done.icon}</span> {KINDS.done.label}
              <span className="le-group-count">{doneItems.length}</span>
            </h2>
            <p>{KINDS.done.blurb}</p>
          </div>

          <button
            type="button"
            className="le-disclose"
            aria-expanded={showDone}
            onClick={() => setShowDone((v) => !v)}
          >
            {showDone
              ? "Hide the handled ones"
              : `Show all ${doneItems.length} — every closure, price and correction, with its source`}
            <span aria-hidden="true">{showDone ? "▲" : "▼"}</span>
          </button>

          {showDone && (
            <div className="le-stack" style={{ marginTop: "var(--s-4)" }}>
              {doneItems.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  done={Boolean(checked[item.id])}
                  onToggle={() => toggle(item.id)}
                />
              ))}
            </div>
          )}
        </section>
      )}
    </>
  );
}
