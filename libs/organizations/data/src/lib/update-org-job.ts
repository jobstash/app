import {
  UpdateOrgJobPayload,
  updateOrgJobPayloadSchema,
} from '@jobstash/organizations/core';
import {
  MessageResponse,
  messageResponseSchema,
  MW_URL,
} from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const updateOrgJob = async (
  jobId: string,
  payload: UpdateOrgJobPayload,
) => {
  const url = `${MW_URL}/jobs/update/${jobId}`;

  const options = {
    method: 'POST' as const,
    responseSchema: messageResponseSchema,
    sentryLabel: `updateOrgJob`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: updateOrgJobPayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { success, message } = await mwFetch<
    MessageResponse,
    UpdateOrgJobPayload
  >(url, options);

  if (!success) throw new Error(message);

  return { success, message };
};
