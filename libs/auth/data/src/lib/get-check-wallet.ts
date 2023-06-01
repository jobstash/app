import {
  type CheckWalletData,
  checkWalletDataSchema,
} from '@jobstash/auth/core';
import { getMwUrl } from '@jobstash/shared/utils';

import { mwFetch } from '@jobstash/shared/data';

export const getCheckWallet = async () => {
  const mwUrl = getMwUrl();

  const url = `${mwUrl}/siwe/check-wallet`;

  const options = {
    responseSchema: checkWalletDataSchema,
    sentryLabel: 'getCheckWallet',
  };

  return mwFetch<CheckWalletData>(url, options);
};
