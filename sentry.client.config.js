// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn:
      SENTRY_DSN ||
      'https://714cca1095c042fda9f542dde5ed7063@o4504495959703552.ingest.sentry.io/4504519276363776',
    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 1,
    // ...
    // Note: if you want to override the automatic release value, do not set a
    // `release` value here - use the environment variable `SENTRY_RELEASE`, so
    // that it will also get attached to your source maps
  });
}
