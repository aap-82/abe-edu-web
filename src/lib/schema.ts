import type { PageData } from '../content.config';

/**
 * JSON-LD @graph, DERIVED from the page manifest.
 *
 * Deriving rather than hand-authoring makes two historic hard-blockers
 * unrepresentable: Course.offers.price comes from the same `price.amount` the
 * PriceCard renders, and recognizedBy is emitted only for the authority models
 * that allow it (never for the WA knowledge-requirement model).
 */
export function buildSchema(p: PageData) {
  const credential: Record<string, unknown> = {
    '@type': 'EducationalOccupationalCredential',
    '@id': p.canonical + '#credential',
    name: p.course.credentialName,
    credentialCategory: p.course.credentialCategory,
  };

  if (p.authority === 'state-approved-direct' && p.regulator) {
    credential.recognizedBy = { '@type': 'GovernmentOrganization', name: p.regulator.name, url: p.regulator.url };
  }
  if (p.authority === 'asqa-accredited' && p.rto) {
    credential.recognizedBy = { '@type': 'EducationalOrganization', name: p.rto.name + ' (RTO ' + p.rto.code + ')' };
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Course',
        '@id': p.canonical + '#course',
        name: p.course.name,
        description: p.course.description,
        provider: { '@type': 'Organization', name: 'ABE Education', url: 'https://www.abeeducation.edu.au' },
        inLanguage: 'en-AU',
        offers: {
          '@type': 'Offer',
          price: String(p.price.amount), // same number the page renders
          priceCurrency: 'AUD',
          category: 'Tuition',
          availability: 'https://schema.org/InStock',
          url: p.canonical,
        },
        hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online', courseWorkload: p.course.workload },
      },
      credential,
      {
        '@type': 'BreadcrumbList',
        itemListElement: p.breadcrumbs.map((b, i) => ({ '@type': 'ListItem', position: i + 1, name: b.name, item: b.item })),
      },
      ...p.experts.map((e) => ({
        '@type': 'Person',
        name: e.name,
        jobTitle: e.role.split('·')[0].trim(),
        sameAs: e.linkedin,
      })),
    ],
  };
}
