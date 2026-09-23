import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer, OrbitControls, PerformanceMonitor } from '@react-three/drei'
import { ACESFilmicToneMapping, CanvasTexture, Vector3 } from 'three'
import { SYSTEMS, specById, type SysId } from '../data/systems'
import { motion } from '../motion/bus'
import { partT } from './explode'
import { useStudio } from '../store/useStudio'
import { CalloutBridge, Halo } from './annotations'
import { OrbAssembly } from './OrbAssembly'

const HighPost = lazy(() => import('./HighPost'))

const lookTarget = new Vector3()
const goal = new Vector3()

function useCoarse() {
  const [coarse, setCoarse] = useState(() => window.matchMedia('(pointer: coarse)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)')
    const onChange = () => setCoarse(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return coarse
}

function CameraRig({ coarse }: { coarse: boolean }) {
  const { camera, size } = useThree()
  const look = useRef(new Vector3(0, 0.02, 0))
  const isolated = useStudio((s) => s.isolated)
  useFrame((_, dt) => {
    if (coarse && !isolated) return
    const st = useStudio.getState()
    const k = st.reduced ? 1 : 1 - Math.pow(0.045, dt)
    const z = size.width < 800 ? 7.15 : 5.35
    goal.set(0.16, 0.08, z)
    lookTarget.set(0, 0.02, 0)
    if (st.isolated === 'towel') {
      lookTarget.set(0, -0.98, 0)
      goal.set(1.15, -0.35, 2.4)
    } else if (st.isolated && st.isolated in SYSTEMS) {
      const sys = SYSTEMS[st.isolated as SysId]
      const t = partT(motion.explode, sys.order)
      const spec = specById(st.isolated)
      const bias = spec && st.isolated === 'flux' ? [-0.34, -0.24, 0.08] : st.isolated === 'toolbus' ? [0, -0.9, 0] : st.isolated === 'ocular' ? [0, 0.16, 0.86] : st.isolated === 'affect' ? [0, 0.14, 0.38] : st.isolated === 'starlink' ? [0, 0.72, 0] : [0, 0, 0]
      lookTarget.set(bias[0] + sys.explode[0] * t, bias[1] + sys.explode[1] * t, bias[2] + sys.explode[2] * t)
      goal.set(lookTarget.x + 1.2, lookTarget.y + 0.42, lookTarget.z + 2.45)
    }
    camera.position.lerp(goal, k)
    look.current.lerp(lookTarget, k)
    camera.lookAt(look.current)
  })
  return coarse ? (
    <OrbitControls
      enabled={!isolated}
      enablePan={false}
      enableDamping
      dampingFactor={0.08}
      minDistance={2.5}
      maxDistance={9}
      rotateSpeed={0.7}
    />
  ) : null
}

function Shadow() {
  const map = useMemo(() => new CanvasTexture(softShadow()), [])
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.08, 0]} raycast={() => null}>
      <planeGeometry args={[3.4, 1.7]} />
      <meshBasicMaterial map={map} transparent depthWrite={false} />
    </mesh>
  )
}

function softShadow() {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 128
  const g = canvas.getContext('2d')
  if (!g) return canvas
  const grad = g.createRadialGradient(128, 64, 8, 128, 64, 120)
  grad.addColorStop(0, 'rgba(0,0,0,0.45)')
  grad.addColorStop(1, 'rgba(0,0,0,0)')
  g.fillStyle = grad
  g.fillRect(0, 0, 256, 128)
  return canvas
}

export default function OrbStudio() {
  const post = useStudio((s) => s.post)
  const tier = useStudio((s) => s.tier)
  const coarse = useCoarse()
  return (
    <Canvas
      className="stage-canvas"
      dpr={tier === 'high' ? [1, 1.5] : [1, 1.25]}
      camera={{ position: [0.16, 0.08, 5.35], fov: 32, near: 0.08, far: 40 }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      onCreated={({ gl, scene }) => {
        gl.localClippingEnabled = true
        gl.toneMapping = ACESFilmicToneMapping
        gl.toneMappingExposure = 0.92
        scene.environmentIntensity = 0.42
        document.getElementById('lcp-poster')?.classList.add('gone')
      }}
    >
      <color attach="background" args={['#050505']} />
      <Suspense fallback={null}>
        <Environment resolution={128} environmentIntensity={0.38}>
          <Lightformer form="rect" intensity={1.15} color="#fff6ec" position={[-3.2, 4.2, 2.4]} scale={[2.2, 1.4, 1]} />
          <Lightformer form="rect" intensity={0.18} color="#c8d4e8" position={[2.4, 0.4, -2.2]} scale={[1.6, 1.2, 1]} />
        </Environment>
      </Suspense>
      <ambientLight intensity={0.06} />
      <directionalLight position={[-3.4, 6.2, 2.6]} intensity={1.35} color="#fff8f0" />
      <OrbAssembly />
      <Shadow />
      <Halo />
      <CalloutBridge />
      <CameraRig coarse={coarse} />
      {post ? (
        <Suspense fallback={null}>
          <HighPost />
        </Suspense>
      ) : null}
      <PerformanceMonitor bounds={() => [28, 58]} flipflops={2} onDecline={() => useStudio.getState().setPost(false)} />
    </Canvas>
  )
}
