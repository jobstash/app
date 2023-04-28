import { useRef } from 'react';

import { CHECK_WALLET_ROLES } from '~/features/auth/core/constants';
import { CheckWalletRole } from '~/features/auth/core/types';
import { useWalletAuthContext } from '~/features/auth/hooks';
import EmptyPage from '~/features/auth/pages/empty-page';
import { NEXT_PUBLIC_MW_URL } from '~/shared/core/constants';
import { useIsMounted } from '~/shared/hooks';

const DevGithubCallbackPage = () => {
  const isMounted = useIsMounted();
  const { address } = useWalletAuthContext();

  const submittedRef = useRef(false);

  if (!isMounted) return <EmptyPage isLoading />;

  const githubAuth = async (
    code: string,
    address: string,
    role: CheckWalletRole,
  ) => {
    if (!submittedRef.current) {
      submittedRef.current = true;
      const res = await fetch(`${NEXT_PUBLIC_MW_URL}/github/github-login`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, wallet: address, role }),
      });

      const data = await res.json();
      console.log('github login data =', data);

      console.log('try fetching check-wallet for info (temp) ...');

      const res2 = await fetch(`${NEXT_PUBLIC_MW_URL}/siwe/check-wallet`, {
        mode: 'cors',
        credentials: 'include',
      });
      const data2 = await res2.json();
      console.log('check-wallet new data =', data2);

      console.log('REFETCHING CHECK-WALLET AFTER 10sec');
      setTimeout(async () => {
        console.log('FETCHING ...');
        const res3 = await fetch(`${NEXT_PUBLIC_MW_URL}/siwe/check-wallet`, {
          mode: 'cors',
          credentials: 'include',
        });
        const data3 = await res3.json();
        console.log('check-wallet LATEST data =', data3);
      }, 5000);
    }
  };

  const codeParam = new URLSearchParams(window.location.search).get('code');
  if (codeParam && address) {
    githubAuth(codeParam, address, CHECK_WALLET_ROLES.DEV);
  }

  return <EmptyPage isLoading />;
};

export default DevGithubCallbackPage;
