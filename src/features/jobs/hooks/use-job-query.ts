import { useQuery } from '@tanstack/react-query';

import { GenericResponse } from '~/shared/core/interfaces';

import { JobListResult } from '../core/types';
import { fetchJob } from '../fetch';

export const useJobQuery = (
  shortUuid: string,
  enabled?: boolean,
  onSuccess?: (data: JobListResult) => void,
) =>
  useQuery<JobListResult, GenericResponse>({
    queryKey: ['job-post', shortUuid],
    queryFn: () => fetchJob(shortUuid),
    staleTime: 1000 * 60 * 60, // 1 hr
    onSuccess,
    enabled,
  });
