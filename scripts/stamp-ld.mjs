import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const copy = readFileSync(join(root, 'src/data/copy.ts'), 'utf8')

function block(name, next) {
  const start = copy.indexOf(`export const ${name}`)
  const end = next ? copy.indexOf(`export const ${next}`) : copy.length
  return copy.slice(start, end)
}

function ticks(source, key) {
  return [...source.matchAll(new RegExp(`${key}: \`([\\s\\S]*?)\``, 'g'))].map((match) => match[1])
}

const page = block('PAGE', 'DISCLAIMER')
const title = ticks(page, 'title')[0]
const description = ticks(page, 'description')[0]
const h1 = ticks(page, 'h1')[0]
const faq = block('FAQ', 'HOWTO')
const questions = ticks(faq, 'q')
const answers = ticks(faq, 'a')
const howto = ticks(block('HOWTO', ''), 'HOWTO')
const steps = howto.length ? howto : [...block('HOWTO', '').matchAll(/`([^`]+)`/g)].map((match) => match[1])
const disclaimer = ticks(block('DISCLAIMER', 'PLATE'), 'DISCLAIMER')[0] || 'Independent design study. Not an official SpaceXAI product.'

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: h1,
      applicationCategory: 'DesignApplication',
      operatingSystem: 'Web',
      url: 'https://grok-bot-exploded.vercel.app/',
      description,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@type': 'TechArticle',
      headline: title,
      description,
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['.lede', '.key-takeaways', '.faq-section'],
      },
      author: { '@type': 'Organization', name: 'Independent Orb Study', description: disclaimer },
    },
    {
      '@type': 'FAQPage',
      mainEntity: questions.map((q, i) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: answers[i] },
      })),
    },
    {
      '@type': 'HowTo',
      name: 'How to explore the Orb teardown',
      step: steps.map((text, i) => ({ '@type': 'HowToStep', position: i + 1, text })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [{ '@type': 'ListItem', position: 1, name: h1 }],
    },
    {
      '@type': 'Organization',
      name: 'Independent Orb Study',
      description: `${disclaimer} Not an xAI product.`,
    },
  ],
}

const htmlPath = join(root, 'index.html')
const html = readFileSync(htmlPath, 'utf8')
const json = JSON.stringify(schema, null, 2).replace(/</g, '\\u003c')
let found = false
const next = html.replace(
  /<script type="application\/ld\+json" id="orb-jsonld">[\s\S]*?<\/script>/,
  () => {
    found = true
    return `<script type="application/ld+json" id="orb-jsonld">\n${json}\n    </script>`
  },
)
if (!found) throw new Error('stamp did not find the JSON-LD slot')
writeFileSync(htmlPath, next)
console.log(`stamped ${questions.length} FAQ entries`)
