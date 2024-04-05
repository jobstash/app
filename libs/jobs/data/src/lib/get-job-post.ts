import { type JobPost, jobPostSchema } from '@jobstash/jobs/core';
import { MW_URL } from '@jobstash/shared/core';
import { getEcosystemHeader } from '@jobstash/shared/utils';

import { mwFetch } from '@jobstash/shared/data';

interface Props {
  shortUuid: string;
  ssrHost?: string;
}

export const getJobPost = async ({ shortUuid, ssrHost }: Props) => {
  const url = `${MW_URL}/jobs/details/${shortUuid}`;
  const options = {
    responseSchema: jobPostSchema,
    sentryLabel: 'getJobPost',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    headers: {
      ...getEcosystemHeader(ssrHost),
    },
  };

  return mwFetch<JobPost>(url, options);
};
