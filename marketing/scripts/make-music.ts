/**
 * Composes and renders the music of Sort Puzzle's launch ad into public/music/sort-puzzle-launch.wav.
 *
 *     pnpm music
 *
 * One original, bright and bouncy cue in F major at 120 BPM, as long as the ad (28.5 s), cut to
 * its timeline: a sparkle and a riser under the hook, the full groove from the first pour (four on
 * the floor with a pumping bass, marimba arpeggios and a bell tune), a crash and a whoosh on every
 * wipe, and a last F major chord that rings out under the end card. The game's own music
 * (Tools/Audio/make_music.py) is calmer; this keeps its marimba and bell. Deterministic, no samples.
 */
import { mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { BEAT, DURATION, FPS, SCENE_STARTS } from '../src/ads/sort-puzzle-launch/timeline.ts'
import {
  bass,
  bell,
  clap,
  crash,
  hat,
  highpass,
  kick,
  lowpass,
  marimba,
  note,
  random,
  reverb,
  riser,
  SAW,
  samples,
  SR,
  Stereo,
  voice,
  whoosh,
  writeWav,
} from './lib/dsp.ts'

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'music', 'sort-puzzle-launch.wav')

const SECONDS = DURATION / FPS
const B = BEAT / FPS // one beat in seconds (0.5)
const at = (beat: number) => beat * B
const beatOf = (frame: number) => frame / BEAT

// Chords as (bass root, chord tones low to high).
const CHORDS: Record<string, [string, string[]]> = {
  F: ['F2', ['F4', 'A4', 'C5', 'F5']],
  C: ['C2', ['E4', 'G4', 'C5', 'E5']],
  Dm: ['D2', ['D4', 'F4', 'A4', 'D5']],
  Bb: ['Bb1', ['D4', 'F4', 'Bb4', 'D5']],
}

/** Where the groove starts: the first pour, when the play scene's wipe ends. */
const DROP = beatOf(SCENE_STARTS.play)
/** The final chord: two bars into the end card. */
const FINAL = beatOf(SCENE_STARTS.cta) + 6

/** The chord under each four-beat block from the drop, then the end card's cadence. */
function chordAt(beat: number): string {
  if (beat < DROP) return beat < 4 ? 'F' : 'C'
  if (beat >= FINAL) return 'F'
  const cta = beatOf(SCENE_STARTS.cta)
  if (beat >= cta) return beat < cta + 4 ? 'Bb' : 'C'
  return ['F', 'C', 'Dm', 'Bb'][Math.floor((beat - DROP) / 4) % 4]
}

// The bell's tune over one pass of F–C–Dm–Bb, as (beat in the four bars, note, length in beats).
const TUNE: [number, string, number][] = [
  [0, 'C5', 0.5], [0.5, 'F5', 0.5], [1, 'A5', 0.5], [1.5, 'G5', 0.5], [2, 'F5', 1], [3, 'C5', 0.5], [3.5, 'D5', 0.5],
  [4, 'E5', 0.5], [4.5, 'G5', 0.5], [5, 'C6', 0.75], [6, 'G5', 0.5], [6.5, 'E5', 0.5], [7, 'D5', 1],
  [8, 'F5', 0.5], [8.5, 'A5', 0.5], [9, 'D6', 0.75], [10, 'C6', 0.5], [10.5, 'A5', 0.5], [11, 'F5', 0.5], [11.5, 'G5', 0.5],
  [12, 'F5', 0.5], [12.5, 'D5', 0.5], [13, 'Bb4', 0.5], [13.5, 'D5', 0.5], [14, 'F5', 1.5], [15.5, 'C5', 0.5],
]

