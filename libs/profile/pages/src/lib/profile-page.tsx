import { LoadingPage, NotFoundPage } from '@jobstash/shared/pages';

import { useAuthContext } from '@jobstash/auth/state';
import { ProfileInfoProvider } from '@jobstash/profile/state';

import { ProfileDevPage } from './profile-dev-page';

export const ProfilePage = () => {
  const { permissions, isLoading, isApiUnavailable } = useAuthContext();
  const hasPermission = permissions.length > 0;

  if (isLoading) return <LoadingPage />;

  if (isApiUnavailable) {
    return <LoadingPage />;
  }

  if (!hasPermission) {
    return <NotFoundPage />;
  }

  return (
    <ProfileInfoProvider>
      <ProfileDevPage />
    </ProfileInfoProvider>
  );
};
