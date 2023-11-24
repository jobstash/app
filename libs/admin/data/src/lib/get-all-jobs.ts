import { AllJobsResponse, allJobsResponseSchema } from '@jobstash/admin/core';
import { MW_URL, PAGE_SIZE } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getAllJobs = async () => {
  const url = `${MW_URL}/jobs/all`;

  const options = {
    responseSchema: allJobsResponseSchema,
    sentryLabel: 'getAllJobs',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  const response = await mwFetch<AllJobsResponse>(url, options);

  return response.data;
};