function compose() {
  const rng = random(20261006)
  const total = SECONDS + 0.05
  const drums = new Stereo(total)
  const music = new Stereo(total) // pumped by the kick
  const lead = new Stereo(total)
  const send = new Stereo(total)
  const fx = new Stereo(total)

  const both = (bus: Stereo, buffer: Float32Array, time: number, gain: number, pan = 0, wet = 0) => {
    bus.place(buffer, time, gain, pan)
    if (wet) send.place(buffer, time, gain * wet, pan)
  }

  const kicks: number[] = []
  const end = beatOf(DURATION)

  // ---- the hook: an impact, a rising sparkle with the title, a riser into the drop
  kicks.push(0)
  both(fx, crash(rng), 0, 0.3)
  both(music, bass(note('F1'), 1.2), 0, 0.5)
  ;['C5', 'F5', 'A5', 'C6', 'F6'].forEach((n, i) => both(lead, bell(note(n), 0.4), at(0.25 + i * 0.25), 0.22, 0.2, 0.5))
  both(fx, riser(rng, at(DROP) - at(DROP - 2)), at(DROP - 2), 0.3)
  kicks.push(4)

  // ---- groove
  for (let beat = 0; beat < end; beat += 0.5) {
    const chord = chordAt(beat)
    const [root, tones] = CHORDS[chord]
    const inGroove = beat >= DROP && beat < FINAL
    const onBeat = beat % 1 === 0

    // Marimba arpeggio in eighths: up through the chord and back.
    const step = Math.round(beat * 2) % 8
    const tone = tones[[0, 1, 2, 3, 2, 1, 2, 3][step]]
    if (beat < FINAL) both(music, marimba(note(tone)), at(beat), (onBeat ? 0.2 : 0.14) * (inGroove ? 1 : 0.8), -0.3 + 0.12 * Math.sin(beat), 0.3)

    if (!inGroove) continue
    if (onBeat) {
      kicks.push(beat)
      if ((beat - DROP) % 2 === 1) both(drums, clap(rng), at(beat), 0.3, -0.08, 0.35)
    } else {
      both(drums, hat(rng, Math.round(beat * 2) % 8 === 7), at(beat), 0.11, 0.35)
    }
    // From the stages scene on: sixteenth ghost hats for more drive.
    if (beat >= beatOf(SCENE_STARTS.stages)) both(drums, hat(rng), at(beat + 0.25), 0.045, 0.45)

    // Bass: a bouncy figure every four beats.
    if ((beat - DROP) % 4 === 0) {
      const r = note(root)
      const figure: [number, number, number, number][] = [
        [0, 1, 0.4, 0.55], [0.75, 1, 0.2, 0.35], [1.5, 2, 0.25, 0.4], [2, 1, 0.4, 0.5], [2.75, 1.5, 0.2, 0.35], [3.5, 2, 0.3, 0.4],
      ]
      for (const [offset, ratio, length, gain] of figure) {
        if (beat + offset < FINAL) both(music, lowpass(bass(r * ratio, length * B), 1600), at(beat + offset), gain)
      }
      // Pad: the chord held through the block, two detuned voices a side.
      for (const [j, t] of tones.slice(0, 3).entries()) {
        for (const [cents, pan] of [[-8, -0.6], [8, 0.6]] as const) {
          const pad = lowpass(voice(SAW, note(t) / 2, 4 * B - 0.05, 0.12, 0.4, cents), 1500)
          both(music, pad, at(beat), 0.045, pan * (0.6 + 0.15 * j), 0.6)
        }
      }
    }
  }

  // ---- the bell's tune, from the drop until the end card's cadence
  const cta = beatOf(SCENE_STARTS.cta)
  for (let start = DROP; start < cta; start += 16) {
    for (const [offset, n, length] of TUNE) {
      const beat = start + offset
      if (beat >= cta) break
      both(lead, bell(note(n), length * B), at(beat), 0.24, 0.15, 0.5)
      // The second pass gets a quiet octave above, for a lift.
      if (start > DROP) both(lead, bell(note(n) * 2, length * B), at(beat), 0.06, -0.2, 0.6)
    }
  }
  // The end card's answer, leading into the last chord.
  ;([[0, 'A5', 1], [1, 'G5', 1], [2, 'F5', 1], [3, 'D5', 1], [4, 'E5', 0.5], [4.5, 'G5', 0.5], [5, 'C6', 1]] as const).forEach(([offset, n, length]) =>
    both(lead, bell(note(n), length * B), at(cta + offset), 0.24, 0.15, 0.5),
  )

  // ---- every wipe: a whoosh into it and a crash on it
  for (const frame of Object.values(SCENE_STARTS)) {
    if (frame === 0) continue
    both(fx, whoosh(rng), Math.max(0, frame / FPS - 0.12), 0.32, 0)
    both(fx, crash(rng), frame / FPS + B, 0.17, 0.2)
  }
  both(fx, riser(rng, at(2)), at(FINAL - 2), 0.22)

  // ---- the last chord: rings out with the end card
  kicks.push(FINAL)
  both(fx, crash(rng), at(FINAL), 0.32)
  both(music, bass(note('F1'), 2.4), at(FINAL), 0.6)
  ;['F4', 'A4', 'C5', 'F5', 'A5', 'C6'].forEach((n, i) => {
    both(music, marimba(note(n), 1.6), at(FINAL) + i * 0.035, 0.18, -0.4 + i * 0.16, 0.5)
    both(lead, bell(note(n), 2), at(FINAL) + 0.12 + i * 0.07, 0.14, -0.3 + i * 0.12, 0.6)
  })
  for (const t of ['F3', 'A3', 'C4', 'F4']) {
    const pad = lowpass(voice(SAW, note(t), SECONDS - at(FINAL) - 0.6, 0.05, 0.6), 1800)
    both(music, pad, at(FINAL), 0.05, 0, 0.7)
  }

  // Kicks, and the pump they give everything else (a sidechain duck).
  const pump = new Float32Array(samples(total)).fill(1)
  for (const beat of kicks) {
    drums.place(kick(), at(beat), 0.85)
    const start = samples(at(beat))
    for (let i = start; i < Math.min(pump.length, start + samples(0.45)); i++) {
      pump[i] = Math.min(pump[i], 1 - 0.5 * Math.exp(-(i - start) / SR / 0.1))
    }
  }

  const wet = reverb(send)
  const master = new Stereo(total)
  master.mix(drums)
  master.mix(music, 1, pump)
  master.mix(lead)
  master.mix(fx)
  master.mix(wet, 0.85)

  // Master: a low cut, gentle saturation, and a fade over the last half second.
  const left = highpass(master.left, 30)
  const right = highpass(master.right, 30)
  const out = new Stereo(SECONDS)
  const fadeFrom = samples(SECONDS - 0.5)
  let top = 1e-9
  for (let i = 0; i < out.left.length; i++) top = Math.max(top, Math.abs(left[i]), Math.abs(right[i]))
  for (let i = 0; i < out.left.length; i++) {
    const fade = i < fadeFrom ? 1 : 1 - (i - fadeFrom) / (out.left.length - fadeFrom)
    out.left[i] = (Math.tanh((1.4 * left[i]) / top) / Math.tanh(1.4)) * fade
    out.right[i] = (Math.tanh((1.4 * right[i]) / top) / Math.tanh(1.4)) * fade
  }
  return out
}

mkdirSync(dirname(OUT), { recursive: true })
const started = Date.now()
const track = compose()
writeWav(OUT, track, 0.89)
console.log(`${OUT}  ${(track.left.length / SR).toFixed(2)} s stereo, ${((Date.now() - started) / 1000).toFixed(1)} s to render`)
