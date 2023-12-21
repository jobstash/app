import { LS_KEYS, PROFILE_RIGHT_PANEL_TAB } from '@jobstash/profile/core';

import { useProfileReviewsPageContext } from '../contexts/profile-reviews-page-context';

import { useTourEffect } from './use-tour-effect';

export const useSalaryTour = () => {
  const {
    activeTab,
    orgReview: {
      compensation: { currency, salary },
    },
  } = useProfileReviewsPageContext();

  const isCurrentTab = activeTab === PROFILE_RIGHT_PANEL_TAB.COMPENSATION;
  const isEmptyCurrency = currency === null;
  const isEmptyAmount = salary === null;

  const boolArg = isCurrentTab && (isEmptyCurrency || isEmptyAmount);

  useTourEffect(LS_KEYS.TOURS.COMPENSATION, boolArg);
};
