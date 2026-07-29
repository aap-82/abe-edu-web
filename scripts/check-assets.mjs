#!/usr/bin/env node
/**
 * check-assets.mjs — every image a page points at is TRACKED IN GIT, not merely present on disk.
 *
 * WHY THIS EXISTS. On 29 July 2026 commit 4ec2946 repointed /white-card-tas's hero at
 * `white-card-tas-hero.avif` and committed the MDX and both artefacts, but not the 47 kB image.
 * The file sat untracked in one worktree. Everything went green: `npm run build` passed,
 * `guardrails` passed 20 pages, `check-links`, `check-pipeline`, `check-claims`,
 * `check-redirect-targets`, `system-health`, `prose-lint` and `astro check` all exited 0.
 *
 * They could not have caught it. Every one of them reads `dist/` or the working tree, where the
 * file was present. The defect only exists somewhere the file is absent, which is everywhere else:
 * CI, another clone, and production.
 *
 * And it fails SILENTLY. `src/lib/images.ts` resolves a frontmatter path by basename against
 * src/assets/images and RETURNS THE STRING UNCHANGED when there is no match — a deliberate design
 * so an unmigrated public path or remote URL still renders. The cost is that a typo or an
 * uncommitted asset produces a live <img> at a 404 instead of a build error. white-card-tas had
 * lost its noindex the day before, so this was a broken LCP image on a crawlable page.
 *
 * THE RULE. git is the source of truth, never the filesystem. A file you can see locally and a
 * file that ships are different things, and this check is the only one that knows the difference.
 *
 * Run after `npm run build` (wired into postbuild). Exits 1 on a broken reference: unlike a dead
 * link to an unbuilt page, there is no legitimate "not yet" case for an asset a page already
 * points at, so this needs no PENDING list and should never acquire one.
 */
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const sh = (cmd) => execSync(cmd, { encoding: 'utf8', maxBuffer: 64e6 });

// Everything git knows about, keyed by basename — the same key src/lib/images.ts resolves on.
let trackedAssets;
try {
  trackedAssets = new Set(
    sh('git ls-files src/assets/images').split('\n').filter(Boolean).map((p) => p.split('/').pop()),
  );
} catch {
  console.error('check-assets: not a git repo, or git unavailable. Skipped.');
  process.exit(0);
}

/* Which files to scan comes from git (only pages that actually ship), but their CONTENT is read
   from disk (so an edit you have not committed yet is still checked). That split is deliberate:
   reading content from HEAD would let you point a page at a missing asset, build green locally,
   and only discover it after committing — which is one commit later than this check is useful. */
const sources = sh('git ls-files src/content src/pages src/layouts src/components src/data')
  .split('\n')
  .filter((f) => /\.(astro|mdx|md|ts)$/.test(f));

/* Matches any value naming a local image file, in the shapes pages actually use:
     artefactImg: "/images/x.avif"     frontmatter hero, path form
     imgSrc="/images/x.avif"           ZSection / ZSplit
     src: "warwick-smith-portrait.avif"  expert portraits, BARE BASENAME form
     ogImage: "/images/x.avif"         head
   BOTH forms must be checked, because resolveImage() keys on BASENAME and does not care about the
   prefix. An early version of this gate matched only `/images/...` and reported the two expert
   portraits as unreferenced orphans — they are referenced, as bare filenames. That false positive
   was the tell: the same blind spot meant a typo'd bare basename would 404 silently and this gate
   would have said nothing, which is the exact failure it exists to stop.
   Remote URLs are skipped below: somebody else's uptime, not a tracked asset. An `import` of an
   asset already hard-fails the build when missing, so it needs no gate. */
const REF = /(?:artefactImg|imgSrc|ogImage|src)\s*[:=]\s*["']([^"']+\.(?:avif|webp|png|jpe?g|svg))["']/gi;

const broken = [];
const used = new Set();
let checked = 0;

for (const f of sources) {
  let src;
  try { src = readFileSync(f, 'utf8'); } catch { continue; }    // tracked but deleted locally
  for (const [, ref] of src.matchAll(REF)) {
    if (/^https?:\/\//i.test(ref)) continue;      // remote asset, not ours to track
    checked++;
    const base = ref.split('/').pop();
    used.add(base);
    if (!trackedAssets.has(base)) broken.push({ file: f, ref, base });
  }
}

// An asset nobody references is dead weight in the repo, not a defect. Reported, never failed.
const orphans = [...trackedAssets].filter((a) => !used.has(a));

console.log('\n=== Page image assets ===\n');
for (const o of orphans) console.log(`  WARN  ${o} is tracked but no page references it.`);
for (const b of broken) {
  console.log(`  FAIL  ${b.file}\n        -> ${b.ref} is NOT tracked in git.`);
  console.log('        The file may exist on your disk and still 404 in CI and production:');
  console.log('        src/lib/images.ts returns an unmatched basename unchanged, so this ships a');
  console.log('        live <img> at a dead URL rather than failing the build. `git add` it.');
}
if (!broken.length) console.log(`  OK    ${checked} image reference(s) resolve to tracked assets (${trackedAssets.size} tracked)`);
console.log(`\n  ${broken.length} failing, ${orphans.length} warning\n`);

process.exit(broken.length ? 1 : 0);
