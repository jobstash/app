import { useMutation } from '@tanstack/react-query';

import { type ProfileRepoTechnology } from '@jobstash/profile/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { useNProgress } from '@jobstash/shared/state';

import { useProfileRepoPageContext } from '../contexts/profile-repo-page-context';

interface Payload {
  id: string;
  techsUsed: ProfileRepoTechnology[];
  techsCreated: ProfileRepoTechnology[];
}

export const useTechsUsedMutation = () => {
  const { setIsLoadingCard } = useProfileRepoPageContext();
  const { startNProgress, stopNProgress } = useNProgress();

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
      startNProgress(true);
      setIsLoadingCard(true);
    },
    onSuccess(profileInfo) {
      // TODO: Add notifications
      // TODO: Update profile-repo-list,
      // TODO: Update profile repo state (should update disableSave flag)
      notifSuccess({ message: 'You have updated your technologies used' });
    },
    onError() {
      notifError();
    },
    onSettled() {
      stopNProgress(true);
      setIsLoadingCard(false);

      // TODO: invalidate profile-repo-list
    },
  });

  return { isLoading, mutate };
};
