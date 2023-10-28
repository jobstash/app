import { type NextRouter, useRouter } from 'next/router';

import { LoadingPage } from '@jobstash/shared/pages';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useSIWE } from 'connectkit';
import { useAtom } from 'jotai';
import { useAccount } from 'wagmi';

import {
  CHECK_WALLET_ROLES,
  CHECK_WALLET_ROUTE,
  CheckWalletRole,
  redirectFlowsSet,
} from '@jobstash/auth/core';
import { MW_URL, SENTRY_MW_NON_200_RESPONSE } from '@jobstash/shared/core';
import { notifError, sentryMessage } from '@jobstash/shared/utils';

import { isLoadingDevCallbackAtom } from '@jobstash/auth/state';
import { getCheckWallet } from '@jobstash/auth/data';

const DevGithubCallbackPage = () => {
  const { push, asPath } = useRouter();
  const queryClient = useQueryClient();
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

    // Fetch new user role / flow
    const { flow, flowRoute } = await fetchCheckWallet(queryClient);

    // Redirect to flow route if need to
    if (redirectFlowsSet.has(flow) && asPath !== flowRoute) {
      push(flowRoute).then(() => setIsLoadingDevCallback(false));
    }
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

const fetchCheckWallet = async (queryClient: QueryClient) => {
  const checkWalletData = await getCheckWallet();
  const { flow } = checkWalletData.data;
  const flowRoute = CHECK_WALLET_ROUTE[flow];
  queryClient.setQueryData(['check-wallet'], checkWalletData);

  return { flow, flowRoute };
};

export default DevGithubCallbackPage;
