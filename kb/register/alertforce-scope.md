---
verified: 2026-08-03
cadence: 365d
---

# AlertForce (RTO 91826) — scope of registration, read at source

**Verified:** 3 August 2026, in a browser at `training.gov.au/Organisation/Details/91826` (a
client-rendered SPA — `WebFetch` cannot read it; this matches the standing note in
`kb/rules/authority-model.md`). **Re-verify:** before any page states one of these codes, and whenever
a course's currency period nears its end date below.

This file exists because CLAUDE.md and `kb/rules/authority-model.md` both name "Asbestos Awareness and
Silica Awareness, resold by ABE in every state" with the course codes marked **UNVERIFIED**. They are
now verified, and the finding is **not** a clean confirmation of "every state."

## What AlertForce (RTO 91826) actually holds, on the "Courses" tab

Four accredited (`NAT`-suffixed) courses on scope, current, read in full — this is the complete list,
not a sample:

| Code | Title | Status | Extent | Start | End | Delivery notification |
|---|---|---|---|---|---|---|
| **11084NAT** | Course in Asbestos Awareness | Current | Deliver and assess | 13/Oct/2022 | 16/Aug/2028 | **NATIONAL** |
| **10830NAT** | Course in Crystalline Silica Exposure Prevention | Current | Deliver and assess | 04/Jun/2021 | 10/Apr/2030 | **NSW, VIC, QLD, TAS, ACT only** |
| 11348NAT | Course in Working Safely with Asbestos Containing Materials | Current | Deliver and assess | 02/Jun/2025 | 10/Apr/2030 | NSW, ACT |
| 11369NAT | Course in Workplace Impairment Prevention | Current | Deliver and assess | 03/Mar/2026 | 10/Apr/2030 | NSW, ACT |

Only the first two match ABE's stated "Asbestos Awareness and Silica Awareness" resell. The other two
are recorded here for completeness (they were on the same scope page) but are not part of ABE's stated
product set and need no action.

## The two findings

**1. "Asbestos Awareness" is confirmed as claimed.** Code **11084NAT**, nationally deliverable per the
RTO's own delivery notification. The course's own record (`training.gov.au/training/details/11084NAT`)
confirms ASQA-recognised, current, currency period 19 Aug 2022 – 18 Aug 2027, no restrictions recorded
against the course itself.

