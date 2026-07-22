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
