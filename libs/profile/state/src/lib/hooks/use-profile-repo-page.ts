import { useMemo, useState } from 'react';

import { useAtomValue } from 'jotai';

import { CHECK_WALLET_FLOWS } from '@jobstash/auth/core';
import { PROFILE_RIGHT_PANEL_TABS } from '@jobstash/profile/core';
import { Technology } from '@jobstash/shared/core';

import { useAuthContext } from '@jobstash/auth/state';

import { activeProfileRepoAtom } from '../atoms/active-profile-repo-atom';
import { profileRepoCountAtom } from '../atoms/profile-repo-count-atom';

export const useProfileRepoPage = (
  isOnboardSSR: boolean,
  allTechs: Technology[],
) => {
  const { flow } = useAuthContext();
  const isOnboardFlow = flow === CHECK_WALLET_FLOWS.ONBOARD_REPO;
  const isOnboard = isOnboardSSR ?? isOnboardFlow;

  const profileRepoCount = useAtomValue(profileRepoCountAtom);
  const activeProfileRepo = useAtomValue(activeProfileRepoAtom);

  const [showGotItCard, setShowGotItCard] = useState(isOnboard);

  const [activeTab, setActiveTab] = useState(
    PROFILE_RIGHT_PANEL_TABS.REPOSITORIES[0],
  );

  const tabs = useMemo(
    () =>
      PROFILE_RIGHT_PANEL_TABS.REPOSITORIES.map((text) => ({
        text,
        onClick: () => setActiveTab(text),
      })),
    [],
  );

  return {
    isOnboardFlow,
    profileRepoCount,
    activeProfileRepo,
    showGotItCard,
    setShowGotItCard,
    isOnboardSSR,
    tabs,
    activeTab,
    setActiveTab,
    allTechs,
  };
};
