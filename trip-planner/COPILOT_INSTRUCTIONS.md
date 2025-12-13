# Copilot Instructions: Mom's Route Refresh

These instructions tell Copilot (or any assistant) how to contribute to the Mom's Route tab revamp without losing the vibe.

## Ground Rules
1. **Stay aligned with `MOMS_ROUTE_REFRESH.md`.** That document is the single source of truth for layout, tone, and interaction goals.
2. **Do not gut other tabs.** All changes should be scoped to `src/components/MomsRouteTab.jsx`, its CSS, and data glue code unless explicitly asked.
3. **Keep the data file authoritative.** If you need new fields, add them to `src/data/momsRoute.js` with clear comments; avoid hardcoding strings in JSX.
4. **Respect existing palettes + typography.** Global tokens live in `src/App.css`. Reuse them (or extend via CSS variables) instead of inventing new colors/fonts.
5. **Be mobile-first.** Check breakpoints at 375px, 768px, 1024px. Timeline must remain usable on touch.

## Implementation Steps
1. **Refactor JSX into subcomponents** (Hero, StatsStrip, Ribbon, StopCard, Map, Foliage, Budget, Packing, Alternatives). Use plain functions inside `MomsRouteTab.jsx`—no new files unless necessary.
2. **Rebuild CSS** in `src/components/MomsRouteTab.css` following the sections + visual guidance. Clean up any now-unused selectors from the previous attempt.
3. **Wire interactions:**
   - `expandedStop` state controls card reveal.
   - Add optional `hoveredStop` state shared by ribbon + map (color highlight).
   - Keep `onCopyToBuilder` prop and add optional `onCopySuccess` (toast) but guard for undefined.
4. **Testing:**
   - Run `npm run build` locally.
   - Preview via `npm run dev` on port 5174/5175.
   - Verify the GitHub Pages deploy (`npm run deploy`) once design is approved.

## Review Checklist
- [ ] Hero shows title, theme, stats, CTA, and warning chips.
- [ ] Timeline is scrollable with stop badges + drive info.
- [ ] Each stop card contains Mom quote, quick facts, activities, lobster/food info, and practical chips.
- [ ] Foliage, budget, packing, and alternatives sections match the spec in `MOMS_ROUTE_REFRESH.md`.
- [ ] Map styling matches the new accent palette and highlights the active stop.
- [ ] `npm run build` passes with zero warnings.

When in doubt, read `App-old.jsx` for the legacy energy and `MOMS_ROUTE_REFRESH.md` for the new plan before coding.
