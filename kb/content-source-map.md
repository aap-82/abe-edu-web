# ABE Education — Content Source Map
**Where to find facts for every content type on abeeducation.edu.au**
**Version 1.3 — updated 27 May 2026** *(kb/register/competitor-pricing-snapshot.md built — full §7 register is now ✅; §6 templated name for competitor-pricing reconciled to the concrete filename; state-fees-register verification pass complete except WA OB approval)*

---

## Table of Contents

1. Source types and priority
2. Internal sources (ABE-controlled)
3. External sources (government/regulatory)
4. Verification sources
5. Source map by content type
6. Source map by fact category
7. Missing resource flag system

---

## 1. Source Types and Priority

Every fact on an ABE page falls into one of four categories. Always use the highest-priority source available.

| Priority | Source Type | Tag | Meaning |
|---|---|---|---|
| 1 | 🟢 INTERNAL | `[INT]` | ABE-controlled data: pricing, course specs, partnership details, student data. Single source of truth. |
| 2 | 🔵 INTERNAL + VERIFY | `[INT+V]` | ABE data that must be verified against an external authoritative source (e.g., RTO number against training.gov.au). |
| 3 | 🟡 EXTERNAL | `[EXT]` | Government, regulatory, or legislative data not controlled by ABE. Must be fetched from the authoritative source. |
| 4 | 🟠 EXTERNAL — NO RESOURCE | `[EXT-NR]` | External fact needed but no internal reference document exists. Flag for resource library update. |
| 5 | ⚪ DERIVED | `[DER]` | Calculated from other sourced facts (e.g., total price = training + government fee). |

**Rule:** Never publish a fact tagged `[EXT-NR]` without first verifying it via web search or web fetch against the authoritative source. After verification, consider whether an internal resource should be created to avoid re-researching the same fact next time.

---

## 2. Internal Sources (ABE-Controlled)

These are facts ABE owns. Search Google Drive and Notion first.

### Where to search

| Source | What's there | How to access |
|---|---|---|
| Google Drive (ABE folder) | Course specs, partnership docs, pricing, compliance docs, content drafts, research reports | `google_drive_search` |
| Notion (ABE workspace) | Course pages, content database, project tracking | `Notion:notion-search` |
| LearnWorlds admin | Live pricing, course settings, student counts, review data | Ask user or check existing page |
| Gmail (ABE threads) | Partnership correspondence, compliance discussions, pricing agreements | `Gmail:gmail_search_messages` |
| Existing landing pages | Published content for consistency checks | `web_fetch` on abeeducation.edu.au |

### Internal fact categories

| Category | Examples | Primary source |
|---|---|---|
| **Pricing** | Course fee, total cost, bundle discounts | LearnWorlds pricing settings / ABE pricing doc |
| **Course specs** | Duration, format, delivery method, access period | ABE course specs doc / Blue Dog Training agreement |
| **RTO partnership** | Partner name, RTO number, roles, disclosure wording | ASQA disclosure framework (skill reference file) |
| **Business details** | ABN, contact info, operating since date, team | ABE business registration / About page |
| **Student data** | Rating, review count, pass rate, student count, award | Review platforms / Blue Dog Training data |
| **Expert credentials** | Expert qualifications, title, employer, bios, schema (Warwick Smith, Dominic Ogburn) | Notion Experts database (live, build-time source of truth) — `Notion:notion-search` + `notion-fetch`; fallback: skill reference `.claude/skills/abe-course-page-astro/references/seo/expert-fallback/` |
| **Existing content** | Previously published landing pages, section wording | abeeducation.edu.au (web_fetch) |
| **Brand/design** | Colours, typography, section patterns | ABE Grey Design System / skill reference files |

---

## 3. External Sources (Government/Regulatory)

These are facts ABE does not control. Each must be fetched from the authoritative source.

### National sources (all course types)

