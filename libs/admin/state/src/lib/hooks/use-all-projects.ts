import { useQuery } from '@tanstack/react-query';

import { useAuthContext } from '@jobstash/auth/state';
import { useMwVersionContext } from '@jobstash/shared/state';
import { getAllProjects } from '@jobstash/admin/data';

export const useAllProjects = () => {
  const { isLoading } = useAuthContext();
  const { mwVersion } = useMwVersionContext();

  return useQuery({
    queryKey: [mwVersion, 'all-projects'],
    queryFn: async () => getAllProjects(),
    staleTime: 1000 * 60 * 60,
    enabled: !isLoading,
    refetchOnWindowFocus: false,
  });
};
