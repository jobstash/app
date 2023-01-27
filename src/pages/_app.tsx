import '~/styles/globals.css';

import type { AppProps } from 'next/app';

import { RootProvider } from '~/contexts/root-context';

const App = ({ Component, pageProps }: AppProps) => (
  <RootProvider>
    <Component {...pageProps} />
  </RootProvider>
);

export default App;
