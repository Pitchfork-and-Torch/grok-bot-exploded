import { DISCLAIMER, FAQ, HOWTO, PAGE } from '../data/copy'

export function buildSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: PAGE.h1,
        applicationCategory: 'DesignApplication',
        operatingSystem: 'Web',
        url: 'https://grok-bot-exploded.vercel.app/',
        description: PAGE.description,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
      {
        '@type': 'TechArticle',
        headline: PAGE.title,
        description: PAGE.description,
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['.lede', '.key-takeaways', '.faq-section'],
        },
        author: {
          '@type': 'Organization',
          name: 'Independent Orb Study',
          description: DISCLAIMER,
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQ.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
      {
        '@type': 'HowTo',
        name: 'How to explore the Orb teardown',
        step: HOWTO.map((text, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          text,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: PAGE.h1,
          },
        ],
      },
      {
        '@type': 'Organization',
        name: 'Independent Orb Study',
        description: `${DISCLAIMER} Not an xAI product.`,
      },
    ],
  }
}
