import { useMemo, useState } from "react";
import { duration, shortDate } from "../../lib/format";
import { FUEL_STOPS } from "../../data/fuel";
import { LODGING } from "../../data/lodging";

export default function MorningDispatch({ day }) {
  const [copied, setCopied] = useState(false);

  const dispatchText = useMemo(() => {
    const lines = [];
    const dayLabel = day.index === 0 ? "Eve" : `Day ${day.index}`;
    lines.push(`🌲 Michigan '26 · ${dayLabel} (${shortDate(day.date)} ${day.title})`);
    if (day.route) lines.push(`📍 Route: ${day.route} (${day.miles || 0} mi · ${duration(day.driveMinutes)} drive)`);
    lines.push("");

    if (day.stops?.length) {
      lines.push("⏰ Planned Stops:");
      day.stops.forEach((s) => {
        lines.push(`  • ${s.name}${s.where ? ` (${s.where})` : ""}`);
      });
      lines.push("");
    }

    // Days can carry more than one fill — 9/19 is Mackinaw City then the
    // pre-border top-up at Port Huron, and 9/21 ends with the mandatory
    // full-tank receipt for Budget. `find` silently dropped the second one.
    const fuelStops = FUEL_STOPS.filter((f) => f.dayId === day.id);
    fuelStops.forEach((fuel) => {
      lines.push(`⛽ Fuel Stop: ${fuel.brand} (${fuel.stopName}) · Mile ${fuel.mileMarker}`);
      lines.push(`  ${fuel.action} — ${fuel.why}`);
      lines.push("");
    });

    if (day.sleep) {
      const lodging = LODGING.find((l) => l.name === day.sleep.name);
      lines.push(`🏨 Overnight: ${day.sleep.name} (${day.sleep.city})`);
      if (day.sleep.address) lines.push(`  Address: ${day.sleep.address}`);
      if (lodging?.conf) lines.push(`  Confirmation: ${lodging.conf}`);
    } else {
      lines.push("🏠 Sleep: Home in Palatine");
    }

    return lines.join("\n");
  }, [day]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(dispatchText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <div className="dispatch-card">
      <div className="dispatch-head">
        <div className="dispatch-title">
          <span>📋 Morning Group Dispatch</span>
          <small className="muted">One-tap briefing formatted for iMessage / WhatsApp</small>
        </div>
        <div className="dispatch-actions">
          <button
            type="button"
            className={`dispatch-copy-btn${copied ? " is-copied" : ""}`}
            onClick={handleCopy}
            title="Copy formatted briefing to clipboard"
          >
            {copied ? "✓ Copied!" : "📋 Copy Dispatch"}
          </button>
          <a
            href={`sms:?&body=${encodeURIComponent(dispatchText)}`}
            className="dispatch-sms-btn"
            title="Open directly in iMessage / SMS"
          >
            💬 Open in Messages
          </a>
        </div>
      </div>
      <pre className="dispatch-preview">{dispatchText}</pre>
    </div>
  );
}
