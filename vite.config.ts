import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'

const isFile = (path: string) => existsSync(path) && statSync(path).isFile()

/**
 * Makes `vite preview` answer like the static hosts the site is deployed to. Out of the box it
 * serves index.html (the redirect from "/") for every unknown path.
 */
function staticHostPreview(): Plugin {
  return {
    name: 'static-host-preview',
    config: (_, { isPreview }) => (isPreview ? { appType: 'mpa' } : undefined),
    configurePreviewServer(server) {
      const root = resolve(server.config.root, server.config.environments.client.build.outDir)
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

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), staticHostPreview()],
})
