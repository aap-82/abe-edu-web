import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Pages that render with noindex (see the courses collection's `noindex` flag) must not be
// advertised in the sitemap either - a sitemap entry for a noindexed URL is a contradictory
// signal. The sitemap filter only sees a URL, so the noindexed slugs have to be known here.
//
// DERIVED FROM FRONTMATTER SINCE 15 Aug 2026, and this replaces a hand-maintained array. That
// array said "keep the two in step" and they were not in step: `/cpd-electrical-tas` and
// `/cpd-plumbing-tas` were built on 12 Aug with `noindex: true` in their frontmatter, nobody
// edited the array, and both shipped into sitemap-0.xml carrying `noindex,nofollow` - the exact
// contradiction the array existed to prevent, three days after the last entry was added to it by
// hand for the same reason. The failure is structural rather than careless: the flag and the
// exclusion lived in two files, and only one of them is in front of you while building a page.
// `cpd-building-tas.mdx` even told the next author that noindex "also drops the page from the
// sitemap", which was true only because that slug happened to have been listed here.
//
// The earlier hand-added entries are kept as history, because each records a real defect:
// `/owner-builder-nsw-course` was ADDED 1 Aug 2026. Only its `-w` variant was listed, while
// CLAUDE.md and ROADMAP both state that BOTH NSW owner builder pages are "pre-cutover and
// noindexed". They were not: the main slug rendered `index,follow` and is linked twice from every
// page and four times from /owner-builder-courses. It was shielded only by the host-level
// X-Robots-Tag on workers.dev, which stops applying the moment `workers_dev: false` at cutover -
// at which point an on-hold page carrying a nationally-recognised claim ABE Education cannot
// support (partnership unsigned, units not on RTO 45708's scope) becomes indexable and internally
// linked sitewide. Found by the white-card-nsw Stage-9 grader. Documentation drifting from code is
// this repo's most-recorded repeat risk.
//
// HOW THE DERIVATION WORKS, and where it can still be wrong. A content file's id is its basename
// and every collection route builds its URL from that id (`[slug]/index.astro` maps `entry.id`
// straight to `params.slug`; the CPD bundle stubs are one file per id with a matching name), so
// `/` + basename is the URL for every entry that carries the flag today. A route that broke that
// convention would be missed here - which is why the derivation is NOT the only guard.
// `check-links.mjs` re-checks the finished output the other way round: it reads every <loc> in
// dist/sitemap-0.xml, opens that page's HTML, and FAILs if the page says noindex. That check reads
// the artefact rather than the intent, so it holds whatever this code gets wrong.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const CONTENT_ROOT = 'src/content';

function noindexSlugs(dir = CONTENT_ROOT, found = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) {
      noindexSlugs(p, found);
      continue;
    }
    if (!/\.mdx?$/.test(e.name)) continue;
    // Frontmatter only: a `noindex: true` further down the file is prose about the flag, not the
    // flag itself, and several of these pages discuss it at length in their header comments.
    const src = readFileSync(p, 'utf8');
    const fm = src.startsWith('---') ? src.slice(3, src.indexOf('\n---', 3)) : '';
    if (/^noindex:\s*true\s*$/m.test(fm)) found.push('/' + e.name.replace(/\.mdx?$/, ''));
  }
  return found;
}

const NOINDEX = noindexSlugs();
import mdx from '@astrojs/mdx';
import guardrails from './src/integrations/guardrails';

export default defineConfig({
  site: 'https://www.abeeducation.edu.au',
  // Canonical URL form is no-slash (see CLAUDE.md "Canonical URL form"): every live
  // equity URL is already slash-less, so this keeps same-slug rebuilds byte-identical
  // to their current production URL. Paired with wrangler.jsonc's
  // html_handling: "drop-trailing-slash".
  trailingSlash: 'never',
  // Inline every component stylesheet instead of emitting some as separate <link> tags.
  //
  // Astro's default is 'auto': scoped CSS under ~4kB is inlined, anything larger becomes its own
  // render-blocking stylesheet. That default silently broke the Lighthouse budget when the syllabus
  // became the ModuleRows component on 30-31 Jul 2026: /_astro/ModuleRows.*.css crossed the
  // threshold and added one blocking request wherever the component renders. Measured on the built
  // output, /qld-owner-builder-course went to 2 blocking resources against a budget of 1, and
  // /styleguide to 3 against 2. No page changed; only the number of files its CSS arrived in.
  //
  // 'always' removes the whole class of failure rather than this one instance: no component can
  // push a page over the budget by growing past 4kB, which is a threshold no author is aware of
  // while writing a component.
  //
  // MEASURED, before -> after, on the six URLs lighthouserc.json holds one-per-template:
  //   qld-owner-builder-course   blocking 2 -> 0   html 80.9 -> 129.6 kB  (+48.7)
  //   owner-builder-courses      blocking 1 -> 0   html 34.3 ->  78.5 kB  (+44.2)
  //   experts/dominic-ogburn     blocking 1 -> 0   html 30.3 ->  74.6 kB  (+44.3)
  //   reviews                    blocking 1 -> 0   html 24.6 ->  68.8 kB  (+44.2)
  //   cpd                        blocking 1 -> 0   html 36.1 ->  80.3 kB  (+44.2)
  //   styleguide                 blocking 3 -> 0   html  108 -> 160.8 kB  (+52.8)
  //   /_astro/*.css files: 3 -> 0
  //
  // THE COST IS REAL AND IS NOT HIDDEN HERE. That uniform ~44kB is the shared stylesheet moving
  // into every document instead of being fetched once and cached across pages. Uncompressed; CSS
  // gzips at roughly 5:1 and Cloudflare compresses, so the transferred delta is far smaller, but a
  // second page view now re-sends CSS the browser would previously have had. The trade is judged on
  // ABE's actual traffic: these are organic landing pages and most sessions are a single page from
  // search, which is the case inlining favours. It would be the wrong call on a site where readers
  // move through many pages per visit.
  //
  // LCP WAS NOT MEASURED LOCALLY, deliberately. The machine this ran on had 32 node/chrome
  // processes live, and a local Lighthouse number under that load is not evidence. The authority on
  // LCP here is CI: a clean runner, three runs per URL, asserting LCP <= 1800ms (2200 on
  // /styleguide), TBT <= 50ms, CLS <= 0.02 and a performance score of exactly 1. If inlining hurt
  // paint, those assertions fail and this line comes back out. Per BaseLayout's own warning on the
  // font block: do not assume a loading strategy helps.
  build: { inlineStylesheets: 'always' },
  // Keep the internal /styleguide component library out of the sitemap (it is also noindex).
  integrations: [mdx(), guardrails(), sitemap({ filter: (page) => !page.includes('/styleguide') && !page.includes('/preview') && !NOINDEX.some((p) => page.includes(p)) })],
  // Send the bare root to the course page (works in dev and in static builds).
  // TODO(cutover): replace with the real homepage in Wave 5 — cutover must not
  // happen with a redirecting root.
  redirects: {
    '/': '/qld-owner-builder-course',
  },
});
