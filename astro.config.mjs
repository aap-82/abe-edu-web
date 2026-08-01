import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Pages that render with noindex (see the courses collection's `noindex` flag) must not be
// advertised in the sitemap either - a sitemap entry for a noindexed URL is a contradictory
// signal. The sitemap filter only sees a URL, so a noindexed slug is named here as well as
// flagged in its frontmatter. Keep the two in step.
// `/owner-builder-nsw-course` was ADDED 1 Aug 2026. Only its `-w` variant was listed, while
// CLAUDE.md and ROADMAP both state that BOTH NSW owner builder pages are "pre-cutover and
// noindexed". They were not: the main slug rendered `index,follow` and is linked twice from every
// page and four times from /owner-builder-courses. It was shielded only by the host-level
// X-Robots-Tag on workers.dev, which stops applying the moment `workers_dev: false` at cutover -
// at which point an on-hold page carrying a nationally-recognised claim ABE Education cannot
// support (partnership unsigned, units not on RTO 45708's scope) becomes indexable and internally
// linked sitewide. Found by the white-card-nsw Stage-9 grader. Documentation drifting from code is
// this repo's most-recorded repeat risk. Remove this entry only when the page is rebuilt as the
// pre-launch info page and its authority claims are corrected.
const NOINDEX = ['/owner-builder-nsw-course', '/owner-builder-nsw-course-w', '/cpd-building-tas'];
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
