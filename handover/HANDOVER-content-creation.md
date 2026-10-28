# HANDOVER — content creation for an ABE Education page

**No `## Status:` line, deliberately.** This is a standing runbook, not a session note: it has nothing
to close. Extracted from `.claude/skills/abe-course-page-astro` on 26 August 2026 so the content half
of that pipeline can be worked without loading the build half.

**Re-verified 28 October 2026**, before committing. The file sat uncommitted for two months, so every
source it draws on was diffed against `origin/main` first: `content-craft.md`, `content-pipeline.md`,
`authority-model.md` and `content-source-map.md` are all byte-identical to the versions extracted
from, and none has changed since 17 August 2026. The extract is current. **Re-run that diff before
trusting this file again** — it has no way to tell you when it goes stale.

**Source of truth remains the skill.** Where this file and the skill disagree, the skill wins and this
file is stale. It is a working extract, not a fork. Re-read
`.claude/skills/abe-course-page-astro/references/content-craft.md` if anything here reads thin.

---

## What this covers, and what it deliberately does not

**Covers:** stages 1 to 4 — research the facts, ground the keywords, brief the sections, write the
prose. Plus the house style and claim rules that govern every word.

**Does not cover, on purpose:** archetype internals, component selection, Astro/MDX, JSON-LD, the
build integration, image prompts, pre-deploy verification, deploy. Those are stages 5 to 8 and belong
to a build session. This file ends where the copy is written and cold-reread.

**The handover point:** you produce `01`, `02`, `03` and `04` in `pipeline/{slug}/`. A build session
takes `04-content.md` and turns it into a page. If you also want the page built, that is a different
session with a different owner.

---

## The four artefacts. None is optional.

| File | Stage | Without it |
|---|---|---|
| `01-source-map.md` | 1 | no fact provenance |
| `02-gap.md` | 2 | keywords are assertion |
| `03-briefs.md` | 3 | Stage 4 invents the section's point |
| `04-content.md` | 4 | copy cannot be reviewed apart from markup |

**Stage outputs are files, not chat.** Anything existing only in a conversation cannot be audited,
resumed or graded. **A missing artefact is a stage that did not happen**, whatever the draft looks
like.

---

## Stage 1 — Fact ledger

Every fact the page will state gets a row. There are exactly **two classes**, with two different
mechanisms, and nothing is defaulted or guessed.

| Class | Examples | Mechanism | Never |
|---|---|---|---|
| **Regulatory** | fees, thresholds, eligibility, legislation, regulator name, approval status, delivery rules | verify against the `.gov.au` source or `kb/register/`; record URL + verified date | never ask the user, never default |
| **Internal** | price, pass mark, attempts, modules, completion time, certificate validity, RTO partner, reviewer + date | **ask, interactively, before writing a word** | never default, never infer from a sibling state's page |

**Read the register before going live.** `kb/content-source-map.md` is the index; it maps each fact to
its file. Load only the file the fact needs. Where the register holds the fact and its date is
current, use it — do not re-chase. Go live only for what the register lacks or where the cadence has
lapsed (indexed fees reset ~1 July). Write newly verified facts back so the next page does not repeat
the work.

**`kb/register/` is the single owner of every verified figure. Never keep a second copy.** Only a
**facts session** may write there — a content session that verifies something new reports it upward.

### The unknowns gate

List every internal fact you do not have, then **ask for all of them before writing**. A missing
internal fact is not researchable: no amount of searching produces ABE's pass mark, so carrying it as
a placeholder guarantees it leaks into the page. Batch the questions — one interaction with three
beats three interactions.

The ledger is closed when every row has either a source + verified date, or an answer + the date it
was asked. Only then does Stage 2 begin.

### The provenance gate

Before Stage 3, confirm every row is **regulator-sourced**, not an industry-guide restatement. A row
resting only on a guide, or marked `UNVERIFIED`, is **not authored against** — route it to a facts
session and wait. NSW once shipped a complete page on an industry-guide row that reversed at Stage 9.

