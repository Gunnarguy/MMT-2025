export async function geocodePlace(query, { signal } = {}) {
  if (!query) return null;
  const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(query)}&email=${encodeURIComponent('mmt-trip-planner@example.com')}`;
  const res = await fetch(url, { signal });
  if (!res.ok) return null;
  const data = await res.json();
  const hit = data?.[0];
  if (!hit?.lat || !hit?.lon) return null;
  return [Number(hit.lat), Number(hit.lon)];
}
