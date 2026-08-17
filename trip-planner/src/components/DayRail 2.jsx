import { useEffect, useRef } from "react";

import { DAYS } from "../data/trip";
import { dayNumber, dayOfWeekShort, longDate } from "../lib/format";

/** Worst flag level on a day, shown as the dot under its date. */
function worstFlag(day) {
  const levels = (day.flags || []).map((f) => f.level);
  if (levels.includes("stop")) return "stop";
  if (levels.includes("warn")) return "warn";
  return "none";
}

/**
 * The date strip that lives in the sticky chrome while you're in the Day by day
 * section.
 *
 * A day page is long — flags, a timeline, Mom's original text, a map — so
 * without this the only way from Thursday to Saturday is scrolling to the very
 * bottom for the Next button, or backing out to the index. This makes every day
 * one tap from every other, at any scroll position.
 */
export default function DayRail({ activeId, onGo }) {
  const trackRef = useRef(null);

  // Keep the current day visible in the strip — it matters most on a phone,
  // where only four or five tabs fit at once. Setting scrollLeft directly
  // rather than calling scrollIntoView, which would also scroll the page and
  // shove the day you just opened up underneath the sticky chrome.
  useEffect(() => {
    const track = trackRef.current;
    const tab = track?.querySelector('[aria-selected="true"]');
    if (!track || !tab) return;
    const centred = tab.offsetLeft - (track.clientWidth - tab.offsetWidth) / 2;
    track.scrollTo({ left: Math.max(0, centred), behavior: "smooth" });
  }, [activeId]);

  return (
    <div className="dayrail">
      <div className="dayrail-track" role="tablist" aria-label="Days" ref={trackRef}>
        <button
          type="button"
          role="tab"
          aria-selected={!activeId}
          className="daytab daytab--all"
          onClick={() => onGo("days")}
        >
          <span className="daytab-all-label">All</span>
          <span className="daytab-all-sub">8 days</span>
        </button>

        {DAYS.map((day) => (
          <button
            key={day.id}
            type="button"
            role="tab"
            aria-selected={day.id === activeId}
            className="daytab"
            style={{ "--day": `var(--day-${day.index})` }}
            onClick={() => onGo("days", day.id)}
            title={`${longDate(day.date)} — ${day.title}`}
          >
            <span className="daytab-dow">{dayOfWeekShort(day.date)}</span>
            <span className="daytab-num">{dayNumber(day.date)}</span>
            <span className="daytab-dot" data-level={worstFlag(day)} />
            <span className="sr-only">
              {longDate(day.date)} — {day.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
