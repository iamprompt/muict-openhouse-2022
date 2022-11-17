FROM node:alpine AS nodebase
RUN apk add --no-cache libc6-compat
RUN apk update
RUN npm add --location=global pnpm turbo

FROM nodebase AS builder
WORKDIR /app
COPY . .
RUN turbo prune --scope=web --docker
RUN rm -rf /app/out/full/*/*/node_modules

FROM nodebase AS installer
WORKDIR /app

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --filter=web

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN turbo run build --filter=web
RUN pnpm prune --prod

FROM nodebase AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/web/next.config.js ./apps/web/next.config.js
COPY --from=installer /app/apps/web/next-i18next.config.js ./apps/web/next-i18next.config.js
COPY --from=installer /app/apps/web/package.json ./apps/web/package.json
COPY --from=installer /app/node_modules ./node_modules
COPY --from=installer /app/apps/web/node_modules ./apps/web/node_modules
COPY --from=installer /app/apps/web/public ./apps/web/public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next ./apps/web/.next

WORKDIR /app/apps/web

CMD ["pnpm", "start"]