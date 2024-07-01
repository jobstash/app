import Head from 'next/head';

import { LoadingPage } from '@jobstash/shared/pages';

import { ProfileReviewsPageProvider } from '@jobstash/profile/state';
import { useDelayedAuthRender } from '@jobstash/shared/state';

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
  const { canRender } = useDelayedAuthRender({
    requireConnected: true,
  });

  if (canRender) {
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
  }

  return <LoadingPage />;
};
