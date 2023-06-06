import { type Dispatch, memo } from 'react';

import { type ClassValue } from 'clsx';

import {
  FILTER_KIND,
  type FilterConfig,
  type FilterValues,
  type SetMultiSelectFilterValueAction,
  type SetRangeFilterValueAction,
  type SetSelectFilterValueAction,
  type SingleSelectFilterConfig,
} from '@jobstash/filters/core';
import { cn } from '@jobstash/shared/utils';

import MultiSelectFilter from './multi-select-filter';
import RangeFilter from './range-filter';
import SingleSelectFilter from './single-select-filter';

export interface Props {
  filterValues?: FilterValues;
  configs: FilterConfig[string][];
  dispatch: Dispatch<
    | SetSelectFilterValueAction
    | SetRangeFilterValueAction
    | SetMultiSelectFilterValueAction
  >;
  wrapperClassName: ClassValue;
}

const FilterConfigMapper = ({
  filterValues,
  configs,
  dispatch,
  wrapperClassName,
}: Props) => {
  if (!filterValues) return null;
  return (
    <>
      {configs.map((config) => (
        <div key={config.label} className={cn(wrapperClassName)}>
          {config.kind === FILTER_KIND.SINGLE_SELECT && (
            <SingleSelectFilter
              label={config.label.includes('Order') ? undefined : config.label}
              value={
                filterValues[(config as SingleSelectFilterConfig).paramKey]
              }
              options={(config as SingleSelectFilterConfig).options}
              paramKey={(config as SingleSelectFilterConfig).paramKey}
              dispatch={dispatch}
            />
          )}

          {config.kind === FILTER_KIND.RANGE && (
            <RangeFilter
              label={config.label}
              minValue={filterValues[config.value.lowest.paramKey]}
              maxValue={filterValues[config.value.highest.paramKey]}
              minParamKey={config.value.lowest.paramKey}
              maxParamKey={config.value.highest.paramKey}
              minConfigValue={config.value.lowest.value}
              maxConfigValue={config.value.highest.value}
              dispatch={dispatch}
            />
          )}

          {(config.kind === FILTER_KIND.MULTI_SELECT ||
            config.kind === FILTER_KIND.MULTI_SELECT_WITH_SEARCH) && (
            <MultiSelectFilter
              value={filterValues[config.paramKey]}
              label={config.label}
              options={config.options}
              paramKey={config.paramKey}
              dispatch={dispatch}
            />
          )}
        </div>
      ))}
    </>
  );
};

export default memo(FilterConfigMapper);
