# The blog as one small image: `pnpm build` writes a self-contained server to .next/standalone
# (with public/ and the static assets copied in), and the image runs only that, no node_modules.
#
#   docker build -t puzzlebazi-blog .
#   docker run --rm -p 3200:3000 puzzlebazi-blog     → http://localhost:3200

FROM node:24-alpine AS base
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

# ---- Dependencies, cached until package.json or the lockfile changes ----
FROM base AS deps
# pnpm 12 is a native binary per platform; its install script picks the one for this image (musl).
RUN npm install -g --allow-scripts=pnpm pnpm@12.4.1
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ---- Build: type-checks, renders every page to static HTML, assembles .next/standalone ----
FROM deps AS build
COPY . .
RUN pnpm build

# ---- Run ----
FROM base AS run
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0
RUN addgroup -S -g 1001 blog && adduser -S -u 1001 -G blog blog
# Owned by the app's user, so Next.js can write its image cache to .next/cache.
COPY --from=build --chown=blog:blog /app/.next/standalone ./
USER blog
EXPOSE 3000
CMD ["node", "server.js"]
