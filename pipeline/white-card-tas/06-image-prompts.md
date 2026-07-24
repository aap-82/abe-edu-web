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

### The code change this depends on

As with the CPD page, the prompt is worth little on its own if `Course.image` stays absent. Emitting
`image` on the `Course` node from the hero artefact URL, absolute not relative, touches every page on
that layout, so it needs its own change and its own Stage 7 re-verification. Deliberately NOT bundled
into an image-prompt artefact; logged so the dependency is visible.

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
