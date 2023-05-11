import { useQuery } from '@tanstack/react-query';

import { GenericResponse } from '~/shared/core/interfaces';

import { Job } from '../core/types';
import { fetchJob } from '../fetch';

export const useJobQuery = (
  shortUuid: string,
  enabled?: boolean,
  onSuccess?: (data: Job) => void,
) =>
  useQuery<Job, GenericResponse>({
    queryKey: ['job-post', shortUuid],
    queryFn: () => fetchJob(shortUuid),
    staleTime: 1000 * 60 * 60, // 1 hr
    onSuccess,
    enabled,
  });
