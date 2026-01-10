import { useEffect, useMemo, useState } from "react";
import { categories } from "../data/catalog";
import { formatHours } from "../utils/formatters";

function buildMapsUrl(activity) {
  if (activity.googleMapsUrl) return activity.googleMapsUrl;
  const query = `${activity.name || ""} ${activity.location || ""}`.trim();
  if (!query) return null;
  return `https://www.google.com/maps/search/${encodeURIComponent(query)}`;
}

function buildSearchUrl(activity, suffix) {
  const query = `${activity.name || ""} ${
    activity.location || ""
  } ${suffix}`.trim();
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

export default function ActivityDetailModal({
  activity,
  days,
  selectedDayId,
  onClose,
  onAddToDay,
  onRemoveFromDay,
  onEditCustom,
  onDeleteCustom,
}) {
  const [targetDayId, setTargetDayId] = useState(selectedDayId);

  useEffect(() => {
    setTargetDayId(selectedDayId);
  }, [selectedDayId, activity]);

  const dayHasActivity = useMemo(() => {
    if (!activity) return false;
    const day = days.find((d) => d.id === selectedDayId);
    return Boolean(day?.activities.includes(activity.id));
  }, [activity, days, selectedDayId]);

  if (!activity) return null;

  const category = categories[activity.category] || categories.custom;
  const isPrivate = activity.private || activity.isCustom;
  const mapsUrl = isPrivate ? null : buildMapsUrl(activity);
  const menuSearchUrl = isPrivate ? null : buildSearchUrl(activity, "menu");
  const reviewsSearchUrl = isPrivate ? null : buildSearchUrl(activity, "reviews");
  const imagesSearchUrl = isPrivate ? null : buildSearchUrl(activity, "photos");

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal-header">
          <div>
            <div className="modal-eyebrow-row">
              <span className="modal-eyebrow">
                {category?.name || "Activity"}
              </span>
              {activity.momMentioned && (
                <span className="badge-mom">❤️ Mom Approved</span>
              )}
              {isPrivate && (
                <span className="badge-private">🏠 Private</span>
              )}
            </div>
            <h2>
              {category?.icon} {activity.name}
            </h2>
            <p className="modal-subtitle">{activity.location}</p>
          </div>
          <button
            type="button"
            className="icon-btn"
            onClick={onClose}
            aria-label="Close details"
          >
            x
          </button>
        </header>

        <div className="modal-body">
          {activity.description && (
            <p className="modal-description">{activity.description}</p>
          )}

          <div className="modal-meta-grid">
            {activity.duration && (
              <div className="meta-item">
                <span className="meta-label">Duration</span>
                <span>{formatHours(activity.duration)}</span>
              </div>
            )}
            {activity.price && (
              <div className="meta-item">
                <span className="meta-label">Cost</span>
                <span>{activity.price}</span>
              </div>
            )}
            {activity.rating && !isPrivate && (
              <div className="meta-item">
                <span className="meta-label">Rating</span>
                <span>{activity.rating} ★</span>
              </div>
            )}
            {activity.waitTime && (
              <div className="meta-item">
                <span className="meta-label">Wait</span>
                <span>{activity.waitTime}</span>
              </div>
            )}
            {activity.address && (
              <div className="meta-item span-2">
                <span className="meta-label">Address</span>
                <span>{activity.address}</span>
              </div>
            )}
            {activity.phone && (
              <div className="meta-item">
                <span className="meta-label">Phone</span>
                <a href={`tel:${activity.phone}`}>{activity.phone}</a>
              </div>
            )}
          </div>

          {(reviewsSearchUrl || menuSearchUrl || imagesSearchUrl) && (
            <div className="modal-deep-links">
              {reviewsSearchUrl && (
                <a
                  className="deep-link"
                  href={reviewsSearchUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="icon">⭐</span> Check Reviews
                </a>
              )}
              {menuSearchUrl && (
                <a
                  className="deep-link"
                  href={menuSearchUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="icon">🍽️</span> Find Menu
                </a>
              )}
              {imagesSearchUrl && (
                <a
                  className="deep-link"
                  href={imagesSearchUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="icon">📸</span> See Photos
                </a>
              )}
            </div>
          )}

          <div className="modal-callouts">
            {activity.mustTry && (
              <div className="callout callout-specialty">
                <strong>🏆 Specialty</strong>
                <p>{activity.mustTry}</p>
              </div>
            )}
            {activity.tip && (
              <div className="callout callout-tip">
                <strong>💡 Insider Tip</strong>
                <p>{activity.tip}</p>
              </div>
            )}
            {activity.notes && (
              <div className="callout callout-note">
                <strong>📝 Note</strong>
                <p>{activity.notes}</p>
              </div>
            )}
          </div>

          {Array.isArray(activity.tags) && activity.tags.length > 0 && (
            <div className="modal-tags">
              {activity.tags.map((tag) => (
                <span key={tag} className="tag-chip">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="modal-links">
            {activity.website && (
              <a
                className="link-btn primary"
                href={activity.website}
                target="_blank"
                rel="noreferrer"
              >
                Official Website ↗
              </a>
            )}
            {mapsUrl && (
              <a
                className="link-btn"
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
              >
                View on Google Maps ↗
              </a>
            )}
          </div>
        </div>

        <div className="modal-actions">
          <div className="day-select">
            <label htmlFor="day-select">Add to day</label>
            <select
              id="day-select"
              value={targetDayId || ""}
              onChange={(e) => setTargetDayId(e.target.value)}
            >
              {days.map((day) => (
                <option key={day.id} value={day.id}>
                  Day {day.dayNumber}: {day.location || day.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="btn-primary"
              onClick={() => onAddToDay(targetDayId, activity.id)}
            >
              Add to Trip
            </button>
          </div>

          {dayHasActivity && (
            <button
              type="button"
              className="btn-outline"
              onClick={() => onRemoveFromDay(selectedDayId, activity.id)}
            >
              Remove from selected day
            </button>
          )}

          {activity.isCustom && (
            <div className="custom-actions">
              {typeof onEditCustom === "function" && (
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => onEditCustom(activity)}
                >
                  Edit
                </button>
              )}
              <button
                type="button"
                className="btn-danger"
                onClick={() => onDeleteCustom(activity)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
