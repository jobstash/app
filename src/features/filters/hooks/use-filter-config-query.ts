import { useQuery } from '@tanstack/react-query';

import {
  API_MW_AUTH_TOKEN,
  API_MW_URL,
  ERR_INTERNAL,
  SENTRY_MW_NON_200_RESPONSE,
  SENTRY_MW_NON_JSON_RESPONSE,
} from '~/shared/core/constants';
import type { GenericResponse } from '~/shared/core/interfaces';
import { sentryMessage } from '~/shared/utils';

import type { FilterConfig } from '../core/interfaces';

const SENTRY_LABEL = `getQueryFn`;

const getQueryFn = async (): Promise<FilterConfig> => {
  const res = await fetch(`${API_MW_URL}/jobs/filters`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${API_MW_AUTH_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  // Query to mw should work - 500 otherwise
  if (!res.ok) {
    sentryMessage(SENTRY_LABEL, SENTRY_MW_NON_200_RESPONSE);
    throw new Error(ERR_INTERNAL);
  }

  let data: FilterConfig;

  // Data should be json - 500 otherwise
  try {
    data = await res.json();
  } catch {
    sentryMessage(SENTRY_LABEL, SENTRY_MW_NON_JSON_RESPONSE);
    throw new Error(ERR_INTERNAL);
  }

  /** TEMPORARY DISABLE VALIDATION UNTIL FILTER-CONFIG MATCHES SCHEMA */
  // TODO: Uncomment once mw fixed returned values
  // const { error, value } = FilterConfigSchema.validate(data);

  // // Response from mw should be valid - 500 otherwise
  // if (error) {
  //   sentryMessage(SENTRY_LABEL, SENTRY_MW_INVALID_RESPONSE);
  //   throw new Error(ERR_INTERNAL);
  // }

  // if (!value) {
  //   sentryMessage(SENTRY_LABEL, SENTRY_MW_EMPTY_RESPONSE);
  //   throw new Error(ERR_INTERNAL);
  // }

  // return value;

  return data;
};

export const useFilterConfigQuery = () =>
  useQuery<FilterConfig, GenericResponse>({
    queryKey: ['filter-config'],
    queryFn: getQueryFn,
  });
