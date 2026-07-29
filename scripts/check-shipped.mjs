#!/usr/bin/env node
/**
 * check-shipped.mjs — work on this branch can still reach `main`.
 *
 * WHY THIS EXISTS. Twice on 29 July 2026, correct and verified work never shipped, because it was
 * pushed to a branch whose PR had ALREADY been merged. A merged PR does not pick up later pushes,
 * so the commits sat on the branch, green and invisible.
 *
 *   PR #62 merged, then the hero ASSET was pushed to the branch. `main` kept the pointer without
 *   the file and served a 404 image on an indexable page for hours.
 *   PR #69 merged, then the hero and a band-rhythm fix were pushed. `main` changed not at all,
 *   and the live page still showed an FPO placeholder until someone looked at it.
 *
 * The two failure modes are opposites and both silent: one shipped half a change, the other shipped
 * none of it. Neither is visible from inside the branch.
 *
 * NO OTHER CHECK CAN SEE THIS. Every gate in this repo reads the working tree or `dist/` on the
 * branch, where the work is present and passing. They answer "is this correct?". The unanswered
 * question is "can this reach production?", which is a fact about git topology and PR state, not
 * about the files.
 *
 * NOT A CI GATE, deliberately. CI runs against a PR ref where this cannot arise. This is a
 * SESSION-START check: it belongs in the pre-flight, because the thing you most need to know before
 * starting work is whether the last session actually shipped.
 *
 * Degrades to a skip when it cannot know: no `gh`, no network, no remote. A check that guesses about
 * shipping is worse than one that admits it cannot tell.
 */
import { execSync } from 'node:child_process';

const say = (level, msg) => console.log(`  ${level.padEnd(5)} ${msg}`);
const sh = (cmd) => execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();

let branch;
try {
  branch = sh('git rev-parse --abbrev-ref HEAD');
} catch {
  say('SKIP', 'not a git repo — shipping state unknown.');
  process.exit(0);
}

console.log('\n=== Can this branch still reach main? ===\n');

if (branch === 'main' || branch === 'HEAD') {
  say('OK', `on ${branch} — nothing to strand.`);
  console.log('\n  0 failing\n');
  process.exit(0);
}

/* `git cherry`, NOT `rev-list`. rev-list compares commit HASHES, so a commit that was correctly
   cherry-picked onto another branch and merged still counts as "ahead" and the check cries wolf at
   exactly the person who already did the right thing. `git cherry` compares PATCH IDS: it prefixes
   a commit with `-` when an equivalent change is already upstream and `+` when it genuinely is not.
   Only `+` commits can strand.

   THAT IS STILL NOT ENOUGH, and this check shipped believing it was. See the CONTENT test below:
   patch ids cannot survive a squash merge, and this repo squash-merges every PR. `ahead` is now
   treated as a first pass that narrows what to look at, never as the verdict. */
let ahead = [];
try {
  ahead = sh('git cherry origin/main HEAD')
    .split('\n')
    .filter((l) => l.startsWith('+'))
    .map((l) => {
      const sha = l.slice(2).trim();
      return `${sha.slice(0, 9)}\t${sh(`git log -1 --format=%s ${sha}`)}`;
    });
} catch {
  say('SKIP', 'no origin/main to compare against (fetch first).');
  console.log('\n  0 failing\n');
  process.exit(0);
}

if (!ahead.length) {
  say('OK', `${branch} has nothing origin/main does not already have.`);
  console.log('\n  0 failing\n');
  process.exit(0);
}

