'use client';

import { getDefaultConfig } from 'connectkit';
import {
  createConfig,
  fallback,
  http,
  WagmiProvider as BaseProvider,
} from 'wagmi';
import { mainnet } from 'wagmi/chains';

import { FRONTEND_URL, INFURA_ID } from '~/shared/core/envs';

const config = createConfig(
  getDefaultConfig({
    appName: 'JobStash',
    appDescription: 'The Ultimate Crypto Native Job Aggregator',
    appUrl: FRONTEND_URL,
    walletConnectProjectId: '',
    appIcon: `${FRONTEND_URL}/apple-touch-icon.png`,
    chains: [mainnet],
    transports: {
      [mainnet.id]: fallback([
        http(`https://mainnet.infura.io/v3/${INFURA_ID}`),
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
