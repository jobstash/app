import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

import { ProfileSkillsPayload } from '@jobstash/profile/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { postProfileSkills } from '@jobstash/profile/data';

export const useProfileSkillsMutation = () => {
  const { address } = useAccount();
  const queryClient = useQueryClient();

  const { isLoading: isLoadingSkillsMutation, mutateAsync: mutateAsyncSkills } =
    useMutation({
      mutationFn: (payload: ProfileSkillsPayload) => postProfileSkills(payload),
      onSuccess({ message }, vars) {
        notifSuccess({ title: 'Skills Updated', message });

        queryClient.setQueryData(['profile-skills', address], vars.skills);
        queryClient.invalidateQueries(['profile-skills', address]);
      },
      onError(error) {
        notifError({
          title: 'Update skills failed!',
          message: (error as Error).message,
        });
      },
    });

  return { isLoadingSkillsMutation, mutateAsyncSkills };
};
