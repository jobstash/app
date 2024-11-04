import { useQuery } from '@tanstack/react-query';

import { useMwVersionContext } from '@jobstash/shared/state';
import { getAdminAffiliationRequests } from '@jobstash/admin/data';

type AffiliationList = 'all' | 'pending' | 'approved' | 'rejected';

export const useAdminAffiliationRequests = (list: AffiliationList) => {
  const { mwVersion } = useMwVersionContext();

  return useQuery({
    queryKey: [mwVersion, 'get-admin-affiliation-requests', list],
    queryFn: async () => getAdminAffiliationRequests(list),
    staleTime: 1000 * 60 * 60,
  });
};
