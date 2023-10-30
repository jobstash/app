import { useMutation } from '@tanstack/react-query';

import {
  ProfileOrgReview,
  ProfileOrgReviewRating,
} from '@jobstash/profile/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { useProfileReviewsPageContext } from '../contexts/profile-reviews-page-context';

interface Payload {
  orgId: ProfileOrgReview['org']['id'];
  rating: ProfileOrgReviewRating;
}

interface Payload {
  orgId: string;
  rating: {
    management: number | null;
    careerGrowth: number | null;
    benefits: number | null;
    workLifeBalance: number | null;
    cultureValues: number | null;
    diversityInclusion: number | null;
    interviewProcess: number | null;
  };
}

export const useRatingMutation = () => {
  const { setIsLoadingCard } = useProfileReviewsPageContext();

  const { isLoading, mutate } = useMutation({
    mutationFn: (payload: Payload) =>
      fetch('/api/fakers/profile/reviews/rating', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({ ...payload }),
      }).then(() => payload),
    onMutate() {
      setIsLoadingCard(true);
    },
    onSuccess(profileInfo) {
      // TODO: Add notifications
      // TODO: Update org-review-list,
      // TODO: Update org-review state (should update disableSave flag)
      notifSuccess({ message: 'You have updated your ratings' });
    },
    onError() {
      notifError();
    },
    onSettled() {
      setIsLoadingCard(false);

      // TODO: invalidate org-review-list
    },
  });

  return { isLoading, mutate };
};
