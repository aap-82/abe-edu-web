# Image prompts — every open placeholder slot, 2 August 2026

Measured from `dist/`, not from the tracker. **18 FPO placeholder slots sit on 11 `index,follow`
pages.** This file is the brief for all of them: 14 to generate, 4 that must never be generated, and
4 of those 18 that cannot be closed from content alone.

`styleguide` is excluded throughout. Its 8 placeholders are the component specimen and are correct.

## Register: photographic. Confirmed by Andrey, 2 August 2026

Every prompt below is a **photorealistic editorial photograph**.

This was an open question when the file was first written, because the two most recently shipped
images — `white-card-wa-hero` and `white-card-wa-ppe-demonstration` — are single-weight maroon line
art, and no run record described what was in the QLD or WA owner builder frames. **Andrey has
confirmed: `/white-card-wa` was an experiment, and every other shipped image is a photograph.**

So the line-art register is the outlier, not the house style, and this brief does not extend it.
`references/image-prompts.md` still admits a "schematic / drawing motif" as an image that earns its
place, and `skill-reviews/design/2026-07-29-maroon-in-illustration.md` still permits maroon line work,
so nothing is being overturned — the two WA images remain legitimate. They are simply the only two
of their kind on the site. **See the note at the end of this file: that is now a `[design]` question,
and it did not exist until the register was settled.**

## No negative space required — confirmed by Andrey, 2 August 2026

An earlier draft of this brief asked every prompt to leave one edge quiet "for the text overlay",
following the generic template in `references/image-prompts.md`. **Checked against the components
that actually place these images, and it does not apply here.** `Hero.astro` and `ZSplit.astro` both
put the artefact image in its own column (`.z-img`), fully separate from the heading and body copy —
a two-column split, not a hero with text set over a photograph. There is no overlay to protect, so no
prompt below reserves space for one. Compose each frame on its own merits.

## Certificate slots — real ABE design, legible, fake student. Confirmed by Andrey, 2 August 2026

**Four slots — 1, 4, 10, 11 — are an exception to the "unreadable certificate" rule below, and only
those four.** ABE Education's own Certificate of Completion and CPD certificate are not an
accreditation claim — they are exactly what a buyer receives, and ABE is honestly the issuer. Showing
the real design legibly is accurate, not a misrepresentation, provided the *person* on it is not real.

Andrey has supplied six real ABE certificates as reference, in
`new site/examples of the certificates/`. That folder is `.gitignore`d by the blanket `*.pdf` rule
(confirmed before writing this — the six files are not tracked and will not be committed), and it
contains **real customers' email addresses and phone numbers**, so treat it as sensitive even though
it sits outside `kb/register/`. Two distinct real templates are in there, and they must not be mixed:

| Template | File to attach | Used for |
|---|---|---|
| **Owner Builder — Certificate of Completion.** White ground, thin maroon corner-bracket border, the maroon gem/hexagon mark top-left, a faint diagonal repeat of the same mark as a watermark across the body, serif "CERTIFICATE OF COMPLETION" letterspaced heading. | `certificate-act-owner-builder-education-course-6563efca7dee2dd3c9011906 (2).pdf` for slot 1; `certificate-tas-owner-builder-2026-69b79a1112460557890448af.pdf` for slot 4 | Slots 1, 4 |
| **CPD — Certificate of Completion.** White ground with a bold diagonal maroon-to-gold ribbon across the top-right and bottom-left corners, the gem mark on the ribbon, "Certificate" in large thin serif over "OF COMPLETION", a label:value table (Title / Points / Mode of Delivery / Completion Date / Certificate Number / Email / Phone / Licence Number). | `certificate-tas-all-trades-cpd-fire-risk-awareness-1-pt-695a48dc48cd85166404b4f6 (2).pdf` | Slots 10, 11 |

The two `.pdf`s are the ground truth for their template's exact layout — the table above describes
them so a reader without the files can still follow this section, but **the prompt should be run with
the matching file attached** (export page 1 to PNG first if the generator does not accept a PDF
upload). Do not attach the QLD or WA owner builder certs, or the NSW termite one — QLD and WA already
shipped their hero images, and termite CPD is not one of ABE's three current CPD states.

**Fake data, exactly as instructed:** student name **John Student**, completion date **1 Jan 2026**,
certificate number **ABE001**. Every other visible field — logo, border, colours, headings, layout —
is reproduced faithfully from the attached file.

**Two fields Andrey's instruction did not name, decided here and flagged for override:**
- **Email and phone**, present on both templates. Left blank they would look like a broken render, so
  each prompt below fills them with an obviously-placeholder pair (`john.student@example.com`) rather
  than leaving them empty or inventing something that could read as real.
- **CPD-only: Title, Points, Mode of Delivery, Licence Number.** These are copied **verbatim** from the
  attached reference and NOT changed. This is a deliberate choice, not an oversight: "Points" is a
  register-owned figure, and inventing a number for a hero image would be a second copy of a figure
  `kb/register/` owns — exactly the failure mode the earlier draft's "no numerals" guardrail existed to
  prevent. Copying the real single-course certificate (1 point, a real live course) sidesteps that
  entirely, because nothing is being asserted that is not already true. Licence Number is left as the
  reference shows it purely because changing it risks introducing a *new* number with no source; if
  that reads as a real person's licence, blur that one field only and keep the rest legible.

**The gem-mark logo does not generate correctly, and prose will not fix it — composite it instead.**
Confirmed on slot 1's third pass, 3 Aug 2026: both ChatGPT and Gemini invented their own facet
geometry for "the maroon gem-mark logo", and neither matched the real mark. This is a different class
of failure from the wording and layout misses earlier in this file. Wording is instructable — a model
follows "copy this sentence verbatim" because it is manipulating text it already renders reliably. A
bespoke vector mark is not: "gem-shaped hexagonal logo" describes a family of possible shapes, and the
model has no canonical answer to reconstruct, so it draws a plausible one instead of the real one.
Tightening the prose further is unlikely to close that gap and is not worth another regeneration to
find out.

**Do this instead, for all four certificate slots:** generate the scene as normal, then composite the
real mark over the generated one afterward in an image editor — either cropped directly from the
attached certificate PDF (it is a small, flat, fixed-position graphic, trivial to lift and paste), or
from ABE's own logo asset if the gem mark exists as a separate file from the sitewide logotype already
in the R2 brand bucket referenced in CLAUDE.md. That guarantees the mark is correct instead of
approximated, for the one element in this brief that was never going to be reliably instructable.

## What every prompt below already obeys

From `references/image-prompts.md` and `references/seo/alt-text-guidelines.md`, so none of it is
repeated per slot:

- **No text anywhere in the frame, EXCEPT the four certificate slots above (1, 4, 10, 11).** Every
  other slot: no words, letters, numbers, logos, watermarks or signage.
