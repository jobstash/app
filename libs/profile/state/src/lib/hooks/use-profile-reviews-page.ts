import { useAtomValue } from 'jotai';

import { CHECK_WALLET_FLOWS } from '@jobstash/auth/core';
import {
  PROFILE_RIGHT_PANEL_TABS,
  type ProfileOrgReview,
} from '@jobstash/profile/core';

import { activeProfileOrgReviewAtom } from '../atoms/active-profile-org-review-atom';
import { profileOrgReviewCountAtom } from '../atoms/profile-org-review-count-atom';

import { useOnboardFlow } from './use-onboard-flow';
import { useProfileTabs } from './use-profile-tabs';

export const useProfileReviewsPage = (isOnboardSSR: boolean) => {
  const { isOnboardFlow, showGotItCard, setShowGotItCard } = useOnboardFlow(
    isOnboardSSR,
    CHECK_WALLET_FLOWS.ONBOARD_REVIEWS,
  );

  const { tabs, activeTab, setActiveTab } = useProfileTabs(
    PROFILE_RIGHT_PANEL_TABS.ORG_REVIEWS,
  );

  const profileOrgReviewCount = useAtomValue(profileOrgReviewCountAtom);
  const activeProfileOrgReview = useAtomValue(activeProfileOrgReviewAtom);
  const orgReview = activeProfileOrgReview || ({} as ProfileOrgReview);

  return {
    isOnboardSSR,
    isOnboardFlow,
    profileOrgReviewCount,
    activeProfileOrgReview,
    showGotItCard,
    setShowGotItCard,
    tabs,
    activeTab,
    setActiveTab,
    orgReview,
  };
};
