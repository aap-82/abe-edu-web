# HANDOVER — design session

**Session type: `design`.** Own branch. May write `src/components/**`, `src/styles/**`, styleguide
specimens. Must not touch `kb/register/**`, `.claude/skills/**`, `pipeline/**`. Drafted 25 July 2026 by
a `skills` session; it routes design work but does none of it (a skills session cannot write components
or CSS).

Pre-flight `node scripts/system-health.mjs` before starting and again before merge — on FAIL, stop and
open the type that owns the fix. Stop at Stage 8: production deploy is human-triggered.

This session has two parts: **A** the design items already on the demand list, **B** the four
text-presentation components from the (now-closed) claude-code-pack, reconciled to current reality.

---

## Part A — design items already routed from the Stage-9 demand list

Regenerate the live view first: `node scripts/demand-split.mjs --write` writes
`reports/handover-design.md` (a derived view — do not edit or commit it). It lists exactly these,
pulled from the retro-tagged reviews:

1. **`.note` and `.price-foot` need a `max-width`** (from the wa-owner-builder review). Verified in
   `src/styles/global.css`: neither rule declares one, producing 128–172 CPL on four live pages.
   *"One line, four pages, the largest readability win available."* A `max-width` on these two rules
   (align with the site's existing `.measure` / prose measure, ~60–75 CPL) fixes it.
2. **`CpdBundleLayout` owns a numbered section, so per-file marker numbering silently double-counts**
   (from the cpd-building-tas review). Any MDX rendered by `CpdBundleLayout` collides on `01` and
   disagrees on `total` (the layout's own section is `marker="01" total="06"` while the MDX restarts at
   `01 of 05`). It needs **one owner** for the marker sequence — either the layout numbers everything
   or the MDX does, not both.

**Trigger status (be honest about it).** Under session-types Rule 3, a demand item earns restructuring
on its **second** occurrence; both of these are recorded **once** so far. They are safe, high-value,
low-risk fixes and worth doing — but note in your Stage-9 review that you acted on single-occurrence
items by choice, so the record stays truthful.

---

## Part B — the four text-presentation components (pack handover 4)

The pack proposed four **archetype-independent** text components. They are genuinely absent from the
repo (confirmed 25 Jul: none in `src/components/`, the library, or `/styleguide`). Buildable as
specced — every reference the pack cites still resolves:
`references/component-selection.md`, `references/component-library.md`, `src/types/course.ts`,
`DESIGN.md §7` all exist.

**Reconcile before building — this is the important bit.** The pack was written to run *after* phase 2
so the run's demand list could name the real component gaps. Phase 2 has since run **three times**, and
the design gaps those runs actually named are the two in Part A — **not** these four. So treat the four
as a still-open *proposal*, not evidence-backed by the runs. The pack itself asks you to judge (its
"Report back" #4): build them, then say whether they are the right first set or whether building them
surfaced a fifth. **Recommend, do not silently add.** Also ignore the pack's stale "expect 17 pages"
number — use whatever `guardrails.ts` reports now (8 MDX course/bundle pages plus the per-page `.astro`
pages and hubs).

### The four (prop contracts + the mandatory avoid-rule)

- **`SectionHeading`** — structured section opener (the high-leverage one; every section currently
  opens with an identical raw `<h2>`). Props: `eyebrow?`, `title`, `lead?`, `as?: 'h2'|'h3'` (never
  `h1` — the Hero owns the only h1), `align?: 'left'|'center'`, `tone?: 'default'|'accent'`. Dual-tone
  (`accent`) puts the brand accent on the **eyebrow**, ink on the title — **from tokens, no hex**.
  *Avoid:* accent fighting the hierarchy; more than one accent per heading; ever an `h1`.
- **`DefinitionList`** — term → meaning pairs (Statement of Attainment, Class 1a, CPD point). Props:
  `items: {term, def}[]`, `leadIn?`. *Avoid:* using it to **compare** values across items — that's
  `ComparisonTable`.
- **`StatBlock`** — one arresting figure standing alone ("since 2007", a completion time). Props:
  `value`, `label`, `sub?`. *Avoid:* stacking several (that's `FactGrid`); inventing a figure; any
  fact-about-the-world value must obey the single-owner rule / trace to a source.
- **`KeyTakeaway`** — end-of-section distilled point. Props: `text`. *Avoid:* one on every section;
  introducing new information; confusing it with a `Callout` (act-on vs distil).

### What each of the four must ship with, in the same change
1. The `.astro` component — **tokens only, no inline styles, no hardcoded colour or spacing.**
2. A **styleguide specimen** on `/styleguide` (or `guardrails.ts` fails it `SG_PENDING`).
3. A **`component-selection.md` entry** — use **and** avoid, matching the file's voice.
4. A **prop contract in `component-library.md`**; shared types into `src/types/course.ts` if needed.
5. Verify Astro mechanics (props, slots, `set:html`, `astro:assets`) against the **Astro docs MCP**
   before writing — prop contracts are ABE's, the syntax is the docs'.

**Do not wire the four into existing pages this session** — that is authoring, and belongs to a page
build, not component creation.

---

## Part C — from the CPD any-size-bundle fix (added 25 July 2026)

Two copy/behaviour items surfaced by the skills-session fix that made the CPD check validate
*published points ≤ pool* instead of *pool == 12* (a bundle may be any size; a pool above or below 12
is legitimate, not a defect — `scripts/check-claims.mjs`, `scripts/lib/cpd-derive.mjs`). Both are
design-lane and neither is urgent: the only live bundle page (building, pool 12) is unaffected, and a
design session has since run once already (see `skill-reviews/design/2026-07-25-text-presentation-and-grounds.md`).

1. **`CpdBundleLayout` still frames a >12 pool as "surplus against a cap".** Its `live > POINTS_CAP`
   note renders *"the register holds N live approved courses for this category against a 12-point cap"*.
   Under the corrected model a pool above 12 is a valid bundle, not a surplus, so when the **plumbing**
   bundle page is built (pool 13) that copy should present the extra courses as included, not as an
   overflow against a ceiling. Harmless today (no >12 page exists), so it is a build-time copy fix for
   whoever builds the plumbing page rather than a standalone task.
2. **Optional product call: advertise the full pool for a >12 bundle.** `bundlePoints` still caps the
   *displayed* figure at 12 (`min(pool, 12)`), so a 13-point plumbing bundle would publish "12". That
   is honest (12 ≤ 13) and deliberate, but if ABE would rather sell the full 13, uncapping
   `bundlePoints` to `liveTotal` is a one-line change in `scripts/lib/cpd-derive.mjs` — a product/design
   decision, because the layout copy frames coverage against the 12-point year. Settle it before the
   plumbing page ships; recommend, do not change unilaterally.

---

## Token-exclusivity caveat (session-types Rule 7)

Consuming existing tokens is fine. But if any Part-A or Part-B change needs a **new** design token (a
value the register does not define — a `max-width`/measure token, a heading-accent token), that token
edit becomes its **own exclusive session** and stop-and-report it as a design-register gap rather than
hardcoding around it. Do not weaken a guardrail to land anything.

## Constraints
- Four components, no more. Range added faster than the avoid-rules absorb is the failure mode.
- Every component ships with its avoid-rule and its specimen, or it is not done.
- Tokens only; a token gap is a finding to report, not to work around.
- Australian English. No em dashes in body copy. Never "comprehensive". ABE is not an RTO.

## Report back (Stage-9 review, demand list tagged)
1. Part A: both fixes, with before/after CPL for the `.note`/`.price-foot` change and the resolved
   marker sequence for `CpdBundleLayout`.
2. Part B: the four components, each with its prop contract, its `component-selection` avoid-rule, and
   confirmation its specimen renders on `/styleguide` and nowhere else.
3. Any design-token gap you hit (and whether it forced a separate token session).
4. Your view: are these four the right first set, or did building them surface a fifth that is clearly
   archetype-independent and missing? Recommend, do not add it.
5. Final `npm run build` + `node scripts/system-health.mjs` — guardrails green, 0 FAIL.
