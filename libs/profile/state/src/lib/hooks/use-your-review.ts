import { useState } from 'react';

import { useProfileReviewsPageContext } from '../contexts/profile-reviews-page-context';

import { useYourReviewMutation } from './use-your-review-mutation';

export const useYourReview = () => {
  const {
    orgReview: {
      review: { headline, pros, cons },
      org: { orgId },
    },
    profileInfo: { username },
  } = useProfileReviewsPageContext();

  const [currentReview, setCurrentReview] = useState({
    headline,
    pros,
    cons,
  });

  const setHeadline = (headline: string | null) =>
    setCurrentReview((prev) => ({ ...prev, headline }));
  const setPros = (pros: string | null) =>
    setCurrentReview((prev) => ({ ...prev, pros }));
  const setCons = (cons: string | null) =>
    setCurrentReview((prev) => ({ ...prev, cons }));

  const disableSave =
    JSON.stringify({ headline, pros, cons }) === JSON.stringify(currentReview);

  const { isLoading, mutate } = useYourReviewMutation();

  const onClickSave = () => {
    mutate({
      orgId,
      review: currentReview,
    });
  };

  return {
    currentReview,
    setHeadline,
    setPros,
    setCons,
    disableSave,
    isLoading,
    onClickSave,
    username,
  };
};
