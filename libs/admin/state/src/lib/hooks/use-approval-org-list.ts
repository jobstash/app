import { useQuery } from '@tanstack/react-query';

import { useMwVersionContext } from '@jobstash/shared/state';
import { getApprovalOrgList } from '@jobstash/admin/data';

export const useApprovalOrgList = (status: 'pending' | 'approved') => {
  const { mwVersion } = useMwVersionContext();

  const { isLoading, isFetching, data } = useQuery({
    queryKey: [mwVersion, 'approval-org-list', status],
    queryFn: async () => getApprovalOrgList(status),
  });

  return { isLoading, isFetching, data };
};
