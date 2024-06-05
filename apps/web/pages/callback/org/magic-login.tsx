import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { LoadingPage, MagicLinkPage } from '@jobstash/shared/pages';
import { useQueryClient } from '@tanstack/react-query';

import { useOrgSendMagicLinkToken } from '@jobstash/auth/state';
import { useMwVersionContext } from '@jobstash/shared/state';

const MagicLoginCallbackPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mwVersion } = useMwVersionContext();

  const tokenParam = new URLSearchParams(window.location.search).get('token');

  const { isLoading, isError, isSuccess } =
    useOrgSendMagicLinkToken(tokenParam);

  // Invalidate check-wallet, handle org redirect
  // (react-query breaking change v5 - removed onSuccess)
  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'check-wallet'],
      });
      router.push('/profile');
    }
  }, [isSuccess, mwVersion, queryClient, router]);

  if (isLoading) return <LoadingPage />;

  return <MagicLinkPage isError={isError} />;
};

export default MagicLoginCallbackPage;
