import { JobListQueryPage, jobListQueryPageSchema } from '@jobstash/jobs/core';
import { JOB_LIST_LIMIT, MW_URL } from '@jobstash/shared/core';
import { getUrlWithParams } from '@jobstash/filters/utils';

import { mwFetch } from '@jobstash/shared/data';

export const getJobList = async (
  page: number,
  filterParams: Record<string, string>,
) => {
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

//
// import { type QueryKey } from '@tanstack/react-query';

// import { type JobListQueryPage } from '@jobstash/jobs/core';
// import {
//   ERR_INTERNAL,
//   SENTRY_MW_INVALID_JSON_RESPONSE,
//   SENTRY_MW_NON_200_RESPONSE,
// } from '@jobstash/shared/core';
// import { getUrlWithFilters } from '@jobstash/filters/utils';
// import {
//   getJobListLimitEnv,
//   getMwUrl,
//   sentryMessage,
// } from '@jobstash/shared/utils';

// interface GetJobListOptions {
//   pageParam?: number;
//   queryKey: QueryKey;
// }

// const SENTRY_LABEL = `getJobList`;

// export const getJobList = async ({
//   pageParam = 1,
//   queryKey,
// }: GetJobListOptions) => {
//   const mwUrl = getMwUrl();
//   const limit = getJobListLimitEnv();

//   const queryParams = queryKey[1] as Record<string, string>;
//   queryParams['page'] = pageParam.toString();
//   queryParams['limit'] = limit.toString();

//   const url = getUrlWithFilters(queryParams, '/jobs/list', mwUrl);
//   const res = await fetch(url);

//   if (!res.ok) {
//     sentryMessage(
//       `${SENTRY_LABEL}: ${SENTRY_MW_NON_200_RESPONSE}`,
//       `status = ${res.status}`,
//     );
//     throw new Error(ERR_INTERNAL);
//   }

//   let data: JobListQueryPage;

//   // Data should be json - 500 otherwise
//   try {
//     data = await res.json();
//   } catch {
//     sentryMessage(SENTRY_LABEL, SENTRY_MW_INVALID_JSON_RESPONSE);
//     throw new Error(ERR_INTERNAL);
//   }

//   return data;
// };
