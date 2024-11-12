import { JobFolderPayload } from '@jobstash/jobs/core';
import {
  MessageResponse,
  messageResponseSchema,
  MW_URL,
} from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const createJobFolder = async (payload: JobFolderPayload) => {
  const url = `${MW_URL}/jobs/folders`;

  const options = {
    method: 'POST' as const,
    sentryLabel: 'createJobFolder',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    responseSchema: messageResponseSchema,
    payload,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return mwFetch<MessageResponse, JobFolderPayload>(url, options);
};