---

## Stage 2 — Demand and gap

Source order:

1. **GSC first, when an export exists.** `business data/GSC/` — note the space, quote the path.
   Gitignored and never committed, so a fresh clone lacks them. Unzip to a scratchpad, never into the
   repo tree, and **read `Filters.csv` first**: page-filtered and site-wide exports share filenames,
   and reading one as the other misstates demand. GSC is the source of truth for pages ABE already
   ranks for. The site-wide export does not cross Queries with Pages, so **ask Andrey for a per-page
   export at this stage**, not partway through.
2. **Neil Patel / Ubersuggest connector for the gap.** Live volume, difficulty and CPC for terms ABE
   does *not* yet rank for. Lead with `keyword_suggestions` / `match_keywords` for bulk metrics;
   `keyword_overview` is rate-limited (~3/day). **Demand and competition only — never a `.gov.au`
   fact.** AU is city-level: use `location_suggest` for capitals, triangulate, treat figures as
   relative priority rather than national volume.
3. **Competitor inference** only if the connector is unavailable, noted as a known gap.

Then fetch the ranking competitor pages, extract H1/H2, build a coverage matrix (topic × competitor),
and rank the gaps ABE can win: price transparency, eligibility, obligations, E-E-A-T, the doubts
competitors seed.

**Record abandoned terms and why.** If demand exists that the product cannot serve, say so here, or a
later session will "recover" the term by writing a claim the course cannot honour.

---

## Stage 3 — Section briefs, not a heading outline

A heading with an intent label is not something Stage 4 can write from. It has to invent the
section's point, and invented points are where filler comes from. Each section gets:

| Field | What it carries |
|---|---|
| Claim | the one thing this section convinces the reader of |
| Reader arrives | what they know, doubt and have already decided at this point |
| Objection defused | the doubt, in the reader's own words |
| Facts that prove it | each with provenance: source + verified date, or internal + confirmed |
| Distinctive material | the Stage-2 finding that should change how this section opens |
| Carrier | the component(s), by content shape |
| Fails if | the condition under which this section has not done its job |

One `<h1>` only, carrying the primary keyword verbatim. A required section no competitor covers is a
gap ABE wins by default, **not a section to cut**.

---

## Stage 4 — Writing the prose

Write one section at a time, **from its brief**. Never from the heading. If you find yourself
inventing the claim, the objection or the reader while writing, stop and go back to Stage 3 — the
brief was incomplete, and writing over the gap is how generic copy gets made.

### The three failures this prevents

1. **Restating the fact.** The ledger says the threshold is a number, the section says the threshold
   is a number. Nothing added; the reader could have got that from the regulator.
2. **Spending the research nowhere.** If the section opens the way it would have opened without the
   Stage-2 finding, the research was wasted.
3. **House-style filler.** "We understand that compliance can be confusing." Delete on sight.

### Move 1 — Translate the fact, do not restate it

State the fact, then immediately say **what it means for this reader**. The second half is the
writing; the first half is just accuracy.

> **Weak:** The owner builder approval threshold in Queensland is $11,000. Projects above this value
> require approval from the QBCC.

> **Better:** If your project is worth more than $11,000 and you are not using a licensed builder, you
> need QBCC owner builder approval before work starts. Under that figure, you do not, and this course
> is not something you have to buy.

That costs a sale occasionally and buys trust every time.

### Move 2 — Spend the distinctive material

Ask of every finished section: **if I deleted the research finding, would this section be different?**
If not, it has not been spent. Rewrite the opening so the gap is the first thing the reader gets.

> **Not spent:** "This course is worth 2 CPD points and falls under the Building Law category."
> **Spent:** "This course counts as Building Law, which is the category most practitioners are short
> on at audit. It carries 2 points."

### Move 3 — Write the capsule as an answer, not an introduction

