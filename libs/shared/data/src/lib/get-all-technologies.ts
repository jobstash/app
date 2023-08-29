import {
  AllTechnologiesResponse,
  allTechnologiesResponseSchema,
  MW_URL,
} from '@jobstash/shared/core';

import { mwFetch } from './mw-fetch';

export const getAllTechnologies = async () => {
  const url = `${MW_URL}/technologies`;

  const options = {
    responseSchema: allTechnologiesResponseSchema,
    sentryLabel: `getAllTechnologies`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  return mwFetch<AllTechnologiesResponse>(url, options);
};
