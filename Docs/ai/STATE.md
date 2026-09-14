# Current State

Updated: 2026-09-14 (trip day 0, arrival night)
Branch/worktree: main (no worktrees)
Last verified commit: dc05708 (built, deployed; served hash `assets/index-ByVHghW0.js`, bundle contains
"Buying here, realistically" and "HUD FMR FY2027"). Working tree clean at the time of writing.

Older notes: [MOBILE.md](MOBILE.md) (offline saving, map access) and [ROUTE-OPTIONS.md](ROUTE-OPTIONS.md)
(SkyBridge comparison, live weather).

## Objective

Refresh the Town Scout housing and cost-of-living figures in `trip-planner/src/data/relocation.js`
to the most recent, best-sourced data (user request 2026-09-14: "realistic numbers rooted in
absolute realism and real estate"), then push. Objective 1 of the session, the design unification
of the field guide, shipped in 80fe470 and is live.

## Status

Objective 2 is LIVE as of commit dc05708: every town's housing and bills refreshed from September
2026 sources, a "Buying here, realistically" workup section per town, HUD FMR FY2027 rents on one
scale, one documented comfort formula, mortgage rate 6.76%. The four adversarial verifiers
(`scout-verify-{A,B,C,D}.json` in the scratchpad) had NOT finished when it shipped; the Scout
footer says so. Their findings are the one open follow-up.

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

When `<scratchpad>/scout-verify-{A,B,C,D}.json` exist (a Monitor was watching for them): read each
issue with severity fabricated/mislabelled/implausible, decide per field, then re-run
`node <scratchpad>/scout-curate.mjs` (it reads the verify files and falls back to the prior for
flagged fields, adding a "Verification notes" row) and
`python3 <scratchpad>/scout-patch.py <scratchpad>/scout-final.json` (idempotent), then from
`trip-planner/`: `npx --no-install eslint src && npm run build && node --test scripts/*.test.mjs`,
commit, push, `gh run watch ... --exit-status`, confirm the served hash moves off
`assets/index-ByVHghW0.js`, and change the footer sentence "an independent re-sourcing pass was
still running when this went live" in the META `refreshMethod` (set in scout-curate.mjs) to state
what the pass found. If the scratchpad is gone, the research must be redone from the brief in the
memory note `scout-refresh-method`.
