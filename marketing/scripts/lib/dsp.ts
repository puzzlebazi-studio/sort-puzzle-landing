/**
 * A small, dependency-free audio toolkit for the ads' music, in the spirit of the game's own
 * Tools/Audio/dsp.py: mono Float32Array buffers at 44.1 kHz, deterministic randomness.
 */
import { writeFileSync } from 'node:fs'

export const SR = 44100
export const TAU = 2 * Math.PI

const NAMES: Record<string, number> = {
  C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4, F: 5, 'F#': 6, Gb: 6, G: 7, 'G#': 8, Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11,
}

/** Equal-tempered frequency of a note name such as "F#4". */
export function note(name: string): number {
  const pitch = name.slice(0, -1)
  const octave = Number(name.slice(-1))
  const midi = 12 * (octave + 1) + NAMES[pitch]
  return 440 * 2 ** ((midi - 69) / 12)
}

export const samples = (seconds: number) => Math.round(seconds * SR)

/** A seeded random number generator (mulberry32), so every render is identical. */
export function random(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function noise(seconds: number, rng: () => number) {
  const out = new Float32Array(samples(seconds))
  for (let i = 0; i < out.length; i++) out[i] = rng() * 2 - 1
  return out
}

// ---- filters

export function lowpass(buffer: Float32Array, cutoff: number) {
  const a = 1 - Math.exp((-TAU * cutoff) / SR)
  const out = new Float32Array(buffer.length)
  let y = 0
  for (let i = 0; i < buffer.length; i++) {
    y += a * (buffer[i] - y)
    out[i] = y
  }
  return out
}

export function highpass(buffer: Float32Array, cutoff: number) {
  const low = lowpass(buffer, cutoff)
  const out = new Float32Array(buffer.length)
  for (let i = 0; i < buffer.length; i++) out[i] = buffer[i] - low[i]
  return out
}

/** Resonant band-pass (RBJ biquad); the center can glide to `centerEnd`. */
export function bandpass(buffer: Float32Array, center: number, q: number, centerEnd = center) {
  const out = new Float32Array(buffer.length)
  let x1 = 0
  let x2 = 0
  let y1 = 0
  let y2 = 0
  const n = Math.max(1, buffer.length - 1)
  for (let i = 0; i < buffer.length; i++) {
    const f = center * (centerEnd / center) ** (i / n)
    const w = (TAU * Math.min(f, SR * 0.45)) / SR
    const alpha = Math.sin(w) / (2 * q)
    const cw = Math.cos(w)
    const a0 = 1 + alpha
    const x = buffer[i]
    const y = (alpha * x - alpha * x2 + 2 * cw * y1 - (1 - alpha) * y2) / a0
    x2 = x1
    x1 = x
    y2 = y1
    y1 = y
    out[i] = y
  }
  return out
}

// ---- voices

/** A wavetable of harmonic amplitudes, one cycle long. */
export function table(harmonics: number[], size = 4096) {
  const t = new Float32Array(size)
  harmonics.forEach((amp, h) => {
    for (let i = 0; i < size; i++) t[i] += amp * Math.sin((TAU * (h + 1) * i) / size)
  })
  let top = 0
  for (const v of t) top = Math.max(top, Math.abs(v))
  for (let i = 0; i < size; i++) t[i] /= top
  return t
}

export const SAW = table(Array.from({ length: 10 }, (_, h) => 1 / (h + 1)))
export const SQUAREISH = table([1, 0, 0.33, 0, 0.2, 0, 0.14])
export const ROUND = table([1, 0.35, 0.12])

/** A wavetable note with a linear attack and release. */
export function voice(wave: Float32Array, freq: number, seconds: number, attack: number, release: number, detuneCents = 0) {
  const n = samples(seconds + release)
  const out = new Float32Array(n)
  const size = wave.length
  const step = (freq * 2 ** (detuneCents / 1200) * size) / SR
  const a = Math.max(1, samples(attack))
  const hold = samples(seconds)
  const r = Math.max(1, samples(release))
  let phase = 0
  for (let i = 0; i < n; i++) {
    const env = i < hold ? Math.min(1, i / a) : Math.max(0, 1 - (i - hold) / r)
    out[i] = wave[Math.floor(phase) % size] * env
    phase += step
  }
  return out
}

/** A bright marimba: a decaying fundamental with its fourth partial, struck. */
export function marimba(freq: number, seconds = 0.7) {
  const n = samples(seconds)
  const out = new Float32Array(n)
  const k1 = (TAU * freq) / SR
  const k2 = (TAU * freq * 3.93) / SR
  for (let i = 0; i < n; i++) {
    const t = i / SR
    out[i] = (Math.exp(-t / 0.26) * Math.sin(k1 * i) + 0.45 * Math.exp(-t / 0.04) * Math.sin(k2 * i)) * Math.min(1, i / 50)
  }
  return out
}

/** A glassy bell for the hook: a fundamental and two partials, like a celesta. */
export function bell(freq: number, seconds: number) {
  const n = samples(Math.max(seconds, 1.2))
  const out = new Float32Array(n)
  const partials: [number, number, number][] = [
    [1, 1, 0.75],
    [2, 0.32, 0.3],
    [3.01, 0.12, 0.16],
    [4.2, 0.06, 0.08],
  ]
  for (const [ratio, amp, tau] of partials) {
    const k = (TAU * freq * ratio) / SR
    for (let i = 0; i < n; i++) out[i] += amp * Math.exp(-i / SR / tau) * Math.sin(k * i)
  }
  for (let i = 0; i < Math.min(n, 120); i++) out[i] *= i / 120
  return out
}

/** A round, bouncy bass note. */
export function bass(freq: number, seconds: number) {
  const body = voice(ROUND, freq, seconds, 0.004, 0.06)
  const bite = lowpass(voice(SAW, freq, seconds, 0.004, 0.06), 700)
  const out = new Float32Array(body.length)
  for (let i = 0; i < out.length; i++) {
    const t = i / SR
    out[i] = body[i] * 0.85 + (bite[i] ?? 0) * 0.35 * Math.exp(-t / 0.12)
  }
  return out
}

export function kick() {
  const n = samples(0.4)
  const out = new Float32Array(n)
  let phase = 0
  for (let i = 0; i < n; i++) {
    const t = i / SR
    phase += (TAU * (46 + 90 * Math.exp(-t / 0.03))) / SR
    out[i] = Math.sin(phase) * Math.exp(-t / 0.14) + (i < 60 ? 0.3 * (1 - i / 60) : 0)
  }
  return out
}

export function clap(rng: () => number) {
  const body = bandpass(noise(0.22, rng), 1400, 1.1)
  const out = new Float32Array(body.length)
  for (let i = 0; i < out.length; i++) {
    const t = i / SR
    let bursts = 0
    for (const d of [0, 0.01, 0.021]) if (t >= d) bursts += Math.exp(-(t - d) / 0.005)
    out[i] = body[i] * (bursts * 0.55 + Math.exp(-t / 0.06))
  }
  return out
}

export function hat(rng: () => number, open = false) {
  const hit = highpass(noise(open ? 0.3 : 0.06, rng), 7500)
  const tau = open ? 0.09 : 0.016
  for (let i = 0; i < hit.length; i++) hit[i] *= Math.exp(-i / SR / tau)
  return hit
}

/** A crash cymbal: bright noise with a long tail, for the cuts. */
export function crash(rng: () => number) {
  const hit = highpass(noise(2.2, rng), 4500)
  for (let i = 0; i < hit.length; i++) {
    const t = i / SR
    hit[i] *= Math.exp(-t / 0.55) * Math.min(1, i / 30)
  }
  return hit
}

/** A swelling noise sweep that rises into a cut. */
export function riser(rng: () => number, seconds: number) {
  const swept = bandpass(noise(seconds, rng), 500, 2.2, 7000)
  for (let i = 0; i < swept.length; i++) {
    const x = i / swept.length
    swept[i] *= x * x * 1.6
  }
  return swept
}

/** A soft whoosh for a wipe: noise swept down, quick in and out. */
export function whoosh(rng: () => number, seconds = 0.45) {
  const swept = bandpass(noise(seconds, rng), 5000, 1.4, 900)
  for (let i = 0; i < swept.length; i++) {
    const x = i / swept.length
    swept[i] *= Math.sin(Math.PI * x) ** 2
  }
  return swept
}

// ---- mixing

export class Stereo {
  readonly left: Float32Array
  readonly right: Float32Array

  /** A silent bus `seconds` long, or one made of two channels. */
  constructor(seconds: number, channels?: [Float32Array, Float32Array]) {
    this.left = channels?.[0] ?? new Float32Array(samples(seconds))
    this.right = channels?.[1] ?? new Float32Array(samples(seconds))
  }

  /** Adds a mono buffer at `at` seconds with an equal-power pan (-1 left … 1 right). */
  place(buffer: Float32Array, at: number, gain: number, pan = 0) {
    const gl = Math.cos(((pan + 1) * Math.PI) / 4) * gain
    const gr = Math.sin(((pan + 1) * Math.PI) / 4) * gain
    const start = samples(at)
    const end = Math.min(this.left.length, start + buffer.length)
    for (let i = Math.max(0, start); i < end; i++) {
      this.left[i] += buffer[i - start] * gl
      this.right[i] += buffer[i - start] * gr
    }
  }

  /** Mixes another bus in, scaled sample by sample by `envelope` (for the kick's pump). */
  mix(bus: Stereo, gain = 1, envelope?: Float32Array) {
    for (let i = 0; i < this.left.length; i++) {
      const g = gain * (envelope ? envelope[i] : 1)
      this.left[i] += bus.left[i] * g
      this.right[i] += bus.right[i] * g
    }
  }
}

/** Freeverb-style stereo reverb: parallel damped combs into series all-passes. Returns the wet bus. */
export function reverb(send: Stereo, room = 0.72, damp = 0.4) {
  const run = (x: Float32Array, offset: number) => {
    const n = x.length
    const acc = new Float32Array(n)
    const feedback = 0.7 + 0.28 * room
    for (let length of [1116, 1188, 1277, 1356, 1422, 1491, 1557, 1617]) {
      length += offset
      const line = new Float32Array(length)
      let pos = 0
      let store = 0
      for (let i = 0; i < n; i++) {
        const out = line[pos]
        store = out * (1 - damp) + store * damp
        line[pos] = x[i] * 0.015 + store * feedback
        acc[i] += out
        pos = pos + 1 < length ? pos + 1 : 0
      }
    }
    for (let length of [556, 441, 341, 225]) {
      length += offset
      const line = new Float32Array(length)
      let pos = 0
      for (let i = 0; i < n; i++) {
        const b = line[pos]
        const out = -acc[i] + b
        line[pos] = acc[i] + b * 0.5
        acc[i] = out
        pos = pos + 1 < length ? pos + 1 : 0
      }
    }
    return acc
  }
  const mono = new Float32Array(send.left.length)
  for (let i = 0; i < mono.length; i++) mono[i] = (send.left[i] + send.right[i]) * 0.5
  return new Stereo(0, [run(mono, 0), run(mono, 23)])
}

/** Writes 16-bit stereo PCM, peaking at `peak` (0..1). */
export function writeWav(path: string, bus: Stereo, peak = 0.89) {
  let top = 1e-9
  for (let i = 0; i < bus.left.length; i++) top = Math.max(top, Math.abs(bus.left[i]), Math.abs(bus.right[i]))
  const gain = peak / top
  const n = bus.left.length
  const data = Buffer.alloc(44 + n * 4)
  data.write('RIFF', 0)
  data.writeUInt32LE(36 + n * 4, 4)
  data.write('WAVE', 8)
  data.write('fmt ', 12)
  data.writeUInt32LE(16, 16)
  data.writeUInt16LE(1, 20)
  data.writeUInt16LE(2, 22)
  data.writeUInt32LE(SR, 24)
  data.writeUInt32LE(SR * 4, 28)
  data.writeUInt16LE(4, 32)
  data.writeUInt16LE(16, 34)
  data.write('data', 36)
  data.writeUInt32LE(n * 4, 40)
  for (let i = 0; i < n; i++) {
    data.writeInt16LE(Math.round(Math.max(-1, Math.min(1, bus.left[i] * gain)) * 32767), 44 + i * 4)
    data.writeInt16LE(Math.round(Math.max(-1, Math.min(1, bus.right[i] * gain)) * 32767), 46 + i * 4)
  }
  writeFileSync(path, data)
}
