---
date: 2026-08-03
skill: facts-session
subject: act-delivery-and-alertforce-scope
verdict: Green
graded_by: self
---

# Facts review — ACT GCIT delivery mode, and AlertForce's actual scope, 2026-08-03

## Verdict

**Green.** Item 3 asked for two reads in the same session: the ACT delivery row at WorkSafe ACT, and
the UNVERIFIED AlertForce asbestos/silica course codes at `training.gov.au`. Both are done. Unlike the
TAS session earlier today, **the ACT delivery finding required no correction to ABE's existing wording**
— it was already attributing the mode to the RTO, not the regulator. The AlertForce scope check found a
real, previously unrecorded gap: the "silica" product is not what CLAUDE.md names, and is not national.

---

## 1. ACT delivery mode — same shape as TAS, no page-copy fix needed

Read WorkSafe ACT's
[White cards (Construction induction)](https://www.worksafe.act.gov.au/licensing-and-registration/white-cards-construction-induction)
and Access Canberra's
[General Construction Induction Card](https://www.accesscanberra.act.gov.au/business-and-work/building-and-construction/general-construction-induction-card)
pages, then the full *Work Health and Safety Regulation 2011* (ACT) PDF (R47, effective 29 Nov 2025,
~38,000 lines extracted via `pdftotext`). Both consumer pages quote WHS Regulation ss317/318 and are
silent on delivery mode. The Regulation's own definition of general construction induction training is
word-for-word identical to Tasmania's ("training delivered in Australia by an RTO..."), and a full-text
search for every delivery-mode term used elsewhere in this register (self-paced, distance education,
on-line learning, face-to-face, connected delivery, virtual classroom) returned **zero matches** in the
entire instrument.

**Conclusion: ACT's WHS Regulation does not restrict GCIT delivery mode, exactly like TAS (§2D).**
AlertForce's face-to-face classroom delivery is the RTO's own arrangement.

**Why this needed no page fix, unlike TAS.** `online-delivery-policy-by-state.md`'s ACT row and
`kb/rules/authority-model.md` already say AlertForce delivers "face-to-face in a classroom," attributing
the mode to the RTO, not the regulator — the correct pattern. The one place carrying an inaccurate
national-rule parenthetical was `kb/register/legislation-references-act.md:19` ("self-paced online
delivery is restricted to WA and TAS residents"), which is **in my own scope** (`kb/register/**`), so I
corrected it directly rather than filing it as a demand item. No `/white-card-act` page exists yet
(W3-5 is unbuilt), so there was no live copy to fix on that side either.

Recorded as `online-delivery-policy-by-state.md` **§2E**.

## 2. AlertForce's actual scope — one confirmation, one real gap

Read `training.gov.au/Organisation/Details/91826` in a browser (required — it is a client-rendered SPA
and `WebFetch` cannot read it, confirmed again this session; the SPA's own search filter did not
visibly apply when tried, so the "Courses" tab was read as its complete four-row list rather than
filtered).

**Asbestos Awareness confirmed as claimed:** code **11084NAT**, delivery notification **NATIONAL**,
current, ASQA-recognised, currency 19 Aug 2022 – 18 Aug 2027.

**"Silica Awareness" does not exist as a named product, and its actual equivalent is not national.**
The only silica-related course on AlertForce's scope is **10830NAT, "Course in Crystalline Silica
Exposure Prevention"** — a different name from what CLAUDE.md's 25 Jul 2026 amendment and
`authority-model.md` both use — and its delivery notification lists **NSW, VIC, QLD, TAS, ACT only.
WA, SA and NT are absent.** The course's own record shows no restrictions against the course itself, so
the jurisdictional limit sits on AlertForce's scope entry specifically — the same class of check that
mattered for NSW Owner Builder (a real RTO, but the required units were not on *that RTO's* scope).

**What I did not settle:** whether "Delivery notification" absent from a state is a hard bar or merely
an unnotified gap ASQA's guidance might treat more permissively. Recorded as UNVERIFIED for WA/SA/NT
rather than assumed either way. I also did not page through all 89 rows of AlertForce's training-package
"Units" tab (spot-checked the first 10, all unrelated `RII`/`MSM` traffic-management codes) — low risk,
since asbestos/silica products are standalone `NAT` courses by convention, not training-package units,
but flagged so a future session knows it wasn't exhaustive.

Recorded as new file `kb/register/alertforce-scope.md`, in scope for a facts session
(`kb/register/**`) and not previously existing.

## 2a. A related fee check, folded in because it was free

Access Canberra's page, read for the delivery-mode question, also stated current ACT White Card fees
($47.00 application, $44.00 replacement, current FY26-27). Checked against
`kb/register/state-fees-register.md:106`, already correct and dated 22 Jul 2026 — no update needed,
recorded here only so the next session does not re-check it.

## 3. Session close — every item with a disposition

| Item | Disposition |
|---|---|
| Pre-flight `system-health` | ✅ 0 failing, 14 warn at open |
| Register writes | ✅ `online-delivery-policy-by-state.md` §2E, `legislation-references-act.md`, new `alertforce-scope.md` — all sources read at source **in this session** (rule 4) |
| New-file freshness | ✅ `alertforce-scope.md` needed its own `verified:`/`cadence:` frontmatter to clear `check-freshness` (caught by re-running health before closing, not assumed) |
| This review filed | ✅ `skill-reviews/facts/` |
| Demand items routed | ✅ 2 new items, `unrouted: 0` across health's count after `demand-split --write` |
| Session type held | ✅ only `kb/register/**` + this review. No `src/`, no `kb/rules/`, no `.claude/skills/` |
| Post-change `system-health` | ✅ 0 failing, 14 warn, 44 ok — unchanged from open |
| Shipped | not shipped — working tree only, alongside the earlier TAS review from the same session |

## 4. What I did not do

- **Did not touch `kb/rules/authority-model.md` or CLAUDE.md**, both of which state the silica product
  as "Silica Awareness... resold... in every state." Both are skills-owned. Filed below.
- **Did not confirm with AlertForce or ASQA** what "Delivery notification" legally means for WA/SA/NT.
- **Did not page through all 89 AlertForce unit-of-competency rows** to rule out a third
  asbestos/silica-adjacent unit.
- **Did not build `/white-card-act`** — that is item 8, still blocked on nothing now, but it's a
  `[build]` task, not this session's.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- [skills] **CLAUDE.md's "Asbestos and silica" section and `kb/rules/authority-model.md` both name
  "Silica Awareness" as a course AlertForce resells nationally.** Neither is accurate on today's
  reading: the actual course is **10830NAT, "Course in Crystalline Silica Exposure Prevention"**, and
  its delivery notification on AlertForce's scope covers **NSW, VIC, QLD, TAS, ACT only** — not WA, SA
  or NT. See `kb/register/alertforce-scope.md`. Reconcile the naming and the "every state" claim before
  any page or schema is built for this product.
- [facts] **Confirm with AlertForce or ASQA whether "Delivery notification" absent for a state is a hard
  delivery bar or an administrative gap.** Needed before deciding whether the silica course can ever be
  sold to WA/SA/NT candidates, or whether AlertForce would need to add those states first.
- [build] **Item 8, `/white-card-act` (W3-5), is now fully unblocked** — the ACT delivery-mode question
  (item 3) is closed with no page-copy consequence, since no ACT White Card page exists yet to carry a
  wrong claim. Build from a clean position: attribute face-to-face delivery to AlertForce, never to
  WorkSafe ACT.
