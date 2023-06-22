import { JobListQueryPage, jobListQueryPageSchema } from '@jobstash/jobs/core';
import { getUrlWithParams } from '@jobstash/filters/utils';
import { getJobListLimit, getMwUrl } from '@jobstash/shared/utils';

import { mwFetch } from '@jobstash/shared/data';

export const getJobList = async (
  page: number,
  filterParams: Record<string, string>,
) => {
  const mwUrl = getMwUrl();
  const limit = getJobListLimit();

  const params: Record<string, string> = {
    ...filterParams,
    page: page.toString(),
    limit,
  };

  const url = getUrlWithParams(mwUrl, '/jobs/list', params);

  const options = {
    responseSchema: jobListQueryPageSchema,
    sentryLabel: 'getJobList',
  };

  return mwFetch<JobListQueryPage>(url, options);
};
