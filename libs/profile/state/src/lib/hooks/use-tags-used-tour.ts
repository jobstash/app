import { useEffect } from 'react';

import { useTour } from '@reactour/tour';

import { LS_KEYS, PROFILE_RIGHT_PANEL_TAB } from '@jobstash/profile/core';

import { useProfileRepoPageContext } from '../contexts/profile-repo-page-context';

export const useTagsUsedTour = () => {
  const { isOpen, setIsOpen } = useTour();

  const localStorageValue = initFromLocalStorage();

  const {
    activeTab,
    profileRepo: { tags },
  } = useProfileRepoPageContext();

  /**
   * Necessary since we don't want it to be on the same level as provider
   * Only opens if all of these are true:
   * - techs-used tab is active
   * - techs-used data is empty
   * - local-storage value is undefined
   */
  const isTechsUsedTab = activeTab === PROFILE_RIGHT_PANEL_TAB.TAGS_USED;
  const isEmptyTags = tags.length === 0;
  const isOnboarding = isTechsUsedTab && isEmptyTags && !localStorageValue;

  useEffect(() => {
    if (!isOpen && isOnboarding) {
      setIsOpen(isOnboarding);
    }
  }, [isOnboarding, isOpen, setIsOpen]);
};

const initFromLocalStorage = (): boolean => {
  if (typeof localStorage === 'undefined') {
    return false;
  }

  return Boolean(localStorage.getItem(LS_KEYS.TOURS.TECHS_USED));
};
