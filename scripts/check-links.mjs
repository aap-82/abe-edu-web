/**
 * check-links.mjs — every same-origin link in dist/ resolves to something that exists.
 *
 * WHY THIS EXISTS. `guardrails.ts` already checks two of the three link failure modes:
 * check 6 resolves in-page anchors (`#foo` with no element), and check 8 catches orphans
 * (nothing links TO a page). The third mode was unguarded in both directions:
 *
 *   nothing verified that a link points AT something that exists.
 *
 * A 28 Jul 2026 audit found the footer linking every one of 19 pages to ten URLs that are
 * not built — 190 dead links — with a green build, green guardrails and a green health run.
 * Nine were legitimately unbuilt Wave 3-5 pages; one (`/cpd-bundles`) had been dropped from
 * the IA entirely and could never resolve. Nothing could tell those two cases apart, which
 * is exactly the distinction that matters.
 *
 * SHAPE. Deliberately the same idiom as check-redirect-targets.mjs, because it has the same
 * problem: the chrome is built ahead of the pages it points at, so a plain "every link must
 * resolve" gate would fail today and be switched off tomorrow. Targets are allowed to be
 * planned, explicitly and individually, and the list is self-cleaning:
 *
 *   missing + not planned   -> FAIL. A typo, or a link to a page nobody is building.
 *   missing + planned       -> ok. The wave that builds it is named.
 *   exists  + still planned -> FAIL. The page landed; delete its line below.
 *
 * That last case is what stops PLANNED rotting into a permanent allowlist. When PLANNED is
 * empty, delete the mechanism and make the gate absolute — that is the cutover state.
 *
 * Run after `npm run build`. Reports, does not throw: a dead link on an unbuilt site is work
 * to schedule, not a publish hard-blocker, and this must never be the reason a build is red.
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { slugArg, bySlug, slugNote } from './lib/slug-filter.mjs';

const ROOT = join(import.meta.dirname, '..');
const DIST = join(ROOT, 'dist');

/**
 * Same-origin targets that do not exist yet, each naming the pass that builds it. Sourced from
 * `new site/abe-migration-implementation-plan.md`. A link to anything not built and not listed
 * here is a FAIL.
 */
const PLANNED = new Map([
  ['/white-card', 'W3-6 - White Card hub'],
  ['/about', 'W4 - about page'],
  ['/contact', 'W5-4 - contact'],
  ['/faq', 'W5-4 - FAQ'],
  ['/terms', 'W5-5 - legal'],
  ['/privacy', 'W5-5 - legal'],
  ['/cookies', 'W5-5 - legal'],
  ['/cancellation-and-refund-policy', 'W5-5 - legal'],
  ['/saaustralia', 'Solar Association Australia partner page (in scope, CLAUDE.md)'],
  ['/tas-cpd-architects-courses', 'W3 - TAS architects CPD'],
  ['/tas-cpd-building-designers-courses', 'W3 - TAS building designers CPD'],
]);

/**
 * Paths served by LearnWorlds on today's apex, not by this build. They are same-origin today
 * and dead the moment the Astro build owns the apex, so they are reported separately rather
 * than mixed in with unbuilt ABE pages: the fix is the `learn.` subdomain decision, not a
 * page to write. See SKILL.md stage 7 (e).
 */
const LEARNWORLDS = [/^\/program\//, /^\/course\//, /^\/payment(\?|$)/];

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

if (!existsSync(DIST)) {
  console.error('dist/ not found. Run `npm run build` before this check.');
  process.exit(1);
}

const files = walk(DIST);
const html = files.filter((f) => f.endsWith('.html'));

// NOTE the parentheses. Without them the .replace() chain binds to relative(), which never has a
// leading slash, so `/index\.html$` cannot match and dist/index.html resolves to "/index" instead
// of "/" — making the root look unbuilt and every logo link in the site report as broken.
const routeOf = (f) => {
  const r = ('/' + relative(DIST, f).replace(/\\/g, '/')).replace(/\/index\.html$/, '').replace(/\.html$/, '');
  return r === '' ? '/' : r;
};

const routes = new Set(html.map(routeOf));
const assets = new Set(files.map((f) => '/' + relative(DIST, f).replace(/\\/g, '/')));
const idsByRoute = new Map(
  html.map((f) => [routeOf(f), new Set([...readFileSync(f, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]))]),
);

const fails = [];
const warns = [];
const dead = new Map();          // target -> pages linking to it
const learnworlds = new Map();
const plannedHits = new Set();
let checked = 0;

for (const f of html) {
  const page = routeOf(f);
  const src = readFileSync(f, 'utf8');
  for (const [, raw] of src.matchAll(/\shref="([^"]*)"/g)) {
    let href = raw.replace(/&amp;/g, '&');
    if (!href || /^(mailto:|tel:|data:|javascript:)/.test(href)) continue;

    // Absolute links to our own domain are same-origin for this purpose. Anything else is external.
    if (/^https?:\/\//.test(href)) {
      let u;
      try { u = new URL(href); } catch { fails.push(`${page}: unparseable href "${href}"`); continue; }
      if (!/^(www\.)?abeeducation\.edu\.au$/.test(u.host)) continue;
      href = u.pathname + u.search;
    }
    if (href.startsWith('#')) continue;          // guardrails check 6 owns in-page anchors
    if (!href.startsWith('/')) { fails.push(`${page}: relative href "${href}" (expected root-relative)`); continue; }

    checked++;
    const [pathPart, hash] = href.split('#');
    const clean = pathPart.replace(/\/$/, '') || '/';

    if (LEARNWORLDS.some((re) => re.test(clean))) {
      if (!learnworlds.has(clean)) learnworlds.set(clean, new Set());
      learnworlds.get(clean).add(page);
      continue;
    }
    if (routes.has(clean)) {
      // Cross-page fragment: guardrails only resolves fragments within the same page.
      if (hash && !idsByRoute.get(clean).has(decodeURIComponent(hash))) {
        fails.push(`${page}: -> ${clean}#${hash} — target page has no element with that id`);
      }
      continue;
    }
    if (assets.has(pathPart)) continue;
    if (PLANNED.has(clean)) { plannedHits.add(clean); continue; }
    if (!dead.has(clean)) dead.set(clean, new Set());
    dead.get(clean).add(page);
  }
}

