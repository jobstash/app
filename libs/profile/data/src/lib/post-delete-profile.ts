import {
  type MessageResponse,
  messageResponseSchema,
  MW_URL,
} from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const postDeleteProfile = async () => {
  const url = `${MW_URL}/profile/delete`;

  const options = {
    method: 'POST' as const,
    responseSchema: messageResponseSchema,
    sentryLabel: `postDeleteAccount`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  const { success, message } = await mwFetch<MessageResponse>(url, options);

  if (!success) throw new Error(message);

  return { success, message };
};
