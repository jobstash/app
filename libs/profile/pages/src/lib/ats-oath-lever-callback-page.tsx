/* eslint-disable camelcase */
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { LoadingPage } from '@jobstash/shared/pages';

import { ATS_PROVIDERS } from '@jobstash/profile/core';

import { useLinkATSPlatform, useOrgProfileInfo } from '@jobstash/profile/state';
import { useDelayedAuthRender } from '@jobstash/shared/state';

import { NotFoundPage } from '@jobstash/shared/ui';

export const ATSOauthLeverCallbackPage = () => {
  const router = useRouter();
  const { client_id } = router.query;

  const { canRender } = useDelayedAuthRender({ requireConnected: true });

  const { profileInfoData, isLoading: isLoadingProfile } = useOrgProfileInfo();
  const orgId = profileInfoData?.orgId;

  const isLoading = !canRender || isLoadingProfile;

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
