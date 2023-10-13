import * as Sentry from '@sentry/nextjs';
import { type SeverityLevel } from '@sentry/nextjs';

export const sentryMessage = (
  label: string,
  msg: string,
  level?: SeverityLevel,
) => {
  const message = `${label}: ${msg}`;
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureMessage(message, level ?? 'debug');
  } else {
    console.log(message);
  }
};
