import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useAccount } from 'wagmi';

import { type ProfileOrgSalaryPayload } from '@jobstash/profile/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { postProfileOrgSalary } from '@jobstash/profile/data';

import { activeProfileOrgReviewAtom } from '../atoms/active-profile-org-review-atom';
import { useProfileReviewsPageContext } from '../contexts/profile-reviews-page-context';

export const useSalaryMutation = () => {
  const { setIsLoadingCard } = useProfileReviewsPageContext();
  const { address } = useAccount();
  const queryClient = useQueryClient();

  const [activeProfileOrgReview, setActiveProfileOrgReview] = useAtom(
    activeProfileOrgReviewAtom,
  );

  const { isLoading, mutate } = useMutation({
    mutationFn: (payload: ProfileOrgSalaryPayload) =>
      postProfileOrgSalary(payload),
    onMutate() {
      setIsLoadingCard(true);
    },
    onSuccess({ message }, payload) {
      // TODO: Update org-review-list,
      // TODO: Update org-review state (should update disableSave flag)
      notifSuccess({ title: 'Salary Updated', message });

      // Invalidate profile-org-review-list
      queryClient.invalidateQueries({
        queryKey: ['profile-org-review-list', address],
      });

      if (activeProfileOrgReview) {
        const compensation = (({ orgId, ...props }) => props)(payload);
        setActiveProfileOrgReview({
          ...activeProfileOrgReview,
          compensation,
        });
      }
    },
    onError(error) {
      notifError({
        title: 'Update salary failed!',
        message: (error as Error).message,
      });
    },
    onSettled() {
      setIsLoadingCard(false);
    },
  });

  return { isLoading, mutate };
};
