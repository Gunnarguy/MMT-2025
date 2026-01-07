# MMT-2025 Restructuring Report

## Status

The refactor is complete. The app is now split into a curated route view and a DIY builder, with shared data utilities and clean component boundaries.

## What Changed

- **App shell is lean**: `App.jsx` now just coordinates view switching, trip state, templates, and Supabase sync.
- **Real components**: Catalog, Day Planner, Map Panel, and modals each live in their own component files.
- **New data layer**: `momsRoute.js` captures the narrative structure of `MMTrip.txt`.
- **Utilities + hooks**: Storage, formatting, geocoding, and route fetching are now reusable.
- **Styles split**: `styles/app.css` for the builder + layout, `styles/moms-route.css` for the deck.
- **Planner depth**: Scheduling, day board drag, trip tools, calendar export, and map/forecast links are now included.

## Current File Structure

See `ARCHITECTURE.md` for the full breakdown.

## Next Ideas

- Add optional PDF export for the Mom's Route deck.
- Add drag-and-drop between days (cross-column).
- Add collaborative comments per day with Supabase.
