---
date: 2026-08-14
skill: facts-session
subject: three duplicated delivery-mode claims removed, and the AlertForce delivery-notification field read at source
verdict: Amber
graded_by: self
---

# Facts review — delivery-mode duplicates, and AlertForce's scope re-read, 2026-08-14

Self-graded; there is no fresh-subagent facts grader, and rule 4 forbids the obvious substitute since
a second session cannot re-verify a figure without reading the source itself.

**Amber, not Green**, for one reason: the session was opened on my own recommendation that the facts
backlog was "12 items, the highest-stakes list", and roughly half of it was already done. The work
that came out of it is sound. The premise was not, and I put it to Andrey before checking it.

## Pre-flight

`node scripts/system-health.mjs`: **0 failing**, 44 warning, 81 ok. Register 17/17 current. Same at
close.

## The premise was wrong, and that is the first finding

Five of the twelve `[facts]` items in `reports/handover-facts.md` were **already closed** by the
1–3 Aug verification sessions and had never been struck through:

| Item as filed | Actual state |
|---|---|
| "Read the TAS delivery row at WorkSafe Tasmania… highest-risk unchecked row, `/white-card-tas` is live" | done 3 Aug 2026, §2D, against WorkSafe Tas guidance + WHS Regulations 2022 (Tas) |
| "Read the ACT delivery row at WorkSafe ACT" | done 3 Aug 2026, §2E |
| "ACT remains the last unchecked delivery row" | done 3 Aug 2026 |
| "Verify the QLD row against WHSQ" | done 2 Aug 2026, §2C |
| "Confirm Blue Dog's CRTD approval" | done 2 Aug 2026, §2C |

The `/white-card-tas` item is the one that matters: it reads as a live, indexable page advertising an
unverified delivery mode, and it is what made me rank facts above everything else. The regulator was
read eleven days ago. A derived list that carries closed items does not merely waste a session, it
**misdirects prioritisation** — I recommended this list over the plumbing blocker and the homepage on
the strength of an item that was already answered.

One further item is misrouted rather than stale: "Experience / Work experience now sit as adjacent
labels on the reviewer card" is a card-labelling question with no regulatory content and no register
row. It belongs to `design`.

## What shipped

### Three duplicated delivery-mode claims removed

`CLAUDE.md` is explicit that `kb/register/` is the single owner of every verified figure and that no
second copy may exist. Three files held one:

| File | Claim carried | Disposition |
|---|---|---|
| `legislation-references-qld.md` | "must be completed **in person** in QLD (online delivery is restricted to WA and TAS residents)" | both halves wrong; removed, pointer added |
| `legislation-references-nsw.md` | same parenthetical, after a correct "in person" | parenthetical only removed; "in person" kept and sourced |
| `competitor-pricing-snapshot.md:71` | QLD "Virtual classroom mandated" | corrected to "permitted, not mandated"; pointer added |

**No new fact was entered, and that is deliberate under rule 4.** None of these needed a source read
because none of them states a new position: each removes a duplicate and points at
`online-delivery-policy-by-state.md`, which owns the claim and carries its own dated regulator
reading. Restating §2C's content in a second file would have been carrying a figure from another
session, which is exactly what rule 4 forbids.

**The pattern was already solved in-repo.** `legislation-references-act.md` had the identical
parenthetical and had it removed on 3 Aug 2026, with a note ending "do not restate it". The ACT file
is the model; NSW and QLD were simply missed in that sweep. I followed its wording rather than
inventing a new form.

### AlertForce scope re-read at source

Recorded in `alertforce-scope.md` under a new dated section. Two outcomes, and they are different in
kind.

**Confirmed:** 10830NAT's delivery notification is NSW, VIC, QLD, TAS, ACT. SA, WA and NT are absent.

**And the method matters enough to be written into the register**, because the obvious approach
returns the opposite answer. training.gov.au renders *every* jurisdiction into the cell and gives
width only to the applicable ones. `textContent` returns `NSWVICQLDSAWATASNTACTINTERNATIONAL`;
`innerText` returns `NSW VIC QLD TAS ACT`. Measured per pill: the five that apply are 41–48px wide,
and **SA, WA, NT and INTERNATIONAL are all 0x0**, while reporting `visibility:visible` and
`display:inline-flex`, so a visibility test does not separate them either. I read the wrong value
first and only caught it because the two extractions disagreed. Anyone scraping this page will
conclude AlertForce is notified nationally.

