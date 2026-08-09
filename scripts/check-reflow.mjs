#!/usr/bin/env node
/**
 * Rendered-layout check: horizontal overflow, and characters per line.
 *
 * WHY THIS EXISTS. Every other check in this repo reads source or built HTML as TEXT. None of
 * them renders anything, so none of them can see a layout defect. Two consequences, both paid for:
 *
 *   1. A 90px sideways scroll at 320px survived a green build, 20/20 guardrails, check-claims 0
 *      failing and an independent Stage 7 audit, on every page rendering PartnerDisclosure. It had
 *      THREE independent causes, so a one-off fix would not have held. Two occurrences, ROADMAP
 *      Phase 3.
 *   2. `.capsule` rendered 92 characters per line against an 85 hard rule and was filed SIX times
 *      across five sessions without being fixed, because the cap was written `max-width: 66ch` and
 *      66 looks correct. `1ch` is the advance of the "0" glyph (12.42px in DM Sans 18px), not of an
 *      average character (8.41px), so 66ch bought 92 characters. Nothing could measure the rendered
 *      line, so five sessions re-derived the same wrong conclusion from the same wrong unit.
 *
 * Defect 2 is the argument for this file. A rule enforced only by a hand-run browser audit is a
 * rule that gets filed rather than fixed.
 *
 * HOW CPL IS MEASURED. Not by counting glyphs on a line, which needs line-box introspection the DOM
 * does not expose. Content width divided by the average character advance of the element's OWN text
 * in its OWN computed font, measured on a canvas. That is the same method used to diagnose the
 * capsule defect, and it is why the numbers here match the ones in the design review.
 *
 * NOT WIRED INTO prebuild, DELIBERATELY. It needs a browser and a built dist/, and it takes seconds
 * per page rather than milliseconds. `npm run check:reflow`, and in CI where it can afford the time.
 * It serves dist/ itself on an ephemeral port, so it needs no dev server and cannot collide with one.
 *
 * SKIPS RATHER THAN GUESSES when playwright or its browser is absent, exiting 0 with a reason -
 * the same contract check-shipped.mjs uses for a missing `gh`. A check that fails because the tool
 * is missing teaches people to ignore it.
 *
 * Exit 1 on a real breach, so CI can gate on it. `--json` for machine output.
 */

import { createServer } from 'node:http';
import { readFile, readdir } from 'node:fs/promises';
import { existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const JSON_OUT = process.argv.includes('--json');
const SLUG = (process.argv.find((a) => a.startsWith('--slug=')) || '').split('=')[1] || null;

/* The two viewports the readability standard names. 375 is the phone-first case every tonal and
   layout decision in this repo is verified at; 1280 is where a max-width cap actually binds, and
   therefore the only width at which a too-wide measure is visible at all. */
const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 812, cplMin: 30, cplMax: 60 },
  { name: 'desktop', width: 1280, height: 900, cplMin: 45, cplMax: 85 },
];

/* Prose carriers only. A heading, a label, a nav item and a table cell are all text, and none of
   them is reading copy: CPL is a rule about sustained prose, and applying it to a 3-word eyebrow
   produces noise that gets ignored, which is how the capsule defect survived. */
const PROSE = ['.capsule', '.trust-lede', '.unit-eb', '.lede', '.measure', '.mr-body', '.mr-outcome', '.sec p'];

/* Elements allowed to exceed the viewport because they scroll INSIDE their own container by
   design. The check tests containment rather than trusting this list: an element only passes if an
   ancestor actually establishes an overflow-x scroll box. */
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.avif': 'image/avif', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.xml': 'application/xml', '.txt': 'text/plain', '.ico': 'image/x-icon' };

/* CPL DEBT IS RATCHETED, NOT FLAT-FAILED, and the reason is the same one BANNED_CTA_BUDGET and
   INLINE_STYLE_BUDGET give. On its first run this check found 35 breaches of the 85 rule in genuine
   reading copy across ELEVEN live pages, all of them uncapped `<p>` inside `.sec` that never got the
   documented `.measure` wrapper. (The first draft of this table said seven, because it was typed
   from a truncated terminal tail rather than from the tool's own `--json`. Derive the table with
   `node scripts/check-reflow.mjs --json`, never by reading the console.)
   A flat FAIL would redden every build from today over debt that a
   skills session may not fix - `src/styles/**` and page content belong to design and build - and a
   red nobody is allowed to clear is a red everyone learns to ignore.
   So each page carries its current count as a budget, and it can only go down:
     over budget   -> FAIL. A new breach; cap the measure.
     under budget  -> FAIL. Debt was paid; lower the number so it cannot creep back.
     absent        -> budget 0. Pages written from here on start clean.
   Delete a line when it reaches 0. The whole table is meant to disappear. */
