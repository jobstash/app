import {
  type CheckWalletResponse,
  checkWalletResponseSchema,
} from '@jobstash/auth/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getCheckWallet = async (cookieString?: string) => {
  const url = `${MW_URL}/siwe/check-wallet`;

  const options = {
    responseSchema: checkWalletResponseSchema,
    sentryLabel: 'getCheckWallet',
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    headers: cookieString
      ? {
          Cookie: cookieString,
        }
      : undefined,
  };

  return mwFetch<CheckWalletResponse>(url, options);
};
