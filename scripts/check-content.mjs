import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const root = join(import.meta.dirname, '..')
const fail = (msg) => {
  console.error(msg)
  process.exitCode = 1
}

const systems = readFileSync(join(root, 'src/data/systems.ts'), 'utf8')
const copy = readFileSync(join(root, 'src/data/copy.ts'), 'utf8')
const html = readFileSync(join(root, 'index.html'), 'utf8')
const ids = [...systems.matchAll(/id: '([a-z]+)'/g)].map((m) => m[1])
const rail = ['ocular', 'cortical', 'helix', 'veins', 'bus', 'shell', 'flux', 'affect', 'starlink', 'alignment', 'toolbus', 'attitude']
for (const id of rail) if (!ids.includes(id)) fail(`missing system ${id}`)
const railBlock = systems.slice(systems.indexOf('export const RAIL'), systems.indexOf('export const SYSTEMS'))
if (railBlock.includes('towel')) fail('towel must not be on the rail')
const poems = [...systems.matchAll(/poem: `([^`]*)`/g)].map((m) => m[1])
if (poems.length < 12) fail(`expected 12 poems, found ${poems.length}`)
poems.slice(0, 12).forEach((poem, i) => {
  const words = poem.trim().split(/\s+/).length
  if (words < 40 || words > 80) fail(`poem ${i + 1} has ${words} words`)
})
const froms = [...systems.matchAll(/from: '([a-z]+)'/g)].map((m) => m[1])
const tos = [...systems.matchAll(/to: '([a-z]+)'/g)].map((m) => m[1])
if (froms.length < 14 || tos.length !== froms.length) fail('segments need from and to')
for (const id of [...froms, ...tos]) if (!rail.includes(id)) fail(`segment endpoint ${id} is not a system`)
const questions = [...copy.matchAll(/q: `([^`]*)`/g)].map((m) => m[1])
const answers = [...copy.matchAll(/a: `([^`]*)`/g)].map((m) => m[1])
if (questions.length !== 6 || answers.length !== 6) fail('FAQ must have 6 questions')
for (const text of [...questions, ...answers]) if (!html.includes(text)) fail(`index.html missing FAQ text: ${text.slice(0, 48)}`)
if (!html.includes('FAQPage') || !html.includes('TechArticle') || !html.includes('HowTo') || !html.includes('WebApplication')) {
  fail('JSON-LD types missing')
}
const description = copy.match(/description: `([^`]*)`/)?.[1] || ''
if (description.length < 120 || description.length > 170) fail(`description length ${description.length}`)
const essayBits = [...copy.matchAll(/`([^`]{40,})`/g)].map((m) => m[1])
const essayWords = essayBits.join(' ').split(/\s+/).length
if (essayWords < 320) fail(`essay too short: ${essayWords}`)
if (!copy.includes('Not an official SpaceXAI product')) fail('disclaimer missing')
if (!html.includes('llms.txt') && !exists('public/llms.txt')) fail('llms.txt missing')
for (const file of ['public/robots.txt', 'public/sitemap.xml', 'public/llms.txt', 'public/manifest.webmanifest', 'public/og.jpg', 'public/favicon.svg']) {
  if (!exists(file)) fail(`missing ${file}`)
}

const skip = new Set(['node_modules', 'dist', '.git'])
function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (skip.has(name)) continue
    const path = join(dir, name)
    const st = statSync(path)
    if (st.isDirectory()) walk(path, out)
    else if (/\.(ts|tsx|js|mjs|css|html|md|txt|svg|json)$/.test(name)) out.push(path)
  }
  return out
}
function exists(rel) {
  try { statSync(join(root, rel)); return true } catch { return false }
}
for (const path of walk(root)) {
  const text = readFileSync(path, 'utf8')
  if (text.includes('\u2014') || text.includes('\u2013')) fail(`dash in ${path}`)
}
if (process.exitCode) process.exit(process.exitCode)
console.log('content check ok')
