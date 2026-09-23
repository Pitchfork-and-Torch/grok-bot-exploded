import { useEffect, useRef, useState } from 'react'
import { audio } from '../audio/engine'
import { motion } from '../motion/bus'
import { useStudio } from '../store/useStudio'

const STEPS = 11

export function ExplodeSlider() {
  const target = useStudio((s) => s.explodeTarget)
  const nudge = useStudio((s) => s.nudgeExplode)
  const setExplode = useStudio((s) => s.setExplode)
  const label = useRef<HTMLSpanElement>(null)
  const [bump, setBump] = useState(false)
  const step = useRef(-1)

  useEffect(() => {
    let frame = 0
    const loop = () => {
      if (label.current) label.current.textContent = String(Math.round(motion.explode * 100)).padStart(2, '0')
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <label className={bump ? 'slider bump' : 'slider'}>
      <span className="slider-kicker">Explode</span>
      <input
        type="range"
        min={0}
        max={1}
        step={0.001}
        value={target}
        aria-valuetext={`${Math.round(target * 100)} percent exploded`}
        onChange={(event) => {
          const value = Number(event.target.value)
          const next = Math.round(value * STEPS)
          if (next !== step.current) {
            step.current = next
            audio.tick(2400)
            setBump(true)
            window.setTimeout(() => setBump(false), 80)
          }
          nudge(value)
        }}
        onPointerUp={(event) => {
          const value = Number((event.target as HTMLInputElement).value)
          const snapped = Math.round(value * STEPS) / STEPS
          setExplode(snapped, true)
        }}
      />
      <span className="slider-read" ref={label}>00</span>
    </label>
  )
}
