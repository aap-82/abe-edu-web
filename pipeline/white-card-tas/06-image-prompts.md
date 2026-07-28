# 06 · Image prompts — /white-card-tas

Ready-to-paste generation prompts for each image slot. Expert headshots are excluded (real photos
only — Dominic Ogburn, Warwick Smith). Every slot carries its target filename, aspect ratio, and the
>= 80-character en-AU alt text that ships in the MDX. House palette: warm cream ground, maroon accent
`#800000`, natural light, documentary not stock-cliché.

Until these are generated, each slot keeps its FPO `Placeholder` / hero artefact placeholder; the page
builds and is verifiable without them (they are not ship-blockers, but they are the reason `noindex`
plus a real image pass precede public launch).

---

## Slot 1 — Hero artefact (`hero.artefactImg`)

- **Filename:** `white-card-tas-hero.webp`
- **Ratio / size:** 4:5 · ~1000×1250 · warm tone
- **Alt (ships in `hero.artefactAlt`):** "A Tasmanian construction worker in a high-visibility shirt
  and white hard hat on a residential build site, holding a construction induction White Card, natural
  daylight."
- **Prompt (ChatGPT / Gemini):**
  > Photorealistic documentary photograph, 4:5 portrait. A construction worker on a Tasmanian
  > residential building site wearing a white hard hat, hi-vis shirt, safety glasses, holding a small
  > white construction-induction card toward camera. Soft natural daylight, warm cream and timber
  > tones, shallow depth of field, site slightly blurred behind. Calm and competent, not staged or
  > glossy. No text, no logos, no watermark. Australian residential construction context.

## Slot 2 — `#your-card` (ZSection image, the lodgement process)

- **Filename:** `white-card-tas-service-tasmania.webp`
- **Ratio / size:** 4:5 · ~520×650 · warm tone
- **Alt:** "A person handing a Statement of Attainment and identity documents across a Service Tasmania
  counter to lodge a construction induction card application in person."
- **Prompt:**
  > Photorealistic documentary photograph, 4:5 portrait. A person at a government service-centre
  > counter handing a printed certificate and ID documents to a staff member, lodging a card
  > application in person. Neutral public-office interior, warm even lighting, cream and muted tones.
  > Ordinary and reassuring, no branding, no readable text on documents, no logos or watermark.
  > Australian setting.

---

## Slot 1, version B — weighted for search (added 24 July 2026)

The Slot 1 prompt above stays on record. This is an alternative for the same slot, not a correction.

### What actually moves the needle, in order

1. **`Course.image` is missing from the JSON-LD.** Measured on the built page 24 Jul: the `Person`
   node carries `image`, `Course` does not. It is a recommended property on `Course` and what a rich
   result draws from. **Biggest win on this page, and it is a code change, not a prompt** — see the
   dependency note at the end.
2. **Format: this file specifies `.webp`, the CPD page specifies `.avif`.** The hero is the LCP
   element and is eager-loaded, so the format is a Core Web Vitals decision, not a preference. **Use
   `.avif`** (`white-card-tas-hero.avif`) and match the rest of the site.
3. **Alt text.** The current alt ends "natural daylight" — that describes the photograph, not the
   content. A screen-reader user gains nothing from it and it is the most valuable text real estate
   the image has. Spend it on the subject and the term instead.
4. **The subject.** Unlike the CPD page, this hero is *already* literal and recognisable, which is the
   right instinct for a query like "white card tasmania" (1029 impressions — this page has real image
   demand). Version B sharpens rather than replaces it.

### The tension, stated rather than fudged

The single most searched-for visual on this topic is **the card itself**, and it is the one thing we
must not depict accurately. Rendering a convincing WorkSafe Tasmania construction induction card means
generating a government-issued credential design — the same class of misrepresentation the build blocks
in copy. So the card stays generic, angled and softly out of focus, and the frame earns its relevance
from the **context** instead: hi-vis, hard hat, an unmistakably Australian residential timber frame.

That is a real ceiling on how far this image can be optimised, and it is the correct ceiling.

**Alt text** (168 chars, en-AU, leads with the target term, company named in full):
> White Card Tasmania: a construction worker in hi-vis and a hard hat on a Tasmanian residential build
> site, holding the construction induction card earned through the ABE Education course.

### Authority guardrails — this page is asqa-accredited, so they differ from the CPD page

The credential here genuinely **is** nationally recognised and genuinely **is** a Statement of
Attainment, so unlike the CPD hero the image is not fighting that. What it must not do:

- **No image may imply ABE Education issues the card or is the RTO.** Blue Dog Training (RTO 31193)
  delivers and assesses; WorkSafe Tasmania issues the card via Service Tasmania.
- **No reproduction of the real card's design**, no WorkSafe Tasmania or Service Tasmania branding, no
  state emblem, crest, or government logo. Card face generic, angled away, text illegible.
- No ASQA logo, no RTO logo, no training.gov.au marks.

### ChatGPT (GPT-image / DALL-E) — render at 1024x1280, crop to 4:5

