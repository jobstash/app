import { useState } from 'react';

import { useAtomValue } from 'jotai';

import {
  PROFILE_RIGHT_PANEL_TABS,
  type ProfileRepo,
} from '@jobstash/profile/core';

import { useAllTags } from '@jobstash/shared/state';

import { activeProfileRepoAtom } from '../atoms/active-profile-repo-atom';
import { profileRepoCountAtom } from '../atoms/profile-repo-count-atom';

import { useProfileSkillsMutation } from './use-profile-skills-mutation';
import { useProfileSkillsQuery } from './use-profile-skills-query';
import { useProfileTabs } from './use-profile-tabs';

export const useProfileRepoPage = () => {
  const { data: allTagsData } = useAllTags();

  const { tabs, activeTab, setActiveTab } = useProfileTabs(
    PROFILE_RIGHT_PANEL_TABS.REPOSITORIES,
  );

  const profileRepoCount = useAtomValue(profileRepoCountAtom);
  const activeProfileRepo = useAtomValue(activeProfileRepoAtom);
  const profileRepo = activeProfileRepo || ({} as ProfileRepo);

  const {
    isLoading: isLoadingSkillsQuery,
    isFetching,
    data,
  } = useProfileSkillsQuery();

  const { isLoading: isLoadingSkillsMutation, mutate: mutateSkills } =
    useProfileSkillsMutation();

  const [isLoadingCard, setIsLoadingCard] = useState(false);

  return {
    profileRepoCount,
    activeProfileRepo,
    tabs,
    activeTab,
    setActiveTab,
    allTags: allTagsData?.data ?? [],
    profileRepo,
    isLoadingCard,
    setIsLoadingCard,
    isLoadingSkills:
      isLoadingSkillsQuery || isFetching || isLoadingSkillsMutation,
    userSkills: data ?? [],
    mutateSkills,
  };
};
