import {
  DndContext,
  PointerSensor,
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
  const dayTabSensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
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

          <textarea
            value={selectedDay.notes}
            onChange={(e) =>
              onUpdateDay(selectedDay.id, { notes: e.target.value })
            }
            placeholder="Notes for this day: reservations, timing, backup options"
            className="day-notes"
          />

          <div className="activities-list">
            <h3>Activities ({selectedDayActivities.length})</h3>
            {selectedDayActivities.length === 0 ? (
              <p className="empty-msg">
                Add activities from the catalog or your custom list.
              </p>
            ) : (
              <DndContext
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
