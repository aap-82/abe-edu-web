/**
 * CPD derivation rules — pure functions, no Node builtins.
 *
 * WHY THIS IS SPLIT OUT, and why an .astro file imports from `scripts/`.
 * Both the check scripts (Node) and the bundle pages (Astro/Vite) need to turn the register
 * into a points figure. If each had its own copy, the two could disagree — and a page quietly
 * disagreeing with the check that is supposed to police it is the worst possible failure here,
 * because the check would go on passing. So the rules live once, in a file with no `node:`
 * imports so Vite can bundle it, and `cpd-register.mjs` adds the filesystem and crypto on top
 * for script use.
 *
 * The unusual import path from src/ is deliberate and is the lesser evil.
 */

/**
 * Bundles ABE actually sells, as an explicit allow-list rather than "whatever categories
 * appear in the register". The register carries a fourth category, `gas-fitting`, tagged on
 * several courses — gas-fitting is not offered pending research, and deriving categories
 * dynamically would silently conjure a bundle for it on the next sync.
 */
export const BUNDLE_CATEGORIES = ['building', 'electrical', 'plumbing'];

/** Flat product cap. Not derived: a category serves licences with 12-, 20- and 30-point annual
 *  requirements (kb/register/cbos-tas-reference.md A1), so there is no single requirement to
 *  read it from. */
export const POINTS_CAP = 12;

/** CBOS counts at most this many WHS points per renewal year (cbos-tas-reference.md A3). */
export const WHS_POINTS_CAP = 4;

/** Only these count toward anything published. `expired` and `refused` stay tagged to their
 *  bundles in the source doc, so they arrive here and must be filtered, not assumed absent. */
export const PUBLISHABLE_STATUS = 'live';

export function liveCourses(reg) {
  return reg.courses.filter((c) => c.status === PUBLISHABLE_STATUS);
}

/** Every course tagged to a bundle, whatever its status. For auditing, never for a figure. */
export function taggedMembers(reg, category) {
  return reg.courses.filter((c) => (c.bundles ?? []).includes(category));
}

/** The sold set: live members only. This is what a page may describe. */
export function liveMembers(reg, category) {
  return taggedMembers(reg, category).filter((c) => c.status === PUBLISHABLE_STATUS);
}

/** Raw live total before the cap, so callers can tell "exactly 12" from "13, capped". */
export function liveTotal(reg, category) {
  return liveMembers(reg, category).reduce((n, c) => n + (c.points ?? 0), 0);
}

/**
 * The published points figure. `min(live members, cap)` — a bundle holding more live courses
 * than the cap is a source-doc pruning job, not a page that sells the surplus.
 */
export function bundlePoints(reg, category) {
  return Math.min(liveTotal(reg, category), POINTS_CAP);
}

/**
 * WHS points among the live members. Returns `null` when any live member has no studyArea,
 * because a partial count reads as a clean pass while silently ignoring unclassified courses.
 * Unknown is a finding, not a pass — the same stance check-freshness takes on a missing date.
 */
export function whsPoints(reg, category) {
  const members = liveMembers(reg, category);
  if (members.some((c) => c.studyArea == null)) return null;
  return members.filter((c) => c.studyArea === 'WHS').reduce((n, c) => n + (c.points ?? 0), 0);
}

/** Points a practitioner can actually count, once the WHS cap is applied. Null if unknown. */
export function countablePoints(reg, category) {
  const whs = whsPoints(reg, category);
  if (whs === null) return null;
  return bundlePoints(reg, category) - Math.max(0, whs - WHS_POINTS_CAP);
}

/** Days until expiry, negative once lapsed. `today` is injected so checks stay testable. */
export function daysUntilExpiry(course, today = new Date()) {
  if (!course.expiresAt) return null;
  const ms = new Date(course.expiresAt + 'T00:00:00Z') - new Date(today.toISOString().slice(0, 10) + 'T00:00:00Z');
  return Math.round(ms / 86400000);
}
