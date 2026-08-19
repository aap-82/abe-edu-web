# 01 · Source map + fact ledger — /white-card-qld

**Page:** QLD White Card (General Construction Induction Training / GCIT card), unit CPCWHS1001
**Archetype:** 02 nationally-recognised-course · **Authority model:** asqa-accredited
**Regulator (card):** Workplace Health and Safety Queensland (WHSQ) · **RTO partner:** Blue Dog Training (RTO 31193)
**Ticket:** W3-3 · **Built:** 3 August 2026

> **Ship state: build only, no production deploy.** This is a build session; production deploy is
> human-triggered per CLAUDE.md. Stage 8 confirms staging readiness, nothing more.

---

## A · Government / authoritative sources

Every regulatory fact below was already read at source in a facts session earlier in this repo's
history (commit `7953258`, and the earlier `online-delivery-policy-by-state.md` §2C build this
session's facts work extended for TAS/ACT/WA). This build session **read the register**, not the raw
`.gov.au` sources a second time — `kb/register/` is the single owner of these figures.

| # | Source | Holds | Class | Verified |
|---|---|---|---|---|
| S1 | `kb/register/online-delivery-policy-by-state.md` §2C | CRTD (live video) **is** a form of face-to-face on WHSQ's own definition; gated on a per-RTO approval; **Blue Dog Training (RTO 31193) holds it**, approved 7 Jun 2020, current | primary (register, itself sourced to WHSQ's Conditions of Agreement V6.1 + the Qld Training Ombudsman review) | 2 Aug 2026 |
| S2 | Conditions 32-43 of the GCIT Conditions of Agreement V6.1, quoted in §2C | Located-in-Queensland test (cond. 37, not residency/remoteness); min **4.5 hrs** (cond. 40); max **15:1** ratio (cond. 39); **no self-paced or pre-recorded content** (cond. 42); PPE + WHS Act copy present and available (cond. 38); Regulator's own assessment mandated, not the RTO's (cond. 36); 24-hr session notification (cond. 32); min age 13 (cond. 34) | primary | 2 Aug 2026 |
| S3 | `pipeline/white-card-wa/01-source-map.md` S1-S3 (same RTO record, re-used) | Blue Dog Training Pty Ltd, RTO 31193, **Current** to 20 Mar 2030; CPCWHS1001 **Current, Explicit, Deliver and assess**, delivery states **QLD**/WA/TAS; CPCCWHS1001 listed **Superseded** | primary (training.gov.au, a client-rendered SPA — read in a browser, not `WebFetch`) | 28 Jul 2026 |
| S4 | `kb/register/state-fees-register.md` §2 | QLD: RTO issues the card (WHSQ-approved), **no separate government card fee**; replacement from the issuing RTO, typically ~$39-49 | register | 22 Jul 2026 |
| S5 | `kb/register/legislation-references-qld.md` §2 | **STALE — see §C-1 below.** States "White Card training must be completed in person in QLD (online delivery is restricted to WA and TAS residents)" — contradicted by S1/S2, which are the more recently and more deeply sourced position | register (flagged, not relied on) | last touched 26 May 2026, not reconciled against §2C |
| S6 | `kb/register/eligibility-by-state.md`, `regulator-roles-by-state.md`, `ppe-requirements.md` | WHSQ regulator role; GCIT card name; national PPE-demonstration requirement underpinning why the assessment is supervised in real time | register | 26 May 2026 |

**Registers consulted (no second copy made here):** `kb/register/online-delivery-policy-by-state.md`
§2C (the load-bearing source for this entire page), `kb/register/state-fees-register.md`,
`kb/register/legislation-references-qld.md`, `kb/register/regulator-roles-by-state.md`,
`kb/register/ppe-requirements.md`, `kb/rules/asqa-disclosure-framework.md`,
`kb/rules/authority-model.md`.

---

## B · Fact ledger (closed before Stage 2)

### Regulatory — verified against source, never asked, never defaulted

