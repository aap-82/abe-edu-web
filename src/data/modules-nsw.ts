import type { TopicCard, ModuleGroup } from '../types/course';

/**
 * NSW is the first ASQA-accredited course page, and its module list is not an ABE
 * curriculum decision: NSW Fair Trading names the exact units of competency an owner
 * builder must hold when the work is $20,000 or more. So these five cards ARE the
 * regulator's requirement, quoted, not a syllabus written around it.
 *
 * Codes and titles verified against nsw.gov.au on 20 Jul 2026. If a unit is superseded,
 * the card, the `partnerRto.units` list in the MDX frontmatter and the RTO's scope all
 * have to move together - a superseded unit taught as current is a mistakes-log M1
 * blocker, not a copy edit.
 */
export const moduleGroups: ModuleGroup[] = [
  {
    tag: 'CPCCWHS2001',
    title: 'Apply WHS requirements, policies and procedures in the construction industry',
    body: 'Your work health and safety duties on a site you control, and the policies and procedures that sit behind them.',
  },
  {
    tag: 'CPCCOM2001',
    title: 'Read and interpret plans and specifications',
    body: 'Reading the drawings and specifications your build runs on, so you can check what is actually being delivered against what was approved.',
  },
  {
    tag: 'CPCCCM1011',
    title: 'Undertake basic estimation and costing',
    body: 'Estimating and costing the work, which is how you hold a budget rather than discover it.',
  },
  {
    tag: 'CPCCOM1013',
    title: 'Plan and organise work',
    body: 'Sequencing the trades and the tasks so the build runs in an order that works.',
  },
  {
    tag: 'CPCCOM1014',
    title: 'Conduct workplace communication',
    body: 'Communicating with trades, certifiers and suppliers, and keeping the records that prove what was agreed.',
  },
];

export const moduleOutcome =
  'hold the five units of competency NSW Fair Trading requires of an owner builder, covering site safety, plans and specifications, estimating and costing, planning the work, and workplace communication.';

/**
 * Eligibility conditions, not a duties list. Every card here is a verified requirement from
 * the NSW application rules; the wider owner-builder liability picture (home building
 * compensation, warranty on sale, which specialist work needs a licensed contractor) is
 * DELIBERATELY absent because it has not been through a fact ledger yet. Asserting it from
 * memory on a regulated page is exactly the failure the fact-ledger rule exists to prevent.
 */
export const obligationCards: TopicCard[] = [
  {
    tag: '01',
    title: 'A White Card, always',
    body: 'A current general construction induction card (White Card) is mandatory for <b>every</b> owner-builder permit application, whatever the work is worth.',
  },
  {
    tag: '02',
    title: 'One permit in five years',
    body: 'You cannot generally hold a second owner-builder permit for different land within five years. A further permit needs evidence of special circumstances.',
  },
  {
    tag: '03',
    title: 'Development consent first',
    body: 'You need approved development consent for the work before you apply. The permit attaches to that consent, not to you generally.',
  },
  {
    tag: '04',
    title: 'You must live there',
    body: 'You have to intend to live in the property once the building work is complete. An owner-builder permit is not a route to build for resale.',
  },
  {
    tag: '05',
    title: 'An ownership interest',
    body: 'You must be the owner or joint owner of the land, a shareholder in the company that owns it, or hold a lease of at least three years.',
  },
];