- **Nothing that reads as accreditation, EXCEPT the four certificate slots above.** Everywhere else, no
  crest, seal, ASQA mark or anything resembling a nationally recognised certificate; certificates that
  are not one of slots 1/4/10/11 appear plain, blurred and unreadable. This is the authority model, not
  a style preference, and the exception is narrow: it covers ABE's own Certificate of Completion and
  CPD certificate specifically, never a partner RTO's Statement of Attainment — see slot 12's guardrail.
- **No identifiable faces.** This matters far more in photography than it did in line art. Every
  prompt with a person in it specifies turned away, cropped, seen from behind, or thrown out of focus.
  A recognisable generated face is a person who can be mistaken for a real student or trainer.
- **No real brands or trademarked products.**
- **Australian residential-construction context**, state-correct where the page is state-specific.
- **Alt text 80-125 characters** (CR2), en-AU (CR11), unique (CR7), never opening "Photo of" or
  "Image of" (CR4), never restating the surrounding copy (CR8). Every count below was measured.
- **AVIF** (T2), under 100 kB (T3), descriptive filename (T1). Width, height and lazy-loading are
  emitted by `Placeholder.astro`, so T5 and T6 need nothing from you.

**Shared photographic spec, assumed in every prompt:** natural Australian daylight, warm neutral
colour grade, shallow depth of field, candid documentary style. No studio lighting, no flash, no
stock-photo grin, no posed group shots, no lens flare, no heavy vignette.

**What photography must avoid that line art could not fall into.** `references/image-prompts.md`
rules out hero lifestyle photography, generic construction stock and anything purely atmospheric.
A couple in clean hard hats smiling at plans is the exact shot it names. Every slot below is either
**an artefact** or **a person mid-task with their face away** — never a lifestyle tableau.

## How to close a slot

1. Generate, and save to `src/assets/images/` under **the exact filename below**.
2. Add the prop back with **the alt text below, verbatim**.
3. `git add` the file. `check-assets` fails a build where the pointer exists and the file is untracked
   — that is the exact condition that shipped a 404 hero on `/white-card-tas`.
4. `npm run build`.

`src/lib/images.ts` matches on **basename** against `src/assets/images/`, and returns the string
unchanged when there is no match — so a filename typo ships a live `<img>` pointing at a 404 rather
than failing. The filename is the whole contract.

---

# A · Generate these 14

## /act-owner-builder-course — 3 slots

State-approved-direct via Access Canberra. Certificate of Completion, certificate under five years old
at application, around three hours. Canberra: brick-and-tile and light-clad suburban housing, dry
eucalypts, the hard flat inland light of the Limestone Plains.

### Slot 1 · Hero artefact
- **File:** `src/assets/images/act-owner-builder-course-hero.avif`
- **Prop:** `hero.artefactImg: "/images/act-owner-builder-course-hero.avif"`
- **Spec:** 4:5 portrait · ~1000×1250 · AVIF

**Alt** (100)
> A Certificate of Completion on a tablet beside rolled plans on a workbench at a Canberra home build.

**Reference image to attach:** `new site/examples of the certificates/certificate-act-owner-builder-education-course-6563efca7dee2dd3c9011906 (2).pdf`
(export page 1 to PNG if the generator needs an image, not a PDF).

**Third pass — orientation and content locked, not left to "reproduce faithfully".** Two prior
generations each fixed one thing and broke another: the first was flat-lit and studio-clean; the
second solved the light but paraphrased the copy, dropped the footer, and came out landscape against a
portrait spec. "Reproduce faithfully" was not tight enough to survive three regenerations, so this pass
states the exact text, exact order and exact orientation as hard constraints rather than trusting the
attached reference alone to carry them.

**ChatGPT / DALL-E**
> HARD REQUIREMENT, checked before anything else: the final image is a **TALL PORTRAIT photograph, 4:5
> ratio, narrower than it is tall, approximately 1000 x 1250 px**. Do not generate landscape or square.
>
> Using the attached certificate as the visual reference for layout, colours, logo and border, reproduce
> ABE Education's Certificate of Completion with this exact text, in this exact order, nothing
> paraphrased and nothing omitted:
> - Header: the maroon gem-mark logo top left, "CERTIFICATE OF COMPLETION" beside it in letterspaced
>   serif capitals.
> - Centred: "This is to certify that" / **John Student** in large bold serif / "has completed the
>   following online learning" (this exact sentence, not a paraphrase) / **ACT Owner-Builder Education
>   Course** in bold.
> - A faint diagonal repeat of the gem-mark watermark behind this text.
> - A left-aligned data block, bold labels, in this exact order and no other order:
>   "Date Completed: 1 Jan 2026" / "Email Address: john.student@example.com" / "Phone Number:
>   0400 000 000" / "Certificate Number: ABE001".
> - Bottom right of the certificate, smaller right-aligned text, in this exact order:
>   "ABE Education" / "ABN 64 125 455 272" / "www.abeeducation.edu.au" / "PO Box 179 SUMMER HILL
>   NSW 2130" / "Phone 02 9798 5000".
> - A thin maroon corner-bracket border at all four corners.
> All certificate text sharp and fully legible.
>
> Then place this certificate into a photorealistic scene, shot from slightly above: the certificate on
> a tablet held upright and angled toward the camera, propped against a roll of building plans, on a
> scuffed timber workbench, held close enough and large enough in frame that every line stays readable.
> Keep the tablet's screen brightness turned up to compete with the outdoor daylight, with a soft natural
> reflection or touch of glare across part of the glass — that read as genuinely photographed in the
> last version and should carry over — whites reading slightly warm rather than clinical. Beside it, the
> rolled plans, a carpenter's pencil and the brim of a white hard hat entering the frame at the edge.
> Behind the bench, **aggressively out of focus, strong enough that no structural detail is readable, only
> soft colour and shape** — the part-built single-storey house frame and dry eucalypts. Hard bright
> inland daylight from the upper left, warm neutral colour grade. Documentary product photography, no
> styling. No other text anywhere in the frame besides the certificate itself, no other logos, no
> watermarks besides the certificate's own.
>
> Reminder: the finished image must be portrait, 4:5, taller than it is wide — check this before
> returning it.

**Gemini**
> HARD REQUIREMENT: final image is TALL PORTRAIT, 4:5 ratio, approximately 1000 x 1250 px, narrower than
> tall. Not landscape, not square.
>
> Using the attached certificate for layout, colours, logo and border only, reproduce ABE Education's
> Certificate of Completion with this exact text and order, nothing paraphrased: gem-mark logo top
> left beside "CERTIFICATE OF COMPLETION" in letterspaced serif capitals; centred "This is to certify
> that" / John Student in large bold serif / "has completed the following online learning" (exact
> wording) / ACT Owner-Builder Education Course in bold; faint diagonal gem watermark behind; a
> left-aligned bold-label data block in this exact order — "Date Completed: 1 Jan 2026", "Email
> Address: john.student@example.com", "Phone Number: 0400 000 000", "Certificate Number: ABE001"; then
> bottom right, smaller right-aligned — "ABE Education", "ABN 64 125 455 272", "www.abeeducation.edu.au",
> "PO Box 179 SUMMER HILL NSW 2130", "Phone 02 9798 5000"; thin maroon corner brackets at all four
> corners. All text sharp and legible.
>
> Place it on a tablet held upright and angled toward camera, propped against rolled plans, on a
> scuffed timber workbench, large enough in frame that every line stays readable. Screen brightness
> turned up to compete with outdoor daylight, with a soft natural reflection or glare across part of the
> glass, whites reading slightly warm. Rolled plans, a carpenter's pencil and the brim of a white hard
> hat at the edge of frame. Behind, aggressively out of focus so no structural detail reads, only soft
> colour and shape — the part-built house frame and dry eucalypts. Hard bright inland daylight from the
> upper left, warm neutral grade. Documentary style, no styling. No other text, no other logos.
>
> Confirm before finishing: portrait orientation, 4:5, taller than wide.

