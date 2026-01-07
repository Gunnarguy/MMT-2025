# MMT-2025: New England Trip Planner

A curated trip deck plus a hands-on builder for Mom and Renee's fall 2025 New England adventure. Built with React + Vite, with optional real-time sync via Supabase.

**Live Site:** https://gunnarhostetler.github.io/MMT-2025/

## Features

- **Mom's Route Deck:** A narrative, scannable view based on `MMTrip.txt` (warnings, highlights, packing, budgets, alternatives).
- **DIY Trip Builder:** Build from scratch or remix templates with day-by-day planning.
- **Custom Places Library:** Add, edit, and reuse your own places with notes, tags, and links.
- **Activity Detail Drawer:** See tips, must-try items, ratings, and tags without leaving the planner.
- **Scheduling + Day Board:** Time-block activities or drag them across days in a board view.
- **Trip Tools:** Budgets, reservations, and checklist tracking built into the planner.
- **Smart Routing:** OSRM driving routes + total distance/time estimates.
- **Live Cost Estimator:** Optional $/mile calculator on the map panel.
- **Exports + Links:** Calendar export, Google Maps routing, and quick weather lookup.
- **Realtime Sync:** Supabase integration for shared planning (optional).

## Quick Start

```bash
npm install
npm run dev
```

## Project Structure

```
trip-planner/
├── src/
│   ├── components/         # UI building blocks
│   ├── data/               # Catalogs + Mom's Route data
│   ├── hooks/              # Custom hooks (routes, etc.)
│   ├── lib/                # Supabase + Leaflet config
│   ├── styles/             # App + Mom's Route styles
│   ├── utils/              # Formatting + trip helpers
│   ├── App.jsx             # App shell and view switcher
│   └── main.jsx            # Entry point
├── supabase/               # Database migrations
└── public/
```

## Supabase Setup (Optional)

1. Run `supabase/migrations/001_mmt_tables.sql` in Supabase SQL Editor.
2. Add GitHub Secrets:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## Notes

- `MMTrip.txt` remains the authoritative route inspiration.
- Templates live in `src/data/templates.js` and can be saved locally.

---
Built with love, lobster rolls, and leaf-peeping dreams.
