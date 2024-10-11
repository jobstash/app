import {
  type ProfileInfoResponse,
  profileInfoResponseSchema,
} from '@jobstash/profile/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const sendMagicLinkToken = async (token: string) => {
  const url = `${MW_URL}/auth/magic/login/callback?token=${token}`;

  const options = {
    responseSchema: profileInfoResponseSchema,
    sentryLabel: 'sendMagicLinkToken',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  return mwFetch<ProfileInfoResponse>(url, options);
};
