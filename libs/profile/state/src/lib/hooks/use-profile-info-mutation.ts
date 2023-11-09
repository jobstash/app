import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

import { type ProfileInfoPayload } from '@jobstash/profile/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { postProfileInfo } from '@jobstash/profile/data';

const PROFILE_HEADER_NOTIF_ID = 'profile-header';

export const useProfileInfoMutation = () => {
  const { address } = useAccount();
  const queryClient = useQueryClient();

  const profileInfoQueryKey = ['profile-info', address];

  const { isLoading, mutate } = useMutation({
    mutationFn: (payload: ProfileInfoPayload) => postProfileInfo(payload),
    onSuccess(profileInfo) {
      queryClient.setQueryData(profileInfoQueryKey, profileInfo);

      notifSuccess({
        id: PROFILE_HEADER_NOTIF_ID,
        title: `Contacts added.${
          profileInfo.availableForWork ? ' You are Available for Work!' : ''
        }`,
        message:
          'You are able to update your availability both in the header and in your profile at any time.',
        autoClose: 6000,
      });
    },
    onError() {
      notifError({
        id: PROFILE_HEADER_NOTIF_ID,
        title: 'Something went wrong :(',
        message: 'Please try again later.',
      });
    },
    onSettled() {
      // Always refetch after
      queryClient.invalidateQueries({
        queryKey: ['profile-info', address],
      });
    },
  });

  return { isLoading, mutate };
};