**Guardrails:** this is the certificate exception — see "Certificate slots" above before using this
prompt. **Orientation is a hard technical requirement, not a style note** — the slot's box is portrait,
and a landscape result cannot be dropped into it without cropping the certificate illegible or
squashing the photo, so a landscape output must be regenerated, never rotated or cropped into shape.
**The footer and the "has completed the following online learning" line are copied verbatim, not
paraphrased or dropped** — the certificate exception's whole premise is a faithful reproduction of a
real document, and a paraphrase or a missing field is a small fidelity failure the same way a wrong
field order was last time. The tablet must hold the certificate large enough that the text genuinely
resolves. No second logo or crest anywhere else in the frame — the certificate's own mark is the only
one. The background blur is stated more strongly this pass because two prior generations rendered the
house frame with real structural detail against a "thrown well out of focus" instruction that did not
land; if it still reads sharp, the fix is depth of field in the prompt, not accepting the drift.
**The gem-mark logo came out wrong on this pass, in both generators — see "Certificate slots" above.**
Do not try to fix it with a fourth, more-detailed description of the mark's geometry; composite the
real logo over the finished image instead. This is the only remaining open item on this slot.

### Slot 2 · Site Z-split
- **File:** `src/assets/images/act-owner-builder-course-site.avif`
- **Prop:** `imgSrc="/images/act-owner-builder-course-site.avif"`
- **Spec:** 4:5 portrait · ~520×650 · AVIF

**Alt** (107)
> An owner builder checking plans against the timber frame of a part-built Canberra house in afternoon light.

**ChatGPT / DALL-E**
> A photorealistic vertical 4:5 photograph of a person standing on a suburban building block, seen
> from behind and slightly to one side, holding an unrolled sheet of plans at chest height and looking
> past it at a part-framed single-storey house: timber wall frames, roof trusses, a concrete slab and
> temporary mesh site fencing. Dry eucalypts and a neighbouring tiled roofline behind. They wear an
> ordinary work shirt and jeans, no branded clothing. **Their face is not visible.** Late-afternoon
> Canberra light raking from the left, warm neutral grade, shallow depth of field with the house
> softly out of focus. Candid documentary style, mid-task, not posed. No text, no readable dimensions
> or annotations on the plans, no signage, no logos.

**Gemini**
> Photorealistic 4:5 vertical photo: a person seen from behind on a suburban building block holding
> unrolled plans at chest height, looking at a part-framed single-storey house with trusses, slab and
> mesh site fencing. Eucalypts and a tiled roofline behind. Ordinary work shirt, no branding, face not
> visible. Raking late-afternoon light, warm neutral grade, shallow depth of field, candid documentary
> style. No text, no readable plan annotations, no logos.

**Guardrails:** the plans must carry **no readable dimensions, standards codes or annotations**. A
drawing showing NCC or BASIX detail on its face becomes a regulatory claim subject to verification,
and BASIX is a NSW scheme that must never read as ACT.

### Slot 3 · Online Z-split
- **File:** `src/assets/images/act-owner-builder-course-online.avif`
- **Prop:** `imgSrc="/images/act-owner-builder-course-online.avif"`
- **Spec:** 4:5 portrait · ~520×650 · AVIF

**Alt** (99)
> A laptop on a kitchen table showing a self-paced course module, with a notepad and a pen beside it.

**Third pass — the second generation over-corrected.** The first was a generic WFH lifestyle photo
with nothing ABE about it. The second fixed that with a warm cream-and-maroon screen and a properly
softened garden — both genuine wins, kept below — but the screen came out **legible**: "Course Module
List", "Course Module 1", "Course Module 3", something reading as "Week 1 Module 2", and button
labels. Describing the screen's content as "a course module list — three or four blocks, one with a
progress bar" gave the model enough of a UI brief that it rendered an actual interface with real-
looking words, and "softly out of focus" lost that contest even though the same instruction correctly
blurred the notepad's handwriting a few words later. A **legible screen with invented course names is
a worse failure than a generic blurred one** — it now reads as a plausible screenshot of ABE's real
platform showing content that may not exist, the same category of risk as a fabricated accreditation
seal: depicting a specific real thing inaccurately is worse than depicting nothing specific. This pass
keeps the colour fix and the garden fix, and replaces the content description with an explicit
prohibition on any legible mark, the same explicit way the notepad instruction already works and the
looser "softly out of focus" evidently did not.

**ChatGPT / DALL-E**
> A photorealistic vertical 4:5 photograph of an open laptop on a domestic kitchen table, shot from
> slightly above and to one side, with no person in frame. The screen shows three or four horizontal
> bars stacked like a curriculum list, one with a thin progress indicator beneath it, **rendered in
> warm cream and maroon tones, not a generic blue or grey SaaS palette**, so it reads as a warm,
> branded course platform rather than any web app. **Every mark on the screen that would normally be a
> word, label or number is instead a blurred, illegible smudge or a plain block of colour — render
> literally zero legible letters, numbers or words anywhere on the screen, the same way the notepad's
> handwriting below is indistinct rather than readable.** A notepad with handwriting reduced to
> indistinct marks, a pen and a half-finished mug of tea beside it. Through a window behind, a suburban
> garden pulled well back in the frame and heavily softened into a warm green wash — bright, hazy,
> offering no competing detail. Warm afternoon light from the left, warm neutral colour grade, shallow
> depth of field. Candid, lived-in, uncluttered but not styled. No text, no readable interface, no
> recognisable software, no logos.

**Gemini**
> Photorealistic 4:5 vertical photo: an open laptop on a kitchen table, from slightly above, no person
> in frame. Screen shows three or four stacked bars like a curriculum list with a thin progress
> indicator, in warm cream and maroon tones rather than a generic blue SaaS palette — reads as a
> branded course platform. Every mark that would normally be a word or number is a blurred, illegible
> smudge instead — zero legible letters, numbers or words anywhere on the screen, matching how the
> notepad's handwriting stays indistinct rather than readable. A notepad with indistinct handwriting, a
> pen and a mug beside it. Through the window, a suburban garden pulled back and heavily softened into
> a warm green wash, bright and hazy, no competing detail. Warm afternoon light, warm neutral grade,
> shallow depth of field, candid and lived-in. No text, no readable interface, no recognisable
> software, no logos.

