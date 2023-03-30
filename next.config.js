import * as dotenv from 'dotenv';

dotenv.config();

// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.dicebear.com',
      },
      {
        protocol: 'https',
        hostname: 'icons.llama.fi',
      },
    ],
  },
  publicRuntimeConfig: {
    publicEnvs: Object.fromEntries(
      Object.entries(process.env).filter(([key]) =>
        key.includes('NEXT_PUBLIC_'),
      ),
    ),
  },
  output: 'standalone',
};

module.exports = withSentryConfig(
  nextConfig,
  { silent: true },
  { hideSourcemaps: true },
);
