import '../styles/globals.css';
import 'nprogress/nprogress.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect } from 'react';

import NProgress from 'nprogress';

import { ANALYTICS_ID } from '@jobstash/shared/core';

import { MantineProvider, ReactQueryProvider } from '@jobstash/shared/state';
import { useNProgress } from '@jobstash/shared/state';

//
// import { LoadingPage } from '@jobstash/shared/pages';
// import { AuthProvider } from '@jobstash/auth/state';
// import { WagmiSiweSync } from '@jobstash/auth/feature';

NProgress.configure({
  template: '<div class="bar" role="bar"><div class="peg"></div></div></div>',
});

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    router.beforePopState(() => {
      window.history.scrollRestoration = 'manual';
      return true;
    });
  }, [router]);

  const { startNProgress, stopNProgress } = useNProgress();
  useEffect(() => {
    const handleStart = () => {
      startNProgress();
    };

    const handleComplete = (url: string) => {
      stopNProgress(false, url);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', stopNProgress);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', stopNProgress);
    };
  }, [router, startNProgress, stopNProgress]);

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
