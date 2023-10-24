import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

import { type ProfileShowcasePayload } from '@jobstash/profile/core';

import { postProfileShowcase } from '@jobstash/profile/data';

export const useProfileShowcaseMutation = () => {
  const { address } = useAccount();
  const queryClient = useQueryClient();

  const {
    isLoading: isLoadingShowcaseMutation,
    mutateAsync: mutateAsyncShowcase,
  } = useMutation({
    mutationFn: (payload: ProfileShowcasePayload) =>
      postProfileShowcase(payload),
    onSuccess(_, vars) {
      queryClient.setQueryData(['profile-showcase', address], {
        data: vars.showcase,
        message: 'User showcase retrieved successfully',
        success: true,
      });
      queryClient.invalidateQueries(['profile-showcase', address]);
    },
  });

  return { isLoadingShowcaseMutation, mutateAsyncShowcase };
};
