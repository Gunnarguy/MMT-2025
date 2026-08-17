import { LODGING } from "../data/lodging";
import { money, shortDate } from "../lib/format";
import { ActionRow, Chip, Flag, Source } from "./bits";

export default function StaysView() {
  const usdTotal = LODGING.filter((s) => !s.provisional).reduce(
    (n, s) => n + (s.usd || 0),
    0,
  );
  const nights = LODGING.filter((s) => !s.provisional).reduce(
    (n, s) => n + (s.nights || 1),
    0,
  );

  return (
    <>
      <div className="page-head">
        <div className="eyebrow">Where you sleep</div>
        <h1>Five beds, seven nights</h1>
        <p>
          Everything here is already reserved. Phone numbers are tap-to-call and every
          address is tap-to-navigate — that is most of what this page is for at 9pm in
          an unfamiliar town.
        </p>
      </div>

      <div className="stat-grid" style={{ marginBottom: "var(--s-5)" }}>
        <Stat3 value={money(usdTotal)} label="Rooms, all in" note="Excludes the provisional Belleville night" />
        <Stat3 value={nights} label="Nights booked" note={`${LODGING.length} properties`} />
        <Stat3 value={money(usdTotal / 3)} label="Per person" note="If rooms split three ways" />
      </div>

      <div className="stay-grid">
        {LODGING.map((stay) => (
          <article
            key={stay.id}
            className="card card-pad stay"
            style={{ "--day": `var(--day-${stay.dayIndex})` }}
          >
            <div className="card-head" style={{ marginBottom: 0 }}>
              <div style={{ minWidth: 0 }}>
                <div className="stay-nights">
                  {shortDate(stay.checkIn)}
                  {stay.nights > 1 ? ` → ${shortDate(stay.checkOut)}` : ""} ·{" "}
                  {stay.nights} night{stay.nights > 1 ? "s" : ""}
                </div>
                <h3 style={{ fontSize: "var(--t-lg)", marginTop: "0.15rem" }}>
                  {stay.name}
                </h3>
                <div className="muted" style={{ fontSize: "var(--t-sm)" }}>
                  {stay.city}
                </div>
              </div>
              <div className="stay-price">
                {money(stay.price, stay.currency)}
                {stay.currency === "CAD" && <small>≈ {money(stay.usd)} USD</small>}
                {stay.currency !== "CAD" && stay.nights > 1 && (
                  <small>total, {stay.nights} nights</small>
                )}
              </div>
            </div>

            <div className="row" style={{ gap: "var(--s-2)" }}>
              {stay.provisional ? (
                <Chip tone="warn">May not happen</Chip>
              ) : (
                <Chip tone="locked">Booked</Chip>
              )}
              {stay.tags?.map((t) => (
                <Chip key={t} tone="ghost">
                  {t}
                </Chip>
              ))}
            </div>

            <div className="stay-addr">{stay.address}</div>

            {stay.note && (
              <p style={{ fontSize: "var(--t-sm)", color: "var(--ink-2)" }}>
                {stay.note}
              </p>
            )}

            {stay.flag && (
              <Flag level={stay.flag.level} title={stay.flag.title}>
                {stay.flag.body}
              </Flag>
            )}

            <ActionRow phone={stay.phone} mapQuery={stay.address} url={stay.url} />
            <Source name={stay.source} url={stay.sourceUrl} />
          </article>
        ))}
      </div>
    </>
  );
}

function Stat3({ value, label, note }) {
  return (
    <div className="stat">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      {note && <div className="stat-note">{note}</div>}
    </div>
  );
}
