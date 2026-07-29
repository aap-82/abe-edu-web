# 06 · Image prompts — /white-card-wa

Two generated slots. Expert headshots are **real photographs** and are never generated (CLAUDE.md).

> **Build state: both slots ship as FPO placeholders.** `artefactImg` and `imgSrc` are deliberately
> omitted from the MDX. `src/lib/images.ts` resolves a frontmatter path by **basename against
> `src/assets/images/`** and returns the string unchanged when there is no match, so naming a file
> that does not exist yet would emit a live `<img>` pointing at a 404. Omitting the prop keeps the
> designed placeholder instead. **To close a slot:** generate the image, save it to
> `src/assets/images/` under the exact filename below, then add the prop back with the alt text
> below. No schema or resolver change is needed — basename match is the whole contract.

---

## Slot 1 · Hero artefact

**Target filename:** `src/assets/images/white-card-wa-hero.avif`
**Prop:** `hero.artefactImg: "/images/white-card-wa-hero.avif"`
**Ratio / spec:** 4:5 portrait · warm tone · ~1000×1250 · AVIF

**Alt text** (156 chars, en-AU)
> A Western Australian construction worker in a high-visibility shirt and white hard hat on a Perth
> residential building site, holding their construction induction White Card.

**ChatGPT / DALL-E prompt**
> A photorealistic vertical 4:5 portrait photograph of a Western Australian construction worker
> standing on a suburban residential building site in Perth. He wears a high-visibility orange shirt,
> a white hard hat and safety glasses, and holds a small white plastic identification card at chest
> height, angled towards the camera but not legible. Behind him, a partly framed single-storey brick
> and timber house under construction, with Australian suburban vegetation and a bright but slightly
> hazy sky. Natural mid-morning daylight, warm neutral colour grade, shallow depth of field with the
> background softly out of focus. Documentary style, candid, no studio lighting, no text or logos
> anywhere in the frame.

**Gemini prompt**
> Photorealistic 4:5 vertical photo: a construction worker on a residential building site in Perth,
> Western Australia. High-visibility orange shirt, white hard hat, safety glasses. He holds a plain
> white ID card towards the camera, text not readable. Background: a house under construction, warm
> Australian suburban light, softly blurred. Natural daylight, warm neutral grade, documentary
> feel. No text, no logos, no watermarks.

**Guardrails:** no readable text on the card (a legible card would assert a credential ABE Education
does not issue), no brand marks, no obviously North American or European site construction, no
stock-photo grin.

---

## Slot 2 · `assessment` ZSection

**Target filename:** `src/assets/images/white-card-wa-live-assessment.avif`
**Prop:** `imgSrc="/images/white-card-wa-live-assessment.avif"`
**Ratio / spec:** 4:5 portrait · warm tone · ~520×650 · AVIF

**Alt text** (169 chars, en-AU)
> A White Card learner demonstrating how to fit a hard hat and high-visibility vest to a training
> assessor during a live video assessment on a laptop at a kitchen table.

**ChatGPT / DALL-E prompt**
> A photorealistic vertical 4:5 photograph taken from behind and slightly to the side of a person
> sitting at a kitchen table at home, facing an open laptop. On the laptop screen, a video call
> showing a friendly assessor watching. The person is holding a white hard hat up towards the webcam
> and wearing a high-visibility yellow vest over an ordinary shirt, mid-demonstration. Natural
> daylight from a window to the left, warm domestic Australian interior, uncluttered table. Candid
> documentary style, shallow depth of field. The laptop screen content is soft and not legible. No
> text, no logos, no brand marks, no watermarks.

**Gemini prompt**
> Photorealistic 4:5 vertical photo, shot from behind the subject: a person at a kitchen table facing
> an open laptop showing a video call with an assessor. They hold up a white hard hat to the webcam
> and wear a high-visibility yellow vest. Warm Australian home interior, natural window light,
> uncluttered. Documentary style, shallow depth of field, laptop screen not legible. No text, no
> logos, no watermarks.

**Guardrails:** the point of the image is that **a person is watching** — the assessor must be
visible on screen, because that is the section's entire argument for the price. No legible screen
content, no recognisable video-conferencing branding, no readable card.

