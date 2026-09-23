export type SysId =
  | 'ocular'
  | 'cortical'
  | 'helix'
  | 'veins'
  | 'bus'
  | 'shell'
  | 'flux'
  | 'affect'
  | 'starlink'
  | 'alignment'
  | 'toolbus'
  | 'attitude'

export type Vec3 = [number, number, number]

export interface SystemSpec {
  id: SysId
  index: string
  code: string
  name: string
  fn: string
  mass: string
  power: string
  temp: string
  materials: string[]
  poem: string
  order: number
  sound: number
  explode: Vec3
  scaleTo: number
}

export interface Segment {
  id: string
  kind: 'vein' | 'bus'
  from: SysId
  to: SysId
  fromAt: Vec3
  toAt: Vec3
  union: string
}

export const RAIL: SysId[] = [
  'ocular',
  'cortical',
  'helix',
  'veins',
  'bus',
  'shell',
  'flux',
  'affect',
  'starlink',
  'alignment',
  'toolbus',
  'attitude',
]

export const SYSTEMS: Record<SysId, SystemSpec> = {
  ocular: {
    id: 'ocular',
    index: '01',
    code: 'GB-OC-01',
    name: 'Ocular Array',
    fn: 'Dual capsule-eye photonic sensors.',
    mass: '18 g',
    power: '0.4 W',
    temp: '34 C',
    materials: ['Sapphire', 'Liquid iris', 'Event retina', 'Carbon well'],
    poem: `Two stadium apertures sit in carbon wells, each a stack rather than a painted mark. Sapphire takes the room. A liquid iris trims the field. An event retina records only change. A grain of inertial sensor keeps the pair on one gaze, so the Orb never looks wall eyed. The black is an absorptive meta surface. It drinks stray light so a small machine can meet your eye without glare.`,
    order: 6,
    sound: 1960,
    explode: [0, 0.04, 0.42],
    scaleTo: 1,
  },
  cortical: {
    id: 'cortical',
    index: '02',
    code: 'GB-CS-02',
    name: 'Cortical Sphere',
    fn: 'Monocrystalline photonic compute nucleus.',
    mass: '22 g',
    power: '6.5 W',
    temp: '41 C',
    materials: ['Monocrystal', 'Slow light', 'Facet caustic'],
    poem: `At the exact center sits a forty eight millimeter monocrystal. Light moves through it the way a thought moves through a quiet room, by bending. Facets hold standing caustics. Nothing here is a chip in the old sense. Compute is a path the photon takes, and the path remembers the last path. The cage outside exists so this stone cannot be hurried into a cheaper kind of answer.`,
    order: 11,
    sound: 880,
    explode: [0, 0.32, 0],
    scaleTo: 1,
  },
  helix: {
    id: 'helix',
    index: '03',
    code: 'GB-MH-03',
    name: 'Mnemonic Helix',
    fn: 'Working context as standing interference.',
    mass: '9 g',
    power: '0.8 W',
    temp: '38 C',
    materials: ['Diamond wafer', 'Niobium spacer'],
    poem: `Six diamond wafers ring the core, each a little off axis like a gyroscope that learned to keep a diary. Context is not stored as an address. It is a standing interference pattern across the stack. When a write lands, every ring advances two degrees and the pattern becomes a new quiet. The offset is deliberate. Aligned rings would sing one note and forget the others.`,
    order: 9,
    sound: 1480,
    explode: [0, 0.1, 0],
    scaleTo: 1,
  },
  veins: {
    id: 'veins',
    index: '04',
    code: 'GB-TV-04',
    name: 'Thermal Veins',
    fn: 'Dielectric nanofluid vascular plate.',
    mass: '11 g',
    power: '0.2 W',
    temp: '36 to 44 C',
    materials: ['Copper rose', 'Smoked quartz', 'Nanofluid'],
    poem: `A capillary mesh of dielectric nanofluid, four tenths of a millimeter across, wraps the nucleus the way a vascular plate wraps an organ. Copper rose carries heat. Smoked quartz carries the return. A few lines end in tiny bellows that take the pulse of a quench before it becomes a story. The mesh is a map. Every line has a port of origin and a port of destination.`,
    order: 7,
    sound: 420,
    explode: [0, 0, 0],
    scaleTo: 1,
  },
  bus: {
    id: 'bus',
    index: '05',
    code: 'GB-PB-05',
    name: 'Photonic Bus',
    fn: 'Stacked nitride waveguides, the light loom.',
    mass: '7 g',
    power: '1.1 W',
    temp: '33 C',
    materials: ['Silicon nitride', 'Cool light', 'Ribbon stack'],
    poem: `What looks like jewelry is a loom of silicon nitride waveguides, stacked until the bundle reads as a ribbon. Pulses of cool light are the only traffic. There is no copper in the argument path. When a ribbon is chosen it brightens, and the brightening is the packet. The loom peels toward named systems, because a wire that begins nowhere is not a wire.`,
    order: 8,
    sound: 1320,
    explode: [0, 0, 0],
    scaleTo: 1,
  },
  shell: {
    id: 'shell',
    index: '06',
    code: 'GB-MS-06',
    name: 'Morph Shell',
    fn: 'Programmable-matter hull and equatorial latch.',
    mass: '40 g',
    power: '2.4 W',
    temp: '31 C',
    materials: ['Electroactive polymer', 'Dielectric elastomer', 'Nano velvet'],
    poem: `One and eight tenths of a millimeter of programmable matter. Electroactive polymer under a dielectric elastomer, glossy on the outside, flocked nano velvet within. Fastener bosses on the inner face match the toolbus and the attitude ring, so the hull is a garment with a memory of its closures. It splits as two hemispheres and an equatorial latch. The face does not split with it.`,
    order: 0,
    sound: 240,
    explode: [0, 0, 0],
    scaleTo: 1,
  },
  flux: {
    id: 'flux',
    index: '07',
    code: 'GB-FC-07',
    name: 'Flux Cell',
    fn: 'Room-temperature superconducting toroid.',
    mass: '16 g',
    power: '0.3 W idle',
    temp: '29 C',
    materials: ['Superconducting tape', 'Quench braid', 'Amber well'],
    poem: `Offset from center, a room temperature superconducting toroid the size of a large coin. This is the heart, and it does not look like a battery because it is not one. A single braid circles the ring for quench protection. Charged, it holds a soft amber, like a coal that agreed to stay a coal. The braid is the sentence that keeps the heart from telling a louder story.`,
    order: 4,
    sound: 220,
    explode: [-0.58, -0.36, 0.2],
    scaleTo: 1,
  },
  affect: {
    id: 'affect',
    index: '08',
    code: 'GB-ER-08',
    name: 'Affect Coil',
    fn: 'Expression field and voice grain.',
    mass: '4 g',
    power: '0.6 W',
    temp: '35 C',
    materials: ['Helmholtz pair', 'Voice grain', 'Bias winding'],
    poem: `A Helmholtz pair, thin and close, seated just behind the face plate. The coil does not move the eyes with muscles. It biases the field the ocular stack already wants to obey. Expression is a current. The voice grain lives here too, a small roughness in an otherwise polite spectrum. Hover the coil and the face will rehearse the expression it is holding.`,
    order: 5,
    sound: 640,
    explode: [0, 0.06, 0.22],
    scaleTo: 1,
  },
  starlink: {
    id: 'starlink',
    index: '09',
    code: 'GB-SA-09',
    name: 'Starlink Cortex',
    fn: 'Phased-array crown and constellation lock.',
    mass: '6 g',
    power: '1.4 W',
    temp: '32 C',
    materials: ['Gold patch', 'Lace cap', 'Harness'],
    poem: `A lace cap of sixty four gold patches at the crown, each one almost too small to be a thing. Together they are a phased array. The Orb keeps a polite lock on the constellation overhead and blinks, occasionally, from a single patch, the way a city blinks from one window. A short harness drops from the cap into the photonic bus. The sky is a connector with manners.`,
    order: 3,
    sound: 2480,
    explode: [0, 0.7, 0],
    scaleTo: 1,
  },
  alignment: {
    id: 'alignment',
    index: '10',
    code: 'GB-AI-10',
    name: 'Alignment Cage',
    fn: 'Niobium interlock around the core.',
    mass: '5 g',
    power: '0.1 W',
    temp: '30 C',
    materials: ['Niobium trace', 'Truncated icosahedron'],
    poem: `Around the stone, a lattice of pale niobium describes a truncated icosahedron. It reads as sacred geometry because the constraint happens to be beautiful. The cage is a Faraday quiet and a safety interlock. It keeps the core from coupling to anything that has not been introduced. When the study opens, the cage scales up and becomes readable, which is all an interlock ever wanted.`,
    order: 10,
    sound: 990,
    explode: [0, 0.06, 0],
    scaleTo: 1.35,
  },
  toolbus: {
    id: 'toolbus',
    index: '11',
    code: 'GB-TH-11',
    name: 'Toolbus Harness',
    fn: 'Seven bayonet ports at the nape.',
    mass: '14 g',
    power: '0.5 W',
    temp: '33 C',
    materials: ['Bayonet', 'Strain relief', 'Class dye'],
    poem: `Seven bayonet ports sit on a plate at the nape, labeled MCP-0 through MCP-6 in type you can only read up close. Browser, filesystem, terminal, mail, calendar, vault, handoff. Each cable is short, strain relieved, and dyed by the class of hand it expects. The Orb does not grow arms. It grows a tidy bundle and lets the room supply the hands.`,
    order: 2,
    sound: 310,
    explode: [0, -0.16, 0],
    scaleTo: 1,
  },
  attitude: {
    id: 'attitude',
    index: '12',
    code: 'GB-AR-12',
    name: 'Attitude Ring',
    fn: 'Equatorial reaction control and optical gyro.',
    mass: '8 g',
    power: '0.4 W',
    temp: '30 C',
    materials: ['Cold gas', 'Optical gyro', 'Hoop'],
    poem: `An equatorial ring of eight cold gas dots and a silent optical gyroscope. This is why the hover never wobbles and the face never hunts. The ring is reaction control for a body that weighs, on paper, nothing you can feel. Callout ticks mark every thruster. In the exploded study the hoop steps forward so you can count the dots and see that eight was enough.`,
    order: 1,
    sound: 520,
    explode: [0, 0, 0.5],
    scaleTo: 1,
  },
}

