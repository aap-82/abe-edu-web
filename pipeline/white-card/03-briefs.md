# Stage 3 — Archetype selection + section briefs — `/white-card` hub

## 3a — Archetype

**Hub** (archetype 6). The reader knows they need a White Card but not which of ABE's four
(soon five) state courses is theirs — the unresolved question is "which one is mine," the
textbook hub arrival state, not "what is a white card" (that is an info-guide question) and not
"should I buy this" (that is each spoke's own job). Confirmed against `references/archetypes/_selector.md`
and against Stage 2's SERP finding: no competitor in the top 10 for `white card australia` runs a
genuine state-routing comparison page, so the hub shape is the gap, not merely a fit.

Authority model note: a hub asserts no authority model of its own — `references/archetypes/06-hub.md`
§5 is explicit, no `Course` node, no price for the hub itself. Each spoke keeps its own authority
model (asqa-accredited, all four/five states) untouched.

## 3b — Section briefs

Decision order per archetype 6 §2: orienting line -> routing grid immediately -> differentiators ->
shared context once. Sections below follow that order and match `HubLayout.astro`'s existing carriers
(same layout the live `/owner-builder-courses` hub uses, per `01-source-map.md`'s "no new mechanism"
discipline).

```
Section: Hero + orienting line
Position: 1
Claim: Every White Card is the same nationally recognised card once issued; how you get one
       differs by state.
Reader arrives: knowing they need a White Card, not knowing ABE runs a different course per
       state or that delivery mode itself differs.
Objection defused: "Is this just going to explain what a white card is?" (it is not an info
       guide — one line, then the choice).
Facts: card is nationally recognised on issue regardless of state of completion (shared context,
       internal — confirmed by every spoke's own frontmatter, not a new regulatory claim).
Distinctive material (Stage 2): delivery mode is the axis competitors never surface up front —
       self-paced online (WA/TAS) vs a live trainer session (NSW/QLD). State by itself is not the
       differentiator; delivery mode is, and it is what actually changes what buying involves.
Carrier: Hero (h1 + subhead), one-paragraph intro capsule immediately below.
Fails if: the intro reads as an explainer (three-plus paragraphs) rather than a one-line
       orientation before the grid, or if it repeats the hero subhead's own wording.
```

```
Section: Choose your state (spoke grid)
Position: 2
Claim: These are the states ABE runs a White Card course for; ACT is coming.
Reader arrives: ready to pick, having just read the delivery-mode split.
Objection defused: "Which one applies to me?" / "Is my state even covered?"
Facts: WA/TAS/NSW/QLD live (each spoke's own confirmed price + one-line differentiator); ACT
       not yet built (internal, `01-source-map.md`).
Distinctive material (Stage 2): none of the top-10 SERP competitors name which states they do
       NOT cover — naming the gap (ACT coming, other states/territories not offered) is itself a
       trust move the gap analysis surfaced as absent elsewhere.
Carrier: Card grid, one per spoke, each linking straight to its course page. Same pattern as
       `/owner-builder-courses`.
Fails if: a reader cannot reach their state's page in one click from the top of the page
       (archetype 6 §7's own fails-if, carried through unchanged), or if a blurb duplicates a
       spoke's own content rather than giving one differentiating line.
```

```
Section: Compare (differentiator table)
Position: 3
Claim: Price, delivery mode, government card fee and training provider are the fields that
       actually change the decision; credential does not (identical everywhere), so it is not a
       fifth row.
Reader arrives: having picked a likely state from the grid, wanting to confirm before clicking
       through — or comparing two states directly (the state-modified search pattern Stage 2
       found: "queensland white card," "white card new south wales" both carry real volume,
       confirming side-by-side comparison is a genuine reader behaviour, not a guess).
Objection defused: "What's actually different between these?"
Facts: comparison cells trace verbatim to each spoke's own frontmatter (price, delivery mode,
       government fee, RTO partner) — `01-source-map.md`'s regulatory-facts table, zero new
       figures.
Distinctive material (Stage 2): this table's existence at all is the gap — no competitor page
       in the SERP set puts state, price, delivery mode and government fee side by side.
Carrier: Comparison table (existing `HubLayout` component), ACT as a `soon: true` column with no
       data cells.
Fails if: a row states a figure not traceable to a spoke's frontmatter, or a fifth "credential"
       row repeats what the shared-context section already states once.
```

```
Section: FAQ (shared context + objections)
Position: 4
Claim: Answers the doubts a state-by-state grid cannot resolve on its own — portability, the
       RTO-not-ABE structure, what the government fee actually pays for, and states not covered.
Reader arrives: mostly resolved on "which state," occasionally still holding one of: "does my
       card work if I move," "is ABE the RTO," "why does TAS have a fee and WA doesn't," "what
       about the state I'm actually in if it isn't listed."
Objection defused: each FAQ question names one of the above verbatim.
Facts: portability = nationally recognised on issue (shared, internal); RTO structure = Blue Dog
       Training (RTO 31193) / Upskill Institute (RTO 45708), per spoke; government fee = TAS
       $13.72 only, others none, `state-fees-register.md`.
Distinctive material (Stage 2): "how to get white card" (3,600/mo, process intent) has no
       dedicated FAQ entry in the prior draft — add one naming the two-step process (course, then
       state issues the card) so the process doubt is answered rather than left to be inferred
       from the grid.
Carrier: FAQPage-style accordion (existing component).
Fails if: a question restates a spoke's own content instead of a genuinely hub-level doubt, or
       the process question is missing (the one gap this stage's data found).
```

```
Section: CTA band + sources footer
Position: 5
Claim: (none — a hub sells nothing, archetype 6 §4). This band's job is redirect, not conversion
       copy for the hub itself.
Reader arrives: having read enough to act.
Objection defused: none new — this is a repeat of the routing action, not a new argument.
Facts: none (no price, no CTA microcopy implying the hub itself is a purchase).
Distinctive material (Stage 2): none — this section carries no comparative claim.
Carrier: CTA band linking back to the spoke grid anchor; footer Sources block citing the same
       four regulator sources each spoke already cites once each (WorkSafe WA, Service Tasmania,
       SafeWork NSW, WHSQ Conditions V6.1).
Fails if: the CTA band's copy reads as a price/offer for "White Card" generically (forbidden
       carry-over, archetype 6 §4).
```

## What Stage 2 changed vs the prior ad-hoc draft
- Added one FAQ question (the "how do I actually get one" process doubt) — the one concrete gap
  the connector/SERP data surfaced that the ad-hoc build's FAQ set did not already cover.
- Reframed the intro/hero brief around *delivery mode* as the stated differentiator, not state
  itself — Stage 2's SERP read found state-by-state framing alone is common (regulator pages
  each cover their own state); the delivery-mode split is what nothing in the top 10 surfaces.
- Everything else (comparison fields, shared-context facts, forbidden carry-overs) confirms the
  prior draft's own choices rather than changing them — the gap analysis validated the structure,
  it did not invent a new one.