**40 to 60 words, answer first.** The test: if the reader read only the capsule and left, would they
have their answer? If the capsule sets up an answer that arrives in the next paragraph, it is an
introduction and it has failed.

**Match the reply to the question type.** A yes/no opener under a what/how/who/when/where/why/which
heading **fails the build**:

| Heading asks | The capsule opens with |
|---|---|
| What is / What does | a definition, in the terms of the heading |
| Is / Do / Can / Does | yes or no, then the qualification |
| How much / What does it cost | the figure |
| How / What are the steps | the first step, or the count of them |
| Who / When / Where | the person, the time, the place |

If the yes/no answer is the one the reader wants, **the heading is wrong, not the capsule.**

**No two sections may answer the same question.** Before writing a capsule, read the one above it: if
you could swap them without the reader noticing, the sections have collapsed into one and the brief
was wrong at Stage 3.

**Do not open with a slogan.** "Two costs, one course." reads as advertising, not an answer, and
because it scans well it spread verbatim to six pages before anyone objected. Say it plainly.

Keep roughly **120 to 180 words between headings**. If a section runs long, it is usually two
sections.

### Move 4 — Name the objection out loud

Say the doubt plainly, in the reader's own words, then answer it.

> Providers differ only in whether they are an RTO, and that makes no difference to what the QBCC
> accepts. There is no accredited version of this course to compare against.

More convincing than three paragraphs of reassurance, because it engages the actual doubt. This works
only when the answer is genuinely strong; if it is not, **the fix is the offer, not the copy.**

### Move 5 — The cold reread

Do this **before handing over, not after the build**. At Stage 7 a rewrite is expensive; here it costs
nothing.

1. **The fail condition.** Every brief has one. Has it been met?
2. **The delete test.** Cut the research finding. Does the section change?
3. **The first-sentence test.** Does sentence one answer something, or set up an answer?
4. **The anywhere test.** Could this sentence appear on a competitor's page unchanged? If so it
   carries no information.
5. **The fact-to-meaning test.** Every stated fact followed by what it means for this reader.
6. **The archetype test.** Does anything here belong to a different archetype?
7. **Sources.** Every government fact carries its source and verified date.

---

## Voice

Write for **a capable adult who is short of time and slightly worried about getting something wrong.**

- **Plain and specific.** "The QBCC charges $364.65" beats "government fees apply".
- **Unhedged.** If the fact is verified, state it. "May", "generally", "in most cases" belong only
  where there genuinely is variation — then name the variation rather than gesturing at it.
- **Second person, active voice.** "You apply to the Building Services Board", not "an application is
  made".
- **Short sentences carrying one idea.** Vary the length so it does not read as a list.
- **No enthusiasm.** This reader is discharging an obligation, not buying a holiday.
- **Say the unhelpful thing.** Who does not need the course, what it really costs including fees ABE
  does not receive, what it does not cover. The single most reliable trust signal available, and
  competitors will not copy it.

### House style, enforced by the build

- **Australian English.**
- **Never the word "comprehensive".**
- **No em dashes in body copy.**
- **"ABE Education", never bare "ABE"**, anywhere a reader can see it — prose, headings, capsules, FAQ
  answers, alt text, meta, schema, button labels. `check-claims.mjs` §6 fails on it.
- **"owner builder" — open, no hyphen — in all prose.** Searchers use the open form ~215:5 in GSC.
  Keep the hyphen only when quoting a regulator's exact document name, and in URL slugs.
- **Spell out durations in prose and capsules** ("five years"); numerals only in data cells, sticky
  bars, CTAs and meta.
- **Bullet lists 3 to 7 items. One idea per paragraph** — new paragraph when the point changes.
- **No CTA inside an answer capsule or an FAQ block.**
- **Never "Enrol now" or "Enrol today".**

---

## Claim rules — the ship-blockers

**ABE Education is NOT an RTO.** Never claim it is, in copy or schema. Full model:
`kb/rules/authority-model.md`. Short form, by jurisdiction:

