// Types for the CPD approval register.
//
// The register itself is generated JSON (kb/register/cpd/tas-courses.json) and the derivation
// rules are plain JS (scripts/lib/cpd-derive.mjs), so neither carries types of its own. Without
// these, `members.map((m) => ...)` in a bundle layout gives `m` an implicit `any` and
// `npm run check` fails - which is exactly how this file came to exist.
//
// Keep in step with the sync script's `mapRow`: if a field is added there, add it here.

/** What CBOS has decided about a course. Only `live` may count toward a published figure -
 *  expired and refused courses stay tagged to their bundles in the source doc. */
export type CpdStatus = 'live' | 'expired' | 'refused' | 'unknown';

/** The three bundles ABE sells. `gas-fitting` exists as a category in the register but is not
 *  offered, so it is deliberately absent here. */
export type CpdCategory = 'building' | 'electrical' | 'plumbing';

/** What the expiry date was computed from. `submission` is an estimate of an approval that may
 *  never have been recorded, so it is softer evidence than `approval`. */
export type CpdExpiryBasis = 'approval' | 'submission' | 'none';

export interface CpdCourse {
  /** Row id in the source register. Stable across syncs; used to carry hand-backfilled fields. */
  id: string;
  name: string;
  /** The name CBOS knows the course by, which differs from the marketing name. */
  cbosName: string | null;
  state: string | null;
  regulator: string;
  status: CpdStatus;
  points: number;
  /** Trade categories, not the WHS split. May include `gas-fitting`. */
  categories: string[];
  /** Bundles this course is sold in. */
  bundles: string[];
  submittedAt: string | null;
  approvedAt: string | null;
  expiresAt: string | null;
  expiryBasis: CpdExpiryBasis;
  /** Keystone study area, used for the CBOS 4-point WHS cap. `null` until imported, and a null
   *  anywhere in a bundle makes the cap uncheckable rather than passing. */
  studyArea: string | null;
}

export interface CpdRegister {
  generated: {
    source: string;
    sourceName: string;
    table: string;
    syncedAt: string;
    rowCount: number;
    checksum: string;
  };
  /** Source bundle label -> category key. */
  bundleMap: Record<string, string>;
  courses: CpdCourse[];
}