| Source | URL | What you get | Verify frequency |
|---|---|---|---|
| training.gov.au | https://training.gov.au | RTO registration status, unit details, qualification scopes | Monthly |
| ASQA | https://www.asqa.gov.au | RTO Standards, compliance requirements | Quarterly |
| USI Registry | https://www.usi.gov.au | USI requirements, creation process | Annually |
| AQF | https://www.aqf.edu.au | Qualification framework, credential levels | Annually |

### Tasmania sources (White Card, Owner Builder, CPD)

| Source | URL | What you get |
|---|---|---|
| WorkSafe Tasmania | https://worksafe.tas.gov.au | White Card requirements, WHS enforcement, online delivery policy, fines |
| Service Tasmania | https://www.service.tas.gov.au | White Card lodgement, replacement process, government fees, 60-day window |
| CBOS Tasmania | https://www.cbos.tas.gov.au | Owner Builder permit requirements, CPD provider approvals, Building Act 2016 |
| Tasmanian Legislation | https://www.legislation.tas.gov.au | WHS Act 2012 (Tas), WHS Regulations, Building Act 2000 |

### Western Australia sources

| Source | URL | What you get |
|---|---|---|
| WorkSafe WA | https://www.commerce.wa.gov.au/worksafe | White Card requirements, WHS enforcement |
| LGIRS (Building and Energy) | https://www.wa.gov.au/organisation/service-delivery/owner-builder-approval | WA Form 75 owner-builder approval requirements |
| WA Legislation | https://www.legislation.wa.gov.au | Work Health and Safety Act 2020 (WA) |

### ACT sources

| Source | URL | What you get |
|---|---|---|
| WorkSafe ACT | https://www.worksafe.act.gov.au | White Card requirements |
| Access Canberra | https://www.accesscanberra.act.gov.au | Owner Builder permit, building approvals |
| ACT Legislation | https://www.legislation.act.gov.au | Work Health and Safety Act 2011 (ACT) |

### NSW sources

| Source | URL | What you get |
|---|---|---|
| SafeWork NSW | https://www.safework.nsw.gov.au | White Card requirements, WHS enforcement |
| Building Commission NSW | https://www.nsw.gov.au/departments-and-agencies/building-commission | Owner Builder permit requirements (apply via Service NSW) |
| NSW Legislation | https://www.legislation.nsw.gov.au | Work Health and Safety Act 2011 (NSW) |

### Queensland sources

| Source | URL | What you get |
|---|---|---|
| WHSQ | https://www.worksafe.qld.gov.au | White Card requirements |
| QBCC | https://www.qbcc.qld.gov.au | Owner Builder requirements |
| QLD Legislation | https://www.legislation.qld.gov.au | Work Health and Safety Act 2011 (Qld) |

---

## 4. Verification Sources

Some facts need cross-referencing between internal and external sources.

| Fact | Internal source | Verify against |
|---|---|---|
| RTO number (31193) | Partnership agreement | training.gov.au/Organisation/Details/31193 |
| Qualification code (CPCWHS1001) | Course specs | training.gov.au/Training/Details/CPCWHS1001 |
| ASQA registration status | Partnership agreement | asqa.gov.au |
| CBOS approval status | ABE listing confirmation | cbos.tas.gov.au approved providers page |
| Review rating and count | Review platform dashboards | ProductReview + Trustpilot live pages |
| Expert credentials | Notion Experts database (live; fallback `.claude/skills/abe-course-page-astro/references/seo/expert-fallback/`) | LinkedIn / credential verification (upstream source that populates Notion) |
| Government fees | Previous page version | State government website (fees change) |
| Legislation section numbers | Previous content | Current legislation database |

**Rule:** Government fees, legislation references, and regulator approval status must be re-verified before every content update. These change without notice.

---

## 5. Source Map by Content Type

### White Card Landing Pages (any state)

