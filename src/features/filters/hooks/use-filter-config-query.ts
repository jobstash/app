import { useQuery } from '@tanstack/react-query';

import { ERR_INTERNAL } from '~/shared/core/constants';
import type { GenericResponse } from '~/shared/core/interfaces';

import { FilterConfigSchema } from '../core/schemas';
import type { FilterConfig } from '../core/types';

const getQueryFn = (url: string) => async (): Promise<FilterConfig> => {
  const res = await fetch(url);

  // Query to mw should work - 500 otherwise
  if (!res.ok) {
    throw new Error(ERR_INTERNAL);
  }

  let data: FilterConfig;

  // Data should be json - 500 otherwise
  try {
    data = await res.json();
  } catch {
    throw new Error(ERR_INTERNAL);
  }

  const { error, value } = FilterConfigSchema.validate(data);

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

export const useFilterConfigQuery = (url: string) =>
  useQuery<FilterConfig, GenericResponse>({
    queryKey: ['filter-config', url],
    queryFn: getQueryFn(url),
  });
