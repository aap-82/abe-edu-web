# Image-generation prompts (ChatGPT / Gemini)

The template declares every image it needs as a placeholder with a description and an aspect-ratio
spec: the Hero `artefactDesc`/`artefactSpec`, each `<ZSplit imgDesc/imgSpec>`, and each `<Placeholder
desc/spec>`. This stage turns those specs into ready-to-paste prompts for the user's image tools
(ChatGPT / GPT-image and Gemini / Imagen), so the visuals are produced off-page and dropped back in.

Produce this alongside Stage 6: harvest every image slot on the page, emit one prompt per slot, and
give the filename it maps to and the alt text (>= 80 chars, en-AU) that goes on the component.

## Which images earn their place (decide before you prompt)
An image has to do a job, not decorate. A time-poor, sceptical buyer reads a decorative hero photo as
filler and scrolls past, and on a mobile-heavy audience the load is a real conversion cost — so an
image that carries no information the text can't costs attention for nothing. Only prompt for slots that
pass this test.

**Earn their place:**
- **The artefact** — the Certificate of Completion, the thing they're buying. The strongest image; it's
  proof, and it belongs in the hero.
- **People** — real headshots of the developer and reviewer (E-E-A-T evidence); grayscale is a CSS
  treatment, not a prompt (see the headshot exception below).
- **A schematic / drawing motif** — restrained on-brand line art (a line elevation, a drawing set) that
  signals building-domain authority without looking like stock.
- **An instructional diagram** — only when a process genuinely branches. A linear flow is a numbered
  stepper, not a diagram.

**Ruled out:** hero lifestyle photography (a couple in hard hats), generic construction stock, an icon
per feature, and anything purely atmospheric. These read as marketing filler to this buyer and take the
space that proof should occupy.

**Regulatory claims shown in an image are subject to the verification rule.** A supplied drawing that
shows standards on its face (NCC, R-Codes, NatHERS, BASIX) must be verified as current and correct for
the jurisdiction, or the image is captioned explicitly as an illustrative example that is not ABE's
claim. BASIX is a NSW scheme — do not let it read as a WA claim.

## Hard rules for every prompt
- **No text in the image.** Generators garble letters, and words on a course image create brand/legal
  risk. No words, letters, numbers, logos, watermarks or signage. Put messaging in HTML, not the image.
- **No implied RTO / accreditation.** Never render anything that looks like a nationally-recognised
  certificate, a government/ASQA/regulator crest, or a "Statement of Attainment". Certificates shown
  must read as a plain Certificate of Completion with illegible/blurred body text.
- **No real people, no real brands.** No identifiable faces, no company logos, no trademarked products.
- **Australian context.** Owner-builder / residential-construction settings, the relevant state where
  it reads naturally (WA/Perth, QLD, etc.). Natural and candid, not glossy stock cliche.
- **Headshots are the exception: do NOT generate them.** The two expert portraits (Dominic, Warwick)
  must be real photographs of the real people. The grayscale look is a CSS treatment, not a prompt.
- **Leave negative space** on one side of hero/z-split images for text overlay.

## Reusable prompt template
```
A [photorealistic editorial photograph | clean flat vector illustration] of {desc}.
Setting: Australian residential construction / owner-builder context{, STATE if relevant}, natural and candid.
Composition: {ratio} aspect ratio, {orientation}; subject positioned to one side with generous empty
space on the {left/right} for text overlay; soft natural daylight.
Mood & palette: warm, trustworthy, optimistic; neutral warm tones [OR institutional: cool slate/navy].
Do NOT include: any text, words, letters, numbers, logos, watermarks, signage, or identifiable faces;
nothing resembling a government crest, ASQA logo, or a nationally-recognised certificate.
Output: high resolution, approximately {px}, sharp, web-ready, no border.
```
Fill `{desc}`, `{ratio}`, `{px}` from the component's `imgSpec`/`artefactSpec` (e.g. `5:4 · warm tone ·
~640×512`). Pick photo vs illustration to match the page register (homepage = warm photographic;
institutional = cooler, can lean illustrative for concept tiles).

## Tool-specific notes
- **ChatGPT (GPT-image / DALL-E):** supported sizes are 1024x1024 (1:1), 1536x1024 (landscape),
  1024x1536 (portrait). Choose the nearest to the spec and crop to the exact ratio. Ask it to "render
  at {size}" and restate the no-text rule (it is the most likely to sneak in letters).
- **Gemini (Imagen / 2.5 Flash image):** accepts an `aspect ratio` instruction (1:1, 3:4, 4:3, 16:9,
  9:16). Give the nearest ratio (5:4 -> 4:3, 4:5 -> 3:4) and crop. Gemini follows arbitrary ratios and
  "empty space on the left" more reliably than ChatGPT.
- Give both tools the component **alt text** as a grounding line — it is a tight description of the
  intended subject.

## The certificate/hero artefact (special case)
The hero shows a Certificate of Completion on a device or desk. Options, best first: (1) photograph a
real device showing the actual issued certificate; (2) generate the device/desk scene only and
composite the real certificate in after; (3) if generating the certificate, force the body text to be
blurred/illegible and never render RTO, "nationally recognised", ASQA, or a government crest.

## Output format for this stage (per page)
For each image slot, a small block:
```
### Hero artefact  -> public/images/wa-owner-builder-hero.jpg
Ratio 5:4 (~640x512). Alt: "Certificate of Completion for the WA owner builder course shown on a
tablet on a desk in a Western Australian home-build setting."
ChatGPT prompt: <filled template, size 1536x1024, crop to 5:4>
Gemini prompt:  <filled template, aspect ratio 4:3, crop to 5:4>
```
Then the user generates in ChatGPT/Gemini, saves to `public/images/`, and sets the component `src`
(swap the `<Placeholder>` for an `<img>` / the Hero `artefactImg`) and the `alt`. Keep alt >= 80 chars,
en-AU, course-referenced; decorative-only images get empty alt + `aria-hidden`.
