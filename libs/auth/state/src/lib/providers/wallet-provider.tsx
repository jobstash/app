import { useRouter } from 'next/router';

import { useQueryClient } from '@tanstack/react-query';
import { ConnectKitProvider, getDefaultConfig, SIWEProvider } from 'connectkit';
import { SiweMessage } from 'siwe';
import { createConfig, WagmiConfig } from 'wagmi';

import {
  CHECK_WALLET_FLOWS,
  CHECK_WALLET_ROLES,
  CHECK_WALLET_ROUTE,
  redirectFlowsSet,
} from '@jobstash/auth/core';
import {
  FRONTEND_URL,
  INFRURA_ID,
  MW_URL,
  WALLETCONNECT_PROJECT_ID,
} from '@jobstash/shared/core';

import { getCheckWallet } from '@jobstash/auth/data';

const config = createConfig(
  getDefaultConfig({
    // Required
    appName: 'JobStash',
    infuraId: INFRURA_ID,
    walletConnectProjectId: WALLETCONNECT_PROJECT_ID,

    // Optional
    appDescription: 'The Ultimate Crypto Native Job Aggregator',
    appUrl: FRONTEND_URL,
    appIcon: `${FRONTEND_URL}/apple-touch-icon.png`,
  }),
);

interface Props {
  children: React.ReactNode;
}

export const WalletProvider = ({ children }: Props) => {
  const { push, asPath } = useRouter();
  const queryClient = useQueryClient();

  return (
    <WagmiConfig config={config}>
      <SIWEProvider
        // {...siweConfig}
        getNonce={async () => {
          const res = await fetch(`${MW_URL}/siwe/nonce`, {
            cache: 'no-store',
            credentials: 'include',
            mode: 'cors',
          });

          const { data } = await res.json();
          return data;
        }}
        getSession={async () => {
          const res = await fetch(`${MW_URL}/siwe/session`, {
            cache: 'no-store',
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
        verifyMessage={({ message, signature }) =>
          fetch(`${MW_URL}/siwe/verify`, {
            cache: 'no-store',
            credentials: 'include',
            mode: 'cors',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, signature }),
          }).then((res) => res.ok)
        }
        signOut={async () => {
          const res = await fetch(`${MW_URL}/siwe/logout`, {
            cache: 'no-store',
            credentials: 'include',
            mode: 'cors',
          });

          return res.ok;
        }}
        onSignIn={async () => {
          const checkWalletResponse = await getCheckWallet();
          console.log('onSignin response =', checkWalletResponse);
          queryClient.setQueryData(['check-wallet'], checkWalletResponse);

          const {
            data: { flow },
          } = checkWalletResponse;
          const flowRoute = CHECK_WALLET_ROUTE[flow];
          if (redirectFlowsSet.has(flow) && asPath !== flowRoute) {
            push(flowRoute);
          }
        }}
        onSignOut={() => {
          queryClient.setQueryData(['check-wallet'], {
            data: {
              role: CHECK_WALLET_ROLES.DEFAULT,
              flow: CHECK_WALLET_FLOWS.DEFAULT,
            },
            message: 'Wallet checked successfully',
            success: true,
          });
          queryClient.invalidateQueries(['check-wallet']);
        }}
      >
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </SIWEProvider>
    </WagmiConfig>
  );
};
