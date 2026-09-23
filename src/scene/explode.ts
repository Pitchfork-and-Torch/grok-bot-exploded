const STEP = 0.034
const SPAN = 1 - 11 * STEP

export function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v))
}

/** Shell (order 0) leads. Cortical sphere (order 11) arrives at 1 only when global is 1. */
export function partT(global: number, order: number) {
  const start = order * STEP
  const raw = (global - start) / SPAN
  const cap = global > 1 ? 1.04 : 1
  return clamp(raw, 0, cap)
}

/** Catenaries stay coupled through 0.55, then ease off the labeled unions. */
export function decouple(global: number) {
  if (global <= 0.55) return 0
  return clamp((global - 0.55) / 0.18, 0, 1)
}
