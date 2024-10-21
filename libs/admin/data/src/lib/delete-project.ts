import {
  MessageResponse,
  messageResponseSchema,
  MW_URL,
} from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const deleteProject = async (id: string) => {
  const url = `${MW_URL}/projects/delete/${id}`;

  const options = {
    method: 'DELETE' as const,
    responseSchema: messageResponseSchema,
    sentryLabel: `deleteProject`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  const response = await mwFetch<MessageResponse>(url, options);

  if (!response.success) throw new Error(response.message);

  return response;
};
