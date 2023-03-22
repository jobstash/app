import { createContext, ReactNode, useEffect, useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useSIWE } from 'connectkit';
import { useAccount } from 'wagmi';

import { NEXT_PUBLIC_MW_URL } from '~/shared/core/constants';
import { useIsMounted } from '~/shared/hooks';

import {
  CHECK_WALLET_RESULT,
  EVENT_SIWE_LOGIN,
  EVENT_SIWE_LOGOUT,
} from '../core/constants';

type CheckWalletData =
  (typeof CHECK_WALLET_RESULT)[keyof typeof CHECK_WALLET_RESULT];

interface WalletAuthCtx {
  isConnected: boolean;
  isSignedIn: boolean;
  isPageEmpty: boolean;
  checkWalletData: CheckWalletData | undefined;
}

export const WalletAuthContext = createContext<WalletAuthCtx>({
  isConnected: false,
  isSignedIn: false,
  checkWalletData: undefined,
  isPageEmpty: false,
});

export const WalletAuthProvider = ({ children }: { children: ReactNode }) => {
  const isMounted = useIsMounted();
  const { isConnected } = useAccount();
  const { isSignedIn } = useSIWE();

  // Fetch checkWalletData when necessary
  const { data: checkWalletData, refetch } = useQuery<CheckWalletData>({
    queryKey: ['check-wallet', NEXT_PUBLIC_MW_URL],
    queryFn: async () => {
      const res = await fetch(`${NEXT_PUBLIC_MW_URL}/siwe/check-wallet`, {
        mode: 'cors',
        credentials: 'include',
      });
      const { data } = await res.json();

      return data;
    },
  });

  // Used to prevent a page that depends on siwe from rendering its contents
  const isPageEmpty = !isMounted || (!checkWalletData && isSignedIn);

  // Refetch checkWallet on login/logout
  useEffect(() => {
    const cb = () => refetch();

    document.addEventListener(EVENT_SIWE_LOGIN, cb);
    document.addEventListener(EVENT_SIWE_LOGOUT, cb);

    return () => {
      document.removeEventListener(EVENT_SIWE_LOGIN, cb);
      document.removeEventListener(EVENT_SIWE_LOGOUT, cb);
    };
  }, [refetch]);

  const memoed = useMemo(
    () => ({
      checkWalletData,
      isConnected,
      isSignedIn,
      isPageEmpty,
    }),
    [checkWalletData, isConnected, isSignedIn, isPageEmpty],
  );

  return (
    <WalletAuthContext.Provider value={memoed}>
      {children}
    </WalletAuthContext.Provider>
  );
};
