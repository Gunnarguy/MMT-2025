// Promoted 2026-09-07 from Claude Code session storage into the shared kit (read-only pass; nothing under ~/.claude/projects was modified).
// Original script: ~/.claude/projects/-Users-gunnarhostetler-Documents-GitHub-MMT-2025/b2a13d32-74ea-4ae2-a755-60a6294e34b6/workflows/scripts/michigan-relocation-scout-wf_fbe5b78b-466.js
// Run record:      ~/.claude/projects/-Users-gunnarhostetler-Documents-GitHub-MMT-2025/b2a13d32-74ea-4ae2-a755-60a6294e34b6/workflows/wf_fbe5b78b-466.json
// Session b2a13d32-74ea-4ae2-a755-60a6294e34b6
// run wf_fbe5b78b-466 on 2026-08-28: status killed, 2.6 min, 20 agents, model claude-opus-5, 310,322 tokens, 111 tool calls
// Recorded outcome: Killed at 2.6 min with 20 agents mid-research, no result recorded; the work was redone by hand as 45 sequential agy-job.sh calls (AUDIT 4e, 5.14).
// Two family details in the synthesis prompt were replaced by the placeholder constants RELOCATING_HOUSEHOLD and DRIVE_TIME_ANCHOR (defined under TODAY); fill both in before running. Nothing else was changed.
// Before rerunning, read NOTES.md in this directory (paths, dates and data files that must be current).
// The script is verbatim apart from this header, the placeholder constants named above.
// The meta block must stay a pure literal and the first statement in the file.
export const meta = {
  name: 'michigan-relocation-scout',
  description: 'Live, cited town-by-town relocation research for every stop on the Michigan 2026 itinerary',
  phases: [
    { title: 'Research', detail: 'one deep web-research agent per town' },
    { title: 'Verify', detail: 'adversarial fact-check of every number and citation' },
    { title: 'Statewide', detail: 'cross-cutting Michigan factors that apply to all towns' },
    { title: 'Synthesize', detail: 'rank and compare against an SF baseline' },
  ],
}

const TODAY = '2026-08-28'
// Placeholders added at promotion time: the original named the household and a family location here.
const RELOCATING_HOUSEHOLD = 'REPLACE_ME: one or two sentences on who is relocating, from which city, and which family location matters for drive time.'
const DRIVE_TIME_ANCHOR = 'REPLACE_ME: the city that drive times are measured to'

const TOWNS = [
  { name: 'Grand Rapids', state: 'MI', ctx: 'Day 2 stop. Second-largest MI metro.' },
  { name: 'Ludington', state: 'MI', ctx: 'Night 1. Lake Michigan shore, car-ferry town.' },
  { name: 'Glen Arbor and Empire', state: 'MI', ctx: 'Sleeping Bear Dunes gateway villages, tiny.' },
  { name: 'Traverse City', state: 'MI', ctx: 'Night 2. Largest city in northern MI, wine country.' },
  { name: 'Charlevoix', state: 'MI', ctx: 'Day 4. Resort town, Earl Young houses.' },
  { name: 'Petoskey', state: 'MI', ctx: 'Day 4. Gaslight District, resort town.' },
  { name: 'Mackinaw City', state: 'MI', ctx: 'Nights 3-4. Straits of Mackinac, heavily seasonal.' },
  { name: 'Mackinac Island', state: 'MI', ctx: 'Day 5. No cars, very small year-round population.' },
  { name: 'Frankenmuth', state: 'MI', ctx: 'Day 6. Bavarian-themed tourist town near Saginaw.' },
  { name: 'Port Huron', state: 'MI', ctx: 'Day 6. Blue Water Bridge border city.' },
  { name: 'Detroit', state: 'MI', ctx: 'Day 7. Belle Isle, downtown.' },
  { name: 'Belleville', state: 'MI', ctx: 'Night 7. Near DTW airport, Detroit exurb.' },
  { name: 'Ann Arbor', state: 'MI', ctx: 'Day 8. University of Michigan college town.' },
  { name: 'Sarnia and Point Edward', state: 'Ontario, CANADA', ctx: 'Night 6. Cross-border — immigration is a hard barrier for US citizens.' },
  { name: 'Windsor', state: 'Ontario, CANADA', ctx: 'Day 7. Cross-border, across from Detroit.' },
]

const METRIC = {
  type: 'object',
  additionalProperties: false,
  required: ['value', 'asOf', 'source'],
  properties: {
    value: { type: 'string', description: 'The figure with units. Write exactly "NOT FOUND" if you could not source it. Never estimate.' },
    asOf: { type: 'string', description: 'Date or period the figure describes, e.g. "July 2026" or "2020-2026 trend". "NOT FOUND" if unsourced.' },
    source: { type: 'string', description: 'Full URL you actually fetched. "NOT FOUND" if unsourced.' },
  },
}

