import type { FAQItem } from '../types/course';

// White Card QLD FAQ. The first three items are the ASQA-mandatory questions (disclosure framework
// location 5): who delivers, who to contact, how to verify. Item 4 exists because at least one live
// competitor page repeats a superseded "100km rural exception" claim (see pipeline/white-card-qld/02-gap.md)
// — the correction is stated directly rather than left implicit in the #online section alone. Item 5
// is the location-not-residency distinction, same shape as the WA FAQ but sourced to WHSQ's own
// Conditions of Agreement rather than WorkSafe WA's candidate-evidence page.
//
// SCHEDULE CONFIRMED MID-BUILD, 3 Aug 2026 (supersedes an earlier note here that said it was
// deliberately absent). PARTNER CHANGED 19 Aug 2026 to Upskill Institute (RTO 45708): $99 flat,
// weekdays only. This supersedes Blue Dog's Mon-Sat $109/$169 timetable entirely. The page is
// noindex until a facts session verifies Upskill's WHSQ approval — see the MDX frontmatter comment
// asked and answered. See pipeline/white-card-qld/01-source-map.md §D and the dated comment at the
// top of white-card-qld.mdx for the correction trail.
//
// DELIBERATELY STILL ABSENT: a resit policy. Not confirmed at Stage 1, and inventing one would be
// exactly the kind of internal fact this pipeline must ask for, not default.
export const faqs: FAQItem[] = [
  {
    open: true,
    q: 'Who delivers this training?',
    a: 'Upskill Institute, RTO 45708, a registered training organisation regulated by the Australian Skills Quality Authority (ASQA). Upskill Institute delivers the session, conducts the assessment and issues your Statement of Attainment. ABE Education recruits and markets the training on its behalf, takes your enrolment and supports you through the course. ABE Education is not a registered training organisation and does not deliver training, conduct assessment or issue qualifications.',
  },
  {
    q: 'Who do I contact about training or assessment issues?',
    a: 'Contact ABE Education about enrolment, payment, access and general support. Contact Upskill Institute about the session itself, the assessment, your Statement of Attainment and your card. If you are not sure which it is, ask ABE Education and we will point you to the right place.',
  },
  {
    q: 'How do I verify that Upskill Institute is a real RTO, and that it can run this online?',
    a: 'Search RTO code 45708 on training.gov.au, the national register, to confirm the organisation and that CPCWHS1001 sits on its scope as current. Being registered to deliver the unit is not the same as being approved for Connected Real Time Delivery specifically: that is a separate Workplace Health and Safety Queensland approval, held by only 13 of 226 approved providers. Upskill Institute holds it [confirm: WHSQ connected real time delivery approval, requested 19 Aug 2026].',
  },
  {
    q: 'Is Queensland White Card training online actually allowed, or only in rural areas?',
    a: 'It is allowed anywhere in Queensland. An older rule limited online delivery to locations more than 100 kilometres from a classroom, but that was replaced in November 2022 when Workplace Health and Safety Queensland introduced Connected Real Time Delivery for the whole state. Some providers still advertise the old rule; it no longer applies.',
  },
  {
    q: 'Do I need to be a Queensland resident to do this course online?',
    a: 'No. The condition is that you are physically located in Queensland for the live session itself, which is not the same as being a resident. Someone working in Queensland temporarily meets it; a Queensland resident sitting the session from interstate does not.',
  },
  {
    q: 'When do sessions run, and how long do they take?',
    a: 'Sessions run on weekdays. Every session runs for at least four and a half hours, which is Workplace Health and Safety Queensland’s minimum for Connected Real Time Delivery. Every session costs the same $99, with no weekend premium.',
  },
  {
    q: 'What do I need ready for the session?',
    a: 'A device with a working camera and microphone, a stable connection for the full session, photo ID, your Unique Student Identifier, and your protective equipment to hand: eye protection, hearing protection, a hard hat, high-visibility clothing and a copy of the Work Health and Safety Act 2011 (Qld). You will be asked to show some of it on camera as part of the assessment.',
  },
  {
    q: 'What is a Unique Student Identifier, and do I need one?',
    a: 'A USI is a national reference number every student needs for any nationally recognised training in Australia, including this course. You can create one free at usi.gov.au before your session; Upskill Institute cannot issue your Statement of Attainment without it.',
  },
  {
    q: 'Is there a minimum age for this course?',
    a: 'Yes, 13 years, set by Workplace Health and Safety Queensland’s conditions for this delivery mode.',
  },
  {
    q: 'Does a Queensland White Card work in other states?',
    a: 'Yes. The card is nationally recognised once issued, regardless of which state you completed the training in or how it was delivered.',
  },
];
