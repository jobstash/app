import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

import { getProfileSkills } from '@jobstash/profile/data';

export const useProfileSkillsQuery = () => {
  const { address } = useAccount();

  const { isLoading, data } = useQuery({
    queryKey: ['profile-skills', address],
    queryFn: () => getProfileSkills(),
  });

  return {
    isLoading,
    data,
  };
};
