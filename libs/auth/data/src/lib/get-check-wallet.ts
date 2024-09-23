import {
  type CheckWalletResponse,
  checkWalletResponseSchema,
} from '@jobstash/auth/core';
import { MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getCheckWallet = async (
  accessToken: string | null,
  isOrg: boolean, // Distinguish org signups (needed only for initial org signup)
) => {
  const url = `${MW_URL}/privy/check-${isOrg ? 'org-' : ''}wallet`;

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
