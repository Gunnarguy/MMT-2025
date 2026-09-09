# Current State

Updated: 2026-09-09
Branch/worktree: main (no worktrees)
Last verified commit: 45b116c (docs-only on top of 9ededf3, the commit that was built and deployed)

## Objective

Make the Michigan '26 field guide usable *on the road*, not just for planning. The trip runs
2026-09-14 to 2026-09-21, so the app's job changed from "should we?" to "what now?".

## Status

Complete and verified live. The app had ten tabs, all of them planning surfaces, and no view that
answered what to do today. It now has a `Today` tab, which is also the default landing route.

## Completed

- `trip-planner/src/components/TodayView.jsx` (new). Reads the local calendar date and picks the
  matching day out of `DAYS` itself. Three modes:
  - **Before 2026-09-14**: countdown plus a punch list of everything still waiting on a human,
    split into "Do before you fly" (9) and "Do on the day" (3).
  - **During the trip**: one screen per day. Drive legs with durations, stops in order, fuel stops,
    tonight's bed with address / phone / confirmation number, and tomorrow's first drive.
  - **After 2026-09-21**: a short wrap.
- `trip-planner/src/App.jsx`: `today` added as the first tab; `#/today/<dayId>` forces a specific
  day for preview; bare `#/` resolves to `today` while `daysUntil(TRIP.end) >= 0`, else `overview`.
- `trip-planner/src/components/DayPanel.jsx`: `timeline()` changed from module-private to exported
  so TodayView interleaves legs and stops by the identical rule. No behaviour change to DayPanel.
- `trip-planner/src/styles/views.css`: `.tv-*` block appended at the end.

## Active Constraints

- **The punch-list split is driven by a string format, not a field.** `punchList()` in
  TodayView.jsx classifies a `LOOSE_ENDS` entry as "do on the day" only when `e.kind === "action"`
  **and** its `when` string starts with a weekday abbreviation (`/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)/`,
  the `DATED` constant). Everything else, and every `kind: "book"`, is "do before you fly". If
  someone rewrites a `when` value in `src/data/looseEnds.js` to not lead with a weekday, that item
  silently migrates to the wrong list. Adding an explicit `doOnTheDay: true` field to the data and
  deleting `DATED` would remove the coupling.
- **Why the split exists at all** (2026-09-09): the first version sorted one flat list by the day
  each item is needed, which put the Saturday Frankenmuth dinner reservation ninth. A table booked
  the day before it is eaten is not a table. Bookings are always due now. This note should move to
  a decisions log once the repo has one; it has no `Docs/ai/DECISIONS.md` today.
- Repo rules in `CLAUDE.md` still apply, in particular: comparisons are one sortable matrix and
  never cards, and no figure lands in `src/data/relocation.js` without a source and a date.

## Working Set

| File | Why it matters |
|---|---|
| `trip-planner/src/components/TodayView.jsx` | The whole feature; `punchList()` is exported for reuse |
| `trip-planner/src/App.jsx` | Tab list, hash routing, and the date-dependent default route |
| `trip-planner/src/components/DayPanel.jsx` | Exports `timeline(day)`, shared with TodayView |
| `trip-planner/src/data/lodging.js` | **Five records still have `conf: null`.** See Blockers |
| `trip-planner/src/data/looseEnds.js` | Feeds the punch list; see the `when`-format coupling above |
| `trip-planner/src/styles/views.css` | `.tv-*` rules live at the end of the file |

## Verification

All commands run from `trip-planner/` unless noted. Every line below was observed, not assumed.

- `npx --no-install eslint src` -> clean, no output.
- `npm run build` -> `✓ built in 960ms`.
- `git push origin main` then
  `gh run watch "$(gh run list --limit 1 --json databaseId --jq '.[0].databaseId')" --exit-status`
  -> `success 9ededf3`.
- Asset hash changed, which is this repo's definition of live:
  before `assets/index-DnJj2ZKi.js`, after `assets/index-DyEj_TAD.js`.
- `curl -s https://gunnarguy.github.io/MMT-2025/assets/index-DyEj_TAD.js | grep -o ...`
  -> `Do before you fly`, `Do on the day`, `No confirmation number`. The feature is in the
  served bundle, not only in the local build.
- Browser DOM checks against the dev server on port 5174 (`.claude/launch.json` target
  `michigan-26`), not screenshots, because the Browser pane renders 0x0 while hidden:
  - `#/today` -> h1 `5 days until wheels up`; two sections, `Do before you fly 9` and
    `Do on the day 3`; the three counter/clock tasks are the only ones in the second list.
  - `#/today/d5` -> `298 miles`, `5h 30m driving`, `7:45 PM sunset`, 9 rail items (3 legs +
    6 stops), 2 fuel stops, tonight = Four Points by Sheraton Sarnia showing
    `No confirmation number`, tomorrow = `You have to pick one`.
  - 375px viewport -> `document.documentElement.scrollWidth > innerWidth` is false, so no
    horizontal overflow on a phone.

Not verified: the during-trip mode has never run against a real system clock, only via the
`#/today/<dayId>` override. The date branch itself is one `DAYS.find` on `todayIso()`, so the risk
is low, but it is untested until 2026-09-14.

## Blockers / Unknowns

- **Five hotel confirmation numbers are still `conf: null`** in `src/data/lodging.js`: `ludington`,
  `traverse-city`, `mackinaw-city`, `sarnia`, `belleville`. This is the one open data gap and it
  needs the user, who has to read them off the reservation emails. CBSA asks where you are staying
  at the Blue Water Bridge on 2026-09-19. TodayView, StaysView and MorningDispatch all already
  render a loud fallback when the field is null, so nothing is broken, it is just unanswered.
- **Frankenmuth Oktoberfest 2026 dates are unverified.** `frankenmuthfestivals.com` was fetched
  2026-09-09 and publishes no 2026 dates. The claim in `src/data/trip.js` that Sat 2026-09-19 is
  peak Oktoberfest weekend comes from the August research round and was not reconfirmed. Verify by
  phone: Bavarian Inn, 989-652-9941.
- Offline behaviour is partial by design. `public/sw.js` precaches only `./`, `index.html` and
  `manifest.json`, then stale-while-revalidates every other GET, so the app and its data cache
  after one full load but Leaflet tiles cache only for areas actually panned over.

## Exact Next Action

Ask the user for the five confirmation numbers, then set the `conf` field on each of the five
records in `trip-planner/src/data/lodging.js` (currently `conf: null` on ids `ludington`,
`traverse-city`, `mackinaw-city`, `sarnia`, `belleville`). It is a data-only edit: no component
changes are needed, because `TodayView`'s `Tonight` section, `StaysView` and
`visuals/MorningDispatch` all read `LODGING[].conf` and already branch on null. Then run
`cd trip-planner && npx --no-install eslint src && npm run build`, push, and confirm the served
asset hash changed away from `assets/index-DyEj_TAD.js`.

If the user does not have the numbers to hand, there is no other active objective. Do not invent
one; the Today tab objective is finished and verified.
