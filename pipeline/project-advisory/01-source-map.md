# 01 · Source map + fact ledger — `/project-advisory`

**Page:** Project Advisory Pack (W2-7) · **Recipe:** C (support/prose page) ·
**Archetype:** none of the ten fits — see §A · **Run type:** NEW page for an EXISTING, SELLING
product. Nothing ships without a human go-ahead.
**Researched:** 10 August 2026.

---

## A · Archetype: no fit, and that is the finding

`references/archetypes/_selector.md` defines ten archetypes and **this page is none of them.** The
reader arrives to work out whether an $89 pack of spreadsheets and a written guide is worth buying
for their own build. Checked against every row rather than assumed:

| Archetype | Why it does not fit |
|---|---|
| 1, 2, 3, 4 (all course types) | No credential, no regulator, no certificate, no RTO. Nothing here is training. |
| 7 info guide | "not necessarily buy" — this page's whole job is a purchase decision |
| 9 insurance type | Its decision order is built on "is this compulsory", which has no analogue, and it is a **referral** to a third party. This is ABE Education's own product, sold outright |
| 5, 6, 8, 10 | Person, router, dated post, organisation. None is a product |

**This is the eleventh shape: a digital product ABE Education owns and sells directly.** ROADMAP's
Phase 3 already carries "Archetype-aware guardrails + collections for archetypes 7-10", triggered by
"a non-course page is needed next", and the NSW pre-launch note sets the precedent for how to handle
it: **build the page, and let a second page of the same shape prove what the archetype needs.** So
no archetype file is written here — `.claude/skills/**` is skills-owned in any case — and the gap is
filed as a `[skills]` item.

Shape taken instead, from the reader's own decision order: what it is → who it is for → what is
actually inside → what it costs → how to get it → who made it. `Product` schema per the migration
plan's W2-7 row ("light `Service`/`Product` schema"), **no `Course` node.**

## B · Authority model: none, and the page must claim none

**This product carries no regulatory standing whatsoever.** No regulator approves it, no RTO
delivers it, it is not training, and completing it satisfies no legal requirement in any state. The
page's one hard rule follows: **it must never imply the pack satisfies an owner-builder obligation.**
An owner builder still needs their state's approved course, their White Card and their own
insurances; this is a set of tools for running the project, bought voluntarily.

Like `/accreditation` and `/owner-builder-insurance`, this page will carry no `data-authority`, so
`guardrails.ts`'s forbidden-claim scan **will not run on it**. Every claim is hand-checked. Recorded
here because that is exactly the condition under which a wrong claim ships quietly.

## C · Fact ledger

### Regulatory facts

**None.** This is the first page in the repo with an empty regulatory ledger, and that is correct
rather than an omission: the product makes no claim a `.gov.au` source could confirm or deny. No
source map is needed, and Stage 4 must not manufacture one.

### Internal facts (ABE-controlled)

| Fact | Value | Provenance |
|---|---|---|
| Price | **$89.00** | Andrey, 10 Aug 2026. **Independently corroborated**: `business data/LearnWorlds/2026-07-23_ExportProductRevenues.csv` shows "Project Advisory Pack" at A$1,602.00 over 18 payments — exactly A$89.00 each |
| GST treatment | **GST-free**, stated as the courses are | Andrey, 10 Aug 2026, reaffirmed 10 Aug after the facts changed. **Flagged assumption — see §D** |
| Slug | **`/project-advisory`** | Andrey, 10 Aug 2026, chosen over the sitemap's `/project-advisory-pack` |
| `buyUrl` | **None usable.** CTAs use the in-page `#enrol` anchor | See §E — this is a cutover consequence, not a missing product |
| Sales to date | 18 payments, A$1,602.00, to 23 Jul 2026 | LearnWorlds revenue export |
| Format | **Downloadable documents** (Excel + written guide) | Live product page, read 10 Aug 2026 |
| Component 1 | **Project Budget Estimator** — automated Excel spreadsheet: enter trade activities and costs, applies a **20% contingency** automatically, tracks contractor quotes and progress claims, calculates outstanding amounts | Live product page, 10 Aug 2026; the 20% figure independently corroborated on `/faq` |
| Component 2 | **A 56-page written assessment** — energy and water efficiency above state minimum ratings, sustainable design, solar, efficient lighting and air conditioning, water management including pools, contract terms in plain English, trade-scoping guidance for comparable quotes | Live product page, 10 Aug 2026 |
| Component 3 | **Project Contracts Calculator** — tracks trade activities, contract values, remaining funds and amounts owing | Live product page, 10 Aug 2026 |
| Reviewer | Warwick Smith, regulatory currency | Site convention. **But see §D** — there is little regulatory content here to review |

## D · Two flagged assumptions, both stated rather than buried

**1. GST-free.** Asked once and answered "GST-free, same as the courses". Re-raised after the facts
changed — at the time of the first answer neither party had established that this is downloadable
spreadsheets and a PDF rather than an education course, and GST-free treatment generally attaches to
education supplies. Andrey reaffirmed "go ahead". **Proceeding as instructed and recording it here
as an assumption, not a verified fact.** It is a tax claim on a live price; if it is wrong the fix is
one word on one line. Not a blocker, and not this session's call.

**2. The three components are read from the live legacy product page**, not confirmed by Andrey.
Asked, not answered before the go-ahead. That page is ABE Education's own current sales page for a
product with 18 completed payments, which is strong evidence — but it is copy that may predate
changes. **The "56-page" figure is the one to watch**: specific enough to be wrong, and the only
component claim a buyer could measure against what they receive. Stage 4 should carry it exactly as
the source states it, and Stage 7 should flag it for confirmation before the page is advertised.

## E · The purchase path, and why `#enrol` is right rather than lazy

The product **sells today** at `https://www.abeeducation.edu.au/course/project-advisory-pack`. That
is a **LearnWorlds path on the current apex**, and `SKILL.md`'s Stage 7 audit is explicit: a
`/course/*` or `/program/*` URL emitted as a same-origin link or in JSON-LD "becomes a dead link the
moment the Astro build owns the apex". Wiring it as `buyUrl` would ship a link guaranteed to break
at cutover.

So the position is: **there is a working checkout, and this build may not link to it.** Same
inherited blocker as `/cpd-tas`'s `buyUrl` and the `learn.` subdomain decision, which is item 3 on
Andrey's own open list. The `#enrol` anchor is the `/white-card-tas` precedent. Recorded so a later
reader does not mistake this for an unbuilt product.

## Ship decision (Stage 1)

**Proceeds to Stage 2.** The ledger is closed: zero regulatory rows by design, every internal row
either confirmed by Andrey, corroborated by LearnWorlds, or read at ABE Education's own live product
page and flagged in §D as such.
