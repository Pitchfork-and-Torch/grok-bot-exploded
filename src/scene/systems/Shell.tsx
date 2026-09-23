import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import { SHELL_SPLIT } from '../../data/systems'
import { motion } from '../../motion/bus'
import { partT } from '../explode'
import { latchMat, shellInnerMat, shellMat } from '../materials'
import { shellGeometry } from '../shapes.js'
import { useStudio } from '../../store/useStudio'
import { bindPart } from './PartFrame'

export function Shell() {
  const cut = useStudio((s) => s.cut)
  const left = useRef<Group>(null)
  const right = useRef<Group>(null)
  const latch = useRef<Group>(null)
  const outerL = useMemo(() => shellGeometry(cut, -1), [cut])
  const outerR = useMemo(() => shellGeometry(cut, 1), [cut])
  const outerFull = useMemo(() => shellGeometry(cut, 0), [cut])
  const full = useRef<Group>(null)
  useFrame(() => {
    const t = partT(motion.explode, 0)
    const open = t > 0.04
    if (full.current) full.current.visible = !open
    if (left.current) left.current.visible = open
    if (right.current) right.current.visible = open
    if (latch.current) latch.current.visible = open
    left.current?.position.set(SHELL_SPLIT.left[0] * t, SHELL_SPLIT.left[1] * t, SHELL_SPLIT.left[2] * t)
    right.current?.position.set(SHELL_SPLIT.right[0] * t, SHELL_SPLIT.right[1] * t, SHELL_SPLIT.right[2] * t)
    latch.current?.position.set(SHELL_SPLIT.latch[0] * t, SHELL_SPLIT.latch[1] * t, SHELL_SPLIT.latch[2] * t)
  })
  const bind = bindPart('shell')
  return (
    <group name="part:shell">
      <group ref={full}>
        <mesh geometry={outerFull} material={shellMat} {...bind} />
        <mesh geometry={outerFull} material={shellInnerMat} scale={0.975} />
      </group>
      <group ref={left}>
        <mesh geometry={outerL} material={shellMat} {...bind} />
        <mesh geometry={outerL} material={shellInnerMat} scale={0.975} />
      </group>
      <group ref={right}>
        <mesh geometry={outerR} material={shellMat} {...bind} />
        <mesh geometry={outerR} material={shellInnerMat} scale={0.975} />
      </group>
      <group ref={latch}>
        <mesh material={latchMat} {...bind}>
          <torusGeometry args={[1.012, 0.018, 10, 64]} />
        </mesh>
      </group>
    </group>
  )
}
