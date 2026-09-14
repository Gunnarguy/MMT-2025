/** Rebuild only the comparison routes; the booked itinerary geometry is untouched. */
import { writeFileSync } from "node:fs";
import { THURSDAY_OPTIONS, THURSDAY_PLACES } from "../src/data/thursdayOptions.js";

const output = { checkedAt: new Date().toISOString(), source: "OSRM / OpenStreetMap", routes: {} };
for (const option of THURSDAY_OPTIONS) {
  const coordinates = option.places.map((id) => [...THURSDAY_PLACES[id].coords].reverse().join(",")).join(";");
  const sourceUrl = `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=simplified&geometries=geojson&steps=false`;
  const response = await fetch(sourceUrl, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`OSRM: ${response.status}`);
  const result = await response.json();
  const route = result.routes?.[0];
  if (result.code !== "Ok" || !route) throw new Error(`No route: ${option.id}`);
  output.routes[option.id] = {
    sourceUrl, meters: route.distance, seconds: route.duration,
    line: route.geometry.coordinates.map(([lng, lat]) => [lat, lng]),
    legs: route.legs.map((leg) => ({ meters: leg.distance, seconds: leg.duration })),
  };
  console.log(`${option.id}: ${(route.distance / 1609.344).toFixed(1)} mi, ${Math.round(route.duration / 60)} min`);
  await new Promise((resolve) => setTimeout(resolve, 1100));
}
writeFileSync(new URL("../src/data/thursdayGeometry.json", import.meta.url), `${JSON.stringify(output)}\n`);
