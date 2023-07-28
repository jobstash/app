import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

import { LoadingPage } from '@jobstash/shared/pages';
import { useQueryClient } from '@tanstack/react-query';
import { useSIWE } from 'connectkit';
import { useAtom } from 'jotai';
import Nprogress from 'nprogress';
import { useAccount } from 'wagmi';

import {
  CHECK_WALLET_ROLES,
  CHECK_WALLET_ROUTE,
  CheckWalletRole,
  redirectFlowsSet,
} from '@jobstash/auth/core';
import { MW_URL, SENTRY_MW_NON_200_RESPONSE } from '@jobstash/shared/core';
import { sentryMessage } from '@jobstash/shared/utils';

import { isLoadingDevCallbackAtom } from '@jobstash/auth/state';
import { useIsMounted } from '@jobstash/shared/state';
import { getCheckWallet } from '@jobstash/auth/data';

const DevGithubCallbackPage = () => {
  const { push, asPath } = useRouter();
  const queryClient = useQueryClient();
  const isMounted = useIsMounted();
  const { address } = useAccount();
  const { signOut } = useSIWE();

  useEffect(() => {
    Nprogress.start();
  }, []);

  const redirectHomeRef = useRef(false);
  useEffect(() => {
    if (!redirectHomeRef.current && !address) {
      redirectHomeRef.current = true;
      push('/');
    }
  }, [address, push]);

  const [isLoadingDevCallback, setIsLoadingDevCallback] = useAtom(
    isLoadingDevCallbackAtom,
  );

  if (!isMounted) return <LoadingPage />;

  const githubAuth = async (
    code: string,
    address: string,
    role: CheckWalletRole,
  ) => {
    console.log('githubAuth called!');
    if (!isLoadingDevCallback) {
      setIsLoadingDevCallback(true);
      console.log('POST /github/github-login');
      const githubLoginRes = await fetch(`${MW_URL}/github/github-login`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, wallet: address, role }),
      });
      const githubLoginData = await githubLoginRes.json();
      console.log('RECEIVED GITHUB-LOGIN DATA =', githubLoginData);

      // If github login failed, alert (for now), then push to root page
      if (!githubLoginRes.ok || !githubLoginData.success) {
        sentryMessage(
          `githubLoginRes: ${SENTRY_MW_NON_200_RESPONSE}`,
          JSON.stringify(githubLoginData),
        );

        // eslint-disable-next-line no-alert
        alert('Something went wrong :(');

        // Disconnect then redirect
        signOut();
        setTimeout(() => {
          push('/');
        }, 1000);
      }

      // By now, user should have role
      console.log('FETCHING CHECK WALLET AGAIN ...');
      const checkWalletData = await getCheckWallet();
      console.log('checkWalletData =', checkWalletData);
      const { flow } = checkWalletData.data;
      const flowRoute = CHECK_WALLET_ROUTE[flow];
      queryClient.setQueryData(['check-wallet'], checkWalletData);

      if (redirectFlowsSet.has(flow) && asPath !== flowRoute) {
        push(flowRoute).then(() => setIsLoadingDevCallback(false));
      }
    }
  };

  const codeParam = new URLSearchParams(window.location.search).get('code');
  if (codeParam && address) {
    githubAuth(codeParam, address, CHECK_WALLET_ROLES.DEV);
  }

  return <LoadingPage />;
};

export default DevGithubCallbackPage;
