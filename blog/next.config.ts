import path from 'node:path'
import type { NextConfig } from 'next'

/**
 * The blog lives inside the site's repository, which has its own lockfile: pin the project root
 * here, or Next.js would trace (and nest the standalone output) from the repository's root.
 */
const root = path.resolve()

const config: NextConfig = {
  // A self-contained server in .next/standalone, which the Docker image runs (see Dockerfile).
  output: 'standalone',
  outputFileTracingRoot: root,
  turbopack: { root },
  poweredByHeader: false,
  images: { formats: ['image/avif', 'image/webp'] },
  experimental: {
    // The root layout is app/[lang]/layout.tsx, so unmatched addresses get app/global-not-found.tsx.
    globalNotFound: true,
  },
  async redirects() {
    // Persian is the default language, as on puzzlebazi.studio.
    return [{ source: '/', destination: '/fa', permanent: false }]
  },
}

export default config
