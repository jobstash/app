import '~/styles/globals.css';

import type { AppProps } from 'next/app';

import { ApolloProvider } from '@apollo/client';

import { client } from '~/graphql/apollo-client';

if (
  process.env.NODE_ENV === 'development' &&
  typeof window !== 'undefined' &&
  process.env.NEXT_PUBLIC_API_MOCKING === 'yes'
) {
  const { worker } = require('~/mocks/browser');
  worker.start();
}

const App = ({ Component, pageProps }: AppProps) => (
  <ApolloProvider client={client}>
    <Component {...pageProps} />
  </ApolloProvider>
);

export default App;
