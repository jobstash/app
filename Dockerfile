# FROM node:18-alpine AS base

# FROM base as build-web
# RUN yarn global add pnpm
# RUN apk add --no-cache libc6-compat
# WORKDIR /jobstash
# COPY . .
# RUN pnpm i --frozen-lockfile
# RUN pnpm build

# FROM base as run-prod
# RUN yarn global add pnpm
# RUN apk add --no-cache libc6-compat
# WORKDIR /jobstash

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# COPY --from=build-web --chown=nextjs:nodejs /jobstash/dist ./dist
# WORKDIR /jobstash/dist/apps/web
# RUN pnpm i
# ENV NODE_ENV production

# USER nextjs

# CMD ["pnpm", "start"]

FROM node:18-alpine AS base

FROM base as deps
RUN apk add --no-cache libc6-compat
WORKDIR /jobstash
COPY package.json pnpm-lock.yaml* ./
RUN yarn global add pnpm && pnpm i --frozen-lockfile
# RUN yarn install --frozen-lockfile

FROM base as builder
RUN yarn global add pnpm
WORKDIR /jobstash
COPY --from=deps /jobstash/node_modules ./node_modules
COPY . .
RUN pnpm build
# RUN yarn build

FROM base AS runner
WORKDIR /jobstash

ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder --chown=nextjs:nodejs /jobstash/dist/apps/web/.next/standalone ./
COPY --from=builder /jobstash/apps/web/public ./apps/web/public
COPY --from=builder --chown=nextjs:nodejs /jobstash/dist/apps/web/.next/static ./dist/apps/web/.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "apps/web/server.js"]