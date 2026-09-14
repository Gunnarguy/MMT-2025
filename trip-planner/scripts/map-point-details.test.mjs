import test from "node:test";
import assert from "node:assert/strict";
import { build } from "esbuild";
import { createRequire } from "node:module";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

// Render the actual popup bodies against every guide record. This catches
// dropped source fields and incompatible data shapes, not just one hotel.
const bundle = await build({
  stdin: { contents: `
    export { createElement as h } from 'react';
    export { renderToStaticMarkup as render } from 'react-dom/server';
    export * from './src/components/MapPointDetails.jsx';
    export { DAYS } from './src/data/trip.js';
    export { LODGING } from './src/data/lodging.js';
    export { RELOCATION_TOWNS } from './src/data/relocation.js';
  `, resolveDir: process.cwd() },
  bundle: true, write: false, format: "cjs", platform: "node", jsx: "automatic",
  define: { "process.env.NODE_ENV": '"production"' },
});
const temporary = await mkdtemp(join(tmpdir(), "mmt-popup-test-"));
const entry = join(temporary, "popups.cjs");
await writeFile(entry, bundle.outputFiles[0].text);
const m = createRequire(import.meta.url)(entry);
await rm(temporary, { recursive: true });
const escaped = value => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#x27;");

test("every itinerary popup retains the complete available visit information", () => {
  for (const day of m.DAYS) for (const stop of day.stops) {
    const html = m.render(m.h(m.StopDetails, { stop, day }));
    for (const value of [stop.blurb, stop.address, stop.cost, stop.hours, stop.duration, stop.time, ...(stop.tips || [])].filter(Boolean)) {
      assert.ok(html.includes(escaped(value)), `${stop.name}: missing ${value}`);
    }
    assert.ok(html.includes(`#/day/${day.id}`));
  }
});

test("every hotel popup exposes contact, stay, rate and booking caveats", () => {
  for (const stay of m.LODGING) {
    const html = m.render(m.h(m.StayDetails, { stay }));
    for (const value of [stay.address, stay.phone, stay.note, stay.flag?.title, stay.flag?.body, stay.price].filter(Boolean)) {
      assert.ok(html.includes(escaped(value)), `${stay.name}: missing ${value}`);
    }
    if (!stay.conf) assert.ok(html.includes("Not recorded in the guide"));
    if (stay.provisional) assert.ok(html.includes("Provisional backup"));
  }
});

test("all town workups and the rental data render without losing nested facts", () => {
  for (const town of m.RELOCATION_TOWNS) {
    const html = m.render(m.h(m.ScoutPointDetails, { town }));
    for (const value of Object.values(town.workup || {}).filter(Array.isArray).flatMap(rows => rows.map(([, value]) => value))) {
      assert.ok(html.includes(escaped(value)), `${town.name}: missing workup fact`);
    }
  }
  assert.ok(m.render(m.h(m.RentalPointDetails)).includes("Photograph it"));
});
