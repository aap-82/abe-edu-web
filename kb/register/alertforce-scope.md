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

## Sources

| What it establishes | Source | Read at source |
|---|---|---|
| AlertForce (RTO 91826) is Current, ASQA-regulated, registration to 10 Apr 2030 | `training.gov.au/Organisation/Details/91826`, Summary tab | 3 Aug 2026 |
| The four accredited courses on scope and their delivery notification | `training.gov.au/Organisation/Details/91826`, Courses tab | 3 Aug 2026 |
| 11084NAT is Current, ASQA-recognised, currency 19 Aug 2022 – 18 Aug 2027, no restrictions | `training.gov.au/training/details/11084NAT` | 3 Aug 2026 |
| 10830NAT is Current, ASQA-recognised, currency 25 Nov 2024 – 24 Nov 2029, no restrictions recorded against the course itself | `training.gov.au/training/details/10830NAT` | 3 Aug 2026 |
