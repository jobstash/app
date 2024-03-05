import { LoadingPage } from '@jobstash/shared/pages';

import { CHECK_WALLET_ROLES } from '@jobstash/auth/core';

import { useAuthContext } from '@jobstash/auth/state';
import {
  DevProfileInfoProvider,
  OrgProfileInfoProvider,
} from '@jobstash/profile/state';
import { useDelayedAuthRender } from '@jobstash/shared/state';

import { NotFoundPage } from '@jobstash/shared/ui';

import { ProfileDevPage } from './profile-dev-page';
import { ProfileOrgPage } from './profile-org-page';

export const ProfilePage = () => {
  const { isLoading, role } = useAuthContext();
  const { canRender } = useDelayedAuthRender({ requireConnected: true });

  if (!canRender || isLoading) return <LoadingPage />;

  const isDev = role === CHECK_WALLET_ROLES.DEV;
  const isOrg = role === CHECK_WALLET_ROLES.ORG;

  if (!isDev && !isOrg) {
    return <NotFoundPage />;
  }

  if (isDev)
    return (
      <DevProfileInfoProvider>
        <ProfileDevPage />
      </DevProfileInfoProvider>
    );

  if (isOrg) {
    return (
      <OrgProfileInfoProvider>
        <ProfileOrgPage />
      </OrgProfileInfoProvider>
    );
  }

  return <LoadingPage />;
};
