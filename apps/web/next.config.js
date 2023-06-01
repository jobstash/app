// @ts-check

const { withNx } = require('@nx/next');
const { withSentryConfig } = require('@sentry/nextjs');
const path = require('node:path');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  // // Nx + nextjs + docker
  output: 'standalone',

  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  experimental: {
    appDir: false,

    // // Nx + nextjs + docker
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },

  images: {
    domains: ['app.jobstash.xyz'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com',
      },
      {
        protocol: 'https',
        hostname: 'app.jobstash.xyz',
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

  redirects: async () => [
    {
      source: '/',
      destination: '/jobs',
      permanent: true,
    },
  ],

  sentry: {
    hideSourceMaps: true,
  },
};

//
// const plugins = [
//   // Add more Next.js plugins to this list if needed.
//   withNx,
//   withBundleAnalyzer,
// ];

// module.exports = composePlugins(...plugins)(nextConfig);

const sentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
};

/**
 * @param {any} phase
 */
async function withCustom(phase) {
  const nxConfig = withNx(nextConfig);
  const c = await nxConfig(phase);
  return withSentryConfig(c, sentryWebpackPluginOptions);
}

module.exports = withCustom;
