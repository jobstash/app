import { useMutation, useQueryClient } from '@tanstack/react-query';

import { type ProfileRepoContributionPayload } from '@jobstash/profile/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { postProfileRepoContribution } from '@jobstash/profile/data';

import { useProfileRepoPageContext } from '../contexts/profile-repo-page-context';

export const useYourContributionMutation = () => {
  const { setIsLoadingCard } = useProfileRepoPageContext();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: (payload: ProfileRepoContributionPayload) =>
      postProfileRepoContribution(payload),

    onMutate() {
      setIsLoadingCard(true);
    },
    onSuccess({ message }) {
      // TODO: Update profile-repo-list
      // TODO: Update profile repo state (should update disableSave flag)
      notifSuccess({
        title: 'Review Added',
        message,
      });

      // Invalidate profile-repo-list
      queryClient.invalidateQueries({ queryKey: ['profile-repo-list'] });
    },
    onError(error) {
      notifError({
        title: 'Update contribution failed!',
        message: (error as Error).message,
      });
    },
    onSettled() {
      setIsLoadingCard(false);
    },
  });

  return { isLoading, mutate };
};
