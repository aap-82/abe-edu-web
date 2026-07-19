import type { TopicCard, ModuleGroup } from '../types/course';

// Section 4 — the ACT course curriculum, taken from the LearnWorlds table of contents
// (confirmed by Andrey, 15 Jul 2026). Twelve numbered sections. The front items (declaration,
// downloads, the Introduction group: disclaimer, course aim, insurance primers, pros and cons)
// and the closing items (Downloads, Certification) are course admin, not curriculum, and are
// deliberately not listed here. Each section ends with a multiple-choice quiz.
export const moduleGroups: ModuleGroup[] = [
  { tag: '01', title: 'Owner-builder definitions & obligations', body: 'What an owner builder is, the obligations you take on, how you become eligible for a licence and where to apply.' },
  { tag: '02', title: 'Project documentation & development approval', body: 'The documents your build runs on, and getting development and building approval in place.' },
  { tag: '03', title: 'Project budget', body: 'Building a realistic budget for the project and keeping the build to it.' },
  { tag: '04', title: 'Project finance', body: 'Financing the build and managing the money through each stage.' },
  { tag: '05', title: 'Project insurance & taxation', body: 'The insurances that apply to an owner builder, and the tax side of building your own home.' },
  { tag: '06', title: 'Project set up, work health & safety', body: 'Setting up the site and running it safely under ACT work health and safety law.' },
  { tag: '07', title: 'Project contracts, warranties & claims', body: 'Contracts with your trades, the warranties that apply, and how claims work.' },
  { tag: '08', title: 'Project contractors & consultants', body: 'Engaging and coordinating the licensed contractors and consultants your build needs.' },
  { tag: '09', title: 'Project records', body: 'The records you must keep through the build, and why they matter if something goes wrong.' },
  { tag: '10', title: 'Termites (white ants) & project planning', body: 'Termite management and the planning that protects the build.' },
  { tag: '11', title: 'National Construction Code (NCC) & Australian Standards', body: 'Building to the National Construction Code and the Australian Standards that apply to your work.' },
  { tag: '12', title: 'Building disputes', body: 'Avoiding disputes where you can, and the path to resolve them if they arise.' },
];

// `moduleOutcome` is a general capability statement mapped to the twelve sections above,
// not a claim about specific lesson contents.
export const moduleOutcome =
  'take on the owner builder role with your eyes open: understand your obligations and licensing, prepare your project documentation and approvals, budget and finance the build, put the right insurances and records in place, run a safe site under work health and safety law, engage contractors under proper contracts, build to the National Construction Code and Australian Standards, and handle a building dispute if one arises.';

// Section 6 — wider duties cards (ACT). Verified regulatory facts, not course content.
export const obligationCards: TopicCard[] = [
  { tag: '01', title: 'Safety training', body: 'The ACT Government expects owner builders to hold a <b>White Card</b> (construction induction) and do <b>asbestos awareness</b> training, and to make sure their workers do too. In the ACT the White Card is delivered face to face and the card carries a <b>$42</b> Access Canberra fee. Both are separate from this course.' },
  { tag: '02', title: 'Insurance', body: 'ACT owner builders <b>do not need residential building (warranty) insurance</b>. But you control the site, so arrange <b>workers compensation</b> for anyone you engage and consider public liability cover.' },
  { tag: '03', title: 'Individuals only', body: 'An owner builder licence can only be held by an <b>individual</b>, not a company, trust or SMSF, and you must be the lessee of the block.' },
  { tag: '04', title: 'One building approval', body: 'The licence attaches to <b>one specific building approval</b>. A later project needs a fresh building approval and a fresh licence.' },
  { tag: '05', title: 'Ongoing liability', body: 'You take on the same responsibilities as a licensed builder, and a <b>rectification order</b> can be issued to you even after you have sold the property.' },
  { tag: '06', title: 'No specialist work', body: 'An owner builder cannot do <b>specialist building work</b> such as demolition or swimming pool construction. That work goes to a licensed contractor.' },
];
