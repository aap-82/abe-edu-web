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
   Only `+` commits can strand. This distinction is the difference between a check that gets read
   and one that gets muted, which is the 93-warning lesson in ROADMAP's recording policy. */
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

// Ahead of main, and every PR for this branch is already merged or closed. Stranded.
const p = closed[0];
say('FAIL', `${ahead.length} commit(s) on ${branch} can no longer reach main.`);
say('', `PR #${p.number} is ${p.state}${p.mergedAt ? ` (merged ${p.mergedAt})` : ''}, and a merged PR does not pick up later pushes.`);
say('', 'These commits are stranded:');
for (const line of ahead) say('', `  ${line}`);
say('', 'Fix: open a NEW pull request from this branch, or cherry-pick onto a fresh one.');
console.log('\n  1 failing\n');
process.exit(1);
