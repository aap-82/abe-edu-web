/**
 * check-meta.mjs — the document head is consistent with itself, and its measured lengths only
 * ever get better.
 *
 * WHY THIS EXISTS. Three head-level signals had no reader at all, and the first of them shipped
 * a live contradiction.
 *
 *   1. SITEMAP vs ROBOTS. On 15 Aug 2026 `/cpd-electrical-tas` and `/cpd-plumbing-tas` rendered
 *      `noindex,nofollow` AND appeared in `sitemap-0.xml`. Both were built on 12 Aug with
 *      `noindex: true` in frontmatter; the sitemap exclusion lived in a hand-maintained array in
 *      `astro.config.mjs` that nobody edited. That array's own comment said "keep the two in
 *      step", which is what a rule looks like when nothing enforces it. The array is now derived
 *      from frontmatter, and this check reads the OUTPUT rather than the intent, so it holds
 *      whatever the derivation gets wrong: a route whose URL is not its content id, a page
 *      noindexed in a layout instead of frontmatter, a future sitemap integration change.
 *
 *   2. CANONICAL FORM. CLAUDE.md fixes it as `https://www.abeeducation.edu.au/<slug>` with no
 *      trailing slash, and the whole redirect-map economics of the cutover rest on it (a
 *      same-slug rebuild is byte-identical to its production URL, so the equity core takes zero
 *      redirects). Nothing measured it.
 *
 *   3. TITLE AND DESCRIPTION LENGTH. `references/seo/meta-framework.md` declares itself the
 *      single source of truth for these targets - titles under 60 characters, descriptions
 *      150-160 - and 15 pages were over, one title at 74 where the framework's own table says
 *      "> 70 chars: ~100% rewritten". Unmeasured targets drift; that is the whole finding.
 *
 * WHY LENGTH IS A RATCHET AND NOT A FLAT FAIL. Fifteen pages are over target today. A check that
 * simply FAILs on "over target" would redden the build immediately for content this session type
 * may not edit (`src/content/**` is build-owned, one page per session), and a red gate nobody is
 * allowed to fix is a gate that gets switched off. So each page over target carries its MEASURED
 * length as a budget, and the rules run in both directions:
 *
 *   over target, no budget line -> FAIL. A new page must meet the target; debt is not inherited.
 *   measured > budget           -> FAIL. It got worse. This is the regression this check exists for.
 *   measured < budget           -> FAIL, asking for the budget to be lowered to the new number.
 *                                  A ratchet that only stops rises silently keeps the old ceiling,
 *                                  and the next author reads it as permission to grow back into it.
 *   measured == budget          -> WARN. Known debt, visible, not blocking.
 *   at or under target          -> FAIL, asking for the line to be deleted. Self-cleaning, the same
 *                                  idiom as PENDING in check-redirect-targets and PLANNED in
 *                                  check-links: a list that cannot empty becomes an allowlist.
 *
 * When BUDGET is empty, delete it and make the target absolute.
 *
 * SCOPE. Only indexable pages. A noindexed page's title is not competing for a SERP, and the
 * redirect stub at `/` has no head worth measuring. Run automatically as part of `postbuild`.
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const ROOT = join(import.meta.dirname, '..');
const DIST = join(ROOT, 'dist');
const ORIGIN = 'https://www.abeeducation.edu.au';

/** meta-framework.md, "Sweet spot" and "Maximum" rows. Display heuristics, not Google rules. */
const TARGET = { title: 60, desc: 160 };

/**
 * Measured 15 Aug 2026 on `main` @ 9ec17e9. Every line is debt, not an allowance: each one is a
 * page whose head is longer than meta-framework.md's target and whose copy is build-owned. Lower
 * a number when the copy improves; delete the line when it reaches target.
 */
const BUDGET = new Map([
  ['/accreditation', { title: 46, desc: 185 }],
  ['/cpd', { title: 46, desc: 163 }],
  ['/cpd-tas', { title: 53, desc: 169 }],
  ['/experts', { title: 74, desc: 158 }],
  ['/experts/dominic-ogburn', { title: 49, desc: 180 }],
  ['/experts/warwick-smith', { title: 66, desc: 164 }],
  ['/owner-builder-courses', { title: 67, desc: 184 }],
  ['/owner-builder-insurance', { title: 53, desc: 200 }],
  ['/project-advisory', { title: 69, desc: 182 }],
  ['/reviews', { title: 31, desc: 162 }],
  ['/white-card', { title: 61, desc: 232 }],
  ['/white-card-act', { title: 65, desc: 166 }],
  ['/white-card-nsw', { title: 64, desc: 208 }],
  ['/white-card-qld', { title: 53, desc: 191 }],
  ['/white-card-tas', { title: 64, desc: 179 }],
]);

