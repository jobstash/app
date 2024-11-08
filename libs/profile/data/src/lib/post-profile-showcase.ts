import {
  type MessageResponse,
  messageResponseSchema,
  MW_URL,
  UserShowcasePayload,
  userShowcasePayloadSchema,
} from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const postProfileShowcase = async (payload: UserShowcasePayload) => {
  const url = `${MW_URL}/profile/showcase`;

  const options = {
    method: 'POST' as const,
    responseSchema: messageResponseSchema,
    sentryLabel: `postProfileShowcase`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: userShowcasePayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { success, message } = await mwFetch<
    MessageResponse,
    UserShowcasePayload
  >(url, options);

  if (!success) throw new Error(message);

  return { success, message };
};
