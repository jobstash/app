import '../styles/globals.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect } from 'react';

import { LoadingPage } from '@jobstash/shared/pages';
import { NextUIProvider } from '@nextui-org/react';
import { useAtomValue } from 'jotai';
import { Provider as JotaiProvider } from 'jotai';

import { ANALYTICS_ID } from '@jobstash/shared/core';
import { cn } from '@jobstash/shared/utils';

import { AuthProvider, WagmiProvider } from '@jobstash/auth/state';
import {
  isOpenTopBannerAtom,
  MantineProvider,
  MwVersionProvider,
  PrivyProvider,
  ReactQueryProvider,
  useDisableScrollListener,
} from '@jobstash/shared/state';

import { NewFeatureModal, ReportModal, TopBanner } from '@jobstash/shared/ui';

const NAME = 'JobStash';
const DESCRIPTION = 'Crypto Native Jobs';
const WEBSITE_URL = 'https://www.jobstash.xyz';
const IMAGE_URL =
  'https://ytjreygb5x3jlwhdfzouuyx4ahhupibro6rb2ibqlyq7l3kze7da.arweave.net/xNMSYMHt9pXY4y5dSmL8Ac9HoDF3oh0gMF4h9e1ZJ8Y';

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    router.beforePopState(() => {
      window.history.scrollRestoration = 'manual';
      return true;
    });
  }, [router]);

  const isOpenTopBanner = useAtomValue(isOpenTopBannerAtom);

  useDisableScrollListener();

  return (
    <>
      <Head>
        {/* <link rel="manifest" href="/site.webmanifest" /> */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <title>{NAME}</title>
        <meta name="description" content={DESCRIPTION} />

        <meta property="og:title" content={NAME} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={IMAGE_URL} />
        <meta property="og:url" content={WEBSITE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={NAME} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={NAME} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={IMAGE_URL} />
        <meta name="twitter:site" content="@jobstash_xyz" />

        <link rel="canonical" href={WEBSITE_URL} />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </Head>

      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            url: WEBSITE_URL,
            name: NAME,
            description: DESCRIPTION,
            publisher: {
              '@type': 'Organization',
              name: NAME,
              logo: {
                '@type': 'ImageObject',
                url: 'https://jobstash.xyz/logo.png',
              },
            },
            sameAs: [
              'https://twitter.com/jobstash_xyz',
              'https://telegram.me/jobstash',
            ],
          }),
        }}
      />

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
              __html: `window.dataLayer = window.dataLayer || [];
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
      <NextUIProvider>
        <MantineProvider>
          <TopBanner />
          <WagmiProvider>
            <ReactQueryProvider dehydratedState={pageProps.dehydratedState}>
              <MwVersionProvider screenLoader={<LoadingPage />}>
                <PrivyProvider screenLoader={<LoadingPage />}>
                  <AuthProvider screenLoader={<LoadingPage />}>
                    {/* <DonateModal /> */}
                    <div
                      className={cn({
                        'pt-[54px] sm:pt-[40px]': isOpenTopBanner,
                      })}
                    >
                      <JotaiProvider>
                        <Component {...pageProps} />
                      </JotaiProvider>
                    </div>

                    <ReportModal />
                    <NewFeatureModal />
                  </AuthProvider>
                </PrivyProvider>
              </MwVersionProvider>
            </ReactQueryProvider>
          </WagmiProvider>
        </MantineProvider>
      </NextUIProvider>
    </>
  );
};

export default App;
