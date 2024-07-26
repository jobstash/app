import {
  createConfig,
  fallback,
  http,
  WagmiProvider as BaseProvider,
} from 'wagmi';
import { mainnet, optimism, polygon } from 'wagmi/chains';

import { INFRURA_ID } from '@jobstash/shared/core';

const config = createConfig({
  chains: [mainnet, polygon, optimism],
  transports: {
    [mainnet.id]: fallback([
      http(`https://mainnet.infura.io/v3/${INFRURA_ID}`),
      http(), // Public fallback
    ]),
    [polygon.id]: fallback([http()]),
    [optimism.id]: fallback([http()]),
  },
  ssr: true,
});

interface Props {
  children: React.ReactNode;
}

export const WagmiProvider = ({ children }: Props) => (
  <BaseProvider config={config}>{children}</BaseProvider>
);
