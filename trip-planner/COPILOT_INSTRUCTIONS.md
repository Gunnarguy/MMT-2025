# Copilot Instructions: MMT-2025 Trip Planner

## Ground Rules
1. **Honor `MMTrip.txt`.** That document remains the source of truth for the Mom's Route deck.
2. **Do not break the builder.** Changes to `TripBuilderView` must preserve day planning, routing, and custom places.
3. **Keep data in data files.** New narrative copy goes in `src/data/momsRoute.js`, not hardcoded JSX.
4. **Reuse utilities.** Use helpers in `src/utils` and `src/hooks` instead of duplicating logic.
5. **Stay on-brand.** Warm, autumnal palette + expressive typography defined in `styles/app.css` and `styles/moms-route.css`.

## Where to Work
- **Mom's Route deck:** `src/components/MomsRouteView.jsx` + `src/styles/moms-route.css`
- **Builder UI:** `src/components/TripBuilderView.jsx` + subcomponents (`DayPlanner`, `DayBoard`, `TripToolsPanel`)
- **Data:** `src/data/catalog.js`, `src/data/templates.js`, `src/data/momsRoute.js`
- **Routing:** `src/hooks/useRoutes.js`
- **Calendar export:** `src/utils/icsUtils.js`
- **Persistence:** `src/utils/storage.js`

## Review Checklist
- Mom's Route deck still reads like a narrative travel guide.
- Builder can create, edit, and reuse custom places.
- Map routing still works and shows totals.
- New copy is stored in data files.
- Responsive layout works at 375px, 768px, 1024px.
