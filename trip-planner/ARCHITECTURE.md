# MMT-2025 Trip Planner Architecture

## Overview

The app now has two primary experiences:

1. **Mom's Route Deck** (`MomsRouteView`): a narrative, curated view based on `MMTrip.txt`.
2. **DIY Builder** (`TripBuilderView`): a planning workspace for custom trips and templates.

The app shell (`App.jsx`) owns trip state, template handling, and optional Supabase sync.

## Key Files

```
src/
├── App.jsx
├── components/
│   ├── Header.jsx
│   ├── MomsRouteView.jsx
│   ├── TripBuilderView.jsx
│   ├── CatalogPanel.jsx
│   ├── DayPlanner.jsx
│   ├── DayBoard.jsx
│   ├── MapPanel.jsx
│   ├── TripSetupPanel.jsx
│   ├── TripToolsPanel.jsx
│   ├── ActivityDetailModal.jsx
│   └── CustomPlaceModal.jsx
├── data/
│   ├── catalog.js
│   ├── templates.js
│   └── momsRoute.js
├── hooks/
│   └── useRoutes.js
├── lib/
│   ├── supabase.js
│   └── leafletConfig.js
├── styles/
│   ├── app.css
│   └── moms-route.css
└── utils/
    ├── formatters.js
    ├── geocode.js
    ├── icsUtils.js
    ├── storage.js
    ├── templateUtils.js
    ├── timeUtils.js
    └── tripUtils.js
```

## State Flow

- `App.jsx` owns the **trip state**, **custom templates**, and **custom activities**.
- `TripBuilderView` handles builder-specific UI state (selected day, filters, modals).
- The `useRoutes` hook calculates routes, legs, and base coordinates.

## Data Sources

- `MMTrip.txt` is the source of truth for the curated route narrative.
- `templates.js` contains prebuilt itineraries.
- `catalog.js` contains activities, lodging, and metadata used across views.

## Persistence

- Local storage for trip state, custom activities, and saved templates.
- Optional Supabase realtime sync for shared planning.

## Styling

- Global layout and builder styles live in `styles/app.css`.
- The Mom's Route deck styles are isolated in `styles/moms-route.css`.
- Fonts are loaded in `index.html`.
