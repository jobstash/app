import { ERR_INTERNAL } from '@jobstash/shared/core';

import { sentryMessage } from './sentry-message';

export const getFrontendUrl = (): string => {
  const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;

  if (!frontendUrl) {
    sentryMessage('frontendUrl', `missing env: NEXT_PUBLIC_FRONTEND_URL`);
    throw new Error(ERR_INTERNAL);
  }

  return frontendUrl;
};
