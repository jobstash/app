import { useRouter } from 'next/router';
import { useRef } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { ConnectKitProvider, SIWEProvider } from 'connectkit';
import { SiweMessage } from 'siwe';

import { CHECK_WALLET_ROUTE, redirectFlowsSet } from '@jobstash/auth/core';
import { MW_URL } from '@jobstash/shared/core';

import { getCheckWallet } from '@jobstash/auth/data';

interface Props {
  children: React.ReactNode;
}

export const WalletProvider = ({ children }: Props) => {
  const { push, asPath } = useRouter();
  const queryClient = useQueryClient();

  const signOutRef = useRef(false);

  return (
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
        if (!signOutRef.current) {
          signOutRef.current = true;
          window.location.href = '/jobs';
        }
      }}
    >
      <ConnectKitProvider>{children}</ConnectKitProvider>
    </SIWEProvider>
  );
};