| Fact needed | Source type | Where to find it |
|---|---|---|
| Course price | 🟢 INT | LearnWorlds pricing / ABE pricing doc |
| Government fee | 🟡 EXT | State government website (varies by state) |
| Duration and format | 🟢 INT | ABE course specs |
| Unit code and name | 🔵 INT+V | ABE specs + training.gov.au |
| RTO name and number | 🔵 INT+V | Partnership docs + training.gov.au |
| ASQA disclosure wording | 🟢 INT | `kb/rules/asqa-disclosure-framework.md` |
| State-specific WHS legislation | 🟡 EXT | State legislation database |
| Who regulates White Cards in this state | 🟡 EXT | State WHS regulator website |
| Online delivery allowed? | 🟡 EXT | State regulator policy |
| Card lodgement process | 🟡 EXT | State government (e.g., Service Tasmania) |
| Fines for non-compliance | 🟡 EXT | State WHS Act |
| PPE requirements | 🟡 EXT | WHS Regulations / Blue Dog Training specs |
| Rating and review count | 🟢 INT | Review platform data |
| Pass rate | 🟢 INT | Blue Dog Training assessment records |
| Expert reviewer details | 🟢 INT | Notion Experts database (fallback: `.claude/skills/abe-course-page-astro/references/seo/expert-fallback/`) |
| Competitor pricing | 🟡 EXT | Web search / competitor pages |

### Owner Builder Landing Pages

| Fact needed | Source type | Where to find it |
|---|---|---|
| Course price | 🟢 INT | LearnWorlds pricing |
| Permit requirements | 🟡 EXT | State building regulator (CBOS, WA LGIRS, Access Canberra, Building Commission NSW) |
| ABE approval status | 🔵 INT+V | ABE confirmation + regulator website |
| Building Act references | 🟡 EXT | State legislation database |
| Insurance requirements | 🟡 EXT | State building regulations |
| Value thresholds (e.g., $20K in WA) | 🟡 EXT | State regulations |
| Related courses needed | 🟢 INT | ABE course catalogue |

### CPD Landing Pages

| Fact needed | Source type | Where to find it |
|---|---|---|
| Course price | 🟢 INT | LearnWorlds pricing |
| CPD point value | 🟡 EXT | State regulator (CBOS, etc.) |
| CPD requirements by trade | 🟡 EXT | State building/plumbing/electrical regulator |
| CBOS approval status | 🔵 INT+V | ABE confirmation + cbos.tas.gov.au |
| Renewal period and deadline | 🟡 EXT | State regulator |
| Legislation references | 🟡 EXT | State legislation database |

---

## 6. Source Map by Fact Category

### Pricing facts

| Fact | Source | Verify | Resource exists? |
|---|---|---|---|
| Training fee | 🟢 INT — LearnWorlds | N/A (ABE controls) | ✅ |
| Government/lodgement fee | 🟡 EXT — State govt website | Every update | ✅ kb/register/state-fees-register.md (built 27 May 2026) |
| Competitor pricing | 🟡 EXT — Web search | Every update | ✅ kb/register/competitor-pricing-snapshot.md (built 27 May 2026) |
| Bundle pricing | 🟢 INT — LearnWorlds | N/A | ✅ |

### Regulatory facts

| Fact | Source | Verify | Resource exists? |
|---|---|---|---|
| WHS Act section numbers | 🟡 EXT — State legislation | Every update | kb/register/legislation-references-[state].md (✅ all five built: nsw, qld, wa, tas, act) |
| Regulator roles (who does what) | 🟢 INT — skill reference (compiled) | Quarterly | ✅ kb/register/regulator-roles-by-state.md |
| Online delivery policy | 🟢 INT — skill reference (compiled) | Quarterly | ✅ kb/register/online-delivery-policy-by-state.md |
| Fines and penalties | 🟡 EXT — State WHS Act | Annually | ✅ kb/register/penalties-by-state.md (built 27 May 2026) |
| Lodgement/application process | 🟡 EXT — State govt site | Quarterly | ✅ kb/register/card-lodgement-process-tas.md (built 27 May 2026; other states still 📋) |
| PPE requirements | 🟢 INT — skill reference (compiled) | Annually | ✅ kb/register/ppe-requirements.md |
| Age/eligibility requirements | 🟢 INT — skill reference (compiled) | Annually | ✅ kb/register/eligibility-by-state.md |

### Social proof facts