---

## Why these two and no more

The archetype-2 reader comparison-shops and scrolls fast, so the page is short and carries two images
rather than the four an owner builder page uses. Slot 1 answers "is this for someone like me" at the
top. Slot 2 is the only image that shows the thing that distinguishes this course from a cheaper one,
which is why `assessment` was made a ZSection at Stage 5 rather than `your-card`.

---

# Variants — added 28 July 2026

Two further options per slot, so a slot can be closed without re-briefing if the first prompt does
not land. **Pick one per slot; they are alternatives, not a set.**

## Alt-text compliance, and a defect in the originals

`references/seo/alt-text-guidelines.md` **CR2 sets alt text at 80-125 characters.** The two original
alt texts above are **173** and **167** characters measured, so both breach it, and their stated
counts (156 and 169) are themselves wrong. Neither has shipped — both slots are FPO and the props are
omitted — so this is caught before it reaches a page rather than after.

**Compliant rewrites of the originals**, same meaning, same slot, use whichever wording you prefer:

- Slot 1 (**115**): `A construction worker in high-visibility gear holding a construction induction White Card on a Perth building site.`
- Slot 2 (**106**): `A White Card learner fitting a hard hat and high-visibility vest to camera during a live video assessment.`

Every alt below is 80-125 characters, ends in a full stop, avoids "Image of" / "Photo of" (CR4), is
unique (CR7), and is Australian English (CR11). The build's own floor is 80 characters, so the usable
window is exactly 80-125.

**One deliberate departure from the guideline's example.** Its ABE sample reads *"…White Card training
with ABE Education."* This page is **asqa-accredited**: Blue Dog Training (RTO 31193) delivers and
assesses, ABE Education publishes and enrols. "Training with ABE Education" in alt text on this page
would imply ABE delivers the training, which is the one claim the authority model forbids. The
variants name the unit and the setting instead, and never name ABE as the trainer.

---

## Slot 1 · Hero artefact — variant B (artefact-led)

`references/image-prompts.md` ranks **the artefact** as the strongest image that earns its place, and
rules out generic construction stock. Variant A is a person on a site; this one is the thing being
bought. It also solves the negative-space rule more easily than a portrait does.

**Alt text** (122 chars, en-AU)
> A construction induction White Card and a CPCWHS1001 Statement of Attainment laid on a workbench on a Perth building site.

**ChatGPT / DALL-E prompt**
> A photorealistic vertical 4:5 still-life photograph, shot from directly above, of a plain white
> plastic identification card and a single sheet of certificate paper resting on a scuffed timber
> workbench. Beside them, a folded pair of work gloves and the brim of a white hard hat entering the
> frame. Warm mid-morning daylight from the left, soft shadows, warm neutral colour grade. The lower
> right third of the frame is empty workbench, left clear for text overlay. Documentary product
> photography, shallow depth of field. **All text on the card and the sheet is blurred and completely
> unreadable.** No logos, no crests, no seals, no watermarks.

**Gemini prompt**
> Photorealistic 4:5 vertical overhead still life: a plain white ID card and a sheet of certificate
> paper on a worn timber workbench, with work gloves and the edge of a white hard hat in frame. Warm
> natural side light, warm neutral grade, shallow depth of field. Keep the lower right third empty for
> text. All printed text blurred and unreadable. No logos, no seals, no watermarks.

**Guardrails:** the card and the sheet must be **unreadable** — legible text would render a credential,
which `image-prompts.md` forbids outright and which ABE Education does not issue. No seals or crests
either: they read as accreditation marks. Keep the negative space, or the hero heading has nowhere to sit.

---

## Slot 1 · Hero artefact — variant C (schematic motif)

The restrained on-brand line-art option. Lowest risk of the three: nothing photographic to misread as
a credential, no person to look like stock, and negative space is trivial to control. Weakest on
"is this for someone like me", which is the slot's job, so it is the fallback rather than the pick.

**Alt text** (117 chars, en-AU)
> Line drawing of a part-built Perth home marking the site zones where a construction induction White Card is required.

