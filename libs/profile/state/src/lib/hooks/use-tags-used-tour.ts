import { LS_KEYS, PROFILE_RIGHT_PANEL_TAB } from '@jobstash/profile/core';

import { useProfileRepoPageContext } from '../contexts/profile-repo-page-context';

import { useTourEffect } from './use-tour-effect';

export const useTagsUsedTour = () => {
  const {
    activeTab,
    profileRepo: { tags },
  } = useProfileRepoPageContext();

  const isTechsUsedTab = activeTab === PROFILE_RIGHT_PANEL_TAB.SKILLS_USED;
  const isEmptyTags = tags.length === 0;

  const boolArg = isTechsUsedTab && isEmptyTags;

  useTourEffect(LS_KEYS.TOURS.TECHS_USED, boolArg);
};
