import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

import { getProfileSkills } from '@jobstash/profile/data';

export const useProfileSkillsQuery = () => {
  const { address } = useAccount();

  const { isLoading: isLoadingSkillsQuery, data: skillsQueryData } = useQuery({
    queryKey: ['profile-skills', address],
    queryFn: () => getProfileSkills(),
  });

  return {
    isLoadingSkillsQuery,
    skillsQueryData,
  };
};
