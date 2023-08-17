/* eslint-disable no-alert */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

import { type ProfileInfo } from '@jobstash/profile/core';

import { useNProgress } from '@jobstash/shared/state';

export const useProfileInfoMutation = () => {
  const { address } = useAccount();
  const queryClient = useQueryClient();

  const profileInfoQueryKey = ['profile-info', address];

  const { startNProgress, stopNProgress } = useNProgress();

  const { isLoading, mutate } = useMutation({
    mutationFn: (profileInfo: ProfileInfo) =>
      fetch('/api/fakers/profile/info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({
          availableForWork: profileInfo.availableForWork,
          contact: profileInfo.contact,
        }),
      }).then(() => profileInfo),
    onMutate() {
      startNProgress(true);
    },
    onSuccess(profileInfo) {
      queryClient.setQueryData(profileInfoQueryKey, profileInfo);
      alert(
        'Contacts Added. You are available for Work! (TODO: notifications)',
      );
    },
    onError() {
      alert('Something went wrong :( (TODO: notifications)');
    },
    onSettled() {
      stopNProgress(true);

      // Always refetch after
      queryClient.invalidateQueries({
        queryKey: ['profile-info', address],
      });
    },
  });

  return { isLoading, mutate };
};
