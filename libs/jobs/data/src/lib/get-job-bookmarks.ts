import {
  JobBookmarksResponse,
  jobBookmarksResponseSchema,
} from '@jobstash/jobs/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getJobBookmarks = async (isSignedIn: boolean) => {
  // Bypass fetch, return empty array if not logged in
  if (!isSignedIn) return [];

  const url = `${MW_URL}/jobs/bookmarked`;

  const options = {
    responseSchema: jobBookmarksResponseSchema,
    sentryLabel: 'getJobBookmarks',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  const { data } = await mwFetch<JobBookmarksResponse>(url, options);

  return data;
};
