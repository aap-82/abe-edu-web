import { defineCollection, z, reference } from 'astro:content';
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

// Where a layout-owned block renders relative to the MDX body. Defaults to 'after-body',
// which is the behaviour every page had before this existed, so adding it changes nothing
// until a page opts in. 'after-hero' puts the block directly under the wayfinder nav, i.e.
// first content on the page - which is where a CPD page's points and an ASQA page's RTO
// partner belong, since both answer the question the reader arrived with.
const blockPlacement = z.enum(['after-hero', 'after-body']).default('after-body');

// ASQA-accredited courses are delivered and assessed by a named RTO partner; ABE is the
// publisher, never the RTO. partnerRto exists if and only if the model is asqa-accredited
// (enforced by the superRefine below).
const partnerRto = z.object({
  name: z.string(),           // e.g. "Blue Dog Training"
  rtoNumber: z.string(),      // e.g. "31193"
  url: z.string().url().optional(),
  // A LIST, not a single unit. This was `unitCode` + `unitName` (one unit), which fits
  // White Card - one course, one unit, CPCCWHS1001 everywhere except WA's CPCWHS1001 - and
  // does not fit anything else. NSW owner builder needs five units, so the singular shape
  // would have forced the other four into prose where nothing checks them.
  units: z.array(z.object({ code: z.string(), name: z.string() })).optional(),
  credential: z.string().optional(), // defaults to "Statement of Attainment" in PartnerDisclosure
  placement: blockPlacement,
  // Heading copy is content, not layout. It was hardcoded in CourseLayout, which meant a
  // White Card page and an NSW owner builder page were forced to use the same words.
  eyebrow: z.string().default('Delivered with our RTO partner'),
});

