import {
  JobsUpdateableFields,
  jobsUpdateableFieldsSchema,
  type UpdateJobResponse,
  updateJobResponseSchema,
} from '@jobstash/admin/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const postAllJobs = async (payload: JobsUpdateableFields) => {
  const url = `${MW_URL}/jobs/update/${payload.shortUUID}`;

  const options = {
    method: 'POST' as const,
    responseSchema: updateJobResponseSchema,
    sentryLabel: `postAllJobs`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    payload,
    payloadSchema: jobsUpdateableFieldsSchema,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await mwFetch<UpdateJobResponse, JobsUpdateableFields>(
    url,
    options,
  );

  if (!response.success) throw new Error(response.message);

  return response;
};
