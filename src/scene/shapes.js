import * as THREE from 'three'

export const CUTS = ['blob', 'pebble', 'squircle', 'tablet', 'wedge', 'hex', 'cloud', 'teardrop']

export function deformInto(src, cut, target) {
  const len = Math.hypot(src.x, src.y, src.z) || 1
  const nx = src.x / len
  const ny = src.y / len
  const nz = src.z / len
  let x = nx
  let y = ny
  let z = nz
  let m = 1
  switch (cut) {
    case 'blob':
      x *= 0.985
      y *= 1.06
      z *= 0.985
      break
    case 'pebble':
      m = 0.94 + 0.03 * Math.sin(2.2 * nx + 0.4) * Math.cos(1.7 * ny)
      x *= m
      y *= m * 1.06
      z *= m
      break
    case 'squircle': {
      const e = 0.62
      const ax = Math.abs(nx) ** (2 / e)
      const ay = Math.abs(ny) ** (2 / e)
      const az = Math.abs(nz) ** (2 / e)
      const rr = (ax + ay + az) ** (e / 2) || 1
      const s = 0.96 / rr
      x = nx * s
      y = ny * s
      z = nz * s
      break
    }
    case 'tablet':
      x *= 1.1
      y *= 0.62
      z *= 1.02
      break
    case 'wedge': {
      const f = 0.78 + 0.36 * (nx * 0.5 + 0.5)
      x = nx * f
      y = ny * f * 0.96
      z = nz * f
      break
    }
    case 'hex': {
      const theta = Math.atan2(nz, nx)
      m = 0.96 + 0.05 * Math.cos(6 * theta)
      x = nx * m
      y = ny * 0.94
      z = nz * m
      break
    }
    case 'cloud':
      m = (1 + 0.04 * Math.sin(3.1 * nx) * Math.cos(2.4 * ny) * Math.sin(2.7 * nz + 0.6)) * 0.98
      x = nx * m
      y = ny * m * 1.02
      z = nz * m
      break
    case 'teardrop': {
      const lift = ny * 0.5 + 0.5
      m = 0.72 + 0.42 * Math.sin(lift * Math.PI)
      x = nx * m
      y = ny * (0.85 + 0.25 * lift) + 0.06
      z = nz * m
      break
    }
    default:
      break
  }
  target.set(x, y, z)
}

const shellCache = new Map()

export function shellGeometry(cut, side) {
  const key = `${cut}:${side}`
  const hit = shellCache.get(key)
  if (hit) return hit
  const src = new THREE.SphereGeometry(1, 80, 56)
  const pos = src.getAttribute('position')
  const index = src.getIndex()
  const remap = new Map()
  const nextPos = []
  const kept = []
  const tmp = new THREE.Vector3()
  const a = new THREE.Vector3()
  const b = new THREE.Vector3()
  const c = new THREE.Vector3()
  const use = (i) => {
    const found = remap.get(i)
    if (found !== undefined) return found
    tmp.fromBufferAttribute(pos, i)
    deformInto(tmp, cut, tmp)
    const n = nextPos.length / 3
    remap.set(i, n)
    nextPos.push(tmp.x, tmp.y, tmp.z)
    return n
  }
  for (let t = 0; t < index.count; t += 3) {
    const i0 = index.getX(t)
    const i1 = index.getX(t + 1)
    const i2 = index.getX(t + 2)
    a.fromBufferAttribute(pos, i0)
    b.fromBufferAttribute(pos, i1)
    c.fromBufferAttribute(pos, i2)
    const cx = (a.x + b.x + c.x) / 3
    if (side < 0 && cx > 0.02) continue
    if (side > 0 && cx < -0.02) continue
    kept.push(use(i0), use(i1), use(i2))
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(nextPos, 3))
  geo.setIndex(kept)
  geo.computeVertexNormals()
  src.dispose()
  shellCache.set(key, geo)
  return geo
}

export function eyeAnchor(cut, side, target) {
  target.set(side * 0.28, 0.16, 1).normalize()
  deformInto(target, cut, target)
}

export function stadiumGeometry(width, height, depth) {
  const r = height / 2
  const straight = Math.max(0.0001, (width - height) / 2)
  const shape = new THREE.Shape()
  shape.moveTo(-straight, r)
  shape.lineTo(straight, r)
  shape.absarc(straight, 0, r, Math.PI / 2, -Math.PI / 2, true)
  shape.lineTo(-straight, -r)
  shape.absarc(-straight, 0, r, -Math.PI / 2, -Math.PI * 1.5, true)
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: Math.min(0.008, depth * 0.35),
    bevelSize: Math.min(0.006, r * 0.12),
    bevelSegments: 2,
    curveSegments: 12,
  })
  geo.translate(0, 0, -depth / 2)
  return geo
}

