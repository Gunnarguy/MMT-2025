export const tripData = {
  title: "Tere & Mikaela's Epic Girls Trip",
  subtitle: "New England & Southern Quebec • Late September 2026",
  tagline: "Lobsters 🦞 • Leaves 🍁 • Love 💕",
  summary:
    "Begin in Boston, surf the Maine coast, crest the White and Green Mountains, cross into cosmopolitan Montreal, and descend through the Adirondacks to Saratoga/Albany— chasing foliage vertically while honoring the original 'girls trip' wish list.",

  // Trip dates for countdown
  tripDates: {
    start: "2026-09-20",
    end: "2026-09-27",
  },

  // The travelers!
  travelers: [
    { name: "Tere", emoji: "👩‍🦰", role: "Chief Adventure Officer" },
    { name: "Mikaela", emoji: "👩", role: "Director of Vibes & Navigation" },
  ],

  // ========================================
  // 🦞 ULTIMATE LOBSTER GUIDE FOR MIKAELA
  // ========================================
  lobsterGuide: {
    intro: "Maine is the lobster capital of the world, producing over 100 million pounds annually. Late September is PRIME season—hard-shell lobsters are packed with sweet, firm meat.",
    
    // Lobster roll styles explained
    styles: [
      {
        name: "Maine Style (Cold)",
        description: "Chilled lobster meat lightly dressed with mayo, served on a buttered, toasted split-top bun",
        bestFor: "Purists who want to taste the pure sweetness of the lobster",
        icon: "🥶"
      },
      {
        name: "Connecticut Style (Hot)",
        description: "Warm lobster meat bathed in drawn butter, served on a toasted bun",
        bestFor: "Those who love rich, indulgent flavors",
        icon: "🔥"
      },
      {
        name: "Naked/Plain",
        description: "Just lobster meat on a bun—butter and mayo on the side",
        bestFor: "Control freaks (said lovingly) who want to customize",
        icon: "🦞"
      }
    ],

    // Top lobster spots ranked with detailed intel
    topSpots: [
      {
        rank: 1,
        name: "Eventide Oyster Co.",
        location: "Portland, ME",
        style: "Brown Butter",
        price: "$$$",
        mustOrder: "Brown Butter Lobster Roll on steamed bao-style bun",
        waitTime: "30-60 min (no reservations)",
        proTip: "Go at 3pm between lunch and dinner rush. The bun is a Chinese-style steamed bao—totally unique!",
        rating: 4.9,
        reviews: 2847,
        coordinates: [43.6573, -70.2515],
        whySpecial: "James Beard Award winner. Their brown butter glaze on a pillowy bun changed the lobster roll game forever.",
        bestTime: "Mid-afternoon",
        tags: ["James Beard Winner", "Innovative", "Must-Visit"]
      },
      {
        rank: 2,
        name: "Neptune Oyster",
        location: "Boston, MA",
        style: "Hot Butter",
        price: "$$$",
        mustOrder: "Hot Buttered Lobster Roll",
        waitTime: "45-90 min (no reservations, tiny space)",
        proTip: "Arrive 20 min before opening (11:30am). Worth every minute of the wait.",
        rating: 4.8,
        reviews: 3241,
        coordinates: [42.3631, -71.0546],
        whySpecial: "The roll that launched a thousand Instagram posts. Overflowing with a quarter-pound of lobster meat.",
        bestTime: "Right at opening",
        tags: ["Iconic", "Boston Legend", "Worth the Wait"]
      },
      {
        rank: 3,
        name: "The Clam Shack",
        location: "Kennebunkport, ME",
        style: "Classic Maine",
        price: "$$",
        mustOrder: "Lobster Roll on round burger bun + fried clams",
        waitTime: "15-30 min",
        proTip: "Cash only! Their unique round bun is controversial but delicious. Get clam strips too.",
        rating: 4.7,
        reviews: 1893,
        coordinates: [43.3615, -70.4768],
        whySpecial: "Served on a toasted hamburger bun instead of hot dog bun—more bread, more butter, more satisfaction.",
        bestTime: "Early lunch",
        tags: ["Cash Only", "Unique Style", "Harbor Views"]
      },
      {
        rank: 4,
        name: "Chauncey Creek Lobster Pier",
        location: "Kittery Point, ME",
        style: "Whole Lobster",
        price: "$$",
        mustOrder: "1.5 lb whole lobster + steamers",
        waitTime: "10-20 min",
        proTip: "BYOB! Stop at a Kittery wine shop first. Bring a tablecloth, candles, wine glasses—make it FANCY on a picnic table over the water.",
        rating: 4.8,
        reviews: 1567,
        coordinates: [43.0891, -70.6789],
        whySpecial: "The quintessential Maine experience. Eat lobster literally over the creek, bring your own everything.",
        bestTime: "Golden hour (5-7pm)",
        tags: ["BYOB", "Waterfront", "Romantic"]
      },
      {
        rank: 5,
        name: "Bite Into Maine",
        location: "Cape Elizabeth, ME",
        style: "Multiple Styles",
        price: "$$",
        mustOrder: "Flight of 3 mini rolls (try all styles!)",
        waitTime: "10-15 min",
        proTip: "Food truck at Portland Head Light! Get lobster AND lighthouse photos. They offer wasabi, curry, and chipotle versions too.",
        rating: 4.7,
        reviews: 892,
        coordinates: [43.6231, -70.2080],
        whySpecial: "The only place to get a FLIGHT of lobster rolls. Perfect for the indecisive or adventurous.",
        bestTime: "Lunchtime with lighthouse visit",
        tags: ["Food Truck", "Lighthouse Views", "Flight Available"]
      },
      {
        rank: 6,
        name: "Red's Eats",
        location: "Wiscasset, ME",
        style: "Classic Maine",
        price: "$$$",
        mustOrder: "The famous overflowing lobster roll",
        waitTime: "60-120 min (!)",
        proTip: "Only worth it if you're driving by anyway. The line is legendary but so is the portion—a full pound of lobster meat.",
        rating: 4.6,
        reviews: 2134,
        coordinates: [44.0028, -69.6656],
        whySpecial: "The most photographed lobster roll in America. A full POUND of meat tumbling off the bun.",
        bestTime: "Early morning or skip if short on time",
        tags: ["Famous", "Massive Portions", "Long Lines"]
      },
      {
        rank: 7,
        name: "McLoons Lobster Shack",
        location: "South Thomaston, ME",
        style: "Classic Maine",
        price: "$$",
        mustOrder: "Lobster Roll + whoopie pie for dessert",
        waitTime: "5-15 min",
        proTip: "1.5 hours north of Portland but the setting is UNREAL. Working lobster wharf, no tourists. The Maine postcard dream.",
        rating: 4.9,
        reviews: 743,
        coordinates: [44.0539, -69.1347],
        whySpecial: "If you have time, this is THE authentic experience. Lobster boats unloading while you eat.",
        bestTime: "Any time—it's never crowded",
        tags: ["Hidden Gem", "Authentic", "Working Wharf"]
      },
      {
        rank: 8,
        name: "Highroller Lobster Co.",
        location: "Portland, ME",
        style: "Creative",
        price: "$$",
        mustOrder: "Lobster roll + Lobster Mac & Cheese",
        waitTime: "10-20 min",
        proTip: "Fun, casual, affordable by lobster standards. They have a fantastic spicy 'Picnic' roll with pickled jalapeños.",
        rating: 4.6,
        reviews: 1102,
        coordinates: [43.6557, -70.2547],
        whySpecial: "Young, hip, creative. Their Thai chili roll and Korean BBQ roll push boundaries.",
        bestTime: "Late lunch",
        tags: ["Creative Flavors", "Casual Vibe", "Affordable"]
      }
    ],

    // Lobster economics & tips
    economics: {
      averagePrice2025: "$28-42",
      peakSeason: "July-October (late Sept = prime hard-shell)",
      hardVsSoft: "Late September = Hard Shell. More meat, sweeter flavor, slightly harder to crack but SO worth it.",
      orderingTip: "Always ask if it's 'market price' and what today's price is before ordering",
      portion: "A good lobster roll should have 4-6 oz of meat minimum. Anything less is a ripoff.",
    }
  },

  // ========================================
  // ⛵ LITTLE HARBOR TOWNS - DETAILED GUIDE
  // ========================================
  harborTowns: [
    {
      name: "Perkins Cove, Ogunquit",
      state: "ME",
      coordinates: [43.2364, -70.5903],
      vibe: "Artist Colony Charm",
      population: "~1,200",
      walkability: "10/10 - Everything is walkable",
      mustDo: [
        "Walk the Marginal Way (1.25 mi paved cliff walk)",
        "Watch the manual drawbridge open for boats",
        "Browse the art galleries (50+ in tiny area!)",
        "Sunset drinks at Barnacle Billy's"
      ],
      dining: ["Barnacle Billy's (outdoor lobster)", "MC Perkins Cove (upscale)"],
      parking: "Arrive before 10am or park at Obed's Lot and walk/trolley",
      bestPhotoSpot: "Marginal Way overlook at sunrise",
      mood: "Bohemian-meets-preppy. Artists and old money coexisting beautifully.",
      rating: 4.8
    },
    {
      name: "Kennebunkport",
      state: "ME",
      coordinates: [43.3615, -70.4768],
      vibe: "Preppy & Presidential",
      population: "~3,500",
      walkability: "9/10 - Dock Square is very walkable",
      mustDo: [
        "Walk Dock Square (boutique shopping)",
        "Drive by Bush Estate at Walker's Point (visible from Ocean Ave)",
        "Explore Cape Porpoise (quieter, more local)",
        "Ice cream at Rococo"
      ],
      dining: ["The Clam Shack", "Bandaloop (upscale)", "Alisson's Restaurant"],
      parking: "Use the municipal lot off Maine St, $2/hr",
      bestPhotoSpot: "Colony Hotel from across the river",
      mood: "Old money New England. Whales, sails, and cocktails.",
      rating: 4.7
    },
    {
      name: "Portland Old Port",
      state: "ME",
      coordinates: [43.6591, -70.2568],
      vibe: "Foodie Mecca",
      population: "~68,000 (city)",
      walkability: "10/10 - Cobblestone streets made for walking",
      mustDo: [
        "Get lost in the cobblestone streets",
        "Browse indie shops on Exchange St",
        "Taste wine at Vena's Fizz House",
        "Watch fishing boats at the wharf"
      ],
      dining: ["Eventide Oyster", "Duckfat (fries!)", "Scales (upscale seafood)"],
      parking: "Street parking tricky; use Ocean Gateway garage",
      bestPhotoSpot: "Congress Street mural walk",
      mood: "Brooklyn-by-the-sea. Tattooed chefs and fishermen sharing the sidewalk.",
      rating: 4.9
    },
    {
      name: "Cape Elizabeth / Portland Head Light",
      state: "ME",
      coordinates: [43.6231, -70.2080],
      vibe: "Classic New England Postcard",
      population: "~9,000",
      walkability: "7/10 - Need car but park-and-walk",
      mustDo: [
        "Portland Head Light (most photographed lighthouse in America!)",
        "Walk Fort Williams Park trails",
        "Have a lobster roll at Bite Into Maine food truck",
        "Watch the waves crash on the rocks"
      ],
      dining: ["Bite Into Maine (food truck)", "Kettle Cove Creamery"],
      parking: "$5 park fee, totally worth it",
      bestPhotoSpot: "Portland Head Light from the south rocks at sunset",
      mood: "Pure, unadulterated New England beauty. This is THE postcard.",
      rating: 4.9
    },
    {
      name: "Portsmouth",
      state: "NH",
      coordinates: [43.0718, -70.7626],
      vibe: "Historic & Hip",
      population: "~22,000",
      walkability: "10/10 - Compact downtown",
      mustDo: [
        "Walk Market Square",
        "Coffee at Breaking New Grounds",
        "Strawbery Banke Museum (if time allows)",
        "Cross to Kittery, ME for outlets"
      ],
      dining: ["The Friendly Toast", "Row 34", "Moxy"],
      parking: "Hanover St garage, easy",
      bestPhotoSpot: "Prescott Park waterfront",
      mood: "The artsy younger sibling of Boston. Great coffee, great vibes.",
      rating: 4.6
    },
    {
      name: "Camden",
      state: "ME",
      coordinates: [44.2098, -69.0648],
      vibe: "Yachts & Mountains",
      population: "~5,000",
      walkability: "9/10 - Compact harbor area",
      mustDo: [
        "Climb Mt. Battie (drive or hike for epic views)",
        "Stroll the harbor and watch schooners",
        "Browse the bookstores",
        "Catch the Camden Hills at peak foliage"
      ],
      dining: ["Waterfront Restaurant", "Long Grain (Thai!)", "Fresh"],
      parking: "Metered on main streets, free lots nearby",
      bestPhotoSpot: "Mt. Battie tower overlooking harbor + fall colors",
      mood: "Where mountains meet the sea. Genuinely magical.",
      rating: 4.8
    }
  ],

  // ========================================
  // 🍁 LIVE FOLIAGE TRACKER
  // ========================================
  foliageTracker: {
    lastUpdated: "Based on historical averages & 2024-2025 climate models",
    
    science: {
      whatCausesIt: "As days shorten, trees stop producing chlorophyll (green pigment), revealing hidden carotenoids (yellow/orange) and producing anthocyanins (red/purple)",
      peakTriggers: "Cool nights (40-50°F) + sunny days + adequate moisture = best colors",
      elevationRule: "Color starts at higher elevations and moves down ~100-200 ft per day"
    },

    // Foliage predictions by location for late September
    predictions: [
      {
        location: "Boston & Coast",
        coordinates: [42.3601, -71.0589],
        elevation: "Sea Level",
        expectedPeak: "Oct 10-20",
        lateSepting: "Patchy/Early • 15-30% color",
        status: "early",
        notes: "Still mostly green. Some early maples turning. Don't expect full color yet.",
        bestTreesNow: "Red Maples starting, Sumac"
      },
      {
        location: "Portland & Southern Maine Coast",
        coordinates: [43.6591, -70.2568],
        elevation: "Sea Level - 500 ft",
        expectedPeak: "Oct 5-15",
        lateSeptStatus: "Patchy • 20-35% color",
        status: "early",
        notes: "Slightly ahead of Boston. Pockets of color emerging.",
        bestTreesNow: "Red Maples, early Sugar Maples"
      },
      {
        location: "White Mountains / Kancamagus",
        coordinates: [44.0456, -71.4161],
        elevation: "1,000 - 4,000 ft",
        expectedPeak: "Sept 25 - Oct 5",
        lateSeptStatus: "NEAR PEAK • 60-80% color! 🔥",
        status: "peak",
        notes: "THIS IS WHERE YOU'LL SEE THE MAGIC! Higher elevations already blazing.",
        bestTreesNow: "Sugar Maples, Birches, Aspens all on fire"
      },
      {
        location: "Central Vermont / Chelsea",
        coordinates: [43.9887, -72.4476],
        elevation: "800 - 2,000 ft",
        expectedPeak: "Sept 28 - Oct 8",
        lateSeptStatus: "Peak Approaching • 50-70% color",
        status: "approaching",
        notes: "Vermont hills starting to pop. Sugar maples glowing orange.",
        bestTreesNow: "Sugar Maples, Red Maples, Birches"
      },
      {
        location: "Burlington / Lake Champlain",
        coordinates: [44.4759, -73.2121],
        elevation: "300 - 800 ft",
        expectedPeak: "Oct 1-10",
        lateSeptStatus: "Building • 35-50% color",
        status: "approaching",
        notes: "Valley still building. Hillsides across the lake showing color.",
        bestTreesNow: "Early maples, Sumac along lakeshore"
      },
      {
        location: "Montreal",
        coordinates: [45.5017, -73.5673],
        elevation: "200 - 800 ft",
        expectedPeak: "Oct 1-12",
        lateSeptStatus: "Building • 30-45% color",
        status: "approaching",
        notes: "Mount Royal will have nice color. City parks showing early reds.",
        bestTreesNow: "Maples on Mount Royal"
      },
      {
        location: "Adirondacks / Lake Placid",
        coordinates: [44.2795, -73.9799],
        elevation: "1,500 - 5,000 ft",
        expectedPeak: "Sept 22 - Oct 5",
        lateSeptStatus: "PEAK! • 70-90% color! 🍁🔥",
        status: "peak",
        notes: "FIERY! The Adirondacks peak early. Whiteface will be STUNNING.",
        bestTreesNow: "Everything—it's a full symphony of color"
      },
      {
        location: "Saratoga / Albany",
        coordinates: [42.8142, -73.9396],
        elevation: "300 - 600 ft",
        expectedPeak: "Oct 5-15",
        lateSeptStatus: "Early • 25-40% color",
        status: "early",
        notes: "Valley areas just getting started. Nice for a final taste.",
        bestTreesNow: "Red Maples, early oaks"
      }
    ],

    // Color guide
    colorGuide: [
      { tree: "Sugar Maple", color: "Brilliant Orange-Red", peakTime: "Early", icon: "🍁" },
      { tree: "Red Maple", color: "Scarlet Red", peakTime: "Early-Mid", icon: "❤️" },
      { tree: "White Birch", color: "Golden Yellow", peakTime: "Mid", icon: "💛" },
      { tree: "Aspen", color: "Bright Gold", peakTime: "Mid", icon: "✨" },
      { tree: "Oak", color: "Deep Red-Brown", peakTime: "Late", icon: "🤎" },
      { tree: "Sumac", color: "First to turn! Crimson", peakTime: "Very Early", icon: "🔴" }
    ],

    // Best foliage drives
    bestDrives: [
      {
        name: "Kancamagus Highway",
        state: "NH",
        coordinates: [44.0456, -71.4161],
        distance: "34 miles",
        time: "1.5-3 hours with stops",
        peakView: "Hancock Overlook, Sabbaday Falls",
        rating: 5,
        note: "THE premier leaf-peeping drive. No gas stations, no services—just pure beauty."
      },
      {
        name: "Whiteface Veterans Memorial Highway",
        state: "NY",
        coordinates: [44.3659, -73.9026],
        distance: "5 miles to summit",
        time: "1 hour round trip",
        peakView: "360° views from 4,867 ft elevation",
        rating: 5,
        note: "Drive almost to the summit! Closes mid-October, so late Sept is PERFECT."
      },
      {
        name: "Route 100 Vermont",
        state: "VT",
        coordinates: [44.4654, -72.6874],
        distance: "Varies (can do sections)",
        time: "Full day for whole route",
        peakView: "Stowe area, Waterbury valley",
        rating: 4.8,
        note: "The 'Main Street of Vermont.' Covered bridges, farms, and fire colors."
      },
      {
        name: "Mount Royal, Montreal",
        state: "QC",
        coordinates: [45.5048, -73.5877],
        distance: "2 mile loop drive + walking",
        time: "2-3 hours",
        peakView: "Kondiaronk Belvedere",
        rating: 4.5,
        note: "Fall foliage WITH a city skyline. Best of both worlds."
      }
    ],

    // Photography tips
    photoTips: [
      "Golden hour (first/last hour of sunlight) makes colors POP",
      "Overcast days = saturated colors without harsh shadows",
      "Bring a polarizing filter to reduce glare and boost color",
      "Include water reflections for double the color",
      "Look for single standout trees against green backgrounds for contrast"
    ]
  },

  // ========================================
  // LIVE STATS & DATA SOURCES
  // ========================================
  liveStats: {
    // Live lobster pricing (Updated for late Sept 2025 - peak season pricing)
    lobsterPrices: {
      dockPrice: 9.50,        // Direct from boat - best deal
      poundPrice: 14.99,      // At a fish market
      restaurantAvg: 24,       // Average lobster roll price
      wholeBoiled: 32,         // Restaurant whole lobster
      seasonalNote: "Peak Season - Great Prices!",
      lastUpdated: "Sept 2025",
      source: "Maine Lobster Marketing Collaborative"
    },
    
    // Current foliage percentages by region
    foliageStatus: {
      whiteMountains: 65,      // Higher elevation = earlier
      coastalMaine: 35,        // Coast is later
      acadiaNP: 45,            // Mid-range
      berkshires: 55,          // Western MA
      greenMountains: 60,      // Vermont
      lastUpdated: "Late Sept 2025"
    },
    
    // Current weather conditions
    weather: {
      avgHigh: 62,
      avgLow: 45,
      rainChance: 30,
      conditions: "Partly Cloudy",
      bestDays: "Tue, Wed, Sat"
    },
    
    dataSources: [
      { name: "Foliage Predictions", source: "SmokyMountains.com Prediction Model + NOAA Climate Data", url: "https://smokymountains.com/fall-foliage-map/" },
      { name: "Lobster Prices", source: "Maine Lobster Marketing Collaborative", url: "https://lobsterfrommaine.com/" },
      { name: "Weather Data", source: "NOAA Historical Averages + Weather.gov", url: "https://weather.gov" },
      { name: "Restaurant Ratings", source: "Google Maps + Yelp Aggregated", url: null },
      { name: "Harbor Town Info", source: "Maine Office of Tourism + Local Sources", url: "https://visitmaine.com" }
    ],
    
    // Quick stats banner
    quickStats: {
      totalLobsterSpots: 8,
      milesOfCoastline: "~228 (Maine coast segment)",
      harborTowns: 6,
      lighthouses: 3,
      avgLobsterPrice: "$32",
      peakFoliageLocations: 2,
      coverBridgesOnRoute: 4
    }
  },

  // Curated Spotify playlist
  playlist: {
    name: "MMT 2025 Road Trip Vibes",
    embedUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DX0kbJZpiYdZl",
    description: "The perfect soundtrack for leaf-peeping and lobster-eating",
  },

  // Emergency contacts
  emergencyContacts: [
    { name: "Sally (Chelsea, VT)", phone: "(802) 555-0123", note: "Host in Vermont" },
    { name: "US Embassy Montreal", phone: "+1-514-398-9695", note: "24hr emergency" },
    { name: "AAA Roadside", phone: "1-800-222-4357", note: "Rental car issues" },
  ],

  // Budget estimator
  budgetEstimate: {
    flights: { min: 400, max: 600, note: "BOS in, ALB out per person" },
    hotels: { min: 1200, max: 2000, note: "6 nights, mix of boutique & B&B" },
    rentalCar: { min: 350, max: 500, note: "7 days + one-way drop fee" },
    food: { min: 600, max: 1000, note: "Lobster splurges included 🦞" },
    activities: { min: 150, max: 300, note: "Tours, parking, tips" },
    gas: { min: 150, max: 200, note: "~800 miles total" },
    border: { min: 0, max: 50, note: "Currency exchange buffer" },
  },

  // Weather forecast (late September averages)
  weatherForecast: [
    { location: "Boston", high: 72, low: 55, icon: "🌤️", note: "Indian Summer vibes" },
    { location: "Portland", high: 70, low: 50, icon: "🌊", note: "Coastal breeze" },
    { location: "White Mountains", high: 62, low: 38, icon: "🍂", note: "Peak foliage!" },
    { location: "Vermont", high: 65, low: 42, icon: "🍁", note: "Cozy sweater weather" },
    { location: "Montreal", high: 63, low: 45, icon: "🧥", note: "Pack a jacket!" },
    { location: "Adirondacks", high: 60, low: 40, icon: "🏔️", note: "Crisp mountain air" },
  ],

  // Photo spots for the gallery
  photoSpots: [
    { name: "Freedom Trail", location: "Boston", tip: "Golden hour at Faneuil Hall" },
    { name: "Portland Head Light", location: "Cape Elizabeth", tip: "Most photographed lighthouse in America" },
    { name: "Marginal Way", location: "Ogunquit", tip: "Sunrise cliff walk magic" },
    { name: "Albany Covered Bridge", location: "Kancamagus", tip: "Classic New England postcard" },
    { name: "Sabbaday Falls", location: "White Mountains", tip: "Bring a tripod for long exposure" },
    { name: "Church Street", location: "Burlington", tip: "Street performers at sunset" },
    { name: "Mount Royal", location: "Montreal", tip: "Kondiaronk Belvedere panorama" },
    { name: "Notre-Dame Basilica", location: "Montreal", tip: "Aura light show is Instagram gold" },
    { name: "Whiteface Mountain", location: "Adirondacks", tip: "360° foliage views" },
  ],

  mmHighlights: [
    {
      title: "Original Wish List",
      content:
        "Begin in Boston (1–2 nights), hug the coast to Portland, cut inland to Chelsea/VT via Concord, reach Montreal through Burlington, then decide between Saratoga, Stockbridge, or even the Finger Lakes before flying out.",
    },
    {
      title: "Non-Negotiables",
      content:
        "Little harbor towns, lobster/seafood pilgrimages, leaf-peeping hikes, and the freedom to pivot mid-trip.",
    },
  ],

  researchHighlights: [
    {
      title: "Foliage Science",
      detail:
        "Late September color pops above 2,000 ft (White/Green Mountains, Adirondacks). Coastal Boston/Portland remain mostly green until October 5–17.",
    },
    {
      title: "Traffic & Border Logistics",
      detail:
        "Plan mid-week drives (Kancamagus + US-1 are jammed 11am–3pm), keep passports + Canadian insurance cards handy, and confirm rental-car cross-border permissions.",
    },
    {
      title: "Montreal Culture Shock",
      detail:
        "Expect a 10°F temp drop vs. Boston, BYOB restaurants in Plateau/Mile End, and must-do food trinity: bagels, smoked meat, poutine.",
    },
  ],

  logistics: [
    {
      title: "Elevation-first leaf hunt",
      icon: "🍁",
      content:
        "Route purposely climbs: Boston (sea level) ➜ White Mountains ➜ Central VT ➜ Adirondacks for peak reds/oranges.",
    },
    {
      title: "Weather & wardrobe",
      icon: "🧥",
      content:
        "Indian Summer highs ~72°F in Boston vs. low 60s in Montreal. Pack 3-in-1 shell, insulating mid-layer, and smart-casual outfits for dinners.",
    },
    {
      title: "Border-ready vanlife",
      icon: "🛂",
      content:
        "Passports (ideally 6+ months validity), rental agreement showing Canada approval, and awareness of strict DUI inadmissibility rules.",
    },
  ],

  map: {
    center: [44.2, -72.2],
    zoom: 6,
    routeCoordinates: [
      [42.3601, -71.0589],
      [43.6591, -70.2568],
      [43.9843, -71.1645],
      [43.9892, -72.4476],
      [44.4759, -73.2121],
      [45.5017, -73.5673],
      [44.2795, -73.9799],
      [43.0831, -73.784],
      [42.6526, -73.7562],
    ],
    alternativeCoordinates: [
      [45.5017, -73.5673],
      [43.0831, -73.784],
      [42.2876, -73.3207],
      [42.3601, -71.0589],
    ],
    stops: [
      {
        id: "boston",
        name: "Boston, MA",
        coords: [42.3601, -71.0589],
        category: "core",
        mmNote:
          "Begin in Boston — use arrival day + next for history walks and lobster rolls.",
        researchNote:
          "Delay rental pickup; Boston parking >$50/night. Use MBTA/Silver Line, then grab the car on departure morning.",
      },
      {
        id: "portland",
        name: "Portland, ME",
        coords: [43.6591, -70.2568],
        category: "core",
        mmNote: "Drive up the coast to Portland (2 hrs) for 1 night of harbor time.",
        researchNote:
          "Route 1 via Ogunquit + Kennebunkport adds 90 mins but nails the 'little harbor towns' brief. Portland Head Light + Eventide Oyster Co. are musts.",
      },
      {
        id: "kanc",
        name: "Kancamagus Highway",
        coords: [43.9843, -71.1645],
        category: "core",
        mmNote:
          "Original plan said Concord, but we're redirecting through the mountains for better hiking on Sally’s property afterward.",
        researchNote:
          "Depart Portland by 8am. Stops: Albany Covered Bridge, Sabbaday Falls, Hancock Overlook. Expect highest foliage intensity here.",
      },
      {
        id: "chelsea",
        name: "Chelsea, VT",
        coords: [43.9892, -72.4476],
        category: "core",
        mmNote:
          "Stay 1–2 nights at Sally’s—walk/hike right on the property.",
        researchNote:
          "Rural, quiet, extremely dark skies. Peak foliage timing aligns with late September. Stock up before heading onto the back roads.",
      },
      {
        id: "burlington",
        name: "Burlington, VT",
        coords: [44.4759, -73.2121],
        category: "core",
        mmNote:
          "Stop in Burlington en route to Montreal for waterfront views + shopping.",
        researchNote:
          "Pair with Montpelier + Waterbury (Ben & Jerry’s, cider donuts) for snacks. Lake Champlain sunset previews Adirondack terrain.",
      },
      {
        id: "montreal",
        name: "Montreal, QC",
        coords: [45.5017, -73.5673],
        category: "core",
        mmNote: "Explore Montreal for 2 nights.",
        researchNote:
          "Stay Old Montreal for romance, play in Plateau for BYOB dinners. Food trinity: St-Viateur bagels, Schwartz’s smoked meat, La Banquise poutine.",
      },
      {
        id: "lake-placid",
        name: "Lake Placid, NY",
        coords: [44.2795, -73.9799],
        category: "core",
        mmNote: "Optional detour via Lake Placid before Saratoga.",
        researchNote:
          "Drive Whiteface Mountain Veterans Memorial Highway (closes mid-Oct). Adirondack color peaks early—huge foliage payoff.",
      },
      {
        id: "saratoga",
        name: "Saratoga Springs, NY",
        coords: [43.0831, -73.784],
        category: "core",
        mmNote: "Stay 1 night; then fly from Albany or continue to Berkshires.",
        researchNote:
          "Racing season is over, meaning quieter 'dark days' ideal for spas, Broadway strolls, and Yaddo Gardens.",
      },
      {
        id: "albany",
        name: "Albany, NY",
        coords: [42.6526, -73.7562],
        category: "departure",
        mmNote: "Fly home from Albany—or drive back east toward Stockbridge/Boston.",
        researchNote:
          "Watch the one-way drop fee ($100–$500). Evaluate vs. driving I-90 back to BOS.",
      },
    ],
    alternativeStops: [
      {
        id: "stockbridge",
        name: "Stockbridge, MA",
        coords: [42.2876, -73.3207],
        category: "alt",
        mmNote:
          "Drive to Stockbridge via Albany for Ice Glen & Laura’s Tower hikes.",
        researchNote:
          "Norman Rockwell Museum + gilded-age estates = cultured finale before returning to Boston.",
      },
      {
        id: "finger-lakes",
        name: "Finger Lakes, NY",
        coords: [42.443, -76.5019],
        category: "alt",
        mmNote:
          "Explore the Finger Lakes area if choosing a longer New York loop.",
        researchNote:
          "Expect wineries + waterfalls, but foliage peaks slightly later (early Oct).",
      },
    ],
  },

  itinerary: [
    {
      day: 1,
      title: "Arrival & Immersion",
      location: "Boston, MA",
      details:
        "Arrive Logan (BOS), drop bags in Back Bay/Seaport, eat lobster + chowder before renting the car.",
      activities: [
        "Self-guided Freedom Trail sprint",
        "Dinner: Neptune Oyster (hot buttered roll) or Union Oyster House for history",
      ],
      note: "Keep the rental car off Boston streets until departure day to dodge $50+ hotel parking.",
    },
    {
      day: 2,
      title: "Harbor Town Ramble",
      location: "Boston ➜ Portland",
      driveTime: "2 hrs direct • 3.5 hrs with Route 1 detours",
      details:
        "Shoot up I-95 to Newburyport, then slow-roll Route 1 through Portsmouth, Ogunquit, Kennebunkport, and Cape Elizabeth.",
      stops: [
        { name: "Marginal Way", highlight: "Easy cliff walk linking Ogunquit to Perkins Cove." },
        { name: "The Clam Shack", highlight: "Iconic round-bun lobster roll." },
        { name: "Chauncey Creek", highlight: "BYOB pier—bring bubbles + tablecloth." },
      ],
      dining: "Eventide Oyster Co. (brown-butter roll) or Duckfat (fries & poutine) in Portland.",
      stay: "Old Port boutique hotel or waterfront Airbnb.",
    },
    {
      day: 3,
      title: "The Kanc & Chelsea",
      location: "Portland ➜ North Conway ➜ Chelsea",
      driveTime: "4 hrs with scenic stops",
      details:
        "Take Route 302 to North Conway, cross the Kancamagus by 9am, picnic at Lower Falls, then roll into rural Chelsea before dusk.",
      stops: [
        { name: "Albany Covered Bridge", highlight: "First leg-stretch + photo op." },
        { name: "Sabbaday Falls", highlight: "¾ mile loop to multi-tier waterfall." },
        { name: "Hancock Overlook", highlight: "Hairpin view of Osceola Range foliage." },
      ],
      note: "Sally’s property = on-site hiking + stargazing. Grab groceries in Lebanon/Barre before arrival.",
    },
    {
      day: 4,
      title: "Green Mountain Corridor",
      location: "Chelsea ➜ Burlington ➜ Montreal",
      driveTime: "2.5 hrs to border + 1 hr flat drive to MTL",
      details:
        "Montpelier for maple creemees, Waterbury for Ben & Jerry’s + cider donuts, Burlington for Church Street + Lake Champlain sunset, then cross at Highgate Springs.",
      stops: [
        { name: "Cold Hollow Cider", highlight: "Grab donuts + cider for the border queue." },
        { name: "Church Street", highlight: "Pedestrian mall + buskers." },
      ],
      note: "Check passports + Canadian insurance cards before the border line.",
      stay: "Old Montreal boutique stay (walk to Notre-Dame Basilica).",
    },
    {
      day: 5,
      title: "Plateau & Old Port Mashup",
      location: "Montreal, QC",
      details:
        "Split the day between Plateau/Mile End (murals, bagels, BYOB bistros) and Old Montreal (cobblestones, Aura light show).",
      activities: [
        "Bagel duel: St-Viateur vs. Fairmount",
        "Schwartz’s smoked meat lunch",
        "Hike Mount Royal (Kondiaronk overlook)",
        "Aura light + sound at Notre-Dame Basilica",
      ],
      dining: "Book Le Serpent or Monarque; avoid Place Jacques-Cartier tourist traps.",
      stay: "Old Montreal.",
    },
    {
      day: 6,
      title: "Adirondack Descent",
      location: "Montreal ➜ Lake Placid ➜ Saratoga",
      driveTime: "4 hrs (plus summit detour)",
      details:
        "Cross into NY via I-87, cut to Lake Placid, drive the Whiteface Mountain toll road if weather allows, then land in relaxed Saratoga Springs.",
      stops: [
        { name: "Whiteface Hwy", highlight: "Drive almost to the summit (closes mid-Oct)." },
        { name: "Yaddo Gardens", highlight: "Gilded-age roses + fountains." },
      ],
      stay: "Downtown Saratoga hotel/spa.",
      note: "Adirondack foliage usually peaks now—expect fiery reds along I-87.",
    },
    {
      day: 7,
      title: "Departure or Detour",
      location: "Saratoga ➜ Albany (or Stockbridge/Boston)",
      driveTime: "30 mins to ALB • 2 hrs to Stockbridge • 3 hrs to BOS",
      details:
        "Decide: fly out of Albany, continue into the Berkshires for Ice Glen/Laura’s Tower, or drop south to the Finger Lakes.",
      note: "Check one-way rental drop fee vs. looping back to Boston on I-90.",
    },
  ],

  alternatives: [
    {
      title: "Berkshires Loop",
      route: "Montreal ➜ Saratoga ➜ Stockbridge ➜ Boston",
      pros:
        "Norman Rockwell Museum, cultivated hikes (Ice Glen, Laura’s Tower), easier flight options out of BOS.",
      cons: "Adds 3+ driving hours and re-enters Boston traffic.",
    },
    {
      title: "Finger Lakes Extension",
      route: "Saratoga ➜ Ithaca/Watkins Glen ➜ Albany",
      pros: "Waterfalls, wineries, lake towns for a gentler finale.",
      cons: "Foliage peaks later than the mountains; flights still out of ALB.",
    },
    {
      title: "Alternate Regions",
      content:
        "Carolinas/Blue Ridge or Southern Illinois/Kentucky peak mid-late October—great backup trips but not aligned with this late-September leaf chase.",
    },
  ],

  keyInsights: [
    {
      title: "Traffic + Timing",
      detail:
        "US-1 coastal towns + Kancamagus clog late morning. Launch drives by 8am, aim to arrive at major stops before lunch.",
      actions: [
        "Target Ogunquit boardwalk before 10am.",
        "Hit Sabbaday Falls trailhead before the tour buses (9:30am).",
      ],
    },
    {
      title: "Packing & Gear",
      detail:
        "Layering is king: tees + flannels + insulated mid-layer + rain shell. Include hiking microspikes if exploring Ice Glen/Laura’s Tower.",
      actions: [
        "Pack BYOB picnic kit (tablecloth, corkscrew) for Chauncey Creek + Quebec BYOB bistros.",
        "Bring passport copies + rental agreement printout for the border.",
      ],
    },
    {
      title: "Culinary Pillars",
      detail:
        "Progression goes rustic lobster shacks ➜ craft seafood in Portland ➜ farm-to-table VT ➜ iconic Montreal comfort foods.",
      actions: [
        "Order 'medium-fat' at Schwartz’s for authentic smoked meat texture.",
        "Split La Banquise poutine late-night; it's huge.",
      ],
    },
  ],

  fieldNotes: {
    lobsterShacks: [
      {
        name: "Chauncey Creek Lobster Pier",
        location: "Kittery Point, ME",
        intel: "BYOB-friendly pier. Stop at a Kittery wine shop en route for the full experience.",
      },
      {
        name: "The Clam Shack",
        location: "Kennebunkport, ME",
        intel: "Burger bun lobster roll, fresh-picked meat, cash + patience required.",
      },
      {
        name: "McLoons Lobster Shack",
        location: "South Thomaston, ME",
        intel:
          "1.5 hrs north of Portland but postcard-perfect; visit if an extra coastal day appears.",
      },
    ],
    harborTowns: [
      {
        name: "Ogunquit, ME",
        highlight: "Marginal Way paved cliff walk + Perkins Cove artist enclave.",
      },
      {
        name: "Kennebunkport, ME",
        highlight: "Preppy boutiques, Bush family lookout at Walker’s Point.",
      },
      {
        name: "Portsmouth, NH",
        highlight: "Great coffee + quick detour if Route 1 traffic snarls.",
      },
    ],
    borderChecklist: [
      "Passports (valid through Spring 2026).",
      "Rental insurer’s Canada Non-Resident Card or written approval.",
      "No DUI/OVI history (Canada enforces strict inadmissibility).",
      "Bagged Maple products + produce declared at customs.",
    ],
    packingList: [
      "3-in-1 jacket system",
      "Smart casual dinner outfits",
      "Hiking microspikes + trekking poles",
      "Portable picnic kit for lobster shacks",
      "Portable battery + international plug (for Montreal hotel).",
    ],
  },

  // Packing checklist with categories
  packingChecklist: {
    clothing: [
      { item: "3-in-1 waterproof jacket", essential: true },
      { item: "Insulating fleece/down mid-layer", essential: true },
      { item: "Hiking pants (2 pairs)", essential: true },
      { item: "Smart casual dinner outfits (2-3)", essential: true },
      { item: "Comfortable walking shoes", essential: true },
      { item: "Hiking boots", essential: true },
      { item: "Warm beanie/hat", essential: false },
      { item: "Scarf", essential: false },
      { item: "Gloves (light)", essential: false },
      { item: "Rain pants", essential: false },
      { item: "Swimsuit (hotel pools)", essential: false },
    ],
    documents: [
      { item: "Passport (valid through Spring 2026!)", essential: true },
      { item: "Passport copy (separate from original)", essential: true },
      { item: "Driver's license", essential: true },
      { item: "Rental car agreement (Canada-authorized)", essential: true },
      { item: "Travel insurance documents", essential: true },
      { item: "Hotel confirmations (printed)", essential: false },
      { item: "Emergency contact card", essential: true },
    ],
    gear: [
      { item: "Hiking microspikes", essential: false },
      { item: "Trekking poles", essential: false },
      { item: "Binoculars (leaf peeping!)", essential: false },
      { item: "Camera + charger", essential: true },
      { item: "Portable phone charger", essential: true },
      { item: "International plug adapter", essential: false },
      { item: "Reusable water bottles", essential: true },
      { item: "Daypack/backpack", essential: true },
    ],
    picnic: [
      { item: "Corkscrew", essential: true },
      { item: "Tablecloth (for Chauncey Creek BYOB!)", essential: true },
      { item: "Reusable utensils", essential: false },
      { item: "Wine glasses (plastic OK)", essential: false },
      { item: "Cooler bag", essential: true },
      { item: "Wet wipes (lobster is messy!)", essential: true },
    ],
  },

  // Restaurant reservations tracker
  reservations: [
    { 
      day: 1, 
      restaurant: "Neptune Oyster", 
      location: "Boston", 
      cuisine: "Seafood", 
      mustTry: "Hot buttered lobster roll",
      reservationNeeded: true,
      booked: false,
      website: "https://www.neptuneoyster.com"
    },
    { 
      day: 2, 
      restaurant: "Chauncey Creek Lobster Pier", 
      location: "Kittery Point, ME", 
      cuisine: "Lobster Shack", 
      mustTry: "Whole boiled lobster + BYOB wine",
      reservationNeeded: false,
      booked: false,
      website: null
    },
    { 
      day: 2, 
      restaurant: "Eventide Oyster Co.", 
      location: "Portland, ME", 
      cuisine: "Modern Seafood", 
      mustTry: "Brown-butter lobster roll",
      reservationNeeded: true,
      booked: false,
      website: "https://www.eventideoysterco.com"
    },
    { 
      day: 5, 
      restaurant: "Schwartz's Deli", 
      location: "Montreal", 
      cuisine: "Smoked Meat", 
      mustTry: "Medium-fat smoked meat sandwich",
      reservationNeeded: false,
      booked: false,
      website: null
    },
    { 
      day: 5, 
      restaurant: "Le Serpent", 
      location: "Montreal", 
      cuisine: "Italian", 
      mustTry: "Industrial chic vibes + pasta",
      reservationNeeded: true,
      booked: false,
      website: "https://www.leserpent.ca"
    },
    { 
      day: 5, 
      restaurant: "La Banquise", 
      location: "Montreal", 
      cuisine: "Poutine", 
      mustTry: "Classic poutine (late night!)",
      reservationNeeded: false,
      booked: false,
      website: null
    },
  ],

  // Fun facts for each location
  funFacts: [
    { location: "Boston", fact: "The Freedom Trail is marked by a red brick line— you literally can't get lost!" },
    { location: "Ogunquit", fact: "The name means 'Beautiful Place by the Sea' in Abenaki language" },
    { location: "Portland", fact: "Has more restaurants per capita than San Francisco!" },
    { location: "Kancamagus", fact: "There are ZERO gas stations on the 34-mile scenic highway" },
    { location: "Vermont", fact: "It's illegal to outlaw clotheslines here— hanging laundry is a protected right!" },
    { location: "Montreal", fact: "It's the second-largest French-speaking city in the world after Paris" },
    { location: "Lake Placid", fact: "Hosted the Winter Olympics twice: 1932 and the 'Miracle on Ice' in 1980" },
  ],

  // Daily driving distances
  drivingStats: {
    totalMiles: 780,
    totalDriveTime: "14-16 hours",
    longestDay: "Day 3 (Portland → Chelsea): ~4 hours",
    scenicMiles: 420,
    interstateMiles: 360,
  },

  // ========================================
  // 🏨 LODGING OPTIONS - Where to Sleep
  // ========================================
  lodging: [
    {
      id: "lodge-boston-1",
      night: 1,
      region: "Boston",
      name: "The Godfrey Hotel Boston",
      type: "Boutique Hotel",
      neighborhood: "Downtown/Theatre District",
      coordinates: [42.3554, -71.0640],
      price: "$$$",
      priceRange: "$250-350/night",
      amenities: ["Rooftop Bar", "Free WiFi", "Fitness Center", "Restaurant"],
      walkability: "10/10 - Walk to everything",
      whyStay: "Modern boutique steps from Boston Common. Skip hotel parking—you don't need a car in Boston!",
      bookingTip: "Book direct for free breakfast upgrade",
      proTip: "Rooftop bar has great sunset views"
    },
    {
      id: "lodge-boston-2",
      night: 1,
      region: "Boston",
      name: "Revolution Hotel",
      type: "Boutique Budget",
      neighborhood: "South End",
      coordinates: [42.3467, -71.0768],
      price: "$$",
      priceRange: "$150-220/night",
      amenities: ["Trendy Lobby", "Free WiFi", "Shared Kitchens", "Cool Vibe"],
      walkability: "9/10 - Great South End location",
      whyStay: "Hip, affordable, in the coolest foodie neighborhood. Perfect for one night before hitting the road.",
      bookingTip: "Rooms are compact—pack light!",
      proTip: "Walk to Myers + Chang or Toro for dinner"
    },
    {
      id: "lodge-portland-1",
      night: 2,
      region: "Portland, ME",
      name: "The Press Hotel",
      type: "Boutique Hotel",
      neighborhood: "Old Port",
      coordinates: [43.6591, -70.2568],
      price: "$$$",
      priceRange: "$280-400/night",
      amenities: ["On-site Restaurant", "Lobby Bar", "Free WiFi", "Bikes Available"],
      walkability: "10/10 - Heart of Old Port",
      whyStay: "Converted from Portland's newspaper HQ. Quirky literary vibes. Walk to EVERYTHING—Eventide, Duckfat, all of it.",
      bookingTip: "Ask for a room with harbor glimpses",
      proTip: "Their Union restaurant is excellent for breakfast"
    },
    {
      id: "lodge-portland-2",
      night: 2,
      region: "Portland, ME",
      name: "Portland Harbor Hotel",
      type: "Upscale Hotel",
      neighborhood: "Old Port Waterfront",
      coordinates: [43.6561, -70.2501],
      price: "$$$",
      priceRange: "$300-450/night",
      amenities: ["Harbor Views", "Restaurant", "Valet Parking", "Concierge"],
      walkability: "10/10 - Right on the waterfront",
      whyStay: "Directly on the water with harbor-view rooms. More traditional luxury feel.",
      bookingTip: "Harbor-view rooms are worth the upgrade",
      proTip: "They'll store your lobster haul in their cooler!"
    },
    {
      id: "lodge-portland-airbnb",
      night: 2,
      region: "Portland, ME",
      name: "Airbnb - West End Victorian",
      type: "Vacation Rental",
      neighborhood: "West End",
      coordinates: [43.6580, -70.2650],
      price: "$$",
      priceRange: "$180-280/night",
      amenities: ["Full Kitchen", "Parking", "Washer/Dryer", "Local Feel"],
      walkability: "8/10 - 10-min walk to Old Port",
      whyStay: "Beautiful Victorian neighborhood, parking included, feels like a local. Great if you want more space.",
      bookingTip: "Book early—good ones go fast",
      proTip: "West End has great coffee shops too"
    },
    {
      id: "lodge-chelsea",
      night: 3,
      region: "Chelsea, VT",
      name: "Sally's Vermont Property",
      type: "Private Home",
      neighborhood: "Rural Chelsea",
      coordinates: [43.9887, -72.4476],
      price: "$",
      priceRange: "Friend rate!",
      amenities: ["Mountain Views", "Hiking Access", "Stargazing", "Full Kitchen", "Peace & Quiet"],
      walkability: "N/A - Rural paradise",
      whyStay: "The REAL Vermont experience. Wake up to mountain views, hike right from the property, see a million stars at night.",
      bookingTip: "Confirm with Sally!",
      proTip: "Grab groceries in Barre or Lebanon before arriving—closest store is 20 min away"
    },
    {
      id: "lodge-burlington",
      night: 3,
      region: "Burlington, VT",
      name: "Hotel Vermont",
      type: "Boutique Hotel",
      neighborhood: "Downtown Burlington",
      coordinates: [44.4759, -73.2121],
      price: "$$$",
      priceRange: "$320-450/night",
      amenities: ["Lake Views", "Farm-to-Table Restaurant", "Bikes", "Local Products"],
      walkability: "10/10 - Steps from Church Street",
      whyStay: "If skipping Chelsea, this is THE place to stay in Burlington. Lake Champlain views, incredible restaurant, very Vermont.",
      bookingTip: "Lake-view rooms sell out fast",
      proTip: "Their Juniper restaurant is one of the best in VT"
    },
    {
      id: "lodge-montreal-1",
      night: 4,
      region: "Montreal",
      name: "Le Petit Hotel",
      type: "Boutique Hotel",
      neighborhood: "Old Montreal",
      coordinates: [45.5048, -73.5538],
      price: "$$$",
      priceRange: "$280-380/night CAD",
      amenities: ["Breakfast Included", "Rooftop Terrace", "Wine & Cheese Hour", "Bikes"],
      walkability: "10/10 - Old Montreal cobblestones",
      whyStay: "Intimate boutique steps from Notre-Dame Basilica. Complimentary wine hour + breakfast. Feels special.",
      bookingTip: "Book the rooftop suite if available",
      proTip: "Walk to Olive et Gourmando for the best sandwiches"
    },
    {
      id: "lodge-montreal-2",
      night: 4,
      region: "Montreal",
      name: "Hotel Nelligan",
      type: "Boutique Hotel",
      neighborhood: "Old Montreal",
      coordinates: [45.5055, -73.5545],
      price: "$$$",
      priceRange: "$300-450/night CAD",
      amenities: ["Rooftop Terrace", "Restaurant/Bar", "Exposed Brick", "Romantic Vibe"],
      walkability: "10/10 - Heart of Old Montreal",
      whyStay: "Romantic exposed-brick boutique. Their rooftop terrace has Notre-Dame views. Perfect for a special night.",
      bookingTip: "Request a room with the original stone walls",
      proTip: "Rooftop at sunset is magical"
    },
    {
      id: "lodge-montreal-plateau",
      night: 4,
      region: "Montreal",
      name: "Airbnb - Plateau Mile End",
      type: "Vacation Rental",
      neighborhood: "Plateau/Mile End",
      coordinates: [45.5200, -73.5900],
      price: "$$",
      priceRange: "$150-250/night CAD",
      amenities: ["Full Kitchen", "Local Neighborhood", "Near Bagels", "Authentic Experience"],
      walkability: "9/10 - Walkable to everything hip",
      whyStay: "Stay in the coolest neighborhood. Walk to St-Viateur bagels in the morning. BYOB dinner at local bistros. Very local feel.",
      bookingTip: "Look for 'Mile End' or 'Plateau' locations",
      proTip: "You're near Fairmount AND St-Viateur bagel shops!"
    },
    {
      id: "lodge-montreal-night2",
      night: 5,
      region: "Montreal",
      name: "Same as Night 4 or Switch!",
      type: "Flexible",
      neighborhood: "Old Montreal or Plateau",
      coordinates: [45.5048, -73.5538],
      price: "$$-$$$",
      priceRange: "Varies",
      amenities: ["See above options"],
      walkability: "10/10",
      whyStay: "Stay 2 nights in the same spot OR switch from Old Montreal to Plateau for a different vibe each night.",
      bookingTip: "Two nights same hotel = less packing/unpacking",
      proTip: "If switching, do Plateau night 1 (bagels) → Old Montreal night 2 (Aura show)"
    },
    {
      id: "lodge-saratoga-1",
      night: 6,
      region: "Saratoga Springs, NY",
      name: "The Adelphi Hotel",
      type: "Historic Boutique",
      neighborhood: "Downtown Broadway",
      coordinates: [43.0831, -73.7846],
      price: "$$$",
      priceRange: "$350-500/night",
      amenities: ["Pool", "Spa", "Restaurant", "Historic Charm", "Bar"],
      walkability: "10/10 - On Broadway",
      whyStay: "Stunning restored Victorian hotel. THE place to stay in Saratoga. Feels like stepping into the gilded age.",
      bookingTip: "Book way ahead—very popular",
      proTip: "Their bar is gorgeous for a nightcap"
    },
    {
      id: "lodge-saratoga-2",
      night: 6,
      region: "Saratoga Springs, NY",
      name: "Saratoga Arms",
      type: "Boutique B&B",
      neighborhood: "Downtown Broadway",
      coordinates: [43.0810, -73.7855],
      price: "$$$",
      priceRange: "$280-400/night",
      amenities: ["Full Breakfast", "Afternoon Tea", "Fireplaces", "Personal Service"],
      walkability: "10/10 - Steps from Broadway",
      whyStay: "Intimate B&B with incredible breakfast. More personal than a hotel. Fireplaces in some rooms.",
      bookingTip: "Breakfast is AMAZING—don't skip it",
      proTip: "Ask about spa packages at nearby Roosevelt Baths"
    },
    {
      id: "lodge-lake-placid",
      night: 6,
      region: "Lake Placid, NY",
      name: "Mirror Lake Inn",
      type: "Lakefront Resort",
      neighborhood: "Main Street Lakefront",
      coordinates: [44.2795, -73.9799],
      price: "$$$",
      priceRange: "$400-600/night",
      amenities: ["Lake Views", "Spa", "Restaurant", "Private Beach", "Pool"],
      walkability: "9/10 - Walk to village",
      whyStay: "If you do the Lake Placid route instead, this is THE spot. Stunning lake views, full spa, very romantic.",
      bookingTip: "Lakefront rooms are worth it",
      proTip: "Get there early for Whiteface Mountain drive"
    }
  ],
};
