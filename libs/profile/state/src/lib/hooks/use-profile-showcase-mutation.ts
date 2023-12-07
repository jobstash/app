import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

import { type ProfileShowcasePayload } from '@jobstash/profile/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

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
    onSuccess({ message }, vars) {
      notifSuccess({ title: 'Showcase Updated', message });

      queryClient.setQueryData(['profile-showcase', address], vars.showcase);
      queryClient.invalidateQueries(['profile-showcase', address]);
    },
    onError(error) {
      notifError({
        title: 'Update skills failed!',
        message: (error as Error).message,
      });
    },
  });

  return { isLoadingShowcaseMutation, mutateAsyncShowcase };
};
