import { type NextRouter, useRouter } from 'next/router';

import { LoadingPage } from '@jobstash/shared/pages';
import { useQueryClient } from '@tanstack/react-query';
import { useSIWE } from 'connectkit';
import { useAtom } from 'jotai';
import { useAccount, useDisconnect } from 'wagmi';

import { CHECK_WALLET_ROLES, CheckWalletRole } from '@jobstash/auth/core';
import { MW_URL, SENTRY_MW_NON_200_RESPONSE } from '@jobstash/shared/core';
import { notifError, sentryMessage } from '@jobstash/shared/utils';

import { isLoadingDevCallbackAtom } from '@jobstash/auth/state';
import { getCheckWallet } from '@jobstash/auth/data';

const DevGithubCallbackPage = () => {
  const { push } = useRouter();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { signOut } = useSIWE();

  const logout = () => {
    disconnect();
    signOut();
  };

  const [isLoadingDevCallback, setIsLoadingDevCallback] = useAtom(
    isLoadingDevCallbackAtom,
  );

  const queryClient = useQueryClient();

  const githubAuth = async (
    code: string,
    address: string,
    role: CheckWalletRole,
  ) => {
    setIsLoadingDevCallback(true);

    const { success, data } = await postGithubLogin(code, address, role);

    // If github login failed, alert (for now), then push to root page
    if (!success) {
      handleGithubLoginFailure(data, logout, push, role);
    }

    const checkWalletData = await getCheckWallet();
    queryClient.setQueryData(['check-wallet'], checkWalletData);

    // Push directly to profile repositories page
    push('/profile/repositories');
  };

  const codeParam = new URLSearchParams(window.location.search).get('code');

  if (codeParam && address && !isLoadingDevCallback) {
    githubAuth(codeParam, address, CHECK_WALLET_ROLES.DEV);
  }

  return <LoadingPage />;
};

const postGithubLogin = async (
  code: string,
  address: string,
  role: CheckWalletRole,
) => {
  const githubLoginRes = await fetch(`${MW_URL}/github/github-login`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code, wallet: address, role }),
  });

  const { ok } = githubLoginRes;
  const data = await githubLoginRes.json();

  return { data, success: ok && data.success };
};

const handleGithubLoginFailure = (
  data: Record<string, string>,
  logout: () => void,
  push: NextRouter['push'],
  role: CheckWalletRole,
) => {
  const isGithubAccountUsed = data.message === GH_ACCOUNT_USED_MESSAGE;

  const notifProps = isGithubAccountUsed
    ? {
        title: 'Github account is already used!',
        message: 'Please try using a different github account.',
        autoClose: 15_000,
      }
    : undefined;

  notifError(notifProps);

  sentryMessage(
    `githubLoginRes: ${SENTRY_MW_NON_200_RESPONSE}`,
    JSON.stringify(data),
  );

  const isDev = role !== CHECK_WALLET_ROLES.DEV;

  if (!isGithubAccountUsed || !isDev) logout();

  const redirectUrl = isGithubAccountUsed && isDev ? '/profile' : '/';
  setTimeout(() => {
    push(redirectUrl);
  }, 1000);
};

export default DevGithubCallbackPage;

const GH_ACCOUNT_USED_MESSAGE =
  'Github user node already has a user associated with it';
