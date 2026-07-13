import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Reusable shapes (mirror src/types/course.ts, validated at build time).
const cta = z.object({ href: z.string(), label: z.string(), microcopy: z.string().optional() });
const img = z.object({ src: z.string(), alt: z.string() });
const source = z.object({ label: z.string(), href: z.string(), verified: z.string().optional() });
const fact = z.object({ key: z.string(), value: z.string(), note: z.string().optional() });
const step = z.object({ title: z.string(), body: z.string() });
const priceRow = z.object({ label: z.string(), sub: z.string().optional(), amount: z.string(), isTotal: z.boolean().optional() });
const person = z.object({
  name: z.string(),
  role: z.string(),        // Credentials display line
  jobTitle: z.string(),    // JSON-LD Person.jobTitle
  creds: z.string(),
  bio: z.array(z.string()),   // one entry per paragraph

  linkedin: z.string(),
  portrait: img.optional(),
});

const courses = defineCollection({
  loader: glob({ base: './src/content/courses', pattern: '**/*.mdx' }),
  schema: z.object({
    // page + head
    title: z.string(),
    description: z.string(),
    canonical: z.string().url(),
    ogImage: z.string().optional(),
    state: z.string(),
    // authority model drives the credential's recognizedBy (state-approved only)
    authorityModel: z.enum(['state-approved-direct', 'knowledge-requirement', 'asqa-accredited']),
    // JSON-LD inputs
    courseName: z.string(),
    courseDescription: z.string(),
    price: z.string(),          // display, e.g. "$179"
    priceNumber: z.string(),    // schema, e.g. "179"
    courseWorkload: z.string().default('PT4H'),
    credentialName: z.string(),
    credentialCategory: z.string().default('Certificate of Completion'),
    regulator: z.object({ name: z.string(), url: z.string().url() }).optional(),
    breadcrumb: z.array(z.object({ name: z.string(), item: z.string() })),
    // dated last-reviewed line, shown beside the breadcrumbs. Optional so a new course
    // page still builds, but every published page should carry one. href points the
    // name at the proof of the review, normally the on-page #content-review section.
    reviewedBy: z.object({ name: z.string(), href: z.string().optional(), date: z.string() }).optional(),
    // chrome
    nav: z.array(z.object({ label: z.string(), href: z.string(), sectionId: z.string() })),
    cta,
    sticky: z.object({ label: z.string(), sub: z.string().optional(), price: z.string(), cta }),
    hero: z.object({
      eyebrow: z.string(),
      h1Html: z.string(),
      updated: z.string(),
      subhead: z.string(),
      ticks: z.array(z.string()),
      proof: z.array(z.object({ n: z.string(), text: z.string() })),
      howItWorks: z.string(),
      artefactDesc: z.string(),
      artefactSpec: z.string().optional(),
      artefactImg: z.string().optional(),
      artefactAlt: z.string().optional(),
      artefactRatio: z.enum(['r54', 'r45']).optional(),
    }),
    ctaBand: z.object({ headingHtml: z.string(), sub: z.string(), cta }),
    // page-specific structured content used by the MDX body
    glance: z.array(fact),
    priceRows: z.array(priceRow),
    howItWorksSteps: z.array(step),
    becomeSteps: z.array(step),
    // people + sourcing
    experts: z.array(person),
    footerSources: z.array(source),
    disclaimersHtml: z.string(),
  }),
});

// Scaffolded for future use (per the rebuild plan). No entries yet; the pilot
// keeps experts inline on each course for build-diff parity.
const experts = defineCollection({
  loader: glob({ base: './src/content/experts', pattern: '**/*.md' }),
  schema: person,
});

const partners = defineCollection({
  loader: glob({ base: './src/content/partners', pattern: '**/*.md' }),
  schema: z.object({
    name: z.string(),
    rtoNumber: z.string().optional(),
    role: z.string(),
    url: z.string().url().optional(),
  }),
});

/* ------------------------------------------------------------------------
   Flexible manifest `pages` collection (TRIAL, rendered at /preview/[slug]).
   Additive: the MDX `courses` collection above is untouched. A page becomes a
   validated list of SECTIONS, each an ordered run of BLOCKS, one block type per
   content shape. Reuses the cta/source/person/fact/step/priceRow/img helpers.
   ------------------------------------------------------------------------ */
const mImageSlot = z.object({
  desc: z.string(),
  spec: z.string().optional(),
  ratio: z.enum(['r45', 'r54']).default('r45'),
  image: img.optional(),
});

