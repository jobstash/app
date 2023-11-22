import { LS_KEYS, PROFILE_RIGHT_PANEL_TAB } from '@jobstash/profile/core';

import { useProfileRepoPageContext } from '../contexts/profile-repo-page-context';

import { useTourEffect } from './use-tour-effect';

export const useYourContributionTour = () => {
  const {
    activeTab,
    profileRepo: { contribution },
  } = useProfileRepoPageContext();

  const isCurrentTab = activeTab === PROFILE_RIGHT_PANEL_TAB.YOUR_CONTRIBUTION;
  const isEmpty = contribution.summary.trim().length === 0;

  const boolArg = isCurrentTab && isEmpty;

  useTourEffect(LS_KEYS.TOURS.YOUR_CONTRIBUTION, boolArg);
};
