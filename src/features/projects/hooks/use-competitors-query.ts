import { useQuery } from '@tanstack/react-query';

import type { Competitor, GenericResponse } from '~/shared/core/interfaces';

import { fetchCompetitors } from '../fetch';

export const useCompetitorsQuery = (id: string | undefined) =>
  useQuery<Competitor[], GenericResponse>({
    queryKey: ['competitors', id],
    queryFn: () => fetchCompetitors(id!),
    staleTime: 1000 * 60 * 60, // 1 hr
    enabled: Boolean(id),
  });
