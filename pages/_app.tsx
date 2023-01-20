import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Atom, Provider } from 'jotai';
import type { AppProps } from 'next/app';

import store from '../store';
import '../styles/globals.css';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'yes') {
  if (typeof window === 'undefined') {
    import('../mocks/server').then(({ server }) => {
      server.listen();
    });
  } else {
    import('../mocks/browser').then(({ browser }) => {
      browser.start();
    });
  }
}

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps<any>) {
  const { initialState } = pageProps;
  return (
    <Provider
      initialValues={
        initialState &&
        ([[store.counterAtom, initialState]] as Iterable<
          readonly [Atom<unknown>, unknown]
        >)
      }
    >
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
