import { type ReactNode, type Reducer, useMemo, useReducer } from 'react';

import { MultiSelectSearchFilter } from '../components/multi-select-search-filter';
import { RangeFilter } from '../components/range-filter';
import { SingleSelectFilter } from '../components/single-select-filter';
import {
  FILTER_KIND_MULTISELECT_WITH_SEARCH,
  FILTER_KIND_RANGE,
  FILTER_KIND_SINGLESELECT,
} from '../core/constants';
import type { FilterConfig } from '../core/interfaces';
import type { FilterAction, FilterState } from '../core/types';
import { filterReducer } from '../reducers';
import {
  getMultiSelectProps,
  getRangeProps,
  getSingleSelectProps,
} from '../utils';

type ShownSortedConfig = {
  key: keyof FilterState;
  config: FilterConfig[keyof FilterConfig];
};

export const useFilters = (fetchedConfig?: FilterConfig) => {
  // Filter only shown configs then sort - `useMemo` for perf
  const shownSortedConfigs: ShownSortedConfig[] = useMemo(
    () =>
      fetchedConfig
        ? Object.entries(fetchedConfig)
            .filter(([_, config]) => config.show)
            .sort(([_k1, v1], [_k2, v2]) => v1.position - v2.position)
            .map(([key, config]) => ({
              key: key as keyof FilterState,
              config,
            }))
        : [],
    [fetchedConfig],
  );

  const [filters, dispatch] = useReducer<Reducer<FilterState, FilterAction>>(
    filterReducer,
    {},
  );

  // Maps config to appropriate component - `useMemo` for perf
  const filterComponents: { key: keyof FilterConfig; ui: ReactNode }[] =
    useMemo(
      () =>
        fetchedConfig
          ? shownSortedConfigs.map(({ key, config }) => {
              const { kind } = config;

              switch (kind) {
                case FILTER_KIND_SINGLESELECT: {
                  const { text, labels, ariaLabel } =
                    getSingleSelectProps(config);

                  return {
                    key,
                    ui: (
                      <SingleSelectFilter
                        type={key}
                        dispatch={dispatch}
                        text={text}
                        labels={labels}
                        ariaLabel={ariaLabel}
                      />
                    ),
                  };
                }

                case FILTER_KIND_RANGE: {
                  const { text, range } = getRangeProps(filters, key, config);

                  return {
                    key,
                    ui: (
                      <RangeFilter
                        text={text}
                        range={range}
                        type={key}
                        dispatch={dispatch}
                      />
                    ),
                  };
                }

                case FILTER_KIND_MULTISELECT_WITH_SEARCH: {
                  const { text, items, selectedItems } = getMultiSelectProps(
                    filters,
                    key,
                    config,
                  );

                  return {
                    key,
                    ui: (
                      <MultiSelectSearchFilter
                        type={key}
                        dispatch={dispatch}
                        text={text}
                        items={items}
                        selectedItems={selectedItems}
                      />
                    ),
                  };
                }

                default: {
                  throw new Error(
                    `Unrecognized filter component: kind=${kind}`,
                  );
                }
              }
            })
          : [],
      [fetchedConfig, filters, shownSortedConfigs],
    );

  const clearFilters = () => dispatch({ type: null, payload: undefined });

  return { filters, filterComponents, clearFilters };
};
