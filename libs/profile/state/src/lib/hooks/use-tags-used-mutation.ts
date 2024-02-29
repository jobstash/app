import { useMutation, useQueryClient } from '@tanstack/react-query';

import { type ProfileRepoTagPayload } from '@jobstash/profile/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { postProfileRepoTag } from '@jobstash/profile/data';

import { useProfileRepoPageContext } from '../contexts/profile-repo-page-context';

export const useTagsUsedMutation = () => {
  const { setIsLoadingCard } = useProfileRepoPageContext();
  const queryClient = useQueryClient();

  const { isPending: isLoading, mutate } = useMutation({
    mutationFn: (payload: ProfileRepoTagPayload) => postProfileRepoTag(payload),
    onMutate() {
      setIsLoadingCard(true);
    },
    onSuccess({ message }, payload) {
      notifSuccess({
        title: 'Profile Tags Updated!',
        message,
      });

      queryClient.invalidateQueries({ queryKey: ['profile-skills'] });
      queryClient.invalidateQueries({ queryKey: ['profile-repo-list'] });
    },
    onError(error) {
      notifError({
        title: 'Profile Tags Failed!',
        message: (error as Error).message,
      });
    },
    onSettled() {
      setIsLoadingCard(false);
    },
  });

  return { isLoading, mutate };
};
