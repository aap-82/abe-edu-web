# Stage 5 — section plan and component selection

**Page:** `/cpd-building-tas` · **Produced:** 23 July 2026

**This artefact was missed on the first pass, and its absence caused real defects.** Stage 5 is the
brief-to-page mapping: the ordered sections with ids, nav labels, markers, H2s and carriers. Without
it nothing checked that the built page had the sections `03-briefs.md` specified, and two failures
went unnoticed until the page was read months-of-work later:

1. **S6 "How long it takes" disappeared as a section.** It was written in `04-content.md` under its
   own H2, then folded into `#how` as a stray paragraph on the way to the page. That also put time
   in the wrong place in archetype 4's decision order, which runs
   totals → obligation → contents → value → **time** → act, and left the act section opening on
   something that was not an action.
2. **S1 and S4 were merged silently**, and S5's value comparison leaked into the merged section.

Both are now fixed. The merge is kept, because it is the better editorial call, but it is recorded
here rather than left implicit.

---

## 1 · Section plan, as built

| # | Marker | id | Nav label | H2 | Brief | Carriers |
|---|---|---|---|---|---|---|
| 1 | — | `whats-in` | What is in it | What is in the building bundle? | **S1 + S4** | AnswerCapsule · Note(caution) · member table |
| 2 | 01 | `your-year` | Your year | Does twelve points cover your whole year? | S2 | AnswerCapsule · FactGrid · VerifiedSources |
| 3 | 02 | `what-counts` | What counts | How many of these points will actually count? | S3 | AnswerCapsule · Note(caution) · VerifiedSources |
| 4 | 03 | `cost` | Cost | What does the bundle cost? | S5 | AnswerCapsule · PriceCard |
| 5 | 04 | `how-long` | How long | How long does the bundle take? | **S6** | AnswerCapsule · prose |
| 6 | 05 | `how` | How it works | How does the bundle work? | S7 | AnswerCapsule · Stepper · Note(caution) · VerifiedSources |
| 7 | 06 | `content-review` | — | Who wrote and reviewed this page? | S8 | Credentials |
| 8 | — | `faq` | FAQ | Common questions about Tasmanian builder CPD | S9 | Faq |
| — | — | footer | — | — | S10 | SourcesFooter |

`whats-in` and `faq` carry no marker deliberately: the numbered sequence covers the argument, and the
opening summary and the FAQ sit outside it. The layout owns no marker at all, which is why the
sequence is authored entirely in the MDX body.

## 2 · Deviations from `03-briefs.md`, and why

**S1 + S4 merged into one section.** The briefs separated "what this bundle covers" (the totals) from
"what is in the bundle" (the member table). For this reader they are one question: *what am I getting
for my money?* Splitting them would have put a heading between a total and the list that proves it.
The merge is kept. **What was wrong was doing it silently**, so a later reader could not tell whether
a required section had been dropped or deliberately combined.

**S5's value comparison belongs in `#cost` only.** `04-content.md` put the "$1,188 bought separately"
line into the opening section as well as the cost section. That drift stopped at the artefact: the
built page carries the figure only in `#cost` and in `priceRows`, so nothing needed changing on the
page. Recorded because it shows the same slippage as S6, caught one stage earlier by luck rather
than by a check.

**S6 restored to its own section** at position 5, between cost and act, matching the decision order.

## 3 · Component selection

Chosen by content shape against the live `/styleguide`, not by what the previous page used.

| Shape | Component | Where |
|---|---|---|
| 40–60 word direct answer opening a section | `AnswerCapsule` | every section except FAQ |
| Caveat, exception, legal consequence | `Note variant="caution"` | the WHS cap, the pre-purchase check, record-keeping |
| Four parallel scannable facts | `FactGrid` | the requirement table in `#your-year` |
| Money and what is included | `PriceCard` | `#cost` |
| Ordered process | `Stepper` | `#how` |
| Government-fact provenance | `VerifiedSources` | every section stating a CBOS fact |
| Named-person E-E-A-T proof | `Credentials` | `#content-review` |
| Question-and-answer pairs | `Faq` | `#faq` |
| Derived member list | member table in `CpdBundleLayout` | `#whats-in` |

**No new components were built.** Everything the page needs already existed, which is the outcome the
protocol wants: compose first, promote on repetition, build only what is genuinely new.

## 4 · Prop contracts worth knowing

Recorded here because they are invisible at the call site and both have already cost time on this
page.

- **`Note` — keep MDX slot content on ONE line.** It renders a `<p>`, and MDX wraps multi-line JSX
  children in a `<p>` of their own. A paragraph inside a paragraph is invalid, so the browser hoists
  the text out and the callout renders empty with the body stranded beneath it. **The build passes.**
  Now documented in `Note.astro`. Multi-line is fine in `.astro`, where there is no markdown pass.
- **`VerifiedSources` joins `facts` to `sources` with the word " against ".** A `facts` string that
  already ends "checked against…" renders "against … against". This shipped three times on this page
  before it was caught.

## 5 · What this artefact is for

The next run should be able to read this table, open the built page, and confirm the two match
without reading the content. That check is what did not exist, and its absence is the reason a
required section vanished between Stage 4 and the page while every automated gate stayed green.
