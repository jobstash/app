import '../styles/globals.css';
import 'animate.css/animate.min.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect } from 'react';

import { LoadingPage } from '@jobstash/shared/pages';
import { useAtomValue } from 'jotai';

import { ANALYTICS_ID } from '@jobstash/shared/core';
import { cn } from '@jobstash/shared/utils';

import { AuthProvider } from '@jobstash/auth/state';
import {
  isOpenTopBannerAtom,
  MantineProvider,
  ReactQueryProvider,
} from '@jobstash/shared/state';

import { TopBanner } from '@jobstash/shared/ui';
import { WagmiSiweSync } from '@jobstash/auth/feature';

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    router.beforePopState(() => {
      window.history.scrollRestoration = 'manual';
      return true;
    });
  }, [router]);

  const isOpenTopBanner = useAtomValue(isOpenTopBannerAtom);

  return (
    <>
      <Head>
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      {ANALYTICS_ID && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_ID}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `p
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${ANALYTICS_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </>
      )}
      <ReactQueryProvider dehydratedState={pageProps.dehydratedState}>
        <MantineProvider>
          <AuthProvider screenLoader={<LoadingPage />}>
            {/* <Component {...pageProps} /> */}

            <TopBanner />
            <div className={cn({ 'pt-10': isOpenTopBanner })}>
              <Component {...pageProps} />
            </div>

            <WagmiSiweSync />
          </AuthProvider>
        </MantineProvider>
      </ReactQueryProvider>
    </>
  );
};

export default App;
