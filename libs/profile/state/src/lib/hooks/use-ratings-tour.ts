import { LS_KEYS, PROFILE_RIGHT_PANEL_TAB } from '@jobstash/profile/core';

import { useProfileReviewsPageContext } from '../contexts/profile-reviews-page-context';

import { useTourEffect } from './use-tour-effect';

export const useRatingsTour = () => {
  const {
    activeTab,
    orgReview: { rating },
  } = useProfileReviewsPageContext();

  const isCurrentTab = activeTab === PROFILE_RIGHT_PANEL_TAB.RATING;
  const isEmptyRating = Object.values(rating).every(
    (rating) => rating === null,
  );

  const boolArg = isCurrentTab && isEmptyRating;

  useTourEffect(LS_KEYS.TOURS.RATING, boolArg);
};
