---
date: 2026-08-02
skill: facts-session
subject: qld-gcit-crtd-delivery
verdict: Green
graded_by: self
---

# Facts review — QLD GCIT delivery mode and the CRTD approval, 2026-08-02

## Verdict

**Green.** The QLD row of `online-delivery-policy-by-state.md` was the top item on the provenance
warning left by the 1 Aug NSW session. It has been read at the regulator's own documents. **The row's
✅ was correct. Its stated reason was wrong, and it omitted the condition that decides whether ABE
Education can sell the course at all.**

Green rather than Amber because nothing published had to be corrected: no QLD White Card page exists,
and the register row's tick — the part a page would have relied on — survives. What changed is the
*basis* for it, and the basis is now regulator-grade.

**One caveat carried openly:** the decisive commercial fact (Blue Dog holds CRTD approval) is a
**derivation from a spreadsheet's hidden columns**, cross-validated against a second government
source, not a printed "Yes". §2C records the method and says so. See "What I did not resolve".

---

## 1. The reading, in the order it was done (rule 11a)

| # | Instrument | How it was opened | What it established |
|---|---|---|---|
| 1 | WHSQ, [General construction induction](https://www.worksafe.qld.gov.au/licensing-and-registrations/work-health-and-safety-licences/what-licence-do-i-need/general-construction-induction) — worker-facing, last updated 4 Oct 2022 | Browser. **WebFetch 403s on worksafe.qld.gov.au**; the accordion is collapsed, so the text needed the DOM opened | *"You need to complete face-to-face training with a Registered Training Organisation (RTO)."* No mention of CRTD. Names **CPCCWHS1001** only |
| 2 | WHSQ, [RTO information page](https://www.worksafe.qld.gov.au/licensing-and-registrations/work-health-and-safety-training/registered-training-organisations/general-construction-induction-information-for-registered-training-organisations) — last updated 29 Sep 2017 | Browser; link inventory taken via JS | Names "Conditions of agreement…" as the binding instrument **but does not hyperlink it**. Also names CPCCWHS1001 |
| 3 | WHSQ, [eSafe Construction, Nov 2022](https://www.worksafe.qld.gov.au/news-and-events/newsletters/esafe-newsletters/esafe-editions/esafe-construction/november-2022/new-conditions-for-white-cards-in-queensland) (Andrey supplied the link mid-session; a copy is in `new site/reference/`) | Browser | The conditional: new conditions "allow GCIT to be delivered face-to-face via connected real time delivery (CRTD) **where an RTO is approved to do so**". Also: 24-hour notice, 15-cap, 4.5-hour minimum, mandated assessment. Confirms **both** unit codes accepted |
| 4 | WHSQ, **Conditions of agreement V6.1, effective 25/07/2023**, under s.325 WHS Reg 2011 | `curl` + `pdftotext -layout` | The definitions that settle it: **CRTD *is* a form of face-to-face**; GCIT means the course delivered "either in a classroom or by CRTD". Conditions 32-43 in full |
| 5 | Queensland Training Ombudsman, **Review of GCIT training delivery**, FINAL, May 2024 | `curl` + `pdftotext -layout` | The **two-step CRTD approval process**; 10 of 215 RTOs held it at 30 Sep 2023, **Blue Dog Training named**; the 2019 >100km rural exception and its supersession |
| 6 | WHSQ, [approved-RTO register (XLSX)](https://www.worksafe.qld.gov.au/__data/assets/excel_doc/0025/21589/rto-approved-general-construction-induction-training.xlsx), saved 10 Jul 2025 | `curl` **403 on default UA — needed a browser UA + Referer**; then `unzip` + parse `sharedStrings.xml`/`sheet1.xml` | **Blue Dog Training (RTO 31193) currently CRTD-approved, granted 7 Jun 2020.** 13 of 226 hold it now |

**What was searched for and not found.** A version of the Conditions of agreement newer than V6.1: not
findable on `worksafe.qld.gov.au`, which does not link the document at all. A WHSQ page that states
CRTD approval status per RTO in readable HTML: not found — the XLSX is the only published register,
and its CRTD column does not render. Any residency or remoteness test in V6.1: **searched and absent**
— condition 37 is a location test and nothing else qualifies it.

## 2. The finding

**QLD is the mirror image of NSW, and the mirror is the point.** SafeWork NSW's General Conditions
define Face-to-face (trainer and learner "physically located together") and Connected delivery as
**separate** modes, so the virtual classroom needed a permission the Specific Conditions never granted
(§2A). WHSQ's V6.1 defines CRTD **as a form of face-to-face training and assessment**. The same phrase
carries opposite consequences in the two jurisdictions. Neither state's reasoning transfers.

**But the permission is gated, and V6.1 alone will mislead you.** V6.1 contains **no clause** creating
the CRTD approval; read alone it suggests CRTD is open to any approved GCIT RTO. The eSafe wording
("where an RTO is approved to do so") and the Ombudsman review supply the missing half: a two-step
application ending in **a simulated CRTD session with a WHSQ Inspector**.

> **This is the §2A lesson inverted and it is worth stating as a rule.** On 1 Aug a permission was
> quoted without its condition. Here the condition sits in a *different instrument entirely*, and I
> had already drafted "no separate approval gate exists in V6.1" before the Ombudsman review
> contradicted it. **Absence of a clause from one document is not absence of the requirement** — the
> same shape as "greps prove presence, never absence", applied to instruments rather than regexes.

**The commercial answer is favourable.** Blue Dog Training (RTO 31193), ABE Education's QLD White Card
partner, holds CRTD approval. `/white-card-qld` (W3-3) can be built as a genuinely online page.

## 3. What changed in the register

`kb/register/online-delivery-policy-by-state.md` only. Nothing else is facts-owned.

| # | Fact | Was | Now |
|---|---|---|---|
| 1 | QLD virtual classroom, basis | ✅, sourced to industry guides | ✅, sourced to WHSQ V6.1 definitions — CRTD **is** face-to-face |
| 2 | Who may deliver it | not recorded | **per-RTO approval**, two-step, 13 of 226 hold it |
| 3 | Blue Dog CRTD status | not recorded | **approved 7 Jun 2020, current** |
| 4 | Student eligibility | "remote QLD residents" | **physically located in Queensland** (cond. 37) — not residency, not remoteness |
| 5 | The >100km rural exception | implied current | **superseded** by the Nov 2022 CRTD regime |
| 6 | Minimum duration | not recorded | **4.5 hours** excluding admin and breaks (cond. 40) |
| 7 | Class size | not recorded | **15:1** (cond. 39) |
| 8 | Assessment | not recorded | **regulator-mandated** instrument (cond. 36) |
| 9 | PPE at assessment | not recorded | eye, hearing, hard hat, hi-vis, *WHS Act* copy (cond. 38) |
| 10 | Self-paced / pre-recorded | "banned 2019" | banned **within CRTD** by cond. 42, with an exclusion for educational videos of construction sites |
| 11 | Unit code | CPCWHS1001 assumed | QLD accepts **both** CPCCWHS1001 and CPCWHS1001 |
| 12 | Provenance warning scope | "every row except NSW" | "every row except NSW **and QLD**"; TAS and ACT named as next |

## 4. What this contradicts elsewhere (rule 11b)

**Nothing had to be reversed** — this is the first QLD delivery reading, not an overturn. Two items
are nonetheless now inconsistent with the register and are **not facts-owned**:

1. `kb/register/competitor-pricing-snapshot.md` line 71 reads *"**QLD** | $99 – $250 | Virtual
   classroom mandated → higher per-student cost."* "Mandated" is wrong on two counts: classroom
   delivery remains available, and CRTD is *permitted to the approved*, never required. This one **is**
   in `kb/register/` and so is facts-owned — **left deliberately unchanged** because it is a
   commercial pricing note rather than a compliance claim, and rewriting a price-driver commentary is
   not what this session was scoped to. Filed as a `[facts]` item rather than silently edited.
2. Nothing in `src/`, `kb/rules/` or the skill states a QLD delivery mode today — checked by grep for
   "virtual classroom" across `src/`, `kb/` and the skill. **`/white-card-qld` does not exist**, which
   is why this reading lands before a page rather than after one. That is the sequencing the 1 Aug NSW
   run failed and this one got right.

## 5. What I did not resolve, stated plainly

- **The Blue Dog CRTD status is derived, not printed.** The XLSX column named *"Approved to deliver
  via connected real time delivery (CRTD)"* is an unresolved external-link formula and is **blank for
  every RTO in the file**, including ones the Ombudsman confirms are approved — so its blankness
  proves nothing in either direction. Status was derived from ten hidden date columns and validated
  against the Ombudsman's named list (8 of 10 match; the 3 extras carry post-Sept-2023 approval
  dates). Strong, and still a derivation. Before `/white-card-qld` publishes a CRTD claim, confirm
  with Blue Dog or `GCIT@oir.qld.gov.au`.
- **Whether a version newer than V6.1 exists.** WHSQ does not publish the document. V6.1 is the
  newest findable copy and it is three years old. Not a blocker — it postdates the change it
  describes — but a page relying on a specific clause should confirm the version first.
- **The WHSQ worker page contradicts the conditions** and is stale by three years rather than
  authoritative. Recorded in §2C as a trap so a future session does not "discover" it and reverse the
  row. I did not contact WHSQ to have the page corrected; that is an outbound action and Andrey's call.

## 6. Session close — every item with a disposition

| Item | Disposition |
|---|---|
| Pre-flight `system-health` | ✅ run at open — 0 failing, 14 warn, 44 ok |
| Session type | ✅ facts; wrote `kb/register/**` only |
| Rule 4 — source read in this session | ✅ all six instruments opened in this session; none carried in |
| Register writes | ✅ 1 file, `online-delivery-policy-by-state.md` |
| Contradictions named (rule 11b) | ✅ 2, both routed rather than silently fixed |
| Method caveat recorded | ✅ §2C, and §5 above |
| This review filed | ✅ `skill-reviews/facts/` |
| Demand items routed | ✅ see below |
| Derived handover regenerated | ✅ `demand-split.mjs --write` |
| Memory written | ✅ `reference_qld_gcit_crtd.md`, indexed in `MEMORY.md` |

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- [facts] **Read the TAS delivery row at WorkSafe Tasmania.** It is the highest-risk unchecked row: `/white-card-tas` is **live and indexable** and advertises self-paced online completion on industry-guide sourcing alone. Of the two rows since checked, one was wrong in the permissive direction. Do this before any further White Card work.
- [facts] **Read the ACT delivery row at WorkSafe ACT.** Gates W3-5. The register says AlertForce delivers in a classroom, confirmed 26 May 2026 with the partner but not with the regulator.
- [facts] **`competitor-pricing-snapshot.md` line 71 says "Virtual classroom mandated" for QLD.** It is not mandated — classroom delivery remains available and CRTD is permitted only to approved RTOs. Left unchanged this session because it is a pricing-driver note, not a compliance claim; correct it in a session scoped to that file.
- [facts] **Confirm Blue Dog's CRTD approval directly** with Blue Dog or `GCIT@oir.qld.gov.au` before `/white-card-qld` publishes a CRTD claim, so the page rests on a printed statement rather than a spreadsheet derivation.
- [build] **`/white-card-qld` (W3-3) can be built as an online page, with four mandatory copy constraints**: student **physically located in Queensland** (never "resident"), **minimum four and a half hours**, **nothing self-paced or pre-recorded**, and the learner needs **PPE to hand for the assessment** (eye, hearing, hard hat, hi-vis). Attribute the CRTD approval to **Blue Dog Training (RTO 31193)**, never to ABE Education. Read §2C before Stage 1.
- [build] **QLD accepts both CPCCWHS1001 and CPCWHS1001.** WHSQ's public pages name only the double-C code that `check-claims` §6 fails on inside `src/`. A QLD page must not present it as the current national code, and must not silently "correct" the regulator when quoting WHSQ. Same shape as the WA note in §2B.
- ~~[skills] **A Stage-0 provenance gate belongs in the build recipe.** This reading landed *before* `/white-card-qld` exists; the NSW equivalent landed after a complete page had been built and graded. The register now labels rows by provenance, so Recipe A step 1 can mechanically stop when a fact the page will publish rests on secondary sourcing. Second occurrence of the same failure shape — the trigger has fired.~~ Built 4 Aug 2026 into Recipe A step 1 and the skill's own Stage 1 — see `skill-reviews/skills/2026-08-04-provenance-gate-and-path-ownership.md`.
- ~~[skills] **`.gitignore` protects `new site/reference/` against `*.pdf`, `*.docx` and `*.doc`, but NOT `*.xlsx`.** Its own comment says the source documents are ignored "because THIS REPO IS PUBLIC", names signed legal documents with Docusign envelope IDs and a business address, and records that a blanket `git add -A` **already swept them into a commit once**. A spreadsheet dropped in that folder is one `git add -A` away from a public repo with permanent history — verified this session with `git check-ignore`, which reports the QLD register XLSX as **not ignored**. One line fixes it. **Not fixed here:** `.gitignore` has no owner in the session-types table, and CLAUDE.md says platform config is "its own decision with a human in it — say so out loud rather than folding it into a session". This is saying it out loud. Consider `*.xlsx`, `*.xls` and `*.csv` together, since business data drops are the same class.~~ Fixed 4 Aug 2026 — `.gitignore` assigned to skills, and the line added (`new site/reference/**/*.xlsx`/`.xls`/`.csv`, recursive). See `skill-reviews/skills/2026-08-04-provenance-gate-and-path-ownership.md`.
- [skills] **`worksafe.qld.gov.au` 403s WebFetch and its register XLSX 403s a default `curl` UA.** Both are reachable in the browser and with a browser UA + Referer respectively. Worth a line in the skill's research reference, next to the existing note that `training.gov.au` needs a browser: a tool failing is not a source being absent, and this is now the third regulator to need a workaround.

## Before you start (next facts session)

1. `node scripts/system-health.mjs` — pre-flight, and again before merge.
2. Own branch. Nothing outside `kb/register/**` in this session.
3. No figure enters the register without a source read in that session.
4. Mark UNVERIFIED rather than carrying a figure across.
