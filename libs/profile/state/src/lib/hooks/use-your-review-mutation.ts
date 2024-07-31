import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { type ProfileOrgReviewPayload } from '@jobstash/profile/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { postProfileOrgReview } from '@jobstash/profile/data';

import { activeProfileOrgReviewAtom } from '../atoms/active-profile-org-review-atom';
import { useProfileReviewsPageContext } from '../contexts/profile-reviews-page-context';

export const useYourReviewMutation = () => {
  const { setIsLoadingCard } = useProfileReviewsPageContext();
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  const [activeProfileOrgReview, setActiveProfileOrgReview] = useAtom(
    activeProfileOrgReviewAtom,
  );

  const { isPending: isLoading, mutate } = useMutation({
    mutationFn: (payload: ProfileOrgReviewPayload) =>
      postProfileOrgReview(payload),
    onMutate() {
      setIsLoadingCard(true);
    },
    onSuccess({ message }, payload) {
      // TODO: Update org-review-list,
      // TODO: Update org-review state (should update disableSave flag)
      notifSuccess({ title: 'Review Updated', message });

      // Invalidate profile-org-review-list
      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'profile-org-review-list'],
      });

      if (activeProfileOrgReview) {
        const review = (({ orgId, ...props }) => props)(payload);
        setActiveProfileOrgReview({
          ...activeProfileOrgReview,
          review,
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
