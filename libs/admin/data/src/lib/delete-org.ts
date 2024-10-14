import {
  MessageResponse,
  messageResponseSchema,
  MW_URL,
} from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const deleteOrg = async (orgId: string) => {
  const url = `${MW_URL}/organizations/delete/${orgId}`;

  const options = {
    method: 'DELETE' as const,
    responseSchema: messageResponseSchema,
    sentryLabel: `postDeletePreference`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await mwFetch<MessageResponse>(url, options);

  if (!response.success) throw new Error(response.message);

  return response;
};
