import './globals.css';

import type { Metadata, Viewport } from 'next';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { METADATA, QUERY_STALETIME } from '~/shared/core/constants';
import { lato, roboto } from '~/shared/core/fonts';
import { getQueryClient } from '~/shared/utils/get-query-client';
import { ConnectWalletButton } from '~/shared/components/connect-wallet-button';
import { InitPathSyncer } from '~/shared/components/init-path-syncer';
import { Nav } from '~/shared/components/nav';
import { PageScrollDisabler } from '~/shared/components/page-scroll-disabler';
import { NextUIProvider } from '~/shared/providers/next-ui-provider';
import { ReactQueryProvider } from '~/shared/providers/react-query-provider';
import { WagmiProvider } from '~/shared/providers/wagmi-provider';
import { WalletProvider } from '~/shared/providers/wallet-provider';

import { userQueryKeys } from '~/users/core/query-keys';
import { getWalletData } from '~/users/api/get-wallet-data';

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

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: userQueryKeys.walletData(),
    queryFn: () => getWalletData(),
    staleTime: QUERY_STALETIME.DEFAULT,
  });

  return (
    <html lang="en" className={`${lato.variable} ${roboto.variable}`}>
      <body>
        <NextUIProvider>
          <WagmiProvider>
            <ReactQueryProvider>
              <HydrationBoundary state={dehydrate(queryClient)}>
                <WalletProvider>
                  <Nav connectWalletButton={<ConnectWalletButton />} />
                  {children}
                </WalletProvider>
              </HydrationBoundary>
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
