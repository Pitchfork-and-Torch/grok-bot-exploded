export const motion = {
  explode: 0,
  gazeX: 0,
  gazeY: 0,
  hitX: 0,
  hitY: 0.16,
  hitZ: 0.95,
  forceBlink: false,
  introPlayed: false,
}

export function publishExplode(v: number) {
  motion.explode = v
  if (typeof document !== 'undefined') {
    document.documentElement.style.setProperty('--explode', v.toFixed(4))
  }
}
