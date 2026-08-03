# 05 · Section plan + component map — `/white-card`

The brief-to-section map. Every briefed section in `03-briefs.md` maps to a page section here, and
every page section traces back to a brief. `check-pipeline.mjs` checks both directions against this
table, so the "Page section (id)" column is the load-bearing part of the file.

**Note on backticks in this file:** `check-pipeline.mjs` reads every backticked lowercase token
inside a table row as a claimed section id and asserts it renders as `<section id="...">` in
`dist/white-card/index.html`. Only the three real ids (`spokes`, `compare`, `faq`) are backticked
below for that reason — frontmatter field names are written plain, not backticked, so a name like
"schema" or "intro" is never mistaken for a claimed id (learned live on this run: the first draft of
this file backticked `intro`, `schema` and `breadcrumb` as prose emphasis and `check-pipeline.mjs`
correctly reported all three as sections missing from the page, since none of them is one).

**Build shape:** one MDX file `src/content/hubs/white-card.mdx`, no `authorityModel` (a hub carries
none — archetype 6 §5). Rendered by `HubLayout.astro` via `src/pages/white-card.astro`, unchanged
from the layout `/owner-builder-courses` already ships on (design-owned; this build only supplies
frontmatter content, per CLAUDE.md's session-type table).

---

## Section map

| # | Page section (id) | From brief | H2 / heading | Components | Layout or authored |
|---|---|---|---|---|---|
| — | Hero | Hero + orienting line | H1 "White Card, by state." | Hero (no ticks/proof — a hub carries neither) | layout, from the hero frontmatter block |
| 01 | `spokes` | Choose your state (spoke grid) | "Find the course that applies to you" | Section(bg-alt) + AnswerCapsule(intro) + HubCard ×4 | layout, from the intro and spokes frontmatter |
| 02 | `compare` | Compare (differentiator table) | "Compare by state" | Section + ComparisonTable | layout, from the comparison frontmatter |
| 03 | `faq` | FAQ (shared context + objections) | "Common questions" | Section(bg-alt) + Faq(items) | layout, from the faqs frontmatter |
| — | CtaBand | CTA band + sources footer | "Ready to get your White Card?" | CtaBand (no id attribute, excluded from section-conformance by having none) | layout, from the ctaBand frontmatter |
| — | Footer | CTA band + sources footer | — | SourcesFooter | layout, from footerSources and disclaimersHtml |
| — | (non-rendering) | — | — | BreadcrumbList + ItemList JSON-LD only — no Course node, no price, per archetype 6 §5 | layout, built from the breadcrumb frontmatter and resolved spokes |

**Every brief is placed.** Hero → frontmatter `hero`. Spoke grid → `#spokes`. Compare → `#compare`.
FAQ → `#faq`. CTA band + sources → the layout's trailing `CtaBand`/`SourcesFooter`, neither of which
is a `<section id>` (correctly excluded by `check-pipeline.mjs`'s own `CHROME_IDS`/no-id handling —
verified against `dist/white-card/index.html`, not assumed). **No brief dropped, no section without
a brief.**

**Only 3 marked sections** (`spokes`, `compare`, `faq`) — a hub has no numbered-marker sequence the
way a course page does (archetype 6 carries no `SectionWayfinder`/marker convention); the in-page
`nav` (`WayfinderNav`) links to the same three ids instead.

---

## Confirmed not lost (Stage 5's own purpose, restated per-item)

- **The new Q2 FAQ** ("How do I actually get my card once I finish the course?") is present in
  `faqs[]` at position 2 in `src/content/hubs/white-card.mdx`, matching `04-content.md` — checked
  against the actual MDX file, not assumed carried from the artefact.
- **TAS's no-residency wording** is present verbatim in both the `spokes[]` blurb and the FAQ fee
  answer — neither states a location/residency qualifier for TAS.
- **ACT** appears only as a `comparison.columns` entry with `soon: true` and in FAQ Q5 — never as a
  `spokes[]` entry (would fail Zod: no `/white-card-act` content entry exists to reference).
- **No `trust` block used.** Nothing in `03-briefs.md` briefed a `TrustBand`, so its absence here is
  a decision, not an omission.
- **No `Course`/price schema node for the hub itself** — confirmed against `HubLayout.astro`'s own
  schema const (lines 41-55) and against the rendered `<script type="application/ld+json">` in
  `dist/white-card/index.html`.

## Image slots (input to Stage 6)

One slot only: the Hero artefact placeholder (`Placeholder` component inside `Hero.astro`, ratio
`r54`). See `06-image-prompts.md` for the disposition — this run leaves it as an FPO placeholder
rather than generating an image, and records why.
