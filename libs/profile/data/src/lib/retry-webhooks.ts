import {
  ATSPlatformName,
  RetryWebhooksPayload,
  retryWebhooksPayloadSchema,
  RetryWebhooksResponse,
  retryWebhooksResponseSchema,
} from '@jobstash/profile/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const retryWebhooks = async (
  platform: ATSPlatformName,
  payload: RetryWebhooksPayload,
) => {
  const url = `${MW_URL}/scorer/webhooks/${platform}`;

  const options = {
    method: 'POST' as const,
    responseSchema: retryWebhooksResponseSchema,
    sentryLabel: `retryWebhooks`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: retryWebhooksPayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await mwFetch<RetryWebhooksResponse, RetryWebhooksPayload>(
    url,
    options,
  );

  if (!response.success) throw new Error(response.message);

  return response.data;
};
