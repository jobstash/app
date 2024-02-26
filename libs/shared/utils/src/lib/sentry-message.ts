import * as Sentry from '@sentry/nextjs';
import { type SeverityLevel } from '@sentry/nextjs';

import { IS_DEBUG } from '@jobstash/shared/core';

export const sentryMessage = (
  label: string,
  msg: string,
  level?: SeverityLevel,
) => {
  const message = `${label}: ${msg}`;
  if (process.env.NODE_ENV === 'production' && !IS_DEBUG) {
    Sentry.captureMessage(message, level ?? 'debug');
  } else {
    console.log(message);
  }
};
