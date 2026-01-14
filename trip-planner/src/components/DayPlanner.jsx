import {
  DndContext,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { categories } from "../data/catalog";
import { formatDuration, formatMiles } from "../utils/formatters";
import OvernightStayPicker from "./OvernightStayPicker";

const dayTypes = [
  { value: "arrival", label: "Arrival" },
  { value: "drive", label: "Drive day" },
  { value: "explore", label: "Explore" },
  { value: "relaxed", label: "Relaxed" },
  { value: "departure", label: "Departure" },
  { value: "custom", label: "Custom" },
];

function SortableActivityCard({
  activity,
  index,
  dayId,
  onRemove,
  onOpenDetails,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: activity.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`activity-card ${activity.isCustom ? "custom" : ""}`}
    >
      <span className="activity-order">{index + 1}</span>
      <button
        className="drag-handle"
        type="button"
        aria-label="Drag to reorder"
        {...attributes}
        {...listeners}
      >
        ::
      </button>
      <button
        type="button"
        className="activity-main"
        onClick={() => onOpenDetails(activity)}
      >
        <span className="activity-icon">
          {categories[activity.category]?.icon ?? "*"}
        </span>
        <div className="activity-info">
          <strong>
            {activity.name}
            {activity.momMentioned && <span className="mom-badge">*</span>}
          </strong>
          <small>{activity.location}</small>
        </div>
      </button>
      <button
        className="remove-btn"
        onClick={() => onRemove(dayId, activity.id)}
        type="button"
      >
        x
      </button>
    </div>
  );
}

function SortableDayTab({ day, isActive, onSelect }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: day.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.75 : 1,
  };

  return (
    <button
      ref={setNodeRef}
      style={style}
      className={`day-tab ${isActive ? "active" : ""}`}
      onClick={() => onSelect(day.id)}
      type="button"
      {...attributes}
      {...listeners}
      aria-label={`Day ${day.dayNumber}: drag to reorder`}
      title={day.location || day.label || ""}
    >
      <span className="day-num">D{day.dayNumber}</span>
      <span className="day-label">{day.label || `Day ${day.dayNumber}`}</span>
      <span className="day-count">{day.activities.length} stops</span>
    </button>
  );
}

