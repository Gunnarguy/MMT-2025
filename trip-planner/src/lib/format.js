/**
 * Small formatting + link helpers.
 *
 * Everything here is deliberately dependency-free and timezone-safe: dates in
 * this app are calendar days ("2026-09-18"), never instants, so they are parsed
 * as local noon to dodge the classic UTC off-by-one-day bug.
 */

/** Parse "YYYY-MM-DD" as local noon. */
export function parseDay(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d, 12, 0, 0, 0);
}

const DOW = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const dayOfWeek = (iso) => DOW[parseDay(iso).getDay()];
export const dayOfWeekShort = (iso) => DOW[parseDay(iso).getDay()].slice(0, 3);
export const monthShort = (iso) => MON[parseDay(iso).getMonth()];
export const dayNumber = (iso) => parseDay(iso).getDate();

/** "Friday, September 18" */
export function longDate(iso) {
  const d = parseDay(iso);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${DOW[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`;
}

/** "9/18" */
export const shortDate = (iso) => {
  const d = parseDay(iso);
  return `${d.getMonth() + 1}/${d.getDate()}`;
};

/** Whole days from today until `iso`. Negative once the date has passed. */
export function daysUntil(iso) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12);
  return Math.round((parseDay(iso) - today) / 86400000);
}

/** 215 → "3h 35m", 45 → "45m", 0 → "—" */
export function duration(minutes) {
  if (!minutes) return "—";
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  if (!h) return `${m}m`;
  if (!m) return `${h}h`;
  return `${h}h ${m}m`;
}

/** 1234.5 → "$1,235" (no cents; this is a road trip, not a ledger) */
export function money(n, currency = "USD") {
  if (n == null || Number.isNaN(n)) return "—";
  const symbol = currency === "CAD" ? "CA$" : "$";
  return `${symbol}${Math.round(n).toLocaleString("en-US")}`;
}

/** Strip everything but digits so `tel:` links dial reliably. */
export const telHref = (phone) => (phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : null);

/** Universal maps link — resolves to Apple Maps on iOS, Google Maps elsewhere. */
export function mapHref(query) {
  if (!query) return null;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/** Apple Maps navigation link (opens native Maps on iOS / Mac). */
export function appleMapsHref(to, from) {
  if (!to) return null;
  const base = "https://maps.apple.com/?daddr=";
  const parts = [encodeURIComponent(to)];
  if (from) parts.push(`&saddr=${encodeURIComponent(from)}`);
  return `${base}${parts.join("")}`;
}

/** Google Maps turn-by-turn directions link between two place strings. */
export function directionsHref(from, to) {
  if (!to) return null;
  const base = "https://www.google.com/maps/dir/?api=1";
  const parts = [`destination=${encodeURIComponent(to)}`];
  if (from) parts.push(`origin=${encodeURIComponent(from)}`);
  return `${base}&${parts.join("&")}`;
}

/** Sum a list by key, tolerating undefined. */
export const sumBy = (list, key) =>
  (list || []).reduce((total, item) => total + (Number(item?.[key]) || 0), 0);

/** Great-circle distance in miles — used only for rough map-scale sanity. */
export function haversineMiles([lat1, lon1], [lat2, lon2]) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const R = 3958.8;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}
