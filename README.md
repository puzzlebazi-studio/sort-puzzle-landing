# سورت پازل: landing page

The Persian (RTL) landing page for **سورت پازل** (Sort Factory), the color-sorting puzzle in
`../sorting-puzzle`. It only introduces the game; nothing on the page is playable.

React 19, TypeScript, Tailwind CSS 4 and Vite. Every word on the page is set in Lalezar.

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # type-checks, then writes the static site to dist/
pnpm preview    # serves dist/
pnpm lint
```

`dist/` is a plain static site, so any static host works (Netlify, Vercel, Cloudflare Pages,
Liara, an nginx folder).

## Before publishing

| What | Where |
|---|---|
| Cafe Bazaar and Myket links: they use the placeholder package `com.sortfactory.game` from Player Settings | `PACKAGE_NAME` in `src/data/site.ts` |
| Myket is shown as «به‌زودی». In-app purchases use Bazaar's Poolakey SDK, so Myket needs its own billing first | `comingSoon` on the Myket entry in `STORES` |
| Direct download: put the signed release APK at `public/downloads/sort-puzzle.apk`, and update the size note | the `apk` entry in `STORES` |
| Developer name, role, bio, skills and links. Set `avatar` to show a photo instead of the initial | `DEVELOPER` in `src/data/site.ts` |
| Share preview: `og:image` must be an absolute URL once the site has a domain | `index.html` |

Store badges are drawn in the page's own style. To use Cafe Bazaar's official badge instead,
change `src/components/StoreButton.tsx`.

## Where things live

- `src/data/site.ts`: store links, the APK and the developer.
- `src/data/content.ts`: all other copy (features, how to play, the seven difficulty tiers,
  the stage pipeline, screenshots, FAQ). Tier numbers come from the game's README.
- `src/sections/`: one component per section, in page order in `src/App.tsx`.
- `src/components/`: the game-style pieces: `Button3D`, `Title3D` (extruded gold lettering),
  `GameIcon` (round glossy badge), `TiltCard`, `Coin3D`, `Wave`, `StoreButton`, `PhoneFrame`.
- `src/components/tube/`: the SVG bottles. `lib/liquid.ts` works out each liquid layer for any
  tilt with its area kept constant, like the game's liquid shader. That is how the "pour"
  illustration shows a level surface.
- `src/index.css`: design tokens (`@theme`), and the component classes that copy the game's
  art: the chocolate outline `#3A1500`, glossy faces with a darker lip, cream panels.

## Assets

Taken from the Unity project and converted for the web:

- `src/assets/img/logo-title.webp`, `star-full.webp`: `Assets/SortFactory/Art/UI` (lossless WebP).
- `src/assets/img/shots/*.webp`: `ArtSource/Screenshots`.
- `public/fonts/Lalezar-Regular.woff2`: the supplied Lalezar TTF, compressed to WOFF2 with every
  glyph and OpenType feature kept. Lalezar is licensed under the SIL Open Font License 1.1.
- `public/og-image.jpg` and `public/apple-touch-icon.png` were rendered from the page itself.
  Re-render them if the hero changes.