/* THE CONTENT TEST — the one this check was missing, found by running it on the first branch that
   used it. `git cherry` reported one stranded commit on a branch whose work was already merged and
   already live. The commit had not stranded at all.

   A SQUASH MERGE collapses every commit on the branch into ONE new commit on main, whose patch is
   the union of theirs plus any conflict resolution. That union matches no individual branch commit's
   patch id, so `git cherry` marks all of them `+`. This repo squash-merges every PR, which means the
   check as first written would FAIL on every branch the moment its work landed — the exact
   cry-wolf behaviour that choosing `git cherry` over `rev-list` was supposed to prevent. Picking the
   more careful of two commit-identity tests did not help, because commit identity was the wrong
   question.

   The right question is about CONTENT: is every file this branch touched now identical on main? If
   it is, the work arrived, and it does not matter by what route — squash, rebase, cherry-pick or
   someone re-typing it. If it is not, name the files, because a file is what the author can act on.

   Two-dot `git diff origin/main HEAD` alone will not do: it also reports files main changed and the
   branch never touched, so a branch that is merely BEHIND would fail. Intersecting with the
   three-dot list (what the branch itself changed, measured from the merge base) removes those.

   Known residue, stated rather than hidden: if main modifies a branch-touched file AFTER merging it,
   that file reappears here. That is a genuine ambiguity - this check cannot tell "never landed" from
   "landed then edited" - so it is reported as work to look at, with the filenames, and not silently
   swallowed. */
let stranded;
try {
  const touched = new Set(sh('git diff --name-only origin/main...HEAD').split('\n').filter(Boolean));
  const differNow = new Set(sh('git diff --name-only origin/main HEAD').split('\n').filter(Boolean));
  stranded = [...touched].filter((f) => differNow.has(f));
} catch {
  stranded = null; // cannot tell; fall through to the commit-level report rather than guess
}

if (stranded && !stranded.length) {
  say('OK', `${branch} is ${ahead.length} commit(s) ahead, but every file it touched is already identical on main.`);
  say('', 'That is what a squash merge looks like from the branch: the work landed, the commits did not.');
  console.log('\n  0 failing\n');
  process.exit(0);
}

// The distinguishing signal is the PR's state, which needs gh. Unmerged commits are perfectly
// normal while a PR is open; they are only a defect once the PR that was carrying them has closed.
let prs;
try {
  prs = JSON.parse(sh(`gh pr list --head ${branch} --state all --json number,state,mergedAt --limit 10`));
} catch {
  say('SKIP', `${ahead.length} commit(s) ahead of origin/main, but gh is unavailable so their PR state is unknown.`);
  say('', 'Check by hand that a PR is open for them, or they will not ship.');
  console.log('\n  0 failing\n');
  process.exit(0);
}

const open = prs.filter((p) => p.state === 'OPEN');
const closed = prs.filter((p) => p.state !== 'OPEN');

if (open.length) {
  say('OK', `${ahead.length} commit(s) ahead, carried by open PR #${open[0].number}.`);
  console.log('\n  0 failing\n');
  process.exit(0);
}

if (!prs.length) {
  say('WARN', `${ahead.length} commit(s) ahead of origin/main and NO pull request exists for ${branch}.`);
  say('', 'Normal early in a session. It becomes a defect the moment you report the work as shipped.');
  console.log('\n  0 failing, 1 warning\n');
  process.exit(0);
}

// Ahead of main in CONTENT, and every PR for this branch is already merged or closed. Stranded.
const p = closed[0];
say('FAIL', `${branch} has content that can no longer reach main.`);
say('', `PR #${p.number} is ${p.state}${p.mergedAt ? ` (merged ${p.mergedAt})` : ''}, and a merged PR does not pick up later pushes.`);

if (stranded) {
  say('', `${stranded.length} file(s) differ from main and this branch is the side that changed them:`);
  for (const f of stranded.slice(0, 20)) say('', `  ${f}`);
  if (stranded.length > 20) say('', `  ...and ${stranded.length - 20} more`);
  say('', 'If any of these were merged and then edited on main, that is the other reading — check');
  say('', 'the file before re-applying it, rather than assuming the branch version is the newer one.');
} else {
  say('', `${ahead.length} commit(s) are ahead (the file-level comparison could not run):`);
  for (const line of ahead) say('', `  ${line}`);
}

say('', 'Fix: open a NEW pull request from this branch, or cherry-pick onto a fresh one.');
console.log('\n  1 failing\n');
process.exit(1);
