import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MathUtils, type Group, type ShaderMaterial } from 'three'
import { useStudio } from '../store/useStudio'
import { motion } from '../motion/bus'
import { applyDye, applyPresence, busTex, diamondMat, fluxMat, setCrossSection } from './materials'
import { Affect } from './systems/Affect'
import { Alignment } from './systems/Alignment'
import { Attitude } from './systems/Attitude'
import { Cortical } from './systems/Cortical'
import { Flux } from './systems/Flux'
import { Helix } from './systems/Helix'
import { Ocular } from './systems/Ocular'
import { Piping } from './systems/Piping'
import { Shell } from './systems/Shell'
import { Starlink } from './systems/Starlink'
import { Towel } from './systems/Towel'
import { Toolbus } from './systems/Toolbus'
import { useEffect } from 'react'

function SceneSync() {
  const dye = useStudio((s) => s.dye)
  const cross = useStudio((s) => s.cross)
  useEffect(() => {
    applyDye(dye)
  }, [dye])
  useEffect(() => {
    setCrossSection(cross)
  }, [cross])
  useFrame(({ clock }) => {
    const st = useStudio.getState()
    applyPresence(st.hovered, st.isolated, st.xray)
    ;(diamondMat as ShaderMaterial).uniforms.uTime.value = clock.elapsedTime
    busTex.offset.x = -clock.elapsedTime * 0.16
    fluxMat.emissiveIntensity = 0.48 + Math.sin(clock.elapsedTime * 1.3) * 0.12
  })
  return null
}

export function OrbAssembly() {
  const root = useRef<Group>(null)
  useFrame((state, dt) => {
    const st = useStudio.getState()
    if (!st.reduced) {
      motion.gazeX = MathUtils.damp(motion.gazeX, state.pointer.x * 0.07, 5.5, dt)
      motion.gazeY = MathUtils.damp(motion.gazeY, state.pointer.y * 0.045, 5.5, dt)
    }
    const breath = st.reduced ? 1 : 1 + (Math.sin(state.clock.elapsedTime * (Math.PI / 4)) * 0.5 + 0.5) * 0.018
    const g = root.current
    if (!g) return
    g.scale.setScalar(breath)
    const spinning = st.autoSpin && !st.reduced && !st.isolated
    if (spinning) g.rotation.y += dt * 0.16
  })
  return (
    <group ref={root}>
      <Shell />
      <Ocular />
      <Cortical />
      <Helix />
      <Flux />
      <Affect />
      <Starlink />
      <Alignment />
      <Toolbus />
      <Attitude />
      <Piping />
      <Towel />
      <SceneSync />
    </group>
  )
}
