# پازل‌بازی استودیو: ads

The studio's ads and banners, written as code with [Remotion](https://www.remotion.dev) (React)
and rendered to MP4 and JPEG. Every frame is drawn programmatically: the game's flat art as SVG,
the type in Lahzeh, the music synthesized from the same timeline as the pictures. Nothing is
filmed or recorded, so an ad can be changed, re-timed or translated and rendered again.

This package stands on its own: its own `package.json`, lockfile and TypeScript setup, its own
copies of the art and fonts. It lives next to the site but never imports from it.

```bash
pnpm install
pnpm studio                     # Remotion Studio: preview, scrub and tweak every composition
pnpm music                      # synthesizes the ads' music into public/music/ (studio and render do it first)
pnpm render                     # every ad at every size → out/*.mp4
pnpm render:ad                  # Sort Puzzle's launch ad, both sizes
pnpm render sort-puzzle-launch-myket                 # its Myket-only cut (16:9)
pnpm render sort-puzzle-launch-bazaar                # its Cafe Bazaar-only cut (16:9)
pnpm render sort-puzzle-launch --frames 60,130,295   # stills of some frames, to check a layout
pnpm render:stills              # the banners and share images → out/stills/*.jpg
pnpm typecheck
```

The first render downloads Remotion's headless Chrome (`pnpm exec remotion browser ensure` does it
ahead of time). `out/` is not committed: render to get the files.

## Sort Puzzle: launch ad

`src/ads/sort-puzzle-launch/`, 28.5 s at 30 fps, in Persian, rendered at two sizes from one scene
graph whose layouts adapt to the frame:

| Composition | Size | For |
| --- | --- | --- |
| `sort-puzzle-launch-16x9` | 1920 × 1080 | YouTube, Aparat, Telegram, the site |
| `sort-puzzle-launch-9x16` | 1080 × 1920 | Instagram Reels and Stories, phone ads |
| `sort-puzzle-launch-myket-16x9` | 1920 × 1080 | Myket's channels: the same ad, its end card with only the Myket badge |
| `sort-puzzle-launch-bazaar-16x9` | 1920 × 1080 | Cafe Bazaar's channels: the same ad, its end card with only the Cafe Bazaar badge |

H.264 (High, BT.709) with 192 kb/s AAC; the soundtrack is normalized to -14 LUFS, 1.5 dB under full
scale, after rendering.

It follows the purpose of an install ad, one beat per idea, each in a store banner's colors:

| Scene | Seconds | What it shows |
| --- | --- | --- |
| Hook | 0–3.5 | «رنگ‌ها را مرتب کن!»: four bottles of mixed colors drop in and fidget (butter) |
| Play | 3–10.5 | The core loop on the game's board: a hand taps, four pours with level liquid, two bottles fill with one color, «عالی!» and three stars (lavender ground, the game's HUD) |
| Stages | 10–13.5 | «+۱٬۰۰۰ مرحله در ۱۰ دنیا» counting up, the ten worlds' pills (mint) |
| Challenges | 13–17.5 | «۹ چالش ویژه»: the nine mechanics' cards (sky) |
| Designs | 17–20.5 | «ده‌ها طرح بطری»: the ten bottle forms on two shelves, with rarity ribbons (pink) |
| Rewards | 20–23.5 | «هر روز جایزه!»: the chest opens, coins fly, stars, day 7 and 40 achievements (lilac) |
| End card | 23–28.5 | The icon, the logo, «رنگ‌ها را بریز، مرتب کن، ببر!», free for Android, Cafe Bazaar and Myket badges, the studio (violet) |

Scenes overlap by a one-beat circle wipe. `timeline.ts` holds when everything happens; both the
composition and the music read it, so every cut, pour and the last chord land on the beat. The
words are in `copy.ts`: an English cut needs a second copy and the layout's `direction`.

### Music and sound

`scripts/make-music.ts` (with `scripts/lib/dsp.ts`, no dependencies) composes an original cue for
the ad in F major at 120 BPM, as long as the ad: an impact and a rising bell sparkle under the
hook, the drop on the first pour (four-on-the-floor kick pumping the rest, a bouncy bass, marimba
arpeggios, clap, hats, a bell tune over F–C–Dm–Bb), a whoosh and crash on every wipe, and a final
F major chord that rings out under the end card. It is deterministic, so `pnpm music` always
writes the same `public/music/sort-puzzle-launch.wav` (not committed; `studio` and `render` make it
first). It shares the game's instruments (marimba
and bell) but is brighter and faster than the game's calm loop.

The effects are the game's own (`public/sfx/`, copied from `Assets/SortFactory/Audio`): taps,
pours, a bottle filling, the win, stars, coins and the reward, each placed on its frame.

### Rules the copy keeps

The same as the site's: no promise that every stage is solvable, no «کاملاً فارسی», the stage
count only as "+۱۰۰۰" (it keeps growing), the game only from Cafe Bazaar and Myket (no APK), and
credit to پازل‌بازی استودیو.

## Banners and share images

`src/stills/`: `sort-puzzle-share-fa` and `-en` (1200 × 630) are the site's share previews for
Sort Puzzle's page; copy `out/stills/*.jpg` to the site's `public/og/sort-puzzle-<lang>.jpg`.

## Where things live

- `src/Root.tsx`: every composition and still, with its id and size.
- `src/brand/`: the shared look. `Bottle.tsx` (the game's flat bottle with every mechanic, with
  fractional liquid so pours animate; `liquid.ts` keeps it level at any tilt), `Forms.tsx` (the ten
  bottle forms), `Decor.tsx` (coins, stars, chest, hand, sparkles), `icons.tsx` (the UI kit's line
  icons and round buttons), `ui.tsx` (the sunburst, the ground, stroked titles, pills, stickers),
  `palette.ts`, `motion.ts` (springs and eases), `wipe.tsx` (the circle wipe), `fonts.ts` (Lahzeh).
- `src/ads/<ad>/`: one folder per ad: `index.tsx`, `timeline.ts`, `copy.ts`, `scenes/`.
- `public/`: fonts, the game's logo and icon, the store badges, the studio's
  logotype, the game's sound effects and the ads' music.
- `scripts/render.ts`: renders and normalizes; `scripts/make-music.ts`: the music.

## Adding an ad

1. Make a folder in `src/ads/` with its timeline, copy and scenes (reuse `src/brand/`).
2. Register its compositions in `src/Root.tsx`, one per size.
3. List them in `ADS` in `scripts/render.ts`; give it music in `scripts/make-music.ts` if it needs
   its own.

## Licenses

Lahzeh is a commercial typeface (the "Lahzeh Eco 2" kit); use it within its license. Remotion is
free for individuals and companies of up to three people; larger teams need a company license
(remotion.pro).
