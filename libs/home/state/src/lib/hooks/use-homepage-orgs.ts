import { useQuery } from '@tanstack/react-query';

import { useMwVersionContext } from '@jobstash/shared/state';
import { getOrgList } from '@jobstash/organizations/data';

export const useHomePageOrgs = () => {
  const { mwVersion } = useMwVersionContext();

  return useQuery({
    queryKey: [mwVersion, 'home-page', 'orgs'],
    queryFn: () => getOrgList({ page: 1, limit: 10_000 }),
    staleTime: 1000 * 60 * 60, // 1hr
  });
};
