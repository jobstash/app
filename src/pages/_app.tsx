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
  CHECK_WALLET_FLOWS,
  CHECK_WALLET_ROLES,
  EVENT_SIWE_LOGIN,
  EVENT_SIWE_LOGOUT,
} from '~/features/auth/core/constants';
import { CheckWalletFlow, CheckWalletRole } from '~/features/auth/core/types';
import { ProtectedLayout } from '~/features/auth/layouts/protected-layout';
import { WalletAuthProvider } from '~/features/auth/providers/wallet-auth-provider';
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

type AppPropsWithAuth = AppProps & {
  Component: {
    requiredRole?: CheckWalletRole;
    requiredFlow?: CheckWalletFlow;
  };
  role: CheckWalletRole;
  flow: CheckWalletFlow;
};

const App = ({ Component, pageProps, role, flow }: AppPropsWithAuth) => (
  <QueryClientProvider client={queryClient}>
    <Hydrate state={pageProps.dehydratedState}>
      <WagmiConfig client={connectkitClient}>
        <SIWEProvider
          getNonce={siweGetNonce}
          getSession={siweGetSession}
          createMessage={siweCreateMessage}
          verifyMessage={siweVerifyMessage}
          signOut={siweSignOut}
          onSignIn={() => {
            document.dispatchEvent(new Event(EVENT_SIWE_LOGIN));
          }}
          onSignOut={() => {
            document.dispatchEvent(new Event(EVENT_SIWE_LOGOUT));
          }}
        >
          <ConnectKitProvider theme="auto" mode="dark">
            <WalletAuthProvider role={role} flow={flow}>
              <div
                className={`${lato.variable} ${roboto.variable} font-roboto`}
              >
                {Component.requiredRole ? (
                  <ProtectedLayout
                    requiredRole={Component.requiredRole}
                    requiredFlow={Component.requiredFlow}
                  >
                    <Component {...pageProps} />
                  </ProtectedLayout>
                ) : (
                  <Component {...pageProps} />
                )}
              </div>
            </WalletAuthProvider>
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

  const res = await fetch(
    `${process.env['NEXT_PUBLIC_MW_URL']}/siwe/check-wallet`,
    {
      mode: 'cors',
      credentials: 'include',
      headers: {
        cookie: ctx.ctx.req?.headers.cookie,
      } as any,
    },
  );
  const {
    data: { role, flow },
  } = await res.json();

  return { ...appProps, role, flow };
};

export default App;
