import { useQuery } from '@tanstack/react-query';

import { getLSMwVersion } from '@jobstash/shared/utils';

import { getProjectDetails } from '@jobstash/projects/data';

export const useProjectDetails = (projectId: string | null) => {
  const mwVersion = getLSMwVersion();

  return useQuery({
    queryKey: [mwVersion, 'project-details', projectId, undefined],
    queryFn: () => getProjectDetails({ projectId: projectId as string }),
    staleTime: 1000 * 60 * 60, // 1 hr,
    enabled: Boolean(projectId),
  });
};
