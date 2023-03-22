import { ReactNode, useEffect, useMemo } from 'react';

import { useSIWE } from 'connectkit';
import { useAccount } from 'wagmi';

import { useIsMounted } from '~/shared/hooks';

import { WalletAuthContext } from '../contexts/wallet-auth-context';
import { EVENT_SIWE_LOGIN, EVENT_SIWE_LOGOUT } from '../core/constants';
import { useCheckWallet } from '../hooks';

export const WalletAuthProvider = ({ children }: { children: ReactNode }) => {
  const isMounted = useIsMounted();
  const { isConnected, address } = useAccount();
  const { isSignedIn } = useSIWE();
  const { checkWalletData, refetch } = useCheckWallet(
    isConnected && isSignedIn,
  );

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
      address,
      refetch: () => refetch(),
    }),
    [checkWalletData, isConnected, isSignedIn, isPageEmpty, address, refetch],
  );

  return (
    <WalletAuthContext.Provider value={memoed}>
      {children}
    </WalletAuthContext.Provider>
  );
};
