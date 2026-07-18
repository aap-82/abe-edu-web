// Thin passthrough to the static assets binding. The only logic here is the
// migration-only staging de-index (Wave 0 risk audit R3): the *.workers.dev preview
// host must never be indexable, or Google can index the build as duplicate content
// on the wrong host while the real domain is still being prepared. A Cloudflare
// Transform Rule can't do this because workers.dev isn't a zone Andrey controls, so
// the header has to be added in the Worker itself.
//
// Remove this file (and the "main" / assets.binding lines in wrangler.jsonc) at
// cutover, once workers_dev is set to false — see HANDOVER.md Phase E.
export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const { hostname } = new URL(request.url);
    if (!hostname.endsWith('.workers.dev')) return response;

    const headers = new Headers(response.headers);
    headers.set('X-Robots-Tag', 'noindex');
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  },
};
