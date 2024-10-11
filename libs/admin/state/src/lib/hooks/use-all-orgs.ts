import { useQuery } from '@tanstack/react-query';

import { useAuthContext } from '@jobstash/auth/state';
import { useMwVersionContext } from '@jobstash/shared/state';
import { getAllOrgs } from '@jobstash/admin/data';

export const useAllOrgs = () => {
  const { isLoading } = useAuthContext();
  const { mwVersion } = useMwVersionContext();

  return useQuery({
    queryKey: [mwVersion, 'all-orgs'],
    queryFn: async () => getAllOrgs(),
    staleTime: 1000 * 60 * 60,
    enabled: !isLoading,
    refetchOnWindowFocus: false,
  });
};
