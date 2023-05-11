import { NEXT_PUBLIC_MW_URL } from '~/shared/core/constants';

import type { CheckWalletData } from '../core/types';

export const fetchCheckWallet = async (): Promise<CheckWalletData> => {
  const res = await fetch(`${NEXT_PUBLIC_MW_URL}/siwe/check-wallet`, {
    mode: 'cors',
    credentials: 'include',
  });
  const { data } = (await res.json()) as { data: CheckWalletData };

  return data;
};
