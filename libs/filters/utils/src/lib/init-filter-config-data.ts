import { type ParsedUrlQuery } from 'node:querystring';

import {
  FILTER_KIND,
  type FilterConfig,
  type FilterValues,
} from '@jobstash/filters/core';

export const initFilterConfigData = (
  data: FilterConfig,
  routerQuery: ParsedUrlQuery,
) => {
  const filterConfig = {} as FilterConfig;

  const filteredDataEntries = Object.entries(data)
    .filter(([, config]) => config.show)
    .sort(([_k1, v1], [_k2, v2]) => v1.position - v2.position);

  for (const [key, config] of filteredDataEntries) {
    Object.assign(filterConfig, { [key]: config });
  }

  const filterValues = {} as FilterValues;

  const rangeParamKeys = [];
  const singleSelectParamKeys = [];
  const multiSelectParamKeys = [];

  // Iterate over filterConfig and assign defaults
  for (const [, config] of Object.entries(filterConfig)) {
    if (config.kind === FILTER_KIND.RANGE) {
      const { paramKey: minKey } = config.value.lowest;
      const { paramKey: maxKey } = config.value.highest;
      filterValues[minKey] = null;
      filterValues[maxKey] = null;
      rangeParamKeys.push(minKey, maxKey);
    }

    if (config.kind === FILTER_KIND.SINGLE_SELECT) {
      const key = config.paramKey;
      filterValues[key] = null;
      singleSelectParamKeys.push(key);
    }

    if (
      config.kind === FILTER_KIND.MULTI_SELECT ||
      config.kind === FILTER_KIND.MULTI_SELECT_WITH_SEARCH
    ) {
      const key = config.paramKey;
      filterValues[key] = null;
      multiSelectParamKeys.push(key);
    }
  }

  // Override filterValues with values from query params
  const allParamKeys = new Set([
    ...rangeParamKeys,
    ...singleSelectParamKeys,
    ...multiSelectParamKeys,
    'query',
  ]);

  for (const [key, value] of Object.entries(routerQuery)) {
    if (allParamKeys.has(key) && value) {
      filterValues[key] = value.toString();
    }
  }

  return {
    filterConfig,
    filterValues,
  };
};
