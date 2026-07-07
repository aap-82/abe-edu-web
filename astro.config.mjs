import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.abeeducation.edu.au',
  // Send the bare root to the course page (works in dev and in static builds).
  redirects: {
    '/': '/qld-owner-builder-course',
  },
});
