import {
  type ProfileInfoResponse,
  profileInfoResponseSchema,
} from '@jobstash/profile/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getProfileInfo = async () => {
  const url = `${MW_URL}/profile/info`;

  const options = {
    responseSchema: profileInfoResponseSchema,
    sentryLabel: `getDevProfileInfo`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  const response = await mwFetch<ProfileInfoResponse>(url, options);

  return response.data;
};
