# Stage 6 — image-generation prompts

**Page:** `/cpd-building-tas` · **Produced:** 23 July 2026

**This artefact was missed on the first pass of the run and written afterwards.** Stage 6 requires
one prompt per image slot; none were produced, and the independent grader recorded "Stage 5 and
Stage 6 left no artefacts" without itemising which deliverables were absent, so it survived the
audit as well. Recorded here rather than quietly backfilled.

---

## 1 · Slot harvest

Three placeholders render in `dist/cpd-building-tas/index.html`:

| Slot | Ratio | Class | Action |
|---|---|---|---|
| Hero artefact | 5:4 landscape | `ph r54` | **Prompt below** |
| Expert portrait, Dominic Ogburn | 4:5 portrait | `ph r45` | **Never prompted** — real photograph |
| Expert portrait, Warwick Smith | 4:5 portrait | `ph r45` | **Never prompted** — real photograph |

## 2 · Which images earn their place

Applying the test in `references/image-prompts.md` before prompting anything.

**Earns it — the artefact.** The hero shows the thing being bought. For this page that is the CPD
record itself: proof, not decoration, and the only image on the page carrying information the text
cannot.

**Earns it, but is not generated — the two portraits.** E-E-A-T evidence. The grayscale look is a CSS
treatment, not a prompt. These need real photographs of Dominic and Warwick, and until they exist the
placeholder should stay visible so the gap reads as unfinished.

**Ruled out, deliberately:**
- **No instructional diagram.** The process is linear (enrol, work through, assess, certificate), so
  it is a numbered stepper. The reference is explicit that a diagram is only earned when a process
  genuinely branches.
- **No lifestyle photography.** A builder in a hard hat on a site says nothing about a CPD bundle and
  reads as filler to a practitioner discharging an obligation.
- **No per-feature icons.**

So: **one prompt, for one slot.**

---

## 3 · Hero artefact → `public/images/cpd-building-tas-hero.avif`

Filename follows the existing convention (`qld-owner-builder-course-hero.avif`).
**Ratio** 5:4 landscape, approximately 640×512 on the page.

**Alt text** (147 chars, en-AU, course-referenced):
> A Tasmanian builder's completed CPD record for the year, laid out as a single printed sheet on a
> desk beside a tablet, for the ABE Education building CPD bundle.

### Certificate guardrails, applied

This is `state-approved-direct` under CBOS, so the credential is a **certificate of completion**. The
image must not suggest anything else:

- **No CBOS crest, no government or ASQA logo, no state emblem.**
- **Nothing resembling a Statement of Attainment or a nationally recognised qualification.** That
  belongs to the ASQA model and not to CPD, and an image implying it is the same authority-model
  breach the build blocks in copy.
- **Body text blurred and illegible**, so no wording can be read as a claim.
- Best option remains photographing a real device showing a real issued record; generate only the
  desk scene and composite if that is available.

### ChatGPT (GPT-image / DALL-E) — render at 1536×1024, crop to 5:4

```
A photorealistic editorial photograph of a completed continuing-professional-development record for
a Tasmanian building practitioner: a single printed sheet resting on a plain timber desk, with a
tablet beside it showing a course-completion screen. Shot flat overhead, directly from above.
Setting: an Australian home office in Tasmania, natural and candid, lived-in rather than styled.
Composition: 5:4 landscape aspect ratio; the sheet and tablet sit to the right, with generous empty
desk surface on the left for text overlay; soft cool daylight from a window, gentle shadows.
Mood and palette: calm, institutional, credible; cool neutral tones, muted greys and pale timber,
no warm marketing glow.
Do NOT include: any text, words, letters, numbers, logos, watermarks, signage, seals, crests or
identifiable faces. Nothing resembling a government crest, an ASQA logo, a university seal, or a
nationally recognised certificate. Any writing on the sheet or screen must be blurred and completely
illegible.
Output: high resolution, render at 1536x1024, sharp, web-ready, no border.
```

### Gemini (Imagen / 2.5 Flash image) — aspect ratio 4:3, crop to 5:4

```
A photorealistic editorial photograph of a completed continuing-professional-development record for
a Tasmanian building practitioner: a single printed sheet on a plain timber desk, a tablet beside it
showing a course-completion screen. Flat overhead camera angle, directly from above.
Setting: an Australian home office in Tasmania, candid and unstyled.
Composition: aspect ratio 4:3; subject grouped to the right, generous empty desk surface on the left
for text overlay; soft cool daylight from a side window.
Mood and palette: calm, institutional, credible; cool neutral tones, muted grey and pale timber.
Do NOT include: any text, words, letters, numbers, logos, watermarks, signage, seals, crests, or
identifiable faces. Nothing resembling a government crest, an ASQA logo, or a nationally recognised
certificate. All writing must be blurred and unreadable.
Grounding description: a Tasmanian builder's completed CPD record for the year, laid out as a single
printed sheet on a desk beside a tablet.
Output: high resolution, sharp, web-ready, no border.
```

---

## 3b · Hero, version B — weighted for search (added 24 July 2026)

Version A above stays on record. This is an alternative for the same slot, not a correction.

### What actually moves the needle, in order

Worth being blunt, because "SEO image" usually gets spent on the wrong thing. Ranked by real effect
on this page:

1. **`Course.image` is missing from the JSON-LD.** Measured on the built page 24 Jul: the two `Person`
   nodes carry `image`, `Course` does not. `image` is a recommended property on `Course` and is what a
   rich result draws from. **This is the biggest win here and it is a code change, not a prompt** —
   see the note at the end.
2. **Alt text.** The strongest on-page signal an image has, and already a build gate (>= 80 chars).
   Version A's alt is accurate but never says what the page is trying to rank for.
