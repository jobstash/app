import { useQuery } from '@tanstack/react-query';

import { ERR_INTERNAL } from '~/shared/core/constants';
import type { GenericResponse } from '~/shared/core/interfaces';

import { API_URL_JOBS_FILTER_CONFIG } from '../core/constants';
import { JobsFilterConfigSchema } from '../core/schemas';
import type { JobsFilterConfig } from '../core/types';

const fetchJobsFilterConfig = async (): Promise<JobsFilterConfig> => {
  const res = await fetch(API_URL_JOBS_FILTER_CONFIG);

  // Query to jobs-filter-config should work - 500 otherwise
  if (!res.ok) {
    throw new Error(ERR_INTERNAL);
  }

  let data: JobsFilterConfig;

  // Data should be json - 500 otherwise
  try {
    data = await res.json();
  } catch {
    throw new Error(ERR_INTERNAL);
  }

  const { error, value } = JobsFilterConfigSchema.validate(data);

  // Response from mw should be valid - 500 otherwise
  if (error) {
    throw new Error(ERR_INTERNAL);
  }

  if (value) {
    return value;
  }

  // Should've thrown-error/returned-value by now - 500 otherwise
  throw new Error(ERR_INTERNAL);
};

export const useJobsFilterConfigQuery = () =>
  useQuery<JobsFilterConfig, GenericResponse>({
    queryKey: ['jobs-filter-config'],
    queryFn: fetchJobsFilterConfig,
  });
