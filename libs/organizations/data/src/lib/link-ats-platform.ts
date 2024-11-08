import {
  ATSPlatformName,
  LinkATSPlatformPayload,
  linkATSPlatformPayloadSchema,
} from '@jobstash/organizations/core';
import {
  MessageResponse,
  messageResponseSchema,
  MW_URL,
} from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const linkATSPlatform = async (
  platform: ATSPlatformName,
  payload: LinkATSPlatformPayload,
) => {
  const url = `${MW_URL}/scorer/link/org/${platform}`;

  const options = {
    method: 'POST' as const,
    responseSchema: messageResponseSchema,
    sentryLabel: `linkATSPlatform`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: linkATSPlatformPayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const result = await mwFetch<MessageResponse, LinkATSPlatformPayload>(
    url,
    options,
  );

  if (!result.success) throw new Error(result.message);

  return result;
};
