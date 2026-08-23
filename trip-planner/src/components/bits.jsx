/**
 * Tiny shared presentational pieces. Deliberately dumb — no state, no fetching.
 */

import { directionsHref, mapHref, telHref } from "../lib/format";

const FLAG_ICON = { stop: "⛔", warn: "⚠️", info: "ℹ️", ok: "✅" };

/** Coloured status pill. */
export function Chip({ tone = "ghost", children, title }) {
  return (
    <span className={`chip chip--${tone}`} title={title}>
      {children}
    </span>
  );
}

/**
 * A callout: something that will bite you, or something already handled.
 *
 * An `ok` flag is a finding that has been chased down and closed — so its
 * follow-up line is phrased as an outcome ("Where it lands") rather than an
 * instruction. Reading "Do this:" under a green tick is the small kind of wrong
 * that makes people stop trusting the colours.
 */
const FIX_LABEL = { ok: "Note:", info: "Note:", warn: "Tip:", stop: "Action:" };

export function Flag({ level = "info", title, children, fix }) {
  return (
    <div className={`flag flag--${level}`}>
      <span className="flag-icon" aria-hidden="true">
        {FLAG_ICON[level]}
      </span>
      <div>
        {title && <div className="flag-title">{title}</div>}
        {children && <div className="flag-body">{children}</div>}
        {fix && (
          <div className="flag-fix">
            <b>{FIX_LABEL[level] || "Tip:"}</b> {fix}
          </div>
        )}
      </div>
    </div>
  );
}

/** A single number worth staring at. */
export function Stat({ value, unit, label, note }) {
  return (
    <div className="stat">
      <div className="stat-value">
        {value}
        {unit && <small>{unit}</small>}
      </div>
      <div className="stat-label">{label}</div>
      {note && <div className="stat-note">{note}</div>}
    </div>
  );
}

/** Verbatim text lifted out of Mom's document. Never paraphrase inside this. */
export function MomSaid({ children, label = "Mom's Itinerary Notes" }) {
  return (
    <div className="momsaid">
      <span className="momsaid-label">{label}</span>
      {children}
    </div>
  );
}

/**
 * Tap targets that matter in a moving car: call, navigate, open the site.
 * Anything falsy is skipped, so callers can pass sparse data without guards.
 */
export function ActionRow({ phone, mapQuery, from, url, urlLabel = "Website", extra }) {
  const tel = telHref(phone);
  const map = mapHref(mapQuery);
  const dir = from ? directionsHref(from, mapQuery) : null;

  if (!tel && !map && !url && !extra) return null;

  return (
    <div className="actions">
      {tel && (
        <a className="action" href={tel}>
          <span aria-hidden="true">📞</span>
          {phone}
        </a>
      )}
      {dir ? (
        <a className="action" href={dir} target="_blank" rel="noreferrer">
          <span aria-hidden="true">🧭</span>
          Directions
        </a>
      ) : (
        map && (
          <a className="action" href={map} target="_blank" rel="noreferrer">
            <span aria-hidden="true">📍</span>
            Map
          </a>
        )
      )}
      {url && (
        <a className="action" href={url} target="_blank" rel="noreferrer">
          <span aria-hidden="true">🔗</span>
          {urlLabel}
        </a>
      )}
      {extra}
    </div>
  );
}

/** Where a fact came from, so nothing in this app is unfalsifiable. */
export function Source({ name, url, checked }) {
  if (!name && !url) return null;
  return (
    <div className="stop-source">
      Verified{checked ? ` ${checked}` : ""} ·{" "}
      {url ? (
        <a href={url} target="_blank" rel="noreferrer">
          {name || new URL(url).hostname.replace(/^www\./, "")}
        </a>
      ) : (
        name
      )}
    </div>
  );
}

/** Definition-style key/value facts for a stop. */
export function FactList({ facts }) {
  const entries = (facts || []).filter((f) => f && f.value);
  if (!entries.length) return null;
  return (
    <dl className="stop-facts">
      {entries.map((f) => (
        <div className="stop-fact" key={f.label}>
          <dt>{f.label}</dt>
          <dd>{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}
