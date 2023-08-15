import { useState } from 'react';

import { useAtomValue } from 'jotai';

import { CHECK_WALLET_FLOWS } from '@jobstash/auth/core';
import {
  PROFILE_RIGHT_PANEL_TABS,
  type ProfileRepo,
} from '@jobstash/profile/core';

import { useAllTechnologies } from '@jobstash/shared/state';

import { activeProfileRepoAtom } from '../atoms/active-profile-repo-atom';
import { profileRepoCountAtom } from '../atoms/profile-repo-count-atom';

import { useIsOnboarding } from './use-is-onboarding';
import { useProfileTabs } from './use-profile-tabs';

export const useProfileRepoPage = (isOnboardSSR: boolean) => {
  const { data: allTechsData } = useAllTechnologies();

  const isOnboarding = useIsOnboarding(
    isOnboardSSR,
    CHECK_WALLET_FLOWS.ONBOARD_REPO,
  );

  const [showGotItCard, setShowGotItCard] = useState(isOnboarding);

  const { tabs, activeTab, setActiveTab } = useProfileTabs(
    PROFILE_RIGHT_PANEL_TABS.REPOSITORIES,
  );

  const profileRepoCount = useAtomValue(profileRepoCountAtom);
  const activeProfileRepo = useAtomValue(activeProfileRepoAtom);
  const profileRepo = activeProfileRepo || ({} as ProfileRepo);

  return {
    profileRepoCount,
    activeProfileRepo,
    showGotItCard,
    setShowGotItCard,
    tabs,
    activeTab,
    setActiveTab,
    allTechs: allTechsData?.technologies ?? [],
    profileRepo,
    isOnboarding,
  };
};
