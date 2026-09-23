import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Matrix4, Quaternion, Vector3, type Group, type Mesh } from 'three'
import { audio } from '../../audio/engine'
import { SYSTEMS } from '../../data/systems'
import { motion } from '../../motion/bus'
import { partT } from '../explode'
import { eyeMat, plateMat, setEyeHoles, wellMat } from '../materials'
import { eyeAnchor, facePlateGeometry, stadiumGeometry } from '../shapes.js'
import { useStudio } from '../../store/useStudio'
import { bindPart } from './PartFrame'

const up = new Vector3(0, 1, 0)
const xAxis = new Vector3()
const yAxis = new Vector3()
const zAxis = new Vector3()
const basis = new Matrix4()
const quat = new Quaternion()
const leftA = new Vector3()
const rightA = new Vector3()
const holeL = new Vector3()
const holeR = new Vector3()
const normal = new Vector3()

function orient(point: Vector3, q: Quaternion) {
  zAxis.copy(point).normalize()
  xAxis.crossVectors(up, zAxis)
  if (xAxis.lengthSq() < 1e-8) xAxis.set(1, 0, 0)
  xAxis.normalize()
  yAxis.crossVectors(zAxis, xAxis).normalize()
  basis.makeBasis(xAxis, yAxis, zAxis)
  q.setFromRotationMatrix(basis)
}

export function Ocular() {
  const cut = useStudio((s) => s.cut)
  const left = useRef<Group>(null)
  const right = useRef<Group>(null)
  const plateRef = useRef<Mesh>(null)
  const plate = useMemo(() => facePlateGeometry(), [])
  const eyeGeo = useMemo(() => stadiumGeometry(0.36, 0.16, 0.05), [])
  const wellGeo = useMemo(() => stadiumGeometry(0.42, 0.2, 0.03), [])
  const blink = useRef({ phase: 'wait', left: 7, scale: 1, double: false })
  const think = useRef(0)
  const wasCore = useRef(false)
  const expr = useRef(1)

  useFrame((_, dt) => {
    const st = useStudio.getState()
    const reduced = st.reduced
    eyeAnchor(cut, -1, leftA)
    eyeAnchor(cut, 1, rightA)
    const shellOpen = partT(motion.explode, 0)
    const gaze = shellOpen < 0.22 ? 1 : 0
    holeL.copy(leftA)
    holeR.copy(rightA)
    holeL.x += motion.gazeX * gaze
    holeL.y += motion.gazeY * gaze
    holeR.x += motion.gazeX * gaze
    holeR.y += motion.gazeY * gaze
    setEyeHoles(holeL, holeR)

    const b = blink.current
    if (motion.forceBlink && !reduced) {
      motion.forceBlink = false
      b.phase = 'close'
      b.left = 0.08
      b.double = true
    }
    if (!reduced) {
      b.left -= dt
      if (b.phase === 'wait' && b.left <= 0) {
        b.phase = 'close'
        b.left = 0.08
        b.double = Math.random() < 0.25
        audio.softBlink()
      } else if (b.phase === 'close') {
        b.scale = Math.max(0.08, b.left / 0.08)
        if (b.left <= 0) {
          b.phase = 'hold'
          b.left = 0.04
          b.scale = 0.08
        }
      } else if (b.phase === 'hold') {
        b.scale = 0.08
        if (b.left <= 0) {
          b.phase = 'open'
          b.left = 0.09
        }
      } else if (b.phase === 'open') {
        const u = 1 - Math.max(0, b.left) / 0.09
        b.scale = 0.08 + u * 0.92
        if (b.left <= 0) {
          b.scale = 1
          if (b.double) {
            b.double = false
            b.phase = 'close'
            b.left = 0.08
          } else {
            b.phase = 'wait'
            b.left = 6 + Math.random() * 5
          }
        }
      }
    } else {
      b.scale = 1
    }

    const core = st.isolated === 'cortical'
    if (core && !wasCore.current) think.current = 0.4
    wasCore.current = core
    if (think.current > 0) think.current -= dt
    const affect = st.hovered === 'affect' || st.isolated === 'affect'
    const exprTarget = affect ? 0.72 : 1
    expr.current += (exprTarget - expr.current) * Math.min(1, dt * 8)
    const narrow = st.hovered || st.isolated ? 0.92 : 1
    const t = partT(motion.explode, SYSTEMS.ocular.order)
    const place = (anchor: Vector3, group: Group | null, thinkScale: number) => {
      if (!group) return
      normal.copy(anchor).normalize()
      group.position.copy(anchor).addScaledVector(normal, -0.01 + t * 0.38)
      group.position.x += motion.gazeX
      group.position.y += motion.gazeY
      orient(anchor, quat)
      group.quaternion.copy(quat)
      group.scale.set(narrow, b.scale * expr.current * thinkScale, 1)
    }
    place(leftA, left.current, think.current > 0 ? 0.84 : 1)
    place(rightA, right.current, 1)
    if (plateRef.current) plateRef.current.position.z = t * 0.12
  })

  const bind = bindPart('ocular')
  return (
    <group name="part:ocular">
      <mesh ref={plateRef} geometry={plate} material={plateMat} {...bind} />
      <group ref={left}>
        <mesh geometry={wellGeo} material={wellMat} position={[0, 0, -0.02]} {...bind} />
        <mesh geometry={eyeGeo} material={eyeMat} {...bind} />
      </group>
      <group ref={right}>
        <mesh geometry={wellGeo} material={wellMat} position={[0, 0, -0.02]} {...bind} />
        <mesh geometry={eyeGeo} material={eyeMat} {...bind} />
      </group>
    </group>
  )
}
