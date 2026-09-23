import { useRef, type ReactNode } from 'react'
import type { ThreeEvent } from '@react-three/fiber'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import { audio } from '../../audio/engine'
import { specById, SYSTEMS, type SysId, type Vec3 } from '../../data/systems'
import { motion } from '../../motion/bus'
import { partT } from '../explode'
import { useStudio } from '../../store/useStudio'

export function bindPart(id: string) {
  return {
    onPointerOver: (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation()
      motion.hitX = e.point.x
      motion.hitY = e.point.y
      motion.hitZ = e.point.z
      useStudio.getState().setHovered(id)
      const spec = specById(id)
      const freq = spec && 'sound' in spec ? spec.sound : 720
      audio.hover(id, freq)
    },
    onPointerMove: (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation()
      motion.hitX = e.point.x
      motion.hitY = e.point.y
      motion.hitZ = e.point.z
    },
    onPointerOut: (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation()
      const st = useStudio.getState()
      if (st.hovered === id) st.setHovered(null)
    },
    onClick: (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation()
      useStudio.getState().isolate(id)
    },
  }
}

export function PartFrame({
  id,
  rest = [0, 0, 0],
  children,
}: {
  id: SysId
  rest?: Vec3
  children: ReactNode
}) {
  const ref = useRef<Group>(null)
  const spin = useRef(0)
  useFrame((_, dt) => {
    const g = ref.current
    if (!g) return
    const sys = SYSTEMS[id]
    const t = partT(motion.explode, sys.order)
    g.position.set(rest[0] + sys.explode[0] * t, rest[1] + sys.explode[1] * t, rest[2] + sys.explode[2] * t)
    const scale = 1 + (sys.scaleTo - 1) * t
    g.scale.setScalar(scale)
    const iso = useStudio.getState().isolated === id
    if (iso) spin.current += dt * 0.42
    else spin.current *= Math.max(0, 1 - dt * 3)
    g.rotation.y = spin.current
  })
  return (
    <group ref={ref} name={`part:${id}`} {...bindPart(id)}>
      {children}
    </group>
  )
}
