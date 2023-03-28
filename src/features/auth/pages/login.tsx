import { useRouter } from 'next/router';

import { ConnectKitButton } from 'connectkit';

import { Text } from '~/shared/components';

import {
  CHECK_WALLET_FLOWS,
  CHECK_WALLET_ROLES,
  CHECK_WALLET_ROUTE,
} from '../core/constants';
import { useWalletAuthContext } from '../hooks';
import { CenteredLayout } from '../layouts/centered-layout';

import EmptyPage from './empty-page';

const LoginPage = () => {
  const { push } = useRouter();
  const { isConnected, isPageEmpty, flow } = useWalletAuthContext();

  if (isPageEmpty) return <EmptyPage isLoading />;

  // Get rid of flicker before redirect
  if (flow && flow !== CHECK_WALLET_FLOWS.LOGIN) {
    push(CHECK_WALLET_ROUTE[flow]);
    return <EmptyPage isLoading />;
  }

  const title = `Sign In${isConnected ? ' with Ethereum' : ''}`;
  const message = isConnected
    ? 'You need to sign a message to prove ownership of the connected Ethereum address'
    : 'You need to connect you wallet so we can start setting up your account using your Ethereum Address.';
  const buttonText = isConnected ? 'Continue' : 'Connect Wallet';

  return (
    <CenteredLayout>
      <div className="flex flex-col space-y-6 rounded-3xl bg-gradient-to-r from-[#141317] to-black/60 p-8">
        <hr className="border-t border-white/10" />

        <Text size="lg" fw="bold">
          {title}
        </Text>

        <div className="w-72">
          <Text color="dimmed">{message}</Text>
        </div>
        <hr className="border-t border-white/10" />

        <ConnectKitButton.Custom>
          {({ show, isConnecting }) => (
            <button
              className="flex items-center justify-center rounded-lg bg-gradient-to-l from-quaternary to-tertiary py-3 transition duration-150 ease-in-out hover:opacity-90"
              onClick={() => (show ? show() : null)}
            >
              <Text fw="semibold">
                {isConnecting ? 'Connecting' : buttonText}
              </Text>
            </button>
          )}
        </ConnectKitButton.Custom>
      </div>
    </CenteredLayout>
  );
};

LoginPage.requiredRole = CHECK_WALLET_ROLES.ANON;

export default LoginPage;
