import { mkdirSync } from 'node:fs'
import { preview } from 'vite'
import { chromium } from 'playwright-core'

const out = process.env.ORB_STILLS || 'C:\\Users\\Knock\\AppData\\Local\\Temp\\orb-stills'
const chrome = process.env.ORB_CHROME || 'C:\\Users\\Knock\\AppData\\Local\\ms-playwright\\chromium-1228\\chrome-win64\\chrome.exe'
mkdirSync(out, { recursive: true })

const server = await preview({
  preview: { host: '127.0.0.1', port: 4179, strictPort: true },
})

const browser = await chromium.launch({
  executablePath: chrome,
  headless: true,
  args: ['--use-angle=d3d11', '--enable-webgl', '--ignore-gpu-blocklist'],
})

const errors = []
async function shoot(page, name) {
  await page.screenshot({ path: `${out}\\${name}.png` })
  console.log('shot', name)
}

try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text())
  })
  page.on('pageerror', (err) => errors.push(String(err)))
  await page.goto('http://127.0.0.1:4179/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(2200)
  const probe = await page.evaluate(() => ({
    noWebgl: document.documentElement.classList.contains('no-webgl'),
    canvas: !!document.querySelector('canvas'),
  }))
  console.log('probe', JSON.stringify(probe))
  await page.keyboard.press('a')
  await page.waitForTimeout(900)
  await shoot(page, 'assembled-1280')
  await page.keyboard.press('e')
  await page.waitForTimeout(1200)
  await shoot(page, 'exploded-1280')
  await page.keyboard.press('x')
  await page.waitForTimeout(400)
  await shoot(page, 'xray-1280')
  await page.setViewportSize({ width: 390, height: 844 })
  await page.keyboard.press('a')
  await page.waitForTimeout(700)
  await shoot(page, 'assembled-390')
  if (errors.length) console.log('CONSOLE', errors.slice(0, 12).join('\n'))
  else console.log('CONSOLE clean')
} finally {
  await browser.close()
  server.httpServer.close()
}
console.log('stills', out)
