import { isValidTripState } from './tripUtils';

export function getClientId(key) {
  try {
    const existing = localStorage.getItem(key);
    if (existing) return existing;

    const newId =
      globalThis.crypto?.randomUUID?.() ||
      `client-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    localStorage.setItem(key, newId);
    return newId;
  } catch {
    return `client-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }
}

export function loadTrip(key) {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return null;

    const parsed = JSON.parse(saved);
    if (isValidTripState(parsed)) return parsed;

    localStorage.removeItem(key);
  } catch {
    // ignore corrupted storage
  }
  return null;
}

export function saveTrip(key, tripState) {
  try {
    localStorage.setItem(key, JSON.stringify(tripState));
  } catch {
    // ignore storage write failures
  }
}

export function loadCustomActivities(key) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

export function saveCustomActivities(key, activities) {
  try {
    localStorage.setItem(key, JSON.stringify(activities));
  } catch {
    // ignore storage write failures
  }
}

export function loadCustomTemplates(key) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function saveCustomTemplates(key, templates) {
  try {
    localStorage.setItem(key, JSON.stringify(templates));
  } catch {
    // ignore storage write failures
  }
}
