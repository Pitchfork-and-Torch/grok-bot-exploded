import { useMemo } from 'react'
import { cageMat } from '../materials'
import { buildCageGeometry } from '../shapes.js'
import { PartFrame } from './PartFrame'

export function Alignment() {
  const cage = useMemo(() => buildCageGeometry(0.4), [])
  return (
    <PartFrame id="alignment">
      <mesh geometry={cage.geometry} material={cageMat} />
    </PartFrame>
  )
}
