import * as Sentry from '@sentry/nextjs';
import { type SeverityLevel } from '@sentry/nextjs';

export const sentryMessage = (
  label: string,
  msg: string,
  level?: SeverityLevel,
) => {
  Sentry.captureMessage(`${label}: ${msg}`, level ?? 'debug');
};
