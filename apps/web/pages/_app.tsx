import '../styles/globals.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect } from 'react';

import { ANALYTICS_ID } from '@jobstash/shared/core';

import { MantineProvider, ReactQueryProvider } from '@jobstash/shared/state';

//
// import { LoadingPage } from '@jobstash/shared/pages';
// import { AuthProvider } from '@jobstash/auth/state';
// import { WagmiSiweSync } from '@jobstash/auth/feature';

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

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
              __html: `
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
          {/* <AuthProvider screenLoader={<LoadingPage />}> */}
          <Component {...pageProps} />
          {/* <WagmiSiweSync /> */}
          {/* </AuthProvider> */}
        </MantineProvider>
      </ReactQueryProvider>
    </>
  );
};

export default App;
