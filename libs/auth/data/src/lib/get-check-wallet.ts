import {
  type CheckWalletData,
  checkWalletDataSchema,
} from '@jobstash/auth/core';
import { NEXT_PUBLIC_MW_URL } from '@jobstash/shared/core';

import { mwFetch } from '@jobstash/shared/data';

export const getCheckWallet = async () => {
  const url = `${NEXT_PUBLIC_MW_URL}/siwe/check-wallet`;

  const options = {
    responseSchema: checkWalletDataSchema,
    sentryLabel: 'getCheckWallet',
  };

  return mwFetch<CheckWalletData>(url, options);
};
