import { LoadingPage, NotFoundPage } from '@jobstash/shared/pages';

import { PERMISSIONS } from '@jobstash/auth/core';

import { useAuthContext, useHasPermission } from '@jobstash/auth/state';
import { ProfileInfoProvider } from '@jobstash/profile/state';

import { ProfileDevPage } from './profile-dev-page';

export const ProfilePage = () => {
  const hasPermission = useHasPermission(PERMISSIONS.USER);
  const { isLoading } = useAuthContext();

  if (isLoading) return <LoadingPage />;

  if (!hasPermission) {
    return <NotFoundPage />;
  }

  return (
    <ProfileInfoProvider>
      <ProfileDevPage />
    </ProfileInfoProvider>
  );
};