3. **The subject being legible as its topic.** Image search and multimodal retrieval match what is
   visibly depicted. An abstract sheet-on-a-desk is credible but reads as "a document", not as
   "building CPD in Tasmania".
4. **LCP.** Already handled: `.avif`, eager via `artefactImg`.
5. **Filename.** Weak signal, and **no change recommended** — the slug is already
   `cpd-building-tas`, so `cpd-building-tas-hero.avif` carries the terms. Renaming to chase a
   marginal gain would break the `{slug}-hero` convention that makes these files findable. Chasing
   it would be SEO theatre.

### The tension, stated rather than fudged

Version A deliberately ruled out lifestyle photography, and that call is right for conversion: a
hard-hat stock shot says nothing about a CPD bundle and reads as filler to a practitioner discharging
an obligation. But the artefact shot it chose instead is *visually* generic, which is what costs it in
image search.

Version B does not reverse the decision. It keeps the artefact as the subject and puts it in the
practitioner's working context, so the frame is legible as "a Tasmanian building practitioner's CPD
record" to a person scanning results and to a classifier, without becoming a lifestyle scene.

**Alt text** (163 chars, en-AU, leads with the target term, names the company in full):
> Builder CPD in Tasmania: a building practitioner's completed annual CPD record on a desk beside
> rolled plans and a tablet, the evidence kept for a CBOS licence renewal with ABE Education.

### Certificate guardrails — unchanged, and they still bind

Every constraint in section 3 applies verbatim: no CBOS crest, no government or ASQA logo, no state
emblem, nothing resembling a Statement of Attainment or nationally recognised qualification, and all
body text blurred and illegible. Version B adds recognisable *trade* context, never *credential*
context.

### ChatGPT (GPT-image / DALL-E) — render at 1536x1024, crop to 5:4

```
A photorealistic editorial photograph of a Tasmanian building practitioner's completed annual
continuing-professional-development record: a single printed sheet on a plain timber desk, a tablet
beside it showing a course-completion screen, and at the edge of frame the tools of the trade that
place the scene - a tightly rolled set of building plans, a folding rule, a hard hat resting upside
down and clearly set aside for the day, not worn.
Shot flat overhead, directly from above.
Setting: the home office of a working builder in Tasmania. Through a window at the top of frame,
softly out of focus, the frame of a timber-framed Australian residential build. Candid and lived-in,
never styled or staged.
Composition: 5:4 landscape aspect ratio; the sheet and tablet grouped to the right, the trade objects
entering from the lower left corner, generous empty desk surface on the left for text overlay; soft
cool daylight from the window, gentle shadows.
Mood and palette: calm, institutional, credible; cool neutral tones, muted greys and pale timber. No
warm marketing glow, no lens flare, no shallow-focus product-shot look.
Do NOT include: any text, words, letters, numbers, logos, watermarks, signage, seals, crests or
identifiable faces or people. Nothing resembling a government crest, an ASQA logo, a university seal,
or a nationally recognised certificate. Any writing on the sheet or the screen must be blurred and
completely illegible.
Output: high resolution, render at 1536x1024, sharp, web-ready, no border.
```

### Gemini (Imagen / 2.5 Flash image) — aspect ratio 4:3, crop to 5:4

```
A photorealistic editorial photograph of a Tasmanian building practitioner's completed annual
continuing-professional-development record: a printed sheet on a plain timber desk, a tablet beside it
showing a course-completion screen, with a rolled set of building plans, a folding rule and a hard hat
set aside at the lower left edge of frame.
Flat overhead camera angle, directly from above.
Setting: the home office of a working builder in Tasmania; through a window at the top of frame, well
out of focus, a timber-framed Australian house under construction. Candid, unstyled.
Composition: aspect ratio 4:3; sheet and tablet grouped right, trade objects entering lower left,
generous empty desk surface on the left for text overlay; soft cool daylight from the window.
Mood and palette: calm, institutional, credible; cool neutral tones, muted grey and pale timber.
Do NOT include: any text, words, letters, numbers, logos, watermarks, signage, seals, crests, or
identifiable faces or people. Nothing resembling a government crest, an ASQA logo, or a nationally
recognised certificate. All writing must be blurred and unreadable.
Grounding description: a Tasmanian builder's completed CPD record for the year on a desk with rolled
plans and a tablet, in a working builder's home office.
Output: high resolution, sharp, web-ready, no border.
```

### The code change this depends on

The prompt above is worth little on its own if `Course.image` stays absent. Adding it means emitting
`image` on the `Course` node from the hero artefact URL, absolute not relative, in the layout that
renders CPD bundles. **That touches every page on that layout, so it needs its own change and its own
Stage 7 re-verification, and is deliberately NOT bundled into an image-prompt artefact.** Logged here
so the dependency is visible rather than assumed.

---

## 4 · Dropping it back in

1. Generate, crop to 5:4, convert to `.avif`, save as `public/images/cpd-building-tas-hero.avif`.
2. In `src/content/cpd-bundles/cpd-building-tas.mdx`, set on the `hero` object:
   ```yaml
   artefactImg: "/images/cpd-building-tas-hero.avif"
   artefactAlt: "A Tasmanian builder's completed CPD record for the year, laid out as a single printed sheet on a desk beside a tablet, for the ABE Education building CPD bundle."
   ```
   `Hero` passes `eager={!!artefactImg}`, so supplying the image also makes it eager-loaded as the LCP
   candidate. `artefactDesc` and `artefactSpec` stay: they are the brief, and they keep the slot
   documented if the image is ever pulled.
3. Leave the two expert portraits as placeholders until real photographs exist.

**Alt text is a build gate.** `abe-guardrails` fails on content-image alt under 80 characters, so the
alt above ships with the image, not after it.
