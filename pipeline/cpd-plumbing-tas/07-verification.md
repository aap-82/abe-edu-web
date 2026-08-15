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
- ~~[design] **`CpdBundleLayout.astro:180-183` hardcodes two facts that are wrong on any non-building
  bundle.** Its members lead reads "about **ten hours** of work" regardless of `bundle.hours` (this
  page states six, the layout ignores it), and "That meets a **builder's** 12-point year" on a
  plumbing page. Invisible until now because `cpd-building-tas` was the only bundle and both happened
  to be true of it. Both are visible on `/cpd-electrical-tas` and `/cpd-plumbing-tas` today.~~
  **Closed 12 Aug 2026, same session**, on Andrey's explicit instruction ("fix the layout strings") —
  a second disclosed crossing into design-owned `src/layouts/**`. `hours` now derives from
  `bundle.hours` and drops out entirely when unset; the trade noun comes from a `category` map
  (`building`→builder, `electrical`→electrician, `plumbing`→plumber), total over the schema's
  three-value enum. Measured on all three bundles: plumbing now reads "about six hours ... meets a
  **plumber's** 12-point year", electrical "about six hours ... 11 points against a 12-point year,
  add 1 more", and **`/cpd-building-tas`'s sentence is unchanged** — because its own frontmatter says
  "About ten hours", which is what the hardcoded string had been matching by coincidence. That
  unchanged sibling is the regression evidence: the fix reproduces the old text from data.


---

## Re-verification, 12 Aug 2026 — step bodies split into two-item lists

**Structural only. No word of copy changed on this page.**

The Stepper now renders a step body as a bordered card with the bullets removed and the FIRST list
item in `--ink` at 600, the rest in `--ink-3`. That emphasis can only apply where the body is an
array, because that is what renders as separate `<li>` elements; a single-string body renders as one
`<p>` with nothing to promote. 2 steps on this page carried two sentences in one
string and were split on the existing sentence boundary:

  - "Get the bundle"
  - "Work through them in any order"

**The split is mechanical.** Each sentence became its own array item, character for character. No
sentence was rewritten, shortened, merged or added, and no figure, date, name, price, threshold or
regulator reference was touched. Verified by diff: the only changed characters are the quoting and
brackets that turn one string into two.

### Re-verified

| Check | Result |
|---|---|
| Copy text | unchanged word for word |
| Figures / dates / regulator names | none touched |
| Authority model | untouched |
| Guardrails | 28/28 |
| `npm run check` | 0 errors, 0 warnings |
| `check-claims` | 0 failing |
| `check-reflow` | 0 failing |

**Not re-run: the three mandated skill-audits** (`abe-readability-audit`, `final-check`,
`ai-detector`). Their input is the page's prose and the prose is identical; only its container
changed. Stated rather than silently skipped.

**Why this entry exists.** `check-pipeline` §4 fails a page whose source is committed later than its
Stage 7 artefact, on the rule that a verification predating the content it certifies has certified
nothing. That gate fired on this page for the split above, correctly, and this closes it in the same
commit as the change rather than afterwards.


---

## Re-verification, 12 Aug 2026 — step bodies rewritten as two-item lists (commit 1c26fab)

**This is a COPY REWRITE, not the mechanical split of 12 Aug's earlier commit.** The re-verification
entry added by `c7c6c43` certified that each sentence became its own array item "character for
character". That is **not** true of `1c26fab`, and this entry deliberately does not reuse that
wording. Sentences here were re-worded, re-ordered and in places lengthened to give the Stepper's
first-item emphasis a short lead line to promote.

3 step bodies in the "how it works" ladder changed on this page:

  - "Complete the assessment on each course"
  - "Download your certificate as you go"
  - "File them with your CPD record"

### What was checked

Every changed line was read against its predecessor in `git show 1c26fab`. The rewrites preserve
meaning and introduce no new assertion: no figure, price, date, threshold, pass mark, unit code,
licence class, RTO number or regulator name was added, removed or altered on this page.

### Re-verified

| Check | Result |
|---|---|
| Figures / dates / thresholds / unit codes | none touched |
| Regulator and RTO names and numbers | unchanged |
| Authority model | untouched |
| New regulatory claims introduced | **none on this page** |
| Guardrails | 28/28 pages passed |
| `astro check` | 0 errors, 0 warnings |
| `check-claims` | 0 failing |
| `check-reflow` | 0 failing |

**Not re-run: the three mandated skill-audits** (`abe-readability-audit`, `final-check`,
`ai-detector`). Their input is the page's prose, and the prose here was re-worded rather than
re-argued: no section was added, removed or re-ordered, and no claim changed. Stated rather than
silently skipped, per the standing rule that skipping is allowed and skipping silently is not.

