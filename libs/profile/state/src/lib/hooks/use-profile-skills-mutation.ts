import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

import { ProfileSkillsPayload } from '@jobstash/profile/core';
import { notifError, notifLoading, notifSuccess } from '@jobstash/shared/utils';

import { postProfileSkills } from '@jobstash/profile/data';

const TOAST_ID = 'skills-mutation';

export const useProfileSkillsMutation = () => {
  const { address } = useAccount();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: (payload: ProfileSkillsPayload) => postProfileSkills(payload),
    onMutate() {
      notifications.hide(TOAST_ID);
      notifLoading({
        id: TOAST_ID,
        title: 'Updating Skills',
        message: 'Please wait while we update your skills',
      });
    },
    onSuccess({ message }, vars) {
      notifSuccess({
        id: TOAST_ID,
        title: 'Skills Updated!',
        message,
      });

      queryClient.setQueryData(['profile-skills', address], vars.skills);
      queryClient.invalidateQueries(['profile-skills', address]);
    },
    onError(error) {
      notifError({
        id: TOAST_ID,
        title: 'Skills Failed!',
        message: (error as Error).message,
      });
    },
  });

  return { isLoading, mutate };
};
