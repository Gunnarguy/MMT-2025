# Michigan '26 — Field Guide

A read-first travel guide for one specific trip: **Palatine, Illinois → the Lake
Michigan shore → Mackinac Island → Ontario → Detroit → home, September 14–21, 2026.**
Three travellers, one rented car, seven nights.

**Live:** https://gunnarguy.github.io/MMT-2025/

## What this is

Mom wrote a planning document. This is that document, verified and turned into
something you can actually use from the passenger seat: tap-to-call hotels,
tap-to-navigate addresses, real drive times, and — most usefully — a running list
of the places that are **closed on the day you planned to be there**.

Every non-obvious claim carries a source link. Where the app and the original
document disagree, the app says so out loud and shows Mom's original wording
verbatim in a "From Mom's document" block. It never silently overwrites her.

## What this deliberately is not

The previous version of this repo was a general-purpose trip *builder* —
drag-and-drop days, a 2,000-line place catalog, saved templates, Supabase
realtime sync, and an email login wall. Nobody used it. The itinerary was
already settled; the machinery was solving a problem that didn't exist.

So: no accounts, no database, no sync, no backend. Checkboxes, preferences and
the last successful weather download persist locally in `localStorage`. The itinerary lives in
`src/data/` as plain JavaScript — to change the trip, edit the data file.

## Running it

```bash
npm install
npm run dev
```

## Layout

```
src/
├── data/
│   ├── trip.js              # Days, stops, drive legs, flags — the itinerary
│   ├── lodging.js           # The five booked properties
│   ├── budget.js            # Every known and estimated cost
│   ├── border.js            # Canada crossing brief
│   ├── pack.js              # Weather normals, prep tasks, packing list
│   └── routeGeometry.json   # GENERATED — road-following map lines
├── components/              # One file per view, plus shared bits.jsx
├── styles/                  # tokens → base → shell → components → itinerary → views
├── hooks/useLocalState.js   # localStorage-backed state + checklists
└── lib/format.js            # Dates, durations, money, tel:/maps: links
```

## Regenerating the map lines

`src/data/routeGeometry.json` holds the real driving geometry for each day so the
map doesn't draw straight lines between towns. It's committed, so the published
site needs no routing service. Re-run only if the waypoints change:

```bash
node scripts/build-route-geometry.mjs
```

## Thursday alternatives and automatically updating weather

Thursday (`#/day/d3`) includes an exploratory route comparison: the original
coastal towns, SkyBridge then I-75, or SkyBridge then Petoskey. Selecting a row
changes only the comparison map and sample schedule. It does not adopt the
alternative in Today, calendar exports, dispatches, the main map or the budget.
Mom's original itinerary stays intact. Both SkyBridge options keep the existing
Mackinaw City nights and Friday island day.

The comparison uses the same town-center endpoints for all three routes, with
road miles and driving estimates from OSRM. Stop time and live traffic are
excluded. Update its waypoints in `src/data/thursdayOptions.js`, then run:

```bash
node scripts/build-thursday-geometry.mjs
```

Pack (`#/pack`), Today, every day page and the map weather pins share one
automatically refreshed Open-Meteo forecast store for 19 US and Ontario locations.
It fetches on opening, every 15 minutes while visible, on return/focus, and when
connectivity resumes. Rapid repeat events are coalesced within a minute; manual
Refresh bypasses that throttle. No API key, geolocation, account or backend is used.

Current model estimates, daily highs/lows and hourly precipitation/wind are
separate. The daily rain probability is the maximum hourly probability, not
an all-day event probability. Sources and valid/fetch times are displayed;
the provider does not expose a model issue timestamp on this endpoint.

The device caches the last successful download. Errors preserve its timestamps;
partial failures preserve the affected locations. Offline/stale data is labeled.
Weather API calls bypass both the HTTP and service-worker caches. Historical
seasonal averages and Town Scout climate research remain explicitly historical.
Completed trip dates are labeled saved forecasts, never observations.

`tripForecast.json` is a small bundled daily/current fallback. Hourly detail
caches after a successful browser refresh. To refresh that initial fallback:

```bash
node scripts/update-trip-forecast.mjs
```

Run `node --test scripts/trip-weather.test.mjs` for networking, cache, timezone,
refresh lifecycle and service-worker boundary tests.

The saved JSON retains source URLs, current-condition valid times and fetch times.
SkyBridge ticket prices are not confirmed or included in the budget; check the
date-specific official checkout before buying.

## Source document

`Trip to Michigan (2026 source).docx` in the repo root is Mom's original document
and is the authority on intent. This app is the authority on hours, prices, and
whether a thing is open.

## iPhone and offline access

The guide supports portrait and landscape, including the iPhone 16 Pro Max's
440 × 956 CSS-pixel layout. All sections are available through the phone's
horizontally scrollable section tabs. The map toolbar sits outside the canvas, map points and
zoom/close controls have 44-pixel touch targets, and the expanded map respects
safe areas and restores page scrolling when closed. A named group shows the
number of nearby map points; tapping zooms into smaller groups and labeled places.
Markers use their source coordinates, with shared-location pins temporarily
fanned out at the closest zoom. Stop symbols indicate category, not repeated day
numbers. The Map day picker isolates a day; Whole trip restores the route.
Stops, hotels, fuel and borders appear by default. Highway, weather, Scout and
flight overlays remain available in Map layers. Find a map point searches every
marker in the active layers, including clustered points, and opens its popup. The SkyBridge comparison has tappable
points with directions, and elevation details also have a native select control.

In Safari, use Share → Add to Home Screen (Open as Web App if shown). Open that
new icon while connected and wait for **Saved for offline**. The status disclosure
checks the actual cached files and offers a retry and an update/reload action.

`build/offlinePlugin.mjs` generates a content-versioned worker with the complete
production asset list, including all JS chunks, CSS, images and app icons. The
first installation succeeds only after all files are saved. All itinerary data,
route geometry and map point details are bundled locally. The guide is about
2.7 MB unpacked. `npm run preview` uses the same `/MMT-2025/` base as Pages.

Live weather, external sites, navigation apps and new street/satellite tiles
require connectivity. The weather store retains dated fallbacks. The worker
caches only tiles actually viewed, up to 256 runtime assets, without bulk area
prefetching. Do not describe this as offline street navigation. iOS can evict
site storage; check the readiness status before losing signal.

Verification: `npm run build` then
`node --test scripts/trip-weather.test.mjs scripts/offline-guide.test.mjs`.
The latter verifies complete first-install coverage, requests without network,
missing-file detection, failed installation, cache isolation, weather bypass,
and Origin-varying module requests. See `Docs/ai/MOBILE.md` for browser evidence.

Map display: **Nearby groups** uses compact area badges; **Every spot** removes
clustering and renders every active marker. **Fit all spots** includes all active
layers in its bounds. Single-line labels appear at closer zoom and use a placement
pass to reduce collisions, with leader lines for displaced labels. Geographic pins
are unchanged. Coincident points remain individually reachable through search.

Fuel locations have dated sources; the map, dispatch, border notes and calendar
now treat them as suggested stops. The guide does not know the rental's actual
fuel level or live pump prices. See `Docs/ai/MOBILE.md` for corrections and sources.

Map popups now expose the full saved visit and lodging records, with booking
caveats, phone/directions links and research sources. Optional scout points have
expandable town workups; flight, rental, border and island points include their
relevant guide context. Popup content scrolls within the phone viewport. Saved
guide facts are distinguished from current availability and live tracking.
