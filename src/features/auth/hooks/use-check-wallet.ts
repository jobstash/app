import { useQuery } from '@tanstack/react-query';
import { useSIWE } from 'connectkit';
import { useAccount } from 'wagmi';

import { NEXT_PUBLIC_MW_URL } from '~/shared/core/constants';

import { CheckWalletResponse } from '../core/types';

export const useCheckWallet = () => {
  const { isConnected, address } = useAccount();
  const { isSignedIn } = useSIWE();

  const enabled = isSignedIn; // Only enable check-wallet after signin

  const { data, refetch, isLoading } = useQuery<CheckWalletResponse>({
    queryKey: ['check-wallet', NEXT_PUBLIC_MW_URL],
    queryFn: async () => {
      const res = await fetch(`${NEXT_PUBLIC_MW_URL}/siwe/check-wallet`, {
        mode: 'cors',
        credentials: 'include',
      });
      const { data } = (await res.json()) as { data: CheckWalletResponse };

      return data;
    },
    enabled,
  });

  return {
    checkWalletData: data,
    refetch,
    isConnected,
    isSignedIn,
    address,
    isLoading: isLoading && enabled,
  };
};