const TOWN_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['town', 'population', 'realEstate', 'costOfLiving', 'convenience', 'safety', 'climate', 'economy', 'schools', 'healthcare', 'internet', 'quirks', 'verdict', 'confidence'],
  properties: {
    town: { type: 'string' },
    population: METRIC,
    realEstate: {
      type: 'object', additionalProperties: false,
      required: ['medianHomePrice', 'medianHomePriceUsd', 'priceTrend5yr', 'inventory', 'daysOnMarket', 'pricePerSqFt', 'medianRent', 'propertyTaxRate', 'notes'],
      properties: {
        medianHomePrice: METRIC,
        medianHomePriceUsd: { type: ['number', 'null'], description: 'Numeric median sale price in USD for ranking, or null if NOT FOUND' },
        priceTrend5yr: METRIC,
        inventory: METRIC,
        daysOnMarket: METRIC,
        pricePerSqFt: METRIC,
        medianRent: METRIC,
        propertyTaxRate: METRIC,
        notes: { type: 'string', description: 'What the market is actually like: seasonal/second-home distortion, waterfront premium, inventory scarcity.' },
      },
    },
    costOfLiving: {
      type: 'object', additionalProperties: false,
      required: ['indexVsUsAvg', 'colIndexNumeric', 'comfortableHouseholdIncome', 'comfortableIncomeUsd', 'groceries', 'utilities', 'vsSanFrancisco', 'notes'],
      properties: {
        indexVsUsAvg: METRIC,
        colIndexNumeric: { type: ['number', 'null'], description: 'COL index where US average = 100, or null' },
        comfortableHouseholdIncome: METRIC,
        comfortableIncomeUsd: { type: ['number', 'null'], description: 'Annual USD for a couple to live comfortably, or null' },
        groceries: METRIC,
        utilities: METRIC,
        vsSanFrancisco: { type: 'string', description: 'Concrete comparison to San Francisco, where the user lives now. Include the percentage difference and what it means in practice.' },
        notes: { type: 'string' },
      },
    },
    convenience: {
      type: 'object', additionalProperties: false,
      required: ['groceryStores', 'amazonDelivery', 'bigBoxDistance', 'walkability', 'nearestAirport', 'nearestCostco', 'notes'],
      properties: {
        groceryStores: METRIC,
        amazonDelivery: { ...METRIC, description: 'Same-day / next-day / 2-day availability at this ZIP. The user explicitly asked about Amazon presence.' },
        bigBoxDistance: METRIC,
        walkability: METRIC,
        nearestAirport: METRIC,
        nearestCostco: METRIC,
        notes: { type: 'string' },
      },
    },
    safety: {
      type: 'object', additionalProperties: false,
      required: ['violentCrimeRate', 'propertyCrimeRate', 'violentPer1k', 'vsStateAndNational', 'trend', 'notes'],
      properties: {
        violentCrimeRate: METRIC,
        propertyCrimeRate: METRIC,
        violentPer1k: { type: ['number', 'null'] },
        vsStateAndNational: { type: 'string' },
        trend: METRIC,
        notes: { type: 'string' },
      },
    },
    climate: {
      type: 'object', additionalProperties: false,
      required: ['annualSnowfall', 'winterTemps', 'lakeEffect', 'notes'],
      properties: { annualSnowfall: METRIC, winterTemps: METRIC, lakeEffect: METRIC, notes: { type: 'string' } },
    },
    economy: {
      type: 'object', additionalProperties: false,
      required: ['medianHouseholdIncome', 'unemployment', 'majorEmployers', 'remoteWorkViability', 'seasonality'],
      properties: {
        medianHouseholdIncome: METRIC, unemployment: METRIC, majorEmployers: METRIC,
        remoteWorkViability: { type: 'string' },
        seasonality: { type: 'string', description: 'Critical for MI resort towns: what happens Nov-Apr when tourists leave. Do businesses close?' },
      },
    },
    schools: { type: 'object', additionalProperties: false, required: ['district', 'rating'], properties: { district: METRIC, rating: METRIC } },
    healthcare: { type: 'object', additionalProperties: false, required: ['nearestHospital', 'quality'], properties: { nearestHospital: METRIC, quality: METRIC } },
    internet: { type: 'object', additionalProperties: false, required: ['providers', 'maxSpeed'], properties: { providers: METRIC, maxSpeed: METRIC } },
    quirks: { type: 'array', items: { type: 'string' }, description: 'Non-obvious things locals/residents actually say. Reddit r/Michigan, local forums, news. What would surprise a Californian.' },
    verdict: { type: 'string', description: 'Honest 3-5 sentence assessment for a remote-working couple relocating from San Francisco.' },
    confidence: { type: 'string', enum: ['high', 'medium', 'low'] },
  },
}

