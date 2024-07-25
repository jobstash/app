import { PrivyProvider as BaseProvider, usePrivy } from '@privy-io/react-auth';

import { PRIVY_APP_ID } from '@jobstash/shared/core';

const THEME = 'dark';
const ACCENT_COLOR = '#676FFF';
const LOGO = 'https://jobstash.xyz/logo.png';
const CREATE_ON_LOGIN = 'all-users';

interface Props {
  screenLoader: React.ReactNode;
  children: React.ReactNode;
}

const LoadingWrapper = ({ screenLoader, children }: Props) => {
  const { ready } = usePrivy();

  return ready ? children : screenLoader;
};

export const PrivyProvider = ({ screenLoader, children }: Props) => (
  <BaseProvider
    appId={PRIVY_APP_ID}
    config={{
      // Customize Privy's appearance in your app
      appearance: {
        theme: THEME,
        accentColor: ACCENT_COLOR,
        logo: LOGO,
      },
      // Create embedded wallets for users who don't have a wallet
      embeddedWallets: {
        createOnLogin: CREATE_ON_LOGIN,
      },
    }}
  >
    <LoadingWrapper screenLoader={screenLoader}>{children}</LoadingWrapper>
  </BaseProvider>
);
