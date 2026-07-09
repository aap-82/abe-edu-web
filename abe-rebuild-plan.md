# ABE rebuild plan (updated) — 10 Jul 2026

The single working plan for the ABE Education marketing site. Supersedes the "review & reconciliation"
note (`abe-rebuild-plan-review.md`, kept as the decision record) and the original
`abe-rebuild-execution-plan.md` (~May 2026, not on disk; its cutover playbook and risk register are
reconstructed below from the review's summaries and this cycle's evidence, reconcile against the
original if you still hold it).

Pairs with: `HANDOVER.md` (live current state), `CLAUDE.md` (hard rules), `DESIGN.md` (design system),
`wa-owner-builder-image-prompts.md` (image prompts).

Australian English. No em dashes in body copy. Never the word that means "wide-ranging" starting with C.

---

## 1. Goal

Take the built Astro 7 site (QLD + WA owner-builder, live on Cloudflare Workers) and: refactor it so new
pages scale, roll out the remaining states / White Card / CPD / hubs, then move the public site from
LearnWorlds to the new site on `abeeducation.edu.au`. Keep ABE's authority model correct at every step
(ABE is not an RTO).

## 2. Confirmed architecture (do not drift)

- **Astro ^7**, static output (assets-only Worker). No SSR adapter, no `output: 'server'`.
- **Token CSS** in `src/styles/global.css` (Archivo / DM Sans / DM Mono, maroon on cool cream). Not
  Tailwind.
- **Content model: MDX + Astro Content Collections** (Zod-typed frontmatter, one `CourseLayout` renders
  every state). This is the one structural change still to make.
- **@astrojs/sitemap**; single server-rendered JSON-LD `@graph` per page; R2 for images.
- Node 22+, npm only. Deploy via **Workers Builds** (push to `main` auto-builds and deploys).

These four (Astro 7, static, token CSS, Content Collections) are the settled decisions; everything below
executes against them.

## 3. Current state (done)

- Repo off OneDrive at `C:\dev\abe-web`; clean install; build green.
- Git + GitHub `github.com/aap-82/abe-edu-web` (`main`).
- **Workers Builds connected and verified** — `git push origin main` -> auto build + deploy; non-`main`
  branches get preview URLs. Manual `npx wrangler deploy` kept as a fallback.
- QLD + WA owner-builder live as static assets on `abe-edu-web.andrey-p-personal.workers.dev`.
- **Guardrails shipped** (Phase A): `.claude/settings.json` permission policy, `/ship` command, and a
  husky + lint-staged + **secretlint** pre-commit hook that blocks any commit containing a secret
  (verified against a fake private key).
- `DESIGN.md` + `.impeccable/design.json` design system captured ("The Regulator's Broadsheet").
- Component library (20 components), typed data layer, sitemap, robots all in place.

## 4. Roadmap

### Phase A — Guardrails ✅ DONE
Permission policy, `/ship`, secret-scanning pre-commit hook. Shipped 10 Jul 2026.

### Phase B — Content Collections refactor (next; the one new structural change)
The enabling step before more pages multiply the per-page duplication (QLD and WA are already near-copies).

1. Add `@astrojs/mdx` (a `package.json` change; get explicit sign-off per `CLAUDE.md`).
2. `src/content.config.ts` with Zod schemas:
   - `courses`: title, state, courseType, price, durationHours, hero, partnerRto?, authorRefs[],
     modules[], faqs[], sources[], glance[], priceRows[], publishedAt, lastReviewedAt.
   - `experts`, `partners`.
   - Rich prose lives in the MDX **body**; structured data in **frontmatter**. Zod fails the build on
     frontmatter drift.
3. `src/layouts/CourseLayout.astro` — wraps BaseLayout + SiteHeader; renders Hero, FactGrid, PriceCard,
   Credentials, VerifiedSources, SourcesFooter from frontmatter, then the MDX body (which can still call
   `<Section>`, `<ZSplit>`, `<CanCant>`, `<Stepper>` etc.).
4. `src/pages/[slug]/index.astro` — `getStaticPaths()` over `getCollection('courses')`. One route renders
   every course.
5. Convert QLD + WA to `content/courses/qld-owner-builder.mdx` and `wa-owner-builder.mdx`. **Build-diff
   the rendered HTML against the current live pages to confirm parity** before deleting the old `.astro`
   pages.

The `abe-course-page-astro` skill stays the research/content engine; only its Stage-6 output target
changes to `content/courses/{slug}.mdx` + shared layout.

