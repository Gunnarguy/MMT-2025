// Public town/attraction coordinates only. No device location is requested.
export const WEATHER_LOCATIONS = [
  ["ord", "O'Hare", 41.9786, -87.8892, "America/Chicago", [0, 7]],
  ["palatine", "Palatine", 42.1103, -88.0342, "America/Chicago", [0, 1, 6, 7]],
  ["grand-rapids", "Grand Rapids", 42.9634, -85.6681, "America/Detroit", [1]],
  ["ludington", "Ludington", 43.9553, -86.4526, "America/Detroit", [1, 2]],
  ["dunes", "Sleeping Bear Dunes", 44.88, -86.04, "America/Detroit", [2]],
  ["traverse", "Traverse City", 44.7631, -85.6206, "America/Detroit", [2, 3]],
  ["charlevoix", "Charlevoix", 45.3178, -85.2584, "America/Detroit", [3]],
  ["petoskey", "Petoskey", 45.3733, -84.9553, "America/Detroit", [3]],
  ["skybridge", "SkyBridge / Boyne Mountain", 45.1616, -84.9292, "America/Detroit", [3]],
  ["mackinaw", "Mackinaw City", 45.7775, -84.7278, "America/Detroit", [3, 4, 5]],
  ["island", "Mackinac Island", 45.85, -84.62, "America/Detroit", [4]],
  ["frankenmuth", "Frankenmuth", 43.3317, -83.738, "America/Detroit", [5]],
  ["port-huron", "Port Huron", 42.9709, -82.4249, "America/Detroit", [5]],
  ["sarnia", "Point Edward / Sarnia, ON", 42.998, -82.404, "America/Toronto", [5, 6]],
  ["julias", "Julia's / Van Buren Twp", 42.2177, -83.4767, "America/Detroit", [6]],
].map(([id, name, latitude, longitude, timezone, days]) => ({ id, name, latitude, longitude, timezone, days }));

export const WEATHER_STOPS = Array.from({ length: 8 }, (_, index) =>
  WEATHER_LOCATIONS.filter((place) => place.days.includes(index)).map((place) => ({
    locationId: place.id, dayId: `d${index}`, date: `2026-09-${14 + index}`,
  })),
).flat();
