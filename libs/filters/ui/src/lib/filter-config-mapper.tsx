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
      {configs.map((config) => {
        const isOrderConfig = config.label.includes('Order');
        return (
          <div key={config.label} className={cn(wrapperClassName)}>
            {config.kind === FILTER_KIND.SINGLE_SELECT && (
              <SingleSelectFilter
                label={isOrderConfig ? undefined : config.label}
                value={
                  filterValues[(config as SingleSelectFilterConfig).paramKey]
                }
                options={(config as SingleSelectFilterConfig).options}
                paramKey={(config as SingleSelectFilterConfig).paramKey}
                dispatch={dispatch}
                placeholder={isOrderConfig ? config.label : undefined}
                gaEventName={
                  (config as SingleSelectFilterConfig).googleAnalyticsEventName
                }
              />
            )}

            {config.kind === FILTER_KIND.RANGE && (
              <RangeFilter
                label={config.label}
                minValue={filterValues[config.value.lowest.paramKey]}
                maxValue={filterValues[config.value.highest.paramKey]}
                minParamKey={config.value.lowest.paramKey}
                maxParamKey={config.value.highest.paramKey}
                minConfigValue={roundConfigValue(config.value.lowest.value)}
                maxConfigValue={roundConfigValue(config.value.highest.value)}
                dispatch={dispatch}
                prefix={config.prefix}
                gaEventName={config.googleAnalyticsEventName}
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
                gaEventName={config.googleAnalyticsEventName}
              />
            )}
          </div>
        );
      })}
    </>
  );
};

const roundConfigValue = (num: number) => Math.round(num / 1000) * 1000;

export default memo(FilterConfigMapper);
