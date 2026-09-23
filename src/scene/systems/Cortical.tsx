import { diamondMat } from '../materials'
import { PartFrame } from './PartFrame'

export function Cortical() {
  return (
    <PartFrame id="cortical">
      <mesh material={diamondMat}>
        <icosahedronGeometry args={[0.24, 2]} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.2, 1]} />
        <meshBasicMaterial color="#d5e6f5" wireframe transparent opacity={0.28} />
      </mesh>
    </PartFrame>
  )
}
