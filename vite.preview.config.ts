import { existsSync, readFileSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'

const isFile = (path: string) => existsSync(path) && statSync(path).isFile()

/**
 * Answers like the static hosts the site is deployed to. Out of the box `vite preview` serves
 * index.html (the redirect from "/") for every unknown path.
 */
function staticHostPreview(): Plugin {
  return {
    name: 'static-host-preview',
    configurePreviewServer(server) {
      const root = resolve(server.config.root, server.config.build.outDir)
      return () => {
        server.middlewares.use((req, res, next) => {
          const { pathname, search } = new URL(req.url ?? '/', 'http://localhost')
          const path = join(root, decodeURIComponent(pathname))
          // Files, including the index.html Vite found for a folder, are served next.
          if (isFile(path)) return next()
          // A page's folder without its trailing slash.
          if (isFile(join(path, 'index.html'))) {
            res.writeHead(301, { Location: `${pathname}/${search}` }).end()
            return
          }
          res.writeHead(404, { 'Content-Type': 'text/html' }).end(readFileSync(join(root, '404.html')))
        })
      }
    },
  }
}

// `pnpm preview`: serves the built site in dist/, nothing else. (React Router's own preview server,
// which renders the pages during the build, uses vite.config.ts.)
export default defineConfig({
  appType: 'mpa',
  build: { outDir: 'dist' },
  plugins: [staticHostPreview()],
})
