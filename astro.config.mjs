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
  // Keep the internal /styleguide component library out of the sitemap (it is also noindex).
  integrations: [mdx(), guardrails(), sitemap({ filter: (page) => !page.includes('/styleguide') && !page.includes('/preview') && !NOINDEX.some((p) => page.includes(p)) })],
  // Send the bare root to the course page (works in dev and in static builds).
  // TODO(cutover): replace with the real homepage in Wave 5 — cutover must not
  // happen with a redirecting root.
  redirects: {
    '/': '/qld-owner-builder-course',
  },
});