**ChatGPT / DALL-E prompt**
> A minimal single-weight line illustration, vertical 4:5, of a part-built single-storey Australian
> suburban house seen in three-quarter elevation: timber frame, roof trusses, a concrete slab and a
> temporary site fence. Thin uniform dark maroon lines on a warm off-white ground, no fill, no
> shading, no gradients. Architectural drawing style, calm and technical. The upper left quarter is
> empty ground for text. No text, no dimensions, no annotations, no logos.

**Gemini prompt**
> Minimal 4:5 vertical line illustration of a part-built Australian suburban house: timber frame, roof
> trusses, slab, temporary site fence. Single-weight dark maroon lines on warm off-white, no fill, no
> shading. Architectural drawing style. Leave the upper left quarter empty. No text, no dimensions, no
> annotations, no logos.

**Guardrails:** single weight, no fill, no shading — anything richer stops reading as the register's
restrained line art and starts reading as an illustration style the site does not use. Maroon is the
action accent, so this is the one place it appears decoratively; if that sits wrong, specify `--ink`
instead and treat it as a design decision rather than a prompt tweak.

---

## Slot 2 · `assessment` ZSection — variant B (assessor's point of view)

Variant A watches the learner from behind. This one inverts it: the frame is the assessor's screen,
so the person watching is the subject rather than a detail. The section's entire argument for the
$99 is that a human is watching, and this states it in one glance.

**Alt text** (105 chars, en-AU)
> A training assessor watching a learner fit a hard hat and vest during a live CPCWHS1001 video assessment.

**ChatGPT / DALL-E prompt**
> A photorealistic vertical 4:5 photograph over the shoulder of a training assessor seated at a desk,
> looking at a laptop. On the laptop screen, a video call showing a person in an ordinary home holding
> a white hard hat up towards their webcam, mid-demonstration, framed head and shoulders. The
> assessor's desk carries a notepad and a pen. Natural daylight, warm neutral grade, shallow depth of
> field. The screen image is softly focused: the person and the hard hat are clearly recognisable, but
> **no interface text, labels or names are legible.** No logos, no brand marks, no watermarks.

**Gemini prompt**
> Photorealistic 4:5 vertical photo over the shoulder of an assessor at a desk facing a laptop. On
> screen, a video call showing a person at home holding up a white hard hat to their webcam. Notepad
> and pen on the desk. Natural light, warm neutral grade, shallow depth of field. The person and hard
> hat are recognisable; no interface text legible. No logos, no watermarks.

**Guardrails:** **both people must be visible** — the assessor in frame and the learner on screen. An
image of a laptop alone loses the section's argument. No recognisable video-conferencing chrome:
rendering a real product's interface is a brand mark.

---

## Slot 2 · `assessment` ZSection — variant C (the demonstration close-up)

Tightest crop of the three. The PPE demonstration is the assessable moment, so this variant makes the
hands and the vest the subject and keeps the assessor present but secondary, on the laptop at the edge
of frame. Use when the page wants the *task* foregrounded rather than the supervision.

**Alt text** (113 chars, en-AU)
> A learner fitting a high-visibility vest to the camera while an assessor observes on the open laptop beside them.

**ChatGPT / DALL-E prompt**
> A photorealistic vertical 4:5 photograph, waist-up, of a person at a kitchen table pulling on a
> high-visibility yellow vest over an ordinary shirt, hands mid-adjustment on the shoulder strap. They
> face a laptop open at the right edge of frame; on its screen, softly focused, another person watches.
> Warm Australian domestic interior, natural window light from the left, uncluttered table. Candid
> documentary style, shallow depth of field on the laptop. **No legible screen content, no readable
> text anywhere.** No logos, no brand marks, no watermarks.

**Gemini prompt**
> Photorealistic 4:5 vertical waist-up photo: a person at a kitchen table pulling on a high-visibility
> yellow vest, hands adjusting the strap, facing a laptop at the right edge of frame where another
> person watches on screen, softly focused. Warm Australian home interior, natural window light,
> uncluttered. Documentary style. No legible screen text. No logos, no watermarks.

**Guardrails:** the assessor must still be visible on the laptop even though secondary — drop them and
this becomes a stock photo of someone putting on a vest, which is the "generic construction stock"
`image-prompts.md` rules out. Vest and hard hat only: no harness, respirator or hearing protection,
none of which CPCWHS1001 assesses.

