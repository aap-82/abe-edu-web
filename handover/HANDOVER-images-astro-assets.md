# HANDOVER — migrate page imagery to local + `astro:assets` (via an image resolver)

**Supersedes the first draft of this file.** The original plan (content-collection `image()` in the
schema) was tried and **fails the build**: Astro's `image()` is greedy — in `z.union([image(), z.string()])`
it still tries to resolve an existing public path like `/images/cpd-building-tas-hero.avif`, cannot, and
throws `ImageNotFound`; it does **not** fall through to `z.string()`. Reversing the union makes `z.string()`
swallow every path so `image()` never runs. So a shared schema field cannot be `image()`-aware while any of
its values is a non-resolvable public path — the schema-first, phased plan was structurally impossible.
Verified empirically (`npm run check` passed, `npm run build` failed on the first public path).

## Decision (unchanged)

All page/hero/portrait imagery is **served same-origin from the repo, processed by `astro:assets`**; bare
`r2.dev` is retired for page images (`ogImage` and genuine remotes excepted — social scrapers need a stable
absolute URL). Rationale: a same-origin image skips the extra DNS+TLS+connection to `r2.dev` on the LCP path,
and `r2.dev` is dev-grade/rate-limited.

## Approach — an image RESOLVER, not a schema change

A tiny util eager-imports a local image folder and maps a frontmatter string to an optimizable asset:

- **`src/lib/images.ts`** — `import.meta.glob('/src/assets/images/*.{avif,webp,png,jpg}', { eager: true })`
  builds a basename → `ImageMetadata` map. `imageUrl(src)` returns the local asset's hashed, same-origin URL
  when the basename matches a file in that folder, otherwise the string unchanged (a public path or remote
  URL not yet migrated).
- **Render sites route their URL through `imageUrl()`**: `Placeholder.astro` (every hero/z-split image),
  `Credentials.astro` (portraits, keeping its raw `<img>` so the scoped grayscale still applies), and the
  JSON-LD image URLs in `CourseLayout.astro` / `experts/[slug].astro`.

**Why this is better than content-collection `image()`:**
- **No schema change** — `content.config.ts` (skills-owned) stays `z.string()`; no `image()` hard-fail.
- **No frontmatter change and no Stage-7 re-break** — migrating an image is just *moving the file* into
  `src/assets/images/`; `imageUrl()` matches on basename, so the MDX and its Stage-7 verification are untouched.
- **Truly incremental** — an image not yet moved resolves to its old string and renders exactly as now, so
  the resolver is a **no-op** until you move a file. No big-bang.
- Still `astro:assets` — the resolved `ImageMetadata` is emitted, content-hashed and same-origin.

**One naming caveat:** basename matching means the local file must share the frontmatter value's basename.
Heroes already do (`/images/cpd-building-tas-hero.avif` → `cpd-building-tas-hero.avif`), so moving the file is
enough. The R2 portraits are referenced by an encoded URL (`warwick%20smith%20…avif`); give them convention
names (`warwick-smith-portrait.avif`) and update the `portrait.src` basename in the expert `.md` (a small
content edit; expert pages are outside the course Stage-7 pipeline).

## Tasks

**Task 1 — resolver + wiring (design/lib).** Add `src/lib/images.ts` (`imageUrl`), create
`src/assets/images/`, and route the four render/JSON-LD sites through `imageUrl()`. This is a **no-op** for
every current image (all still strings not in the folder), so it ships safely on its own. No `content.config.ts`,
no component Prop-type changes, no Stage-7 impact.

**Task 2 — migrate images (build), one at a time.** Move a file from `public/images/` (or download the R2
asset) into `src/assets/images/`; for portraits also rename to convention and update the `portrait.src`
basename. Verify the page renders and, for heroes, that the JSON-LD `image` is a full URL. Repeat per image.

**Task 3 — optional optimization (design).** Upgrade `imageUrl`/the render sites to `getImage()` for
`srcset`/resize/width-height. Keep the raw `<img>` (scoped styles); `<Image>` is a child component whose
output the scoped `.ph-img`/grayscale rules would not reach. Needs display-width decisions + visual checks.

## Definition of done (Task 1)

- `npm run build` green (guardrails 19/19); a migrated proof image (e.g. `cpd-building-tas-hero.avif`) serves
  from a hashed `/_astro/…` same-origin URL, not `/images/…`.
- `npm run check` 0 errors; `system-health` 0-FAIL (no Stage-7 change).
- Every un-migrated image renders byte-identically (resolver is a no-op for it).

## Rollout

Task 1 lands the resolver (safe no-op). Then migrate images in Task 2 as convenient — heroes are a pure file
move, portraits a move + basename rename. Optimization (Task 3) layers on last.
