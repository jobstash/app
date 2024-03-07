'use client';

import { FILTER_KIND } from '~/filters/core/constants';
import {
  MultiSelectFilterConfig,
  RangeFilterConfig,
  SingleSelectFilterConfig,
} from '~/filters/core/schemas';
import { useFiltersContext } from '~/filters/providers/filters-provider/context';

import { MultiSelectInput } from './multi-select-input';
import { RangeInput } from './range-input';
import { SingleSelectInput } from './single-select-input';

export const FilterConfigMapper = () => {
  const { filterSearchParams, filterConfigs, atom } = useFiltersContext();

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {filterConfigs.map((config) => {
        const isRangeFilter = config.kind === FILTER_KIND.RANGE;
        if (isRangeFilter) {
          const paramValues = getRangeParamValues(filterSearchParams, config);

          return (
            <RangeInput
              key={config.label}
              config={config}
              paramValues={paramValues}
            />
          );
        }

        const isSingleSelect = config.kind === FILTER_KIND.SINGLE_SELECT;
        if (isSingleSelect) {
          const paramValue = getSelectParamValue(filterSearchParams, config);
          return (
            <SingleSelectInput
              key={config.label}
              config={config}
              paramValue={paramValue}
            />
          );
        }

        const isMultiSelect =
          config.kind === FILTER_KIND.MULTI_SELECT ||
          config.kind === FILTER_KIND.MULTI_SELECT_WITH_SEARCH;
        if (isMultiSelect) {
          const paramValue = getSelectParamValue(filterSearchParams, config);

          return (
            <MultiSelectInput
              key={config.label}
              config={config}
              paramValue={paramValue}
            />
          );
        }

        return null;
      })}
    </div>
  );
};

const getRangeParamValues = (
  searchParams: URLSearchParams,
  config: RangeFilterConfig,
) => {
  const {
    value: {
      lowest: { paramKey: minParamKey },
      highest: { paramKey: maxParamKey },
    },
  } = config;

  const minParamValue = searchParams.get(minParamKey);
  const maxParamValue = searchParams.get(maxParamKey);

  return {
    min: minParamValue ? Number(minParamValue) : NaN,
    max: maxParamValue ? Number(maxParamValue) : NaN,
  };
};

const getSelectParamValue = (
  searchParams: URLSearchParams,
  config: SingleSelectFilterConfig | MultiSelectFilterConfig,
) => searchParams.get(config.paramKey) ?? '';
