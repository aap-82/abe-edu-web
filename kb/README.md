# kb — the shared library

Data and rules, owned once, referenced by path from skills, subagents, hooks and the build.

- `register/` — verified regulatory facts on a cadence. **The single owner of every figure.**
  Indexed by `content-source-map.md`. Re-verify on cadence (indexed fees reset ~1 July).
- `rules/` — what ABE may claim: `authority-and-seo-rules.md` (ship-blockers),
  `authority-model.md`, `asqa-disclosure-framework.md`. `guardrails.ts` enforces these at build time.
- `mistakes-log.md` — repeat risks, read at pre-flight.

**The rule that matters:** a figure lives here or nowhere. If you find a fee, threshold or date
restated in a skill, a page, or a bundle, that is a bug — delete the copy and point at this directory.
