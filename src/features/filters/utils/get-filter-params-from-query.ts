import { ParsedUrlQuery } from 'node:querystring';

import { FILTER_CONFIG_KEY_SET } from '../core/constants';

export const getFilterFromQuery = (query: ParsedUrlQuery) => {
  const filterQueryParams: Record<string, string> = {};
  let filterParams = '';

  for (const [key, value] of Object.entries(query)) {
    if (FILTER_CONFIG_KEY_SET.has(key)) {
      filterParams += `&${key}=${value}`;
      filterQueryParams[key] = value as string;
    }
  }

  return { filterQueryParams, filterParams };
};