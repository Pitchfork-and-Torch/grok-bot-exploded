# STATUS

## 2026-09-22 ship

- Spec copied into docs/SPEC.md. Scaffold is Vite 6, React 19, TypeScript, React Three Fiber, drei, GSAP, Zustand.
- Procedural shell with eight cuts, ten finishes, stadium eyes on a face plate, twelve systems, towel clip off the rail, and fourteen named vein/bus segments.
- `npm run build` exits 0. App gzip without three is about 126 KB (scene chunk 18 KB). three chunk gzip is 193 KB. Postprocessing is a separate high-tier chunk.
- Geometry smoke: truncated-icosahedron cage is 60 verts and 90 edges. Stadium eye bounds are about 0.37 by 0.17. Explode timing puts the shell ahead of the core, and pipes stay coupled through 0.55.
- Content check: 12 poems in range, FAQ text matches JSON-LD, no em or en dashes in the tree.
- Production alias: https://grok-bot-exploded.vercel.app/
- Preview server was not left running in this terminal.

## 2026-09-22 studio face

Looked at the built page. The assembled face was a tall black visor, the mobile stage sat in a second grid column, and the intro exploded before the rest pose could be judged.

- Eye wells are stadiums in the porcelain, not a cavity.
- Closed hull is one mesh at rest, so the hemisphere seam is gone until it explodes.
- Highlight is smaller. Contact shadow is soft. Nape cables stay inside until explode.
- Intro no longer auto-explodes. Breath and blink remain.
- 390 px stage is in the first column and the orb is centered.

Still open: the exploded plate is sparse (dark core, thin pipes, rings read as a tunnel). That is the next slice. The card is a crop of the assembled canvas.

## Loop

1. Scaffold and data graph.
2. Scene, HUD, audio, SEO.
3. Typecheck failures on materials and tube geometry. Fixed.
4. Content check false-failed the towel record and an em dash in AGENTS.md. Fixed.
5. Build green. Vercel upload retried once after a fetch failure, then aliased.
