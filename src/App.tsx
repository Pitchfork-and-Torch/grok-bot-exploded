import { Component, Suspense, lazy, useEffect, useRef, type ReactNode } from 'react'
import { audio } from './audio/engine'
import { DISCLAIMER, PAGE, PLATE } from './data/copy'
import { RAIL, SYSTEMS, specById } from './data/systems'
import { motion } from './motion/bus'
import { useStudio } from './store/useStudio'
import { AudioToggle } from './ui/AudioToggle'
import { ColorwayRail } from './ui/ColorwayRail'
import { CutPicker } from './ui/CutPicker'
import { Essay } from './ui/Essay'
import { ExplodeSlider } from './ui/ExplodeSlider'
import { FAQ } from './ui/FAQ'
import { FallbackPoster } from './ui/FallbackPoster'
import { HUD } from './ui/HUD'
import { SpecDrawer } from './ui/SpecDrawer'
import { SystemLegend } from './ui/SystemLegend'

const OrbStudio = lazy(() => import('./scene/OrbStudio'))

class StageBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch() {
    document.documentElement.classList.add('no-webgl')
  }
  render() {
    if (this.state.failed) return null
    return this.props.children
  }
}

export function App() {
  const webgl = useStudio((s) => s.webgl)
  const hovered = useStudio((s) => s.hovered)
  const isolated = useStudio((s) => s.isolated)
  const stageRef = useRef<HTMLElement>(null)
  const active = specById(isolated || hovered)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) document.documentElement.classList.add('reduced')
    const studio = useStudio.getState()
    studio.setReduced(reduced)
    audio.setReduced(reduced)
    const audible = audio.initialAudible()
    useStudio.setState({ muted: !audible })
    if (audible) audio.setAudible(true)
    if (reduced) return
    const timer = window.setTimeout(() => {
      if (motion.introPlayed) return
      motion.introPlayed = true
      motion.forceBlink = true
    }, 1400)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') && event.key !== 'Escape') return
      const studio = useStudio.getState()
      const key = event.key.toLowerCase()
      if (key === 'e') studio.setExplode(0.85, true)
      if (key === 'a' || event.key === 'Escape') studio.resetView()
      if (key === 'x') studio.toggleXray()
      if (key === 'c') studio.toggleCross()
      if (key === 'm') studio.toggleMuted()
      if (event.key === '0') studio.isolate('toolbus')
      if (event.key >= '1' && event.key <= '9') studio.isolate(RAIL[Number(event.key) - 1])
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const onWheel = (event: WheelEvent) => {
      if (window.matchMedia('(pointer: coarse)').matches) return
      const studio = useStudio.getState()
      if (window.scrollY > 8 && event.deltaY > 0 && studio.explodeTarget >= 0.98) return
      event.preventDefault()
      studio.nudgeExplode(motion.explode + Math.sign(event.deltaY) * 0.035)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  return (
    <>
      <a className="skip" href="#essay">Skip to essay</a>
      <div className="viewport">
        <header className="top">
          <svg className="gb" viewBox="0 0 64 28" aria-hidden="true">
            <path d="M6 22 V6 H18 A8 8 0 0 1 18 22 Z M30 6 H50 M30 14 H44 M30 22 H50" fill="none" stroke="currentColor" strokeWidth="1.25" />
          </svg>
          <div>
            <h1>{PAGE.h1}</h1>
            <p className="sub">{PAGE.sub}</p>
          </div>
        </header>
        <SystemLegend />
        <section ref={stageRef} className={hovered ? 'stage hot' : 'stage'} aria-label="Study stage">
          {webgl ? (
            <StageBoundary>
              <Suspense fallback={null}>
                <OrbStudio />
              </Suspense>
            </StageBoundary>
          ) : null}
          <FallbackPoster />
          <svg className="leader" aria-hidden="true">
            <line id="leader-line" />
          </svg>
          <div id="callout" className="callout">
            <span id="callout-kicker" />
            <strong id="callout-name" />
            <em id="callout-fn" />
          </div>
          <p className="readout" aria-live="polite">{active ? `${active.code} ${active.fn}` : 'Porcelain Blob'}</p>
        </section>
        <SpecDrawer />
        <div className="controls">
          <ExplodeSlider />
          <HUD />
          <ColorwayRail />
          <CutPicker />
        </div>
      </div>
      <Essay />
      <section className="index-plate" aria-label="Plate index">
        <h2>Twelve systems</h2>
        {RAIL.map((id) => {
          const sys = SYSTEMS[id]
          return (
            <article key={id} id={`sys-${id}`}>
              <h3>{sys.index} {sys.code}</h3>
              <p>{sys.name}. {sys.fn}</p>
            </article>
          )
        })}
      </section>
      <FAQ />
      <footer>
        <p>{DISCLAIMER}</p>
        <p>{PLATE}</p>
      </footer>
      <AudioToggle />
    </>
  )
}
