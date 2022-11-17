FROM node:alpine AS nodebase
RUN apk add --no-cache libc6-compat
RUN apk update
RUN npm add --location=global pnpm turbo

FROM nodebase AS builder
WORKDIR /app
COPY . .
RUN turbo prune --scope=api --docker

FROM nodebase AS installer
WORKDIR /app

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile

COPY --from=builder /app/out/full/ ./
COPY turbo.json turbo.json
RUN turbo run build --filter=api
RUN pnpm prune --prod

FROM nodebase AS runner
WORKDIR /app

COPY --from=installer /app/apps/api/package.json .
COPY --from=installer /app/node_modules ./node_modules
COPY --from=installer /app/apps/api/node_modules ./apps/api/node_modules

COPY --from=installer /app/apps/api/dist ./apps/api/dist

CMD node apps/api/dist/index.js