import {
  type ProfileShowcaseResponse,
  profileShowcaseResponseSchema,
} from '@jobstash/profile/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getProfileShowcase = async () => {
  const url = `${MW_URL}/profile/showcase`;

  const options = {
    responseSchema: profileShowcaseResponseSchema,
    sentryLabel: `getProfileShowcase`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  const response = await mwFetch<ProfileShowcaseResponse>(url, options);

  return response.data;
};
