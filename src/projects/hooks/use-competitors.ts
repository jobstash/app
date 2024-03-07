import { useQuery } from '@tanstack/react-query';

import { projectQueryKeys } from '~/projects/core/query-keys';
import { getCompetitors } from '~/projects/api/get-competitors';

export const useCompetitors = (projectId: string | undefined) => {
  return useQuery({
    queryKey: projectQueryKeys.competitors(projectId!),
    queryFn: () => getCompetitors(projectId!),
    enabled: !!projectId,
  });
};
