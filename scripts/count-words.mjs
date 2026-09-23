import { readFileSync } from 'node:fs'
const systems = readFileSync(new URL('../src/data/systems.ts', import.meta.url), 'utf8')
const copy = readFileSync(new URL('../src/data/copy.ts', import.meta.url), 'utf8')
const poems = [...systems.matchAll(/poem: `([^`]*)`/g)].map((m) => m[1])
poems.forEach((poem, i) => console.log(i + 1, poem.trim().split(/\s+/).length))
const description = copy.match(/description: `([^`]*)`/)[1]
console.log('desc', description.length, description)
const bits = [...copy.matchAll(/`([^`]{40,})`/g)].map((m) => m[1])
console.log('longstrings', bits.length, bits.join(' ').split(/\s+/).length)
