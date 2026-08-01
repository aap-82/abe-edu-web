---
date: 2026-08-01
skill: facts-session
subject: nsw-git-conditions-and-fees
verdict: Amber
graded_by: self
---

# Facts review — NSW GIT Specific Conditions, WA corrections, fee re-verification, 2026-08-01

## Verdict

**Amber, and the amber is about `/white-card-nsw`, not about this session's work.**

The priority item was obtained. The answer went **against** the page that was waiting on it: SafeWork
NSW's Specific Conditions for General Construction Induction Training permit face-to-face delivery
only and expressly prohibit distance and on-line learning. `/white-card-nsw` is built end to end on
"Live online" delivery, is **merged to `main`**, and is **not** in `astro.config.mjs`'s `NOINDEX`
array. It is not reachable on the production domain today (both apex and www return **404** — the
real domain still serves the legacy site), so no reader has seen it and nothing needs an emergency
rollback. But it would publish as written at cutover, and it must not.

Twelve register facts were corrected or newly sourced across six files. Nine demand items closed,
three reconciled as duplicates or nulls, and **the facts handover went from 14 open to 2**.

---

## 1. The priority item: the Specific Conditions exist, and they say no

**The premise that made this hard was wrong.** The blocker was framed as "no current Specific
Conditions document was located". There is one. The October 2022 PDF **is** the Specific Conditions
for GIT — it is what the General Conditions mean by that term for this authorisation regime, and it
is still the document SafeWork NSW links from its live [General construction induction
RTOs](https://www.safework.nsw.gov.au/licences-and-registrations/registered-training-organisations/construction-induction-rtos)
page. It was read, not inferred: the PDF is digitally signed and defeats naive text extraction, which
is most likely why two prior runs bounced off it.

**Clause 1(q):** "Ensure all training delivered in NSW is delivered by a nominated trainer using
face-to-face delivery techniques. **Distance education and on-line learning are not permitted in NSW
for the delivery of GIT.**"

**Why this settles it, rather than being one document against another.** The General Conditions
§4.3.1 say Connected delivery "can be used **if provided for in the relevant Specific Conditions**".
That makes the virtual classroom a permission the Specific Conditions must *grant*. They do not grant
it. The General Conditions also define Face-to-face as delivery where trainer and learner are
"**physically located together**", and define Connected delivery as a **separate** mode — so
"face-to-face" in clause 1(q) cannot be read as quietly including video.

**The page's clearing argument, checked and failed.** `white-card-nsw.mdx` lines 5–14 record why the
blocker was cleared on 1 Aug. Its load-bearing sentence is *"SafeWork NSW's live general conditions
define connected delivery and permit it"*. They define it and permit it **conditionally**; the
conditional clause is the whole of the rule and it was dropped. The two supporting facts do not carry
the claim either: Upskill's SafeWork registration authorises *delivery*, and the conditions govern
*how*; and a provider advertising Zoom is evidence of what the provider advertises, not of what the
regulator permits.

**What I did not resolve, stated plainly.** The GIT conditions are framed under the **WHS Regulation
2017** while the General Conditions now cite the **2025** Regulation, so the document may be overdue
for reissue — but a stale document is not a permissive one, and nothing published grants what it
withholds. An **RTO-specific** exemption remains conceivable (the General Conditions reference
"approvals from the Regulator for all exemptions to these conditions"), and I searched the GIT
conditions for one: the "variation" clauses concern session notifications and "special arrangements"
concern evidence of identity only. **Neither of the two routes that would re-permit the claim can be
verified from public sources.** Both need a human: SafeWork NSW on 13 10 50 / `tacs@safework.nsw.gov.au`,
or Upskill directly. I did not contact either — sending on Andrey's behalf is his call, not mine.

Recorded as `online-delivery-policy-by-state.md` **§2A**, with both documents quoted and dated.

## 2. Everything else that changed

| # | Fact | Was | Now | Source read 1 Aug 2026 |
|---|---|---|---|---|
| 1 | NSW GIT delivery mode | virtual classroom "accepted as face-to-face" | **face-to-face only** | GIT conditions cl. 1(q) |
| 2 | NSW minimum duration | "min. 6-hour course", **no source** | six hours, excluding breaks | GIT conditions cl. 14 + 16 |
| 3 | NSW replacement card fee | $43 / $36 online (22 Jul) | **unchanged**, re-read | SafeWork NSW licence fees, "2026-27" |
| 4 | WA White Card eligibility | "WA **residents**" | "**located in WA** at the time of the assessment" | WorkSafe WA, candidate-evidence page |
| 5 | WA owner-builder knowledge | one blanket rule, card always required | **four pathways**; card **not** required on pathway 2; five-year bound on pathway 4 | Form 75, page 5 of 10 |
| 6 | WA issuing department | Building and Energy / DEMIRS | **LGIRS**; old-name forms refused since 1 Jun 2026 | wa.gov.au owner-builder approval |
| 7 | GSC / LearnWorlds export paths | `data/GSC/`, `data/LearnWorlds/` | `business data/...` | repo layout |
| 8 | Gov citation link targets | `target="_blank"` prescribed | `DESIGN.md` §7 is the authority; `.sr-only` cue mandatory | DESIGN.md §7 |

**The fee item carried a wrong premise, worth correcting.** It asked to "re-read and record" the fee
as though it were missing. It was already in `state-fees-register.md`, verified 22 Jul. This was a
re-verification. I recorded the new as-at date and the CPI cadence the page states rather than
re-adding a figure that was never absent.

**Two corrections landed against the reviews that filed them, not just against the register.** The
system audit undercounted the stale paths by one (`data/LearnWorlds/` moved in the same 28 Jul move).
And the WA "sufficient knowledge" summary is wrong in a way the demand item did not predict: it is not
merely vague, it **imposes a white card on a pathway that does not require one**.

## 3. Provenance, which is the actual lesson

`online-delivery-policy-by-state.md` §4 sourced its entire delivery matrix to "2026 RTO/industry
guides". One row has now been checked against a regulator. **That row was wrong, and wrong in the
permissive direction** — it claimed a delivery mode the regulator prohibits, on a compliance-critical
file whose own header calls it compliance-critical.

That is not a one-row defect, it is a sample of one from a population of seven. §4 now separates
primary sources from secondary, dates each primary read, and flags the unchecked rows UNVERIFIED for
publishing purposes. **The QLD row is the next one to check and it is the urgent one**, because it
makes the same "real-time virtual classroom is accepted" claim that just failed for NSW, and unlike
NSW it is on a page that is already live.

## 3a. Session close — every item with a disposition

| Item | Disposition |
|---|---|
| Pre-flight `system-health` | ✅ run at open (0 failing) and again before merge (0 failing, 14 warn, 43 ok) |
| Register writes | ✅ 7 files, every figure read at source **in this session** (rule 4) |
| Demand items closed | ✅ 9 struck in the reviews that filed them, same session as the fix |
| List reconciliation | ✅ 2 duplicate pairs struck, 1 null reworded — facts handover **14 → 2** |
| This review filed | ✅ `skill-reviews/facts/` (routes via `demand-split`; excluded from build-run scans) |
| New demand items routed | ✅ 9 filed, `unrouted: 0` across 158 tagged items |
| Derived handover regenerated | ✅ `demand-split.mjs --write --strict`, exit 0 |
| Build / check / claims | ✅ guardrails 21/21, 20 pages; 0 errors 0 warnings; claims 0 failing |
| **Memory written** | ✅ `feedback_conditional_permission.md` **created**; `project_nsw_rto_scope_mismatch.md` updated from "contested" to "resolved on the documents"; `MEMORY.md` indexed both |
| Shipped | ✅ **PR #109**, `facts/nsw-git-conditions-and-fees-v2 → main`, 15 files +349/−62, MERGEABLE. **Not merged at time of writing** |
| Session type held | ✅ only `kb/register/**` + review records + the health-log artefact. No `src/`, no `kb/rules/`, no `.claude/skills/` |

**One process defect in this session, recorded rather than hidden.** The first branch was cut from
`design/type-floor-and-tap-targets` — whatever happened to be checked out at open — not from `main`.
A PR from it would have carried **three unrelated design commits and 11 `src/` files** into trunk, and
the "no `src/` changes" claim made to Andrey was true of the commit but false of the branch against
`main`, which is what a PR actually merges. Caught by diffing `origin/main...HEAD` before opening the
PR rather than trusting the commit. Fixed by cherry-picking the single commit onto a branch cut from
`origin/main`; nothing rewritten, nothing force-pushed. **The lesson is that a session's branch base is
part of its pre-flight**, and no gate in this repo checks it. Filed as `[skills]` below.

## 4. What I did not do

- **Did not touch `kb/rules/authority-model.md`** (lines 141, 371, 390 still state the old NSW
  position as canonical) or the two skill reference files that repeat it. Skills-owned; filed below.
- **Did not touch `white-card-nsw.mdx`.** Build-owned; filed below.
- **Did not contact SafeWork NSW or Upskill.** Needs Andrey.
- **Did not record CPCWHS1001 performance criteria** (still open, low priority, needs a
  `training.gov.au` browser read).

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- ~~[build] **`/white-card-nsw` must not publish as written.**~~ **CLOSED 2 Aug 2026 — Andrey recorded the mode as an exemption (`online-delivery-policy-by-state.md` §2A-1). The page publishes; the copy no longer credits the regulator with the mode. Do not reopen.** Original finding kept below.
  Title, description, hero, `FactGrid`
  "Delivery: Live online", the `#online` section and `disclaimersHtml` all assert a live-online
  delivery that SafeWork NSW's GIT conditions cl. 1(q) prohibit. The page is merged to `main` and is
  **not** in `astro.config.mjs`'s `NOINDEX`, so cutover would publish it. It returns 404 on the
  production domain today, so this is a pre-cutover fix, not an incident. **Blocked on a human
  decision** (see the two `[facts]` items below) — do not rewrite the copy to "in person" until it is
  known what Upskill actually delivers.
- ~~[build] **Delete or rewrite the DELIVERY MODE comment at `white-card-nsw.mdx` lines 5–14.**~~ **CLOSED 2 Aug 2026 — rewritten to point at §2A-1 and to state the no-source-link rule.** Original finding kept below.
  It
  instructs future sessions "Do not 'correct' this page back to face-to-face on the strength of that
  Oct 2022 PDF", on a reading of General Conditions §4.3.1 that drops the conditional clause. Left
  standing, it will defeat the next session that finds what this one found. This is the highest-value
  single line to change in the repo right now.
- ~~[facts] **Ask Andrey to obtain, in writing, either (a) SafeWork NSW's confirmation or (b) Upskill's approval for video delivery.**~~ **CLOSED 2 Aug 2026 — not being pursued. Andrey recorded the mode as an exemption instead (§2A-1); written confirmation is not a precondition for the page. Do not re-file this.** Original finding kept below.
  Either (a) SafeWork NSW's confirmation that Connected
  delivery is provided for in the current Specific Conditions for GIT, or (b) Upskill Institute's
  SafeWork NSW approval or exemption for video delivery.** 13 10 50 / `tacs@safework.nsw.gov.au`.
  Either one unblocks the page; neither is obtainable without a human.
- ~~[facts] **Confirm with Upskill Institute what delivery mode they actually run in NSW.**~~ **CLOSED 2 Aug 2026 — answered: trainer-led virtual classroom, confirmed by Andrey and recorded as an exemption (§2A-1). Settled, not a copy question and not an open action.** Original finding kept below.
  If it is by
  video, that is a conflict between the partner's delivery and the regulator's published conditions,
  and it is a commercial and compliance question, not a copy decision.
- [facts] **Verify the QLD row of `online-delivery-policy-by-state.md` against WHSQ.** Same
  virtual-classroom claim that failed for NSW, same industry-guide provenance, and it is already on a
  live page. Then work through TAS, ACT, WA and the out-of-scope rows.
- ~~[skills] **`kb/rules/authority-model.md` lines 141, 371 and 390 state the NSW virtual-classroom position as canonical.**~~ **CLOSED 2 Aug 2026 — all three reconciled to §2A-1: mode stated as the RTO's, no source link, and a new prohibited-claims row banning regulator attribution.** Original finding kept below.
  They stated that position as canonical. Reconcile against `online-delivery-policy-by-state.md` §2A.
  Line 371 is in the prohibited-claims table, so it currently teaches the wrong replacement wording.
- [skills] **`.claude/skills/abe-course-page-astro/references/seo/badge-inventory.md:141` carries the
  same NSW delivery claim**, and `references/seo/changelog.md` (lines 326, 337) records it as settled.
  The badge file is the one that will re-teach it to the next build.
- [skills] **Add a rule 11 to CLAUDE.md: facts sessions close with a review**, on the same terms as
  rules 9 and 10. This review is filed at `skill-reviews/facts/` on that assumption —
  `demand-split.mjs` recurses so it routes correctly, and the flat build-run scans in
  `review-trends.mjs` and `system-health` correctly ignore it. The convention now exists in the tree
  without existing in the rules, which is the gap rule 10 was written to close for skills sessions.
  Until it lands, a facts session grading no page has no stated obligation to record what it found.
- [skills] **A session's branch base is unchecked, and it nearly put 11 unrelated `src/` files into a
  facts PR.** This session's branch was cut from whatever was checked out at open
  (`design/type-floor-and-tap-targets`), so `origin/main...HEAD` carried three design commits it had
  no business shipping. `system-health` checks a great deal and does not check this. Cheapest fix: a
  pre-flight line that reports `git merge-base --is-ancestor origin/main HEAD` and names any commit on
  the branch that the session did not write. Second-order point for the session-types table: a session
  type constrains which **paths** may be written but says nothing about which **base** they land on,
  and the second is just as capable of shipping the wrong thing.
- [skills] **`isPlaceholder`'s `^none\b[\s.-]*$` is still too narrow.** A second null line
  (`- [facts] none - all figures carried verbatim...`) was found four lines below the one fixed on
  30 Jul and had been routing as a real facts item ever since. Broadening the match is already filed;
  this is its second occurrence, which is the trigger.
