import {
  MessageResponse,
  messageResponseSchema,
  MW_URL,
} from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const deleteJobFolder = async (id: string) => {
  const url = `${MW_URL}/jobs/folders/${id}`;

  const options = {
    method: 'DELETE' as const,
    sentryLabel: 'deleteJobFolder',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    responseSchema: messageResponseSchema,
  };

  const response = await mwFetch<MessageResponse>(url, options);

  if (!response.success) throw new Error(response.message);

  return response;
};
