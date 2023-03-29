import { useRouter } from 'next/router';
import { ReactNode, useEffect, useMemo } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { NEXT_PUBLIC_MW_URL } from '~/shared/core/constants';
import { useIsMounted } from '~/shared/hooks';

import { WalletAuthContext } from '../contexts/wallet-auth-context';
import {
  CHECK_WALLET_ROLES,
  CHECK_WALLET_ROUTE,
  EVENT_SIWE_LOGIN,
  EVENT_SIWE_LOGOUT,
} from '../core/constants';
import { CheckWalletResponse } from '../core/types';
import { useCheckWallet } from '../hooks';

export const WalletAuthProvider = ({ children }: { children: ReactNode }) => {
  const isMounted = useIsMounted();

  const { push } = useRouter();
  const queryClient = useQueryClient();
  const {
    checkWalletData,
    isConnected,
    isSignedIn,
    refetch,
    address,
    isLoading,
  } = useCheckWallet();

  const role = checkWalletData ? checkWalletData.role : CHECK_WALLET_ROLES.ANON;
  const flow = checkWalletData ? checkWalletData.flow : undefined;

  // Used to prevent a page that depends on siwe from rendering its contents
  const isPageEmpty = !isMounted || (!checkWalletData && isSignedIn);

  // Refetch checkWallet on login/logout
  useEffect(() => {
    const refetchCheckWallet = () => refetch();
    const loginCb = async () => {
      console.log('-------------------LOGGED IN!-------------------');
      const res = await fetch(`${NEXT_PUBLIC_MW_URL}/siwe/check-wallet`, {
        mode: 'cors',
        credentials: 'include',
      });
      const jsonData = await res.json();
      console.log('jsonData =', jsonData);
      const { data } = jsonData.data as { data: CheckWalletResponse };

      //
      // if (data && data.flow && flow !== null) {
      //   push(CHECK_WALLET_ROUTE[flow]);

      //   // No need to fetch data again since we do it here
      //   queryClient.setQueryData(
      //     ['check-wallet', NEXT_PUBLIC_MW_URL],
      //     jsonData,
      //   );
      // }

      // refetchCheckWallet();
    };

    document.addEventListener(EVENT_SIWE_LOGIN, loginCb);
    document.addEventListener(EVENT_SIWE_LOGOUT, refetchCheckWallet);

    return () => {
      document.removeEventListener(EVENT_SIWE_LOGIN, loginCb);
      document.removeEventListener(EVENT_SIWE_LOGOUT, refetchCheckWallet);
    };
  }, [push, queryClient, refetch]);

  const memoed = useMemo(
    () => ({
      role,
      flow,
      isConnected,
      isSignedIn,
      isPageEmpty,
      address,
      isLoading,
    }),
    [role, flow, isConnected, isSignedIn, isPageEmpty, address, isLoading],
  );

  return (
    <WalletAuthContext.Provider value={memoed}>
      {children}
    </WalletAuthContext.Provider>
  );
};
