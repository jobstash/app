import { useQuery } from '@tanstack/react-query';

import { useMwVersionContext } from '@jobstash/shared/state';
import { getAffiliatedOrgs } from '@jobstash/auth/data';

import { useAuthContext } from './use-auth-context';

export const useAffiliatedOrgs = () => {
  const { mwVersion } = useMwVersionContext();
  const { isAuthenticated } = useAuthContext();

  return useQuery({
    queryKey: [mwVersion, 'affiliated-orgs'],
    queryFn: () => getAffiliatedOrgs(),
    enabled: isAuthenticated,
    refetchOnWindowFocus: false,
  });
};
