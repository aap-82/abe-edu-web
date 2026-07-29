---
date: 2026-07-30
skill: design-session
subject: contact-ownership
verdict: Green
graded_by: self
---

# Design review — who owns the partner's contact details, 2026-07-30

## Verdict

**Green.** Small, clean, and it took one decision rather than a third filing. Contact details rendered
twice on every ASQA page from the same partner record; `PartnerDisclosure` now owns them and
`Credentials` does not.

## The decision

Both components read `src/content/partners/*.md`, so both emitted the same address and the same
number. **`PartnerDisclosure` owns contact**, for the same reason it owns the blurb:

- It **is** the disclosure block, placed after the hero for compliance. "Who delivers this, and how
  you reach them" is one thought, and splitting it across two screens is what made it read as
  duplication rather than as reinforcement.
- It **presents them better**: a labelled `<dl>` with `Email` and `Phone` terms, against the bare pair
  of links `Credentials` rendered.
- **Credentials are what an organisation holds; contacting it is an action.** The card keeps what only
  it can say — RTO badge, credential list, verification link, checked date.

This is the third duplication removed from the `Credentials` org card, after the blurb and the
redundant role line. That is worth naming: the card was accumulating whatever the partner record
happened to expose, rather than carrying a defined job. It has one now.

## Measured

| | Before | After |
|---|---|---|
| `white-card-wa` — email / tel strings | 4 / 2 | **2 / 1** |
| `white-card-tas` — email / tel strings | 4 / 2 | **2 / 1** |
| Email visible on the page (browser) | 2 | **1** |
| Contact blocks per ASQA page | 2 | **1** |
| Design handover | 31 open · 24 closed | **29 open · 26 closed** |

Build green at 20 pages, `astro check` 0 errors. `.org-contact` left no orphaned CSS — the class never
had a rule.

**Checked the card did not become sparse**, because three removals in one day is how a component gets
hollowed out by accident. Measured in the browser: the org card and the expert card beside it are
**both exactly 377px tall** — the grid equalises them, so the section reads as balanced, not as one
full card beside one thin one.

Confirmed the disclosure still carries the contact (`.pl-col a[href^="mailto:"]` present), so nothing
was lost from the page — only the second copy.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- [design] The `Credentials` org card has now had three things removed from it in one day (blurb, role
  line, contact). Each removal was right on its own; nobody has re-read the card as a whole since. Worth
  one deliberate look at what it should say, rather than continuing to subtract.
- [skills] Three duplications between `PartnerDisclosure` and `Credentials` were each found by eye, on
  three separate occasions, because both components read the same partner record and nothing compares
  their output. A check that flagged the same partner-record field rendering twice on one page would
  have found all three at once. Second filing of this shape (the first named contact specifically).

## Output
- [x] **Fix applied** — `Credentials` no longer renders contact; 2 demand items closed.
- [x] **Design-register change** — none; rule 7 not triggered.
- [x] **Styleguide specimen** — unchanged and valid; the `Credentials` specimen renders the same
  component, and the `PartnerDisclosure` specimen still demonstrates the contact treatment.
- [ ] **Memory written** — not needed; the decision is in the component comment where the next person
  to consider re-adding it will meet it.

## Grader note

`graded_by: self`. Reproducible: grep `admin@bluedogtraining.com.au` across `dist/*/index.html` for the
counts, and the two card heights are readable from the DOM. The judgement call is which component
loses, and the honest counter-argument is that a reader who reaches the credentials block at the foot
of the page now has to scroll back up to find the contact — my answer is that the FAQ carries "who do
I contact about training issues" as a mandated disclosure, so the page answers that question in prose
regardless.
