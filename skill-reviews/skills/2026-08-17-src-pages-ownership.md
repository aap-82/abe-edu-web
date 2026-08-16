---
date: 2026-08-17
skill: skills-session
subject: src/pages/** assigned — a three-way split, and the demand item that was never filed
verdict: Green
graded_by: self
---

# Skills review — `src/pages/**` ownership, 2026-08-17

Self-graded; no fresh-subagent skills grader exists (CLAUDE.md session-types rule 6).

## Verdict

**Green.** The sixth path-ownership gap is assigned, and it is the first that could not take the
default answer: `src/pages/**` is not one kind of file, and the "unless it is content" default —
which is what commit `9281498` reasoned from mid-run — is right for most of it and wrong for two
files. The split is decided against evidence already in the build rather than against my judgement
of what a page is.

The finding that outranks the assignment is in section 4: **the demand item that was supposed to
carry this work to a skills session was never written.** The task reached this session because a
human carried it.

## Pre-flight

`node scripts/system-health.mjs`: **0 failing**, 34 warning, 66 ok. Identical at close.

## 1. Why not a blanket row

Both blanket answers fail on the record, and they fail in opposite directions.

**A blanket `build` row contradicts the table's own design row.** `styleguide.astro` has **37**
commits; **27** carry a design, CSS, font or component scope. The design row already claims
"styleguide specimens". A blanket build row would have taken the component library away from the
sessions that have done almost all of the work in it.

**A blanket `design` row is worse**, and needs no argument: these are pages carrying prose, prices,
regulatory claims and JSON-LD.

**A clean per-file split also fails**, which is the part that took measuring. Five files —
`cpd-tas.astro`, `cpd.astro`, `accreditation.astro`, `reviews.astro`, `experts/**` — are edited by
*both* design and build sessions, because a hand-built page carries its content and its markup in one
file. There is no per-file line that separates them.

## 2. What was shipped

A three-class split, `build` as the default, two named `design` exceptions.

| Class | Owner | Files |
|---|---|---|
| Hand-built content pages and route stubs | **build** | `cpd-tas`, `cpd`, `accreditation`, `reviews`, `project-advisory`, `owner-builder-insurance`, `experts/**`, the per-hub and per-bundle stubs, `[slug]/index.astro` |
| Component-library specimen sheet | **design** | `styleguide.astro`, and any `preview.astro` |
| Hand-duplicated chrome | **design** | `404.astro` |

**The two exceptions are not my judgement — the build already groups them, in four places, as the
pages that are not customer copy.** This is the evidence the decision actually rests on:

| Location | What it says |
|---|---|
| `astro.config.mjs:108` | filters `/styleguide` and `/preview` out of the sitemap; both noindex |
| `check-meta.mjs:166` | exempts `/404` and `/styleguide` from the canonical rule, as pages that cannot rank |
| `check-claims.mjs:545` | exempts `styleguide.astro` from the reader-facing "ABE Education" rule as "an internal, noindex component library, **not customer copy**" |
| `guardrails.ts:347` | filters `(styleguide\|preview).astro` out of its published-page check |

Four independent checks, written by four different sessions, had each already drawn the same line.
The assignment follows it rather than inventing a sixth: **the one class of page here that no reader
ever sees is the class that is not build's.**

`preview.astro` does not exist today. It is assigned forward deliberately, because two of those four
filters already name it — the file is anticipated by the build, so leaving it unassigned would
recreate this exact gap the day someone adds it.

**Why the route stubs went to build, against the instinct that plumbing is skills-owned.** The
guardrails bijection assert (A2) fails the build for a hub with no stub, and its own message is
`Add src/pages/{id}.astro calling getEntry('hubs', '{id}')`. Publishing a hub or bundle *requires*
writing the stub. Any other owner puts a second session in front of every page publish, for a 15-line
file that is a copy with one id changed. The blast radius is one page and the check catches the only
way to get it wrong.

`[slug]/index.astro` is the one I went back and forth on: it is 15 lines, has **1** commit ever
(the July collections migration), and renders every course. Its blast radius is the whole `courses`
collection, which is an argument for skills. It went to build anyway, because its blast radius is
*pages* and nothing else — it holds no rule, no budget and no check. Recorded here because it is the
weakest of the three build assignments and the one most worth reversing if it ever bites.

## 3. The shared surface, named rather than papered over

A design sweep lands in hand-built pages: **five commits between 27 Jul and 14 Aug 2026**, one of
which (`f095b3b`, the CPL sweep) touched two in a single pass. Rather than carve an exemption, the
rule names it as a standing expected crossing — build owns the files, a design session's markup-only
pass is disclosed in its own review beside its measured values, and it does not need a build session.

The boundary that matters is stated positively: a design session must never change a claim, a figure,
a price or a JSON-LD value there. **Five** of those files carry a standing ⚠️ comment, and **three**
(`accreditation`, `owner-builder-insurance`, `project-advisory`) record the same hazard — no
`data-authority`, so the forbidden-claim scan never runs and nothing mechanical catches a wrong
claim. That is precisely the surface a markup sweep should not wander into.

This also retroactively legitimises `skill-reviews/design/2026-08-10-cpl-breaches-cleared.md:105`,
which disclosed touching `cpd.astro` and `cpd-tas.astro` as unassigned and did the right thing with no
rule to point at.

## 4. The demand item that was never filed — and it is this repo's oldest failure eating its own tail

Commit `9281498` closes its message with:

> Filed as a `[skills]` demand item to make the assignment explicit.

**No such item exists.** Verified four ways, not one: the commit's own `--stat` lists a single file
(`src/pages/cpd-tas.astro`); `git show 9281498 -- pipeline/` is empty; PR #140's full three-file diff
contains no matching line; and a tree-wide grep of every `- [skills]` item mentioning a page, table,
ownership or assignment returns nothing on the subject. The nearest hit
(`pipeline/owner-builder-insurance/07-verification.md:629`) is a different item about `check-claims`
not reading hand-built pages.

The consequence is not hypothetical. **This session exists because Andrey carried the gap in a
prompt.** The demand list — the mechanism whose entire job is to carry friction from the session that
finds it to the session that can fix it — did not have it. A `--stale` sweep would never have
surfaced it, because a filter over filed items cannot see one that was never filed.

**This is `kb/mistakes-log.md` row 1**, "a description of the work trusted instead of the work", and
the recursion is exact: *the commit message reporting a row-1 sighting was itself a row-1 sighting.*

Two sightings were logged this session, both from that one commit, because the build session that
found them **could not write to `kb/**`** — correctly, it is build-forbidden. Row 1 goes 5 → 7.

- **6th** — the stale `⚠ PLUMBING IS AHEAD OF THE PRODUCT` block. Verified from the diff rather than
  the commit message: both halves were stale, and it stood in the imperative ("drop one of the 13 in
  the register"). Row 1 names a second imperative-mood sighting as its own trigger, so **the trigger
  has fired**; the split is authorised (ROADMAP rule 3) and filed below rather than done here, being
  a different piece of work from this session's task.
- **7th** — the unfiled item above.

**The guard added is narrow and mechanical, because the general one already failed.** Row 1's
standing advice is "check the code beside the comment still does what it says", which cannot reach
this: a commit message claiming a filing is a claim about a *different file* than the one it changed,
so the evidence is never in the diff it sits on. The new line: `git show --stat` the commit and
confirm the artefact carrying the item is in the file list, or grep the item's own words. "Filed" is
the cheapest sentence in a commit message to write and the only one whose evidence is structurally
absent from the commit.

## 5. A number I published wrong, then corrected

I first wrote "14 of `styleguide.astro`'s 18 commits are design sessions" into CLAUDE.md. **It is 27
of 37.** The 18 came from classifying a hand-picked list of commits I had already pulled for another
purpose, not from `git log -- src/pages/styleguide.astro`; I measured the sample I had rather than the
population the claim was about.

That is the same error as 14 Aug's threshold experiment and its precision estimate — third instance,
same shape. Caught here only because I ran the per-file commit counts for the review and the totals
did not reconcile with the prose I had already written. A second wrong number went with it: "ten such
edits" for the design-sweep crossing is **five** distinct commits. Both corrected in the file before
this review was written; the conclusion did not move, only the evidence for it.

The reason it did not move is worth stating: the argument now rests on the four checks in section 2,
which are structural facts about the build, not on commit-count ratios, which are a proxy for intent.
The right fix for a shaky number was a better kind of evidence, not a more careful count.

## 6. One stale item closed, and it was the head of this session's own pattern

`skill-reviews/design/2026-08-02-siteheader-nsw-claim.md` carried "`src/data/**` is unassigned in the
session-types table... Fourth instance of the unassigned-path pattern". **`src/data/**` was assigned
to build on 4 Aug 2026** by `73b01d4`, two days after the item was filed. It stayed open for thirteen
days, and `demand-split` was still reporting it as a **4x** repeat — the highest-weighted item in
exactly the pattern this session was convened to work on.

So the counter that decides what gets built was ranking an already-answered question at the top of
the ownership pile. Not closed by my work, and closed anyway: it is the same misdirection
`2026-08-14-stale-handover-and-path-ownership.md` wrote the must-close rule for, and finding it while
working the same pattern is as strong a prompt as that rule will ever get. Verified against CLAUDE.md's
build row before striking, not against the commit message that claimed it.

`demand-split` closed items 13 likely-done, down one, with the strike carrying its date and SHA.

## 7. I disarmed my own merge gate, and the board looked fine

Added after the PR was opened. **PR #144's CI never ran — not once, on any commit.**

I ended the branch with `chore(health): record system health [skip ci]`, which is this repo's standing
convention for health-log traffic and is correct on `main` (ci.yml's own comment explains why bot
health commits carry it). As the **PR head commit** it suppressed the entire `pull_request` run:
type check, build, redirect-sync, Lighthouse, prose lint, and the `--strict` merge gates that
16 Aug made a merge requirement.

Measured before asserting, because "CI has not run yet" and "CI will never run" look the same for the
first few minutes:

| PR | Head commit carries `[skip ci]` | CI runs |
|---|---|---|
| #141, #142, #143 | no | **1 each** |
| **#144** | **yes** | **0**, including on `58babf1`, the substantive commit carrying no marker |

The second column is the one that settles it: the marker on the head commit governs the whole PR, so
a clean commit in the middle of the branch gets no run either.

**What makes this worth a numbered section rather than a footnote is how it presented.** `gh pr checks`
returned exactly one line — the Cloudflare bot's "Deployment skipped" card — and the PR reported
`mergeable=MERGEABLE state=CLEAN`. Nothing anywhere said "no gate ran". An absent gate and a passing
gate are indistinguishable on the PR page, and I had already read that board once and moved on.

Logged as `kb/mistakes-log.md` **row 8, 2nd sighting** — same consequence as the 23 Jul original by
the opposite cause. That one *described* the marker and had it obeyed; this one used it correctly and
put it in the wrong position. Row 8's lesson gains a clause: **a control token's blast radius is not
the commit that carries it.**

Fixed here by pushing a normal commit on top (no amend, no force-push — both are barred). The
convention itself needs a decision, filed below.

## Verification

| Check | Result |
|---|---|
| `system-health.mjs` (pre-flight) | 0 failing, 34 warning, 66 ok |
| `system-health.mjs --strict` (close) | **0 failing**, 34 warning, 66 ok |
| `check-claims.mjs --strict` | **0 failing**, 25 warning, 14 ok |
| `npm run build` | **28/28 guardrails passed**; links 0 failing / 5 warning; meta 0 failing / 22 warning (studio advisory) |
| Governance-doc references | resolve |
| Unrouted demand items | 0 (243 tagged items all route) |
| Files changed | `CLAUDE.md`, `kb/mistakes-log.md`, this review — all skills-owned, no crossing |
| mistakes-log table integrity | row 1 count 5 → 7, date → 2026-08-17, all five cells intact, no stray pipes |

No crossing to disclose. Every path written this session is on the skills row.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- [skills] `kb/mistakes-log.md` row 1 — **TRIGGER MET, second sighting.** The imperative-mood hazard
  now has two sightings (16 Aug, `cpd-building-tas.mdx`'s "Re-run Stage 7, THEN remove this line";
  16 Aug, `cpd-tas.astro`'s "drop one of the 13 in the register"), and row 1 explicitly names the
  second as its trigger for splitting it out. Both are the same distinct failure: a comment that
  *authorises an action* on a condition held in a file it never names, where the row's own guard
  ("check the code beside it") does not reach. Split it into its own row with the containment fix as
  the lesson — put the authoritative condition somewhere a check reads.
- [skills] `scripts/` — nothing verifies that a commit message claiming to have **filed a demand
  item** actually filed one. This session's section 4 is the first sighting, and it cost the repo the
  `src/pages` assignment for a day until a human noticed. Mechanically cheap: on a commit whose
  message matches `/filed (it )?as a? ?\[(skills|design|facts|build)\]/i`, assert that the same
  commit touches a file containing a matching `- [tag]` line. One sighting, so this records the
  problem; do not build it before a second (ROADMAP rule 3).
- [skills] `.github/workflows/ci.yml` + the `chore(health)` convention — **SECOND SIGHTING of a
  `[skip ci]` marker disabling a whole PR's gate** (row 8; the first was 23 Jul). A health-log commit
  is the natural last commit of any session, carries `[skip ci]` by standing convention, and as a PR
  head silently disarms every merge gate. Trigger met, so a fix is authorised — but it is a
  convention change touching every session, so it wants a decision rather than a unilateral edit.
  Two candidates: fold the health-log append into the substantive commit (simplest, no tooling), or
  narrow the marker to `chore(health)` commits pushed **directly to main** and drop it on branches.
  Whichever is chosen, add the detection half: nothing today distinguishes "gate passed" from "gate
  never ran" on the PR page.
- [skills] `gh pr checks` reporting only a deploy card is not evidence of health, and no check in
  this repo says so. Worth a line in the ship/PR path: confirm the gate **ran**
  (`gh run list --commit <head>`) before reading a board as green. Same family as ROADMAP's "a check
  that runs after the merge is a report" — this is the degenerate case, a check that runs never.
- [build] `src/pages/[slug]/index.astro` is the weakest of the three build assignments (section 2):
  15 lines, one commit ever, but it renders every course page. FIRST FILING, and no action is asked
  for. Recorded only so that a future session which finds build was the wrong owner for it can move
  it to skills by citing this note, rather than re-deriving the whole question. (Deliberately worded
  to avoid declaring a repeat: an earlier draft said "that is the second sighting" about a
  hypothetical future event, and `demand-split` correctly read the phrase as a count and promoted the
  item to 2x. A conditional must not be written in the vocabulary the tool counts.)
