// ═══════════════════════════════════════════════════════════════════════════════
// MMT-2025 ROUTE TEMPLATES
// Pre-built routes users can start from and customize
// ═══════════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════════
// ROUTE TEMPLATE STRUCTURE
// Each template is a suggested itinerary users can load and then modify
// ═══════════════════════════════════════════════════════════════════════════════

export const routeTemplates = [
  {
    id: 'moms-original',
    name: "Mom's Original Route",
    emoji: '💕',
    source: 'MMTrip.txt',
    description: "The full experience—coast, mountains, city, and countryside. Based on Tere's original planning document.",
    duration: '7-9 days',
    totalMiles: '~780 miles',
    driveTime: '~16 hours total',
    flyIn: 'Boston (BOS)',
    flyOut: 'Albany (ALB)',
    vibe: 'Classic road trip with flexibility built in',
    bestFor: ['First-timers', 'Want it all', 'Full experience'],
    countries: ['USA', 'Canada'],
    states: ['MA', 'NH', 'ME', 'VT', 'QC', 'NY'],

    // The day-by-day structure (activities are references to catalog IDs)
    days: [
      {
        dayNumber: 1,
        label: 'Arrive Boston',
        location: 'Boston, MA',
        type: 'arrival',
        notes: 'Use arrival day and perhaps next day for touring the city and eating some LOBSTA!',
        suggestedActivities: ['landmark-freedom-trail', 'lobster-neptune'],
        lodging: 'lodge-godfrey-boston',
        flexible: true
      },
      {
        dayNumber: 2,
        label: 'Boston Exploration',
        location: 'Boston, MA',
        type: 'explore',
        notes: 'The city is FULL of history, of course.',
        suggestedActivities: ['landmark-freedom-trail'],
        lodging: 'lodge-godfrey-boston',
        flexible: true
      },
      {
        dayNumber: 3,
        label: 'Coastal Drive to Portland',
        location: 'Portland, ME',
        type: 'drive',
        driveTime: '2-3.5 hours (depending on route)',
        notes: 'Drive up the coast to Portland—stay 1 night. Take Route 1 for harbor towns!',
        suggestedActivities: ['drive-route-1-coast', 'town-ogunquit', 'town-kennebunkport', 'lobster-clam-shack', 'lobster-chauncey', 'town-portland-old-port'],
        lodging: 'lodge-press-portland',
        flexible: true
      },
      {
        dayNumber: 4,
        label: 'Mountains & Vermont',
        location: 'Chelsea, VT',
        type: 'drive',
        driveTime: '3.5-4 hours (with stops)',
        notes: 'Through the Kancamagus Highway to Sally\'s Vermont property.',
        suggestedActivities: ['drive-kancamagus', 'hike-sabbaday-falls', 'foliage-hancock-overlook', 'landmark-albany-covered-bridge', 'hike-sallys-property'],
        lodging: 'lodge-sallys',
        flexible: true
      },
      {
        dayNumber: 5,
        label: 'Vermont Day',
        location: 'Chelsea, VT',
        type: 'explore',
        notes: 'We can do some serious walking/hiking just on Sally\'s property alone.',
        suggestedActivities: ['hike-sallys-property', 'foliage-chelsea-vermont'],
        lodging: 'lodge-sallys',
        flexible: true
      },
      {
        dayNumber: 6,
        label: 'Vermont to Montreal',
        location: 'Montreal, QC',
        type: 'drive',
        driveTime: '2.5-3 hours (with Burlington stop)',
        notes: 'No specific plans for Burlington, just a nice stopping place. Explore Montreal.',
        suggestedActivities: ['food-cold-hollow', 'food-ben-jerrys', 'landmark-notre-dame'],
        lodging: 'lodge-petit-montreal',
        flexible: true
      },
      {
        dayNumber: 7,
        label: 'Montreal Exploration',
        location: 'Montreal, QC',
        type: 'explore',
        notes: 'Explore Montreal. Bagels, smoked meat, Mount Royal, poutine!',
        suggestedActivities: ['food-st-viateur', 'food-schwartzs', 'hike-mount-royal', 'landmark-notre-dame', 'food-la-banquise'],
        lodging: 'lodge-petit-montreal',
        flexible: true
      },
      {
        dayNumber: 8,
        label: 'Adirondacks to Saratoga',
        location: 'Saratoga Springs, NY',
        type: 'drive',
        driveTime: '~4 hours (with Lake Placid detour)',
        notes: 'Drive to Saratoga Springs via Lake Placid (optional). Fly out of Albany.',
        suggestedActivities: ['foliage-lake-placid', 'drive-whiteface'],
        lodging: 'lodge-adelphi-saratoga',
        flexible: true
      },
      {
        dayNumber: 9,
        label: 'Departure',
        location: 'Albany, NY',
        type: 'departure',
        notes: 'Fly home from Albany—or drive back east toward Stockbridge/Boston.',
        suggestedActivities: [],
        flexible: true
      }
    ],

    // Alternatives suggested in the original document
    alternatives: [
      {
        name: 'Berkshires Finish',
        description: 'Continue to Stockbridge, MA for Ice Glen & Laura\'s Tower hikes before returning to Boston',
        modifiesDay: 8,
        activities: ['hike-ice-glen'],
        flyOut: 'Boston (BOS)'
      },
      {
        name: 'Finger Lakes Extension',
        description: 'Explore the Finger Lakes area for wineries and waterfalls',
        addsDays: 1,
        activities: [],
        flyOut: 'Albany (ALB)'
      }
    ]
  },

  {
    id: 'coastal-lobster',
    name: 'Coastal Lobster Focus',
    emoji: '🦞',
    source: 'research',
    description: 'More time on the Maine coast, maximize lobster consumption, skip the Montreal detour.',
    duration: '6-7 days',
    totalMiles: '~450 miles',
    driveTime: '~10 hours total',
    flyIn: 'Boston (BOS)',
    flyOut: 'Boston (BOS)',
    vibe: 'Slow and savory, harbor-hopping',
    bestFor: ['Lobster lovers', 'Coastal vibes', 'Less driving'],
    countries: ['USA'],
    states: ['MA', 'NH', 'ME', 'VT'],

    days: [
      {
        dayNumber: 1,
        label: 'Arrive Boston',
        location: 'Boston, MA',
        type: 'arrival',
        notes: 'Arrive and immediately get lobster at Neptune Oyster.',
        suggestedActivities: ['lobster-neptune'],
        lodging: 'lodge-godfrey-boston',
        flexible: true
      },
      {
        dayNumber: 2,
        label: 'Southern Maine Coast',
        location: 'Boston → Kennebunkport, ME',
        type: 'drive',
        driveTime: '1.5-2.5 hours',
        notes: 'Take the slow coastal Route 1, hit every harbor town.',
        suggestedActivities: ['town-portsmouth', 'lobster-chauncey', 'town-ogunquit', 'hike-marginal-way', 'town-kennebunkport', 'lobster-clam-shack'],
        flexible: true
      },
      {
        dayNumber: 3,
        label: 'Portland Food Day',
        location: 'Kennebunkport → Portland, ME',
        type: 'drive',
        driveTime: '30 min',
        notes: 'All the lobster spots, all the foodie destinations.',
        suggestedActivities: ['lobster-eventide', 'town-portland-old-port', 'food-duckfat', 'lobster-highroller', 'landmark-portland-head-light', 'lobster-bite-into'],
        lodging: 'lodge-press-portland',
        flexible: true
      },
      {
        dayNumber: 4,
        label: 'Northern Maine Coast',
        location: 'Portland → Camden, ME',
        type: 'drive',
        driveTime: '2 hours',
        notes: 'Optional extension north for McLoons and Camden.',
        suggestedActivities: ['lobster-mcloons', 'town-camden', 'hike-mount-battie'],
        flexible: true
      },
      {
        dayNumber: 5,
        label: 'Mountains & Vermont',
        location: 'Camden → Chelsea, VT',
        type: 'drive',
        driveTime: '4 hours',
        notes: 'Cut across to Vermont for fall colors.',
        suggestedActivities: ['drive-kancamagus', 'hike-sallys-property'],
        lodging: 'lodge-sallys',
        flexible: true
      },
      {
        dayNumber: 6,
        label: 'Return to Boston',
        location: 'Chelsea → Boston, MA',
        type: 'drive',
        driveTime: '2.5 hours',
        notes: 'Head back to Boston for departure.',
        suggestedActivities: [],
        flexible: true
      },
      {
        dayNumber: 7,
        label: 'Departure',
        location: 'Boston, MA',
        type: 'departure',
        notes: 'Fly home from Boston.',
        suggestedActivities: [],
        flexible: true
      }
    ],

    alternatives: []
  },

  {
    id: 'foliage-chaser',
    name: 'Foliage Chaser Route',
    emoji: '🍁',
    source: 'research',
    description: 'Optimized for peak fall colors. Chase the foliage up the mountains.',
    duration: '6-7 days',
    totalMiles: '~600 miles',
    driveTime: '~12 hours total',
    flyIn: 'Boston (BOS)',
    flyOut: 'Albany (ALB)',
    vibe: 'Leaf-peeping paradise, hiking focused',
    bestFor: ['Fall color enthusiasts', 'Hikers', 'Photographers'],
    countries: ['USA'],
    states: ['MA', 'NH', 'VT', 'NY'],

    days: [
      {
        dayNumber: 1,
        label: 'Arrive Boston',
        location: 'Boston, MA',
        type: 'arrival',
        suggestedActivities: ['landmark-freedom-trail'],
        lodging: 'lodge-godfrey-boston',
        flexible: true
      },
      {
        dayNumber: 2,
        label: 'White Mountains',
        location: 'Boston → North Conway, NH',
        type: 'drive',
        driveTime: '2.5 hours',
        notes: 'Peak foliage at elevation! The Kancamagus is THE place.',
        suggestedActivities: ['drive-kancamagus', 'foliage-hancock-overlook', 'hike-sabbaday-falls', 'landmark-albany-covered-bridge'],
        flexible: true
      },
      {
        dayNumber: 3,
        label: 'Vermont Colors',
        location: 'North Conway → Chelsea, VT',
        type: 'drive',
        driveTime: '2 hours',
        suggestedActivities: ['hike-sallys-property', 'foliage-chelsea-vermont', 'drive-route-100'],
        lodging: 'lodge-sallys',
        flexible: true
      },
      {
        dayNumber: 4,
        label: 'Vermont Exploration',
        location: 'Chelsea, VT',
        type: 'explore',
        suggestedActivities: ['hike-sallys-property', 'food-cold-hollow', 'food-ben-jerrys'],
        lodging: 'lodge-sallys',
        flexible: true
      },
      {
        dayNumber: 5,
        label: 'Adirondacks Peak',
        location: 'Chelsea → Lake Placid, NY',
        type: 'drive',
        driveTime: '2.5 hours',
        notes: 'Adirondacks peak early—huge foliage payoff!',
        suggestedActivities: ['foliage-lake-placid', 'drive-whiteface'],
        lodging: 'lodge-mirror-lake-inn',
        flexible: true
      },
      {
        dayNumber: 6,
        label: 'Saratoga & Departure',
        location: 'Lake Placid → Saratoga → Albany',
        type: 'drive',
        driveTime: '2 hours',
        suggestedActivities: [],
        flexible: true
      }
    ],

    alternatives: []
  },

  {
    id: 'city-culture',
    name: 'Cities & Culture Route',
    emoji: '🏙️',
    source: 'research',
    description: 'Focus on Boston and Montreal with light scenic driving in between.',
    duration: '6-7 days',
    totalMiles: '~500 miles',
    driveTime: '~9 hours total',
    flyIn: 'Boston (BOS)',
    flyOut: 'Montreal (YUL)',
    vibe: 'Urban exploration with countryside breaks',
    bestFor: ['City lovers', 'Food & culture', 'Less hiking'],
    countries: ['USA', 'Canada'],
    states: ['MA', 'ME', 'VT', 'QC'],

    days: [
      {
        dayNumber: 1,
        label: 'Arrive Boston',
        location: 'Boston, MA',
        type: 'arrival',
        suggestedActivities: ['lobster-neptune'],
        lodging: 'lodge-godfrey-boston',
        flexible: true
      },
      {
        dayNumber: 2,
        label: 'Boston Deep Dive',
        location: 'Boston, MA',
        type: 'explore',
        suggestedActivities: ['landmark-freedom-trail'],
        lodging: 'lodge-godfrey-boston',
        flexible: true
      },
      {
        dayNumber: 3,
        label: 'Portland Day Trip',
        location: 'Boston → Portland → Boston or Burlington',
        type: 'drive',
        driveTime: '2 hours each way',
        suggestedActivities: ['town-portland-old-port', 'lobster-eventide', 'food-duckfat'],
        flexible: true
      },
      {
        dayNumber: 4,
        label: 'Vermont Crossing',
        location: 'Boston → Burlington, VT',
        type: 'drive',
        driveTime: '3.5 hours',
        suggestedActivities: ['food-cold-hollow'],
        flexible: true
      },
      {
        dayNumber: 5,
        label: 'Montreal Arrival',
        location: 'Burlington → Montreal, QC',
        type: 'drive',
        driveTime: '1.5 hours',
        suggestedActivities: ['landmark-notre-dame'],
        lodging: 'lodge-petit-montreal',
        flexible: true
      },
      {
        dayNumber: 6,
        label: 'Montreal Full Day',
        location: 'Montreal, QC',
        type: 'explore',
        suggestedActivities: ['food-st-viateur', 'food-schwartzs', 'hike-mount-royal', 'food-la-banquise'],
        lodging: 'lodge-petit-montreal',
        flexible: true
      },
      {
        dayNumber: 7,
        label: 'Departure',
        location: 'Montreal, QC',
        type: 'departure',
        notes: 'Fly home from Montreal.',
        suggestedActivities: [],
        flexible: true
      }
    ],

    alternatives: []
  },

  {
    id: 'blank-canvas',
    name: 'Start From Scratch',
    emoji: '✨',
    source: 'custom',
    description: 'Build your own adventure! Start with a blank slate and add whatever you want.',
    duration: 'You decide',
    totalMiles: 'TBD',
    driveTime: 'TBD',
    flyIn: 'Your choice',
    flyOut: 'Your choice',
    vibe: 'Complete freedom',
    bestFor: ['Control enthusiasts', 'Unique trips', 'Customizers'],
    countries: [],
    states: [],

    days: [
      {
        dayNumber: 1,
        label: 'Day 1',
        location: 'Add a destination',
        type: 'custom',
        suggestedActivities: [],
        flexible: true
      },
      {
        dayNumber: 2,
        label: 'Day 2',
        location: 'Add a destination',
        type: 'custom',
        suggestedActivities: [],
        flexible: true
      },
      {
        dayNumber: 3,
        label: 'Day 3',
        location: 'Add a destination',
        type: 'custom',
        suggestedActivities: [],
        flexible: true
      }
    ],

    alternatives: []
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Get a route template by ID
 */
export function getRouteTemplate(templateId) {
  return routeTemplates.find(t => t.id === templateId);
}

/**
 * Get all route templates
 */
export function getAllRouteTemplates() {
  return routeTemplates;
}

/**
 * Get Mom's original route
 */
export function getMomsRoute() {
  return routeTemplates.find(t => t.id === 'moms-original');
}
