# Mom's Route Tab Refresh

## Vision
Deliver a high-energy, premium-feeling single-tab experience that feels like a bespoke travel deck from Mom to Renee. The content is still the same data from `src/data/momsRoute.js`, but the presentation should feel like a *“hell yes, let’s go”* hype doc—not a spreadsheet.

## Experience Pillars
1. **Emotional Hero:** Immediate wow with a gradient/photo hero, bold title, date + foliage pills, and the “Copy to Build & Customize” CTA above the fold.
2. **Quick Orientation:** A ribbon-style timeline that shows the entire journey at a glance (Boston → Portland → … → Stockbridge) with miles, drive times, and emoji chips.
3. **Story Chapters:** Organize the tab into curated sections so users can skim (Hero → Trip Stats → Timeline → Featured Stops → Deep Dives → Foliage Radar → Budget → Packing → Alternatives).
4. **Playful Data:** All quantitative facts become colorful chips/cards (walk score badge, lobster count, peak foliage notch) instead of dense paragraphs.
5. **Micro-interactions:** Hover/expand states, subtle shadows, emoji badges, confetti tickers when a stop expands, etc.—keep everything tactile and fun.
6. **Connected Actions:** Keep the “Copy to Builder” CTA handy (hero + after deep-dive). Optionally show how many Build-tab activities currently mirror Mom’s plan.

## Content Architecture
| Section | Purpose | Notes |
| --- | --- | --- |
| Hero | Emotional hook + CTA | Use gradient background referencing Maine sunset; show theme `Lobsters • Leaves • Love`. Include countdown chip once TravelContext is wired. |
| Quick Stats Strip | Hard numbers | 5 tiles (Miles, Hours, Days, Stops, States/Provinces) w/ icons + subtle animation. |
| Traffic + Travel Tips | Urgency + context | Keep warning block but tighten copy; add badges for “Leaf-Peeping Surge”, “Weekend Red Zones”. |
| Journey Ribbon | Overview flow | Horizontal scrollable timeline with stop chips: emoji, name, nights, drive distance. Use accent color progression. |
| Featured Moments | Highlights | 3-4 hero cards (e.g., “First Lobster in Boston”, “Sally’s Vermont Retreat”, “International detour to Montreal”). Image/gradient backgrounds with quick blurbs + actions. |
| Deep Dive Cards | Full data per stop | Replace giant accordion with stacked cards. Each card contains: hero row, Mom quote bubble, quick stats badges, “Must Do” pills, lobster cards, border info when relevant, practical chips (Parking, Getting Around). Use expand/collapse for bonus sections (food scene, what to expect). |
| Map Section | Spatial context | Keep Leaflet map but add route glow + marker styling that matches new palette. Consider inset minimap preview within each stop card for mobile. |
| Foliage Radar | Seasonal intel | Two rows of chips (“Peak Windows”, “Best Drives”) with gradient backgrounds. Add “Leaf Confidence” meter referencing `momsRoute.foliage`. |
| Budget Bands | Money clarity | Three tier cards (Budget/Moderate/Luxury) with dollar ranges and iconography. Include `tips` list in a sticky note style. |
| Packing Playbook | Checklist vibes | Two columns (Essentials vs. Fun Extras) with icons. Add weather callout pill from `momsRoute.packing.weather`. |
| Alternative Routes | Optional paths | Cards for Finger Lakes + Southern NE + “Wildcards”. Include quick stats (added miles/days) + fly-out airports. |

## Visual Language
- Reuse global palette from `App.css` (primary orange, teal secondary, purple accent) + add midnight blue `#0f1d2b` for hero gradient.
- Typography: continue using Inter, but hero h1 can use `font-stretch: 110%` + letter spacing for punch.
- Backgrounds: layered gradients + subtle noise textures (SVG data URIs) for hero + featured cards.
- Chips & badges: 12px radius, bold uppercase labels, emoji icons for fast scanning.
- Motion: CSS `@keyframes floaty`, `transition: 250ms` on cards, micro-tilt on hover.

## Interaction Beats
- **Timeline Hover:** hovering a stop highlights same stop card + map marker.
- **Stop Card Expand:** Expand arrow rotates; newly revealed sections fade in sequentially (facts grid → activities → lobster list).
- **CTA Feedback:** After clicking “Copy to Builder” show a toast (“Route copied! Check Build & Customize.”) via App-level callback.
- **Scroll Anchors:** Section headings get anchored IDs so the sub-nav (if added later) can deep link.

## Technical Implementation Plan
1. **Component Structure (`src/components/MomsRouteTab.jsx`):**
   - Split into subcomponents: `Hero`, `StatsStrip`, `TrafficAlert`, `JourneyRibbon`, `FeaturedMoments`, `StopCards`, `MapSection`, `FoliageRadar`, `BudgetBand`, `PackingPlaybook`, `Alternatives`. Keep data-driven via `momsRoute` export.
   - Compute helper arrays (e.g., `ribbonStops`, `featuredMoments` gleaned from stops) at top-level for clarity.
   - Accept optional props for context metrics (`copiedCount`, etc.) later.
2. **Styling (`src/components/MomsRouteTab.css`):**
   - Rebuild with layered layout: `display: grid` for hero, `scroll-snap` timeline, `prefers-reduced-motion` guards.
   - Ensure responsive breakpoints at 768px and 1120px. Mobile timeline becomes vertical.
   - Add CSS variables for section accent colors.
3. **Interactions:**
   - Manage `expandedStop` state for cards; add `hoveredStop` for ribbon/map sync.
   - Trigger toast from parent via new optional callback `onCopySuccess` (fallback to `alert`).
4. **Map Enhancements:**
   - Add gradient polyline + drop shadow using `leaflet-polylineoffset` style (pure CSS by duplicating polyline with blur). Keep accessible fallback.
5. **Testing:**
   - Validate layout in Safari (sticky, scroll snaps), Chrome, mobile emulation.
   - Run `npm run build` and `npm run deploy` once the design stabilizes.

## Data References
- `momsRoute.overview` → hero stats, warning copy.
- `momsRoute.stops` → ribbon, featured cards, deep dives, map markers.
- `momsRoute.foliage` → radar + drives.
- `momsRoute.budget` → tiers + tips.
- `momsRoute.packing` → packing list columns.
- `momsRoute.alternatives` → alternate route cards.

## Deliverables Checklist
- [ ] New JSX structure in `MomsRouteTab.jsx` following sections above.
- [ ] Overhauled CSS with gradients, ribbons, chips, responsive behavior.
- [ ] Hooked CTA (`onCopyToBuilder`) + optional toast.
- [ ] Timeline ↔ map hover syncing (stretch goal if time allows).
- [ ] Updated screenshots for README once UI stabilizes.
