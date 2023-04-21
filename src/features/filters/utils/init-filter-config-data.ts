import { ParsedUrlQuery } from 'node:querystring';
import { Entries } from 'type-fest';

import { FILTER_KIND } from '../core/constants';
import type { FilterConfig } from '../core/types';

export const initFilterConfigData = (
  data: FilterConfig,
  query: ParsedUrlQuery,
) => {
  const filterConfig = {} as FilterConfig;

  const filteredDataEntries = (Object.entries(data) as Entries<FilterConfig>)
    .filter(([, config]) => config.show)
    .sort(([_k1, v1], [_k2, v2]) => v1.position - v2.position);

  for (const [key, config] of filteredDataEntries) {
    Object.assign(filterConfig, { [key]: config });
  }

  const filterValues: Record<string, string | null> = {};

  const rangeParamKeys = [];
  const singleSelectParamKeys = [];
  const multiSelectParamKeys = [];

  // Iterate over filterConfig and assign defaults
  for (const [, config] of Object.entries(
    filterConfig,
  ) as Entries<FilterConfig>) {
    if (config.kind === FILTER_KIND.RANGE) {
      const { paramKey: minKey } = config.value.lowest;
      const { paramKey: maxKey } = config.value.highest;
      rangeParamKeys.push(minKey, maxKey);

      // Default to min/max values
      // filterValues[minKey] = Math.floor(minValue).toString();
      // filterValues[maxKey] = Math.ceil(maxValue).toString();
      filterValues[minKey] = null;
      filterValues[maxKey] = null;
    }

    if (config.kind === FILTER_KIND.SINGLE_SELECT) {
      const key = config.paramKey;
      singleSelectParamKeys.push(key);
      filterValues[key] = null;
    }

    if (
      config.kind === FILTER_KIND.MULTI_SELECT ||
      config.kind === FILTER_KIND.MULTI_SELECT_WITH_SEARCH
    ) {
      const key = config.paramKey;
      multiSelectParamKeys.push(key);
      filterValues[key] = null;
    }
  }

  // Override filterValues with values from query params
  const allParamKeys = new Set([
    ...rangeParamKeys,
    ...singleSelectParamKeys,
    ...multiSelectParamKeys,
    'query',
  ]);
  for (const [key, value] of Object.entries(query) as Entries<
    Record<string, string>
  >) {
    if (allParamKeys.has(key)) {
      filterValues[key] = value;
    }
  }

  return {
    filterConfig,
    filterValues,
  };
};
