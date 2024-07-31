/* eslint-disable camelcase */
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { LoadingPage, NotFoundPage } from '@jobstash/shared/pages';

import { ATS_PROVIDERS } from '@jobstash/profile/core';

import { useAuthContext } from '@jobstash/auth/state';
import { useLinkATSPlatform, useOrgProfileInfo } from '@jobstash/profile/state';

export const ATSOauthLeverCallbackPage = () => {
  const { isAuthenticated } = useAuthContext();
  const router = useRouter();
  const { client_id } = router.query;

  const { profileInfoData, isLoading: isLoadingProfile } = useOrgProfileInfo();
  const orgId = profileInfoData?.orgId;

  const isLoading = !isAuthenticated || isLoadingProfile;

  const { mutate } = useLinkATSPlatform();

  const isValidClientId = Boolean(client_id) && typeof client_id === 'string';
  const isValidOrgId = typeof orgId === 'string';
  const isValidPayload = isValidClientId && isValidOrgId;

  useEffect(() => {
    if (!isLoading && isValidPayload) {
      mutate({
        platform: ATS_PROVIDERS.LEVER.platformName,
        payload: {
          clientId: client_id as string,
          orgId,
        },
      });
    }
  }, [client_id, isLoading, isValidPayload, mutate, orgId, router]);

  if (!client_id) return <NotFoundPage />;

  return <LoadingPage />;
};
