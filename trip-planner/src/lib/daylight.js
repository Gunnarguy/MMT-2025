/**
 * Solstice daylight from coordinates — no data source needed, and it is the
 * single biggest thing nobody from California expects. Uses the standard
 * 90.833° zenith (refraction + solar radius) and an equation-of-time
 * approximation, which lands within a couple of minutes of NOAA tables.
 */
const RAD = Math.PI / 180;

function equationOfTime(dayOfYear) {
  const b = ((360 / 365) * (dayOfYear - 81)) * RAD;
  return 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b); // minutes
}

function solstice(lat, lon, tzHours, winter) {
  const n = winter ? 355 : 172;
  const dec = (winter ? -23.44 : 23.44) * RAD;
  const cosH =
    (Math.cos(90.833 * RAD) - Math.sin(lat * RAD) * Math.sin(dec)) /
    (Math.cos(lat * RAD) * Math.cos(dec));
  const h = Math.acos(Math.max(-1, Math.min(1, cosH))) / RAD; // half-day, degrees
  const hours = (2 * h) / 15;
  const noon = 12 - ((lon - tzHours * 15) * 4) / 60 - equationOfTime(n) / 60;
  return { hours, sunrise: noon - hours / 2, sunset: noon + hours / 2 };
}

export function fmtHours(h) {
  const m = Math.round(h * 60);
  return `${Math.floor(m / 60)}h${String(m % 60).padStart(2, "0")}m`;
}

export function fmtClock(h) {
  const m = ((Math.round(h * 60) % 1440) + 1440) % 1440;
  const hh = Math.floor(m / 60);
  const mm = String(m % 60).padStart(2, "0");
  return `${((hh + 11) % 12) + 1}:${mm} ${hh >= 12 ? "PM" : "AM"}`;
}

/** Eastern time for every town on the list (Michigan and southern Ontario). */
export function daylightFor(lat, lon, tzWinter = -5, tzSummer = -4) {
  return {
    winter: solstice(lat, lon, tzWinter, true),
    summer: solstice(lat, lon, tzSummer, false),
  };
}

export const SAN_FRANCISCO = daylightFor(37.7749, -122.4194, -8, -7);
