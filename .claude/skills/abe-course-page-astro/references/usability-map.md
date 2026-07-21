# Usability map — which source answers which question

Usability knowledge lives in three places for good reasons: one is content logic, one is a
measuring instrument, one is a visual register. Merging them prematurely would break an audit skill
that currently works. But "read all three and work it out" is not a system, so this is the router.

**Read this file, go to the one source that answers your question, and stop.**

| Your question | Go to | Not to |
|---|---|---|
| What component carries this content? | `component-selection.md` — content type to component, and the wrong instinct to avoid | the design register (it has no content logic) |
| Which element suits what the reader is doing right now? | `component-selection.md` § "Choosing the element by the reader's job" | `abe-readability-audit` (it measures, it doesn't choose) |
| Callout, list, table, accordion or diagram? | `component-selection.md` § "Element rules that follow" | anywhere else |
| How wide should the measure be? Line height? Body size? | `abe-readability-audit` — the measured standards (~60-66 CPL, >=16px, 1.4-1.6 leading) | `component-selection.md` |
| Does this page pass readability? | `abe-readability-audit`, run it | reading rules and eyeballing |
| What colour, token, spacing value, or type scale? | the design register in the repo (`src/styles/global.css` tokens + `/styleguide`) | either markdown file — neither carries tokens |
| Where does the CTA go? Sticky? Repeated? | `abe-readability-audit` (placement standards), then `component-selection.md` for the carrier | guesswork |
| Is this component allowed to exist? | `guardrails.ts` rule 2 and the styleguide | any of the three |

## The consolidation trigger

If a run has to open **all three** to answer **one** layout question, that is the signal the split
has stopped paying for itself. Record it in the run's Stage-9 demand list. On the second occurrence,
merge `component-selection.md` and the placement standards into this skill and leave
`abe-readability-audit` as a pure measuring instrument.

Until then the split stands: one file decides, one measures, one styles.
