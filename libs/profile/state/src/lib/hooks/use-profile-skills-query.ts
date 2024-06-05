import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

import { useMwVersionContext } from '@jobstash/shared/state';
import { getProfileSkills } from '@jobstash/profile/data';

export const useProfileSkillsQuery = () => {
  const { address } = useAccount();
  const { mwVersion } = useMwVersionContext();

  const { isLoading, isFetching, data } = useQuery({
    queryKey: [mwVersion, 'profile-skills', address],
    queryFn: () => getProfileSkills(),
    enabled: Boolean(address),
    staleTime: 1000 * 60 * 60,
  });

  return {
    isLoading,
    isFetching,
    data,
  };
};
