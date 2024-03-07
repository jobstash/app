import './globals.css';

import type { Metadata, Viewport } from 'next';

import { METADATA } from '~/shared/core/constants';
import { lato, roboto } from '~/shared/core/fonts';
import { ConnectWalletButton } from '~/shared/components/connect-wallet-button';
import { InitPathSyncer } from '~/shared/components/init-path-syncer';
import { Nav } from '~/shared/components/nav';
import { PageScrollDisabler } from '~/shared/components/page-scroll-disabler';
import { NextUIProvider } from '~/shared/providers/next-ui-provider';
import { ReactQueryProvider } from '~/shared/providers/react-query-provider';
import { WagmiProvider } from '~/shared/providers/wagmi-provider';
import { WalletProvider } from '~/shared/providers/wallet-provider';

export const metadata: Metadata = {
  title: METADATA.SITE_NAME,
  description: METADATA.SITE_SLOGAN,
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={`${lato.variable} ${roboto.variable}`}>
      <body>
        <NextUIProvider>
          <WagmiProvider>
            <ReactQueryProvider>
              <WalletProvider>
                <Nav connectWalletButton={<ConnectWalletButton />} />
                {children}
              </WalletProvider>
            </ReactQueryProvider>
          </WagmiProvider>
        </NextUIProvider>

        <PageScrollDisabler />
        <InitPathSyncer />
      </body>
    </html>
  );
};

export default RootLayout;
