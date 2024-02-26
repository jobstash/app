import Head from 'next/head';

import { LoadingPage } from '@jobstash/shared/pages';

import { CHECK_WALLET_ROLES } from '@jobstash/auth/core';
import { IS_DEBUG } from '@jobstash/shared/core';

import { useAuthContext } from '@jobstash/auth/state';
import { ProfileInfoProvider } from '@jobstash/profile/state';
import { useDelayedAuthRender } from '@jobstash/shared/state';

import { AccountCard } from '@jobstash/profile/ui';
import { NotFoundPage, PageWrapper } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

export const ProfileOrgSettingsPage = () => {
  const { isLoading, role } = useAuthContext();
  const { canRender } = useDelayedAuthRender({ requireConnected: true });

  if (!IS_DEBUG) return <NotFoundPage />;

  if (!canRender || isLoading) return <LoadingPage />;

  if (role !== CHECK_WALLET_ROLES.ORG) {
    return <NotFoundPage />;
  }

  return (
    <>
      <Head>
        <title>Org Settings</title>
      </Head>
      <PageWrapper>
        <SideBar />

        <div className="flex items-center justify-center min-h-screen p-2">
          <ProfileInfoProvider>
            <AccountCard />
          </ProfileInfoProvider>
        </div>
      </PageWrapper>
    </>
  );
};
