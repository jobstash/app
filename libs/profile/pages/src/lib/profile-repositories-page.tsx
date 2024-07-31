import Head from 'next/head';

import { LoadingPage, NotFoundPage } from '@jobstash/shared/pages';

import { CHECK_WALLET_ROLES } from '@jobstash/auth/core';

import { useAuthContext } from '@jobstash/auth/state';
import { ProfileRepoPageProvider } from '@jobstash/profile/state';

import {
  ProfileHeader,
  ProfileRepoGotItCard,
  ProfileRepoSubHeader,
} from '@jobstash/profile/ui';
import { PageWrapper } from '@jobstash/shared/ui';
import {
  ProfileRepoList,
  ProfileRepoRightPanel,
} from '@jobstash/profile/feature';
import { SideBar } from '@jobstash/sidebar/feature';

export const ProfileRepositoriesPage = () => {
  const { role, isLoading, isAuthenticated } = useAuthContext();

  if (!isAuthenticated || isLoading) return <LoadingPage />;

  if (role !== CHECK_WALLET_ROLES.DEV) {
    return <NotFoundPage />;
  }

  return (
    <ProfileRepoPageProvider>
      <Head>
        <title>Your Repositories</title>
      </Head>

      <PageWrapper>
        <SideBar />

        <div className="px-3.5 pt-[212px] lg:px-12 lg:pt-6 lg:pr-[calc(44vw)]   flex flex-col gap-6">
          <ProfileHeader gotItCard={null} gotItCardKey={null} />
          <ProfileRepoSubHeader />
          <ProfileRepoGotItCard />
          <ProfileRepoList />
        </div>

        <ProfileRepoRightPanel />
      </PageWrapper>
    </ProfileRepoPageProvider>
  );
};