| Fact | Value | Source | Verified |
|---|---|---|---|
| Unit code | **CPCWHS1001** *Prepare to work safely in the construction industry* (house rule: single C; WHSQ's own conditions accept both CPCWHS1001 and CPCCWHS1001, but WHSQ's public pages name only the superseded double-C code — never "correct" a direct WHSQ quote, but never present CPCCWHS1001 as this page's own current code either) | S1, S2 | 2 Aug 2026 |
| Card name in QLD | **General Construction Induction Training (GCIT) card** — WHSQ's own name for the White Card | S6 | 26 May 2026 |
| Delivery mode | **CRTD (Connected Real Time Delivery)** — WHSQ's own definition classes this **as a form of face-to-face training and assessment**, not a species of self-paced online. Genuinely live, real-time, trainer-led | S1, S2 | 2 Aug 2026 |
| Who may deliver CRTD | **Only an RTO separately approved for CRTD**, on top of its base GCIT approval — a two-step WHSQ process (documentation, then a simulated session with an Inspector). 13 of 226 approved GCIT RTOs hold it | S1 | 2 Aug 2026 |
| Blue Dog's CRTD approval | **Held, approved 7 June 2020, current** — confirmed independently by the Qld Training Ombudsman's RTO list (as at 30 Sep 2023) and WHSQ's own published RTO-approval spreadsheet (saved 10 Jul 2025, read via its hidden status columns, not the broken "Approved for CRTD" display column) | S1 | 2 Aug 2026 |
| Location test | Student must be **physically located in Queensland** during the session — a location test, not residency and not a remoteness/distance test (the 2019 rural >100km exception was superseded by the Nov 2022 CRTD regime) | S2 (cond. 37) | 2 Aug 2026 |
| Minimum duration | **Four and a half hours**, excluding administration and rest breaks | S2 (cond. 40) | 2 Aug 2026 |
| Maximum ratio | **15 students per trainer** | S2 (cond. 39) | 2 Aug 2026 |
| Self-paced / pre-recorded content | **Explicitly banned** in CRTD — no pre-training requirement, no self-paced learning, no pre-recorded trainer video or teaching content (illustrative construction-site footage is excluded from the ban) | S2 (cond. 42) | 2 Aug 2026 |
| PPE requirement | Eye protection, hearing protection, hard hat, high-visibility vest/shirt/jacket **and a copy of the WHS Act 2011 (Qld)** must be present and available to the student **during the session, wherever they are sitting** | S2 (cond. 38) | 2 Aug 2026 |
| Assessment | The **Regulator's own mandated assessment**, not the RTO's own | S2 (cond. 36) | 2 Aug 2026 |
| Session notification | RTO must notify WHSQ **at least 24 hours** before every session, including delivery method (classroom or CRTD) | S2 (cond. 32) | 2 Aug 2026 |
| Minimum age | **13 years** | S2 (cond. 34) | 2 Aug 2026 |
| Card issued by | **The RTO** (Blue Dog), WHSQ-approved — no government counter, no ABE | S4 | 22 Jul 2026 |
| Government card fee | **None** — Blue Dog issues the card with the course | S4 | 22 Jul 2026 |
| Attribution of the CRTD approval | **Blue Dog's**, never ABE Education's — "approved by WHSQ" applies to the RTO, not the publisher | S1, `kb/rules/authority-model.md` | 2 Aug 2026 |
| Interstate recognition | Nationally recognised once issued, regardless of delivery mode or state | register, standing rule | 26 May 2026 |

### Internal — confirmed by Andrey 3 August 2026, price and schedule corrected mid-build

| Fact | Value | Confirmed |
|---|---|---|
| Course price (to ABE) | ~~$99.00~~ **SUPERSEDED same session.** First answer was a sibling-price default ($99, matching White Card WA), offered and accepted before the real Blue Dog timetable was known | Andrey, 3 Aug 2026 |
| Course price (to ABE), corrected | **$109.00 Monday-Friday; $169.00 Saturday.** Blue Dog runs fixed CRTD sessions: Mon-Fri 8am (Monday and Tuesday also run a 10am start) at $109; Saturday 8am only, at $169 | Andrey, 3 Aug 2026, supplied mid-build with the exact timetable |
| Session format | **Fixed scheduled live sessions** (group-class shape, matching the 15:1 ratio condition), confirmed with an exact weekly timetable — see above. The page states the real schedule rather than a generic "book the next available session" | Andrey, 3 Aug 2026 |
| buyUrl | Not yet confirmed live at the payment endpoint for this product — flagged, see §C-3 | not verified this session |
| Independent reviewer (the only Person node) | Warwick Smith, compliance and currency, dated 3 Aug 2026 | CLAUDE.md standing + asqa rule |
| Course developer | **Blue Dog Training** (the RTO), credited via `Course.creator`. No ABE person may be credited as developer | asqa-disclosure-framework.md |
| ABE entity | ABE Education Pty Ltd, ABN 64 125 455 272 | asqa-disclosure-framework.md |

---

## C · Discrepancies and cautions found (logged, not silently fixed)

1. **⚠️ `kb/register/legislation-references-qld.md` §2 is stale and directly contradicts this page.**
   It states: *"White Card training must be completed in person in QLD (online delivery is restricted
   to WA and TAS residents)."* This was true before WHSQ's November 2022 CRTD regime and is what a
   competitor page relying on WHSQ's own stale worker-facing FAQ would also wrongly conclude (§2C's
   "two traps" section names this exact failure mode). `online-delivery-policy-by-state.md` §2C, read
   more recently and more deeply (the actual Conditions of Agreement V6.1, not a summary page),
   supersedes it. **This page is built on §2C, not on this stale line.** A build session cannot edit
   `kb/register/**` — routed `[facts]` below.

