import {
  type ProfileShowcasePayload,
  profileShowcasePayloadSchema,
} from '@jobstash/profile/core';
import {
  type MessageResponse,
  messageResponseSchema,
  MW_URL,
} from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const postProfileShowcase = async (payload: ProfileShowcasePayload) => {
  const url = `${MW_URL}/profile/showcase`;

  const options = {
    method: 'POST' as const,
    responseSchema: messageResponseSchema,
    sentryLabel: `postProfileShowcase`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: profileShowcasePayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { success, message } = await mwFetch<
    MessageResponse,
    ProfileShowcasePayload
  >(url, options);

  if (!success) throw new Error(message);

  return { success, message };
};
