import { ERR_INTERNAL } from '@jobstash/shared/core';

import { sentryMessage } from './sentry-message';

export const getJobListLimitEnv = (): string => {
  const limit = process.env.NEXT_PUBLIC_PAGE_SIZE;

  if (!limit) {
    sentryMessage('getJobListLimitEnv', `missing env: NEXT_PUBLIC_PAGE_SIZE`);
    throw new Error(ERR_INTERNAL);
  }

  return limit;
};
