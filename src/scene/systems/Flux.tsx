import { useMemo } from 'react'
import { braidMat, fluxMat } from '../materials'
import { braidGeometry } from '../shapes.js'
import { PartFrame } from './PartFrame'

export function Flux() {
  const braid = useMemo(() => braidGeometry(0.14, 0.055, 3, 0.007), [])
  return (
    <PartFrame id="flux">
      <group position={[-0.34, -0.24, 0.08]}>
        <mesh material={fluxMat} rotation={[Math.PI / 2.6, 0.4, 0.2]}>
          <torusGeometry args={[0.14, 0.036, 16, 42]} />
        </mesh>
        <mesh geometry={braid} material={braidMat} rotation={[Math.PI / 2.6, 0.4, 0.2]} />
      </group>
    </PartFrame>
  )
}
