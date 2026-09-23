import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshBasicMaterial, type Group } from 'three'
import { PORTS, SYSTEMS } from '../../data/systems'
import { motion } from '../../motion/bus'
import { partT } from '../explode'
import { portPlateMat } from '../materials'
import { portLabelTexture } from '../shapes.js'
import { PartFrame } from './PartFrame'

export function Toolbus() {
  const cables = useRef<(Group | null)[]>([])
  const labels = useMemo(
    () => PORTS.map((port) => new MeshBasicMaterial({ map: portLabelTexture(port.id), transparent: true, depthWrite: false })),
    [],
  )
  useFrame(() => {
    const t = partT(motion.explode, SYSTEMS.toolbus.order)
    const drop = 0.02 + t * 0.7
    cables.current.forEach((cable) => {
      if (!cable) return
      cable.scale.set(1, drop, 1)
      cable.position.y = -0.7 - drop * 0.5
    })
  })
  return (
    <PartFrame id="toolbus">
      <mesh position={[0, -0.78, 0]} material={portPlateMat}>
        <cylinderGeometry args={[0.22, 0.24, 0.045, 28]} />
      </mesh>
      {PORTS.map((port, i) => {
        const ang = (i / PORTS.length) * Math.PI * 2
        const x = Math.cos(ang) * 0.13
        const z = Math.sin(ang) * 0.13
        return (
          <group key={port.id}>
            <mesh position={[x, -0.8, z]} rotation={[0, -ang, 0]}>
              <cylinderGeometry args={[0.026, 0.03, 0.05, 12]} />
              <meshStandardMaterial color={port.color} metalness={0.55} roughness={0.36} />
            </mesh>
            <mesh position={[x, -0.84, z + 0.02]} material={labels[i]}>
              <planeGeometry args={[0.09, 0.024]} />
            </mesh>
            <group ref={(node) => { cables.current[i] = node }} position={[x, -1.05, z]}>
              <mesh>
                <cylinderGeometry args={[0.007, 0.007, 1, 6]} />
                <meshStandardMaterial color={port.color} metalness={0.4} roughness={0.45} />
              </mesh>
            </group>
          </group>
        )
      })}
    </PartFrame>
  )
}
