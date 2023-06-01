import { ERR_INTERNAL } from '@jobstash/shared/core';

import { sentryMessage } from './sentry-message';

export const getMwUrl = (): string => {
  const mwUrl = process.env.NEXT_PUBLIC_MW_URL;

  if (!mwUrl) {
    sentryMessage('getMwUrl', `missing env: NEXT_PUBLIC_MW_URL`);
    throw new Error(ERR_INTERNAL);
  }

  return mwUrl;
};
