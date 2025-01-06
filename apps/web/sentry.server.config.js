import * as Sentry from '@sentry/nextjs';

if (
  process.env.NODE_ENV === 'production' &&
  process.env.NEXT_PUBLIC_IS_DEBUG !== 'true'
) {
  Sentry.init({
    dsn: 'https://714cca1095c042fda9f542dde5ed7063@o4504495959703552.ingest.sentry.io/4504519276363776',
    tracesSampleRate: 1,
    denyUrls: [/extensions\//i, /^chrome:\/\//i, /^chrome-extension:\/\//i],
    beforeSend(event) {
      const hasStackTrace = event?.exception?.values?.some(
        (exceptionValue) => exceptionValue.stacktrace,
      );

      if (!hasStackTrace) {
        return null;
      }

      return event;
    },
  });
}
