import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { LoadingPage, MagicLinkPage } from '@jobstash/shared/pages';
import { useQueryClient } from '@tanstack/react-query';

import { useDevSendMagicLinkToken } from '@jobstash/auth/state';

const MagicLoginCallbackPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const tokenParam = new URLSearchParams(window.location.search).get('token');

  const { isLoading, isError, isSuccess } =
    useDevSendMagicLinkToken(tokenParam);

  // Invalidate check-wallet, handle org redirect
  // (react-query breaking change v5 - removed onSuccess)
  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries({
        queryKey: ['check-wallet'],
      });
      router.push('/profile');
    }
  }, [isSuccess, queryClient, router]);

  if (isLoading) return <LoadingPage />;

  return <MagicLinkPage isOrg isError={isError} />;
};

export default MagicLoginCallbackPage;
