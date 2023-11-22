import { LS_KEYS, PROFILE_RIGHT_PANEL_TAB } from '@jobstash/profile/core';

import { useProfileReviewsPageContext } from '../contexts/profile-reviews-page-context';

import { useTourEffect } from './use-tour-effect';

export const useSalaryTour = () => {
  const {
    activeTab,
    orgReview: {
      salary: { selectedCurrency, amount },
    },
  } = useProfileReviewsPageContext();

  const isCurrentTab = activeTab === PROFILE_RIGHT_PANEL_TAB.SALARY;
  const isEmptyCurrency = selectedCurrency === null;
  const isEmptyAmount = amount === null;

  const boolArg = isCurrentTab && (isEmptyCurrency || isEmptyAmount);

  useTourEffect(LS_KEYS.TOURS.SALARY, boolArg);
};
