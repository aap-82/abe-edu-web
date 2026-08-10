#!/usr/bin/env node
/**
 * Renders `page-status.mjs`'s JSON into the shareable HTML status board.
 *
 * Two scripts rather than one, deliberately: `page-status` MEASURES and this one PRESENTS. The
 * measurement is the part worth trusting and re-running, and keeping it free of markup means its
 * output can feed anything else later without dragging a stylesheet along.
 *
 *   node scripts/page-status.mjs > reports/status.json
 *   node scripts/status-board.mjs
 *
 * Writes `reports/status-board.html`. `reports/` is gitignored on purpose - this is a recording-
 * policy layer 3 derived view, regenerable from `dist/` at any time, and committing it would be
 * exactly the duplication that policy exists to prevent.
 *
 * NOT a check: it gates nothing and always exits 0. Registered in `CHECK_EXEMPT`
 * (scripts/check-claims.mjs) and named in SYSTEM.md section 5's utility list.
 *
 * Publishing: the board lives at a stable claude.ai artifact URL, recorded in
 * `handover/HANDOVER-status-board.md`. Republishing the same file keeps the link.
 *
 * Usage: node scripts/status-board.mjs [inputJson] [outputHtml] [--date "11 August 2026"]
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

/* Walk the args once, consuming `--date`'s VALUE with it. A first pass here filtered only tokens
   beginning with `--`, which left "10 August 2026" sitting in the positional list and made it the
   input path: `status-board: 10 August 2026 not found`. Caught on the first real run. */
const argv = process.argv.slice(2);
const positional = [];
let dateArg = null;
for (let i = 0; i < argv.length; i++) {
  if (argv[i] === '--date') { dateArg = argv[++i] ?? null; continue; }
  if (argv[i].startsWith('--')) continue;
  positional.push(argv[i]);
}
const IN = positional[0] || 'reports/status.json';
const OUT = positional[1] || 'reports/status-board.html';

/* Date is passed in rather than read from the clock so a regenerated board can be stamped with the
   day the BUILD was measured, not the day someone happened to re-render it. Falls back to today. */
const DATE = dateArg || new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });

if (!existsSync(IN)) {
  console.error(`status-board: ${IN} not found. Run:\n  node scripts/page-status.mjs > ${IN}`);
  process.exit(0);
}
const d = JSON.parse(readFileSync(IN, 'utf8'));

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ---- the five dimensions, each returning {state, label, title} -------------------------------
// state: done | part | none | block | na
function dims(p) {
  if (!p.built) {
    const blocked = p.slug === '/nsw-owner-builder-course';
    const stub = p.redirectStub;
    const s = blocked ? 'block' : 'none';
    const note = blocked ? 'Blocked' : stub ? 'Redirect' : 'Not started';
    return {
      research: { state: s, label: p.research.artefacts ? `${p.research.artefacts}/7` : '—', title: 'No pipeline artefacts' },
      content: { state: s, label: note, title: stub ? `Root redirects to ${p.redirectTo}` : blocked ? 'Legacy page exists but must not ship' : 'Not started' },
      images: { state: s, label: '—', title: '' },
      seo: { state: s, label: '—', title: '' },
      links: { state: s, label: '—', title: '' },
    };
  }
  const a = p.research.artefacts;
  const research = a === 7
    ? { state: 'done', label: '7/7', title: 'Full pipeline: source map, gap, briefs, content, components, images, verification' }
    : a === 0
      ? { state: 'na', label: 'pre‑pipeline', title: 'Built before the formal pipeline existed. Researched, but no stage artefacts on file.' }
      : { state: 'part', label: `${a}/7`, title: `${a} of 7 stage artefacts present` };

  const content = { state: 'done', label: `${p.content.words.toLocaleString()} words`, title: `${p.content.h2s.length} sections` };

  const images = p.images.fpo
    ? { state: 'part', label: `${p.images.fpo} placeholder${p.images.fpo > 1 ? 's' : ''}`, title: 'Renders "Image placeholder" and its art direction as visible body copy' }
    : p.images.real
      ? { state: 'done', label: `${p.images.real} image${p.images.real > 1 ? 's' : ''}`, title: 'Real images, no placeholders' }
      : { state: 'na', label: 'none needed', title: 'No image slots on this page' };

  const seoOk = p.seo.indexable && p.seo.hasDesc && p.seo.hasCanonical && p.seo.schema.length > 0;
  const seo = p.seo.noindex
    ? { state: 'block', label: 'noindex', title: 'Deliberately held out of the index and the XML sitemap' }
    : seoOk
      ? { state: 'done', label: `${p.seo.schema.length} schema`, title: `${p.seo.schema.join(', ')} · title, description, canonical all present` }
      : { state: 'part', label: 'partial', title: 'Missing one of: sitemap entry, description, canonical, schema' };

  const links = p.links.inboundCount
    ? { state: 'done', label: `${p.links.inboundCount} inbound`, title: `Linked in-body from: ${p.links.from.join(', ')}${p.links.inboundCount > p.links.from.length ? ' …' : ''}` }
    : { state: 'part', label: 'none', title: 'No in-body links from any other page. Reachable only through site chrome.' };

  return { research, content, images, seo, links };
}

