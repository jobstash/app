import '~/styles/globals.css';

import type { AppProps } from 'next/app';

import { Lato } from '@next/font/google';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { RootProvider } from '~/contexts/root-context';

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
  worker.start();
}

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => (
  <QueryClientProvider client={queryClient}>
    <Hydrate state={pageProps.dehydratedState}>
      <RootProvider>
        <div className={`${lato.variable} font-sans`}>
          <Component {...pageProps} />
        </div>
      </RootProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </Hydrate>
  </QueryClientProvider>
);

export default App;
