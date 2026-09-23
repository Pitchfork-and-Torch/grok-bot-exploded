import * as THREE from 'three'
import { PALETTES, type DyeId } from '../data/palettes'
import { makePulseTexture } from './shapes.js'

export interface RegEntry {
  id: string
  mat: THREE.Material
  uniform?: { value: number }
}

export const registry: RegEntry[] = []
export const clipPlane = new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0)

function track<T extends THREE.Material>(id: string, mat: T, uniform?: { value: number }) {
  mat.clippingPlanes = []
  registry.push({ id, mat, uniform })
  return mat
}

export const shellMat = track(
  'shell',
  new THREE.MeshPhysicalMaterial({
    color: '#f3eee6',
    roughness: 0.38,
    metalness: 0.02,
    clearcoat: 1,
    clearcoatRoughness: 0.32,
    sheen: 0.35,
    sheenColor: new THREE.Color('#fff8ee'),
    envMapIntensity: 0.85,
  }),
)

export const shellInnerMat = track(
  'shell',
  new THREE.MeshStandardMaterial({
    color: '#161311',
    roughness: 1,
    metalness: 0,
    side: THREE.BackSide,
  }),
)

export const eyeMat = track(
  'ocular',
  new THREE.MeshPhysicalMaterial({
    color: '#141414',
    roughness: 0.18,
    metalness: 0.08,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
  }),
)

export const wellMat = track(
  'ocular',
  new THREE.MeshStandardMaterial({
    color: '#070707',
    roughness: 0.85,
    metalness: 0.1,
  }),
)

export const plateMat = track(
  'ocular',
  new THREE.MeshStandardMaterial({
    color: '#1a1714',
    roughness: 1,
    metalness: 0,
    side: THREE.DoubleSide,
  }),
)

export const latchMat = track(
  'shell',
  new THREE.MeshStandardMaterial({
    color: '#c8c2b8',
    roughness: 0.35,
    metalness: 0.85,
  }),
)

const diamondOpacity = { value: 1 }
export const diamondMat = track(
  'cortical',
  new THREE.ShaderMaterial({
    transparent: true,
    clipping: true,
    toneMapped: false,
    uniforms: {
      uTime: { value: 0 },
      uOpacity: diamondOpacity,
    },
    vertexShader: `
      varying vec3 vN;
      varying vec3 vP;
      void main() {
        vN = normalize(normalMatrix * normal);
        vP = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uOpacity;
      varying vec3 vN;
      varying vec3 vP;
      void main() {
        float fres = pow(1.0 - abs(dot(normalize(vN), vec3(0.0, 0.0, 1.0))), 1.6);
        float band = sin(vP.y * 26.0 + uTime * 0.55) * 0.5 + 0.5;
        float band2 = sin(vP.x * 14.0 - uTime * 0.28 + vP.z * 8.0) * 0.5 + 0.5;
        vec3 col = mix(vec3(0.12, 0.18, 0.24), vec3(0.9, 0.95, 1.0), band * 0.8);
        col += vec3(0.62, 0.74, 0.9) * fres;
        col += vec3(1.0, 0.84, 0.62) * band2 * band * 0.28;
        gl_FragColor = vec4(col, uOpacity);
      }
    `,
  }),
  diamondOpacity,
)

export const cageMat = track(
  'alignment',
  new THREE.MeshStandardMaterial({
    color: '#d5d8df',
    roughness: 0.25,
    metalness: 0.9,
    emissive: new THREE.Color('#9aa3b2'),
    emissiveIntensity: 0.15,
  }),
)

export const helixMat = track(
  'helix',
  new THREE.MeshStandardMaterial({
    color: '#dfe7ef',
    roughness: 0.12,
    metalness: 0.55,
    emissive: new THREE.Color('#c5d4e6'),
    emissiveIntensity: 0.12,
  }),
)

export const veinCopper = track(
  'veins',
  new THREE.MeshStandardMaterial({
    color: '#b87358',
    roughness: 0.38,
    metalness: 0.72,
  }),
)

export const veinQuartz = track(
  'veins',
  new THREE.MeshStandardMaterial({
    color: '#8d97a1',
    roughness: 0.18,
    metalness: 0.35,
    transparent: true,
    opacity: 0.85,
  }),
)

export const busTex = makePulseTexture()
export const busMat = track(
  'bus',
  new THREE.MeshStandardMaterial({
    color: '#1a1e24',
    roughness: 0.4,
    metalness: 0.2,
    emissive: new THREE.Color('#c8d4e8'),
    emissiveIntensity: 0.55,
    emissiveMap: busTex,
  }),
)

export const fluxMat = track(
  'flux',
  new THREE.MeshStandardMaterial({
    color: '#6a4a32',
    roughness: 0.32,
    metalness: 0.4,
    emissive: new THREE.Color('#ffb56a'),
    emissiveIntensity: 0.65,
  }),
)

export const braidMat = track(
  'flux',
  new THREE.MeshStandardMaterial({
    color: '#c7b299',
    roughness: 0.45,
    metalness: 0.7,
  }),
)

