# 05 — Section plan and component selection — `white-card-nsw`

One row per section. The **Brief** column is the point of this artefact: it is the only thing mapping
`03-briefs.md` onto the built page, and it is what makes the Stage 7 conformance check possible.

| # | `id` | Marker | Nav label | H2 | Brief | Components | Band |
|---|---|---|---|---|---|---|---|
| — | *(none)* | — | — | What do you need to know before you enrol? | *(page-level, from hero facts)* | `Section` · `AnswerCapsule` · `FactGrid` (glance) | bg-alt |
| 1 | `real` | 01 | Is it real? | Is this a real White Card? | **S1** | `Section` · `AnswerCapsule` · .measure prose · btn-link · `VerifiedSources` · `SectionWayfinder` | — |
| 2 | `online` | 02 | Online in NSW? | Can you do the NSW White Card online? | **S2** | `Section` · `AnswerCapsule` · .measure prose · `CanCant` · `VerifiedSources` · `SectionWayfinder` | bg-alt |
| 3 | `accepted` | 03 | Where accepted | Where is a NSW White Card accepted? | **S3** | `Section` · `AnswerCapsule` · .measure prose · `Note variant="caution"` · `VerifiedSources` · `SectionWayfinder` | — |
| 4 | `your-card` | 04 | Your card | What do you get, and when does the card arrive? | **S4** | `ZSection` · `AnswerCapsule` · .measure prose · `FactGrid` · `VerifiedSources` | — |
| 5 | `cost` | 05 | Cost | What does the NSW White Card cost? | **S5** | `Section` · `AnswerCapsule` · `PriceCard` (`priceRows`) · `SectionWayfinder` | bg-warm |
| — | *(none)* | — | — | Nationally recognised, delivered by an RTO | *(trust furniture)* | `TrustBand` · `TrustStats` · `AnswerCapsule onDark` | dark |
| 6 | `how-it-works` | 06 | How it works | How does the session run? | **S6** | `Section` · `AnswerCapsule` · .measure prose · `Stepper` (`howItWorksSteps`) · `Note variant="caution"` · `VerifiedSources` · `SectionWayfinder` | — |
| 7 | `content-review` | 07 | Reviewed | Who develops the course, and who checks this page? | **S7** | `Section` · `AnswerCapsule` · `ExpertCredentials` · `SectionWayfinder` | bg-alt |
| 8 | `faq` | 08 | FAQ | Common questions | **S8** | `Section` · `Faq` · `VerifiedSources` · `SectionWayfinder ready` | — |

Plus the layout-rendered `#rto-partner` `PartnerDisclosure` card, from `partnerRto` frontmatter,
`placement: after-body`. **Not a section** and deliberately not in the table above as one: it carries no
H2, no capsule and no sources. Section 1 exists precisely because that card cannot answer the
archetype's core question. See archetype 02 §3.

---

## Deviations from the briefs, and why

**None of the eight briefed sections was merged, moved or cut.** Section order is exactly the brief
order. Two additions were made at this stage, neither of them a briefed section:

1. **The "At a glance" opener.** Carried by every course page in the repo. It is the hero's facts in a
   `FactGrid`, not new content, so it has no brief and takes no marker.
2. **The `TrustBand`.** Site trust furniture between `#cost` and `#how-it-works`, the same position it
   takes on `white-card-tas`. No marker, no brief.

**One change to `03-briefs.md` S8, made here.** The FAQ opens with the **three ASQA-mandatory
questions** — who delivers the training, who to contact about a training or assessment problem, and
how to verify the RTO. `kb/rules/asqa-disclosure-framework.md` requires them at disclosure location 5,
and the Stage 3 brief omitted them. They go first; the eight briefed questions follow, minus
"Who issues the Statement of Attainment?", which the mandatory trio already answers better. Net FAQ
length: ten items.

---

## Prop contracts that are invisible at the call site

Recorded because they are not discoverable from the MDX and have cost this pipeline time before:

- **`ExpertCredentials` takes `developerRto`, not a second expert.** On an asqa-accredited page it
  renders the RTO as the developer and the ABE reviewer as the reviewer. Passing a second expert in
  `experts:` produces two `Person` nodes and **fails the build**. `experts: ["warwick-smith"]` only.
- **`Stepper` `body` accepts a string or an array of strings.** An array renders as separate
  paragraphs. Used here for steps 2 and 3.
- **`AnswerCapsule onDark`** is required inside `TrustBand`; the plain form is unreadable on the dark
  band. (There is a newer `lede` prop on `TrustBand` that deprecates this slot; four call sites still
  use the slot, and migrating them is a filed content-owned item, not this run's job.)
- **`VerifiedSources` `date` is a display string**, not parsed. Format `1 Aug 2026`.
- **`FactGrid` `note` is single-line** in effect: long notes wrap badly against the value column.
- **`SectionWayfinder ready`** marks the final wayfinder that points at the CTA rather than another
  section.

---

## Image slots

Both slots ship as **FPO placeholders**: `imgSrc` / `artefactImg` are deliberately **omitted**, not
pointed at filenames that do not exist. `check-assets.mjs` fails the build on an image reference whose
file is not tracked in git, and `resolveImage()` returns an unmatched basename unchanged, which is how
a live `<img>` to a 404 shipped on an indexable page once already.

| Slot | Section | Spec |
|---|---|---|
| Hero artefact | hero | 4:5 portrait · ~1000×1250 · `artefactRatio: "r45"` |
| ZSection image | `#your-card` | 4:5 · ~520×650 |

Prompts and exact target filenames: `06-image-prompts.md`.

---

## Guardrail checks this plan must satisfy

- One H1 (the hero). Eight question-led H2s, markers 01 to 08 in sequence.
- Every `nav.sectionId` matches a rendered `id`. Nav has eight entries.
- Capsules 40 to 60 words, each answering its own heading's question type. `#accepted` (Where),
  `#your-card` (What/When), `#cost` (What does it cost), `#how-it-works` (How) and `#content-review`
  (Who) must **not** open yes/no; `#real` and `#online` (Is/Can) must.
- Exactly **one** `Person` node. RTO as `Course.creator`.
- `priceNumber` equals `price` equals `Course.offers.price`.
- **Breadcrumb omits the `/white-card` middle crumb** until W3-6 ships. `Home > White Card NSW` only.
- No inline styles, no structural classes in the MDX body beyond .measure and `.btn-link`, which are
  established prose utilities.
