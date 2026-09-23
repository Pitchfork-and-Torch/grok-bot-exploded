import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import { motion } from '../../motion/bus'
import { towelMat } from '../materials'
import { bindPart } from './PartFrame'

export function Towel() {
  const ref = useRef<Group>(null)
  useFrame(() => {
    const g = ref.current
    if (!g) return
    const t = Math.min(1, Math.max(0, (motion.explode - 0.85) / 0.12))
    const show = motion.explode >= 0.85
    g.visible = show
    g.scale.setScalar(show ? 0.85 + t * 0.15 : 0.001)
    g.position.set(0, -1.02, 0.02)
  })
  return (
    <group ref={ref} name="part:towel" visible={false} {...bindPart('towel')}>
      <mesh material={towelMat} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.055, 0.01, 8, 18]} />
      </mesh>
      <mesh material={towelMat} position={[0.07, -0.01, 0]}>
        <boxGeometry args={[0.04, 0.012, 0.02]} />
      </mesh>
    </group>
  )
}
