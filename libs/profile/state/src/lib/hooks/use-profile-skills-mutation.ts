import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

import { ProfileSkillsPayload } from '@jobstash/profile/core';

import { postProfileSkills } from '@jobstash/profile/data';

export const useProfileSkillsMutation = () => {
  const { address } = useAccount();
  const queryClient = useQueryClient();

  const { isLoading: isLoadingSkillsMutation, mutate: mutateSkills } =
    useMutation({
      mutationFn: (payload: ProfileSkillsPayload) => postProfileSkills(payload),
      onSuccess() {
        queryClient.invalidateQueries(['profile-skills', address]);
      },
    });

  return { isLoadingSkillsMutation, mutateSkills };
};