**Guardrails:** the screen must not resemble any real LMS or product, and **must not contain a single
legible letter, word or number** — this is now stated as a hard prohibition rather than trusted to
"out of focus" alone, because "out of focus" already lost once to a content description detailed
enough to prime a rendered UI. If any text is readable at normal viewing size, that is the one thing to
regenerate for; everything else about this pass — the cream-and-maroon colour, the notepad, the
softened garden, the warm afternoon light — was already correct and should carry over unchanged.

**Result, 3 Aug 2026: this prompt succeeded on ChatGPT and failed on Gemini, on the same wording.**
ChatGPT rendered genuinely abstract blurred bars — cream and maroon, a progress indicator, zero
legible marks, exactly the ask. Gemini rendered the same layout with half-formed, garbled near-words
("Notables Deadlines"), a worse outcome than either a clean blur or clean text. **ChatGPT's result from
this prompt is a ready-to-use asset for this slot** — this is not a defect to keep chasing on that
generator. If generating on Gemini, use variant B below instead of retrying this one; two attempts on
Gemini have now produced the same garbled-word failure.

## Variant B — deliberately legible instead of fighting for blur

Written after two attempts (one per generator) at forcing zero legible marks produced one clean result
and one garbled one. Rather than a third round of the same fight, this variant does what the
certificate slots already do: stop asking for illegibility and make the content legible and correct
instead, so there is nothing left for a generator to garble.

**Why generic module names are safe to show, legibly, on a marketing image.** This is a different risk
class from the certificate and the logo. A certificate is evidence of a real credential and the logo is
a trademark — both carry real weight if wrong. A laptop screen in a lifestyle photo is illustrative
product staging, the same category as a phone mockup showing a generic app screen in any SaaS ad; a
reader does not take it as a literal screenshot of ABE's actual LMS. The module names below are chosen
to be true of virtually any structured online course — "Getting Started", "Your Responsibilities",
"Site Safety Basics" — so nothing here asserts a specific fact about ABE's real curriculum that could
later be wrong, the same posture "John Student" already takes on the certificates: obviously
illustrative, not a claim.

**ChatGPT / DALL-E**
> A photorealistic vertical 4:5 photograph of an open laptop on a domestic kitchen table, shot from
> slightly above and to one side, with no person in frame. The screen shows a course platform in warm
> cream and maroon tones, not a generic blue or grey SaaS palette. A heading reads **"Course Modules"**.
> Below it, three rows, each with a small status dot and this exact text, sharp and fully legible:
> **"Module 1: Getting Started — Complete"** / **"Module 2: Your Responsibilities — In Progress"** /
> **"Module 3: Site Safety Basics"**. Beneath the rows, a thin progress bar and the text **"3 of 6
> modules complete"**. No other text anywhere on the screen. A notepad with handwriting reduced to
> indistinct marks, a pen and a half-finished mug of tea beside it. Through a window behind, a suburban
> garden pulled well back in the frame and heavily softened into a warm green wash — bright, hazy,
> offering no competing detail. Warm afternoon light from the left, warm neutral colour grade, shallow
> depth of field. Candid, lived-in, uncluttered but not styled. No other text anywhere in the frame
> besides the screen's own, no other logos.

**Gemini**
> Photorealistic 4:5 vertical photo: an open laptop on a kitchen table, from slightly above, no person
> in frame. Screen shows a course platform in warm cream and maroon tones, not generic blue SaaS. A
> heading reads "Course Modules". Below, three rows with small status dots, exact text, sharp and
> legible: "Module 1: Getting Started — Complete" / "Module 2: Your Responsibilities — In Progress" /
> "Module 3: Site Safety Basics". Beneath, a thin progress bar and "3 of 6 modules complete". No other
> text on the screen. A notepad with indistinct handwriting, a pen and a mug beside it. Through the
> window, a suburban garden pulled back and heavily softened into a warm green wash, bright and hazy,
> no competing detail. Warm afternoon light, warm neutral grade, shallow depth of field, candid and
> lived-in. No other text in the frame besides the screen's own, no other logos.

**Guardrails:** every word on the screen is specified exactly above — if the generator adds, drops or
garbles any of it, that is now a literal transcription error to point at and fix, not a vague
"illegible" judgement call. Do not let the module names drift toward anything more specific than the
three given: a topic that sounds like it names a real regulatory step (a specific approval, a specific
inspection stage) risks reading as a claim about the actual course content, which is exactly what the
generic wording above was chosen to avoid.

**Slot 3 CLOSED, 3 Aug 2026 — Variant B, ChatGPT.** Every line on screen transcribed exactly as
scripted, nothing added or garbled. Andrey's call: this exact-script legible treatment is the winner
between the two working options, and it is now the standard for every laptop-screen slot on the site,
not just this one — see slot 6 below, updated the same day to match rather than risk relearning this
from its own still-open "soft and not legible" instruction, which was the same phrasing that failed
twice on this slot before the exact-script fix.

---

## /tas-owner-builder-course — 4 slots

CBOS-approved, owner builder permit, lodged at Service Tasmania, completed within the twelve months
before lodging for a home. Tasmania: weatherboard and corrugated iron, steeper pitched roofs, cooler
and lower light, wet-temperate vegetation rather than dry eucalypt.

### Slot 4 · Hero artefact
- **File:** `src/assets/images/tas-owner-builder-course-hero.avif`
- **Prop:** `hero.artefactImg: "/images/tas-owner-builder-course-hero.avif"`
- **Spec:** 4:5 portrait · ~1000×1250 · AVIF

**Alt** (104)
> A Certificate of Completion resting on a scuffed workbench beside work gloves at a Tasmanian home build.

**Reference image to attach:** `new site/examples of the certificates/certificate-tas-owner-builder-2026-69b79a1112460557890448af.pdf`
(export page 1 to PNG if the generator needs an image, not a PDF). This is the real TAS certificate,
not the ACT one used for slot 1 — attach the matching file.

**ChatGPT / DALL-E**
> Using the attached certificate as an exact visual reference, reproduce ABE Education's Certificate of
> Completion faithfully — same white ground, thin maroon corner-bracket border, maroon gem-mark logo
> top left, faint diagonal gem-mark watermark, serif "CERTIFICATE OF COMPLETION" heading — with these
> fields changed: name **John Student**; course **TAS Owner-Builder Education Course**; date completed
> **1 Jan 2026**; certificate number **ABE001**; email **john.student@example.com**; phone
> **0400 000 000**. All certificate text must be sharp and fully legible.
>
> Then place this certificate into a photorealistic vertical 4:5 scene, shot from directly overhead:
> the printed certificate lying on a scuffed timber workbench, large enough in frame that its text
> stays readable. Beside it, a folded pair of leather work gloves, a carpenter's pencil and the brim of
> a white hard hat entering the frame. Fine sawdust and old saw marks across the bench. Cool, soft,
> overcast Tasmanian daylight, warm neutral colour grade, shallow depth of field. Documentary still
> life, nothing arranged for effect. No other text anywhere in the frame besides the certificate
> itself, no other logos, no watermarks besides the certificate's own.

