import { useQuery } from '@tanstack/react-query';

import type { GenericResponse, Project } from '~/shared/core/interfaces';

import { fetchProjectDeets } from '../api/fetch-project-deets';

export const useProjectDeets = (id?: string) =>
  useQuery<Project, GenericResponse>({
    queryKey: ['/organizations', id],
    queryFn: () => fetchProjectDeets(id),
    enabled: Boolean(id),
  });
