import { useQuery } from '@tanstack/react-query';

import { useAuthContext } from '@jobstash/auth/state';
import { useMwVersionContext } from '@jobstash/shared/state';
import { getProjectItem } from '@jobstash/admin/data';

export const useProjectItem = (projectId: string) => {
  const { isLoading } = useAuthContext();
  const { mwVersion } = useMwVersionContext();

  return useQuery({
    queryKey: [mwVersion, 'project-item', projectId],
    queryFn: async () => getProjectItem(projectId),
    staleTime: 1000 * 60 * 60,
    enabled: !isLoading && Boolean(projectId),
  });
};
