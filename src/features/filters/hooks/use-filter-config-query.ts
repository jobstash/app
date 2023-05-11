import { useQuery } from '@tanstack/react-query';

import {
  ERR_INTERNAL,
  NEXT_PUBLIC_MW_URL,
  SENTRY_MW_NON_200_RESPONSE,
  SENTRY_MW_NON_JSON_RESPONSE,
} from '~/shared/core/constants';
import type { GenericResponse } from '~/shared/core/interfaces';
import { sentryMessage } from '~/shared/utils';

import type { FilterConfig } from '../core/types';

const SENTRY_LABEL = `getQueryFn`;

const getQueryFn = async (): Promise<FilterConfig> => {
  const res = await fetch(`${NEXT_PUBLIC_MW_URL}/jobs/filters`);

  if (!res.ok) {
    sentryMessage(SENTRY_LABEL, SENTRY_MW_NON_200_RESPONSE);
    throw new Error(ERR_INTERNAL);
  }

  let data: FilterConfig;

  try {
    data = await res.json();
  } catch {
    sentryMessage(SENTRY_LABEL, SENTRY_MW_NON_JSON_RESPONSE);
    throw new Error(ERR_INTERNAL);
  }

  return data;
};

export const useFilterConfigQuery = () =>
  useQuery<FilterConfig, GenericResponse>({
    queryKey: ['filter-config'],
    queryFn: getQueryFn,
    staleTime: 1000 * 60 * 5, // After 5 mins, refetch
  });
