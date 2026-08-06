# Stage 1 — Government resource map + fact ledger — `/white-card-act`

Read the internal verified register first (`kb/content-source-map.md` index), then confirmed nothing
needed a fresh live read — every regulatory fact below was already verified at source within the last
two days (`kb/register/online-delivery-policy-by-state.md` §2E, 3 Aug 2026) or within cadence
(`state-fees-register.md`, 22 Jul 2026, current 1 Jul 2026 – 30 Jun 2027). AlertForce's RTO-scope
check (training.gov.au, 4 Aug 2026) was done ahead of this build during the `/white-card` hub work.

## Regulatory facts

| Fact | Value | Source | Verified |
|---|---|---|---|
| Regulator | WorkSafe ACT (WHS Act 2011 + WHS Regulation 2011 (ACT)) | `kb/register/legislation-references-act.md` §2 | 3 Aug 2026 |
| Card-issuing authority | Access Canberra ("General Construction Induction Card") | `kb/register/state-fees-register.md` line 47 | 22 Jul 2026 |
| Delivery mode | **Face-to-face, in a classroom** — AlertForce's own delivery choice, **not a regulatory requirement**. WHS Regulation 2011 (ACT) reg 5 imposes no delivery-mode restriction at all (identical wording to TAS's reg, zero matches for online/self-paced/face-to-face terms anywhere in the instrument). | `kb/register/online-delivery-policy-by-state.md` §2E | 3 Aug 2026 |
| Government card fee | $47.00 application; $44.00 replacement | `kb/register/state-fees-register.md` line 47 (Access Canberra, FY26-27, amount renders dynamically — read in a browser) | 22 Jul 2026 |
| Application process | Applied for online via an ACT Digital Account within 60 days of the training certificate; the receipt + training certificate lets the worker start while the application is assessed (up to ~1 month); card posted within ~2 weeks of approval; does not expire. | `kb/register/state-fees-register.md` line 47 | 22 Jul 2026 |
| Unit | CPCWHS1001 *Prepare to work safely in the construction industry* | `kb/register/legislation-references-act.md` §2 | 26 May 2026 |
| Nominal course length | ~6 hours ("a 6-hour training program") | Access Canberra's own consumer page, quoted in `online-delivery-policy-by-state.md` §2E | 3 Aug 2026 |
| RTO scope (AlertForce, CPCWHS1001, ACT) | Current, Scope: Explicit, Extent: Deliver and assess, delivery notification includes ACT | training.gov.au, checked live in-browser during the `/white-card` hub build | 4 Aug 2026 |

**Caution, load-bearing for Stage 4 (same shape as the TAS residency caution carried on the hub):**
`online-delivery-policy-by-state.md` §3 is explicit — "State it as AlertForce's practice, never as a
WorkSafe ACT requirement." This page must frame face-to-face delivery as AlertForce's own arrangement
throughout (hero, FAQ, how-it-works), never imply WorkSafe ACT mandates it. The corollary: **do not
write an eligibility/location gate the way WA and TAS need one** ("located in WA," "completed in
Tasmania") — ACT has no online-delivery question to gate at all, since the course is not offered
online here. The natural constraint is simply that the classroom session happens somewhere the
learner can attend; nothing regulatory to cite for that.

## Internal facts (asked and confirmed, not re-derived)

| Fact | Value | Source |
|---|---|---|
| ABE price | $137 | Andrey, this session, 4 Aug 2026 |
| Purchase path | No LearnWorlds `buyUrl` yet — every CTA uses the in-page `#enrol` anchor | Andrey, this session, 4 Aug 2026. Same precedent as `/white-card-tas` before its payment was configured. |
| RTO partner | AlertForce (RTO 91826) | `src/content/partners/alertforce.md` (existing record, verified 19 Jul 2026) |
| Reviewer | Warwick Smith | `src/content/experts/warwick-smith.md`, same reviewer as every other White Card spoke |
| Credential | Statement of Attainment — CPCWHS1001 | Consistent with WA/TAS/NSW/QLD |
| Authority model | asqa-accredited (1 Person node — the reviewer; AlertForce credited via `Course.creator`) | `kb/rules/authority-and-seo-rules.md`, matches every other White Card spoke |

**Unknowns gate: closed.** Price and CTA target were the two outstanding internal facts (both
supplied by Andrey this session). No further internal fact is missing. Session-logistics detail this
build does not have (how often AlertForce runs sessions, exact venue) is deliberately not invented —
the how-it-works copy stays at the level this register actually supports (enrol, attend, pass, apply
for the card) rather than specifying a booking process nobody has confirmed.

## Primary keyword and demand signal

Per `handover/HANDOVER-todo-2026-08-02.md` item 8 (citing the per-page GSC export): the `/white-card`
hub already absorbs the "white card act" query at 1,152 impressions, position 14.61 — meaningful,
unclaimed demand this page's job is to take over, not protect an existing asset (zero legacy URL,
zero inherited equity).
