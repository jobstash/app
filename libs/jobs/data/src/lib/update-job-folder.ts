import {
  UpdateJobFolderPayload,
  updateJobFolderPayloadSchema,
} from '@jobstash/jobs/core';
import {
  MessageResponse,
  messageResponseSchema,
  MW_URL,
} from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const updateJobFolder = async (
  id: string,
  payload: UpdateJobFolderPayload,
) => {
  const url = `${MW_URL}/jobs/folders/${id}`;

  const options = {
    method: 'POST' as const,
    sentryLabel: 'updateJobFolder',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    responseSchema: messageResponseSchema,
    payload,
    payloadSchema: updateJobFolderPayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return mwFetch<MessageResponse, UpdateJobFolderPayload>(url, options);
};
