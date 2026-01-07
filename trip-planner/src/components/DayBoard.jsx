import { useMemo } from 'react';
import { DndContext, closestCenter, useDroppable } from '@dnd-kit/core';
import { SortableContext, useSortable, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { categories } from '../data/catalog';

function BoardActivityCard({ activity, onOpenDetails }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: activity.id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1
  };

  return (
    <div ref={setNodeRef} style={style} className="board-card">
      <button type="button" className="activity-main" onClick={() => onOpenDetails(activity)}>
        <span className="activity-icon">{categories[activity.category]?.icon || '*'}</span>
        <div className="activity-info">
          <strong>{activity.name}</strong>
          <small>{activity.location}</small>
        </div>
      </button>
      <button type="button" className="drag-handle" {...attributes} {...listeners} aria-label="Drag">
        ::
      </button>
    </div>
  );
}

function DayColumn({ day, activities, selectedDayId, onSelectDay, onOpenDetails }) {
  const droppableId = `day:${day.id}`;
  const { setNodeRef } = useDroppable({ id: droppableId });

  return (
    <section
      className={`board-column ${day.id === selectedDayId ? 'active' : ''}`}
      onClick={() => onSelectDay(day.id)}
    >
      <header className="board-column-header">
        <div>
          <h4>Day {day.dayNumber}</h4>
          <p>{day.location || day.label}</p>
        </div>
        <span className="board-count">{activities.length}</span>
      </header>

      <div className="board-list" ref={setNodeRef}>
        <SortableContext items={activities.map((activity) => activity.id)} strategy={verticalListSortingStrategy}>
          {activities.length === 0 && <p className="board-empty">Drop activities here.</p>}
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

export default function DayBoard({ trip, selectedDayId, onSelectDay, getActivity, onUpdateTripDays, onOpenDetails }) {
  const itemsByDay = useMemo(() => {
    return trip.days.reduce((acc, day) => {
      acc[day.id] = day.activities.map((id) => getActivity(id)).filter(Boolean);
      return acc;
    }, {});
  }, [trip.days, getActivity]);

  const findContainer = (id, days) => {
    if (typeof id === 'string' && id.startsWith('day:')) {
      return id.replace('day:', '');
    }
    return days.find((day) => day.activities.includes(id))?.id;
  };

  return (
    <div className="board-view">
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={({ active, over }) => {
          if (!over) return;
          if (active.id === over.id) return;

          onUpdateTripDays((prev) => {
            const days = prev.days.map((day) => ({
              ...day,
              activities: [...day.activities],
              schedule: day.schedule ? { ...day.schedule } : {}
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
              activeDay.activities = arrayMove(activeDay.activities, activeIndex, overIndex);
            } else {
              activeDay.activities.splice(activeIndex, 1);
              const overIndex = overDay.activities.indexOf(over.id);
              const insertAt = overIndex >= 0 ? overIndex : overDay.activities.length;
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
        <div className="board-grid">
          {trip.days.map((day) => (
            <DayColumn
              key={day.id}
              day={day}
              activities={itemsByDay[day.id] || []}
              selectedDayId={selectedDayId}
              onSelectDay={onSelectDay}
              onOpenDetails={onOpenDetails}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
}