/* EMPTY, AND IT REACHED EMPTY THE SAME DAY IT WAS WRITTEN. The table opened at 35 breaches across
   eleven pages and closed at zero in one design session, because the 35 turned out to be three
   causes rather than thirty-five decisions: `.step p` had no cap at all (13), prose was written
   straight into a section without the `.measure` wrapper (14), and four inline `max-width:NNch`
   overrides on `.measure` reproduced the `ch` unit bug a third time (7). Two CSS rules and four
   deletions. Every page now measures 0 over the 85 rule at 1280px.
   Leave this empty. A page appearing here again is a regression, and budget 0 is what makes it
   fail on the first build rather than on the sixth filing. */
const CPL_BUDGET = {};

const out = { fails: [], warns: [], oks: [] };
const F = (m) => out.fails.push(m);
const W = (m) => out.warns.push(m);
const OK = (m) => out.oks.push(m);

function serveDist() {
  const root = 'dist';
  const server = createServer(async (req, res) => {
    try {
      let p = decodeURIComponent((req.url || '/').split('?')[0]);
      let file = join(root, p);
      if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
      else if (!existsSync(file) && existsSync(file + '/index.html')) file = file + '/index.html';
      else if (!existsSync(file) && existsSync(file + '.html')) file = file + '.html';
      if (!existsSync(file)) { res.writeHead(404); return res.end('not found'); }
      const body = await readFile(file);
      res.writeHead(200, { 'content-type': MIME[extname(file)] || 'application/octet-stream' });
      res.end(body);
    } catch { res.writeHead(500); res.end('error'); }
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve(server)));
}

/* Runs INSIDE the page. Returns raw measurements only - every threshold decision is made in node,
   so the rule and the measurement never live in the same place. */
function measure(proseSelectors) {
  const vw = window.innerWidth;

  const overflowPx = document.documentElement.scrollWidth - vw;
  const uncontained = [];
  document.querySelectorAll('body *').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.width <= vw + 1 && r.right <= vw + 1) return;
    let p = el.parentElement, contained = false;
    while (p && p !== document.body) {
      const ox = getComputedStyle(p).overflowX;
      if (ox === 'auto' || ox === 'scroll' || ox === 'hidden' || ox === 'clip') { contained = true; break; }
      p = p.parentElement;
    }
    if (!contained) {
      uncontained.push({ tag: el.tagName.toLowerCase(), cls: String(el.className || '').slice(0, 40), right: Math.round(r.right) });
    }
  });

  const prose = [];
  const seen = new Set();
  for (const sel of proseSelectors) {
    document.querySelectorAll(sel).forEach((el) => {
      if (seen.has(el)) return;
      seen.add(el);
      const text = (el.innerText || '').replace(/\s+/g, ' ').trim();
      if (text.length < 60) return;                       // too short to have a measure worth judging
      if (el.querySelector('.capsule, .lede, p')) return; // container, not a leaf: its child is measured instead
      const cs = getComputedStyle(el);
      /* READING COPY ONLY, and this bound is the difference between a check people act on and one
         they learn to scroll past. The first run flagged 57 elements, most of them 11px mono source
         lines and 14px footnotes running 93 to 173 CPL - correctly measured, and not defects: the
         CPL rule governs sustained prose, and micro-type is set wide ON PURPOSE (DESIGN.md's Label
         is 11px tracked 0.18em, and a 480px cap on a one-line meta string would look broken). 16px
         is the body floor the readability standard already uses, so the rule and its scope agree. */
      if (parseFloat(cs.fontSize) < 16) return;
      const ctx = document.createElement('canvas').getContext('2d');
      ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      const avg = ctx.measureText(text).width / text.length;
      if (!avg || !isFinite(avg)) return;
      const box = el.getBoundingClientRect().width
        - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)
        - parseFloat(cs.borderLeftWidth) - parseFloat(cs.borderRightWidth);
      if (box <= 0) return;
      prose.push({ sel, cpl: Math.round(box / avg), fontSize: cs.fontSize });
    });
  }
  return { overflowPx, uncontained: uncontained.slice(0, 6), uncontainedCount: uncontained.length, prose };
}

