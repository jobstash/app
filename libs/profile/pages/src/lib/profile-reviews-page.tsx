import Head from 'next/head';

import { LoadingPage } from '@jobstash/shared/pages';

import { ProfileReviewsPageProvider } from '@jobstash/profile/state';
import { useDelayedAuthRender } from '@jobstash/shared/state';

import {
  ProfileHeader,
  ProfileReviewsGotItCard,
  ProfileReviewsSubHeader,
} from '@jobstash/profile/ui';
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
        <div className="w-full lg:pl-52">
          <SideBar />

          <div className="px-3.5 pt-[65px] lg:px-12 lg:pt-6 lg:pr-[50%] flex flex-col gap-6">
            <ProfileHeader />

            <ProfileReviewsSubHeader />
            <ProfileReviewsGotItCard />
            <ProfileOrgReviewList />
          </div>
          <ProfileOrgReviewsRightPanel />
        </div>
      </ProfileReviewsPageProvider>
    );
  }

  return <LoadingPage />;
};
