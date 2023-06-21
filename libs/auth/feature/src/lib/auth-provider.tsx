import { ReactNode } from 'react';

import { ConnectKitProvider, getDefaultClient, SIWEProvider } from 'connectkit';
import { SiweMessage } from 'siwe';
import { configureChains, createClient, mainnet, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import { MW_URL } from '@jobstash/shared/core';

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

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => (
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
        console.log('ONSIGNIN data =', data);
      }}
    >
      <ConnectKitProvider>{children}</ConnectKitProvider>
    </SIWEProvider>
  </WagmiConfig>
);
