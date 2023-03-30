import { ReactNode, useEffect, useMemo } from 'react';

import { WalletAuthContext } from '../contexts/wallet-auth-context';
import { EVENT_SIWE_LOGIN, EVENT_SIWE_LOGOUT } from '../core/constants';
import { useCheckWallet } from '../hooks/use-check-wallet';

interface Props {
  children: ReactNode;
}

export const WalletAuthProvider = ({ children }: Props) => {
  const { role, flow, refetch, isConnected, isSignedIn, address, isLoading } =
    useCheckWallet();

  // Refetch checkWallet on login/logout
  useEffect(() => {
    document.addEventListener(EVENT_SIWE_LOGIN, refetch);
    document.addEventListener(EVENT_SIWE_LOGOUT, refetch);

    return () => {
      document.removeEventListener(EVENT_SIWE_LOGIN, refetch);
      document.removeEventListener(EVENT_SIWE_LOGOUT, refetch);
    };
  }, [refetch]);

  const memoed = useMemo(
    () => ({
      role,
      flow,
      isConnected,
      isSignedIn,
      address,
      isLoading,
    }),
    [address, flow, isConnected, isLoading, isSignedIn, role],
  );

  return (
    <WalletAuthContext.Provider value={memoed}>
      {children}
    </WalletAuthContext.Provider>
  );
};
