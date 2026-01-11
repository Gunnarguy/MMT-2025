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
    id: "moms-original",
    name: "Mom's Original Route",
    emoji: "💕",
    source: "MMTrip.txt",
    description:
      "The full experience—coast, mountains, city, and countryside. Based on Tere's original planning document.",
    duration: "7-9 days",
    totalMiles: "~780 miles",
    driveTime: "~16 hours total",
    flyIn: "Boston (BOS)",
    flyOut: "Albany (ALB)",
    vibe: "Classic road trip with flexibility built in",
    bestFor: ["First-timers", "Want it all", "Full experience"],
    countries: ["USA", "Canada"],
    states: ["MA", "NH", "ME", "VT", "QC", "NY"],

    // The day-by-day structure (activities are references to catalog IDs)
    days: [
      {
        dayNumber: 1,
        label: "Arrive Boston",
        location: "Boston, MA",
        type: "arrival",
        notes:
          "Use arrival day and perhaps next day for touring the city and eating some LOBSTA!",
        suggestedActivities: ["landmark-freedom-trail", "lobster-neptune"],
        lodging: "lodge-godfrey-boston",
        flexible: true,
      },
      {
        dayNumber: 2,
        label: "Boston Exploration",
        location: "Boston, MA",
        type: "explore",
        notes: "The city is FULL of history, of course.",
        suggestedActivities: ["landmark-freedom-trail"],
        lodging: "lodge-godfrey-boston",
        flexible: true,
      },
      {
        dayNumber: 3,
        label: "Coastal Drive to Portland",
        location: "Portland, ME",
        type: "drive",
        driveTime: "2-3.5 hours (depending on route)",
        notes:
          "Drive up the coast to Portland—stay 1 night. Take Route 1 for harbor towns!",
        suggestedActivities: [
          "drive-route-1-coast",
          "town-ogunquit",
          "town-kennebunkport",
          "lobster-clam-shack",
          "lobster-chauncey",
          "town-portland-old-port",
        ],
        lodging: "lodge-press-portland",
        flexible: true,
      },
      {
        dayNumber: 4,
        label: "Mountains & Vermont",
        location: "Chelsea, VT",
        type: "drive",
        driveTime: "3.5-4 hours (with stops)",
        notes: "Through the Kancamagus Highway to Sally's Vermont property.",
        suggestedActivities: [
          "drive-kancamagus",
          "hike-sabbaday-falls",
          "foliage-hancock-overlook",
          "landmark-albany-covered-bridge",
          "hike-sallys-property",
        ],
        lodging: "lodge-sallys",
        flexible: true,
      },
      {
        dayNumber: 5,
        label: "Vermont Day",
        location: "Chelsea, VT",
        type: "explore",
        notes:
          "We can do some serious walking/hiking just on Sally's property alone.",
        suggestedActivities: [
          "hike-sallys-property",
          "foliage-chelsea-vermont",
        ],
        lodging: "lodge-sallys",
        flexible: true,
      },
      {
        dayNumber: 6,
        label: "Vermont to Montreal",
        location: "Montreal, QC",
        type: "drive",
        driveTime: "2.5-3 hours (with Burlington stop)",
        notes:
          "No specific plans for Burlington, just a nice stopping place. Explore Montreal.",
        suggestedActivities: [
          "food-cold-hollow",
          "food-ben-jerrys",
          "landmark-notre-dame",
        ],
        lodging: "lodge-petit-montreal",
        flexible: true,
      },
      {
        dayNumber: 7,
        label: "Montreal Exploration",
        location: "Montreal, QC",
        type: "explore",
        notes: "Explore Montreal. Bagels, smoked meat, Mount Royal, poutine!",
        suggestedActivities: [
          "food-st-viateur",
          "food-schwartzs",
          "hike-mount-royal",
          "landmark-notre-dame",
          "food-la-banquise",
        ],
        lodging: "lodge-petit-montreal",
        flexible: true,
      },
      {
        dayNumber: 8,
        label: "Adirondacks to Saratoga",
        location: "Saratoga Springs, NY",
        type: "drive",
        driveTime: "~4 hours (with Lake Placid detour)",
        notes:
          "Drive to Saratoga Springs via Lake Placid (optional). Fly out of Albany.",
        suggestedActivities: ["foliage-lake-placid", "drive-whiteface"],
        lodging: "lodge-adelphi-saratoga",
        flexible: true,
      },
      {
        dayNumber: 9,
        label: "Departure",
        location: "Albany, NY",
        type: "departure",
        notes:
          "Fly home from Albany—or drive back east toward Stockbridge/Boston.",
        suggestedActivities: [],
        flexible: true,
      },
    ],

    // Alternatives suggested in the original document
    alternatives: [
      {
        name: "Berkshires Finish",
        description:
          "Continue to Stockbridge, MA for Ice Glen & Laura's Tower hikes before returning to Boston",
        modifiesDay: 8,
        activities: ["hike-ice-glen"],
        flyOut: "Boston (BOS)",
      },
      {
        name: "Finger Lakes Extension",
        description:
          "Explore the Finger Lakes area for wineries and waterfalls",
        addsDays: 1,
        activities: [],
        flyOut: "Albany (ALB)",
      },
    ],
  },

  {
    id: "coastal-lobster",
    name: "Coastal Lobster Focus",
    emoji: "🦞",
    source: "research",
    description:
      "More time on the Maine coast, maximize lobster consumption, skip the Montreal detour.",
    duration: "6-7 days",
    totalMiles: "~450 miles",
    driveTime: "~10 hours total",
    flyIn: "Boston (BOS)",
    flyOut: "Boston (BOS)",
    vibe: "Slow and savory, harbor-hopping",
    bestFor: ["Lobster lovers", "Coastal vibes", "Less driving"],
    countries: ["USA"],
    states: ["MA", "NH", "ME", "VT"],

    days: [
      {
        dayNumber: 1,
        label: "Arrive Boston",
        location: "Boston, MA",
        type: "arrival",
        notes: "Arrive and immediately get lobster at Neptune Oyster.",
        suggestedActivities: ["lobster-neptune"],
        lodging: "lodge-godfrey-boston",
        flexible: true,
      },
      {
        dayNumber: 2,
        label: "Southern Maine Coast",
        location: "Boston → Kennebunkport, ME",
        type: "drive",
        driveTime: "1.5-2.5 hours",
        notes: "Take the slow coastal Route 1, hit every harbor town.",
        suggestedActivities: [
          "town-portsmouth",
          "lobster-chauncey",
          "town-ogunquit",
          "hike-marginal-way",
          "town-kennebunkport",
          "lobster-clam-shack",
        ],
        flexible: true,
      },
      {
        dayNumber: 3,
        label: "Portland Food Day",
        location: "Kennebunkport → Portland, ME",
        type: "drive",
        driveTime: "30 min",
        notes: "All the lobster spots, all the foodie destinations.",
        suggestedActivities: [
          "lobster-eventide",
          "town-portland-old-port",
          "food-duckfat",
          "lobster-highroller",
          "landmark-portland-head-light",
          "lobster-bite-into",
        ],
        lodging: "lodge-press-portland",
        flexible: true,
      },
      {
        dayNumber: 4,
        label: "Northern Maine Coast",
        location: "Portland → Camden, ME",
        type: "drive",
        driveTime: "2 hours",
        notes: "Optional extension north for McLoons and Camden.",
        suggestedActivities: [
          "lobster-mcloons",
          "town-camden",
          "hike-mount-battie",
        ],
        flexible: true,
      },
      {
        dayNumber: 5,
        label: "Mountains & Vermont",
        location: "Camden → Chelsea, VT",
        type: "drive",
        driveTime: "4 hours",
        notes: "Cut across to Vermont for fall colors.",
        suggestedActivities: ["drive-kancamagus", "hike-sallys-property"],
        lodging: "lodge-sallys",
        flexible: true,
      },
      {
        dayNumber: 6,
        label: "Return to Boston",
        location: "Chelsea → Boston, MA",
        type: "drive",
        driveTime: "2.5 hours",
        notes: "Head back to Boston for departure.",
        suggestedActivities: [],
        flexible: true,
      },
      {
        dayNumber: 7,
        label: "Departure",
        location: "Boston, MA",
        type: "departure",
        notes: "Fly home from Boston.",
        suggestedActivities: [],
        flexible: true,
      },
    ],

    alternatives: [],
  },

  {
    id: "foliage-chaser",
    name: "Foliage Chaser Route",
    emoji: "🍁",
    source: "research",
    description:
      "Optimized for peak fall colors. Chase the foliage up the mountains.",
    duration: "6-7 days",
    totalMiles: "~600 miles",
    driveTime: "~12 hours total",
    flyIn: "Boston (BOS)",
    flyOut: "Albany (ALB)",
    vibe: "Leaf-peeping paradise, hiking focused",
    bestFor: ["Fall color enthusiasts", "Hikers", "Photographers"],
    countries: ["USA"],
    states: ["MA", "NH", "VT", "NY"],

    days: [
      {
        dayNumber: 1,
        label: "Arrive Boston",
        location: "Boston, MA",
        type: "arrival",
        suggestedActivities: ["landmark-freedom-trail"],
        lodging: "lodge-godfrey-boston",
        flexible: true,
      },
      {
        dayNumber: 2,
        label: "White Mountains",
        location: "Boston → North Conway, NH",
        type: "drive",
        driveTime: "2.5 hours",
        notes: "Peak foliage at elevation! The Kancamagus is THE place.",
        suggestedActivities: [
          "drive-kancamagus",
          "foliage-hancock-overlook",
          "hike-sabbaday-falls",
          "landmark-albany-covered-bridge",
        ],
        flexible: true,
      },
      {
        dayNumber: 3,
        label: "Vermont Colors",
        location: "North Conway → Chelsea, VT",
        type: "drive",
        driveTime: "2 hours",
        suggestedActivities: [
          "hike-sallys-property",
          "foliage-chelsea-vermont",
          "drive-route-100",
        ],
        lodging: "lodge-sallys",
        flexible: true,
      },
      {
        dayNumber: 4,
        label: "Vermont Exploration",
        location: "Chelsea, VT",
        type: "explore",
        suggestedActivities: [
          "hike-sallys-property",
          "food-cold-hollow",
          "food-ben-jerrys",
        ],
        lodging: "lodge-sallys",
        flexible: true,
      },
      {
        dayNumber: 5,
        label: "Adirondacks Peak",
        location: "Chelsea → Lake Placid, NY",
        type: "drive",
        driveTime: "2.5 hours",
        notes: "Adirondacks peak early—huge foliage payoff!",
        suggestedActivities: ["foliage-lake-placid", "drive-whiteface"],
        lodging: "lodge-mirror-lake-inn",
        flexible: true,
      },
      {
        dayNumber: 6,
        label: "Saratoga & Departure",
        location: "Lake Placid → Saratoga → Albany",
        type: "drive",
        driveTime: "2 hours",
        suggestedActivities: [],
        flexible: true,
      },
    ],

    alternatives: [],
  },

  {
    id: "city-culture",
    name: "Cities & Culture Route",
    emoji: "🏙️",
    source: "research",
    description:
      "Focus on Boston and Montreal with light scenic driving in between.",
    duration: "6-7 days",
    totalMiles: "~500 miles",
    driveTime: "~9 hours total",
    flyIn: "Boston (BOS)",
    flyOut: "Montreal (YUL)",
    vibe: "Urban exploration with countryside breaks",
    bestFor: ["City lovers", "Food & culture", "Less hiking"],
    countries: ["USA", "Canada"],
    states: ["MA", "ME", "VT", "QC"],

    days: [
      {
        dayNumber: 1,
        label: "Arrive Boston",
        location: "Boston, MA",
        type: "arrival",
        suggestedActivities: ["lobster-neptune"],
        lodging: "lodge-godfrey-boston",
        flexible: true,
      },
      {
        dayNumber: 2,
        label: "Boston Deep Dive",
        location: "Boston, MA",
        type: "explore",
        suggestedActivities: ["landmark-freedom-trail"],
        lodging: "lodge-godfrey-boston",
        flexible: true,
      },
      {
        dayNumber: 3,
        label: "Portland Day Trip",
        location: "Boston → Portland → Boston or Burlington",
        type: "drive",
        driveTime: "2 hours each way",
        suggestedActivities: [
          "town-portland-old-port",
          "lobster-eventide",
          "food-duckfat",
        ],
        flexible: true,
      },
      {
        dayNumber: 4,
        label: "Vermont Crossing",
        location: "Boston → Burlington, VT",
        type: "drive",
        driveTime: "3.5 hours",
        suggestedActivities: ["food-cold-hollow"],
        flexible: true,
      },
      {
        dayNumber: 5,
        label: "Montreal Arrival",
        location: "Burlington → Montreal, QC",
        type: "drive",
        driveTime: "1.5 hours",
        suggestedActivities: ["landmark-notre-dame"],
        lodging: "lodge-petit-montreal",
        flexible: true,
      },
      {
        dayNumber: 6,
        label: "Montreal Full Day",
        location: "Montreal, QC",
        type: "explore",
        suggestedActivities: [
          "food-st-viateur",
          "food-schwartzs",
          "hike-mount-royal",
          "food-la-banquise",
        ],
        lodging: "lodge-petit-montreal",
        flexible: true,
      },
      {
        dayNumber: 7,
        label: "Departure",
        location: "Montreal, QC",
        type: "departure",
        notes: "Fly home from Montreal.",
        suggestedActivities: [],
        flexible: true,
      },
    ],

    alternatives: [],
  },

  {
    id: "girls-michigan",
    name: "Girls Trip to Michigan",
    emoji: "🌊",
    source: "Girls Trip to Michigan.docx",
    description:
      "A cohesive Michigan road trip plan (with optional Canada detour) imported from the original planning document.",
    duration: "8 days",
    totalMiles: "TBD",
    driveTime: "TBD",
    flyIn: "Chicago (meet-up)",
    flyOut: "Chicago (return) or flexible",
    vibe: "Lakes, dunes, wineries, and island bikes",
    bestFor: ["Friends trip", "Scenic drives", "Food + towns"],
    countries: ["USA", "Canada"],
    states: ["IL", "MI", "ON"],

    days: [
      {
        dayNumber: 1,
        label: "Chicago → Ludington",
        location: "Chicago, IL → Grand Rapids → Ludington, MI",
        type: "drive",
        notes:
          "Converge in Chicago (Aug 28/29). Pick up rental car Aug 29; load up and leave by 2:00 PM (earlier preferred).\n\nStops: Grand Rapids (~3h 18m), then Ludington (~1h 45m).\nLudington ideas: climb lighthouse, Pine Village, Port Museum, kayak on the lake.\nOvernight in Ludington is optional depending on departure time.\n\nSee 'Michigan Trip – Logistics & Costs' item for full booking/budget details.",
        suggestedActivities: [
          "mi-logistics-costs",
          "mi-doc-image-01",
          "mi-doc-image-02",
          "mi-avis-canada-insurance-card",
          "mi-city-chicago",
          "mi-city-grand-rapids",
          "mi-town-ludington",
          "mi-ludington-lighthouse",
        ],
        flexible: true,
      },
      {
        dayNumber: 2,
        label: "Sleeping Bear Dunes → Traverse City",
        location: "Ludington, MI → Sleeping Bear Dunes → Traverse City, MI",
        type: "drive",
        notes:
          "Sleeping Bear Dunes (~2h). NEED PASS per car ($25).\nFor <3 hour visit: Pierce Stocking Scenic Drive (7-mile), Dune Climb, Glen Haven + Maritime Museum, Loon Lake.\n\nTraverse City (~38m): wineries/distilleries, city trail, tour town, lighthouse, eat well.\nOvernight suggestion: Traverse City.",
        suggestedActivities: [
          "mi-sleeping-bear-pass",
          "mi-sleeping-bear-dunes",
          "mi-pierce-stocking-drive",
          "mi-town-traverse-city",
          "mi-mission-point-lighthouse",
          "mi-old-mission-wine-trail",
        ],
        flexible: true,
      },
      {
        dayNumber: 3,
        label: "Torch Lake → Charlevoix → Mackinac City",
        location:
          "Traverse City, MI → Torch Lake → Charlevoix → Mackinac City, MI",
        type: "drive",
        notes:
          "Torch Lake (~40m): drive around the lake; consider Alden. Clear-bottom kayaks or a boat ride.\n\nPetoskey stone search spots:\n- Bryant Park Beach — 1097 Peninsula Dr, Traverse City, MI 49686\n- Van’s Beach — 205 Cedar St, Leland, MI 49654\n- Peterson Park — 10001 E Peterson Park Rd, Northport, MI 49670\n- Magnus Park — 901 West Lake St, Petoskey, MI 49770\n- Cross Village Beach — 100 Park Ln, Harbor Springs, MI 49740\n\nCharlevoix (~23m): lock, Castle Farms, shop town, lighthouse.\n\nMackinac City (~1h 10m): base for Mackinac Island. Suggest 2 nights.",
        suggestedActivities: [
          "mi-torch-lake",
          "mi-torch-lake-kayak",
          "mi-petoskey-bryant-park",
          "mi-petoskey-magnus-park",
          "mi-town-charlevoix",
          "mi-castle-farms",
          "mi-town-mackinaw-city",
        ],
        flexible: true,
      },
      {
        dayNumber: 4,
        label: "Mackinac Island (Day 1)",
        location: "Mackinac Island, MI",
        type: "explore",
        notes:
          "Target: 7:00 AM.\nPark at ferry dock OR call shuttle if staying within ~1.5 miles of dock.\nIf driving to ferry: arrive 30 min prior to departure (7:30 AM).\nParking: $10. Ferry: $52 per person round trip.\nFerry info: 1-800-638-9892.\n\nRide bikes, tour town, eat well. Return ~4:00–4:30 PM.",
        suggestedActivities: [
          "mi-mackinac-island",
          "mi-mackinac-bridge",
          "mi-town-mackinaw-city",
        ],
        flexible: true,
      },
      {
        dayNumber: 5,
        label: "Mackinac Island (Day 2)",
        location: "Mackinac Island, MI",
        type: "explore",
        notes:
          "Second day on the island (flex day). Repeat bikes/town/food, or pick any missed highlights.",
        suggestedActivities: ["mi-mackinac-island"],
        flexible: true,
      },
      {
        dayNumber: 6,
        label: "Frankenmuth + Small towns (+ Canada option)",
        location:
          "Mackinac City → Frankenmuth → Midland/Saginaw/Howell → (Sarnia, Canada)",
        type: "drive",
        notes:
          "Frankenmuth (~2h 50m): Little Bavaria; cute/quaint; good food?\nMidland/Saginaw/Howell (~1h–1h 30m): small livable towns (Howell noted as ‘best overall downtown’).\nOptional: Sarnia, Canada (~2h to border) overnight.",
        suggestedActivities: ["mi-town-frankenmuth", "mi-town-howell", "mi-town-sarnia"],
        flexible: true,
      },
      {
        dayNumber: 7,
        label: "Windsor (optional) → Detroit",
        location: "(Sarnia) → Windsor, ON → Detroit, MI",
        type: "drive",
        notes:
          "Optional: Windsor, Canada (~2h to border).\nDetroit: meet Julia downtown? Overnight at Julia’s.",
        suggestedActivities: ["mi-town-windsor", "mi-city-detroit"],
        flexible: true,
      },
      {
        dayNumber: 8,
        label: "Ann Arbor → Kalamazoo → Home",
        location: "Detroit, MI → Ann Arbor → Kalamazoo → Home",
        type: "drive",
        notes:
          "Ann Arbor stop (optional).\nKalamazoo (~1h 46m) for a driving break.\nHome (~3h).",
        suggestedActivities: ["mi-city-ann-arbor", "mi-city-kalamazoo", "mi-city-chicago"],
        flexible: true,
      },
    ],

    alternatives: [],
  },

  {
    id: "blank-canvas",
    name: "Start From Scratch",
    emoji: "✨",
    source: "custom",
    description:
      "Build your own adventure! Start with a blank slate and add whatever you want.",
    duration: "You decide",
    totalMiles: "TBD",
    driveTime: "TBD",
    flyIn: "Your choice",
    flyOut: "Your choice",
    vibe: "Complete freedom",
    bestFor: ["Control enthusiasts", "Unique trips", "Customizers"],
    countries: [],
    states: [],

    days: [
      {
        dayNumber: 1,
        label: "Day 1",
        location: "",
        type: "custom",
        suggestedActivities: [],
        flexible: true,
      },
      {
        dayNumber: 2,
        label: "Day 2",
        location: "",
        type: "custom",
        suggestedActivities: [],
        flexible: true,
      },
      {
        dayNumber: 3,
        label: "Day 3",
        location: "",
        type: "custom",
        suggestedActivities: [],
        flexible: true,
      },
    ],

    alternatives: [],
  },
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
