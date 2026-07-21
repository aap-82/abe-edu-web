# Content pipeline — stages 1–4 (research → extended content)

Produce these four artefacts in order before the component handover. Stages 3 and 4 carry their worked
examples inside each archetype file (`references/archetypes/`, sections 7 and 8). Australian English; never "comprehensive"; no em dashes in body copy. Every
government fact carries an official source + a verified date; ABE-controlled facts (price, pass mark,
bundle, reviewer date, modules) are confirmed against LearnWorlds / Notion, never guessed.

## Stage 1 — Government resource map + fact ledger
Goal: the fact spine. List every authoritative government page behind the course, each with a
description and a usability note, so later stages cite rather than re-chase.
Method:
- **Read the internal verified register before going live.** The repo's `kb/` library holds
  verified state/regulatory facts. Start at its index — `kb/content-source-map.md` — which maps
  every fact to its source file and carries the build status and verification cadence. Load only the
  file the fact needs: `kb/register/state-fees-register.md` (government fees), `kb/register/eligibility-by-state.md` (age and
  eligibility), `kb/register/regulator-roles-by-state.md` (who does what), `kb/register/legislation-references-{state}.md` (Act
  and section numbers), `kb/register/online-delivery-policy-by-state.md` (permitted White Card delivery mode),
  `kb/register/penalties-by-state.md`, `kb/register/ppe-requirements.md`, `kb/register/cbos-tas-reference.md`, `kb/register/card-lodgement-process-tas.md`.
  Where the register holds the fact and its verified date is current, **use it** — do not re-chase it.
- **Then go live only for what the register does not cover**, or for a fact whose verification cadence
  has lapsed (indexed fees reset ~1 July). `WebSearch` restricted to the `.gov.au` domain, then
  `web_fetch` each page.
- **Write back.** Any fact newly verified live should be recorded back into the register (and its
  `content-source-map.md` entry) so the next state page does not repeat the work.
- Identify the regulator(s) and the official pages: the permit/approval, fees, eligibility, required
  courses, responsibilities, plus WHS, levy, home-warranty, and the pinned legislation instrument.
- Capture the live URL, what the page contains, and whether it is a **Primary fact** (a number/rule you
  will state), **Structure/scope**, or **Background**.
- Record every figure with its source and the date verified. Flag indexed fees (e.g. QBCC resets
  ~1 July) as re-verify-on-cadence. An unresolved government fact is a publish hard-blocker.
Output: a sourced table grouped by authority — each row noting whether the fact came from the internal
register or a fresh live verification — plus an honest "can this be the content?" note (gov pages are
the fact spine, not the page copy).

## Stage 2 — Competitor keyword / content-gap analysis
Goal: see what the ranking competitors title and cover, ground the target keywords in ABE's *real* search demand (GSC actuals + live connector gap-demand), and find where ABE can win.
Method:
- **Check Google Search Console first (when an export exists).** ABE keeps GSC query exports in the project folder (e.g. `search-console-2026-06-26/Queries.csv`). Pull the queries relevant to this page's state/topic and read impressions + average position. This is ABE's real, actual demand, so it beats guessing: it confirms the primary keyword (the highest-impression query -> the H1/title), surfaces locality variants (e.g. Perth / Western Australia), and exposes the terms the market actually uses even when they are the wrong word (e.g. "licence"/"permit" when the correct term is "approval") — build that terminology bridge into an objection/FAQ. Flag high-impression / weak-position / 0-click queries as opportunity sections to target. GSC stays the source of truth for pages ABE already ranks for.
- **Fill the gap with the Neil Patel connector (Ubersuggest engine) — the default demand layer.** Run it whether or not a GSC export exists: it gives live volume, SEO difficulty (`sd`) and CPC for the terms ABE does *not* yet rank for — the demand a GSC export cannot see. Lead with `keyword_suggestions` / `match_keywords`, which return volume + `sd` + CPC in bulk from one call; reserve `keyword_overview` (rate-limited to ~3 reports/day, HTTP 403 after) for month-by-month trend on the 2-3 key terms. **AU is city-level only:** there is no national `locId` — use `location_suggest` for the state capital (e.g. Perth 1000676, searched as bare "Perth", not "Perth Western Australia"), triangulate across capitals for a national-ish read, and treat every figure as relative priority, never a single city's number as national volume. **Demand/competition data only** — never fees, regulators, eligibility, penalties or any `.gov.au` fact; those stay verified per Stage 1. `searchIntent` is null for most AU course terms, so classify intent manually. If the connector is unavailable, fall back to inferring keywords from competitors and note it as a known gap.
- Find the organic-ranking competitor pages for the target query (`WebSearch`).
- `web_fetch` each; extract the **H1 and H2** (and H3 where the real content sits). Note the level is
  as the page's markup produced it; the topics are what matter.
