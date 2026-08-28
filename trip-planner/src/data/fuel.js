/**
 * Fuel, Mileage, and Gas Station Logistics.
 *
 * Grounded in:
 * - Vehicle: 2026 Mazda CX-50 (or similar midsize SUV)
 * - Fuel Tank Capacity: 15.9 US Gallons (60.2 L)
 * - Fuel Economy: EPA 26 MPG Combined (24 City / 30 Highway)
 * - Safe Tank Range: 413 Miles (Safe refueling target: 300-350 miles / 20% reserve)
 * - Total Trip Mileage: ~1,430 miles (main highway line + local scenic side-trips)
 *
 * TWO MILEAGE SCALES, deliberately:
 *   `totalTripMiles` (1,430) is the padded planning figure the Money page bills
 *   against - it carries the winery run, the stone beach, and circling Frankenmuth
 *   for parking. `mileMarker` below tracks the itinerary's actual drive legs in
 *   trip.js, which total 1,223. Never mix them.
 *
 * The stop list is driven by range, not by convenience. Cumulative leg miles from
 * the O'Hare pickup: Ludington 321, Traverse City 428, Mackinaw City 531,
 * Point Edward 829, Belleville 926, O'Hare 1,223. Against a 413-mile full-tank
 * range that forces a fill at Ludington and again at Mackinaw City - an earlier
 * version of this file put the first stop in Traverse City at 428 miles, which is
 * past empty, and would then have reached Frankenmuth at 734 miles on one tank.
 */

export const FUEL_SPECS = {
  vehicle: "Mazda CX-50 (or similar booked midsize AWD crossover)",
  tankCapacityGallons: 15.9,
  epaCombinedMpg: 26,
  epaCityMpg: 24,
  epaHighwayMpg: 30,
  maxRangeMiles: 413,
  safeRefuelRangeMiles: 340,
  totalTripMiles: 1430,
  estimatedGallonsTotal: 55,
  blendedUsdPerGallon: 3.65,
  ontarioCadPerLiter: 1.62, // ≈ $4.40 USD/gal
};

export const FUEL_STOPS = [
  {
    id: "fuel-1",
    dayId: "d1",
    dayIndex: 1,
    date: "2026-09-15",
    stopName: "Fuel Stop 1: Ludington (US-10 approach)",
    brand: "Meijer Express",
    address: "3960 W US-10, Ludington, MI 49431",
    coords: [43.9562, -86.3773],
    mileMarker: 321,
    milesOnTank: 321,
    tankPercentBefore: "22% (3.6 gal remaining)",
    action: "Full fill-up (~12.4 gal)",
    why: "First fill of the trip, and it is not optional. You arrive from Grand Rapids heading west on US-10, so this sits on the way into town before the hotel - zero detour, open 24 hours, so the evening of the 15th or early on the 16th both work. Skipping it strands you around Sleeping Bear the next afternoon: Traverse City is 428 miles from the O'Hare pickup against a 413-mile tank.",
  },
  {
    id: "fuel-2",
    dayId: "d5",
    dayIndex: 5,
    date: "2026-09-19",
    stopName: "Fuel Stop 2: Mackinaw City (before the Frankenmuth run)",
    brand: "Marathon",
    address: "308 S Nicolet St, Mackinaw City, MI 49701",
    coords: [45.7787, -84.7324],
    mileMarker: 531,
    milesOnTank: 210,
    tankPercentBefore: "49% (7.8 gal remaining)",
    action: "Full fill-up (~8.1 gal)",
    why: "Half a tank is early for a fill, but this is the last easy fuel before a 203-mile run to Frankenmuth on Oktoberfest Saturday. Leave Mackinaw City on what is left of the Ludington tank and you hit Frankenmuth at 734 miles on one fill. Open 24 hours, so it fits the 7:30 AM departure without costing you the Michilimackinac opening.",
  },
  {
    id: "fuel-3",
    dayId: "d5",
    dayIndex: 5,
    date: "2026-09-19",
    stopName: "Fuel Stop 3: Port Huron (Pre-Border Fill-up)",
    brand: "Speedway / Mobil (I-94 Exit 275)",
    address: "2607 Pine Grove Ave, Port Huron, MI 48060",
    coords: [43.0031, -82.4385],
    mileMarker: 823,
    milesOnTank: 292,
    tankPercentBefore: "29% (4.7 gal remaining)",
    action: "Full fill-up (~11.2 gal)",
    why: "CRITICAL BORDER STRATEGY: Fill the tank 100% on the US side right before the Blue Water Bridge. Ontario gas is ~CA$1.62/L ($4.40 USD/gal) vs US Michigan gas ($3.55/gal), saving $15-$20 on this single tank.",
  },
  {
    id: "fuel-4",
    dayId: "d7",
    dayIndex: 7,
    date: "2026-09-21",
    stopName: "Fuel Stop 4: Southwest Michigan (I-94 West)",
    brand: "Pilot Travel Center (I-94 Exit 4A)",
    address: "18951 US-12, New Buffalo, MI 49117",
    coords: [41.7768, -86.7265],
    mileMarker: 1115,
    milesOnTank: 292,
    tankPercentBefore: "29% (4.7 gal remaining)",
    action: "Full fill-up (~11.2 gal)",
    why: "Midday fill-up on the westbound run from Belleville/Ann Arbor across Michigan before crossing the Indiana/Illinois state line back into Palatine. One tank carried you from Port Huron through Ontario, Detroit and Belleville to here.",
  },
  {
    id: "fuel-5",
    dayId: "d7",
    dayIndex: 7,
    date: "2026-09-21",
    stopName: "Fuel Stop 5: O'Hare Pre-Return Top-Off",
    brand: "BP / Shell (1.2 mi from Rental Garage)",
    address: "10250 W Higgins Rd, Rosemont, IL 60018",
    coords: [41.9961, -87.8821],
    mileMarker: 1223,
    milesOnTank: 108,
    tankPercentBefore: "74% (11.8 gal remaining)",
    action: "Top-off to 100% Full (~4.2 gal)",
    why: "MANDATORY RETURN REQUIREMENT: Budget rental contract requires a 100% full tank receipt upon return at the Multi-Modal Facility. Avoids Budget's $9.99/gal refueling charge.",
  },
];
