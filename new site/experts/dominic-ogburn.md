# 🎓 Dominic Ogburn

## Page properties

| Field | Value |
|---|---|
| Expert Name | Dominic Ogburn |
| Role | Course Developer |
| Organisation | ABE Education |
| Status | Active |
| Verification Status | All Verified |
| Years in Industry | 40 |
| Profile Page URL | /experts/dominic-ogburn |
| LinkedIn | https://www.linkedin.com/in/dominic-ogburn |
| Headshot URL | https://pub-e001e9a575874f24a0bcd7082a45cdbc.r2.dev/Dominic_Ogburn_portrait.webp |
| Specialist Areas | Construction, Building Codes, Consumer Advocacy, Waterproofing |
| Courses Reviewed | ACT Owner Builder, WA Owner Builder, QLD Owner Builder, CPD Courses |
| Last Verified | 2026-07-19 |
| ID | AHE-3 |

---

**Document Purpose:** Authoritative reference for all verified credentials, bio variations, and usage guidelines for Dominic Ogburn across ABE Education marketing materials, course pages, and communications.
**Last Updated:** 30 May 2026
**Version:** 1.14
**Verification Status:** All credentials marked ✅ are independently verified with documentary evidence. Items marked ⚠️ are pending verification and must not be published.
> 📌 **Migration note:** Consolidated from ABE Reference Library (credentials reference doc v1.2) into Experts database on 15 April 2026. Source doc: [Dominic Ogburn — Credentials Reference Document](https://www.notion.so/33166bffe88081879525f96299d11cbf)
---
## 📍 Page Status & Flags
| Aspect | Status | Notes |
|---|---|---|
| Profile Page URL | ✅ /experts/dominic-ogburn | Matches site, skill references aligned (page-type-engine §1 + quality-gates §6.4) |
| Schema Markup Template | ✅ v1.9 (current) | ProfilePage wrapper · `worksFor` · `dateModified` · array `sameAs` · `image` populated from Headshot URL property |
| Headshot URL property | ✅ Set | Used in Schema mainEntity.image and rendered page |
| Render status | ✅ Production-ready | All 7 audit items resolved 20 April 2026 (meta title, meta description, H1 length, alt text, ProfilePage, worksFor, missing Template-D sections) |
| Last credential verification | 19 July 2026 | Tracked in `date:Last Verified:start` property — next quarterly review due July 2026 |

**Open data-integrity flags — require product clarification (surfaced by 20 April 2026 audit):**
1. ✅ **NSW Owner Builder — RESOLVED (27 May 2026).** It is nationally recognised and delivered by **Upskill Institute (RTO 45708)**, with ABE as enrolment partner. Dominic is **not** its developer and has been removed from the `Courses Reviewed` multi-select. **Warwick Smith** is the named reviewer for the NSW Owner Builder page (see Warwick's Experts entry).
2. ⚠️ **TAS Owner Builder** is missing from `Courses Reviewed` despite the matrix listing it as ✅ Offered (CBOS-approved, ABE-delivered direct). Should be added to the multi-select and the URL Map.
3. ⚠️ **CPD Courses** is stored as a single multi-select value but live CPD pages exist per state/trade (NSW CPD Building, TAS CPD Building/Plumbing/Electrical, WA CPD Real Estate). Should be expanded to per-page granularity so `author` / `reviewedBy` `@id` references can be generated per course page.
---
## 📊 Quick Reference
| Field | Value |
|---|---|
| Role | CEO and Course Developer — ABE Education |
| Years in industry | 40+ (career began March 1980 at Stuart Brothers Pty Ltd) |
| Verified credentials | 16 |
| Government jurisdictions | 5 — NSW, ACT, TAS, WA, QLD |
| Students trained (lifetime) | 31,000+ (since ABE founded May 2007) |
| Active course relationships | 4 owner builder courses (ACT, WA, QLD, TAS) + CPD hub |
| Profile Page URL | /experts/dominic-ogburn (no trailing slash) |
| Person schema @id | [https://www.abeeducation.edu.au/experts/dominic-ogburn/#person](https://www.abeeducation.edu.au/experts/dominic-ogburn/#person) |
| LinkedIn | [linkedin.com/in/dominic-ogburn](https://www.linkedin.com/in/dominic-ogburn) |
| Regulatory record | Clean — zero disciplinary actions across all five jurisdictions |

---
# What Changed in v1.14 (30 May 2026)
	- **NSW Owner Builder data-integrity flag closed.** Confirmed by Andrey (30 May 2026): NSW Owner Builder is delivered by **Upskill Institute (RTO 45708)**, ABE enrolment-only, with **Warwick Smith** as the named reviewer. Flag 1 under the Courses Developed URL Map is now marked resolved, closing the v1.13 "still pending" note. NSW OB remains correctly absent from Dominic's `Courses Reviewed` property and URL Map (it is not his course).
	- **Stale slug corrected.** The TAS Owner Builder suggestion in URL-Map Flag 2 now uses the `{state}-owner-builder-course` convention (`/tas-owner-builder-course`), consistent with the rest of the map.
# What Changed in v1.13 (27 May 2026)
	- **QLD Owner Builder corrected to direct ABE delivery.** Removed the "co-delivered with Edway Training (RTO 91401)" attribution from the Credential 5 approvals table, the canonical and legacy approved-language phrasings, and the Courses Developed URL Map. QLD Owner Builder is delivered directly by ABE Education as an approved QBCC owner-builder course provider.
	- **NSW regulator references updated to Building Commission NSW** for builders' CPD criteria, with a historical note that these functions were previously handled by NSW Fair Trading (transferred 1 December 2023). The 2005 NSW Fair Trading Minister's Award (Credential 2) and the NSW Builder's Licence (Credential 1) are unchanged — historical / separate.
	- **WA retained as “LGIRS Form 75”** with a historical note (LGIRS was formerly DEMIRS, renamed 1 July 2025).
	- **Slugs updated** in the Courses Developed URL Map: ACT → `/act-owner-builder-course`, QLD → `/qld-owner-builder-course` — now consistent with the `{state}-owner-builder-course` convention (all owner-builder pages use this pattern).
	- **Builder's Licence schema ****`recognizedBy`**** updated to Building Commission NSW** (NSW builder licensing moved from NSW Fair Trading to Building Commission NSW). The 2005 Minister's Award `recognizedBy` remains NSW Fair Trading (historical).
	- **⚠️ Still pending:** NSW Owner Builder authorship. NSW OB is delivered by Upskill Institute (RTO 45708) and is NOT developed by Dominic. The `Courses Reviewed` property still lists “NSW Owner Builder” and Flag 1 still frames it as unreconciled — both need updating to record Upskill as deliverer and Warwick Smith as the NSW OB reviewer.
# What Changed in v1.12 (April 2026)
	- **WA Owner Builder URL canonicalised to live slug ****`/wa-owner-builder-course`****.** The cross-reference inconsistency surfaced by Warwick Smith's v1.3 page (his URL Map used `/wa-owner-builder-course`; this URL Map used `/owner-builder-wa`) is now resolved — product confirmed Option A: live URL wins, content owner's existing slug is retained to preserve inbound links and search equity.
	- **Three downstream items updated in the same operation:**
		- Courses Developed URL Map row for WA Owner Builder now uses the live slug.
		- Skill reference `page-type-engine.md` §3 (Internal Linking — Owner Builder Hub) updated; new explicit "WA exception" note added to prevent regeneration of the bad URL.
		- Rendered `/experts/dominic-ogburn` profile HTML updated (S5 Courses Developed deep link).
	- **Pattern note for future expert profiles:** WA Owner Builder breaks the `/owner-builder-{state}` naming pattern used by ACT, TAS, QLD. This is the only documented exception. Any URL Map row referencing WA Owner Builder should use `/wa-owner-builder-course`, not `/owner-builder-wa`.
	## What Changed in v1.11 (April 2026)
	- **Page restructured to surface live state at the top.** Two new sections added immediately after the migration note:
		- "📍 Page Status & Flags" — at-a-glance render status (Profile Page URL, Schema version, Headshot, audit-fix status, last verification date) plus the open data-integrity flags from the 20 April 2026 audit (NSW/TAS Owner Builder, CPD granularity).
		- "📊 Quick Reference" — key stats (role, years, credential count, jurisdictions, students trained, active course relationships, profile URL, schema @id, LinkedIn, regulatory record) in table form for quick lookup.
	- **Older changelogs (v1.7 and earlier) compressed** into a single "Earlier versions" archive entry below. Recent versions (v1.10, v1.9, v1.8) retained in full detail.
	- **No content removed or sections moved.** All 16 credentials, the Courses Developed URL Map, Schema Markup Template, Bio Variations, Expert Card Copy, Verification Links, and reference data are unchanged from v1.10. This is a layout-only change to make the page navigable for day-to-day operational use.
	- **Same restructure pattern applied to Warwick Smith's entry (v1.2).** Future expert profiles added to this database should follow the same template: Status & Flags + Quick Reference at top of page, then Executive Summary, Credentials, Course Relationships, Page Generation Resources (bios/cards/pills/schema), then Verification Links and Changelog at the bottom.
	## What Changed in v1.10 (April 2026)
	- **New section added: Courses Developed — URL Map.** Structured table pairing each course name with its live URL, role, and last review date. Supports Flag 4 from the 20 April 2026 pre-production audit — allows automated generation of the "Courses Dominic developed" section on his `/experts/dominic-ogburn` profile page, and the `author` / `reviewedBy` `@id` reference from each course page's schema back to Dominic's Person `@id`.
	- **Pattern codified for all experts.** Same table added to Warwick Smith's Notion entry (v1.1). Every future expert profile added to this database should include an equivalent Courses URL Map table using the column headers `Course name`, `Live URL`, `Course role`, `Last review date`, `Status`.
	- **Data integrity notes surfaced** from cross-checking the `Courses Reviewed` property against the course availability matrix in `page-type-engine.md` §1. Two items require product clarification — see notes directly under the URL Map table.
	- **URL pattern ****`/experts/{name}`**** now codified across the full skill.** `page-type-engine.md` §1 and `quality-gates.md` §6.4 have been updated to match the site and this Notion entry; `quality-gates.md` §6.2 now includes an explicit Expert Profile row that specifies `Last verified: DD Month YYYY` as the correct freshness signal for self-subject expert pages. This closes all four cross-system flags from the 20 April 2026 audit.
	## What Changed in v1.9 (April 2026)
	- **Schema Markup Template updated** to the latest settings per `schema-implementation-guide.md` §9 (Template 6: Expert Profile):
		- `Person` is now wrapped inside a `ProfilePage` as `mainEntity` — required structure for expert-profile pages; enables ProfilePage rich-result eligibility and correct nesting for `@id`-based references from course pages.
		- `affiliation` replaced with `worksFor` — stronger, employment-specific relation; registers Dominic as CEO of ABE Education in Google's Knowledge Graph.
		- `sameAs` converted from a single string to an array — makes it trivial to add future verified profiles (ORCID, Google Scholar, additional socials).
		- `image` now documented in the template (populated from the `Headshot URL` property in this Notion entry) — required for Knowledge Panel / Knowledge Graph eligibility.
		- `dateModified` added at the ProfilePage level — ISO 8601 date, updated on every content change, feeds AI-overview freshness signals.
	- **URL pattern confirmed as ****`/experts/{name}`** across the profile. @id, `url` property, and canonical all use this pattern. Nothing to change — flagging to close the loop on the 20 April 2026 pre-production audit, which noted `page-type-engine.md` §1 and `quality-gates.md` §6.4 still reference the legacy `/trainers/{name}` pattern. Those reference-doc fixes are skill-side, not Notion-side.
	- **Downstream action:** the rendered page at `https://www.abeeducation.edu.au/experts/dominic-ogburn` needs to adopt this template. Tracked in the 20 April 2026 pre-production audit.
	- No credential content changes. All 16 verified credentials, approved-language entries, and bio variations remain unchanged from v1.8.
	## What Changed in v1.8 (April 2026)
	- **Course-development scope clarified.** Previous language in various Approved-language entries read as if Dominic develops every ABE course — incorrect. ABE operates two course-development models:
		- **ABE-delivered courses** (Owner Builder, CPD): **Dominic is the course developer.** Warwick reviews webpage currency. Both named on the course page.
		- **RTO-partner-delivered courses** (White Card, asbestos awareness, silica awareness): course content is developed by the RTO partner — [Blue Dog Training](https://training.gov.au/Organisation/Details/31193) (RTO 31193) for QLD/WA/TAS White Card, or [AlertForce](https://training.gov.au/Organisation/Details/91826) (RTO 91826) for ACT White Card / Asbestos / Silica. Dominic is NOT the course developer for these. Warwick still reviews the ABE-published webpage for currency.
	- New Approved-language entries added to Credential 5 reflecting this distinction.
	- New ❌ entries added for overclaims: "Dominic develops every ABE course", "Dominic developed the White Card course", "All ABE training written by Dominic".
	## Earlier versions (v1.7 and below — compressed archive)
	For brevity, the seven changelog entries from v1.7 down to v1.1 (all April 2026) have been compressed to one-line summaries below. Full historical detail remains in Notion's page version history if needed.
	- **v1.7** — Canonical public-facing 5-jurisdictions phrasing added to Credential 5 approved-language list. The tightened \~60-word sentence is now used verbatim in hub and profile bios.
	- **v1.6** — WA framing corrected from "Approved CPD provider" to "meets LGIRS Form 75 knowledge requirements". WA operates a knowledge-requirement model administered by the Department of Local Government, Industry Regulation and Safety, not provider-approval. Authoritative source: [LGIRS Form 75 PDF](https://www.wa.gov.au/media/50162/download?inline).
	- **v1.5** — Authority URLs added to Credential 5 table for ALL five jurisdictions (previously only NSW had a source link). Each row now carries a verified .[gov.au](http://gov.au) URL alongside the authority name.
	- **v1.4** — NSW framing corrected from "Mandated education provider" (legacy NSW Owner Builder scheme language) to "delivers online CPD training meeting NSW Fair Trading's 12-point CPD criteria". NSW does not operate provider-approval for builders' CPD; it operates self-declaration + audit.
	- **v1.3** — Stuart Brothers Pty Ltd employment added as Credential 16. 11-year career (1980–1991) at one of Australia's oldest construction firms (founded Sydney, 1886), verified via Dominic's published resume + Stuart Bros historical records (ADB, City of Sydney Archives, Trove SMH archives). Extends verifiable career back to March 1980. Credential count: 16 confirmed.
	- **v1.2** — CHOICE Magazine status confirmed ✅ VERIFIED with 4 direct quotes + Kozicki case study. AFR URL confirmed; content pending paywall verification. Credential count: 15 confirmed.
	- **v1.1** — Book title corrected (was "Your Home: 99 Q&As From The Experts"; correct title is *Your Home: Buying, Selling, Renovating, Building*, Allen & Unwin 2004, NLA Bib ID 3067415, ISBN 1865088919). NSW Parliament Hansard (2001) added as Tier 1 credential. Senate Select Committee submission (1995) added. SMH expanded from 1 to 6 confirmed articles (1995–2018). AEES Newsletter 3/2001 added. AFR article (2002) URL confirmed. Access Property Inspections established as earlier business (\~1987). Credential count: 14 confirmed + 2 pending.
---
## Executive Summary
Dominic Ogburn is a licensed NSW builder, published author, NSW government award winner, Standards Australia committee member, and named expert in two separate Australian parliamentary records spanning 1995 to 2001. He spent 11 years (1980–1991) at Stuart Brothers Pty Ltd, one of Australia's oldest construction firms (founded Sydney, 1886), progressing from Trainee Supervisor to Senior Construction Manager on commercial and residential projects valued up to \$11 million. He has been cited in six Sydney Morning Herald articles spanning 1995 to 2018, in the Australian Financial Review, and in the Institution of Engineers Australia's technical newsletter. He developed ABE Education's owner builder training courses, now used by more than 31,000 students across five states.
**Key differentiators:**
- Parliamentary citations at both federal (Senate, 1995) and state (NSW Legislative Council, 2001) level — exceptionally rare for a private training provider
- Standards Australia national committee experience (AS 3740-2010)
- NSW Government Minister's Award recipient (2005)
- Published author — Allen & Unwin, 2004
- Licensed NSW builder (current to June 2027)
- 6 confirmed Sydney Morning Herald articles (1995–2018)
- Construction career from March 1980 — began at Stuart Brothers (builders since 1886), predating ABE Education by 27 years
---
## ✅ Verified Credentials (16)
### 1. NSW Builder's Licence 369417C
- **Status:** CURRENT (expires June 2027)
- **Type:** Contractor Licence
- **Issuing authority:** Building Commission NSW (NSW builder licensing moved from NSW Fair Trading to Building Commission NSW, established 1 December 2023; general consumer matters remain with NSW Fair Trading)
- **Condition:** Only for contracts not requiring insurance under the Home Building Compensation Fund
- **Regulatory Record:** Clean (zero disciplinary actions)
- **Verified:** 24 March 2026 via NSW Fair Trading Licence Verification System
- **Verify link:** [onegov.nsw.gov.au](http://onegov.nsw.gov.au) — search 369417C
**Approved language:**
- ✅ "Licensed NSW builder (Licence 369417C)"
- ✅ "Current NSW Builder's Licence"
- ❌ "Former builder" (licence is CURRENT)
- ❌ "Registered builder" (use "licensed" in NSW context)
---
### 2. 2005 NSW Fair Trading Minister's Award for Consumer Advocacy
- **Year:** 2005
- **Awarding Authority:** Hon. Diane Beamer MP, Minister for Fair Trading (NSW)
- **Category:** Consumer Advocacy
- **Citation:** "Valuable contribution to raising awareness of consumer rights among the people of New South Wales"
- **Verified:** 24 March 2026 via physical award certificate (photo evidence)
**Approved language:**
- ✅ "2005 NSW Fair Trading Minister's Award for Consumer Advocacy"
- ✅ "NSW government award winner"
- ❌ "Award-winning builder" (too vague)
- ❌ "Multiple awards" (only one verified government award)
---
### 3. Standards Australia BD-038 Committee Member
- **Committee:** BD-038 Wet areas in buildings
- **Standard Developed:** AS 3740-2010 (Waterproofing of domestic wet areas)
- **Role:** Committee Member
- **Certificate:** Presented 5 November 2010, signed by John Castles AM (Chairman), Colin Blair (CEO)
- **Verified:** 28 March 2026 via physical Certificate of Appreciation (IMG_6203.jpeg)
**Approved language:**
- ✅ "Standards Australia BD-038 Committee Member"
- ✅ "Member of Standards Australia committee that developed AS 3740-2010"
- ❌ "Chairman" or "Led" (he was a member, not chair)
- ❌ "Author of AS 3740" (committee developed it collectively)
---
### 4. Published Author — Allen & Unwin (2004)
- **Title:** *Your Home: Buying, Selling, Renovating, Building*
- **Co-author:** Harvey Grennan (also co-authored the 2001 SMH "Towers of Trouble" investigation)
- **Publisher:** Allen & Unwin, Crows Nest NSW (major Australian publisher, 15× Publisher of the Year)
- **Year:** 2004
- **ISBN:** 1865088919
- **NLA Bib ID:** 3067415
- **Verified:** April 2026 via NLA catalogue record + Google Play Books listing
- **NLA link:** [catalogue.nla.gov.au/catalog/3067415](http://catalogue.nla.gov.au/catalog/3067415)
> ⚠️ **CORRECTION from v1.0:** Previous version listed the title as "Your Home: 99 Q&As From The Experts" — this was incorrect. Correct title confirmed by NLA catalogue.
**Approved language:**
- ✅ "Co-author of *Your Home: Buying, Selling, Renovating, Building* (Allen & Unwin, 2004)"
- ✅ "Published author with major Australian publisher"
- ❌ "Author of multiple books" (only one verified)
- ❌ "Bestselling author" (no sales data)
---
### 5. Government Approvals — 5 Jurisdictions
| State | Authority | Type | Status |
|---|---|---|---|
| WA | [LGIRS — Form 75](https://www.wa.gov.au/media/50162/download?inline) (Department of Local Government, Industry Regulation and Safety — LGIRS, formerly DEMIRS, the Department of Energy, Mines, Industry Regulation and Safety, renamed 1 July 2025) | Meets the owner-builder knowledge requirements of LGIRS Form 75: Approval — Owner-builder. WA operates a knowledge-requirement model (not provider approval); any course that satisfies Form 75 criteria is acceptable. | Current |
| TAS | [CBOS](https://www.cbos.tas.gov.au/topics/licensing-and-registration/licensed-occupations/owner-builder-permit/training-courses) | Approved owner builder and CPD provider | Current |
| ACT | [Access Canberra](https://www.accesscanberra.act.gov.au/) | Approved owner-builder course provider | Current |
| QLD | [QBCC](https://www.qbcc.qld.gov.au/home-owner-hub/owner-build/required-courses-owner-builders) | Delivered directly by ABE Education — approved QBCC owner-builder course provider | Current |
| NSW | Building Commission NSW (building & CPD functions previously handled by NSW Fair Trading; transferred 1 December 2023 — general consumer matters remain with NSW Fair Trading) | Delivers online CPD training for builders and swimming pool builders — meets Building Commission NSW's CPD criteria (12 points/yr, 8 topic areas). NSW operates self-declaration + audit; no provider-approval regime for builders' CPD. | Current |

**Approved language:**
- ✅ "Government-approved training provider across 5 Australian jurisdictions"
- ✅ **Canonical tightened phrasing (use verbatim on hub and profile bios):** "Since 2007, as CEO of ABE Education, Dominic has developed owner builder and CPD training completed by 31,000+ students across five jurisdictions — approved by Access Canberra (ACT) and CBOS (Tasmania), meeting LGIRS Form 75 requirements in WA, delivered directly by ABE Education as an approved QBCC provider in Queensland, and meeting Building Commission NSW's 12-point CPD criteria for builders and swimming pool builders (these CPD functions were formerly administered by NSW Fair Trading)."
- ✅ **Scope boundary** (use on hub S6 / About pages / course attribution): "Owner builder and CPD courses ABE delivers directly are developed by Dominic Ogburn. White Card and asbestos awareness are delivered by our RTO partners — Blue Dog Training (RTO 31193) or AlertForce (RTO 91826). Every ABE-published course page is independently reviewed for currency by Warwick Smith."
- ✅ "Course developer for ABE Education's owner builder and CPD courses" (correct narrow scope)
- ✅ "CEO of ABE Education — owner builder and CPD training" (correct narrow scope)
- ❌ "Dominic develops every ABE course" (wrong — RTO-partner courses developed by the RTO partner)
- ❌ "Dominic developed the White Card course" (wrong — White Card developed by Blue Dog Training QLD/WA/TAS or AlertForce ACT)
- ❌ "All ABE training written by Dominic Ogburn" (wrong — scope is owner builder + CPD only)
- ❌ "Dominic Ogburn develops ABE's entire course catalogue" (wrong — same reason)
- ✅ "Approved by Access Canberra in ACT and CBOS in Tasmania; meeting LGIRS Form 75 knowledge requirements in WA; delivered directly by ABE Education as an approved QBCC provider in QLD; NSW CPD meets Building Commission NSW's CPD criteria" (legacy long form — acceptable but prefer the canonical tightened version above)
- ✅ "ABE's WA Owner Builder course meets the owner-builder knowledge requirements of LGIRS Form 75"
- ❌ "LGIRS-approved" or "WA-government-approved CPD provider" (WA has no provider-approval regime for owner-builder; uses knowledge-requirement model via Form 75)
- ✅ "CPD training for NSW builders and swimming pool builders meeting Building Commission NSW's 12-point annual requirement (formerly NSW Fair Trading)"
- ✅ "Covers Building Commission NSW's 8 CPD topic areas: technical, sustainability, compliance, communication, dispute resolution, contracts, safety, business management"
- ❌ "Nationally accredited" (ABE is not an RTO)
- ❌ "Government-certified" (use "approved" or "listed")
- ❌ "Building Commission NSW-approved" or "NSW Fair Trading-approved CPD provider" (no such approval regime exists for builders' CPD in NSW — operates on self-declaration + audit)
- ❌ "Mandated education provider" for NSW CPD (this was legacy NSW Owner Builder scheme language; does not apply to CPD)
---
### 6. Cited in NSW Parliament Hansard (2001)
- **Record:** NSW Legislative Council Hansard, 27 March 2001
- **Debate:** HIH Insurance Adjournment Debate (Adjournment S.O. 13)
- **Citations:** Two separate references in the same debate
	- Page 1: Reverend the Hon. F.J. Nile MLC names "Sydney building consultant Mr Dominic Ogburn" directly
	- Page 4: Hon. I. Cohen MLC quotes an SMH article by Linda Morris (urban affairs editor) that cites Dominic on insurance coverage gaps in apartment buildings
- **Verified:** April 2026 via PDF of Hansard document
- **Tier:** Primary government record — highest-tier external citation available
**Approved language:**
- ✅ "Cited by name in the NSW Legislative Council Hansard"
- ✅ "Referenced in NSW Parliament as a building industry expert"
- ✅ "NSW Parliamentary citation (Hansard, 27 March 2001)"
- ❌ "Testified before parliament" (he was cited, not a direct witness in this instance)
---
### 7. Senate Select Committee Submission — Aircraft Noise in Sydney (1995)
- **Committee:** Senate Select Committee on Aircraft Noise in Sydney
- **Volume:** Volume 17, Tabled Papers HSTP014290, 1993–95
- **Submitter:** Access Property Inspections — Dominic J. Ogburn, 73 Westbourne Street, Petersham NSW 2049
- **Content:** Property values pilot study — 74 residential properties, post-opening of Sydney Airport's third runway (November 1994)
- **Finding:** At least 15% property value devaluation documented
- **Validation:** McLennan Steege & Associates (registered property valuers) + Professor Michael Poulsen, Macquarie University
- **Media outcome:** SMH article, 23 March 1995
- **Verified:** April 2026 via PDF (182 pages)
- **Parliament link:** [parlinfo.aph.gov.au](http://parlinfo.aph.gov.au) — HSTP014290_1993-95
**Note:** Establishes Access Property Inspections was operating \~7 years as of 1995, placing the business origin at approximately 1987–88.
**Approved language:**
- ✅ "Submitted expert evidence to the Australian Senate Select Committee on Aircraft Noise in Sydney (1995)"
- ❌ "Called to give evidence" (he submitted written evidence, not oral testimony)
---
### 8. Sydney Morning Herald — 6 Confirmed Articles (1995–2018)
- **23 March 1995** — Property values and aircraft noise. Confirmed via Senate tabled papers. No online URL.
- **14 September 2009** — [The race against time](https://www.smh.com.au/lifestyle/the-race-against-time-20090914-gdtq2n.html)
- **12 September 2010** — [New rules to slash owner-builder ranks](https://www.smh.com.au/national/nsw/new-rules-to-slash-ownerbuilder-ranks-20100912-156zo.html)
- **22 October 2010** — [Calls for certifiers to get house in order](https://www.smh.com.au/national/calls-for-certifiers-to-get-house-in-order-20101022-16xxf.html)
- **3 June 2016** — [No safety wage harness under China-Australia free trade agreement](https://www.smh.com.au/business/workplace/no-safety-wage-harness-under-china-australia-free-trade-agreement-20160603-gpakxm.html)
- **28 December 2018** — [Towers of trouble](https://www.smh.com.au/national/nsw/towers-of-trouble-20181228-p50ol6.html)
> ⚠️ **CORRECTION from v1.0:** Previous version listed one SMH article (2018). There are 6 confirmed articles spanning 1995–2018.
**The "Towers of Trouble" investigation (2001):** Dominic was the building inspector whose 16-page report on Regis Towers (554 apartments, Castlereagh/Pitt/Campbell Streets, Sydney) triggered Sydney City Council to inspect 15 units — finding 14 in breach of the Building Code of Australia. The investigation contributed directly to calls for a parliamentary inquiry into NSW building standards.
**Approved language:**
- ✅ "Featured in the Sydney Morning Herald across 6 articles (1995–2018)"
- ❌ "Regular Sydney Morning Herald contributor" (he was cited/featured, not a staff writer)
---
### 9. AEES Newsletter 3/2001 — Institution of Engineers Australia
- **Publication:** Australian Earthquake Engineering Society Newsletter, issue 3/2001
- **Publisher:** AEES — Technical Society of the Institution of Engineers Australia (IEAust), affiliated with IAEE
- **Content:** Reproduced the SMH "Towers of Trouble" article in full under the "Nuggets" section (pp. 2–5)
- **Verified:** April 2026 via PDF (8 pages)
- **PDF link:** [aees.org.au/wp-content/uploads/2013/11/AEES_2001_3.pdf](http://aees.org.au/wp-content/uploads/2013/11/AEES_2001_3.pdf)
**Approved language:**
- ✅ "Referenced in the Institution of Engineers Australia's technical newsletter (AEES, 2001)"
- ❌ "AEES member" (referenced in, not a member)
---
### 10. Experience — 40+ Years
- 1980–1991: Stuart Brothers Pty Ltd (see Credential 16) — Trainee Supervisor / QS / Estimator → Senior Construction Manager
- \~1987–88: Access Property Inspections founded (Petersham NSW) — operated concurrently with later Stuart Bros years
- 2001: "Towers of Trouble" Regis Towers inspection
- 2004: Book published (Allen & Unwin)
- 2005: Minister's Award
- 2007–present: ABE Education (CEO / Course Developer)
**Approved language:**
- ✅ "40+ years Australian construction and building compliance experience"
- ❌ "50 years" (not verified)
---
### 11. Clean Regulatory Record
- **NSW Fair Trading:** Zero disciplinary actions
- **Building Services Board:** No complaints
- **Verified:** 24 March 2026
---
### 12. Training Impact — 31,000+ Students
- **ABE Education founded:** May 2007
- **Students trained:** 31,000+ (as of April 2026)
- **Jurisdictions:** NSW, TAS, ACT, WA, QLD
- **Source:** ABE Education LearnWorlds LMS enrolment records
---
### 13. Australian Financial Review — Referenced Expert (2002)
- **Article:** "Big apartments and big problems"
- **Date:** 13 April 2002
- **URL:** [afr.com](http://afr.com)[ — Big apartments and big problems](https://www.afr.com/companies/infrastructure/big-apartments-and-big-problems-20020413-j796c)
- **Status:** ✅ URL confirmed · ⚠️ Content pending manual verification (paywall)
> ⚠️ Do not publish until content is manually verified.
---
### 14. Access Property Inspections — Professional Practice (\~1987–2007)
- **Business name:** Access Property Inspections
- **Address:** 73 Westbourne Street, Petersham NSW 2049
- **Speciality:** Property and building inspection, inner west Sydney
- **Operating period:** \~1987–88 to approximately 2007
- **Verified:** April 2026 via Senate Select Committee tabled papers
Establishes that Dominic's professional practice predates ABE Education by approximately 20 years.
---
### 15. CHOICE Magazine — Featured Expert (2011) ✅
- **Publication:** CHOICE Magazine
- **Article:** "House energy efficiency ratings – energy saving"
- **URL:** [choice.com.au](http://choice.com.au)[ — House energy efficiency ratings](https://www.choice.com.au/home-improvement/energy-saving/reducing-your-carbon-footprint/articles/house-energy-efficiency-ratings)
- **Date:** 2011 investigation, article still live (last updated November 2025)
- **How Dominic is described:** "Building consultant and training specialist with more than 25 years' experience in the building industry. He's also a NSW Fair Trading Award-winner for advancing consumer protection in the industry."
- **Verified:** 19 July 2026 via Google search snippet
**Dominic's direct quotes:**
- "The current regulation of building energy ratings for new homes is pathetically inadequate."
- "Basically, the building industry is left to self-regulate when it comes to installing energy-savings measures. It's a conflict of interest for some developers who want to employ cost-cutting measures when completing a build."
- "At the end of the day, consumers are paying a premium for a product that is not delivered as specified."
- "Energy assessors typically work off the design, so you need to check whether they have the qualifications to perform post-build inspections properly."
**Case study:** Gillian and Stephen Kozicki hired Dominic to audit a house in north-western Sydney. He found more than \$100,000 worth of additional work required to meet minimum government building and energy compliance, despite the property being certified for occupation. The vendor then rescinded the sale.
**Approved language:**
- ✅ "Featured expert in CHOICE Magazine"
- ✅ "Quoted in CHOICE's investigation into house energy rating standards (2011)"
- ❌ "CHOICE endorsed" (featured/quoted, not endorsed)
- ❌ "CHOICE recommended" (same reason)
---
### 16. Stuart Brothers Pty Ltd — 11 Years (1980–1991)
- **Employer:** Stuart Brothers Pty Ltd (builders) — founded in Sydney in 1886 by William Stuart (1860–1940) and his brother James. One of the oldest construction firms in Australia.
- **Roles held by Dominic:**
	- Trainee Supervisor, Q.S & Estimator (March 1980 – August 1985)
	- Senior Construction Manager (August 1985 – March 1991)
- **Scope as Senior Construction Manager:** Total responsibility for letting and administering contracts · construction programming, cost controlling and variation reporting · litigation of claims up to \$2M · client/architect liaison on lump-sum and cost-plus commercial and residential projects · formal work-based training in quantity surveying and construction estimating.
- **Projects completed as Construction Manager for Stuart Bros:**
	- The Wintergarden, Rose Bay — \$7.5M luxury residential development
	- 50 Miller Street, North Sydney — two-stage refurbishment of 11-storey commercial building, \$11M
	- The Glebe Estate — Design & Construct of 22 dilapidated houses for NSW Dept of Housing, \$2.5M
	- 652–662 George Street, The Rocks — restoration for Sydney Cove Redevelopment Authority, \$0.45M
	- Commonwealth Bank refurbishments — including development and implementation of CBA's initial Auto Bank Service
	- State Bank ATM service rollout — similar scope to the CBA Auto Bank Service work
- **Historical significance of employer:** Stuart Bros was founded in Sydney in 1886. Founder William Stuart served as president of the Master Builders' Association (1896) and was a founder and vice-president of the Employers' Federation of NSW. At its peak the firm employed 1,000 men, ran its own quarries and joinery works, and built the offices of the Sydney Morning Herald, the Evening News, the Colonial Sugar Refining Co., the Commercial Banking Co. of Sydney, along with numerous woolstores, theatres, and two Sydney Showground pavilions.
- **Verified:** 15 April 2026 via Dominic's published resume
**Approved language:**
- ✅ "Spent 11 years (1980–1991) at Stuart Brothers Pty Ltd, one of Australia's oldest construction firms"
- ✅ "Trained at Stuart Brothers, Sydney builders since 1886"
- ✅ "Senior Construction Manager at Stuart Brothers on projects up to \$11 million"
- ✅ "Oversaw commercial and residential projects for Stuart Brothers including 50 Miller Street North Sydney and The Wintergarden Rose Bay"
- ❌ "Founded Stuart Brothers" (founded by William and James Stuart in 1886)
- ❌ "CEO of Stuart Brothers" (role was Senior Construction Manager)
- ❌ "Partner at Stuart Brothers" (employee, not partner)
**Verification sources:**
- Primary (employment record): [Dominic Ogburn's resume — ](https://accesspropertyservices.com.au/resume/)[accesspropertyservices.com.au/resume/](http://accesspropertyservices.com.au/resume/)
- Employer founder biography: [William Stuart — Australian Dictionary of Biography](https://adb.anu.edu.au/biography/stuart-william-8708)
- Employer archival records: [Stuart Bros: project managers and builders, established 1886 — City of Sydney Archives](https://archives.cityofsydney.nsw.gov.au/nodes/view/1752900)
- Employer historical correspondence: [Letter: Stuart Bros, Builders and Contractors, Campbell St Camperdown to TC — City of Sydney Archives](https://archives.cityofsydney.nsw.gov.au/nodes/view/1560097)
- Firm history (co-founder): [Death of Mr James Stuart, Well-Known Builder — SMH, 22 June 1914 (via Trove)](https://trove.nla.gov.au/newspaper/article/15517840)
- Firm history (incorporation): [Stuart Bros., Ltd. — SMH, 8 May 1930 (via Trove)](https://trove.nla.gov.au/newspaper/article/16704091)
- Context (oldest Australian companies): [List of oldest companies in Australia — Wikipedia](https://en.wikipedia.org/wiki/List_of_oldest_companies_in_Australia)
---
## Courses Developed — URL Map
**Purpose:** Structured course-name → URL mapping to support automated generation of the "Courses Dominic developed" section on his `/experts/dominic-ogburn` profile page, and the `author` / `reviewedBy` `@id` reference from each course page's Person schema back to Dominic's Person `@id`.
**Pattern:** Every expert profile in this database carries an equivalent table. Paired with the `Courses Reviewed` multi-select property (course names only), this table provides the URL pairing that the property cannot store natively. Column schema: `Course name`, `Live URL`, `Course role`, `Last review date`, `Status`.
| Course name | Live URL | Course role | Last review date | Status |
|---|---|---|---|---|
| ACT Owner Builder | [/act-owner-builder-course](https://www.abeeducation.edu.au/act-owner-builder-course) | Course developer | 19 July 2026 | ✅ Live |
| WA Owner Builder | [/wa-owner-builder-course](https://www.abeeducation.edu.au/wa-owner-builder-course) | Course developer — meets LGIRS Form 75 knowledge requirements. URL note: standard `{state}-owner-builder-course` convention — all owner-builder pages now use this slug pattern. | 19 July 2026 | ✅ Live |
| QLD Owner Builder | [/qld-owner-builder-course](https://www.abeeducation.edu.au/qld-owner-builder-course) | Course developer · delivered directly by ABE Education as an approved QBCC owner-builder course provider | 19 July 2026 | ✅ Live |
| CPD Courses (hub + state variants) | Hub: [/cpd](https://www.abeeducation.edu.au/cpd) · state: [/cpd-nsw](https://www.abeeducation.edu.au/cpd-nsw), [/cpd-tas](https://www.abeeducation.edu.au/cpd-tas), [/cpd-wa](https://www.abeeducation.edu.au/cpd-wa) | Course developer — meets NSW Fair Trading CPD criteria (NSW) and CBOS requirements (TAS) | 19 July 2026 | ✅ Live |

**Note on "Last review date" for course developers:** For Dominic (course developer), this column tracks when the developer-attribution relationship was last verified against the live course page and the current `date:Last Verified:start` property on this Notion entry. For Warwick (compliance & currency reviewer), the same column tracks when the most recent compliance review was completed. The column schema is consistent across expert profiles, but the semantics are role-specific.
**Data integrity flags — require product clarification:**
1. **NSW Owner Builder is in ****`Courses Reviewed`**** but not in this URL Map.** The `page-type-engine.md` §1 course availability matrix lists NSW Owner Builder as "❌ Not offered" by ABE. Two possible resolutions:
	- the availability matrix is stale (ABE now offers NSW Owner Builder training → a live URL and landing page need to exist, and the matrix should be corrected), **or**
	- the `Courses Reviewed` multi-select is stale (NSW Owner Builder should be removed from Dominic's entry).
	✅ **Resolved 30 May 2026.** NSW Owner Builder is a nationally recognised, RTO-partnered course delivered by Upskill Institute (RTO 45708); Warwick Smith is the named reviewer. It is correctly excluded from Dominic's `Courses Reviewed` and from this URL Map — no NSW Owner Builder link should render on Dominic's profile, because it is not his course.
2. **TAS Owner Builder is missing from ****`Courses Reviewed`****.** The matrix lists TAS Owner Builder as "✅ Offered" (provider: ABE Education direct, state-approved by CBOS). Dominic's Credential 5 table also confirms TAS approval. The scope-boundary language (*"Owner builder and CPD courses ABE delivers directly are developed by Dominic Ogburn"*) implies Dominic developed it. If confirmed, add **TAS Owner Builder** to the `Courses Reviewed` multi-select and a new row to this URL Map table (`/tas-owner-builder-course`, Course developer — CBOS-approved, 19 July 2026).
3. **CPD state specificity.** The `Courses Reviewed` property lists "CPD Courses" as a single item, but live CPD pages exist per state/trade (NSW CPD Building, TAS CPD Building/Plumbing/Electrical, WA CPD Real Estate per the availability matrix). The row above collapses these into one. A future, more granular version should list each state/trade CPD page as a separate row so that `author` / `reviewedBy` `@id` references can be generated per course page rather than at hub level.
**Downstream use:** Anything automating content generation for `/experts/dominic-ogburn` should read this table, not the raw `Courses Reviewed` multi-select. The multi-select is insufficient on its own because it carries no URL, role, or status information.
---
## Expert Card Copy (for Course Pages)
**Name:** Dominic Ogburn
**Title:** Course Developer — CEO, ABE Education
**Credentials line:** Licensed NSW Builder (Lic. 369417C) · NSW Government Award Winner · 40+ Years Experience
**Supporting line:** Parliamentary-cited building expert. Developed ABE's owner builder and CPD courses, completed by 31,000+ students.
**Date line:** Course developed by Dominic Ogburn · ABE Education
### Credential pills (for hero/skill pill sections)
- Licensed NSW Builder
- Minister's Award 2005
- Standards Australia BD-038
- Published Author — Allen & Unwin
- Parliamentary Citation
- 40+ Years Experience
- 31,000+ Students Trained
- 5 Government Jurisdictions
### Inline attribution (within course content body)
> This course was developed by Dominic Ogburn, a licensed NSW builder (Licence 369417C), 2005 NSW Fair Trading Minister's Award winner, and Standards Australia committee member with over 40 years in Australian residential construction.
### Reviewer attribution variant (when Dominic reviews rather than develops)
> Content reviewed by Dominic Ogburn, licensed NSW builder and CEO of ABE Education, for factual accuracy and compliance with current Australian construction regulations.
---
## Bio Variations
### Ultra-Short (50 words)
Dominic Ogburn is a licensed NSW builder, NSW government award winner, and Standards Australia committee member with over 40 years in Australian construction — beginning at Stuart Brothers (Sydney builders since 1886). He has been cited in NSW Parliament and six SMH articles. As CEO of ABE Education, he has trained 31,000+ students.
### Short (100 words)
Dominic Ogburn is a licensed NSW builder (Licence 369417C), published author, and 2005 NSW Fair Trading Minister's Award winner with over 40 years in Australian residential construction — beginning his career at Stuart Brothers Pty Ltd (Sydney builders, founded 1886), where he rose to Senior Construction Manager over 11 years (1980–1991). He served on Standards Australia committee BD-038 (AS 3740-2010), has been cited by name in the NSW Legislative Council Hansard, and has submitted expert evidence to a Senate Select Committee. Co-author of *Your Home: Buying, Selling, Renovating, Building* (Allen & Unwin, 2004), he is featured across six Sydney Morning Herald articles (1995–2018). As CEO of ABE Education since 2007, Dominic has trained over 31,000 students.
### Medium (200 words)
Dominic Ogburn is a licensed NSW builder, published author, NSW Minister's Award winner, and Standards Australia committee member with over 40 years in Australian residential construction and building compliance.
Dominic holds a current NSW Builder's Licence (369417C) and received the 2005 NSW Fair Trading Minister's Award for Consumer Advocacy from the Hon. Diane Beamer MP. He served on Standards Australia committee BD-038, contributing to AS 3740-2010 (Waterproofing of domestic wet areas). Operating his building and property inspection practice Access Property Inspections from approximately 1987, he submitted expert evidence to the Senate Select Committee on Aircraft Noise in Sydney in 1995, and in 2001 was cited by name in the NSW Legislative Council Hansard during a parliamentary debate on the Home Warranty Insurance Scheme.
Dominic is the co-author of *Your Home: Buying, Selling, Renovating, Building* (Allen & Unwin, 2004) and has been cited as a construction industry authority across six Sydney Morning Herald articles spanning 1995 to 2018. His 16-page inspection report on Regis Towers contributed directly to calls for a NSW parliamentary inquiry into building standards. As CEO of ABE Education since 2007, Dominic has trained over 31,000 students across owner builder and CPD courses, with government approvals in NSW, ACT, TAS, QLD, and WA.
### Long (400 words)
Dominic Ogburn is one of Australia's most credentialled residential construction educators — a licensed NSW builder, published author, NSW government award winner, Standards Australia committee member, and named expert in two separate Australian parliamentary records spanning 1995 to 2001.
Dominic holds a current NSW Builder's Licence (Licence 369417C, valid to June 2027) and received the 2005 NSW Fair Trading Minister's Award for Consumer Advocacy from the Hon. Diane Beamer MP, recognising his work helping homeowners navigate the building process safely and lawfully. He served as a member of Standards Australia Technical Committee BD-038, contributing to the revision of AS 3740-2010 — the national standard for waterproofing of domestic wet areas. He co-authored *Your Home: Buying, Selling, Renovating, Building* (with Harvey Grennan, Allen & Unwin, 2004, ISBN 1865088919), a consumer-focused guide to residential building held in public library collections nationally.
Dominic's construction career began in March 1980 at Stuart Brothers Pty Ltd — one of the oldest construction firms in Australia, founded in Sydney in 1886 by William and James Stuart. Over 11 years he progressed from Trainee Supervisor, Quantity Surveyor and Estimator to Senior Construction Manager, overseeing commercial and residential projects valued up to \$11 million. His Stuart Bros project portfolio included the \$11M two-stage refurbishment of 50 Miller Street in North Sydney, the \$7.5M Wintergarden luxury residential development in Rose Bay, the Design & Construct delivery of 22 houses on The Glebe Estate for the NSW Department of Housing, and the restoration of 652–662 George Street in The Rocks for the Sydney Cove Redevelopment Authority. He also delivered the initial rollouts of the Commonwealth Bank's Auto Bank Service and the State Bank ATM network.
Alongside the later Stuart Bros years, Dominic's professional practice in property and building inspection began approximately 1987, through his Petersham-based firm Access Property Inspections. In 1995, he submitted formal expert evidence to the Australian Senate Select Committee on Aircraft Noise in Sydney, documenting at least 15% property value devaluation from the opening of Sydney Airport's third runway — a study validated by registered valuers McLennan Steege & Associates and Macquarie University. That submission directly led to a Sydney Morning Herald article on 23 March 1995. In 2001, he was cited by name in the NSW Legislative Council Hansard by Reverend the Hon. F.J. Nile MLC during a parliamentary debate on the Home Warranty Insurance Scheme.
In the same year, Dominic's 16-page inspection report on Regis Towers — Sydney's 554-unit Castlereagh/Pitt/Campbell Street complex — concluded that "reasonable habitation of the unit would be extremely difficult." Sydney City Council subsequently inspected 15 units, finding 14 in breach of the Building Code of Australia. The resulting SMH "Towers of Trouble" investigation contributed directly to calls for a parliamentary inquiry into NSW building standards. The investigation was reproduced in full in the Institution of Engineers Australia's AEES Newsletter 3/2001.
Dominic has been cited as a construction industry authority across six Sydney Morning Herald articles spanning 1995 to 2018, covering property values, owner builder legislation reform, building certification, construction safety, and residential building quality. As CEO of ABE Education since its founding in May 2007, he has developed owner builder and CPD courses now completed by more than 31,000 students, with government approvals in NSW, ACT, Tasmania, Queensland, and Western Australia. He maintains a clean regulatory record with no adverse findings from any Australian state regulator.
---
## Credential Usage by Course Type
| Credential | Owner-Builder | White Card | CPD Real Estate | Construction CPD |
|---|---|---|---|---|
| Licensed Builder | ✅ | ✅ | ⚠️ | ✅ |
| Minister's Award | ✅ | ⚠️ | ✅ | ✅ |
| Standards Australia | ✅ | ⚠️ | ❌ | ✅ |
| Published Author | ✅ | ⚠️ | ⚠️ | ✅ |
| Parliamentary citations | ✅ | ⚠️ | ✅ | ✅ |
| SMH / AFR coverage | ✅ | ⚠️ | ✅ | ✅ |
| 40+ Years | ✅ | ✅ | ⚠️ | ✅ |
| 5 Jurisdictions | ✅ | ✅ | ✅ | ✅ |

✅ = Always include · ⚠️ = Include when space allows · ❌ = Not relevant
---
## What NOT to Claim ⚠️
- ❌ ABE Education is an RTO (RTO 91794 was WITHDRAWN)
- ❌ Current TAE qualification (TAA40104 is superseded)
- ❌ Building Consultant Licence BC 359 (not independently verified)
- ❌ Multiple government awards (only ONE verified)
- ❌ "Authored AS 3740" (committee MEMBER, not sole author)
- ❌ "CHOICE endorsed" (featured, not endorsed)
- ❌ University degrees (not verified)
- ❌ "Testified before parliament" (cited/submitted evidence — not oral testimony)
- ❌ *Your Home: 99 Q&As From The Experts* (wrong title — see v1.1 correction)
---
## Schema Markup Template
**Schema version:** v1.9 — ProfilePage wrapper + `worksFor` · per `schema-implementation-guide.md` §9 (Template 6: Expert Profile)
**Last updated:** 20 April 2026
**URL pattern:** `/experts/{name}` (no trailing slash)
```json
{
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "dateModified": "2026-04-20",
  "mainEntity": {
    "@type": "Person",
    "@id": "https://www.abeeducation.edu.au/experts/dominic-ogburn/#person",
    "name": "Dominic Ogburn",
    "jobTitle": "CEO and Course Developer — ABE Education",
    "image": "https://pub-e001e9a575874f24a0bcd7082a45cdbc.r2.dev/Dominic_Ogburn_portrait.webp",
    "description": "Licensed NSW builder, published author, and 2005 NSW Fair Trading Minister's Award winner with over 40 years in Australian residential construction. Developer of ABE Education's owner builder and CPD courses, completed by more than 31,000 students.",
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Licence",
        "name": "NSW Builder's Licence 369417C",
        "recognizedBy": {
          "@type": "GovernmentOrganization",
          "name": "Building Commission NSW",
          "url": "https://www.nsw.gov.au/departments-and-agencies/building-commission"
        },
        "validUntil": "2027-06"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Award",
        "name": "2005 NSW Fair Trading Minister's Award for Consumer Advocacy",
        "recognizedBy": {
          "@type": "GovernmentOrganization",
          "name": "NSW Fair Trading",
          "url": "https://www.fairtrading.nsw.gov.au"
        }
      }
    ],
    "worksFor": {
      "@type": "EducationalOrganization",
      "name": "ABE Education",
      "url": "https://www.abeeducation.edu.au"
    },
    "sameAs": [
      "https://www.linkedin.com/in/dominic-ogburn"
    ],
    "url": "https://www.abeeducation.edu.au/experts/dominic-ogburn",
    "knowsAbout": [
      "Owner builder regulations",
      "Residential construction compliance",
      "Building Code of Australia",
      "Waterproofing standards (AS 3740)",
      "Consumer protection in construction",
      "NSW building legislation"
    ]
  }
}
```
**Implementation notes:**
- Inject in the LearnWorlds **logged-out** custom-code tab — Googlebot does not see logged-in content.
- Always pair with a separate `BreadcrumbList` JSON-LD block (Home › Experts › \{Name\}).
- `@id` on the inner `Person` is the stable reference target. Course pages reference via `reviewedBy: { "@id": "https://www.abeeducation.edu.au/experts/dominic-ogburn/#person" }` without duplicating the full Person object.
- `dateModified` is ISO 8601 (`YYYY-MM-DD`). Update on every content change to feed AI-overview freshness signals.
- `image` must match the `Headshot URL` property in this Notion entry. If that field is empty, flag as `📋 MISSING RESOURCE — HIGH` and do not publish.
- `sameAs` is an array — add ORCID, Google Scholar, or additional verified profiles as separate strings when available.
- `knowsAbout` is a plain string array today. Future optimisation (per `schema-org-opportunities.md` Phase 3): promote to `DefinedTerm` entries linked to a `DefinedTermSet` for richer AI-crawler context.
**Phase 3 schema opportunities** (not required — flagged by the 20 April 2026 audit as future enhancements):
- `alumniOf` referencing Stuart Brothers Pty Ltd and Standards Australia BD-038 — deepens entity graph.
- `award` property listing the 2005 Minister's Award alongside `hasCredential` — redundant but explicit, some crawlers prefer it.
- `hasOccupation` with a dedicated `Occupation` schema type for "Builder" (ANZSCO 133111) — links to `schema-org-opportunities.md` Phase 3 implementation.
---
## Verification Links — Quick Reference
| Credential | Source | Verified |
|---|---|---|
| Builder's Licence 369417C | [NSW Fair Trading Licence Check](https://www.onegov.nsw.gov.au/publicregister/#/publicregister/search/Security) | 24 Mar 2026 |
| Minister's Award 2005 | Physical certificate (IMG evidence) | 24 Mar 2026 |
| Standards Australia BD-038 | Physical Certificate of Appreciation (IMG_6203.jpeg) | 28 Mar 2026 |
| Book — NLA 3067415 | [NLA catalogue](https://catalogue.nla.gov.au/catalog/3067415)  • Google Play | Apr 2026 |
| Government approvals ×5 | State regulator records | Mar 2026 |
| NSW Hansard (2001) | PDF — full text in context | Apr 2026 |
| Senate submission (1995) | PDF — 182pp, full text in context | Apr 2026 |
| SMH ×6 articles (1995–2018) | URLs confirmed; 1995 via Senate appendix | Apr 2026 |
| AEES Newsletter 3/2001 | [PDF direct download](https://aees.org.au/wp-content/uploads/2013/11/AEES_2001_3.pdf) | Apr 2026 |
| AFR article (2002) | URL confirmed; content behind paywall — pending | Apr 2026 |
| CHOICE Magazine (2011) | [CHOICE article](https://www.choice.com.au/home-improvement/energy-saving/reducing-your-carbon-footprint/articles/house-energy-efficiency-ratings) — live Nov 2025 | 14 Apr 2026 |
| Stuart Brothers 1980–1991 (11 yrs) | [Dominic's resume](https://accesspropertyservices.com.au/resume/) · [William Stuart ADB](https://adb.anu.edu.au/biography/stuart-william-8708) · [Stuart Bros City of Sydney Archives](https://archives.cityofsydney.nsw.gov.au/nodes/view/1752900) · [SMH 1914 Trove](https://trove.nla.gov.au/newspaper/article/15517840) · [SMH 1930 Trove](https://trove.nla.gov.au/newspaper/article/16704091) | 15 Apr 2026 |
| Clean regulatory record | NSW Fair Trading — zero disciplinary actions | 24 Mar 2026 |
| 31,000+ students | ABE Education LearnWorlds LMS (internal) | Apr 2026 |
| LinkedIn | [linkedin.com/in/dominic-ogburn](https://www.linkedin.com/in/dominic-ogburn) | — |

---
*Document Version: 1.14 · Last Updated: 30 May 2026 · Next Review: April 2027 or upon credential changes*
