import {
  AllTechnologiesResponse,
  allTechnologiesResponseSchema,
} from '@jobstash/shared/core';

import { mwFetch } from './mw-fetch';

export const getAllTechnologies = async () => {
  //
  // const url = `${MW_URL}/technologies`;
  const url = `/api/fakers/technologies`;

  const options = {
    responseSchema: allTechnologiesResponseSchema,
    sentryLabel: `getAllTechnologies`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  return mwFetch<AllTechnologiesResponse>(url, options);
};