**2. There is no course titled "Silica Awareness" on AlertForce's scope, and its nearest equivalent is
not nationally deliverable.** The only silica-related product is **10830NAT, "Course in Crystalline
Silica Exposure Prevention"** — a different name from what CLAUDE.md and `authority-model.md` both use.
Its delivery notification on AlertForce's scope entry lists **NSW, VIC, QLD, TAS and ACT only — WA, SA
and NT are absent.** The course's own record
(`training.gov.au/training/details/10830NAT`) shows "Restrictions: there are no records to show," so
the jurisdictional limit sits on **AlertForce's own scope entry for this course**, not on the course's
national accreditation — the same distinction that mattered for NSW Owner Builder (a real RTO, but the
required units were not on *that RTO's* scope). An RTO's entitlement to deliver a nationally accredited
course is still gated per RTO, per state, by its own scope — accreditation existing nationally does not
mean every RTO holding it may deliver everywhere.

**What this does not settle.** "Delivery notification" is training.gov.au's own field name and its
precise legal effect (a hard bar on delivery outside the listed states, versus a notification-only
requirement with delivery elsewhere merely unnotified) was not confirmed against ASQA guidance in this
session — the site's own help text was not opened. Treat WA, SA and NT as **UNVERIFIED, not confirmed
either way**, for this course specifically, rather than assuming the safer or the more permissive
reading. Confirm with AlertForce directly, or read ASQA's guidance on what "Delivery notification"
means for an accredited course, before a page states or denies availability in those three states.

**Not checked exhaustively:** the "Units" tab (89 unit-of-competency records across 9 pages, all
`RII`/`MSM`-prefixed resources-and-infrastructure codes in the ten records sampled — a different
training-package domain to "awareness" courses). A keyword filter attempt inside the tool did not
visibly apply, so this is a spot-check of the first page, not a read of all 89 rows. Asbestos and silica
products are `NAT`-accredited standalone courses, not training-package units, which is why the "Courses"
tab (four, completely enumerated) is the right place to look — but if a future session wants certainty
that no third asbestos/silica-adjacent unit exists, page through all nine.

## What this changes

**Naming:** any future page or schema for the silica product should say "Crystalline Silica Exposure
Prevention (10830NAT)," not "Silica Awareness" — the latter name does not exist on AlertForce's scope.

**Scope:** the CLAUDE.md framing "resold by ABE in every state" is confirmed for Asbestos Awareness
(11084NAT) and **not confirmed** for the silica course (10830NAT) — WA, SA and NT need either a
delivery-notification update from AlertForce or an explicit product-scope decision to exclude them,
before any page or schema asserts national coverage for silica specifically.

**Currency dates to watch:** 11084NAT's scope-entry end date (16 Aug 2028) and the course's own national
currency end date (18 Aug 2027) differ by about a year — not reconciled in this session, flagged so a
future freshness check does not treat one as a typo for the other.

## Re-read 14 August 2026 — the jurisdiction list confirmed, its legal effect still not

Two things were checked at source. One is now settled; the other is not, and the difference between
"unchecked" and "checked and the instrument does not say" is worth recording as its own state.

**1. The 10830NAT jurisdiction list is confirmed: NSW, VIC, QLD, TAS, ACT. SA, WA and NT are not on
it.** Re-read on AlertForce's Courses tab, 14 Aug 2026.

**Read this before re-checking it, because the obvious method returns the wrong answer.**
training.gov.au renders **every** jurisdiction into the Delivery notification cell and then gives
width only to the ones that apply. The cell's `textContent` is
`NSWVICQLDSAWATASNTACTINTERNATIONAL` — all of them — while the cell's `innerText` is
`NSW VIC QLD TAS ACT`. Measured per pill: NSW 48x24, VIC 41x24, QLD 45x24, TAS 43x24, ACT 44x24, and
**SA, WA, NT and INTERNATIONAL all 0x0**, with `visibility:visible` and `display:inline-flex` on every
one, so a visibility check does not separate them either. A scrape, a `textContent` read, or an
`offsetParent` test will all report that AlertForce is notified in every state. Use `innerText`, or
measure the boxes.

**2. The legal effect of "Delivery notification" is still not established, and the instrument the
previous entry said it had not opened has now been opened.** The tooltip on that column, read
14 Aug 2026, gives only the jurisdiction legend `NSW | VIC | QLD | SA | WA | TAS | NT | ACT`. The
scope tooltip beside it says, in full:

> "NOTE: This is a list of training products that the RTO has approval to deliver training and/or
> assessment in. It is not an indication of what training products the RTO is actually delivering.
> Individuals should contact the relevant RTO to confirm all delivery details of different training
> products."

That establishes scope means **approval to deliver**, not actual delivery — useful, and it is why
this register never says AlertForce *does* deliver a course anywhere. It does **not** say whether
delivering outside the notified jurisdictions is barred or merely un-notified, which is the question.
`asqa.gov.au` was searched for "delivery notification" the same day: **6 results, none defining the
field**; the nearest is a statement of regulatory expectations about notification of *material
changes*, which is a different obligation.

**So the position is unchanged but better bounded: WA, SA and NT stay UNVERIFIED for 10830NAT.** What
has changed is where not to look. The next attempt should go to ASQA directly or to AlertForce, not
to training.gov.au's help text or ASQA's public search, both of which have now been tried and
recorded as silent.

**No live page depends on this.** Every AlertForce reference in `src/content` is the ACT White Card,
and ACT is on the notified list. No asbestos or silica page is built. This gates a future page, not a
published claim.

## Sources

| What it establishes | Source | Read at source |
|---|---|---|
| 10830NAT delivery notification is NSW, VIC, QLD, TAS, ACT — SA/WA/NT render at 0x0 and are not notified | `training.gov.au/organisation/details/91826`, Courses tab, measured per pill | 14 Aug 2026 |
| Scope means "approval to deliver", not actual delivery; the column tooltip defines no legal effect | same page, column and scope tooltips | 14 Aug 2026 |
| ASQA's public site does not define "delivery notification" — 6 search results, none on point | `asqa.gov.au/search?keys=delivery notification` | 14 Aug 2026 |
| AlertForce (RTO 91826) is Current, ASQA-regulated, registration to 10 Apr 2030 | `training.gov.au/Organisation/Details/91826`, Summary tab | 3 Aug 2026 |
| The four accredited courses on scope and their delivery notification | `training.gov.au/Organisation/Details/91826`, Courses tab | 3 Aug 2026 |
| 11084NAT is Current, ASQA-recognised, currency 19 Aug 2022 – 18 Aug 2027, no restrictions | `training.gov.au/training/details/11084NAT` | 3 Aug 2026 |
| 10830NAT is Current, ASQA-recognised, currency 25 Nov 2024 – 24 Nov 2029, no restrictions recorded against the course itself | `training.gov.au/training/details/10830NAT` | 3 Aug 2026 |
