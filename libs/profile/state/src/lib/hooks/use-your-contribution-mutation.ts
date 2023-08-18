import { useMutation } from '@tanstack/react-query';

import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { useNProgress } from '@jobstash/shared/state';

import { useProfileRepoPageContext } from '../contexts/profile-repo-page-context';

interface Payload {
  id: string; // Profile Repository ID
  contribution: string;
}

export const useYourContributionMutation = () => {
  const { setIsLoadingCard } = useProfileRepoPageContext();
  const { startNProgress, stopNProgress } = useNProgress();

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
      startNProgress(true);
      setIsLoadingCard(true);
    },
    onSuccess(profileInfo) {
      // TODO: Add notifications
      // TODO: Update profile-repo-list
      // TODO: Update profile repo state (should update disableSave flag)
      notifSuccess({
        message: 'You have updated your contribution description',
      });
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
