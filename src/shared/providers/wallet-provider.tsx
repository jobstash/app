'use client';

import { ConnectKitProvider, SIWEProvider } from 'connectkit';
import { SiweMessage } from 'siwe';

import { MW_URL } from '~/shared/core/envs';

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SIWEProvider
      getNonce={async () => {
        const res = await fetch(`${MW_URL}/siwe/nonce`, {
          cache: 'no-cache',
          credentials: 'include',
          mode: 'cors',
        });

        const { data } = await res.json();
        return data;
      }}
      getSession={async () => {
        const res = await fetch(`${MW_URL}/siwe/session`, {
          cache: 'no-cache',
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
          cache: 'no-cache',
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
          cache: 'no-cache',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        return res.ok;
      }}
      onSignIn={() => {
        console.log('SIGN IN');
      }}
      signOutOnAccountChange
      signOutOnDisconnect
      signOutOnNetworkChange
      onSignOut={() => {
        console.log('SIGN OUT');
      }}
    >
      <ConnectKitProvider>{children}</ConnectKitProvider>
    </SIWEProvider>
  );
};
