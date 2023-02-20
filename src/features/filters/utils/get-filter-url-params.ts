/* eslint-disable unicorn/consistent-destructuring */

import { FilterKind } from '../core/constants';
import { FilterConfig, FilterState, RangeValue } from '../core/types';

export const getFilterUrlParams = (
  filters: FilterState,
  filterConfig: FilterConfig,
) =>
  Object.entries(filters)
    .map(([k, v]) => {
      const [_, config] = Object.entries(filterConfig).find(
        ([configKey]) => k === configKey,
      ) as [string, FilterConfig[keyof FilterConfig]];

      const { kind, value } = config;
      switch (kind) {
        case FilterKind.DATE: {
          const paramValue = value.find(({ label }) => v === label)!.value;
          return `${config.param_key}=${paramValue}`;
        }

        case FilterKind.BOOLEAN: {
          const paramValue = value.find(({ label }) => v === label)!.value;
          return `${config.param_key}=${paramValue}`;
        }

        case FilterKind.SINGLESELECT: {
          const paramValue = value.find(({ label }) => v === label)!.value;
          return `${config.param_key}=${paramValue}`;
        }

        case FilterKind.MULTISELECT_SEARCH:
        case FilterKind.MULTISELECT: {
          const values = value
            .filter(({ label }) => (v as Set<string>).has(label))
            .map(({ value }) => value);
          return `${config.param_key}=${values.join(',')}`;
        }

        case FilterKind.RANGE: {
          const [min, max] = v as RangeValue;
          const { lowest, highest } = value;
          return `${lowest.param_key}=${min}&${highest.param_key}=${max}`;
        }

        default: {
          throw new Error(`Unrecognized filter component: kind=${kind}`);
        }
      }
    })
    .join('&');
