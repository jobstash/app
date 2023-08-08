import Head from 'next/head';
import { useState } from 'react';

import { LoadingPage } from '@jobstash/shared/pages';
import { useAtomValue } from 'jotai';

import { CHECK_WALLET_FLOWS } from '@jobstash/auth/core';

import { useAuthContext } from '@jobstash/auth/state';
import { activeProfileOrgReviewAtom } from '@jobstash/profile/state';
import { useDelayedAuthRender } from '@jobstash/shared/state';

import { ProfileReviewsGotItCard } from '@jobstash/profile/ui';
import { BreadCrumbs, Button, RefreshIcon, Text } from '@jobstash/shared/ui';
import {
  ProfileOrgReviewList,
  ProfileOrgReviewsRightPanel,
} from '@jobstash/profile/feature';
import { SideBar } from '@jobstash/sidebar/feature';

import ProfileHeader from './profile-header';

interface Props {
  isOnboardSSR: boolean;
}

const breadCrumbs = [
  { title: 'Your Profile' },
  { title: 'Organization Reviews', href: '/profile/reviews' },
];

export const ProfileReviewsPage = ({ isOnboardSSR }: Props) => {
  const { canRender } = useDelayedAuthRender({
    requireConnected: true,
  });

  const { flow } = useAuthContext();
  const isOnboardFlow = flow === CHECK_WALLET_FLOWS.ONBOARD_REVIEWS;
  const isOnboard = isOnboardSSR ?? isOnboardFlow;

  const [showGotItCard, setShowGotItCard] = useState(isOnboard);

  const activeProfileOrgReview = useAtomValue(activeProfileOrgReviewAtom);

  if (canRender) {
    return (
      <>
        <Head>
          <title>Organization Reviews</title>
        </Head>
        <div className="w-full lg:pl-52">
          <SideBar />

          <div className="px-3.5 pt-[65px] lg:px-12 lg:pt-6 lg:pr-[50%] flex flex-col gap-6">
            <ProfileHeader />

            <div className="px-4 flex justify-between items-center">
              <BreadCrumbs breadCrumbs={breadCrumbs} />

              <div className="flex items-center space-x-4">
                <Text color="dimmed">Known Repositories: 12</Text>
                <Button isIcon>
                  <RefreshIcon />
                </Button>
                <Button isIcon>[ ? ]</Button>
              </div>
            </div>

            {showGotItCard && (
              <ProfileReviewsGotItCard
                onClick={() => setShowGotItCard(false)}
              />
            )}

            <ProfileOrgReviewList
              initProfileOrgReview={null}
              activeProfileOrgReview={activeProfileOrgReview}
            />
          </div>

          <div className="hide-scrollbar fixed inset-0 h-screen overflow-y-auto bg-dark p-4 pt-6 transition-all lg:inset-auto lg:right-0 lg:top-0 lg:w-5/12 lg:px-6 lg:py-8 lg:pr-10">
            <ProfileOrgReviewsRightPanel />
          </div>
        </div>
      </>
    );
  }

  return <LoadingPage />;
};
