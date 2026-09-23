import { useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { CircleGeometry, Color, Object3D, type InstancedMesh } from 'three'
import { capMat, goldMat } from '../materials'
import { PartFrame } from './PartFrame'

const COUNT = 64
const dummy = new Object3D()
const gold = new Color('#c6a15b')
const hot = new Color('#fff4d4')

export function Starlink() {
  const mesh = useRef<InstancedMesh>(null)
  const flash = useRef(0)
  const geo = useMemo(() => new CircleGeometry(0.018, 8), [])
  useLayoutEffect(() => {
    const inst = mesh.current
    if (!inst) return
    for (let i = 0; i < COUNT; i++) {
      const ring = Math.floor(i / 8)
      const ang = ((i % 8) / 8) * Math.PI * 2 + ring * 0.18
      const polar = 0.16 + ring * 0.055
      const y = Math.cos(polar) * 0.9
      const r = Math.sin(polar) * 0.9
      dummy.position.set(Math.cos(ang) * r, y, Math.sin(ang) * r)
      dummy.lookAt(0, 0, 0)
      dummy.scale.setScalar(0.9)
      dummy.updateMatrix()
      inst.setMatrixAt(i, dummy.matrix)
      inst.setColorAt(i, gold)
    }
    inst.instanceMatrix.needsUpdate = true
    if (inst.instanceColor) inst.instanceColor.needsUpdate = true
  }, [])
  useFrame(({ clock }) => {
    const inst = mesh.current
    if (!inst?.instanceColor) return
    const next = Math.floor(clock.elapsedTime * 2.5) % COUNT
    if (next === flash.current) return
    inst.setColorAt(flash.current, gold)
    inst.setColorAt(next, hot)
    inst.instanceColor.needsUpdate = true
    flash.current = next
  })
  return (
    <PartFrame id="starlink">
      <mesh material={capMat}>
        <sphereGeometry args={[0.9, 28, 12, 0, Math.PI * 2, 0, 0.58]} />
      </mesh>
      <instancedMesh ref={mesh} args={[geo, goldMat, COUNT]} />
    </PartFrame>
  )
}
