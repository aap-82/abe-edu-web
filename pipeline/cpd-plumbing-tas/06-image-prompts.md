# 06 — Image prompts — /cpd-plumbing-tas

**One slot, currently an FPO placeholder.** The hero artefact. `artefactImg` is deliberately unset,
so the page renders the placeholder and adds one well to the FPO backlog.

**Slot: hero artefact**
- `artefactDesc`: "A Tasmanian plumber's CPD record for the year, laid out as a single sheet"
- `artefactSpec`: "5:4 landscape · document-on-desk, flat overhead, cool daylight"
- Ratio: **5:4 landscape** (`r54`, the bundle default). Not the 4:5 portrait the course pages use.
- Reference: `/images/cpd-building-tas-hero.avif`, the sibling's, for tone and framing.

**Constraints carried from the sibling's rendered image, which passed review**
- Show ABE Education's own completion record and a course-completion screen. **No government crest
  and no ASQA mark** — this is a CBOS certificate of completion, and either would be an
  authority-model breach.
- Real-looking, legible on-screen text rather than illegible filler.
- Grayscale is not required; the sibling is in colour.

**Not generated in this session.** Image generation was not in scope for this build; the prompt is
recorded so it can be produced without re-deriving the brief. Lower the `FPO_BUDGET` line for this
page when the image lands — the build fails if a count drops without the budget following.
