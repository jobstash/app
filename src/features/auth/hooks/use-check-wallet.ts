import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSIWE } from 'connectkit';
import { useAccount } from 'wagmi';

import { NEXT_PUBLIC_MW_URL } from '~/shared/core/constants';
import { useIsMounted } from '~/shared/hooks';

import { fetchCheckWallet } from '../api';
import {
  CHECK_WALLET_FLOWS,
  CHECK_WALLET_ROLES,
  EVENT_SIWE_LOGIN,
  EVENT_SIWE_LOGOUT,
} from '../core/constants';
import { CHECK_WALLET_ROUTE } from '../core/constants';
import { CheckWalletData } from '../core/types';

export const useCheckWallet = () => {
  const isMounted = useIsMounted();
  const { isConnected, address } = useAccount();
  const { isSignedIn } = useSIWE();

  const { push } = useRouter();
  const queryClient = useQueryClient();

  const enabled = isSignedIn && isConnected; // Only enable check-wallet after signin

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

  // Refetch checkWallet on login/logout
  useEffect(() => {
    const loginCb = async () => {
      const data = await fetchCheckWallet();
      const roleRoute = CHECK_WALLET_ROUTE[data.flow];
      console.log('LOGIN CB data =', data, 'roleRoute =', roleRoute);
      queryClient.setQueryData(['check-wallet', NEXT_PUBLIC_MW_URL], data);
      push(roleRoute, undefined, { shallow: true }).then(() => refetch());
    };

    const logoutCb = () => {
      refetch();
    };

    document.addEventListener(EVENT_SIWE_LOGIN, loginCb);
    document.addEventListener(EVENT_SIWE_LOGOUT, logoutCb);

    return () => {
      document.removeEventListener(EVENT_SIWE_LOGIN, loginCb);
      document.removeEventListener(EVENT_SIWE_LOGOUT, logoutCb);
    };
  }, [push, queryClient, refetch]);

  // Should only check isLoading when signedIn
  const isLoading = (isLoadingQuery && enabled) || !isMounted;

  return {
    role: data ? data.role : CHECK_WALLET_ROLES.ANON,
    flow: data ? data.flow : CHECK_WALLET_FLOWS.LOGIN,
    isConnected,
    isSignedIn,
    address,
    isLoading,
  };
};
