# Session pre-flight — checking the system, not just the page

## Contents
- When to read this: once, at the start of a session, before any stage work
- What the checks are and what each one owns
- What to do on a FAIL versus a WARN

**Read at session start, not per stage.** Lifted out of SKILL.md 17 Aug 2026 so the stage spine stays
the thing SKILL.md is: this is consulted once, at the top of a session.

`guardrails.ts` checks one page at build. These check the system:
- **`node scripts/system-health.mjs`** — run before planning work. Register freshness, dangling
  references, Stage-9 review coverage, trend direction, repeat risks, claim drift, figure
  contradictions. FAIL blocks page-building; WARN is work to schedule.
- **`node scripts/check-claims.mjs`** — what the docs *assert* about the build, checked against
  `content.config.ts` and `guardrails.ts`, plus every dollar figure on a page matched against
  `kb/register/`. A superseded figure is a FAIL.
- **`node scripts/check-freshness.mjs`** — register staleness. Wired into `prebuild`.
- **`node scripts/check-assets.mjs`** — every image a page names is **tracked in git**, not merely
  present on disk. Wired into `prebuild`, and it FAILS the build. Exists because a hero was
  repointed at an asset that was never committed: the pointer shipped, the file did not, and every
  other gate passed because they all read `dist/` or the working tree, where the file was there.
  `src/lib/images.ts` returns an unmatched basename unchanged rather than erroring, so the page
  emitted a live `<img>` at a 404 on an indexable page. Checks both reference forms, the
  `/images/x.avif` path and the bare `x.avif` basename, because `resolveImage()` keys on basename
  and does not care which you used.
- **`node scripts/check-links.mjs`** — run after `npm run build`. Every same-origin link in `dist/`
  resolves to a built route, an asset, or an explicitly named planned page. `guardrails.ts` checks
  in-page anchors (6) and orphans (8) but never checked that a link points AT something, which is
  how the footer came to link all 19 pages at ten URLs that do not exist. Unbuilt targets are
  allowed only by being listed in `PLANNED` with the wave that builds them, and the list
  self-cleans: a target that now exists but is still listed is a FAIL.
  **Breadcrumbs are held stricter than `PLANNED`.** A footer link to a wave-5 page is sequencing; a
  breadcrumb link to one is a visible 404 plus a `BreadcrumbList` item Google resolves and rejects as
  an invalid rich result. Both the visible `nav.crumbs` and the JSON-LD items must point at built
  routes, and `PLANNED` does not excuse them. Added 28 Jul 2026 after a crumb pointing at the unbuilt
  `/white-card` shipped on a course page and this script passed it.
- **`node scripts/check-shipped.mjs`** — can this branch's work still reach `main`? Runs inside
  `system-health`, so the pre-flight answers it before you start. **A merged PR does not pick up
  later pushes**, so anything committed to that branch afterwards is stranded: green, correct, and
  invisible to production. It happened twice on 29 Jul 2026, once shipping a pointer without its
  asset (a live 404) and once shipping nothing at all. No other check can see it, because they all
  read the branch, where the work is present and passing. Uses `git cherry`, not `rev-list`, so a
  commit already cherry-picked upstream does not cry wolf. Skips rather than guesses when `gh` or
  the network is unavailable.
- **`node scripts/review-trends.mjs`** — after filing a Stage-9 review.

**When you change a claim about the build, add it to `CLAIMS` in `check-claims.mjs`.** Documentation
drifting from code is this system's most-recorded repeat risk; a claim nothing checks is a claim that
quietly stops being true.
