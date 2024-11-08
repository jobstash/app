import {
  MW_URL,
  UserAvailableForWorkResponse,
  userAvailableForWorkResponseSchema,
} from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getUsersAvailableForWork = async () => {
  const url = `${MW_URL}/users/available`;

  const options = {
    responseSchema: userAvailableForWorkResponseSchema,
    sentryLabel: 'getUsersAvailableForWork',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  return mwFetch<UserAvailableForWorkResponse>(url, options);
};
