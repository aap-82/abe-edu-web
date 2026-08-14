---
date: 2026-08-03
skill: facts-session
subject: tas-git-delivery
verdict: Amber
graded_by: self
---

# Facts review — TAS General Construction Induction Training delivery mode, 2026-08-03

## Verdict

**Amber.** The item was closed, but the answer is not a clean confirmation of the page it backs.
`/white-card-tas` is **live and indexable** and states the online option is "open to Tasmanian
residents only." Neither of the two sources read today — WorkSafe Tasmania's own guidance, and the
Work Health and Safety Regulations 2022 (Tas) itself — supports that wording. There is also good news:
unlike NSW, nothing found **prohibits** self-paced online delivery in Tasmania either. The page is not
positively wrong the way `/white-card-nsw` was; it is asserting a rule that does not appear to exist,
sourced instead to something that is very likely true for a different reason (Blue Dog's own RTO
scope), which this session did not check.

This was item 2 on `handover/HANDOVER-todo-2026-08-02.md`'s "do first" list — the highest-risk
unchecked delivery row, because it backs a live page on industry-guide sourcing alone.

---

## 1. What was asked, and the two sources read

**Handover source note.** Andrey pointed this session at
`courses info/white card tas/Work Health and Safety Regulations 2022.pdf`, already in the repo. It
turned out to be the wrong instrument: it is the **Work Health and Safety (Transitional) Regulations
2022** (SR 2022/110), which contains one clause about GCIT — a saving provision for people who already
held a pre-2012 induction card — and explicitly defers the substantive rule to "Part 6.5 of the new
regulations," i.e. a separate instrument. That is recorded here so the next session does not treat the
same file as authoritative for Part 6.5. The correct instrument is **SR 2022/109**, the main **Work
Health and Safety Regulations 2022 (Tas)**.