- Build a **coverage matrix**: topic/intent rows × competitor columns (covered / partial / absent),
  including price transparency, eligibility, obligations, E-E-A-T, FAQ.
- Identify the gaps ABE under-serves and the doubts competitors seed (e.g. accredited-vs-approved,
  hidden price, guide intent). These become the content brief.
Output: the real GSC demand table (when an export exists) + the connector gap-demand table (volume/`sd`/CPC, with the capital-city basis noted) + per-competitor heading inventory + the coverage matrix + a ranked list of gaps to close.

## Stage 3 — Archetype selection, then section briefs
Goal: the page's shape chosen deliberately, and a brief per section that Stage 4 can write from.

**3a — select the archetype.** Read `references/archetypes/_selector.md`, choose by what the reader
arrived to do, then read that one archetype file. Name the archetype in the run. Everything after this
branches off it. Archetype and authority model are independent axes: a CPD course is
state-approved-direct like a QLD owner builder page, and its shape is nearly the inverse.

**3b — briefs, not headings.** For each section, in the archetype's decision order:
- **Claim** — the one thing the section convinces the reader of.
- **Reader arrives** — what they know, doubt, and have already settled by this point.
- **Objection defused** — the doubt, phrased as the reader would phrase it.
- **Facts that prove it** — each with provenance: `.gov.au` source + verified date, or internal +
  confirmed. Never a fact without one.
- **Distinctive material** — the Stage-2 gap this section spends. If the section would read the same
  without it, the research has not been used.
- **Carrier** — the component(s), chosen by content shape (`component-selection.md`).
- **Fails if** — the condition under which the section has not done its job.

Lay the archetype's required sections down first, then map the competitor union and the Stage-2 gaps
onto them. A required section no competitor covers is a gap ABE wins by default. One H1, carrying the
primary keyword verbatim.
Output: the ordered section briefs, must-have and gap sections both flagged, plus an at-a-glance order
table. Worked example: section 7 of the archetype file.

## Stage 4 — Extended content
Goal: finished, reader-facing copy written from the briefs, one section at a time.

**Read `references/content-craft.md` and section 8 of your archetype file before writing.** The craft
file is the method; the archetype's worked copy is the exemplar. Read both. An exemplar shapes output
more strongly than a rule, which is why a single archetype's worked examples produced a single page
shape for so long.

Method:
- Write from the brief, never from the heading. If you are inventing the section's point while
  writing, the brief was incomplete — go back to Stage 3 rather than writing over the gap.
- **Translate, do not restate.** State the fact, then say what it means for this reader.
- **Spend the distinctive material.** Delete-test every finished section: cut the Stage-2 finding, and
  if nothing changes, it was never spent.
- Answer capsule of 40 to 60 words opening every section except the FAQ, answer first. Roughly 120 to
  180 words between headings. Tag each heading with its level.
- Verified-with-sources line under every section stating a government fact; page-foot Sources block.
- Split prose into carrier shapes with `component-selection.md`. Pick for what the content is doing.
- Apply the authority model (`kb/rules/authority-and-seo-rules.md`) and the archetype's forbidden carry-overs.
- `[confirm: LW]` for regulatory facts awaiting verification only. Internal facts were answered at
  Stage 1.
- **Cold reread before Stage 5.** The seven checks at the foot of `content-craft.md`.
Output: the full page copy, section by section, ready to map to components in Stage 5.

## Where the inputs live
Verified regulatory facts: `kb/register/`, indexed by `kb/content-source-map.md`. Authority and SEO
ship-blockers: `kb/rules/`. SEO method: `references/seo/`. Validate finished copy with
`final-check` (AU English, AI-pattern, contradiction, grouping) and `abe-readability-audit`.
