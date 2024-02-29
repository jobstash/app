import { useQuery } from '@tanstack/react-query';

import { getProjectDetails } from '@jobstash/projects/data';

export const useProjectDetails = (projectId: string | null) =>
  useQuery({
    queryKey: ['project-details', projectId],
    queryFn: () => getProjectDetails(projectId as string),
    staleTime: 1000 * 60 * 60, // 1 hr,
    enabled: Boolean(projectId),
  });
