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

export const collections = { courses, experts, partners };