if (!existsSync(DIST)) {
  console.log('check-meta: no dist/ — run `npm run build` first.');
  process.exit(0);
}

function walk(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

// `dist/a/b/index.html` is `/a/b`; anything else keeps its own name, so `dist/404.html` is `/404`
// rather than colliding with the root. Astro's `format: 'directory'` means real pages are always
// the first shape and the second is only ever the error page.
const routeOf = (f) => {
  const rel = relative(DIST, f).split(sep);
  const file = rel.pop();
  const dir = rel.length ? '/' + rel.join('/') : '';
  return file === 'index.html' ? dir || '/' : `${dir}/${file.replace(/\.html$/, '')}`;
};

const attr = (html, re) => (html.match(re) || [, ''])[1];

const fails = [];
const warns = [];
const oks = [];

const pages = new Map();
for (const f of walk(DIST)) {
  const html = readFileSync(f, 'utf8');
  // A generated redirect stub is not a page: it has no canonical intent of its own and its title
  // is machine copy. `generate-redirects.mjs` owns them.
  if (/http-equiv="refresh"/.test(html)) continue;
  pages.set(routeOf(f), {
    robots: attr(html, /<meta name="robots" content="([^"]+)"/),
    canonical: attr(html, /<link rel="canonical" href="([^"]+)"/),
    title: attr(html, /<title[^>]*>([^<]*)<\/title>/),
    desc: attr(html, /<meta name="description" content="([^"]*)"/),
  });
}

// -- 1. Sitemap and robots must agree ---------------------------------------------------------
const smPath = join(DIST, 'sitemap-0.xml');
const inSitemap = new Set();
if (existsSync(smPath)) {
  for (const [, loc] of readFileSync(smPath, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)) {
    inSitemap.add(new URL(loc).pathname.replace(/\/$/, '') || '/');
  }
} else {
  warns.push('no dist/sitemap-0.xml — the @astrojs/sitemap integration did not emit one, so the index-signal check below saw nothing.');
}

for (const [route, p] of pages) {
  const noindex = /noindex/.test(p.robots);
  if (noindex && inSitemap.has(route)) {
    fails.push(`${route} renders "${p.robots}" AND is listed in sitemap-0.xml. Contradictory index signals: the sitemap asks Google to index a page whose own head refuses it. Fix the frontmatter flag or the sitemap filter in astro.config.mjs — do not fix it by removing the noindex.`);
  }
  if (!noindex && !inSitemap.has(route) && inSitemap.size) {
    fails.push(`${route} is indexable but missing from sitemap-0.xml. Either it should carry noindex, or astro.config.mjs's sitemap filter is excluding a page that wants traffic.`);
  }
}
for (const route of inSitemap) {
  if (!pages.has(route)) fails.push(`sitemap-0.xml lists ${route}, which is not a built page.`);
}
if (!fails.length && inSitemap.size) {
  oks.push(`Index signals: ${inSitemap.size} sitemap entr(ies) and ${pages.size} built page(s) agree — no page is both noindexed and advertised`);
}

// -- 2. Canonical form ------------------------------------------------------------------------
// Only pages that can rank. `/404` and `/styleguide` deliberately carry no canonical: an error
// document has no canonical URL to point at, and the internal component library is not a
// destination. Requiring one there would be requiring a signal nobody reads.
let canonOk = 0;
let canonScope = 0;
for (const [route, p] of pages) {
  if (/noindex/.test(p.robots)) continue;
  canonScope++;
  if (!p.canonical) {
    fails.push(`${route} has no canonical link. BaseLayout emits one on every page; a missing one means this route bypassed it.`);
    continue;
  }
  const expected = ORIGIN + (route === '/' ? '' : route);
  if (p.canonical !== expected) {
    fails.push(`${route} canonical is "${p.canonical}", expected "${expected}". CLAUDE.md fixes the canonical form as no-slash on www; the cutover redirect map depends on it.`);
  } else canonOk++;
}
if (canonOk === canonScope) oks.push(`Canonical: ${canonOk}/${canonScope} indexable page(s) in the no-slash www form CLAUDE.md fixes`);

