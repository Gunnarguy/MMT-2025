/**
 * Fuel, Mileage, and Gas Station Logistics.
 *
 * Grounded in:
 * - Vehicle: 2026 Mazda CX-50 (or similar midsize SUV)
 * - Fuel Tank Capacity: 15.9 US Gallons (60.2 L)
 * - Fuel Economy: EPA 26 MPG Combined (24 City / 30 Highway)
 * - Safe Tank Range: 413 Miles (Safe refueling target: 300–350 miles / 20% reserve)
 * - Total Trip Mileage: ≈1,430 miles (main highway line + local scenic side-trips)
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
    dayId: "d2",
    dayIndex: 2,
    date: "2026-09-16",
    stopName: "Fuel Stop 1: Traverse City (South Side)",
    brand: "Meijer / Speedway Gas",
    address: "3955 US-31 S, Traverse City, MI 49684",
    coords: [44.7291, -85.6472],
    mileMarker: 428,
    milesOnTank: 428,
    tankPercentBefore: "DRY — 428 mi needs 16.5 gal; the tank holds 15.9",
    action: "UNREACHABLE — you must refuel on 9/15 before this",
    why: "WARNING: this stop cannot be reached on one tank. O'Hare → Palatine → Grand Rapids → Ludington → Sleeping Bear Dunes → Traverse City is 428 miles by the itinerary's own drive legs, against a 413-mile max range and a 340-mile safe target. You run dry roughly 15 miles short, around Sleeping Bear/Empire where stations are sparse. Add a fill-up in Ludington on the evening of 9/15 or the morning of 9/16 — the station has not been chosen yet.",
  },
  {
    id: "fuel-2",
    dayId: "d5",
    dayIndex: 5,
    date: "2026-09-19",
    stopName: "Fuel Stop 2: Port Huron (Pre-Border Fill-up)",
    brand: "Speedway / Mobil (I-94 Exit 275)",
    address: "2607 Pine Grove Ave, Port Huron, MI 48060",
    coords: [43.0031, -82.4385],
    mileMarker: 680,
    milesOnTank: 345,
    tankPercentBefore: "17% (2.7 gal remaining)",
    action: "Full fill-up (~13.2 gal)",
    why: "CRITICAL BORDER STRATEGY: Fill the tank 100% on the US side right before the Blue Water Bridge. Ontario gas is ~CA$1.62/L ($4.40 USD/gal) vs US Michigan gas ($3.55/gal), saving $15–$20 on this single tank.",
  },
  {
    id: "fuel-3",
    dayId: "d7",
    dayIndex: 7,
    date: "2026-09-21",
    stopName: "Fuel Stop 3: Southwest Michigan (I-94 West)",
    brand: "Pilot Travel Center (I-94 Exit 4A)",
    address: "18951 US-12, New Buffalo, MI 49117",
    coords: [41.7768, -86.7265],
    mileMarker: 1040,
    milesOnTank: 360,
    tankPercentBefore: "14% (2.2 gal remaining)",
    action: "Full fill-up (~13.7 gal)",
    why: "Midday fill-up on the westbound run from Belleville/Ann Arbor across Michigan before crossing the Indiana/Illinois state line back into Palatine.",
  },
  {
    id: "fuel-4",
    dayId: "d7",
    dayIndex: 7,
    date: "2026-09-21",
    stopName: "Fuel Stop 4: O'Hare Pre-Return Top-Off",
    brand: "BP / Shell (1.2 mi from Rental Garage)",
    address: "10250 W Higgins Rd, Rosemont, IL 60018",
    coords: [41.9961, -87.8821],
    mileMarker: 1430,
    milesOnTank: 65,
    tankPercentBefore: "84% (13.4 gal remaining)",
    action: "Top-off to 100% Full (~2.5 gal)",
    why: "MANDATORY RETURN REQUIREMENT: Budget rental contract requires a 100% full tank receipt upon return at the Multi-Modal Facility. Avoids Budget's $9.99/gal refueling charge.",
  },
];
