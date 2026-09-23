import { attitudeMat } from '../materials'
import { PartFrame } from './PartFrame'

export function Attitude() {
  return (
    <PartFrame id="attitude">
      <mesh material={attitudeMat}>
        <torusGeometry args={[0.9, 0.01, 8, 72]} />
      </mesh>
      {Array.from({ length: 8 }, (_, i) => {
        const ang = (i / 8) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(ang) * 0.9, 0, Math.sin(ang) * 0.9]} material={attitudeMat}>
            <sphereGeometry args={[0.02, 10, 10]} />
          </mesh>
        )
      })}
    </PartFrame>
  )
}
