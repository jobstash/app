import { useEffect, useMemo, useState } from 'react';

import {
  type ProfileOrgReviewRating,
  RATING_TITLE_MAP,
} from '@jobstash/profile/core';

import { useProfileReviewsPageContext } from '../contexts/profile-reviews-page-context';

import { useRatingMutation } from './use-rating-mutation';

const getRatingTitle = (ratingKey: keyof ProfileOrgReviewRating) =>
  RATING_TITLE_MAP[ratingKey];

export const useRatings = () => {
  const { orgReview } = useProfileReviewsPageContext();

  const {
    rating,
    org: { orgId },
  } = orgReview;

  const [currentRating, setCurrentRating] = useState(rating);

  useEffect(() => {
    setCurrentRating(rating);
  }, [rating]);

  const { isLoading, mutate } = useRatingMutation();

  const onClickSave = () => {
    mutate({
      orgId,
      ...currentRating,
    });
  };

  const disableActions = useMemo(
    () => JSON.stringify(rating) === JSON.stringify(currentRating),
    [rating, currentRating],
  );

  return {
    currentRating,
    setCurrentRating,
    isLoading,
    onClickSave,
    disableActions,
    getRatingTitle,
  };
};
