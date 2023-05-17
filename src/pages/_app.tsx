/* eslint-disable react/hook-use-state */
import '~/styles/globals.css';
import 'nprogress/nprogress.css';

import type { AppProps } from 'next/app';
import NextApp from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

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
import {
  lato,
  NEXT_PUBLIC_GA_MEASUREMENT_ID,
  roboto,
} from '~/shared/core/constants';
import { MantineProvider } from '~/shared/mantine';
import { gaPageView } from '~/shared/utils';

NProgress.configure({
  template: '<div class="bar" role="bar"><div class="peg"></div></div></div>',
});
const nProgressExcludedPathnames = new Set(['/jobs/[key]/[tab]']);

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
    const shouldDisplay = !nProgressExcludedPathnames.has(router.pathname);
    const startNProgress = () => {
      if (shouldDisplay) NProgress.start();
    };

    const stopNProgress = () => {
      if (shouldDisplay) NProgress.done();
    };

    const handleStart = () => {
      startNProgress();
    };

    const handleComplete = (url: string) => {
      console.log('COMPELETE url =', url);
      stopNProgress();
      gaPageView(url);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', stopNProgress);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', stopNProgress);
    };
  }, [router]);

  useEffect(() => {
    router.beforePopState(() => {
      window.history.scrollRestoration = 'manual';
      return true;
    });
  }, [router]);

  return (
    <>
      <Head>
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
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
                    <Toaster position="bottom-center" />
                  </MantineProvider>
                </WalletAuthProvider>
              </ConnectKitProvider>
            </SIWEProvider>
          </WagmiConfig>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </Hydrate>
      </QueryClientProvider>
    </>
  );
};

// At the moment all pages from the app requires some data from the server.
// Therefore, its okay to opt out of the automatic static optimization feature.
App.getInitialProps = async (ctx: any): Promise<any> => {
  const appProps = await NextApp.getInitialProps(ctx);

  return { ...appProps };
};

export default App;
