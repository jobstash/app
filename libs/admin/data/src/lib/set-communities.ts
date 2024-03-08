import {
  SetCommunitiesPayload,
  setCommunitiesPayloadSchema,
} from '@jobstash/admin/core';
import {
  MessageResponse,
  messageResponseSchema,
  MW_URL,
} from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const setCommunities = async (payload: SetCommunitiesPayload) => {
  const url = `${MW_URL}/organizations/communities`;

  const options = {
    method: 'POST' as const,
    responseSchema: messageResponseSchema,
    sentryLabel: `addAlias`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: setCommunitiesPayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { success, message } = await mwFetch<
    MessageResponse,
    SetCommunitiesPayload
  >(url, options);

  if (!success) throw new Error(message);

  return { success, message };
};
