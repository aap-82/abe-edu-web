# Stage 7 — /cpd-plumbing-tas, 12 August 2026

## What ran, and what did not

Built in the same session and by the same method as `/cpd-electrical-tas`.
**`pipeline/cpd-electrical-tas/07-verification.md` is the fuller record** and covers what applies to
both: why stages 1-6 produced no artefacts (derived from the verified sibling
`cpd-building-tas.mdx` and the register, not fresh research), the disclosed `global.css` crossing,
the comment-figure defect, and the shared demand list. This file carries what is specific to plumbing.

## The one thing that is genuinely different here: a 12-course bundle drawn from a 13-course pool

**⛔ This is the page's publish blocker, and the first draft of this file had the model backwards.**

**Corrected by Andrey, 12 Aug 2026.** CBOS approves courses individually. **Thirteen** are approved
for Tasmanian plumbers and all thirteen are sold as single courses. The **bundle is twelve of them**,
selected manually, once, before the bundle is published. **A bundle buyer receives twelve courses,
not thirteen.**

Two things follow, and both reverse what this file first recorded:

1. **`points` is also the course count**, so the RRP is 12 × $99 = **$1,188**, and
   `CpdBundleLayout.astro`'s assertion (`rrp === points × singleCoursePrice`) is **correct**. The
   first draft called it a bug and set $1,287 against a thirteen-course reading. It is not a bug and
   the build was right to throw.
2. **`handover/HANDOVER-cpd-bundles.md`'s "prune the surplus course so the sold set is exactly 12"
   is correct in intent**, not superseded. The first draft refused to follow it on the grounds that
   it would delete a course the buyer receives. The buyer does not receive it.

### ⛔ Why this page cannot be published as it stands

**The register records which courses are *eligible* for a category, not which twelve were *selected*
for the sold bundle.** `bundles: ["plumbing"]` tags thirteen courses, so `liveMembers()` renders
**thirteen rows** while the copy correctly says the bundle is twelve. **A reader can count the
table.** That is a summary-vs-detail contradiction of exactly the kind `references/verification.md`
§3 check 1 makes a hard blocker — the same defect class as `/owner-builder-insurance` on 10 Aug, and
this page has it in the opposite direction from the one the first draft was guarding against.

**The fix is a data change, not a copy change**, and it is not this session's to make: the selected
twelve need recording, either as a `bundleMembers` list on the bundle or a per-course `inBundle`
flag, which is `kb/register/**` (facts) and/or `src/content.config.ts` (skills).

**What the copy does in the meantime.** It states twelve everywhere it describes the bundle, and
names the thirteen-course pool explicitly where a reader would otherwise be confused by the table —
the `#cost` prose ("All thirteen approved for Tasmanian plumbers are available singly") and a
dedicated FAQ ("You have thirteen courses approved. Why does the bundle have twelve?"). The H1 states
the **outcome** ("a full twelve-point year") rather than a course count, so it stays true both before
and after the selection is recorded. That reduces the contradiction; it does not remove it, and the
page stays `noindex`.

| Where | What it says |
|---|---|
| H1 | "a full twelve-point year" — the outcome, true either way |
| Subhead | "Twelve of them make up this bundle, selected from the thirteen approved" |
| First tick, `intro`, `#how`, steps | twelve |
| Title / meta / sticky / FactGrid | twelve |
| `#cost` prose, FAQ | names the thirteen-course pool as singles |
| **Rendered member table** | **thirteen — the unresolved gap** |

## Regulatory basis

Plumbers and gas-fitters take the same instrument as electricians, **not** the builder table:
Occupational Licensing (Continuing Professional Development) Determination 2018, §6.4 twelve points a
year, §6.2 phasing a three-year licence to thirty-six from 1 July 2019. Source
`kb/register/cbos-tas-reference.md` A3b, read against the primary instrument 23 Jul 2026. **No source
was read in this session and nothing was added to `kb/register/**`.** Thirty-six is stated as a
three-year total at every occurrence.

## Measured, from `dist/`, not asserted

