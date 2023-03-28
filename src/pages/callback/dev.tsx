import { useRef } from 'react';

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
    role: 'dev' | 'org',
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
    }
  };

  const codeParam = new URLSearchParams(window.location.search).get('code');
  if (codeParam && address) {
    githubAuth(codeParam, address, 'dev');
  }

  return <EmptyPage isLoading />;
};

export default DevGithubCallbackPage;
