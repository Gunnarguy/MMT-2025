# Michigan '26 — Field Guide

A read-first travel guide for one specific trip: **Palatine, Illinois → the Lake
Michigan shore → Mackinac Island → Ontario → Detroit → home, September 14–21, 2026.**
Three travellers, one rented car, seven nights.

**Live:** https://gunnarhostetler.github.io/MMT-2025/

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

So: no accounts, no database, no sync, no backend. The only state that persists
is which checkboxes you've ticked, in `localStorage`. The itinerary lives in
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

## Source

`Trip to Michigan (2026 source).docx` in the repo root is Mom's original document
and is the authority on intent. This app is the authority on hours, prices, and
whether a thing is open.