**Still unresolved, but better bounded:** the legal effect of "Delivery notification". The previous
entry said the site's own help text "was not opened". It is now opened, and it does not answer:

> "NOTE: This is a list of training products that the RTO has approval to deliver training and/or
> assessment in. It is not an indication of what training products the RTO is actually delivering."

That settles scope = *approval to deliver*, not actual delivery, which is why this register never
claims AlertForce delivers anywhere. It does not settle whether delivering outside the notified
jurisdictions is barred. `asqa.gov.au` searched the same day for "delivery notification": 6 results,
none on point.

**"Checked and the instrument is silent" is a different state from "unchecked"**, and the register
now says which. WA/SA/NT stay UNVERIFIED for 10830NAT; what changed is that the next attempt should
go to ASQA directly or to AlertForce, not to training.gov.au's help text or ASQA's public search.

## Reversals, and what still carries the old position — rule 11(b)

Two positions were reversed. Both were checked against every consumer.

**1. "White Card must be completed in person in QLD."** Contradicted by §2C (WHSQ, read 2 Aug 2026):
CRTD is permitted from a separately-approved RTO, and WHSQ counts CRTD *as* face-to-face.

**Nothing else carries it.** `/white-card-qld` is already correct — it states "Live online (CRTD)",
"NOT self-paced at any point", and its own source comments warn against "the old face-to-face-only
line", naming §2C as the trap. **The register contradicted the page and the page was right**, which
is the inverse of this repo's usual failure and worth noting as such.

**2. "Online delivery is restricted to WA and TAS residents."** Contradicted twice over: §2D found no
TAS delivery-mode rule at all, and §2B establishes WA as a **location** test, not residency.

**No page copy carries it.** Grepped `src/`, the skill references and the `new site/` plan documents:
the only hits are two skill-reference notes about **NSW** delivery, which state a different and
correct claim.

So both reversals are fully closed, with no un-corrected consumers. Stating that positively is the
point of the check — "I found none" and "I searched these places and there are none" are different
claims.

## Verification

`system-health` 0 failing / 44 warning / 81 ok, unchanged. Register 17/17 current. `check-claims`
figures unchanged at 161/184. No page file was touched; this session wrote only to `kb/register/**`
and this review, per the facts session type.

## Demand list

Tag every item: [skills] | [design] | [facts] | [build]

- [skills] `reports/handover-facts.md` carried **5 of 12 items already closed on 1–3 Aug**, because
  the sessions that did the work updated `kb/register/**` and never struck the items in the reviews
  that filed them. `demand-split` can only read strikethroughs, so a completed item is invisible to
  it. This is the highest-leverage item on this list: the derived handover is what a session reads to
  choose its work, and it sent this one at a `/white-card-tas` risk that had been closed for eleven
  days. Options worth weighing: have `check-freshness` or `demand-split` cross-reference a register
  file's verified date against items naming it, or make closing the filing item part of the facts
  session close the way it now is for design and skills.
- [facts] Blue Dog Training (RTO 31193) **scope of registration and delivery-location conditions for
  CPCWHS1001** are still unread at source. Distinct from the CRTD approval, which §2C verified on
  2 Aug. This one gates `/white-card-qld`'s partner claim rather than its delivery-mode claim.
- [facts] WorkSafe WA's "Terms and Conditions 2022" document, item 3(a) page 5, is cited **by
  WorkSafe WA's own page** but has never been located. Low urgency precisely because the claim is
  already regulator-sourced from that page; locating the underlying document would strengthen
  provenance, not change the position.
- [facts] The legal effect of training.gov.au's "Delivery notification" field remains open, now with
  two instruments eliminated. Next: ASQA directly, or AlertForce. Gates a future asbestos/silica
  page and nothing currently published.
- [design] "Experience" and "Work experience" sit as adjacent labels on the reviewer card. Filed to
  `facts`, but it has no regulatory content and no register row. Re-tagged here.
- [facts] The four CPCWHS1001 elements are verified (28 Jul 2026) but their **performance criteria**
  are unrecorded. Deferred deliberately: no page wants them today, and recording an unused figure
  adds a row that must be re-verified on cadence for no reader.
