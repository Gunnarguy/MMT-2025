// ═══════════════════════════════════════════════════════════════════════════
// MOM'S ROUTE - Comprehensive Data from MMTrip.txt
// All metrics, facts, and details about the planned journey
// ═══════════════════════════════════════════════════════════════════════════

export const momsRoute = {
  title: "Girls Trip to New England",
  source: "MMTrip.txt - Mom's Original Planning Document",
  
  // ═══════════════════════════════════════════════════════════════
  // TRIP OVERVIEW
  // ═══════════════════════════════════════════════════════════════
  overview: {
    totalDrivingMiles: 892,
    totalDrivingHours: 16.5,
    estimatedDays: "7-9 days",
    bestSeason: "Late September",
    flyInto: "Boston Logan International (BOS)",
    flyOutOptions: ["Boston (BOS)", "Albany (ALB)", "Montreal (YUL)"],
    countries: ["USA", "Canada"],
    states: ["Massachusetts", "New Hampshire", "Maine", "Vermont", "New York", "Quebec"],
    theme: "Lobsters 🦞 • Leaves 🍁 • Love 💕",
    
    trafficWarning: {
      severity: "HIGH",
      reason: "Late September is PEAK leaf-peeping season",
      tip: "It's all over the news that fall season is CRAZY for leaf-peeping. Plan extra time, especially weekends.",
      worstAreas: ["I-93 through White Mountains", "Kancamagus Highway", "Route 100 in Vermont"]
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // THE ROUTE - Stop by Stop with FULL Details
  // ═══════════════════════════════════════════════════════════════
  stops: [
    {
      id: 1,
      name: "Boston",
      state: "MA",
      country: "USA",
      coordinates: [42.3601, -71.0589],
      nights: "1-2",
      role: "Starting Point",
      driveFromPrevious: null,
      
      momQuote: "Use the arrival day and perhaps next day for touring the city and eating some LOBSTA! The city is FULL of history, of course.",
      
      // Quantitative facts
      facts: {
        population: "654,776 (city) / 4.9M (metro)",
        founded: "1630",
        timezone: "Eastern Time (UTC-5)",
        airport: "Boston Logan (BOS) - 4 miles from downtown",
        walkScore: 83,
        transitScore: 72,
        averageHighSept: "72°F (22°C)",
        averageLowSept: "57°F (14°C)",
        rainyDaysSept: 8,
      },
      
      // Things to do
      mustDo: [
        { name: "Walk the Freedom Trail", duration: "2-3 hours", type: "history", description: "2.5-mile walk through 16 historic sites" },
        { name: "Neptune Oyster - Lobster Roll", duration: "1-2 hours (with wait)", type: "food", description: "Iconic North End lobster spot, arrive early!" },
        { name: "Boston Common & Public Garden", duration: "1 hour", type: "nature", description: "America's oldest public park + swan boats" },
        { name: "Faneuil Hall & Quincy Market", duration: "1-2 hours", type: "shopping", description: "Historic marketplace with food vendors" },
        { name: "North End (Little Italy)", duration: "2 hours", type: "neighborhood", description: "Cannoli at Mike's Pastry or Modern Pastry" },
      ],
      
      lobsterSpots: [
        { name: "Neptune Oyster", style: "Hot Butter", price: "$$$", wait: "45-90 min", coordinates: [42.3631, -71.0546] },
        { name: "Row 34", style: "Both styles", price: "$$$", wait: "20-40 min", coordinates: [42.3467, -71.0437] },
        { name: "James Hook & Co", style: "Classic Maine", price: "$$", wait: "10-20 min", coordinates: [42.3510, -71.0487] },
      ],
      
      // Practical info
      parking: "Expensive ($25-50/day). Consider parking at hotel and walking/using T.",
      transportation: "MBTA subway (The T) covers most tourist areas. $2.40/ride or $11 day pass.",
      neighborhoods: {
        stay: ["Back Bay", "Beacon Hill", "Seaport District"],
        visit: ["North End", "Harvard/Cambridge", "Fenway"],
      },
    },
    
    {
      id: 2,
      name: "Portland",
      state: "ME",
      country: "USA",
      coordinates: [43.6591, -70.2568],
      nights: "1",
      role: "Coastal Maine Hub",
      
      driveFromPrevious: {
        from: "Boston",
        distance: "110 miles",
        duration: "2 hours",
        route: "I-95 North",
        scenicAlternative: "Route 1A through coastal towns (+1 hour)",
        stops: ["Portsmouth, NH (30 min stop)", "Kennebunkport (45 min stop)"]
      },
      
      momQuote: "Drive up the coast to Portland, ME",
      
      facts: {
        population: "68,408",
        nickname: "The Portland of the East",
        timezone: "Eastern Time",
        walkScore: 62,
        restaurantsPerCapita: "#1 in USA",
        averageHighSept: "68°F (20°C)",
        averageLowSept: "52°F (11°C)",
        foliageStatus: "Early color (10-30% change)",
      },
      
      mustDo: [
        { name: "Eventide Oyster Co.", duration: "1 hour", type: "food", description: "Famous brown butter lobster roll on bao bun" },
        { name: "Portland Head Light", duration: "1 hour", type: "sightseeing", description: "Most photographed lighthouse in America, est. 1791" },
        { name: "Old Port District", duration: "2 hours", type: "neighborhood", description: "Cobblestone streets, boutiques, galleries" },
        { name: "Holy Donut", duration: "15 min", type: "food", description: "Maine potato donuts - unique!" },
        { name: "Allagash Brewing", duration: "1 hour", type: "brewery", description: "Belgian-style craft beer tour" },
      ],
      
      lobsterSpots: [
        { name: "Eventide Oyster Co.", style: "Brown Butter", price: "$$$", wait: "30-60 min", coordinates: [43.6573, -70.2515], mustTry: true },
        { name: "Highroller Lobster Co.", style: "Creative", price: "$$", wait: "10-20 min", coordinates: [43.6557, -70.2547] },
        { name: "Bite Into Maine", style: "Multiple", price: "$$", wait: "10-15 min", coordinates: [43.6231, -70.2080] },
      ],
      
      parking: "Metered street parking or garages ($15-25/day). Old Port has 2-hour limits.",
      transportation: "Very walkable downtown. Uber/Lyft available but not essential.",
    },
    
    {
      id: 3,
      name: "Chelsea",
      state: "VT",
      country: "USA",
      coordinates: [43.9890, -72.4477],
      nights: "1-2",
      role: "Sally's Place - Vermont Retreat",
      
      driveFromPrevious: {
        from: "Portland, ME",
        distance: "180 miles",
        duration: "3.5 hours",
        route: "Via Concord, NH on I-89",
        scenicAlternative: null,
        stops: ["Concord, NH - quick stop/lunch"]
      },
      
      momQuote: "I thought we could stay a night at Sally's in Chelsea (I have no real plans for Concord, it could just be a stopping place on the way). We can do some serious walking/hiking just on Sally's property alone.",
      
      facts: {
        population: "1,250",
        elevation: "989 feet",
        county: "Orange County",
        timezone: "Eastern Time",
        averageHighSept: "67°F (19°C)",
        averageLowSept: "46°F (8°C)",
        foliageStatus: "Moderate color (30-50% change)",
        nearestTown: "Barre (20 min)",
        nearestGrocery: "Chelsea Country Store",
      },
      
      mustDo: [
        { name: "Hike Sally's property", duration: "2-3 hours", type: "hiking", description: "Private trails and beautiful Vermont countryside" },
        { name: "Chelsea Village walk", duration: "30 min", type: "exploring", description: "Quintessential Vermont village with two greens" },
        { name: "Local farm stands", duration: "variable", type: "shopping", description: "Fresh apples, cider, cheese" },
        { name: "Vermont country roads drive", duration: "1-2 hours", type: "scenic", description: "Peak foliage viewing" },
      ],
      
      whatToExpect: [
        "Very rural - limited cell service in some areas",
        "Bring snacks/food - limited restaurant options",
        "Sally's property has amazing views and trails",
        "Stars at night are incredible (no light pollution)",
      ],
      
      parking: "Free - private property",
      transportation: "Car essential. No public transit.",
    },
    
    {
      id: 4,
      name: "Montreal",
      state: "QC",
      country: "Canada",
      coordinates: [45.5017, -73.5673],
      nights: "2",
      role: "International City Experience",
      
      driveFromPrevious: {
        from: "Chelsea, VT",
        distance: "135 miles",
        duration: "2.5 hours",
        route: "I-89 to Canada via Burlington VT border crossing",
        borderCrossing: true,
        stops: ["Burlington, VT - optional hiking, lunch"]
      },
      
      momQuote: "No specific plans for Burlington, just a nice stopping place, some hiking? Explore Montreal.",
      
      facts: {
        population: "1.78 million (city) / 4.3M (metro)",
        language: "French (official), English widely spoken",
        currency: "Canadian Dollar (CAD)",
        timezone: "Eastern Time",
        founded: "1642",
        walkScore: 65,
        averageHighSept: "66°F (19°C)",
        averageLowSept: "51°F (11°C)",
        exchangeRate: "~1 USD = 1.35 CAD (check current)",
      },
      
      borderInfo: {
        documents: "Passport REQUIRED for US citizens",
        crossingTime: "15-45 minutes typical",
        tip: "Have hotel reservation confirmation ready",
        dutyFree: "Alcohol limit: 1.5L wine or 1.14L spirits per person",
      },
      
      mustDo: [
        { name: "Old Montreal (Vieux-Montréal)", duration: "3-4 hours", type: "neighborhood", description: "Cobblestone streets, 17th-century architecture, Notre-Dame Basilica" },
        { name: "Notre-Dame Basilica", duration: "1 hour", type: "landmark", description: "Stunning Gothic Revival church with light show (AURA)" },
        { name: "Mount Royal Park", duration: "2 hours", type: "nature", description: "Frederick Olmsted designed park, city views, fall foliage" },
        { name: "Jean-Talon Market", duration: "1-2 hours", type: "food", description: "One of North America's largest open-air markets" },
        { name: "Mile End neighborhood", duration: "2 hours", type: "neighborhood", description: "Bagels (Fairmount vs St-Viateur), murals, hipster cafes" },
        { name: "Schwartz's Deli", duration: "1 hour", type: "food", description: "Legendary smoked meat sandwiches since 1928" },
        { name: "Plateau Mont-Royal", duration: "2 hours", type: "neighborhood", description: "Colorful houses, outdoor staircases, local boutiques" },
      ],
      
      foodScene: [
        { name: "Schwartz's Deli", type: "smoked meat", price: "$$", note: "Cash only, expect a line" },
        { name: "Au Pied de Cochon", type: "Quebecois", price: "$$$$", note: "Reservations essential, foie gras poutine" },
        { name: "Joe Beef", type: "French/local", price: "$$$$", note: "Celebrity chef spot, book weeks ahead" },
        { name: "Fairmount Bagel", type: "bakery", price: "$", note: "24/7, Montreal-style wood-fired bagels" },
        { name: "La Banquise", type: "poutine", price: "$$", note: "30+ poutine varieties, open 24/7" },
      ],
      
      parking: "Street parking available but confusing signs (in French). Hotel parking $25-40/night. Consider parking outside downtown.",
      transportation: "Excellent Metro system. Walking-friendly downtown.",
    },
    
    {
      id: 5,
      name: "Saratoga Springs",
      state: "NY",
      country: "USA",
      coordinates: [43.0831, -73.7846],
      nights: "1",
      role: "Historic Spa Town",
      
      driveFromPrevious: {
        from: "Montreal",
        distance: "190 miles",
        duration: "4 hours",
        route: "Via Lake Placid through Adirondacks",
        scenicAlternative: "Direct I-87 saves 1 hour but misses Adirondacks",
        stops: ["Lake Placid (1-2 hour stop) - 1980 Olympics sites"],
        borderCrossing: true,
      },
      
      momQuote: "Drive to Saratoga Springs, NY (via Lake Placid)",
      
      facts: {
        population: "28,491",
        nickname: "Spa City",
        timezone: "Eastern Time",
        famous: "Horse racing, mineral springs, arts",
        racingSeason: "July-September (may catch last races)",
        walkScore: 78,
        averageHighSept: "70°F (21°C)",
        averageLowSept: "50°F (10°C)",
      },
      
      mustDo: [
        { name: "Saratoga Spa State Park", duration: "2 hours", type: "nature", description: "2,300 acres, mineral springs you can drink, pools" },
        { name: "Downtown Broadway walk", duration: "1-2 hours", type: "shopping", description: "Victorian architecture, boutiques, restaurants" },
        { name: "Taste the mineral springs", duration: "30 min", type: "experience", description: "Each spring has unique mineral composition" },
        { name: "Lake George (nearby)", duration: "half day", type: "nature", description: "32-mile long lake, boat tours, hiking" },
      ],
      
      lakePlacidEnRoute: {
        name: "Lake Placid",
        duration: "1-2 hours stop",
        highlights: [
          "1980 Winter Olympics sites",
          "Olympic ski jumps (elevator to top for views)",
          "Mirror Lake walk",
          "Adorable downtown shops",
        ],
        coordinates: [44.2795, -73.9799],
      },
      
      parking: "Free street parking available. Downtown lots $5-10/day.",
      transportation: "Walkable downtown. Car needed for spa park.",
    },
    
    {
      id: 6,
      name: "Stockbridge",
      state: "MA",
      country: "USA",
      coordinates: [42.2871, -73.3048],
      nights: "1 (or end trip)",
      role: "Berkshires Culture",
      
      driveFromPrevious: {
        from: "Saratoga Springs",
        distance: "70 miles",
        duration: "1.5 hours",
        route: "Via Albany, NY",
        stops: ["Albany - optional 30 min"]
      },
      
      momQuote: "Hiking in Ice Glen and Laura's Tower?",
      
      facts: {
        population: "1,947",
        famous: "Norman Rockwell's home, Tanglewood (summer)",
        timezone: "Eastern Time",
        region: "The Berkshires",
        averageHighSept: "69°F (20°C)",
        averageLowSept: "48°F (9°C)",
        foliageStatus: "Peak or near-peak (50-75% change)",
      },
      
      mustDo: [
        { name: "Ice Glen Trail", duration: "1-2 hours", type: "hiking", description: "Boulder-strewn ravine, magical mossy gorge, ~0.5 miles" },
        { name: "Laura's Tower", duration: "1 hour", type: "hiking", description: "Historic stone tower with panoramic Berkshires views" },
        { name: "Norman Rockwell Museum", duration: "2 hours", type: "museum", description: "Original Saturday Evening Post illustrations" },
        { name: "Red Lion Inn", duration: "1 hour", type: "landmark", description: "Historic 1773 inn, have a drink on the porch" },
        { name: "Main Street walk", duration: "30 min", type: "exploring", description: "The 'most photographed main street in America'" },
      ],
      
      iceGlen: {
        difficulty: "Moderate",
        distance: "0.5 miles",
        elevation: "200 ft gain",
        description: "Narrow ravine filled with massive boulders covered in moss. Feels like a fairy tale. Can be slippery.",
        trailhead: [42.2812, -73.3154],
      },
      
      endTripOptions: [
        { airport: "Albany (ALB)", distance: "50 miles", driveTime: "1 hour" },
        { airport: "Boston (BOS)", distance: "130 miles", driveTime: "2.5 hours" },
        { airport: "Hartford (BDL)", distance: "75 miles", driveTime: "1.5 hours" },
      ],
      
      parking: "Free street parking throughout town.",
      transportation: "Car essential. Very small, walkable downtown.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // ALTERNATIVE ROUTES (from MMTrip.txt)
  // ═══════════════════════════════════════════════════════════════
  alternatives: {
    fingerLakes: {
      name: "Finger Lakes Extension",
      addedDays: 2,
      addedMiles: 180,
      highlights: ["Watkins Glen State Park", "Wine tasting", "Ithaca"],
      flyOut: "Albany (ALB) or Syracuse (SYR)",
    },
    southernNewEngland: {
      name: "Dip South: CT & RI",
      addedDays: 2,
      addedMiles: 200,
      highlights: ["Newport, RI mansions", "Mystic, CT seaport", "New Haven pizza"],
      flyOut: "Providence (PVD) or Hartford (BDL)",
    },
    totallyDifferent: [
      "Carolinas, Virginia, Tennessee, Kentucky",
      "Southern Illinois, Kentucky, Missouri",
      "Pacific Northwest (but you've done that already, right?)",
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // FOLIAGE TRACKER
  // ═══════════════════════════════════════════════════════════════
  foliage: {
    peakDates: {
      "Northern Maine": "Sept 20 - Oct 5",
      "White Mountains, NH": "Sept 25 - Oct 10",
      "Vermont": "Sept 25 - Oct 15",
      "Montreal region": "Sept 20 - Oct 5",
      "Adirondacks, NY": "Sept 25 - Oct 10",
      "Berkshires, MA": "Oct 1 - Oct 20",
      "Boston area": "Oct 10 - Oct 25",
    },
    bestDrives: [
      { name: "Kancamagus Highway, NH", length: "34.5 miles", description: "One of America's best fall drives" },
      { name: "Route 100, Vermont", length: "217 miles", description: "The classic Vermont foliage route" },
      { name: "Mohawk Trail, MA", length: "63 miles", description: "Historic Native American path through Berkshires" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // BUDGET ESTIMATES
  // ═══════════════════════════════════════════════════════════════
  budget: {
    perPerson7Days: {
      budget: { min: 1200, max: 1600, label: "Budget" },
      moderate: { min: 1800, max: 2500, label: "Moderate" },
      luxury: { min: 3000, max: 5000, label: "Luxury" },
    },
    breakdown: {
      flights: { budget: 200, moderate: 350, luxury: 600, note: "Boston roundtrip" },
      lodging: { budget: 80, moderate: 150, luxury: 300, note: "per night, shared room" },
      food: { budget: 50, moderate: 80, luxury: 150, note: "per day" },
      gas: { budget: 20, moderate: 20, luxury: 20, note: "per day, split" },
      activities: { budget: 20, moderate: 50, luxury: 100, note: "per day" },
    },
    tips: [
      "Book lodging early - fall foliage season sells out months ahead",
      "Shoulder season (early Sept) is cheaper but less color",
      "Montreal is cheaper than US cities for dining",
      "Many hikes and scenic drives are FREE",
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // PACKING ESSENTIALS
  // ═══════════════════════════════════════════════════════════════
  packing: {
    weather: "Expect 45-75°F. Layers are essential. Rain likely.",
    essentials: [
      "Passport (REQUIRED for Canada)",
      "Layers - fleece, light jacket, rain shell",
      "Comfortable walking shoes",
      "Hiking shoes/boots for trails",
      "Sunglasses",
      "Camera for foliage shots",
      "Portable phone charger",
      "Cash for small vendors/tips",
      "Canadian dollars for Montreal",
    ],
    optional: [
      "Binoculars for views",
      "Small daypack for hikes",
      "Travel umbrella",
      "Reusable water bottle",
    ],
  },
}

export default momsRoute
