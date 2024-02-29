import { getDefaultConfig } from 'connectkit';
import {
  createConfig,
  fallback,
  http,
  WagmiProvider as BaseProvider,
} from 'wagmi';
import { mainnet } from 'wagmi/chains';

import {
  FRONTEND_URL,
  INFRURA_ID,
  WALLETCONNECT_PROJECT_ID,
} from '@jobstash/shared/core';

const config = createConfig(
  getDefaultConfig({
    appName: 'JobStash',
    appDescription: 'The Ultimate Crypto Native Job Aggregator',
    appUrl: FRONTEND_URL,
    appIcon: `${FRONTEND_URL}/apple-touch-icon.png`,
    walletConnectProjectId: WALLETCONNECT_PROJECT_ID,
    chains: [mainnet],
    transports: {
      [mainnet.id]: fallback([
        http(`https://mainnet.infura.io/v3/${INFRURA_ID}`),
        http(), // Public fallback
      ]),
    },
    ssr: true,
  }),
);

interface Props {
  children: React.ReactNode;
}

export const WagmiProvider = ({ children }: Props) => (
  <BaseProvider config={config}>{children}</BaseProvider>
);
