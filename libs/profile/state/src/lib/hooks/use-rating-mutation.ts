import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

import { type ProfileOrgRatingPayload } from '@jobstash/profile/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { postProfileOrgRating } from '@jobstash/profile/data';

import { useProfileReviewsPageContext } from '../contexts/profile-reviews-page-context';

export const useRatingMutation = () => {
  const { setIsLoadingCard } = useProfileReviewsPageContext();
  const { address } = useAccount();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: (payload: ProfileOrgRatingPayload) =>
      postProfileOrgRating(payload),
    onMutate() {
      setIsLoadingCard(true);
    },
    onSuccess({ message }) {
      // TODO: Update org-review-list,
      // TODO: Update org-review state (should update disableSave flag)
      notifSuccess({ title: 'Rating Updated', message });

      // Invalidate profile-org-review-list
      queryClient.invalidateQueries({
        queryKey: ['profile-org-review-list', address],
      });
    },
    onError(error) {
      notifError({
        title: 'Update rating failed!',
        message: (error as Error).message,
      });
    },
    onSettled() {
      setIsLoadingCard(false);
    },
  });

  return { isLoading, mutate };
};
