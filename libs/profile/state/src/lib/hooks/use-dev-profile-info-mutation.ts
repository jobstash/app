import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

import { type DevProfileInfoPayload } from '@jobstash/profile/core';
import {
  getLSMwVersion,
  notifError,
  notifSuccess,
} from '@jobstash/shared/utils';

import { postDevProfileInfo } from '@jobstash/profile/data';

type MutationPayload = {
  payload: DevProfileInfoPayload;
  isToggleAvailability?: boolean;
};

export const useDevProfileInfoMutation = () => {
  const { address } = useAccount();
  const queryClient = useQueryClient();

  const profileInfoQueryKey = ['dev-profile-info', address];

  const mwVersion = getLSMwVersion();

  const { isPending: isLoadingMutation, mutate } = useMutation({
    mutationFn: ({ payload }: MutationPayload) => postDevProfileInfo(payload),
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
        queryKey: [mwVersion, 'dev-profile-info', address],
      });
    },
  });

  return { isLoadingMutation, mutate };
};
