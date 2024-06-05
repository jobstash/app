import { useQuery } from '@tanstack/react-query';

import { useMwVersionContext } from '@jobstash/shared/state';
import { getAllOrgs } from '@jobstash/admin/data';

export const useAllOrgs = () => {
  const { mwVersion } = useMwVersionContext();

  return useQuery({
    queryKey: [mwVersion, 'all-orgs'],
    queryFn: async () => getAllOrgs(),
    staleTime: 1000 * 60 * 60,
  });
};