**Gemini**
> Using the attached certificate as an exact visual reference, reproduce ABE Education's Certificate of
> Completion — white ground, thin maroon corner-bracket border, maroon gem-mark logo top left, faint
> diagonal gem watermark, serif "CERTIFICATE OF COMPLETION" heading — with fields changed to: name John
> Student; course TAS Owner-Builder Education Course; date completed 1 Jan 2026; certificate number
> ABE001; email john.student@example.com; phone 0400 000 000. All text sharp and legible. Place the
> printed certificate flat on a worn timber workbench, shot from directly overhead, large enough in
> frame to stay readable. Folded leather work gloves, a carpenter's pencil and the brim of a white hard
> hat in frame, sawdust and saw marks on the bench. Soft overcast light, warm neutral grade, shallow
> depth of field, documentary still life. No other text, no other logos.

**Guardrails:** this is the certificate exception — see "Certificate slots" above before using this
prompt. Deliberately a different composition and light from the ACT hero — overhead and printed paper,
overcast, where ACT is angled, a tablet screen, and hard sun. Four owner builder pages must not read as
one photograph restated. The certificate must be large enough in frame that the text genuinely resolves.

### Slot 5 · Site Z-split
- **File:** `src/assets/images/tas-owner-builder-course-site.avif`
- **Prop:** `imgSrc="/images/tas-owner-builder-course-site.avif"`
- **Spec:** 4:5 portrait · ~520×650 · AVIF

**Alt** (107)
> An owner builder reviewing plans beside a part-built Tasmanian weatherboard cottage with a steep iron roof.

**ChatGPT / DALL-E**
> A photorealistic vertical 4:5 photograph of a person in a canvas work jacket standing beside a
> part-built weatherboard cottage with a steeply pitched corrugated iron roof, holding a folded sheet
> of plans and looking up at the eaves. **Seen in profile from behind, face turned away and not
> visible.** Scaffold planks, a stack of weatherboards and temporary fencing in the foreground;
> wet-temperate trees and a low green hill behind. Cool overcast Tasmanian light with a warm neutral
> grade, shallow depth of field. Candid documentary style, mid-task. No text, no readable plan
> annotations, no signage, no logos.

**Gemini**
> Photorealistic 4:5 vertical photo: a person in a canvas work jacket beside a part-built weatherboard
> cottage with a steep corrugated iron roof, holding folded plans and looking up at the eaves, seen
> from behind with face not visible. Scaffold planks, stacked weatherboards, temporary fencing; wet
> trees and a low green hill behind. Cool overcast light, warm neutral grade, shallow depth of field,
> candid documentary. No text, no plan annotations, no logos.

### Slot 6 · Online Z-split
- **File:** `src/assets/images/tas-owner-builder-course-online.avif`
- **Prop:** `imgSrc="/images/tas-owner-builder-course-online.avif"`
- **Spec:** 4:5 portrait · ~520×650 · AVIF

**Alt** (102)
> A laptop showing a course module at a kitchen table, with a mug and a roll of site plans alongside it.

**Uses the exact-script legible treatment settled on slot 1 (see "Slot 3 CLOSED" above), not the
earlier "soft and not legible" version below it — that phrasing produced garbled near-words on this
same site's other laptop slot, twice, before the fix.** Content is deliberately different from slot 3's
script so the two pages do not show what looks like the same screenshot: further into the course,
different module names, still generic enough to assert nothing specific about ABE's real curriculum.

**ChatGPT / DALL-E**
> A photorealistic vertical 4:5 photograph, shot from the side at table height, of an open laptop at
> one end of a kitchen table. The screen shows a course platform in warm cream and maroon tones. A
> heading reads **"Course Modules"**. Below it, three rows, each with a small status dot and this exact
> text, sharp and fully legible: **"Module 2: Your Responsibilities — Complete"** / **"Module 3: Site
> Safety Basics — In Progress"** / **"Module 4: Materials and Approvals"**. Beneath the rows, a thin
> progress bar and the text **"4 of 6 modules complete"**. No other text anywhere on the screen. A mug,
> a roll of site plans and a set of keys on the table beside it; behind, a window with rain on the
> glass and a grey garden beyond. No person in frame. Low, cool, overcast light outside, the screen's
> own warm cream-and-maroon glow the only warmth in the frame, shallow depth of field. Candid and
> lived-in. No other text anywhere in the frame besides the screen's own, no logos.

**Gemini**
> Photorealistic 4:5 vertical photo from the side at table height: an open laptop at the end of a
> kitchen table. Screen shows a course platform in warm cream and maroon tones. A heading reads "Course
> Modules". Below, three rows with small status dots, exact text, sharp and legible: "Module 2: Your
> Responsibilities — Complete" / "Module 3: Site Safety Basics — In Progress" / "Module 4: Materials and
> Approvals". Beneath, a thin progress bar and "4 of 6 modules complete". No other text on the screen. A
> mug, a roll of site plans and keys on the table, a rain-streaked window and grey garden behind. No
> person. Cool overcast light outside, the screen's own warm glow the only warmth in frame, shallow
> depth of field, candid. No other text in the frame besides the screen's own, no logos.

**Guardrails:** side-on at table height, where the ACT online slot is from above; rain and grey where
ACT has morning sun — same subject, different frame and different weather, on purpose. Every word on
the screen is specified exactly, so a mistranscription is a literal error to fix, not a judgement call.
Module content differs from slot 3's on purpose — same reasoning as the hero images not repeating one
photograph across pages — but stays equally generic; do not let either slot's module names get more
specific than what is written here.

### Slot 7 · Insurance
- **File:** `src/assets/images/tas-owner-builder-course-insurance.avif`
- **Prop:** `imgSrc="/images/tas-owner-builder-course-insurance.avif"`
- **Spec:** 5:4 landscape · ~640×512 · AVIF

**Alt** (96)
> Stacked framing timber, roof trusses and a wheelbarrow left on an unattended owner builder site.

**ChatGPT / DALL-E**
> A photorealistic horizontal 5:4 photograph of an unfinished residential building site at the end of
> the day, with **no people in frame**: a stack of framing timber under a loose tarpaulin, roof
> trusses leaning against a wall frame, a wheelbarrow tipped on its side, a ladder and coils of cable.
> Temporary fencing across the foreground, a part-built weatherboard house behind. Everything intact
> and orderly, simply unattended. Overcast late light, warm neutral grade, wide depth of field.
> Documentary, plain, unsentimental. No text, no signage, no logos, no watermarks.

**Gemini**
> Photorealistic 5:4 horizontal photo: an unfinished building site at day's end, no people. Framing
> timber stacked under a loose tarpaulin, roof trusses against a wall frame, a tipped wheelbarrow, a
> ladder, coils of cable. Temporary fencing in front, part-built weatherboard house behind. Everything
> intact, just unattended. Overcast late light, warm neutral grade, wide depth of field, documentary.
> No text, no signage, no logos.

