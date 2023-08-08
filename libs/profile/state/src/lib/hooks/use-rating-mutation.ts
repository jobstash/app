/* eslint-disable no-alert */
import { useMutation } from '@tanstack/react-query';
import NProgress from 'nprogress';

import {
  ProfileOrgReview,
  ProfileOrgReviewRating,
} from '@jobstash/profile/core';

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
      NProgress.start();
    },
    onSuccess(profileInfo) {
      // TODO: Add notifications
      // TODO: Update org-review-list,
      // TODO: Update org-review state (should update disableSave flag)
      alert('You have updated your technologies used (TODO: notifications)');
    },
    onError() {
      alert('Something went wrong :( (TODO: notifications)');
    },
    onSettled() {
      NProgress.done();

      // TODO: invalidate org-review-list
    },
  });

  return { isLoading, mutate };
};
