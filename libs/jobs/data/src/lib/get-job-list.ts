import { JobListQueryPage, jobListQueryPageSchema } from '@jobstash/jobs/core';
import { MW_URL, PAGE_SIZE } from '@jobstash/shared/core';
import { getUrlWithParams } from '@jobstash/filters/utils';

import { mwFetch } from '@jobstash/shared/data';

interface Params {
  page: number;
  filterParams?: Record<string, string>;
  limit?: number;
  isProtected?: boolean;
}

export const getJobList = async ({
  page,
  filterParams,
  limit,
  isProtected,
}: Params): Promise<JobListQueryPage> => {
  const params: Record<string, string> = {
    ...filterParams,
    page: page.toString(),
    limit: limit?.toString() ?? PAGE_SIZE,
  };

  const url = getUrlWithParams(MW_URL, '/jobs/list', params, false) as URL;

  if (isProtected) {
    url.searchParams.set('isProtected', 'true');
  } else {
    url.searchParams.delete('isProtected');
  }

  const options = {
    responseSchema: jobListQueryPageSchema,
    sentryLabel: 'getJobList',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  return mwFetch<JobListQueryPage>(url.toString(), options);
};
