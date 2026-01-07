import { parseTimeToMinutes } from './timeUtils';

function formatDate(date) {
  return date.toISOString().slice(0, 10).replace(/-/g, '');
}

function formatDateTime(date, timeString) {
  const minutes = parseTimeToMinutes(timeString);
  if (!Number.isFinite(minutes)) return null;
  const eventDate = new Date(date);
  eventDate.setHours(0, 0, 0, 0);
  eventDate.setMinutes(minutes);
  const iso = eventDate.toISOString().replace(/[-:]/g, '').split('.')[0];
  return iso;
}

export function buildTripCalendar(trip, getActivity) {
  if (!trip.startDate) return null;
  const startDate = new Date(trip.startDate);
  if (Number.isNaN(startDate.getTime())) return null;

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//MMT-2025//Trip Planner//EN'
  ];

  trip.days.forEach((day) => {
    const dayDate = new Date(startDate);
    dayDate.setDate(startDate.getDate() + day.dayNumber - 1);
    const schedule = day.schedule || {};

    const hasSchedule = Object.keys(schedule).length > 0;
    if (day.activities.length === 0 || !hasSchedule) {
      lines.push('BEGIN:VEVENT');
      lines.push(`UID:day-${day.id}@mmt-2025`);
      lines.push(`DTSTART;VALUE=DATE:${formatDate(dayDate)}`);
      const nextDay = new Date(dayDate);
      nextDay.setDate(dayDate.getDate() + 1);
      lines.push(`DTEND;VALUE=DATE:${formatDate(nextDay)}`);
      lines.push(`SUMMARY:Day ${day.dayNumber}: ${day.location || day.label}`);
      lines.push('END:VEVENT');
      return;
    }

    day.activities.forEach((activityId) => {
      const activity = getActivity(activityId);
      if (!activity) return;
      const entry = schedule[activityId];
      const startTime = entry?.startTime;
      const durationHours = Number(entry?.duration || activity.duration || 1);

      const startIso = startTime ? formatDateTime(dayDate, startTime) : null;
      if (!startIso) return;

      const minutes = Math.round(durationHours * 60);
      const endDate = new Date(dayDate);
      endDate.setHours(0, 0, 0, 0);
      endDate.setMinutes(parseTimeToMinutes(startTime) + minutes);
      const endIso = endDate.toISOString().replace(/[-:]/g, '').split('.')[0];

      lines.push('BEGIN:VEVENT');
      lines.push(`UID:${day.id}-${activity.id}@mmt-2025`);
      lines.push(`DTSTART:${startIso}`);
      lines.push(`DTEND:${endIso}`);
      lines.push(`SUMMARY:${activity.name}`);
      if (activity.location) {
        lines.push(`LOCATION:${activity.location}`);
      }
      if (activity.description) {
        lines.push(`DESCRIPTION:${activity.description.replace(/\n/g, ' ')}`);
      }
      lines.push('END:VEVENT');
    });
  });

  lines.push('END:VCALENDAR');
  return lines.join('\n');
}

export function downloadCalendar(icsText, filename = 'mmt-trip.ics') {
  const blob = new Blob([icsText], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
