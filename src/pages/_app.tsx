import '~/styles/globals.css';

import type { AppProps } from 'next/app';
import NextApp from 'next/app';

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConnectKitProvider, getDefaultClient, SIWEProvider } from 'connectkit';
import { configureChains, createClient, mainnet, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import {
  siweCreateMessage,
  siweGetNonce,
  siweGetSession,
  siweSignOut,
  siweVerifyMessage,
} from '~/features/auth/utils';
import { lato, roboto } from '~/shared/core/constants';

const queryRetryCount =
  Number(process.env.NEXT_PUBLIC_QUERY_RETRY_COUNT) || false;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: queryRetryCount,
    },
  },
});

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

const App = ({ Component, pageProps }: AppProps) => (
  <QueryClientProvider client={queryClient}>
    <Hydrate state={pageProps.dehydratedState}>
      <WagmiConfig client={connectkitClient}>
        <SIWEProvider
          getNonce={siweGetNonce}
          getSession={siweGetSession}
          createMessage={siweCreateMessage}
          verifyMessage={siweVerifyMessage}
          signOut={siweSignOut}
          onSignIn={(session) => {
            console.log('provider session =', session);
          }}
        >
          <ConnectKitProvider theme="auto" mode="dark">
            <div className={`${lato.variable} ${roboto.variable} font-roboto`}>
              <Component {...pageProps} />
            </div>
          </ConnectKitProvider>
        </SIWEProvider>
      </WagmiConfig>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </Hydrate>
  </QueryClientProvider>
);

// At the moment all pages from the app requires some data from the server.
// Therefore, its okay to opt out of the automatic static optimization feature.
App.getInitialProps = async (ctx: any): Promise<any> => {
  const appProps = await NextApp.getInitialProps(ctx);
  return { ...appProps };
};

export default App;
