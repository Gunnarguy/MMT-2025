import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { categories } from '../data/catalog';
import { formatDuration, formatMiles } from '../utils/formatters';
import { computeEndTime } from '../utils/timeUtils';

const dayTypes = [
  { value: 'arrival', label: 'Arrival' },
  { value: 'drive', label: 'Drive day' },
  { value: 'explore', label: 'Explore' },
  { value: 'relaxed', label: 'Relaxed' },
  { value: 'departure', label: 'Departure' },
  { value: 'custom', label: 'Custom' }
];

function SortableActivityCard({ activity, index, dayId, onRemove, onOpenDetails }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: activity.id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1
  };

  return (
    <div ref={setNodeRef} style={style} className={`activity-card ${activity.isCustom ? 'custom' : ''}`}>
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
      <button type="button" className="activity-main" onClick={() => onOpenDetails(activity)}>
        <span className="activity-icon">{categories[activity.category]?.icon ?? '*'}</span>
        <div className="activity-info">
          <strong>
            {activity.name}
            {activity.momMentioned && <span className="mom-badge">*</span>}
          </strong>
          <small>{activity.location}</small>
        </div>
      </button>
      <button className="remove-btn" onClick={() => onRemove(dayId, activity.id)} type="button">
        x
      </button>
    </div>
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
  onAddDay,
  onRemoveDay,
  onDuplicateDay,
  onUpdateDay,
  onUpdateSchedule,
  onAutoSchedule,
  onReorderActivities,
  onRemoveActivity,
  onOpenDetails,
  lodgingOptions
}) {
  const schedule = selectedDay?.schedule || {};
  const dayStartTime = selectedDay?.startTime || '09:00';

  return (
    <section className="trip-builder">
      <div className="day-tabs">
        {trip.days.map((day) => (
          <button
            key={day.id}
            className={`day-tab ${day.id === selectedDayId ? 'active' : ''}`}
            onClick={() => onSelectDay(day.id)}
            type="button"
          >
            <span className="day-num">D{day.dayNumber}</span>
            <span className="day-loc">{day.location || '...'}</span>
            <span className="day-count">{day.activities.length}</span>
          </button>
        ))}
        <button className="add-day-btn" onClick={onAddDay} type="button">
          +
        </button>
      </div>

      {selectedDay && (
        <div className="day-content">
          <div className="day-header">
            <div>
              <h2>Day {selectedDay.dayNumber}</h2>
              <p className="day-load">{dayLoadLabel} | {dayLoad}</p>
            </div>
            <div className="day-actions">
              <select
                value={selectedDay.type || 'custom'}
                onChange={(e) => onUpdateDay(selectedDay.id, { type: e.target.value })}
                className="day-type-select"
              >
                {dayTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              <button type="button" className="ghost-btn" onClick={() => onDuplicateDay(selectedDay.id)}>
                Duplicate
              </button>
              {trip.days.length > 1 && (
                <button type="button" className="ghost-btn" onClick={() => onRemoveDay(selectedDay.id)}>
                  Remove
                </button>
              )}
            </div>
          </div>

          <label className="field">
            Where are you staying?
            <input
              type="text"
              value={selectedDay.location}
              onChange={(e) => onUpdateDay(selectedDay.id, { location: e.target.value })}
              placeholder="Base location for the day"
              className="location-input"
            />
          </label>

          <label className="field">
            Lodging (optional)
            <select
              value={selectedDay.lodging || ''}
              onChange={(e) => onUpdateDay(selectedDay.id, { lodging: e.target.value || null })}
              className="lodging-select"
            >
              <option value="">Select lodging</option>
              {lodgingOptions.map((lodging) => (
                <option key={lodging.id} value={lodging.id}>
                  {lodging.name} - {lodging.location}
                </option>
              ))}
            </select>
          </label>

          <textarea
            value={selectedDay.notes}
            onChange={(e) => onUpdateDay(selectedDay.id, { notes: e.target.value })}
            placeholder="Notes for this day: reservations, timing, backup options"
            className="day-notes"
          />

          <div className="activities-list">
            <div className="schedule-panel">
              <div className="schedule-header">
                <div>
                  <h3>Schedule</h3>
                  <p>Set times, durations, and travel buffers.</p>
                </div>
                <div className="schedule-actions">
                  <label>
                    Start day at
                    <input
                      type="time"
                      value={dayStartTime}
                      onChange={(e) => onUpdateDay(selectedDay.id, { startTime: e.target.value })}
                    />
                  </label>
                  <button type="button" className="ghost-btn" onClick={() => onAutoSchedule(selectedDay.id)}>
                    Auto schedule
                  </button>
                </div>
              </div>
              {selectedDayActivities.length === 0 ? (
                <p className="empty-msg">Add activities to build a timeline.</p>
              ) : (
                <div className="schedule-list">
                  {selectedDayActivities.map((activity) => {
                    const entry = schedule[activity.id] || {};
                    const startTime = entry.startTime || '';
                    const duration = entry.duration ?? activity.duration ?? '';
                    const bufferMinutes = entry.bufferMinutes ?? 20;
                    const endTime = startTime && duration ? computeEndTime(startTime, duration) : '';

                    return (
                      <div key={activity.id} className="schedule-row">
                        <div className="schedule-title">
                          <strong>{activity.name}</strong>
                          <span>{activity.location}</span>
                        </div>
                        <label>
                          Start
                          <input
                            type="time"
                            value={startTime}
                            onChange={(e) => onUpdateSchedule(selectedDay.id, activity.id, { startTime: e.target.value })}
                          />
                        </label>
                        <label>
                          Duration (hrs)
                          <input
                            type="number"
                            min="0"
                            step="0.25"
                            value={duration}
                            onChange={(e) => onUpdateSchedule(selectedDay.id, activity.id, { duration: e.target.value })}
                          />
                        </label>
                        <label>
                          Buffer (min)
                          <input
                            type="number"
                            min="0"
                            step="5"
                            value={bufferMinutes}
                            onChange={(e) =>
                              onUpdateSchedule(selectedDay.id, activity.id, { bufferMinutes: e.target.value })
                            }
                          />
                        </label>
                        <div className="schedule-end">Ends {endTime || '--'}</div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="drive-summary">
              <div className="drive-header">
                <h3>Driving</h3>
                {!dayRoute && <span className="drive-meta">Add two or more pinned stops.</span>}
              </div>
              {dayRoute ? (
                <>
                  <div className="drive-totals">
                    Total: <strong>{formatMiles(dayRoute.distance_m)}</strong> |{' '}
                    <strong>{formatDuration(dayRoute.duration_s)}</strong>
                  </div>
                  {dayRoute.legs?.length > 0 && (
                    <div className="drive-legs">
                      {dayRoute.legs.map((leg, i) => (
                        <div key={i} className="drive-leg">
                          <span className="drive-leg-title">
                            {leg.from} -> {leg.to}
                          </span>
                          <span className="drive-leg-meta">
                            {formatMiles(leg.distance_m)} | {formatDuration(leg.duration_s)}
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

            <h3>Activities ({selectedDayActivities.length})</h3>
            {selectedDayActivities.length === 0 ? (
              <p className="empty-msg">Add activities from the catalog or your custom list.</p>
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
                <SortableContext items={selectedDayActivityIds} strategy={verticalListSortingStrategy}>
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
          </div>
        </div>
      )}
    </section>
  );
}
