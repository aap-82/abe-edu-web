---
description: Validate, show the diff, and wait for "ship it" before pushing to main (which auto-deploys via Workers Builds).
---

Prepare to ship the current changes to production. Workers Builds auto-deploys any push to `main`, so
pushing IS deploying. Treat it accordingly.

Work in the repo root (`C:\dev\abe-web`). Do these steps in order:

1. **Show what will ship.** Run `git status -sb` and `git diff --stat` (staged and unstaged). Summarise
   the changes in plain language. Call out any files that look unintended (e.g. large images, secrets,
   working-tree cruft) so nothing rides along by accident.
2. **Validate the build is green.** Run `npm run build`. If it fails, STOP, show the error, and do not
   proceed.
3. **Type check.** Run `npm run check` and report any errors.
4. **Authority + house-style guardrails.** Confirm the diff does NOT: claim ABE is an RTO, call the WA
   owner-builder course government-approved (it "supports your Form 75 approval"), use em dashes in body
   copy, or use the word "comprehensive". For any changed price or government fact, confirm a dated
   VerifiedSources/Sources entry backs it. Flag anything suspect and stop if unsure.
5. **Show the full diff** (`git diff` for staged and unstaged) so the exact shipping content is visible.
6. **Wait for explicit go.** Ask the user to reply "ship it". Do NOT push until they do.
7. **On "ship it":** stage the intended files, commit with a Conventional Commit message
   (`feat:` / `fix:` / `chore:` / `content:`), then `git push origin main`. Report the pushed commit
   range and remind the user that Workers Builds is now building and deploying.

Never push with `--force` / `--force-with-lease`, never `--no-verify`, never `git reset --hard`, and
never amend or rebase commits already on `origin/main`.
