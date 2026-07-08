# ABE Education marketing site — project rules (read first)

Astro 7 static marketing site for abeeducation.edu.au. Currently two course pages live on Cloudflare
Workers (QLD + WA owner builder); rolling out the rest of the states, White Card, CPD and hubs.
Read `HANDOVER.md` for current state + backlog. Read `../abe-rebuild-plan-review.md` for the agreed
architecture decisions and `../MIGRATION.md` for the Claude Code / repo setup.

Australian English. Never the word "comprehensive". No em dashes in body copy.

## Agreed stack (do not drift)
- **astro ^7** (NOT 6 or 5). Stricter Rust compiler; `Astro.glob()` is gone -> use `import.meta.glob()`.
- **Static output** (assets-only Worker). `astro build` -> `dist/`, served by `wrangler.jsonc`
  (`workers_dev: true`, `assets.directory: ./dist`). **No SSR adapter, no `output: 'server'`.**
- **@astrojs/sitemap** (emits sitemap-index.xml + sitemap-0.xml; `site` is set in astro.config.mjs).
- **Token CSS in `src/styles/global.css`** (CSS custom properties). **Not Tailwind.** Fonts:
  Archivo (display), DM Sans (body), DM Mono (mono). Accent maroon `#800000` on cool cream ground.
- **Content model target: MDX + Astro Content Collections** (Zod-typed frontmatter, one `CourseLayout`
  renders all states). QLD/WA are still per-page `.astro` + `data/*.ts` and are being migrated — see
  HANDOVER backlog. New course pages should be MDX once the collection is wired.
- Node 22+, npm only.

## Build / deploy
- `npm install` — once, or when deps change (pulls `@astrojs/sitemap`).
- `npm run dev` — http://localhost:4321/
- `npm run build` — static build to `./dist`
- `npm run preview` — preview the build
- `npx wrangler deploy` — deploy `dist/` (manual). Live: `abe-edu-web.<subdomain>.workers.dev`.
  (When git + Workers Builds is set up, a push to `main` auto-deploys instead.)
- Always `npm run build` before `wrangler deploy`. Confirm the build is green first.

## Authority model (hard rules — per jurisdiction)
**ABE is NOT an RTO.** Never claim it is, in copy or schema.
- **State-approved-direct** (QLD/QBCC, TAS/CBOS): "Approved by [regulator]", Certificate of Completion.
  No RTO/accredited/"Statement of Attainment". Schema credential `recognizedBy` the regulator.
  QLD specifically: there is no accredited version; only the QBCC-approved course is accepted.
- **Knowledge-requirement** (WA / Form 75): "supports your Form 75 owner-builder approval". No
  "WA-approved course/provider", no "permit"/"licence" for the owner-builder step (it is an *approval*).
  Schema credential has **no `recognizedBy`**. White Card unit is `CPCWHS1001` (single C in WA).
- **ASQA-accredited** (White Card, NSW OB, asbestos/silica): name the RTO partner + number
  (Blue Dog Training RTO 31193, AlertForce RTO 91826), "nationally recognised" is accurate, carry ASQA
  disclosure. ABE is the publisher, not the RTO.
- **Every government fact is sourced + dated** in the page-foot Sources block. Re-verify indexed fees
  on their cadence (WA approval fee and similar reset ~1 July). An unresolved gov fact is a publish
  hard-blocker.

## SEO / E-E-A-T (per page)
- One `<h1>` (the hero), question-led sentence-case H2s, 40-60 word answer capsule opening each
  section (except FAQ).
- Single server-rendered JSON-LD `@graph`: Course + EducationalOccupationalCredential + BreadcrumbList
  + Person x2. `Course.offers.price` must equal the on-page price. `recognizedBy` conditional (above).
- Two named experts (Dominic Ogburn developer; Warwick Smith independent compliance/currency reviewer)
  with `sameAs` LinkedIn and a dated last-reviewed line.
- `BaseLayout.astro` ships robots, canonical, OG/Twitter and (via sitemap integration) the sitemap +
  `public/robots.txt` on every page. Pass an optional `ogImage` for image cards.

## Images
- Served from the Cloudflare R2 public bucket, referenced by URL:
  base `https://pub-e001e9a575874f24a0bcd7082a45cdbc.r2.dev/` (brand/logo/portraits) and
  `https://pub-80a8c961e6274e19825de038e308436f.r2.dev/` (QLD course images, bucket `qld-ob`).
- `Placeholder` / `ZSplit` / `Hero` / `Credentials` accept a real image `src`; omit it to keep the FPO
  placeholder. Content alt text >= 80 chars, en-AU. Expert headshots are **real photos** (grayscale by
  default, colour on hover) — never AI-generated.
- `r2.dev` is dev-grade (rate-limited). Move to a custom domain (e.g. images.abeeducation.edu.au) before
  heavy production traffic — it's a drop-in URL swap.

## Component gotcha — `SiteHeader.astro`
The nav is built as an HTML string and emitted via `set:html`, with its CSS in an `is:global` block
scoped under `.site-head`, plus a small `<script>` controller (open on hover, close on outside-click /
Escape / selection). This is deliberate: Astro 7's compiler mis-parses dynamic attributes inside mapped
ternary JSX, and scoped styles do not reach `set:html` content. Do not "simplify" it back to inline JSX.

## Build reliability
- **Build off any cloud-synced folder.** OneDrive/Dropbox truncate large/many-file writes (it has
  truncated `package.json`, `SKILL.md`, component files this project) and mangle `node_modules`. Keep
  the repo on a plain local path (e.g. `C:\dev\abe-web`) or in WSL2. If a write looks truncated, verify
  the on-disk bytes and rewrite via a shell heredoc.

## Git workflow (once the repo exists)
- Trunk-based on `main`; Conventional Commits (`feat:`/`fix:`/`chore:`/`content:`).
- Do not push unless asked. Use `/ship` (validate + show diff + wait for "ship it").
- Never `git push --force`/`--force-with-lease`, `git reset --hard`, `--no-verify`, or amend/rebase
  commits already on origin/main.

## Never do
- Never modify `package.json` / `package-lock.json` / `.npmrc` unless asked. Never `npm update`/`upgrade`.
- Never read or write `.env*`, `.dev.vars*`, `*.pem`, `*.key`. Never commit secrets.
- Never `rm -rf`, `wrangler delete`, or `wrangler ... delete`.
- Never downgrade Astro below 7. Never introduce an SSR adapter without an explicit decision.
- Never claim ABE is an RTO or that WA has a government-approved course.
