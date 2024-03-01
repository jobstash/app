import { useQuery } from '@tanstack/react-query';

import { getApprovalOrgList } from '@jobstash/admin/data';

export const useApprovalOrgList = (status: 'pending' | 'approved') => {
  const { isLoading, isFetching, data } = useQuery({
    queryKey: ['approval-org-list', status],
    queryFn: async () => getApprovalOrgList(status),
  });

  return { isLoading, isFetching, data };
};
