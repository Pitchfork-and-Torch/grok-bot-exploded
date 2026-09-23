const STORAGE = 'orb-teardown-audio'

let ctx: AudioContext | null = null
let master: GainNode | null = null
let audible = false
let reduced = false
let humOn = false
let prev = 0
let lastHover = ''
let lastHoverAt = 0
let noiseBuf: AudioBuffer | null = null

function context() {
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    ctx = new AC()
    master = ctx.createGain()
    master.gain.value = 0
    master.connect(ctx.destination)
  }
  return ctx
}

function noise() {
  const c = context()
  if (noiseBuf) return noiseBuf
  const len = Math.floor(c.sampleRate * 0.5)
  const buf = c.createBuffer(1, len, c.sampleRate)
  const data = buf.getChannelData(0)
  let v = 0
  for (let i = 0; i < len; i++) {
    const white = Math.random() * 2 - 1
    v = v * 0.98 + white * 0.02
    data[i] = v * 3.2
  }
  noiseBuf = buf
  return buf
}

function blip(type: OscillatorType, freq: number, dur: number, gain: number, endFreq?: number) {
  if (!audible || !master) return
  const c = context()
  const o = c.createOscillator()
  const g = c.createGain()
  o.type = type
  o.frequency.setValueAtTime(freq, c.currentTime)
  if (endFreq) o.frequency.exponentialRampToValueAtTime(Math.max(1, endFreq), c.currentTime + dur)
  g.gain.setValueAtTime(gain, c.currentTime)
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur)
  o.connect(g)
  g.connect(master)
  o.start()
  o.stop(c.currentTime + dur + 0.02)
}

function burst(dur: number, gain: number, freq: number, q: number) {
  if (!audible || !master) return
  const c = context()
  const src = c.createBufferSource()
  src.buffer = noise()
  const filter = c.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.value = freq
  filter.Q.value = q
  const g = c.createGain()
  g.gain.setValueAtTime(gain, c.currentTime)
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur)
  src.connect(filter)
  filter.connect(g)
  g.connect(master)
  src.start()
  src.stop(c.currentTime + dur + 0.02)
}

function startHum() {
  if (!ctx || !master || humOn) return
  humOn = true
  const c = ctx
  const bed = c.createGain()
  bed.gain.value = 0.016
  const lfo = c.createOscillator()
  lfo.frequency.value = 0.08
  const lfoGain = c.createGain()
  lfoGain.gain.value = 0.006
  lfo.connect(lfoGain)
  lfoGain.connect(bed.gain)
  lfo.start()
  for (const freq of [42, 84]) {
    const o = c.createOscillator()
    o.type = 'sine'
    o.frequency.value = freq
    o.connect(bed)
    o.start()
  }
  bed.connect(master)
  window.setInterval(() => {
    if (!oneShotOk()) return
    blip('sine', 6200 + Math.random() * 1800, 0.03, 0.008)
  }, 5200)
}

function oneShotOk() {
  return audible && !reduced
}

export const audio = {
  setReduced(v: boolean) {
    reduced = v
  },
  initialAudible() {
    try {
      return localStorage.getItem(STORAGE) === 'on'
    } catch {
      return false
    }
  },
  setAudible(on: boolean) {
    audible = on
    try {
      localStorage.setItem(STORAGE, on ? 'on' : 'muted')
    } catch {
      /* private mode */
    }
    const c = context()
    if (!master) return
    if (on) {
      void c.resume()
      startHum()
      master.gain.setTargetAtTime(0.9, c.currentTime, 0.05)
    } else {
      master.gain.setTargetAtTime(0, c.currentTime, 0.04)
    }
  },
  tick(freq = 2400) {
    if (!audible) return
    blip('sine', freq, 0.012, 0.05, freq * 0.45)
  },
  hover(id: string, freq: number) {
    const now = performance.now()
    if (id === lastHover && now - lastHoverAt < 160) return
    lastHover = id
    lastHoverAt = now
    if (!oneShotOk()) return
    this.tick(freq)
  },
  latch() {
    if (!oneShotOk()) return
    blip('triangle', 180, 0.04, 0.06)
    burst(0.04, 0.04, 900, 0.7)
  },
  decouple() {
    if (!oneShotOk()) return
    burst(0.4, 0.05, 400, 0.4)
    blip('triangle', 140, 0.08, 0.03, 70)
  },
  colorWash() {
    if (!oneShotOk()) return
    blip('sine', 220, 0.18, 0.04, 440)
  },
  isolate(dir: 'in' | 'out') {
    if (!oneShotOk()) return
    burst(0.16, 0.045, dir === 'in' ? 1400 : 700, 0.8)
  },
  softBlink() {
    if (!oneShotOk()) return
    blip('sine', 9000, 0.012, 0.008)
  },
  pulse() {
    if (!oneShotOk()) return
    blip('sine', 880, 0.03, 0.03, 660)
  },
  noteExplode(v: number) {
    if (prev < 0.55 && v >= 0.55) this.decouple()
    if (prev > 0.08 && v <= 0.08) this.latch()
    prev = v
  },
}
