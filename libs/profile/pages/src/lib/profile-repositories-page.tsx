import Head from 'next/head';
import { useState } from 'react';

import { LoadingPage } from '@jobstash/shared/pages';
import { useAtomValue } from 'jotai';

import { CHECK_WALLET_FLOWS } from '@jobstash/auth/core';

import { useAuthContext } from '@jobstash/auth/state';
import {
  activeProfileRepoAtom,
  profileRepoCountAtom,
} from '@jobstash/profile/state';
import { useDelayedAuthRender } from '@jobstash/shared/state';

import { ProfileRepoGotItCard } from '@jobstash/profile/ui';
import { BreadCrumbs, Button, RefreshIcon, Text } from '@jobstash/shared/ui';
import {
  ProfileRepoList,
  ProfileRepoRightPanel,
} from '@jobstash/profile/feature';
import { SideBar } from '@jobstash/sidebar/feature';

import ProfileHeader from './profile-header';

interface Props {
  isOnboardSSR: boolean;
}

const breadCrumbs = [
  { title: 'Your Profile' },
  { title: 'Your Repositories', href: '/profile/repositories' },
];

export const ProfileRepositoriesPage = ({ isOnboardSSR }: Props) => {
  const { flow } = useAuthContext();

  const isOnboardFlow = flow === CHECK_WALLET_FLOWS.ONBOARD_REPO;
  const isOnboard = isOnboardSSR ?? isOnboardFlow;

  const activeProfileRepo = useAtomValue(activeProfileRepoAtom);

  const [showGotItCard, setShowGotItCard] = useState(isOnboard);

  const { canRender } = useDelayedAuthRender({ requireConnected: true });

  const profileRepoCount = useAtomValue(profileRepoCountAtom);

  if (canRender)
    return (
      <>
        <Head>
          <title>Your Repositories</title>
        </Head>
        <div className="w-full lg:pl-52">
          <SideBar />

          <div className="px-3.5 pt-[65px] lg:px-12 lg:pt-6 lg:pr-[50%] flex flex-col gap-6">
            <ProfileHeader />

            <div className="px-4 flex justify-between items-center">
              <BreadCrumbs breadCrumbs={breadCrumbs} />

              <div className="flex items-center space-x-4">
                <Text color="dimmed">{`Known Repositories: ${profileRepoCount}`}</Text>
                <Button isIcon>
                  <RefreshIcon />
                </Button>
                <Button isIcon>[ ? ]</Button>
              </div>
            </div>

            {showGotItCard && (
              <ProfileRepoGotItCard onClick={() => setShowGotItCard(false)} />
            )}

            <ProfileRepoList
              initProfileRepo={null}
              activeProfileRepo={activeProfileRepo}
            />
          </div>

          <div className="hide-scrollbar fixed inset-0 h-screen overflow-y-auto bg-dark p-4 pt-6 transition-all lg:inset-auto lg:right-0 lg:top-0 lg:w-5/12 lg:px-6 lg:py-8 lg:pr-10">
            <ProfileRepoRightPanel />
          </div>
        </div>
      </>
    );

  return <LoadingPage />;
};
