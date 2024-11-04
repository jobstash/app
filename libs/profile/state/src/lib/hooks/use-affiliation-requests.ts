import { useQuery } from '@tanstack/react-query';

import { useMwVersionContext } from '@jobstash/shared/state';
import { getAffiliationRequests } from '@jobstash/profile/data';

interface Props {
  orgId?: string | null;
  list?: 'all' | 'pending' | 'approved' | 'rejected';
}

export const useAffiliationRequests = ({
  orgId = null,
  list = 'all',
}: Props) => {
  const { mwVersion } = useMwVersionContext();

  return useQuery({
    queryKey: [mwVersion, 'get-affiliation-requests', orgId, list],
    queryFn: async () => getAffiliationRequests({ orgId, list }),
    staleTime: 1000 * 60 * 60,
  });
};
