# Deploy — Cloudflare Workers (static assets)

The site is fully static (no SSR), so it deploys as an **assets-only Worker**: `astro build` writes
`dist/`, and `wrangler.jsonc` serves it. The template already contains a working `wrangler.jsonc`.

## Local build + preview
```
npm install
npm run build            # -> dist/  (static)
npx wrangler dev         # preview the Worker serving dist at http://127.0.0.1:8787
```

## `wrangler.jsonc` (in the template)
```jsonc
{
  "name": "abe-edu-web",
  "compatibility_date": "2026-07-01",
  "workers_dev": true,          // enables the *.workers.dev preview URL
  "assets": { "directory": "./dist" }
}
```
Set `name` per site. `workers_dev: true` is what turns on the public preview URL — without it the
Worker deploys but shows "No URLs enabled".

## Deploy
- **Direct:** `npx wrangler deploy` (after a build).
- **Git-connected (Cloudflare Workers Builds):** on the project's Build settings set
  **Build command = `npm run build`** and **Deploy command = `npx wrangler deploy`**. A push then runs
  install → build → deploy.

## Troubleshooting (all four we actually hit)
1. **"root directory not found"** (fails at clone) — the build's *Root directory* points at a folder
   not in the repo. The Astro project must be at the repo root (or set Root directory to its subfolder).
   Check with `git ls-files | grep package.json` — no folder prefix means it's at root, so set Root
   directory to `/`.
2. **`assets.directory … /dist does not exist`** (fails at deploy) — the **build step never ran**, so
   `dist/` was not created. Set the Build command to `npm run build` (or combine:
   Deploy command = `npm run build && npx wrangler deploy`). `dist/` is git-ignored on purpose.
3. **"No URLs enabled" / can't reach the site** — the deploy succeeded but the workers.dev URL is off.
   Add `"workers_dev": true` to `wrangler.jsonc` and redeploy (or enable it under Settings → Domains &
   Routes). URL is `https://{name}.{account-subdomain}.workers.dev/{page-slug}`.
4. **`Cannot find module '…/kleur/colors.mjs'`** or "removed 168 packages" — a corrupted
   `node_modules`, usually from installing inside a **cloud-synced folder** (OneDrive / synced Projects)
   where the sync client locks files mid-install. Clean reinstall: `rmdir /s /q node_modules`,
   delete `package-lock.json`, `npm cache verify`, `npm install`. If it recurs, move the project to a
   plain local path outside any sync and install there.

## Node version
Astro 7 needs Node 20+ (22 recommended). The template pins it with `.nvmrc` (=22); Cloudflare Workers
Builds reads it. Fallback: set `NODE_VERSION=22` in the build's environment variables.

## Production domain
The workers.dev URL is for review. For production add a **custom domain** (a subdomain of
abeeducation.edu.au) under the Worker's **Domains** tab, and set the page's `canonical` to it.

## Verify a deploy (optional, via the Cloudflare connector)
`workers_list` confirms the Worker exists and its `modified_on`; fetch the live workers.dev URL to
confirm the page renders (title, sections, `/` redirect). The connector's read tools cannot change
build settings — those stay in the dashboard.
