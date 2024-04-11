import {
  JobsAppliedResponse,
  jobsAppliedResponseSchema,
} from '@jobstash/jobs/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getJobsApplied = async () => {
  const url = `${MW_URL}/jobs/applied`;

  const options = {
    responseSchema: jobsAppliedResponseSchema,
    sentryLabel: 'getJobsApplied',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  const { success, message, data } = await mwFetch<JobsAppliedResponse>(
    url,
    options,
  );

  if (!success) throw new Error(message);

  return data;
};