---

## Choosing

| Slot | If you want | Take |
|---|---|---|
| 1 | the thing being bought, and easy negative space | **B, artefact-led** |
| 1 | lowest risk of a credential misread, on-brand restraint | **C, schematic** |
| 1 | a human answer to "is this for me" | **A, the original** |
| 2 | the supervision stated in one glance | **B, assessor POV** |
| 2 | the assessable task foregrounded | **C, close-up** |
| 2 | the learner's own point of view | **A, the original** |

Whichever is chosen, closing a slot is unchanged: generate, save to `src/assets/images/` under the
filename in that slot's section above, add the prop back, and use that variant's alt text verbatim.

---

## Slot 1 CLOSED, 29 July 2026 — variant C shipped

**Asset:** `src/assets/images/white-card-wa-hero.avif`, supplied. **Variant C, the schematic line-art
option**, not the photographic variant A the original brief described.

**Specs, measured:** 1000 x 1250 native, 4:5, 61,894 B. Matches `artefactSpec` exactly, no resize.
Variants 12.6 / 40.5 / 56.6 kB. Rendered `width=1000 height=1250 loading="eager" decoding="async"`,
`sizes="(max-width: 800px) 100vw, 640px"`, box 499 x 623 at ratio 0.800 against a decoded 0.800, so
distortion-free and identical in geometry to the QLD and TAS heroes.

**What is in the frame:** a single-weight maroon line drawing of a part-built single-storey Australian
home in three-quarter view: exposed roof trusses, framed walls, brick base, porch posts, a slab and
temporary site fencing, with a tree and a neighbouring roofline behind, on a warm off-white ground.
The upper left is empty ground, which is the negative space the hero heading needs, and is why
variant C was written that way.

**Alt text** (117 chars, CR2 80-125, en-AU)
> Line drawing of a part-built single-storey home with exposed roof trusses behind temporary construction site fencing.

Deliberately descriptive only. It does not claim this particular site requires a White Card: that is
a judgement the hero copy already makes, and CR8 says alt must not restate surrounding text.
`artefactDesc` was rewritten too, because the old one described the photographic variant A.

**Guardrails it satisfies that variant A could not:** no text anywhere in the frame, nothing that
renders as a credential, no person who could read as stock photography, and controllable negative
space. On a page whose authority model forbids ABE Education appearing to deliver the training, an
illustration carries less risk than a staged photograph of a trainer.

### One open design question, raised when variant C was written and now live

The line work is **maroon**, and DESIGN.md reserves maroon for actions, spent sparingly. This is the
one place it appears decoratively, at hero scale. Variant C flagged that in advance:

> "Maroon is the action accent, so this is the one place it appears decoratively; if that sits wrong,
> specify `--ink` instead and treat it as a design decision rather than a prompt tweak."

It is shipped as supplied and it reads well. Recording it as a **`[design]`** question rather than a
defect: whether hero illustration may use the accent colour, or whether it should be `--ink`, is a
register decision, and it will recur the moment a second page takes the schematic option.

### Still open on this page

**Slot 2, the `#assessment` ZSection, is still FPO.** One placeholder remains in `dist/`, exposing
its prompt and spec string to readers. B4 is half closed, not closed.

---

## Slot 2 · variants D and E — written for the line-art hero, 29 July 2026

**Why the earlier variants no longer fit.** A, B and C are all photographic, written when Slot 1 was
expected to be photographic too. Slot 1 shipped as **variant C, the schematic line drawing**, so a
photograph in the next scroll-length puts two registers on one page and makes the hero read as the
odd one out. These two are line art in the hero's exact register.

**What both keep.** The slot's guardrail is unchanged and non-negotiable: **the assessor must be
visible.** A live call with a real person is what the $99 buys over a self-marked quiz, and an image
of a laptop alone throws that away. Both variants show two figures.

**Shared render spec:** 4:5 portrait, ~520x650, AVIF, warm off-white ground, single-weight maroon
line, no fill, no shading, no gradients. Same pen as the hero.

**Shared guardrails:** no text anywhere; no readable interface chrome, menus or buttons; no
recognisable video-conferencing product; nothing resembling a card or certificate; no logos. The two
figures are simplified and non-identifiable, which also keeps this clear of the real-people rule.

