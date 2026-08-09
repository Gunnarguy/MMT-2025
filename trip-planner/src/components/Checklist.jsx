/**
 * A list of things to tick off. State lives in localStorage via `useChecklist`,
 * passed in by the parent so several lists can share one storage key namespace.
 */
export default function Checklist({ items, state, showProgress = true }) {
  const { checked, toggle, reset, count } = state;
  const total = items.length;
  const pct = total ? Math.round((count / total) * 100) : 0;

  return (
    <div>
      {showProgress && (
        <div style={{ marginBottom: "var(--s-3)" }}>
          <div
            className="row"
            style={{
              justifyContent: "space-between",
              fontSize: "var(--t-xs)",
              color: "var(--ink-3)",
              marginBottom: "var(--s-2)",
            }}
          >
            <span className="mono">
              {count} / {total} done
            </span>
            {count > 0 && (
              <button
                type="button"
                onClick={reset}
                style={{ color: "var(--ink-4)", textDecoration: "underline" }}
              >
                Reset
              </button>
            )}
          </div>
          <div className="meter">
            <div className="meter-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}

      <ul className="checklist">
        {items.map((item) => {
          const id = item.id || item.text;
          const on = Boolean(checked[id]);
          return (
            <li key={id}>
              <button
                type="button"
                className="check"
                aria-pressed={on}
                onClick={() => toggle(id)}
              >
                <span className="check-box" aria-hidden="true">
                  ✓
                </span>
                <span className="check-text">
                  <span>{item.text}</span>
                  {item.note && <small>{item.note}</small>}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
