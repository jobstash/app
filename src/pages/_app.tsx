import '~/styles/globals.css';

import type { AppProps } from 'next/app';

import { Lato } from '@next/font/google';

const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-lato',
});

import { RootProvider } from '~/contexts/root-context';

const App = ({ Component, pageProps }: AppProps) => (
  <RootProvider>
    <div className={`${lato.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  </RootProvider>
);

export default App;
