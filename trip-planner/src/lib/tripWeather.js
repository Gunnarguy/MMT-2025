import { WEATHER_LOCATIONS } from "../data/weatherLocations.js";

export const WEATHER_REFRESH_MS = 15 * 60 * 1000;
export const WEATHER_STALE_MS = 60 * 60 * 1000;
export const WEATHER_STORAGE_KEY = "mi26.weather.v2";
const finite = (value) => Number.isFinite(value) ? value : null;
const dateFormatters = new Map();

export function dateAt(time, timezone) {
  if (!dateFormatters.has(timezone)) dateFormatters.set(timezone, new Intl.DateTimeFormat("en-US", { timeZone: timezone, year: "numeric", month: "2-digit", day: "2-digit" }));
  const parts = dateFormatters.get(timezone).formatToParts(new Date(time));
  const get = (key) => parts.find((part) => part.type === key).value;
  return `${get("year")}-${get("month")}-${get("day")}`;
}

export function weatherDescription(code) {
  if (code === 0) return "Clear";
  if (code === 1) return "Mostly clear";
  if (code === 2) return "Partly cloudy";
  if (code === 3) return "Overcast";
  if ([45, 48].includes(code)) return "Fog";
  if ([51, 53, 55, 56, 57].includes(code)) return "Drizzle";
  if ([61, 63, 65, 66, 67].includes(code)) return "Rain";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "Snow";
  if ([80, 81, 82].includes(code)) return "Rain showers";
  if ([95, 96, 99].includes(code)) return "Thunderstorms";
  return "Conditions unavailable";
}

export function weatherUrl(locations = WEATHER_LOCATIONS) {
  const params = new URLSearchParams({
    latitude: locations.map((p) => p.latitude).join(","),
    longitude: locations.map((p) => p.longitude).join(","),
    timezone: locations.map((p) => p.timezone).join(","),
    temperature_unit: "fahrenheit", wind_speed_unit: "mph", precipitation_unit: "inch",
    timeformat: "unixtime", forecast_days: "16",
    current: "temperature_2m,apparent_temperature,weather_code,wind_speed_10m,wind_gusts_10m",
    hourly: "temperature_2m,precipitation_probability,precipitation,wind_speed_10m,wind_gusts_10m,weather_code",
    daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,wind_speed_10m_max,wind_gusts_10m_max",
  });
  return `https://api.open-meteo.com/v1/forecast?${params}`;
}

export function normalizeWeather(raw, place, fetchedAt) {
  if (!raw || !Number.isFinite(raw.latitude) || !Number.isFinite(raw.longitude) ||
    Math.abs(raw.latitude - place.latitude) > 0.3 || Math.abs(raw.longitude - place.longitude) > 0.3 ||
    raw.timezone !== place.timezone || raw.daily_units?.temperature_2m_max !== "°F" ||
    !raw.daily?.time?.length || !raw.hourly?.time?.length || !Number.isFinite(raw.current?.time)) {
    throw new Error(`Invalid weather response for ${place.name}`);
  }
  const daily = {};
  raw.daily.time.forEach((time, i) => {
    const date = dateAt(time * 1000, place.timezone);
    if (date < "2026-09-14" || date > "2026-09-21") return;
    daily[date] = {
      fetchedAt, summary: weatherDescription(raw.daily.weather_code?.[i]),
      high: finite(raw.daily.temperature_2m_max?.[i]), low: finite(raw.daily.temperature_2m_min?.[i]),
      // Maximum hourly probability, not a 24-hour event probability.
      peakRainChance: finite(raw.daily.precipitation_probability_max?.[i]),
      precipitation: finite(raw.daily.precipitation_sum?.[i]),
      wind: finite(raw.daily.wind_speed_10m_max?.[i]), gusts: finite(raw.daily.wind_gusts_10m_max?.[i]),
    };
  });
  const hourly = raw.hourly.time.map((time, i) => ({
    time: time * 1000, date: dateAt(time * 1000, place.timezone),
    temperature: finite(raw.hourly.temperature_2m?.[i]), rainChance: finite(raw.hourly.precipitation_probability?.[i]),
    precipitation: finite(raw.hourly.precipitation?.[i]), wind: finite(raw.hourly.wind_speed_10m?.[i]),
    gusts: finite(raw.hourly.wind_gusts_10m?.[i]), summary: weatherDescription(raw.hourly.weather_code?.[i]),
  })).filter((hour) => hour.date >= "2026-09-14" && hour.date <= "2026-09-21");
  return {
    fetchedAt, sourceUrl: weatherUrl([place]), daily, hourly,
    current: {
      time: raw.current.time * 1000, temperature: finite(raw.current.temperature_2m),
      feelsLike: finite(raw.current.apparent_temperature), wind: finite(raw.current.wind_speed_10m),
      gusts: finite(raw.current.wind_gusts_10m), summary: weatherDescription(raw.current.weather_code),
    },
  };
}