const mBlock = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('capsule'),
    onDark: z.boolean().default(false),
    html: z.string().refine(
      (s) => {
        const w = s.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length;
        return w >= 35 && w <= 70;
      },
      { message: 'An answer capsule must be roughly 40-60 words.' },
    ),
  }),
  z.object({ type: z.literal('prose'), html: z.string() }),
  z.object({ type: z.literal('cancant'), canTitle: z.string(), can: z.array(z.string()).min(2), cantTitle: z.string(), cant: z.array(z.string()).min(2) }),
  z.object({ type: z.literal('stepper'), steps: z.array(step).min(2), maxWidth: z.string().optional() }),
  z.object({ type: z.literal('facts'), items: z.array(fact).length(4, 'FactGrid takes exactly 4 facts.') }),
  z.object({ type: z.literal('topics'), items: z.array(z.object({ tag: z.string(), title: z.string(), body: z.string() })).min(3) }),
  z.object({ type: z.literal('price'), rows: z.array(priceRow).min(1), foot: z.string().optional() }),
  z.object({ type: z.literal('note'), html: z.string(), maroon: z.boolean().default(false) }),
  z.object({ type: z.literal('faq'), items: z.array(z.object({ q: z.string(), a: z.string(), open: z.boolean().default(false) })).min(4) }),
  z.object({ type: z.literal('credentials'), people: z.array(person).length(2) }),
  z.object({ type: z.literal('verified'), date: z.string(), facts: z.string().optional(), sources: z.array(source).min(1) }),
]);

const mSection = z
  .object({
    id: z.string(),
    nav: z.string().optional(),
    shell: z.enum(['standard', 'zsplit', 'dark']).default('standard'),
    bg: z.enum(['', 'bg-alt', 'bg-warm', 'bg-dark']).default(''),
    eyebrow: z.string(),
    h2: z.string(),
    rev: z.boolean().default(false),
    image: mImageSlot.optional(),
    blocks: z.array(mBlock).min(1),
  })
  .superRefine((s, ctx) => {
    if (s.shell === 'zsplit' && !s.image) ctx.addIssue({ code: 'custom', message: 'Section "' + s.id + '": a zsplit shell needs an image slot.' });
    const first = s.blocks[0].type;
    if (first !== 'capsule' && first !== 'faq' && first !== 'credentials') ctx.addIssue({ code: 'custom', message: 'Section "' + s.id + '": every section except FAQ and credentials must open with an answer capsule.' });
  });

const mAuthority = z.enum(['state-approved-direct', 'knowledge-requirement', 'asqa-accredited']);

const mPage = z
  .object({
    title: z.string().max(60, 'Meta title should stay under 60 characters.'),
    description: z.string().max(160, 'Meta description should stay under 160 characters.'),
    canonical: z.string().url(),
    updated: z.string(),
    authority: mAuthority,
    regulator: z.object({ name: z.string(), url: z.string().url() }).optional(),
    rto: z.object({ name: z.string(), code: z.string() }).optional(),
    price: z.object({ amount: z.number(), display: z.string() }),
    hero: z.object({
      eyebrow: z.string(),
      h1Html: z.string(),
      keyword: z.string(),
      subhead: z.string(),
      ticks: z.array(z.string()).min(3).max(4),
      cta,
      proof: z.array(z.object({ n: z.string(), text: z.string() })).max(3),
      howItWorks: z.string(),
      artefact: mImageSlot,
    }),
    sticky: z.object({ label: z.string(), sub: z.string().optional(), cta }),
    sections: z.array(mSection).min(1),
    course: z.object({ name: z.string(), description: z.string(), workload: z.string().default('PT4H'), credentialName: z.string(), credentialCategory: z.string() }),
    breadcrumbs: z.array(z.object({ name: z.string(), item: z.string().url() })).min(2),
    experts: z.array(person).length(2),
    sources: z.array(source).min(1),
    disclaimersHtml: z.string(),
  })
  .superRefine((p, ctx) => {
    if (p.authority === 'state-approved-direct' && !p.regulator) ctx.addIssue({ code: 'custom', message: 'A state-approved-direct page must name its regulator.' });
    if (p.authority === 'knowledge-requirement' && p.regulator) ctx.addIssue({ code: 'custom', message: 'A knowledge-requirement page (WA) must not present a regulator as recognising the credential; it carries no recognizedBy.' });
    if (p.authority === 'asqa-accredited' && !p.rto) ctx.addIssue({ code: 'custom', message: 'An ASQA-accredited page must name the RTO partner and its code.' });
    if (!p.hero.h1Html.toLowerCase().includes(p.hero.keyword.toLowerCase())) ctx.addIssue({ code: 'custom', message: 'The H1 must contain the primary keyword: "' + p.hero.keyword + '".' });
  });

const pages = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/pages' }),
  schema: mPage,
});

export const collections = { courses, experts, partners, pages };

export type PageData = z.infer<typeof mPage>;
export type SectionData = z.infer<typeof mSection>;
export type BlockData = z.infer<typeof mBlock>;
