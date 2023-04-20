/* eslint-disable unicorn/consistent-destructuring */

import { getUrlWithFilters } from '~/shared/utils';

import {
  FILTER_KIND_MULTISELECT,
  FILTER_KIND_MULTISELECT_WITH_SEARCH,
  FILTER_KIND_RANGE,
  FILTER_KIND_SINGLESELECT,
} from '../core/constants';
import type { FilterConfig, FilterState, RangeValue } from '../core/types';

export const createAppliedFilterUrl = (
  filters: FilterState,
  filterParamsObj: Record<string, string>,
  filterConfig?: FilterConfig,
) => {
  const url = getUrlWithFilters(filterParamsObj, '/jobs');

  if (!filterConfig) return url;

  for (const [k, v] of Object.entries(filters).filter(
    ([_, v]) => v !== null && v !== undefined,
  )) {
    const [_, config] = Object.entries(filterConfig).find(
      ([configKey]) => k === configKey,
    ) as [string, FilterConfig[keyof FilterConfig]];

    const { kind } = config;

    if (kind === FILTER_KIND_SINGLESELECT) {
      url.searchParams.set(config.paramKey, v);
    }

    if (
      kind === FILTER_KIND_MULTISELECT ||
      kind === FILTER_KIND_MULTISELECT_WITH_SEARCH
    ) {
      console.log('label =', config.label, 'options =', config.options);
      const values = config.options.filter((option) =>
        (v as Set<string>).has(option),
      );
      url.searchParams.set(config.paramKey, values.join(','));
    }

    if (kind === FILTER_KIND_RANGE && v) {
      const [min, max] = v as RangeValue;
      const { lowest, highest } = config.value;
      const minNum = Math.floor((min / 100) * highest.value);
      const maxNum = Math.floor((max / 100) * highest.value);
      url.searchParams.set(lowest.paramKey, minNum.toString());
      url.searchParams.set(highest.paramKey, maxNum.toString());
    }
  }

  return url;
};