const VERIFY_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['town', 'issues', 'fabricationRisk', 'verdict'],
  properties: {
    town: { type: 'string' },
    issues: {
      type: 'array',
      items: {
        type: 'object', additionalProperties: false,
        required: ['field', 'problem', 'severity'],
        properties: {
          field: { type: 'string' },
          problem: { type: 'string' },
          severity: { type: 'string', enum: ['fabricated', 'stale', 'implausible', 'uncited', 'minor'] },
        },
      },
    },
    fabricationRisk: { type: 'string', enum: ['none', 'low', 'medium', 'high'] },
    verdict: { type: 'string' },
  },
}

const researchPrompt = (t) => `You are researching ${t.name}, ${t.state} for a couple relocating from San Francisco. Today is ${TODAY}. Context: ${t.ctx}

FIRST: call ToolSearch with query "select:WebSearch,WebFetch" to load web tools. You MUST use them. This task is worthless without live data.

Research ${t.name}, ${t.state} exhaustively across every field in the schema. Prioritise, in this order, what the user actually cares about:
1. COST OF LIVING - specifically what annual household income a couple needs to live COMFORTABLY here (not survive). This is his single biggest question.
2. REAL ESTATE - current median price, 5-year trend, inventory, property tax. Michigan property tax is unusual: taxable value uncaps on sale, so a listing's current tax bill understates what a BUYER pays. Check this.
3. CONVENIENCE - grocery stores by name, and Amazon delivery speed at this ZIP. He asked about Amazon presence specifically.
4. CRIME - violent and property rates, versus state and national.
5. Everything else in the schema.

HARD RULES, these matter more than completeness:
- Every figure needs a real URL you actually fetched and the date it describes. If you cannot source it, the value is literally "NOT FOUND". Do NOT estimate, interpolate, or reason from general knowledge about similar towns. A "NOT FOUND" is a useful answer; an invented median home price is a harmful one.
- Prefer primary and current sources: Zillow/Redfin/Realtor research pages, Census QuickFacts, BLS, FBI UCR / city police reports, NOAA/NWS climate normals, county assessor, FCC broadband map, local news. Aggregator sites (BestPlaces, Niche, AreaVibes, Payscale) are acceptable but say so and prefer better.
- Distinguish the TOWN from the county and metro. Small MI resort towns are often reported only at county level - if so, say which geography your number covers.
- For tiny/resort towns (Mackinac Island, Glen Arbor, Empire, Mackinaw City) the year-round reality differs wildly from the tourist-season one. Find the winter reality: what closes, who stays, what the year-round population actually is.
- For the two Ontario towns, treat US-citizen immigration as a first-class feasibility question, and give costs in CAD with the USD conversion and the rate date.

Return ONLY the structured object.`

const verifyPrompt = (t, r) => `Adversarially fact-check this relocation research on ${t.name}, ${t.state}. Today is ${TODAY}.

Load web tools first: ToolSearch with query "select:WebSearch,WebFetch".

Your job is to CATCH FABRICATION, not to be agreeable. Assume the researcher was lazy and pattern-matched plausible numbers. For the highest-stakes fields - median home price, comfortable household income, crime rates, property tax rate - independently re-source them and compare. Also check:
- Does the cited URL actually exist and actually contain that figure? Spot-check at least three by fetching them.
- Is the geography right (town vs county vs metro)?
- Is anything stale, e.g. a 2021 median presented as current?
- Are numbers internally consistent (price per sqft vs median price; COL index vs comfortable income)?
- Is a suspiciously round or suspiciously national-average-looking number sitting where real local data should be?

Flag severity "fabricated" only when you have positive evidence the figure is wrong or the source does not support it. Report an empty issues array if it genuinely holds up.

RESEARCH TO CHECK:
${JSON.stringify(r).slice(0, 14000)}`

phase('Research')

const towns = await pipeline(
  TOWNS,
  (t) => agent(researchPrompt(t), { label: `research:${t.name}`, phase: 'Research', schema: TOWN_SCHEMA, effort: 'high' }),
  (res, t) => res
    ? agent(verifyPrompt(t, res), { label: `verify:${t.name}`, phase: 'Verify', schema: VERIFY_SCHEMA, effort: 'high' })
        .then((v) => ({ town: t, research: res, verification: v }))
        .catch(() => ({ town: t, research: res, verification: null }))
    : null,
)