export const TOWEL = {
  id: 'towel' as const,
  index: '13',
  code: 'GB-TW-13',
  name: 'Towel Clip',
  title: `Don't Panic.`,
  fn: 'Recessed south-pole loop. Not on the rail.',
  mass: '3 g',
  power: '0 W',
  temp: '28 C',
  materials: ['Cloth loop', 'Recessed clip'],
  poem: `A twenty millimeter loop recessed under the south pole, in the tradition of travelers who expect weather. It is not on the rail. It appears only when the study is almost fully open. The clip is rated for one towel and a great deal of calm. The plate says what the plate has always said, and then it stops talking.`,
}

export const SHELL_SPLIT = {
  left: [-0.92, 0, 0] as Vec3,
  right: [0.92, 0, 0] as Vec3,
  latch: [0, 0.62, 0] as Vec3,
}

export const SEGMENTS: Segment[] = [
  { id: 'TV-A', kind: 'vein', from: 'cortical', to: 'flux', fromAt: [0.06, 0.08, 0.1], toAt: [-0.22, -0.16, 0.06], union: 'Union TV-A' },
  { id: 'TV-B', kind: 'vein', from: 'cortical', to: 'helix', fromAt: [-0.08, 0.1, -0.04], toAt: [0.22, 0.1, 0.04], union: 'Union TV-B' },
  { id: 'TV-C', kind: 'vein', from: 'flux', to: 'shell', fromAt: [-0.36, -0.22, 0.12], toAt: [0.52, -0.18, 0.22], union: 'Union TV-C' },
  { id: 'TV-D', kind: 'vein', from: 'affect', to: 'ocular', fromAt: [0.04, 0.16, 0.36], toAt: [-0.14, 0.2, 0.62], union: 'Union TV-D' },
  { id: 'TV-E', kind: 'vein', from: 'starlink', to: 'cortical', fromAt: [0.04, 0.78, 0.02], toAt: [0.02, 0.2, 0.02], union: 'Union TV-E' },
  { id: 'TV-F', kind: 'vein', from: 'toolbus', to: 'flux', fromAt: [0.08, -0.66, 0.04], toAt: [-0.18, -0.3, 0.02], union: 'Union TV-F' },
  { id: 'TV-G', kind: 'vein', from: 'attitude', to: 'flux', fromAt: [0.52, -0.04, 0.16], toAt: [-0.12, -0.2, 0.1], union: 'Union TV-G' },
  { id: 'PB-A', kind: 'bus', from: 'cortical', to: 'affect', fromAt: [0.02, 0.05, 0.16], toAt: [0.02, 0.12, 0.34], union: 'Union PB-A' },
  { id: 'PB-B', kind: 'bus', from: 'affect', to: 'ocular', fromAt: [-0.06, 0.14, 0.38], toAt: [0.16, 0.18, 0.64], union: 'Union PB-B' },
  { id: 'PB-C', kind: 'bus', from: 'cortical', to: 'helix', fromAt: [0.14, 0.02, -0.02], toAt: [-0.2, 0.08, 0.08], union: 'Union PB-C' },
  { id: 'PB-D', kind: 'bus', from: 'cortical', to: 'starlink', fromAt: [0, 0.18, 0], toAt: [0, 0.78, 0], union: 'Union PB-D' },
  { id: 'PB-E', kind: 'bus', from: 'cortical', to: 'toolbus', fromAt: [0, -0.14, 0.04], toAt: [0, -0.58, 0.02], union: 'Union PB-E' },
  { id: 'PB-F', kind: 'bus', from: 'alignment', to: 'cortical', fromAt: [0.22, 0.12, 0.14], toAt: [0.1, 0.05, 0.08], union: 'Union PB-F' },
  { id: 'PB-G', kind: 'bus', from: 'attitude', to: 'cortical', fromAt: [-0.38, 0.02, 0.32], toAt: [-0.08, -0.02, 0.12], union: 'Union PB-G' },
]

export const PORTS = [
  { id: 'MCP-0', name: 'browser', color: '#c8d4e8' },
  { id: 'MCP-1', name: 'filesystem', color: '#d7c4a3' },
  { id: 'MCP-2', name: 'terminal', color: '#b7c4b0' },
  { id: 'MCP-3', name: 'mail', color: '#e0b4a8' },
  { id: 'MCP-4', name: 'calendar', color: '#d9c27a' },
  { id: 'MCP-5', name: 'vault', color: '#b7a8c4' },
  { id: 'MCP-6', name: 'handoff', color: '#e7d7c8' },
] as const

export function specById(id: string | null) {
  if (!id) return null
  if (id === 'towel') return TOWEL
  if (id in SYSTEMS) return SYSTEMS[id as SysId]
  return null
}
