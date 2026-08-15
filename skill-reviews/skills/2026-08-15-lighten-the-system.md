---
subject: lighten-the-system
date: 2026-08-15
session_type: skills
graded_by: self
---

# Skills review — the system sheds 72KB of its own description

**Session type: `skills`.** Andrey's brief, verbatim shape: "it's too much baggage here, can I do
some sort of clean up to make the system lighter." Preceded by his observation that he is
"constantly fixing some contradiction between the rules" — which is mistakes-log row 1 (a standing
document described the build and the build moved) at 9+ sightings, the highest count in the log.
The diagnosis this session acted on: the governance corpus stored *state* and *history* as prose,
and prose state rots; six of the eight contradictions fixed earlier the same day were manufactured
by restatement. `graded_by: self`; every claim below is a measured value.

## Authority for the cut

ROADMAP's own recording policy, which survives verbatim: "Layer 1 is the only layer where bloat is
real. Keep it small. Prune actively" and "Never duplicate git." The history sections removed were
layer-0 content (git already records them) living in layer-1 files, where every line costs
attention on every run.

## Measured

| File | Before | After | Δ |
|---|---|---|---|
| `ROADMAP.md` | 66,886 B | 15,138 B | **−77%** |
| `CLAUDE.md` | 47,283 B | 27,174 B | **−43%** |
| Root `.md` files | 8 | 6 | `abe-rebuild-plan.md`, `WAVE0-COMPLETE.md` deleted |
| `handover/` files | 13 | 7 | six CLOSED handovers deleted |
| Governance-doc refs | 213 | 117 | all resolve |

CLAUDE.md loads into **every session and every subagent**, so its cut is the one with a per-run
price: roughly 12k tokens of context per session before, ~7k after. Verified after the rewrite:
`system-health` 0 failing (117/117 refs), `check-claims --strict` exit 0, build green with
guardrails 28/28, prose-lint clean.

## What was deleted, and the test applied

**Files:** a file was deletable only if it was (a) explicitly superseded by a live document, or
(b) a handover whose `## Status:` records closure with verification. Git history is the archive —
the repo's own layer-0 rule — and the deletion commit names every file.

- `abe-rebuild-plan.md` — superseded by migration plan v2; its own header said "kept for its
  Phase A-E shape only", and that shape is described in ROADMAP's "Why the phases are ordered this
  way", which survives.
- `WAVE0-COMPLETE.md` — Wave 0 close-out record, in ROADMAP's milestone ledger and git.
- Six handovers: `2026-08-11-session-close` (superseded by 12 Aug), `design-session`, `phase-2`,
  `small-fixes` (all three "closed, verified 29 Jul by the system audit"), `stage7-reverify`
  (closed 15 Aug, both FAILs verified clear), `white-card-stage7-drift` ("all three items CLOSED").
  The seven that remain are OPEN, PARTLY DONE, IN PROGRESS, the runbook, or cited as live rationale
  (`HANDOVER-images-astro-assets.md`, pointed at by CLAUDE.md's Images section).

**Prose:** dated history sections and derivation narratives. ROADMAP lines 56-400 (three weeks of
dated entries), the done-phase bodies, and the built-candidate entries collapsed to a nine-line
milestone ledger; CLAUDE.md's origin stories for rules 9-11, the demand-list format, the
SiteHeader split, the GSC path correction, the product-scope amendments and three
disclosed-crossing narratives collapsed to the rules plus pointers.

## What changed meaning (not just size) — flagged individually

1. **The session-type table now carries the accumulated path assignments in its columns.**
   `src/data/**` into build's may-write, `src/layouts/**` into design's may-write and build's
   must-not-touch, and the five prose-assigned paths (`public/**`, `.claude/launch.json`,
   `guardrails.ts`, `.gitignore`, `PRODUCT.md`, `.impeccable/**`, the five `new site/*.md` plans)
   into skills' row. Zero new ownership was invented; the table now states what six sessions
   decided in prose. The "Assigned so far" table and its five Because paragraphs are replaced by
   one pointer (`git log -S` the path).
2. **One stale Phase-3 entry was dropped, not moved.** ROADMAP's "record, do not build yet" list
   still carried *"Enrol now needs a build guardrail"* — built 30 Jul as `BANNED_CTA_BUDGET`
   (4 references in `guardrails.ts` today). A first-occurrence record for a thing that has existed
   for two weeks is not a record, it is a trap for the next reader.
3. **CLAUDE.md's header no longer inventories pages.** The old paragraph listed every built page
   and said, of itself, "this paragraph is a summary and goes stale." It had been wrong twice. The
   replacement names the two commands that measure instead (`page-status`, `system-health`).
4. **Both rewritten files state their own diet** — date, what moved where, and "if a rule here
   seems to lack justification, the justification exists — find it before relitigating it." That
   last line is the guard against the failure mode where a future session reads a bare rule,
   finds no reasoning, and reverses it (the withdrawn-robots.txt class, four sightings).

## What did not change

Every rule. All eleven session rules, the four-type table's discipline, the authority model, house
style, canonical form, staging de-index, both gotchas verbatim (the compiler gotcha keeps its full
broken/fixed example), the recording policy, standing rules, Phase-3 triggers and candidate gates,
human gates, git workflow, never-do. The cross-doc anchor CLAUDE.md relies on — ROADMAP "Expiry is
a build-blocker" — was carried into ROADMAP's Standing rules before the history section holding it
was cut.

## Demand list

Tag every item: [skills] | [design] | [facts] | [build]

- [skills] **`SYSTEM.md` (28.2KB) and `DESIGN.md` (34.4KB) have not had the diet.** SYSTEM.md §5
  must keep naming every script (`check-claims` §7 enforces it) but its per-script origin stories
  compress the same way ROADMAP's did; DESIGN.md's §5 component paragraphs carry history the same
  way. Do them in a second pass with the same test: rules stay, narratives become pointers.
- [skills] **Nothing stops the regrowth.** The diet is a one-off; the habit that produced 187KB is
  intact. A cheap guard in the shape this repo already uses: a per-file byte budget on the five
  governance docs (ratchet — fails on a rise, asks to lower on a fall), so growth becomes a
  deliberate decision instead of a default. Second guard worth weighing: flag undated
  absolute-claim lines ("only", "every", "the last") in governance docs, since those were the
  highest-rot lines measured (366 across the corpus, 14 verified).
- [skills] `.impeccable/live/` is still not gitignored — carried from
  `skill-reviews/design/2026-08-15-faq-title-role.md`, second filing. Runtime server state; one
  line in `.gitignore`.
