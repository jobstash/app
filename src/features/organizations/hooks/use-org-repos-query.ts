import { useQuery } from '@tanstack/react-query';

import { GenericResponse, Repository } from '~/shared/core/interfaces';

import { fetcgOrgRepos } from '../fetch';

export const useOrgReposQuery = (orgId: string | undefined) =>
  useQuery<Repository[], GenericResponse>({
    queryKey: ['org-repos', orgId],
    queryFn: () => fetcgOrgRepos(orgId!),
    staleTime: 1000 * 60 * 60, // 1 hr
    enabled: Boolean(orgId),
  });