**Guardrails:** the section is about **the risk cover protects**, so the site must read as exposed and
unattended — not as an accident. **No damage, no fire, no injury, no collapsed structure, no
police tape.** Depicting a loss event on a page selling insurance is a claim about likelihood, and it
is the one thing this frame must not do. Photography makes this easier to get wrong than line art did:
"unattended" and "aftermath" are one lighting choice apart, so keep the light flat and the site tidy.

---

## /white-card-nsw — 2 slots

ASQA-accredited. **Upskill Institute (RTO 45708)** delivers and assesses; ABE Education publishes and
enrols. **NSW is delivered live by video, not self-paced** — that is the page's whole distinction and
both images must show a real session. Unit is `CPCWHS1001`.

### Slot 8 · Hero
- **File:** `src/assets/images/white-card-nsw-hero.avif`
- **Prop:** `hero.artefactImg: "/images/white-card-nsw-hero.avif"`
- **Spec:** 4:5 portrait · ~1000×1250 · AVIF

**Alt** (103)
> A learner in a hard hat and high-visibility vest facing a laptop during a live online training session.

**ChatGPT / DALL-E**
> A photorealistic vertical 4:5 photograph taken from behind and slightly above a person seated at a
> desk in an ordinary home room, wearing a high-visibility vest over a plain shirt and a white hard
> hat. **Only the back of their head and shoulders are visible.** They face an open laptop; on the
> screen, softly focused, a video call showing a trainer from the chest up mid-sentence, with a row of
> three smaller participant tiles beneath. The trainer and participants are recognisable as people but
> **no faces are sharp and no interface text is legible**. Natural window light from the left, warm
> neutral grade, shallow depth of field. Candid documentary style. No text, no readable interface
> chrome, no recognisable video-conferencing product, no logos.

**Gemini**
> Photorealistic 4:5 vertical photo from behind a person at a desk in a home room, wearing a
> high-visibility vest and white hard hat, only the back of their head visible. They face a laptop
> showing a video call: a trainer from the chest up and three smaller participant tiles below, softly
> focused, no sharp faces, no legible text. Natural window light, warm neutral grade, shallow depth of
> field, candid documentary. No text, no interface chrome, no logos.

**Guardrails:** the **trainer and the other participants must both be visible**. A learner alone at a
laptop is self-paced study, which is precisely what this course is not, and the page's price argument
collapses. No recognisable video-conferencing chrome — rendering a real product's interface is a brand
mark. Do not let the hard hat read as costume: it is worn because the practical assessment requires it.

### Slot 9 · Digital card
- **File:** `src/assets/images/white-card-nsw-digital-card.avif`
- **Prop:** `imgSrc="/images/white-card-nsw-digital-card.avif"`
- **Spec:** 4:5 portrait · ~520×650 · AVIF

**Alt** (101)
> A worker showing a card on a phone screen to a site supervisor at the gate of a Sydney building site.

**ChatGPT / DALL-E**
> A photorealistic vertical 4:5 photograph of two people at the gate of a construction site, shot from
> the side. One, in a high-visibility vest and hard hat, holds a phone up towards the other; on the
> phone screen a plain rectangular card shape, **thrown out of focus so nothing on it is readable**.
> The second, a supervisor with a clipboard, leans in to look. **Both faces are angled away from the
> camera or obscured by hard-hat brims.** Temporary fencing, a site gate and the concrete frame of a
> mid-rise building behind, soft. Bright Sydney daylight, warm neutral grade, shallow depth of field
> on the phone. Candid documentary, a routine moment. No text, no app interface, no icons, no logos.

**Gemini**
> Photorealistic 4:5 vertical photo from the side: two people at a construction site gate. One in a
> high-visibility vest and hard hat holds up a phone showing a plain card shape, out of focus and
> unreadable; a supervisor with a clipboard leans in to look. Both faces angled away or shaded by hard
> hat brims. Site fencing, gate and a soft concrete mid-rise frame behind. Bright daylight, warm
> neutral grade, shallow depth of field, candid documentary. No text, no app interface, no logos.

**Guardrails:** the slot's FPO description names the **Service NSW app**. Do not render it, or any
recognisable app interface — a real product's UI is a brand mark, and the alt text deliberately says
"a card on a phone screen" rather than naming the app. The card must be unreadable: a legible card
renders a credential.

---

## /cpd and /cpd-tas — 2 slots

Both 5:4 landscape, and **the two most likely to read as the same photograph**, so they are pulled
apart deliberately: `/cpd` is a national hub, indoors, no people; `/cpd-tas` is outdoors on a
Tasmanian job site with a person in it.

### Slot 10 · /cpd hero
- **File:** `src/assets/images/cpd-hero.avif`
- **Prop:** `hero.artefactImg: "/images/cpd-hero.avif"`
- **Spec:** 5:4 landscape · ~640×512 · AVIF

**Alt** (105)
> A tablet showing a completion certificate on a desk beside a hard hat and a folded set of building plans.

**Reference image to attach:** `new site/examples of the certificates/certificate-tas-all-trades-cpd-fire-risk-awareness-1-pt-695a48dc48cd85166404b4f6 (2).pdf`
(export page 1 to PNG if the generator needs an image, not a PDF). This is the CPD template — do not
attach an owner builder certificate here, the layouts are different products.

**ChatGPT / DALL-E**
> Using the attached certificate as an exact visual reference, reproduce ABE Education's CPD Certificate
> of Completion faithfully — same white ground, the bold diagonal maroon-to-gold ribbon across the
> top-right and bottom-left corners, the gem-mark logo on the ribbon, "Certificate" in large thin serif
> over "OF COMPLETION", and the same label:value table layout — with these fields changed: name
> **John Student**; completion date **1 Jan 2026**; certificate number **ABE001**; email
> **john.student@example.com**; phone **0400 000 000**. **Leave Title, Points, Mode of Delivery and
> Licence Number exactly as they appear in the attached reference — do not alter these four fields.**
> All certificate text must be sharp and fully legible.
>
> Then place this certificate into a photorealistic horizontal 5:4 scene, shot from above at a slight
> angle, with no people in frame: the certificate on a tablet lying flat on a desk, held large enough
> in frame that its text stays readable. **The screen should look like a real tablet reflecting the
> room, not a flat inserted graphic — a soft, faint reflection of the window across part of the glass,
> whites reading a touch warm rather than clinical, while the certificate text stays legible.** A white
> hard hat resting to one side, a folded set of building plans, a calculator with a blank or
> switched-off display, and a pen. An office chair edge and a plain wall beyond, out of focus. Even
> indoor daylight from a window, warm neutral colour grade, shallow depth of field. Documentary, tidy
> but used, not styled. No other text anywhere in the frame besides the certificate itself, no other
> logos, no numerals anywhere except on the certificate.

