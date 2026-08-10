# Status board — how to refresh it

## Standing runbook, not a session note

Unlike the other files in `handover/`, this one does not close with a `## Status:` line. It
describes a recurring task, so it stays open by design. Do not wait for it to be struck through.

---

## The command

**This repo's terminal is Windows PowerShell 5.1, where `&&` is a parse error** ("The ampersand (&)
character is not allowed"). `&&` only arrived in PowerShell 7. Use this instead:

```powershell
npm run build; if ($LASTEXITCODE -eq 0) { node scripts/page-status.mjs --out reports/status.json; node scripts/status-board.mjs }
```

Verified verbatim in PowerShell 5.1. Two things in that line are load-bearing:

**1. `if ($LASTEXITCODE -eq 0)`, not a bare `;`.** A bare semicolon runs the collector regardless of
whether the build failed, and `page-status.mjs` reads `dist/` — so against a stale or half-written
`dist/` it reports the *previous* build's state, confidently and wrongly. That is the precise
failure this tool exists to stop. Checked in both directions: runs after a clean build, correctly
skipped when the preceding command exits non-zero.

**2. `--out`, not `>`.** Windows PowerShell 5.1's redirect writes **UTF-16LE with a BOM**
(`ff fe ...`), producing a `status.json` that `JSON.parse` cannot read — and the failure surfaces
later and elsewhere, in the renderer, as an opaque syntax error. `--out` makes Node write the file
in UTF-8 and sidesteps the shell entirely. This was found by running the documented command
verbatim rather than assuming the Git Bash form transferred; the first version of this note had it
wrong.

In Git Bash, WSL or PowerShell 7, the familiar form works too — but `--out` works everywhere, so
prefer it:

```bash
npm run build && node scripts/page-status.mjs --out reports/status.json && node scripts/status-board.mjs
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

Both halves are in the repo, so the whole loop runs without Claude — the command at the top of this
note does all of it.

It writes **`reports/status-board.html`**. `reports/` is gitignored, which is correct: the board
is a layer 3 derived view, regenerable from `dist/` at any time, and committing it would be the
duplication the recording policy exists to prevent.

**Stamp the date deliberately when re-rendering an older measurement:**

```powershell
node scripts/status-board.mjs --date "11 August 2026"
```

Without `--date` it uses today, which is right for a fresh run and wrong for a re-render of an
earlier `status.json` — the board should carry the day the build was *measured*.

**Only publishing still needs Claude**, because the artifact URL is published from a conversation:
open `reports/status-board.html`, ask for it to be republished to the URL above, and the link stays
stable.

**Two scripts rather than one, deliberately.** `page-status` measures, `status-board` presents. The
measurement is the half worth trusting and re-running, and keeping it free of markup means its JSON
can feed something else later without dragging a stylesheet along.

## Where the numbers came from last time

10 August 2026: **42 planned, 22 built, 20 indexable, 12 awaiting images, 1 with no inbound links.**
Recorded so the next run has something to compare against rather than a bare snapshot.