### Phase C — Roll out as MDX
Once B proves parity, new pages are just MDX files: TAS / NSW / ACT owner builder, White Card per state
(RTO-partner disclosure), the CPD 5-industry x state matrix, per-state hubs, and expert profiles
(`/experts/dominic-ogburn`, `/experts/warwick-smith`). Finish the WA imagery (hero optimised to AVIF;
on-site / laptop / insurance slots from `wa-owner-builder-image-prompts.md`). Every government fact
sourced and dated; re-verify indexed fees on cadence (WA approval fee resets ~1 July; QLD QBCC fee is
indexation-pending).

### Phase D — Images to a custom domain
Attach `images.abeeducation.edu.au` to the R2 bucket and swap the `r2.dev` URLs (a drop-in change) before
heavy production traffic. `r2.dev` is dev-grade and rate-limited.

### Phase E — Go-live cutover
See the cutover playbook in section 5.

### Phase F — CMS later
Only when the site hits ~50 pages or multiple non-technical editors. Not before.

## 5. Cutover playbook (Phase E)

Reconstructed from the review; treat as the plan's strongest, follow-as-written section.

1. **Attach the domain.** Add `abeeducation.edu.au` (apex + `www`) as a custom domain / route on the
   `abe-edu-web` Worker. Verify TLS and that the site serves on the real host.
2. **Free the apex.** Move the existing LearnWorlds site to a `learn.` subdomain so the apex is available
   for the new site. Keep LearnWorlds serving its course-delivery role there.
3. **Redirect map.** Build a 301 map of every old LearnWorlds URL to its new equivalent. No redirect
   chains. Keep the redirects indefinitely.
4. **Pre-cutover DNS.** Drop TTL to 300 ahead of the switch so changes propagate fast. **Do not touch
   MX / SPF / DKIM** records; email must keep flowing.
5. **Switch and monitor.** Repoint DNS, watch for errors, confirm 301s resolve in one hop.
6. **Search + analytics.** Submit the sitemap and verify the property in Google Search Console; file a
   change-of-address where applicable; set up GA4. Watch coverage and Core Web Vitals.
7. **Rollback ready.** Keep the ability to repoint DNS back for the whole window.

Expect a same-domain reorg dip of roughly 10-30%, recovering in 2-4 weeks. Mitigations: clean single-hop
301s, redirects kept indefinitely, strong internal linking. This is consistent with Google's site-move
guidance.

## 6. Risk register (current)

Consolidates the original plan's register with what materialised this cycle.

| # | Risk | Status / mitigation |
|---|---|---|
| R1 | Cloud-sync folder corrupts builds (truncated `package.json`, mangled `node_modules`) | **Closed.** Repo moved to `C:\dev\abe-web`; only docs stay in OneDrive. |
| R2 | Astro 7 compiler strictness breaks dynamic JSX | **Materialised, handled.** Nav emitted via `set:html`; documented in `CLAUDE.md`. |
| R3 | Frontmatter drift across dozens of near-identical pages | **Mitigated by design.** Zod schemas in Phase B fail the build on drift. |
| R4 | Content Collections migration silently changes rendered output | Mitigate with a build-diff parity check (Phase B step 5) before deleting old pages. |
| R5 | Stale or unsourced government fact goes live | Publish hard-blocker. Every fact sourced + dated; re-verify indexed fees on cadence. |
| R6 | Authority-model breach (claim ABE is an RTO, or WA course is government-approved) | Enforced in copy + schema; `/ship` checks the diff for it. |
| R7 | `r2.dev` rate-limits under production traffic | Phase D: move images to `images.abeeducation.edu.au` before launch. |
| R8 | SEO dip on domain move | Clean 301s, kept redirects, internal linking; expect 10-30% dip, 2-4 week recovery. |
| R9 | Secret committed to the repo | **Closed.** secretlint pre-commit hook blocks it. |
| R10 | Wrong / old code deployed | Single-source repo + Workers Builds from `main`; never deploy from the retired R2W Workflow copy. |

## 7. Workflow and guardrails (in force)

- Trunk-based on `main`; Conventional Commits (`feat:` / `fix:` / `chore:` / `content:`).
- Push only via `/ship` (validate build, show diff, wait for "ship it"); a push auto-deploys.
- Permission policy denies `rm -rf` / force-push / `--no-verify` / secret reads, and asks before push /
  `wrangler deploy` / `package.json` edits.
- Never downgrade Astro below 7, add an SSR adapter without a decision, or modify
  `package.json` / lockfile / `.npmrc` unasked.

## 8. Immediate next step

Phase B (Content Collections). It needs `@astrojs/mdx` added to `package.json`, so it starts with an
explicit sign-off, then the schema + `CourseLayout` + `[slug]` route, and a build-diff parity check on
QLD + WA before the old pages are removed. In parallel, the WA hero still needs AVIF optimisation to be
deployable.