const cell = (c) => `<td class="c"><span class="chip s-${c.state}"${c.title ? ` title="${esc(c.title)}"` : ''}>${esc(c.label)}</span></td>`;

// ---- totals ----------------------------------------------------------------------------------
let planned = 0, built = 0, indexable = 0, fpoPages = 0, fullPipeline = 0, orphan = 0;
for (const g of d.groups) for (const p of g.pages) {
  planned++;
  if (!p.built) continue;
  built++;
  if (p.seo.indexable) indexable++;
  if (p.images.fpo) fpoPages++;
  if (p.research.artefacts === 7) fullPipeline++;
  if (!p.links.inboundCount) orphan++;
}

const groupRows = d.groups.map((g) => {
  const done = g.pages.filter((p) => p.built).length;
  const rows = g.pages.map((p) => {
    const dm = dims(p);
    const label = p.actualSlug
      ? `${esc(p.slug)} <em>built as ${esc(p.actualSlug)}</em>`
      : esc(p.slug);
    const outline = p.built && p.content
      ? `<details class="out"><summary>Heading outline &middot; ${p.content.h2s.length} sections</summary>
           <p class="h1">${esc(p.content.h1)}</p>
           <ol>${p.content.h2s.map((h) => `<li>${esc(h)}</li>`).join('')}</ol></details>`
      : '';
    return `<tr>
      <th scope="row"><span class="nm">${esc(p.name)}</span><span class="sl">${label}</span><span class="wv">${esc(p.wave)}</span>${outline}</th>
      ${cell(dm.research)}${cell(dm.content)}${cell(dm.images)}${cell(dm.seo)}${cell(dm.links)}
    </tr>`;
  }).join('\n');
  return `<section class="grp">
    <h2>${esc(g.group)} <span class="cnt">${done}<span>/${g.pages.length} built</span></span></h2>
    <div class="tw"><table>
      <thead><tr><th scope="col">Page</th><th scope="col">Research</th><th scope="col">Content</th><th scope="col">Images</th><th scope="col">SEO</th><th scope="col">Links</th></tr></thead>
      <tbody>${rows}</tbody>
    </table></div>
  </section>`;
}).join('\n');

const pct = Math.round((built / planned) * 100);

