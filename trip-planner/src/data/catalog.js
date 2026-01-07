// ═══════════════════════════════════════════════════════════════════════════════
// MMT-2025 ACTIVITY CATALOG
// The unified source of all experiences users can pick from
// ═══════════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════════
// CATEGORY DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════════
export const categories = {
  lobster: {
    id: 'lobster',
    name: 'Lobster Spots',
    icon: '🦞',
    color: '#e74c3c',
    description: 'The best lobster rolls and seafood shacks'
  },
  town: {
    id: 'town',
    name: 'Harbor Towns',
    icon: '⚓',
    color: '#1abc9c',
    description: 'Charming coastal villages to explore'
  },
  hike: {
    id: 'hike',
    name: 'Hikes & Nature',
    icon: '🥾',
    color: '#27ae60',
    description: 'Trails, waterfalls, and outdoor adventures'
  },
  drive: {
    id: 'drive',
    name: 'Scenic Drives',
    icon: '🚗',
    color: '#9b59b6',
    description: 'Beautiful routes through mountains and coast'
  },
  foliage: {
    id: 'foliage',
    name: 'Foliage Spots',
    icon: '🍁',
    color: '#e67e22',
    description: 'Best fall color viewing locations'
  },
  city: {
    id: 'city',
    name: 'Cities',
    icon: '🏙️',
    color: '#34495e',
    description: 'Major city destinations'
  },
  food: {
    id: 'food',
    name: 'Food & Dining',
    icon: '🍽️',
    color: '#f39c12',
    description: 'Restaurants, cafes, and food experiences'
  },
  landmark: {
    id: 'landmark',
    name: 'Landmarks',
    icon: '📸',
    color: '#3498db',
    description: 'Must-see attractions and photo spots'
  },
  lodging: {
    id: 'lodging',
    name: 'Lodging',
    icon: '🏨',
    color: '#8e44ad',
    description: 'Hotels, B&Bs, and places to stay'
  },
  custom: {
    id: 'custom',
    name: 'Custom',
    icon: '⭐',
    color: '#f1c40f',
    description: 'Places you add yourself'
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// REGIONS (for filtering)
// ═══════════════════════════════════════════════════════════════════════════════
export const regions = {
  boston: { id: 'boston', name: 'Boston Area', state: 'MA' },
  maine_coast: { id: 'maine_coast', name: 'Maine Coast', state: 'ME' },
  portland: { id: 'portland', name: 'Portland Area', state: 'ME' },
  white_mountains: { id: 'white_mountains', name: 'White Mountains', state: 'NH' },
  vermont: { id: 'vermont', name: 'Vermont', state: 'VT' },
  montreal: { id: 'montreal', name: 'Montreal', state: 'QC' },
  adirondacks: { id: 'adirondacks', name: 'Adirondacks', state: 'NY' },
  saratoga: { id: 'saratoga', name: 'Saratoga/Albany', state: 'NY' },
  berkshires: { id: 'berkshires', name: 'Berkshires', state: 'MA' },
};

// ═══════════════════════════════════════════════════════════════════════════════
// THE UNIFIED ACTIVITY CATALOG
// All pickable experiences for the trip
// ═══════════════════════════════════════════════════════════════════════════════
export const activityCatalog = [
  // ═══════════════════════════════════════════════════════════════════════════
  // 🦞 LOBSTER SPOTS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'lobster-eventide',
    category: 'lobster',
    name: 'Eventide Oyster Co.',
    region: 'portland',
    location: 'Portland, ME',
    coordinates: [43.6573, -70.2515],
    duration: 1.5, // hours
    price: '$$$',
    rating: 4.9,
    description: 'James Beard Award winner with the famous brown butter lobster roll on a steamed bao-style bun.',
    mustTry: 'Brown Butter Lobster Roll',
    tip: 'Go at 3pm between lunch and dinner rush. No reservations.',
    waitTime: '30-60 min',
    tags: ['james-beard', 'innovative', 'must-visit'],
    momMentioned: false,
    source: 'research'
  },
  {
    id: 'lobster-neptune',
    category: 'lobster',
    name: 'Neptune Oyster',
    region: 'boston',
    location: 'Boston, MA',
    coordinates: [42.3631, -71.0546],
    duration: 1.5,
    price: '$$$',
    rating: 4.8,
    description: 'The iconic Boston lobster roll. Overflowing with a quarter-pound of lobster meat.',
    mustTry: 'Hot Buttered Lobster Roll',
    tip: 'Arrive 20 min before opening (11:30am). Worth every minute of the wait.',
    waitTime: '45-90 min',
    tags: ['iconic', 'boston-legend', 'worth-the-wait'],
    momMentioned: true,
    source: 'mmtrip'
  },
  {
    id: 'lobster-clam-shack',
    category: 'lobster',
    name: 'The Clam Shack',
    region: 'maine_coast',
    location: 'Kennebunkport, ME',
    coordinates: [43.3615, -70.4768],
    duration: 1,
    price: '$$',
    rating: 4.7,
    description: 'Served on a unique toasted hamburger bun instead of hot dog bun.',
    mustTry: 'Lobster Roll + Fried Clams',
    tip: 'Cash only! Get clam strips too.',
    waitTime: '15-30 min',
    tags: ['cash-only', 'unique-style', 'harbor-views'],
    momMentioned: false,
    source: 'research'
  },
  {
    id: 'lobster-chauncey',
    category: 'lobster',
    name: 'Chauncey Creek Lobster Pier',
    region: 'maine_coast',
    location: 'Kittery Point, ME',
    coordinates: [43.0891, -70.6789],
    duration: 2,
    price: '$$',
    rating: 4.8,
    description: 'The quintessential Maine experience. BYOB—bring tablecloth, wine, and make it fancy on a picnic table over the water.',
    mustTry: '1.5 lb whole lobster + steamers',
    tip: 'Stop at a Kittery wine shop first. Bring candles and wine glasses!',
    waitTime: '10-20 min',
    tags: ['byob', 'waterfront', 'romantic'],
    momMentioned: false,
    source: 'research'
  },
  {
    id: 'lobster-bite-into',
    category: 'lobster',
    name: 'Bite Into Maine',
    region: 'portland',
    location: 'Cape Elizabeth, ME',
    coordinates: [43.6231, -70.2080],
    duration: 1,
    price: '$$',
    rating: 4.7,
    description: 'Food truck at Portland Head Light! Get lobster AND lighthouse photos.',
    mustTry: 'Flight of 3 mini rolls (try all styles!)',
    tip: 'They offer wasabi, curry, and chipotle versions too.',
    waitTime: '10-15 min',
    tags: ['food-truck', 'lighthouse-views', 'flight-available'],
    momMentioned: false,
    source: 'research'
  },
  {
    id: 'lobster-reds',
    category: 'lobster',
    name: "Red's Eats",
    region: 'maine_coast',
    location: 'Wiscasset, ME',
    coordinates: [44.0028, -69.6656],
    duration: 1.5,
    price: '$$$',
    rating: 4.6,
    description: 'The most photographed lobster roll in America. A full POUND of meat tumbling off the bun.',
    mustTry: 'The famous overflowing lobster roll',
    tip: 'Only worth it if driving by anyway. The line is legendary.',
    waitTime: '60-120 min',
    tags: ['famous', 'massive-portions', 'long-lines'],
    momMentioned: false,
    source: 'research'
  },
  {
    id: 'lobster-mcloons',
    category: 'lobster',
    name: 'McLoons Lobster Shack',
    region: 'maine_coast',
    location: 'South Thomaston, ME',
    coordinates: [44.0539, -69.1347],
    duration: 1.5,
    price: '$$',
    rating: 4.9,
    description: 'Working lobster wharf, no tourists. The Maine postcard dream.',
    mustTry: 'Lobster Roll + whoopie pie for dessert',
    tip: '1.5 hours north of Portland but the setting is UNREAL.',
    waitTime: '5-15 min',
    tags: ['hidden-gem', 'authentic', 'working-wharf'],
    momMentioned: false,
    source: 'research'
  },
  {
    id: 'lobster-highroller',
    category: 'lobster',
    name: 'Highroller Lobster Co.',
    region: 'portland',
    location: 'Portland, ME',
    coordinates: [43.6557, -70.2547],
    duration: 1,
    price: '$$',
    rating: 4.6,
    description: 'Young, hip, creative. Thai chili roll and Korean BBQ roll push boundaries.',
    mustTry: 'Lobster roll + Lobster Mac & Cheese',
    tip: 'They have a fantastic spicy "Picnic" roll with pickled jalapeños.',
    waitTime: '10-20 min',
    tags: ['creative-flavors', 'casual-vibe', 'affordable'],
    momMentioned: false,
    source: 'research'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ⚓ HARBOR TOWNS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'town-ogunquit',
    category: 'town',
    name: 'Perkins Cove, Ogunquit',
    region: 'maine_coast',
    location: 'Ogunquit, ME',
    coordinates: [43.2364, -70.5903],
    duration: 2.5,
    rating: 4.8,
    description: 'Artist colony charm. Bohemian-meets-preppy with 50+ galleries in tiny area.',
    highlights: [
      'Walk the Marginal Way (1.25 mi paved cliff walk)',
      'Watch the manual drawbridge open for boats',
      'Browse the art galleries',
      'Sunset drinks at Barnacle Billy\'s'
    ],
    tip: 'Arrive before 10am or park at Obed\'s Lot and walk/trolley',
    photoSpot: 'Marginal Way overlook at sunrise',
    tags: ['walkable', 'artists', 'cliff-walk'],
    momMentioned: true,
    source: 'mmtrip'
  },
  {
    id: 'town-kennebunkport',
    category: 'town',
    name: 'Kennebunkport',
    region: 'maine_coast',
    location: 'Kennebunkport, ME',
    coordinates: [43.3615, -70.4768],
    duration: 2,
    rating: 4.7,
    description: 'Preppy & Presidential. Old money New England charm.',
    highlights: [
      'Walk Dock Square (boutique shopping)',
      'Drive by Bush Estate at Walker\'s Point',
      'Explore Cape Porpoise (quieter, more local)',
      'Ice cream at Rococo'
    ],
    tip: 'Use the municipal lot off Maine St, $2/hr',
    photoSpot: 'Colony Hotel from across the river',
    tags: ['preppy', 'boutiques', 'presidential'],
    momMentioned: true,
    source: 'mmtrip'
  },
  {
    id: 'town-portland-old-port',
    category: 'town',
    name: 'Portland Old Port',
    region: 'portland',
    location: 'Portland, ME',
    coordinates: [43.6591, -70.2568],
    duration: 3,
    rating: 4.9,
    description: 'Brooklyn-by-the-sea. Tattooed chefs and fishermen sharing the sidewalk.',
    highlights: [
      'Get lost in the cobblestone streets',
      'Browse indie shops on Exchange St',
      'Taste wine at Vena\'s Fizz House',
      'Watch fishing boats at the wharf'
    ],
    tip: 'Street parking tricky; use Ocean Gateway garage',
    photoSpot: 'Congress Street mural walk',
    tags: ['foodie', 'cobblestone', 'hip'],
    momMentioned: true,
    source: 'mmtrip'
  },
  {
    id: 'town-portsmouth',
    category: 'town',
    name: 'Portsmouth',
    region: 'maine_coast',
    location: 'Portsmouth, NH',
    coordinates: [43.0718, -70.7626],
    duration: 2,
    rating: 4.6,
    description: 'The artsy younger sibling of Boston. Historic & Hip.',
    highlights: [
      'Walk Market Square',
      'Coffee at Breaking New Grounds',
      'Strawbery Banke Museum (if time allows)',
      'Cross to Kittery, ME for outlets'
    ],
    tip: 'Hanover St garage, easy parking',
    photoSpot: 'Prescott Park waterfront',
    tags: ['artsy', 'historic', 'coffee'],
    momMentioned: true,
    source: 'mmtrip'
  },
  {
    id: 'town-camden',
    category: 'town',
    name: 'Camden',
    region: 'maine_coast',
    location: 'Camden, ME',
    coordinates: [44.2098, -69.0648],
    duration: 3,
    rating: 4.8,
    description: 'Where mountains meet the sea. Genuinely magical.',
    highlights: [
      'Climb Mt. Battie (drive or hike for epic views)',
      'Stroll the harbor and watch schooners',
      'Browse the bookstores',
      'Catch the Camden Hills at peak foliage'
    ],
    tip: 'Metered on main streets, free lots nearby',
    photoSpot: 'Mt. Battie tower overlooking harbor + fall colors',
    tags: ['mountains', 'harbor', 'schooners'],
    momMentioned: false,
    source: 'research'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 🏙️ CITIES (Major Destinations)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'city-boston',
    category: 'city',
    name: 'Boston',
    region: 'boston',
    location: 'Boston, MA',
    coordinates: [42.3601, -71.0589],
    duration: 8, // full day or more
    rating: 4.8,
    description: 'Begin here! Full of history, and LOBSTA!',
    highlights: [
      'Walk the Freedom Trail (2.5 mi, 16 historic sites)',
      'Faneuil Hall & Quincy Market',
      'North End (Little Italy) - cannoli!',
      'Boston Common & Public Garden'
    ],
    tip: 'Skip hotel parking ($50/night). Use MBTA subway.',
    momQuote: 'Use the arrival day and perhaps next day for touring the city and eating some LOBSTA!',
    suggestedNights: '1-2',
    tags: ['history', 'starting-point', 'walkable'],
    momMentioned: true,
    source: 'mmtrip'
  },
  {
    id: 'city-portland-me',
    category: 'city',
    name: 'Portland, ME',
    region: 'portland',
    location: 'Portland, ME',
    coordinates: [43.6591, -70.2568],
    duration: 6,
    rating: 4.9,
    description: 'More restaurants per capita than San Francisco! Foodie paradise.',
    highlights: [
      'Portland Head Light (most photographed lighthouse)',
      'Old Port cobblestone streets',
      'Eventide or Highroller for lobster',
      'Duckfat for fries and poutine'
    ],
    tip: 'Stay 1 night. Old Port is walkable.',
    momQuote: 'Drive up the coast to Portland (2 hrs)—stay 1 night',
    suggestedNights: '1',
    tags: ['foodie', 'coastal', 'lighthouse'],
    momMentioned: true,
    source: 'mmtrip'
  },
  {
    id: 'city-montreal',
    category: 'city',
    name: 'Montreal',
    region: 'montreal',
    location: 'Montreal, QC, Canada',
    coordinates: [45.5017, -73.5673],
    duration: 12, // 2 days worth
    rating: 4.8,
    description: 'Second-largest French-speaking city after Paris. BYOB restaurants + incredible food.',
    highlights: [
      'Bagel duel: St-Viateur vs. Fairmount',
      'Schwartz\'s smoked meat sandwich',
      'Hike Mount Royal',
      'Notre-Dame Basilica + Aura light show',
      'La Banquise poutine (late night!)'
    ],
    tip: 'Expect 10°F temp drop vs. Boston. Pack a jacket!',
    momQuote: 'Explore Montreal',
    suggestedNights: '2',
    tags: ['international', 'foodie', 'culture', 'byob'],
    momMentioned: true,
    source: 'mmtrip'
  },
  {
    id: 'city-burlington',
    category: 'city',
    name: 'Burlington',
    region: 'vermont',
    location: 'Burlington, VT',
    coordinates: [44.4759, -73.2121],
    duration: 4,
    rating: 4.7,
    description: 'Waterfront views, Church Street pedestrian mall, and Lake Champlain sunsets.',
    highlights: [
      'Church Street (pedestrian mall + buskers)',
      'Lake Champlain waterfront walk',
      'Sunset over the Adirondacks',
      'Local craft beer scene'
    ],
    tip: 'Nice stopping place, some hiking options',
    momQuote: 'No specific plans for Burlington, just a nice stopping place',
    suggestedNights: '0-1',
    tags: ['lakefront', 'hip', 'sunset'],
    momMentioned: true,
    source: 'mmtrip'
  },
  {
    id: 'city-saratoga',
    category: 'city',
    name: 'Saratoga Springs',
    region: 'saratoga',
    location: 'Saratoga Springs, NY',
    coordinates: [43.0831, -73.784],
    duration: 4,
    rating: 4.6,
    description: 'Racing season is over, meaning quieter "dark days" ideal for spas, Broadway strolls, and gardens.',
    highlights: [
      'Broadway stroll and cafes',
      'Yaddo Gardens',
      'Roosevelt Baths & Spa',
      'Downtown charm'
    ],
    tip: 'Stay 1 night before flying out of Albany',
    momQuote: 'Drive to Saratoga via Lake Placid—stay 1 night',
    suggestedNights: '1',
    tags: ['spa', 'charming', 'relaxed'],
    momMentioned: true,
    source: 'mmtrip'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 🥾 HIKES & NATURE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'hike-marginal-way',
    category: 'hike',
    name: 'Marginal Way',
    region: 'maine_coast',
    location: 'Ogunquit, ME',
    coordinates: [43.2364, -70.5903],
    duration: 1,
    difficulty: 'Easy',
    distance: '1.25 miles',
    description: 'Paved cliff walk with stunning ocean views. Links Ogunquit to Perkins Cove.',
    tip: 'Best at sunrise before the crowds',
    tags: ['paved', 'ocean-views', 'easy'],
    momMentioned: true,
    source: 'mmtrip'
  },
  {
    id: 'hike-sabbaday-falls',
    category: 'hike',
    name: 'Sabbaday Falls',
    region: 'white_mountains',
    location: 'Kancamagus Highway, NH',
    coordinates: [43.9851, -71.3684],
    duration: 0.75,
    difficulty: 'Easy',
    distance: '0.75 miles round trip',
    description: 'Multi-tier waterfall with easy loop trail. Perfect quick stop on the Kanc.',
    tip: 'Hit the trailhead before 9:30am to beat tour buses',
    tags: ['waterfall', 'quick', 'family-friendly'],
    momMentioned: false,
    source: 'research'
  },
  {
    id: 'hike-mount-battie',
    category: 'hike',
    name: 'Mount Battie',
    region: 'maine_coast',
    location: 'Camden, ME',
    coordinates: [44.2098, -69.0648],
    duration: 2,
    difficulty: 'Moderate',
    distance: '1.5 miles to summit',
    description: 'Climb for epic views of Camden Harbor + fall foliage. Can also drive up!',
    tip: 'Tower at summit has 360° views',
    tags: ['summit', 'harbor-views', 'foliage'],
    momMentioned: false,
    source: 'research'
  },
  {
    id: 'hike-mount-royal',
    category: 'hike',
    name: 'Mount Royal',
    region: 'montreal',
    location: 'Montreal, QC',
    coordinates: [45.5048, -73.5877],
    duration: 2,
    difficulty: 'Easy-Moderate',
    distance: '2 miles to Kondiaronk Belvedere',
    description: 'Fall foliage WITH a city skyline. Best of both worlds.',
    tip: 'Kondiaronk Belvedere has the famous Montreal panorama',
    tags: ['city-views', 'foliage', 'belvedere'],
    momMentioned: true,
    source: 'mmtrip'
  },
  {
    id: 'hike-sallys-property',
    category: 'hike',
    name: "Sally's Property Trails",
    region: 'vermont',
    location: 'Chelsea, VT',
    coordinates: [43.9887, -72.4476],
    duration: 3,
    difficulty: 'Variable',
    distance: 'Multiple trails on property',
    description: 'Private property hiking, dark skies for stargazing, peak foliage timing.',
    tip: 'Grab groceries in Barre or Lebanon before arriving—closest store is 20 min away',
    momQuote: 'We can do some serious walking/hiking just on Sally\'s property alone.',
    tags: ['private', 'stargazing', 'rural'],
    momMentioned: true,
    source: 'mmtrip'
  },
  {
    id: 'hike-ice-glen',
    category: 'hike',
    name: 'Ice Glen & Laura\'s Tower',
    region: 'berkshires',
    location: 'Stockbridge, MA',
    coordinates: [42.2876, -73.3207],
    duration: 2.5,
    difficulty: 'Moderate',
    distance: '1.5 miles',
    description: 'Scramble through mossy boulders in a cool ravine, then climb to a stone tower.',
    tip: 'Bring hiking microspikes if exploring in late season',
    momQuote: 'Hiking in Ice Glen and Laura\'s Tower?',
    tags: ['boulders', 'tower', 'adventure'],
    momMentioned: true,
    source: 'mmtrip'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 🚗 SCENIC DRIVES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'drive-kancamagus',
    category: 'drive',
    name: 'Kancamagus Highway',
    region: 'white_mountains',
    location: 'White Mountains, NH',
    coordinates: [44.0456, -71.4161],
    duration: 2.5,
    distance: '34 miles',
    rating: 5,
    description: 'THE premier leaf-peeping drive. No gas stations, no services—just pure beauty.',
    stops: [
      { name: 'Albany Covered Bridge', type: 'photo' },
      { name: 'Sabbaday Falls', type: 'hike' },
      { name: 'Hancock Overlook', type: 'viewpoint' }
    ],
    tip: 'Depart by 8am. Jammed 11am-3pm.',
    foliage: 'Peak late September at higher elevations',
    tags: ['foliage', 'no-services', 'must-do'],
    momMentioned: true,
    source: 'mmtrip'
  },
  {
    id: 'drive-whiteface',
    category: 'drive',
    name: 'Whiteface Veterans Memorial Highway',
    region: 'adirondacks',
    location: 'Adirondacks, NY',
    coordinates: [44.3659, -73.9026],
    duration: 1.5,
    distance: '5 miles to summit',
    rating: 5,
    description: 'Drive almost to the summit! 360° views from 4,867 ft elevation.',
    tip: 'Closes mid-October, so late Sept is PERFECT.',
    foliage: 'Peak! 70-90% color in late September',
    tags: ['summit', 'adirondacks', 'views'],
    momMentioned: true,
    source: 'mmtrip'
  },
  {
    id: 'drive-route-100',
    category: 'drive',
    name: 'Route 100 Vermont',
    region: 'vermont',
    location: 'Vermont',
    coordinates: [44.4654, -72.6874],
    duration: 4,
    distance: 'Varies (can do sections)',
    rating: 4.8,
    description: 'The "Main Street of Vermont." Covered bridges, farms, and fire colors.',
    stops: [
      { name: 'Stowe', type: 'town' },
      { name: 'Waterbury (Ben & Jerry\'s)', type: 'food' },
      { name: 'Cold Hollow Cider', type: 'food' }
    ],
    tip: 'Can do sections rather than whole route',
    foliage: 'Peak early-to-mid October',
    tags: ['covered-bridges', 'farms', 'classic-vermont'],
    momMentioned: false,
    source: 'research'
  },
  {
    id: 'drive-route-1-coast',
    category: 'drive',
    name: 'Route 1 Coastal Drive',
    region: 'maine_coast',
    location: 'New Hampshire to Portland, ME',
    coordinates: [43.0718, -70.7626],
    duration: 3.5,
    distance: '~60 miles (with stops)',
    rating: 4.7,
    description: 'The slow, beautiful coastal route through all the harbor towns.',
    stops: [
      { name: 'Portsmouth, NH', type: 'town' },
      { name: 'Ogunquit', type: 'town' },
      { name: 'Kennebunkport', type: 'town' }
    ],
    tip: 'Adds 90 mins vs. I-95 but nails the "little harbor towns" wish',
    tags: ['coastal', 'harbor-towns', 'scenic'],
    momMentioned: true,
    source: 'mmtrip'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 🍁 FOLIAGE VIEWPOINTS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'foliage-hancock-overlook',
    category: 'foliage',
    name: 'Hancock Overlook',
    region: 'white_mountains',
    location: 'Kancamagus Highway, NH',
    coordinates: [44.0456, -71.4161],
    duration: 0.5,
    description: 'Hairpin view of Osceola Range. Expect highest foliage intensity on the Kanc.',
    foliagePeak: 'Sept 25 - Oct 5',
    expectedColor: '60-80%',
    tags: ['overlook', 'kanc', 'peak-foliage'],
    momMentioned: false,
    source: 'research'
  },
  {
    id: 'foliage-lake-placid',
    category: 'foliage',
    name: 'Lake Placid Area',
    region: 'adirondacks',
    location: 'Lake Placid, NY',
    coordinates: [44.2795, -73.9799],
    duration: 4,
    description: 'Adirondacks peak early—huge foliage payoff. Whiteface Mountain nearby.',
    foliagePeak: 'Sept 22 - Oct 5',
    expectedColor: '70-90%',
    highlights: [
      'Drive Whiteface Mountain',
      'Mirror Lake views',
      'Olympic venues'
    ],
    momQuote: 'Optional detour via Lake Placid',
    tags: ['peak', 'adirondacks', 'mountain'],
    momMentioned: true,
    source: 'mmtrip'
  },
  {
    id: 'foliage-chelsea-vermont',
    category: 'foliage',
    name: 'Central Vermont Hills',
    region: 'vermont',
    location: 'Chelsea, VT',
    coordinates: [43.9887, -72.4476],
    duration: 3,
    description: 'Vermont hills starting to pop. Sugar maples glowing orange.',
    foliagePeak: 'Sept 28 - Oct 8',
    expectedColor: '50-70%',
    tags: ['vermont', 'maples', 'rural'],
    momMentioned: true,
    source: 'mmtrip'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 📸 LANDMARKS & PHOTO SPOTS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'landmark-portland-head-light',
    category: 'landmark',
    name: 'Portland Head Light',
    region: 'portland',
    location: 'Cape Elizabeth, ME',
    coordinates: [43.6231, -70.2080],
    duration: 1.5,
    description: 'Most photographed lighthouse in America! Established 1791.',
    tip: '$5 park fee, totally worth it. Bite Into Maine food truck often here.',
    photoSpot: 'From the south rocks at sunset',
    tags: ['lighthouse', 'iconic', 'photo-op'],
    momMentioned: false,
    source: 'research'
  },
  {
    id: 'landmark-freedom-trail',
    category: 'landmark',
    name: 'Freedom Trail',
    region: 'boston',
    location: 'Boston, MA',
    coordinates: [42.3588, -71.0598],
    duration: 2.5,
    description: '2.5-mile walk through 16 historic sites. Follow the red brick line—you can\'t get lost!',
    tip: 'Golden hour at Faneuil Hall for photos',
    highlights: [
      'Boston Common',
      'Old North Church',
      'Paul Revere House',
      'Faneuil Hall'
    ],
    tags: ['history', 'walking', 'revolutionary'],
    momMentioned: true,
    source: 'mmtrip'
  },
  {
    id: 'landmark-notre-dame',
    category: 'landmark',
    name: 'Notre-Dame Basilica',
    region: 'montreal',
    location: 'Montreal, QC',
    coordinates: [45.5046, -73.5566],
    duration: 1.5,
    description: 'Stunning Gothic Revival basilica. The Aura light show is Instagram gold.',
    tip: 'Book Aura light + sound show in advance',
    tags: ['cathedral', 'light-show', 'architecture'],
    momMentioned: true,
    source: 'mmtrip'
  },
  {
    id: 'landmark-albany-covered-bridge',
    category: 'landmark',
    name: 'Albany Covered Bridge',
    region: 'white_mountains',
    location: 'Kancamagus Highway, NH',
    coordinates: [43.9612, -71.2234],
    duration: 0.5,
    description: 'Classic New England postcard. First leg-stretch and photo op on the Kanc.',
    tip: 'Quick stop, great for photos',
    tags: ['covered-bridge', 'photo-op', 'kanc'],
    momMentioned: false,
    source: 'research'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 🍽️ FOOD & DINING (Non-Lobster)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'food-duckfat',
    category: 'food',
    name: 'Duckfat',
    region: 'portland',
    location: 'Portland, ME',
    coordinates: [43.6557, -70.2558],
    duration: 1,
    price: '$$',
    description: 'Famous for Belgian fries cooked in duck fat. Also great poutine and paninis.',
    mustTry: 'Duck fat fries + poutine',
    tags: ['fries', 'casual', 'iconic'],
    momMentioned: false,
    source: 'research'
  },
  {
    id: 'food-schwartzs',
    category: 'food',
    name: "Schwartz's Deli",
    region: 'montreal',
    location: 'Montreal, QC',
    coordinates: [45.5181, -73.5778],
    duration: 1,
    price: '$$',
    description: 'Iconic Montreal smoked meat since 1928. The line is part of the experience.',
    mustTry: 'Medium-fat smoked meat sandwich',
    tip: 'Order "medium-fat" for authentic texture',
    tags: ['iconic', 'smoked-meat', 'deli'],
    momMentioned: true,
    source: 'mmtrip'
  },
  {
    id: 'food-st-viateur',
    category: 'food',
    name: 'St-Viateur Bagels',
    region: 'montreal',
    location: 'Montreal, QC',
    coordinates: [45.5236, -73.6008],
    duration: 0.5,
    price: '$',
    description: 'Wood-fired Montreal-style bagels. Sweeter and denser than NYC bagels.',
    mustTry: 'Sesame bagel with cream cheese',
    tip: 'Open 24 hours! Also try rival Fairmount nearby.',
    tags: ['bagels', 'iconic', '24-hours'],
    momMentioned: true,
    source: 'mmtrip'
  },
  {
    id: 'food-la-banquise',
    category: 'food',
    name: 'La Banquise',
    region: 'montreal',
    location: 'Montreal, QC',
    coordinates: [45.5275, -73.5714],
    duration: 1,
    price: '$$',
    description: 'The ultimate poutine destination. 30+ varieties, open 24 hours.',
    mustTry: 'Classic poutine (late night!)',
    tip: 'Split it—it\'s huge!',
    tags: ['poutine', 'late-night', '24-hours'],
    momMentioned: true,
    source: 'mmtrip'
  },
  {
    id: 'food-cold-hollow',
    category: 'food',
    name: 'Cold Hollow Cider Mill',
    region: 'vermont',
    location: 'Waterbury, VT',
    coordinates: [44.3553, -72.7506],
    duration: 0.75,
    price: '$',
    description: 'Fresh cider donuts and apple cider. Peak fall experience.',
    mustTry: 'Cider donuts + fresh apple cider',
    tip: 'Grab donuts + cider for the border queue to Canada',
    tags: ['donuts', 'cider', 'fall'],
    momMentioned: false,
    source: 'research'
  },
  {
    id: 'food-ben-jerrys',
    category: 'food',
    name: "Ben & Jerry's Factory",
    region: 'vermont',
    location: 'Waterbury, VT',
    coordinates: [44.3506, -72.7281],
    duration: 1,
    price: '$',
    description: 'Factory tour and ice cream. The Flavor Graveyard is a fun photo op.',
    mustTry: 'Any scoop + see the Flavor Graveyard',
    tags: ['ice-cream', 'tour', 'fun'],
    momMentioned: false,
    source: 'research'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 🏨 LODGING OPTIONS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'lodge-godfrey-boston',
    category: 'lodging',
    name: 'The Godfrey Hotel Boston',
    region: 'boston',
    location: 'Boston, MA - Downtown',
    coordinates: [42.3554, -71.0640],
    priceRange: '$250-350/night',
    type: 'Boutique Hotel',
    description: 'Modern boutique steps from Boston Common. Skip hotel parking—you don\'t need a car in Boston!',
    amenities: ['Rooftop Bar', 'Free WiFi', 'Fitness Center', 'Restaurant'],
    tip: 'Rooftop bar has great sunset views',
    tags: ['boutique', 'downtown', 'rooftop'],
    momMentioned: false,
    source: 'research'
  },
  {
    id: 'lodge-press-portland',
    category: 'lodging',
    name: 'The Press Hotel',
    region: 'portland',
    location: 'Portland, ME - Old Port',
    coordinates: [43.6591, -70.2568],
    priceRange: '$280-400/night',
    type: 'Boutique Hotel',
    description: 'Converted from Portland\'s newspaper HQ. Quirky literary vibes. Walk to EVERYTHING.',
    amenities: ['On-site Restaurant', 'Lobby Bar', 'Free WiFi', 'Bikes Available'],
    tip: 'Ask for a room with harbor glimpses',
    tags: ['boutique', 'historic', 'walkable'],
    momMentioned: false,
    source: 'research'
  },
  {
    id: 'lodge-sallys',
    category: 'lodging',
    name: "Sally's Vermont Property",
    region: 'vermont',
    location: 'Chelsea, VT',
    coordinates: [43.9887, -72.4476],
    priceRange: 'Friend rate!',
    type: 'Private Home',
    description: 'The REAL Vermont experience. Mountain views, hiking access, a million stars at night.',
    amenities: ['Mountain Views', 'Hiking Access', 'Stargazing', 'Full Kitchen', 'Peace & Quiet'],
    tip: 'Grab groceries before arriving—closest store is 20 min away',
    momQuote: 'We could stay a night at Sally\'s in Chelsea',
    tags: ['private', 'rural', 'authentic'],
    momMentioned: true,
    source: 'mmtrip'
  },
  {
    id: 'lodge-petit-montreal',
    category: 'lodging',
    name: 'Le Petit Hotel',
    region: 'montreal',
    location: 'Montreal, QC - Old Montreal',
    coordinates: [45.5048, -73.5538],
    priceRange: '$280-380/night CAD',
    type: 'Boutique Hotel',
    description: 'Intimate boutique steps from Notre-Dame Basilica. Complimentary wine hour + breakfast.',
    amenities: ['Breakfast Included', 'Rooftop Terrace', 'Wine & Cheese Hour', 'Bikes'],
    tip: 'Walk to Olive et Gourmando for the best sandwiches',
    tags: ['boutique', 'old-montreal', 'romantic'],
    momMentioned: false,
    source: 'research'
  },
  {
    id: 'lodge-adelphi-saratoga',
    category: 'lodging',
    name: 'The Adelphi Hotel',
    region: 'saratoga',
    location: 'Saratoga Springs, NY',
    coordinates: [43.0831, -73.7846],
    priceRange: '$350-500/night',
    type: 'Historic Boutique',
    description: 'Stunning restored Victorian hotel. THE place to stay in Saratoga. Gilded age vibes.',
    amenities: ['Pool', 'Spa', 'Restaurant', 'Historic Charm', 'Bar'],
    tip: 'Their bar is gorgeous for a nightcap',
    tags: ['historic', 'victorian', 'spa'],
    momMentioned: false,
    source: 'research'
  },
  {
    id: 'lodge-mirror-lake-inn',
    category: 'lodging',
    name: 'Mirror Lake Inn',
    region: 'adirondacks',
    location: 'Lake Placid, NY',
    coordinates: [44.2795, -73.9799],
    priceRange: '$400-600/night',
    type: 'Lakefront Resort',
    description: 'Stunning lake views, full spa, very romantic. If you do the Lake Placid route.',
    amenities: ['Lake Views', 'Spa', 'Restaurant', 'Private Beach', 'Pool'],
    tip: 'Lakefront rooms are worth it. Get there early for Whiteface drive.',
    tags: ['lakefront', 'spa', 'romantic'],
    momMentioned: false,
    source: 'research'
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Get activities filtered by category
 */
export function getActivitiesByCategory(categoryId) {
  return activityCatalog.filter(a => a.category === categoryId);
}

/**
 * Get activities filtered by region
 */
export function getActivitiesByRegion(regionId) {
  return activityCatalog.filter(a => a.region === regionId);
}

/**
 * Get activities mentioned in Mom's trip document
 */
export function getMomMentionedActivities() {
  return activityCatalog.filter(a => a.momMentioned);
}

/**
 * Search activities by name or description
 */
export function searchActivities(query) {
  const lowerQuery = query.toLowerCase();
  return activityCatalog.filter(a =>
    a.name.toLowerCase().includes(lowerQuery) ||
    a.description?.toLowerCase().includes(lowerQuery) ||
    a.location?.toLowerCase().includes(lowerQuery) ||
    a.tags?.some(t => t.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Get a single activity by ID
 */
export function getActivityById(id) {
  return activityCatalog.find(a => a.id === id);
}
