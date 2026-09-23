import { useEffect, useRef } from 'react'
import { useStudio } from '../store/useStudio'

const MODES = [
  { id: 'assembled', label: 'Assembled' },
  { id: 'exploded', label: 'Exploded' },
  { id: 'xray', label: 'X-Ray' },
  { id: 'cross', label: 'Cross' },
  { id: 'isolate', label: 'Isolate' },
  { id: 'spin', label: 'Spin' },
] as const

export function HUD() {
  const xray = useStudio((s) => s.xray)
  const cross = useStudio((s) => s.cross)
  const autoSpin = useStudio((s) => s.autoSpin)
  const isolated = useStudio((s) => s.isolated)
  const explodeTarget = useStudio((s) => s.explodeTarget)
  const reduced = useStudio((s) => s.reduced)
  const setExplode = useStudio((s) => s.setExplode)
  const toggleXray = useStudio((s) => s.toggleXray)
  const toggleCross = useStudio((s) => s.toggleCross)
  const toggleSpin = useStudio((s) => s.toggleSpin)
  const isolate = useStudio((s) => s.isolate)
  const resetView = useStudio((s) => s.resetView)

  const run = (id: (typeof MODES)[number]['id']) => {
    if (id === 'assembled') resetView()
    if (id === 'exploded') {
      useStudio.setState({ xray: false, cross: false })
      setExplode(0.85, true)
    }
    if (id === 'xray') toggleXray()
    if (id === 'cross') toggleCross()
    if (id === 'isolate') isolate(useStudio.getState().hovered || 'cortical')
    if (id === 'spin') toggleSpin()
  }

  return (
    <div className="modes" role="toolbar" aria-label="Study modes">
      {MODES.map((mode) => {
        const on =
          (mode.id === 'assembled' && explodeTarget < 0.04 && !xray && !cross && !isolated) ||
          (mode.id === 'exploded' && explodeTarget > 0.7 && !xray) ||
          (mode.id === 'xray' && xray) ||
          (mode.id === 'cross' && cross) ||
          (mode.id === 'isolate' && Boolean(isolated)) ||
          (mode.id === 'spin' && autoSpin)
        return <MagButton key={mode.id} label={mode.label} on={on} disabled={mode.id === 'spin' && reduced} onClick={() => run(mode.id)} />
      })}
    </div>
  )
}

function MagButton({ label, on, disabled, onClick }: { label: string; on: boolean; disabled?: boolean; onClick: () => void }) {
  const ref = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(pointer: coarse)').matches) return
    const move = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const x = event.clientX - (rect.left + rect.width / 2)
      const y = event.clientY - (rect.top + rect.height / 2)
      el.style.transform = `translate(${x * 0.16}px, ${y * 0.2 - 1}px)`
    }
    const leave = () => {
      el.style.transform = ''
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [])
  return (
    <button ref={ref} type="button" className={on ? 'mode on' : 'mode'} aria-pressed={on} disabled={disabled} onClick={onClick}>
      <span className="hair" aria-hidden="true" />
      {label}
    </button>
  )
}
