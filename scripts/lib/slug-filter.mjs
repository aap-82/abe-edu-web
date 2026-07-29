/**
 * `--slug` filter — shared by the checks that emit page-scoped findings.
 *
 * WHY THIS EXISTS. Three scripts raised warnings that named a slug, and none of them was read,
 * because a page's own Stage-7 audit had no way to ask "what does the toolchain already say about
 * THIS page?" The signal existed; nothing routed it to the one reader who wanted it. Recorded on
 * three separate runs before it was built (ROADMAP, "Ready to build now, authorised by a second
 * occurrence"), and it adds no new checks at all — it filters findings that were already computed.
 *
 * DELIBERATELY NOT UNIVERSAL. `check-freshness` has no slug dimension: its unit is a register file,
 * which is shared across pages, and a filter there would either return everything or silently hide
 * a lapsed fee from the page that depends on it. Adding the flag for symmetry would make the second
 * outcome possible, so it is not added.
 *
 * FILTERING NEVER HIDES A FAILURE COUNT. The filtered run prints the matching findings and then the
 * UNFILTERED totals, labelled as such. A check whose summary line silently narrowed with its output
 * would let a reader see "0 failing" while a failure sat one slug away — the same false-confidence
 * failure as the 93-warning noise, arrived at from the opposite direction.
 */

/** Read `--slug=x` or `--slug x` from argv. Returns null when absent. */
export function slugArg(argv = process.argv.slice(2)) {
  const eq = argv.find((a) => a.startsWith('--slug='));
  if (eq) return eq.slice('--slug='.length).trim() || null;
  const i = argv.indexOf('--slug');
  return i !== -1 && argv[i + 1] && !argv[i + 1].startsWith('-') ? argv[i + 1].trim() : null;
}

/** Keep only findings that name the slug. Substring, not word-boundary: findings cite paths
 *  (`src/content/courses/white-card-wa.mdx`) as often as bare slugs, and both should match. */
export const bySlug = (lines, slug) => (slug ? lines.filter((l) => String(l).includes(slug)) : lines);

/** One line describing the narrowing, so a filtered run can never be mistaken for a whole one. */
export const slugNote = (slug, shown, total) =>
  `  (filtered to --slug ${slug}: ${shown} of ${total} finding(s) shown; totals below are for the whole repo)`;
