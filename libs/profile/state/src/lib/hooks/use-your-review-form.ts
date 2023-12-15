import { useEffect, useState } from 'react';

import { useProfileReviewsPageContext } from '../contexts/profile-reviews-page-context';

import { useYourReviewMutation } from './use-your-review-mutation';

export const useYourReviewForm = () => {
  const {
    orgReview: {
      review: { headline, pros, cons },
      org: { orgId },
    },
  } = useProfileReviewsPageContext();

  const [currentReview, setCurrentReview] = useState({
    headline,
    pros,
    cons,
  });

  useEffect(() => {
    setCurrentReview({
      headline,
      pros,
      cons,
    });
  }, [headline, pros, cons]);

  const setHeadline = (headline: string | null) =>
    setCurrentReview((prev) => ({ ...prev, headline }));
  const setPros = (pros: string | null) =>
    setCurrentReview((prev) => ({ ...prev, pros }));
  const setCons = (cons: string | null) =>
    setCurrentReview((prev) => ({ ...prev, cons }));

  const isDisabledReviewSave =
    JSON.stringify({ headline, pros, cons }) === JSON.stringify(currentReview);

  const { mutate } = useYourReviewMutation();

  const saveReview = () => {
    mutate({
      orgId,
      ...currentReview,
    });
  };

  return {
    currentReview,
    setHeadline,
    setPros,
    setCons,
    saveReview,
    isDisabledReviewSave,
  };
};
