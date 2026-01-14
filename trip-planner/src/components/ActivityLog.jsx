import { useState } from "react";
import { getFamilyMember } from "../lib/supabase";

function formatTimeAgo(date) {
  const now = new Date();
  const diff = now - new Date(date);
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return "yesterday";
  if (days < 7) return `${days}d ago`;
  return new Date(date).toLocaleDateString();
}

function getActionIcon(action) {
  switch (action) {
    case "add_activity":
      return "➕";
    case "remove_activity":
      return "➖";
    case "reorder_activities":
    case "drag_reorder_activity":
      return "↕️";
    case "drag_move_activity":
      return "↔️";
    case "update_day":
      return "📝";
    case "set_overnight":
      return "🏨";
    case "update_schedule":
      return "⏰";
    case "auto_schedule":
      return "🪄";
    case "add_custom_place":
      return "📍";
    case "load_template":
      return "📋";
    case "update_trip":
      return "✏️";
    case "add_day":
      return "📅";
    case "remove_day":
      return "🗑️";
    case "duplicate_day":
      return "📋";
    case "reorder_days":
    case "drag_day_column":
      return "🔀";
    default:
      return "📌";
  }
}

function getActionLabel(action) {
  switch (action) {
    case "add_activity":
      return "added activity";
    case "remove_activity":
      return "removed activity";
    case "reorder_activities":
      return "reordered activities";
    case "drag_reorder_activity":
      return "dragged activity";
    case "drag_move_activity":
      return "moved activity";
    case "update_day":
      return "updated day";
    case "set_overnight":
      return "set overnight stay";
    case "update_schedule":
      return "updated schedule";
    case "auto_schedule":
      return "auto-scheduled";
    case "add_custom_place":
      return "added custom place";
    case "load_template":
      return "loaded template";
    case "update_trip":
      return "updated trip";
    case "add_day":
      return "added";
    case "remove_day":
      return "removed";
    case "duplicate_day":
      return "duplicated";
    case "reorder_days":
    case "drag_day_column":
      return "reordered days";
    default:
      return action.replace(/_/g, " ");
  }
}

export default function ActivityLog({ logs, isOpen, onToggle }) {
  const [showAll, setShowAll] = useState(false);

  const displayLogs = showAll ? logs : logs.slice(0, 15);
  const hasMore = logs.length > 15;

  if (!isOpen) {
    return (
      <button
        type="button"
        className="activity-log-toggle"
        onClick={onToggle}
        title="Show activity log"
      >
        📜 Activity Log{" "}
        {logs.length > 0 && <span className="log-count">{logs.length}</span>}
      </button>
    );
  }

  return (
    <div className="activity-log-panel">
      <div className="activity-log-header">
        <h3>📜 Activity Log</h3>
        <button
          type="button"
          className="activity-log-close"
          onClick={onToggle}
          title="Close activity log"
        >
          ✕
        </button>
      </div>

      <div className="activity-log-content">
        {logs.length === 0 ? (
          <p className="activity-log-empty">
            No activity yet. Changes will appear here!
          </p>
        ) : (
          <>
            <ul className="activity-log-list">
              {displayLogs.map((log) => {
                const member = getFamilyMember(log.user_email);
                return (
                  <li key={log.id} className="activity-log-item">
                    <span className="log-icon">
                      {getActionIcon(log.action)}
                    </span>
                    <div className="log-content">
                      <span
                        className="log-user"
                        style={{ color: member.color }}
                      >
                        {member.emoji} {log.user_name || member.name}
                      </span>
                      <span className="log-action">
                        {getActionLabel(log.action)}
                      </span>
                      {log.activity_name && (
                        <span className="log-activity-name">
                          "{log.activity_name}"
                        </span>
                      )}
                      {log.day_label && (
                        <span className="log-day">on {log.day_label}</span>
                      )}
                      {log.details && (
                        <span className="log-details">{log.details}</span>
                      )}
                    </div>
                    <span className="log-time">
                      {formatTimeAgo(log.created_at)}
                    </span>
                  </li>
                );
              })}
            </ul>
            {hasMore && !showAll && (
              <button
                type="button"
                className="activity-log-show-more"
                onClick={() => setShowAll(true)}
              >
                Show {logs.length - 15} more entries
              </button>
            )}
            {showAll && hasMore && (
              <button
                type="button"
                className="activity-log-show-more"
                onClick={() => setShowAll(false)}
              >
                Show less
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
