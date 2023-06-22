import { JobListQueryPage, jobListQueryPageSchema } from '@jobstash/jobs/core';
import { JOB_LIST_LIMIT, MW_URL } from '@jobstash/shared/core';
import { getUrlWithParams } from '@jobstash/filters/utils';

import { mwFetch } from '@jobstash/shared/data';

export const getJobList = async (
  page: number,
  filterParams: Record<string, string>,
): Promise<JobListQueryPage> => {
  const params: Record<string, string> = {
    ...filterParams,
    page: page.toString(),
    JOB_LIST_LIMIT,
  };

  const url = getUrlWithParams(MW_URL, '/jobs/list', params);

  const options = {
    responseSchema: jobListQueryPageSchema,
    sentryLabel: 'getJobList',
  };

  return mwFetch<JobListQueryPage>(url, options);
};
