import '~/styles/globals.css';

import type { AppProps } from 'next/app';

import { Lato } from '@next/font/google';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-lato',
});

if (
  process.env.NODE_ENV === 'development' &&
  typeof window !== 'undefined' &&
  process.env.NEXT_PUBLIC_API_MOCKING === 'yes'
) {
  const { worker } = require('~/mocks/msw/browser');
  worker.start({
    onUnhandledRequest: (req: any, print: any) => {
      // Ignore nextjs image msw warnings
      if (req.url.pathname.startsWith('/_next')) {
        return;
      }

      // Print other warnings
      print.warning();
    },
  });
}

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => (
  <QueryClientProvider client={queryClient}>
    <Hydrate state={pageProps.dehydratedState}>
      <div className={`${lato.variable} font-sans`}>
        <Component {...pageProps} />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </Hydrate>
  </QueryClientProvider>
);

export default App;
