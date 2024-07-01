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
COPY package.json pnpm-lock.yaml* .npmrc ./
RUN yarn global add pnpm && pnpm i --frozen-lockfile
# RUN yarn install --frozen-lockfile

FROM base as builder
RUN yarn global add pnpm
WORKDIR /jobstash
COPY --from=deps /jobstash/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
ENV NEXT_PUBLIC_MW_URL=https://middleware.jobstash.xyz
ENV NEXT_PUBLIC_FRONTEND_URL=https://jobstash.xyz
ENV NEXT_PUBLIC_EDGE_URL=https://edge-staging.vercel.app
ENV NEXT_PUBLIC_JOB_FRAME_URL=https://job-frame.vercel.app
ENV NEXT_PUBLIC_PAGE_SIZE=20
ENV NEXT_PUBLIC_QUERY_RETRY_COUNT=0
ENV NEXT_PUBLIC_INFURA_ID=805a91964ce748f7b7b3d0c787ad7783
ENV NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=d6b3203f9238276df2440599c3497e69
ENV NEXT_PUBLIC_GA_MEASUREMENT_ID=G-PQSHG9DB44
ENV NEXT_PUBLIC_NEW_FEATURE_TITLE="Elite Fast Track"
ENV NEXT_PUBLIC_NEW_FEATURE_DESCRIPTION="Are you a veteran crypto builder, and are tired of being ignored when you apply for jobs? We have a solution for you. Our new feature, Elite Fast Track, connects you with job listings specifically aimed at elite builders, where you will be fast tracked in the hiring process. To find out if you're eligible, go to the Elite Fast Track page and create an account by connecting your wallet and github!"
ENV CYPRESS_INSTALL_BINARY=0

RUN pnpm build
# RUN yarn build

FROM base AS runner
WORKDIR /jobstash

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder --chown=nextjs:nodejs /jobstash/dist/apps/web/.next/standalone ./
COPY --from=builder /jobstash/apps/web/public ./apps/web/public
COPY --from=builder --chown=nextjs:nodejs /jobstash/dist/apps/web/.next/static ./dist/apps/web/.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "apps/web/server.js"]
