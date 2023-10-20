import {
  type ProfileShowcaseResponse,
  profileShowcaseResponseSchema,
} from '@jobstash/profile/core';

import { mwFetch } from '@jobstash/shared/data';

export const getProfileShowcase = async () => {
  const url = '/api/fakers/profile/showcase';

  const options = {
    responseSchema: profileShowcaseResponseSchema,
    sentryLabel: `getProfileShowcase`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  const response = await mwFetch<ProfileShowcaseResponse>(url, options);

  return response.data;
};
