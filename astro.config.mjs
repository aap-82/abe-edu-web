import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://www.abeeducation.edu.au',
  // Keep the internal /styleguide component library out of the sitemap (it is also noindex).
  integrations: [mdx(), sitemap({ filter: (page) => !page.includes('/styleguide') })],
  // Send the bare root to the course page (works in dev and in static builds).
  redirects: {
    '/': '/qld-owner-builder-course',
  },
});
