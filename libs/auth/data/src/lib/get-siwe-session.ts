import {
  SiweSessionResponse,
  siweSessionResponseSchema,
} from '@jobstash/auth/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getSiweSession = async () => {
  const url = `${MW_URL}/siwe/session`;

  const options = {
    responseSchema: siweSessionResponseSchema,
    sentryLabel: 'getSiweSession',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  return mwFetch<SiweSessionResponse>(url, options);
};
