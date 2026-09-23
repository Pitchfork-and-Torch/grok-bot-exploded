import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Quaternion, Vector3, type Group } from 'three'
import { SYSTEMS } from '../../data/systems'
import { motion } from '../../motion/bus'
import { partT } from '../explode'
import { helixMat } from '../materials'
import { useStudio } from '../../store/useStudio'
import { PartFrame } from './PartFrame'

const AXES: [number, number, number][] = [
  [0.02, 1, 0],
  [0.22, 0.96, 0.12],
  [-0.18, 0.97, 0.16],
  [0.1, 0.9, -0.28],
  [-0.26, 0.92, -0.12],
  [0.16, 0.98, 0.22],
]

const RADII = [0.3, 0.35, 0.4, 0.46, 0.52, 0.58]
const up = new Vector3(0, 1, 0)
const axis = new Vector3()
const q = new Quaternion()

export function Helix() {
  const rings = useRef<(Group | null)[]>([])
  const tick = useRef(0)
  const acc = useRef(0)
  useFrame((_, dt) => {
    const reduced = useStudio.getState().reduced
    if (!reduced) {
      acc.current += dt
      if (acc.current > 4.6) {
        acc.current = 0
        tick.current += (2 * Math.PI) / 180
      }
    }
    const t = partT(motion.explode, SYSTEMS.helix.order)
    rings.current.forEach((ring, i) => {
      if (!ring) return
      const spread = t * (0.08 + i * 0.038)
      const a = AXES[i]
      ring.position.set(a[0] * spread, a[1] * spread, a[2] * spread)
      axis.set(a[0], a[1], a[2]).normalize()
      q.setFromUnitVectors(up, axis)
      ring.quaternion.copy(q)
      ring.rotateZ(tick.current * (i % 2 === 0 ? 1 : -1))
    })
  })
  return (
    <PartFrame id="helix">
      {RADII.map((radius, i) => (
        <group key={radius} ref={(node) => { rings.current[i] = node }}>
          <mesh material={helixMat}>
            <torusGeometry args={[radius, 0.008, 8, 48]} />
          </mesh>
        </group>
      ))}
    </PartFrame>
  )
}