// CPD course template (W0-2). Optional: only courses that are a CPD product carry it.
// matrix/bundle are themselves optional inside it, since not every CPD course needs a
// cross-state comparison or an upsell bundle.
const cpd = z.object({
  points: z.string(),                      // headline figure, e.g. "12 points"
  licenceClasses: z.array(z.string()),     // licence classes this course counts towards
  approvalRef: z.object({ label: z.string(), href: z.string().url() }), // e.g. the CBOS listing
  renewalPeriod: z.string(),               // e.g. "Renews annually, 1 July"
  placement: blockPlacement,
  // Same reasoning as partnerRto.eyebrow. Defaults reproduce the strings that were
  // previously hardcoded in CourseLayout, so existing pages render identically.
  headings: z.object({
    points: z.object({
      eyebrow: z.string().default('What you need'),
      h2: z.string().default('How many CPD points does this course give you?'),
    }).prefault({}),
    matrix: z.object({
      eyebrow: z.string().default('Compare'),
      h2: z.string().default('Where else this counts'),
    }).prefault({}),
    bundle: z.object({
      eyebrow: z.string().default('Bundle and save time'),
      h2: z.string().default('Complete your full CPD requirement in one order'),
    }).prefault({}),
  }).prefault({}),
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
    // Keeps a page out of the index without keeping it out of the audit. Built for content
    // VARIANTS: a second take on a page that already ranks must never be crawlable, or the two
    // cannibalise each other - which is exactly what the NSW dual-URL consolidation had to undo.
    // Setting this also drops the page from the sitemap (astro.config.mjs) and exempts it from
    // the orphan check (guardrails 8), since a variant is deliberately unlinked. Everything else
    // in the audit still runs, so a variant is held to the same standard as a live page.
    noindex: z.boolean().optional(),
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
    // Optional, no default: a course duration is a MEASURED fact (LearnWorlds average), not
    // something to guess. Defaulting it silently shipped an invented duration on any page that
    // omitted it; a self-paced course with no measured average simply carries none, and the
    // layout omits timeRequired from the schema rather than asserting a number nobody checked.
    courseWorkload: z.string().optional(),
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
    // People are typed references into the `experts` collection, not inline copies.
    // They used to be inlined per course and had already drifted three ways across the
    // four files (a dropped standards reference, stray punctuation in alt text, and a
    // per-course review date living inside the shared bio). One record now owns them.
    experts: z.array(reference('experts')),
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

// Expert profile pages (W1-2). Extends the shared `person` shape with everything a
// standalone page needs. `person` itself is deliberately left alone: it is still the
// element type of `courses.experts[]`, and widening it there would force every course
// page to carry page-level fields it has no use for.
//
// NOTE the loader glob below is `**/*.md`, NOT `.mdx`. An `.mdx` file here is silently
// ignored — the collection just stays empty and the route builds zero pages.
const expertPage = person.extend({
  // page + head
  title: z.string(),
  description: z.string(),
  canonical: z.string().url(),
  ogImage: z.string().optional(),
  breadcrumb: z.array(z.object({ name: z.string(), item: z.string() })),
  // A portrait is REQUIRED on a profile page, unlike the optional one on `person`.
  // This is the W1-2 "empty headshot URL is a missing resource" rule made mechanical:
  // a missing photo is a named build failure, not a silently-shipped FPO placeholder.
  // The 80-char alt minimum mirrors the build-time guardrail, but fails at authoring
  // time with a far more useful message.
  portrait: z.object({ src: z.string(), alt: z.string().min(80) }),
  // card/summary copy, kept shorter than the full `bio`
  summary: z.string(),
  // employer, for JSON-LD worksFor
  org: z.string(),
  orgUrl: z.string().url().optional(),
  yearsExperience: z.number(),
  // JSON-LD knowsAbout
  specialistAreas: z.array(z.string()),
  hasCredential: z.array(z.object({
    name: z.string(),
    category: z.string(),
    issuedBy: z.string(),
    issuedByUrl: z.string().url().optional(),
  })),
  careerHistory: z.array(z.object({
    role: z.string(),
    org: z.string(),
    period: z.string(),
    note: z.string().optional(),
  })),
  // May be empty. Only publish an award/institution that is independently verified —
  // Dominic's record has no verified qualification, so his array is deliberately empty
  // and no `alumniOf` is emitted for him.
  education: z.array(z.object({ award: z.string(), institution: z.string() })),
  // JSON-LD sameAs. LinkedIn first; .url() so a typo is a build failure.
  sameAs: z.array(z.string().url()),
  lastVerified: z.string(),
  // Courses this expert contributed to. `course` is a typed reference, so an entry can
  // never point at a page that does not exist. `role` carries the relationship, because
  // it differs per expert: Dominic is the course DEVELOPER, Warwick is the independent
  // compliance and currency REVIEWER. `date` is optional and only meaningful for a
  // review — it is the date published on that course page's own `reviewedBy`, so the
  // profile and the course page can never disagree. Developer attribution carries no
  // date, since it is an ongoing relationship rather than a dated event.
  courses: z.array(z.object({
    course: reference('courses'),
    role: z.string(),
    date: z.string().optional(),
  })).optional(),
  sticky: z.object({ label: z.string(), sub: z.string().optional(), price: z.string(), cta }),
}).superRefine((data, ctx) => {
  // Per-expert "What NOT to Claim" rules, from the Notion credentials record. These are
  // accuracy constraints on a page whose entire purpose is establishing credibility, so
  // they are enforced rather than documented. Scoped to this collection only.
  const BANNED: Array<[RegExp, string]> = [
    [/\bCDR Group\b/, 'the organisation is "Corporate Development Resource Group (CDRG)", never "CDR Group".'],
    [/\bContent Reviewer\b/i, 'the role is "Compliance & Currency Reviewer", never "Content Reviewer".'],
    [/factual accuracy/i, 'the correct phrasing is "legislative currency and regulatory accuracy" — he reviews published pages, not course content.'],
    [/\bB\.?\s?Bldg\b|\bRMIT\b|Bachelor of Building/i, 'no building degree may be claimed. The verified qualification is an Associate Diploma in Business Management (Hospitality).'],
  ];
  const haystack = JSON.stringify(data);
  for (const [re, why] of BANNED) {
    if (re.test(haystack)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: `Prohibited claim: ${why}` });
    }
  }
});

const experts = defineCollection({
  loader: glob({ base: './src/content/experts', pattern: '**/*.md' }),
  schema: expertPage,
});

const partners = defineCollection({
  loader: glob({ base: './src/content/partners', pattern: '**/*.md' }),
  schema: z.object({
    name: z.string(),                      // trading name, used in copy
    legalName: z.string().optional(),      // as registered on training.gov.au
    rtoNumber: z.string().optional(),
    role: z.string(),
    url: z.string().url().optional(),
    // training.gov.au record — the crawlable proof link on /accreditation. ABE is not
    // an RTO, so every "nationally recognised" claim must be verifiable against TGA.
    // Note the capitalised path: training.gov.au serves /Organisation/Details/{code}.
    tgaUrl: z.string().url().optional(),
    scopeNote: z.string().optional(),
    verified: z.string().optional(),       // dated check against the TGA record
  }),
});

