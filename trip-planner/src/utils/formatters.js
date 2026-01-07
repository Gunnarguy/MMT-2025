export function formatMiles(meters) {
  if (!Number.isFinite(meters)) return '--';
  const miles = meters / 1609.344;
  return miles < 10 ? `${miles.toFixed(1)} mi` : `${Math.round(miles)} mi`;
}

export function formatDuration(seconds) {
  if (!Number.isFinite(seconds)) return '--';
  const mins = Math.round(seconds / 60);
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}

export function formatHours(hours) {
  if (!Number.isFinite(hours)) return '--';
  if (hours < 1) return `${Math.round(hours * 60)} min`;
  return hours % 1 === 0 ? `${hours} hr` : `${hours.toFixed(1)} hr`;
}

export function formatCurrency(value) {
  if (!Number.isFinite(value)) return '--';
  return `$${Math.round(value).toLocaleString()}`;
}

export function getDayColor(dayNumber) {
  const hue = ((dayNumber - 1) * 45) % 360;
  return `hsl(${hue} 70% 45%)`;
}
