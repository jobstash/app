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