```
A photorealistic documentary photograph, 4:5 portrait orientation. A construction worker standing on
an Australian residential building site in Tasmania, wearing a white hard hat, a high-visibility shirt
and safety glasses, holding a plain white plastic card up at chest height, angled slightly away from
the camera so its face is not square-on.
Focus: the worker and the card are sharp and fill the upper two thirds of the frame; behind them a
timber-framed house under construction is softly out of focus, unmistakably an Australian residential
build.
Lighting and palette: soft natural daylight, warm cream and pale timber tones, calm and competent.
Documentary, not a glossy stock or advertising look. No lens flare.
Do NOT include: any text, words, letters, numbers, logos, watermarks, signage, crests, seals or
emblems anywhere in the frame. The card must be blank and generic - do not reproduce or imitate any
government-issued licence, identity card or induction card design. No company branding on clothing.
Output: high resolution, render at 1024x1280, sharp, web-ready, no border.
```

### Gemini (Imagen / 2.5 Flash image) — aspect ratio 4:5

```
A photorealistic documentary photograph, 4:5 portrait. A construction worker on a Tasmanian
residential building site in a white hard hat, high-visibility shirt and safety glasses, holding a
plain white plastic card at chest height, angled slightly away from camera.
Focus: worker and card sharp in the upper two thirds; a timber-framed Australian house under
construction softly out of focus behind.
Lighting and palette: soft natural daylight, warm cream and pale timber tones. Calm, competent,
documentary - not glossy stock.
Do NOT include: any text, words, letters, numbers, logos, watermarks, signage, crests, seals or
emblems. The card must be blank and generic; do not reproduce or imitate any government-issued
licence or induction card design. No branding on clothing.
Grounding description: a Tasmanian construction worker holding the construction induction card he has
just earned, on a residential build site.
Output: high resolution, sharp, web-ready, no border.
```

### The code change this depends on — done, note corrected 27 Jul 2026

This originally flagged `Course.image` as absent and blocked on a code change. Checked directly against
`CourseLayout.astro` (27 Jul): the emission already exists — `heroImg = imageUrlAbs(hero.artefactImg,
canonical)`, and the `Course` node conditionally carries `image: { '@type': 'ImageObject', contentUrl:
heroImg, caption: hero.artefactAlt, inLanguage: 'en-AU' }` whenever `heroImg` is truthy. Verified against
built `dist/white-card-tas/index.html`: the `Course` node has no `image` key today, confirming the gate is
purely `hero.artefactImg` being unset in the MDX frontmatter, not missing code. No further code change is
needed — dropping `artefactImg`/`artefactAlt` into the hero frontmatter (once a photo from Slot 1
version A/B/C is generated) is sufficient on its own.

---

## Slot 1, version C — the self-paced/online angle (alternative, added 27 Jul 2026)

Versions A and B both stay on record. This is a genuine alternative, not a refinement of B: a different
subject, chosen because A and B are both "hi-vis worker on a building site," which is the generic White
Card image every state page will end up sharing. TAS's actual differentiator — stated in the hero
subhead and the ticks ("100% online and self-paced," "video assessment... on any device") — is delivery
mode, not the trade. Version C photographs that instead.

**Subject:** a person completing the self-paced online course at home, mid video-assessment, not on a
building site at all. This also visually distinguishes the hero from Slot 2 (the in-person Service
Tasmania counter), so the page tells a clearer before/after story: study online (hero) -> lodge in
person (Slot 2).

**Filename:** `white-card-tas-hero-online.avif` · **Ratio/size:** 4:5 · ~1000x1250 · warm tone

**Alt text** (en-AU, >= 80 chars, leads with the term, company named in full):
> White Card Tasmania: a Tasmanian resident completing the self-paced online course and video
> assessment for their construction induction card on a laptop at home.

**Guardrails, same family as version B, adjusted for this scene:**
- No visible screen content that reads as a real assessment, form, or credential (implies ABE content
  without showing anything fabricated as fact). Screen softly out of focus or angled away.
- No logos: no ABE Education, Blue Dog Training, WorkSafe Tasmania or training.gov.au marks anywhere.
- No card, certificate or Statement of Attainment visible in this frame — this scene is deliberately
  *before* the card exists; showing one here would contradict the page's own "Statement of Attainment
  first, card comes later" sequencing (`#your-card` section).
- Person should read as a tradesperson (subtle cues: hi-vis jacket on a hook nearby, work boots by the
  door) without being in full site PPE indoors, which would look staged.

**ChatGPT (GPT-image / DALL-E) — render at 1024x1280, crop to 4:5:**
```
A photorealistic documentary photograph, 4:5 portrait orientation. A tradesperson sitting at a kitchen
table or home desk in Tasmania, engaged in an online video assessment on a laptop, webcam light visible,
early morning or evening light through a nearby window. A hi-vis work jacket hangs on a chair back or
hook in the softly blurred background, hinting at their trade without full site gear.
Focus: the person and laptop are sharp in the frame; the laptop screen is angled away from camera or
softly out of focus, showing no readable text, forms or documents.
Lighting and palette: warm natural light, cream and pale timber domestic interior tones, calm and
focused mood, not glossy or staged.
Do NOT include: any text, words, numbers, logos, watermarks, crests, seals or emblems anywhere in the
frame, including on the laptop screen. No visible card, certificate, or document face. No company
branding on clothing.
Output: high resolution, render at 1024x1280, sharp, web-ready, no border.
```

