import { ParsedUrlQuery } from 'node:querystring';

import { FILTER_CONFIG_KEY_SET } from '../core/constants';
import { FilterParamKey } from '../core/types';

export const getFilterFromQuery = (query: ParsedUrlQuery) => {
  const filterParamsObj: Record<string, string> = {};

  for (const [key, value] of Object.entries(query)) {
    if (FILTER_CONFIG_KEY_SET.has(key as FilterParamKey)) {
      filterParamsObj[key] = value as string;
    }
  }

  return { filterParamsObj };
};