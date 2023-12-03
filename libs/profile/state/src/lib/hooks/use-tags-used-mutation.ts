import { useMutation, useQueryClient } from '@tanstack/react-query';

import { type ProfileRepoTagPayload } from '@jobstash/profile/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { postProfileRepoTag } from '@jobstash/profile/data';

import { useProfileRepoPageContext } from '../contexts/profile-repo-page-context';

export const useTagsUsedMutation = () => {
  const { setIsLoadingCard } = useProfileRepoPageContext();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: (payload: ProfileRepoTagPayload) => postProfileRepoTag(payload),
    onMutate() {
      setIsLoadingCard(true);
    },
    onSuccess({ message }) {
      // TODO: Update profile-repo-list,
      // TODO: Update profile repo state (should update disableSave flag)
      notifSuccess({ message });
    },
    onError(error) {
      notifError({
        title: 'Update tags failed!',
        message: (error as Error).message,
      });
    },
    onSettled() {
      setIsLoadingCard(false);

      // Invalidate profile-repo-list
      queryClient.invalidateQueries({ queryKey: ['profile-repo-list'] });
    },
  });

  return { isLoading, mutate };
};
