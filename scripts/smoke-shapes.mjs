import { buildCageGeometry, eyeAnchor, shellGeometry, stadiumGeometry } from '../src/scene/shapes.js'
import { Vector3 } from 'three'

const cage = buildCageGeometry(0.4)
if (cage.verts !== 60) {
  console.error('verts', cage.verts)
  process.exit(1)
}
if (cage.edges !== 90) {
  console.error('edges', cage.edges)
  process.exit(1)
}
const eye = stadiumGeometry(0.36, 0.16, 0.05)
eye.computeBoundingBox()
const size = eye.boundingBox.getSize(new Vector3())
if (size.x < 0.3 || size.y < 0.14) {
  console.error('stadium', size.toArray())
  process.exit(1)
}
const anchor = new Vector3()
eyeAnchor('blob', -1, anchor)
if (!(anchor.x < 0 && anchor.z > 0.5)) {
  console.error('anchor', anchor.toArray())
  process.exit(1)
}
const shell = shellGeometry('blob', -1)
if (shell.getAttribute('position').count < 100) {
  console.error('shell too small')
  process.exit(1)
}
console.log('shapes ok', cage.verts, cage.edges, size.toArray().map((n) => n.toFixed(3)).join(','))
