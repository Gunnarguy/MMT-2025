/**
 * Snapshot the Scout tab's decision matrix as a single self-contained HTML page
 * (the claude.ai artifact). Runs the exact same code the site uses — rowFor,
 * COLUMNS, moneyFor, estimateMonth — so the numbers cannot drift.
 *
 *   node_modules/.bin/esbuild scripts/matrix-artifact.jsx --bundle --platform=node \
 *     --format=esm --jsx=automatic --outfile=/tmp/matrix-artifact.mjs && node /tmp/matrix-artifact.mjs out.html
 */
import { writeFileSync } from "node:fs";
import process from "node:process";
import { RELOCATION_TOWNS, SCOUT_CAMPBELL, SCOUT_META } from "../src/data/relocation.js";
import { moneyFor, SCENARIOS } from "../src/components/YourMoney.jsx";
import { estimateMonth, DEFAULT_BUDGET, BUDGET_LINES } from "../src/components/YourMonth.jsx";
import { COLUMNS, GROUPS, rowFor } from "../src/components/ScoutMatrix.jsx";
import { matchPercent, DEFAULT_WEIGHTS } from "../src/components/ScoutView.jsx";

const SITE = "https://gunnarguy.github.io/MMT-2025/#/scout";
const out = process.argv[2];
if (!out) throw new Error("usage: matrix-artifact.mjs <out.html>");

const budgetTotal = BUDGET_LINES.reduce((n, [k]) => n + (Number(DEFAULT_BUDGET[k]) || 0), 0);
const MONEY_KEYS = new Set(COLUMNS.filter((c) => c.group === "money").map((c) => c.key));
const MONTH_KEYS = new Set(["monthTotal", "monthDelta"]);

function cell(col, row, homeRow) {
  const v = col.get(row);
  if (col.kind === "spark") return row.months ? { spark: row.months.map((m) => Number(m.snow) || 0) } : { v: null };
  const c = { v: typeof v === "number" ? Math.round(v * 1000) / 1000 : v };
  if (v == null) {
    const s = col.sub?.(row);
    if (s) c.s = s;
    return c;
  }
  c.t = col.fmt(v);
  const s = col.sub?.(row);
  if (s) c.s = s;
  if (col.verdict && row.r?.[col.verdict]) {
    c.tone = row.r[col.verdict].tone;
    c.vl = row.r[col.verdict].label;
  }
  if (homeRow && !row.isHome && !col.noDelta && col.kind !== "rank") {
    const hv = col.get(homeRow);
    if (typeof v === "number" && typeof hv === "number") {
      const d = v - hv;
      c.d = (d > 0 ? "+" : d < 0 ? "−" : "±") + col.fmt(Math.abs(d));
      c.b = d === 0 ? null : col.good === "low" ? d < 0 : col.good === "high" ? d > 0 : null;
    }
  }
  return c;
}

function build(town, income, useCounty, isHome) {
  const r = moneyFor(town, income);
  const est = isHome ? null : estimateMonth(DEFAULT_BUDGET, town, r, useCounty, SCOUT_CAMPBELL.costs);
  return rowFor(town, { r, est, match: matchPercent(town, DEFAULT_WEIGHTS), isHome, budgetTotal });
}

const rows = {};
const meta = (t, isHome) => ({
  id: t.id,
  name: t.name,
  county: isHome ? "where you live now · the baseline" : `${String(t.county).replace(/ County.*$/, "")}`,
  tier: isHome ? "home" : t.tier,
  base: {},
  scen: {},
  combo: {},
});
const towns = [SCOUT_CAMPBELL, ...RELOCATION_TOWNS];
for (const t of towns) rows[t.id] = meta(t, t.id === SCOUT_CAMPBELL.id);