**Sibling page NOT cleared.** `wa-owner-builder-course` was touched by the same commit and is
deliberately left failing: its rewrite added a new regulatory sentence ("Below that threshold, no
approval is required") that is not verified in `kb/register/`. That is a publish hard-blocker and
is not this page's to close. See the design review of 12 Aug 2026 for the full finding.

**Why this entry exists.** `check-pipeline` §4 fails a page whose source is committed later than
its Stage 7 artefact, on the rule that a verification predating the content it certifies has
certified nothing. That gate fired on this page for the rewrite above, correctly. The gate compares
git commit times, so this closes only once committed.

**Filed by a design session.** `pipeline/**` is build-owned; this was written on Andrey's direct
instruction after the crossing was named. Recorded here rather than only in the session transcript.


---

## Re-verification note, 13 August 2026 — hero `howItWorks` split

**What changed.** Commit `9946204` inserted `|` separators into this page's hero `howItWorks`
frontmatter string, so `ProcessTrack` can render each step as a two-line card (action on the first
line, detail on the second) instead of a one-line row in a vertical ledger.

```
before: Get the bundle → Work through in any order → Assessment on each course → Certificate as you finish
after:  Get|the bundle → Work through|in any order → Assessment|on each course → Certificate as you finish
```

**Why no re-audit.** This is a mechanical separator insertion and nothing else, proven rather than
asserted: the new string is byte-identical to the old one once each `|` is read back as the space it
replaced. No word was added, removed or re-ordered. The splits were applied from an explicit table,
and the steps that could not be split without inventing a second line — single words, and any step
leading with a proper noun — were deliberately left whole.

Nothing the three mandated audits read has changed. No section was added, removed or re-ordered; no
answer capsule, claim, figure, price or source line was touched; the page's prose is untouched. The
`howItWorks` prop is a hero label, not prose. So `abe-readability-audit`, `final-check` and
`ai-detector` were **not re-run**, and that is stated here rather than silently skipped, per the
standing rule that skipping is allowed and skipping silently is not.

**Why this entry exists.** `check-pipeline` §4 fails a page whose source is committed later than its
Stage 7 artefact, on the rule that a verification predating the content it certifies has certified
nothing. That gate fired correctly on this page for the commit above. It compares git commit times,
so this closes only once committed.

**Filed by a design session on Andrey's explicit instruction**, after the alternatives (a full Stage 7
re-run per page, or reverting the content split) were named and this one was chosen. `pipeline/**` is
build-owned; the crossing is recorded here rather than only in the session transcript.


---

## Re-verification note, 16 August 2026 — noindex comment corrected (commit 95360d5)

**What changed: one frontmatter COMMENT sentence, replaced by a longer block.** The blocker note
above `buyUrl` ended "REMOVE noindex ONLY when a real id lands and Stage 7 is re-run against it" —
two necessary conditions written as if they were sufficient, while this page's own DIFFERENCE 2
block names a blocker neither of them touches. It now lists five, adding the selected-twelve
blocker, the `learn.` subdomain decision, and the PENDING entry at
`scripts/check-redirect-targets.mjs:41`.

Corrected because the identical wording on `cpd-building-tas.mdx` led a build session to remove that
page's flag on a cleared Stage 7 the same day; only the check stopped it.

**The flag itself is untouched**, and so is every blocker it stands on.

**The selected-twelve blocker was re-measured rather than restated**, since the new comment now
quotes a number: `dist/cpd-plumbing-tas/index.html` renders **13 `bcard` members** against copy
saying "Twelve CBOS-approved" six times. The copy remains careful and correct — "Twelve of them make
up this bundle, selected from the thirteen approved for Tasmanian plumbers" — so this is not a
contradiction in the prose. What the table cannot do is say WHICH twelve. Unchanged from the 12 Aug
finding; still a publish blocker; still register/schema work.

**Why no re-audit — measured, not asserted.** The page was built from this file's pre-change and
post-change versions and the rendered HTML compared:

| Page | `dist/` SHA-256 (first 16) before | after |
|---|---|---|
| `/cpd-plumbing-tas` | `9d4ec09fef3667cd` | `9d4ec09fef3667cd` |

Byte-identical. No section, answer capsule, claim, figure, price or source line was touched. So
`abe-readability-audit`, `final-check` and `ai-detector` were **not re-run**, stated here rather than
silently skipped.

**Why this entry exists.** `check-pipeline` §4 compares git commit times and fired correctly on this
page for the commit above. It cannot know a diff was comment-only. Closes only once committed.


