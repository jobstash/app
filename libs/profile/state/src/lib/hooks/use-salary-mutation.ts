import { useMutation } from '@tanstack/react-query';

import { type ProfileOrgReview } from '@jobstash/profile/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { useNProgress } from '@jobstash/shared/state';

interface Payload {
  orgId: ProfileOrgReview['org']['id'];
  currencyValue: ProfileOrgReview['salary']['currency']['value'];
  salaryAmount: ProfileOrgReview['salary']['amount'];
  token: ProfileOrgReview['salary']['token']['value'];
  noAllocation: ProfileOrgReview['salary']['token']['noAllocation'];
}

export const useSalaryMutation = () => {
  const { startNProgress, stopNProgress } = useNProgress();

  const { isLoading, mutate } = useMutation({
    mutationFn: (payload: Payload) =>
      fetch('/api/fakers/profile/reviews/salary', {
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
      notifSuccess({ message: 'You have updated your salary info' });
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
