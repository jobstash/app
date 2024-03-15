import { useQuery } from '@tanstack/react-query';

import { getOrgList } from '@jobstash/organizations/data';

export const useHomePageOrgs = () =>
  useQuery({
    queryKey: ['home-page', 'orgs'],
    queryFn: () => getOrgList(1, undefined, 10_000),
    staleTime: 1000 * 60 * 60, // 1hr
  });
