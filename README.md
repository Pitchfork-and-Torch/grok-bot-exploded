# ORB//TEARDOWN

Independent design study of a Grok Bot orb: a porcelain sphere, stadium eyes, and an exploded plate of near-future internals. Not an official SpaceXAI product.

## Install

```bash
npm install
```

## Dev

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

Open the URL the preview command prints. The first paint is the inline porcelain poster. The stage replaces it when WebGL is ready.

## Keys

E explode, A assemble, X x-ray, C cross-section, M mute, 1-9 isolate, 0 toolbus, Esc reset.

## Deploy

Live: https://grok-bot-exploded.vercel.app/

Vercel, from this folder, when the CLI is already logged in:

```bash
vercel --yes --prod
```

GitHub, when `gh` is Pitchfork-and-Torch:

```bash
gh repo create Pitchfork-and-Torch/grok-bot-exploded --public --source=. --remote=origin --push
```

Canonical, sitemap, and og:image point at that origin.
