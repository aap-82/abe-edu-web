import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import guardrails from './src/integrations/guardrails';

export default defineConfig({
  site: 'https://www.abeeducation.edu.au',
  // Keep the internal /styleguide component library out of the sitemap (it is also noindex).
  integrations: [mdx(), guardrails(), sitemap({ filter: (page) => !page.includes('/styleguide') && !page.includes('/preview') })],
  // Send the bare root to the course page (works in dev and in static builds).
  // TODO(cutover): replace with the real homepage in Wave 5 — cutover must not
  // happen with a redirecting root.
  redirects: {
    '/': '/qld-owner-builder-course/',
  },
});
