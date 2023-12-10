import { type NextRouter, useRouter } from 'next/router';

import { LoadingPage } from '@jobstash/shared/pages';
import { useSIWE } from 'connectkit';
import { useAtom } from 'jotai';
import { useAccount } from 'wagmi';

import { CHECK_WALLET_ROLES, CheckWalletRole } from '@jobstash/auth/core';
import { MW_URL, SENTRY_MW_NON_200_RESPONSE } from '@jobstash/shared/core';
import { notifError, sentryMessage } from '@jobstash/shared/utils';

import { isLoadingDevCallbackAtom } from '@jobstash/auth/state';

const DevGithubCallbackPage = () => {
  const { push } = useRouter();
  const { address } = useAccount();
  const { signOut } = useSIWE();

  const [isLoadingDevCallback, setIsLoadingDevCallback] = useAtom(
    isLoadingDevCallbackAtom,
  );

  const githubAuth = async (
    code: string,
    address: string,
    role: CheckWalletRole,
  ) => {
    setIsLoadingDevCallback(true);

    const { success, data } = await postGithubLogin(code, address, role);

    // If github login failed, alert (for now), then push to root page
    if (!success) {
      handleGithubLoginFailure(data, signOut, push);
    }

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
  signOut: () => void,
  push: NextRouter['push'],
) => {
  sentryMessage(
    `githubLoginRes: ${SENTRY_MW_NON_200_RESPONSE}`,
    JSON.stringify(data),
  );

  notifError();

  // Disconnect then redirect
  signOut();
  setTimeout(() => {
    push('/');
  }, 1000);
};

export default DevGithubCallbackPage;
