import { useQuery } from '@tanstack/react-query';

import { useMwVersionContext } from '@jobstash/shared/state';
import { getProjectDetails } from '@jobstash/projects/data';

export const useProjectDetails = (projectId: string | null) => {
  const { mwVersion } = useMwVersionContext();

  return useQuery({
    queryKey: [mwVersion, 'project-details', projectId, undefined],
    queryFn: () => getProjectDetails({ projectId: projectId as string }),
    staleTime: 1000 * 60 * 60, // 1 hr,
    enabled: Boolean(projectId),
  });
};
