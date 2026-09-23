import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'
import { SYSTEMS } from '../../data/systems'
import { motion } from '../../motion/bus'
import { partT } from '../explode'
import { affectMat } from '../materials'
import { PartFrame } from './PartFrame'

export function Affect() {
  const a = useRef<Mesh>(null)
  const b = useRef<Mesh>(null)
  useFrame(() => {
    const t = partT(motion.explode, SYSTEMS.affect.order)
    if (a.current) a.current.position.set(0, 0.14, 0.3 - t * 0.18)
    if (b.current) b.current.position.set(0, 0.14, 0.46 + t * 0.22)
  })
  return (
    <PartFrame id="affect">
      <mesh ref={a} material={affectMat} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.18, 0.007, 8, 36]} />
      </mesh>
      <mesh ref={b} material={affectMat} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.26, 0.006, 8, 36]} />
      </mesh>
    </PartFrame>
  )
}
