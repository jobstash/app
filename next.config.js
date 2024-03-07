const path = require('node:path');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
      {
        protocol: 'https',
        hostname: 'www.google.com',
      },
    ],
  },
  webpack: (config) => {
    // Viem fallbacks
    config.resolve.fallback = { fs: false, net: false, tls: false };

    // Build warnings
    config.externals.push('pino-pretty', 'lokijs', 'encoding');

    // Jotai multiple store instance warning
    config.resolve.alias['jotai'] = path.resolve(
      __dirname,
      'node_modules/jotai',
    );
    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
