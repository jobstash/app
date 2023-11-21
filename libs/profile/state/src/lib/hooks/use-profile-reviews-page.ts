import { useState } from 'react';

import { useAtomValue } from 'jotai';

import { CHECK_WALLET_FLOWS } from '@jobstash/auth/core';
import {
  PROFILE_RIGHT_PANEL_TABS,
  type ProfileOrgReview,
} from '@jobstash/profile/core';

import { useAuthContext } from '@jobstash/auth/state';

import { activeProfileOrgReviewAtom } from '../atoms/active-profile-org-review-atom';
import { profileOrgReviewCountAtom } from '../atoms/profile-org-review-count-atom';

import { useProfileTabs } from './use-profile-tabs';

export const useProfileReviewsPage = (isOnboardSSR: boolean) => {
  const { flow } = useAuthContext();
  const initShowGotItCard =
    flow === CHECK_WALLET_FLOWS.ONBOARD_REVIEWS || isOnboardSSR;
  const [showGotItCard, setShowGotItCard] = useState(initShowGotItCard);

  const { tabs, activeTab, setActiveTab } = useProfileTabs(
    PROFILE_RIGHT_PANEL_TABS.ORG_REVIEWS,
  );

  const profileOrgReviewCount = useAtomValue(profileOrgReviewCountAtom);
  const activeProfileOrgReview = useAtomValue(activeProfileOrgReviewAtom);
  const orgReview = activeProfileOrgReview || ({} as ProfileOrgReview);

  const [isLoadingCard, setIsLoadingCard] = useState(false);

  return {
    profileOrgReviewCount,
    activeProfileOrgReview,
    showGotItCard,
    setShowGotItCard,
    tabs,
    activeTab,
    setActiveTab,
    orgReview,
    isLoadingCard,
    setIsLoadingCard,
  };
};
