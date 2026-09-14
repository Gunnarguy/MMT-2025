// Fuel planning assumptions; no vehicle telemetry or live pump-price feed.
// 1,430 miles includes a buffer beyond the 1,223-mile canonical drive legs.
// Station sources were checked September 13, 2026. Pins are approximate forecourt locations.
export const FUEL_PLAN_NOTE = "Suggested fuel stops, not live fuel tracking. Your actual rental, starting fuel, detours and driving change the range. Check the dashboard and current station hours; prices and pump availability are not monitored.";
export const FUEL_SPECS = {
  "vehicle": "Mazda CX-50 (or similar booked midsize AWD crossover)",
  "tankCapacityGallons": 15.9,
  "epaCombinedMpg": 26,
  "epaCityMpg": 24,
  "epaHighwayMpg": 30,
  "maxRangeMiles": 413,
  "safeRefuelRangeMiles": 340,
  "totalTripMiles": 1430,
  "estimatedGallonsTotal": 55,
  "blendedUsdPerGallon": 3.65,
  "ontarioCadPerLiter": 1.62
};
export const FUEL_STOPS = [
  {
    "id": "fuel-1",
    "dayId": "d1",
    "dayIndex": 1,
    "date": "2026-09-15",
    "stopName": "Meijer Express · Ludington",
    "brand": "Meijer Express",
    "address": "3960 W US-10, Ludington, MI 49431",
    "coords": [
      43.9569,
      -86.37854
    ],
    "action": "Suggested fill-up",
    "why": "A convenient fuel break before the dunes and Traverse City. Check the actual fuel gauge and range; stop earlier if needed. You can use another station along the way.",
    "routeContext": "After Grand Rapids, before the Ludington overnight",
    "sourceUrl": "https://www.meijer.com/shopping/store-locator/193.html",
    "mapSourceUrl": "https://mapcarta.com/N7914889369",
    "checkedOn": "2026-09-13"
  },
  {
    "id": "fuel-2",
    "dayId": "d5",
    "dayIndex": 5,
    "date": "2026-09-19",
    "stopName": "Marathon · Mackinaw City",
    "brand": "Marathon",
    "address": "308 S Nicolet St, Mackinaw City, MI 49701",
    "coords": [
      45.7787,
      -84.7324
    ],
    "action": "Suggested top-up",
    "why": "An opportunity to top up before the longer southbound drive. This is a suggested stop, not a requirement; use the range displayed by your rental.",
    "routeContext": "Before the Saturday drive to Frankenmuth",
    "sourceUrl": "https://michigan.view.interstatelogos.com/I-75-N/8297/48757/",
    "checkedOn": "2026-09-13"
  },
  {
    "id": "fuel-3",
    "dayId": "d5",
    "dayIndex": 5,
    "date": "2026-09-19",
    "stopName": "Speedway · Port Huron",
    "brand": "Speedway",
    "address": "2621 Pine Grove Ave, Port Huron, MI 48060",
    "coords": [
      43.0018822,
      -82.4396813
    ],
    "action": "Check fuel before the border",
    "why": "A US-side option before crossing. Compare actual pump prices if you want to top up; the guide does not have live fuel prices or a guaranteed cross-border saving.",
    "routeContext": "Before the Blue Water Bridge into Ontario",
    "sourceUrl": "https://careers.7-eleven.com/location/port-huron-jobs/7/6252001-5001836-5006233/4",
    "mapSourceUrl": "https://www.google.com/maps/search/?api=1&query=Speedway+2621+Pine+Grove+Ave+Port+Huron",
    "checkedOn": "2026-09-13"
  },
  {
    "id": "fuel-4",
    "dayId": "d7",
    "dayIndex": 7,
    "date": "2026-09-21",
    "stopName": "TA / BP · Sawyer",
    "brand": "TA / BP",
    "address": "6100 Sawyer Road, Sawyer, MI 49125",
    "coords": [
      41.8845,
      -86.6001
    ],
    "action": "Suggested fuel / rest break",
    "why": "A documented travel center with gasoline on the return across southwest Michigan. Replaces the unverified New Buffalo Pilot entry. Use the gasoline pumps for the rental, and refuel earlier if its range calls for it.",
    "routeContext": "Monday westbound on I-94, Exit 12",
    "sourceUrl": "https://www.ta-petro.com/location/mi/ta-sawyer/",
    "checkedOn": "2026-09-13"
  },
  {
    "id": "fuel-5",
    "dayId": "d7",
    "dayIndex": 7,
    "date": "2026-09-21",
    "stopName": "Shell · O’Hare return",
    "brand": "Shell",
    "address": "600 E Touhy Ave, Des Plaines, IL 60018",
    "coords": [
      42.009182,
      -87.908429
    ],
    "action": "Refill according to your rental agreement",
    "why": "A documented station near O’Hare. If you chose self-refueling, return the tank full and keep the receipt. Prepaid-fuel terms differ; check your actual agreement. Budget sets refueling charges in that agreement, so the guide does not quote a fixed fee.",
    "routeContext": "After dropping off Mom, before the rental return",
    "sourceUrl": "https://find.shell.com/us/fuel/10008894-600-e-touhy-ave/en_US",
    "checkedOn": "2026-09-13"
  }
];
