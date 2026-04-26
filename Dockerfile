FROM node:24-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /repo

RUN corepack enable pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json ./apps/web/
COPY apps/importer/package.json ./apps/importer/
COPY packages/db/package.json packages/db/prisma ./packages/db/
RUN pnpm install --frozen-lockfile

# Build the application
FROM base AS builder
WORKDIR /repo

RUN corepack enable pnpm

COPY --from=deps /repo/node_modules ./node_modules
COPY --from=deps /repo/apps/web/node_modules ./apps/web/node_modules
COPY --from=deps /repo/apps/importer/node_modules ./apps/importer/node_modules
COPY --from=deps /repo/packages/db/node_modules ./packages/db/node_modules
COPY . .

RUN pnpm --filter @sab/db generate && pnpm --filter @sab/web build

# Production image
FROM base AS runner
WORKDIR /repo

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /repo/apps/web/public ./apps/web/public
COPY --from=builder --chown=nextjs:nodejs /repo/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /repo/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /repo/packages/db/prisma ./packages/db/prisma

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/web/server.js"]
