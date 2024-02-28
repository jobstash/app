import { useQuery } from '@tanstack/react-query';

import { getAllOrgs } from '@jobstash/admin/data';

export const useAllOrgs = () =>
  useQuery({
    queryKey: ['all-orgs'],
    queryFn: async () => getAllOrgs(),
    staleTime: 1000 * 60 * 60,
  });
