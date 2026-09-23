import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { BufferGeometry, Mesh, QuadraticBezierCurve3, SphereGeometry, TubeGeometry, Vector3 } from 'three'
import { SEGMENTS, SHELL_SPLIT, SYSTEMS, type SysId, type Vec3 } from '../../data/systems'
import { motion } from '../../motion/bus'
import { decouple, partT } from '../explode'
import { busMat, veinCopper, veinQuartz } from '../materials'
import { bindPart } from './PartFrame'

const restV = new Vector3()
const offV = new Vector3()
const followV = new Vector3()
const parkV = new Vector3()
const midV = new Vector3()

function endpoint(at: Vec3, id: SysId, explode: number, target: Vector3, mode: 'follow' | 'park') {
  restV.set(at[0], at[1], at[2])
  if (id === 'shell') {
    const t = partT(explode, 0)
    const split = at[0] >= 0 ? SHELL_SPLIT.right : SHELL_SPLIT.left
    offV.set(split[0] * t, split[1] * t, split[2] * t)
  } else {
    const sys = SYSTEMS[id]
    const t = partT(explode, sys.order)
    offV.set(sys.explode[0] * t, sys.explode[1] * t, sys.explode[2] * t)
    if (id === 'helix') {
      const len = Math.hypot(at[0], at[1], at[2]) || 1
      offV.x += (at[0] / len) * 0.16 * t
      offV.y += (at[1] / len) * 0.16 * t
      offV.z += (at[2] / len) * 0.16 * t
    }
    if (id === 'ocular') offV.z += 0.28 * t
  }
  followV.copy(restV).add(offV)
  parkV.copy(restV).addScaledVector(offV, 0.42)
  target.copy(mode === 'follow' ? followV : parkV)
}

export function Piping() {
  const tubes = useMemo(
    () =>
      SEGMENTS.map((seg) => {
        const mesh = new Mesh<BufferGeometry>(
          new SphereGeometry(0.01, 4, 4),
          seg.kind === 'vein' ? (seg.id.charCodeAt(3) % 2 === 0 ? veinCopper : veinQuartz) : busMat,
        )
        mesh.frustumCulled = false
        return mesh
      }),
    [],
  )
  const unions = useRef<(Mesh | null)[]>([])
  const ends = useMemo(
    () => SEGMENTS.map(() => ({ a: new Vector3(), b: new Vector3(), fa: new Vector3(), fb: new Vector3() })),
    [],
  )
  const last = useRef(-2)
  useFrame(() => {
    const explode = motion.explode
    const d = decouple(explode)
    const q = Math.round(explode * 64)
    SEGMENTS.forEach((seg, i) => {
      endpoint(seg.fromAt, seg.from, explode, ends[i].fa, 'follow')
      endpoint(seg.toAt, seg.to, explode, ends[i].fb, 'follow')
      endpoint(seg.fromAt, seg.from, explode, ends[i].a, 'park')
      endpoint(seg.toAt, seg.to, explode, ends[i].b, 'park')
      ends[i].a.lerpVectors(ends[i].fa, ends[i].a, d)
      ends[i].b.lerpVectors(ends[i].fb, ends[i].b, d)
      const mark = unions.current[i]
      if (mark) {
        mark.visible = d > 0.35
        mark.position.copy(ends[i].fb)
      }
    })
    if (q === last.current) return
    last.current = q
    SEGMENTS.forEach((seg, i) => {
      const mesh = tubes[i]
      const a = ends[i].a
      const b = ends[i].b
      midV.lerpVectors(a, b, 0.5)
      const len = a.distanceTo(b)
      midV.y -= 0.04 + len * 0.045
      midV.x += (b.z - a.z) * 0.04
      const curve = new QuadraticBezierCurve3(a.clone(), midV.clone(), b.clone())
      const geo = new TubeGeometry(curve, seg.kind === 'bus' ? 20 : 26, seg.kind === 'bus' ? 0.016 : 0.008, 5, false)
      mesh.geometry.dispose()
      mesh.geometry = geo
    })
  })
  return (
    <group name="part:piping">
      {SEGMENTS.map((seg, i) => (
        <group key={seg.id}>
          <primitive object={tubes[i]} {...bindPart(seg.kind === 'vein' ? 'veins' : 'bus')} />
          <mesh ref={(node) => { unions.current[i] = node }} visible={false}>
            <torusGeometry args={[0.028, 0.0035, 6, 14]} />
            <meshBasicMaterial color={seg.kind === 'vein' ? '#e6b089' : '#d5deea'} />
          </mesh>
        </group>
      ))}
    </group>
  )
}