export default function DayPlanner({
  trip,
  selectedDay,
  selectedDayId,
  selectedDayActivities,
  selectedDayActivityIds,
  dayRoute,
  dayLoad,
  dayLoadLabel,
  homeAddress,
  totalDays,
  allowedStateAbbrs,
  allowCanadaPlaces,
  onSelectDay,
  onReorderDays,
  onAddDay,
  onRemoveDay,
  onDuplicateDay,
  onUpdateDay,
  onReorderActivities,
  onRemoveActivity,
  onOpenDetails,
}) {
  const isFirstDay = selectedDay?.dayNumber === 1;
  const isLastDay = selectedDay?.dayNumber === totalDays;

  // Helper to get overnight stay name (handles both string and object format)
  const getOvernightStayName = (stay) => {
    if (!stay) return null;
    if (typeof stay === "object") return stay.name || null;
    return stay; // legacy string format
  };

  // Determine start point for this day
  const prevDay = trip.days.find(
    (d) => d.dayNumber === selectedDay?.dayNumber - 1
  );
  const prevDayStay = getOvernightStayName(prevDay?.overnightStay);
  const startPoint =
    isFirstDay && homeAddress
      ? homeAddress
      : prevDayStay || prevDay?.location || null;

  // Determine end point for this day
  const currentDayStay = getOvernightStayName(selectedDay?.overnightStay);
  const endPoint =
    isLastDay && homeAddress ? homeAddress : currentDayStay || null;

  // Auto-generate day notes based on activities, route, and endpoints
  const generateDayNotes = () => {
    const lines = [];
    const dayLabel = selectedDay?.label || `Day ${selectedDay?.dayNumber}`;

    // Add header
    lines.push(`📅 ${dayLabel} Itinerary`);
    lines.push("");

    // Add starting point
    if (startPoint) {
      const startIcon = isFirstDay ? "🏠" : "🏨";
      lines.push(`${startIcon} Starting from: ${startPoint}`);
    }

    // Add activities
    if (selectedDayActivities.length > 0) {
      lines.push("");
      lines.push("📍 Activities:");
      selectedDayActivities.forEach((activity, i) => {
        const duration = activity.duration ? ` (${activity.duration}h)` : "";
        lines.push(`  ${i + 1}. ${activity.name}${duration}`);
        if (activity.location && activity.location !== activity.name) {
          lines.push(`     📌 ${activity.location}`);
        }
      });
    }

    // Add route info if available
    if (dayRoute?.distance_m) {
      lines.push("");
      const miles = (dayRoute.distance_m / 1609.34).toFixed(1);
      const hours = Math.floor(dayRoute.duration_s / 3600);
      const mins = Math.round((dayRoute.duration_s % 3600) / 60);
      lines.push(`🚗 Driving: ~${miles} miles, ~${hours}h ${mins}m`);
    }

    // Add ending point
    if (endPoint) {
      lines.push("");
      const endIcon = isLastDay ? "🏠" : "🏨";
      lines.push(`${endIcon} Ending at: ${endPoint}`);
    }

    return lines.join("\n");
  };

  const dayTabSensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 5 },
    })
  );

  return (
    <section className="trip-builder">
      <DndContext
        sensors={dayTabSensors}
        collisionDetection={closestCenter}
        onDragEnd={({ active, over }) => {
          if (!over || active.id === over.id) return;
          onReorderDays?.(active.id, over.id);
        }}
      >
        <div className="day-tabs">
          <SortableContext
            items={trip.days.map((d) => d.id)}
            strategy={horizontalListSortingStrategy}
          >
            {trip.days.map((day) => (
              <SortableDayTab
                key={day.id}
                day={day}
                isActive={day.id === selectedDayId}
                onSelect={onSelectDay}
              />
            ))}
          </SortableContext>
          <button className="add-day-btn" onClick={onAddDay} type="button">
            +
          </button>
        </div>
      </DndContext>

      {selectedDay && (
        <div className="day-content">
          <div className="day-header">
            <div>
              <h2>Day {selectedDay.dayNumber}</h2>
              <p className="day-load">
                {dayLoadLabel} | {dayLoad}
              </p>
            </div>
            <div className="day-actions">
              <select
                value={selectedDay.type || "custom"}
                onChange={(e) =>
                  onUpdateDay(selectedDay.id, { type: e.target.value })
                }
                className="day-type-select"
              >
                {dayTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="ghost-btn"
                onClick={() => onDuplicateDay(selectedDay.id)}
              >
                Duplicate
              </button>
              {trip.days.length > 1 && (
                <button
                  type="button"
                  className="ghost-btn"
                  onClick={() => onRemoveDay(selectedDay.id)}
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          <label className="field">
            Day location (optional)
            <input
              type="text"
              value={selectedDay.location}
              onChange={(e) =>
                onUpdateDay(selectedDay.id, { location: e.target.value })
              }
              placeholder="City / area (e.g., Portland, ME)"
              className="location-input"
            />
          </label>

          <label className="field">
            🏨 Overnight stay (where you're sleeping)
            <OvernightStayPicker
              value={selectedDay.overnightStay}
              onChange={(stayData) =>
                onUpdateDay(selectedDay.id, { overnightStay: stayData })
              }
              allowedStateAbbrs={allowedStateAbbrs}
              allowCanadaPlaces={allowCanadaPlaces}
              placeholder="Search for hotel, Airbnb, or address..."
            />
          </label>

          <div className="day-notes-section">
            <div className="day-notes-header">
              <span>📝 Day Notes</span>
              <button
                type="button"
                className="auto-generate-btn"
                onClick={() => {
                  const notes = generateDayNotes();
                  onUpdateDay(selectedDay.id, { notes });
                }}
                title="Auto-generate notes from today's itinerary"
              >
                ✨ Auto-Generate
              </button>
            </div>
            <textarea
              value={selectedDay.notes}
              onChange={(e) =>
                onUpdateDay(selectedDay.id, { notes: e.target.value })
              }
              placeholder="Notes for this day: reservations, timing, backup options. Click 'Auto-Generate' to fill from itinerary!"
              className="day-notes"
            />
          </div>

          {/* Start/End point indicators */}
          <div className="day-endpoints">
            {startPoint && (
              <div className="endpoint start">
                <span className="endpoint-icon">
                  {isFirstDay ? "🏠" : "🏨"}
                </span>
                <div className="endpoint-info">
                  <small>Starting from</small>
                  <strong>{startPoint}</strong>
                </div>
              </div>
            )}
            {endPoint && (
              <div className="endpoint end">
                <span className="endpoint-icon">{isLastDay ? "🏠" : "🏨"}</span>
                <div className="endpoint-info">
                  <small>Ending at</small>
                  <strong>{endPoint}</strong>
                </div>
              </div>
            )}
          </div>

          <div className="activities-list">
            <h3>Activities ({selectedDayActivities.length})</h3>
            {selectedDayActivities.length === 0 ? (
              <p className="empty-msg">
                Add activities from the catalog or your custom list.
              </p>
            ) : (
              <DndContext
                sensors={dayTabSensors}
                collisionDetection={closestCenter}
                onDragEnd={({ active, over }) => {
                  if (!over || active.id === over.id) return;
                  const oldIndex = selectedDayActivityIds.indexOf(active.id);
                  const newIndex = selectedDayActivityIds.indexOf(over.id);
                  if (oldIndex < 0 || newIndex < 0) return;
                  onReorderActivities(selectedDay.id, oldIndex, newIndex);
                }}
              >
                <SortableContext
                  items={selectedDayActivityIds}
                  strategy={verticalListSortingStrategy}
                >
                  {selectedDayActivities.map((activity, idx) => (
                    <SortableActivityCard
                      key={activity.id}
                      activity={activity}
                      index={idx}
                      dayId={selectedDay.id}
                      onRemove={onRemoveActivity}
                      onOpenDetails={onOpenDetails}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            )}

            <div className="drive-summary">
              <div className="drive-header">
                <h3>Driving</h3>
                {!dayRoute && (
                  <span className="drive-meta">
                    Add two or more pinned stops.
                  </span>
                )}
              </div>
              {dayRoute ? (
                <>
                  <div className="drive-totals">
                    Total: <strong>{formatMiles(dayRoute.distance_m)}</strong> |{" "}
                    <strong>{formatDuration(dayRoute.duration_s)}</strong>
                  </div>
                  {dayRoute.legs?.length > 0 && (
                    <div className="drive-legs">
                      {dayRoute.legs.map((leg, i) => (
                        <div key={i} className="drive-leg">
                          <span className="drive-leg-title">
                            {leg.from} -&gt; {leg.to}
                          </span>
                          <span className="drive-leg-meta">
                            {formatMiles(leg.distance_m)} |{" "}
                            {formatDuration(leg.duration_s)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="drive-empty">No driving route yet.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
