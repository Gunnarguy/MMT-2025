# MMT-2025 workflows: notes

Written 2026-09-07 by the workflow promotion pass (read-only everywhere except the kit). The
`.js` file beside this note is installed by `install-kit.sh --repo` into
`<repo>/.claude/workflows/`; this NOTES.md is not installed.

Index of every script and run: `~/claude-audit/WORKFLOWS-INDEX.md`.

## michigan-relocation-scout.js

What it does: one web-research agent per town (15 towns on the itinerary, 13 in Michigan and 2
in Ontario) fills a strict schema where every figure needs a fetched URL and a date or is
literally "NOT FOUND"; a verifier per town re-sources the high-stakes numbers and hunts
fabrication; five statewide agents (property tax uncapping, income and fixed-cost burden,
winter, water and environment, broadband and jobs) run in parallel; one synthesis ranks the
towns and answers the cost-of-living question against a San Francisco baseline. Every agent runs
at effort "high" and must load WebSearch and WebFetch through ToolSearch first.

Why it is here: AUDIT.md 5.14 names it as one of the two proven workflows to promote. It was
killed at 2.6 minutes on 2026-08-28 (20 agents already queued) and the same research was then
redone by hand as 45 sequential `agy-job.sh` calls, so the dataset behind the trip planner has
no runnable pipeline until this file lands. Where that hand-built dataset lives was not
established by this pass; check `trip-planner/` and the README before rerunning so the output
lands in the same shape.

Last outcome: 2026-08-28, killed at 2.6 min, 20 agents, 0.31M tokens, 111 tool calls; no
result recorded.

Adjust before rerunning:
- `TODAY` is `2026-08-28`. Set it; the script cannot read the clock (Date is unavailable in
  workflow scripts) and every prompt quotes it.
- `RELOCATING_HOUSEHOLD` and `DRIVE_TIME_ANCHOR` are placeholders added at promotion time. The
  original synthesis prompt named the household and a family member's town; both were replaced
  because the kit must not carry family details. Fill them in (one or two sentences, and a city
  name) or the synthesis will address nobody.
- The San Francisco baseline is not a placeholder: it is wired into the schema
  (`vsSanFrancisco`) and the research prompts as the comparison city. Change it everywhere or
  leave it.
- `TOWNS` mirrors the September trip itinerary with day numbers in `ctx`; edit the list to the
  towns actually under consideration. Agent count is 2 per town + 5 + 1, so 15 towns means 36
  agents at effort "high"; budget one to three million tokens.
- The prompts tell agents to prefer Zillow, Redfin, Census, BLS, FBI UCR, NOAA and the FCC
  broadband map. Aggregators are allowed but flagged.

## Not promoted from this repo

michigan-2026-verify (session c71e61f0, 816 lines): verification of every leg of the September
14 to 21, 2026 road trip from the source docx. It is the highest-yield MMT run on record (11
legs, 480 searches, 352 facts, 99 red flags, 67 additions in 26 minutes) but its verify and
critic agents all hit the session limit, so 0 verdicts were recorded. It is not promoted: it
expires with the trip, and the travel party, ages, family names and the family budget lines
are quoted throughout, which the kit must not carry. To rerun it before the trip, invoke it by
`scriptPath` from its session directory (path in the index) with `TODAY` updated.