**Gemini (Imagen / 2.5 Flash image) — aspect ratio 4:5:**
```
A photorealistic documentary photograph, 4:5 portrait. A tradesperson at a home kitchen table or desk
in Tasmania, completing an online video assessment on a laptop, webcam light visible, warm early-morning
or evening light through a window. A hi-vis jacket hangs softly out of focus in the background.
Focus: person and laptop sharp; laptop screen angled away or out of focus, no readable content.
Lighting and palette: warm natural domestic light, cream and pale timber tones, calm and focused, not
glossy or staged.
Do NOT include: any text, words, numbers, logos, watermarks, crests, seals or emblems, including on the
screen. No visible card, certificate or document face. No branding on clothing.
Grounding description: a Tasmanian tradesperson completing the self-paced online White Card course from
home, ahead of lodging for their physical card in person.
Output: high resolution, sharp, web-ready, no border.
```

**Trade-off, stated rather than fudged:** this version is a weaker visual match for "white card tasmania"
image-search intent than A/B (no card, no site, no hi-vis-forward framing) but a stronger match for the
page's actual differentiated value prop. If image search demand matters more than differentiation, keep
A or B; if telling a distinct TAS story matters more, use C. Not a call this artefact should make alone
-- flag to Andrey alongside the other two before generating.

---

## Notes

- Slot 1 is the only hero artefact. If left as the placeholder, the hero renders the FPO block and the
  build stays green.
- Slot 2 is used only if `#your-card` is built as a `ZSection` with an image; if built as a plain
  `Section` (no image), this slot is not needed. Current plan (05) uses ZSection for `#your-card`, so
  the slot exists.
- No image may imply ABE issues the card or is the RTO. Slot 2 shows a government counter, which is
  accurate: WorkSafe Tasmania issues the card via Service Tasmania.
- Alt text is >= 80 characters and en-AU, per guardrail.

---

## Hero slot CLOSED, 29 July 2026 — and one guardrail departure to decide

**Shipped asset:** `src/assets/images/white-card-tas-hero.avif`, replacing
`white-card-tas-hero-online.avif`. Supplied, not generated.

**Specs, measured, matching the QLD hero convention exactly:**

| | white-card-tas-hero.avif | qld-owner-builder-course-hero.avif |
|---|---|---|
| Native size | **1000 x 1250** (4:5) | 1000 x 1250 (4:5) |
| Source weight | 47,226 B | 58,663 B |
| Variants | 400w 12.6 kB · 800w 30.7 kB · 1000w 41.3 kB | 400w 14 kB · 800w 36 kB · 1000w 52 kB |
| `sizes` | `(max-width: 800px) 100vw, 640px` | identical |
| Serving | `width=1000 height=1250 loading="eager" decoding="async"` | identical |

No resize was needed: the asset is already at the spec, where the previous one was 1122x1402.

**What is actually in the frame** (described from the image, not from the old brief): a man seated at
a timber desk in front of a large window, watching a laptop; on the desk a white hard hat, safety
glasses, work gloves, tan work boots, a folded high-visibility yellow vest and a mug; through the
window, a city and river below hills at dusk, reading as Hobart and the Derwent.

**Alt text** (120 chars, CR2 80-125, en-AU)
> A man in Hobart watching the online White Card course on a laptop, hard hat, boots and high-visibility vest on the desk.

The previous alt was **162 characters and breached CR2**, and it described a video assessment, which
is not what this frame shows. `artefactDesc` was also rewritten: it had described a worker on a build
site holding a card, a third scene again.

### DEPARTURE FROM THIS SLOT'S OWN GUARDRAIL — for Andrey to decide

The guardrail recorded above for this slot reads:

> "No visible screen content that reads as a real assessment, form, or credential (implies ABE content
> without showing anything fabricated as fact). Screen softly out of focus or angled away."

**The shipped image does not meet it.** The laptop screen is in focus and carries legible text reading
`TASMANIA CONSTRUCTION INDUCTION WHITE CARD`, beside a presenter holding a small green card up to
camera. `references/image-prompts.md` separately bans text in images and anything that renders as a
nationally-recognised credential.

Two things follow, and only the second needs a decision:

1. **The alt text deliberately does not describe the screen.** It names the person, the city, the
   activity and the PPE. Describing an on-screen card in alt text would assert a credential in the
   accessibility layer, where no reader can see the context that qualifies it.
2. **Is that screen ABE's real course material?** If yes, this is a photograph of the product and the
   guardrail can be relaxed for this slot with a dated note. If it is a mock-up, the image depicts
   fabricated course content as real, which is what the guardrail exists to prevent, and the frame
   should be recropped or the screen softened. **Unresolved: nobody in this session can tell from the
   pixels.** Not guessed either way.

The image ships regardless of the answer, because it was chosen deliberately; this entry exists so the
question is on the record rather than discovered by the next auditor.
