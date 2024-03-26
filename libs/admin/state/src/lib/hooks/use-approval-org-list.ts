import { useQuery } from '@tanstack/react-query';

import { getLSMwVersion } from '@jobstash/shared/utils';

import { getApprovalOrgList } from '@jobstash/admin/data';

export const useApprovalOrgList = (status: 'pending' | 'approved') => {
  const mwVersion = getLSMwVersion();

  const { isLoading, isFetching, data } = useQuery({
    queryKey: [mwVersion, 'approval-org-list', status],
    queryFn: async () => getApprovalOrgList(status),
  });

  return { isLoading, isFetching, data };
};
