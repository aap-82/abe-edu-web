import type { FAQItem } from '../types/course';

// White Card ACT FAQ. The first three items are the ASQA-mandatory questions
// (kb/rules/asqa-disclosure-framework.md, location 5): who delivers, who to contact, how to
// verify. "Can I do this course online?" answers Stage 2's one real finding for this page — a
// ~100/mo cluster of "white card online canberra/act" searches this course cannot honestly serve,
// since AlertForce delivers face-to-face. The last item cross-links DOWN to /act-owner-builder-course,
// never sideways to another state's White Card page.
export const faqs: FAQItem[] = [
  {
    open: true,
    q: 'Who delivers this training?',
    a: 'AlertForce Pty Ltd, RTO 91826, a registered training organisation accredited by the Australian Skills Quality Authority (ASQA). AlertForce delivers the training, conducts the assessment and issues the Statement of Attainment. ABE Education publishes the course and handles enrolment and support, and is not an RTO.',
  },
  {
    q: 'Who do I contact about a training or assessment problem?',
    a: 'For anything about the training itself, the assessment or your Statement of Attainment, the RTO, AlertForce, is responsible. For enrolment, payment, access to the course or general support, contact ABE Education. We will connect you with AlertForce where an issue is theirs to resolve.',
  },
  {
    q: 'How do I verify the RTO?',
    a: 'Go to <a href="https://training.gov.au/Organisation/Details/91826">training.gov.au</a>, the national register, and search RTO code 91826. You will find AlertForce listed as current, with CPCWHS1001 on its scope. Checking before you enrol is sensible, and we encourage it.',
  },
  {
    q: 'Can I do this course online?',
    a: 'No. In the ACT, AlertForce delivers this course face-to-face in a classroom. That is AlertForce’s own arrangement, not a rule set by WorkSafe ACT — other providers may offer an online option, but ABE Education’s ACT course does not.',
  },
  {
    q: 'How long does it take to get my card?',
    a: 'Passing the course gives you a Statement of Attainment straight away. From there, you apply online via an ACT Digital Account within 60 days, and Access Canberra typically processes it within about a month before posting your card roughly two weeks after approval.',
  },
  {
    q: 'Does the card expire?',
    a: 'No. Once issued, an ACT General Construction Induction Card does not expire.',
  },
  {
    q: 'What if I lose my card?',
    a: 'You can apply for a replacement through Access Canberra for $44.00.',
  },
  {
    q: 'I am also applying for an ACT owner builder licence. Do I need White Card as well?',
    a: 'Most owner builders working on their own site still need a White Card if construction induction training applies to the work. If that is you, see the <a href="/act-owner-builder-course">ACT owner builder course</a> — the two are separate requirements, not a substitute for each other.',
  },
];
