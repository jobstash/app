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
  staticPageGenerationTimeout: 300,

  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  experimental: {
    // // Nx + nextjs + docker
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com',
      },
      {
        protocol: 'https',
        hostname: 'jobstash.xyz',
      },
      {
        protocol: 'https',
        hostname: 'app.jobstash.xyz',
      },
      {
        protocol: 'https',
        hostname: 'ipfs.io',
      },
      {
        protocol: 'https',
        hostname: 'cloudflare-ipfs.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
      {
        protocol: 'https',
        hostname: 'icons.llamao.fi',
      },
      {
        protocol: 'https',
        hostname: 'chainlist.org',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'placeholder.co',
      },
      {
        protocol: 'https',
        hostname: 'twitter.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },

  sentry: {
    hideSourceMaps: true,
  },

  webpack(config) {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
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
