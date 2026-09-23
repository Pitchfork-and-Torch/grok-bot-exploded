# ORB//TEARDOWN spec

Independent design study of a Grok Bot orb. Not an official SpaceXAI product. Not an xAI product. Footer and FAQ must say so.

Wordmark: `ORB//TEARDOWN`
Subline: `GROK BOT UNIT GB-0 - EXPLODED TECHNICAL STUDY`

One object, studio light, numbered parts. Not a SaaS page. Not an AI wrapper. No Groklet, Ani, Rudy, or Cursor cube. No mouth, limbs, or antennae. No emoji. No purple gradient backgrounds. No lorem. No GLB, GLTF, FBX, or stock audio.

## Character

Conceptual diameter about 200 mm in scene units (radius 1). Default cut is Blob: sphere scaled a little on Y. Porcelain is the default finish (ivory hull, black capsule eyes). Obsidian is glossy black with white eyes and a tight 10-o'clock specular.

Eyes are true stadiums. Corner radius is half the short side. Pair spacing about 0.28 D. Each eye about 0.18 D wide and 0.08 D tall. Both eyes move together on a disk of radius 0.035 D. They never look in different directions. Blink is 80 ms close, 40 ms hold, 90 ms open, sometimes a double blink, idle gap 6 to 11 s. Breath is scale 1.00 to 1.018 over 4 s, ping-pong. Hover or isolate narrows the eyes about 8 percent. Isolating the core makes one eye briefly thinner.

Cuts, hull only: Blob, Pebble, Squircle, Tablet, Wedge, Hex, Cloud, Teardrop. Eyes stay on the face plate. Dyes: Porcelain, Obsidian, Blue, Flame, Teal, Red, Pink, Violet, Orange, Brown. Dye swap is a material change plus the ColorWash tone. Violet is a dusty material color, not a page gradient.

When the hull splits, the eyes stay parented to the face plate.

## Systems

Catalog and pipes live in `src/data/systems.ts`. Every Thermal Vein and Photonic Bus segment has a named origin and a named destination. Catenaries stay attached until explode 0.55, then park short of the part so the union reads as a gap.

1. GB-OC-01 Ocular Array. Eyes translate forward on the optical axis. Flex still runs back toward the Affect Coil.
2. GB-CS-02 Cortical Sphere. 48 mm class core. Rises a little so the cage can clear it. Last in the explode order.
3. GB-MH-03 Mnemonic Helix. Six wafer rings. They tick about 2 degrees on a slow write. They separate along their axes.
4. GB-TV-04 Thermal Veins. Thin copper-rose and smoked-quartz lines. Radial inflate, then decouple.
5. GB-PB-05 Photonic Bus. Ribbon loom with a traveling cool pulse.
6. GB-MS-06 Morph Shell. Two hemispheres on X and an equatorial latch on Y. Morph Shell moves first.
7. GB-FC-07 Flux Cell. Offset superconducting toroid, amber when charged, one braid.
8. GB-ER-08 Affect Coil. Helmholtz pair behind the eyes. Hover makes the eyes rehearse an expression.
9. GB-SA-09 Starlink Cortex. 64 gold patches on a crown cap. Lifts on Y.
10. GB-AI-10 Alignment Cage. Niobium truncated icosahedron. Scales to about 1.35.
11. GB-TH-11 Toolbus Harness. Seven nape ports, MCP-0 through MCP-6. Cables drop on Y.
12. GB-AR-12 Attitude Ring. Equatorial hoop, 8 cold-gas dots. Steps forward on Z.

Easter egg GB-TW-13 Towel Clip. Visible only at explode >= 0.85. Not in the rail. Click title is "Don't Panic."

## Interaction

Hero idle, then a 1.4 s assembled hold, a blink, and an auto-explode to 0.62. Skip that intro when `prefers-reduced-motion` is set. Slider 0 to 1, desktop wheel on the stage, keys E and A. GSAP owns the explode ease, including a short overshoot toward 1.04 on cinematic moves. Hover: callout, siblings dim, crosshair. Click: isolate, drawer, one-axis spin. Esc resets the view. Keys: E explode, A assemble, X x-ray, C cross-section, M mute, 1-9 isolate the first nine systems, 0 isolates the toolbus.

Modes: Assembled, Exploded (about 0.85), X-Ray (shell near 12 percent, bus brighter), Cross (clipping plane), Isolate, Spin. Colorway and cut rails are instant.

Slider detents tick. Buttons grow a hairline and open tracking. Part numbers copy. Desktop controls nudge toward the pointer. The GB monogram draws in about 400 ms. Focus rings on keyboard controls.

## Audio

`src/audio/engine.ts`. Web Audio only. Start muted. Preference key `orb-teardown-audio`. Idle hum is 42 Hz and 84 Hz at a low level, plus rare high dust. Tick, latch, decouple, pulse, blink, color wash, isolate whoosh. No melody. Reduced motion keeps Tick and drops the other one-shots.

## Stack and quality

Vite 6, React 19, TypeScript, React Three Fiber, drei, GSAP 3, Zustand, vanilla CSS. Postprocessing only on the high tier. WebGL failure shows the CSS poster and the same HUD. Targets: readable eyes at every explode depth, 60 fps assembled on a desktop class GPU, at least 30 fps exploded, layouts at 390, 768, 1280, and 1920. Three is code-split. No secrets. `npm run build` stays green.

## Page and SEO

One H1. Essay "How an Orb thinks." Six FAQ answers match the JSON-LD FAQPage. Also TechArticle (speakable `.lede`, `.key-takeaways`, `.faq-section`), HowTo, WebApplication, BreadcrumbList, Organization marked as an independent study. Ship robots.txt, sitemap.xml, llms.txt, manifest, favicon, and a 1200x630 raster card. Do not invent a live URL. Stamp the real origin only after a deploy prints one.

## Done-when

Build exits 0. Preview can show the porcelain Blob with the poster as first paint. Slider separates all 12 systems. Pipes decouple after 0.55. Hover, click, Esc, and the keys work. Ten finishes and eight cuts work. Eyes stay readable. Towel clip exists and is off the rail. Audio defaults muted and remembers a choice. JSON-LD matches the visible FAQ. Mobile, reduced motion, and no-WebGL paths exist. Disclaimer is in the footer and the FAQ. README explains install, dev, build, and preview. STATUS has the loop. DONE has preview steps and either a real URL or the exact deploy commands.
