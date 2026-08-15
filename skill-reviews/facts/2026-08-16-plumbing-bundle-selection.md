# Facts review — the twelve courses sold in the TAS Plumber CPD bundle

**Date:** 16 August 2026
**Session type:** facts (with disclosed crossings into `src/content/**`, `pipeline/**`, `ROADMAP.md`)
**Graded by:** self — no fresh-subagent facts grader exists
**Outcome:** the `/cpd-plumbing-tas` member-table blocker is closed. The page stays `noindex` for its
remaining, unrelated blocker (no checkout id).

---

## The reading, not just the figure

Rule 11(a): record the instrument opened, the clause cited, the date, and what was searched for and
not found.

**Instrument opened.** The operational CPD register, Superhuman Docs `TAS CPD Courses`,
`superhuman://docs/wXRzQ7oMrm`, table `grid-_kWHYm22cU`. Read in this session, 16 Aug 2026, both
schema (`table_columns_read`, with formats) and rows (`table_rows_read`, filtered on
`Bundle.Contains("TAS Plumber CPD - 12 Points (2026)")`).

**What I searched for and did NOT find.** A field distinguishing *sold in the bundle* from *eligible
for it*. There is none, and that absence is the finding: the table has 18 columns and the only
membership record is the `Bundle` multi-select. So the "selected twelve" existed nowhere — not in
the repo, not at source. It could not be derived, only decided.

**What the reading showed.** 14 rows tagged to the plumber bundle, one `Expired`
(*Compliance, Solutions and Driving Innovation For Wet Area Waterproofing*), leaving **13 live at 1
point each** — in a bundle whose own name says *12 Points*. The source contradicted itself; the repo
was faithfully rendering an inconsistency it inherited, not carrying a defect of its own.

**The decision.** Put to Andrey with all 13 listed. He answered 16 Aug 2026: **TAS CPD Solar Energy**
is out, the other twelve are the bundle. This is a commercial fact, his to decide, and it was asked
rather than inferred — mistakes-log row 6 is about resolving exactly this kind of ambiguity by
inference. I did flag *AS/NZS 3000:2018 Wiring Rules* as the structurally odd candidate (an
electrical standard tagged to all three bundles) and explicitly did not act on it. He chose
differently, which is why it was a question.

## What was changed, and where

`kb/register/cpd/tas-courses.json` is a **generated projection** and `check-claims` verifies its
checksum, so a hand-edit forks the register. The change was therefore made at source and synced:

1. Source doc row `i-dfk3wVBSIG` (*TAS CPD Solar Energy*): `Bundle` set to Builder + Electrician,
   removing Plumber. **Both other tags kept deliberately** — it is sold in both.
2. `npm run sync:cpd` (dry-run first), regenerating the register. Diff: one `bundles` array, the
   `syncedAt` date, and the checksum. Nothing else moved.

## Measured

| | before | after |
|---|---|---|
| `/cpd-plumbing-tas` `bcard` members | 13 | **12** |
| `system-health` CPD plumbing | 12 pts / live pool 13 (of 14 tagged) | **12 pts / live pool 12 (of 13 tagged)** |
| `/cpd-building-tas` members | 12 | 12 |
| `/cpd-electrical-tas` members | 11 | 11 |
| `system-health` FAIL | 0 | 0 |

The siblings were checked explicitly because Solar Energy is tagged to all three bundles and both
were already published or point-committed.

## The copy did not change, and that is the interesting part

Every "thirteen" on the page still holds. **Untagging a bundle does not un-approve a course**: Solar
Energy still carries the Plumbing *category*, so thirteen live courses are still CBOS-approved for
plumbers. Counted from the regenerated register: 13 live Plumbing-category rows. So
*"Twelve of them make up this bundle, selected from the thirteen approved for Tasmanian plumbers"*
now describes exactly what the page renders, where before it described what the page claimed while
the table said otherwise. Nothing was reworded to make the numbers agree.

## Rule 11(b) — this reverses an earlier position; here is what it contradicts

`handover/HANDOVER-facts-cpd-tas.md` records a **different** course as the pruned one:

- **line 178** — *"Plumbing pruned to 12. Removed the plumbing-bundle tag from AS/NZS 3000:2018
  Wiring Rules"*
- **line 217** — *"the plumbing prune is already applied in the Coda source (Wiring Rules row…)"*
- **line 252** — *"The Coda prune of Wiring Rules is LEFT IN PLACE for now (Andrey's call: 'leave
  as-is' — he'll decide…)"*

**Read at source on 16 Aug 2026, that prune is not in effect**: *AS/NZS 3000:2018 Wiring Rules*
carries the plumber bundle tag, and still does after this session's change. I cannot establish from
the doc when or why it was restored — the table keeps no history I read — so this review states the
observed state and does not speculate about the gap.

Andrey's 16 Aug decision is the current one and it supersedes the 25 Jul provisional call: **Solar
Energy out, Wiring Rules in.** He was shown all thirteen, including Wiring Rules, when he chose.

Those three lines are the places still carrying the old position. They are `skills`-owned and a
facts session may not fix them, so they are listed here for whoever does — which is what 11(b) is
for. The 25 Jul file also already carries its own "Model correction" section withdrawing the prune
framing, so the surrounding narrative is not simply wrong; the specific course named is.

## The finding worth more than the fix

Both `07-verification.md` and the page comment predicted this needed a **register/schema change** —
a `bundleMembers` list or a per-course `inBundle` flag. It did not. `Category` and `Bundle` were
already separate columns; one row was tagged to a bundle it is not sold in, and the fix was one cell.
Building the predicted mechanism would have added a second way to express something the model
already had, and it would have looked justified the whole time.

**A missing-mechanism diagnosis should be checked against the source schema before it is built,
because a data error and a model gap are indistinguishable from inside a generated projection.**
The projection is exactly where everyone was looking: `kb/register/cpd/tas-courses.json` genuinely
cannot express the distinction, and the conclusion "so the model lacks it" followed naturally and
was wrong.

## Demand list

Tag every item: [skills] | [design] | [facts] | [build]

- [skills] `handover/HANDOVER-facts-cpd-tas.md` lines 178, 217 and 252 name *AS/NZS 3000:2018 Wiring
  Rules* as the pruned plumbing course. Read at source 16 Aug 2026 that is not the case, and Andrey's
  16 Aug decision names *TAS CPD Solar Energy* instead. Correct all three, and state that the
  restoration of the Wiring Rules tag is unexplained rather than inventing a reason for it.
- [skills] `handover/HANDOVER-cpd-bundles.md` lines 19-29 and `handover/HANDOVER-2026-08-12-session-close.md`
  items 1 and 158 still carry this as the ranked-first open blocker needing a `bundleMembers` list.
  Close them, and record that the predicted mechanism was not what fixed it.
- [build] `/cpd-plumbing-tas` and `/cpd-electrical-tas` both still carry `TBC-` placeholder
  `buyUrl`s. This is the only remaining blocker on either page and it needs the 2026 checkout ids
  from Andrey.
- [skills] Consider whether `sync-cpd-register.mjs` should warn when a bundle's live tagged count
  disagrees with the point count in its own bundle name. This defect sat visible in the source for
  weeks as "12 Points" against 13 live tagged rows, and the check that would have caught it is a
  string parse of a name the tool already reads.