// -- 3. Title and description length ratchet --------------------------------------------------
const seen = new Set();
let measuredPages = 0;
for (const [route, p] of pages) {
  if (/noindex/.test(p.robots)) continue;
  measuredPages++;
  const measured = { title: p.title.length, desc: p.desc.length };
  const budget = BUDGET.get(route);
  if (budget) seen.add(route);

  for (const field of ['title', 'desc']) {
    const m = measured[field];
    const t = TARGET[field];
    const b = budget?.[field];
    const label = field === 'title' ? 'title' : 'description';

    if (m === 0) {
      fails.push(`${route} has no ${label}.`);
      continue;
    }
    if (m <= t) {
      if (b !== undefined && b > t) {
        fails.push(`${route} ${label} is now ${m}, at or under the ${t} target, but BUDGET still records ${b}. Delete that field from its line in scripts/check-meta.mjs — a budget the page has already beaten is a ceiling to grow back into.`);
      }
      continue;
    }
    if (b === undefined) {
      fails.push(`${route} ${label} is ${m}, over the ${t}-character target from references/seo/meta-framework.md, and has no BUDGET line. New pages meet the target; debt is not inherited. Shorten it, or add a line and say why in the commit.`);
    } else if (m > b) {
      fails.push(`${route} ${label} grew from ${b} to ${m}, past the ${t} target. This is the regression the ratchet exists to catch.`);
    } else if (m < b) {
      fails.push(`${route} ${label} improved from ${b} to ${m} — lower its BUDGET line in scripts/check-meta.mjs to ${m} so the ratchet holds the gain.`);
    } else {
      const note = field === 'title'
        ? 'meta-framework.md: past 70 characters a title is rewritten by Google ~100% of the time.'
        : 'meta-framework.md: the first 120 characters must carry the core message, so the tail is what gets cut.';
      warns.push(`${route} ${label} is ${m}, over the ${t} target (known debt, budgeted). ${note}`);
    }
  }
}
for (const route of BUDGET.keys()) {
  if (!seen.has(route)) {
    fails.push(`BUDGET names ${route} in scripts/check-meta.mjs, which is not an indexable built page. Delete the line, or find out why the page stopped being indexable.`);
  }
}
const budgeted = BUDGET.size;
if (budgeted) oks.push(`Length ratchet: ${measuredPages - budgeted} indexable page(s) at target, ${budgeted} carrying measured debt, 0 regressions`);

// -- report -----------------------------------------------------------------------------------
// This runs on every build, and the budgeted-debt warnings are 22 near-identical lines about work
// this check cannot authorise anyone to do. Printed in full they would bury the FAILs underneath
// them, which is the failure mode ROADMAP's recording policy names: a check that prints the same
// thing nineteen times stops being read. So they collapse to one line unless asked for. The FAILs
// - the ones that mean something changed - are never collapsed.
const VERBOSE = process.argv.includes('--verbose');
const uniqWarns = [...new Set(warns)].sort();
console.log('\n=== Head signals (sitemap, canonical, meta length) ===\n');
if (VERBOSE) for (const w of uniqWarns) console.log(`  WARN  ${w}`);
else if (uniqWarns.length) console.log(`  WARN  ${BUDGET.size} page(s) carry budgeted title/description debt (${uniqWarns.length} field(s) over target, none worsening). Run \`node scripts/check-meta.mjs --verbose\` to list them.`);
for (const f of [...new Set(fails)].sort()) console.log(`  FAIL  ${f}`);
for (const o of oks) console.log(`  OK    ${o}`);
console.log(`\n  ${fails.length} failing, ${warns.length} warning, ${oks.length} ok\n`);

// Unlike check-links, this one DOES exit non-zero. A page that is both noindexed and advertised in
// the sitemap, or a canonical in the wrong form, is a publish defect rather than work to schedule:
// it misdirects a crawler about a page that is already live.
process.exit(fails.length ? 1 : 0);
