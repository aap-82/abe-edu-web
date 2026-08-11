# Stage 7 — /cpd-plumbing-tas, 12 August 2026

## What ran, and what did not

Built in the same session and by the same method as `/cpd-electrical-tas`.
**`pipeline/cpd-electrical-tas/07-verification.md` is the fuller record** and covers what applies to
both: why stages 1-6 produced no artefacts (derived from the verified sibling
`cpd-building-tas.mdx` and the register, not fresh research), the disclosed `global.css` crossing,
the comment-figure defect, and the shared demand list. This file carries what is specific to plumbing.

## The one thing that is genuinely different here: 13 courses, 12 published points

**This is the page's whole risk and it was the thing most likely to ship wrong.**

The live pool for this category is **thirteen** courses at one point each. `bundlePoints()` in
`scripts/lib/cpd-derive.mjs` publishes `min(pool, 12)`, so the page's points figure reads **12** while
the member list below it renders **13 rows**. That is deliberate and documented in that file: the cap
is a *display* ceiling for a twelve-point year, "never a limit on how large the bundle may be", and
the pool is "kept whole in the register (NOT pruned to fit 12)".

**Copying the sibling's phrasing would have produced a contradiction a reader can count.**
`cpd-building-tas` opens "Twelve CBOS-approved courses, one point each". Reused here, that would put
"twelve courses" in the hero above a table listing thirteen — a summary refuted by its own detail,
which `references/verification.md` §3 check 1 made a hard blocker **the same day this page was
built**, on the evidence of `/owner-builder-insurance` shipping exactly that defect on 10 Aug.

So the copy says **thirteen courses against a twelve-point year, with one spare**, everywhere:

| Where | What it says |
|---|---|
| H1 | "a full twelve-point year" — the *outcome*, not a course count |
| Subhead | "Thirteen of them come in this bundle against a twelve-point year ... one course spare" |
| First tick | "Thirteen CBOS-approved courses" |
| `intro`, `#cost`, `#how`, `#how-long` | thirteen |
| Title / meta / sticky | twelve **points** (the derived figure) |
| FactGrid row | "This bundle / 13 / courses, covering the year with one spare" |
| Dedicated FAQ | "Why are there thirteen courses for a twelve-point year?" |

Points and courses are never used as if they were the same number. The surplus is presented as
headroom, which is what it is, rather than hidden.

`handover/HANDOVER-cpd-bundles.md` instructs "prune the surplus course in the source doc so the sold
set is exactly 12". **Not done, deliberately** — that instruction predates the corrected bundle model
that `cpd-derive.mjs` now implements, and pruning would remove a course the buyer actually receives.
Filed on the electrical page's demand list.

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
| Member courses rendered | **13** |
| Copy's course count vs rendered members | agree (13) |
| Copy's points figure vs derived | agree (12) |
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
- [skills] **The 13-vs-12 shape has no check.** `cpd-derive.mjs` publishes `min(pool, cap)` and
  nothing verifies that a bundle page's *prose* course count matches the rendered member count. This
  page got it right by hand, one day after the same class of defect was made a hard blocker. A
  bundle-specific check is cheap: compare the authored `intro`/tick wording against
  `liveMembers().length`. Second bundle with a surplus pool will not necessarily be written by
  someone who has just read this file.