// Hub / home template (W0-3). Spokes are typed references into `courses`, so price,
// state and the URL always come from the course entry itself, never a copy that can
// drift; `blurb` is the only hub-authored text per spoke, since a course's own
// `description` is SEO-length, too long for a card. No Course node in a hub's JSON-LD:
// a hub is a BreadcrumbList + ItemList over its spokes, never a Course itself.
const hubs = defineCollection({
  loader: glob({ base: './src/content/hubs', pattern: '**/*.mdx' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    canonical: z.string().url(),
    ogImage: z.string().optional(),
    intro: z.string(),          // the Answer capsule body under the hero
    breadcrumb: z.array(z.object({ name: z.string(), item: z.string() })),
    reviewedBy: z.object({ name: z.string(), href: z.string().optional(), date: z.string() }).optional(),
    nav: z.array(z.object({ label: z.string(), href: z.string(), sectionId: z.string() })).optional(),
    hero: z.object({ eyebrow: z.string(), h1Html: z.string(), updated: z.string(), subhead: z.string(), cta }),
    sticky: z.object({ label: z.string(), sub: z.string().optional(), price: z.string(), cta }),
    spokes: z.array(z.object({
      course: reference('courses'),
      blurb: z.string(),
    })),
    comparison: z.object({
      caption: z.string().optional(),
      columns: z.array(z.object({ key: z.string(), label: z.string(), href: z.string().optional(), soon: z.boolean().optional() })),
      rows: z.array(z.object({ label: z.string(), values: z.array(z.string()) })),
    }).optional(),
    trust: z.object({
      h2: z.string(),
      stats: z.array(z.object({ value: z.string(), label: z.string(), numeric: z.boolean().optional() })),
      attestHtml: z.string(),
    }).optional(),
    faqs: z.array(z.object({ q: z.string(), a: z.string(), open: z.boolean().optional() })),
    ctaBand: z.object({ headingHtml: z.string(), sub: z.string(), cta }),
    footerSources: z.array(source).optional(),
    disclaimersHtml: z.string().optional(),
    publishedAt: z.string(),
    lastReviewedAt: z.string(),
  }),
});

// A CPD bundle: the page and the product, one per {category × state}.
//
// WHAT IS DELIBERATELY ABSENT: `points`, and the member course list. Both are DERIVED at build
// from kb/register/cpd/tas-courses.json, counting only courses with status `live` and capping at
// 12. Authoring a points figure here would create a second copy of a number the register owns,
// and the copy is what goes stale — the Electrical bundle advertised 12 points for three months
// after one of its courses expired, because the figure was typed on a page rather than counted.
// This schema therefore holds only what the register does NOT know: price, the buy link, and copy.
//
// `licences` names the licence types the category applies to, from the register's Category
// Description. A category spans several licences with different annual requirements (12, 20, 30),
// so "who is this for" cannot be read off the bundle title and must be stated.
const cpdBundles = defineCollection({
  loader: glob({ base: './src/content/cpd-bundles', pattern: '**/*.mdx' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    canonical: z.string().url(),
    ogImage: z.string().optional(),
    noindex: z.boolean().optional(),
    // Must be one of the three bundles ABE sells. The register carries a fourth category,
    // gas-fitting, which is not offered — an enum rather than a string keeps a page for it
    // from being created by accident.
    category: z.enum(['building', 'electrical', 'plumbing']),
    state: z.string(),
    regulator: z.object({ name: z.string(), url: z.string().url() }),
    // Commercial facts the register does not hold.
    price: z.string(),                 // display, e.g. "$499"
    priceNumber: z.string(),           // schema, e.g. "499"
    rrp: z.string().optional(),
    buyUrl: z.string(),                // the LearnWorlds program this bundle is sold as
    licences: z.string(),
    intro: z.string(),
    breadcrumb: z.array(z.object({ name: z.string(), item: z.string() })),
    reviewedBy: z.object({ name: z.string(), href: z.string().optional(), date: z.string() }).optional(),
    nav: z.array(z.object({ label: z.string(), href: z.string(), sectionId: z.string() })).optional(),
    hero: z.object({ eyebrow: z.string(), h1Html: z.string(), updated: z.string(), subhead: z.string(), cta }),
    sticky: z.object({ label: z.string(), sub: z.string().optional(), price: z.string(), cta }),
    ctaBand: z.object({ headingHtml: z.string(), sub: z.string(), cta }),
    experts: z.array(reference('experts')),
    faqs: z.array(z.object({ q: z.string(), a: z.string(), open: z.boolean().optional() })),
    footerSources: z.array(source).optional(),
    disclaimersHtml: z.string().optional(),
    publishedAt: z.string(),
    lastReviewedAt: z.string(),
  }),
});

export const collections = { courses, experts, partners, hubs, cpdBundles };