phase('Statewide')

const STATEWIDE = [
  { key: 'property-tax', p: 'Michigan property tax mechanics for a HOME BUYER: the Proposal A taxable-value cap, what "uncapping" on sale means for a buyer versus the seller\'s advertised tax bill, the Principal Residence Exemption (homestead) and how to claim it, millage rates by the counties on this list (Kent, Mason, Leelanau, Grand Traverse, Charlevoix, Emmet, Cheboygan, Mackinac, Saginaw, St Clair, Wayne, Washtenaw), transfer tax, and typical homeowners insurance. Explain the trap where a buyer\'s first tax bill is far higher than the listing implied.' },
  { key: 'taxes-income', p: 'Total tax and fixed-cost burden of moving from San Francisco, California to Michigan for a remote-working couple: Michigan income tax rate and any local city income taxes (Detroit, Grand Rapids, Port Huron, Saginaw all have them - list which towns levy one and at what rate), sales tax, vehicle registration and insurance costs, and how all of this nets out against California. Give concrete dollar figures for a plausible household income.' },
  { key: 'winter', p: 'The real Michigan winter for a Californian: lake-effect snow belts and which of these towns sit inside them (Ludington, Traverse City, Glen Arbor, Charlevoix, Petoskey, Mackinaw City, Grand Rapids), annual snowfall normals, heating costs and the natural gas versus propane split in rural northern Michigan (propane is dramatically more expensive - quantify), road salt and vehicle corrosion, daylight hours in December, and seasonal affective reality. Cite NOAA/NWS normals.' },
  { key: 'water-environment', p: 'Michigan water and environmental issues a buyer must check: PFAS contamination sites and which of these towns are affected, lead service lines, private well water in rural/northern areas and testing costs, septic versus sewer, radon, and any Great Lakes shoreline erosion or high-water risk affecting lakefront property. Be specific about towns on this list.' },
  { key: 'jobs-broadband', p: 'Remote-work feasibility across northern and western Michigan: actual residential broadband availability and speeds by town (use the FCC National Broadband Map), fiber build-outs, cell coverage gaps up north, major regional employers, healthcare-system coverage, and the year-round versus seasonal economy problem in resort towns. Which of these towns can a remote tech worker actually live in?' },
]

const statewide = await parallel(
  STATEWIDE.map((s) => () =>
    agent(`Today is ${TODAY}. Load web tools first: ToolSearch with query "select:WebSearch,WebFetch". Research this thoroughly with live sources and cite a URL for every factual claim. Write "NOT FOUND" rather than estimating.\n\n${s.p}`,
      { label: `statewide:${s.key}`, phase: 'Statewide', effort: 'high' })
      .then((text) => ({ key: s.key, text }))),
)

phase('Synthesize')

const good = towns.filter(Boolean)
log(`${good.length}/${TOWNS.length} towns researched and verified`)

const compact = good.map((g) => ({
  town: g.town.name,
  state: g.town.state,
  research: g.research,
  issues: g.verification ? g.verification.issues : [],
  fabricationRisk: g.verification ? g.verification.fabricationRisk : 'unchecked',
}))

const synthesis = await agent(
  `You are producing the final relocation briefing. ${RELOCATING_HOUSEHOLD} Today is ${TODAY}.

You have per-town research (each already adversarially fact-checked) and statewide analysis. Produce a synthesis that:

1. RANKS the Michigan towns for a remote-working couple relocating from San Francisco, with explicit reasoning. Separate genuinely liveable year-round places from ones that are lovely to visit and impractical to live in.
2. Gives the COST OF LIVING answer head-on: what household income does each viable town require to live comfortably, and what does that look like against San Francisco. This is his main question.
3. Calls out the traps - Michigan property tax uncapping, local city income taxes, propane heating, seasonal town collapse in winter, PFAS/well water, snow belts.
4. Gives drive time and distance from each town to ${DRIVE_TIME_ANCHOR}.
5. States plainly where the DATA IS WEAK - any town where verification flagged fabrication risk or many NOT FOUNDs. Do not paper over gaps.

Be direct and specific with numbers. This is a real financial decision, not a brochure.

TOWN RESEARCH:
${JSON.stringify(compact).slice(0, 120000)}

STATEWIDE ANALYSIS:
${JSON.stringify(statewide.filter(Boolean)).slice(0, 60000)}`,
  { label: 'synthesis', phase: 'Synthesize', effort: 'high' },
)

return { towns: compact, statewide: statewide.filter(Boolean), synthesis, researched: good.length, attempted: TOWNS.length }
