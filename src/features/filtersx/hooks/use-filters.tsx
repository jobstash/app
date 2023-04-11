/* eslint-disable unicorn/prefer-spread */
import { Reducer, useMemo, useReducer } from 'react';

import { MultiSelectFilter } from '../components/multi-select-filter';
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
import type {
  FilterAction,
  FilterConfig,
  FilterConfigComponent,
  FilterState,
  FilterStateMultiSelectKey,
  RangeValue,
  ShownSortedConfig,
} from '../core/types';

const filterReducer = (state: FilterState, { type, payload }: FilterAction) => {
  // Clear
  if (!type) return {};

  // Remove
  if (!payload && typeof payload !== 'boolean') {
    const _state = state;
    delete _state[type];
    return { ..._state };
  }

  // The way everything's setup, action `type` maps 1:1 with payload keys
  return { ...state, [type]: payload };
};

export const useFilters = (fetchedConfig?: FilterConfig) => {
  const sortedConfigs: ShownSortedConfig[] = useMemo(
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

  const filterConfigComponents: FilterConfigComponent[] = useMemo(
    () =>
      fetchedConfig
        ? sortedConfigs
            .map(({ key, config }) => {
              const { kind } = config;

              switch (kind) {
                case FILTER_KIND_SINGLESELECT: {
                  const value = filters[key] as string;
                  const { options, label } = config;
                  const ignoreLabel = label === 'Order' || label === 'Order By';

                  if (options.length === 0) {
                    return { ui: null, key: '' as keyof FilterConfig };
                  }

                  return {
                    key,
                    ui: (
                      <SingleSelectFilter
                        label={ignoreLabel ? undefined : label}
                        value={value ?? null}
                        placeholder={
                          key === KEY_ORDER_BY
                            ? 'Sort By'
                            : key === KEY_ORDER
                            ? 'Sort Order'
                            : 'Select'
                        }
                        options={options}
                        type={key}
                        dispatch={dispatch}
                      />
                    ),
                  };
                }

                case FILTER_KIND_MULTISELECT:
                case FILTER_KIND_MULTISELECT_WITH_SEARCH: {
                  const { options, label } = config;
                  const selectedItems =
                    filters[key as FilterStateMultiSelectKey];

                  const numSelected = selectedItems?.size ?? 0;
                  const labelText = `${label}${
                    numSelected > 0 ? ' (' + numSelected + ')' : ''
                  }`;
                  const value =
                    !selectedItems || selectedItems?.size === 0
                      ? []
                      : Array.from(selectedItems);

                  if (options.length === 0) {
                    return { ui: null, key: '' as keyof FilterConfig };
                  }

                  return {
                    key,
                    ui: (
                      <MultiSelectFilter
                        options={options}
                        type={key}
                        dispatch={dispatch}
                        value={value}
                        label={labelText}
                      />
                    ),
                  };
                }

                case FILTER_KIND_RANGE: {
                  const {
                    label,
                    value: {
                      lowest: { value: min },
                      highest: { value: max },
                    },
                  } = config;
                  const value = filters[key] as RangeValue;

                  return {
                    key,
                    ui: (
                      <RangeFilter
                        minMax={[min, max]}
                        value={value}
                        label={label}
                        type={key}
                        dispatch={dispatch}
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
    [fetchedConfig, filters, sortedConfigs],
  );

  const { filterComponents, sortComponents } = useMemo(() => {
    const filterComponents: FilterConfigComponent[] = [];
    const sortComponents: FilterConfigComponent[] = [];

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
