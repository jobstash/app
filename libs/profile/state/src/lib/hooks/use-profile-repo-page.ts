import { useState } from 'react';

import { useAtomValue } from 'jotai';

import { CHECK_WALLET_FLOWS } from '@jobstash/auth/core';
import {
  PROFILE_RIGHT_PANEL_TABS,
  type ProfileRepo,
} from '@jobstash/profile/core';

import { useAuthContext } from '@jobstash/auth/state';
import { useAllTags } from '@jobstash/shared/state';

import { activeProfileRepoAtom } from '../atoms/active-profile-repo-atom';
import { profileRepoCountAtom } from '../atoms/profile-repo-count-atom';

import { useProfileTabs } from './use-profile-tabs';

export const useProfileRepoPage = (isOnboardSSR: boolean) => {
  const { data: allTagsData } = useAllTags();

  const { flow } = useAuthContext();
  const initShowGotItCard =
    flow === CHECK_WALLET_FLOWS.ONBOARD_REPO || isOnboardSSR;
  const [showGotItCard, setShowGotItCard] = useState(initShowGotItCard);

  const { tabs, activeTab, setActiveTab } = useProfileTabs(
    PROFILE_RIGHT_PANEL_TABS.REPOSITORIES,
  );

  const profileRepoCount = useAtomValue(profileRepoCountAtom);
  const activeProfileRepo = useAtomValue(activeProfileRepoAtom);
  const profileRepo = activeProfileRepo || ({} as ProfileRepo);

  const [isLoadingCard, setIsLoadingCard] = useState(false);

  return {
    profileRepoCount,
    activeProfileRepo,
    showGotItCard,
    setShowGotItCard,
    tabs,
    activeTab,
    setActiveTab,
    allTags: allTagsData?.data ?? [],
    profileRepo,
    isLoadingCard,
    setIsLoadingCard,
  };
};
