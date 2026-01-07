export function isValidTripState(state) {
  if (!state || typeof state !== 'object') return false;
  if (!Array.isArray(state.days)) return false;
  return state.days.every(
    (day) => day && typeof day.id === 'string' && Array.isArray(day.activities)
  );
}

export function buildTripFromTemplate(template) {
  if (!template) return null;
  return {
    name: template.name,
    days: template.days.map((tDay, i) => ({
      id: `day-${i + 1}`,
      dayNumber: tDay.dayNumber ?? i + 1,
      label: tDay.label ?? `Day ${i + 1}`,
      location: tDay.location ?? '',
      activities: tDay.suggestedActivities || [],
      notes: tDay.notes || '',
      type: tDay.type || 'custom',
      lodging: tDay.lodging || null,
      startTime: '09:00',
      schedule: {}
    })),
    createdAt: new Date().toISOString(),
    templateId: template.id
  };
}

export function buildBlankTrip({
  dayCount = 5,
  name = 'My New England Trip',
  defaultLabel = 'Day'
} = {}) {
  return {
    name,
    days: Array.from({ length: dayCount }, (_, i) => ({
      id: `day-${i + 1}`,
      dayNumber: i + 1,
      label: `${defaultLabel} ${i + 1}`,
      location: '',
      activities: [],
      notes: '',
      type: 'custom',
      lodging: null,
      startTime: '09:00',
      schedule: {}
    })),
    createdAt: new Date().toISOString(),
    templateId: null
  };
}

export function normalizeTripDays(days) {
  return days.map((day, i) => ({
    ...day,
    dayNumber: i + 1,
    id: `day-${i + 1}`,
    label: day.label || `Day ${i + 1}`
  }));
}

export function getTripStats(days) {
  const stats = days.reduce(
    (acc, day) => {
      acc.activities += day.activities.length;
      return acc;
    },
    { days: days.length, activities: 0 }
  );
  return stats;
}

export function hasAnyActivities(days) {
  return days.some((day) => day.activities.length > 0 || (day.notes && day.notes.trim()));
}

export function buildTripSkeleton({
  name,
  startLocation,
  endLocation,
  dayCount,
  style = 'balanced'
}) {
  const safeDayCount = Math.max(1, Number(dayCount) || 1);
  const days = Array.from({ length: safeDayCount }, (_, i) => {
    const isFirst = i === 0;
    const isLast = i === safeDayCount - 1;
    const midType = style === 'hustle' ? 'drive' : 'explore';
    const type = isFirst ? 'arrival' : isLast ? 'departure' : midType;
    return {
      id: `day-${i + 1}`,
      dayNumber: i + 1,
      label: isFirst ? 'Arrival' : isLast ? 'Departure' : `Day ${i + 1}`,
      location: isFirst ? startLocation || '' : isLast ? endLocation || '' : '',
      activities: [],
      notes: '',
      type,
      lodging: null,
      startTime: '09:00',
      schedule: {}
    };
  });

  return {
    name: name || 'My Custom Trip',
    days,
    createdAt: new Date().toISOString(),
    templateId: null
  };
}
