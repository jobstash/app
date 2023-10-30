import { useMutation } from '@tanstack/react-query';

import { type ProfileRepoTag } from '@jobstash/profile/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { useProfileRepoPageContext } from '../contexts/profile-repo-page-context';

interface Payload {
  id: string;
  techsUsed: ProfileRepoTag[];
  techsCreated: ProfileRepoTag[];
}

export const useTechsUsedMutation = () => {
  const { setIsLoadingCard } = useProfileRepoPageContext();

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
      setIsLoadingCard(true);
    },
    onSuccess(profileInfo) {
      // TODO: Add notifications
      // TODO: Update profile-repo-list,
      // TODO: Update profile repo state (should update disableSave flag)
      notifSuccess({ message: 'You have updated your tags used' });
    },
    onError() {
      notifError();
    },
    onSettled() {
      setIsLoadingCard(false);

      // TODO: invalidate profile-repo-list
    },
  });

  return { isLoading, mutate };
};