/* BREADCRUMBS ARE HELD STRICTER THAN `PLANNED`.
   `PLANNED` exists so chrome can be built ahead of the pages it points at: a footer link to a
   wave-5 page is sequencing, not a defect. A BREADCRUMB is not chrome. It is a visible link the
   reader will click and a `BreadcrumbList` item Google resolves, so an unbuilt target there is a
   404 in the page's own navigation and an invalid rich result in its schema.
   This check exists because that distinction was missed. `/white-card-wa` shipped with a crumb
   pointing at the unbuilt `/white-card`, in both the visible nav and the schema, and this script
   passed it — the slug is legitimately in `PLANNED`, so it read as "not built yet" rather than
   "broken". An independent Stage 7 audit caught it; the gate did not. Now the gate does. */
const crumbDead = new Map();
for (const f of html) {
  const page = routeOf(f);
  const src = readFileSync(f, 'utf8');
  const targets = new Set();
  const nav = src.match(/<nav[^>]*class="crumbs"[\s\S]*?<\/nav>/);
  if (nav) for (const [, h] of nav[0].matchAll(/href="([^"#?]*)"/g)) targets.add(h);
  const bl = src.match(/"BreadcrumbList"[\s\S]*?\]/);
  if (bl) {
    for (const [, u] of bl[0].matchAll(/"item":"([^"]+)"/g)) {
      try {
        const p = new URL(u);
        if (/^(www\.)?abeeducation\.edu\.au$/.test(p.host)) targets.add(p.pathname);
      } catch { /* a non-URL item is guardrails' problem, not this check's */ }
    }
  }
  for (const raw of targets) {
    const t = raw.replace(/\/$/, '') || '/';
    if (!t.startsWith('/') || routes.has(t) || assets.has(t)) continue;
    if (!crumbDead.has(t)) crumbDead.set(t, new Set());
    crumbDead.get(t).add(page);
  }
}
for (const [target, pages] of crumbDead) {
  fails.push(`${target} — BREADCRUMB target does not resolve, on ${[...pages].sort().join(', ')}. Being in PLANNED does not excuse this: a crumb is a visible 404 and a BreadcrumbList item naming it is an invalid rich result. Drop the crumb until the page ships.`);
}

// One line per dead TARGET, with a source count. A footer link is one defect with one fix, not
// nineteen defects, and the count is what tells a chrome-wide link apart from a one-off typo.
for (const [target, pages] of dead) {
  const from = pages.size > 3 ? `${pages.size} pages (chrome)` : [...pages].sort().join(', ');
  fails.push(`${target} — no such route, asset or planned page. Linked from ${from}.`);
}

// exists + still planned -> the page landed and its line should go.
for (const [p, pass] of PLANNED) {
  if (routes.has(p)) fails.push(`/${p.replace(/^\//, '')} now exists but is still listed in PLANNED (${pass}). Delete its line in scripts/check-links.mjs.`);
}
for (const [p, pass] of PLANNED) {
  if (!plannedHits.has(p) && !routes.has(p)) warns.push(`PLANNED entry never linked from anywhere: ${p} (${pass}) — stale entry, or the link was removed.`);
}
for (const [p, pages] of learnworlds) {
  warns.push(`LearnWorlds path linked same-origin: ${p} — from ${[...pages].join(', ')}. Dead at cutover unless the learn. subdomain decision keeps it on the apex.`);
}

// One line per distinct problem. The same footer link repeated across 19 pages is one defect with
// one fix, and printing it 19 times is how a check stops being read (ROADMAP recording policy).
const dedupe = (xs) => [...new Set(xs)].sort();
console.log('\n=== Internal link resolution ===\n');
const SLUG = slugArg();
const shownW = bySlug(dedupe(warns), SLUG), shownF = bySlug(dedupe(fails), SLUG);
for (const w of shownW) console.log(`  WARN  ${w}`);
for (const f of shownF) console.log(`  FAIL  ${f}`);
if (SLUG) console.log(slugNote(SLUG, shownW.length + shownF.length, dedupe(warns).length + dedupe(fails).length));
if (!fails.length) console.log(`  OK    ${checked} same-origin link(s) resolve (${plannedHits.size} to explicitly planned page(s))`);
console.log(`\n  ${fails.length} failing, ${warns.length} warning\n`);
process.exit(0);
