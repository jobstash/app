import { useAtomValue } from 'jotai';

import { CHECK_WALLET_FLOWS } from '@jobstash/auth/core';
import {
  PROFILE_RIGHT_PANEL_TABS,
  type ProfileRepo,
} from '@jobstash/profile/core';

import { useAllTechnologies } from '@jobstash/shared/state';

import { activeProfileRepoAtom } from '../atoms/active-profile-repo-atom';
import { profileRepoCountAtom } from '../atoms/profile-repo-count-atom';

import { useOnboardFlow } from './use-onboard-flow';
import { useProfileTabs } from './use-profile-tabs';

export const useProfileRepoPage = (isOnboardSSR: boolean) => {
  const { data: allTechsData } = useAllTechnologies();

  const { isOnboardFlow, showGotItCard, setShowGotItCard } = useOnboardFlow(
    isOnboardSSR,
    CHECK_WALLET_FLOWS.ONBOARD_REPO,
  );

  const { tabs, activeTab, setActiveTab } = useProfileTabs(
    PROFILE_RIGHT_PANEL_TABS.REPOSITORIES,
  );

  const profileRepoCount = useAtomValue(profileRepoCountAtom);
  const activeProfileRepo = useAtomValue(activeProfileRepoAtom);
  const profileRepo = activeProfileRepo || ({} as ProfileRepo);

  return {
    isOnboardSSR,
    isOnboardFlow,
    profileRepoCount,
    activeProfileRepo,
    showGotItCard,
    setShowGotItCard,
    tabs,
    activeTab,
    setActiveTab,
    allTechs: allTechsData?.technologies ?? [],
    profileRepo,
  };
};
