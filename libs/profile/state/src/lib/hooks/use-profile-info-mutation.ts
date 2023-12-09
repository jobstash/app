import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

import { type ProfileInfoPayload } from '@jobstash/profile/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { postProfileInfo } from '@jobstash/profile/data';

const PROFILE_HEADER_NOTIF_ID = 'profile-header';

type MutationPayload = {
  payload: ProfileInfoPayload;
  isToggleAvailability?: boolean;
};

export const useProfileInfoMutation = () => {
  const { address } = useAccount();
  const queryClient = useQueryClient();

  const profileInfoQueryKey = ['profile-info', address];

  const { isLoading: isLoadingMutation, mutate } = useMutation({
    mutationFn: ({ payload }: MutationPayload) => postProfileInfo(payload),
    onSuccess(profileInfo, { payload, isToggleAvailability }) {
      queryClient.setQueryData(profileInfoQueryKey, profileInfo);

      const title = isToggleAvailability
        ? payload.availableForWork
          ? 'You are now Available for Work!'
          : 'You turned off work availability.'
        : 'Contacts added';

      const message =
        'You are able to update your availability both in the header and in your profile at any time.';

      notifSuccess({
        id: PROFILE_HEADER_NOTIF_ID,
        title,
        message,
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

  return { isLoadingMutation, mutate };
};
