import { usePrivy } from '@privy-io/react-auth';
import { useQuery } from '@tanstack/react-query';

import { useMwVersionContext } from '@jobstash/shared/state';
import { getUserOrg } from '@jobstash/auth/data';

export const useUserOrg = () => {
  const { mwVersion } = useMwVersionContext();
  const { authenticated } = usePrivy();

  return useQuery({
    queryKey: [mwVersion, 'user-org'],
    queryFn: () => getUserOrg(),
    enabled: authenticated,
  });
};
