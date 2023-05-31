/* eslint-disable @typescript-eslint/no-explicit-any */
import '../styles/globals.css';

import NextApp from 'next/app';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect } from 'react';

import { MantineProvider } from '@mantine/core';

import { NEXT_PUBLIC_GA_MEASUREMENT_ID } from '@jobstash/shared/core';

import { ReactQueryProvider } from '@jobstash/shared/state';

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    router.beforePopState(() => {
      window.history.scrollRestoration = 'manual';
      return true;
    });
  }, [router]);

  const analyticsId = NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <>
      <Head>
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      {analyticsId && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${analyticsId}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </>
      )}
      <ReactQueryProvider dehydratedState={pageProps.dehydratedState}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme: 'dark', cursorType: 'pointer' }}
        >
          <Component {...pageProps} />
        </MantineProvider>
      </ReactQueryProvider>
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
