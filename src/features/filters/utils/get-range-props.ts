import {
  KEY_MONTHLY_FEES,
  KEY_MONTHLY_REVENUE,
  KEY_MONTHLY_VOLUME,
  KEY_SALARY,
  KEY_TVL,
} from '../core/constants';
import type { RangeFilterConfig, RangeSliderProps } from '../core/interfaces';
import type { FilterState, FilterStateRangeKey } from '../core/types';

import { formatRangeFilterText } from './format-range-filter-text';

const currencyKeys = new Set([
  KEY_SALARY,
  KEY_TVL,
  KEY_MONTHLY_VOLUME,
  KEY_MONTHLY_REVENUE,
  KEY_MONTHLY_FEES,
]);

export const getRangeProps = (
  filters: FilterState,
  key: keyof FilterState,
  config: RangeFilterConfig,
) => {
  const {
    label,
    value: {
      lowest: { value: min },
      highest: { value: max },
    },
    stepSize,
  } = config;

  const currentValue = filters[key as FilterStateRangeKey];
  const defaultValue: RangeSliderProps['defaultValue'] = [min, max];

  const range: RangeSliderProps = {
    min,
    max,
    step: stepSize,
    prefix: currencyKeys.has(key) ? '$' : '',
    value: currentValue ?? defaultValue,
    defaultValue,
  };

  const text = currentValue ? formatRangeFilterText(key, label, range) : label;

  return {
    text,
    range,
  };
};
