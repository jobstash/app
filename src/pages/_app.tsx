import '~/styles/globals.css';

import type { AppProps } from 'next/app';

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConnectKitProvider, getDefaultClient, SIWEProvider } from 'connectkit';
import { configureChains, createClient, mainnet, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import { lato, roboto, siweConfig } from '~/shared/core/constants';

// If (
//   process.env.NODE_ENV === 'development' &&
//   typeof window !== 'undefined' &&
//   process.env.NEXT_PUBLIC_API_MOCKING === 'yes'
// ) {
//   const { worker } = require('~/mocks/msw/browser');
//   worker.start({
//     onUnhandledRequest: (req: any, print: any) => {
//       // Ignore nextjs image msw warnings
//       if (
//         req.url.pathname.startsWith('/_next') ||
//         req.url.pathname.startsWith('/icons') ||
//         req.url.hostname.includes('middleware-dev')
//       ) {
//         return;
//       }

//       // Print other warnings
//       print.warning();
//     },
//   });
// }

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
          {...siweConfig}
          onSignIn={(session) => console.log('provider session =', session)}
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

export default App;
