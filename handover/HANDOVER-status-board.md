# Status board — how to refresh it

## Standing runbook, not a session note

Unlike the other files in `handover/`, this one does not close with a `## Status:` line. It
describes a recurring task, so it stays open by design. Do not wait for it to be struck through.

---

## The command

**This repo's terminal is Windows PowerShell 5.1, where `&&` is a parse error** ("The ampersand (&)
character is not allowed"). `&&` only arrived in PowerShell 7. Use this instead:

```powershell
npm run build; if ($LASTEXITCODE -eq 0) { node scripts/page-status.mjs > status.json }
```

**Do not simplify that to `npm run build; node scripts/page-status.mjs`.** A bare semicolon runs the
second command regardless of whether the build failed, and `page-status.mjs` reads `dist/` — so
against a stale or half-written `dist/` it reports the *previous* build's state, confidently and
wrongly. That is the precise failure this tool exists to stop, so the guard is the point of the
line, not ceremony. Verified in both directions: the collector runs after a clean build, and is
correctly skipped when the preceding command exits non-zero.

In Git Bash, WSL or PowerShell 7, the familiar form is fine:

```bash
npm run build && node scripts/page-status.mjs > status.json
```

## What it measures

Five dimensions per planned page, all read from the build rather than from a tracker:

| Dimension | Answers |
|---|---|
| **research** | how many of the seven `pipeline/{slug}/` stage artefacts exist |
| **content** | is it built, and its rendered heading and word counts |
| **images** | real `<img>` versus FPO placeholders printing their own art direction |
| **seo** | title, description, canonical, JSON-LD nodes, sitemap membership |
| **links** | inbound **in-body** links from other built pages |

The planned inventory lives in the `PLANNED` array at the top of the script, in the same order and
grouping as `new site/abe-new-site-sitemap.md`. **Add a page there and add it here too** — the two
are kept in step by hand, deliberately, because parsing that document's ASCII tree with a regex is
the sort of clever-but-brittle thing that breaks the first time someone re-indents it.

## Three readings that look like bugs and are not

- **"pre-pipeline" is not zero research.** Six pages were built before the nine-stage pipeline
  existed. They are researched and sourced; they simply have no stage artefacts on file.
- **Inbound links count body links only.** Header and footer link almost everything to almost
  everything, so counting site chrome would report every page as well connected and the number
  would mean nothing.
- **`/` reports as not built.** It is a static redirect stub to `/qld-owner-builder-course`, not a
  page. The homepage is genuinely unbuilt (W5-1), and `astro.config.mjs:69` carries the standing
  warning that **cutover must not happen with a redirecting root**.

## Publishing the board

The board is a private artifact on claude.ai:

**https://claude.ai/code/artifact/05649766-b91a-489e-a9f6-6a77edfe53d3**

Republishing to that same URL keeps the link stable, so it can be shared once and stay current.

**The renderer is not in this repo.** `page-status.mjs` — the measurement, and the half worth
keeping — is committed. The script that turns its JSON into the HTML board was written in a session
scratchpad and does not survive the session. So today the loop is:

1. `npm run build && node scripts/page-status.mjs > status.json`
2. Ask Claude to rebuild the board from `status.json` and republish it to the URL above.

If that round trip becomes annoying, commit the renderer to `scripts/` as well. It is a derived
view, so it would need a `CHECK_EXEMPT` entry in `scripts/check-claims.mjs` and a mention in
SYSTEM.md §5's utility list, the same way `page-status` itself does — the §5 guard will fail the
build until both are done, which is the guard working, not a problem.

## Where the numbers came from last time

10 August 2026: **42 planned, 22 built, 20 indexable, 12 awaiting images, 1 with no inbound links.**
Recorded so the next run has something to compare against rather than a bare snapshot.
