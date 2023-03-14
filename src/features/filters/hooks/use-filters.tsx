import { type ReactNode, type Reducer, useMemo, useReducer } from 'react';

import { MultiSelectSearchFilter } from '../components/multi-select-search-filter';
import { RangeFilter } from '../components/range-filter';
import { SingleSelectFilter } from '../components/single-select-filter';
import {
  FILTER_KIND_MULTISELECT,
  FILTER_KIND_MULTISELECT_WITH_SEARCH,
  FILTER_KIND_RANGE,
  FILTER_KIND_SINGLESELECT,
  KEY_ORDER,
  KEY_ORDER_BY,
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

type ConfigComponent = { key: keyof FilterConfig; ui: ReactNode };

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
  const filterConfigComponents: ConfigComponent[] = useMemo(
    () =>
      fetchedConfig
        ? shownSortedConfigs
            .map(({ key, config }) => {
              const { kind } = config;

              switch (kind) {
                case FILTER_KIND_SINGLESELECT: {
                  const value = filters[key] as string;
                  const { text, options, ariaLabel } = getSingleSelectProps(
                    config,
                    value,
                  );

                  return {
                    key,
                    ui: (
                      <SingleSelectFilter
                        type={key}
                        value={value}
                        dispatch={dispatch}
                        text={text}
                        options={options}
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

                case FILTER_KIND_MULTISELECT:
                case FILTER_KIND_MULTISELECT_WITH_SEARCH: {
                  if (config.options.length === 0) return { key, ui: null };

                  const { text, options, selectedItems } = getMultiSelectProps(
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
                        options={options}
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
            .filter(({ ui }) => ui !== null)
        : [],
    [fetchedConfig, filters, shownSortedConfigs],
  );

  const { filterComponents, sortComponents } = useMemo(() => {
    const filterComponents: ConfigComponent[] = [];
    const sortComponents: ConfigComponent[] = [];

    for (const configComponent of filterConfigComponents) {
      configComponent.key !== KEY_ORDER && configComponent.key !== KEY_ORDER_BY
        ? filterComponents.push(configComponent)
        : sortComponents.push(configComponent);
    }

    return { filterComponents, sortComponents };
  }, [filterConfigComponents]);

  const clearFilterState = () => dispatch({ type: null, payload: undefined });

  return { filters, filterComponents, sortComponents, clearFilterState };
};
