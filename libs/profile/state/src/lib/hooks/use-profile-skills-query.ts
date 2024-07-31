import { useQuery } from '@tanstack/react-query';

import { useAuthContext } from '@jobstash/auth/state';
import { useMwVersionContext } from '@jobstash/shared/state';
import { getProfileSkills } from '@jobstash/profile/data';

export const useProfileSkillsQuery = () => {
  const { isAuthenticated } = useAuthContext();
  const { mwVersion } = useMwVersionContext();

  const { isLoading, isFetching, data } = useQuery({
    queryKey: [mwVersion, 'profile-skills'],
    queryFn: () => getProfileSkills(),
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 60,
  });

  return {
    isLoading,
    isFetching,
    data,
  };
};