2. **The register's WA/TAS "self-paced only" framing does not describe QLD, and this page must not be
   confused with either sibling.** QLD is neither self-paced (WA/TAS) nor prohibited (NSW) — it is a
   third, genuinely distinct shape: **live, real-time, trainer-led, group-capped, and the regulator
   itself calls it face-to-face.** The page's own argument (`#online`) needs to make this distinction
   explicit, because "online" alone reads as self-paced to a reader primed by WA/TAS copy.

3. **buyUrl not yet confirmed.** White Card WA and TAS both had their `buyUrl` verified against a live
   LearnWorlds/payment endpoint before shipping (WA: verified resolving; TAS: shipped without one,
   flagged as a warning). This page's checkout path was not verified this session — Andrey confirmed
   the $99 price but not a resolving `payment?product_id=...` URL. **Following the TAS pattern**: ship
   with the in-page `#enrol` anchor as every CTA's target until a resolving buyUrl is confirmed, rather
   than guessing a `product_id` slug. Routed `[build]` as a follow-up, and to Andrey per §14 of the
   handover pattern.

4. **QLD accepts both CPCWHS1001 and CPCCWHS1001 in the Conditions of Agreement text itself** (V6.1's
   own definition names both), but WHSQ's public-facing pages name only the superseded double-C code.
   This page states CPCWHS1001 as current throughout (house rule, `check-claims.mjs` §6) and does not
   "correct" a direct quote of WHSQ's own wording if one is ever added.

5. **Do not carry WA/TAS facts across.** No government card fee is true in QLD too (matches WA, not
   TAS's $13.72 + Service Tasmania trip) — but the *delivery* shape (self-paced theory + short live
   assessment) is WA/TAS's, not QLD's. QLD has no self-paced component at all.

6. **"ABE delivers training" is prohibited**, same as every asqa page. Blue Dog delivers, assesses,
   issues the Statement of Attainment and the card. Exactly one Person node (Warwick, the reviewer); a
   Person titled "developer" fails the build.

7. **The first internal-fact answer was wrong, and it shipped into the page before the correction
   arrived.** $99 was asked and answered (a sibling-price default, offered because WA charges it) at
   Stage 1, propagated through every stage, and was live in the built MDX — frontmatter, hero, glance,
   cost section, TrustBand — before Andrey supplied Blue Dog's actual timetable ($109 weekday / $169
   Saturday) mid-Stage-6. Every occurrence was found by `grep` and corrected in place; `priceNumber`
   was updated to match. **The lesson: a confirmed internal fact with no corroborating detail (no
   session times, no schedule) is weaker evidence than one with specifics attached** — the $99 answer
   had nothing to check it against, and the $109/$169 answer arrived self-corroborating, with a full
   weekly timetable that made it obviously the more authoritative figure.

8a. **`src/components/SiteHeader.astro` (`design`-owned) was edited to ship this page — third sighting,
   this time disclosed in the artefact itself.** The orphan-page guardrail fails any indexable page
   with no inbound link; the QLD White Card megamenu row was `soon: true` with no `href`. Changed to a
   live link. Identical to the crossings at `white-card-wa` (28 Jul) and `white-card-nsw` (1 Aug) — see
   `05-components.md`'s "Chrome edits this build required" section for the full disclosure and the
   demand-list entry. Recorded here too because §C is this run's own discrepancy log and the omission
   from it, not the edit itself, was the finding a fresh Stage 9 grader raised.

8b. **A supplementary keyword-clusters CSV (source: Exa, supplied by Andrey mid-build) surfaced three
   content gaps this run had missed**: the Unique Student Identifier requirement, evidence-of-identity
   verification during the session (which CRTD's own definition already requires — S2 — but the page
   had not stated), and the minimum age (13, cond. 34, already in the fact ledger above but not yet in
   page copy). All three are now in `#session` and the FAQ. **The CSV itself is not a primary source**
   — it carries qualitative traffic tiers ("High/Medium/Lower"), not measured volumes like the Neil
   Patel connector data in `02-gap.md`, and reads as an LLM-generated summary rather than a raw
   export. Used only to find missing topics, not to re-rank keyword priority.

---

## D · Unknowns gate — CLOSED

Both internal unknowns (price, session-booking shape) were asked and answered before this file closed.
`buyUrl` is recorded as **unresolved, not defaulted** — the page ships without one, using the in-page
`#enrol` anchor, following the TAS precedent rather than guessing a checkout slug. No `[confirm:]`
markers are required for regulatory facts; all of them trace to S1/S2, already dated and sourced.

**Gate status: closed. Stage 2 may begin.**

---

