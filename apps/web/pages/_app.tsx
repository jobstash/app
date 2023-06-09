import '../styles/globals.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect } from 'react';
import { ErrorIcon, resolveValue, Toaster } from 'react-hot-toast';

import { MantineProvider } from '@mantine/core';
import { configureChains, createConfig, mainnet, WagmiConfig } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

import { ANALYTICS_ID, INFRURA_ID } from '@jobstash/shared/core';
import { cn } from '@jobstash/shared/utils';

import { ReactQueryProvider } from '@jobstash/shared/state';

import { Text } from '@jobstash/shared/ui';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [infuraProvider({ apiKey: INFRURA_ID }), publicProvider()],
);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  publicClient,
  webSocketPublicClient,
});

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
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme: 'dark', cursorType: 'pointer' }}
        >
          <WagmiConfig config={wagmiConfig}>
            <Component {...pageProps} />
          </WagmiConfig>
        </MantineProvider>
      </ReactQueryProvider>

      <Toaster
        position="top-left"
        toastOptions={{ success: { duration: 4000 } }}
      >
        {(t) => {
          const isBlank = t.type === 'blank';
          const isError = t.type === 'error';
          const isSuccess = t.type === 'success';

          return (
            <div
              key={typeof t.message === 'string' ? t.message : undefined}
              className={cn(
                'rounded-xl bg-gradient-to-l from-primary to-tertiary p-[1px]',
                { 'animate-shake': isError },
                { 'animate-fade-in-left': !isError },
              )}
            >
              <div
                className={cn(
                  'p-4 text-white flex justify-around items-center gap-2 rounded-xl bg-darker-gray',
                )}
              >
                {isError && <ErrorIcon />}
                {isBlank && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="orange"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"
                    />
                  </svg>
                )}
                {isSuccess && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="green"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}

                <Text>{resolveValue(t.message, t) as string}</Text>
              </div>
            </div>
          );
        }}
      </Toaster>
    </>
  );
};

export default App;
