import { usePrivy } from '@privy-io/react-auth';
import { useQuery } from '@tanstack/react-query';

import { useMwVersionContext } from '@jobstash/shared/state';
import { getAffiliatedOrgs } from '@jobstash/auth/data';

export const useAffiliatedOrgs = () => {
  const { mwVersion } = useMwVersionContext();
  const { authenticated } = usePrivy();

  return useQuery({
    queryKey: [mwVersion, 'affiliated-orgs'],
    queryFn: () => getAffiliatedOrgs(),
    enabled: authenticated,
    refetchOnWindowFocus: false,
  });
};
