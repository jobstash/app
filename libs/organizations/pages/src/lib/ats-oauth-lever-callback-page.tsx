/* eslint-disable camelcase */
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { LoadingPage, NotFoundPage } from '@jobstash/shared/pages';

import { PERMISSIONS } from '@jobstash/auth/core';
import { ATS_PROVIDERS } from '@jobstash/organizations/core';

import { useAuthContext, useHasPermission } from '@jobstash/auth/state';
import { useLinkATSPlatform } from '@jobstash/organizations/state';

export const ATSOauthLeverCallbackPage = () => {
  const router = useRouter();
  const { client_id } = router.query;

  const { isLoading } = useAuthContext();

  const hasPermission = useHasPermission(PERMISSIONS.ORG_MANAGER);

  const { mutate } = useLinkATSPlatform();

  const isValidClientId = Boolean(client_id) && typeof client_id === 'string';
  const isValidOrgId = true; // TODO
  const isValidPayload = isValidClientId && isValidOrgId;

  useEffect(() => {
    if (!isLoading && isValidPayload && hasPermission) {
      mutate({
        platform: ATS_PROVIDERS.LEVER.platformName,
        payload: {
          clientId: client_id as string,
          orgId: 'TODO',
        },
      });
    }
  }, [client_id, hasPermission, isLoading, isValidPayload, mutate]);

  if (!client_id || hasPermission) return <NotFoundPage />;

  return <LoadingPage />;
};
