#!/usr/bin/env node
/**
 * Per-page build status across the five dimensions a page is "done" in.
 *
 * WHY THIS EXISTS. `new site/abe-new-site-sitemap.md` tracks ONE bit per page - built or not -
 * and that bit has been wrong twice, both times because it was updated from memory rather than
 * from disk (24 Jul, and again 10 Aug). It also cannot express the state every page is actually
 * in: built, indexable, and still rendering "Image placeholder" as body copy on 12 live pages.
 *
 * So this measures, per planned page:
 *   research      pipeline/{slug}/ artefacts 01..07 present
 *   content       built, and its rendered heading/word counts
 *   images        real <img> in <main> vs FPO placeholders printing their own art direction
 *   seo           title, meta description, canonical, JSON-LD, and sitemap membership
 *   links         inbound in-body links from OTHER built pages (the orphan question)
 *
 * Emits JSON on stdout. Reads `dist/`, so run it after `npm run build`. Reporting only, always
 * exits 0: this is an input to a status view, not a gate. The gates are check-* and system-health.
 */

import { readFileSync, existsSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';

const SITEMAP_DOC = 'new site/abe-new-site-sitemap.md';

/* The planned inventory, in the sitemap document's own order and grouping. Kept here rather than
   parsed out of the ASCII tree: the tree is drawn for humans, and a regex over box-drawing
   characters is exactly the kind of clever-but-brittle parsing that breaks the first time someone
   re-indents it. If a page is added there, add it here. */
const PLANNED = [
  ['Homepage & catalogue', [
    ['/', 'Homepage', 'W5-1'],
    ['/courses', 'Course catalogue', 'W5-2'],
  ]],
  ['Owner Builder', [
    ['/owner-builder-courses', 'Owner Builder hub', 'W2-5'],
    ['/nsw-owner-builder-course', 'NSW Owner Builder', 'W2-3'],
    ['/qld-owner-builder-course', 'QLD Owner Builder', 'W2-1'],
    ['/wa-owner-builder-course', 'WA Owner Builder', 'W2-1'],
    ['/tas-owner-builder-course', 'TAS Owner Builder', 'W2-2'],
    ['/act-owner-builder-course', 'ACT Owner Builder', 'W2-4'],
    ['/insurances', 'Insurance hub', 'W2-6'],
    ['/owner-builder-insurance', 'Owner Builder insurance', 'W2-6'],
    ['/professional-indemnity-insurance', 'Professional indemnity', 'W2-6'],
    ['/project-advisory', 'Project Advisory Pack', 'W2-7'],
  ]],
  ['White Card', [
    ['/white-card', 'White Card hub', 'W3-6'],
    ['/white-card-nsw', 'White Card NSW', 'W3-2'],
    ['/white-card-qld', 'White Card QLD', 'W3-3'],
    ['/white-card-wa', 'White Card WA', 'W3-1'],
    ['/white-card-tas', 'White Card TAS', 'W3-4'],
    ['/white-card-act', 'White Card ACT', 'W3-5'],
  ]],
  ['CPD', [
    ['/cpd', 'CPD main hub', 'W4-8'],
    ['/cpd-nsw', 'NSW CPD hub', 'W4-7'],
    ['/cpd-tas', 'TAS CPD hub', 'W4-6'],
    ['/cpd-wa', 'WA CPD hub', 'W4-7'],
    ['/cpd-building-tas', 'TAS Building bundle', 'W4-2'],
    ['/cpd-plumbing-tas', 'TAS Plumbing bundle', 'W4-3'],
    ['/cpd-electrical-tas', 'TAS Electrical bundle', 'W4-4'],
    ['/cpd-building-nsw', 'NSW Building CPD', 'W4-1'],
    ['/cpd-real-estate-wa', 'WA Real Estate CPD', 'W4-5'],
  ]],
  ['Trust', [
    ['/experts', 'Experts hub', 'W1-3'],
    ['/experts/dominic-ogburn', 'Dominic Ogburn', 'W1-2'],
    ['/experts/warwick-smith', 'Warwick Smith', 'W1-2'],
    ['/accreditation', 'Accreditation', 'W1-4'],
    ['/reviews', 'Reviews', 'W1-5'],
  ]],
  ['Content hub', [['/guides', 'Guides index', 'W5-7']]],
  ['Support', [
    ['/about', 'About', 'W5-3'],
    ['/contact', 'Contact', 'W5-4'],
    ['/faq', 'FAQ', 'W5-4'],
    ['/help', 'Help centre', 'W5-4'],
    ['/saaustralia', 'Solar Association', 'W5-6'],
  ]],
  ['Legal', [
    ['/terms', 'Terms', 'W5-5'],
    ['/privacy', 'Privacy', 'W5-5'],
    ['/cookies', 'Cookies', 'W5-5'],
    ['/cancellation-and-refund-policy', 'Refund policy', 'W5-5'],
  ]],
];

/* Slugs that exist on disk under a DIFFERENT name from the one planned. NSW owner builder is the
   only one: the plan consolidates to /nsw-owner-builder-course, nothing is built there, and what
   exists is the legacy /owner-builder-nsw-course (+ a -w variant), noindexed and on an authority
   hold. Mapping it lets the row show what is really there instead of a bare "not built". */
const ACTUAL = { '/nsw-owner-builder-course': '/owner-builder-nsw-course' };

const dist = (slug) => join('dist', slug === '/' ? '' : slug.slice(1), 'index.html');
const html = (slug) => (existsSync(dist(slug)) ? readFileSync(dist(slug), 'utf8') : null);

const sitemap = existsSync('dist/sitemap-0.xml') ? readFileSync('dist/sitemap-0.xml', 'utf8') : '';
const mainOf = (h) => (h.match(/<main[\s\S]*?<\/main>/) || [''])[0];
const strip = (s) => s.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ');

/* Inbound links: built once over every page, so each row can answer "does anything point here".
   Counted inside <main> only - the header and footer link almost everything to almost everything,
   so counting chrome would report every page as well-linked and the number would mean nothing. */
const inbound = {};
const builtSlugs = [];
/* One level of nesting, because /experts/{name} exists and a top-level-only walk reported both
   expert profiles as having zero inbound links while /experts links to both. A scan that silently
   omits a whole URL shape produces a confident zero, which is the least trustworthy output a
   set-scoped check can give. */
for (const d of readdirSync('dist', { withFileTypes: true })) {
  if (!d.isDirectory()) continue;
  if (existsSync(join('dist', d.name, 'index.html'))) builtSlugs.push('/' + d.name);
  for (const c of readdirSync(join('dist', d.name), { withFileTypes: true })) {
    if (!c.isDirectory()) continue;
    if (existsSync(join('dist', d.name, c.name, 'index.html'))) builtSlugs.push(`/${d.name}/${c.name}`);
  }
}
for (const from of builtSlugs) {
  const h = html(from);
  if (!h) continue;
  const m = mainOf(h);
  for (const to of builtSlugs) {
    if (to === from) continue;
    const re = new RegExp(`href="${to}(?:["#?])`, 'g');
    const n = (m.match(re) || []).length;
    if (n) (inbound[to] ||= []).push(from);
  }
}

function assess(slug) {
  const real = ACTUAL[slug] || slug;
  const h = html(real);
  const pipeDir = join('pipeline', real.slice(1));
  const artefacts = existsSync(pipeDir)
    ? readdirSync(pipeDir).filter((f) => /^0[1-7]-/.test(f)).length
    : 0;

  const row = {
    slug, actualSlug: real === slug ? null : real,
    built: !!h,
    research: { artefacts, of: 7 },
    content: null, images: null, seo: null, links: null,
    redirectStub: false,
  };
  if (!h) return row;

  /* A static Astro redirect is a real HTML file with a meta refresh. `/` is one today. Left
     unmarked it reads as a built page with no content, which is the opposite of the truth: it is
     not a page at all, and the homepage is genuinely unbuilt. */
  if (/<meta http-equiv="refresh"/i.test(h)) {
    row.redirectStub = true;
    row.built = false;
    row.redirectTo = (h.match(/url=([^"']+)/i) || [, ''])[1];
    return row;
  }

  const m = mainOf(h);
  const text = strip(m).replace(/\s+/g, ' ').trim();

  row.content = {
    h1: (h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [, ''])[1].replace(/<[^>]+>/g, '').trim(),
    h2s: [...m.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map((x) => x[1].replace(/<[^>]+>/g, '').trim()).filter(Boolean),
    words: text ? text.split(' ').length : 0,
  };

  /* `.ph-in`, the FPO branch's own wrapper — NOT the words "Image placeholder", which is
     `Placeholder.astro`'s default `label` and therefore misses every well that overrides it.
     `Credentials.astro` overrides it twice (`label="Logo"`, `label="Portrait"`), so the text
     match reported `/white-card-wa` and `/white-card-tas` as having NO placeholders while each
     shipped an RTO logo well, and undercounted three White Card pages by one apiece. Every count
     this board has published until now was low: 13 indexable pages and 20 wells, not 11-12.
     Found when `guardrails.ts`'s FPO ratchet, which detects structurally, refused a budget
     derived from the text match. */
  const fpo = (m.match(/class="ph-in"/g) || []).length;
  const imgs = [...m.matchAll(/<img[^>]*>/g)].filter((x) => !/aria-hidden="true"/.test(x[0]));
  row.images = { real: imgs.length, fpo, ok: fpo === 0 && imgs.length > 0, none: fpo === 0 && imgs.length === 0 };

  const ld = h.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  let types = [];
  try { types = ld ? (JSON.parse(ld[1])['@graph'] || []).map((n) => n['@type']) : []; } catch { types = []; }
  row.seo = {
    title: (h.match(/<title>([\s\S]*?)<\/title>/) || [, ''])[1].trim(),
    hasDesc: /<meta name="description"/.test(h),
    hasCanonical: /<link rel="canonical"/.test(h),
    schema: [...new Set(types)],
    indexable: sitemap.includes(`abeeducation.edu.au${slug === '/' ? '/' : slug}<`),
    noindex: /<meta name="robots"[^>]*noindex/.test(h),
  };

  const from = inbound[real] || [];
  row.links = { inboundCount: from.length, from: from.slice(0, 6) };
  return row;
}

const out = { generated: null, groups: [] };
for (const [group, pages] of PLANNED) {
  out.groups.push({ group, pages: pages.map(([slug, name, wave]) => ({ name, wave, ...assess(slug) })) });
}

/* `--out PATH` writes the file from NODE rather than through a shell redirect, and on this repo's
   own machine that is the difference between working and not. Windows PowerShell 5.1's `>` writes
   **UTF-16LE with a BOM** (`ff fe ...`), so `node scripts/page-status.mjs > reports/status.json`
   produces a file `JSON.parse` cannot read, and the failure surfaces later and elsewhere - in the
   renderer - as an opaque syntax error. Found by running the documented command verbatim in
   PowerShell instead of assuming the Git Bash form transferred. Redirect still works in Git Bash,
   WSL and PowerShell 7; `--out` works everywhere, so it is what the runbook documents. */
const oi = process.argv.indexOf('--out');
const outPath = oi > -1 ? process.argv[oi + 1] : null;
const json = JSON.stringify(out, null, 2);
if (outPath) {
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, json, 'utf8');
  console.log(`page-status: wrote ${outPath}`);
} else {
  console.log(json);
}
