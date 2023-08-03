import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { LoadingPage } from '@jobstash/shared/pages';
import { useAtomValue } from 'jotai';

import { CHECK_WALLET_FLOWS } from '@jobstash/auth/core';
import {
  PROFILE_RIGHT_PANEL_TAB,
  PROFILE_RIGHT_PANEL_TABS,
} from '@jobstash/profile/core';

import { useAuthContext } from '@jobstash/auth/state';
import {
  activeProfileRepoAtom,
  profileRepoCountAtom,
} from '@jobstash/profile/state';
import { useDelayedAuthRender } from '@jobstash/shared/state';

import {
  ProfileHeader,
  ProfileRepoGotItCard,
  ProfileRightPanelTechsUsed,
  ProfileRightPanelYourContribution,
} from '@jobstash/profile/ui';
import { RightPanelCardBorder } from '@jobstash/right-panel/ui';
import { BreadCrumbs, Button, RefreshIcon, Text } from '@jobstash/shared/ui';
import { ProfileRepoList, ProfileRightPanel } from '@jobstash/profile/feature';
import { SideBar } from '@jobstash/sidebar/feature';

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

  const [activeTab, setActiveTab] = useState(
    PROFILE_RIGHT_PANEL_TABS.REPOSITORIES[0],
  );

  const tabs = PROFILE_RIGHT_PANEL_TABS.REPOSITORIES.map((text) => ({
    text,
    onClick: () => setActiveTab(text),
  }));

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
            <ProfileHeader
              availableForWork={false}
              username="0xDevoor"
              avatar="https://api.multiavatar.com/pakyu.png"
            />

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

            {/* <div className="border border-red-500 py-12">
              <p>
                {JSON.stringify({ isOnboard, isOnboardFlow, isOnboardSSR })}
              </p>
              <Button onClick={() => push('/add-github-account')}>
                CSR to add-github-account page
              </Button>
              <Button onClick={() => push('/pick-role')}>
                CSR to pick-role
              </Button>
            </div> */}

            <ProfileRepoList
              initProfileRepo={null}
              activeProfileRepo={activeProfileRepo}
            />
          </div>

          <div className="hide-scrollbar fixed inset-0 h-screen overflow-y-auto bg-dark p-4 pt-6 transition-all lg:inset-auto lg:right-0 lg:top-0 lg:w-5/12 lg:px-6 lg:py-8 lg:pr-10">
            <ProfileRightPanel
              profileRepo={activeProfileRepo}
              backUrl="/profile/repositories"
              activeTab={activeTab}
              tabs={tabs}
              card={
                <RightPanelCardBorder>
                  <div className="p-6">
                    <div className="flex flex-col gap-6 py-2">
                      {activeTab ===
                        PROFILE_RIGHT_PANEL_TAB.TECHNOLOGIES_USED && (
                        <ProfileRightPanelTechsUsed />
                      )}
                      {activeTab ===
                        PROFILE_RIGHT_PANEL_TAB.YOUR_CONTRIBUTION && (
                        <ProfileRightPanelYourContribution
                          key={activeProfileRepo?.id}
                          username="0xDevoor"
                          profileRepo={activeProfileRepo}
                        />
                      )}
                    </div>
                  </div>
                </RightPanelCardBorder>
              }
            />
          </div>
        </div>
      </>
    );

  return <LoadingPage />;
};
