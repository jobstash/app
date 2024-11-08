import {
  MW_URL,
  UserProfileResponse,
  userProfileResponseSchema,
} from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getProfileInfo = async () => {
  const url = `${MW_URL}/profile/info`;

  const options = {
    responseSchema: userProfileResponseSchema,
    sentryLabel: `getDevProfileInfo`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  const response = await mwFetch<UserProfileResponse>(url, options);

  return response.data;
};
