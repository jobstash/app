import { useQuery } from '@tanstack/react-query';

import { useAuthContext } from '@jobstash/auth/state';
import { useMwVersionContext } from '@jobstash/shared/state';
import { getOrgIdByUrl } from '@jobstash/admin/data';

export const usePollOrgIdByUrl = (url: string, enabled: boolean) => {
  const { isLoading } = useAuthContext();
  const { mwVersion } = useMwVersionContext();

  return useQuery({
    queryKey: [mwVersion, 'get-org-id-by-url', url],
    queryFn: async () => getOrgIdByUrl(url),
    refetchInterval: 5000,
    refetchOnWindowFocus: false,
    enabled: !isLoading && enabled,
  });
};