### Google requirements these are built to meet

| Requirement | How |
|---|---|
| **T1** descriptive filename | named per variant below, not `IMG_0023` |
| **T2** AVIF | AVIF, as the slot spec already sets |
| **T3** under 100 kB | line art on a flat ground compresses far below it; the hero is 62 kB at four times the pixel count |
| **T5** explicit width/height | `Placeholder.astro` emits both, so CLS stays at 0 |
| **T6** below-fold lazy | automatic: `Placeholder` sets `loading="lazy"` unless `eager` is passed, and only the hero passes it |
| **CR2** alt 80-125 chars | measured per variant below |
| **CR7** unique alt | the two differ in subject, not just wording |
| **CR8** no restating body copy | neither alt repeats the section's prose about the call |
| Relevance | both depict the section's actual subject, which is what earns image relevance rather than decoration |

---

### Variant D · the relationship (recommended)

The wider of the two. Shows the arrangement a buyer is trying to picture: me here, a real trainer
there, watching.

**Filename:** `src/assets/images/white-card-wa-live-assessment.avif` (the slot's existing target)

**Alt text** (109 chars)
> Line drawing of a learner at a laptop showing their trainer a hard hat during the live White Card assessment.

**ChatGPT / DALL-E prompt**
> A minimal single-weight line illustration, vertical 4:5, of a person seated at a desk seen from
> behind and slightly to one side, facing an open laptop. They hold a hard hat up towards the laptop
> at shoulder height. On the laptop screen, drawn in the same line weight, a second person from the
> chest up, facing out, watching. On the desk beside the laptop, a folded high-visibility vest and a
> pair of gloves. Thin uniform dark maroon lines on a warm off-white ground, no fill, no shading, no
> gradients, architectural drawing style. Faces are suggested with a few lines only, not detailed. No
> text, no screen interface, no buttons, no logos, no annotations.

**Gemini prompt**
> Minimal 4:5 vertical line illustration: a person seen from behind at a desk, holding a hard hat up
> toward an open laptop. On the laptop screen, a second person from the chest up, watching, drawn in
> the same line weight. A folded high-visibility vest and gloves on the desk. Single-weight dark
> maroon lines on warm off-white, no fill, no shading. Architectural drawing style. Faces suggested
> with a few lines. No text, no interface, no logos.

**Why this one is the pick.** It carries the section's argument in one read, and it pairs with the
hero as a narrative rather than a repeat: the hero is the site you are getting a card for, this is
the assessment that gets you there. Both are drawings of the same world in the same pen.

---

### Variant E · the moment (the tighter alternative)

A closer crop on the assessable act itself. Use it if the section should foreground the task rather
than the arrangement.

**Filename:** `src/assets/images/white-card-wa-ppe-demonstration.avif`
Renamed deliberately: T1 treats the filename as a content clue, and this frame is about the PPE
demonstration rather than the call. If this variant is chosen, update `imgSrc` to match, or the
resolver falls back to returning the string unchanged and ships a dead `<img>`.

**Alt text** (114 chars)
> Line drawing of hands fitting a hard hat and high-visibility vest, the trainer watching on the laptop beside them.

**ChatGPT / DALL-E prompt**
> A minimal single-weight line illustration, vertical 4:5, cropped close on a person's upper body and
> hands as they settle a hard hat onto their head, a high-visibility vest already on over an ordinary
> shirt. At the right edge of the frame, partly cut off, an open laptop with a second person drawn on
> its screen in the same line weight, watching. Thin uniform dark maroon lines on a warm off-white
> ground, no fill, no shading, no gradients, architectural drawing style. The head is turned away and
> features are suggested with a few lines only. No text, no screen interface, no logos.

**Gemini prompt**
> Minimal 4:5 vertical line illustration, close crop: a person's upper body and hands settling a hard
> hat onto their head, wearing a high-visibility vest. At the right edge, partly cropped, an open
> laptop showing a second person watching, same line weight. Single-weight dark maroon lines on warm
> off-white, no fill, no shading. Architectural drawing style. Features suggested, head turned away.
> No text, no interface, no logos.

**Trade-off, stated.** Tighter crops read better on a phone, where this section is mostly seen, and
the action is more legible at 320 px than a wide desk scene. The cost is that the assessor becomes a
secondary element at the frame edge, so the "someone is watching" argument is quieter. If that
argument is the section's job, take D.

---

### The maroon question applies here too

Both variants specify maroon line work, matching the hero. DESIGN.md reserves maroon for actions, so
the hero already carries an open `[design]` question about using the accent decoratively. **Whatever
is decided there must apply to both images**, or the page ends up with a maroon hero and an ink
diagram. If the answer is `--ink`, swap the colour word in whichever prompt is used and treat it as
one decision covering both slots, not two.

---

## Slot 2 CLOSED, 29 July 2026 — variant E shipped. B4 is now closed.

**Asset:** `src/assets/images/white-card-wa-ppe-demonstration.avif`, supplied. **Variant E, the tight
crop on the demonstration**, not the wider variant D that was recommended. Both slots on this page now
carry a real asset, so no FPO placeholder remains in `dist/` for `/white-card-wa` and B4 is closed.

**Specs, measured:** 928 x 1152 native, ratio 0.806, 22,591 B. Variants emitted at 400w (10,883 B),
800w (24,008 B) and 928w (26,710 B), so the largest thing a reader can be served is 26 kB against
the 100 kB ceiling in T3. Rendered `width="928" height="1152" loading="lazy" decoding="async"`,
`sizes="(max-width: 800px) 100vw, 640px"`.

The native ratio is 0.806 against a `.r45` box of exactly 0.800, and `object-fit: cover` takes the
0.7% difference off the edge. Measured in the browser rather than assumed: desktop box 519 x 649 at
ratio 0.800, `decode()` resolved true, `currentSrc` the 800w candidate. `naturalWidth` reads 374 on
mobile and 640 on desktop rather than 800, which is correct and not a defect — for a `w`-descriptor
srcset the DOM divides intrinsic width by the selected candidate's density, and 800/640 = 1.25 is
that density. Reading it as a wrong-sized image would have been a false alarm.

`imgSpec` was updated from the briefed `~520x650` to the delivered `928x1152`. The spec string is
read by nobody once a real asset ships, but leaving it wrong makes the next person distrust the file.

**What is in the frame:** a single-weight maroon line drawing on a warm off-white ground. A learner
seen from behind and slightly to one side, both hands settling a hard hat onto their head, wearing a
high-visibility vest over an ordinary shirt. At the right edge, partly cropped, an open laptop with a
second figure from the chest up, watching. No text, no interface chrome, no logos, no card.

**Alt text** (121 chars, CR2 80-125, en-AU)
> Line drawing of a learner in a high-visibility vest fitting a hard hat, a trainer watching on an open laptop beside them.

Describes the frame and stops there. It does not say the trainer is assessing, because that is the
argument the section's own copy makes and CR8 forbids restating surrounding text in alt. Unique
against the hero's 117-character alt per CR7: different subject, not a reworded twin.

`imgDesc` was rewritten as well. The briefed text said "at a kitchen table", which is not in the
frame — the FPO description had described a photograph nobody ever supplied.

**Why the filename is not the slot's original.** The slot targeted `white-card-wa-live-assessment`.
Variant E was named `white-card-wa-ppe-demonstration` on purpose: T1 treats the filename as a content
clue, and this frame is the demonstration rather than the call. `src/lib/images.ts` matches on
basename, so `imgSrc` had to move with it, and did.

**The gate did its job.** The first build of this change failed on `check-assets`: the pointer was in
the MDX and the file was on disk but untracked, which is the exact condition that shipped a 404 hero
on `/white-card-tas` four days earlier. It named the file and the fix. `git add`, rebuild, green.

### The maroon question is now doubled, not resolved

Both images on this page are maroon line work, and DESIGN.md reserves maroon for actions. The open
`[design]` question raised at Slot 1 now has two instances on one page rather than one, which is this
project's own threshold for deciding rather than noting. **Decide it once, for both.** If the answer
is `--ink`, both assets are regenerated together; a maroon hero above an ink diagram is the one
outcome that would be worse than either choice.
