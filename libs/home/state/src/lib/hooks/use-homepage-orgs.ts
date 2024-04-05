import { useQuery } from '@tanstack/react-query';

import { getLSMwVersion } from '@jobstash/shared/utils';

import { getOrgList } from '@jobstash/organizations/data';

export const useHomePageOrgs = () => {
  const mwVersion = getLSMwVersion();

  return useQuery({
    queryKey: [mwVersion, 'home-page', 'orgs'],
    queryFn: () => getOrgList({ page: 1, limit: 10_000 }),
    staleTime: 1000 * 60 * 60, // 1hr
  });
};