---

## Re-verification note, 16 August 2026 — subdomain confirmation recorded (commit f66a359)

**What changed: one frontmatter COMMENT condition, struck.** Condition 4 of the noindex list read
"The `learn.` subdomain decision. A real id does not settle this...". Andrey confirmed that ticket
resolved on 16 Aug 2026 and directed that the payment path is not to be treated as a blocker, so the
condition is struck and marked CLOSED, with a note that `check-links`' warning on this page's
`/payment` path is now expected rather than actionable.

**The flag and every remaining gate are untouched**, and this page has two:
1. The `buyUrl` is still a `TBC-` placeholder that does not resolve — no 2026 plumber bundle
   checkout id has been supplied. A **different fact** from the one confirmed, and deliberately not
   folded into it.
2. The selected twelve are still unrecorded, so `liveMembers()` renders the whole thirteen-course
   pool. Unchanged and still a publish blocker.

**Why no re-audit — measured.** Built from the pre-change and post-change frontmatter, rendered HTML
compared:

| Page | before | after |
|---|---|---|
| `/cpd-plumbing-tas` | `9d4ec09fef3667cd` | `9d4ec09fef3667cd` |

Byte-identical, and identical to the value recorded in this file's 16 Aug comment-correction note, so
the page has not moved across either of today's two comment changes — including the 13-member table,
which is unchanged and still overstates the sold bundle by one course.
`abe-readability-audit`, `final-check` and `ai-detector` were **not re-run**, stated rather than
silently skipped.

**Why this entry exists.** `check-pipeline` §4 fired on this page for commit `f66a359`, which shipped
the comment change without a matching note. **Third occurrence in one day of the same omission**, and
the first to reach `main`. See the sibling note in `pipeline/cpd-electrical-tas/07-verification.md`
and `kb/mistakes-log.md` row 19.


---

## Re-verification note, 16 August 2026 — the selected twelve recorded, member table now 12

**What changed, and it is a DATA change, not a copy change.** The publish blocker recorded on 12
Aug — the member table rendering all thirteen live pool courses against copy correctly saying twelve
— is closed. Andrey named **TAS CPD Solar Energy** as the course outside the sold bundle on 16 Aug
2026. Its `Bundle` tag was updated in the source doc (Superhuman Docs `TAS CPD Courses`,
`superhuman://docs/wXRzQ7oMrm`, row `i-dfk3wVBSIG`), keeping Builder and Electrician because it is
sold in both, and `npm run sync:cpd` regenerated `kb/register/cpd/tas-courses.json`.

`kb/register/**` is not hand-editable: the file is a generated projection and `check-claims`
verifies its checksum, so a hand-edit would silently fork the register. The change had to be made at
source and synced, and was.

### Measured

| | before | after |
|---|---|---|
| `bcard` members rendered on `/cpd-plumbing-tas` | 13 | **12** |
| `system-health` CPD plumbing | 12 pts within a live pool of 13 (of 14 tagged) | **12 pts within a live pool of 12 (of 13 tagged)** |
| `/cpd-building-tas` members | 12 | 12 (unchanged) |
| `/cpd-electrical-tas` members | 11 | 11 (unchanged) |

The two sibling bundles were checked explicitly because Solar Energy is tagged to all three; only
the plumber tag was removed.

### The copy did not change, and is now literally true

Every "thirteen" on the page still holds. Solar Energy remains **CBOS-approved for plumbers** —
untagging a bundle does not un-approve a course — so thirteen live courses still carry the Plumbing
*category*. Verified by counting the register's live Plumbing-category rows: **13**. So "Twelve of
them make up this bundle, selected from the thirteen approved for Tasmanian plumbers" now describes
exactly what the page renders, where before it described what the page claimed while the table said
otherwise. No prose was touched, so `abe-readability-audit`, `final-check` and `ai-detector` were
**not re-run** — stated rather than silently skipped.

### Worth carrying: the predicted fix was the wrong one

Both this artefact and the page comment predicted a register/schema change — a `bundleMembers` list
or a per-course `inBundle` flag. That would have built a second mechanism to express something the
model already had: `Category` (CBOS approval) and `Bundle` (what is sold together) are already
separate columns at source. The defect was one row tagged to a bundle it is not sold in, and the fix
was one cell. **A missing-mechanism diagnosis should be checked against the source schema before it
is built**, because a data error and a model gap look identical from inside the projection.

### Still noindex

One blocker remains and it is unchanged: `buyUrl` is a `TBC-` placeholder with no 2026 plumber
bundle checkout id supplied. The page cannot be published until that lands.
