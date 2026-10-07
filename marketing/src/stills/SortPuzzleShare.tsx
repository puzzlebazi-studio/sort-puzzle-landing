import { Img, staticFile } from 'remotion'
import { BOTTLE_WIDTH, BottleArt, originForLip, pourTilt, runsOf, Stream } from '../brand/Bottle'
import { Sparkle } from '../brand/Decor'
import { FACE } from '../brand/palette'
import { fa, Pill, StrokeText, Sunburst, useLayout } from '../brand/ui'
import { Frame } from '../ads/sort-puzzle-launch/parts'

const WORDS = {
  fa: { tagline: 'رنگ‌ها را بریز، مرتب کن، ببر!', chips: [`${fa(1000)}+ مرحله`, '۹ چالش ویژه', 'رایگان'] },
  en: { tagline: 'Pour, sort, win!', chips: ['1,000+ stages', '9 challenges', 'Free'] },
}
const CHIP_FACES = [FACE.butter, FACE.mint, FACE.pink]

/**
 * The share preview of Sort Puzzle's page (public/og/sort-puzzle-<lang>.jpg on the site): the
 * logo, its line and a pour, in the game's flat art.
 */
export function SortPuzzleShare({ lang }: { lang: 'fa' | 'en' }) {
  const { width, height } = useLayout()
  const rtl = lang === 'fa'
  const words = WORDS[lang]
  // The text sits at the reading side's start, the pour at its end.
  const textX = rtl ? 810 : 340
  const artX = rtl ? 40 : 640

  const s = 0.62
  const into = { x: 2 * (BOTTLE_WIDTH + 70) + BOTTLE_WIDTH / 2, y: 0 }
  const lip = { x: into.x - 64, y: into.y - 110 }
  const tilt = pourTilt(2) + 6
  const origin = originForLip(tilt, lip)

  return (
    <Frame>
      <div style={{ position: 'absolute', inset: 0, direction: rtl ? 'rtl' : 'ltr' }}>
        <Sunburst tone="violet" at={[rtl ? 0.25 : 0.75, 0.55]} speed={0} />
        <svg width={width} height={height} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
          <g transform={`translate(${artX} ${height - 40 - 437 * s}) scale(${s})`}>
            <BottleArt liquid={runsOf([0, 0, 0, 0])} done={1} />
            <g transform={`translate(${BOTTLE_WIDTH + 70} 0)`}>
              <BottleArt liquid={runsOf([1, 3, 1, 3])} />
            </g>
            <g transform={`translate(${2 * (BOTTLE_WIDTH + 70)} 0)`}>
              <BottleArt liquid={runsOf([4, 2, 2])} />
            </g>
            <Stream from={{ x: lip.x + 6, y: lip.y + 4 }} to={{ x: into.x, y: into.y + 8 }} color={2} />
            <g transform={`translate(${origin.x} ${origin.y}) rotate(${tilt})`}>
              <BottleArt liquid={runsOf([3, 2])} tilt={tilt} />
            </g>
          </g>
        </svg>

        <div style={{ position: 'absolute', left: textX, top: 70, transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26 }}>
          {rtl ? (
            <Img src={staticFile('sort-puzzle/logo-title.png')} style={{ width: 600, display: 'block' }} />
          ) : (
            <StrokeText size={108}>
              <span style={{ color: FACE.butter }}>Sort</span> <span style={{ color: FACE.coral }}>Puzzle</span>
            </StrokeText>
          )}
          <Pill size={rtl ? 40 : 36} dark>
            {words.tagline}
          </Pill>
          <div style={{ display: 'flex', gap: 14, marginTop: 6 }}>
            {words.chips.map((chip, i) => (
              <Pill key={chip} size={rtl ? 28 : 24} face={CHIP_FACES[i]}>
                {chip}
              </Pill>
            ))}
          </div>
        </div>

        <Sparkle size={44} style={{ left: rtl ? 420 : 740, top: 60 }} />
        <Sparkle size={30} gold style={{ left: rtl ? 90 : 1110, top: 160 }} />
        <Sparkle size={26} style={{ left: rtl ? 1150 : 30, top: 560 }} />
      </div>
    </Frame>
  )
}
