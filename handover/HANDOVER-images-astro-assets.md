# HANDOVER — migrate page imagery to local + `astro:assets`

**This note routes a cross-cutting change across three session types.** It is a spec, not a single
session's work: it touches `src/content.config.ts` (**skills**), the image components (**design**), and
the content files + image assets (**build**). Do the tasks in order and in the session type each names.
No regulatory figures here.

## Decision (why)

All page/hero/portrait imagery is **served same-origin from the repo and processed by `astro:assets`**.
Bare `r2.dev` is retired for page images. Rationale:

- **Speed:** a same-origin image loads on the connection the HTML already opened — no extra DNS + TLS +
  connection to `pub-*.r2.dev` on the LCP path. And `r2.dev` is dev-grade / rate-limited (CLAUDE.md),
  a production risk, not a win.
- **`astro:assets`** adds automatic `srcset`, format negotiation, intrinsic `width`/`height` (kills CLS)
  and content-hashed immutable filenames — for free once wired.

**Two deliberate exceptions stay as string URLs:** `ogImage` (social scrapers need a stable absolute
URL, not a content-hashed local path) and any genuinely remote asset. `astro:assets`' `image()` is
**local-only** — it resolves a path relative to a repo file and cannot point at R2.

## Pre-flight

`node scripts/system-health.mjs` must be 0-FAIL before you start each task's session. Note that Task 3
edits page content, so it **re-breaks Stage-7 verification** on the touched pages — re-running Stage 7
is part of Task 3's Definition of Done, not an afterthought.

## How it works here (read before touching anything)

- Hero artefacts render through the shared **`Placeholder.astro`** (`<Placeholder src={artefactImg} … />`
  in `Hero.astro:66`). Migrating `Placeholder` covers every hero + z-split image at once.
- Portraits render as a **raw `<img>` in `Credentials.astro:82`** — deliberately, not via `Placeholder`,
  because the grayscale→colour-on-hover treatment is a scoped style that would not reach a child
  component. Portraits must be migrated in `Credentials.astro` directly, preserving that scoped rule.
- The schema fields are plain strings today: `hero.artefactImg: z.string()`, `portrait: { src: z.string() }`
  (`content.config.ts`), and the collections use the static `schema: z.object({…})` form.
- **Dual-type is mandatory, not optional.** `styleguide.astro` (and legacy string callers, plus the
  `ogImage`/remote exceptions) will keep passing **string** `src`. So the components must accept
  `string | ImageMetadata` and branch — a hard switch to `ImageMetadata` breaks the styleguide build.

## Task 1 — schema (`skills` session; it owns `content.config.ts`)

Give the image-bearing collections access to the `image()` helper and type the local image fields with it.

- Convert `courses` and `cpdBundles` to the function form: `schema: ({ image }) => z.object({ … })`.
- `hero.artefactImg`: `z.string().optional()` → `image().optional()`.
- `experts` / `person.portrait.src`: `z.string()` → `image()`. Because `person`/`expertPage` are
  module-level consts that cannot call `image()`, refactor them into factories that receive `image`
  (e.g. `const person = (image) => z.object({ …, portrait: z.object({ src: image(), alt: z.string().min(80) }).optional() })`),
  then call them inside each collection's `({ image }) =>` schema.
- **Leave `ogImage` as `z.string().optional()`** everywhere.
- Keep `src/types/course.ts`'s `Img` in step: its `src` becomes `string | ImageMetadata`
  (`import type { ImageMetadata } from 'astro'`).

## Task 2 — components (`design` session; closes with a `skill-reviews/design/` review per Rule 9)

Make the shared renderers accept `ImageMetadata` while still accepting strings.

- **`Placeholder.astro`**: `src?: string | ImageMetadata`. When it's an object, render
  `import { Image } from 'astro:assets'` → `<Image src={src} alt={alt} widths={[…]} sizes="…" />`
  with the ratio the component already knows; when it's a string, keep the current `<img>`. Preserve
  `eager`/`loading` behaviour.
- **`Credentials.astro:82`**: same branch for `p.portrait.src`, keeping the `.ph.r45` grayscale scoped
  style and `loading="lazy"`.
- Verify against the **Astro docs MCP** (the `<Image>` API + `ImageMetadata`) before writing.
- Add/confirm a `/styleguide` specimen still renders (it passes a **string** path — that is the
  regression test for the dual-type branch).

## Task 3 — assets + content (`build`/content session; re-verify Stage-7)

- Create `src/assets/images/` and move the real files in, with convention names
  (`lowercase-hyphenated`, no spaces): e.g. `cpd-building-tas-hero.avif`,
  `white-card-tas-service-tasmania.avif`, `dominic-ogburn-portrait.avif`, `warwick-smith-portrait.avif`.
- Update frontmatter to **relative paths** the collection resolves (e.g. `artefactImg: ../../assets/images/…`).
- Delete the corresponding `public/images/*` copies and retire the R2 portrait URLs.
- **Confirm each image matches its alt/`artefactDesc`** (e.g. White Card's placeholder describes a
  hi-vis worker holding a card — make sure `white-card-tas-service-tasmania.avif` is that subject) and
  that portraits are **real photos, not AI-generated** (CLAUDE.md).
- Re-run **Stage 7** on every edited page; `system-health` back to 0-FAIL.

## Per-image mapping (the four in flight, 26 Jul)

| Image | Target | Notes |
|---|---|---|
| `cpd-building-tas-hero.avif` | `cpd-building-tas` hero | already referenced local (`/images/…`); just move into `src/assets` + relative path |
| `white-card-tas-service-tasmania.avif` | `white-card-tas` hero | **not wired yet** — hero is FPO (`artefactDesc` only); add `artefactImg` + `artefactAlt` |
| `Dominic Ogburn … .avif` | Dominic portrait | page currently points at a *different* R2 file (`Dominic_Ogburn_portrait.webp`); rename + wire local |
| `warwick smith … .avif` | Warwick portrait | page uses R2 today; move local, drop the R2 URL |

## Definition of done

- `npm run build` green (guardrails 19/19); a hero + a portrait both render as `<Image>` with `srcset`.
- `/styleguide` still builds (proves the string branch survives).
- `system-health` 0-FAIL (Stage-7 re-verified on edited pages).
- No page image loads from `pub-*.r2.dev` except `ogImage`/intentional remotes.

## Rollout note

Ship **Task 1 + Task 2 first** (schema accepts `image()`, components accept `ImageMetadata`) — that is a
no-op for existing string callers, so nothing breaks and the capability is ready. Then migrate pages one
at a time in Task 3, each with its own Stage-7 pass. Do not big-bang all pages in one commit.
