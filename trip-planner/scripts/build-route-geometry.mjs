#!/usr/bin/env node
/**
 * Precompute road-following geometry for every driving day and check it in.
 *
 * The map must not draw straight lines between towns — on a trip that hugs
 * Lake Michigan and crosses into Ontario, a great-circle line is actively
 * misleading. So we resolve the real route once, at build time, against OSRM
 * and commit the result. The published site then needs no routing service.
 *
 *   node scripts/build-route-geometry.mjs
 *
 * Re-run only when the waypoints below change.
 */

import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(HERE, "../src/data/routeGeometry.json");
const OSRM = "https://router.project-osrm.org/route/v1/driving";

// [lng, lat] — OSRM's order, not Leaflet's. Converted on write.
const P = {
  palatine: [-88.0342, 42.1103],
  grandRapids: [-85.6681, 42.9634],
  ludington: [-86.4526, 43.9553],
  sleepingBear: [-86.0271, 44.8858],
  traverseCity: [-85.6206, 44.7631],
  charlevoix: [-85.2584, 45.3178],
  petoskey: [-84.9553, 45.3733],
  harborSprings: [-84.9917, 45.4314],
  crossVillage: [-85.0331, 45.6392],
  mackinawCity: [-84.7278, 45.7775],
  frankenmuth: [-83.738, 43.3317],
  portHuron: [-82.4249, 42.9709],
  pointEdward: [-82.42, 42.9989],
  windsor: [-83.0364, 42.3149],
  detroit: [-83.0458, 42.3314],
  dearborn: [-83.2341, 42.3033],
  belleville: [-83.4855, 42.2042],
  annArbor: [-83.743, 42.2808],
  kalamazoo: [-85.5872, 42.2917],
};

const DAYS = [
  { id: "d1", waypoints: [P.palatine, P.grandRapids, P.ludington] },
  { id: "d2", waypoints: [P.ludington, P.sleepingBear, P.traverseCity] },
  {
    id: "d3",
    // US-31 to Petoskey then I-75 north. NOT via M-119 (the Tunnel of Trees):
    // as of August 2026 that road is closed in two segments with no announced
    // reopening, so routing the map through it would draw a line nobody can
    // drive. The alternate below is kept so the app can show both if it reopens.
    waypoints: [P.traverseCity, P.charlevoix, P.petoskey, P.mackinawCity],
  },
  {
    id: "d3-alt-tunnel",
    waypoints: [P.petoskey, P.harborSprings, P.crossVillage, P.mackinawCity],
  },
  { id: "d5", waypoints: [P.mackinawCity, P.frankenmuth, P.portHuron, P.pointEdward] },
  {
    id: "d6",
    waypoints: [P.pointEdward, P.windsor, P.detroit, P.dearborn, P.belleville],
  },
  { id: "d7", waypoints: [P.belleville, P.annArbor, P.kalamazoo, P.palatine] },
];

/**
 * Ramer–Douglas–Peucker. OSRM returns lane-level detail (4,000+ points for a
 * 300-mile day) which is invisible at any zoom this map uses and triples the
 * bundle. A ~30 m tolerance keeps every real bend and drops ~85% of the points.
 */
function simplify(points, tolerance = 0.0003) {
  if (points.length < 3) return points;

  const sqDistToSegment = (p, a, b) => {
    let [x, y] = a;
    let dx = b[0] - x;
    let dy = b[1] - y;
    if (dx !== 0 || dy !== 0) {
      const t = ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy);
      if (t > 1) [x, y] = b;
      else if (t > 0) [x, y] = [x + dx * t, y + dy * t];
    }
    dx = p[0] - x;
    dy = p[1] - y;
    return dx * dx + dy * dy;
  };

  const keep = new Uint8Array(points.length);
  keep[0] = keep[points.length - 1] = 1;
  const stack = [[0, points.length - 1]];
  const sqTol = tolerance * tolerance;

  while (stack.length) {
    const [first, last] = stack.pop();
    let maxSq = 0;
    let index = -1;
    for (let i = first + 1; i < last; i += 1) {
      const sq = sqDistToSegment(points[i], points[first], points[last]);
      if (sq > maxSq) {
        maxSq = sq;
        index = i;
      }
    }
    if (maxSq > sqTol && index > 0) {
      keep[index] = 1;
      stack.push([first, index], [index, last]);
    }
  }

  return points.filter((_, i) => keep[i]);
}

async function routeFor(waypoints) {
  const coords = waypoints.map((c) => c.join(",")).join(";");
  const url = `${OSRM}/${coords}?overview=full&geometries=geojson&steps=false`;
  const res = await fetch(url, { headers: { "User-Agent": "michigan-2026-fieldguide" } });
  if (!res.ok) throw new Error(`OSRM ${res.status} for ${coords}`);
  const json = await res.json();
  const route = json.routes?.[0];
  if (!route) throw new Error(`No route for ${coords}`);
  // Leaflet wants [lat, lng]; OSRM hands back [lng, lat].
  const full = route.geometry.coordinates.map(([lng, lat]) => [lat, lng]);

  return {
    line: simplify(full).map(([lat, lng]) => [
      Number(lat.toFixed(5)),
      Number(lng.toFixed(5)),
    ]),
    rawPoints: full.length,
    meters: Math.round(route.distance),
    seconds: Math.round(route.duration),
    legs: route.legs.map((l) => ({
      meters: Math.round(l.distance),
      seconds: Math.round(l.duration),
    })),
  };
}

const out = {};
for (const day of DAYS) {
  process.stdout.write(`routing ${day.id}… `);
  const r = await routeFor(day.waypoints);
  out[day.id] = r;
  const mi = (r.meters / 1609.34).toFixed(0);
  const hrs = (r.seconds / 3600).toFixed(1);
  console.log(`${r.rawPoints} → ${r.line.length} pts · ${mi} mi · ${hrs} h`);
  // Be a good citizen on the public demo server.
  await new Promise((r2) => setTimeout(r2, 1200));
}

writeFileSync(OUT, `${JSON.stringify(out)}\n`);
console.log(`\nWrote ${OUT}`);