**Gemini**
> Using the attached certificate as an exact visual reference, reproduce ABE Education's CPD Certificate
> of Completion — white ground, diagonal maroon-to-gold ribbon top-right and bottom-left, gem-mark logo
> on the ribbon, "Certificate" over "OF COMPLETION" in thin serif, same label:value table — with fields
> changed to: name John Student; completion date 1 Jan 2026; certificate number ABE001; email
> john.student@example.com; phone 0400 000 000. Leave Title, Points, Mode of Delivery and Licence
> Number exactly as shown in the reference, unchanged. All text sharp and legible. Place it on a tablet
> flat on a desk, shot from above at a slight angle, no people, held large enough to stay readable.
> Screen shows a soft, faint reflection of the window, whites reading a touch warm rather than clinical,
> text still legible. A white hard hat, a folded set of building plans, a calculator with a blank
> display, and a pen. Plain wall beyond, out of focus. Even window light, warm neutral grade, shallow
> depth of field, documentary. No other text, no other logos, no numerals except on the certificate.

**Guardrails:** this is the certificate exception — see "Certificate slots" above before using this
prompt. **Title, Points, Mode of Delivery and Licence Number are copied verbatim from the reference and
never invented** — see the reasoning in that section. The calculator display must stay blank: any
digits on it are a second, unintended numeral in the frame. The certificate must be large enough in
frame that the text genuinely resolves, and the screen should read as a photographed object under
indoor light, not a graphic pasted flat onto the desk — see slot 1's guardrail note on the same failure.

### Slot 11 · /cpd-tas hero
- **File:** `src/assets/images/cpd-tas-hero.avif`
- **Prop:** `hero.artefactImg: "/images/cpd-tas-hero.avif"`
- **Spec:** 5:4 landscape · ~640×512 · AVIF

**Alt** (97)
> A tradesperson holding a tablet showing a course certificate on a Tasmanian residential job site.

**Reference image to attach:** `new site/examples of the certificates/certificate-tas-all-trades-cpd-fire-risk-awareness-1-pt-695a48dc48cd85166404b4f6 (2).pdf`
(export page 1 to PNG if the generator needs an image, not a PDF). Same CPD template as slot 10.

**ChatGPT / DALL-E**
> Using the attached certificate as an exact visual reference, reproduce ABE Education's CPD Certificate
> of Completion faithfully — same white ground, diagonal maroon-to-gold ribbon top-right and
> bottom-left, gem-mark logo on the ribbon, "Certificate" over "OF COMPLETION" in thin serif, same
> label:value table — with these fields changed: name **John Student**; completion date **1 Jan 2026**;
> certificate number **ABE001**; email **john.student@example.com**; phone **0400 000 000**. **Leave
> Title, Points, Mode of Delivery and Licence Number exactly as they appear in the attached reference —
> do not alter these four fields.** All certificate text must be sharp and fully legible.
>
> Then place this certificate into a photorealistic horizontal 5:4 scene: a tradesperson in a work
> shirt and tool belt standing on a residential job site, holding a tablet at chest height angled
> towards the camera, showing the certificate large enough in frame that its text stays readable.
> **The screen should look like a real tablet under the overcast sky, not a flat inserted graphic — a
> faint, soft reflection of the grey sky across part of the glass, whites reading a touch cool rather
> than clinical, while the certificate text stays legible.** **They are seen from the chest down and to
> one side, face out of frame.** Behind them, a part-built weatherboard house with a steeply pitched
> corrugated iron roof, scaffold planks and a low green hill. Soft overcast Tasmanian light, warm
> neutral colour grade, shallow depth of field. Candid documentary, a pause in the work. No other text
> anywhere in the frame besides the certificate itself, no other logos.

**Gemini**
> Using the attached certificate as an exact visual reference, reproduce ABE Education's CPD Certificate
> of Completion — white ground, diagonal maroon-to-gold ribbon top-right and bottom-left, gem-mark logo
> on the ribbon, "Certificate" over "OF COMPLETION" in thin serif, same label:value table — with fields
> changed to: name John Student; completion date 1 Jan 2026; certificate number ABE001; email
> john.student@example.com; phone 0400 000 000. Leave Title, Points, Mode of Delivery and Licence
> Number exactly as shown in the reference, unchanged. All text sharp and legible. Place it held by a
> tradesperson in a work shirt and tool belt on a residential job site, tablet at chest height,
> certificate large enough to stay readable. Screen shows a faint, soft reflection of the grey sky,
> whites reading a touch cool rather than clinical, text still legible. Seen from the chest down, face
> out of frame. Part-built weatherboard house with steep corrugated iron roof, scaffold planks and a low
> green hill behind. Soft overcast light, warm neutral grade, shallow depth of field, candid
> documentary. No other text, no other logos.

