// ═══════════════════════════════════════════════════════════════════════════════
// MMT-2025 PLAN CONTENT - Girls Trip Mission Control
// Tere & Mikaela's New England Adventure
// ═══════════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════════
// TRIP META - Core trip information
// ═══════════════════════════════════════════════════════════════════════════════
export const tripMeta = {
  name: "Girls Trip to New England",
  fullName: "Tere & Mikaela's Epic New England Adventure",
  tagline: "Lobsters 🦞 • Leaves 🍁 • Love 💕",
  route: "Boston → Portland → Vermont → Montreal → Adirondacks → Albany",
  startDate: "2025-09-20",
  endDate: "2025-09-27",
  totalDays: 8,
  drivingDays: 5,
  region: "New England & Southern Quebec",
  highlights: [
    "Begin in Boston—history walks and LOBSTA!",
    "Little harbor towns along the Maine coast",
    "Sally's Vermont property for hiking",
    "Montreal culture and cuisine",
    "Adirondack fall foliage at peak",
    "Flexibility to pivot mid-trip"
  ],
  nonNegotiables: [
    "Little harbor towns",
    "Lobster/seafood pilgrimages",
    "Leaf-peeping hikes",
    "Freedom to change plans on the fly"
  ]
};

// ═══════════════════════════════════════════════════════════════════════════════
// THE TEAM - Tere (Mom) & Mikaela (Wife)
// ═══════════════════════════════════════════════════════════════════════════════
export const mmtTeam = [
  {
    id: 'tere',
    name: 'Tere',
    role: 'Chief Adventure Officer',
    emoji: '👩‍🦰',
    color: '#D35400',
    bio: 'The mastermind behind this trip! Mapped out the original route with all the must-see spots.',
    planStyle: 'Original Route Architect',
    preferences: ['Historic sites', 'Scenic drives', 'Local culture', 'Quality time'],
    priorities: ['Cozy towns', 'History walks', 'Lobster rolls'],
    tripFocus: 'Hit every harbor town and savor lobster along the coast.'
  },
  {
    id: 'mikaela',
    name: 'Mikaela',
    role: 'Director of Vibes & Navigation',
    emoji: '👩',
    color: '#1ABC9C',
    bio: 'Bringing the spontaneity and finding the hidden gems along the way.',
    planStyle: 'Adventure Curator',
    preferences: ['Foodie spots', 'Photo opportunities', 'Cozy accommodations', 'Flexible schedules'],
    priorities: ['Top food stops', 'Photo-worthy views', 'Cozy stays'],
    tripFocus: 'Find the best bites, cutest photo ops, and keep things flexible.'
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// DATA SOURCES / CITATIONS (lightweight, for transparency and future expansion)
// ═══════════════════════════════════════════════════════════════════════════════
export const dataSources = [
  { id: 'atlas-obscura', name: 'Atlas Obscura', url: 'https://www.atlasobscura.com' },
  { id: 'maine-tourism', name: 'Visit Maine', url: 'https://visitmaine.com' },
  { id: 'vermont-tourism', name: 'Vermont Dept. of Tourism', url: 'https://www.vermontvacation.com' },
  { id: 'quebec-original', name: 'Quebec Original', url: 'https://www.quebecoriginal.com' },
  { id: 'adirondacks', name: 'Visit Adirondacks', url: 'https://visitadirondacks.com' },
  { id: 'google-maps', name: 'Google Maps', url: 'https://maps.google.com' }
];

// ═══════════════════════════════════════════════════════════════════════════════
// SCHEDULE OPTIONS - Different ways to do this trip
// Based on Mom's original notes in MMTrip.txt
// ═══════════════════════════════════════════════════════════════════════════════
export const scheduleOptions = [
  {
    id: 'moms-original',
    title: "Mom's Original Route",
    emoji: '🗺️',
    duration: '8 days',
    vibe: 'The full experience—coast, mountains, city, and countryside',
    highlights: [
      'Boston (1-2 nights) → Portland (1 night)',
      'Chelsea/Sally\'s (1-2 nights) via Concord',
      'Montreal via Burlington (2 nights)',
      'Saratoga via Lake Placid (1 night)',
      'Fly out of Albany'
    ],
    totalMiles: '~780 miles',
    pros: [
      'Hits all the highlights from the original wish list',
      'Mix of coast, mountains, and city',
      'International flair with Montreal',
      'Ends with Adirondack foliage'
    ],
    cons: [
      'May be ambitious for 8 days',
      'Border crossing adds complexity',
      'Lots of driving on some days'
    ],
    bestFor: 'The full New England experience with flexibility built in'
  },
  {
    id: 'coastal-focus',
    title: 'Coastal Focus Route',
    emoji: '🦞',
    duration: '8 days',
    vibe: 'More time on the Maine coast, skip Montreal',
    highlights: [
      'Boston (1-2 nights)',
      'Extended Maine coast (3 nights) - Portland, Camden, etc.',
      'Vermont/Sally\'s (2 nights)',
      'Saratoga → Albany or loop back to Boston'
    ],
    totalMiles: '~500 miles',
    pros: [
      'More lobster shacks and harbor towns',
      'Less driving per day',
      'No border crossing hassle',
      'Deeper dive into Maine'
    ],
    cons: [
      'Misses Montreal and the international experience',
      'Less mountain foliage (coast is later)',
      'Fewer dramatic elevation changes'
    ],
    bestFor: 'Lobster lovers who want to slow down'
  },
  {
    id: 'foliage-chase',
    title: 'Foliage Chaser Route',
    emoji: '🍁',
    duration: '8 days',
    vibe: 'Optimized for peak fall colors',
    highlights: [
      'Boston (1 night) - quick',
      'White Mountains/Kancamagus (2 nights)',
      'Vermont (2 nights)',
      'Adirondacks/Lake Placid (2 nights)',
      'Fly out of Albany'
    ],
    totalMiles: '~600 miles',
    pros: [
      'Maximum foliage exposure at higher elevations',
      'White Mountains at peak in late Sept',
      'Adirondacks blazing with color',
      'Best hiking opportunities'
    ],
    cons: [
      'Less coastal/lobster time',
      'Skips Montreal',
      'More rugged, less luxury'
    ],
    bestFor: 'Leaf-peepers and hikers'
  },
  {
    id: 'custom',
    title: 'Build Your Own',
    emoji: '✨',
    duration: 'Flexible',
    vibe: 'Mix and match to create your perfect trip',
    highlights: [
      'Start with any template above',
      'Add/remove stops as you like',
      'Adjust nights per location',
      'Complete flexibility'
    ],
    totalMiles: 'Varies',
    pros: [
      'Totally personalized',
      'Can combine the best of each route',
      'Adapt to weather/mood on the fly'
    ],
    cons: [
      'Requires more planning',
      'May need to wing some bookings'
    ],
    bestFor: 'Those who want complete control'
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// DAY-BY-DAY ITINERARY - Mom's Original Plan (from MMTrip.txt)
// This serves as the "template" that can be customized
// ═══════════════════════════════════════════════════════════════════════════════
export const momOriginalItinerary = [
  {
    day: 0,
    label: 'Arrival Day',
    from: 'Home',
    to: 'Boston, MA',
    type: 'travel',
    driveTime: 'Flight',
    description: 'Arrive in Boston. Get settled and start exploring!',
    activities: [
      'Arrive at Logan Airport (BOS)',
      'Drop bags at hotel',
      'Walk the Freedom Trail',
      'First lobster roll at Neptune Oyster!'
    ],
    diningOptions: ['Neptune Oyster', 'Union Oyster House', 'Legal Sea Foods'],
    lodgingArea: 'Back Bay or Seaport',
    notes: 'Skip the rental car in Boston—parking is $50+/night. Use MBTA.',
    mapCoords: [42.3601, -71.0589],
    foliageStatus: 'early',
    momNote: 'Use the arrival day and perhaps next day for touring the city and eating some LOBSTA!'
  },
  {
    day: 1,
    label: 'Boston Exploration',
    from: 'Boston',
    to: 'Boston',
    type: 'explore',
    driveTime: 'Walking day',
    description: 'Full day in Boston exploring history and cuisine.',
    activities: [
      'Freedom Trail walk (2.5 miles of history)',
      'Faneuil Hall & Quincy Market',
      'Boston Common & Public Garden',
      'North End for Italian food',
      'Optional: Harbor cruise'
    ],
    diningOptions: ['Modern Pastry', 'Mike\'s Pastry', 'Giacomo\'s'],
    lodgingArea: 'Same hotel',
    notes: 'The city is FULL of history. Take your time!',
    mapCoords: [42.3601, -71.0589],
    foliageStatus: 'early',
    momNote: 'The city is FULL of history, of course.'
  },
  {
    day: 2,
    label: 'Coastal Drive to Portland',
    from: 'Boston, MA',
    to: 'Portland, ME',
    type: 'drive',
    driveTime: '2 hours direct (3.5 with stops)',
    description: 'Pick up rental car and cruise up the coast to Portland.',
    activities: [
      'Pick up rental car',
      'Drive Route 1 for coastal views',
      'Stop in Ogunquit - Marginal Way cliff walk',
      'Kennebunkport - harbor town charm',
      'Chauncey Creek Lobster Pier (BYOB!)',
      'Arrive Portland, explore Old Port'
    ],
    diningOptions: ['Eventide Oyster Co.', 'Duckfat', 'The Clam Shack'],
    lodgingArea: 'Portland Old Port',
    notes: 'The little harbor towns along Route 1 are exactly what you\'re looking for!',
    mapCoords: [43.6591, -70.2568],
    foliageStatus: 'early',
    momNote: 'Drive up the coast to Portland, ME 2 hrs drive—stay 1 night'
  },
  {
    day: 3,
    label: 'Mountains & Sally\'s',
    from: 'Portland, ME',
    to: 'Chelsea, VT',
    type: 'drive',
    driveTime: '3.5 hours total',
    description: 'Drive through the White Mountains to Sally\'s Vermont property.',
    activities: [
      'Morning in Portland - Head Light, coffee',
      'Drive via Kancamagus Highway (peak foliage!)',
      'Stops: Sabbaday Falls, Hancock Overlook',
      'Through Concord, NH (optional stop)',
      'Arrive at Sally\'s property',
      'Evening hike on the property'
    ],
    diningOptions: ['Pack a picnic', 'Cold Hollow Cider Mill'],
    lodgingArea: 'Sally\'s property, Chelsea',
    notes: 'The Kancamagus will be near peak foliage! No gas stations on the 34-mile stretch.',
    mapCoords: [43.9887, -72.4476],
    foliageStatus: 'peak',
    momNote: 'Drive to Chelsea, VT (via Concord, NH) 3½ hrs total drive—stay 1-2 nights. We can do some serious walking/hiking just on Sally\'s property alone.'
  },
  {
    day: 4,
    label: 'Vermont Day',
    from: 'Chelsea, VT',
    to: 'Chelsea, VT',
    type: 'explore',
    driveTime: 'Hiking day',
    description: 'Full day at Sally\'s or exploring central Vermont.',
    activities: [
      'Morning hike on Sally\'s property',
      'Optional: Drive to Woodstock or Stowe',
      'Vermont cheese trail',
      'Maple syrup tasting',
      'Evening stargazing (dark skies!)'
    ],
    diningOptions: ['Local Vermont fare', 'Farm-to-table'],
    lodgingArea: 'Sally\'s property',
    notes: 'Rural Vermont = dark skies and peace. Stock up on groceries before arriving.',
    mapCoords: [43.9887, -72.4476],
    foliageStatus: 'peak',
    momNote: 'Stay 1-2 nights at Sally\'s. Serious walking/hiking on the property.'
  },
  {
    day: 5,
    label: 'Vermont to Montreal',
    from: 'Chelsea, VT',
    to: 'Montreal, QC',
    type: 'drive',
    driveTime: '2.5 hours',
    description: 'Drive through Burlington to Montreal.',
    activities: [
      'Morning goodbye to Sally',
      'Stop in Burlington - Church Street, Lake Champlain',
      'Ben & Jerry\'s factory tour (Waterbury)',
      'Cross border at Highgate Springs',
      'Arrive Montreal, explore Old Montreal',
      'Notre-Dame Basilica (Aura light show!)'
    ],
    diningOptions: ['St-Viateur Bagels', 'Schwartz\'s Deli', 'La Banquise'],
    lodgingArea: 'Old Montreal',
    notes: 'Have passports ready! Check rental car Canada policy. BYOB restaurants in Plateau.',
    mapCoords: [45.5017, -73.5673],
    foliageStatus: 'approaching',
    momNote: 'Drive to Montreal (via Burlington VT) 2½ hrs drive—stay 2 nights. No specific plans for Burlington, just a nice stopping place.'
  },
  {
    day: 6,
    label: 'Montreal Day',
    from: 'Montreal',
    to: 'Montreal',
    type: 'explore',
    driveTime: 'Walking/Metro day',
    description: 'Full day exploring Montreal\'s neighborhoods.',
    activities: [
      'Morning bagel run - St-Viateur vs Fairmount',
      'Mile End murals and cafes',
      'Mount Royal hike (Kondiaronk Belvedere)',
      'Plateau BYOB dinner',
      'Evening: Old Montreal cobblestones'
    ],
    diningOptions: ['Olive et Gourmando', 'Le Serpent', 'Monarque'],
    lodgingArea: 'Same hotel or switch to Plateau',
    notes: 'Montreal food trinity: Bagels, Smoked Meat, Poutine. Don\'t miss any!',
    mapCoords: [45.5017, -73.5673],
    foliageStatus: 'approaching',
    momNote: 'Explore Montreal'
  },
  {
    day: 7,
    label: 'Adirondacks to Saratoga',
    from: 'Montreal, QC',
    to: 'Saratoga Springs, NY',
    type: 'drive',
    driveTime: '4 hours total',
    description: 'Cross back into US, drive through Adirondacks.',
    activities: [
      'Cross border back into US',
      'Lake Placid stop - Olympic village',
      'Whiteface Mountain drive (closes mid-Oct!)',
      'Peak Adirondack foliage',
      'Arrive Saratoga Springs',
      'Broadway stroll, spa options'
    ],
    diningOptions: ['Yaddo Gardens cafe', 'Hattie\'s', 'The Adelphi bar'],
    lodgingArea: 'Downtown Saratoga',
    notes: 'Adirondacks will be BLAZING with color. Whiteface Mountain drive is a must if weather allows.',
    mapCoords: [43.0831, -73.784],
    foliageStatus: 'peak',
    momNote: 'Drive to Saratoga Springs, NY (via Lake Placid) 4 hrs total drive—stay 1 night'
  },
  {
    day: 8,
    label: 'Departure',
    from: 'Saratoga Springs',
    to: 'Albany Airport',
    type: 'travel',
    driveTime: '30 mins to Albany',
    description: 'Depart from Albany or continue to Berkshires.',
    activities: [
      'Morning spa or breakfast in Saratoga',
      'Option A: Drive to Albany (ALB), fly home',
      'Option B: Continue to Stockbridge, MA for Ice Glen hike',
      'Option B+: Loop back to Boston if time allows'
    ],
    diningOptions: ['Last breakfast in Saratoga'],
    lodgingArea: 'N/A - departure',
    notes: 'Check one-way rental drop fees. Albany is easy, but Boston gives more flight options.',
    mapCoords: [42.6526, -73.7562],
    foliageStatus: 'approaching',
    momNote: 'We can stop and fly home from Albany OR continue to Stockbridge/Berkshires'
  }
];

// Map mom's original itinerary into UI-friendly day cards for Sidebar/Itinerary components
const getDayEmoji = (type) => {
  if (!type) return '📍'
  const t = type.toLowerCase()
  if (t.includes('drive') || t.includes('travel')) return '🚗'
  if (t.includes('explore')) return '🧭'
  return '📍'
}

export const dayItinerary = momOriginalItinerary.map((day, idx) => {
  const parsedDrive = typeof day.driveTime === 'number' ? day.driveTime : parseFloat(day.driveTime)

  return {
    dayNumber: idx + 1,
    date: `Day ${idx + 1}`,
    label: day.label,
    from: day.from,
    to: day.to,
    type: day.type,
    driveTime: Number.isFinite(parsedDrive) ? parsedDrive : null,
    driveNotes: typeof day.driveTime === 'string' ? day.driveTime : null,
    description: day.description,
    foliage: day.foliageStatus,
    activities: (day.activities || []).map((name, i) => ({ id: `${day.day}-${i}`, name })),
    dining: (day.diningOptions || []).map((name) => ({ name })),
    highlights: day.activities || [],
    momNote: day.momNote,
    emoji: getDayEmoji(day.type),
  }
})

// ═══════════════════════════════════════════════════════════════════════════════
// LOGISTICS & PLANNING - Key info for the trip
// ═══════════════════════════════════════════════════════════════════════════════
export const logisticsInfo = {
  flights: {
    arrival: 'Boston Logan (BOS)',
    departure: 'Albany (ALB) or Boston (BOS)',
    note: 'One-way flights may cost more but save 3+ hours driving'
  },
  rentalCar: {
    pickup: 'Boston - Day 2 morning',
    dropoff: 'Albany or Boston',
    oneWayFee: '$100-500 depending on company',
    canadaNote: 'MUST confirm rental allows Canada crossing!',
    tip: 'Delay pickup until leaving Boston - no car needed in city'
  },
  border: {
    crossing: 'Highgate Springs (VT/QC) or Derby Line',
    required: [
      'Valid passport (6+ months validity)',
      'Rental agreement with Canada permission',
      'No DUI history (Canada strict on this!)',
      'Declare any food items'
    ],
    tip: 'Cross mid-day for shorter waits'
  },
  driving: {
    totalMiles: '~780 miles',
    longestDay: 'Day 7 (Montreal → Saratoga): 4 hours',
    gasNote: 'Fill up in NH (no gas tax!) and before Kancamagus (no stations)',
    scenicRoutes: ['Route 1 (Maine coast)', 'Kancamagus Highway', 'Whiteface Mountain Hwy']
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// RISK PLAYBOOK - Things to watch for and contingencies
// ═══════════════════════════════════════════════════════════════════════════════
export const riskPlaybook = [
  {
    risk: 'Fall foliage traffic',
    likelihood: 'High',
    impact: 'Delays on scenic routes',
    mitigation: 'Start driving by 8am. Avoid Kancamagus 11am-3pm. Have audiobooks ready!',
    momNote: 'If we go in late September, we could face some serious traffic. It\'s all over the news that fall season is CRAZY for leaf-peeping.'
  },
  {
    risk: 'Border crossing delays',
    likelihood: 'Medium',
    impact: '30-60 min delay',
    mitigation: 'Have all documents ready. Cross mid-week if possible. Use ArriveCAN app.',
    backup: 'Can skip Montreal and stay domestic if border issues arise'
  },
  {
    risk: 'Weather changes',
    likelihood: 'Medium',
    impact: 'Hiking plans affected',
    mitigation: 'Pack layers and rain gear. Have indoor backup plans (museums, cafes).',
    backup: 'Portland has great indoor food scene; Montreal has shopping'
  },
  {
    risk: 'Accommodation availability',
    likelihood: 'High in peak season',
    impact: 'No room at inn',
    mitigation: 'Book Portland and Montreal ASAP. Have backup options listed.',
    backup: 'Airbnb usually has availability even when hotels full'
  },
  {
    risk: 'Sally unavailable',
    likelihood: 'Low',
    impact: 'Need Vermont lodging',
    mitigation: 'Confirm with Sally early. Have Hotel Vermont or Burlington Airbnb as backup.',
    backup: 'Burlington is charming alternative base for VT'
  },
  {
    risk: 'Car trouble',
    likelihood: 'Low',
    impact: 'Major disruption',
    mitigation: 'Rent from major company with roadside assistance. Save AAA number.',
    backup: 'Amtrak connects many of these cities if needed'
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// EMERGENCY CONTACTS
// ═══════════════════════════════════════════════════════════════════════════════
export const emergencyContacts = [
  { name: 'Sally (Chelsea, VT)', phone: '(TBD)', note: 'Vermont host' },
  { name: 'US Embassy Montreal', phone: '+1-514-398-9695', note: '24hr emergency line' },
  { name: 'AAA Roadside', phone: '1-800-222-4357', note: 'Rental car issues' },
  { name: 'Gunnar', phone: '(TBD)', note: 'Trip architect & tech support' }
];

// ═══════════════════════════════════════════════════════════════════════════════
// BUDGET ESTIMATES
// ═══════════════════════════════════════════════════════════════════════════════
export const budgetEstimate = {
  flights: { min: 400, max: 600, note: 'BOS in, ALB out per person' },
  hotels: { min: 1200, max: 2000, note: '6 nights, mix of boutique & B&B' },
  rentalCar: { min: 350, max: 500, note: '7 days + one-way drop fee' },
  food: { min: 600, max: 1000, note: 'Lobster splurges included 🦞' },
  activities: { min: 150, max: 300, note: 'Tours, parking, tips' },
  gas: { min: 150, max: 200, note: '~800 miles total' },
  border: { min: 0, max: 50, note: 'Currency exchange buffer' }
};

// ═══════════════════════════════════════════════════════════════════════════════
// TRIP STATS
// ═══════════════════════════════════════════════════════════════════════════════
export const tripStats = {
  totalDays: 8,
  drivingDays: 5,
  exploreDays: 3,
  totalMiles: 780,
  scenicMiles: 420,
  countries: 2,
  states: 5, // MA, ME, NH, VT, NY
  lobsterSpots: 8,
  harborTowns: 6,
  hikingTrails: 5,
  lighthouses: 3
};

// ═══════════════════════════════════════════════════════════════════════════════
// EXPLORE CATALOG - Discovery dataset for search & inspiration
// Each item carries tags, coordinates, vibes, and source for transparency
// Types: lobster, town, hike, museum, cafe, scenic-drive, lodging, view
// ═══════════════════════════════════════════════════════════════════════════════
export const exploreCatalog = [
  {
    id: 'lobster-eventide',
    name: 'Eventide Oyster Co.',
    type: 'lobster',
    location: 'Portland, ME',
    coords: [43.6591, -70.2553],
    vibe: 'Modern take on lobster rolls',
    mustTry: 'Brown Butter Lobster Roll',
    tags: ['food', 'lobster', 'portland', 'must-try'],
    sourceId: 'maine-tourism'
  },
  {
    id: 'lobster-chauncey',
    name: 'Chauncey Creek Lobster Pier',
    type: 'lobster',
    location: 'Kittery Point, ME',
    coords: [43.0879, -70.6991],
    vibe: 'BYOB dockside picnic tables',
    mustTry: 'Whole lobster with drawn butter',
    tags: ['food', 'lobster', 'byob', 'waterfront'],
    sourceId: 'maine-tourism'
  },
  {
    id: 'town-camden',
    name: 'Camden Harbor',
    type: 'town',
    location: 'Camden, ME',
    coords: [44.2098, -69.0648],
    vibe: 'Classic harbor with schooners',
    mustDo: 'Mt. Battie overlook for harbor views',
    tags: ['harbor-town', 'views', 'maine-coast'],
    sourceId: 'maine-tourism'
  },
  {
    id: 'town-kennebunkport',
    name: 'Kennebunkport',
    type: 'town',
    location: 'ME',
    coords: [43.3613, -70.4769],
    vibe: 'Quintessential coastal village',
    mustDo: 'Dock Square stroll & Clam Shack',
    tags: ['harbor-town', 'shopping', 'food'],
    sourceId: 'maine-tourism'
  },
  {
    id: 'drive-kanc',
    name: 'Kancamagus Highway',
    type: 'scenic-drive',
    location: 'NH White Mountains',
    coords: [43.9783, -71.4704],
    vibe: '34-mile foliage corridor',
    mustDo: 'Sabbaday Falls, Hancock Overlook',
    tags: ['foliage', 'mountains', 'views'],
    sourceId: 'vermont-tourism'
  },
  {
    id: 'hike-mont-royal',
    name: 'Mount Royal Lookout',
    type: 'hike',
    location: 'Montreal, QC',
    coords: [45.5083, -73.587],
    vibe: 'City skyline + autumn canopy',
    mustDo: 'Kondiaronk Belvedere sunset',
    tags: ['city-hike', 'view', 'sunset'],
    sourceId: 'quebec-original'
  },
  {
    id: 'cafe-olive',
    name: 'Olive et Gourmando',
    type: 'cafe',
    location: 'Old Montreal',
    coords: [45.5026, -73.5564],
    vibe: 'Best pastries + coffee',
    mustTry: 'Grilled cheese panini',
    tags: ['coffee', 'bakery', 'montreal', 'brunch'],
    sourceId: 'quebec-original'
  },
  {
    id: 'museum-ica',
    name: 'Institute of Contemporary Art',
    type: 'museum',
    location: 'Boston Seaport',
    coords: [42.3514, -71.0436],
    vibe: 'Waterfront modern art',
    mustDo: 'Harbor walk after exhibits',
    tags: ['art', 'rainy-day', 'boston'],
    sourceId: 'google-maps'
  },
  {
    id: 'view-whiteface',
    name: 'Whiteface Mountain Veterans Memorial Highway',
    type: 'view',
    location: 'Wilmington, NY',
    coords: [44.3654, -73.8712],
    vibe: 'Drive-up summit, 360° foliage',
    mustDo: 'Summit stairs + castle',
    tags: ['adirondacks', 'foliage', 'view', 'drive-up'],
    sourceId: 'adirondacks'
  },
  {
    id: 'lodging-press',
    name: 'The Press Hotel',
    type: 'lodging',
    location: 'Portland, ME',
    coords: [43.6594, -70.2568],
    vibe: 'Boutique, walkable to Old Port',
    mustDo: 'Lobby art + easy walk to Eventide',
    tags: ['boutique', 'walkable', 'portland'],
    sourceId: 'maine-tourism'
  },
  {
    id: 'lodging-adelphi',
    name: 'The Adelphi Hotel',
    type: 'lodging',
    location: 'Saratoga Springs, NY',
    coords: [43.0831, -73.784],
    vibe: 'Historic, spa vibes, downtown',
    mustDo: 'Evening stroll on Broadway',
    tags: ['historic', 'spa', 'downtown'],
    sourceId: 'adirondacks'
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// NEXT STEPS CHECKLIST
// ═══════════════════════════════════════════════════════════════════════════════
export const nextStepsChecklist = [
  { task: 'Confirm dates with Sally', status: 'not-started', priority: 'high' },
  { task: 'Book flights (BOS in, ALB out)', status: 'not-started', priority: 'high' },
  { task: 'Book Portland hotel (sells out!)', status: 'not-started', priority: 'high' },
  { task: 'Book Montreal hotel (2 nights)', status: 'not-started', priority: 'high' },
  { task: 'Reserve rental car (Canada approved!)', status: 'not-started', priority: 'high' },
  { task: 'Check passport expiration', status: 'not-started', priority: 'high' },
  { task: 'Book Boston hotel (Night 1)', status: 'not-started', priority: 'medium' },
  { task: 'Book Saratoga hotel', status: 'not-started', priority: 'medium' },
  { task: 'Make Neptune Oyster reservation', status: 'not-started', priority: 'medium' },
  { task: 'Download offline maps', status: 'not-started', priority: 'low' },
  { task: 'Create shared photo album', status: 'not-started', priority: 'low' }
];
