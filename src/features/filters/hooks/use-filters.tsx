import { type ReactNode, type Reducer, useMemo, useReducer } from 'react';

import { MultiSelectSearchFilter } from '../components/multi-select-search-filter';
import { RangeFilter } from '../components/range-filter';
import { SingleSelectFilter } from '../components/single-select-filter';
import {
  FILTER_KIND_MULTISELECT,
  FILTER_KIND_MULTISELECT_WITH_SEARCH,
  FILTER_KIND_RANGE,
  FILTER_KIND_SINGLESELECT,
  KEY_AUDITS,
  KEY_HACKS,
  KEY_HEAD_COUNT,
  KEY_LOCATIONS,
  KEY_MAINNET,
  KEY_ORDER,
  KEY_ORDER_BY,
  KEY_SALARY,
  KEY_SENIORITY,
  KEY_TEAM_SIZE,
  tempLabelMap,
  tempLabelSet,
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

// TODO: Remove once mw fixed returned values
const ignoredFilterConfigs = new Set([
  // KEY_PUBLICATION_DATE, // Should be SINGLESELECT
  KEY_SALARY, // Internal error
  KEY_TEAM_SIZE, // Range has 0 min/max values
  KEY_HEAD_COUNT, // Range has 0 min/max values
  KEY_AUDITS, // Range has 0 min/max values
  KEY_HACKS, // Not a range -> min = 0, and range = 1, stepSize = 5
  KEY_SENIORITY, // Errors "seniority must be a postive number error", "seniority must be a number conforming to the specified constraints"
  KEY_MAINNET, // Internal error
  // KEY_TOKEN, // Should be SINGLESELECT
  KEY_LOCATIONS, // No required "label" field, No "paramKey" field
  // KEY_TECH, // No required "label" field, empty string in options
  // KEY_ORGANIZATIONS, // No required "label" field
  // KEY_CHAINS, // No required "label" field
  // KEY_PROJECTS, // No required "label" field
  // KEY_CATEGORIES, // No required "label" field
]);

export const useFilters = (fetchedConfig?: FilterConfig) => {
  // Filter only shown configs then sort - `useMemo` for perf
  const shownSortedConfigs: ShownSortedConfig[] = useMemo(
    () =>
      fetchedConfig
        ? Object.entries(fetchedConfig)
            .filter(([_, config]) => config.show)
            .sort(([_k1, v1], [_k2, v2]) => v1.position - v2.position)
            .map(([key, config]) => {
              // TODO: Remove once mw fixed returned values
              const _config = config;
              if (tempLabelSet.has(key))
                _config['label'] =
                  tempLabelMap[key as keyof typeof tempLabelMap];

              return {
                key: key as keyof FilterState,
                config,
              };
            })
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
            .filter(({ key }) => !ignoredFilterConfigs.has(key))
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