**Guardrails:** this is the certificate exception — see "Certificate slots" above before using this
prompt. **Title, Points, Mode of Delivery and Licence Number are copied verbatim from the reference and
never invented.** The tradesperson must stay generic — **no trade-identifying detail** (no visible
plumber's wrench, electrician's tester or carpenter's specific rig): the page covers building, plumbing
and electrical, and a single identifiable trade makes it look like one bundle rather than the category.
The certificate must be large enough in frame that the text genuinely resolves, and the screen should
read as photographed under real sky, not pasted flat — see slot 1's guardrail note on the same failure.

---

## /accreditation, /owner-builder-courses, /reviews — 3 slots

All three are `Hero artefactRatio="r54"` on non-course pages, and **all three are blocked** — see
section C. Generate them anyway: the blocker is a one-line prop change and the images are the long pole.

### Slot 12 · /accreditation hero
- **File:** `src/assets/images/accreditation-hero.avif`
- **Spec:** 5:4 landscape · ~640×512 · AVIF

**Alt** (102)
> Three training certificates fanned across a timber desk beside a hard hat and a folded pair of gloves.

**ChatGPT / DALL-E**
> A photorealistic horizontal 5:4 photograph, shot from directly overhead, of three plain certificate
> sheets fanned across a timber desk so each overlaps the next, **all body text soft and completely
> unreadable**. A white hard hat and a folded pair of work gloves rest beside them. Even indoor
> daylight, warm neutral grade, shallow depth of field falling off towards the edges of the frame.
> Documentary still life. No text, no letters, no numbers, no seals, no crests, no embossing, no
> ribbons, no institutional emblems of any kind, no logos.

**Gemini**
> Photorealistic 5:4 horizontal overhead photo: three plain certificate sheets fanned across a timber
> desk, overlapping, all body text unreadable. A white hard hat and folded work gloves beside them.
> Even indoor daylight, warm neutral grade, shallow depth of field. Documentary still life. No text,
> no seals, no crests, no embossing, no ribbons, no logos.

**Guardrails:** the strictest slot on the site for insignia, and **not covered by the certificate
exception at slots 1, 4, 10 and 11** even though it shows certificates. This is the page that explains
ABE Education is **not** an RTO, and the three certificates it fans out plausibly include a partner
RTO's Statement of Attainment (Blue Dog, Upskill) alongside ABE's own — the exception applies only to
ABE's own Certificate of Completion and CPD certificate, never to a partner's accreditation document.
Keep all three unreadable here. Anything resembling a seal, crest, embossed foil or ribbon also
contradicts the "not an RTO" copy beside it. Photography is riskier than line art was for this:
generators reach for gold seals on anything shaped like a certificate, so state the exclusion twice if
the first attempt produces one.

### Slot 13 · /owner-builder-courses hero
- **File:** `src/assets/images/owner-builder-courses-hero.avif`
- **Spec:** 5:4 landscape · ~640×512 · AVIF

**Alt** (95)
> A part-framed single-storey Australian house on a suburban block behind temporary site fencing.

**ChatGPT / DALL-E**
> A photorealistic horizontal 5:4 photograph of a part-framed single-storey Australian house on a
> suburban block, seen in three-quarter view from across the street: timber wall frames, roof trusses
> newly set, a concrete slab, a stack of materials and temporary mesh fencing along the footpath. No
> people. Neighbouring finished houses either side, softly out of focus. Bright mid-morning daylight,
> warm neutral grade, wide depth of field. Plain documentary framing, no drama. No text, no signage, no
> street numbers, no flags, no logos.

**Gemini**
> Photorealistic 5:4 horizontal photo: a part-framed single-storey Australian house on a suburban
> block in three-quarter view from across the street — timber frames, newly set roof trusses, slab,
> stacked materials, temporary mesh fencing. No people. Finished neighbouring houses soft either side.
> Bright mid-morning light, warm neutral grade, wide depth of field, plain documentary. No text, no
> signage, no street numbers, no logos.

**Guardrails:** **one house, generic, no state markers.** The earlier line-art concept was four houses
at four stages, which does not survive translation to photography — four separate builds in one real
frame reads as a housing estate, not as four states. One anonymous build is the honest hub image. **No
state outlines, maps, flags or number-of-states motif**: the hub sells four states, NSW is a `soon`
column with no course behind it, and any counted device restates the claim two commits removed on 2 Aug.

### Slot 14 · /reviews hero
- **File:** `src/assets/images/reviews-hero.avif`
- **Spec:** 5:4 landscape · ~640×512 · AVIF

**Alt** (90)
> An owner builder standing at the front gate of the finished single-storey home they built.

**ChatGPT / DALL-E**
> A photorealistic horizontal 5:4 photograph of a person standing at the front gate of a finished
> single-storey Australian home, **seen from behind at a distance**, looking towards the house. The
> house is newly complete: clean brickwork or weatherboard, a young garden, a driveway not yet worn.
> They wear ordinary clothes, not workwear, and **no face is visible**. Late-afternoon light across
> the front elevation, warm neutral grade, wide depth of field. Quiet, plain and documentary — a
> person looking at a finished job, not a lifestyle portrait. No text, no signage, no street numbers,
> no for-sale boards, no logos.

**Gemini**
> Photorealistic 5:4 horizontal photo: a person seen from behind at a distance, standing at the front
> gate of a newly finished single-storey Australian home, looking at it. Clean brickwork or
> weatherboard, young garden, fresh driveway. Ordinary clothes, no face visible. Late-afternoon light
> on the front elevation, warm neutral grade, wide depth of field, quiet documentary. No text, no
> signage, no street numbers, no logos.

**Guardrails:** **no stars, no rating marks, no numerals, and no testimonial-style group shot.** ABE
Education's 4.8/5 is an off-site Google Business Profile score, and CLAUDE.md's standing decision is
that it is never marked up as `AggregateRating`. A photographed five-star device is the same
self-serving rating claim rendered as a picture, on the one page most likely to be read that way. The
frame proves the **outcome** — a finished build — which is what a reviews page is actually evidence of.
Keep the subject distant and turned away, or this becomes the "couple in hard hats" lifestyle shot
`references/image-prompts.md` rules out by name.

---

# B · Never generate these 4

| Page | Slot | What it needs |
|---|---|---|
| `/white-card-tas` | Blue Dog Training | Logo **supplied by the RTO** |
| `/white-card-wa` | Blue Dog Training | Logo **supplied by the RTO** |
| `/white-card-nsw` | Upskill Institute | Logo **supplied by the RTO** |
| `/experts` | ABE Education brand mark | ABE's own logo, already in the R2 brand bucket |

The three partner slots carry the spec string **"supplied by the RTO"** in the component. A generated
approximation of a real company's logo is a fabricated brand mark on pages whose entire job is accurate
authority attribution. Request the asset from Blue Dog and Upskill; do not draw it.

`/experts` needs no generation either — it is ABE Education's existing logotype, and the R2 brand
bucket already holds it. That slot is a wiring job.

**Expert headshots are never generated.** Dominic and Warwick are real people, their portraits are real
photographs, and the grayscale look is CSS. Both already ship, so no slot is open — noted only because
a sweep for "missing images" will surface them, and because the register being photographic makes the
temptation to generate a portrait higher than it was.

---

# C · Four slots cannot be closed from content alone

`/accreditation`, `/owner-builder-courses`, `/reviews` and `/experts` hardcode `artefactDesc` with
**no `artefactImg` prop and no way to pass one**:

- `src/layouts/HubLayout.astro:76` — hardcoded, and the `hubs` schema has no artefact-image field, so
  closing it needs `src/content.config.ts` (skills-owned) plus the layout.
- `src/pages/accreditation.astro:132`, `src/pages/experts/index.astro:90`, `src/pages/reviews.astro:89`
  — one-line prop additions, but `src/pages/**` is **unassigned in the session-types table**. That is
  the fifth instance of the unassigned-path pattern, after `content.config.ts`, `SYSTEM.md`,
  `public/**` and `src/data/**`.

Generate slots 12-14 regardless. The images are the slow part.

---

# D · What settling the register opened up

Confirming photography as the house style makes `/white-card-wa` the only page carrying line art, and
that is a new question rather than a pre-existing one — until 2 Aug the two registers could both be
read as house style.

**`[design]`** — `white-card-wa-hero.avif` and `white-card-wa-ppe-demonstration.avif` are single-weight
maroon line art on a page whose four sibling White Card pages will be photographic. Decide whether they
are regenerated as photographs for consistency, or kept as a deliberate exception. Both are defensible;
what is not defensible is leaving it undecided, because the next White Card page built will have to
guess. Note that the line-art hero was chosen partly because it carries **no risk of a photographed
card being misread as a credential** — a real constraint that any photographic replacement must solve
another way, exactly as slot 9 does by throwing the card out of focus.

---

# Summary

| | Count | Where |
|---|---|---|
| Generate from this brief | **14** | slots 1-14 above |
| Request from a partner, never generate | **3** | Blue Dog ×2, Upskill ×1 |
| Wire up an existing asset | **1** | ABE logotype on `/experts` |
| **Total open FPO slots on indexable pages** | **18** | measured in `dist/`, 2 Aug 2026 |

Closing all 14 removes FPO placeholders from **eight** of the eleven indexable pages that carry them.
The remaining three need a partner asset or a path owner, not a prompt.

**When each page is next built,** copy its slots from this file into that page's
`pipeline/{slug}/06-image-prompts.md`, which is the canonical per-page home. This file is a
cross-cutting brief written because 14 slots span eight pages and a build session owns one.
