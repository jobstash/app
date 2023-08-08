/* eslint-disable no-alert */
import { useMutation } from '@tanstack/react-query';
import NProgress from 'nprogress';

import { type ProfileRepoTechnology } from '@jobstash/profile/core';

interface Payload {
  id: string;
  techsUsed: ProfileRepoTechnology[];
  techsCreated: ProfileRepoTechnology[];
}

export const useTechsUsedMutation = () => {
  const { isLoading, mutate } = useMutation({
    mutationFn: (payload: Payload) =>
      fetch('/api/fakers/profile/repositories/techs-used', {
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
      // TODO: Update profile-repo-list,
      // TODO: Update profile repo state (should update disableSave flag)
      alert('You have updated your technologies used (TODO: notifications)');
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
