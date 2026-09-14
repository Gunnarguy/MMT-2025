# Current State

Updated: 2026-09-14 (trip day 0, arrival night)
Branch/worktree: main (no worktrees)
Last verified commit: 80fe470 (built, deployed; served hash `assets/index-4e5R1wwj.js`). Six files are
uncommitted on top of it (see Working Set); they lint and build but are not yet pushed.

Older notes: [MOBILE.md](MOBILE.md) (offline saving, map access) and [ROUTE-OPTIONS.md](ROUTE-OPTIONS.md)
(SkyBridge comparison, live weather).

## Objective

Refresh the Town Scout housing and cost-of-living figures in `trip-planner/src/data/relocation.js`
to the most recent, best-sourced data (user request 2026-09-14: "realistic numbers rooted in
absolute realism and real estate"), then push. Objective 1 of the session, the design unification
of the field guide, shipped in 80fe470 and is live.

## Status

Research is in flight, nothing from it has landed in the data file. Four background research agents
(batches A-D, four places each) write `scout-research-{A,B,C,D}.json` to the session scratchpad;
none had finished when this was written. The code that will display the new fields is edited and
uncommitted. A verification brief and a tested patch script are ready in the scratchpad.

## Completed

- 80fe470 (live): token aliases in `tokens.css`, hexes replaced by tokens, tabs reordered as pills,
  `TripPill`/`HeroLive` leaf clock components, `WeatherStrip` compact forecast, day-page reorder,
  quiet offline status line, 44px targets. Docs/ai/STATE.md history in git if needed.
- Uncommitted prep (all lint-clean, `npm run build` -> `✓ built in 1.30s`):
  - `src/lib/money.js`: `MORTGAGE_RATE` 0.0666 -> 0.0676 (Freddie Mac PMMS 30-yr, week of
    2026-09-10, fetched from freddiemac.com/pmms this session), plus `MORTGAGE_RATE_LABEL` and
    `MORTGAGE_RATE_ASOF`; the rate text in `YourMoney.jsx`, `ScoutMatrix.jsx`,
    `scripts/matrix-artifact.jsx` and the `relocation.js` header comment now say 6.76%.
  - `ScoutView.jsx`: `["housing", "🏠 Buying here, realistically"]` added first in
    `WORKUP_SECTIONS`; footer prints `SCOUT_META.refreshed` when present.
  - `ScoutMatrix.jsx`: money columns `rent` (`t.money.rent2br`, sub `t.money.rentNote`) and
    `rentShare` (verdict key `rentVerdict`); `rowFor` exposes `rent2br`, `rentShare`, `rentNote`.
  - `YourMoney.jsx` `moneyFor`: returns `rentNote`, `rentShare`, `rentVerdict`.

## Active Constraints

- `CLAUDE.md`: no figure in `relocation.js` without a source and a date; comparisons stay one
  matrix with Campbell pinned. The research brief enforces: every figure has a period and a fetched
  URL or is "NOT FOUND"; geography named; sold vs list vs ACS never blended.
- `comfort` strings (e.g. "$106k in town") come from a fuller basket the repo does not reproduce;
  `ScoutMatrix` parses them with `/\$(\d+)k/`. Do not recompute from `costs.basketTotal` (it gives
  ~$94k for Grand Rapids, not $106k). If a median moves more than 5%, adjust marginally:
  Δcomfort ≈ 12 × ΔownMonthly / 0.65 / 0.70, rounded to $1k, and say so in the housing rows.
- Leaf clock rule from 80fe470 still holds: only `TripPill`, `HeroLive`, `TodayView` and the
  weather components call `useTripWeather()`.

## Working Set

| File | Why it matters |
|---|---|
| `trip-planner/src/data/relocation.js` | Target of the refresh; only the header comment (6.76%) changed so far |
| `<scratchpad>/scout-brief.md`, `scout-priors.json` | The research contract and the 2026-08-28 figures per town |
| `<scratchpad>/scout-verify-brief.md` | The adversarial verification contract (severity vocabulary, fills) |
| `<scratchpad>/scout-patch.py` | Patches `relocation.js` from a curated `scout-final.json`; dry-run passed twice on a copy (idempotent, node-importable) |
| `trip-planner/src/components/ScoutView.jsx`, `ScoutMatrix.jsx`, `YourMoney.jsx` | Display the new `workup.housing` rows and `money.rent2br` |
| `trip-planner/src/lib/money.js` | Mortgage rate constant and labels |

`<scratchpad>` = `/private/tmp/claude-501/-Users-gunnarhostetler-Documents-GitHub-MMT-2025/a0523a14-7822-488e-aacb-6ab39ee85b4b/scratchpad`
(session-scoped; if it is gone, the brief's rules above are the contract and research must be rerun).

## Verification

From `trip-planner/`, every line observed this session:
- `npx --no-install eslint src` -> clean (after each edit, last run after the money.js change).
- `npm run build` -> `✓ built in 1.30s` (uncommitted tree).
- `node --test scripts/trip-weather.test.mjs scripts/offline-guide.test.mjs
  scripts/map-label-layout.test.mjs scripts/map-point-details.test.mjs` -> `# pass 18 # fail 0`
  (run against the 80fe470 tree; not rerun since the Scout code edits).
- 80fe470 deploy: `gh run watch 34867068042 --exit-status` -> success; served hash changed from
  `assets/index-B2imaOJM.js` to `assets/index-4e5R1wwj.js`.
- Patch script dry run: two consecutive runs on a scratch copy produced one `housing` section per
  patched town and the copy imported under node with the merged values.

## Blockers / Unknowns

- Research results are not in yet. Check `ls <scratchpad>/scout-research-*.json`. Partial batches
  are usable on their own; a missing batch means those towns keep the 2026-08-28 figures and the
  footer must not claim a full refresh for them.
- Five hotel confirmation numbers are still `conf: null` in `src/data/lodging.js` (needs the user).

## Exact Next Action

When `scout-research-{A,B,C,D}.json` exist: launch two verification agents with
`scout-verify-brief.md` (V1 on A+B -> `scout-verify-1.json`, V2 on C+D -> `scout-verify-2.json`).
Then curate `scout-final.json` per town: accept a research value only when it has a period and a
URL and verification did not mark it fabricated/mislabelled/implausible; write `money.medianPrice`,
`money.priceNote`, `money.countyPrice`, `money.rent2br`, `money.rentNote`, the `median` string,
`costs.*` where a newer dated figure exists, and `workup.housing` rows each ending "· <period> ·
<source domain>", plus `{"id":"META","refreshed":"2026-09-14","refreshMethod":"..."}`. Run
`python3 <scratchpad>/scout-patch.py <scratchpad>/scout-final.json`, then from `trip-planner/`:
`npx --no-install eslint src && npm run build && node --test scripts/*.test.mjs`, commit, push,
`gh run watch ... --exit-status`, and confirm the served hash moved off `assets/index-4e5R1wwj.js`.
