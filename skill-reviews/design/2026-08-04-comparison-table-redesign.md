---
date: 2026-08-04
skill: design
subject: ComparisonTable.astro redesign + emphasis row + Regulator row (white-card hub)
verdict: Green
graded_by: self
---

# Design review — ComparisonTable redesign, 2026-08-04

## Session type and the crossing that produced this review

This work happened inside a **build session** (building `/white-card-act`, W3-5). Andrey asked,
mid-build, for a "Regulated by" row and a redesign of the comparison table on `/white-card` — both
outside a build session's writable paths (`src/components/**`, `src/styles/**` are design-owned;
`src/content.config.ts` is skills-owned). **Two crossings, both named and explicitly authorised
before any file outside `src/content/**`/`src/pages/**` was touched:**

1. Redesigning `ComparisonTable.astro` + its CSS in `global.css` — asked first via
   `AskUserQuestion` ("Cross into design now, on your go-ahead" vs "data row only, redesign
   later"). Andrey chose to cross.
2. Adding an `emphasis` field to the `hubs` collection's `comparison.rows` Zod schema in
   `src/content.config.ts` — discovered only once the first crossing was underway (the `emphasis:
   true` flag written into the hub's frontmatter was being silently stripped by Zod, since the
   schema had no such field). Asked again, separately, before touching `content.config.ts`. Andrey
   chose to cross.

This review exists because rule 9 requires one for any session shipping component or
token/design-register changes, regardless of which session type actually made them. Self-graded:
no design-specific fresh grader exists yet, same gap every other design review notes.

## What shipped

- **`src/components/ComparisonTable.astro`** — added an optional `emphasis?: boolean` to the `Row`
  interface, applied as a `cmp-row-emphasis` class on that row's `<tr>`. Opt-in and per-row by
  design: `/cpd`'s own comparison table (a static page, not this schema) leads with "Occupations",
  not a price, so hardcoding "row one is always emphasised" would have been wrong there. Confirmed
  `/cpd` unaffected (its rows never carry the flag).
- **`src/content.config.ts`** — the `hubs` collection's `comparison.rows` schema gained
  `emphasis: z.boolean().optional()`. Additive and optional: `/owner-builder-courses`' own
  `comparison.rows` (which don't set it) parse and render exactly as before.
- **`src/styles/global.css`, `.cmp` rules** — three changes:
  1. `.cmp tbody th` (the row-label column) now carries `background: var(--paper-alt)` — the same
     tonal-ground device DESIGN.md §4 already uses to separate sections, applied here to anchor the
     "compared fact" as the fixed axis against the five varying state columns. Header and body cell
     padding increased 13px→16px for more of the "generous vertical rhythm" DESIGN.md §1 names as a
     system trait.
  2. `.cmp tr.cmp-row-emphasis td` — the one row a reader scans first (price) now renders in the
     site's own figure voice, Archivo/tabular/600-weight/ink, matching the exact treatment
     `PriceCard`, `FactGrid` and `TrustStats` already give a headline number
     (`.price-row .p-v`/`.glance .g-v`/`.tstat .n`), rather than the same DM Sans body type as every
     other row. `.cmp tr.cmp-row-emphasis th` gets `color:var(--ink)` (up from slate) as a lighter
     companion cue, staying in DM Sans rather than also going Archivo, so the row's own label does
     not read as a second headline figure.
  3. No new colour, no new radius, no new font — every value used (`--paper-alt`, `--font-display`,
     `--ink`, `--rule-strong`) already exists in the token set. This is composition, not a token or
     design-register change, so rule 7 ("token and design-register changes are exclusive") does not
     apply here.
- **`src/content/hubs/white-card.mdx`** — `comparison.rows` gained a fifth row, `Regulator`
  (WorkSafe WA / WorkSafe Tasmania / SafeWork NSW / WHSQ / WorkSafe ACT, all already-verified names
  from `kb/register/regulator-roles-by-state.md`, no new fact), and the `Course fee` row gained
  `emphasis: true`. **Label matched to `/owner-builder-courses`' own pre-existing "Regulator" row**
  rather than the "Regulated by" first draft — checked against the live OB hub before shipping,
  not assumed.

## Measured, not ticked

- **Emphasis row, computed styles** (`getComputedStyle` on the built `/white-card` page):
  `font-family: Archivo, -apple-system, BlinkMacSystemFont, sans-serif`, `font-size: 19px`,
  `font-weight: 600`, row-label `color: rgb(26,26,26)` (`--ink`). Non-emphasis rows unchanged:
  `font-family: "DM Sans", ...`, `font-size: 15px`, row-label `color: rgb(110,110,110)` (`--slate`).
- **Contrast, computed**: ink (`#1a1a1a`) on paper-alt (`#f7f4ec`) = **15.83:1**. Slate (`#6e6e6e`)
  on paper-alt = **4.64:1** — clears the site's own 4.5:1 AA floor for small text, not just in
  theory but as the actual rendered pairing.
- **Mobile (375px)**: `document.documentElement.scrollWidth` = 375, matching the viewport exactly —
  no page-level horizontal overflow introduced. `.cmp-wrap`'s own contained scroll (`scrollWidth`
  745 vs `clientWidth` 317) is unchanged, existing, intended behaviour (DESIGN.md §7: "Compare
  values across items | A table, few columns on mobile"), not something this redesign altered.
- **`/owner-builder-courses` and `/styleguide` both re-checked live**, not assumed unaffected: OB
  hub's 8-row table has no `cmp-row-emphasis` row (correct — its frontmatter never sets the flag)
  and picked up the new tonal label-column background automatically, since that part of the CSS
  change is unconditional. The styleguide's own `ComparisonTable` specimen (QLD/WA/TAS/ACT ×
  Price/Authority/Modules) renders with the same background, no emphasis row, as expected for a
  specimen that sets none.
- **Build**: 24/24 guardrails, both before and after every change in this pass.

## What worked

- Catching the schema-stripping bug **before** calling the feature done, not after: the first build
  showed zero visual change despite the component edit landing correctly, which is what sent this
  to `grep`-ing the built HTML rather than trusting the component diff — the same "assert the
  perceived property" discipline [[feedback_self_certification_fails]] already in this session's
  memory.
- Checking `/cpd`'s own row order before deciding whether "emphasise row one" could be hardcoded
  into the component. It could not (CPD's first row is "Occupations", not a price), which is the
  reason the flag is per-row and schema-driven rather than positional.
- Checking the OB hub's existing "Regulator" label before shipping "Regulated by" as a near-synonym
  on the sibling table.

## What didn't

Nothing found in this specific piece of work. The one real defect surfaced during this same
continuous session (prose-lint catching 3 em dashes and 1 bare "ABE" in `white-card-act.mdx`'s
shipped copy) was a build-session content bug, not a design defect, and is recorded in that page's
own Stage 9 review rather than here.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- [skills] none.

## Output — every Amber or Red needs at least one
N/A — Green.

## Grader note
`graded_by: self`. No fresh design grader exists to hand this to; the same gap every design review
in this repo currently notes. Every measured value above was read from `getComputedStyle` on the
live built page or `document.documentElement.scrollWidth`, not asserted from the CSS source, per
the "measure, don't tick" discipline the readability-audit and Stage-9 grading both already apply.
