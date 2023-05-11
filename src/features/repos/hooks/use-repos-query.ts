import { useQuery } from '@tanstack/react-query';

import { GenericResponse, Repository } from '~/shared/core/interfaces';

import { fetchRepos } from '../fetch';

export const useReposQuery = (orgId: string | undefined) =>
  useQuery<Repository[], GenericResponse>({
    queryKey: ['org-repos', orgId],
    queryFn: () => fetchRepos(orgId!),
    staleTime: 1000 * 60 * 60, // 1 hr
    enabled: Boolean(orgId),
  });
