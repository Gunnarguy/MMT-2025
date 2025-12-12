// ═══════════════════════════════════════════════════════════════════════════════
// MMT-2025 UNIFIED TRIP DATA
// Single source of truth for all trip information
// Consolidates data.js and data/planContent.js
// ═══════════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════════
// TRIP META
// ═══════════════════════════════════════════════════════════════════════════════
export const tripMeta = {
  title: "Tere & Mikaela's Epic Girls Trip",
  subtitle: "New England & Southern Quebec • Late September 2026",
  tagline: "Lobsters 🦞 • Leaves 🍁",
  summary: "Begin in Boston, surf the Maine coast, crest the White and Green Mountains, cross into cosmopolitan Montreal, and descend through the Adirondacks to Saratoga/Albany— chasing foliage vertically while honoring the original 'girls trip' wish list.",
  startDate: "2026-09-20",
  endDate: "2026-09-27",
  totalDays: 8,
  region: "New England & Southern Quebec"
};

// ═══════════════════════════════════════════════════════════════════════════════
// TRAVELERS
// ═══════════════════════════════════════════════════════════════════════════════
export const travelers = [
  {
    id: 'tere',
    name: 'Tere',
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
// DATA SOURCES
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
// SCHEDULE OPTIONS
// ═══════════════════════════════════════════════════════════════════════════════
export const scheduleOptions = [
  {
    id: 'classic',
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
    bestFor: 'The full New England experience with flexibility built in'
  },
  {
    id: 'coastal',
    title: 'Coastal Focus Route',
    emoji: '🦞',
    duration: '8 days',
    vibe: 'More time on the Maine coast, skip Montreal',
    highlights: [
      'Boston (1-2 nights)',
      'Extended Maine coast (3 nights)',
      'Vermont/Sally\'s (2 nights)',
      'Saratoga → Albany'
    ],
    totalMiles: '~500 miles',
    bestFor: 'Lobster lovers who want to slow down'
  },
  {
    id: 'foliage',
    title: 'Foliage Chaser Route',
    emoji: '🍁',
    duration: '8 days',
    vibe: 'Optimized for peak fall colors',
    highlights: [
      'Boston (1 night)',
      'White Mountains (2 nights)',
      'Vermont (2 nights)',
      'Adirondacks (2 nights)',
      'Fly out of Albany'
    ],
    totalMiles: '~600 miles',
    bestFor: 'Leaf-peepers and hikers'
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// DAY-BY-DAY ITINERARY
// ═══════════════════════════════════════════════════════════════════════════════
export const dayItinerary = [
  {
    dayNumber: 1,
    id: 1,
    date: 'Sept 20',
    label: 'Arrival: Boston',
    from: 'Home',
    to: 'Boston, MA',
    location: 'Boston, MA',
    type: 'travel',
    emoji: '✈️',
    driveTime: null,
    description: 'Arrive in Boston. Get settled and start exploring!',
    activities: [],
    dining: [],
    highlights: [
      'Arrive at Logan Airport',
      'Drop bags at hotel',
      'Walk Freedom Trail',
      'First lobster roll!'
    ],
    foliage: 'Early • 15-30% color',
    momNote: 'Use arrival day and next day for touring the city and eating LOBSTA!',
    coordinates: [42.3601, -71.0589]
  },
  {
    dayNumber: 2,
    id: 2,
    date: 'Sept 21',
    label: 'Boston Exploration',
    from: 'Boston',
    to: 'Boston',
    location: 'Boston, MA',
    type: 'explore',
    emoji: '🧭',
    driveTime: null,
    description: 'Full day exploring Boston\'s history and cuisine.',
    activities: [],
    dining: [],
    highlights: [
      'Freedom Trail',
      'Faneuil Hall',
      'North End Italian',
      'Optional harbor cruise'
    ],
    foliage: 'Early • 15-30% color',
    momNote: 'The city is FULL of history.',
    coordinates: [42.3601, -71.0589]
  },
  {
    dayNumber: 3,
    id: 3,
    date: 'Sept 22',
    label: 'Coastal Drive to Portland',
    from: 'Boston',
    to: 'Portland, ME',
    location: 'Portland, ME',
    type: 'drive',
    emoji: '🚗',
    driveTime: 2.5,
    description: 'Pick up rental and cruise the coast to Portland.',
    activities: [],
    dining: [],
    highlights: [
      'Route 1 coastal views',
      'Ogunquit cliff walk',
      'Kennebunkport',
      'Portland Old Port'
    ],
    foliage: 'Patchy • 20-35% color',
    momNote: 'Drive up coast to Portland—stay 1 night',
    coordinates: [43.6591, -70.2568]
  },
  {
    dayNumber: 4,
    id: 4,
    date: 'Sept 23',
    label: 'Mountains & Vermont',
    from: 'Portland',
    to: 'Chelsea, VT',
    location: 'Chelsea, VT',
    type: 'drive',
    emoji: '🚗',
    driveTime: 3.5,
    description: 'Through White Mountains to Sally\'s Vermont property.',
    activities: [],
    dining: [],
    highlights: [
      'Kancamagus Highway',
      'Peak foliage!',
      'Sally\'s property',
      'Evening hike'
    ],
    foliage: 'Peak • 60-80% color 🔥',
    momNote: 'Drive to Chelsea via Concord—stay 1-2 nights',
    coordinates: [43.9887, -72.4476]
  },
  {
    dayNumber: 5,
    id: 5,
    date: 'Sept 24',
    label: 'Vermont Day',
    from: 'Chelsea',
    to: 'Chelsea',
    location: 'Chelsea, VT',
    type: 'explore',
    emoji: '🥾',
    driveTime: null,
    description: 'Full day hiking and exploring Vermont.',
    activities: [],
    dining: [],
    highlights: [
      'Property hike',
      'Optional Woodstock',
      'Cheese trail',
      'Stargazing'
    ],
    foliage: 'Peak • 60-80% color',
    momNote: 'Serious walking/hiking on Sally\'s property',
    coordinates: [43.9887, -72.4476]
  },
  {
    dayNumber: 6,
    id: 6,
    date: 'Sept 25',
    label: 'Vermont to Montreal',
    from: 'Chelsea',
    to: 'Montreal, QC',
    location: 'Montreal, QC',
    type: 'drive',
    emoji: '🚗',
    driveTime: 2.5,
    description: 'Through Burlington to Montreal.',
    activities: [],
    dining: [],
    highlights: [
      'Burlington stop',
      'Border crossing',
      'Old Montreal',
      'Notre-Dame Basilica'
    ],
    foliage: 'Approaching • 30-45% color',
    momNote: 'Drive to Montreal via Burlington—stay 2 nights',
    coordinates: [45.5017, -73.5673]
  },
  {
    dayNumber: 7,
    id: 7,
    date: 'Sept 26',
    label: 'Montreal Exploration',
    from: 'Montreal',
    to: 'Montreal',
    location: 'Montreal, QC',
    type: 'explore',
    emoji: '🏙️',
    driveTime: null,
    description: 'Full day exploring Montreal neighborhoods.',
    activities: [],
    dining: [],
    highlights: [
      'Bagel run',
      'Mile End',
      'Mount Royal',
      'Plateau BYOB'
    ],
    foliage: 'Approaching • 30-45% color',
    momNote: 'Explore Montreal',
    coordinates: [45.5017, -73.5673]
  },
  {
    dayNumber: 8,
    id: 8,
    date: 'Sept 27',
    label: 'Adirondacks to Saratoga',
    from: 'Montreal',
    to: 'Saratoga, NY',
    location: 'Saratoga Springs, NY',
    type: 'drive',
    emoji: '🚗',
    driveTime: 4,
    description: 'Through Adirondacks to final stop.',
    activities: [],
    dining: [],
    highlights: [
      'Lake Placid',
      'Whiteface Mountain',
      'Peak foliage',
      'Saratoga Springs'
    ],
    foliage: 'Peak • 70-90% color 🍁🔥',
    momNote: 'Drive to Saratoga via Lake Placid—stay 1 night',
    coordinates: [43.0831, -73.784]
  }
];

// Export for backward compatibility
export const tripDays = dayItinerary;

// ═══════════════════════════════════════════════════════════════════════════════
// Re-export everything else from the existing data files for now
// (Will be progressively migrated)
// ═══════════════════════════════════════════════════════════════════════════════
import { tripData as legacyTripData } from '../data.js';

export const {
  lobsterGuide, 
  harborTowns, 
  foliageTracker,
  liveStats,
  emergencyContacts,
  budgetEstimate,
  weatherForecast,
  packingChecklist,
  reservations,
  photoSpots,
  funFacts,
  playlist,
  lodging,
  mmHighlights,
  researchHighlights
} = legacyTripData;

export {
  exploreCatalog,
  logisticsInfo,
  riskPlaybook,
  tripStats,
  nextStepsChecklist
} from './planContent.js';
