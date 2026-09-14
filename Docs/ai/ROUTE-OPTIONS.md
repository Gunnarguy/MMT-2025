# Thursday route exploration — September 13, 2026

The user asked to explore Traverse City → SkyBridge → Mackinaw City in place of
the coastal towns, and whether rain would affect the entire September 14–21 trip.

## Implementation boundary

- Thursday's page has a comparison table, road map and sample schedule for three
  routes. Selecting one only changes the comparison. Original itinerary data,
  Mom's wording, main map, Today timeline, calendar, dispatches, hotels, budget,
  and Town Scout remain unchanged.
- Links to the comparison appear in Today and Day by day.
- Follow-up request: weather must update throughout the trip. Pack, Today, day
  pages and map weather pins now share automatically refreshed Open-Meteo data.
  There are 19 locations including Canada, both Thursday routes and the return.
- Publication uses the existing GitHub Pages workflow. Verify the workflow and
  served asset hash before claiming live status.
- `trip-planner/README.md` documents the two scoped refresh commands.

## Route evidence

`thursdayGeometry.json` stores three OSRM responses using identical town-center
endpoints and SkyBridge's official directions coordinate. Source URLs and
capture time are retained. Driving excludes parking, stops and live traffic.

| Route | Road miles | Model minutes | Display estimate |
| --- | ---: | ---: | --- |
| Via Charlevoix and Petoskey | 102.8 | 157 | 2h 35m |
| Via SkyBridge then I-75 | 119.3 | 168 | 2h 50m |
| Via SkyBridge and Petoskey | 111.7 | 170 | 2h 50m |

Times round to the nearest five minutes. SkyBridge + Petoskey retains the
stone hunt and lakeside lunch for nearly the same driving as the direct route;
Charlevoix and the Mushroom Houses are the loss. All routes retain Mackinaw
City's two nights and Friday's island day.

[Boyne's official page](https://www.boynemountain.com/skybridge-michigan), checked
September 13, lists September 11–October 2 hours as daily 11 AM–6:30 PM.
Chairlift access is included. Rain is permissible with adequate visibility;
operating wind limit is 35 mph, with thunder/lightning closure within 15 miles.
The date-specific ticket checkout returned HTTP 403 to the research fetch, so no
admission price is claimed or added to the budget. The suggested visit length
and schedule are planning allowances, not sourced operating guarantees.

## Weather evidence

Initial research used NWS data captured September 13 at 11:31 PM EDT.
Daytime probabilities: Grand Rapids 60%, Ludington 57%, Wednesday dunes 4%,
Thursday Boyne 23%, Friday island 23%, Saturday Frankenmuth 43%, Saturday Port
Huron 41%, Sunday Detroit 40%. Return Monday was outside the published window.
Port Huron is labeled as the US approach, not a Canadian forecast.

The follow-up replaced that frozen snapshot with automatically refreshed
Open-Meteo models, which cover US and Canadian locations through the entire
trip. The initial NWS figures above are historical research receipts, not the
current app forecast. Search results with March/May dates were discarded as stale.

The browser refreshes on load, every 15 visible minutes, on focus/visibility and
reconnection (one-minute event throttle). Manual refresh is available. Daily,
hourly and current model estimates are separate, with location-local dates and
timestamps. Rain percentages use the provider's maximum hourly probability.
No model issue time is invented. Failure preserves the last successful local
cache; data over an hour old is labeled. The service worker excludes weather
responses and uses network-first navigation to pick up new releases.

The bundled fallback stores daily/current data; the first successful browser
request caches hourly data too. `tripForecast.json` uses version 2. The optional
refresh script regenerates this bundled seed, not the running app's updates.

## Existing discrepancy found during the review

`src/data/lodging.js` lists Brio Beach Inn for Traverse City, while the Wednesday
check-in stop in `src/data/trip.js` names Bayshore Resort. This task did not
resolve or change the booking. Comparison geometry uses town centers so it does
not rely on either hotel being correct.

## Validation

Changed JavaScript passed ESLint and production build. Browser checks covered
all three route selections, waypoint changes in the navigation link, forecast
rows, Today links, and layouts at narrow and wide browser sizes. The weather
follow-up has eight focused tests covering timezone boundaries, null values,
deduplication, network errors/retry, partial failures, storage failures, refresh
lifecycle, service-worker bypass, and complete trip-date coverage. A real browser
request returned fresh weather for the full route without console errors.
