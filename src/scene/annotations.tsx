import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3, type Mesh } from 'three'
import { specById } from '../data/systems'
import { motion } from '../motion/bus'
import { haloMat } from './materials'
import { useStudio } from '../store/useStudio'

const v = new Vector3()

export function CalloutBridge() {
  const { camera, size } = useThree()
  useFrame(() => {
    const el = document.getElementById('callout')
    const line = document.getElementById('leader-line')
    const kicker = document.getElementById('callout-kicker')
    const name = document.getElementById('callout-name')
    const fn = document.getElementById('callout-fn')
    if (!el) return
    const id = useStudio.getState().hovered
    const spec = specById(id)
    if (!id || !spec) {
      el.classList.remove('on')
      if (line) line.style.opacity = '0'
      return
    }
    v.set(motion.hitX, motion.hitY, motion.hitZ).project(camera)
    if (v.z > 1) {
      el.classList.remove('on')
      return
    }
    const x = (v.x * 0.5 + 0.5) * size.width
    const y = (-v.y * 0.5 + 0.5) * size.height
    el.classList.add('on')
    el.style.transform = `translate(${Math.round(x + 16)}px, ${Math.round(y - 26)}px)`
    if (kicker) kicker.textContent = spec.code
    if (name) name.textContent = 'title' in spec ? spec.title : spec.name
    if (fn) fn.textContent = spec.fn
    if (line) {
      line.setAttribute('x1', String(x))
      line.setAttribute('y1', String(y))
      line.setAttribute('x2', String(x + 16))
      line.setAttribute('y2', String(y - 10))
      line.style.opacity = '1'
    }
  })
  return null
}

export function Halo() {
  const ref = useRef<Mesh>(null)
  useFrame(({ camera }) => {
    const mesh = ref.current
    if (!mesh) return
    const id = useStudio.getState().hovered
    if (!id) {
      mesh.visible = false
      return
    }
    mesh.visible = true
    mesh.position.set(motion.hitX, motion.hitY, motion.hitZ)
    mesh.lookAt(camera.position)
  })
  return (
    <mesh ref={ref} material={haloMat} visible={false} renderOrder={6}>
      <ringGeometry args={[0.075, 0.082, 48]} />
    </mesh>
  )
}
