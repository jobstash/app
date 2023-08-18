import { useRouter } from 'next/router';
import { type ReactNode, useEffect, useMemo, useRef } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import {
  ConnectKitProvider,
  getDefaultClient,
  SIWEProvider,
  useSIWE,
} from 'connectkit';
import { SiweMessage } from 'siwe';
import { configureChains, createClient, mainnet, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import {
  CHECK_WALLET_FLOWS,
  CHECK_WALLET_ROLES,
  CHECK_WALLET_ROUTE,
  redirectFlowsSet,
} from '@jobstash/auth/core';
import { MW_URL } from '@jobstash/shared/core';

import { useIsMounted } from '@jobstash/shared/state';
import { getCheckWallet } from '@jobstash/auth/data';

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
  const queryClient = useQueryClient();
  const isMounted = useIsMounted();

  const {
    data: checkWalletData,
    refetch,
    isLoading,
    isConnected,
  } = useCheckWallet();

  // If current wallet is signedIn to Ethereum but wallet is not currently connected,
  // e.g. during client machine restart (SIWE uses cookies), we manually disconnect
  const { disconnect, isSignedIn } = useSIWE();
  useEffect(() => {
    const execDisconnect = async () => {
      await disconnect();
    };

    if (!isConnected && isSignedIn) {
      execDisconnect();
    }
  }, [disconnect, isConnected, isSignedIn]);

  const displayLoader = !isMounted || (isConnected && isLoading);

  const value = useMemo(
    () => ({
      role: checkWalletData?.role ?? CHECK_WALLET_ROLES.DEFAULT,
      flow: checkWalletData?.flow ?? CHECK_WALLET_FLOWS.DEFAULT,
      isLoading,
      refetch: () => refetch(),
    }),
    [checkWalletData?.flow, checkWalletData?.role, isLoading, refetch],
  );

  const redirectRef = useRef(false);

  // Redirect if flow-route needs to and ref is still false
  useEffect(() => {
    const { flow } = value;
    const flowRoute = CHECK_WALLET_ROUTE[flow];
    if (
      !redirectRef.current &&
      redirectFlowsSet.has(flow) &&
      asPath !== flowRoute
    ) {
      redirectRef.current = true;

      setTimeout(() => {
        if (isConnected) {
          push(CHECK_WALLET_ROUTE[flow]);
        }
      }, 500);
    }
  }, [asPath, isConnected, push, value]);

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
        onSignIn={async () => {
          // We redirect manually here, assign ref
          redirectRef.current = true;

          // Fetch check-manually after siwe signin
          const checkWalletResponse = await getCheckWallet();

          // Cache check-wallet response
          queryClient.setQueryData(['check-wallet'], checkWalletResponse);

          // Redirect if data.flow is in set of flows that needs to be redirected
          const {
            data: { flow },
          } = checkWalletResponse;
          const flowRoute = CHECK_WALLET_ROUTE[flow];
          if (redirectFlowsSet.has(flow) && asPath !== flowRoute) {
            push(flowRoute);
          }
        }}
        onSignOut={() => {
          // Disconnect wallet on signout
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
