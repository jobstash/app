import { useQuery } from '@tanstack/react-query';

import { NEXT_PUBLIC_MW_URL } from '~/shared/core/constants';

import type { CheckWalletData } from '../core/types';

export const useCheckWallet = (enabled: boolean) => {
  const { data, refetch } = useQuery<CheckWalletData>({
    queryKey: ['check-wallet', NEXT_PUBLIC_MW_URL],
    queryFn: async () => {
      const res = await fetch(`${NEXT_PUBLIC_MW_URL}/siwe/check-wallet`, {
        mode: 'cors',
        credentials: 'include',
      });
      const { data } = await res.json();

      return data;
    },
    enabled,
  });

  return { checkWalletData: data, refetch };
};
