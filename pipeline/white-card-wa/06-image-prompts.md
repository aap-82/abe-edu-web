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
