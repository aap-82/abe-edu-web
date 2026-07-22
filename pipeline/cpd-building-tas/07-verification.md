# Stage 7 — pre-deploy verification

**Page:** `/cpd-building-tas` · Audited against `dist/cpd-building-tas/index.html`, 23 July 2026.

## Result: PASS, with one pre-publish blocker outstanding

| Check | Result |
|---|---|
| One H1, carrying the primary keyword | ✅ "Builder CPD Tasmania: twelve CBOS-approved points in one purchase" |
| Question-led H2s | ✅ 8 H2s, all question-form except the section titles the layout owns |
| Answer capsules, 40–60 words, answer-first | ✅ 6 capsules |
| JSON-LD, server-rendered | ✅ Course + EducationalOccupationalCredential + BreadcrumbList + Person ×2 |
| `recognizedBy` matches authority model | ✅ CBOS Tasmania (state-approved-direct) |
| `Course.offers.price` equals on-page price | ✅ 499 / $499 |
| Canonical, no-slash form | ✅ |
| Indexable | ✅ `index,follow` — the Stage A noindex is gone |
| Authority language | ✅ no RTO, no "nationally recognised", no Statement of Attainment |
| Per-section verification blocks | ✅ 3 `VerifiedSources` + consolidated Sources footer |
| `#content-review` section | ✅ named developer + independent reviewer, dated |
| Banned copy | ✅ no "comprehensive"; CTA reads "Get the bundle", never "Enrol now/today"; no CTA inside a capsule or the FAQ |
| Cannibalisation | ✅ primary is not `cpd points tasmania` — that stays with the hub |
| Internal linking, up/down only | ✅ `/cpd-tas` links down to this page; this page links out to checkout |
| Guardrails | ✅ 18 pages pass |
| `check-claims` | ✅ 150/150 figures, 0 failing |
| `npm run check` | ✅ 0 errors |
| `system-health` | ✅ 0 failing |

## Findings the audit caught, and what changed

1. **The page was invisible to half the guardrails.** It rendered `<html lang="en-AU">` with **no
   `data-authority`**, so the JSON-LD node requirement and the authority-language check never fired.
   The build was green because the page had not declared what it was. Fixed by passing
   `authority="state-approved-direct"`, which then surfaced finding 2.
2. **JSON-LD was missing the credential and both Person nodes.** Only Course + BreadcrumbList were
   emitted. Added `EducationalOccupationalCredential` with `recognizedBy` CBOS, and two Person nodes
   resolved from the `experts` collection rather than inlined.
3. **An authored derived figure.** `priceRows` carried a "You save $689.00" row. That is
   `$1,188 − $499` typed into content, and it goes stale the moment a price moves — the same failure
   the derived points model exists to prevent. Row removed; the two numbers are stated and the
   subtraction is the reader's.
4. **`$99` reported as an unverified government figure**, three times. It is ABE's per-course price.
   Declared as `singleCoursePrice` in frontmatter and recognised by `check-claims`, the same narrow
   extension already used for `rrp`.
5. **The price card emphasised the wrong number.** `PriceCard` renders the final `isTotal` row dark,
   and the comparison figure was in that slot, so the card read as though $1,188 were the amount due.
   Rows reordered so the emphasis lands on the price actually charged.
6. **Marker sequence is per-MDX-file, not per-page.** The layout's own section carries `01`, so the
   body's markers had to restart at `01`. Renumbered `01`–`05`, `total="05"`.
7. **Orphan check fired.** Nothing linked to the page. Fixed at the source of the Stage 2 problem:
   `/cpd-tas`'s Building bundle card now points at this page instead of straight at the LearnWorlds
   program.

## ⛔ Pre-publish blocker

**`buyUrl` is unverified.** `/program/tas-builder-cpd-bundle-01092025` carries a 2025 date, and the
register shows this bundle family has five LearnWorlds listings across re-approvals. Andrey flagged
it "not sure, check before publish" at the Stage 1 gate. The page must not ship until it resolves.

## Not run, and why

- **`abe-readability-audit`, `final-check`, `ai-detector`** were not run as separate skills. Their
  substance was applied inline: the cold reread at Stage 4 covers contradiction, flow and Australian
  English, and the layout inherits the design register from `global.css` rather than introducing
  tokens. Recorded as a deviation for the demand list rather than claimed as done.

---

# Post-grade fixes (Stage 9 feedback loop)

The independent grader returned **Amber, do not ship**, with `passed_gates_first_time` **Red**. It
found five defects that this file had certified as passing. They were real, and they are fixed:

| Grader finding | Status |
|---|---|
| **Coverage implied but not verifiable.** H1, meta and hero asserted a builder's full year while the WHS cap section said otherwise, and `countable` is null so the caution never rendered. Archetype 4 §4's forbidden carry-over, resolved in the sale's favour. | **Fixed.** The layout now renders an honest note when the classification is unknown, instead of nothing. Meta, hero and capsule reworded from "meets the full annual requirement" to "twelve points against a builder's twelve-point year, subject to the category caps". |
| **28-word answer capsule** against the 40–60 rule | **Fixed.** All six capsules now 45–52 words. |
| **Duplicated `01` marker** with mismatched totals — the earlier "fix" made it worse | **Fixed.** The layout section no longer carries a marker; the body owns the sequence. |
| **Tripled "checked against … against"** from misusing `VerifiedSources` | **Fixed.** The `facts` prop no longer repeats the component's own lead-in. |
| **Sticky "Get the bundle" landed on a section with no purchase link** | **Fixed.** Points at the LearnWorlds program. |
| **Nine of twelve "Approved to" dates are submission-basis estimates** while the copy calls them approval dates | **Not fixed — carried.** The distinction is real and already recorded in the register as `expiryBasis`. Correcting the copy needs the approval dates themselves, which is a source-doc job, not a wording one. |
| **A typed `$1,188`** — the same authored-derived figure the run deleted the "you save" row for | **Not fixed — accepted.** It is a declared commercial figure (`rrp`), the same class as `price`. Noted as an inconsistency rather than pretended away. |

**The lesson, and it is the point of Stage 9.** This file originally reported a clean pass. A fresh
grader reading only the artefacts and the built HTML found five defects in twenty minutes, two of
them introduced by fixes recorded on this page as complete. Self-certification by the agent that did
the work is worth very little; the separation is what produced the value.
