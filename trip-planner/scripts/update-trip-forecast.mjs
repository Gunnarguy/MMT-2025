/** Refresh the bundled offline seed; the running app also refreshes automatically. */
import { writeFileSync } from "node:fs";
import { createWeatherStore } from "../src/lib/tripWeather.js";
const store = createWeatherStore();
await store.refresh(true);
const { data, error } = store.getSnapshot();
if (error) throw new Error(error);
// Keep the initial app small. A successful browser fetch caches full hourly
// detail locally; the bundled fallback carries all daily forecasts and current estimates.
for (const location of Object.values(data.locations)) location.hourly = [];
writeFileSync(new URL("../src/data/tripForecast.json", import.meta.url), `${JSON.stringify(data)}\n`);
console.log(`Saved ${Object.keys(data.locations).length} locations at ${new Date(data.checkedAt).toISOString()}`);
