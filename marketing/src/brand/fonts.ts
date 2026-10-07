import { loadFont } from '@remotion/fonts'
import { staticFile } from 'remotion'

/**
 * Lahzeh, the type of the game, its site and every ad and banner (public/fonts, from "Lahzeh Eco 2"):
 * Regular for body text, Bold for labels, ExtraBold for titles. Its Persian digits come with
 * Persian code points, its Latin ones with Latin.
 */
export const fontsLoaded = Promise.all(
  [
    ['400', 'Lahzeh-Regular.woff2'],
    ['700', 'Lahzeh-Bold.woff2'],
    ['800', 'Lahzeh-ExtraBold.woff2'],
  ].map(([weight, file]) => loadFont({ family: 'Lahzeh', url: staticFile(`fonts/${file}`), weight, display: 'block' })),
)
