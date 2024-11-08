import {
  MW_URL,
  UserProfileResponse,
  userProfileResponseSchema,
} from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const sendMagicLinkToken = async (token: string) => {
  const url = `${MW_URL}/auth/magic/login/callback?token=${token}`;

  const options = {
    responseSchema: userProfileResponseSchema,
    sentryLabel: 'sendMagicLinkToken',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
  };

  return mwFetch<UserProfileResponse>(url, options);
};
