/* eslint-disable unicorn/consistent-destructuring */

import {
  FILTER_KIND_MULTISELECT_WITH_SEARCH,
  FILTER_KIND_RANGE,
  FILTER_KIND_SINGLESELECT,
} from '../core/constants';
import { FilterConfig } from '../core/interfaces';
import { FilterState, RangeValue } from '../core/types';

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
          const paramValue = config.options.find(
            ({ label }) => v === label,
          )!.value;
          return `${config.paramKey}=${paramValue}`;
        }

        case FILTER_KIND_MULTISELECT_WITH_SEARCH: {
          const values = config.options
            .filter(({ label }) => (v as Set<string>).has(label))
            .map(({ value }) => value);
          return `${config.paramKey}=${values.join(',')}`;
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
