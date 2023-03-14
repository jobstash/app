import '~/styles/globals.css';

import type { AppProps } from 'next/app';

import { Lato, Roboto } from '@next/font/google';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { lato, roboto } from '~/shared/core/constants';

if (
  process.env.NODE_ENV === 'development' &&
  typeof window !== 'undefined' &&
  process.env.NEXT_PUBLIC_API_MOCKING === 'yes'
) {
  const { worker } = require('~/mocks/msw/browser');
  worker.start({
    onUnhandledRequest: (req: any, print: any) => {
      // Ignore nextjs image msw warnings
      if (
        req.url.pathname.startsWith('/_next') ||
        req.url.pathname.startsWith('/icons') ||
        req.url.hostname.includes('middleware-dev')
      ) {
        return;
      }

      // Print other warnings
      print.warning();
    },
  });
}

const queryRetryCount =
  Number(process.env.NEXT_PUBLIC_QUERY_RETRY_COUNT) || false;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: queryRetryCount,
    },
  },
});

const App = ({ Component, pageProps }: AppProps) => (
  <QueryClientProvider client={queryClient}>
    <Hydrate state={pageProps.dehydratedState}>
      <div className={`${lato.variable} ${roboto.variable} font-roboto`}>
        <Component {...pageProps} />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </Hydrate>
  </QueryClientProvider>
);

export default App;
