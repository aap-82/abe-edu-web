/**
 * Split a short line into its LEADING CLAUSE and the rest, so a component can give the lead
 * a darker ink while the remainder keeps its normal colour. The line reads as one phrase with
 * an emphasis, not as two competing tones — which is what a full two-colour split produces.
 *
 * Split points, in order:
 *   1. the first sentence break     "Not a licence." That is what a registered contractor holds.
 *   2. before the first comma       "CBOS-approved CPD", worth points toward your requirement
 *   3. before an opening bracket    "Licensed NSW builder" (Lic. 12345)
 *   4. a leading quantity           "40+ years" in Australian construction
 *
 * The sentence break outranks the comma because most CanCant items are written as a claim
 * followed by its explanation, and the claim often contains a list: "Held by a company, trust or
 * SMSF. Owner builder licences are for individuals only." The comma rule would emphasise "Held by
 * a company" and drop the rest of the claim. The sentence rule gets the whole claim. Credential
 * lines are single phrases with no mid-string sentence break, so nothing there changes.
 *
 * The comma outranks the bracket so "Five units of competency, delivered online and assessed by
 * Upskill Institute (RTO 45708)" emphasises the claim rather than everything-but-the-bracket.
 * Emphasising nine tenths of a line emphasises nothing. Credential lines that need the bracket
 * rule ("Licensed NSW builder (Lic. 369417C)") carry no comma, so they still reach it.
 *
 * A line matching none of these returns a null lead and renders plain. That is deliberate:
 * "What a White Card requires" has no natural break, and inventing one reads worse than leaving
 * it alone.
 *
 * WHAT THIS CANNOT DO: tell a list head from a clause head. "Plumbing, drainage or gasfitting"
 * and "Senior Consultant, Compliance and Operations" are the same shape to a regex, and only one
 * of them should split. Every heuristic tried on the real corpus broke one to fix the other, so
 * the rule stays simple and the fix belongs in the copy: write the claim as its own sentence, and
 * the sentence rule takes it whole. Do not add a fourth heuristic here.
 *
 * Shared by Credentials.astro and CanCant.astro. It lived in Credentials as a local const; a
 * second component needing the same rule is the point at which a copy would start to drift.
 */
export type LeadSplit = [string | null, string];

export const leadClause = (s: string): LeadSplit => {
  // Mid-string sentence break only: a trailing full stop ends the line, it does not split it.
  // The next sentence must open with a capital, which is what keeps an abbreviation from
  // counting - "Licensed NSW builder (Lic. 369417C)" split after "Lic." before this guard.
  const dot = s.search(/\.\s+[A-Z]/);
  if (dot > 0) return [s.slice(0, dot + 1), s.slice(dot + 1)];
  const c = s.indexOf(', ');
  if (c > 0) return [s.slice(0, c), s.slice(c)];
  const p = s.indexOf(' (');
  if (p > 0) return [s.slice(0, p), s.slice(p)];
  const q = s.match(/^\d+\+\s+\S+/);
  if (q) return [q[0], s.slice(q[0].length)];
  return [null, s];
};
