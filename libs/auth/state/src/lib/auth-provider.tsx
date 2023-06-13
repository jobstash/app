import { ReactNode } from 'react';

import { ConnectKitProvider, getDefaultConfig, SIWEProvider } from 'connectkit';
import { createConfig, useAccount, WagmiConfig } from 'wagmi';

import { getSiweConfig } from '@jobstash/auth/core';
import {
  FRONTEND_URL,
  INFRURA_ID,
  WALLETCONNECT_PROJECT_ID,
} from '@jobstash/shared/core';

import { useSiweLogout } from './use-siwe-logout';
import { useSiweMessage } from './use-siwe-message';
import { useSiweNonce } from './use-siwe-nonce';
import { useSiweSession } from './use-siwe-session';
import { useSiweVerify } from './use-siwe-verify';

const wagmiConfig = createConfig(
  getDefaultConfig({
    infuraId: INFRURA_ID,
    walletConnectProjectId: WALLETCONNECT_PROJECT_ID,
    appName: 'JobStash',
    appDescription: 'The Ultimate Job Aggregator for Crypto Developers',
    appUrl: FRONTEND_URL,
    appIcon: `${FRONTEND_URL}/android-chrome-512x512.png`,
  }),
);

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const { address } = useAccount();
  const { siweNonceData } = useSiweNonce();
  const { siweSessionData } = useSiweSession();
  const { siweMessageData } = useSiweMessage({ nonce: siweNonceData, address });
  const { siweVerify } = useSiweVerify();
  const { siweLogout } = useSiweLogout();

  const siweConfig = getSiweConfig({
    nonce: siweNonceData,
    message: siweMessageData,
    address: siweSessionData?.address,
    chainId: siweSessionData?.chainId,
    verify: async ({ message, signature }) =>
      siweVerify({ message, signature }),
    logout: async () => siweLogout(),
  });

  console.log(
    JSON.stringify(
      {
        siweNonceData,
        siweSessionData,
        siweMessageData,
      },
      undefined,
      '\t',
    ),
  );

  return (
    <WagmiConfig config={wagmiConfig}>
      <SIWEProvider {...siweConfig}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </SIWEProvider>
    </WagmiConfig>
  );
};
