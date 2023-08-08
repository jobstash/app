/* eslint-disable no-alert */
import { useMutation } from '@tanstack/react-query';
import NProgress from 'nprogress';

import {
  ProfileOrgReview,
  ProfileOrgReviewYourReview,
} from '@jobstash/profile/core';

interface Payload {
  orgId: ProfileOrgReview['org']['id'];
  review: ProfileOrgReviewYourReview;
}

interface Payload {
  orgId: string;
  review: {
    headline: string | null;
    pros: string | null;
    cons: string | null;
  };
}

export const useYourReviewMutation = () => {
  const { isLoading, mutate } = useMutation({
    mutationFn: (payload: Payload) =>
      fetch('/api/fakers/profile/reviews/your-review', {
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
