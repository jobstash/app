import { useRouter } from 'next/router';

import { useMutation, useQueryClient } from '@tanstack/react-query';

//
// import { useSIWE } from 'connectkit';
// import { useDisconnect } from 'wagmi';
import { CHECK_WALLET_ROLES, GithubLoginPayload } from '@jobstash/auth/core';
import { SENTRY_MW_NON_200_RESPONSE } from '@jobstash/shared/core';
import { notifError, sentryMessage } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { getCheckWallet, githubLogin } from '@jobstash/auth/data';

import { useAuthContext } from './use-auth-context';

export const useGithubLogin = () => {
  const router = useRouter();
  const { mwVersion } = useMwVersionContext();
  const { role } = useAuthContext();

  //
  // const { disconnect } = useDisconnect();
  // const { signOut } = useSIWE();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: GithubLoginPayload) => githubLogin(payload),
    async onSuccess() {
      const checkWalletData = await getCheckWallet();
      queryClient.setQueryData([mwVersion, 'check-wallet'], checkWalletData);

      router.push('/profile');
    },
    onError(res, payload) {
      const isGithubAccountUsed =
        (res as Error).message === GH_ACCOUNT_USED_MESSAGE;

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
        JSON.stringify({
          res: {
            message: res.message ?? null,
            stack: res.stack ?? null,
            name: res.name ?? null,
          },
          payload,
        }),
      );

      const isUser =
        role !== CHECK_WALLET_ROLES.DEV && role !== CHECK_WALLET_ROLES.ORG;

      //
      // Commented this out to troubleshoot issue where user is signed out when signing in with github, as he's not a dev yet, or if the github comes back with some error.
      // if (!isGithubAccountUsed || !isUser) {
      //   disconnect();
      //   signOut();
      // }

      const redirectUrl = isGithubAccountUsed && isUser ? '/profile' : '/';
      setTimeout(() => {
        router.push(redirectUrl);
      }, 1000);
    },
  });

  return { mutate, isLoadin: isPending };
};

const GH_ACCOUNT_USED_MESSAGE =
  'Github user node already has a user associated with it';
