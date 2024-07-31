import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { type ProfileOrgRatingPayload } from '@jobstash/profile/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { postProfileOrgRating } from '@jobstash/profile/data';

import { activeProfileOrgReviewAtom } from '../atoms/active-profile-org-review-atom';
import { useProfileReviewsPageContext } from '../contexts/profile-reviews-page-context';

export const useRatingMutation = () => {
  const { setIsLoadingCard } = useProfileReviewsPageContext();
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  const [activeProfileOrgReview, setActiveProfileOrgReview] = useAtom(
    activeProfileOrgReviewAtom,
  );

  const { isPending: isLoading, mutate } = useMutation({
    mutationFn: (payload: ProfileOrgRatingPayload) =>
      postProfileOrgRating(payload),
    onMutate() {
      setIsLoadingCard(true);
    },
    onSuccess({ message }, payload) {
      // TODO: Update org-review-list,
      // TODO: Update org-review state (should update disableSave flag)
      notifSuccess({ title: 'Rating Updated', message });

      // Invalidate profile-org-review-list
      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'profile-org-review-list'],
      });

      if (activeProfileOrgReview) {
        const rating = (({ orgId, ...props }) => props)(payload);
        setActiveProfileOrgReview({
          ...activeProfileOrgReview,
          rating,
        });
      }

      // Invalidate org details
      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'org-details', payload.orgId],
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
