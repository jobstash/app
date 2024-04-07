import { useQuery } from '@tanstack/react-query';

import { QUERY_STALETIME } from '~/shared/core/constants';

import { projectQueryKeys } from '~/projects/core/query-keys';
import { getProjectDetails } from '~/projects/api/get-project-details';

export const useProjectDetails = (projectId: string) => {
  return useQuery({
    queryKey: projectQueryKeys.details(projectId),
    queryFn: () => getProjectDetails({ projectId }),
    staleTime: QUERY_STALETIME.DEFAULT,
  });
};
