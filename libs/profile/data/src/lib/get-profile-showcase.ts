import {
  MW_URL,
  UserShowcaseResponse,
  userShowcaseResponseSchema,
} from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getProfileShowcase = async () => {
  const url = `${MW_URL}/profile/showcase`;

  const options = {
    responseSchema: userShowcaseResponseSchema,
    sentryLabel: `getProfileShowcase`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  const response = await mwFetch<UserShowcaseResponse>(url, options);

  return response.data;
};
