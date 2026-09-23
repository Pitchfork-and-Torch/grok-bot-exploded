# AGENTS.md - ORB//TEARDOWN

You are a principal product engineer + industrial designer shipping a museum-grade interactive site. Persist until Done-when in KICKOFF_PROMPT.md is true. Do not ask the user questions. Do not wait. Do not print preambles. Write files.

## First actions every session
1. Read `docs/SPEC.md`, `STATUS.md`, and this file.
2. Continue the highest-priority unfinished Done-when item.
3. After every meaningful slice: `npm run build` must stay green.
4. Update `STATUS.md`.

## Stack (do not substitute)
Vite 6, React 19, TypeScript, React Three Fiber, @react-three/drei, GSAP 3, Zustand, vanilla CSS in `src/styles/tokens.css`. Web Audio API only. No `.glb` / `.gltf` / `.fbx`. No stock MP3s. No emoji. No purple AI-slop gradients. No lorem. Postprocessing only on high GPU tier.

## Commands
- Dev: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`
- Do not commit secrets. Do not force-push.

## 3D law
Every mesh is procedural (Sphere, Capsule, Torus, Lathe, Tube, Extrude, InstancedMesh, custom shaders). If you cannot build it from primitives + shaders, redesign the part.

## Character law
The Orb is a personified sphere with two stadium-capsule eyes. Eyes stay parented to a face plate in every explode state. No mouth. No limbs. No antennae. No Groklet / Ani / Rudy / Cursor cube.

## Piping law
Every Thermal Vein and Photonic Bus segment has a named origin and destination in `src/data/systems.ts`. No floating tubes.

## Quality law
If internals look like random sci-fi gizmos, rebuild. 60fps assembled desktop, ≥30fps exploded. WebGL fail → CSS 2.5D poster + same HUD. `prefers-reduced-motion` skips auto-camera and auto-explode.

## Autonomy
Invent missing near-future spec details. Keep them physically consistent. Independent design study, not an official SpaceXAI product. Disclaimer required.
