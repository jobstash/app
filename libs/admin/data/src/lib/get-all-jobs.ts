import { AllJobsQueryPage, allJobsQueryPageSchema } from '@jobstash/admin/core';
import { MW_URL, PAGE_SIZE } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getAllJobs = async (): Promise<AllJobsQueryPage> => {
  const url = `${MW_URL}/jobs/all?page=1&limit=10000`;

  const options = {
    responseSchema: allJobsQueryPageSchema,
    sentryLabel: 'getAllJobs',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  return mwFetch<AllJobsQueryPage>(url, options);
};
