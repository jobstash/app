import {
  type DevProfileInfoResponse,
  devProfileInfoResponseSchema,
} from '@jobstash/profile/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getDevProfileInfo = async () => {
  const url = `${MW_URL}/profile/dev/info`;

  const options = {
    responseSchema: devProfileInfoResponseSchema,
    sentryLabel: `getDevProfileInfo`,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  const response = await mwFetch<DevProfileInfoResponse>(url, options);

  return response.data;
};
