import { useRouter } from 'next/router';
import { ReactNode, useEffect, useMemo } from 'react';

import { ConnectKitProvider, getDefaultClient, SIWEProvider } from 'connectkit';
import NProgress from 'nprogress';
import { SiweMessage } from 'siwe';
import { configureChains, createClient, mainnet, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import {
  CHECK_WALLET_FLOWS,
  CHECK_WALLET_ROLES,
  CHECK_WALLET_ROUTE,
} from '@jobstash/auth/core';
import { MW_URL } from '@jobstash/shared/core';

import { useIsMounted } from '@jobstash/shared/state';

import { AuthContext } from '../contexts/auth-context';
import { useCheckWallet } from '../hooks/use-check-wallet';

const { provider, webSocketProvider } = configureChains(
  [mainnet],
  [publicProvider()],
);

const connectkitClient = createClient(
  getDefaultClient({
    appName: 'Job Stash',
    provider,
    webSocketProvider,
  }),
);

type Props = {
  children: ReactNode;
  screenLoader: ReactNode;
};

export const AuthProvider = ({ children, screenLoader }: Props) => {
  const { push, asPath } = useRouter();
  const isMounted = useIsMounted();

  const {
    data: checkWalletData,
    refetch,
    isLoading,
    isConnected,
    isConnecting,
  } = useCheckWallet();

  const displayLoader = !isMounted || (isConnected && isLoading);

  useEffect(() => {
    if (checkWalletData) {
      const flowRoute = CHECK_WALLET_ROUTE[checkWalletData.flow];
      if (asPath !== flowRoute) {
        push(flowRoute);
      }
    }
  }, [asPath, checkWalletData, push]);

  const value = useMemo(
    () => ({
      role: checkWalletData?.role ?? CHECK_WALLET_ROLES.DEFAULT,
      flow: checkWalletData?.flow ?? CHECK_WALLET_FLOWS.DEFAULT,
    }),
    [checkWalletData?.flow, checkWalletData?.role],
  );

  return (
    <WagmiConfig client={connectkitClient}>
      <SIWEProvider
        // {...siweConfig}
        getNonce={async () => {
          const res = await fetch(`${MW_URL}/siwe/nonce`, {
            credentials: 'include',
            mode: 'cors',
          });

          const { data } = await res.json();
          return data;
        }}
        getSession={async () => {
          const res = await fetch(`${MW_URL}/siwe/session`, {
            mode: 'cors',
            credentials: 'include',
          });

          if (!res.ok) return null;

          const { data } = await res.json();

          return data;
        }}
        createMessage={({ nonce, address, chainId }) =>
          new SiweMessage({
            version: '1',
            domain: window.location.host,
            uri: window.location.origin,
            address,
            chainId,
            nonce,
            statement: `I am ${
              address.slice(0, 4) + '...' + address.slice(-4)
            } and I want to sign in to ${window.location.host}`,
          }).prepareMessage()
        }
        verifyMessage={async ({ message, signature }) => {
          const res = await fetch(`${MW_URL}/siwe/verify`, {
            credentials: 'include',
            mode: 'cors',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, signature }),
          });

          return res.ok;
        }}
        signOut={async () => {
          const res = await fetch(`${MW_URL}/siwe/logout`, {
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          return res.ok;
        }}
        onSignIn={(data) => {
          NProgress.start();
          refetch();
        }}
        onSignOut={() => {
          refetch();
        }}
      >
        <ConnectKitProvider>
          <AuthContext.Provider value={value}>
            {displayLoader ? screenLoader : children}
          </AuthContext.Provider>
        </ConnectKitProvider>
      </SIWEProvider>
    </WagmiConfig>
  );
};