for (const sc of SCENARIOS) {
  const income = { a: sc.a, b: sc.b };
  for (const useCounty of [false, true]) {
    const homeRow = build(SCOUT_CAMPBELL, income, useCounty, true);
    for (const t of towns) {
      const isHome = t.id === SCOUT_CAMPBELL.id;
      const row = isHome ? homeRow : build(t, income, useCounty, false);
      const target = rows[t.id];
      for (const col of COLUMNS) {
        const c = cell(col, row, isHome ? null : homeRow);
        if (MONTH_KEYS.has(col.key)) (target.combo[`${sc.id}-${useCounty ? "county" : "town"}`] ||= {})[col.key] = c;
        else if (MONEY_KEYS.has(col.key)) (target.scen[sc.id] ||= {})[col.key] = c;
        else if (sc.id === SCENARIOS[0].id && !useCounty) target.base[col.key] = c;
      }
    }
  }
}

const data = {
  site: SITE,
  generated: new Date().toLocaleDateString("en-CA"),
  researched: SCOUT_META.researched,
  budgetTotal,
  budget: BUDGET_LINES.map(([k, label]) => [label, DEFAULT_BUDGET[k]]),
  scenarios: SCENARIOS.map((s) => ({ id: s.id, label: s.label, note: s.note, gross: s.a + s.b })),
  groups: GROUPS,
  tiers: { viable: ["Year-round viable", "#2f855a"], seasonal: ["Seasonal risk", "#b7791f"], no: ["Visit, don't move", "#c53030"], home: ["Home", "#b5552d"] },
  columns: COLUMNS.map((c) => ({ key: c.key, group: c.group, label: c.label, unit: c.unit || "", good: c.good || null, kind: c.kind || "num", title: c.title || "", win: c.win || null, noDelta: !!c.noDelta })),
  homeId: SCOUT_CAMPBELL.id,
  rows: towns.map((t) => rows[t.id]),
};

const json = JSON.stringify(data).replace(/<\/script/gi, "<\\/script").replace(/<!--/g, "<\\!--");

