import { useRouter } from 'next/router';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { useSIWE } from 'connectkit';
import { useAccount } from 'wagmi';

import { useIsMounted } from '~/shared/hooks';

import { fetchCheckWallet } from '../api';
import { WalletAuthContext } from '../contexts/wallet-auth-context';
import {
  CHECK_WALLET_ROUTE,
  EVENT_SIWE_LOGIN,
  EVENT_SIWE_LOGOUT,
} from '../core/constants';
import type { CheckWalletFlow, CheckWalletRole } from '../core/types';

interface Props {
  role: CheckWalletRole;
  flow: CheckWalletFlow;
  children: ReactNode;
}

export const WalletAuthProvider = ({ children, role, flow }: Props) => {
  const isMounted = useIsMounted();

  const { push } = useRouter();

  const { isConnected, address, isConnecting } = useAccount();
  const { isSignedIn, isLoading: siweIsLoading } = useSIWE();
  const [isNavigating, setIsNavigating] = useState(false);

  // Used to prevent a page that depends on siwe from rendering its contents
  const isLoading = !isMounted || isConnecting || siweIsLoading || isNavigating;

  const checkWalletRedirect = useCallback(async () => {
    setIsNavigating(true);
    const { flow } = await fetchCheckWallet();

    await push(CHECK_WALLET_ROUTE[flow]).then(() => {
      setIsNavigating(false);
    });
  }, [push]);

  // Refetch checkWallet on login/logout
  useEffect(() => {
    document.addEventListener(EVENT_SIWE_LOGIN, checkWalletRedirect);
    document.addEventListener(EVENT_SIWE_LOGOUT, checkWalletRedirect);

    return () => {
      document.removeEventListener(EVENT_SIWE_LOGIN, checkWalletRedirect);
      document.removeEventListener(EVENT_SIWE_LOGOUT, checkWalletRedirect);
    };
  }, [checkWalletRedirect]);

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
