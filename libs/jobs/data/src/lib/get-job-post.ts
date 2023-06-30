import { type JobPost, jobPostSchema } from '@jobstash/jobs/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getJobPost = async (shortUuid: string) => {
  const url = `${MW_URL}/jobs/details/${shortUuid}`;
  const options = {
    responseSchema: jobPostSchema,
    sentryLabel: 'getJobPost',
  };

  return mwFetch<JobPost>(url, options);
};
