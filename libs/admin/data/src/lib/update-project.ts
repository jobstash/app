import {
  UpdateProjectPayload,
  updateProjectPayloadSchema,
} from '@jobstash/admin/core';
import {
  MessageResponse,
  messageResponseSchema,
  MW_URL,
} from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const updateProject = async (
  projectId: string,
  payload: UpdateProjectPayload,
) => {
  const url = `${MW_URL}/projects/update/${projectId}`;

  const options = {
    method: 'POST' as const,
    responseSchema: messageResponseSchema,
    sentryLabel: `updateManagedProject`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: updateProjectPayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { success, message } = await mwFetch<
    MessageResponse,
    UpdateProjectPayload
  >(url, options);

  if (!success) throw new Error(message);

  return { success, message };
};
