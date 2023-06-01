import { type JobPost, jobPostSchema } from '@jobstash/jobs/core';
import { getMwUrl } from '@jobstash/shared/utils';

import { mwFetch } from '@jobstash/shared/data';

export const getJobPost = async (shortUuid: string) => {
  const mwUrl = getMwUrl();
  const url = `${mwUrl}/jobs/details/${shortUuid}`;
  const options = {
    responseSchema: jobPostSchema,
    sentryLabel: 'getJobPost',
  };

  return mwFetch<JobPost>(url, options);
};

//
// import type { JobPost } from '@jobstash/jobs/core';
// import {
//   SENTRY_MW_INVALID_JSON_RESPONSE,
//   SENTRY_MW_NON_200_RESPONSE,
// } from '@jobstash/shared/core';
// import { getMwUrl, sentryMessage } from '@jobstash/shared/utils';

// const SENTRY_LABEL = `getJobPost`;

// export const getJobPost = async (shortUuid: string): Promise<JobPost> => {
//   const mwUrl = getMwUrl();

//   const res = await fetch(`${mwUrl}/jobs/details/${shortUuid}`);
//   if (!res.ok) {
//     sentryMessage(
//       `${SENTRY_LABEL}: ${SENTRY_MW_NON_200_RESPONSE}`,
//       `status = ${res.status}`,
//     );
//     throw new Error('Something went wrong :(');
//   }

//   let job: JobPost;
//   try {
//     job = await res.json();
//   } catch {
//     sentryMessage(SENTRY_LABEL, SENTRY_MW_INVALID_JSON_RESPONSE);
//     throw new Error('Something went wrong :(');
//   }

//   return job;
// };
