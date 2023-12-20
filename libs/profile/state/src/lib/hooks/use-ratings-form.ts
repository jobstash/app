import { useEffect, useMemo, useState } from 'react';

import {
  ORG_RATING_LABELS,
  type OrgRating,
} from '@jobstash/organizations/core';

import { type ProfileRatingContextProps } from '../contexts/profile-org-review-form-context';
import { useProfileReviewsPageContext } from '../contexts/profile-reviews-page-context';

import { useRatingMutation } from './use-rating-mutation';

const getRatingTitle = (ratingKey: keyof OrgRating) =>
  ORG_RATING_LABELS[ratingKey];

export const useRatingsForm = (): ProfileRatingContextProps => {
  const { orgReview } = useProfileReviewsPageContext();

  const {
    rating: orgRating,
    org: { orgId },
  } = orgReview;

  const [rating, setRating] = useState(orgRating);

  useEffect(() => {
    setRating(orgRating);
  }, [orgRating]);

  const { mutate } = useRatingMutation();

  const saveRating = () => {
    mutate({
      orgId,
      ...rating,
    });
  };

  const isDisabledRatingSave = useMemo(
    () => JSON.stringify(rating) === JSON.stringify(orgRating),
    [rating, orgRating],
  );

  return {
    rating,
    setRating,
    getRatingTitle,
    saveRating,
    isDisabledRatingSave,
  };
};
