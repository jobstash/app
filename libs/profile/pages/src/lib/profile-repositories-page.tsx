import dynamic from 'next/dynamic';
import Head from 'next/head';

import { LoadingPage, NotFoundPage } from '@jobstash/shared/pages';

import { PERMISSIONS } from '@jobstash/auth/core';

import { useAuthContext, useHasPermission } from '@jobstash/auth/state';
import { ProfileRepoPageProvider } from '@jobstash/profile/state';

import { ProfileHeader, ProfileRepoGotItCard } from '@jobstash/profile/ui';
import { PageWrapper } from '@jobstash/shared/ui';
import {
  ProfileRepoList,
  ProfileRepoRightPanel,
} from '@jobstash/profile/feature';

const SideBar = dynamic(() =>
  import('@jobstash/sidebar/feature').then((m) => m.SideBar),
);

export const ProfileRepositoriesPage = () => {
  const { isLoading, isAuthenticated } = useAuthContext();
  const hasPermission = useHasPermission(PERMISSIONS.USER);

  if (!isAuthenticated || isLoading) return <LoadingPage />;

  if (!hasPermission) {
    return <NotFoundPage />;
  }

  return (
    <ProfileRepoPageProvider>
      <Head>
        <title>Your Repositories</title>
      </Head>

      <PageWrapper>
        <SideBar />

        <div className="px-3.5 pt-[212px] lg:px-12 lg:pt-6 lg:pr-[calc(44vw)] flex flex-col gap-6 @container">
          <ProfileHeader
            gotItCard={<ProfileRepoGotItCard />}
            gotItCardKey="repositories"
          />

          <ProfileRepoList />
        </div>

        <ProfileRepoRightPanel />
      </PageWrapper>
    </ProfileRepoPageProvider>
  );
};
