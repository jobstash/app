/* eslint-disable no-alert */
import { useMutation } from '@tanstack/react-query';
import NProgress from 'nprogress';

interface Payload {
  id: string; // Profile Repository ID
  contribution: string;
}

export const useYourContributionMutation = () => {
  const { isLoading, mutate } = useMutation({
    mutationFn: (payload: Payload) =>
      fetch('/api/fakers/profile/repositories/your-contribution', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({ ...payload }),
      }),
    onMutate() {
      NProgress.start();
    },
    onSuccess(profileInfo) {
      // TODO: Add notifications
      // TODO: Update profile-repo-list
      // TODO: Update profile repo state (should update disableSave flag)
      alert(
        'You have updated your contribution description (TODO: notifications)',
      );
    },
    onError() {
      alert('Something went wrong :( (TODO: notifications)');
    },
    onSettled() {
      NProgress.done();

      // TODO: invalidate profile-repo-list
    },
  });

  return { isLoading, mutate };
};
