FROM node:18-alpine AS base

FROM base as build-web
RUN yarn global add pnpm
RUN apk add --no-cache libc6-compat
WORKDIR /jobstash
COPY . .
RUN pnpm i --frozen-lockfile
RUN pnpm build

FROM base as run-prod
RUN yarn global add pnpm
RUN apk add --no-cache libc6-compat
WORKDIR /jobstash
COPY --from=build-web --chown=nextjs:nodejs /jobstash/dist ./dist
WORKDIR /jobstash/dist/apps/web
RUN pnpm i
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

CMD ["pnpm", "start"]
