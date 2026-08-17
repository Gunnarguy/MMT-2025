import { ActionRow, Chip, FactList, Source } from "./bits";

const KIND_LABEL = {
  anchor: "Main event",
  stop: "Stop",
  food: "Food",
  sight: "Worth a look",
  optional: "Optional",
  lodging: "Tonight",
  admin: "Logistics",
};

const STATUS_CHIP = {
  booked: { tone: "locked", text: "Booked" },
  purchased: { tone: "locked", text: "Already paid" },
  confirmed: { tone: "ok", text: "Confirmed open" },
  check: { tone: "warn", text: "Call ahead" },
  closed: { tone: "stop", text: "Closed that day" },
  seasonal: { tone: "warn", text: "Season ending" },
  free: { tone: "ok", text: "Free" },
};

/**
 * One place on one day.
 *
 * `docQuote` is Mom's original wording and is never rewritten — the rest of the
 * card is what research added on top of it.
 */
export default function StopCard({ stop, from }) {
  const status = STATUS_CHIP[stop.status];
  const kind = stop.kind || "stop";

  return (
    <article className={`stop stop--${kind}`}>
      <div className="stop-top">
        <div style={{ minWidth: 0 }}>
          <div className="stop-kind">{KIND_LABEL[kind] || "Stop"}</div>
          <h3 className="stop-name">{stop.name}</h3>
          {stop.where && <div className="stop-where">{stop.where}</div>}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.3rem",
            alignItems: "flex-end",
            flex: "none",
          }}
        >
          {status && <Chip tone={status.tone}>{status.text}</Chip>}
          {stop.cost && <Chip tone="ghost">{stop.cost}</Chip>}
        </div>
      </div>

      {stop.blurb && <p className="stop-blurb">{stop.blurb}</p>}

      <FactList
        facts={[
          { label: "Hours", value: stop.hours },
          { label: "Time needed", value: stop.duration },
          { label: "Address", value: stop.address },
        ]}
      />

      {stop.tips?.length > 0 && (
        <ul className="stop-tips">
          {stop.tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      )}

      <ActionRow
        phone={stop.phone}
        mapQuery={stop.address || stop.name}
        from={from}
        url={stop.url}
        urlLabel={stop.urlLabel}
      />

      <Source name={stop.source} url={stop.sourceUrl} />
    </article>
  );
}
