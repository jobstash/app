import { LoadingPage, NotFoundPage } from '@jobstash/shared/pages';

import { CHECK_WALLET_ROLES } from '@jobstash/auth/core';

import { useAuthContext } from '@jobstash/auth/state';
import {
  OrgProfileInfoProvider,
  ProfileInfoProvider,
} from '@jobstash/profile/state';

import { ProfileDevPage } from './profile-dev-page';
import { ProfileOrgPage } from './profile-org-page';

export const ProfilePage = () => {
  const { isLoading, role, isAuthenticated } = useAuthContext();

  if (isLoading) return <LoadingPage />;
  if (!isAuthenticated) return <NotFoundPage />;

  const isDev = role === CHECK_WALLET_ROLES.DEV;
  const isOrg = role === CHECK_WALLET_ROLES.ORG;

  if (!isDev && !isOrg) {
    return <NotFoundPage />;
  }

  if (isDev)
    return (
      <ProfileInfoProvider>
        <ProfileDevPage />
      </ProfileInfoProvider>
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