export function facePlateGeometry() {
  const src = new THREE.SphereGeometry(0.64, 40, 28)
  const pos = src.getAttribute('position')
  const index = src.getIndex()
  const remap = new Map()
  const nextPos = []
  const kept = []
  const use = (i) => {
    const found = remap.get(i)
    if (found !== undefined) return found
    const n = nextPos.length / 3
    remap.set(i, n)
    nextPos.push(pos.getX(i), pos.getY(i), pos.getZ(i))
    return n
  }
  const a = new THREE.Vector3()
  const b = new THREE.Vector3()
  const c = new THREE.Vector3()
  for (let t = 0; t < index.count; t += 3) {
    const i0 = index.getX(t)
    const i1 = index.getX(t + 1)
    const i2 = index.getX(t + 2)
    a.fromBufferAttribute(pos, i0)
    b.fromBufferAttribute(pos, i1)
    c.fromBufferAttribute(pos, i2)
    const cz = (a.z + b.z + c.z) / 3
    if (cz < 0.18) continue
    kept.push(use(i0), use(i1), use(i2))
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(nextPos, 3))
  geo.setIndex(kept)
  geo.computeVertexNormals()
  src.dispose()
  return geo
}

function evenPerms(x, y, z) {
  return [
    [x, y, z],
    [y, z, x],
    [z, x, y],
  ]
}

export function buildCageGeometry(radius) {
  const phi = (1 + Math.sqrt(5)) / 2
  const families = [
    [0, 1, 3 * phi],
    [1, 2 + phi, 2 * phi],
    [2, 1 + 2 * phi, phi],
  ]
  const raw = []
  for (const [a, b, c] of families) {
    const xs = a === 0 ? [0] : [-Math.abs(a), Math.abs(a)]
    const ys = b === 0 ? [0] : [-Math.abs(b), Math.abs(b)]
    const zs = c === 0 ? [0] : [-Math.abs(c), Math.abs(c)]
    for (const x of xs) {
      for (const y of ys) {
        for (const z of zs) {
          for (const p of evenPerms(x, y, z)) raw.push(p)
        }
      }
    }
  }
  const verts = []
  const seen = new Set()
  for (const p of raw) {
    const key = p.map((n) => n.toFixed(4)).join(',')
    if (seen.has(key)) continue
    seen.add(key)
    verts.push(new THREE.Vector3(p[0], p[1], p[2]))
  }
  let maxR = 0
  for (const v of verts) maxR = Math.max(maxR, v.length())
  for (const v of verts) v.multiplyScalar(radius / maxR)

  let min = Infinity
  for (let i = 0; i < verts.length; i++) {
    for (let j = i + 1; j < verts.length; j++) {
      const d = verts[i].distanceTo(verts[j])
      if (d > 1e-4 && d < min) min = d
    }
  }
  const edges = []
  for (let i = 0; i < verts.length; i++) {
    for (let j = i + 1; j < verts.length; j++) {
      const d = verts[i].distanceTo(verts[j])
      if (Math.abs(d - min) < min * 0.08) edges.push([i, j])
    }
  }

  const positions = []
  const normals = []
  const indices = []
  let offset = 0
  const tubeR = radius * 0.018
  for (const [i, j] of edges) {
    const curve = new THREE.LineCurve3(verts[i], verts[j])
    const tube = new THREE.TubeGeometry(curve, 2, tubeR, 5, false)
    const p = tube.getAttribute('position')
    const n = tube.getAttribute('normal')
    const idx = tube.getIndex()
    for (let k = 0; k < p.count; k++) {
      positions.push(p.getX(k), p.getY(k), p.getZ(k))
      normals.push(n.getX(k), n.getY(k), n.getZ(k))
    }
    for (let k = 0; k < idx.count; k++) indices.push(idx.getX(k) + offset)
    offset += p.count
    tube.dispose()
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))
  geometry.setIndex(indices)
  return { geometry, verts: verts.length, edges: edges.length }
}

export function braidGeometry(ringRadius, wrapRadius, turns, tube) {
  const pts = []
  const n = 140
  for (let i = 0; i <= n; i++) {
    const t = (i / n) * Math.PI * 2
    const w = t * turns
    const rr = ringRadius + Math.cos(w) * wrapRadius
    pts.push(new THREE.Vector3(Math.cos(t) * rr, Math.sin(w) * wrapRadius, Math.sin(t) * rr))
  }
  const curve = new THREE.CatmullRomCurve3(pts, true)
  return new THREE.TubeGeometry(curve, 120, tube, 6, true)
}

export function makePulseTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 8
  const g = canvas.getContext('2d')
  g.fillStyle = '#14181d'
  g.fillRect(0, 0, 128, 8)
  g.fillStyle = '#e7eef8'
  g.fillRect(6, 1, 14, 6)
  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = THREE.RepeatWrapping
  tex.repeat.set(5, 1)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

export function portLabelTexture(text) {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 64
  const g = canvas.getContext('2d')
  g.clearRect(0, 0, 256, 64)
  g.fillStyle = '#d7dbe2'
  g.font = '28px "IBM Plex Mono", ui-monospace, monospace'
  g.textAlign = 'center'
  g.textBaseline = 'middle'
  g.fillText(text, 128, 34)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}
