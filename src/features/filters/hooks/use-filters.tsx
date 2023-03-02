import { type ReactNode, type Reducer, useMemo, useReducer } from 'react';

import { MultiSelectSearchFilter } from '../components/multi-select-search-filter';
import { RangeFilter } from '../components/range-filter';
import { SingleSelectFilter } from '../components/single-select-filter';
import {
  FILTER_KIND_MULTISELECT_WITH_SEARCH,
  FILTER_KIND_RANGE,
  FILTER_KIND_SINGLESELECT,
  KEY_AUDITS,
  KEY_HACKS,
  KEY_HEAD_COUNT,
  KEY_LOCATIONS,
  KEY_MAINNET,
  KEY_PUBLICATION_DATE,
  KEY_SALARY,
  KEY_SENIORITY,
  KEY_TEAM_SIZE,
  KEY_TOKEN,
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

// TODO: Remove once mw fixed returned values
const ignoredFilterConfigs = new Set([
  KEY_PUBLICATION_DATE, // Should be SINGLESELECT
  KEY_SALARY, // Step is 0
  KEY_TEAM_SIZE, // Range has null values
  KEY_HEAD_COUNT, // Range has null values
  KEY_AUDITS, // Weird fields: value.{highest, lowest}.value.{low, high}
  KEY_HACKS, // Weird fields: value.{highest, lowest}.value.{low, high}
  KEY_SENIORITY, // Need confirmation if multi-select
  KEY_MAINNET, // Should be SINGLESELECT
  KEY_TOKEN, // Should be SINGLESELECT
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
  const filterComponents: { key: keyof FilterConfig; ui: ReactNode }[] =
    useMemo(
      () =>
        fetchedConfig
          ? shownSortedConfigs
              .filter(({ key }) => !ignoredFilterConfigs.has(key))
              .map(({ key, config }) => {
                const { kind } = config;

                switch (kind) {
                  case FILTER_KIND_SINGLESELECT: {
                    const { text, options, ariaLabel } =
                      getSingleSelectProps(config);

                    return {
                      key,
                      ui: (
                        <SingleSelectFilter
                          type={key}
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

                  case FILTER_KIND_MULTISELECT_WITH_SEARCH: {
                    if (config.options.length === 0) return { key, ui: null };

                    const { text, options, selectedItems } =
                      getMultiSelectProps(filters, key, config);

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

  const clearFilterState = () => dispatch({ type: null, payload: undefined });

  return { filters, filterComponents, clearFilterState };
};
