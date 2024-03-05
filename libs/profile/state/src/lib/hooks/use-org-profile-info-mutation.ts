import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

import { OrgProfileInfoPayload } from '@jobstash/profile/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { postOrgProfileInfo } from '@jobstash/profile/data';

export const useOrgProfileInfoMutation = () => {
  const { address } = useAccount();
  const queryClient = useQueryClient();

  const profileInfoQueryKey = ['org-profile-info', address];

  const { isPending, mutate } = useMutation({
    mutationFn: (payload: OrgProfileInfoPayload) => postOrgProfileInfo(payload),
    onSuccess(profileInfo, payload) {
      queryClient.setQueryData(profileInfoQueryKey, profileInfo);

      const title = 'You have updated your profile!';

      const message =
        'Your profile has been queued and will be processed shortly';

      notifSuccess({
        title,
        message,
        autoClose: 6000,
      });
    },
    onError() {
      notifError({
        title: 'Something went wrong :(',
        message: 'Please try again later.',
      });
    },
    onSettled() {
      // Always refetch after
      queryClient.invalidateQueries({
        queryKey: ['org-profile-info', address],
      });
    },
  });

  return { isPending, mutate };
};
