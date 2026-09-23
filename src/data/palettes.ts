export const DYES = [
  'porcelain',
  'obsidian',
  'blue',
  'flame',
  'teal',
  'red',
  'pink',
  'violet',
  'orange',
  'brown',
] as const

export type DyeId = (typeof DYES)[number]

export const CUTS = [
  'blob',
  'pebble',
  'squircle',
  'tablet',
  'wedge',
  'hex',
  'cloud',
  'teardrop',
] as const

export type CutId = (typeof CUTS)[number]

export interface Palette {
  hull: string
  eye: string
  rough: number
  metal: number
  sheen: string
  clearcoatRough: number
  swatch: string
}

export const PALETTES: Record<DyeId, Palette> = {
  porcelain: {
    hull: '#f3eee6',
    eye: '#141414',
    rough: 0.38,
    metal: 0.02,
    sheen: '#fff8ee',
    clearcoatRough: 0.32,
    swatch: '#f3eee6',
  },
  obsidian: {
    hull: '#0c0c0e',
    eye: '#f4f1ea',
    rough: 0.08,
    metal: 0.92,
    sheen: '#d5dbe6',
    clearcoatRough: 0.06,
    swatch: '#0c0c0e',
  },
  blue: {
    hull: '#1c466f',
    eye: '#e7eef6',
    rough: 0.2,
    metal: 0.35,
    sheen: '#d5e4f5',
    clearcoatRough: 0.12,
    swatch: '#1c466f',
  },
  flame: {
    hull: '#b64b28',
    eye: '#1a100c',
    rough: 0.22,
    metal: 0.28,
    sheen: '#ffd0b4',
    clearcoatRough: 0.12,
    swatch: '#b64b28',
  },
  teal: {
    hull: '#1c6560',
    eye: '#e7f4f1',
    rough: 0.2,
    metal: 0.32,
    sheen: '#cfe8e2',
    clearcoatRough: 0.12,
    swatch: '#1c6560',
  },
  red: {
    hull: '#7d2e2e',
    eye: '#f6ecec',
    rough: 0.22,
    metal: 0.3,
    sheen: '#f0cfcb',
    clearcoatRough: 0.12,
    swatch: '#7d2e2e',
  },
  pink: {
    hull: '#b87482',
    eye: '#1c1214',
    rough: 0.24,
    metal: 0.18,
    sheen: '#ffdfe4',
    clearcoatRough: 0.14,
    swatch: '#b87482',
  },
  violet: {
    hull: '#564866',
    eye: '#f3eef6',
    rough: 0.22,
    metal: 0.3,
    sheen: '#e4dceb',
    clearcoatRough: 0.12,
    swatch: '#564866',
  },
  orange: {
    hull: '#c56a32',
    eye: '#1c120c',
    rough: 0.22,
    metal: 0.26,
    sheen: '#ffd7b8',
    clearcoatRough: 0.12,
    swatch: '#c56a32',
  },
  brown: {
    hull: '#63462f',
    eye: '#f3ebe3',
    rough: 0.28,
    metal: 0.22,
    sheen: '#ead7c4',
    clearcoatRough: 0.16,
    swatch: '#63462f',
  },
}

export const CUT_LABEL: Record<CutId, string> = {
  blob: 'Blob',
  pebble: 'Pebble',
  squircle: 'Squircle',
  tablet: 'Tablet',
  wedge: 'Wedge',
  hex: 'Hex',
  cloud: 'Cloud',
  teardrop: 'Teardrop',
}
