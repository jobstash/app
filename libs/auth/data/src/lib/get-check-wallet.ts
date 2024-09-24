import {
  type CheckWalletResponse,
  checkWalletResponseSchema,
} from '@jobstash/auth/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getCheckWallet = async (accessToken: string | null) => {
  const url = `${MW_URL}/privy/check-wallet`;

  const options = {
    responseSchema: checkWalletResponseSchema,
    sentryLabel: 'getCheckWallet',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    headers: accessToken
      ? {
          Authorization: `Bearer ${accessToken}`,
        }
      : undefined,
  };

  return mwFetch<CheckWalletResponse>(url, options);
};