| Model | Say | Never say |
|---|---|---|
| **State-approved-direct** (QLD/QBCC, TAS/CBOS) | "Approved by [regulator]", Certificate of Completion | RTO, accredited, Statement of Attainment |
| **Knowledge-requirement** (WA / Form 75) | "supports your Form 75 owner-builder approval" | "WA-approved course/provider"; "permit" or "licence" for the owner-builder step (it is an *approval*) |
| **ASQA-accredited** (White Card, asbestos/silica) | name the RTO partner + number; "nationally recognised" is accurate; carry ASQA disclosure | that ABE delivers, assesses or issues; that ABE developed it |

**Registration is not entitlement.** An RTO's right to deliver a nationally accredited course is gated
per RTO, per state, by its own scope entry — and sometimes by a further regulator agreement on top.
Check the scope, not just the registration. This has blocked real work twice: NSW Owner Builder (units
not on the RTO's scope) and QLD White Card under a new partner (no WHSQ agreement on the published
list).

**Never default a regulatory fact.** Verify it, or mark it explicitly UNVERIFIED. **A plausible figure
is worse than a visible gap**, because nothing downstream can tell it is wrong.

**`[confirm: ...]` marks a regulatory fact awaiting verification and nothing else.** It is never an
IOU for an internal fact — those are asked at Stage 1. A marker warns on a noindexed page and
**hard-blocks the build the moment the page is indexable**.

---

## Worked example — brief to draft

**Brief:**
```
Section: Does this course count towards my CPD?
Claim: Counts towards [regulator]'s CPD requirement, Building Law category, 2 points.
Reader arrives: needs points, unsure this one qualifies, mildly sceptical.
Objection defused: "I'll do it and then find out it doesn't count."
Distinctive material: competitors state points but not category; category is
       what practitioners are audited on.
Fails if: the answer is not complete within the capsule, or the category is
       stated without its source.
```

**First draft, weak:**
> Continuing professional development is an important requirement for licensed builders in Tasmania.
> This course has been designed to help you meet your obligations. It is worth 2 CPD points and covers
> important topics in building law. Enrol today to keep your licence current.

Everything wrong at once: opens with a definition the reader does not need, spends the research
nowhere, states points without category or source, and closes with a banned CTA inside an answer
block. Two breaches in the last sentence.

**Rewritten:**
> This course counts as Building Law under CBOS Tasmania's CPD requirement, and carries 2 points.
> Building Law is the category most practitioners come up short on at audit, because it is the hardest
> to accumulate incidentally on the job. Completing it is recorded against your licence automatically.
>
> ✓ VERIFIED · 🔗 SOURCES — CBOS CPD requirements, verified [date]

Answer complete in the capsule. Category leads, because that is the gap. The reason it matters is
stated, which is the translation move. Source carried. No CTA in the answer block.

---

## Ask, don't assume

- **Ask** when the request forks into materially different outputs, or a needed constraint is missing
  and cannot be inferred.
- **Look first.** The brief, `pipeline/{slug}/` and `kb/` before asking. Re-asking for something
  already on disk is its own failure.
- **Closed questions** (either/or, confirm-or-correct) use the interactive question tool, most likely
  value offered as one option. **Open questions** in plain prose. Batch up to three.
- **Subagents cannot ask.** A subagent that hits an unknown stops and reports upward. Never guesses.

---

## Related

- `.claude/skills/abe-course-page-astro/references/content-craft.md` — the full Stage 4 method
- `.claude/skills/abe-course-page-astro/references/content-pipeline.md` — stages 1 to 4 method
- `.claude/skills/abe-course-page-astro/references/archetypes/` — per-archetype briefs and worked copy
- `kb/rules/authority-model.md` — the claim rules in full
- `kb/content-source-map.md` — the index into every verified figure
- `CLAUDE.md` — house style and session types
