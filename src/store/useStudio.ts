import { create } from 'zustand'
import gsap from 'gsap'
import type { CutId, DyeId } from '../data/palettes'
import { audio } from '../audio/engine'
import { motion, publishExplode } from '../motion/bus'

export type Tier = 'high' | 'mid' | 'low'

interface Studio {
  explodeTarget: number
  isolated: string | null
  hovered: string | null
  dye: DyeId
  cut: CutId
  xray: boolean
  cross: boolean
  autoSpin: boolean
  muted: boolean
  reduced: boolean
  webgl: boolean
  tier: Tier
  post: boolean
  setExplode: (v: number, overshoot?: boolean) => void
  nudgeExplode: (v: number) => void
  setHovered: (id: string | null) => void
  isolate: (id: string | null) => void
  setDye: (d: DyeId) => void
  setCut: (c: CutId) => void
  toggleXray: () => void
  toggleCross: () => void
  toggleSpin: () => void
  toggleMuted: () => void
  setReduced: (v: boolean) => void
  setWebgl: (v: boolean) => void
  setTier: (t: Tier) => void
  setPost: (v: boolean) => void
  resetView: () => void
}

let tween: gsap.core.Timeline | gsap.core.Tween | null = null

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v))
}

function killAndPublish(target: number, overshoot: boolean) {
  tween?.kill()
  const from = motion.explode
  const finish = () => {
    publishExplode(motion.explode)
    audio.noteExplode(motion.explode)
  }
  if (!overshoot || Math.abs(target - from) < 0.025) {
    tween = gsap.to(motion, {
      explode: target,
      duration: 0.45,
      ease: 'power2.out',
      onUpdate: finish,
    })
    return
  }
  const dir = target >= from ? 1 : -1
  const peak = Math.min(1.04, Math.max(0, target + dir * 0.04))
  const tl = gsap.timeline({ onUpdate: finish })
  tl.to(motion, { explode: peak, duration: 0.55, ease: 'power2.out' })
  tl.to(motion, { explode: target, duration: 0.32, ease: 'power2.inOut' })
  tween = tl
}

export const useStudio = create<Studio>((set, get) => ({
  explodeTarget: 0,
  isolated: null,
  hovered: null,
  dye: 'porcelain',
  cut: 'blob',
  xray: false,
  cross: false,
  autoSpin: false,
  muted: true,
  reduced: false,
  webgl: true,
  tier: 'high',
  post: true,
  setExplode: (v, overshoot = false) => {
    const target = clamp01(v)
    set({ explodeTarget: target })
    killAndPublish(target, overshoot)
  },
  nudgeExplode: (v) => {
    tween?.kill()
    const target = clamp01(v)
    publishExplode(target)
    audio.noteExplode(target)
    set({ explodeTarget: target })
  },
  setHovered: (id) => set({ hovered: id }),
  isolate: (id) => {
    const cur = get().isolated
    const next = cur === id ? null : id
    if (next) audio.isolate('in')
    else if (cur) audio.isolate('out')
    set({ isolated: next })
  },
  setDye: (d) => {
    if (get().dye === d) return
    set({ dye: d })
    audio.colorWash()
  },
  setCut: (c) => set({ cut: c }),
  toggleXray: () => set({ xray: !get().xray }),
  toggleCross: () => set({ cross: !get().cross }),
  toggleSpin: () => {
    if (get().reduced) return
    set({ autoSpin: !get().autoSpin })
  },
  toggleMuted: () => {
    const muted = !get().muted
    set({ muted })
    audio.setAudible(!muted)
  },
  setReduced: (v) => set({ reduced: v, autoSpin: v ? false : get().autoSpin }),
  setWebgl: (v) => set({ webgl: v }),
  setTier: (t) => set({ tier: t, post: t === 'high' }),
  setPost: (v) => set({ post: v }),
  resetView: () => {
    get().setExplode(0, true)
    set({ isolated: null, hovered: null, xray: false, cross: false, autoSpin: false })
  },
}))