async function main() {
  if (!existsSync('dist')) {
    console.log('check-reflow: no dist/ - run `npm run build` first. Skipping.');
    process.exit(0);
  }

  let chromium;
  try { ({ chromium } = await import('playwright')); }
  catch {
    console.log('check-reflow: playwright not installed - skipping rather than failing.\n  npm i -D playwright && npx playwright install chromium');
    process.exit(0);
  }

  let browser;
  try { browser = await chromium.launch(); }
  catch (e) {
    console.log('check-reflow: chromium not available - skipping rather than failing.\n  npx playwright install chromium\n  (' + String(e.message).split('\n')[0] + ')');
    process.exit(0);
  }

  const server = await serveDist();
  const port = server.address().port;
  const base = `http://127.0.0.1:${port}`;

  const entries = await readdir('dist', { withFileTypes: true });
  let slugs = entries.filter((d) => d.isDirectory() && existsSync(join('dist', d.name, 'index.html'))).map((d) => d.name);
  if (existsSync('dist/index.html')) slugs.unshift('');
  slugs = slugs.filter((s) => !s.startsWith('_') && s !== 'styleguide' || s === 'styleguide');
  if (SLUG) slugs = slugs.filter((s) => s === SLUG);

  const rows = [];
  const page = await browser.newPage();
  for (const slug of slugs) {
    for (const vp of VIEWPORTS) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(`${base}/${slug}`, { waitUntil: 'networkidle' });
      const m = await page.evaluate(measure, PROSE);
      const label = '/' + slug;

      if (m.overflowPx > 0 && m.uncontainedCount > 0) {
        const worst = m.uncontained.map((u) => `${u.tag}.${u.cls} (right ${u.right}px)`).join(', ');
        F(`${label} @${vp.width}px: scrolls ${m.overflowPx}px sideways. ${m.uncontainedCount} element(s) outside any overflow container: ${worst}`);
      } else if (m.overflowPx > 0) {
        W(`${label} @${vp.width}px: document scrollWidth exceeds viewport by ${m.overflowPx}px, but every wide element sits inside its own scroll container. Usually benign.`);
      }

      /* Budget applies at desktop only. A cap binds at 1280 and cannot at 375, where the viewport
         is narrower than any sane measure - so a mobile breach means something is genuinely broken
         (a fixed width, an unwrappable string) and is never pre-existing debt. */
      const over = m.prose.filter((p) => p.cpl > vp.cplMax);
      if (vp.name === 'desktop') {
        const budget = CPL_BUDGET[label] ?? 0;
        if (over.length > budget) {
          const worst = over.sort((a, b) => b.cpl - a.cpl).slice(0, 3)
            .map((p) => `\`${p.sel}\` ${p.cpl} CPL at ${p.fontSize}`).join('; ');
          F(`${label} @${vp.width}px: ${over.length} prose element(s) over the ${vp.cplMax} CPL rule, budget ${budget}. Worst: ${worst}. Cap the measure in px, never ch - see global.css .capsule.`);
        } else if (over.length < budget) {
          F(`${label} @${vp.width}px: ${over.length} element(s) over the CPL rule but CPL_BUDGET still allows ${budget}. Debt was paid - lower it to ${over.length}${over.length === 0 ? ' (or delete the line)' : ''} in scripts/check-reflow.mjs so it cannot creep back.`);
        }
      } else {
        for (const p of over) {
          F(`${label} @${vp.width}px: \`${p.sel}\` renders ${p.cpl} CPL at ${p.fontSize}, over the ${vp.cplMax} rule at MOBILE, where a cap cannot be the cause. Something is unwrappable or fixed-width.`);
        }
      }
      const cpls = m.prose.map((p) => p.cpl);
      rows.push({ page: label, vw: vp.width, n: cpls.length,
        median: cpls.length ? cpls.sort((a, b) => a - b)[Math.floor(cpls.length / 2)] : null,
        over: over.length, overflowPx: m.overflowPx });
    }
  }

  await browser.close();
  server.close();

  const totalOver = rows.reduce((a, r) => a + r.over, 0);
  const pagesScrolling = rows.filter((r) => r.overflowPx > 0).length;
  if (!totalOver) OK(`Measure: 0 prose element(s) over the CPL rule across ${rows.length} page/viewport combination(s)`);
  if (!pagesScrolling) OK(`Reflow: no page scrolls sideways at 375px or 1280px`);

  if (JSON_OUT) { console.log(JSON.stringify({ rows, ...out }, null, 2)); }
  else {
    console.log('\n=== Rendered layout (reflow + measure) ===\n');
    for (const m of out.fails) console.log('  FAIL  ' + m);
    for (const m of out.warns) console.log('  WARN  ' + m);
    for (const m of out.oks) console.log('  OK    ' + m);
    console.log(`\n  ${out.fails.length} failing, ${out.warns.length} warning, ${out.oks.length} ok`);
    console.log('  Measured in a real browser: CPL is content width / the element\'s own average character advance.\n');
  }
  process.exit(out.fails.length ? 1 : 0);
}

main().catch((e) => { console.error('check-reflow: ' + e.message); process.exit(1); });
