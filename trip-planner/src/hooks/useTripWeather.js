import { useEffect, useSyncExternalStore } from "react";
import seed from "../data/tripForecast.json";
import { attachWeatherRefresh, createWeatherStore } from "../lib/tripWeather.js";

let storage;
try { storage = window.localStorage; } catch { /* Private browsing can block access. */ }
const store = createWeatherStore({ seed, storage });

export function WeatherRefresh() {
  useEffect(() => attachWeatherRefresh(store, window, document), []);
  return null;
}

export function useTripWeather() {
  return { ...useSyncExternalStore(store.subscribe, store.getSnapshot), refresh: store.refresh };
}