const html = `<meta charset="utf-8">
<title>Where in Michigan</title>
<meta name="description" content="Fifteen Michigan towns against Campbell, CA — housing, bills, climate, daily life — as one sortable decision matrix.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,500;6..72,700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{color-scheme:light;--bg:#f6f2ec;--surface:#fffdfa;--surface-2:#f3ede4;--surface-3:#e4dccf;--ink:#1e1b17;--ink-2:#4a443c;--ink-3:#7a7268;--ink-4:#a89f92;--accent:#b5552d;--accent-soft:#f6e3d6;--ok:#2f7d54;--warn:#a8690a;--stop:#b03024;--info:#4a7fb5;--serif:"Newsreader",Georgia,serif;--sans:"Inter",-apple-system,system-ui,sans-serif;--mono:ui-monospace,"SF Mono",Menlo,monospace}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){color-scheme:dark;--bg:#151311;--surface:#1e1b18;--surface-2:#26221e;--surface-3:#3a342d;--ink:#f1ece4;--ink-2:#cfc6b9;--ink-3:#9d9486;--ink-4:#6e665b;--accent:#e0885a;--accent-soft:#33241b;--ok:#62c68d;--warn:#e0aa4c;--stop:#f0796b;--info:#7fa9d8}}
:root[data-theme="dark"]{color-scheme:dark;--bg:#151311;--surface:#1e1b18;--surface-2:#26221e;--surface-3:#3a342d;--ink:#f1ece4;--ink-2:#cfc6b9;--ink-3:#9d9486;--ink-4:#6e665b;--accent:#e0885a;--accent-soft:#33241b;--ok:#62c68d;--warn:#e0aa4c;--stop:#f0796b;--info:#7fa9d8}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--sans);font-size:14px;line-height:1.5}
.wrap{max-width:1400px;margin:0 auto;padding:28px 20px 60px}
.eyebrow{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-3);font-weight:600}
h1{font-family:var(--serif);font-size:clamp(28px,4vw,42px);line-height:1.05;margin:.2em 0 .35em;font-weight:700}
h2{font-family:var(--serif);font-size:22px;margin:0 0 .3em}
.lede{font-size:16px;color:var(--ink-2);max-width:70ch;margin:0 0 14px}
.site{display:inline-flex;gap:.5rem;align-items:center;padding:.6rem 1rem;border-radius:999px;background:var(--accent);color:#fff;text-decoration:none;font-weight:600;margin:4px 0 22px}
.site:hover{filter:brightness(1.05)}
.card{background:var(--surface);border:1px solid var(--surface-3);border-radius:16px;padding:18px 18px 14px;box-shadow:0 10px 30px -22px rgba(0,0,0,.35)}
.toolbar{display:flex;flex-wrap:wrap;gap:.5rem 1rem;align-items:center;margin:10px 0 14px}
.segwrap{display:inline-flex;align-items:center;gap:.35rem}.seglab{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--ink-3)}
.seg{display:inline-flex;flex-wrap:wrap;border:1px solid var(--surface-3);border-radius:999px;overflow:hidden;background:var(--surface-2)}
.seg button{font:inherit;font-size:12px;padding:.38rem .7rem;border:0;background:transparent;color:var(--ink-2);cursor:pointer;white-space:nowrap}
.seg button+button{border-left:1px solid var(--surface-3)}.seg button[aria-pressed="true"]{background:var(--accent);color:#fff;font-weight:600}
.note{display:inline}@media (max-width:640px){.note{display:none}}
.winners{display:flex;gap:.4rem;flex-wrap:wrap;margin:0 0 14px}
.win{display:inline-flex;flex-direction:column;gap:.05rem;padding:.35rem .6rem;border-radius:10px;background:var(--surface-2);border:1px solid var(--surface-3);font:inherit;text-align:left;cursor:pointer;color:var(--ink)}
.win:hover{border-color:var(--accent)}.win small{font-size:10px;color:var(--ink-3);text-transform:uppercase;letter-spacing:.05em}.win b{font-size:13px}.win span{font-family:var(--mono);font-size:11px;color:var(--ink-2)}
.tabs{display:flex;flex-wrap:wrap;gap:.3rem;margin-bottom:-1px;position:relative;z-index:1}
.tab{font:inherit;font-size:13px;padding:.45rem .85rem;border-radius:10px 10px 0 0;border:1px solid var(--surface-3);border-bottom:0;background:var(--surface-2);color:var(--ink-2);cursor:pointer}
.tab[aria-pressed="true"]{background:var(--surface);color:var(--ink);font-weight:600;box-shadow:inset 0 3px 0 var(--accent)}
.scroll{overflow:auto;max-height:min(84vh,1000px);border:1px solid var(--surface-3);border-radius:0 12px 12px 12px;background:var(--surface);overscroll-behavior-x:contain}
table{border-collapse:separate;border-spacing:0;font-size:13px;min-width:max-content;width:100%}
th,td{padding:.42rem .6rem;border-bottom:1px solid var(--surface-3);text-align:right;white-space:nowrap;vertical-align:middle;font-variant-numeric:tabular-nums}
thead th{position:sticky;top:0;z-index:3;background:var(--surface);font-size:10.5px;text-transform:uppercase;letter-spacing:.05em;color:var(--ink-3);font-weight:600;cursor:pointer;user-select:none;box-shadow:inset 0 -1px 0 var(--surface-3);line-height:1.2}
thead th:hover{color:var(--ink)}thead th.sorted{color:var(--accent)}
thead th .unit{display:block;font-weight:400;letter-spacing:0;text-transform:none;color:var(--ink-4);font-size:10px;margin-top:.1rem}
thead tr.groups th{height:1.4rem;padding:.15rem .6rem;text-align:left;font-size:10px;color:var(--ink-3);background:var(--surface-2);cursor:default;z-index:4;box-shadow:inset 0 -1px 0 var(--surface-3),inset 1px 0 0 var(--surface-3)}
thead tr.under th{top:1.4rem}
th.town,td.town{position:sticky;left:0;z-index:2;text-align:left;background:var(--surface);box-shadow:inset -1px 0 0 var(--surface-3);border-left:3px solid var(--tc,transparent);min-width:13rem}
thead th.town{z-index:5}thead tr.groups th.town{z-index:6;background:var(--surface-2)}
tbody tr.home th,tbody tr.home td{background:var(--accent-soft);font-weight:600}
tbody tr:hover td{filter:brightness(.965)}
.townrow{display:grid;grid-template-columns:auto 1fr;gap:.5rem;align-items:center}
.rank{font-family:var(--serif);font-size:18px;font-weight:700;color:var(--tc);min-width:1.4rem;text-align:center;line-height:1}
.name{font-weight:600}.town small{display:block;font-size:10.5px;color:var(--ink-3);font-weight:400}
.sub{display:block;font-size:10.5px;color:var(--ink-3);font-weight:400;max-width:12rem;overflow:hidden;text-overflow:ellipsis}
td.null{color:var(--ink-4)}td.txt{text-align:left}
.good{color:var(--ok);font-weight:600}.bad{color:var(--stop);font-weight:600}.zero{color:var(--ink-4)}
.bar{display:inline-block;width:3.2rem;height:6px;vertical-align:middle;margin-right:.4rem;background:var(--surface-3);border-radius:3px;overflow:hidden}.bar i{display:block;height:100%;background:var(--tc);border-radius:3px}
.dot{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:.35rem;vertical-align:middle;background:var(--ink-4)}.dot.ok{background:var(--ok)}.dot.warn{background:var(--warn)}.dot.stop{background:var(--stop)}
.spark{display:inline-flex;align-items:flex-end;gap:1px;height:18px;vertical-align:middle}.spark i{display:block;width:4px;background:var(--info);border-radius:1px 1px 0 0}
.foot{font-size:12px;color:var(--ink-3);margin-top:10px;line-height:1.5}
.bills{font-size:12px;color:var(--ink-3);margin:6px 0 0}
@media (max-width:640px){th.town,td.town{min-width:10rem}.scroll{max-height:70vh}}
</style>
<div class="wrap">
  <div class="eyebrow">Michigan '26 · relocation · researched ${SCOUT_META.researched}, snapshot ${data.generated}</div>
  <h1>Fifteen towns against Campbell, in one table</h1>
  <p class="lede">A snapshot of the decision matrix from the trip site. Every town the September drive passes through, measured the same way and lined up against where you live now: what the median house costs to own on your income, what your monthly bills become, snow and daylight, and how far the ER, Costco, the airport, Mom and Stryker are. Sort any column; green is the better end, red the worse; <b>vs Campbell</b> turns every cell into the difference from home.</p>
  <a class="site" href="${SITE}" target="_blank" rel="noopener">Open the live Scout tab → editable income, bills and priorities, the cards, the map</a>
  <div class="card">
    <div class="eyebrow">The decision matrix</div>
    <h2 id="h2"></h2>
    <div class="toolbar">
      <span class="segwrap"><span class="seglab">Income</span><span class="seg" id="seg-income"></span></span>
      <span class="segwrap"><span class="seglab">Own</span><span class="seg" id="seg-own"><button data-v="town">In town</button><button data-v="county">County<span class="note"> · 15 min out</span></button></span></span>
      <span class="segwrap"><span class="seglab">Show</span><span class="seg" id="seg-show"><button data-v="value">Values</button><button data-v="delta">vs Campbell</button></span></span>
    </div>
    <div class="winners" id="winners"></div>
    <div class="tabs" id="tabs"></div>
    <div class="scroll"><table id="mx"><thead></thead><tbody></tbody></table></div>
    <p class="bills" id="bills"></p>
    <p class="foot" id="foot"></p>
  </div>
</div>
<script>
const MX = ${json};
const state = { income: MX.scenarios[0].id, own: "town", show: "value", group: "money", sort: { key: "match", dir: "desc" } };
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const cellOf = (row, key) => (row.combo[state.income + "-" + state.own] || {})[key] || (row.scen[state.income] || {})[key] || row.base[key] || { v: null };
const home = MX.rows.find((r) => r.id === MX.homeId);
const towns = MX.rows.filter((r) => r.id !== MX.homeId);
const colsFor = () => MX.columns.filter((c) => state.group === "all" || c.group === state.group);
const sparkMax = Math.max(1, ...towns.flatMap((r) => (r.base.spark && r.base.spark.spark) || []));

function heatFor(cols) {
  const out = {};
  for (const col of cols) {
    if (!col.good || col.kind === "spark") continue;
    const vals = towns.map((r) => [r.id, cellOf(r, col.key).v]).filter(([, v]) => typeof v === "number").sort((a, b) => a[1] - b[1]);
    if (vals.length < 3) continue;
    const n = vals.length - 1; out[col.key] = {};
    vals.forEach(([id, v]) => { const first = vals.findIndex(([, x]) => x === v); const p = first / n; out[col.key][id] = col.good === "low" ? 1 - p : p; });
  }
  return out;
}
function tdFor(col, row, heat) {
  const c = cellOf(row, col.key);
  const tc = MX.tiers[row.tier][1];
  if (col.kind === "spark") {
    if (!c.spark) return '<td class="null">—</td>';
    return '<td><span class="spark" title="Snowfall by month, Jan → Dec">' + c.spark.map((s) => '<i style="height:' + Math.max(1, Math.round((s / sparkMax) * 18)) + 'px"></i>').join("") + "</span></td>";
  }
  if (c.v == null) return '<td class="null txt" title="' + esc(c.s || "") + '">' + (c.s ? '<span class="sub" style="max-width:14rem">' + esc(c.s) + "</span>" : "—") + "</td>";
  const delta = state.show === "delta" && !row.home && c.d != null;
  let text = esc(c.t), cls = "";
  if (delta) { text = esc(c.d); cls = c.b == null ? (c.d.startsWith("±") ? "zero" : "") : c.b ? "good" : "bad"; }
  let bg = "";
  const h = !row.home && !delta ? (heat[col.key] || {})[row.id] : null;
  if (h != null) bg = h >= 0.5 ? "rgba(47,125,84," + (0.05 + (h - 0.5) * 0.44).toFixed(2) + ")" : "rgba(176,48,36," + (0.05 + (0.5 - h) * 0.44).toFixed(2) + ")";
  const bar = col.kind === "score" ? '<span class="bar" style="--tc:' + tc + '"><i style="width:' + c.v * 10 + '%"></i></span>' : "";
  const dot = c.tone && !delta ? '<i class="dot ' + c.tone + '" title="' + esc(c.vl) + '"></i>' : "";
  const sub = !delta && c.s ? '<span class="sub">' + esc(c.s) + "</span>" : "";
  return '<td class="' + cls + '"' + (bg ? ' style="background:' + bg + '"' : "") + ' title="' + esc(c.s || col.title) + '">' + bar + dot + text + sub + "</td>";
}
function render() {
  const cols = colsFor();
  const sortCol = MX.columns.find((c) => c.key === state.sort.key) || MX.columns[0];
  const dir = state.sort.dir === "asc" ? 1 : -1;
  const sorted = [...towns].sort((a, b) => { const va = cellOf(a, sortCol.key).v, vb = cellOf(b, sortCol.key).v; if (va == null && vb == null) return 0; if (va == null) return 1; if (vb == null) return -1; return typeof va === "string" ? dir * va.localeCompare(vb) : dir * (va - vb); });
  const heat = heatFor(cols);
  const sc = MX.scenarios.find((s) => s.id === state.income);
  $("#h2").textContent = towns.length + " towns against Campbell, on $" + sc.gross.toLocaleString() + " a year" + (state.own === "county" ? ", owning 15 minutes out" : "");
  let head = "";
  if (state.group === "all") head += '<tr class="groups"><th class="town"></th>' + MX.groups.map(([g, label]) => '<th colspan="' + MX.columns.filter((c) => c.group === g).length + '">' + esc(label) + "</th>").join("") + "</tr>";
  head += '<tr class="' + (state.group === "all" ? "under" : "") + '"><th class="town">Town<span class="unit">rank follows the sort · click a header</span></th>' + cols.map((c) => '<th data-key="' + c.key + '" class="' + (c.key === state.sort.key ? "sorted" : "") + '" title="' + esc(c.title) + '">' + esc(c.label) + (c.key === state.sort.key ? (state.sort.dir === "asc" ? " ▲" : " ▼") : "") + (c.unit ? '<span class="unit">' + esc(c.unit) + "</span>" : "") + "</th>").join("") + "</tr>";
  $("#mx thead").innerHTML = head;
  const rowHtml = (row, i) => { const tc = MX.tiers[row.tier][1]; return '<tr class="' + (row.home ? "home" : "") + '"><th class="town" style="--tc:' + tc + '"><span class="townrow"><span class="rank">' + (row.home ? "⌂" : i) + '</span><span><span class="name">' + esc(row.name) + "</span><small>" + esc(row.county) + (row.home ? "" : " · " + esc(MX.tiers[row.tier][0])) + "</small></span></span></th>" + cols.map((c) => tdFor(c, row, heat)).join("") + "</tr>"; };
  home.home = true;
  $("#mx tbody").innerHTML = rowHtml(home, 0) + sorted.map((r, i) => rowHtml(r, i + 1)).join("");
  $("#mx thead").querySelectorAll("th[data-key]").forEach((th) => th.addEventListener("click", () => { const col = MX.columns.find((c) => c.key === th.dataset.key); if (col.kind === "spark") return; state.sort = state.sort.key === col.key ? { key: col.key, dir: state.sort.dir === "asc" ? "desc" : "asc" } : { key: col.key, dir: col.good === "low" ? "asc" : "desc" }; render(); }));
  $("#winners").innerHTML = MX.columns.filter((c) => c.win).map((col) => { const cands = towns.filter((r) => typeof cellOf(r, col.key).v === "number"); if (!cands.length) return ""; const best = cands.reduce((b, r) => (col.good === "low" ? cellOf(r, col.key).v < cellOf(b, col.key).v : cellOf(r, col.key).v > cellOf(b, col.key).v) ? r : b); return '<button class="win" data-key="' + col.key + '"><small>' + esc(col.win) + "</small><b>" + esc(best.name) + "</b><span>" + esc(cellOf(best, col.key).t) + "</span></button>"; }).join("");
  $("#winners").querySelectorAll(".win").forEach((b) => b.addEventListener("click", () => { const col = MX.columns.find((c) => c.key === b.dataset.key); state.group = col.group; state.sort = { key: col.key, dir: col.good === "low" ? "asc" : "desc" }; syncSegs(); render(); }));
  $("#foot").innerHTML = "Housing: median sold or ACS value, county ACS value; owning = 30-yr at 6.66% with 20% down plus tax and insurance. Bills: utility rate pages, Bankrate, AAA, MIT's Feb-2026 food lines, municipal schedules — matched to the same sources for Campbell. Climate: NOAA station data 2010–2024. Crime, fiber, distances and airports parsed from each town's researched workup; a dash means the figure did not survive research. Match uses equal priority weights here; the live site lets you weight them. Sorted by <b>" + esc(sortCol.label) + "</b>, " + (state.sort.dir === "asc" ? "low to high" : "high to low") + ".";
}
function syncSegs() {
  $("#seg-income").querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.v === state.income));
  $("#seg-own").querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.v === state.own));
  $("#seg-show").querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.v === state.show));
  $("#tabs").querySelectorAll(".tab").forEach((b) => b.setAttribute("aria-pressed", b.dataset.v === state.group));
}
$("#seg-income").innerHTML = MX.scenarios.map((s) => '<button data-v="' + s.id + '">' + esc(s.label) + '<span class="note"> · ' + esc(s.note) + "</span></button>").join("");
$("#tabs").innerHTML = [["all", "Everything"], ...MX.groups].map(([g, label]) => '<button class="tab" data-v="' + g + '">' + esc(label) + "</button>").join("");
$("#bills").textContent = "Your bills as typed on the site: " + MX.budget.map(([l, v]) => l + " $" + v).join(" · ") + " = $" + MX.budgetTotal.toLocaleString() + "/mo in Campbell.";
for (const [id, key] of [["#seg-income", "income"], ["#seg-own", "own"], ["#seg-show", "show"], ["#tabs", "group"]]) $(id).querySelectorAll("button").forEach((b) => b.addEventListener("click", () => { state[key] = b.dataset.v; syncSegs(); render(); }));
syncSegs(); render();
</script>
`;
writeFileSync(out, html);
console.log("wrote", out, Math.round(html.length / 1024) + "KB", "|", data.rows.length, "rows ×", data.columns.length, "columns");
