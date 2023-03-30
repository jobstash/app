import { useQuery } from '@tanstack/react-query';
import { useSIWE } from 'connectkit';
import { useAccount } from 'wagmi';

import { NEXT_PUBLIC_MW_URL } from '~/shared/core/constants';
import { useIsMounted } from '~/shared/hooks';

import { fetchCheckWallet } from '../api';
import { CHECK_WALLET_FLOWS, CHECK_WALLET_ROLES } from '../core/constants';
import { CheckWalletData } from '../core/types';

export const useCheckWallet = () => {
  const isMounted = useIsMounted();
  const { isConnected, address, isConnecting } = useAccount();
  const { isSignedIn, isLoading: isLoadingSiwe } = useSIWE();

  const enabled = isSignedIn; // Only enable check-wallet after signin

  const {
    data,
    refetch,
    isLoading: isLoadingQuery,
  } = useQuery<CheckWalletData>({
    queryKey: ['check-wallet', NEXT_PUBLIC_MW_URL],
    queryFn: fetchCheckWallet,
    enabled,
    cacheTime: 4 * 60 * 60 * 1000, // 4 hours cache
  });

  const refetchCheckWallet = () => refetch();

  // Should only check isLoading when signedIn
  const isLoading =
    (isLoadingQuery || isConnecting || isLoadingSiwe || !isMounted) && enabled;

  return {
    role: data ? data.role : CHECK_WALLET_ROLES.ANON,
    flow: data ? data.flow : CHECK_WALLET_FLOWS.LOGIN,
    refetch: refetchCheckWallet,
    isConnected,
    isSignedIn,
    address,
    isLoading,
  };
};
