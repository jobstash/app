import { ERR_INTERNAL } from '@jobstash/shared/core';

import { sentryMessage } from './sentry-message';

export const getEdgeUrl = (): string => {
  const edgeUrl = process.env.NEXT_PUBLIC_EDGE_URL;

  if (!edgeUrl) {
    sentryMessage('getEdgeUrl', 'missing env: NEXT_PUBLIC_EDGE_URL');
    throw new Error(ERR_INTERNAL);
  }

  return edgeUrl;
};