export const affectMat = track(
  'affect',
  new THREE.MeshStandardMaterial({
    color: '#d9dde4',
    roughness: 0.22,
    metalness: 0.8,
    emissive: new THREE.Color('#ffb56a'),
    emissiveIntensity: 0.08,
  }),
)

export const goldMat = track(
  'starlink',
  new THREE.MeshStandardMaterial({
    color: '#c6a15b',
    roughness: 0.32,
    metalness: 1,
  }),
)

export const capMat = track(
  'starlink',
  new THREE.MeshStandardMaterial({
    color: '#2a241c',
    roughness: 0.55,
    metalness: 0.4,
    side: THREE.DoubleSide,
  }),
)

export const portPlateMat = track(
  'toolbus',
  new THREE.MeshStandardMaterial({
    color: '#2a2c2e',
    roughness: 0.45,
    metalness: 0.7,
  }),
)

export const attitudeMat = track(
  'attitude',
  new THREE.MeshStandardMaterial({
    color: '#cfd3d8',
    roughness: 0.28,
    metalness: 0.88,
  }),
)

export const towelMat = track(
  'towel',
  new THREE.MeshStandardMaterial({
    color: '#efe6d6',
    roughness: 0.95,
    metalness: 0,
  }),
)

export const haloMat = new THREE.MeshBasicMaterial({
  color: '#f7f7f5',
  transparent: true,
  opacity: 0.9,
  depthTest: false,
})

const shellShader = {
  current: null as null | { uniforms: { uEyeA: { value: THREE.Vector3 }; uEyeB: { value: THREE.Vector3 } } },
}

shellMat.onBeforeCompile = (shader) => {
  shader.uniforms.uEyeA = { value: new THREE.Vector3(-0.26, 0.16, 0.94) }
  shader.uniforms.uEyeB = { value: new THREE.Vector3(0.26, 0.16, 0.94) }
  shader.uniforms.uEyeH = { value: 0.1 }
  shader.uniforms.uEyeR = { value: 0.09 }
  shellShader.current = shader as unknown as typeof shellShader.current
  shader.vertexShader = shader.vertexShader
    .replace('#include <common>', '#include <common>\nvarying vec3 vOrbLocal;')
    .replace('#include <begin_vertex>', 'vOrbLocal = position;\n#include <begin_vertex>')
  shader.fragmentShader = shader.fragmentShader
    .replace(
      '#include <common>',
      `#include <common>
       varying vec3 vOrbLocal;
       uniform vec3 uEyeA;
       uniform vec3 uEyeB;
       uniform float uEyeH;
       uniform float uEyeR;
       float orbWell(vec3 p, vec3 c) {
         vec2 q = abs(p.xy - c.xy) - vec2(0.16, 0.07);
         float dist = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0);
         return (dist < 0.02 && p.z > 0.75) ? 1.0 : 0.0;
       }`,
    )
    .replace(
      '#include <dithering_fragment>',
      `if (orbWell(vOrbLocal, uEyeA) + orbWell(vOrbLocal, uEyeB) > 0.5) discard;
       #include <dithering_fragment>`,
    )
}

shellMat.customProgramCacheKey = () => 'orb-shell-wells-v3'

export function setEyeHoles(a: THREE.Vector3, b: THREE.Vector3) {
  const shader = shellShader.current
  if (!shader) return
  shader.uniforms.uEyeA.value.copy(a)
  shader.uniforms.uEyeB.value.copy(b)
}

export function applyDye(dye: DyeId) {
  const p = PALETTES[dye]
  shellMat.color.set(p.hull)
  shellMat.roughness = p.rough
  shellMat.metalness = p.metal
  shellMat.clearcoatRoughness = p.clearcoatRough
  shellMat.sheenColor.set(p.sheen)
  eyeMat.color.set(p.eye)
}

export function applyPresence(hovered: string | null, isolated: string | null, xray: boolean) {
  for (const entry of registry) {
    let opacity = 1
    if (isolated && isolated !== entry.id) opacity = 0.12
    else if (!isolated && hovered && hovered !== entry.id) opacity = 0.35
    if (entry.mat === shellMat && xray) opacity = Math.min(opacity, 0.34)
    if (entry.mat === shellInnerMat && xray) opacity = 0.05
    entry.mat.opacity = opacity
    entry.mat.transparent = opacity < 0.999 || entry.mat === veinQuartz || entry.mat === diamondMat
    entry.mat.depthWrite = opacity > 0.85 && entry.mat !== diamondMat
    if (entry.uniform) entry.uniform.value = opacity
  }
  const busHot = xray || hovered === 'bus' || isolated === 'bus'
  busMat.emissiveIntensity = busHot ? 1.85 : 0.5
  affectMat.emissiveIntensity = hovered === 'affect' || isolated === 'affect' ? 0.45 : 0.08
}

export function setCrossSection(on: boolean) {
  const planes = on ? [clipPlane] : []
  for (const entry of registry) entry.mat.clippingPlanes = planes
  haloMat.clippingPlanes = []
}
