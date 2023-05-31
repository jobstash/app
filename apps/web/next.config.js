// @ts-check

const { withNx } = require('@nx/next');
const { withSentryConfig } = require('@sentry/nextjs');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  experimental: {
    appDir: false,
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
