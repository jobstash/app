/* eslint-disable react/hook-use-state */
import '~/styles/globals.css';
import 'nprogress/nprogress.css';

import type { AppProps } from 'next/app';
import NextApp from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConnectKitProvider, getDefaultClient, SIWEProvider } from 'connectkit';
import NProgress from 'nprogress';
import { configureChains, createClient, mainnet, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import {
  EVENT_SIWE_LOGIN,
  EVENT_SIWE_LOGOUT,
} from '~/features/auth/core/constants';
import { CheckWalletFlow, CheckWalletRole } from '~/features/auth/core/types';
import { ProtectedLayout } from '~/features/auth/layouts/protected-layout';
import { WalletAuthProvider } from '~/features/auth/providers/wallet-auth-provider';
import {
  siweCreateMessage,
  siweGetNonce,
  siweGetSession,
  siweSignOut,
  siweVerifyMessage,
} from '~/features/auth/utils';
import { lato, roboto } from '~/shared/core/constants';
import { MantineProvider } from '~/shared/mantine';

NProgress.configure({
  template: '<div class="bar" role="bar"><div class="peg"></div></div></div>',
});
const nProgressRoutes = new Set(['/jobs']);

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

type AppPropsWithAuth = AppProps & {
  Component: {
    requiredRole?: CheckWalletRole;
    requiredFlow?: CheckWalletFlow;
  };
};

const App = ({ Component, pageProps }: AppPropsWithAuth) => {
  // This ensures that data is not shared between different users and requests
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: Number(process.env.NEXT_PUBLIC_QUERY_RETRY_COUNT) || false,
          },
        },
      }),
  );

  const router = useRouter();
  useEffect(() => {
    const shouldDisplay = nProgressRoutes.has(router.asPath);
    const handleStart = () => {
      if (shouldDisplay) NProgress.start();
    };

    const handleStop = () => {
      if (shouldDisplay) NProgress.done();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  useEffect(() => {
    router.beforePopState(() => {
      window.history.scrollRestoration = 'manual';
      return true;
    });
  }, [router]);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <WagmiConfig client={connectkitClient}>
          <SIWEProvider
            getNonce={siweGetNonce}
            getSession={siweGetSession}
            createMessage={siweCreateMessage}
            verifyMessage={siweVerifyMessage}
            signOut={siweSignOut}
            onSignIn={() => {
              document.dispatchEvent(new Event(EVENT_SIWE_LOGIN));
            }}
            onSignOut={() => {
              document.dispatchEvent(new Event(EVENT_SIWE_LOGOUT));
            }}
          >
            <ConnectKitProvider theme="auto" mode="dark">
              <WalletAuthProvider>
                <MantineProvider>
                  <div
                    className={`${lato.variable} ${roboto.variable} font-roboto`}
                  >
                    {Component.requiredRole ? (
                      <ProtectedLayout
                        requiredRole={Component.requiredRole}
                        requiredFlow={Component.requiredFlow}
                      >
                        <Component {...pageProps} />
                      </ProtectedLayout>
                    ) : (
                      <Component {...pageProps} />
                    )}
                  </div>
                </MantineProvider>
              </WalletAuthProvider>
            </ConnectKitProvider>
          </SIWEProvider>
        </WagmiConfig>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </Hydrate>
    </QueryClientProvider>
  );
};

// At the moment all pages from the app requires some data from the server.
// Therefore, its okay to opt out of the automatic static optimization feature.
App.getInitialProps = async (ctx: any): Promise<any> => {
  const appProps = await NextApp.getInitialProps(ctx);

  return { ...appProps };
};

export default App;
