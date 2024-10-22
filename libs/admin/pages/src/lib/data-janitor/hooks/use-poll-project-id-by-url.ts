import { useQuery } from '@tanstack/react-query';

import { useAuthContext } from '@jobstash/auth/state';
import { useMwVersionContext } from '@jobstash/shared/state';
import { getProjectIdByUrl } from '@jobstash/admin/data';

export const usePollProjectIdyByUrl = (url: string, enabled: boolean) => {
  const { isLoading } = useAuthContext();
  const { mwVersion } = useMwVersionContext();

  return useQuery({
    queryKey: [mwVersion, 'get-project-id-by-url', url],
    queryFn: async () => getProjectIdByUrl(url),
    refetchInterval: 5000,
    refetchOnWindowFocus: false,
    enabled: !isLoading && enabled,
  });
};
