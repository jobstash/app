import { useQuery } from '@tanstack/react-query';

import { getPendingOrgs } from '@jobstash/admin/data';

export const usePendingOrgsQuery = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['pending-orgs'],
    queryFn: async () => getPendingOrgs(),
  });

  return { isLoading, data };
};
