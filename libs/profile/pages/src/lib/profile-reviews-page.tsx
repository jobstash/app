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

interface Props {
  isOnboardSSR: boolean;
}

export const ProfileReviewsPage = ({ isOnboardSSR }: Props) => {
  const { canRender } = useDelayedAuthRender({
    requireConnected: true,
  });

  if (canRender) {
    return (
      <ProfileReviewsPageProvider isOnboardSSR={isOnboardSSR}>
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

          <div className="hide-scrollbar fixed inset-0 h-screen overflow-y-auto bg-dark p-4 pt-6 transition-all lg:inset-auto lg:right-0 lg:top-0 lg:w-5/12 lg:px-6 lg:py-8 lg:pr-10">
            <ProfileOrgReviewsRightPanel />
          </div>
        </div>
      </ProfileReviewsPageProvider>
    );
  }

  return <LoadingPage />;
};
