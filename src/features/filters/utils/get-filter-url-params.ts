/* eslint-disable unicorn/consistent-destructuring */

import {
  FILTER_KIND_MULTISELECT_WITH_SEARCH,
  FILTER_KIND_RANGE,
  FILTER_KIND_SINGLESELECT,
} from '../core/constants';
import type { FilterConfig } from '../core/interfaces';
import type { FilterState, RangeValue } from '../core/types';

export const getFilterUrlParams = (
  filters: FilterState,
  filterConfig: FilterConfig,
) =>
  Object.entries(filters)
    .map(([k, v]) => {
      const [_, config] = Object.entries(filterConfig).find(
        ([configKey]) => k === configKey,
      ) as [string, FilterConfig[keyof FilterConfig]];

      const { kind } = config;
      switch (kind) {
        case FILTER_KIND_SINGLESELECT: {
          return `${config.paramKey}=${encodeURI(v as string)}`;
        }

        case FILTER_KIND_MULTISELECT_WITH_SEARCH: {
          const values = config.options.filter((option) =>
            (v as Set<string>).has(option),
          );
          return `${config.paramKey}=${encodeURI(values.join(','))}`;
        }

        case FILTER_KIND_RANGE: {
          const [min, max] = v as RangeValue;
          const { lowest, highest } = config.value;
          return `${lowest.paramKey}=${min}&${highest.paramKey}=${max}`;
        }

        default: {
          throw new Error(`Unrecognized filter component: kind=${kind}`);
        }
      }
    })
    .join('&');
