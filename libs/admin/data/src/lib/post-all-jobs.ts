import {
  UpdateJobPayload,
  updateJobPayloadSchema,
  type UpdateJobResponse,
  updateJobResponseSchema,
} from '@jobstash/admin/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const postAllJobs = async (payload: UpdateJobPayload) => {
  const url = `${MW_URL}/jobs/update/${payload.shortUUID}`;

  delete payload.shortUUID;

  const options = {
    method: 'POST' as const,
    responseSchema: updateJobResponseSchema,
    sentryLabel: `postAllJobs`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: updateJobPayloadSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await mwFetch<UpdateJobResponse, UpdateJobPayload>(
    url,
    options,
  );

  if (!response.success) throw new Error(response.message);

  return response;
};
