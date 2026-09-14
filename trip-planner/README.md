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
