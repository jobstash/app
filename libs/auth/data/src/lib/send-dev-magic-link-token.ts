import {
  type DevProfileInfoResponse,
  devProfileInfoResponseSchema,
} from '@jobstash/profile/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const sendDevMagicLinkToken = async (token: string) => {
  const url = `${MW_URL}/auth/magic/dev/login/callback?token=${token}`;

  const options = {
    responseSchema: devProfileInfoResponseSchema,
    sentryLabel: 'sendDevMagicLinkToken',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  return mwFetch<DevProfileInfoResponse>(url, options);
};
