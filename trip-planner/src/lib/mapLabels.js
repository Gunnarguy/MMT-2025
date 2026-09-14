import { WEATHER_LOCATIONS } from "../data/weatherLocations.js";

const areas = [
  ...WEATHER_LOCATIONS.map((p) => ({ name: p.name.replace("Point Edward / Sarnia, ON", "Sarnia").replace("SkyBridge / Boyne Mountain", "Boyne Mountain").replace("Kalamazoo / I-94", "Kalamazoo"), lat: p.latitude, lng: p.longitude })),
  { name: "San Francisco", lat: 37.6213, lng: -122.379 },
  { name: "South Bay", lat: 37.4, lng: -121.94 },
];
export function escapeMapHtml(text) {
  return String(text).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
export function mapArea([lat, lng]) {
  const distance = (p) => (p.lat - lat) ** 2 + ((p.lng - lng) * Math.cos(lat * Math.PI / 180)) ** 2;
  const nearest = areas.reduce((a, b) => distance(a) < distance(b) ? a : b);
  if (distance(nearest) >= 1) return "Along the route";
  // Across a river, the nearest town center can be in the other country.
  // Use the shared border area rather than mislabeling a point's jurisdiction.
  if (["Port Huron", "Sarnia"].includes(nearest.name)) return "Port Huron / Sarnia";
  if (["Detroit", "Windsor, ON"].includes(nearest.name)) return "Detroit / Windsor";
  return nearest.name;
}
export function clusterLabel(names) {
  const unique = [...new Set(names)];
  if (unique.length === 1) return unique[0];
  if (unique.every((n) => ["Mackinaw City", "Mackinac Island"].includes(n))) return "Mackinac Straits";
  if (unique.every((n) => ["Port Huron", "Sarnia"].includes(n))) return "Port Huron / Sarnia";
  if (unique.every((n) => ["Detroit / Windsor", "Belleville", "Ann Arbor"].includes(n))) return "Detroit & nearby";
  if (unique.every((n) => ["O'Hare", "Palatine"].includes(n))) return "O’Hare / Palatine";
  const counts = new Map();
  for (const name of names) counts.set(name, (counts.get(name) || 0) + 1);
  return [...counts].sort((a,b) => b[1]-a[1])[0][0] + " & nearby";
}
