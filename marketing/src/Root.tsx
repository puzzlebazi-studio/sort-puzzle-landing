import { Composition, Folder, Still } from 'remotion'
import { DURATION as INSTALLS_DURATION, FPS as INSTALLS_FPS, SortPuzzleInstalls } from './ads/sort-puzzle-installs'
import { DURATION, FPS, SortPuzzleLaunch } from './ads/sort-puzzle-launch'
import { DURATION as GENERATOR_DURATION, FPS as GENERATOR_FPS, StudioGenerator } from './ads/studio-generator'
import './brand/fonts'
import { SortPuzzleShare } from './stills/SortPuzzleShare'

/**
 * Every ad and banner, by game, and the studio's own reels. Each id is what `pnpm render` and
 * `remotion render` take; one scene graph per ad, rendered at each size it ships in.
 */
export function Root() {
  return (
    <>
      <Folder name="studio">
        {/* Instagram reels about the studio itself, 9:16 only. */}
        <Composition id="studio-generator-9x16" component={StudioGenerator} durationInFrames={GENERATOR_DURATION} fps={GENERATOR_FPS} width={1080} height={1920} />
      </Folder>
      <Folder name="sort-puzzle">
        <Composition id="sort-puzzle-launch-16x9" component={SortPuzzleLaunch} durationInFrames={DURATION} fps={FPS} width={1920} height={1080} />
        <Composition id="sort-puzzle-launch-9x16" component={SortPuzzleLaunch} durationInFrames={DURATION} fps={FPS} width={1080} height={1920} />
        {/* The same ad for one store's channels: its end card shows only that store's badge. */}
        <Composition
          id="sort-puzzle-launch-myket-16x9"
          component={SortPuzzleLaunch}
          durationInFrames={DURATION}
          fps={FPS}
          width={1920}
          height={1080}
          defaultProps={{ stores: ['myket'] }}
        />
        <Composition
          id="sort-puzzle-launch-bazaar-16x9"
          component={SortPuzzleLaunch}
          durationInFrames={DURATION}
          fps={FPS}
          width={1920}
          height={1080}
          defaultProps={{ stores: ['bazaar'] }}
        />
        {/* Instagram stories about the game, 9:16 only. */}
        <Composition id="sort-puzzle-installs-9x16" component={SortPuzzleInstalls} durationInFrames={INSTALLS_DURATION} fps={INSTALLS_FPS} width={1080} height={1920} />
        {/* The share previews of the game's page on the site (public/og/). */}
        <Still id="sort-puzzle-share-fa" component={SortPuzzleShare} width={1200} height={630} defaultProps={{ lang: 'fa' as const }} />
        <Still id="sort-puzzle-share-en" component={SortPuzzleShare} width={1200} height={630} defaultProps={{ lang: 'en' as const }} />
      </Folder>
    </>
  )
}
