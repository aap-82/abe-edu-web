import type { TopicCard, FAQItem } from '../types/course';

/**
 * DATA FOR THE owner-builder-nsw-course-w VARIANT (v2). noindex demo build.
 *
 * The three "liability" cards below are exactly what modules-nsw.ts DELIBERATELY left out of
 * v1 ("the wider owner-builder liability picture ... is DELIBERATELY absent because it has not
 * been through a fact ledger yet"). They have now been through a fact ledger (Stage 1,
 * 21 Jul 2026), so v2 carries them. Every figure here traces to an nsw.gov.au / SIRA /
 * legislation.nsw.gov.au source cited in the section's VerifiedSources line and the page-foot
 * Sources block. They are also a genuine competitive gap: a six-competitor sweep (Stage 2)
 * found NOT ONE covering any of the three.
 *
 * Two clocks are kept deliberately separate, because the internal register conflated them:
 * the 7-year-6-month SALE DISCLOSURE period is not the 6-year / 2-year STATUTORY WARRANTY
 * period. See the fact ledger, section C.
 */
export const liabilityCards: TopicCard[] = [
  {
    tag: '01',
    title: 'You cannot insure your own work',
    body: 'Home building compensation cover is <b>no longer available</b> for work an owner builder does themselves. A licensed contractor you engage directly must carry it where their contract is over $20,000, and give you the certificate before they start or take any payment.',
  },
  {
    tag: '02',
    title: 'Selling within 7 years 6 months',
    body: 'Sell within <b>7 years and 6 months</b> of the permit being issued and the contract of sale must carry a consumer warning naming the permit and its date. Leave it out and the buyer can walk away before settlement. Statutory warranties of 6 years (major defects) and 2 years pass to the new owner.',
  },
  {
    tag: '03',
    title: 'A permit is not a trade licence',
    body: 'The permit does not let you do licensed work. <b>All</b> electrical wiring, and any plumbing, draining or gasfitting whatever it costs, must be done by a licensed tradesperson. Any building work over $5,000 must be done by a licensed contractor too, which is a separate line from the $10,000 permit trigger.',
  },
];

/**
 * Why ABE, in checkable terms rather than adjectives (must-have section 9). No puffery, no
 * "comprehensive". Every claim here is verifiable on the page or its sources.
 */
export const whyAbeCards: TopicCard[] = [
  {
    tag: '01',
    title: 'The three things no one else tells you',
    body: 'Insurance you cannot get, the warning you must give a buyer, and the work you still cannot touch. We checked six competitor courses: none covered any of them.',
  },
  {
    tag: '02',
    title: 'Named, dated, sourced',
    body: 'Every government figure on this page carries the nsw.gov.au source it came from and the date it was checked. Two named reviewers stand behind it, not an anonymous "our team".',
  },
  {
    tag: '03',
    title: 'A publisher since 2007',
    body: 'ABE Education has published owner-builder and construction training for more than 31,000 students since 2007. The training itself is delivered by a registered training organisation.',
  },
];

/**
 * v2 FAQ. Extends v1's eight with the three fact-ledgered gap answers (insurance, warranty on
 * sale, licensed work), the accredited-vs-approved question competitors weaponise, and the
 * TAFE query that Stage 2 found NOBODY answering. Every new answer is sourced from the
 * 21 Jul 2026 ledger. Recognition answer keeps v1's wording: names the RTO and number, states
 * ABE is not the RTO. (Demo note: the RTO's scope claim is unverified — see the -w frontmatter.)
 */
export const faqsW: FAQItem[] = [
  {
    open: true,
    q: 'Do I need an owner-builder permit in NSW?',
    a: 'You need one if you are doing or supervising residential building work on your own land where the reasonable market cost, including labour and materials, is over $10,000 including GST, and you are not engaging a licensed builder to supervise it. Below that threshold no permit is required.',
  },
  {
    q: 'When do I need to complete this course?',
    a: 'When the building work is $20,000 or more. Between $10,000 and $20,000 you still need a permit and a White Card, but not the education requirement. At $20,000 and above NSW Fair Trading requires the five units of competency this course delivers.',
  },
  {
    q: 'Is this course nationally recognised?',
    a: 'Yes. It is delivered and assessed by Upskill Institute, a registered training organisation (RTO 45708), and on completion Upskill issues a nationally recognised Statement of Attainment for the five units. ABE Education publishes the course and is not an RTO.',
  },
  {
    q: 'Is a course from a Registered Training Organisation better than an "approved" one?',
    a: 'For NSW they are the same thing, done properly. NSW Fair Trading requires the five units to be delivered by a registered training organisation, which is what happens here. Be wary of any course that claims to be "NSW Fair Trading approved" but never names its RTO or its number, because the units only count if a real RTO issues them.',
  },
  {
    q: 'Do I have to insure the work I do myself?',
    a: 'No, and more to the point you cannot. Home building compensation cover is no longer available for work an owner builder does themselves. Where you engage a licensed contractor directly and their contract is over $20,000, that contractor must carry the cover and give you a certificate before starting work or taking a deposit. Confirm your position with Building Commission NSW.',
  },
  {
    q: 'What happens if I sell the property afterwards?',
    a: 'If you sell within 7 years and 6 months of the permit being issued, the contract of sale must include a consumer warning that names the permit and the date it was issued. Omitting it is a breach and lets the buyer rescind before settlement. The statutory warranties, 6 years for major defects and 2 years otherwise, pass to the next owner, who can enforce them at NCAT.',
  },
  {
    q: 'Can I do the electrical and plumbing myself?',
    a: 'No. An owner-builder permit is not a trade licence. All electrical wiring work, and any plumbing, draining or gasfitting regardless of cost, must be done by a licensed tradesperson. Air-conditioning and refrigeration work needs a licence too, apart from plug-in units. Any residential building work over $5,000 must be done by a licensed contractor.',
  },
  {
    q: 'Does TAFE run the NSW owner builder course?',
    a: 'Not that we have found. The owner-builder education requirement is met by completing the five units through a registered training organisation, and TAFE NSW does not appear to offer this specific course. What matters for your permit is that the five units are delivered by an RTO and you receive a Statement of Attainment, whoever delivers them.',
  },
  {
    q: 'Do I need a White Card as well?',
    a: 'Yes, and it is separate from this course. A current general construction induction card is mandatory for every owner-builder permit application in NSW, whatever the work is worth. If you do not already hold one, get it before you lodge.',
  },
  {
    q: 'What does the permit itself cost?',
    a: 'The NSW owner-builder permit fee is $233 for the 2026 to 2027 financial year, made up of a $90 processing component and a $143 fixed component. It is paid to Service NSW when you apply, separately from the course fee, and owner-builder permits are issued for a one-year term only. Fees are subject to an annual CPI increase at the start of each financial year, so confirm the current amount before you lodge.',
  },
];
