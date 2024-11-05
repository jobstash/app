import { ProjectJobsitePayload, projectJobsitePayloadSchema } from '@jobstash/admin/core';
import {
  MessageResponse,
  messageResponseSchema,
  MW_URL,
} from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const activateProjectJobsite = async (
  payload: ProjectJobsitePayload,
) => {
  const url = `${MW_URL}/projects/jobsites/activate`;

  const options = {
    method: 'POST' as const,
    responseSchema: messageResponseSchema,
    sentryLabel: `activateProjectJobsite`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: projectJobsitePayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { success, message } = await mwFetch<
    MessageResponse,
    ProjectJobsitePayload
  >(url, options);

  if (!success) throw new Error(message);

  return { success, message };
};
