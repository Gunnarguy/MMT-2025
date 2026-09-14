// Public town/attraction coordinates only. No device location is requested.
export const WEATHER_LOCATIONS = [
  ["ord", "O'Hare", 41.9786, -87.8892, "America/Chicago", [0, 7]],
  ["palatine", "Palatine", 42.1103, -88.0342, "America/Chicago", [0, 1, 7]],
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
  ["windsor", "Windsor, ON", 42.3186, -83.0397, "America/Toronto", [6]],
  ["detroit", "Detroit", 42.33, -83.05, "America/Detroit", [6]],
  ["belleville", "Belleville", 42.2338, -83.4844, "America/Detroit", [6, 7]],
  ["ann-arbor", "Ann Arbor", 42.2808, -83.743, "America/Detroit", [7]],
  ["kalamazoo", "Kalamazoo / I-94", 42.2917, -85.5872, "America/Detroit", [7]],
].map(([id, name, latitude, longitude, timezone, days]) => ({ id, name, latitude, longitude, timezone, days }));

export const WEATHER_STOPS = Array.from({ length: 8 }, (_, index) =>
  WEATHER_LOCATIONS.filter((place) => place.days.includes(index)).map((place) => ({
    locationId: place.id, dayId: `d${index}`, date: `2026-09-${14 + index}`,
  })),
).flat();
