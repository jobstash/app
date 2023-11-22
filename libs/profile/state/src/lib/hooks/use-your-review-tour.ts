import { LS_KEYS, PROFILE_RIGHT_PANEL_TAB } from '@jobstash/profile/core';

import { useProfileReviewsPageContext } from '../contexts/profile-reviews-page-context';

import { useTourEffect } from './use-tour-effect';

export const useYourReviewTour = () => {
  const {
    activeTab,
    orgReview: { review },
  } = useProfileReviewsPageContext();

  const isCurrentTab = activeTab === PROFILE_RIGHT_PANEL_TAB.YOUR_REVIEW;
  const isEmptyReview = Object.values(review).every(
    (review) => review === null,
  );

  const boolArg = isCurrentTab && isEmptyReview;

  useTourEffect(LS_KEYS.TOURS.YOUR_REVIEW, boolArg);
};