| Fact | Source | Verify | Resource exists? |
|---|---|---|---|
| Star rating | 🟢 INT — Review platforms | Monthly | ✅ (needs dashboard access) |
| Review count | 🟢 INT — Review platforms | Monthly | ✅ |
| Pass rate | 🟢 INT — Blue Dog Training | Quarterly | ✅ (needs Blue Dog data) |
| Student count | 🟢 INT — LearnWorlds analytics | Quarterly | ✅ |
| Awards | 🔵 INT+V — Award body website | Annually | ✅ |

---

## 7. Missing Resource Flag System

When writing content and a fact is needed but no internal resource exists, flag it using this format:

```
📋 MISSING RESOURCE: [fact needed]
   Source required: [authoritative URL or source description]
   Suggested resource: [proposed filename for internal library]
   Priority: HIGH / MEDIUM / LOW
   Reason: [why this should be an internal resource]
```

### Priority criteria

| Priority | When to use |
|---|---|
| **HIGH** | Fact appears on multiple pages or changes regularly — re-researching every time wastes effort |
| **MEDIUM** | Fact appears on 1–2 pages but is critical for compliance or accuracy |
| **LOW** | Fact is nice-to-have context, not essential for compliance, appears on one page only |

### Recommended internal resources to create (based on White Card TAS audit)

| Suggested resource | Priority | Facts it would cover | Source to compile from |
|---|---|---|---|
| `kb/register/state-fees-register.md` | ✅ Built 27 May 2026 | Government fees for all states (White Card lodgement, Owner Builder application) | State government websites |
| `kb/register/regulator-roles-by-state.md` | ✅ Built 26 May 2026 | Which regulator does what in each state (WorkSafe vs CBOS vs Access Canberra etc.) | Skill canonical data + state government sites |
| `kb/register/legislation-references-tas.md` | ✅ Built 26 May 2026 | WHS Act 2012, Building Act 2016, Occupational Licensing Act 2005, key provisions | legislation.tas.gov.au |
| `kb/register/legislation-references-wa.md` | ✅ Built 26 May 2026 | WHS Act 2020, Building Act 2011, Building Services (Registration) Act 2011 | legislation.wa.gov.au |
| `kb/register/legislation-references-act.md` | ✅ Built 26 May 2026 | WHS Act 2011, Building Act 2004, Construction Occupations (Licensing) Act 2004 | legislation.act.gov.au |
| `kb/register/legislation-references-nsw.md` | ✅ Built 26 May 2026 | WHS Act 2011, Home Building Act 1989 (Building Commission NSW; Building Bill 2024 pending) | legislation.nsw.gov.au |
| `kb/register/legislation-references-qld.md` | ✅ Built 26 May 2026 | WHS Act 2011, QBCC Act 1991, Building Act 1975 | legislation.qld.gov.au |
| `kb/register/online-delivery-policy-by-state.md` | ✅ Built 26 May 2026 | Self-paced (WA/TAS only) vs virtual-classroom vs face-to-face White Card delivery by state | State WHS regulators |
| `kb/register/card-lodgement-process-tas.md` | ✅ Built 27 May 2026 | Step-by-step Service Tasmania process, documents needed, fees, timeframes | service.tas.gov.au |
| `kb/register/ppe-requirements.md` | ✅ Built 26 May 2026 | AS/NZS PPE standards for White Card / construction content | WHS Regulations + Standards Australia |
| `kb/register/eligibility-by-state.md` | ✅ Built 26 May 2026 | Owner-builder permit thresholds, course triggers, frequency limits per state | State regulators |
| `kb/register/competitor-pricing-snapshot.md` | ✅ Built 27 May 2026 | Competitor price ranges by state (refreshed quarterly) | Web search |
| `kb/register/penalties-by-state.md` | ✅ Built 27 May 2026 | WHS duty-offence tiers (Cat 1/2/3 + industrial manslaughter), penalty unit values, White Card offence framing | Safe Work Australia + state WHS Acts |

---

*ABE Education Content Source Map v1.0 — March 2026*
