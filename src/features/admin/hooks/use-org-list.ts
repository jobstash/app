import { useQuery } from '@tanstack/react-query';

import { fetchOrgList } from '../api/fetch-org-list';
import { ShortOrg } from '../core/types';

export const useOrgList = () => {
  const { data, isLoading } = useQuery<ShortOrg[]>({
    queryKey: ['/organizations'],
    queryFn: fetchOrgList,
  });

  return { data, isLoading };
};
