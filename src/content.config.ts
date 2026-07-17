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

// ASQA-accredited courses are delivered and assessed by a named RTO partner; ABE is the
// publisher, never the RTO. partnerRto exists if and only if the model is asqa-accredited
// (enforced by the superRefine below).
const partnerRto = z.object({
  name: z.string(),           // e.g. "Blue Dog Training"
  rtoNumber: z.string(),      // e.g. "31193"
  url: z.string().url().optional(),
  unitCode: z.string().optional(),   // CPCCWHS1001 everywhere except WA: CPCWHS1001
  unitName: z.string().optional(),
  credential: z.string().optional(), // defaults to "Statement of Attainment" in PartnerDisclosure
});

// CPD course template (W0-2). Optional: only courses that are a CPD product carry it.
// matrix/bundle are themselves optional inside it, since not every CPD course needs a
// cross-state comparison or an upsell bundle.
const cpd = z.object({
  points: z.string(),                      // headline figure, e.g. "12 points"
  licenceClasses: z.array(z.string()),     // licence classes this course counts towards
  approvalRef: z.object({ label: z.string(), href: z.string().url() }), // e.g. the CBOS listing
  renewalPeriod: z.string(),               // e.g. "Renews annually, 1 July"
  matrix: z.object({
    caption: z.string().optional(),
    states: z.array(z.string()),
    rows: z.array(z.object({
      industry: z.string(),
      note: z.string().optional(),
      cells: z.array(z.object({ href: z.string(), label: z.string().optional() }).nullable()),
    })),
  }).optional(),
  bundle: z.object({
    eyebrow: z.string().optional(),
    heading: z.string(),
    lede: z.string(),
    items: z.array(z.object({ label: z.string(), sub: z.string().optional(), price: z.string() })),
    totalLabel: z.string().optional(),
    total: z.string(),
    cta,
    note: z.string().optional(),
  }).optional(),
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
    // required iff authorityModel === 'asqa-accredited' — see superRefine below
    partnerRto: partnerRto.optional(),
    // present only on CPD course pages — see CourseLayout's cpd branch
    cpd: cpd.optional(),
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
  }).superRefine((data, ctx) => {
    // partnerRto if and only if asqa-accredited: an ASQA page without a named RTO
    // partner cannot make the "nationally recognised" claim, and a non-ASQA page
    // carrying one would credit an RTO that has no role in the course.
    if (data.authorityModel === 'asqa-accredited' && !data.partnerRto) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['partnerRto'],
        message: 'asqa-accredited courses must name their partnerRto (name + rtoNumber). ABE is not an RTO.',
      });
    }
    if (data.authorityModel !== 'asqa-accredited' && data.partnerRto) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['partnerRto'],
        message: `partnerRto is only valid on asqa-accredited courses (this course is ${data.authorityModel}).`,
      });
    }
    // ASQA credentials are Statements of Attainment issued by the RTO partner; the
    // state-approved models issue a Certificate of Completion. Catch the mismatch early.
    if (data.authorityModel === 'asqa-accredited' && /certificate of completion/i.test(data.credentialCategory)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['credentialCategory'],
        message: 'asqa-accredited courses issue a Statement of Attainment, not a Certificate of Completion.',
      });
    }
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

export const collections = { courses, experts, partners };