function validCache(data) {
  return data?.version === 2 && Number.isFinite(data.checkedAt) && data.locations &&
    Object.values(data.locations).every((p) => Number.isFinite(p.fetchedAt) && p.daily && Array.isArray(p.hourly) && Number.isFinite(p.current?.time));
}

/** One shared request/cache for every weather surface, with injectable IO for failure tests. */
export function createWeatherStore({ seed, storage, fetchImpl = fetch, now = Date.now, locations = WEATHER_LOCATIONS } = {}) {
  let saved = null;
  try { saved = JSON.parse(storage?.getItem(WEATHER_STORAGE_KEY) || "null"); } catch { /* Use the bundled forecast. */ }
  const fallback = validCache(seed) ? seed : { version: 2, checkedAt: 0, locations: {} };
  const data = validCache(saved) && saved.checkedAt > fallback.checkedAt ? saved : fallback;
  let state = { data, now: now(), refreshing: false, error: null, offline: false };
  let pending = null;
  let lastAttempt = -Infinity;
  const listeners = new Set();
  const publish = (patch) => { state = { ...state, ...patch }; listeners.forEach((listener) => listener()); };

  async function refresh(force = false) {
    if (pending) return pending;
    if (!force && now() - lastAttempt < 60 * 1000) return;
    lastAttempt = now();
    publish({ refreshing: true, now: now() });
    pending = Promise.resolve().then(async () => {
      try {
        const response = await fetchImpl(weatherUrl(locations), { cache: "no-store", signal: AbortSignal.timeout(25000) });
        if (!response.ok) throw new Error(`Weather service returned ${response.status}`);
        const raw = await response.json();
        const list = Array.isArray(raw) ? raw : [raw];
        if (list.length !== locations.length) throw new Error("Incomplete weather response");
        const fetchedAt = now();
        const next = { version: 2, checkedAt: fetchedAt, locations: { ...state.data.locations } };
        let failures = 0;
        locations.forEach((place, index) => {
          try {
            const fresh = normalizeWeather(list[index], place, fetchedAt);
            const previous = next.locations[place.id];
            next.locations[place.id] = { ...fresh, daily: { ...previous?.daily, ...fresh.daily } };
          } catch { failures += 1; }
        });
        if (failures === locations.length) throw new Error("No usable weather returned");
        try { storage?.setItem(WEATHER_STORAGE_KEY, JSON.stringify(next)); } catch { /* Keep fresh data in memory. */ }
        publish({ data: next, error: failures ? `${failures} location(s) could not refresh; saved values remain labeled.` : null, now: now() });
      } catch {
        publish({ error: "Could not refresh weather. Showing the last saved forecast; its timestamp has not changed.", now: now() });
      } finally {
        pending = null;
        publish({ refreshing: false });
      }
    });
    return pending;
  }
  return {
    getSnapshot: () => state,
    subscribe: (listener) => { listeners.add(listener); return () => listeners.delete(listener); },
    refresh,
    tick: () => publish({ now: now() }),
    setOffline: (offline) => publish({ offline, now: now() }),
  };
}

export function attachWeatherRefresh(store, win, doc) {
  const refresh = () => { if (!doc.hidden && win.navigator.onLine !== false) void store.refresh(); };
  const online = () => { store.setOffline(false); refresh(); };
  const offline = () => store.setOffline(true);
  store.setOffline(win.navigator.onLine === false);
  refresh();
  const timer = win.setInterval(refresh, WEATHER_REFRESH_MS);
  const clock = win.setInterval(store.tick, 60 * 1000);
  win.addEventListener("focus", refresh); win.addEventListener("online", online); win.addEventListener("offline", offline);
  doc.addEventListener("visibilitychange", refresh);
  return () => {
    win.clearInterval(timer); win.clearInterval(clock);
    win.removeEventListener("focus", refresh); win.removeEventListener("online", online); win.removeEventListener("offline", offline);
    doc.removeEventListener("visibilitychange", refresh);
  };
}
