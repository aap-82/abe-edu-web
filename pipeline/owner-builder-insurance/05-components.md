# 05 · Section plan + component selection — `/owner-builder-insurance`

**Output target:** `src/pages/owner-builder-insurance.astro` (hand-built Recipe C page, the
`/accreditation` and `/reviews` pattern). Not an MDX collection entry: the `courses`, `hubs` and
`cpdBundles` schemas in `src/content.config.ts` all require course-shaped fields this page has no
business carrying (`price`, `authorityModel`, `credentialName`, spokes), and adding a new collection
would mean editing `content.config.ts`, which is **skills-owned** and outside a build session's
may-write list. Hand-building matches the existing precedent for prose pages and needs no schema
change.

## Section plan — one row per section, mapped to its brief

| # | `id` | marker | H2 | From brief | Components |
|---|---|---|---|---|---|
| — | `top` | — | (hero, single H1) | — | `Hero` |
| 1 | `what-you-need` | 01 | What insurance does an owner builder actually need? | Brief 1 | `Section`, `AnswerCapsule` |
| 2 | `compulsory` | 02 | Is home warranty insurance compulsory for an owner builder? | Brief 2 | `Section`, `AnswerCapsule`, `ComparisonTable`, `Note`, `VerifiedSources` |
| 3 | `cover` | 03 | What does cover include, and what does it leave out? | Brief 3 | `Section`, `AnswerCapsule`, `CanCant` |
| 4 | `timing` | 04 | When does cover need to be in place? | Brief 4 | `Section`, `AnswerCapsule`, `Note` |
| 5 | `consequences` | 05 | What happens if you do not hold the cover your state requires? | Brief 5 | `Section`, `AnswerCapsule` (prose body) |
| 6 | `arrange` | 06 | How do you arrange cover? | Brief 6 | `Section`, `InsurancePartner`, `Note` |
| 7 | `content-review` | 07 | Who reviews this page? | Brief 7 | `Section`, `AnswerCapsule`, `VerifiedSources` |
| — | — | — | (closing CTA + footer) | — | `CtaBand`, `SourcesFooter` |

Seven numbered sections, so `Section total="7"` throughout rather than the default `"10"`.

## Deviations from `03-briefs.md`, and why

Recorded so a later reader can tell a deliberate editorial call from a dropped section.

1. **Brief 5's carrier changed from "table (reused) + one paragraph" to prose.** A second
   `ComparisonTable` would repeat the same five state labels a screen below the first, with a third
   long-prose column, at a worse reading width. The consequences group into three patterns
   (resale-insurance states, written-notice states, no-scheme states), which is prose shape rather
   than table shape. The five-state table in section 2 stays the single place the state axis is
   enumerated.
2. **Brief 7's "Sources" section is built as `#content-review`.** Renamed to the sitewide anchor
   convention every course page already uses, so the reviewer block, its heading and its anchor
   behave identically to the rest of the site. Content is unchanged from the brief.
3. **A hero was added, which the briefs do not describe** (they start at section 1). Every page on
   this site opens with one, it carries the single H1 the guardrails require, and `BaseLayout`'s
   chrome assumes it.
4. **`ComparisonTable` is used in its items-as-rows orientation** (facts across the top, states down
   the side) — the component's documented second shape, previously unexercised by either hub. States
   as columns would have put five long prose cells side by side.

## Component prop contracts that are invisible at the call site

The things that cost this pipeline time before, recorded where the next author will look.

- **`Hero`'s `cta.microcopy` must be set explicitly on this page.** Left unset it falls back to
  `'Pay by card or 4 interest-free payments with Afterpay'` (`Hero.astro:36`). This page sells
  nothing and has no checkout, so the default would be a false payment claim. That exact default
  shipped live on `/white-card-tas` and `/white-card-qld` and was removed on 8 Aug 2026 — do not
  reintroduce it here by omission.
- **`ComparisonTable` items-as-rows: leave `rows[].href` and `rows[].soon` unset.** Setting either
  renders a trailing action column, one button per state, which this table has no destination for.
  `cornerLabel` defaults to `"State"`, which is already correct here.
- **`CanCant` requires `canTitle` and `cantTitle`.** Both are non-optional in its `Props`; omitting
  them renders empty column headings rather than failing.
- **`VerifiedSources` takes `sources` as `{ label, href }[]`,** not a string, and its `facts` prop is
  joined to the source list by a conditional joiner — phrase `facts` so it does not end in the word
  "against" or the rendered line stutters (the doubled-joiner defect fixed 29 Jul 2026).
- **A new `.astro` file starts at inline-style budget 0** (`guardrails.ts:200`, "new file -> budget
  0"). This page must therefore carry zero inline styles and zero hand-rolled structural markup:
  every shape on it comes from an existing component with a styleguide specimen.
- **The forbidden-claim scan never runs on this page.** `guardrails.ts` keys that scan on
  `data-authority`, which only `CourseLayout` emits. Like `/accreditation`, every claim here is
  hand-checked against the authority model, with nothing mechanical behind it. Section 6 states the
  referral relationship in the body text, which archetype 9 §4 requires and no check enforces.

## Open item carried into Stage 6

**There is no confirmed quote destination for InsuranceTek.** No URL, form or booking link exists in
the repo, and the three live `InsurancePartner` blocks on the QLD/TAS/WA course pages all point their
quote CTA at `#enrol` — that page's own enrolment anchor, which this page does not have. Built with
an in-page `#arrange` anchor, the same precedent `/white-card-tas` and `/white-card-qld` set for a
page with no confirmed destination. **This is a real ship gate, not a cosmetic one:** the page's only
call to action currently goes nowhere outside itself. Flagged in `07-verification.md` and as a
`[build]` demand item.
