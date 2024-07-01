import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

import { type DevProfileInfoPayload } from '@jobstash/profile/core';
import { ERR_INTERNAL } from '@jobstash/shared/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { postDevProfileInfo } from '@jobstash/profile/data';

type MutationPayload = {
  payload: DevProfileInfoPayload;
  isToggleAvailability?: boolean;
};

export const useDevProfileInfoMutation = () => {
  const { address } = useAccount();
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  const profileInfoQueryKey = [mwVersion, 'dev-profile-info', address];

  const { isPending: isLoadingMutation, mutate } = useMutation({
    mutationFn: ({ payload }: MutationPayload) => postDevProfileInfo(payload),
    onSuccess(profileInfo, { payload, isToggleAvailability }) {
      queryClient.setQueryData(profileInfoQueryKey, profileInfo);

      const title = isToggleAvailability
        ? payload.availableForWork
          ? 'You are now Available for Work!'
          : 'You turned off work availability.'
        : 'Profile Info Updated!';

      const message =
        'You are able to update your availability both in the header and in your profile at any time.';

      notifSuccess({
        title,
        message,
        autoClose: 6000,
      });
    },
    onError(data) {
      console.log('ERROR', { data });
      notifError({
        title: 'Submission Failed!',
        message: data.message ?? ERR_INTERNAL,
      });
    },
    async onSettled() {
      // Always refetch after
      await queryClient.invalidateQueries({
        queryKey: [mwVersion, 'dev-profile-info', address],
      });
    },
  });

  return { isLoadingMutation, mutate };
};
