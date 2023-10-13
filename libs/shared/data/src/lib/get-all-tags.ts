import {
  AllTagsResponse,
  allTagsResponseSchema,
  MW_URL,
} from '@jobstash/shared/core';

import { mwFetch } from './mw-fetch';

export const getAllTags = async () => {
  const url = `${MW_URL}/tags`;

  const options = {
    responseSchema: allTagsResponseSchema,
    sentryLabel: `getAllTags`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  return mwFetch<AllTagsResponse>(url, options);
};
