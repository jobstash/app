import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';

import { NEXT_PUBLIC_MW_URL } from '~/shared/core/constants';

import { CHECK_WALLET_ROUTE } from '../core/constants';
import { CheckWalletResponse } from '../core/types';

export const useCheckWallet = (enabled: boolean) => {
  const { push } = useRouter();
  const { data, refetch } = useQuery<CheckWalletResponse>({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['check-wallet', NEXT_PUBLIC_MW_URL],
    queryFn: async () => {
      const res = await fetch(`${NEXT_PUBLIC_MW_URL}/siwe/check-wallet`, {
        mode: 'cors',
        credentials: 'include',
      });
      const { data } = (await res.json()) as { data: CheckWalletResponse };

      push(CHECK_WALLET_ROUTE[data.flow]);

      return data;
    },
    enabled,
  });

  return { checkWalletData: data, refetch };
};
