import {
  DevTalentResponse,
  devTalentResponseSchema,
} from '@jobstash/profile/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getAvailableDevs = async () => {
  const url = `${MW_URL}/users/available`;

  const options = {
    responseSchema: devTalentResponseSchema,
    sentryLabel: 'getAvailableDevs',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  return mwFetch<DevTalentResponse>(url, options);
};
