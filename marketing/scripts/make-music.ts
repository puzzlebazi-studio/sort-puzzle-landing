/**
 * Composes and renders the ads' music into public/music/<ad>.wav.
 *
 *     pnpm music
 *
 * One original, bright and bouncy cue per ad in F major at 120 BPM, as long as the ad and cut to
 * its timeline: a sparkle and a riser under the hook, the full groove from the drop (four on the
 * floor with a pumping bass, marimba arpeggios and a bell tune), a crash and a whoosh on every
 * wipe, and a last F major chord that rings out under the end card. The game's own music
 * (Tools/Audio/make_music.py) is calmer; this keeps its marimba and bell. Deterministic, no samples.
 *
 * - sort-puzzle-launch (28.5 s): the drop on the first pour, ghost hats from the stages scene.
 * - studio-generator (22.5 s): ticks under the hook while the counter runs, a hit on every stamp,
 *   and a sparkle when the one layout is left.
 * - sort-puzzle-installs (15 s): ticks under the count, and the drop, a hit and a sparkle on the
 *   frame it lands.
 */
import { mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as launch from '../src/ads/sort-puzzle-launch/timeline.ts'
import * as installs from '../src/ads/sort-puzzle-installs/timeline.ts'
import * as generator from '../src/ads/studio-generator/timeline.ts'
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

const MUSIC = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'music')

/** One ad's cue, read off its timeline. Beats count from the ad's first frame. */
interface Cue {
  /** Written to public/music/<name>.wav. */
  name: string
  seed: number
  fps: number
  /** One beat, in frames. */
  beat: number
  /** The whole ad, in frames. */
  duration: number
  /** The frame every wipe starts on (a 0 is skipped). */
  wipes: number[]
  /** Where the groove starts. */
  drop: number
  /** Where the sixteenth ghost hats join it. */
  ghosts: number
  /** Where the end card starts; the last chord lands six beats later. */
  cadence: number
  /** Sixteenth ticks from the first beat to the second, under the hook. */
  ticks?: [number, number]
  /** Beats with a stamp's hit: a crash, a low thump and a clap. */
  hits?: number[]
  /** Beats with a bell sparkle. */
  sparkles?: number[]
}

const CUES: Cue[] = [
  {
    name: 'sort-puzzle-launch',
    seed: 20261006,
    fps: launch.FPS,
    beat: launch.BEAT,
    duration: launch.DURATION,
    wipes: Object.values(launch.SCENE_STARTS),
    // The first pour, when the play scene's wipe ends.
    drop: launch.SCENE_STARTS.play / launch.BEAT,
    ghosts: launch.SCENE_STARTS.stages / launch.BEAT,
    cadence: launch.SCENE_STARTS.cta / launch.BEAT,
  },
  {
    name: 'studio-generator',
    seed: 20261025,
    fps: generator.FPS,
    beat: generator.BEAT,
    duration: generator.DURATION,
    wipes: Object.values(generator.SCENE_STARTS),
    // The filter, when the candidates start to go.
    drop: generator.SCENE_STARTS.filter / generator.BEAT,
    ghosts: generator.SCENE_STARTS.sorted / generator.BEAT,
    cadence: generator.SCENE_STARTS.end / generator.BEAT,
    ticks: [0, generator.SCENE_STARTS.filter / generator.BEAT],
    hits: (['sorted', 'range', 'duplicate'] as const).map((id) => (generator.SCENE_STARTS[id] + generator.STAMP_AT) / generator.BEAT),
    sparkles: [(generator.SCENE_STARTS.filter + generator.SURVIVOR_AT) / generator.BEAT],
  },
  {
    name: 'sort-puzzle-installs',
    seed: 20261031,
    fps: installs.FPS,
    beat: installs.BEAT,
    duration: installs.DURATION,
    wipes: Object.values(installs.SCENE_STARTS),
    // The count landing on its number.
    drop: installs.LAND / installs.BEAT,
    ghosts: installs.SCENE_STARTS.stores / installs.BEAT,
    cadence: installs.SCENE_STARTS.end / installs.BEAT,
    ticks: [0, installs.LAND / installs.BEAT],
    hits: [installs.LAND / installs.BEAT],
    sparkles: [installs.LAND / installs.BEAT],
  },
]

// Chords as (bass root, chord tones low to high).
const CHORDS: Record<string, [string, string[]]> = {
  F: ['F2', ['F4', 'A4', 'C5', 'F5']],
  C: ['C2', ['E4', 'G4', 'C5', 'E5']],
  Dm: ['D2', ['D4', 'F4', 'A4', 'D5']],
  Bb: ['Bb1', ['D4', 'F4', 'Bb4', 'D5']],
}

