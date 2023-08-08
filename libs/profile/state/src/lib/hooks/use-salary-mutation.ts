/* eslint-disable no-alert */
import { useMutation } from '@tanstack/react-query';
import NProgress from 'nprogress';

import { type ProfileOrgReview } from '@jobstash/profile/core';

interface Payload {
  orgId: ProfileOrgReview['org']['id'];
  currencyValue: ProfileOrgReview['salary']['currency']['value'];
  salaryAmount: ProfileOrgReview['salary']['amount'];
  tokenValue: ProfileOrgReview['salary']['token']['value'];
  tokenNoAllocation: ProfileOrgReview['salary']['token']['noAllocation'];
}

export const useSalaryMutation = () => {
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
