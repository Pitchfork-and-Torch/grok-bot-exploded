import type * as THREE from 'three'

export const CUTS: readonly string[]

export function deformInto(src: THREE.Vector3, cut: string, target: THREE.Vector3): void
export function shellGeometry(cut: string, side: number): THREE.BufferGeometry
export function eyeAnchor(cut: string, side: number, target: THREE.Vector3): void
export function stadiumGeometry(width: number, height: number, depth: number): THREE.BufferGeometry
export function facePlateGeometry(): THREE.BufferGeometry
export function buildCageGeometry(radius: number): {
  geometry: THREE.BufferGeometry
  verts: number
  edges: number
}
export function braidGeometry(ringRadius: number, wrapRadius: number, turns: number, tube: number): THREE.BufferGeometry
export function makePulseTexture(): THREE.CanvasTexture
export function portLabelTexture(text: string): THREE.CanvasTexture
