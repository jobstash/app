import { useQuery } from '@tanstack/react-query';

import { fetchOrgDeets } from '../api/fetch-org-deets';
import { ShortOrg } from '../core/types';

export const useOrgDeets = (id?: string) => {
  const { data, isLoading } = useQuery<ShortOrg>({
    queryKey: ['/organizations', id],
    queryFn: () => fetchOrgDeets(id),
    enabled: Boolean(id),
  });

  return { data, isLoading };
};