// The bell's tune over one pass of F–C–Dm–Bb, as (beat in the four bars, note, length in beats).
const TUNE: [number, string, number][] = [
  [0, 'C5', 0.5], [0.5, 'F5', 0.5], [1, 'A5', 0.5], [1.5, 'G5', 0.5], [2, 'F5', 1], [3, 'C5', 0.5], [3.5, 'D5', 0.5],
  [4, 'E5', 0.5], [4.5, 'G5', 0.5], [5, 'C6', 0.75], [6, 'G5', 0.5], [6.5, 'E5', 0.5], [7, 'D5', 1],
  [8, 'F5', 0.5], [8.5, 'A5', 0.5], [9, 'D6', 0.75], [10, 'C6', 0.5], [10.5, 'A5', 0.5], [11, 'F5', 0.5], [11.5, 'G5', 0.5],
  [12, 'F5', 0.5], [12.5, 'D5', 0.5], [13, 'Bb4', 0.5], [13.5, 'D5', 0.5], [14, 'F5', 1.5], [15.5, 'C5', 0.5],
]

function compose(cue: Cue) {
  const SECONDS = cue.duration / cue.fps
  const B = cue.beat / cue.fps // one beat in seconds (0.5)
  const at = (beat: number) => beat * B
  const DROP = cue.drop
  /** The final chord: two bars into the end card. */
  const FINAL = cue.cadence + 6

  /** The chord under each four-beat block from the drop, then the end card's cadence. */
  function chordAt(beat: number): string {
    if (beat < DROP) return beat < 4 ? 'F' : 'C'
    if (beat >= FINAL) return 'F'
    const cta = cue.cadence
    if (beat >= cta) return beat < cta + 4 ? 'Bb' : 'C'
    return ['F', 'C', 'Dm', 'Bb'][Math.floor((beat - DROP) / 4) % 4]
  }

  const rng = random(cue.seed)
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
  const end = cue.duration / cue.beat

  // ---- the hook: an impact, a rising sparkle with the title, a riser into the drop
  kicks.push(0)
  both(fx, crash(rng), 0, 0.3)
  both(music, bass(note('F1'), 1.2), 0, 0.5)
  ;['C5', 'F5', 'A5', 'C6', 'F6'].forEach((n, i) => both(lead, bell(note(n), 0.4), at(0.25 + i * 0.25), 0.22, 0.2, 0.5))
  both(fx, riser(rng, at(DROP) - at(DROP - 2)), at(DROP - 2), 0.3)
  kicks.push(DROP - 2)

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
    // Sixteenth ghost hats for more drive, from the cue's `ghosts` on.
    if (beat >= cue.ghosts) both(drums, hat(rng), at(beat + 0.25), 0.045, 0.45)

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
  const cta = cue.cadence
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
  for (const frame of cue.wipes) {
    if (frame === 0) continue
    both(fx, whoosh(rng), Math.max(0, frame / cue.fps - 0.12), 0.32, 0)
    both(fx, crash(rng), frame / cue.fps + B, 0.17, 0.2)
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

  // ---- the cue's own marks, after everything above so they never change another cue's randomness
  if (cue.ticks) {
    for (let beat = cue.ticks[0]; beat < cue.ticks[1]; beat += 0.25) both(drums, hat(rng), at(beat), beat % 1 === 0 ? 0.07 : 0.04, 0.3)
  }
  for (const beat of cue.hits ?? []) {
    both(fx, crash(rng), at(beat), 0.24, -0.2)
    both(music, lowpass(bass(note('F1'), 0.45), 900), at(beat), 0.55)
    both(drums, clap(rng), at(beat), 0.32, 0, 0.4)
  }
  for (const beat of cue.sparkles ?? []) {
    ;['C6', 'F6', 'A6', 'C7'].forEach((n, i) => both(lead, bell(note(n), 0.35), at(beat) + i * 0.06, 0.16, 0.25, 0.6))
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

mkdirSync(MUSIC, { recursive: true })
for (const cue of CUES) {
  const started = Date.now()
  const out = join(MUSIC, `${cue.name}.wav`)
  const track = compose(cue)
  writeWav(out, track, 0.89)
  console.log(`${out}  ${(track.left.length / SR).toFixed(2)} s stereo, ${((Date.now() - started) / 1000).toFixed(1)} s to render`)
}
