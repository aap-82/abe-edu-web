import type { FAQItem } from '../types/course';

// CPD Main Hub (/cpd) — visible on-page Q&A. First item open.
export const faqsCpd: FAQItem[] = [
  { open: true, q: 'What is a CPD point?', a: 'A CPD point measures the value of a learning activity your regulator recognises toward your licence. Different courses carry different points. Your regulator sets how many you need for each renewal period, and ABE records the points on your certificate.' },
  { q: 'Are ABE’s CPD courses accredited?', a: 'No, and they do not need to be. ABE CPD is non-accredited professional development delivered directly by ABE Education. In Tasmania, CPD activities must be either RTO-accredited or submitted to and approved by CBOS, and ABE’s courses sit on the CBOS-approved path. They carry CPD points, not a nationally recognised qualification.' },
  { q: 'Which states does ABE offer CPD in?', a: 'Three: Tasmania (building, plumbing and electrical), New South Wales (building) and Western Australia (real estate). Choose your state above to see the courses that apply to your licence.' },
  { q: 'How do I record my CPD?', a: 'You are responsible for keeping your own CPD record. ABE gives you a certificate on completion showing the course, date and points, which you keep for your CPD log and produce if your regulator audits you.' },
  { q: 'How long do the courses take?', a: 'ABE CPD is online and self-paced, so you fit it around work and finish in your own time. Each state page shows the time guide and points for its courses.' },
  { q: 'Can I complete CPD if I work interstate?', a: 'Yes. Your CPD obligation follows your licence, not where you are working, so you must meet it even when working interstate or overseas. Online delivery means you can complete ABE CPD from anywhere.' },
];
