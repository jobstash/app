import { useRouter } from 'next/router';
import { useRef } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { fetchCheckWallet } from '~/features/auth/api';
import {
  CHECK_WALLET_ROLES,
  CHECK_WALLET_ROUTE,
} from '~/features/auth/core/constants';
import { CheckWalletRole } from '~/features/auth/core/types';
import { useWalletAuthContext } from '~/features/auth/hooks';
import EmptyPage from '~/features/auth/pages/empty-page';
import {
  NEXT_PUBLIC_MW_URL,
  SENTRY_MW_NON_200_RESPONSE,
} from '~/shared/core/constants';
import { useIsMounted } from '~/shared/hooks';
import { sentryMessage } from '~/shared/utils';

const DevGithubCallbackPage = () => {
  const isMounted = useIsMounted();
  const { address } = useWalletAuthContext();

  const { push } = useRouter();
  const queryClient = useQueryClient();

  const submittedRef = useRef(false);

  if (!isMounted) return <EmptyPage isLoading />;

  const githubAuth = async (
    code: string,
    address: string,
    role: CheckWalletRole,
  ) => {
    if (!submittedRef.current) {
      submittedRef.current = true;
      const githubLoginRes = await fetch(
        `${NEXT_PUBLIC_MW_URL}/github/github-login`,
        {
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code, wallet: address, role }),
        },
      );
      const githubLoginData = await githubLoginRes.json();

      if (!githubLoginRes.ok || !githubLoginData.success) {
        sentryMessage(
          `githubLoginRes: ${SENTRY_MW_NON_200_RESPONSE}`,
          JSON.stringify(githubLoginData),
        );
      }

      const checkWalletData = await fetchCheckWallet();
      const roleRoute = CHECK_WALLET_ROUTE[checkWalletData.flow];
      queryClient.setQueryData(
        ['check-wallet', NEXT_PUBLIC_MW_URL],
        checkWalletData,
      );
      push(roleRoute, undefined, { shallow: true });
    }
  };

  const codeParam = new URLSearchParams(window.location.search).get('code');
  if (codeParam && address) {
    githubAuth(codeParam, address, CHECK_WALLET_ROLES.DEV);
  }

  return <EmptyPage isLoading />;
};

export default DevGithubCallbackPage;