const html = `<title>ABE site build status</title>
<style>
:root{
  --ground:#fbf9f5; --paper:#fff; --ink:#1a1a1a; --ink-2:#33312e; --slate:#6b6660;
  --rule:#e4e0d8; --rule-strong:#c9c3b8; --maroon:#800000;
  --done:#2f5d3a; --done-bg:#eaf0ea; --part:#8a5a08; --part-bg:#f7efdf;
  --block:#800000; --block-bg:#f4e7e7; --na:#6b6660; --na-bg:#efece6;
  --shadow:none;
  --display:"Archivo","Helvetica Neue",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
  --body:"DM Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
  --mono:ui-monospace,"SF Mono","Cascadia Mono","Roboto Mono",Menlo,Consolas,monospace;
}
@media (prefers-color-scheme:dark){:root{
  --ground:#16150f; --paper:#1e1c17; --ink:#f2efe8; --ink-2:#ddd8ce; --slate:#a7a096;
  --rule:#302c24; --rule-strong:#463f34; --maroon:#e08585;
  --done:#8fce9f; --done-bg:#1b2a1f; --part:#e3b96a; --part-bg:#2c2416;
  --block:#e79a9a; --block-bg:#2e1a1a; --na:#a7a096; --na-bg:#252219;
}}
:root[data-theme="dark"]{
  --ground:#16150f; --paper:#1e1c17; --ink:#f2efe8; --ink-2:#ddd8ce; --slate:#a7a096;
  --rule:#302c24; --rule-strong:#463f34; --maroon:#e08585;
  --done:#8fce9f; --done-bg:#1b2a1f; --part:#e3b96a; --part-bg:#2c2416;
  --block:#e79a9a; --block-bg:#2e1a1a; --na:#a7a096; --na-bg:#252219;
}
:root[data-theme="light"]{
  --ground:#fbf9f5; --paper:#fff; --ink:#1a1a1a; --ink-2:#33312e; --slate:#6b6660;
  --rule:#e4e0d8; --rule-strong:#c9c3b8; --maroon:#800000;
  --done:#2f5d3a; --done-bg:#eaf0ea; --part:#8a5a08; --part-bg:#f7efdf;
  --block:#800000; --block-bg:#f4e7e7; --na:#6b6660; --na-bg:#efece6;
}
*{box-sizing:border-box}
body{margin:0;background:var(--ground);color:var(--ink-2);font-family:var(--body);font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased}
.wrap{max-width:1120px;margin:0 auto;padding:48px 24px 96px}
.eyebrow{font-family:var(--mono);font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--slate);display:flex;align-items:center;gap:12px;margin:0 0 18px}
.eyebrow::before{content:"";width:20px;height:1px;background:var(--maroon);flex:none}
h1{font-family:var(--display);font-weight:700;letter-spacing:-.03em;font-size:clamp(32px,5vw,52px);line-height:1.04;color:var(--ink);margin:0 0 14px;text-wrap:balance}
.lede{font-size:19px;line-height:1.55;color:var(--ink-2);max-width:60ch;margin:0 0 36px}
.lede b{color:var(--ink);font-weight:600}
/* Summary ------------------------------------------------------------------ */
.sum{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:1px;background:var(--rule);border:1px solid var(--rule);margin:0 0 10px}
.sum div{background:var(--paper);padding:18px 20px}
.sum .n{font-family:var(--display);font-weight:700;font-size:34px;line-height:1;color:var(--ink);font-variant-numeric:tabular-nums;display:block}
.sum .k{font-family:var(--mono);font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--slate);display:block;margin-top:8px}
.bar{height:8px;background:var(--rule);border:1px solid var(--rule);display:flex;margin:0 0 44px}
.bar i{display:block;background:var(--maroon)}
/* Groups ------------------------------------------------------------------- */
.grp{margin:0 0 42px}
.grp h2{font-family:var(--display);font-weight:600;font-size:22px;letter-spacing:-.01em;color:var(--ink);margin:0 0 14px;display:flex;align-items:baseline;gap:14px}
.cnt{font-family:var(--mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--maroon);font-variant-numeric:tabular-nums}
.cnt span{color:var(--slate)}
.tw{overflow-x:auto;border:1px solid var(--rule)}
table{width:100%;border-collapse:collapse;background:var(--paper);min-width:720px}
thead th{font-family:var(--mono);font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--slate);text-align:left;font-weight:500;padding:11px 14px;border-bottom:1px solid var(--rule-strong);white-space:nowrap}
tbody th{text-align:left;font-weight:400;padding:13px 14px;border-bottom:1px solid var(--rule);vertical-align:top;min-width:250px}
tbody tr:last-child th,tbody tr:last-child td{border-bottom:0}
td.c{padding:13px 10px;border-bottom:1px solid var(--rule);vertical-align:top;white-space:nowrap}
.nm{display:block;color:var(--ink);font-weight:600;font-size:15px}
.sl{display:block;font-family:var(--mono);font-size:11.5px;color:var(--slate);margin-top:3px;word-break:break-all}
.sl em{font-style:normal;color:var(--maroon)}
.wv{display:inline-block;font-family:var(--mono);font-size:10px;letter-spacing:.1em;color:var(--slate);border:1px solid var(--rule-strong);padding:1px 5px;margin-top:7px}
.chip{font-family:var(--mono);font-size:11px;letter-spacing:.04em;padding:4px 8px;border:1px solid currentColor;display:inline-block;white-space:nowrap}
.s-done{color:var(--done);background:var(--done-bg)}
.s-part{color:var(--part);background:var(--part-bg)}
.s-block{color:var(--block);background:var(--block-bg)}
.s-none{color:var(--na);background:transparent;border-style:dashed}
.s-na{color:var(--na);background:var(--na-bg)}
/* Outline reveal ----------------------------------------------------------- */
.out{margin-top:10px}
.out summary{font-family:var(--mono);font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--maroon);cursor:pointer;padding:3px 0}
.out summary:focus-visible{outline:2px solid var(--maroon);outline-offset:2px}
.out[open] summary{margin-bottom:8px}
.out .h1{font-family:var(--display);font-weight:600;font-size:14px;color:var(--ink);margin:0 0 6px;line-height:1.35}
.out ol{margin:0;padding-left:20px;font-size:13px;color:var(--slate);line-height:1.65}
.out li{margin-bottom:2px}
/* Key ---------------------------------------------------------------------- */
.key{border:1px solid var(--rule);background:var(--paper);padding:20px 22px;margin:0 0 44px}
.key h3{font-family:var(--mono);font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--slate);margin:0 0 12px;font-weight:500}
.key ul{margin:0;padding:0;list-style:none;display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:10px 26px;font-size:14px}
.key li{display:flex;gap:10px;align-items:baseline}
.note{border-left:2px solid var(--maroon);padding:2px 0 2px 18px;margin:0 0 44px;font-size:15px;color:var(--ink-2);max-width:68ch}
.note b{color:var(--ink)}
.note + .note{margin-top:-30px}
footer{margin-top:60px;padding-top:22px;border-top:1px solid var(--rule);font-family:var(--mono);font-size:11px;letter-spacing:.05em;color:var(--slate);line-height:1.8}
@media (max-width:600px){.wrap{padding:32px 16px 64px}}
</style>

<div class="wrap">
  <p class="eyebrow">ABE Education &middot; site migration &middot; ${esc(DATE)}</p>
  <h1>Build status, measured against the build.</h1>
  <p class="lede">Every cell below was read from <code>dist/</code> and the generated XML sitemap, not from a tracker. <b>${built} of ${planned} planned pages exist</b>, ${indexable} are indexable, and <b>${fpoPages} live pages still render placeholder text where an image should be</b>.</p>

  <div class="sum">
    <div><span class="n">${built}<span style="color:var(--slate);font-size:20px">/${planned}</span></span><span class="k">Pages built</span></div>
    <div><span class="n">${indexable}</span><span class="k">Indexable</span></div>
    <div><span class="n">${fullPipeline}</span><span class="k">Full pipeline 7/7</span></div>
    <div><span class="n">${fpoPages}</span><span class="k">Awaiting images</span></div>
    <div><span class="n">${orphan}</span><span class="k">No inbound links</span></div>
  </div>
  <div class="bar" role="img" aria-label="${pct} per cent of planned pages built"><i style="width:${pct}%"></i></div>

  <div class="key">
    <h3>How to read a row</h3>
    <ul>
      <li><span class="chip s-done">done</span><span>Complete and verified</span></li>
      <li><span class="chip s-part">partial</span><span>Built, something outstanding</span></li>
      <li><span class="chip s-na">n/a</span><span>Doesn't apply to this page</span></li>
      <li><span class="chip s-block">blocked</span><span>Held back deliberately</span></li>
      <li><span class="chip s-none">—</span><span>Not started</span></li>
    </ul>
  </div>

  <p class="note"><b>“Pre‑pipeline” is not missing research.</b> Six pages were built before the formal nine-stage pipeline existed. They are researched and sourced; they simply have no stage artefacts on file, which is why they read as <em>pre‑pipeline</em> rather than zero.</p>
  <p class="note"><b>Inbound links count body links only.</b> Header and footer link almost everything to almost everything, so counting site chrome would report every page as well connected and the number would mean nothing.</p>

${groupRows}

  <footer>
    Generated from <code>dist/</code> by <code>scripts/page-status.mjs</code> after a clean build.<br>
    Refresh: <code>npm run build</code> &rarr; <code>node scripts/page-status.mjs</code> &rarr; re-publish.<br>
    Planned inventory follows <code>new&nbsp;site/abe-new-site-sitemap.md</code>.
  </footer>
</div>`;

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, html);
console.log(`status-board: wrote ${OUT}`);
console.log(`  ${planned} planned · ${built} built · ${indexable} indexable · ${fpoPages} awaiting images · ${orphan} with no inbound links`);
