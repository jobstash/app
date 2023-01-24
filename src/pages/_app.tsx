import '~/styles/globals.css';

import type { AppProps } from 'next/app';

if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  const { worker } = require('~/mocks/browser');
  worker.start();
}

const App = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default App;
