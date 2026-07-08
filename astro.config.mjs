import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.abeeducation.edu.au',
  integrations: [sitemap()],
  // Send the bare root to the course page (works in dev and in static builds).
  redirects: {
    '/': '/qld-owner-builder-course',
  },
});
