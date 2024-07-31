import Head from 'next/head';

import { LoadingPage, NotFoundPage } from '@jobstash/shared/pages';

import { CHECK_WALLET_ROLES } from '@jobstash/auth/core';

import { useAuthContext } from '@jobstash/auth/state';
import { ProfileReviewsPageProvider } from '@jobstash/profile/state';

import {
  ProfileHeader,
  ProfileReviewsGotItCard,
  ProfileReviewsSubHeader,
} from '@jobstash/profile/ui';
import { PageWrapper } from '@jobstash/shared/ui';
import {
  ProfileOrgReviewList,
  ProfileOrgReviewsRightPanel,
} from '@jobstash/profile/feature';
import { SideBar } from '@jobstash/sidebar/feature';

export const ProfileReviewsPage = () => {
  const { role, isLoading, isAuthenticated } = useAuthContext();

  if (!isAuthenticated || isLoading) return <LoadingPage />;

  if (role !== CHECK_WALLET_ROLES.DEV) {
    return <NotFoundPage />;
  }

  return (
    <ProfileReviewsPageProvider>
      <Head>
        <title>Organization Reviews</title>
      </Head>
      <PageWrapper>
        <SideBar />

        <div className="px-3.5 pt-[212px] lg:px-12 lg:pt-6 lg:pr-[calc(44vw)]   flex flex-col gap-6">
          <ProfileHeader gotItCard={null} gotItCardKey={null} />

          <ProfileReviewsSubHeader />
          <ProfileReviewsGotItCard />

          <ProfileOrgReviewList />
        </div>
        <ProfileOrgReviewsRightPanel />
      </PageWrapper>
    </ProfileReviewsPageProvider>
  );
};
