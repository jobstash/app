import { useQuery } from '@tanstack/react-query';

import type { Project } from '~/shared/core/interfaces';

import { fetchOrgProjects } from '../api/fetch-org-projects';

export const useOrgProjects = (id: string) => {
  const { data, isLoading, error } = useQuery<Project[]>({
    queryKey: ['org-projects', id],
    queryFn: () => fetchOrgProjects(id),
    enabled: true,
  });

  return { data, isLoading, error };
};
