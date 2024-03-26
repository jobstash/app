import { useQuery } from '@tanstack/react-query';

import { getLSMwVersion } from '@jobstash/shared/utils';

import { getAllOrgs } from '@jobstash/admin/data';

export const useAllOrgs = () => {
  const mwVersion = getLSMwVersion();

  return useQuery({
    queryKey: [mwVersion, 'all-orgs'],
    queryFn: async () => getAllOrgs(),
    staleTime: 1000 * 60 * 60,
  });
};
