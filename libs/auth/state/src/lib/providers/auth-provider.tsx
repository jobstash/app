import { useRouter } from 'next/router';
import { type ReactNode, useEffect, useMemo, useRef } from 'react';

import { useSIWE } from 'connectkit';

import {
  CHECK_WALLET_FLOWS,
  CHECK_WALLET_ROLES,
  CHECK_WALLET_ROUTE,
  ignoredPathnameRedirectSet,
  redirectFlowsSet,
} from '@jobstash/auth/core';

import { useIsMounted, useMwVersionContext } from '@jobstash/shared/state';

import { AuthContext } from '../contexts/auth-context';
import { useCheckWallet } from '../hooks/use-check-wallet';

type Props = {
  children: ReactNode;
  screenLoader: ReactNode;
};

export const AuthProvider = ({ children, screenLoader }: Props) => {
  const { push, asPath, pathname } = useRouter();
  const isMounted = useIsMounted();
  const { isReady } = useMwVersionContext();

  const {
    data: checkWalletData,
    refetch,
    isLoading,
    address,
    isConnected,
    isFetching,
  } = useCheckWallet();

  // If current wallet is signedIn to Ethereum but wallet is not currently connected,
  // e.g. during client machine restart (SIWE uses cookies), we manually disconnect
  const { signOut, isSignedIn } = useSIWE();
  useEffect(() => {
    const execDisconnect = async () => {
      await signOut();
    };

    if (!isConnected && isSignedIn) {
      execDisconnect();
    }
  }, [signOut, isConnected, isSignedIn]);

  const displayLoader = !isMounted || (isConnected && isLoading) || !isReady;

  const value = useMemo(
    () => ({
      role: checkWalletData?.role ?? CHECK_WALLET_ROLES.DEFAULT,
      flow: checkWalletData?.flow ?? CHECK_WALLET_FLOWS.DEFAULT,
      isCryptoNative: Boolean(checkWalletData?.cryptoNative),
      isLoading,
      address,
      isConnected,
      isSignedIn,
      isFetching,
      refetch: () => refetch(),
    }),
    [
      checkWalletData?.role,
      checkWalletData?.flow,
      checkWalletData?.cryptoNative,
      isLoading,
      address,
      isConnected,
      isSignedIn,
      isFetching,
      refetch,
    ],
  );

  const redirectRef = useRef(false);

  // Redirect if flow-route needs to and ref is still false
  useEffect(() => {
    const { flow } = value;
    const flowRoute = CHECK_WALLET_ROUTE[flow];
    if (
      !redirectRef.current &&
      redirectFlowsSet.has(flow) &&
      !ignoredPathnameRedirectSet.has(pathname) &&
      asPath !== flowRoute
    ) {
      redirectRef.current = true;

      setTimeout(() => {
        if (isConnected) {
          push(CHECK_WALLET_ROUTE[flow]);
        }
      }, 500);
    }
  }, [asPath, isConnected, pathname, push, value]);

  return (
    <AuthContext.Provider value={value}>
      {displayLoader ? screenLoader : children}
    </AuthContext.Provider>
  );
};