| Check | Value |
|---|---|
| Points figure (derived) | **12** |
| Member courses rendered | **13** — the pool, not the bundle (blocker above) |
| Copy's course count | **12** everywhere it describes the bundle |
| Copy's course count vs rendered members | **DISAGREE by one, knowingly** — see the blocker |
| RRP | $1,188 = 12 × $99, asserted by the layout against the register |
| `noindex` in `<head>` | present |
| H1 count | 1 |
| Page scroll width @1280px | 1265px (no sideways scroll) |
| Page scroll width @375px | 375px, 0px sideways; members stack to one column, all 13 render |
| `check-reflow` | 0 failing |
| Guardrails | 28/28 pages |
| `npm run check` | 0 errors, 0 warnings |
| `check-claims` | 0 failing, 0 warnings naming this slug |
| `check-links` | 0 failing; 1 expected WARN on the `/payment` placeholder |
| `check-freshness` | 0 lapsed-but-live |

## Blockers

**`buyUrl` is a placeholder and the page is `noindex` because of it.** Worse here than on the
electrical bundle: the LearnWorlds revenue export has **no 2026 plumber bundle product at all** —
only "Special Plumbers CPD Courses" (2 payments) and the single course "TAS CPD Plumbing Essentials"
— and it carries titles with no ids. Nothing was guessed.

**`hours` is a floor, not a promise.** "About seven hours" is 416 measured minutes across **ten of the
thirteen** members. Plumbing Essentials, the wiring-rules course and the solar course are newer than
the July 2026 LearnWorlds snapshot and carry no figure, so the total under-states rather than guesses.
The page says "it covers ten of the thirteen, so treat it as a floor rather than a promise".

## Not run, and why

- **`abe-readability-audit`, `final-check`, `ai-detector`** — not run, same reason as the electrical
  bundle: `noindex` and blocked on a purchase path, so not on a publish path. They must run before
  `noindex` comes off. Stated rather than silently skipped.
- **Fresh register sync** — not run; the 27 Jul 2026 sync stands on Andrey's bare confirmation of
  12 Aug that nothing has changed.

## Ship decision

**Not merge-ready as a public page, and correctly `noindex`.** Content complete, every figure derived,
summary and detail verified to agree. Blocked on the purchase path and the three copy audits.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

Shared items are on `pipeline/cpd-electrical-tas/07-verification.md` and are not duplicated here.

- [build] **`/cpd-plumbing-tas` needs a real hero image**; it carries an FPO well and adds 1 to the
  FPO backlog. `artefactDesc`/`artefactSpec` are written and ready to prompt from.
- [facts] ⛔ **PUBLISH BLOCKER — record which twelve of the thirteen approved plumbing courses are in
  the sold bundle.** The register tags eligibility (`bundles: ["plumbing"]`, thirteen) but not
  selection, so the page renders a thirteen-row table for a twelve-course bundle. Needs a
  `bundleMembers` list or a per-course `inBundle` flag. Until it lands, `noindex` cannot come off,
  independently of the purchase path.
- [skills] **`src/content.config.ts` / `cpd-derive.mjs` conflate "eligible pool" with "bundle
  contents".** `liveMembers()` is the pool; there is no concept of a selected set, and
  `bundlePoints()`'s `min(pool, cap)` silently papers over the difference by capping the *display*.
  That was readable as "the bundle is the whole pool, capped", which is how this build got the model
  backwards for its first draft. Whatever shape the facts fix above takes, the derive layer needs to
  distinguish the two.
- [design] **`CpdBundleLayout.astro:180-183` hardcodes two facts that are wrong on any non-building
  bundle.** Its members lead reads "about **ten hours** of work" regardless of `bundle.hours` (this
  page states six, the layout ignores it), and "That meets a **builder's** 12-point year" on a
  plumbing page. Invisible until now because `cpd-building-tas` was the only bundle and both happened
  to be true of it. Both are visible on `/cpd-electrical-tas` and `/cpd-plumbing-tas` today.
