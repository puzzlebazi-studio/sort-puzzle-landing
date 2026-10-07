/**
 * Renders the ads to out/.
 *
 *     pnpm render                        every ad, every size
 *     pnpm render sort-puzzle-launch     one ad (both 16:9 and 9:16)
 *     pnpm render sort-puzzle-launch --frames 60,130,295
 *                                        stills of those frames instead, to check a layout fast
 *     pnpm render stills                 the banners and share images, as JPEGs in out/stills/
 *
 * Videos are H.264 with AAC audio at 30 fps. Afterwards their sound is normalized to -14 LUFS
 * (the level Instagram, YouTube and Aparat play at) with Remotion's own ffmpeg, in two passes,
 * leaving the video stream untouched.
 */
import { spawnSync } from 'node:child_process'
import { mkdirSync, renameSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { bundle } from '@remotion/bundler'
import { renderMedia, renderStill, selectComposition } from '@remotion/renderer'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'out')

/** Each ad and the compositions (see src/Root.tsx) it renders. */
const ADS: Record<string, string[]> = {
  'sort-puzzle-launch': ['sort-puzzle-launch-16x9', 'sort-puzzle-launch-9x16'],
  stills: ['sort-puzzle-share-fa', 'sort-puzzle-share-en'],
}

const args = process.argv.slice(2)
const framesFlag = args.indexOf('--frames')
const frames = framesFlag >= 0 ? args[framesFlag + 1].split(',').map(Number) : null
const names = args.filter((arg, i) => !arg.startsWith('--') && (framesFlag < 0 || i !== framesFlag + 1))
const ads = names.length > 0 ? names : Object.keys(ADS)
for (const ad of ads) if (!ADS[ad]) throw new Error(`No ad called "${ad}". Ads: ${Object.keys(ADS).join(', ')}`)

mkdirSync(OUT, { recursive: true })
console.log('Bundling…')
const serveUrl = await bundle({ entryPoint: join(ROOT, 'src', 'index.ts'), publicDir: join(ROOT, 'public') })

for (const ad of ads) {
  for (const id of ADS[ad]) {
    const composition = await selectComposition({ serveUrl, id })
    if (composition.durationInFrames === 1) {
      const output = join(OUT, 'stills', `${id}.jpg`)
      mkdirSync(dirname(output), { recursive: true })
      await renderStill({ serveUrl, composition, output, imageFormat: 'jpeg', jpegQuality: 90 })
      console.log(output)
      continue
    }
    if (frames) {
      for (const frame of frames) {
        const output = join(OUT, 'preview', `${id}-${String(frame).padStart(4, '0')}.png`)
        mkdirSync(dirname(output), { recursive: true })
        await renderStill({ serveUrl, composition, frame, output, imageFormat: 'png' })
        console.log(output)
      }
      continue
    }
    const output = join(OUT, `${id}.mp4`)
    const raw = output.replace(/\.mp4$/, '.raw.mp4')
    let last = -1
    await renderMedia({
      serveUrl,
      composition,
      codec: 'h264',
      audioCodec: 'aac',
      audioBitrate: '192k',
      crf: 18,
      pixelFormat: 'yuv420p',
      colorSpace: 'bt709',
      imageFormat: 'jpeg',
      jpegQuality: 92,
      outputLocation: raw,
      onProgress: ({ progress }) => {
        const pct = Math.floor(progress * 10) * 10
        if (pct !== last) {
          last = pct
          process.stdout.write(`${id}: ${pct}%\n`)
        }
      },
    })
    normalizeLoudness(raw, output)
    console.log(output)
  }
}

/** Two-pass EBU R128 loudness normalization of the audio track; the video is copied as is. */
function normalizeLoudness(input: string, output: string) {
  const ffmpeg = (...ffArgs: string[]) => spawnSync('pnpm', ['exec', 'remotion', 'ffmpeg', ...ffArgs], { cwd: ROOT, encoding: 'utf8' })
  const target = 'I=-14:TP=-1.5:LRA=11'
  const measure = ffmpeg('-hide_banner', '-i', input, '-vn', '-af', `loudnorm=${target}:print_format=json`, '-f', 'null', '-')
  const json = (measure.stderr + measure.stdout).match(/\{[\s\S]*?"target_offset"[\s\S]*?\}/)
  if (!json) {
    console.warn('Could not measure loudness; keeping the audio as rendered.')
    renameSync(input, output)
    return
  }
  const m = JSON.parse(json[0])
  const filter = `loudnorm=${target}:measured_I=${m.input_i}:measured_TP=${m.input_tp}:measured_LRA=${m.input_lra}:measured_thresh=${m.input_thresh}:offset=${m.target_offset}:linear=true`
  const run = ffmpeg('-hide_banner', '-y', '-i', input, '-c:v', 'copy', '-af', filter, '-ar', '48000', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', output)
  if (run.status !== 0) throw new Error(`ffmpeg failed:\n${run.stderr}`)
  spawnSync('rm', [input])
  console.log(`  audio: ${m.input_i} LUFS → -14 LUFS`)
}
