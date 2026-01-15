// Default home address for the trip (Mom's house in Palatine)
export const DEFAULT_HOME_ADDRESS = "2020 Crestwood Lane, Palatine, IL";

// Activity IDs that have been removed and should be cleaned up from saved trips
const REMOVED_ACTIVITY_IDS = new Set([
  "mi-city-chicago", // Removed - home address covers start/end point
]);

function normalizeMackinawCity(value) {
  if (!value || typeof value !== "string") return value;
  return value.replace(/\bMackinac City\b/g, "Mackinaw City");
}

function normalizeOvernightStay(stay) {
  if (!stay) return stay;
  if (typeof stay === "string") return normalizeMackinawCity(stay);
  if (typeof stay === "object") {
    return {
      ...stay,
      name: normalizeMackinawCity(stay.name || ""),
    };
  }
  return stay;
}

/**
 * Migrate trip data to ensure all required fields are present.
 * This handles trips loaded from storage/Supabase that predate new fields.
 * Note: overnightStay is NOT auto-populated - users search and add their own lodging.
 */
export function migrateTrip(trip) {
  if (!trip || typeof trip !== "object") return trip;

  const migrated = {
    ...trip,
    // Ensure homeAddress is always set
    homeAddress: trip.homeAddress || DEFAULT_HOME_ADDRESS,
    // Ensure each day has overnightStay field and clean up removed activities
    days: (trip.days || []).map((day) => ({
      ...day,
      label: normalizeMackinawCity(day.label || ""),
      location: normalizeMackinawCity(day.location || ""),
      // Preserve overnightStay exactly as-is (can be object or string)
      overnightStay: normalizeOvernightStay(day.overnightStay ?? ""),
      // Remove any activity IDs that no longer exist
      activities: (day.activities || []).filter(
        (id) => !REMOVED_ACTIVITY_IDS.has(id)
      ),
    })),
  };

  console.log("[migrateTrip] Result:", {
    daysCount: migrated.days?.length,
    overnightStays: migrated.days?.map((d) => ({
      dayId: d.id,
      stay: d.overnightStay,
    })),
  });

  return migrated;
}

export function isValidTripState(state) {
  if (!state || typeof state !== "object") return false;
  if (!Array.isArray(state.days)) return false;
  return state.days.every(
    (day) => day && typeof day.id === "string" && Array.isArray(day.activities)
  );
}

export function buildTripFromTemplate(template) {
  if (!template) return null;
  return {
    name: template.name,
    homeAddress: template.homeAddress || DEFAULT_HOME_ADDRESS,
    days: template.days.map((tDay, i) => ({
      id: `day-${i + 1}`,
      dayNumber: tDay.dayNumber ?? i + 1,
      label: tDay.label ?? `Day ${i + 1}`,
      location: tDay.location ?? "",
      activities: tDay.suggestedActivities || [],
      notes: tDay.notes || "",
      type: tDay.type || "custom",
      lodging: tDay.lodging || null,
      overnightStay: tDay.overnightStay || "",
      startTime: "09:00",
      schedule: {},
    })),
    createdAt: new Date().toISOString(),
    templateId: template.id,
  };
}

export function buildBlankTrip({
  dayCount = 5,
  name = "My New England Trip",
  defaultLabel = "Day",
} = {}) {
  return {
    name,
    homeAddress: DEFAULT_HOME_ADDRESS,
    days: Array.from({ length: dayCount }, (_, i) => ({
      id: `day-${i + 1}`,
      dayNumber: i + 1,
      label: `${defaultLabel} ${i + 1}`,
      location: "",
      activities: [],
      notes: "",
      type: "custom",
      lodging: null,
      startTime: "09:00",
      schedule: {},
    })),
    createdAt: new Date().toISOString(),
    templateId: null,
  };
}

export function normalizeTripDays(days) {
  return days.map((day, i) => ({
    ...day,
    dayNumber: i + 1,
    id: `day-${i + 1}`,
    label: day.label || `Day ${i + 1}`,
  }));
}

export function getTripStats(days) {
  const stats = days.reduce(
    (acc, day) => {
      acc.activities += day.activities.length;
      return acc;
    },
    { days: days.length, activities: 0 }
  );
  return stats;
}

export function hasAnyActivities(days) {
  return days.some(
    (day) => day.activities.length > 0 || (day.notes && day.notes.trim())
  );
}

export function buildTripSkeleton({
  name,
  startLocation,
  endLocation,
  dayCount,
  style = "balanced",
}) {
  const safeDayCount = Math.max(1, Number(dayCount) || 1);
  const days = Array.from({ length: safeDayCount }, (_, i) => {
    const isFirst = i === 0;
    const isLast = i === safeDayCount - 1;
    const midType = style === "hustle" ? "drive" : "explore";
    const type = isFirst ? "arrival" : isLast ? "departure" : midType;
    return {
      id: `day-${i + 1}`,
      dayNumber: i + 1,
      label: isFirst ? "Arrival" : isLast ? "Departure" : `Day ${i + 1}`,
      location: isFirst ? startLocation || "" : isLast ? endLocation || "" : "",
      activities: [],
      notes: "",
      type,
      lodging: null,
      startTime: "09:00",
      schedule: {},
    };
  });

  return {
    name: name || "My Custom Trip",
    days,
    createdAt: new Date().toISOString(),
    templateId: null,
  };
}
