import { useMutation } from '@tanstack/react-query';

import {
  ProfileOrgReview,
  ProfileOrgReviewYourReview,
} from '@jobstash/profile/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { useNProgress } from '@jobstash/shared/state';

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
  const { startNProgress, stopNProgress } = useNProgress();
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
      startNProgress(true);
    },
    onSuccess(profileInfo) {
      // TODO: Add notifications
      // TODO: Update org-review-list,
      // TODO: Update org-review state (should update disableSave flag)
      notifSuccess({ message: 'You have updated your review description' });
    },
    onError() {
      notifError();
    },
    onSettled() {
      stopNProgress(true);

      // TODO: invalidate org-review-list
    },
  });

  return { isLoading, mutate };
};