# REVISION — 19 August 2026 · RTO partner changes to Upskill Institute (RTO 45708)

**Everything above describes the Blue Dog build and is kept as the record of it.** This block states
what changes. Where the two disagree, this block wins for the partner; the QLD **regulatory** rows
above are partner-independent and stand unchanged (location test, 4.5-hour floor, 15:1 ratio, the
self-paced ban, PPE at assessment, both unit codes accepted, RTO issues the card, no government fee).

## What changed and on whose authority

| Fact | New value | Class | Provenance |
|---|---|---|---|
| RTO partner | **Upskill Institute (RTO 45708)**, replacing Blue Dog Training (31193) | internal (commercial) | Andrey, 19 Aug 2026 |
| Upskill WHSQ GCIT agreement | **Asserted held** — ⚠️ **UNVERIFIED, see below** | **regulatory** | Andrey, 19 Aug 2026; document promised, not yet supplied |
| Upskill WHSQ CRTD approval | **Asserted held** — ⚠️ **UNVERIFIED, see below** | **regulatory** | Andrey, 19 Aug 2026; document promised, not yet supplied |
| Upskill ASQA scope, CPCWHS1001 | **Current, "Deliver and assess", 08 Apr 2022 → 08 Jul 2030** | regulatory | **VERIFIED** training.gov.au API, read 19 Aug 2026 |
| Upskill RTO status | **Current** (registered 09 Jul 2021) | regulatory | **VERIFIED** training.gov.au API, read 19 Aug 2026 |
| Course price | **$99.00 flat**, every session, no weekend premium | internal | Andrey, 19 Aug 2026 |
| Session days | **Weekdays only** — no Saturday/weekend sessions | internal | Andrey, 19 Aug 2026 |
| buyUrl | **Still none.** CTAs keep targeting `#cost` | internal | Andrey, 19 Aug 2026 |
| Course developer | **Upskill Institute**, credited via `Course.creator` | asqa-disclosure-framework.md |

## ⚠️ The one open regulatory blocker

**WHSQ's published list of approved GCIT providers does not contain RTO 45708.** Read at source
19 Aug 2026: the XLSX WHSQ links from its own worker-facing "General construction induction" page as
"View a list of training providers" lists **226** approved RTOs, and Upskill Institute is not among
them. The only similar name is **"Upskills QLD" (RTO 40840)** — a different company, holding no CRTD
approval. Do not confuse the two.

WHSQ's RTO page states the entitlement is a three-step, per-RTO process, and ASQA scope is only step
one: *"RTOs must enter into an agreement with WHSQ before delivering the training in Queensland."*
So Upskill's current CPCWHS1001 scope — which **is** verified — does not by itself permit QLD delivery.

**Method was validated on two independent controls** before relying on it (the visible "Approved for
CRTD" column is a broken formula and reads blank for every row; status lives in hidden date columns):
Blue Dog's CRTD serial decodes to 7 Jun 2020, matching the register exactly; and 15 approval dates
minus 2 terminations gives 13, matching the register's "13 of 226" exactly.

**Honest limit of that finding.** The file's internal save date is 10 Jul 2025, about 13 months before
this reading. If Upskill entered an agreement after that date, WHSQ's published list would not yet show
it. **Absence from the list is the best available public evidence, not proof of refusal.** It cannot be
resolved from public sources — only Upskill Institute directly, or `GCIT@oir.qld.gov.au`.

**Searched for and not found:** any fresher WHSQ provider list (the worker page links this same file as
current); any per-state delivery-notification endpoint on the training.gov.au API (four candidate paths
all 404), so Upskill's QLD delivery notification was not read — the finding does not depend on it.

## How this constrains the content, until the document is read

1. **Two approvals stack, and they are separate.** A GCIT agreement alone licenses a **classroom**
   page only. Live online (CRTD) needs a *second* approval — documentation review, then a simulated
   session with a WHSQ Inspector. Andrey states Upskill holds both; the page is written on that basis
   and every such claim carries a `[confirm:]` marker until the document is read.
2. **Never attribute the approval to ABE Education.** It is the RTO's, exactly as it was Blue Dog's.
3. **The self-paced ban is unchanged and absolute** (cond. 42). Nothing on this page may read as
   self-paced, at-your-own-pace, or pre-recorded — that constraint belongs to the *delivery mode*,
   not to the partner, so it survives the swap untouched.
4. **`[confirm:]` WARNs rather than fails** while the page is noindexed (studio mode). It becomes a
   hard publish blocker the moment the page is indexable. **This page must not be made indexable, and
   must not be deployed, until the WHSQ document is read and recorded by a facts session.**
5. **A facts session, not this build session, records the approval in `kb/register/`** (wall 1). The
   full reading record is ready to hand over; this build session did not write to `kb/register/`.
