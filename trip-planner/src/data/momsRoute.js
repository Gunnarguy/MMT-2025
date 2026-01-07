export const momsRoute = {
  title: 'Girls Trip to New England',
  subtitle: 'Suggested drive-first adventure with tons of flexibility',
  themeLine: 'Lobsters - Leaves - Love',
  travelWindow: 'Late September to October 2025',
  overview: {
    duration: '7-9 days',
    totalMiles: '~780 miles',
    driveTime: '~16 hours total',
    flyIn: 'Boston (BOS)',
    flyOut: 'Albany (ALB) or Boston (BOS)',
    countries: ['USA', 'Canada'],
    states: ['MA', 'NH', 'ME', 'VT', 'QC', 'NY']
  },
  warnings: [
    {
      title: 'Leaf-peeping surge',
      detail: 'Late September weekends bring heavy traffic across New England.'
    },
    {
      title: 'This is a suggested route',
      detail: 'Stop, hike, or swap days as you want. Nothing is locked in.'
    },
    {
      title: 'Flex days baked in',
      detail: 'If a place feels too rushed, add a night and slide the rest.'
    }
  ],
  ribbonStops: [
    { id: 'boston', name: 'Boston', nights: '1-2', drive: 'Arrive', emoji: '🏙️' },
    { id: 'portland', name: 'Portland', nights: '1', drive: '2 hrs', emoji: '🦞' },
    { id: 'chelsea', name: 'Chelsea', nights: '1-2', drive: '3.5 hrs', emoji: '🍁' },
    { id: 'montreal', name: 'Montreal', nights: '2', drive: '2.5 hrs', emoji: '🥯' },
    { id: 'saratoga', name: 'Saratoga', nights: '1', drive: '4 hrs', emoji: '🏔️' },
    { id: 'albany', name: 'Albany', nights: 'Fly out', drive: '1.5 hrs', emoji: '✈️' }
  ],
  featuredMoments: [
    {
      title: 'First lobster in Boston',
      detail: 'Lean into history, walkable neighborhoods, and the first iconic roll.',
      stopId: 'boston'
    },
    {
      title: 'Sally\'s Vermont retreat',
      detail: 'Stay on the property, walk the land, and slow the pace for a day.',
      stopId: 'chelsea'
    },
    {
      title: 'International detour',
      detail: 'Montreal for bagels, smoked meat, and a full city reset.',
      stopId: 'montreal'
    }
  ],
  stops: [
    {
      id: 'boston',
      title: 'Boston, MA',
      dayRange: 'Days 1-2',
      nights: '1-2 nights',
      driveTime: 'Arrival base',
      notes: 'Use the arrival day and perhaps the next day for touring the city and eating some lobster.',
      momQuote: 'The city is full of history, of course.',
      location: 'Boston, MA',
      activities: ['landmark-freedom-trail', 'lobster-neptune'],
      lodging: 'lodge-godfrey-boston',
      highlights: ['Walkable neighborhoods', 'Freedom Trail', 'Classic seafood']
    },
    {
      id: 'portland',
      title: 'Coastal drive to Portland, ME',
      dayRange: 'Day 3',
      nights: '1 night',
      driveTime: 'About 2 hours',
      notes: 'Drive up the coast to Portland and stay one night. Route 1 is the slow and scenic option.',
      momQuote: 'Hit the harbor towns along the way.',
      location: 'Portland, ME',
      activities: ['drive-route-1-coast', 'town-ogunquit', 'town-kennebunkport', 'lobster-clam-shack', 'lobster-chauncey', 'town-portland-old-port'],
      lodging: 'lodge-press-portland',
      highlights: ['Harbor towns', 'Coastal lobster shacks', 'Old Port stroll']
    },
    {
      id: 'chelsea',
      title: 'Chelsea, VT via Concord, NH',
      dayRange: 'Days 4-5',
      nights: '1-2 nights',
      driveTime: 'About 3.5 hours',
      notes: 'Stay a night at Sally\'s in Chelsea. Concord can just be a stopping place on the way.',
      momQuote: 'We can do some serious walking or hiking right on the property.',
      location: 'Chelsea, VT',
      activities: ['drive-kancamagus', 'hike-sabbaday-falls', 'foliage-hancock-overlook', 'landmark-albany-covered-bridge', 'hike-sallys-property', 'foliage-chelsea-vermont'],
      lodging: 'lodge-sallys',
      highlights: ['Kancamagus Highway', 'Property hikes', 'Vermont foliage']
    },
    {
      id: 'montreal',
      title: 'Montreal, QC via Burlington, VT',
      dayRange: 'Days 6-7',
      nights: '2 nights',
      driveTime: 'About 2.5 hours',
      notes: 'Burlington is a nice stopping place on the way up. Montreal is the main city adventure.',
      momQuote: 'Explore Montreal. Bagels, smoked meat, Mount Royal, poutine.',
      location: 'Montreal, QC',
      activities: ['food-cold-hollow', 'food-ben-jerrys', 'landmark-notre-dame', 'food-st-viateur', 'food-schwartzs', 'hike-mount-royal', 'food-la-banquise'],
      lodging: 'lodge-petit-montreal',
      highlights: ['Old Montreal', 'Bagel crawl', 'Mount Royal views']
    },
    {
      id: 'saratoga',
      title: 'Adirondacks to Saratoga Springs, NY',
      dayRange: 'Day 8',
      nights: '1 night',
      driveTime: 'About 4 hours',
      notes: 'Drive via Lake Placid if you want the detour before Saratoga Springs.',
      momQuote: 'This is the optional continuation before heading to Albany.',
      location: 'Saratoga Springs, NY',
      activities: ['foliage-lake-placid', 'drive-whiteface'],
      lodging: 'lodge-adelphi-saratoga',
      highlights: ['Lake Placid detour', 'Adirondack peaks', 'Historic downtown']
    },
    {
      id: 'albany',
      title: 'Albany, NY departure',
      dayRange: 'Day 9',
      nights: 'Fly out',
      driveTime: 'About 1.5 hours',
      notes: 'Fly home from Albany or keep driving toward Stockbridge/Boston.',
      momQuote: 'We can stop and fly home from Albany.',
      location: 'Albany, NY',
      activities: [],
      lodging: null,
      highlights: ['Easy fly-out', 'Gateway to Berkshires']
    }
  ],
  foliage: {
    peakWindows: ['Late September in high elevations', 'Early to mid October in Vermont', 'Mid October in coastal Maine'],
    bestDrives: ['Kancamagus Highway', 'Route 100 in Vermont', 'Coastal Route 1']
  },
  budget: {
    tiers: [
      { name: 'Budget', range: '$175-250 per day', detail: 'Mix of casual meals, free hikes, and simple lodging.' },
      { name: 'Comfort', range: '$275-375 per day', detail: 'Better lodging plus a few splurge meals.' },
      { name: 'Treat-Yourself', range: '$400+ per day', detail: 'Boutique hotels, tours, and big food moments.' }
    ],
    tips: [
      'Book lodging early for foliage season.',
      'Save splurges for Boston and Montreal.',
      'Pack snacks for scenic drives.'
    ]
  },
  packing: {
    weatherNote: 'Expect crisp mornings, warm afternoons, and surprise rain. Layers win.',
    essentials: ['Comfortable walking shoes', 'Light rain jacket', 'Daypack', 'Portable charger', 'Refillable water bottle'],
    extras: ['Camera or good phone lens', 'Cozy sweater', 'Binoculars for foliage', 'Picnic blanket', 'Reusable tote']
  },
  alternatives: [
    {
      title: 'Berkshires finish',
      detail: 'Continue to Stockbridge, MA for Ice Glen and Laura\'s Tower hikes before Boston.',
      addsDays: 1,
      flyOut: 'Boston (BOS)',
      activities: ['hike-ice-glen']
    },
    {
      title: 'Finger Lakes extension',
      detail: 'Explore the Finger Lakes region with wineries and waterfalls.',
      addsDays: 2,
      flyOut: 'Albany (ALB)',
      activities: []
    },
    {
      title: 'Massachusetts detour',
      detail: 'Spend extra days in western Massachusetts and fly out of Boston.',
      addsDays: 1,
      flyOut: 'Boston (BOS)',
      activities: []
    },
    {
      title: 'Southern dip',
      detail: 'Dip into Connecticut or Rhode Island if you want more coastal time.',
      addsDays: 1,
      flyOut: 'Providence (PVD) or Boston (BOS)',
      activities: []
    }
  ],
  wildcards: [
    'Alternate trips could be Carolinas, Virginia, Tennessee, or Kentucky.',
    'Another idea: Southern Illinois, Kentucky, Missouri loop.',
    'Or switch coasts and do a west coast northern route.'
  ]
};