**Source 1 — WorkSafe Tasmania's public guidance**, read in a browser 3 Aug 2026:
[White cards (construction induction)](https://worksafe.tas.gov.au/topics/licensing-permits-and-registration/white-cards-construction-induction),
last updated 15 April 2025. Its entire delivery-mode content, quoted in full: "This training must be
delivered by a Registered Training Organisation and must be completed in Tasmania." Nothing else on
the page touches delivery mode — no "online," "self-paced," "face-to-face," "virtual" or "classroom."

**Source 2 — the primary Regulation**, read via the Tasmanian Legislation Online consolidated text
(`legislation.tas.gov.au/view/html/inforce/current/sr-2022-109`), version current from 1 July 2025,
3 Aug 2026. Reg 5 (Interpretation): "general construction induction training means training **delivered
in Australia** by an RTO for the specified VET course for general construction induction training."
Part 6.5 (regs 316–327) read in full: Division 1 (316–318, the PCBU's duty to provide/ensure training
and recognise interstate cards), Division 2 (319–325, the card itself — issue, content, replacement,
refusal, cancellation, and reg 325, which lets the regulator delegate **card-issuing** authority to an
RTO). **No regulation in the instrument imposes, permits or discusses a delivery-mode condition.**

**What was searched for and not found.** A Tasmania-specific "Conditions of Agreement" document — the
shape NSW and QLD each publish under an equivalent enabling regulation — was searched for (Google, plus
a `site:worksafe.tas.gov.au` search for RTO-facing pages) and not located. Reg 325 was checked
specifically as the candidate enabling clause (its QLD counterpart, s.325 of the WHS Regulation 2011,
is literally the citation for QLD's Conditions of Agreement) and it only concerns delegating card
issuance, not training delivery. Absence from a search is not proof of non-existence — if such a
document exists, it was not publicly findable today.

**Access notes, for the next session.** `legislation.tas.gov.au`'s `/view/whole/html/...` route
(single-page consolidated text) failed to load twice in this session's browser tool for unclear reasons;
`/view/html/...` (contents page, then per-regulation anchors `#GS<n>@EN`) worked. `classic.austlii.edu.au`
and its IP mirror both return "Access denied for AI crawlers" — do not rely on AustLII from an agent
session. `worksafe.tas.gov.au` 403s a plain `WebFetch`; it renders fine in the browser tool.

## 2. The conclusion, and its limits

**Tasmania's WHS Regulations do not restrict how GCIT is delivered — no prohibition, like NSW's, and no
conditional permission, like QLD's.** Self-paced online is not banned by anything found. It is also not
affirmatively authorised as a TAS-specific concession the way the industry guides implied; it is simply
outside what the instrument governs.

**This does not confirm the page's "Tasmanian residents only" claim**, for two independent reasons, each
sufficient on its own:

1. The regulator's own words are that training must be **completed in Tasmania** — a location condition
   on the training, not a residency test on the candidate. This is the same wording error the WA row
   carried until it was corrected 1 Aug 2026 (§2B: "located in," not "resident").
2. The Regulation's own definition requires training **delivered in Australia** — a national test, not
   a Tasmania-specific one at all.

**What I did not check, and why it matters more than the Regulation does here.** Neither source read
today says who may enrol in a self-paced course and complete it from outside Tasmania. The actual
commercial gate on `/white-card-tas` almost certainly comes from **Blue Dog Training's own RTO scope of
registration or delivery-location conditions with ASQA** — a training.gov.au question, not a WHS-
regulator question, and outside this register's remit (`online-delivery-policy-by-state.md`'s sources
are the state WHS regulators). I did not check training.gov.au for this. Confirming Blue Dog's actual
delivery-location scope for CPCWHS1001 is a distinct, separate verification and should happen before any
rewording of the page's eligibility claim, not instead of it.

Recorded as `kb/register/online-delivery-policy-by-state.md` **§2D**, with both sources quoted and
dated. The state matrix row, the top-of-file provenance banner, the §1 core-rule statement, §3's
per-page guidance and the §4 source tables were all updated to match — see the diff.

## 3. What this reverses, and where the old position still lives

This is a partial reversal: not "the claim is false" (as NSW was), but "the claim is unsourced, and a
different, unchecked fact is the more likely real explanation." Per CLAUDE.md rule 11(b), every place
still carrying the old "Tasmanian residents" framing, found by grep this session:

- **`src/content/courses/white-card-tas.mdx`** — seven spots: `courseDescription` (line 25), a hero
  tick (line 62), the `glance` FactGrid note (line 90), `disclaimersHtml` (line 108), the "At a glance"
  `AnswerCapsule` (line 128), the "Accepted and online" `AnswerCapsule` and `CanCant` list (lines
  144–150), and the section's `VerifiedSources` citation itself (line 154), which currently reads
  "Self-paced online delivery is permitted for Tasmanian residents" sourced to the same WorkSafe
  Tasmania page this session read and found does not say that.
- **`src/data/faqs-white-card-tas.ts:27`** — an FAQ answer stating "The self-paced online course is for
  Tasmanian residents."
- **`kb/rules/authority-model.md`** — two spots, both skills-owned and outside this session's scope:
  line ~174 ("Self-paced fully online remains restricted to WA and TAS residents; that part is
  unchanged and separately sourced" — it is not separately sourced, on today's reading) and the
  prohibited-claims table entry at line ~415 ("Self-paced fully online White Card is restricted to WA
  and TAS residents").

I did not edit any of these — `src/content/**` and `src/data/**` are build-owned, and `kb/rules/**` is
skills-owned. Filed below.

## 3a. Session close — every item with a disposition

| Item | Disposition |
|---|---|
| Pre-flight `system-health` | ✅ run at open (0 failing, 14 warn) and again after the register edit (0 failing, 14 warn, 44 ok — unchanged) |
| Register writes | ✅ `online-delivery-policy-by-state.md` only; both sources read at source **in this session** (rule 4) |
| Wrong-instrument finding | ✅ recorded in §1 above so it is not silently rediscovered |
| This review filed | ✅ `skill-reviews/facts/` |
| New demand items routed | not yet regenerated this session — see note below |
| Session type held | ✅ only `kb/register/**` + this review. No `src/`, no `kb/rules/`, no `handover/**` |
| Shipped | not shipped — left on the working tree pending Andrey's go-ahead to commit/branch/PR |

**Demand-split not re-run after this review.** The prioritised to-do list
(`handover/HANDOVER-todo-2026-08-02.md`) is a hand-written note, skills-owned; this session cannot
strike its item 2 or regenerate `reports/handover-facts.md`. Both are flagged for the next skills or
build touch.

## 4. What I did not do

- **Did not touch `src/content/courses/white-card-tas.mdx` or `src/data/faqs-white-card-tas.ts`.**
  Build-owned; filed below.
- **Did not touch `kb/rules/authority-model.md`.** Skills-owned; filed below.
- **Did not check Blue Dog Training's RTO scope/delivery-location conditions on training.gov.au.** This
  is the missing piece that would actually explain (or contradict) the residency framing. Not a WHS
  regulator source, so outside a "read the regulator" facts task as scoped, but it is the next
  logical read before the page copy changes.
- **Did not commit or open a branch/PR.** Register and review file are staged in the working tree only.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- ~~[build] **`white-card-tas.mdx` states a "Tasmanian residents only" self-paced eligibility test that
  is unsourced to WorkSafe Tasmania.** Seven locations (lines 25, 62, 90, 108, 128, 144–150, 154) and
  the FAQ at `faqs-white-card-tas.ts:27`. The regulator's own wording is "completed in Tasmania" (a
  location condition, not residency), and the WHS Regulations 2022 (Tas) impose no delivery-mode
  restriction at all — see `kb/register/online-delivery-policy-by-state.md` §2D. Do not simply
  substitute "located in Tasmania" for "resident" the way the WA page did (§2B) until Blue Dog's actual
  RTO delivery-location scope is checked — the true gate may be narrower or broader than either wording.~~ closed 14 Aug 2026 — verified absent: no "residents only" string remains anywhere in `src/content/` or `src/data/`. Fixed by "fix(content): remove unsourced TAS residency claim, 11 locations".
- [facts] **Check Blue Dog Training's RTO scope of registration / delivery-location conditions for
  CPCWHS1001 on training.gov.au.** This is very likely the real basis for whatever eligibility test
  `/white-card-tas` should state, since neither WorkSafe Tasmania nor the WHS Regulations impose one.
  Read before the build item above is actioned, not instead of it.
- ~~[skills] **`kb/rules/authority-model.md` states the old TAS residency position as settled, in two
  places** (~line 174: "Self-paced fully online remains restricted to WA and TAS residents; that part
  is unchanged and separately sourced" — it is not separately sourced on today's reading; and the
  prohibited-claims table ~line 415). Reconcile against `online-delivery-policy-by-state.md` §2D, on
  the same pattern as the NSW reconciliation in PR #112.~~ closed 14 Aug 2026 — verified absent: no "Tasmanian resident" or "TAS resident" string remains in `kb/rules/authority-model.md`. Fixed by "chore(skills): correct authority-model.md's stale TAS residency wording".
- [facts] **ACT remains the last unchecked delivery row.** Confirmed with the AlertForce partner
  (26 May 2026), never with WorkSafe ACT. Gates the unbuilt `/white-card-act` (W3-5).
- [skills] **`legislation.tas.gov.au`'s `/view/whole/html/...` route is unreliable from this session's
  browser tool** (failed twice, no clear error); `/view/html/...` plus per-regulation `#GS<n>@EN`
  anchors works. Worth a line in whatever reference future facts sessions consult for TAS legislation
  reads, so the next session does not lose the same time rediscovering it.
