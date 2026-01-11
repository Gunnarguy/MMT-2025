import {
  DndContext,
  PointerSensor,
  closestCenter,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo } from "react";
import { categories } from "../data/catalog";

const dayColumnId = (dayId) => `col:${dayId}`;

function BoardActivityCard({ activity, onOpenDetails }) {
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
    <div ref={setNodeRef} style={style} className="board-card">
      <button
        type="button"
        className="activity-main"
        onClick={() => onOpenDetails(activity)}
      >
        <span className="activity-icon">
          {categories[activity.category]?.icon || "*"}
        </span>
        <div className="activity-info">
          <strong>{activity.name}</strong>
          <small>{activity.location}</small>
        </div>
      </button>
      <button
        type="button"
        className="drag-handle"
        {...attributes}
        {...listeners}
        aria-label="Drag"
      >
        ::
      </button>
    </div>
  );
}

function DayColumn({
  day,
  activities,
  selectedDayId,
  onSelectDay,
  onOpenDetails,
  columnDragHandle,
}) {
  const droppableId = `day:${day.id}`;
  const { setNodeRef } = useDroppable({ id: droppableId });

  return (
    <section
      className={`board-column ${day.id === selectedDayId ? "active" : ""}`}
      onClick={() => onSelectDay(day.id)}
    >
      <header className="board-column-header">
        <div className="board-column-header-top">
          <h4>Day {day.dayNumber}</h4>
          <div className="board-header-actions">
            {columnDragHandle}
            <span className="board-count">{activities.length}</span>
          </div>
        </div>
        <p>{day.location || day.label}</p>
      </header>

      <div className="board-list" ref={setNodeRef}>
        <SortableContext
          items={activities.map((activity) => activity.id)}
          strategy={verticalListSortingStrategy}
        >
          {activities.length === 0 && (
            <p className="board-empty">Drop activities here.</p>
          )}
          {activities.map((activity) => (
            <BoardActivityCard
              key={activity.id}
              activity={activity}
              onOpenDetails={onOpenDetails}
            />
          ))}
        </SortableContext>
      </div>
    </section>
  );
}

function SortableDayColumn({
  day,
  activities,
  selectedDayId,
  onSelectDay,
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
    id: dayColumnId(day.id),
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.75 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <DayColumn
        day={day}
        activities={activities}
        selectedDayId={selectedDayId}
        onSelectDay={onSelectDay}
        onOpenDetails={onOpenDetails}
        columnDragHandle={
          <button
            type="button"
            className="column-drag-handle"
            {...attributes}
            {...listeners}
            aria-label={`Drag Day ${day.dayNumber} to reorder`}
            title="Drag to reorder day"
          >
            ⋮⋮
          </button>
        }
      />
    </div>
  );
}

export default function DayBoard({
  trip,
  selectedDayId,
  onSelectDay,
  getActivity,
  onUpdateTripDays,
  onOpenDetails,
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const itemsByDay = useMemo(() => {
    return trip.days.reduce((acc, day) => {
      acc[day.id] = day.activities.map((id) => getActivity(id)).filter(Boolean);
      return acc;
    }, {});
  }, [trip.days, getActivity]);

  const findContainer = (id, days) => {
    if (typeof id === "string" && id.startsWith("day:")) {
      return id.replace("day:", "");
    }
    return days.find((day) => day.activities.includes(id))?.id;
  };

  return (
    <div className="board-view">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={({ active, over }) => {
          if (!over) return;
          if (active.id === over.id) return;

          // Day column reorder
          if (typeof active.id === "string" && active.id.startsWith("col:")) {
            if (typeof over.id !== "string" || !over.id.startsWith("col:"))
              return;
            const activeDayId = active.id.replace("col:", "");
            const overDayId = over.id.replace("col:", "");
            onUpdateTripDays((prev) => {
              const oldIndex = prev.days.findIndex((d) => d.id === activeDayId);
              const newIndex = prev.days.findIndex((d) => d.id === overDayId);
              if (oldIndex < 0 || newIndex < 0) return prev;
              const moved = arrayMove(prev.days, oldIndex, newIndex);
              const renumbered = moved.map((day, i) => ({
                ...day,
                dayNumber: i + 1,
              }));
              return { ...prev, days: renumbered };
            });
            return;
          }

          onUpdateTripDays((prev) => {
            const days = prev.days.map((day) => ({
              ...day,
              activities: [...day.activities],
              schedule: day.schedule ? { ...day.schedule } : {},
            }));
            const activeDayId = findContainer(active.id, days);
            const overDayId = findContainer(over.id, days);

            if (!activeDayId || !overDayId) return prev;

            const activeDay = days.find((day) => day.id === activeDayId);
            const overDay = days.find((day) => day.id === overDayId);
            if (!activeDay || !overDay) return prev;

            const activeIndex = activeDay.activities.indexOf(active.id);
            if (activeIndex < 0) return prev;

            if (activeDayId === overDayId) {
              const overIndex = overDay.activities.indexOf(over.id);
              if (overIndex < 0) return prev;
              activeDay.activities = arrayMove(
                activeDay.activities,
                activeIndex,
                overIndex
              );
            } else {
              activeDay.activities.splice(activeIndex, 1);
              const overIndex = overDay.activities.indexOf(over.id);
              const insertAt =
                overIndex >= 0 ? overIndex : overDay.activities.length;
              overDay.activities.splice(insertAt, 0, active.id);

              if (activeDay.schedule?.[active.id]) {
                overDay.schedule = overDay.schedule || {};
                overDay.schedule[active.id] = activeDay.schedule[active.id];
                delete activeDay.schedule[active.id];
              }
            }

            return { ...prev, days };
          });
        }}
      >
        <SortableContext
          items={trip.days.map((day) => dayColumnId(day.id))}
          strategy={rectSortingStrategy}
        >
          <div className="board-grid">
            {trip.days.map((day) => (
              <SortableDayColumn
                key={day.id}
                day={day}
                activities={itemsByDay[day.id] || []}
                selectedDayId={selectedDayId}
                onSelectDay={onSelectDay}
                onOpenDetails={onOpenDetails}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
